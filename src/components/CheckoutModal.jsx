import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  MessageCircle, 
  MapPin, 
  User, 
  Phone, 
  Copy,
  Check,
  Package
} from 'lucide-react';
import { useCart } from '../context/useCart';

export default function CheckoutModal() {
  const {
    cart,
    appliedCoupon,
    shippingCharge,
    finalTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    triggerFestiveCelebration,
    buildWhatsAppOrderUrl,
    showToast
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    note: '',
    paymentMethod: 'UPI (GPay / PhonePe / Paytm)'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      alert('Please fill in your name, phone number, address, and pincode');
      return;
    }

    const generatedId = `HKK-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsSubmitted(true);
    triggerFestiveCelebration();
    showToast('Order placed! Opening WhatsApp to confirm ✨');
  };

  const handleOpenWhatsApp = () => {
    const url = buildWhatsAppOrderUrl(formData);
    window.open(url, '_blank');
  };

  const handleCopyOrder = () => {
    const summary = `HAATH KI KALA ORDER #${orderId}\nCustomer: ${formData.fullName} (${formData.phone})\nTotal: ₹${finalTotal}\nItems: ${cart.length} piece(s)\nShip To: ${formData.address}, ${formData.city} - ${formData.pincode}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloseAndReset = () => {
    setIsCheckoutOpen(false);
    if (isSubmitted) {
      clearCart();
      setIsSubmitted(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">

      {/* Backdrop */}
      <div className="fixed inset-0" onClick={handleCloseAndReset} />

      <div className="relative bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 p-6 sm:p-8">

        {/* Close Button */}
        <button
          onClick={handleCloseAndReset}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          /* Order Confirmation */
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
                Order Confirmed
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] font-serif-luxury">
                Thank you, {formData.fullName}!
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Your order ID is <strong className="font-mono text-[#1C1917]">#{orderId}</strong>
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-[#E8DEC8] text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between font-semibold border-b border-[#E8DEC8] pb-1.5">
                <span>Total Amount:</span>
                <span className="font-mono text-base text-[#1C1917]">₹{finalTotal}</span>
              </div>
              <div>
                <span className="font-semibold text-stone-600">Delivery Address:</span>
                <p className="text-stone-500 mt-0.5">
                  {formData.address}, {formData.city}, {formData.state} – {formData.pincode}
                </p>
              </div>
              <div>
                <span className="font-semibold text-stone-600">Payment Method:</span>
                <p className="text-stone-500 mt-0.5">{formData.paymentMethod}</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <button
                onClick={handleOpenWhatsApp}
                className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-2xl text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Confirm on WhatsApp (Recommended)</span>
              </button>

              <button
                onClick={handleCopyOrder}
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-500" />}
                <span>{copied ? 'Copied!' : 'Copy Order Summary'}</span>
              </button>

              <button
                onClick={handleCloseAndReset}
                className="text-xs text-stone-400 hover:text-stone-700 underline block mx-auto cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="border-b border-[#E8DEC8] pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#C5A059]/10 text-[#C5A059]">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] font-serif-luxury">
                    Studio Order &amp; Delivery
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Handcrafted pieces shipped directly from Indian artisan studios
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                    />
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">
                    WhatsApp Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                    />
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">
                  Delivery Address *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="House / Flat No., Street, Landmark"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                  />
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* City, State, Pincode */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Delhi"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    placeholder="e.g. Rajasthan"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    placeholder="6 digits"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059] font-mono"
                  />
                </div>
              </div>

              {/* Gift Note */}
              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">
                  Gift Note / Delivery Instructions (Optional)
                </label>
                <textarea
                  name="note"
                  rows={2}
                  placeholder="e.g. Gift for my sister — please include a handwritten card."
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-2">
                  Payment Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'UPI (GPay / PhonePe / Paytm)',
                    'Cash On Delivery (COD)',
                    'NetBanking / Cards'
                  ].map((method) => (
                    <label
                      key={method}
                      className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all text-xs font-semibold ${
                        formData.paymentMethod === method
                          ? 'border-[#C5A059] bg-[#C5A059]/10 text-[#1C1917] shadow-sm'
                          : 'border-[#E8DEC8] hover:bg-white text-stone-600'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange}
                        className="accent-[#C5A059]"
                      />
                      <span>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Summary Pill */}
              <div className="bg-white p-3 rounded-xl border border-[#E8DEC8] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#1C1917] block">Total: ₹{finalTotal}</span>
                  <span className="text-stone-500">
                    {cart.length} piece(s) · {shippingCharge === 0 ? 'Free Shipping' : '₹99 Delivery'}
                  </span>
                </div>
                {appliedCoupon && (
                  <span className="bg-[#1C1917] text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded">
                    {appliedCoupon.code} applied
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#1C1917] hover:bg-[#C5A059] text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer active:scale-95"
              >
                Place Order · ₹{finalTotal}
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
