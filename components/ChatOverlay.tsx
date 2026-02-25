
import React, { useState, useRef, useEffect } from 'react';

interface ChatOverlayProps {
  merchantId: string;
  product?: any;
  buyerName?: string;
  onClose: () => void;
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ merchantId, product, buyerName, onClose }) => {
  const [message, setMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState([
    { sender: 'merchant', text: `Direct trade channel established. Interested in ${product?.title || 'our catalog'}?` }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    setHistory(prev => [...prev, { sender: 'user', text: message }]);
    setMessage('');
  };

  return (
    <div className="fixed bottom-8 right-8 w-[400px] h-[650px] bg-background-dark border-2 border-primary/40 rounded-[40px] shadow-2xl flex flex-col z-[1000] overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-surface-dark">
         <div className="flex items-center gap-4">
            <img src={product?.merchantAvatar || "https://picsum.photos/seed/m-sample/100/100"} className="size-12 rounded-2xl border border-primary/20" alt="" />
            <h4 className="font-black italic uppercase tracking-tighter text-white truncate max-w-[180px]">{buyerName || product?.merchantName || 'Direct Connect'}</h4>
         </div>
         <button onClick={onClose} className="size-8 rounded-full hover:bg-white/10 flex items-center justify-center"><span className="material-symbols-outlined">close</span></button>
      </div>

      {product && (
        <div className="p-4 bg-white/[0.03] border-b border-white/5 flex items-center gap-4 animate-in fade-in">
           <img src={product.thumbnail || product.imageUrl} className="size-20 rounded-xl object-cover border border-primary/10" alt="" />
           <div className="min-w-0 flex-1">
              <p className="text-[9px] font-black uppercase text-primary tracking-widest mb-1 italic">Trading Ref</p>
              <h5 className="text-sm font-bold truncate text-white">{product.title}</h5>
              <p className="text-[10px] text-[#0df20d] font-black">{product.price}</p>
           </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {history.map((msg, i) => (
          <div key={i} className={`max-w-[85%] p-4 rounded-3xl text-sm ${msg.sender === 'user' ? 'bg-primary text-black font-bold self-end rounded-br-none ml-auto' : 'bg-white/5 text-white/80 self-start rounded-bl-none mr-auto'}`}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="p-6 border-t border-white/5 bg-surface-dark flex gap-3">
         <input 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Trade inquiry..." 
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 text-sm outline-none focus:border-primary/50" 
         />
         <button onClick={handleSend} className="size-12 bg-primary text-black rounded-2xl flex items-center justify-center shadow-neon"><span className="material-symbols-outlined font-black">send</span></button>
      </div>
    </div>
  );
};

export default ChatOverlay;
