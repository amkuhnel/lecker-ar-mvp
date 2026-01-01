import React from 'react';
import { useNavigate } from 'react-router-dom';

const MapScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col bg-black text-white h-screen overflow-hidden antialiased font-display">
            <header className="absolute top-0 w-full z-50 flex items-center justify-between px-4 py-4 pt-safe pointer-events-none">
                <button
                    onClick={() => navigate('/home')}
                    className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 pointer-events-auto active:scale-90 transition-transform"
                >
                    <span className="material-icons-round">arrow_back</span>
                </button>
                <div className="bg-black/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/10 pointer-events-auto">
                    <h1 className="text-sm font-bold tracking-tight">Mapa Gastronómico</h1>
                </div>
                <button className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10 pointer-events-auto">
                    <span className="material-icons-round">my_location</span>
                </button>
            </header>

            {/* Map Content (Simulated) */}
            <div className="flex-1 relative bg-zinc-900">
                <img
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
                    className="w-full h-full object-cover opacity-50 grayscale invert"
                    alt="Map Grid"
                />

                {/* Custom Map Pins */}
                <MapPin top="30%" left="40%" price="$$" type="restaurant" onClick={() => { }} />
                <MapPin top="50%" left="20%" price="$$$" type="local_bar" onClick={() => { }} />
                <MapPin top="45%" left="70%" price="$" type="coffee" onClick={() => { }} />
                <MapPin top="65%" left="55%" price="$$" type="restaurant" onClick={() => { }} />

                {/* Floating Search in Map */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[85%] z-10">
                    <div className="flex items-center gap-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl">
                        <span className="material-icons-round text-gray-400">search</span>
                        <input
                            type="text"
                            placeholder="¿Qué buscás cerca?"
                            className="bg-transparent border-none outline-none text-sm w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Panel (Quick Glance) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] bg-[#241e19] border border-white/10 rounded-[2.5rem] p-4 shadow-2xl flex gap-4 items-center">
                <div className="w-20 h-20 rounded-2xl bg-zinc-800 overflow-hidden shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=200&auto=format&fit=crop"
                        className="w-full h-full object-cover"
                        alt="Venue Preview"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-sm truncate">La Cabrera</h3>
                        <span className="text-[#ee7c2b] text-[10px] font-bold">4.8 ★</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mb-2 truncate">Parrilla • Palermo Soho</p>
                    <button
                        onClick={() => navigate('/venue/v-cabrera')}
                        className="w-full bg-[#ee7c2b] text-white text-[10px] font-bold py-2 rounded-xl active:scale-95 transition-transform"
                    >
                        Ver detalles del local
                    </button>
                </div>
            </div>
        </div>
    );
};

const MapPin = ({ top, left, price, type, onClick }: any) => (
    <div
        className="absolute flex flex-col items-center group cursor-pointer"
        style={{ top, left }}
        onClick={onClick}
    >
        <div className="bg-[#ee7c2b] px-2 py-1 rounded-lg text-[10px] font-black shadow-lg mb-1 group-hover:scale-110 transition-transform">
            {price}
        </div>
        <div className="w-8 h-8 rounded-full bg-black border-2 border-[#ee7c2b] flex items-center justify-center shadow-lg">
            <span className="material-icons-round text-xs text-[#ee7c2b]">{type}</span>
        </div>
    </div>
);

export default MapScreen;
