import React from 'react';
import { BottomNav } from '../components/BottomNav';

const ActivityScreen: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col bg-[#221910] text-white font-display min-h-screen pb-24 overflow-x-hidden antialiased selection:bg-[#ec7f13] selection:text-white">
            {/* Sticky Header */}
            <header className="sticky top-0 z-20 bg-[#221910]/95 backdrop-blur-md border-b border-white/5 pt-safe">
                <div className="flex items-center justify-center p-4 h-16">
                    <h2 className="text-xl font-bold tracking-tight">Actividad</h2>
                </div>

                {/* Filters */}
                <div className="flex gap-3 px-4 py-3 overflow-x-auto no-scrollbar">
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#ec7f13] px-6 shadow-lg shadow-[#ec7f13]/20 active:scale-95 transition-transform">
                        <span className="text-white text-sm font-semibold">Todo</span>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#2d241b] border border-white/5 px-5 active:scale-95 transition-transform">
                        <span className="text-white/80 text-sm font-medium">Me gusta</span>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#2d241b] border border-white/5 px-5 active:scale-95 transition-transform">
                        <span className="text-white/80 text-sm font-medium">Seguidores</span>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#2d241b] border border-white/5 px-5 active:scale-95 transition-transform">
                        <span className="text-white/80 text-sm font-medium">Respuestas</span>
                    </button>
                </div>
            </header>

            {/* Activity Feed */}
            <main className="flex flex-col gap-1 pt-2 overflow-y-auto no-scrollbar">
                {/* Today Section */}
                <div className="px-4 py-2 mt-2">
                    <h3 className="text-sm font-bold text-[#b9ab9d] uppercase tracking-wider">Hoy</h3>
                </div>

                <ActivityListItem
                    user="LucasM"
                    action="comenzó a seguirte."
                    time="Hace 2 h"
                    avatar="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&h=150&auto=format&fit=crop"
                    badgeIcon="person_add"
                    badgeColor="bg-blue-500"
                    showFollowButton
                />

                <ActivityListItem
                    user="Sofia_G"
                    action={<>le gustó tu reseña de <span className="font-bold text-[#ec7f13]">Don Julio</span>.</>}
                    time="Hace 20 min"
                    avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop"
                    badgeIcon="favorite"
                    badgeColor="bg-rose-500"
                    isFavorite
                    thumb="https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=150&h=150&auto=format&fit=crop"
                />

                <ActivityListItem
                    user="Ana"
                    action={<>y <span className="font-bold">15 personas más</span> les gustó tu foto en <span className="font-bold text-[#ec7f13]">Mishiguene</span>.</>}
                    time="Hace 4 h"
                    isGrouped
                    avatar="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop"
                    secondAvatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop"
                    thumb="https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=150&h=150&auto=format&fit=crop"
                />

                {/* Yesterday Section */}
                <div className="px-4 py-2 mt-4">
                    <h3 className="text-sm font-bold text-[#b9ab9d] uppercase tracking-wider">Ayer</h3>
                </div>

                <ActivityListItem
                    user="CarlaV"
                    action={<>comentó en tu reseña: "¡Totalmente de acuerdo! Las empanadas son increíbles."</>}
                    time="Ayer"
                    avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop"
                    badgeIcon="chat_bubble"
                    badgeColor="bg-green-500"
                />

                <ActivityListItem
                    user="Self"
                    isSelfAction
                    action={<>Le diste like a la reseña de <span className="font-bold text-[#ec7f13]">El Preferido</span> por <span className="font-bold">Marcos_Chef</span>.</>}
                    time="Ayer"
                    thumb="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=150&h=150&auto=format&fit=crop"
                />

                <ActivityListItem
                    user="Valentina_R"
                    action="comenzó a seguirte."
                    time="Hace 1 d"
                    avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop"
                    badgeIcon="person_add"
                    badgeColor="bg-blue-500"
                    isFollowing
                />

                <div className="h-20"></div>
            </main>

            <BottomNav />
        </div>
    );
};

const ActivityListItem = ({ user, action, time, avatar, secondAvatar, badgeIcon, badgeColor, isFavorite, showFollowButton, isFollowing, isGrouped, isSelfAction, thumb }: any) => (
    <div className="group flex items-start gap-4 px-4 py-4 hover:bg-white/5 transition-colors cursor-pointer">
        <div className="relative shrink-0">
            {isGrouped ? (
                <div className="relative h-12 w-12">
                    <div
                        className="absolute top-0 right-0 h-9 w-9 bg-center bg-cover rounded-full border-2 border-[#221910] z-10"
                        style={{ backgroundImage: `url('${avatar}')` }}
                    ></div>
                    <div
                        className="absolute bottom-0 left-0 h-9 w-9 bg-center bg-cover rounded-full border-2 border-[#221910] z-0 opacity-60"
                        style={{ backgroundImage: `url('${secondAvatar}')` }}
                    ></div>
                </div>
            ) : isSelfAction ? (
                <div className="flex items-center justify-center h-12 w-12 bg-[#2d241b] rounded-full border border-white/5">
                    <span className="material-symbols-outlined text-[#ec7f13]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </div>
            ) : (
                <>
                    <div
                        className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 border-2 border-[#221910]"
                        style={{ backgroundImage: `url('${avatar}')` }}
                    ></div>
                    {badgeIcon && (
                        <div className={`absolute -bottom-1 -right-1 ${badgeColor} rounded-full p-0.5 border-2 border-[#221910] flex items-center justify-center`}>
                            <span className={`material-symbols-outlined text-white text-[14px] ${isFavorite ? 'filled' : ''}`} style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}>{badgeIcon}</span>
                        </div>
                    )}
                </>
            )}
        </div>

        <div className="flex flex-col justify-center flex-1 gap-1">
            <p className="text-white text-sm leading-snug">
                {!isSelfAction && <span className="font-bold cursor-pointer hover:text-[#ec7f13] transition-colors">{user} </span>}
                {action}
            </p>
            <p className="text-[#b9ab9d] text-xs font-medium">{time}</p>
        </div>

        {showFollowButton && (
            <div className="shrink-0 self-center">
                <button className="flex h-8 items-center justify-center rounded-full bg-[#ec7f13] px-4 text-white text-xs font-bold shadow-md shadow-[#ec7f13]/20 hover:bg-[#ec7f13]/90 transition-colors active:scale-95">
                    Seguir
                </button>
            </div>
        )}

        {isFollowing && (
            <div className="shrink-0 self-center">
                <button className="flex h-8 items-center justify-center rounded-full bg-[#2d241b] border border-white/10 px-4 text-[#b9ab9d] text-xs font-medium">
                    Siguiendo
                </button>
            </div>
        )}

        {thumb && (
            <div className="shrink-0 self-center">
                <div
                    className="h-12 w-12 rounded-lg bg-cover bg-center border border-white/10"
                    style={{ backgroundImage: `url('${thumb}')` }}
                ></div>
            </div>
        )}
    </div>
);

export default ActivityScreen;
