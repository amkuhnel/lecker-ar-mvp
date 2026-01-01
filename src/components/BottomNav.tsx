import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { id: 'home', icon: 'home', label: 'Inicio', path: '/home' },
        { id: 'search', icon: 'search', label: 'Explorar', path: '/search' },
        { id: 'add', icon: 'add', label: '', path: '/create', isFab: true },
        { id: 'activity', icon: 'notifications', label: 'Actividad', path: '/activity' },
        { id: 'profile', icon: 'person', label: 'Perfil', path: '/profile' },
    ];

    return (
        <nav className="fixed bottom-0 w-full max-w-md z-50 bg-[#121212]/95 backdrop-blur-xl border-t border-white/5 pb-safe">
            <div className="flex justify-around items-center h-16 px-2">
                {tabs.map((tab) => {
                    if (tab.isFab) {
                        return (
                            <div key={tab.id} className="relative -top-6">
                                <button
                                    onClick={() => navigate(tab.path)}
                                    className="flex items-center justify-center bg-[#f48c25] text-white rounded-full w-14 h-14 shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform border-4 border-black active:scale-90"
                                >
                                    <span className="material-icons-round text-3xl">add</span>
                                </button>
                            </div>
                        );
                    }

                    const isActive = location.pathname.includes(tab.path) || (tab.id === 'home' && location.pathname === '/home');

                    return (
                        <button
                            key={tab.id}
                            onClick={() => navigate(tab.path)}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive ? 'text-[#f48c25]' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            <div className="relative flex flex-col items-center">
                                <span className={`material-symbols-outlined text-[28px] ${isActive ? 'filled' : ''}`} style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                                    {tab.icon}
                                </span>
                                {tab.id === 'activity' && !isActive && (
                                    <div className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-[#f48c25] border border-black"></div>
                                )}
                            </div>
                            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
                        </button>
                    );
                })}
            </div>
            {/* iOS Home Indicator Spacing */}
            <div className="h-1 w-1/3 bg-white/10 rounded-full mx-auto mb-1"></div>
        </nav>
    );
};
