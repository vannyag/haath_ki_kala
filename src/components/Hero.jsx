import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, Instagram, Sparkles, Feather } from 'lucide-react';
import { useCart } from '../context/useCart';
import { WHATSAPP_PHONE, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/products';

export default function Hero({ onExploreClick }) {
  const { triggerFestiveCelebration } = useCart();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F4EFEA] to-[#FAF7F2] border-b border-[#E8DEC8] py-14 sm:py-20 lg:py-24">
      
      {/* Subtle organic background aura */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-1/4 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#B25E3B] blur-3xl animate-ambient-glow" />
        <div className="absolute bottom-5 right-10 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[#8C4326] to-[#C5A059] blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Story */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Studio Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 border border-[#DED4C5] shadow-xs text-xs font-semibold text-[#8C4326]">
              <Feather className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="uppercase tracking-[0.2em] font-medium text-[11px]">HAATH KI KALA STUDIO</span>
              <span className="w-1 h-1 rounded-full bg-stone-300" />
              <span className="text-stone-600 font-normal">Contemporary Indo-Western Living</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#1C1917] tracking-tight leading-[1.12] font-serif-luxury">
              Rooted in Indian Craft. <br />
              <span className="italic font-normal text-[#8C4326]">
                Styled for Modern Homes.
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Discover thoughtful artisanal design by <strong className="text-stone-900 font-semibold">Haath Ki Kala</strong>. Sculptural brass lotus urlis, bohemian ivory bandhanwars, minimal ribbed soy wax diyas, and clean geometric acrylic rangolis — designed to blend seamlessly with modern aesthetics.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2 justify-center lg:justify-start">
              <button
                onClick={() => {
                  triggerFestiveCelebration();
                  onExploreClick();
                }}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#1C1917] hover:bg-[#2C2420] text-white rounded-full font-medium text-xs sm:text-sm tracking-wide shadow-sm flex items-center justify-center gap-2 group active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi Haath Ki Kala! I would like to inquire about your handcrafted collection.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-[#D5C9B8] rounded-full font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Order / DM</span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 text-stone-600 hover:text-stone-900 text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#8C4326]" />
                <span>@{INSTAGRAM_HANDLE}</span>
              </a>
            </div>

            {/* Coupon Code Callout */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-stone-500">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Use code</span>
              <span className="font-mono font-bold px-2 py-0.5 bg-white border border-[#DED4C5] text-stone-900 rounded text-[11px]">
                DIWALI2026
              </span>
              <span>for 15% studio discount</span>
            </div>

            {/* Editorial Trust Markers */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#E8DEC8]">
              <div>
                <p className="text-base font-serif-luxury font-bold text-stone-900">150+ Posts</p>
                <p className="text-[11px] text-stone-500 mt-0.5">On Instagram Catalog</p>
              </div>
              <div>
                <p className="text-base font-serif-luxury font-bold text-stone-900">Solid Brass</p>
                <p className="text-[11px] text-stone-500 mt-0.5">& Natural River Clay</p>
              </div>
              <div>
                <p className="text-base font-serif-luxury font-bold text-stone-900">Pan-India</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Safe Express Delivery</p>
              </div>
              <div>
                <p className="text-base font-serif-luxury font-bold text-stone-900">Bespoke</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Custom Colorway DMs</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Lifestyle Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Card Container */}
              <div className="relative bg-white rounded-3xl p-3 border border-[#E5DAC8] shadow-xl overflow-hidden">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
                    alt="Haath Ki Kala Lifestyle Decor"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Studio Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-stone-200 shadow-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8C4326]" />
                    <span className="text-[11px] font-semibold text-stone-800">The Brass Urli & Toran Edit</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">Featured on Instagram</p>
                    <h3 className="text-base font-semibold font-serif-luxury drop-shadow-xs">Sculptural Lotus Brass Urli on Carrara Marble</h3>
                    <p className="text-[11px] text-stone-200 mt-0.5">Designed & handcrafted in India for global spaces</p>
                  </div>
                </div>

                {/* Sub-bar */}
                <div className="mt-3 p-3 bg-[#FAF7F2] rounded-xl flex items-center justify-between text-xs text-stone-600">
                  <span className="flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#8C4326]" />
                    Direct Karigar Studio Support
                  </span>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#8C4326] hover:underline"
                  >
                    View on IG ↗
                  </a>
                </div>
              </div>

              {/* Floating Instagram Tag Pill */}
              <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white border border-[#DED4C5] rounded-2xl p-3 shadow-md items-center gap-3 animate-float-subtle">
                <div className="w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center text-base">
                  🪔
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-900">Zero-Waste Craft</div>
                  <div className="text-[10px] text-stone-500">Recycled brass & soy wax</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
