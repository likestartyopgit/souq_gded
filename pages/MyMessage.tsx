
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: string;
  image?: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  online: boolean;
  unread?: number;
}

const MyMessage: React.FC = () => {
  const [contacts] = useState<Contact[]>([
    { id: 'm1', name: 'Cairo Textiles Co.', avatar: 'https://picsum.photos/seed/m1/200/200', lastMessage: 'Great! We have several grades available...', time: '10:06 AM', online: true },
    { id: 'm2', name: 'Alexandria Garments', avatar: 'https://picsum.photos/seed/m2/200/200', lastMessage: 'The shipment is ready for dispatch.', time: 'Yesterday', online: false, unread: 2 },
    { id: 'm3', name: 'Giza Cotton Export', avatar: 'https://picsum.photos/seed/m3/200/200', lastMessage: 'Can you send the specifications?', time: '2 days ago', online: true },
    { id: 'm4', name: 'Port Said Logistics', avatar: 'https://picsum.photos/seed/m4/200/200', lastMessage: 'Price quote for 500kg attached.', time: '1 week ago', online: false },
  ]);

  const [activeContactId, setActiveContactId] = useState('m1');
  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'other', timestamp: '10:00 AM' },
    { id: '2', text: 'I am interested in your Egyptian Cotton products.', sender: 'me', timestamp: '10:05 AM' },
    { id: '3', text: 'Great! We have several grades available. Would you like to see our latest catalog?', sender: 'other', timestamp: '10:06 AM' },
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!inputText.trim() && !selectedImage) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      image: selectedImage || undefined
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setSelectedImage(null);

    // Scroll to bottom
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] bg-background-dark/50 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden m-4">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-white/5 flex flex-col bg-surface-dark/40">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-black italic uppercase tracking-tight">Conversations</h2>
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold mt-1">Active Traders</p>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveContactId(contact.id)}
              className={`w-full p-4 flex items-center gap-4 transition-all border-b border-white/5 hover:bg-white/5 ${activeContactId === contact.id ? 'bg-primary/10 border-r-2 border-r-primary' : ''}`}
            >
              <div className="relative shrink-0">
                <img src={contact.avatar} className="size-12 rounded-xl object-cover border border-white/10" alt={contact.name} />
                {contact.online && (
                  <div className="absolute -bottom-1 -right-1 size-3 bg-primary rounded-full border-2 border-[#0B0C10]"></div>
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between mb-0.5">
                  <p className={`text-sm font-black truncate tracking-tight ${activeContactId === contact.id ? 'text-primary' : 'text-white'}`}>{contact.name}</p>
                  <span className="text-[8px] text-white/20 font-bold uppercase">{contact.time}</span>
                </div>
                <p className="text-[10px] text-white/40 truncate font-medium">{contact.lastMessage}</p>
              </div>
              {contact.unread && (
                <div className="size-5 bg-primary rounded-full flex items-center justify-center text-[10px] text-black font-black shadow-neon">
                  {contact.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-surface-dark/20">
        {/* Header */}
        <div className="p-6 border-b border-white/5 bg-surface-dark/80 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={activeContact.avatar} className="size-12 rounded-2xl border border-primary/30 object-cover" alt={activeContact.name} />
              {activeContact.online && <div className="absolute -bottom-1 -right-1 size-4 bg-primary rounded-full border-2 border-surface-dark animate-pulse"></div>}
            </div>
            <div>
              <h2 className="text-xl font-black italic uppercase tracking-tight">{activeContact.name}</h2>
              <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                {activeContact.online ? 'Online Now' : 'Last seen ' + activeContact.time}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/50 transition-all">
              <span className="material-symbols-outlined">call</span>
            </button>
            <button className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/50 transition-all">
              <span className="material-symbols-outlined">videocam</span>
            </button>
            <button className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/50 transition-all">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[radial-gradient(circle_at_center,rgba(13,242,13,0.03)_0%,transparent_100%)]"
        >
          {messages.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                <div className={`
                  p-4 rounded-2xl text-sm leading-relaxed
                  ${msg.sender === 'me' 
                    ? 'bg-primary text-black font-medium rounded-tr-none shadow-neon' 
                    : 'bg-surface-dark border border-white/10 text-white/90 rounded-tl-none'}
                `}>
                  {msg.image && (
                    <img src={msg.image} alt="Uploaded" className="max-w-full rounded-lg mb-2 border border-black/10" />
                  )}
                  {msg.text}
                </div>
                <span className="text-[9px] text-white/30 uppercase font-bold mt-1 px-1 tracking-widest">{msg.timestamp}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-surface-dark/80 border-t border-white/5">
          <AnimatePresence>
            {selectedImage && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-4 relative inline-block"
              >
                <img src={selectedImage} alt="Preview" className="h-24 w-auto rounded-xl border-2 border-primary shadow-neon" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-2 -right-2 size-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="size-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/50 transition-all group"
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">image</span>
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
            />
            
            <div className="flex-1 relative">
              <input 
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message here..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-white/20"
              />
            </div>

            <button 
              onClick={handleSend}
              disabled={!inputText.trim() && !selectedImage}
              className="px-8 py-4 bg-primary text-black font-black uppercase italic tracking-widest rounded-2xl shadow-neon hover:shadow-neon-bright transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMessage;
