import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterScreen: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col bg-black text-white px-8 pt-safe pb-10 min-h-screen">
            <header className="py-6 mb-8 flex items-center gap-4">
                <button onClick={() => navigate('/')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-2xl font-bold">Crear Cuenta</h1>
            </header>

            <main className="space-y-5">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-20 h-20 bg-[#f48c25] rounded-3xl flex items-center justify-center rotate-3 shadow-lg">
                        <span className="material-icons-round text-white text-4xl">restaurant_menu</span>
                    </div>
                </div>

                <InputGroup label="Nombre completo" placeholder="Juan Pérez" />
                <InputGroup label="Nombre de usuario" placeholder="@shadowlynx" />
                <InputGroup label="Correo electrónico" placeholder="email@ejemplo.com" />
                <InputGroup label="Contraseña" placeholder="********" type="password" />

                <div className="pt-4">
                    <button
                        onClick={() => navigate('/add-location')}
                        className="w-full py-4 rounded-2xl bg-[#f48c25] hover:bg-[#e07b1a] text-white font-bold shadow-lg shadow-orange-500/10 transition-all mt-2 active:scale-95"
                    >
                        Unirse a Schmeckea
                    </button>
                </div>
            </main>
        </div>
    );
};

const InputGroup = ({ label, placeholder, type = 'text' }: any) => (
    <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-4">{label}</label>
        <input
            className="w-full rounded-2xl border border-white/5 bg-surface-dark py-4 px-6 text-white placeholder-gray-600 focus:border-[#f48c25] outline-none transition-all text-sm"
            placeholder={placeholder}
            type={type}
        />
    </div>
);

export default RegisterScreen;
