import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col items-center justify-between p-6 bg-black relative overflow-hidden h-screen">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] to-black -z-10"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#f48c25]/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="flex-1 flex flex-col items-center justify-center fade-in">
                <div className="relative mb-10 group">
                    <div className="absolute inset-0 bg-[#f48c25]/30 blur-2xl opacity-40 rounded-full"></div>
                    <div className="w-24 h-24 bg-gradient-to-br from-[#262626] to-black border border-[#262626] rounded-3xl flex items-center justify-center shadow-2xl">
                        <span className="material-icons-round text-[#f48c25] text-5xl">restaurant</span>
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-tight">LECKER<span className="text-[#f48c25]">_AR</span></h1>
                    <p className="text-gray-400 text-base max-w-[280px] mx-auto leading-relaxed font-light">
                        Descubre sabores, comparte experiencias y encuentra tu próximo plato favorito.
                    </p>
                </div>
            </div>

            <div className="w-full space-y-4 mb-6 fade-in">
                <button
                    onClick={() => navigate('/login')}
                    className="w-full group bg-[#f48c25] hover:bg-[#e07b1a] text-white font-bold py-4 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                    <span>Iniciar Sesión</span>
                    <span className="material-icons-round text-sm">arrow_forward</span>
                </button>
                <button
                    onClick={() => navigate('/register')}
                    className="w-full bg-transparent hover:bg-white/5 text-white border border-[#262626] font-medium py-4 px-6 rounded-2xl transition-all"
                >
                    Crear una cuenta
                </button>
            </div>
        </div>
    );
};

export default WelcomeScreen;
