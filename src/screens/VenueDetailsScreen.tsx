import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { MOCK_VENUES, MOCK_REVIEWS } from '../constants';
import { BottomNav } from '../components/BottomNav';
import type { Review } from '../types';

const VenueDetailsScreen: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [reviews, setReviews] = React.useState<Review[]>([]);
    const [venue, setVenue] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchVenueData = async () => {
            try {
                // Fetch reviews for this venue to display and to infer venue details
                // We need to implement a filter by venueId in the API or just client side filter for now if API doesn't support it
                // Actually our API supports userId, but let's assume we can fetch all and filter or add support.
                // For MVP reliability let's just fetch all reviews and filter client side
                const res = await fetch('/api/reviews');
                const data = await res.json();

                if (data.success) {
                    // Filter for this venueId
                    const venueReviews = data.data.filter((r: any) => r.venueId === id || r.venueName === id); // Handle flexible matching
                    setReviews(venueReviews);

                    if (venueReviews.length > 0) {
                        // Infer venue details from first review
                        const first = venueReviews[0];
                        setVenue({
                            id: id,
                            name: first.venueName,
                            location: first.location?.address || 'Ubicación desconocida',
                            category: first.category || 'Restaurante',
                            priceRange: first.price || '$$'
                        });
                    } else {
                        // If no reviews, we can't show much unless we have a venues API
                        // Fallback/Empty state handled below
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchVenueData();
    }, [id]);

    if (isLoading) {
        return <div className="flex-1 flex items-center justify-center bg-[#221910] text-white">Cargando...</div>;
    }

    if (!venue) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#221910] text-white p-6 text-center">
                <span className="material-symbols-outlined text-4xl mb-4 text-zinc-500">store_off</span>
                <p className="font-bold text-lg">Lugar no encontrado</p>
                <p className="text-sm text-zinc-400 mt-2 mb-6">Nadie ha reseñado este lugar (o no existe).</p>
                <button onClick={() => navigate(-1)} className="text-[#f48c25] font-bold">Volver atrás</button>
                <div className="mt-8"><BottomNav /></div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-[#221910] text-white font-display min-h-screen pb-32 relative overflow-x-hidden antialiased">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-[#221910]/95 backdrop-blur-md border-b border-white/5 p-4 flex items-center justify-between pt-safe">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors active:scale-90"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-base font-black tracking-widest uppercase">Reseñas</h1>
                <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors active:scale-90">
                    <span className="material-symbols-outlined">share</span>
                </button>
            </header>

            <main className="flex-1 overflow-y-auto no-scrollbar">
                {/* Venue Hero Section */}
                <div className="px-6 pt-8 pb-4">
                    <h2 className="text-4xl font-black leading-tight mb-2 drop-shadow-sm">{venue.name}</h2>
                    <div className="flex items-center gap-2 text-[#baab9c] mb-6">
                        <span className="material-symbols-outlined text-lg">location_on</span>
                        <p className="text-xs font-bold tracking-tight">{venue.location}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center justify-center px-5 py-2 rounded-2xl bg-[#393028] border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-300">
                            {venue.category}
                        </span>
                        <span className="inline-flex items-center justify-center px-4 py-2 rounded-2xl bg-[#f48c25]/10 border border-[#f48c25]/20 text-[10px] font-black uppercase tracking-widest text-[#f48c25]">
                            {venue.priceRange}
                        </span>
                    </div>
                </div>

                {/* Global Venue Stats */}
                <div className="grid grid-cols-2 gap-4 px-6 py-6">
                    <StatBox label="Atención" value={4.8} percent="96%" icon="room_service" />
                    <StatBox label="Ambiente" value={4.5} percent="90%" icon="deck" />
                </div>

                <div className="px-6 pt-4 pb-2">
                    <div className="h-px bg-white/5 w-full"></div>
                </div>

                {/* Section Title */}
                <div className="flex items-center justify-between px-6 pt-6 pb-6">
                    <h3 className="text-xl font-black tracking-tight">Veredictos de la comunidad</h3>
                    <button className="flex items-center justify-center size-10 rounded-full bg-white/5 text-[#f48c25] active:scale-90 transition-transform">
                        <span className="material-symbols-outlined text-xl">filter_list</span>
                    </button>
                </div>

                {/* Reviews List as Full Summary Cards */}
                <div className="flex flex-col gap-10 px-6 pb-20">
                    <div className="flex flex-col gap-10 px-6 pb-20">
                        {reviews.map((rev) => (
                            <ReviewSummaryCard key={rev.id || rev._id} review={rev} />
                        ))}
                    </div>
                </div>
            </main>

            {/* Floating Action Button */}
            <div className="fixed bottom-28 right-6 z-40">
                <button
                    onClick={() => navigate('/create')}
                    className="flex items-center gap-3 bg-[#f48c25] hover:bg-orange-600 text-white pl-5 pr-7 py-4 rounded-[2rem] shadow-[0_10px_30px_rgba(244,140,37,0.4)] transition-all active:scale-95 border border-white/10"
                >
                    <span className="material-symbols-outlined text-2xl">edit_note</span>
                    <span className="font-black text-sm uppercase tracking-widest">Reseñar Plato</span>
                </button>
            </div>

            <BottomNav />
        </div>
    );
};

const StatBox = ({ label, value, percent, icon }: any) => (
    <div className="bg-[#393028] p-5 rounded-[2rem] border border-white/5 flex flex-col justify-between gap-3 shadow-2xl">
        <div className="flex items-center gap-2 text-[#f48c25]">
            <span className="material-symbols-outlined text-lg">{icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{label}</span>
        </div>
        <div className="flex items-end justify-between">
            <span className="text-3xl font-black">{value.toFixed(1)}</span>
            <span className="text-[10px] font-bold text-zinc-500 mb-1.5 uppercase">/ 5.0</span>
        </div>
        <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden mt-1 shadow-inner">
            <div className="bg-[#f48c25] h-full rounded-full shadow-[0_0_8px_#f48c25]" style={{ width: percent }}></div>
        </div>
    </div>
);

// Added React.FC type to handle 'key' prop in lists correctly in strict TypeScript environments
const ReviewSummaryCard: React.FC<{ review: Review }> = ({ review }) => {
    const navigate = useNavigate();
    return (
        <article className="flex flex-col gap-5 animate-fade-in">
            {/* User Branding */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-4">
                    <div className="relative cursor-pointer" onClick={(e) => { e.stopPropagation(); navigate(`/user/${review.userId}`); }}>
                        <img
                            src={review.userAvatar}
                            className="size-12 rounded-full object-cover border-2 border-[#221910] ring-2 ring-[#f48c25]/30 shadow-lg"
                            alt={review.userName}
                        />
                        <div className="absolute -bottom-1 -right-1 size-5 bg-[#f48c25] rounded-full border-2 border-[#221910] flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[10px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        </div>
                    </div>
                    <div className="flex flex-col cursor-pointer" onClick={(e) => { e.stopPropagation(); navigate(`/user/${review.userId}`); }}>
                        <span className="text-sm font-black leading-none hover:text-[#f48c25] transition-colors">{review.userName}</span>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{review.timestamp}</span>
                    </div>
                </div>
                <button className="size-10 flex items-center justify-center rounded-full bg-white/5 active:scale-90 transition-transform">
                    <span className="material-symbols-outlined text-zinc-500">more_horiz</span>
                </button>
            </div>

            {/* The High-Fidelity Experience Summary Card */}
            <div className="w-full bg-[#121212] rounded-[3rem] p-6 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                <div className="aspect-[4/3] bg-zinc-900 rounded-[2.5rem] mb-5 overflow-hidden relative border border-white/5 shadow-inner cursor-pointer">
                    <img
                        src={review.imageUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        alt={review.dishName}
                    />
                    <div className="absolute top-5 right-5 bg-[#f48c25] px-4 py-2 rounded-2xl font-black text-xl shadow-2xl flex items-center gap-1.5 border border-white/10">
                        {review.score.toFixed(1)}
                        <span className="material-symbols-outlined filled text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-90"></div>
                    <div className="absolute bottom-5 left-6 pr-4">
                        <h4 className="text-white text-2xl font-black drop-shadow-xl leading-tight">{review.dishName}</h4>
                        <p className="text-[#f48c25] text-[10px] font-black uppercase tracking-widest mt-1">{review.category}</p>
                    </div>
                </div>

                <div className="space-y-6 px-1">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                            <p className="text-zinc-300 text-sm leading-relaxed italic font-medium pr-2">
                                "{review.comment}"
                            </p>
                        </div>
                        {review.price && (
                            <div className="flex flex-col items-end">
                                <span className="text-[#f48c25] font-black text-xl">${review.price}</span>
                                <span className="text-[10px] text-zinc-600 font-black uppercase tracking-tighter">Inversión</span>
                            </div>
                        )}
                    </div>

                    <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap max-w-[60%]">
                            {review.tags.map((t: string) => (
                                <span key={t} className="text-[9px] px-3 py-1.5 bg-[#2d241c] rounded-xl text-[#baab9c] border border-white/5 font-black uppercase tracking-widest">
                                    {t}
                                </span>
                            ))}
                        </div>
                        {/* Characteristic Indicators */}
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-zinc-200 font-black text-sm">{review.serviceScore?.toFixed(1) || '5.0'}</span>
                                <span className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter">Service</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-zinc-200 font-black text-sm">{review.ambianceScore?.toFixed(1) || '4.5'}</span>
                                <span className="text-[8px] text-zinc-600 font-black uppercase tracking-tighter">Ambient</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Interactions */}
            <div className="flex items-center gap-8 px-6">
                <button className="flex items-center gap-2 text-zinc-500 hover:text-[#f48c25] transition-all group/like">
                    <span className="material-symbols-outlined filled text-[#f48c25] group-hover/like:scale-125 transition-transform drop-shadow-[0_0_8px_rgba(244,140,37,0.3)]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                    <span className="text-sm font-black text-white">{review.likes || 12}</span>
                </button>
                <button className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all group/msg">
                    <span className="material-symbols-outlined group-hover/msg:rotate-12 transition-transform">chat_bubble</span>
                    <span className="text-sm font-black text-white">4 Respuestas</span>
                </button>
            </div>
        </article>
    );
};

export default VenueDetailsScreen;
