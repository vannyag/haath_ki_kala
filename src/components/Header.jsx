import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  Instagram,
  Gift
} from 'lucide-react';
import { useCart } from '../context/useCart';
import { CATEGORIES, INSTAGRAM_URL } from '../data/products';
import BrandLogo from './BrandLogo';

export default function Header({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  const { 
    cartTotalItems, 
    cartSubtotal, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen,
    setIsBulkModalOpen,
    diyaGlowActive,
    setDiyaGlowActive
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setMobileMenuOpen(false);
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DEC8] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-800 hover:bg-stone-200/50 transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Logo Component */}
          <a href="#" className="flex items-center group cursor-pointer">
            <BrandLogo />
          </a>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search torans, urlis, t-lights, art, rangolis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-[#DED4C5] rounded-full focus:outline-none focus:ring-1 focus:ring-[#8C4326] focus:border-[#8C4326] transition-all text-[#1C1917] placeholder-stone-400"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Actions: Ambient Glow, Instagram, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Search Button */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 md:hidden text-stone-700 hover:bg-stone-200/50 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Ambient Warm Glow Toggle */}
            <button
              onClick={() => setDiyaGlowActive(!diyaGlowActive)}
              title={diyaGlowActive ? "Ambient warm lighting active" : "Enable ambient warm lighting"}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                diyaGlowActive 
                  ? 'bg-amber-50 text-[#8C4326] border-amber-300 shadow-xs' 
                  : 'bg-stone-50 text-stone-500 border-stone-200 opacity-60'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${diyaGlowActive ? 'text-[#C5A059]' : 'text-stone-400'}`} />
              <span>{diyaGlowActive ? 'Warm Aura On' : 'Warm Aura'}</span>
            </button>

            {/* Instagram Quick Link */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-stone-700 hover:text-stone-950 border border-stone-200 hover:border-stone-400 bg-white transition-all"
            >
              <Instagram className="w-3.5 h-3.5 text-[#8C4326]" />
              <span>Instagram</span>
            </a>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 text-stone-700 hover:text-[#8C4326] hover:bg-stone-100 rounded-full transition-colors"
              aria-label="Saved Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-[#8C4326] text-[#8C4326]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 w-4 h-4 bg-[#8C4326] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 pl-3.5 pr-4 py-2 bg-[#1C1917] hover:bg-[#2C2420] text-white rounded-full font-medium text-xs shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                {cartTotalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#8C4326] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartTotalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Bag</span>
              {cartSubtotal > 0 && (
                <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-stone-200 font-mono">
                  ₹{cartSubtotal}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input dropdown */}
        {mobileSearchOpen && (
          <div className="py-2.5 md:hidden border-t border-stone-200 animate-in fade-in duration-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search torans, urlis, t-lights, art, rangolis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-8 py-2 text-xs bg-white border border-stone-300 rounded-full focus:outline-none focus:ring-1 focus:ring-[#8C4326] text-stone-900"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Desktop Quick Category Bar */}
        <nav className="hidden lg:flex items-center justify-center gap-1 py-2.5 border-t border-[#EDE4D5] text-xs font-medium text-stone-700">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-3.5 py-1 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'hover:bg-stone-200/50 text-stone-700'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-stone-200 px-4 py-4 space-y-3 shadow-lg">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Browse Collections</p>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`p-2.5 rounded-xl text-left text-xs font-medium border flex flex-col ${
                  selectedCategory === cat.id
                    ? 'bg-[#1C1917] text-white border-[#1C1917]'
                    : 'bg-white text-stone-800 border-[#E5DAC8]'
                }`}
              >
                <span className="font-semibold">{cat.name}</span>
                <span className="text-[10px] opacity-75">{cat.tag}</span>
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 flex flex-col gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#8C4326] bg-amber-50 rounded-xl border border-amber-200"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @haath_ki_kala on Instagram</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBulkModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-stone-700 bg-white rounded-xl border border-stone-200"
            >
              <Gift className="w-4 h-4" />
              <span>Bespoke & Corporate Gifting Inquiries</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
