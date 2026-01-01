import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManageLocationsScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col bg-black text-white font-display antialiased overflow-hidden h-screen">
            <header className="shrink-0 flex items-center bg-black p-4 pb-2 justify-between border-b border-white/5 sticky top-0 z-50 pt-safe">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white flex size-10 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
                </button>
                <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center truncate px-2">
                    Mis Ubicaciones
                </h2>
                <button className="flex w-12 items-center justify-end group">
                    <p className="text-gray-400 group-active:text-[#ee7c2b] text-base font-bold leading-normal tracking-[0.015em] shrink-0 transition-colors">
                        Editar
                    </p>
                </button>
            </header>

            <main className="flex-1 overflow-y-auto w-full max-w-md mx-auto px-4 py-4 space-y-4 no-scrollbar pb-32">
                <div className="bg-[#ee7c2b]/10 border border-[#ee7c2b]/20 rounded-xl p-4 flex gap-3 items-start">
                    <span className="material-symbols-outlined text-[#ee7c2b] shrink-0 mt-0.5">info</span>
                    <div className="text-sm text-gray-300 leading-relaxed font-light">
                        Selecciona una ubicación activa para ver recomendaciones cercanas y personalizar tu experiencia gastronómica.
                    </div>
                </div>

                <div className="pt-2 pb-1">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500">Ubicación Actual</h3>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-[#241e19] border border-[#ee7c2b]/50 shadow-[0_0_15px_rgba(238,124,43,0.15)] group transition-all">
                    <div className="absolute top-0 right-0 p-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#ee7c2b]/20 px-2 py-0.5 text-xs font-medium text-[#ee7c2b] border border-[#ee7c2b]/30">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ee7c2b] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ee7c2b]"></span>
                            </span>
                            Activa
                        </span>
                    </div>
                    <div className="flex items-center gap-4 p-4">
                        <div className="flex items-center justify-center rounded-xl bg-[#ee7c2b] text-white shrink-0 size-12 shadow-lg shadow-[#ee7c2b]/30">
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>home</span>
                        </div>
                        <div className="flex flex-col justify-center flex-1 min-w-0 mr-12">
                            <p className="text-white text-base font-bold leading-normal truncate">Casa</p>
                            <p className="text-gray-400 text-sm font-normal leading-normal truncate">Av. Corrientes 1234, CABA</p>
                        </div>
                    </div>
                </div>

                <div className="pt-4 pb-1 flex justify-between items-end">
                    <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500">Guardadas</h3>
                </div>

                <LocationItem icon="work" name="Oficina" address="Av. del Libertador 5600, CABA" />
                <LocationItem icon="fitness_center" name="Gym" address="Calle Falsa 123, CABA" />
                <LocationItem icon="favorite" name="Casa de Papás" address="Belgrano 450, San Isidro" />
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto">
                <div className="h-12 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
                <div className="bg-black px-4 pb-8 pt-2 flex justify-center w-full">
                    <button
                        onClick={() => navigate('/add-location')}
                        className="w-full flex items-center justify-center gap-2 overflow-hidden rounded-xl h-14 bg-[#ee7c2b] text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-[#ee7c2b]/40 active:scale-[0.98] transition-all hover:bg-orange-600"
                    >
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>add_location_alt</span>
                        <span className="truncate">Añadir Nueva Ubicación</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const LocationItem = ({ icon, name, address }: { icon: string, name: string, address: string }) => (
    <div className="relative flex flex-col rounded-xl bg-[#241e19] shadow-sm border border-white/5 overflow-hidden transition-colors active:scale-[0.98]">
        <div className="flex items-center gap-4 p-4 pr-3">
            <div className="flex items-center justify-center rounded-xl bg-[#392f28] text-white shrink-0 size-12">
                <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{icon}</span>
            </div>
            <div className="flex flex-col justify-center flex-1 min-w-0">
                <p className="text-white text-base font-medium leading-normal truncate">{name}</p>
                <p className="text-gray-400 text-sm font-normal leading-normal truncate">{address}</p>
            </div>
            <div className="shrink-0 flex items-center gap-2">
                <button className="size-9 flex items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
                </button>
                <button className="h-9 px-3 flex items-center justify-center rounded-lg bg-[#ee7c2b]/10 text-[#ee7c2b] text-sm font-semibold">
                    Activar
                </button>
            </div>
        </div>
    </div>
);

export default ManageLocationsScreen;
