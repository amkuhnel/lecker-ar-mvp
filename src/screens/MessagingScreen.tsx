import React from 'react';
import { useNavigate } from 'react-router-dom';

const MessagingScreen: React.FC = () => {
    const navigate = useNavigate();

    const [filter, setFilter] = React.useState<'all' | 'unread' | 'requests'>('all');

    const chatItems = [
        {
            id: 1,
            name: 'Sofía Martínez',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
            message: '¿Probaste la pasta en ese lugar nuevo que abrió en Palermo?',
            time: '10 min',
            isUnread: true,
            isOnline: true,
            isRequest: false
        },
        {
            id: 2,
            name: 'Juan Pérez',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
            message: 'Dale, nos vemos a las 8 PM en la puerta.',
            time: '2 h',
            isUnread: false,
            isRequest: false
        },
        {
            id: 3,
            name: 'GastroGuide BA',
            avatar: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=200&h=200&auto=format&fit=crop',
            message: '¡Gracias por tu reseña! Te destacamos en nuestra historia.',
            time: 'Ayer',
            isUnread: false,
            isVerified: true,
            isRequest: false
        },
        {
            id: 4,
            name: 'Lucas Silva',
            avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&h=200&auto=format&fit=crop',
            message: 'Te mandé la ubicación del bar.',
            time: 'Mar 12',
            isUnread: false,
            isRequest: false
        },
        {
            id: 5,
            name: 'Valentina R.',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop',
            message: '¿Al final vamos a comer sushi?',
            time: 'Mar 10',
            isUnread: false,
            isRequest: false
        },
        {
            id: 6,
            name: 'Martín Gomez',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
            message: 'Hola! Vi que te gusta la comida italiana...',
            time: 'Ahora',
            isUnread: true,
            isRequest: true
        }
    ];

    const filteredChats = chatItems.filter(item => {
        if (filter === 'unread') return item.isUnread;
        if (filter === 'requests') return item.isRequest;
        return true;
    });

    return (
        <div className="flex-1 flex flex-col bg-[#221910] font-display text-white min-h-screen pb-24">
            {/* Top App Bar with Back Button */}
            <header className="sticky top-0 z-20 bg-[#221910]/95 backdrop-blur-md px-4 py-3 border-b border-white/5 pt-safe flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/5 transition-colors active:scale-90"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-2xl font-bold tracking-tight">Mensajería</h1>
                </div>
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f27f0d]/10 text-[#f27f0d] active:bg-[#f27f0d]/20 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">edit_square</span>
                </button>
            </header>

            {/* Search Bar */}
            <div className="px-4 py-3">
                <div className="relative flex w-full items-center">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-white/40">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input
                        className="block w-full rounded-full border-none bg-[#2f261f] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#f27f0d] focus:ring-opacity-50 transition-all outline-none"
                        placeholder="Buscar chats o usuarios..."
                        type="text"
                    />
                </div>
            </div>

            {/* Filter Chips */}
            <div className="px-4 pb-2">
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`flex h-8 shrink-0 items-center justify-center rounded-full px-5 transition-transform active:scale-95 ${filter === 'all' ? 'bg-[#f27f0d] text-white' : 'bg-[#2f261f] text-white/80 hover:bg-[#3d3229]'}`}
                    >
                        <span className="text-sm font-semibold">Todos</span>
                    </button>
                    <button
                        onClick={() => setFilter('unread')}
                        className={`flex h-8 shrink-0 items-center justify-center rounded-full px-5 transition-transform active:scale-95 ${filter === 'unread' ? 'bg-[#f27f0d] text-white' : 'bg-[#2f261f] text-white/80 hover:bg-[#3d3229]'}`}
                    >
                        <span className="text-sm font-medium">No leídos</span>
                    </button>
                    <button
                        onClick={() => setFilter('requests')}
                        className={`flex h-8 shrink-0 items-center justify-center rounded-full px-5 transition-transform active:scale-95 ${filter === 'requests' ? 'bg-[#f27f0d] text-white' : 'bg-[#2f261f] text-white/80 hover:bg-[#3d3229]'}`}
                    >
                        <span className="text-sm font-medium">Solicitudes</span>
                        {chatItems.filter(c => c.isRequest).length > 0 && (
                            <span className={`ml-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold ${filter === 'requests' ? 'bg-white text-[#f27f0d]' : 'bg-[#f27f0d] text-white'}`}>
                                {chatItems.filter(c => c.isRequest).length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Chat List */}
            <div className="flex flex-col mt-2 flex-1 overflow-y-auto no-scrollbar">
                {filteredChats.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => navigate(`/chat/${item.id}`)}
                        className="group flex items-center gap-4 px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer border-b border-dashed border-white/5 last:border-0"
                    >
                        <div className="relative shrink-0">
                            <div
                                className="h-14 w-14 rounded-full bg-slate-800 bg-cover bg-center border border-white/10"
                                style={{ backgroundImage: `url('${item.avatar}')` }}
                            ></div>
                            {item.isOnline && (
                                <div className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#221910] bg-green-500"></div>
                            )}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <div className="flex items-center gap-1 min-w-0">
                                    <h3 className={`text-base truncate pr-2 ${item.isUnread ? 'font-bold' : 'font-semibold'}`}>
                                        {item.name}
                                    </h3>
                                    {item.isVerified && (
                                        <span className="material-symbols-outlined text-[16px] text-[#f27f0d] shrink-0">verified</span>
                                    )}
                                </div>
                                <span className={`text-xs shrink-0 ${item.isUnread ? 'text-[#f27f0d] font-bold' : 'text-white/40'}`}>
                                    {item.time}
                                </span>
                            </div>
                            <div className="flex justify-between items-center gap-2">
                                <p className={`text-sm truncate pr-2 ${item.isUnread ? 'font-medium text-white' : 'text-white/60'}`}>
                                    {item.message}
                                </p>
                                {item.isUnread && (
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#f27f0d] shrink-0 shadow-[0_0_8px_#f27f0d]"></div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <div className="mt-8 px-8 py-8 flex flex-col items-center justify-center text-center opacity-40">
                    <div className="h-16 w-16 rounded-full bg-[#2f261f] flex items-center justify-center mb-3">
                        <span className="material-symbols-outlined text-[32px] text-white/30">restaurant</span>
                    </div>
                    <p className="text-sm text-white/40 max-w-[200px]">Conectá con más foodies cerca tuyo para descubrir nuevos sabores.</p>
                </div>
            </div>
        </div>
    );
};

export default MessagingScreen;
