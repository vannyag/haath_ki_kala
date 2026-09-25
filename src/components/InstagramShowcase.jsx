import React from 'react';
import { Instagram, Heart, MessageCircle, ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, INSTAGRAM_POSTS_GRID, WHATSAPP_PHONE } from '../data/products';

export default function InstagramShowcase() {
  const handleInstagramInquiry = (postCaption) => {
    const msg = `Hi Haath Ki Kala! I spotted this piece from your Instagram (@${INSTAGRAM_HANDLE}): "${postCaption}". Is it available to order?`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header with Instagram Follow CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2 border-b border-[#E5DAC8]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-[#8C4326]">
              <Instagram className="w-3.5 h-3.5" />
              <span>@haath_ki_kala ON INSTAGRAM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 font-serif-luxury">
              Crafted in Studio. Styled in Homes.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
              Explore custom bespoke pieces, behind-the-scenes craft videos, and real customer living spaces from our active Instagram community.
            </p>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#8C4326] to-[#B25E3B] hover:from-[#6E331B] hover:to-[#8C4326] text-white text-xs font-semibold rounded-full shadow-sm transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @{INSTAGRAM_HANDLE}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 4-Item Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_POSTS_GRID.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-2xl overflow-hidden bg-stone-200 border border-stone-200 shadow-sm aspect-square cursor-pointer"
              onClick={() => handleInstagramInquiry(post.caption)}
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay with Instagram stats & action */}
              <div className="absolute inset-0 bg-stone-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    <span>{post.likes}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-xs line-clamp-3 leading-relaxed text-stone-200">
                    "{post.caption}"
                  </p>
                  <button className="w-full py-1.5 px-3 bg-white/20 hover:bg-white text-white hover:text-stone-900 rounded-lg text-[11px] font-bold backdrop-blur-sm transition-colors">
                    Inquire via WhatsApp / DM
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Note */}
        <div className="text-center pt-2">
          <p className="text-xs text-stone-500">
            Have a custom idea? Send us a DM on <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#8C4326] underline hover:text-[#5F2C17]">Instagram @{INSTAGRAM_HANDLE}</a> or connect on WhatsApp.
          </p>
        </div>

      </div>
    </section>
  );
}
