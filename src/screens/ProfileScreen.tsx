import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
// import { MOCK_USER, MOCK_REVIEWS } from '../constants';

const ProfileScreen: React.FC = () => {
    const navigate = useNavigate();
    // Related food images for the personal grid
    // Related food images for the personal grid
    // const gridImages removed as unused

    const [user, setUser] = React.useState<any>(null);
    const [reviews, setReviews] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [bio, setBio] = React.useState('');

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Users
                const userRes = await fetch('/api/users');
                const userData = await userRes.json();

                if (userData.success && userData.data.length > 0) {
                    // For MVP demo, just take the first user found in DB
                    let currentUser = userData.data[0];
                    // Normalize _id to id
                    currentUser.id = currentUser._id || currentUser.id;
                    setUser(currentUser);
                    setBio(currentUser.bio || '');

                    // Fetch Reviews for this user
                    const reviewRes = await fetch(`/api/reviews?userId=${currentUser.id}`);
                    const reviewData = await reviewRes.json();

                    if (reviewData.success) {
                        setReviews(reviewData.data);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const [isEditingBio, setIsEditingBio] = React.useState(false);

    const handleSaveBio = () => {
        setIsEditingBio(false);
        // Here you would typically save to backend
    };

    if (!user && !isLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-black text-white p-6 text-center">
                <span className="material-symbols-outlined text-6xl text-zinc-700 mb-4">person_off</span>
                <h2 className="text-xl font-bold mb-2">No se encontró perfil</h2>
                <p className="text-zinc-400 mb-6 max-w-xs">No hay datos en la base de datos todavía. ¡Crea tu primer usuario!</p>
                <button
                    onClick={() => {
                        // Temporary quick creation for demo
                        fetch('/api/users', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: "Nuevo Usuario",
                                handle: "usuario_nuevo",
                                email: `demo${Date.now()}@test.com`,
                                bio: "¡Hola! Estoy usando Lecker AR."
                            })
                        }).then(() => window.location.reload());
                    }}
                    className="bg-[#f48c25] text-white font-bold py-3 px-6 rounded-xl hover:bg-orange-600 transition-colors"
                >
                    Crear Usuario Demo
                </button>
                <div className="mt-4">
                    <BottomNav />
                </div>
            </div>
        );
    }

    if (!user) return null; // Should be handled by loading or empty state above

    return (
        <div className="flex-1 flex flex-col bg-black text-white pb-28">
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-[#f48c25] border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
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
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-extrabold">{user.handle}</h2>
                            <p className="text-white/80 text-sm font-medium">{user.stats?.reviews || 0} reseñas</p>
                            {user.role === 'admin' && (
                                <button
                                    onClick={() => navigate('/admin')}
                                    className="mt-2 text-[10px] bg-red-600 text-white px-3 py-1 rounded-full uppercase font-bold tracking-widest shadow-lg"
                                >
                                    Panel Admin
                                </button>
                            )}
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
                            onClick={() => navigate(`/user/${user.id}/list/followers`)}
                            className="bg-white/10 backdrop-blur-md rounded-2xl flex-1 py-3 flex flex-col items-center cursor-pointer hover:bg-white/20 transition-colors active:scale-95"
                        >
                            <span className="font-bold text-lg">{user.stats?.followers || 0}</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Seguidores</span>
                        </div>
                        <div
                            onClick={() => navigate(`/user/${user.id}/list/following`)}
                            className="bg-white/10 backdrop-blur-md rounded-2xl flex-1 py-3 flex flex-col items-center cursor-pointer hover:bg-white/20 transition-colors active:scale-95"
                        >
                            <span className="font-bold text-lg">{user.stats?.following || 0}</span>
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
                        {reviews.filter((r: any) => r.userId === (user.id || user._id) || r.userId?._id === (user.id || user._id)).map((review: any) => (
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
