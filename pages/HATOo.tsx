
import React, { useState, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface HATOoProps {
  onContactMerchant: (merchantId: string) => void;
}

const HATOo: React.FC<HATOoProps> = ({ onContactMerchant }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [identifiedProduct, setIdentifiedProduct] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    });
    
    return {
      inlineData: {
        data: await base64EncodedDataPromise,
        mimeType: file.type,
      },
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []) as File[];
    const availableSlots = 4 - files.length;
    const newFiles = selectedFiles.slice(0, availableSlots);

    if (newFiles.length > 0) {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);

      const newPreviews: string[] = [];
      let loadedCount = 0;
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          newPreviews.push(event.target?.result as string);
          loadedCount++;
          if (loadedCount === newFiles.length) {
            setPreviews((prev) => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });
      setResults([]);
      setIdentifiedProduct(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setResults([]);
    setIdentifiedProduct(null);
  };

  const handleHatooSearch = async () => {
    if (files.length === 0) return;
    setIsSearching(true);
    setResults([]);
    setIdentifiedProduct(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const imageParts = await Promise.all(files.map(fileToGenerativePart));
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            ...imageParts,
            { text: "Briefly identify exactly what products are in these photos for the Egyptian wholesale market. Return only the product category name in 3 words max." }
          ]
        },
      });

      const aiText = response.text?.trim() || "Wholesale Merchandise";
      setIdentifiedProduct(aiText);

      // Simulation of MarketHup database retrieval
      setTimeout(() => {
        const mockMerchants = ["Al-Amin Group", "Delta Trading", "Cairo Importers", "Port Said Hub", "Nile Suppliers"];
        const mockResults = Array.from({ length: 6 }).map((_, i) => ({
          id: `hup-search-${i}`,
          image: `https://picsum.photos/seed/market-res-${i+40}/600/600`,
          merchant: { id: `m-hatoo-${i}`, name: mockMerchants[i % mockMerchants.length] }
        }));
        setResults(mockResults);
        setIsSearching(false);
      }, 1500);

    } catch (error) {
      console.error("HATOo Search Error:", error);
      setIsSearching(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto pb-32">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="size-20 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-neon mb-6">
          <span className="material-symbols-outlined text-4xl">center_focus_strong</span>
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter mb-4 uppercase">
          HA<span className="text-primary">TOo</span>
        </h1>
        <p className="text-white/40 max-w-lg font-medium">MarketHup Visual Search Engine</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        <div className="grid grid-cols-2 gap-4">
          {previews.map((src, idx) => (
            <div key={idx} className="relative aspect-square rounded-3xl overflow-hidden border border-primary/40 group">
              <img src={src} className="size-full object-cover" alt="Preview" />
              <button onClick={() => removeImage(idx)} className="absolute top-2 right-2 size-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
          ))}
          {previews.length < 4 && (
            <div onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-3xl border-2 border-dashed border-white/10 hover:border-primary/50 bg-white/5 flex flex-col items-center justify-center cursor-pointer transition-all">
              <span className="material-symbols-outlined text-4xl text-white/10 mb-2">add_a_photo</span>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest tracking-widest">Add Image</p>
            </div>
          )}
        </div>

        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" multiple />

        <button 
          onClick={handleHatooSearch}
          disabled={files.length === 0 || isSearching}
          className={`w-full py-6 rounded-2xl flex items-center justify-center gap-4 transition-all ${files.length > 0 && !isSearching ? 'bg-primary text-black font-black shadow-neon-bright hover:scale-[1.01]' : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'}`}
        >
          <span className="uppercase tracking-[0.5em] text-xl italic font-black">
            {isSearching ? 'ANALYZING...' : 'START VISUAL SEARCH'}
          </span>
        </button>
      </div>

      {(isSearching || results.length > 0) && (
        <div className="mt-16 space-y-8 animate-in fade-in duration-700">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black italic tracking-widest text-primary uppercase">
              {isSearching ? 'Identification in progress...' : `Results for "${identifiedProduct}"`}
            </h2>
            <div className="h-px flex-1 bg-primary/20"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((res) => (
              <div key={res.id} className="bg-surface-dark rounded-3xl overflow-hidden border border-white/5 flex flex-col group hover:border-primary/30 transition-all">
                <div className="relative aspect-square"><img src={res.image} className="size-full object-cover" alt="Result" /></div>
                <div className="p-6">
                  <h4 className="text-sm font-bold truncate text-white uppercase mb-4">{res.merchant.name}</h4>
                  <button onClick={() => onContactMerchant(res.merchant.id)} className="w-full py-4 bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] font-black rounded-xl flex items-center justify-center gap-2 transition-all text-xs uppercase tracking-widest hover:bg-[#00e5ff] hover:text-black shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                    My Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HATOo;
