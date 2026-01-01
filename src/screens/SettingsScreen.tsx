import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // In a real app, clear auth state/tokens here
        navigate('/welcome');
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
                <h1 className="text-xl font-bold tracking-tight">Configuración</h1>
            </header>

            <main className="flex-1 p-4 space-y-2">

                {/* Section: Preferences */}
                <div className="space-y-1">
                    <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2 mb-2">Preferencias</h2>

                    <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors group">
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-zinc-400 group-hover:text-white transition-colors">dashboard</span>
                            <span className="font-medium">Disposición de inicio</span>
                        </div>
                        <span className="material-symbols-outlined text-zinc-500">chevron_right</span>
                    </button>
                </div>

                {/* Section: Account */}
                <div className="space-y-1 pt-4">
                    <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2 mb-2">Cuenta</h2>

                    <button
                        onClick={() => navigate('/manage-locations')}
                        className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors group"
                    >
                        <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-zinc-400 group-hover:text-[#f48c25] transition-colors">location_on</span>
                            <span className="font-medium">Mis Ubicaciones</span>
                        </div>
                        <span className="material-symbols-outlined text-zinc-500">chevron_right</span>
                    </button>
                </div>

                {/* Section: Session */}
                <div className="pt-8">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 p-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl transition-colors active:scale-[0.98]"
                    >
                        <span className="material-symbols-outlined">logout</span>
                        <span className="font-bold">Cerrar Sesión</span>
                    </button>
                </div>

                <div className="pt-8 text-center">
                    <p className="text-[10px] text-zinc-600 font-mono">Lecker AR v0.1.0-beta</p>
                </div>

            </main>
        </div>
    );
};

export default SettingsScreen;
