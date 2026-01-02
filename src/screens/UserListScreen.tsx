import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { MOCK_USERS } from '../constants';

const UserListScreen: React.FC = () => {
    const { type, id } = useParams<{ type: string, id: string }>();
    const navigate = useNavigate();
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Determine what to fetch based on type (followers/following)
                // For MVP, we'll just fetch ALL users to simulate
                // In a real app, we'd have /api/users/:id/followers
                const res = await fetch('/api/users');
                const data = await res.json();
                if (data.success) {
                    setUsers(data.data);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [type, id]);

    const title = type === 'followers' ? 'Seguidores' : 'Seguidos';

    return (
        <div className="flex-1 flex flex-col bg-[#221910] font-display text-white min-h-screen">
            <header className="sticky top-0 z-20 bg-[#221910]/95 backdrop-blur-md px-4 py-3 border-b border-white/5 pt-safe flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors active:scale-90"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <span className="text-xl font-bold">{title}</span>
                <div className="w-10"></div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                    <div className="text-center py-10">Cargando...</div>
                ) : users.length > 0 ? (
                    users.map((u, i) => (
                        <div key={i} className="flex items-center space-x-4 bg-surface-dark p-3 rounded-2xl border border-white/5" onClick={() => navigate(`/user/${u._id || u.id}`)}>
                            <img src={u.avatar} alt={u.name} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                                <h3 className="font-bold">{u.name}</h3>
                                <p className="text-sm text-gray-400">@{u.handle}</p>
                            </div>
                            <div className="ml-auto">
                                {/* Simplified follow button for MVP */}
                                <button className="text-[#f48c25] text-xs font-bold border border-[#f48c25] px-3 py-1 rounded-lg">Ver</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">No hay usuarios aún.</div>
                )}
            </div>
        </div>
    );
};

export default UserListScreen;
