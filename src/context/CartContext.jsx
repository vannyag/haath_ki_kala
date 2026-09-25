import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { WHATSAPP_PHONE } from '../data/products';
import { CartContext } from './cartContextDefinition';

export function CartProvider({ children }) {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('haath_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('haath_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [diyaGlowActive, setDiyaGlowActive] = useState(true);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Toast feedback
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('haath_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('haath_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const triggerFestiveCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF9933', '#FFD700', '#B71C1C', '#00695C', '#E65100']
    });
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to cart! 🪔`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from favorites', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to your festive wishlist! ❤️');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Cart calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Free shipping threshold ₹999
  const freeShippingThreshold = 999;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0;
  const shippingCharge = isFreeShipping ? 0 : 99;

  // Coupons: 'DIWALI2026' -> 15% off, 'UTSAV10' -> 10% off
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'DIWALI2026') {
      setAppliedCoupon({ code: 'DIWALI2026', discountPercent: 15, name: 'Diwali Festive Special (15% OFF)' });
      setCouponError('');
      triggerFestiveCelebration();
      showToast('Coupons applied! 15% Festive Discount activated! 🎆');
      return true;
    } else if (clean === 'UTSAV10') {
      setAppliedCoupon({ code: 'UTSAV10', discountPercent: 10, name: 'Utsav Welcome Offer (10% OFF)' });
      setCouponError('');
      triggerFestiveCelebration();
      showToast('Coupon applied! 10% Discount activated! 🎆');
      return true;
    } else {
      setCouponError('Invalid coupon code. Try DIWALI2026 or UTSAV10');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const discountAmount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + (cartSubtotal > 0 ? shippingCharge : 0));

  // Build WhatsApp Order Link
  const buildWhatsAppOrderUrl = (customerInfo = {}) => {
    if (cart.length === 0) return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Namaste Haath Ki Kala! I would like to inquire about your festive collection.')}`;

    const itemsText = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}*\n   Qty: ${item.quantity} × ₹${item.product.price} = ₹${item.quantity * item.product.price}`
      )
      .join('\n\n');

    let message = `🪔 *NEW DIWALI ORDER - HAATH KI KALA*\n`;
    message += `------------------------------------\n`;
    message += `${itemsText}\n`;
    message += `------------------------------------\n`;
    message += `*Subtotal:* ₹${cartSubtotal}\n`;
    if (discountAmount > 0) {
      message += `*Coupon Discount (${appliedCoupon?.code}):* -₹${discountAmount}\n`;
    }
    message += `*Shipping:* ${shippingCharge === 0 ? 'FREE' : `₹${shippingCharge}`}\n`;
    message += `*Total Amount:* ₹${finalTotal}\n`;
    message += `------------------------------------\n`;

    if (customerInfo.fullName) {
      message += `*Customer Details:*\n`;
      message += `👤 Name: ${customerInfo.fullName}\n`;
      message += `📞 Phone: ${customerInfo.phone}\n`;
      message += `📍 Address: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} - ${customerInfo.pincode}\n`;
      if (customerInfo.note) {
        message += `📝 Note: ${customerInfo.note}\n`;
      }
      message += `💳 Preferred Payment: ${customerInfo.paymentMethod || 'UPI / Online'}\n`;
    }

    message += `\nPlease confirm my order and share payment details. Shubh Deepawali! ✨`;

    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
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
        triggerFestiveCelebration,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProduct,
        setSelectedProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isBulkModalOpen,
        setIsBulkModalOpen,
        diyaGlowActive,
        setDiyaGlowActive,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
