import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col bg-black text-white relative overflow-hidden min-h-screen">
            <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-[#f48c25]/10 blur-[120px] pointer-events-none"></div>

            <header className="p-6 relative z-10">
                <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            </header>

            <main className="flex-1 flex flex-col justify-center px-8 relative z-10 pb-20">
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold mb-3">¡Bienvenido!</h1>
                    <p className="text-gray-400">Ingresa tus datos para continuar explorando sabores.</p>
                </div>

                <div className="space-y-4">
                    <AuthInput icon="mail" placeholder="Correo electrónico" type="email" />
                    <AuthInput icon="lock" placeholder="Contraseña" type="password" />

                    <div className="text-right">
                        <button className="text-[#f48c25] text-xs font-semibold">¿Olvidaste tu contraseña?</button>
                    </div>

                    <button
                        onClick={() => navigate('/home')}
                        className="w-full py-4 rounded-2xl bg-[#f48c25] hover:bg-[#e07b1a] text-white font-bold shadow-lg shadow-orange-500/10 transition-all active:scale-[0.98] mt-4"
                    >
                        Iniciar Sesión
                    </button>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">¿No tienes una cuenta? <button onClick={() => navigate('/register')} className="text-white font-bold">Regístrate</button></p>
                </div>
            </main>
        </div>
    );
};

const AuthInput = ({ icon, placeholder, type }: { icon: string, placeholder: string, type: string }) => (
    <div className="relative flex items-center">
        <span className="absolute left-4 text-gray-500 material-symbols-outlined text-xl">{icon}</span>
        <input
            className="w-full rounded-2xl border border-white/5 bg-surface-dark py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:border-[#f48c25] outline-none transition-all"
            placeholder={placeholder}
            type={type}
        />
    </div>
);

export default LoginScreen;
