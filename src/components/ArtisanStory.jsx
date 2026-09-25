import React from 'react';
import { Heart, Sparkles, Shield, Users, Leaf, Star } from 'lucide-react';

export default function ArtisanStory() {
  const craftRegions = [
    {
      region: 'Jaipur & Pushkar, Rajasthan',
      craft: 'Gota Patti & Silk Torans',
      artisan: 'Women Artisan Collectives',
      desc: 'Intricate gota patti embroidery on pure raw silk — each doorway accent is hand-stitched with mirrors, cowrie shells, and fine gold thread by skilled women artisans.',
      image: 'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?auto=format&fit=crop&w=600&q=80'
    },
    {
      region: 'Moradabad & Aligarh, UP',
      craft: 'Brass & Metal Craft',
      artisan: 'Fifth-Generation Brass Smiths',
      desc: 'Forged from solid brass with hand-chiseled jaali lattice work — each piece casts architectural shadow patterns that transform your interiors at dusk.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
    },
    {
      region: 'Gorakhpur & Gujarat',
      craft: 'Terracotta & Clay Artistry',
      artisan: 'Traditional Potter Guilds',
      desc: 'Wheel-thrown from natural river clay and hand-painted with mineral pigments — earthy, timeless forms with a modern color sensibility.',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-xs font-bold text-[#C5A059] tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>The Studio Story</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1917] font-serif-luxury leading-tight">
            Craft rooted in tradition,<br />designed for the world
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            <strong>Haath Ki Kala</strong> bridges India&apos;s extraordinary handcraft heritage with a contemporary design language. Every piece is made by skilled artisans — real people, real craft — and ships to your doorstep with care.
          </p>
        </div>

        {/* 3 Craft Region Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {craftRegions.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl border border-[#E8DEC8] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.craft}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 text-xs font-semibold text-amber-200 flex items-center gap-1">
                  📍 {item.region}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-bold text-[#1C1917] group-hover:text-[#C5A059] transition-colors font-serif-luxury">
                    {item.craft}
                  </h3>
                  <p className="text-xs font-semibold text-[#B25E3B] mt-0.5">
                    {item.artisan}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed mt-2.5">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8DEC8] flex items-center justify-between text-[11px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <Shield className="w-3.5 h-3.5" /> Fair Trade
                  </span>
                  <span>100% Handmade</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Pillars Banner */}
        <div className="bg-[#1C1917] rounded-3xl p-8 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 flex items-center justify-center mx-auto sm:mx-0 text-[#C5A059]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold font-serif-luxury text-[#C5A059]">
                Living Heritage
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Reviving gota patti, Moradabad brass repoussé, and terracotta traditions — adapted for modern interiors.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 flex items-center justify-center mx-auto sm:mx-0 text-[#C5A059]">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold font-serif-luxury text-[#C5A059]">
                Direct Artisan Support
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Zero middlemen. Fair wages paid directly to craftspeople and women&apos;s self-help groups across India.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 flex items-center justify-center mx-auto sm:mx-0 text-[#C5A059]">
                <Leaf className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold font-serif-luxury text-[#C5A059]">
                Natural Materials
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                River clay, solid brass, natural cotton, and biodegradable packaging — earth-conscious from source to shelf.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/15 flex items-center justify-center mx-auto sm:mx-0 text-[#C5A059]">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold font-serif-luxury text-[#C5A059]">
                Studio Quality
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Every piece is curated, quality-checked, and packaged to arrive as beautiful as it left the artisan&apos;s hands.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
