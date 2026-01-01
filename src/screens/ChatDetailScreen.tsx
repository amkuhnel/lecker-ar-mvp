import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ChatDetailScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Array<{ id: number, text: string, isMe: boolean, time: string }>>([
        { id: 1, text: 'Hola! ¿Cómo estás?', isMe: false, time: '10:00 AM' },
        { id: 2, text: 'Genial, ¿y vos?', isMe: true, time: '10:05 AM' },
        { id: 3, text: 'Todo bien, quería preguntarte sobre el lugar de sushi.', isMe: false, time: '10:07 AM' },
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            isMe: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };

    return (
        <div className="flex-1 flex flex-col bg-[#221910] font-display text-white h-screen overflow-hidden">
            {/* Header */}
            <header className="flex items-center gap-3 p-4 bg-[#221910]/95 backdrop-blur-md border-b border-white/5 pt-safe sticky top-0 z-30">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-white/5 transition-colors active:scale-95"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                    <div className="h-10 w-10 rounded-full bg-slate-800 bg-cover bg-center border border-white/10 shrink-0"
                        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200)' }}>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <h2 className="font-bold text-base truncate">Sofía Martínez</h2>
                        <span className="text-xs text-green-500 font-medium">En línea</span>
                    </div>
                </div>
                <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                </button>
            </header>

            {/* Messages Area */}
            <main className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-black/20">
                <div className="text-center text-xs text-zinc-500 my-4 uppercase tracking-widest font-bold">Hoy</div>

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.isMe
                                    ? 'bg-[#f48c25] text-white rounded-tr-none'
                                    : 'bg-[#2f261f] text-zinc-200 border border-white/5 rounded-tl-none'
                                }`}
                        >
                            <p>{msg.text}</p>
                            <div className={`text-[10px] mt-1 text-right font-bold ${msg.isMe ? 'text-white/70' : 'text-zinc-500'}`}>
                                {msg.time}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </main>

            {/* Input Area */}
            <div className="p-4 bg-[#221910] border-t border-white/5 mb-safe">
                <form
                    onSubmit={handleSend}
                    className="flex items-center gap-2 bg-[#2f261f] rounded-full p-2 pl-4 border border-white/5 focus-within:border-[#f48c25]/50 transition-colors shadow-lg"
                >
                    <button type="button" className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
                        <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
                    </button>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-sm py-2"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="p-2.5 bg-[#f48c25] text-white rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md flex items-center justify-center"
                    >
                        <span className="material-symbols-outlined text-[20px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatDetailScreen;
