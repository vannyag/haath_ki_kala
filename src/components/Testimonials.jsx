import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-white border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
            Client Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1C1917] font-serif-luxury">
            Loved across 10,000+ homes
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Real stories from customers who brought a piece of Haath Ki Kala into their homes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8DEC8] relative flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                </div>

                <Quote className="w-6 h-6 text-[#C5A059]/30" />

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8DEC8]">
                <p className="text-xs font-bold text-[#1C1917]">
                  {item.name}
                </p>
                <div className="flex items-center justify-between text-[11px] text-stone-500 mt-0.5">
                  <span>{item.city}</span>
                  <span className="text-[#C5A059] font-semibold">{item.product}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
