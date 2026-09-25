import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  MapPin, 
  Phone, 
  Heart, 
  ShieldCheck,
  Truck,
  RotateCcw,
  Instagram
} from 'lucide-react';
import { WHATSAPP_PHONE, INSTAGRAM_URL } from '../data/products';
import { useCart } from '../context/useCart';

export default function Footer({ onCategorySelect }) {
  const { showToast, triggerFestiveCelebration, setIsBulkModalOpen } = useCart();
  const [emailInput, setEmailInput] = useState('');

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      triggerFestiveCelebration();
      showToast('Welcome to the Haath Ki Kala studio! Use STUDIO10 for 10% off your first order ✨');
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-[#1C1917] text-[#F3E8D6] pt-16 pb-10 border-t border-[#2E2520]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Top Promise Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-12 border-b border-stone-800">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-stone-800">
            <div className="p-3 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-100 font-serif-luxury">
                Pan-India Delivery
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Careful packaging, reliable shipping to every corner of India.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-stone-800">
            <div className="p-3 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-100 font-serif-luxury">
                Authentic Handcraft
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Sourced directly from skilled artisan studios — never mass-produced.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-stone-800">
            <div className="p-3 rounded-xl bg-[#C5A059]/10 text-[#C5A059] shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-100 font-serif-luxury">
                Transit Protection
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Free replacement if any fragile piece arrives damaged in transit.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-[#C5A059] font-serif-luxury tracking-wide">
                Haath Ki Kala
              </h3>
              <p className="text-[10px] tracking-widest text-stone-500 uppercase font-semibold mt-0.5">
                Handcrafted in India · Est. 2024
              </p>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              A curated studio bringing India&apos;s finest handcraft traditions into contemporary homes worldwide — with authenticity, care, and a global sensibility.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Hi! I found Haath Ki Kala and would love to know more.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-stone-950 font-bold text-xs hover:bg-[#1EBE5D] transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-stone-950" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-semibold transition-colors border border-stone-700"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
            </div>

            <button
              onClick={() => setIsBulkModalOpen(true)}
              className="text-xs text-[#C5A059] hover:text-amber-300 underline underline-offset-2 transition-colors"
            >
              Corporate &amp; Bulk Orders →
            </button>
          </div>

          {/* Shop Categories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Shop Collection
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onCategorySelect('torans')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer text-left"
                >
                  Modern Torans &amp; Door Accents
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect('tlights')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer text-left"
                >
                  Brass Urlis &amp; T-Lights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect('wall-decor')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer text-left"
                >
                  Wall Hangings &amp; Décor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect('rangolis')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer text-left"
                >
                  Rangolis &amp; Floor Art
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect('hampers')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer text-left"
                >
                  Gift Hampers &amp; Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onCategorySelect('all')}
                  className="hover:text-[#C5A059] transition-colors cursor-pointer text-left font-semibold text-stone-300"
                >
                  View All →
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>hello@haathkikala.in</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>New Delhi, India</span>
              </li>
              <li className="text-[11px] text-stone-600 pt-1">
                Mon – Sun · 9 AM – 9 PM IST
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
              Join the Studio
            </h4>
            <p className="text-xs text-stone-400">
              Get early access to new arrivals, artisan stories, and an exclusive 10% welcome discount.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white/5 border border-stone-700 rounded-lg text-white placeholder-stone-600 focus:outline-none focus:border-[#C5A059]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#C5A059] hover:bg-[#D4AF37] text-stone-950 font-bold text-xs rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Join
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <p>© 2026 Haath Ki Kala. All Rights Reserved.</p>
          <div className="flex items-center gap-1 text-stone-500">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#B25E3B] fill-[#B25E3B]" />
            <span>by Indian artisans, for global homes</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
