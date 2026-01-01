import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_USERS } from '../constants';

const UserListScreen: React.FC = () => {
    const { type, id } = useParams<{ type: string, id: string }>();
    const navigate = useNavigate();

    // Mock data expansion for demo purposes
    const [users, setUsers] = useState(
        [...MOCK_USERS, ...MOCK_USERS, ...MOCK_USERS].map((u, i) => ({
            ...u,
            id: `${u.id}-${i}`,
            isFollowing: i % 2 === 0 // Mock initial following state
        }))
    );

    const title = type === 'followers' ? 'Seguidores' : 'Seguidos';

    const handleToggleFollow = (userId: string) => {
        setUsers(users.map(u =>
            u.id === userId ? { ...u, isFollowing: !u.isFollowing } : u
        ));
    };

    return (
        <div className="flex-1 flex flex-col bg-[#221910] font-display text-white min-h-screen">
            <header className="sticky top-0 z-20 bg-[#221910]/95 backdrop-blur-md px-4 py-3 border-b border-white/5 pt-safe flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors active:scale-90"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <h1 className="text-xl font-bold tracking-tight">{title}</h1>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                        <div
                            className="flex items-center gap-3 cursor-pointer flex-1"
                            onClick={() => navigate(`/user/${user.id.split('-')[0]}`)}
                        >
                            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                            <div>
                                <h3 className="font-bold text-sm">{user.name}</h3>
                                <p className="text-xs text-zinc-400">@{user.handle}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggleFollow(user.id)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 border ${user.isFollowing
                                    ? 'bg-transparent border-white/20 text-white hover:bg-white/5'
                                    : 'bg-[#f48c25] border-[#f48c25] text-white hover:bg-orange-600'
                                }`}
                        >
                            {user.isFollowing ? 'Siguiendo' : 'Seguir'}
                        </button>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default UserListScreen;
