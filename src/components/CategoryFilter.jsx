import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Sun, 
  Crown, 
  Flower2, 
  Gift, 
  SlidersHorizontal 
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  priceFilter,
  setPriceFilter,
  totalResults
}) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-3.5 h-3.5 text-[#8C4326]" />;
      case 'Sun': return <Sun className="w-3.5 h-3.5 text-[#C5A059]" />;
      case 'Crown': return <Crown className="w-3.5 h-3.5 text-stone-700" />;
      case 'Flower2': return <Flower2 className="w-3.5 h-3.5 text-rose-700" />;
      case 'Gift': return <Gift className="w-3.5 h-3.5 text-[#8C4326]" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />;
    }
  };

  return (
    <div id="catalog-section" className="space-y-6 pt-10 pb-4">
      
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#1C1917] text-white border-[#1C1917] shadow-xs'
                  : 'bg-white text-stone-700 border-[#E5DAC8] hover:bg-stone-50 hover:border-stone-400'
              }`}
            >
              <span>{getIcon(cat.icon)}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Filter and Sorting Options Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5DAC8] shadow-xs">
        
        {/* Results Counter & Price quick filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider mr-2">
            {totalResults} Studio Pieces
          </span>

          <button
            onClick={() => setPriceFilter(priceFilter === 'under-1000' ? 'all' : 'under-1000')}
            className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer border ${
              priceFilter === 'under-1000'
                ? 'bg-stone-900 text-white border-stone-900 font-medium'
                : 'bg-[#FAF7F2] text-stone-600 border-[#E0D5C3] hover:bg-stone-100'
            }`}
          >
            Under ₹1,000
          </button>

          <button
            onClick={() => setPriceFilter(priceFilter === '1000-2000' ? 'all' : '1000-2000')}
            className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer border ${
              priceFilter === '1000-2000'
                ? 'bg-stone-900 text-white border-stone-900 font-medium'
                : 'bg-[#FAF7F2] text-stone-600 border-[#E0D5C3] hover:bg-stone-100'
            }`}
          >
            ₹1,000 - ₹2,000
          </button>

          <button
            onClick={() => setPriceFilter(priceFilter === 'above-2000' ? 'all' : 'above-2000')}
            className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer border ${
              priceFilter === 'above-2000'
                ? 'bg-stone-900 text-white border-stone-900 font-medium'
                : 'bg-[#FAF7F2] text-stone-600 border-[#E0D5C3] hover:bg-stone-100'
            }`}
          >
            ₹2,000+ Luxury Sets
          </button>

          {priceFilter !== 'all' && (
            <button
              onClick={() => setPriceFilter('all')}
              className="text-xs text-[#8C4326] hover:underline ml-1 font-medium cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-xs text-stone-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-medium bg-[#FAF7F2] border border-[#E0D5C3] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#8C4326] text-stone-800"
          >
            <option value="featured">Featured / Best Loved</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

      </div>
    </div>
  );
}
