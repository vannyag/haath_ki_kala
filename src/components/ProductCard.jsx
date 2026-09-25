import React from 'react';
import { Heart, ShoppingBag, Eye, Star, MessageCircle } from 'lucide-react';
import { useCart } from '../context/useCart';
import { WHATSAPP_PHONE } from '../data/products';

export default function ProductCard({ product }) {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setSelectedProduct,
    triggerFestiveCelebration 
  } = useCart();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleWhatsAppBuySingle = (e) => {
    e.stopPropagation();
    const msg = `Hi Haath Ki Kala! ✨\nI would like to order this piece from your collection:\n*${product.name}*\nPrice: ₹${product.price} (Original: ₹${product.originalPrice})\nRef: ${product.instagramTag || 'Haath Ki Kala Studio'}\n\nPlease share delivery confirmation and payment details!`;
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#E5DAC8] hover:border-[#8C4326]/50 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Image Section */}
      <div className="relative aspect-[4/3] bg-[#FAF7F2] overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Soft vignette on hover */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badge: Bestseller / Eco-Friendly / Limited Edition */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#1C1917]/90 backdrop-blur-md text-[#EDE6DD] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute bottom-3 left-3 bg-[#8C4326] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
            {discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isFavorited 
              ? 'bg-red-50 text-red-600 shadow-xs scale-110' 
              : 'bg-white/80 hover:bg-white text-stone-600 hover:text-red-500'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-red-600 text-red-600' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          className="absolute inset-x-4 bottom-3 hidden group-hover:flex items-center justify-center gap-1.5 bg-white/95 hover:bg-white text-stone-900 py-2 rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-[#8C4326]" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Instagram Tag & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="truncate text-[11px] font-medium text-[#8C4326]">
              {product.instagramTag || product.artisan}
            </span>
            <div className="flex items-center gap-1 text-stone-700 font-medium shrink-0 text-xs">
              <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
              <span>{product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Main Title */}
          <h3 
            onClick={() => setSelectedProduct(product)}
            className="text-sm font-semibold text-stone-900 font-serif-luxury group-hover:text-[#8C4326] transition-colors line-clamp-2 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Materials hint */}
          <p className="text-[11px] text-stone-500 mt-1 line-clamp-1">
            {product.materials}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 mt-3 border-t border-[#EDE4D5]">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base sm:text-lg font-bold text-stone-900 font-mono">
              ₹{product.price}
            </span>
            <span className="text-xs text-stone-400 line-through font-mono">
              ₹{product.originalPrice}
            </span>
            <span className="text-[10px] text-emerald-800 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
              Free Delivery
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Add to Cart */}
            <button
              onClick={() => {
                addToCart(product, 1);
                triggerFestiveCelebration();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#FAF7F2] hover:bg-stone-200 text-stone-900 font-semibold rounded-xl text-xs transition-colors cursor-pointer active:scale-95 border border-[#E0D5C3]"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#8C4326]" />
              <span>Add to Bag</span>
            </button>

            {/* Direct WhatsApp Buy */}
            <button
              onClick={handleWhatsAppBuySingle}
              title="Order this product directly on WhatsApp"
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#1C1917] hover:bg-[#2C2420] text-white font-medium rounded-xl text-xs transition-colors shadow-xs cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Order</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
