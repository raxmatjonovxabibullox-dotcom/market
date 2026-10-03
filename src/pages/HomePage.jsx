import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Zap,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Gamepad2,
  ShieldCheck,
  Truck,
  Clock,
  RefreshCw,
  Gift,
  Tv,
  Search,
  Heart,
  ShoppingBag,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';

export default function HomePage() {
  const { t, products, setSelectedCategory, searchQuery, setSearchQuery } = useApp();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const navigate = useNavigate();

  // Flash Sale Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { key: 'cat_smartphones', label: t.cat_smartphones, icon: Smartphone, color: 'from-blue-500 to-indigo-600' },
    { key: 'cat_laptops', label: t.cat_laptops, icon: Laptop, color: 'from-purple-500 to-pink-600' },
    { key: 'cat_tv', label: t.cat_tv || 'Televizorlar', icon: Tv, color: 'from-cyan-500 to-blue-600' },
    { key: 'cat_audio', label: t.cat_audio, icon: Headphones, color: 'from-amber-500 to-rose-600' },
    { key: 'cat_watches', label: t.cat_watches, icon: Watch, color: 'from-emerald-500 to-teal-600' },
    { key: 'cat_gaming', label: t.cat_gaming, icon: Gamepad2, color: 'from-rose-500 to-red-600' },
  ];

  const flashSaleProducts = products.filter(p => p.isFlashSale);
  const bestSellers = products.slice(0, 4);

  const handleCategoryClick = (catKey) => {
    setSelectedCategory(catKey);
    navigate('/shop');
  };

  return (
    <div className="space-y-12 pb-16">

      {/* 1. HERO SECTION WITH PROMINENT SEARCH */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-gray-900 to-gray-950 text-white rounded-3xl mt-4 p-8 md:p-14 border border-indigo-900/50 shadow-2xl">
        {/* Decorative background lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-indigo-300">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
            <span>{t.hero_badge}</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {t.hero_title}
          </h1>

          <p className="text-sm md:text-lg text-gray-300 font-normal leading-relaxed max-w-2xl">
            {t.hero_subtitle}
          </p>

          {/* Prominent Hero Search Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate('/shop');
            }}
            className="pt-2 max-w-xl"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Gadjetlar, brendlar yoki tovar nomini qidiring (masalan: iPhone 15, Neo QLED)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-xs sm:text-sm font-medium shadow-2xl"
              />
              <Search className="w-5 h-5 text-indigo-400 absolute left-4 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-extrabold text-xs shadow-md hover:opacity-90 transition"
              >
                Qidirish
              </button>
            </div>
            {/* Quick Keyword Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-gray-300">
              <span className="text-gray-400">Ommabop:</span>
              {['iPhone 15', 'Smart TV', 'MacBook Pro', 'AirPods', 'Gaming'].map(tag => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    navigate('/shop');
                  }}
                  className="px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white transition text-[10px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/shop"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-black text-sm md:text-base shadow-xl shadow-indigo-500/30 hover:scale-105 transition-transform duration-300 flex items-center gap-2 group"
            >
              <span>{t.hero_cta}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/admin"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-sm md:text-base shadow-lg shadow-cyan-500/25 hover:scale-105 transition flex items-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>👑 Rocker Admin Panel</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5 TA ASOSIY SAHIFA SHOWCASE BANNER (Mentor uchun ko'rgazma) */}
      <section className="container mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Loyiha Tarkibi
              </span>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">
                5 ta Asosiy Sahifa & Admin Dashboard
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black border border-emerald-500/30">
              ✓ 5/5 Sahifa Tayyor
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { num: '1', title: 'Asosiy Sahifa', path: '/', desc: 'Landing & Aksiya', icon: Sparkles, color: 'text-indigo-500' },
              { num: '2', title: 'Magazin / Katalog', path: '/shop', desc: 'Filtr & Qidiruv', icon: Smartphone, color: 'text-purple-500' },
              { num: '3', title: 'Sevimlilar', path: '/wishlist', desc: 'Izbranniy ro\'yxat', icon: Heart, color: 'text-rose-500' },
              { num: '4', title: 'Savat & Checkout', path: '/cart', desc: 'Promokod & To\'lov', icon: ShoppingBag, color: 'text-pink-500' },
              { num: '5', title: 'Biz Haqimizda & Xarita', path: '/about', desc: 'Leaflet Xaritasi', icon: MapPin, color: 'text-emerald-500' },
              { num: '👑', title: 'Rocker Admin Panel', path: '/admin', desc: 'Dashboard & CRUD', icon: ShieldCheck, color: 'text-cyan-500' },
            ].map(item => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.num}
                  to={item.path}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-500 hover:shadow-md transition group text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-black flex items-center justify-center">
                      {item.num}
                    </span>
                    <ItemIcon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition`} />
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.desc}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {t.featured_categories}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Eng talabgir texnika turlari
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>Barchasi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key)}
                className="group cursor-pointer p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                <span className="mt-4 text-sm font-bold text-gray-900 dark:text-white">
                  {cat.label}
                </span>
                <span className="mt-1 text-[11px] text-gray-400">
                  {products.filter(p => p.category === cat.key).length} mahsulot
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. FLASH SALE BANNER */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider">
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              <span>{t.flash_sale}</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black">
              Shoshiling! Maxsus Narxlar Ketmoqda
            </h3>
            <p className="text-xs md:text-sm text-white/90">
              {t.flash_sale_desc}
            </p>
          </div>

          {/* Countdown timer */}
          <div className="flex items-center gap-3">
            {[
              { label: 'SOAT', val: String(timeLeft.hours).padStart(2, '0') },
              { label: 'DAQIQA', val: String(timeLeft.minutes).padStart(2, '0') },
              { label: 'SONIYA', val: String(timeLeft.seconds).padStart(2, '0') },
            ].map((tItem, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center font-black text-xl md:text-2xl shadow-inner">
                  {tItem.val}
                </div>
                <span className="text-[10px] font-extrabold mt-1 tracking-wider">{tItem.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Sale Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {flashSaleProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. BEST SELLERS */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              {t.best_sellers}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Mijozlarimiz eng ko'p tanlagan flasman gadjetlar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="container mx-auto px-4">
        <div className="bg-gray-100 dark:bg-gray-800/60 rounded-3xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-center text-2xl font-black text-gray-900 dark:text-white mb-8">
            {t.why_us_title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: t.feature_1_title, desc: t.feature_1_desc, color: 'text-indigo-500' },
              { icon: ShieldCheck, title: t.feature_2_title, desc: t.feature_2_desc, color: 'text-emerald-500' },
              { icon: Gift, title: t.feature_3_title, desc: t.feature_3_desc, color: 'text-rose-500' },
              { icon: Clock, title: t.feature_4_title, desc: t.feature_4_desc, color: 'text-amber-500' },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm space-y-2">
                  <Icon className={`w-8 h-8 ${feat.color}`} />
                  <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
