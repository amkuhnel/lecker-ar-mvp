import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_USERS, MOCK_REVIEWS, MOCK_USER } from '../constants';
import { BottomNav } from '../components/BottomNav';

const PublicProfileScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(false);

    // Find user (fallback to logged in user if not found/matching)
    const user = MOCK_USERS.find(u => u.id === id) || MOCK_USERS[1];
    const isMe = user.id === MOCK_USER.id;

    // Filter reviews for this user
    const userReviews = MOCK_REVIEWS.filter(r => r.userId === user.id);

    // Fallback images if user has no reviews with images
    // Fallback images if user has no reviews with images
    // const gridImages removed as unused

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const handleMessage = () => {
        // In a real app, this would find the existing chat ID or create a new one
        navigate('/chat/1');
    };

    return (
        <div className="flex-1 flex flex-col bg-black text-white pb-28 min-h-screen font-display">
            <header className="flex justify-between items-center px-4 py-4 sticky top-0 bg-black/95 backdrop-blur-md z-30 pt-safe border-b border-white/5">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-white/5 transition-colors active:scale-95"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <span className="text-lg font-bold tracking-tight">@{user.handle}</span>
                <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-2xl">more_vert</span>
                </button>
            </header>

            <main className="flex-1 p-4 space-y-6 overflow-y-auto no-scrollbar">
                {/* Profile Card */}
                <section className="flex flex-col items-center pt-2">
                    <div className="w-24 h-24 rounded-full border-4 border-[#121212] ring-2 ring-[#f48c25]/50 overflow-hidden shadow-2xl mb-4 relative group">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>

                    <h2 className="text-2xl font-black tracking-tight mb-1 text-center">{user.name}</h2>

                    {user.bio && (
                        <p className="text-zinc-400 text-sm text-center max-w-xs leading-relaxed mb-6">
                            {user.bio}
                        </p>
                    )}

                    {/* Stats */}
                    <div className="flex justify-center space-x-8 mb-8 w-full">
                        <div className="flex flex-col items-center">
                            <span className="font-black text-xl">{user.stats.reviews}</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Reseñas</span>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div
                            onClick={() => navigate(`/user/${user.id}/list/followers`)}
                            className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <span className="font-black text-xl">{user.stats.followers}</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Seguidores</span>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div
                            onClick={() => navigate(`/user/${user.id}/list/following`)}
                            className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <span className="font-black text-xl">{user.stats.following}</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Seguidos</span>
                        </div>
                    </div>

                    {/* Actions */}
                    {!isMe && (
                        <div className="flex gap-3 w-full max-w-sm">
                            <button
                                onClick={handleFollow}
                                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg ${isFollowing
                                    ? 'bg-[#1E1E1E] text-white border border-white/10'
                                    : 'bg-[#f48c25] text-white shadow-[#f48c25]/20'
                                    }`}
                            >
                                {isFollowing ? 'Siguiendo' : 'Seguir'}
                            </button>
                            <button
                                onClick={handleMessage}
                                className="flex-1 py-3 rounded-xl bg-[#1E1E1E] text-white border border-white/10 font-bold text-sm hover:bg-white/5 transition-all active:scale-95"
                            >
                                Mensaje
                            </button>
                        </div>
                    )}
                </section>

                <div className="h-px bg-white/5 w-full"></div>

                {/* Personal Grid */}
                <section>
                    <div className="flex justify-between items-end mb-4 px-1">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-[#f48c25] mb-1">Galería</span>
                            <h3 className="text-lg font-black tracking-tight">Sus Reseñas</h3>
                        </div>
                        <span className="text-zinc-500 text-xs font-bold">{userReviews.length} publicaciones</span>
                    </div>

                    {userReviews.length > 0 ? (
                        <div className="grid grid-cols-3 gap-1">
                            {userReviews.map((review) => (
                                <div
                                    key={review.id}
                                    onClick={() => navigate(`/venue/${review.venueId}`)}
                                    className="aspect-square bg-surface-dark overflow-hidden relative group cursor-pointer"
                                >
                                    <img
                                        src={review.imageUrl}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        alt={review.dishName}
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white">visibility</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 flex flex-col items-center justify-center text-zinc-500 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
                            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">no_photography</span>
                            <p className="text-sm font-medium">Aún no hay reseñas públicas</p>
                        </div>
                    )}
                </section>
            </main>

            <BottomNav />
        </div>
    );
};

export default PublicProfileScreen;
