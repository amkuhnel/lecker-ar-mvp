
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

const AdminDashboardScreen: React.FC = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'reviews'>('overview');
    const [users, setUsers] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/admin/stats');
            const data = await res.json();
            if (data.success) {
                setStats(data.data);
            }
        } catch (e) {
            console.error("Failed to load admin stats", e);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchUsers = async () => {
        const res = await fetch('/api/users');
        const data = await res.json();
        if (data.success) setUsers(data.data);
    };

    const fetchReviews = async () => {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        if (data.success) setReviews(data.data);
    };

    useEffect(() => {
        if (activeTab === 'users') fetchUsers();
        if (activeTab === 'reviews') fetchReviews();
    }, [activeTab]);

    if (isLoading) {
        return <div className="flex-1 flex items-center justify-center bg-[#221910] text-white">Cargando Admin...</div>;
    }

    return (
        <div className="flex-1 flex flex-col bg-[#221910] text-white font-display min-h-screen">
            <header className="sticky top-0 z-30 bg-[#221910]/95 backdrop-blur-md px-4 py-4 border-b border-white/5 pt-safe flex justify-between items-center">
                <span className="text-xl font-bold text-[#f48c25]">Admin Dashboard</span>
                <button
                    onClick={() => navigate('/profile')}
                    className="text-white bg-white/10 px-3 py-1 rounded-full text-xs font-bold"
                >
                    Salir
                </button>
            </header>

            <main className="flex-1 p-4 overflow-y-auto no-scrollbar pb-24">
                {/* Tabs */}
                <div className="flex space-x-2 mb-6 bg-white/5 p-1 rounded-xl">
                    {['overview', 'users', 'reviews'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-[#f48c25] text-white shadow-lg' : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            {tab === 'overview' ? 'Resumen' : tab === 'users' ? 'Usuarios' : 'Reseñas'}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === 'overview' && stats && (
                    <div className="grid grid-cols-2 gap-4">
                        <StatCard label="Usuarios" value={stats.totalUsers} icon="group" />
                        <StatCard label="Reseñas" value={stats.totalReviews} icon="rate_review" />
                        <StatCard label="Activos" value={stats.activeUsers} icon="verified_user" />
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="space-y-4">
                        {users.map((u: any) => (
                            <div key={u._id} className="bg-surface-dark p-4 rounded-xl border border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden">
                                        <img src={u.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{u.name}</p>
                                        <p className="text-xs text-zinc-500">@{u.handle} • {u.role || 'user'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="text-[#f48c25] text-xs font-bold bg-[#f48c25]/10 px-3 py-1.5 rounded-lg border border-[#f48c25]/20">Reset</button>
                                    <button className="text-red-500 text-xs font-bold bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">Borrar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-4">
                        {reviews.map((r: any) => (
                            <div key={r._id} className="bg-surface-dark p-4 rounded-xl border border-white/5 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-sm">{r.dishName}</h4>
                                        <p className="text-xs text-zinc-500">{r.venueName}</p>
                                    </div>
                                    <span className="text-[#f48c25] font-bold text-sm">{r.rating}★</span>
                                </div>
                                <p className="text-xs text-zinc-400 line-clamp-2">"{r.description || r.comment}"</p>
                                <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                                    <button className="text-zinc-300 text-xs font-bold px-3 py-1.5 rounded-lg bg-white/5">Editar</button>
                                    <button className="text-red-500 text-xs font-bold bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20">Borrar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <BottomNav />
        </div>
    );
};

const StatCard = ({ label, value, icon }: any) => (
    <div className="bg-surface-dark p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center gap-2">
        <span className="material-symbols-outlined text-[#f48c25] text-3xl">{icon}</span>
        <span className="text-3xl font-black text-white">{value}</span>
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{label}</span>
    </div>
);

export default AdminDashboardScreen;
