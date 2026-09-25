import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import ProductCard from './components/ProductCard';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WishlistModal from './components/WishlistModal';
import BulkInquiryModal from './components/BulkInquiryModal';
import ArtisanStory from './components/ArtisanStory';
import InstagramShowcase from './components/InstagramShowcase';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AmbientParticles from './components/DiyaParticles';
import Toast from './components/Toast';
import { PRODUCTS } from './data/products';

function Storefront() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesHindi = product.hindiName?.toLowerCase().includes(query);
        const matchesArtisan = product.artisan?.toLowerCase().includes(query);
        const matchesMaterials = product.materials?.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesHindi && !matchesArtisan && !matchesMaterials && !matchesDesc) {
          return false;
        }
      }

      // Price Filter
      if (priceFilter === 'under-1000' && product.price >= 1000) return false;
      if (priceFilter === '1000-2000' && (product.price < 1000 || product.price > 2000)) return false;
      if (priceFilter === 'above-2000' && product.price <= 2000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first, then review count
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [selectedCategory, searchQuery, sortBy, priceFilter]);

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#1C1917]">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Hero Section */}
      <Hero onExploreClick={scrollToCatalog} />

      {/* Main Catalog */}
      <main id="catalog-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Category & Filters Bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          totalResults={filteredProducts.length}
        />

        {/* Products Grid */}
        <section className="py-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#E8DEC8] p-8 space-y-4">
              <span className="text-4xl">🔍</span>
              <h3 className="text-lg font-bold text-stone-800 font-serif-luxury">
                No matching pieces found
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                We couldn&apos;t find items matching &ldquo;{searchQuery || priceFilter}&rdquo;. Try resetting your filters or exploring our full collection.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setPriceFilter('all');
                }}
                className="px-6 py-2.5 bg-[#1C1917] text-white text-xs font-bold rounded-full shadow hover:bg-[#C5A059] cursor-pointer transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Studio Story Section */}
      <ArtisanStory />

      {/* Instagram Showcase */}
      <InstagramShowcase />

      {/* Client Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer onCategorySelect={(catId) => {
        setSelectedCategory(catId);
        scrollToCatalog();
      }} />

      {/* Modals & Overlays */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistModal />
      <BulkInquiryModal />
      <AmbientParticles />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}
