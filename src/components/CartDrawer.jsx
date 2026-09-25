import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  Tag, 
  Truck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/useCart';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotalItems,
    freeShippingThreshold,
    isFreeShipping,
    shippingCharge,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    discountAmount,
    finalTotal,
    buildWhatsAppOrderUrl,
    setIsCheckoutOpen,
    triggerFestiveCelebration
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  const handleWhatsAppCheckout = () => {
    triggerFestiveCelebration();
    const url = buildWhatsAppOrderUrl();
    window.open(url, '_blank');
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-[#E5DAC8]">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#E5DAC8] bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#8C4326]" />
                <h2 className="text-base font-bold text-stone-900 font-serif-luxury">
                  Your Studio Bag ({cartTotalItems})
                </h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="mt-3 bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DAC8]">
              <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                <span className="flex items-center gap-1.5 text-stone-700">
                  <Truck className="w-3.5 h-3.5 text-[#8C4326]" />
                  {isFreeShipping ? (
                    <span className="text-emerald-800 font-semibold">Complimentary Pan-India Shipping Unlocked!</span>
                  ) : (
                    <span>Add <strong className="text-stone-900">₹{amountNeededForFreeShipping}</strong> for Free Delivery</span>
                  )}
                </span>
                <span className="font-mono text-stone-500">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#8C4326] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-stone-200/60 flex items-center justify-center text-xl">
                  🛍️
                </div>
                <h3 className="text-sm font-semibold text-stone-800 font-serif-luxury">Your bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our handcrafted modern torans, sculptural brass urlis, and minimal candleware.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2 bg-[#1C1917] text-white text-xs font-semibold rounded-full shadow-xs hover:bg-[#2C2420] transition-colors cursor-pointer"
                >
                  Explore Studio Pieces
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-3 bg-white p-3 rounded-xl border border-[#E5DAC8] shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-stone-100"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-stone-900 line-clamp-1 font-serif-luxury">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-300 hover:text-red-600 transition-colors p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-500 font-mono mt-0.5">
                        ₹{item.product.price} each
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 font-bold text-xs"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="px-2 py-0.5 text-xs font-semibold font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-600 hover:bg-stone-200 font-bold text-xs"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      <span className="text-xs font-bold text-stone-900 font-mono">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-[#E5DAC8] space-y-3.5">
              
              {/* Coupon Code Section */}
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E5DAC8]">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-stone-900 font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{appliedCoupon.code} Applied ({appliedCoupon.discountPercent}% OFF)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[#8C4326] hover:underline font-semibold text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Coupon: DIWALI2026"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="w-full pl-7 pr-3 py-1 text-xs uppercase bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#8C4326] font-mono"
                      />
                      <Tag className="w-3 h-3 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1">{couponError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-stone-900">₹{cartSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8C4326] font-medium">
                    <span>Studio Discount</span>
                    <span className="font-mono">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-mono text-stone-900">
                    {shippingCharge === 0 ? <strong className="text-emerald-800">FREE</strong> : `₹${shippingCharge}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between text-sm font-bold text-stone-950">
                  <span>Total</span>
                  <span className="font-mono text-stone-900">₹{finalTotal}</span>
                </div>
              </div>

              {/* Checkout Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-medium rounded-xl text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order via WhatsApp Direct</span>
                </button>

                <button
                  onClick={handleProceedCheckout}
                  className="w-full py-2.5 px-4 bg-[#1C1917] hover:bg-[#2C2420] text-white font-medium rounded-xl text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <span>Enter Shipping Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[10px] text-center text-stone-400">
                All taxes included • Handcrafted in small artisan batches
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
