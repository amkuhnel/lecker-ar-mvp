import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if it's the admin login attempt
        if (email === 'admin@lecker.com' && password === 'Santa189.') {
            // For MVP, we simulated auth in memory or via simple API check
            // Ideally call /api/login/admin
            localStorage.setItem('user_role', 'admin');
            navigate('/admin');
            setIsLoading(false);
            return;
        }

        // Standard user login (existing logic)
        // For MVP we just check if user exists or create one
        // ... logic to find user by email ...

        // For now, simpler redirection for demo users:
        navigate('/home');
        setIsLoading(false);
    };

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
                    <div className="bg-white/5 rounded-xl border border-white/10 px-4 py-3 flex items-center gap-3">
                        <span className="material-symbols-outlined text-zinc-500">mail</span>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className="bg-transparent text-white w-full border-none outline-none placeholder:text-zinc-600 font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="bg-white/5 rounded-xl border border-white/10 px-4 py-3 flex items-center gap-3">
                        <span className="material-symbols-outlined text-zinc-500">lock</span>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="bg-transparent text-white w-full border-none outline-none placeholder:text-zinc-600 font-medium"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="text-right">
                        <button className="text-[#f48c25] text-xs font-semibold">¿Olvidaste tu contraseña?</button>
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full py-4 rounded-2xl bg-[#f48c25] hover:bg-[#e07b1a] text-white font-bold shadow-lg shadow-orange-500/10 transition-all active:scale-[0.98] mt-4"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">¿No tienes una cuenta? <button onClick={() => navigate('/register')} className="text-white font-bold">Regístrate</button></p>
                </div>
            </main>
        </div>
    );
};

// AuthInput component removed as it was unused and replaced by inline inputs
export default LoginScreen;
