import React from 'react';
import { useCart } from '../context/useCart';
import { Sparkles, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="flex items-center gap-3 bg-stone-950/95 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/40 backdrop-blur-md max-w-sm">
        {toast.type === 'info' ? (
          <Info className="w-5 h-5 text-amber-400 shrink-0" />
        ) : (
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
        )}
        <span className="text-xs sm:text-sm font-semibold">{toast.message}</span>
      </div>
    </div>
  );
}
