import React from 'react';
import { BottomNav } from '../components/BottomNav';

const SearchScreen: React.FC = () => {
    const suggestions = [
        { name: 'Parrilla Gourmet', meta: 'Carnes • 1.2 km', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&h=300&auto=format&fit=crop' },
        { name: 'Nippon Sushi', meta: 'Asiática • 2.5 km', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=400&h=300&auto=format&fit=crop' },
        { name: 'Pasta Madre', meta: 'Italiana • 0.8 km', img: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=400&h=300&auto=format&fit=crop' },
        { name: 'Green Kitchen', meta: 'Vegano • 3.1 km', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400&h=300&auto=format&fit=crop' }
    ];

    return (
        <div className="flex-1 flex flex-col bg-black text-white pb-20">
            <header className="sticky top-0 z-20 bg-black/90 backdrop-blur-md px-4 pt-4 pb-2 pt-safe">
                <div className="flex w-full items-center rounded-2xl bg-surface-dark border border-white/5 h-14 px-4 mb-4">
                    <span className="material-symbols-outlined text-gray-500">search</span>
                    <input className="bg-transparent border-none text-white w-full ml-3 focus:ring-0 text-sm" placeholder="Busca restaurantes o platos..." />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                    {['Todos', 'Parrillas', 'Pastas', 'Hamburguesas', 'Sushis', 'Cafés'].map(tag => (
                        <button key={tag} className="bg-surface-dark border border-white/5 rounded-full px-5 py-2 text-xs whitespace-nowrap font-medium hover:border-[#f48c25] transition-colors">
                            {tag}
                        </button>
                    ))}
                </div>
            </header>

            <main className="px-4 py-4 space-y-6">
                <div>
                    <h3 className="font-bold text-lg mb-4">Búsquedas recientes</h3>
                    <div className="space-y-1">
                        {['Parrilla Don Julio', 'Fat Broder', 'Cuervo Café'].map((item) => (
                            <div key={item} className="flex items-center justify-between py-3.5 border-b border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="bg-surface-dark p-2 rounded-full text-gray-500">
                                        <span className="material-symbols-outlined text-lg">history</span>
                                    </div>
                                    <span className="font-medium text-sm">{item}</span>
                                </div>
                                <button className="material-symbols-outlined text-gray-600">close</button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-4">Te podría gustar</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {suggestions.map((item, i) => (
                            <div key={i} className="bg-surface-dark rounded-3xl border border-white/5 overflow-hidden group cursor-pointer">
                                <div className="h-28 bg-gray-800">
                                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                                </div>
                                <div className="p-3">
                                    <p className="font-bold text-sm truncate">{item.name}</p>
                                    <p className="text-[10px] text-gray-500 mt-0.5">{item.meta}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <BottomNav />
        </div>
    );
};

export default SearchScreen;
