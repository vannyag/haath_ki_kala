import React from 'react';
import { Sparkles, Instagram, Gift } from 'lucide-react';
import { useCart } from '../context/useCart';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/products';

export default function AnnouncementBar() {
  const { setIsBulkModalOpen } = useCart();

  return (
    <div className="bg-[#1C1917] text-[#EDE6DD] text-xs py-2 px-4 border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        
        {/* Promotion Message */}
        <div className="flex items-center gap-2 justify-center font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
          <span>
            <strong className="text-white font-semibold">Festive Studio Offer:</strong> Enjoy 15% off with code <span className="bg-stone-800 px-1.5 py-0.5 rounded text-[#D4AF37] font-mono font-bold border border-[#C5A059]/40">DIWALI2026</span> | Complimentary Pan-India Delivery above ₹999
          </span>
        </div>

        {/* Links: Instagram & Corporate Gifting */}
        <div className="flex items-center gap-4 text-xs font-medium justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>@{INSTAGRAM_HANDLE}</span>
          </a>
          <span className="text-stone-700">|</span>
          <button
            onClick={() => setIsBulkModalOpen(true)}
            className="flex items-center gap-1 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Custom & Bulk Gifting</span>
          </button>
        </div>

      </div>
    </div>
  );
}
