import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateReviewFlow: React.FC = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    // Form State
    const [formData, setFormData] = useState({
        restaurantName: '',
        address: '',
        dishName: '',
        dishRating: 4,
        opinion: '',
        price: '',
        serviceRating: 5,
        ambianceRating: 4.5,
        category: '',
        tags: ['Pet friendly'],
        images: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuDhBgwFjVQdD-J1vXLEzEyausX0bEz55uPQ4xLfSoIMcG1cWjqHb4JHqRAqn7JhLgcGM0Bj4jsclturg1Ksx1G7cLLs1JxQUk4Vaihlt8dTLet6QGG1cIahFMe7OuHvjafYax9w6wBXwAScWF_rgMXdZPo_K9JrFq5vgd9nO3YJAsMdau92lol9XevTOkSY6QtY1qBRTzwuxi39dgS-fC3P5CdLJVZgtcasyjK0nAYP6Vg5S9epa-_ky_v4jJ715SxIUxj5inC2nDw'
        ],
    });

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const addImage = () => {
        if (formData.images.length < 3) {
            const mockImages = [
                'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=400',
                'https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=400',
                'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400'
            ];
            const nextImg = mockImages[formData.images.length % mockImages.length];
            updateField('images', [...formData.images, nextImg]);
        }
    };

    const toggleTag = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
    const prevStep = () => {
        if (step === 1) navigate('/home');
        else setStep(prev => prev - 1);
    };

    const handleFinish = () => {
        // Navigate home after successful "posting"
        navigate('/home');
    };

    const availableTags = ['Pet friendly', 'Ideal para citas', 'Música en vivo', 'Terraza', 'Tragos de Autor', 'Vinos'];

    return (
        <div className="max-w-md mx-auto min-h-screen bg-black text-white antialiased flex flex-col relative pb-32 font-display">
            <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-md px-4 py-4 flex items-center justify-between border-b border-[#27272a] pt-safe">
                <button onClick={prevStep} className="text-white p-2 rounded-full hover:bg-white/10 active:scale-95 transition-transform">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h1 className="text-white font-bold text-lg tracking-wide">
                    {step === 1 ? 'Nuevo Plato' : step === 2 ? 'Detalles del Local' : 'Resumen Final'}
                </h1>
                <div className="w-10"></div>
            </header>

            <div className="bg-black px-6 py-4">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                    <span className={step >= 1 ? 'text-[#f48c25]' : ''}>1. Plato</span>
                    <span className={step >= 2 ? 'text-[#f48c25]' : ''}>2. Local</span>
                    <span className={step >= 3 ? 'text-[#f48c25]' : ''}>3. Resumen</span>
                </div>
                <div className="w-full bg-[#121212] h-1 rounded-full overflow-hidden">
                    <div className="bg-[#f48c25] h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(244,140,37,0.5)]"
                        style={{ width: `${(step / 3) * 100}%` }}></div>
                </div>
            </div>

            <main className="flex-1 px-5 py-2 space-y-8 overflow-y-auto no-scrollbar pb-10">
                {step === 1 && (
                    <div className="space-y-6 fade-in">
                        <div className="space-y-3">
                            <label className="block text-sm font-semibold ml-1">Lugar</label>
                            <div className="relative group">
                                <input className="w-full bg-[#1E1E1E] border border-white/5 text-white rounded-2xl px-4 py-4 pl-12 focus:ring-2 focus:ring-[#f48c25] outline-none transition-all placeholder-gray-600 shadow-lg"
                                    placeholder="¿Dónde comiste?" value={formData.restaurantName} onChange={(e) => updateField('restaurantName', e.target.value)} />
                                <span className="material-symbols-outlined absolute left-4 top-4 text-gray-500 group-focus-within:text-[#f48c25]">storefront</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-semibold ml-1">Ubicación</label>
                            <div className="relative group">
                                <input className="w-full bg-[#1E1E1E] border border-white/5 text-white rounded-2xl px-4 py-4 pl-12 focus:ring-2 focus:ring-[#f48c25] outline-none transition-all placeholder-gray-600 shadow-lg"
                                    placeholder="Dirección del local" value={formData.address} onChange={(e) => updateField('address', e.target.value)} />
                                <span className="material-symbols-outlined absolute left-4 top-4 text-gray-500 group-focus-within:text-[#f48c25]">location_on</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-semibold ml-1">¿Qué plato fue?</label>
                            <div className="relative group">
                                <input className="w-full bg-[#1E1E1E] border border-white/5 text-white rounded-2xl px-4 py-4 pl-12 focus:ring-2 focus:ring-[#f48c25] outline-none transition-all placeholder-gray-600 shadow-lg"
                                    placeholder="Nombre del plato" value={formData.dishName} onChange={(e) => updateField('dishName', e.target.value)} />
                                <span className="material-symbols-outlined absolute left-4 top-4 text-gray-500 group-focus-within:text-[#f48c25]">restaurant_menu</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-baseline px-1">
                                <label className="block text-sm font-semibold">Fotos del plato</label>
                                <span className="text-xs text-gray-500">{formData.images.length}/3 fotos</span>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {formData.images.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group animate-fade-in shadow-xl">
                                        <img src={img} className="w-full h-full object-cover" alt={`Preview ${idx}`} />
                                        <button
                                            onClick={() => removeImage(idx)}
                                            className="absolute top-1.5 right-1.5 bg-black/60 backdrop-blur-md rounded-full p-1 border border-white/10 active:scale-90 transition-transform"
                                        >
                                            <span className="material-symbols-outlined text-xs">close</span>
                                        </button>
                                        {idx === 0 && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md py-1 text-center border-t border-white/5">
                                                <span className="text-[8px] font-black uppercase tracking-widest text-white/90">Portada</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {formData.images.length < 3 && (
                                    <button
                                        onClick={addImage}
                                        className="aspect-square rounded-2xl border-2 border-dashed border-[#f48c25]/40 bg-[#f48c25]/5 flex flex-col items-center justify-center text-[#f48c25] hover:bg-[#f48c25]/10 active:scale-95 transition-all shadow-inner"
                                    >
                                        <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                                        <span className="text-[9px] font-black mt-1 uppercase tracking-tighter">Añadir</span>
                                    </button>
                                )}
                                {Array.from({ length: Math.max(0, 2 - formData.images.length) }).map((_, i) => (
                                    <div key={`filler-${i}`} className="aspect-square rounded-2xl bg-[#121212] border border-white/5 flex items-center justify-center text-gray-800 opacity-20">
                                        <span className="material-symbols-outlined text-3xl">image</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-baseline px-1">
                                <label className="block text-sm font-semibold">Tu veredicto</label>
                                <span className="text-lg font-black text-[#f48c25]">{formData.dishRating.toFixed(1)}</span>
                            </div>
                            <div className="bg-[#1E1E1E] p-5 rounded-3xl border border-white/5 flex justify-between items-center shadow-xl">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button key={star} onClick={() => updateField('dishRating', star)} className={`${star <= formData.dishRating ? 'text-[#f48c25]' : 'text-zinc-700'} hover:text-orange-400 active:scale-110 transition-transform`}>
                                        <span className={`material-symbols-outlined text-4xl ${star <= formData.dishRating ? 'filled' : ''}`} style={star <= formData.dishRating ? { fontVariationSettings: "'FILL' 1", filter: 'drop-shadow(0 0 8px rgba(244,140,37,0.4))' } : {}}>star</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3 pb-4">
                            <label className="block text-sm font-semibold ml-1">Precio (Opcional)</label>
                            <div className="relative w-1/2 group">
                                <span className="absolute left-4 top-4 text-gray-500 font-black group-focus-within:text-[#f48c25] transition-colors">$</span>
                                <input className="w-full bg-[#1E1E1E] border border-white/5 text-white rounded-2xl px-4 py-4 pl-10 focus:ring-2 focus:ring-[#f48c25] outline-none transition-all placeholder-gray-700 shadow-lg font-bold"
                                    placeholder="0.00" type="number" value={formData.price} onChange={(e) => updateField('price', e.target.value)} />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-8 fade-in">
                        <div className="space-y-3">
                            <div className="flex justify-between items-baseline px-1">
                                <label className="block text-sm font-semibold">Atención y Servicio</label>
                                <span className="text-lg font-black text-[#f48c25]">{formData.serviceRating.toFixed(1)}</span>
                            </div>
                            <div className="bg-[#1E1E1E] p-5 rounded-3xl border border-white/5 flex justify-between items-center shadow-xl">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button key={star} onClick={() => updateField('serviceRating', star)} className={`${star <= formData.serviceRating ? 'text-[#f48c25]' : 'text-zinc-700'} hover:text-orange-400 active:scale-110 transition-transform`}>
                                        <span className={`material-symbols-outlined text-4xl ${star <= formData.serviceRating ? 'filled' : ''}`} style={star <= formData.serviceRating ? { fontVariationSettings: "'FILL' 1", filter: 'drop-shadow(0 0 8px rgba(244,140,37,0.4))' } : {}}>star</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-baseline px-1">
                                <label className="block text-sm font-semibold">Ambiente</label>
                                <span className="text-lg font-black text-[#f48c25]">{formData.ambianceRating.toFixed(1)}</span>
                            </div>
                            <div className="bg-[#1E1E1E] p-5 rounded-3xl border border-white/5 flex justify-between items-center shadow-xl">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button key={star} onClick={() => updateField('ambianceRating', star)} className={`${star <= formData.ambianceRating ? 'text-[#f48c25]' : 'text-zinc-700'} hover:text-orange-400 active:scale-110 transition-transform`}>
                                        <span className={`material-symbols-outlined text-4xl ${star <= formData.ambianceRating ? 'filled' : ''}`} style={star <= formData.ambianceRating ? { fontVariationSettings: "'FILL' 1", filter: 'drop-shadow(0 0 8px rgba(244,140,37,0.4))' } : {}}>star</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-semibold ml-1">¿Qué destaca a este local?</label>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {availableTags.map(tag => (
                                    <button key={tag} onClick={() => toggleTag(tag)} className={`px-5 py-2.5 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${formData.tags.includes(tag) ? 'border-[#f48c25] bg-[#f48c25]/20 text-[#f48c25]' : 'border-white/5 bg-[#1E1E1E] text-zinc-500 hover:text-white'}`}>
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-semibold ml-1">¿Qué tipo de comida es?</label>
                            <div className="relative group">
                                <input
                                    className="w-full bg-[#1E1E1E] border border-white/5 text-white rounded-2xl px-4 py-4 pl-12 focus:ring-2 focus:ring-[#f48c25] outline-none transition-all placeholder-gray-600 shadow-lg"
                                    placeholder="Ej: Sushi, Pizzas, Pastas, Bodegón..."
                                    value={formData.category}
                                    onChange={(e) => updateField('category', e.target.value)}
                                />
                                <span className="material-symbols-outlined absolute left-4 top-4 text-gray-500 group-focus-within:text-[#f48c25]">restaurant</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-semibold ml-1">Tu experiencia (opcional)</label>
                            <textarea
                                className="w-full bg-[#1E1E1E] border border-white/5 text-white rounded-3xl px-5 py-5 focus:ring-2 focus:ring-[#f48c25] outline-none transition-all placeholder-gray-700 shadow-xl resize-none h-32"
                                placeholder="Escribe qué te pareció..."
                                value={formData.opinion}
                                onChange={(e) => updateField('opinion', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 fade-in flex flex-col items-center">
                        <div className="text-center mb-4">
                            <h2 className="text-2xl font-black mb-1">Vista Previa</h2>
                            <p className="text-zinc-500 text-sm">Así verán los demás tu reseña.</p>
                        </div>

                        {/* The High-Fidelity Summary Card */}
                        <div className="w-full bg-[#121212] rounded-[3rem] p-6 border border-white/5 shadow-2xl relative overflow-hidden group">
                            <div className="aspect-[4/3] bg-zinc-900 rounded-[2.5rem] mb-5 overflow-hidden relative border border-white/5 shadow-inner">
                                <img src={formData.images[0] || 'https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=800'} className="w-full h-full object-cover" alt="Preview" />
                                <div className="absolute top-5 right-5 bg-[#f48c25] px-4 py-2 rounded-2xl font-black text-xl shadow-xl flex items-center gap-1.5 border border-white/10">
                                    {formData.dishRating.toFixed(1)} <span className="material-symbols-outlined filled text-white text-base">star</span>
                                </div>
                                {formData.images.length > 1 && (
                                    <div className="absolute bottom-5 right-5 flex gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5">
                                        {formData.images.map((_, i) => (
                                            <div key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`}></div>
                                        ))}
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-5 left-6 pr-4">
                                    <h4 className="text-white text-2xl font-black drop-shadow-md leading-tight">{formData.dishName || 'Nuevo Plato'}</h4>
                                    <p className="text-[#f48c25] text-xs font-black uppercase tracking-widest mt-1">
                                        {formData.category || 'Categoría'} • {formData.restaurantName || 'Sin nombre'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-5 px-1">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex-1">
                                        <p className="text-zinc-300 text-sm leading-relaxed italic font-medium pr-2">
                                            {formData.opinion ? `"${formData.opinion}"` : '"¡Increíble experiencia gastronómica!"'}
                                        </p>
                                    </div>
                                    {formData.price && (
                                        <div className="flex flex-col items-end">
                                            <span className="text-[#f48c25] font-black text-xl">${formData.price}</span>
                                            <span className="text-[10px] text-zinc-600 font-black uppercase tracking-tighter">Promedio</span>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                                    {formData.tags.map(t => (
                                        <span key={t} className="text-[10px] px-3 py-1.5 bg-[#1E1E1E] rounded-xl text-zinc-400 border border-white/5 font-black uppercase tracking-widest">{t}</span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-6 pt-2">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-[#f48c25] font-black text-lg">{formData.serviceRating}</span>
                                        <span className="text-[9px] text-zinc-600 font-black uppercase">Atención</span>
                                    </div>
                                    <div className="w-px h-8 bg-white/5"></div>
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-[#f48c25] font-black text-lg">{formData.ambianceRating}</span>
                                        <span className="text-[9px] text-zinc-600 font-black uppercase">Ambiente</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#f48c25]/10 border border-[#f48c25]/20 p-5 rounded-[2rem] w-full mt-4 flex gap-4 items-center">
                            <div className="h-12 w-12 rounded-full bg-[#f48c25] flex items-center justify-center shrink-0 shadow-lg">
                                <span className="material-symbols-outlined text-white">verified</span>
                            </div>
                            <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                                ¡Tu reseña ayudará a otros foodies a encontrar el plato perfecto! <br /><span className="text-[#f48c25] font-bold">Ganarás +10 puntos de experiencia.</span>
                            </p>
                        </div>
                    </div>
                )}
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/95 backdrop-blur-2xl border-t border-white/5 z-50 max-w-md mx-auto flex gap-4">
                <button
                    onClick={prevStep}
                    className="flex-1 py-4 px-6 rounded-2xl bg-[#1E1E1E] border border-white/5 text-zinc-500 font-black text-xs uppercase tracking-widest active:scale-95 transition-all shadow-lg"
                >
                    Atrás
                </button>
                <button
                    onClick={step === 3 ? handleFinish : nextStep}
                    className="flex-[2] py-4 px-6 rounded-2xl bg-[#f48c25] text-white font-black text-xs uppercase tracking-widest shadow-[0_4px_25px_rgba(244,140,37,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                    {step === 3 ? 'Publicar Ahora' : 'Siguiente'}
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
            </div>
        </div>
    );
};

export default CreateReviewFlow;
