import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { MOCK_REVIEWS } from '../constants';

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col bg-black text-white overflow-hidden">
            {/* Header */}
            <header className="px-4 py-4 flex justify-between items-center sticky top-0 bg-black/95 backdrop-blur-md z-30 border-b border-white/5 pt-safe">
                <h1 className="text-xl font-bold tracking-tight italic font-display">Lecker<span className="text-[#f48c25] not-italic">_AR</span></h1>
                <button
                    onClick={() => navigate('/messaging')}
                    className="p-2 bg-surface-dark rounded-full text-white relative active:scale-90 transition-transform"
                >
                    <span className="material-icons-round text-xl">forum</span>
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#f48c25] rounded-full border-2 border-black"></span>
                </button>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar pb-24 pt-4">
                {/* Search Bar */}
                <div className="px-4 mb-6">
                    <div className="relative" onClick={() => navigate('/search')}>
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="material-icons-round text-gray-500">search</span>
                        </span>
                        <input
                            readOnly
                            className="w-full py-3.5 pl-10 pr-4 bg-surface-dark border border-white/5 rounded-2xl text-sm text-white placeholder-gray-500 cursor-pointer outline-none"
                            placeholder="¿Qué se te antoja hoy?"
                        />
                    </div>
                </div>

                {/* Map Section */}
                <div className="px-4 mb-8">
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-bold">Explorá el mapa</h2>
                        <button
                            onClick={() => navigate('/manage-locations')}
                            className="text-[10px] font-bold text-[#f48c25] uppercase tracking-wider flex items-center gap-1 bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20 active:scale-95 transition-transform"
                        >
                            <span className="material-icons-round text-xs">location_on</span>
                            Mis Ubicaciones
                        </button>
                    </div>
                    <div
                        onClick={() => navigate('/map')}
                        className="relative w-full h-44 rounded-[2.5rem] bg-surface-dark border border-white/5 overflow-hidden flex items-center justify-center group cursor-pointer shadow-inner active:scale-[0.98] transition-all"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop"
                            className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
                            alt="Map Background"
                        />
                        <span className="relative z-10 text-white font-semibold bg-black/50 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 text-sm">Ver Mapa Gastronómico</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                </div>

                {/* Favoritos de tus amigos Carousel - Resumen de alta fidelidad */}
                <div className="mb-8">
                    <div className="px-4 flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Favoritos de tus amigos</h3>
                    </div>
                    <div className="flex space-x-5 overflow-x-auto no-scrollbar px-4">
                        {MOCK_REVIEWS.map((review) => (
                            <div
                                key={review.id}
                                onClick={() => navigate(`/venue/v-cabrera`)}
                                className="min-w-[280px] bg-surface-dark rounded-[2.5rem] border border-white/5 overflow-hidden transition-all hover:border-white/20 active:scale-[0.98] shadow-lg relative"
                            >
                                <div className="h-44 relative overflow-hidden">
                                    <img src={review.imageUrl} className="w-full h-full object-cover" alt={review.dishName} />
                                    <div className="absolute top-4 right-4 bg-[#f48c25] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1">
                                        {review.score}
                                        <span className="material-symbols-outlined filled text-white text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                                    <div className="absolute bottom-4 left-5">
                                        <h4 className="text-white text-lg font-bold">{review.dishName}</h4>
                                        <p className="text-xs text-white/70 font-medium">{review.venueName} • {review.location}</p>
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col gap-3">
                                    <p className="text-xs text-gray-400 line-clamp-2 italic font-light">"{review.comment}"</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-1.5">
                                            {review.tags.slice(0, 2).map((t) => (
                                                <span key={t} className="text-[9px] px-2 py-0.5 bg-black/40 rounded-md text-[#baab9c] font-bold uppercase tracking-widest">{t}</span>
                                            ))}
                                        </div>
                                        {review.price && <span className="text-[#f48c25] font-bold text-sm">${review.price}</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nuevos cerca tuyo Carousel */}
                <div className="mb-8 pb-10">
                    <div className="px-4 flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Nuevos cerca tuyo</h3>
                        <button className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ver todos</button>
                    </div>
                    <div className="flex space-x-4 overflow-x-auto no-scrollbar px-4">
                        {[
                            { name: 'Sushi Club', loc: '0.4 km', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400&auto=format&fit=crop' },
                            { name: 'Panini Bar', loc: '0.9 km', img: 'https://images.unsplash.com/photo-1509722747041-619f382b73b5?q=80&w=400&auto=format&fit=crop' },
                            { name: 'The Roaster', loc: '1.2 km', img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400&auto=format&fit=crop' }
                        ].map((item, i) => (
                            <div
                                key={i}
                                onClick={() => navigate('/venue/v1')}
                                className="min-w-[160px] bg-surface-dark rounded-[2rem] border border-white/5 overflow-hidden active:scale-95 transition-transform cursor-pointer"
                            >
                                <div className="h-28 relative">
                                    <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                                    <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-[8px] font-bold px-2 py-0.5 rounded-full text-white">NUEVO</div>
                                </div>
                                <div className="p-3">
                                    <h4 className="text-xs font-bold truncate">{item.name}</h4>
                                    <p className="text-[10px] text-gray-500 mt-0.5">{item.loc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
};

export default HomeScreen;
