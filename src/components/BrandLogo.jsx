import React from 'react';

export default function BrandLogo({ size = 'default', showSubtitle = true }) {
  if (size === 'compact') {
    return (
      <div className="flex items-center gap-2.5">
        <img
          src="/logo.svg"
          alt="Haath Ki Kala Emblem"
          className="w-9 h-9 object-contain shrink-0"
        />
        <div className="flex flex-col">
          <span className="font-serif-luxury text-base font-bold tracking-[0.18em] text-[#1C1917] leading-none">
            HAATH KI KALA
          </span>
          {showSubtitle && (
            <span className="text-[8px] font-bold tracking-[0.25em] text-[#8C4326] uppercase mt-0.5">
              Studio
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-[#FAF7F2] p-0.5 border border-[#C5A059]/40 shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300">
        <img
          src="/logo.svg"
          alt="Haath Ki Kala Logo"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span className="font-serif-luxury text-lg sm:text-xl font-bold tracking-[0.16em] text-[#1C1917] leading-tight group-hover:text-[#8C4326] transition-colors">
            HAATH KI KALA
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.28em] text-[#8C4326] uppercase">
            Artisanal Living • Handcrafted
          </span>
        )}
      </div>
    </div>
  );
}
