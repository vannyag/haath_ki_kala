import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  MessageCircle, 
  Sparkles, 
  Truck, 
  Layers,
  Ruler,
  Instagram
} from 'lucide-react';
import { useCart } from '../context/useCart';
import { WHATSAPP_PHONE, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../data/products';

export default function ProductModal() {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    triggerFestiveCelebration 
  } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  const isFavorited = isInWishlist(selectedProduct.id);
  const gallery = selectedProduct.gallery && selectedProduct.gallery.length > 0
    ? selectedProduct.gallery
    : [selectedProduct.image];

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    triggerFestiveCelebration();
    setSelectedProduct(null);
  };

  const handleWhatsAppOrder = () => {
    const msg = `Hi Haath Ki Kala! ✨\nI would like to order:\n*${selectedProduct.name}*\nQuantity: ${quantity}\nTotal: ₹${selectedProduct.price * quantity}\nArtisan: ${selectedProduct.artisan}\n\nPlease share delivery confirmation and payment details.`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div 
        className="fixed inset-0" 
        onClick={() => setSelectedProduct(null)} 
      />

      <div className="relative bg-[#FAF7F2] rounded-3xl border border-[#DED4C5] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-xs transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#E5DAC8]">
              <img
                src={gallery[activeImageIndex] || selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {selectedProduct.badge && (
                <div className="absolute top-3 left-3 bg-[#1C1917]/90 backdrop-blur-md text-[#EDE6DD] text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-xs">
                  {selectedProduct.badge}
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#8C4326] scale-105 shadow-xs'
                        : 'border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Instagram Attribution Box */}
            <div className="bg-white rounded-2xl p-4 border border-[#E5DAC8] text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-[#8C4326]" />
                  <span>Curated from @{INSTAGRAM_HANDLE}</span>
                </span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8C4326] hover:underline font-semibold"
                >
                  View on Instagram ↗
                </a>
              </div>
              <p className="text-stone-600 leading-relaxed">
                {selectedProduct.stylingNote || 'Styled for contemporary and Indo-Western interiors.'}
              </p>
            </div>
          </div>

          {/* Right Column: Product Details & Purchase Actions */}
          <div className="flex flex-col justify-between space-y-5">
            <div>
              {/* Category & Wishlist */}
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#8C4326]">
                  {selectedProduct.category}
                </span>
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className={`p-2 rounded-full border transition-all ${
                    isFavorited
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-white text-stone-600 border-stone-200 hover:text-red-500'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-600' : ''}`} />
                </button>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif-luxury mt-1.5">
                {selectedProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-white border border-[#E5DAC8] text-stone-800 px-2 py-0.5 rounded text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                  <span>{selectedProduct.rating}</span>
                </div>
                <span className="text-xs text-stone-500">
                  {selectedProduct.reviewsCount} customer reviews
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl sm:text-3xl font-bold text-stone-900 font-mono">
                  ₹{selectedProduct.price}
                </span>
                <span className="text-sm text-stone-400 line-through font-mono">
                  ₹{selectedProduct.originalPrice}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 bg-[#8C4326]/10 text-[#8C4326] rounded">
                  Save ₹{selectedProduct.originalPrice - selectedProduct.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-4">
                {selectedProduct.description}
              </p>

              {/* Specifications Box */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-y border-[#E5DAC8] py-3">
                <div className="flex items-start gap-2 text-stone-600">
                  <Layers className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-stone-800">Materials:</span>
                    <span>{selectedProduct.materials}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-stone-600">
                  <Ruler className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-stone-800">Dimensions:</span>
                    <span>{selectedProduct.dimensions}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-stone-600">
                <Truck className="w-4 h-4 text-[#8C4326] shrink-0" />
                <span>Complimentary Pan-India express delivery with transit damage guarantee.</span>
              </div>
            </div>

            {/* Actions: Quantity + Bag + WhatsApp */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-stone-700 uppercase">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-semibold font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-100 font-bold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-stone-500">
                  Total: <strong className="text-stone-900 font-mono">₹{selectedProduct.price * quantity}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#1C1917] hover:bg-[#2C2420] text-white rounded-xl font-semibold text-xs tracking-wide shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl font-semibold text-xs shadow-xs transition-all active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-stone-500">
                🔒 Safe checkout • Direct artisan studio fulfillment
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
