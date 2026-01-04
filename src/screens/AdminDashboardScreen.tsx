
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboardScreen: React.FC = () => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [activeTab, setActiveTab] = useState<'metrics' | 'activity' | 'validation'>('metrics');

    // Metrics state
    const [metrics, setMetrics] = useState<any>(null);
    const [dateRange, setDateRange] = useState<{ start: string, end: string }>({
        start: '',
        end: new Date().toISOString().split('T')[0]
    });

    // Activity state
    const [userActivity, setUserActivity] = useState<any[]>([]);

    // Validation state
    const [pendingReviews, setPendingReviews] = useState<any[]>([]);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkAdminAccess();
    }, []);

    useEffect(() => {
        if (isAdmin) {
            if (activeTab === 'metrics') fetchMetrics();
            if (activeTab === 'activity') fetchActivity();
            if (activeTab === 'validation') fetchPendingReviews();
        }
    }, [activeTab, isAdmin, dateRange]);

    const checkAdminAccess = async () => {
        try {
            const userRole = localStorage.getItem('user_role');

            if (userRole !== 'admin') {
                navigate('/profile');
                return;
            }

            setIsAdmin(true);
            setIsCheckingAuth(false);
        } catch (error) {
            console.error('Auth check failed:', error);
            navigate('/profile');
        }
    };

    const fetchMetrics = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (dateRange.start) params.append('startDate', dateRange.start);
            if (dateRange.end) params.append('endDate', dateRange.end);

            const res = await fetch(`/api/admin_metrics?${params}`);
            const data = await res.json();
            if (data.success) {
                setMetrics(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch metrics:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchActivity = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin_activity');
            const data = await res.json();
            if (data.success) {
                setUserActivity(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch activity:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPendingReviews = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/reviews?status=pending');
            const data = await res.json();
            if (data.success) {
                setPendingReviews(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch pending reviews:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReviewAction = async (reviewId: string, action: 'approved' | 'rejected') => {
        try {
            const res = await fetch(`/api/reviews?id=${reviewId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: action,
                    approvedBy: localStorage.getItem('admin_id') // You might want to store this
                })
            });

            const data = await res.json();
            if (data.success) {
                // Remove from pending list
                setPendingReviews(prev => prev.filter(r => r._id !== reviewId));
                // Refresh metrics
                fetchMetrics();
            }
        } catch (error) {
            console.error('Failed to update review:', error);
        }
    };

    const setPresetRange = (preset: string) => {
        const end = new Date().toISOString().split('T')[0];
        let start = '';

        const today = new Date();
        switch (preset) {
            case 'today':
                start = end;
                break;
            case 'week':
                const weekAgo = new Date(today);
                weekAgo.setDate(today.getDate() - 7);
                start = weekAgo.toISOString().split('T')[0];
                break;
            case 'month':
                const monthAgo = new Date(today);
                monthAgo.setMonth(today.getMonth() - 1);
                start = monthAgo.toISOString().split('T')[0];
                break;
            case 'year':
                const yearAgo = new Date(today);
                yearAgo.setFullYear(today.getFullYear() - 1);
                start = yearAgo.toISOString().split('T')[0];
                break;
            case 'all':
                start = '';
                break;
        }

        setDateRange({ start, end });
    };

    if (isCheckingAuth || isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-[#221910] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#f48c25] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-zinc-400">
                        {isCheckingAuth ? 'Verificando acceso...' : 'Cargando datos...'}
                    </p>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return null;
    }

    return (
        <div className="flex-1 flex flex-col bg-[#221910] text-white font-display min-h-screen">
            <header className="sticky top-0 z-30 bg-[#221910]/95 backdrop-blur-md px-4 py-4 border-b border-white/5 pt-safe flex justify-between items-center">
                <span className="text-xl font-bold text-[#f48c25]">Admin Dashboard</span>
                <button
                    onClick={() => navigate('/profile')}
                    className="text-white bg-white/10 px-3 py-1 rounded-full text-xs font-bold hover:bg-white/20 transition-colors"
                >
                    Salir
                </button>
            </header>

            <main className="flex-1 p-4 overflow-y-auto no-scrollbar pb-24">
                {/* Tabs */}
                <div className="flex space-x-2 mb-6 bg-white/5 p-1 rounded-xl">
                    {[
                        { id: 'metrics', label: 'Métricas' },
                        { id: 'activity', label: 'Actividad' },
                        { id: 'validation', label: 'Validación' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab.id
                                ? 'bg-[#f48c25] text-white shadow-lg'
                                : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Metrics Tab */}
                {activeTab === 'metrics' && (
                    <div className="space-y-6">
                        {/* Date Filter */}
                        <div className="bg-surface-dark p-4 rounded-xl border border-white/5">
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-3">Filtro de Fecha</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {['today', 'week', 'month', 'year', 'all'].map(preset => (
                                    <button
                                        key={preset}
                                        onClick={() => setPresetRange(preset)}
                                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-bold transition-colors"
                                    >
                                        {preset === 'today' ? 'Hoy' :
                                            preset === 'week' ? 'Última Semana' :
                                                preset === 'month' ? 'Último Mes' :
                                                    preset === 'year' ? 'Último Año' : 'Todo'}
                                    </button>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-zinc-500 mb-1 block">Desde</label>
                                    <input
                                        type="date"
                                        value={dateRange.start}
                                        onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-zinc-500 mb-1 block">Hasta</label>
                                    <input
                                        type="date"
                                        value={dateRange.end}
                                        onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Metrics Cards */}
                        {metrics && (
                            <div className="grid grid-cols-2 gap-4">
                                <MetricCard
                                    label="Reseñas"
                                    value={metrics.totalReviews}
                                    icon="rate_review"
                                />
                                <MetricCard
                                    label="Usuarios Activos"
                                    value={metrics.activeUsers}
                                    icon="group"
                                />
                                <MetricCard
                                    label="Restaurantes"
                                    value={metrics.uniqueVenues}
                                    icon="restaurant"
                                />
                                <MetricCard
                                    label="Pendientes"
                                    value={metrics.pendingReviews}
                                    icon="pending"
                                    highlight
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Activity Tab */}
                {activeTab === 'activity' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold mb-4">Actividad de Usuarios</h3>
                        {userActivity.length > 0 ? (
                            <div className="bg-surface-dark rounded-xl border border-white/5 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-black/40">
                                            <tr>
                                                <th className="text-left p-3 font-bold text-zinc-400">Usuario</th>
                                                <th className="text-center p-3 font-bold text-zinc-400">Reseñas</th>
                                                <th className="text-center p-3 font-bold text-zinc-400">Seguidos</th>
                                                <th className="text-center p-3 font-bold text-zinc-400">Seguidores</th>
                                                <th className="text-center p-3 font-bold text-zinc-400">Días</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {userActivity.map((user) => (
                                                <tr key={user._id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                                                    <td className="p-3">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                                                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-xs">{user.name}</p>
                                                                <p className="text-[10px] text-zinc-500">@{user.handle}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center p-3 font-bold">{user.reviewCount}</td>
                                                    <td className="text-center p-3">{user.following}</td>
                                                    <td className="text-center p-3">{user.followers}</td>
                                                    <td className="text-center p-3">
                                                        {user.daysSinceLastReview !== null ? (
                                                            <span className={user.daysSinceLastReview > 30 ? 'text-red-400' : 'text-zinc-400'}>
                                                                {user.daysSinceLastReview}
                                                            </span>
                                                        ) : (
                                                            <span className="text-zinc-600">-</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <p className="text-center text-zinc-500 py-8">No hay datos de actividad</p>
                        )}
                    </div>
                )}

                {/* Validation Tab */}
                {activeTab === 'validation' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold mb-4">Reseñas Pendientes de Validación</h3>
                        {pendingReviews.length > 0 ? (
                            pendingReviews.map(review => (
                                <div key={review._id} className="bg-surface-dark p-4 rounded-xl border border-white/5">
                                    <div className="flex gap-4">
                                        <img
                                            src={review.imageUrl}
                                            alt={review.dishName}
                                            className="w-24 h-24 rounded-xl object-cover"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm mb-1">{review.dishName}</h4>
                                            <p className="text-xs text-zinc-400 mb-2">{review.venueName}</p>
                                            <p className="text-xs text-zinc-500 mb-2">
                                                Por: @{review.userId?.handle || 'Usuario'}
                                            </p>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[#f48c25] font-bold text-sm">{review.rating}★</span>
                                            </div>
                                            <p className="text-xs text-zinc-400 line-clamp-2">"{review.description}"</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                                        <button
                                            onClick={() => handleReviewAction(review._id, 'approved')}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                                        >
                                            ✓ Aprobar
                                        </button>
                                        <button
                                            onClick={() => handleReviewAction(review._id, 'rejected')}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                                        >
                                            ✗ Rechazar
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-surface-dark rounded-xl border border-white/5">
                                <span className="material-symbols-outlined text-6xl text-zinc-700 mb-4">check_circle</span>
                                <p className="text-zinc-400">No hay reseñas pendientes</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

const MetricCard = ({ label, value, icon, highlight = false }: any) => (
    <div className={`bg-surface-dark p-5 rounded-2xl border ${highlight ? 'border-[#f48c25]/30' : 'border-white/5'} flex flex-col items-center justify-center gap-2`}>
        <span className={`material-symbols-outlined ${highlight ? 'text-[#f48c25]' : 'text-zinc-500'} text-3xl`}>{icon}</span>
        <span className="text-3xl font-black text-white">{value}</span>
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
    </div>
);

export default AdminDashboardScreen;
