import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddLocationScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/home');
    };

    return (
        <div className="flex-1 flex flex-col bg-black text-white h-screen overflow-hidden antialiased">
            {/* iOS-style Status Bar Mockup space (approx) */}
            <div className="w-full h-8 flex justify-between items-center px-6 pt-2 bg-black z-50 shrink-0">
                <span className="text-xs font-semibold text-white">9:41</span>
                <div className="flex gap-1.5 items-center text-white">
                    <span className="material-icons-round text-[12px]">signal_cellular_alt</span>
                    <span className="material-icons-round text-[12px]">wifi</span>
                    <span className="material-icons-round text-[12px]">battery_full</span>
                </div>
            </div>

            <header className="flex items-center justify-between px-4 py-3 bg-black sticky top-0 z-40 border-b border-white/10 shrink-0">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-surface-dark transition-colors"
                >
                    <span className="material-icons-round text-2xl text-white">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold tracking-tight text-white">Agregar Ubicación</h1>
                <div className="p-2 w-10"></div>
            </header>

            <main className="flex-1 overflow-y-auto px-6 py-4 pb-32 bg-black no-scrollbar">
                <div className="mb-8 text-center">
                    <div className="w-16 h-16 bg-[#f48c25]/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#f48c25]/20">
                        <span className="material-icons-round text-[#f48c25] text-3xl">add_location_alt</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 text-white">Define tu punto de partida</h2>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto font-light">
                        Establece una ubicación de referencia (como tu casa o trabajo) para encontrar las mejores recomendaciones gastronómicas cerca de ti.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSave}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300 ml-1" htmlFor="locationName">
                            Nombre del lugar
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-icons-round text-gray-500 group-focus-within:text-[#f48c25] transition-colors">label</span>
                            </div>
                            <input
                                className="block w-full pl-12 pr-4 py-3.5 bg-surface-dark border border-white/10 rounded-xl focus:ring-1 focus:ring-[#f48c25] focus:border-[#f48c25] text-white placeholder-gray-500 transition-all shadow-sm outline-none"
                                id="locationName"
                                placeholder="Ej. Casa, Trabajo, Gimnasio"
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300 ml-1" htmlFor="address">
                            Dirección exacta
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-icons-round text-gray-500 group-focus-within:text-[#f48c25] transition-colors">search</span>
                            </div>
                            <input
                                className="block w-full pl-12 pr-12 py-3.5 bg-surface-dark border border-white/10 rounded-xl focus:ring-1 focus:ring-[#f48c25] focus:border-[#f48c25] text-white placeholder-gray-500 transition-all shadow-sm outline-none"
                                id="address"
                                placeholder="Buscar calle, número..."
                                type="text"
                            />
                            <button className="absolute inset-y-0 right-0 pr-4 flex items-center" type="button">
                                <span className="material-icons-round text-[#f48c25] hover:text-[#e07b1a]">my_location</span>
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 ml-1 flex items-center gap-1 font-medium">
                            <span className="material-icons-round text-[14px]">info</span>
                            Se usará para calcular distancias en el feed.
                        </p>
                    </div>

                    <div className="mt-6 rounded-xl overflow-hidden border border-white/10 shadow-sm relative h-48 w-full bg-surface-dark">
                        <img
                            alt="Map Preview"
                            className="w-full h-full object-cover opacity-30 filter grayscale invert"
                            src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=800&auto=format&fit=crop"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="relative -mt-8">
                                <span className="material-icons-round text-[#f48c25] text-4xl drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">location_on</span>
                                <div className="w-3 h-1.5 bg-black/50 rounded-full blur-[2px] absolute bottom-1 left-1/2 -translate-x-1/2"></div>
                            </div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm rounded-lg p-1.5 shadow-md border border-white/10">
                            <span className="material-icons-round text-gray-300 text-xl block">layers</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Sugerencias rápidas</span>
                        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark border border-white/10 rounded-full hover:border-[#f48c25]/50 text-sm font-medium text-gray-200 transition-colors whitespace-nowrap active:bg-[#f48c25]/20" type="button">
                                <span className="material-icons-round text-sm text-[#f48c25]">home</span> Casa
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark border border-white/10 rounded-full hover:border-[#f48c25]/50 text-sm font-medium text-gray-200 transition-colors whitespace-nowrap active:bg-[#f48c25]/20" type="button">
                                <span className="material-icons-round text-sm text-[#f48c25]">work</span> Trabajo
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-surface-dark border border-white/10 rounded-full hover:border-[#f48c25]/50 text-sm font-medium text-gray-200 transition-colors whitespace-nowrap active:bg-[#f48c25]/20" type="button">
                                <span className="material-icons-round text-sm text-[#f48c25]">fitness_center</span> Gym
                            </button>
                        </div>
                    </div>
                </form>
            </main>

            <div className="fixed bottom-0 w-full p-6 bg-black border-t border-white/10 z-50 max-w-md mx-auto">
                <button
                    onClick={handleSave}
                    className="w-full bg-[#f48c25] hover:bg-[#e07b1a] text-white font-bold text-base py-4 rounded-xl shadow-lg shadow-[#f48c25]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <span>Guardar Ubicación</span>
                    <span className="material-icons-round text-lg">check</span>
                </button>
            </div>
        </div>
    );
};

export default AddLocationScreen;
