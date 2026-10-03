import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, RotateCcw, Search, Grid, List } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function ShopPage() {
  const { 
    t, 
    products, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy
  } = useApp();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    { key: 'all', label: t.all_categories },
    { key: 'cat_smartphones', label: t.cat_smartphones },
    { key: 'cat_laptops', label: t.cat_laptops },
    { key: 'cat_audio', label: t.cat_audio },
    { key: 'cat_watches', label: t.cat_watches },
    { key: 'cat_accessories', label: t.cat_accessories },
    { key: 'cat_gaming', label: t.cat_gaming },
  ];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      
      // Search query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const cleanQuery = query.replace(/^#/, '');
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchDesc = p.description ? p.description.toLowerCase().includes(query) : false;
        const matchId = p.id.toLowerCase() === query || p.id.toLowerCase() === cleanQuery || ('#' + p.id.toLowerCase()) === query;
        if (!matchTitle && !matchDesc && !matchId) return false;
      }

      // Price range filter
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

      // Stock filter
      if (inStockOnly && p.stock <= 0) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.id.localeCompare(a.id); // newest first
    });
  }, [products, selectedCategory, searchQuery, priceRange, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, 5000]);
    setInStockOnly(false);
    setSortBy('newest');
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            {t.shop_title}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Jami {filteredProducts.length} ta mahsulot topildi
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="md:hidden flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filtrlar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* LEFT SIDEBAR FILTERS */}
        <aside className={`md:block space-y-6 bg-white dark:bg-gray-800/80 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm ${mobileFilterOpen ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
            <div className="flex items-center gap-2 font-black text-sm text-gray-900 dark:text-white">
              <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
              <span>{t.filter_by_category}</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-rose-500 font-bold flex items-center gap-1 hover:underline"
              title={t.reset_filters}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Tozalash</span>
            </button>
          </div>

          {/* Categories List */}
          <div className="space-y-1.5">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                  selectedCategory === cat.key
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{cat.label}</span>
                <span className="text-[10px] opacity-75">
                  {cat.key === 'all'
                    ? products.length
                    : products.filter(p => p.category === cat.key).length}
                </span>
              </button>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
            <span className="font-extrabold text-xs text-gray-900 dark:text-white block">
              {t.filter_by_price} ($)
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                placeholder={t.min_price}
                className="w-1/2 p-2 rounded-xl text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 dark:text-white outline-none"
              />
              <span className="text-gray-400 font-bold">-</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                placeholder={t.max_price}
                className="w-1/2 p-2 rounded-xl text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 dark:text-white outline-none"
              />
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>{t.in_stock_only}</span>
            </label>
          </div>
        </aside>

        {/* RIGHT MAIN CATALOG GRID */}
        <main className="md:col-span-3 space-y-6">
          
          {/* Sorting Bar */}
          <div className="bg-white dark:bg-gray-800/80 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/60 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300">
              <span>{t.sort_by}:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-900 dark:text-white outline-none"
              >
                <option value="newest">{t.sort_newest}</option>
                <option value="price_low">{t.sort_price_low}</option>
                <option value="price_high">{t.sort_price_high}</option>
                <option value="rating">{t.sort_rating}</option>
              </select>
            </div>
          </div>

          {/* Catalog Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-gray-700 text-indigo-500 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                {t.no_products}
              </h3>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow hover:bg-indigo-700 transition"
              >
                {t.reset_filters}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
