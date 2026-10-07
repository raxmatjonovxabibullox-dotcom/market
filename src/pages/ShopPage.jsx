import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, RotateCcw, Search, Grid, List, Plus, ShieldCheck, X, Package, Check, Flame, Edit3, Trash2, Table, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { useTypewriter } from '../hooks/useTypewriter';

export default function ShopPage() {
  const { 
    t, 
    products, 
    addProduct,
    updateProduct,
    deleteProduct,
    searchQuery, 
    setSearchQuery, 
    typeSearchQuery,
    selectedCategory, 
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    user
  } = useApp();

  const animatedPlaceholder = useTypewriter([
    "Samsung Galaxy S25 Ultra...",
    "Apple iPhone 16 Pro Max...",
    "Samsung The Frame Smart TV...",
    "Apple MacBook Pro 16...",
    "Sony PlayStation 5 Pro...",
    "AirPods Pro 2 yoki ID (#p2)..."
  ]);

  const [searchParams, setSearchParams] = useSearchParams();
  const isFlashOnly = searchParams.get('filter') === 'flash';

  const [inStockOnly, setInStockOnly] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isTableViewOpen, setIsTableViewOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

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

  // Edit Product Modal state
  const [editingProduct, setEditingProduct] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editOldPrice, setEditOldPrice] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editSuccess, setEditSuccess] = useState(false);

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setEditTitle(p.title || '');
    setEditCategory(p.category || 'cat_smartphones');
    setEditPrice(p.price || '');
    setEditOldPrice(p.oldPrice || '');
    setEditStock(p.stock || '10');
    setEditImage(p.image || '');
    setEditDesc(p.description || '');
  };

  const handleSaveEditProduct = (e) => {
    e.preventDefault();
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
      alert("Faqat administrator yoki do'kon egasi tovarni tahrirlashi mumkin!");
      return;
    }
    if (!editingProduct || !editTitle || !editPrice) return;
    updateProduct(editingProduct.id, {
      title: editTitle,
      category: editCategory,
      price: Number(editPrice),
      oldPrice: editOldPrice ? Number(editOldPrice) : null,
      stock: Number(editStock) || 10,
      image: editImage || editingProduct.image,
      description: editDesc
    });
    setEditSuccess(true);
    setTimeout(() => {
      setEditSuccess(false);
      setEditingProduct(null);
    }, 1200);
  };

  const handleDeleteProduct = (productId, title) => {
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
      alert("Faqat administrator yoki do'kon egasi tovarni o'chirishi mumkin!");
      return;
    }
    if (window.confirm(`"${title}" mahsulotini o'chirmoqchimisiz?`)) {
      deleteProduct(productId);
    }
  };

  const handleAddNewProduct = (e) => {
    e.preventDefault();
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
      alert("Faqat administrator yoki do'kon egasi yangi tovar qo'sha oladi!");
      return;
    }
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

      // Flash sale filter if URL has ?filter=flash
      if (isFlashOnly && !p.isFlashSale && !(p.oldPrice && p.oldPrice > p.price)) {
        return false;
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
  }, [products, selectedCategory, searchQuery, priceRange, inStockOnly, sortBy, isFlashOnly]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, 5000]);
    setInStockOnly(false);
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      
      {/* Admin Quick Action Banner - Faqat Admin va Owner uchun */}
      {user && (user.role === 'admin' || user.role === 'owner') && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-xs sm:text-sm block">Mahsulotlar Boshqaruvi (Admin & CRUD Tools)</span>
              <span className="text-[10px] text-slate-400">Yangi tovar qo'shish, tahrirlash yoki o'chirish ({user.name})</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs shadow-md shadow-cyan-500/25 hover:opacity-90 flex items-center gap-1.5 transition"
            >
              <Plus className="w-4 h-4" />
              <span>➕ Yangi Tovar Qo'shish</span>
            </button>

            <button
              onClick={() => setIsTableViewOpen(!isTableViewOpen)}
              className={`px-3.5 py-2 rounded-xl border font-bold text-xs flex items-center gap-1.5 transition ${
                isTableViewOpen
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700'
              }`}
            >
              <Table className="w-4 h-4 text-cyan-400" />
              <span>{isTableViewOpen ? 'Jadvalni Yopish' : '📋 Tovarlar Jadvali (CRUD)'}</span>
            </button>

            <Link
              to="/admin"
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-black text-xs flex items-center gap-1.5 shadow transition"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>👑 Rocker Admin Panel ➔</span>
            </Link>
          </div>
        </div>
      )}

      {/* CRUD TABLE VIEW (Faqat Admin va Owner uchun) */}
      {user && (user.role === 'admin' || user.role === 'owner') && isTableViewOpen && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-cyan-500/40 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Table className="w-5 h-5 text-cyan-500" />
                <span>Barcha Mahsulotlar Jadvali (Tezkor Boshqaruv - CRUD)</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Har bir tovarni to'g'ridan-to'g'ri shu yerda tahrirlashingiz yoki o'chirishingiz mumkin.
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yangi Mahsulot</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-800/80 uppercase font-black text-[10px] text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="p-3">Rasm</th>
                  <th className="p-3">ID</th>
                  <th className="p-3">Nomi</th>
                  <th className="p-3">Kategoriya</th>
                  <th className="p-3">Narxi</th>
                  <th className="p-3">Omborda</th>
                  <th className="p-3 text-right">Amallar (CRUD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProducts.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="p-3">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-10 h-10 object-cover rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop";
                        }}
                      />
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-500">#{p.id}</td>
                    <td className="p-3 font-bold text-slate-900 dark:text-white max-w-xs truncate">{p.title}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold text-[10px]">
                        {t[p.category] || p.category}
                      </span>
                    </td>
                    <td className="p-3 font-black text-slate-900 dark:text-white">${p.price}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${p.stock > 0 ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50' : 'bg-rose-50 text-rose-600'}`}>
                        {p.stock} dona
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 font-bold flex items-center gap-1 shadow-sm active:scale-95 transition"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Tahrirlash</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(p.id, p.title)}
                          className="px-2.5 py-1 rounded-lg bg-rose-600 text-white hover:bg-rose-500 font-bold flex items-center gap-1 shadow-sm active:scale-95 transition"
                          title="O'chirish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>O'chirish</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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

          {/* PROMINENT SEARCH BAR (Qidiruv maydoni) */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-3">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={animatedPlaceholder ? `🔍 ${animatedPlaceholder}` : "Mahsulot nomi, toifa yoki ID (#p1)..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-24 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm font-medium shadow-inner"
              />
              <Search className="w-5 h-5 text-indigo-500 absolute left-3.5 pointer-events-none" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-rose-100 hover:text-rose-600 transition flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Tozalash</span>
                </button>
              )}
            </div>

            {/* Live Search Info & Popular Search Tags with Animated Typing */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                {searchQuery ? (
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    "{searchQuery}" bo'yicha: <b>{filteredProducts.length}</b> ta tovar topildi
                  </span>
                ) : (
                  <span>Katalogda: <b>{filteredProducts.length}</b> ta mahsulot mavjud</span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="text-slate-400 font-semibold">Teglar:</span>
                {['iPhone 15', 'MacBook', 'Samsung', 'Sony', 'Smart TV', 'Gaming', 'AirPods'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => typeSearchQuery(tag)}
                    className="px-2.5 py-0.5 rounded-lg bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 font-bold transition active:scale-95 shadow-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls Bar: Sort, View Mode, Count */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300">
              <span className="text-slate-400">Natijalar:</span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-black">
                {filteredProducts.length} ta tovar
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 hidden sm:inline">Saralash:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="newest">Yangi kelganlar</option>
                  <option value="price_low">Narx: Arzondan qimmatga</option>
                  <option value="price_high">Narx: Qimmatdan arzonga</option>
                  <option value="rating">Reyting bo'yicha</option>
                </select>
              </div>

              {/* Grid / List Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition ${
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title="Kataklar ko'rinishi (Grid)"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition ${
                    viewMode === 'list'
                      ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title="Ro'yxat ko'rinishi (List)"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* PRODUCT CARDS LIST / GRID */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 px-6 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-500 mx-auto flex items-center justify-center">
                <Package className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-gray-900 dark:text-white">
                  Hech qanday mahsulot topilmadi
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                  Qidiruv so'zini o'zgartirib ko'ring yoki filtrlarni tozalang.
                </p>
              </div>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition shadow"
              >
                Barcha filtrlarni tozalash
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onEdit={(p) => handleOpenEdit(p)}
                  onDelete={(p) => handleDeleteProduct(p.id, p.title)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-2xl bg-slate-100 dark:bg-slate-800 shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-400 font-bold">#{product.id}</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                          {t[product.category] || product.category}
                        </span>
                      </div>
                      <h4 className="font-black text-sm text-slate-900 dark:text-white truncate">
                        {product.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="text-right">
                      <div className="font-black text-base text-slate-900 dark:text-white">
                        ${product.price}
                      </div>
                      {product.oldPrice && (
                        <div className="text-xs text-slate-400 line-through">
                          ${product.oldPrice}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition"
                        title="Tezkor ko'rish"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {user && (user.role === 'admin' || user.role === 'owner') && (
                        <>
                          <button
                            onClick={() => handleOpenEdit(product)}
                            className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-600 transition"
                            title="Tahrirlash"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id, product.title)}
                            className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-600 transition"
                            title="O'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
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
      {isAddModalOpen && user && (user.role === 'admin' || user.role === 'owner') && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddModalOpen(false);
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto"
        >
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 my-auto max-h-[90vh] overflow-y-auto custom-scrollbar">
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

      {/* Edit Product Modal (CRUD Tahrirlash) */}
      {editingProduct && user && (user.role === 'admin' || user.role === 'owner') && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingProduct(null);
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto"
        >
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 my-auto max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="font-black text-base flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-indigo-500" />
                <span>Mahsulotni Tahrirlash (ID: #{editingProduct.id})</span>
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {editSuccess ? (
              <div className="p-6 text-center space-y-2">
                <Check className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-black text-lg">Muvaffaqiyatli saqlandi!</h4>
                <p className="text-xs text-slate-500">O'zgarishlar darhol yangilandi.</p>
              </div>
            ) : (
              <form onSubmit={handleSaveEditProduct} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Mahsulot Nomi *</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Kategoriya</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-indigo-500"
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
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">Eski Narxi ($)</label>
                    <input
                      type="number"
                      value={editOldPrice}
                      onChange={(e) => setEditOldPrice(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Omborda (dona)</label>
                    <input
                      type="number"
                      value={editStock}
                      onChange={(e) => setEditStock(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">Rasm URL</label>
                  <input
                    type="text"
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1">Tavsif</label>
                  <textarea
                    rows="2"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black shadow hover:opacity-95 transition"
                  >
                    O'zgarishlarni Saqlash
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
