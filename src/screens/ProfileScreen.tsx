import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { MOCK_USER, MOCK_REVIEWS } from '../constants';

const ProfileScreen: React.FC = () => {
    const navigate = useNavigate();
    // Related food images for the personal grid
    const gridImages = [
        'https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=400&h=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&h=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400&h=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&h=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=400&h=400&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=400&h=400&auto=format&fit=crop'
    ];

    const [bio, setBio] = React.useState(MOCK_USER.bio || '');
    const [isEditingBio, setIsEditingBio] = React.useState(false);

    const handleSaveBio = () => {
        setIsEditingBio(false);
        // Here you would typically save to backend
    };

    return (
        <div className="flex-1 flex flex-col bg-black text-white pb-28">
            <header className="flex justify-between items-center px-4 py-4 sticky top-0 bg-black/95 backdrop-blur-md z-30 pt-safe">
                <span className="text-xl font-bold">Lecker<span className="text-[#f48c25]">_AR</span></span>
                <button
                    onClick={() => navigate('/settings')}
                    className="p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                    <span className="material-symbols-outlined text-2xl">settings</span>
                </button>
            </header>

            <main className="flex-1 p-4 space-y-6">
                {/* Profile Card */}
                <section className="bg-[#f48c25] rounded-[2.5rem] p-6 shadow-xl shadow-orange-500/10 relative overflow-hidden">
                    {/* Accent decoration */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="flex items-center space-x-5 mb-5 relative z-10">
                        <div className="w-20 h-20 rounded-full border-4 border-white/30 overflow-hidden shadow-lg bg-gray-800">
                            <img src={MOCK_USER.avatar} alt={MOCK_USER.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold">{MOCK_USER.handle}</h2>
                            <p className="text-white/80 text-sm font-medium">{MOCK_USER.stats.reviews} reseñas</p>
                        </div>
                    </div>

                    <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4 mb-6 relative z-10 group transition-all">
                        {isEditingBio ? (
                            <div className="space-y-2">
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full bg-black/30 border border-white/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-white/50 resize-none"
                                    rows={3}
                                    autoFocus
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setIsEditingBio(false)}
                                        className="text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleSaveBio}
                                        className="text-xs font-bold px-3 py-1.5 bg-white text-[#f48c25] rounded-lg shadow-lg"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <p className="text-sm text-white/90 italic leading-relaxed pr-6">
                                    "{bio}"
                                </p>
                                <button
                                    onClick={() => setIsEditingBio(true)}
                                    className="absolute top-0 right-0 p-1 opacity-50 hover:opacity-100 transition-opacity"
                                >
                                    <span className="material-icons-outlined text-sm">edit</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex space-x-3 relative z-10">
                        <div
                            onClick={() => navigate(`/user/${MOCK_USER.id}/list/followers`)}
                            className="bg-white/10 backdrop-blur-md rounded-2xl flex-1 py-3 flex flex-col items-center cursor-pointer hover:bg-white/20 transition-colors active:scale-95"
                        >
                            <span className="font-bold text-lg">{MOCK_USER.stats.followers}</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Seguidores</span>
                        </div>
                        <div
                            onClick={() => navigate(`/user/${MOCK_USER.id}/list/following`)}
                            className="bg-white/10 backdrop-blur-md rounded-2xl flex-1 py-3 flex flex-col items-center cursor-pointer hover:bg-white/20 transition-colors active:scale-95"
                        >
                            <span className="font-bold text-lg">{MOCK_USER.stats.following}</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Seguidos</span>
                        </div>
                    </div>
                </section>

                {/* Favorite Categories */}
                <section className="bg-surface-dark rounded-[2rem] p-6 border border-white/5">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Tus Preferencias</h3>
                    <div className="space-y-4">
                        {[
                            { label: 'Parrilla', pct: '40%', color: 'bg-orange-600' },
                            { label: 'Italiana', pct: '35%', color: 'bg-emerald-500' },
                            { label: 'Cafetería', pct: '25%', color: 'bg-[#f48c25]' }
                        ].map((cat, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-semibold">{cat.label}</span>
                                    <span className="text-gray-500">{cat.pct}</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${cat.color} transition-all duration-1000`} style={{ width: cat.pct }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Personal Grid */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Mis Reseñas</h3>
                        <button className="text-[#f48c25] text-xs font-bold">Ver todas</button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {MOCK_REVIEWS.filter(r => r.userId === MOCK_USER.id).map((review, i) => (
                            <div
                                key={review.id}
                                onClick={() => navigate(`/venue/${review.venueId}`)}
                                className="aspect-square bg-surface-dark rounded-2xl border border-white/5 overflow-hidden group cursor-pointer"
                            >
                                <img
                                    src={review.imageUrl}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    alt={review.dishName}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <BottomNav />
        </div>
    );
};

export default ProfileScreen;
