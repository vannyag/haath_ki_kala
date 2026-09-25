import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/useCart';
import { PRODUCTS } from '../data/products';

export default function WishlistModal() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    triggerFestiveCelebration
  } = useCart();

  if (!isWishlistOpen) return null;

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col justify-between border-l border-amber-200">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-amber-100 bg-amber-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#991B1B] fill-[#991B1B]" />
              <h2 className="text-lg font-bold text-stone-900 font-serif-festive">
                Festive Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-full text-stone-500 hover:text-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Heart className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="text-base font-bold text-stone-800">Your Wishlist is Empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Save your favorite bandhanwars, brass diyas, and rangolis to review later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="px-5 py-2 bg-[#991B1B] text-white text-xs font-bold rounded-full shadow hover:bg-[#7F1D1D] cursor-pointer"
                >
                  Discover Handcrafted Items
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div 
                  key={product.id}
                  className="flex gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-mono font-bold text-[#991B1B] mt-1">
                        ₹{product.price}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          addToCart(product, 1);
                          triggerFestiveCelebration();
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#991B1B]" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-stone-50 border-t border-stone-200 text-center">
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="text-xs font-bold text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
