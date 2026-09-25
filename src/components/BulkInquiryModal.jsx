import React, { useState } from 'react';
import { X, Sparkles, MessageCircle, Building2, User, Phone, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/useCart';
import { WHATSAPP_PHONE } from '../data/products';

export default function BulkInquiryModal() {
  const { isBulkModalOpen, setIsBulkModalOpen, triggerFestiveCelebration, showToast } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    quantity: '25–50 pieces',
    category: 'Curated Gift Hampers & Sets',
    requirements: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isBulkModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    triggerFestiveCelebration();
    showToast('Inquiry sent! Our studio coordinator will reach out on WhatsApp shortly ✨');

    const msg =
      `✨ *BESPOKE / BULK ORDER INQUIRY — HAATH KI KALA*\n` +
      `────────────────────────────\n` +
      `👤 Name: ${formData.name}\n` +
      `🏢 Company / Occasion: ${formData.company || 'Personal'}\n` +
      `📞 WhatsApp: ${formData.phone}\n` +
      `📦 Quantity: ${formData.quantity}\n` +
      `🎁 Category: ${formData.category}\n` +
      `📝 Notes: ${formData.requirements || 'Standard studio packaging'}\n` +
      `────────────────────────────\n` +
      `Kindly share catalog, pricing, and customisation options.`;

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleClose = () => {
    setIsBulkModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">

      <div className="fixed inset-0" onClick={handleClose} />

      <div className="relative bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] shadow-2xl max-w-lg w-full z-10 p-6 sm:p-8">

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#1C1917] font-serif-luxury">
              Inquiry Received!
            </h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              Our studio coordinator will review your requirements and reply on WhatsApp within 1–2 hours with a custom quote and samples.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-[#1C1917] hover:bg-[#C5A059] text-white text-xs font-bold rounded-xl shadow transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-2xl bg-[#C5A059]/10 text-[#C5A059]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1C1917] font-serif-luxury">
                  Bespoke &amp; Bulk Orders
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Corporate gifting, custom branding, wholesale &amp; event sourcing
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">

              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">
                  Your Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Ananya Roy"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">
                  Company / Occasion (Optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    placeholder="e.g. Infosys · Wedding · Personal Event"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                  />
                  <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">
                    Quantity
                  </label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                  >
                    <option value="10–25 pieces">10 – 25 pieces</option>
                    <option value="25–50 pieces">25 – 50 pieces</option>
                    <option value="50–100 pieces">50 – 100 pieces</option>
                    <option value="100–500+ pieces">100 – 500+ pieces</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">
                  Product Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-sm bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                >
                  <option value="Curated Gift Hampers &amp; Sets">Curated Gift Hampers &amp; Sets</option>
                  <option value="Modern Torans &amp; Door Accents">Modern Torans &amp; Door Accents</option>
                  <option value="Brass Urlis &amp; T-Lights">Brass Urlis &amp; T-Lights</option>
                  <option value="Wall Hangings &amp; Décor">Wall Hangings &amp; Décor</option>
                  <option value="Rangolis &amp; Floor Art">Rangolis &amp; Floor Art</option>
                  <option value="Mixed Studio Assortment">Mixed Studio Assortment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide mb-1">
                  Custom Requirements (Optional)
                </label>
                <textarea
                  name="requirements"
                  rows={2}
                  placeholder="e.g. Custom branding, specific color palette, eco packaging, delivery date..."
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-[#E8DEC8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold rounded-xl text-sm shadow flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Send Inquiry on WhatsApp</span>
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
