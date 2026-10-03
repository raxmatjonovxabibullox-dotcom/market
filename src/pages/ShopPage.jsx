import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, RotateCcw, Search, Grid, List, Plus, ShieldCheck, X, Package, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function ShopPage() {
  const { 
    t, 
    products, 
    addProduct,
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

  // Quick Add Product Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('cat_smartphones');
  const [newPrice, setNewPrice] = useState('');
  const [newOldPrice, setNewOldPrice] = useState('');
  const [newStock, setNewStock] = useState('10');
  const [newImage, setNewImage] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddNewProduct = (e) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;
    addProduct({
      title: newTitle,
      category: newCategory,
      price: Number(newPrice),
      oldPrice: newOldPrice ? Number(newOldPrice) : null,
      stock: Number(newStock) || 10,
      image: newImage || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
      description: newDesc
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsAddModalOpen(false);
      setNewTitle('');
      setNewPrice('');
      setNewOldPrice('');
      setNewDesc('');
      setNewImage('');
    }, 1200);
  };

  const categories = [
    { key: 'all', label: t.all_categories },
    { key: 'cat_smartphones', label: t.cat_smartphones },
    { key: 'cat_laptops', label: t.cat_laptops },
    { key: 'cat_tv', label: t.cat_tv || 'Televizorlar' },
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
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;
      const ratingA = Number(a.rating) || 0;
      const ratingB = Number(b.rating) || 0;

      if (sortBy === 'price_low') {
        return priceA - priceB;
      }
      if (sortBy === 'price_high') {
        return priceB - priceA;
      }
      if (sortBy === 'rating') {
        return ratingB - ratingA;
      }
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      return String(b.id).localeCompare(String(a.id), undefined, { numeric: true });
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
    <div className="container mx-auto px-4 py-8 space-y-6">
      
      {/* Admin Quick Action Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3 text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-xs sm:text-sm block">Mahsulotlar Boshqaruvi (Admin Tools)</span>
            <span className="text-[10px] text-slate-400">Yangi tovar qo'shish, tahrirlash yoki o'chirish</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs shadow-md shadow-cyan-500/25 hover:opacity-90 flex items-center gap-1.5 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Yangi Tovar Qo'shish</span>
          </button>

          <Link
            to="/admin"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Rocker Admin Panel ➔</span>
          </Link>
        </div>
      </div>

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

      {/* Quick Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="font-black text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-cyan-500" />
                <span>Yangi Mahsulot Qo'shish</span>
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {savedSuccess ? (
              <div className="p-6 text-center space-y-2">
                <Check className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-black text-lg">Muvaffaqiyatli qo'shildi!</h4>
                <p className="text-xs text-slate-500">Mahsulot katalogga joylashtirildi.</p>
              </div>
            ) : (
              <form onSubmit={handleAddNewProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Mahsulot Nomi *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Masalan: iPhone 16 Pro Max 256GB"
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Kategoriya</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-cyan-500"
                    >
                      <option value="cat_smartphones">Smartfonlar</option>
                      <option value="cat_laptops">Noutbuklar</option>
                      <option value="cat_tv">Smart Televizorlar</option>
                      <option value="cat_audio">Audio</option>
                      <option value="cat_watches">Soatlar</option>
                      <option value="cat_gaming">Gaming</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Narxi ($) *</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="999"
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Eski Narxi ($)</label>
                    <input
                      type="number"
                      value={newOldPrice}
                      onChange={(e) => setNewOldPrice(e.target.value)}
                      placeholder="1199"
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Omborda (dona)</label>
                    <input
                      type="number"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Rasm URL</label>
                  <input
                    type="text"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="https://... yoki /images/..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Tavsif</label>
                  <textarea
                    rows="2"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Tovar haqida qisqacha ma'lumot..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black shadow hover:opacity-95 transition"
                  >
                    Saqlash
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
