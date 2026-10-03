import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Heart,
  Sun,
  Moon,
  Search,
  User,
  ShieldCheck,
  Globe,
  Menu,
  X,
  ExternalLink,
  Crown,
  LogOut,
  Maximize,
  Minimize,
  Flame,
  Star,
  Package,
  Shield,
  Truck,
  CheckCircle2,
  AlertCircle,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AuthModal from './AuthModal';
import QuickViewModal from './QuickViewModal';

export default function Header() {
  const {
    t,
    lang,
    changeLanguage,
    theme,
    toggleTheme,
    user,
    logout,
    wishlist,
    cart,
    orders,
    products,
    addToCart,
    searchQuery,
    setSearchQuery,
    isAdminPanelOpen,
    toggleAdminPanel
  } = useApp();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // New Interactive Modals for the new buttons
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [searchedProduct, setSearchedProduct] = useState(null);
  const [trackingSearched, setTrackingSearched] = useState(false);
  const [modalQuickProduct, setModalQuickProduct] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch((err) => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch((err) => console.log(err));
      }
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/shop') {
      navigate('/shop');
    }
  };

  // Track Order & Product ID Search Logic
  const handleTrackSearch = (e) => {
    e?.preventDefault();
    setTrackingSearched(true);
    const raw = trackingIdInput.trim();
    if (!raw) {
      setSearchedOrder(null);
      setSearchedProduct(null);
      return;
    }
    const cleanId = raw.toLowerCase().replace(/^#/, '');

    // 1. Check in orders (by order id)
    const foundOrder = orders.find(o => 
      String(o.id).toLowerCase() === cleanId || 
      String(o.id).toLowerCase() === raw.toLowerCase()
    );

    // 2. Check in products / tovarlar (by product id or title)
    const foundProduct = products.find(p => 
      String(p.id).toLowerCase() === cleanId || 
      String(p.id).toLowerCase() === raw.toLowerCase() ||
      String(p.id).toLowerCase().includes(cleanId)
    );

    setSearchedOrder(foundOrder || null);
    setSearchedProduct(foundProduct || null);
  };

  // Expanded Rich Navigation Links
  const navLinks = [
    { path: '/', label: t.home, icon: null },
    { path: '/shop', label: t.shop, icon: null },
    { path: '/shop?filter=flash', label: 'Aksiyalar', icon: Flame, isAksiya: true },
    { path: '#track', label: 'Buyurtma holati', icon: Package, isAction: 'track' },
    { path: '#warranty', label: 'Kafolat & Servis', icon: Shield, isAction: 'warranty' },
    { path: '/about', label: t.about, icon: null },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-300">
      {/* Main Glass Navbar with original color border-b-2 */}
      <div className="glass-nav border-b-2 border-gray-200 dark:border-gray-800 shadow-md backdrop-blur-xl bg-white/85 dark:bg-slate-950/85">
        <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-3 sm:gap-6">

          {/* 1. BRAND LOGO */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                VOV SHOP
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 dark:text-gray-400">
                Premium Store
              </span>
            </div>
          </Link>

          {/* 2. SEARCH BAR (Clean, Prominent & Responsive) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-sm lg:max-w-md relative group mx-2"
          >
            <input
              type="text"
              placeholder={t.search_placeholder || "Mahsulotlar yoki ID (#p2)..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-2xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition shadow-inner font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-500 transition-colors" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* 4. UTILITIES & ACTIONS */}
          <div className="flex items-center gap-1.5 sm:gap-2">

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition active:scale-95"
              title={isFullscreen ? "To'liq ekrandan chiqish" : "To'liq ekran rejimiga o'tish"}
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4 text-indigo-500" />
              ) : (
                <Maximize className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              )}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-black uppercase bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-500" />
                <span>{lang}</span>
              </button>
              {langDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  {[
                    { code: 'uz', name: "O'zbek" },
                    { code: 'ru', name: 'Русский' },
                    { code: 'en', name: 'English' }
                  ].map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        changeLanguage(l.code);
                        setLangDropdown(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs font-semibold flex items-center justify-between hover:bg-indigo-50 dark:hover:bg-slate-800 ${
                        lang === l.code ? 'text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50/50 dark:bg-slate-800/60' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {l.name}
                      {lang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition active:scale-95"
              title="Mavzuni almashtirish"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition active:scale-95"
              title={t.wishlist}
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-95 transition active:scale-95 shadow-md shadow-indigo-500/25"
              title={t.cart}
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Admin Badge / Login */}
            {user ? (
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200">
                  {user.role === 'owner' ? (
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                  ) : user.role === 'admin' ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-indigo-500" />
                  )}
                  <span className="max-w-[85px] truncate font-extrabold">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition"
                  title="Tizimdan chiqish"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:opacity-90 transition active:scale-95 shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t.login}</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 2. SUB-ROW: DEDICATED SPACIOUS NAVIGATION BAR (No overlapping, plenty of room) */}
        <div className="hidden lg:block border-t border-gray-200/80 dark:border-gray-800/80 bg-slate-50/70 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">

            {/* Navigation Links with Icons and plenty of room */}
            <nav className="flex items-center gap-1.5 xl:gap-2.5 font-bold text-xs flex-wrap">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;

                if (link.isAction === 'track') {
                  return (
                    <button
                      key={link.label}
                      onClick={() => {
                        setIsTrackingOpen(true);
                        setTrackingSearched(false);
                        setSearchedOrder(null);
                        setSearchedProduct(null);
                      }}
                      className="transition-all duration-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 active:scale-95"
                      title="Buyurtma yoki Tovar ID tekshirish"
                    >
                      <Package className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{link.label}</span>
                    </button>
                  );
                }

                if (link.isAction === 'warranty') {
                  return (
                    <button
                      key={link.label}
                      onClick={() => setIsWarrantyOpen(true)}
                      className="transition-all duration-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700 active:scale-95"
                      title="Kafolat va servis xizmati"
                    >
                      <Shield className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{link.label}</span>
                    </button>
                  );
                }

                if (link.isAksiya) {
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="transition-all duration-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 active:scale-95 font-black border border-transparent hover:border-amber-500/20"
                    >
                      <Flame className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                      <span>{link.label}</span>
                    </Link>
                  );
                }

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`transition-all duration-200 px-3 py-1.5 rounded-xl border ${
                      isActive
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-black shadow-sm border-slate-200 dark:border-slate-700'
                        : 'border-transparent text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Quick Notice on right side of sub-row */}
            <div className="hidden xl:flex items-center gap-2 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              <Truck className="w-3.5 h-3.5 text-indigo-500" />
              <span>O'zbekiston bo'ylab tezkor yetkazib berish</span>
            </div>
          </div>
        </div>

        {/* 5. MOBILE DRAWER MENU WITH ALL BUTTONS */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pb-4 pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3 bg-white dark:bg-slate-900 animate-in slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder={t.search_placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <div className="flex flex-col space-y-1.5 text-xs font-bold">
              {navLinks.map((link) => {
                if (link.isAction === 'track') {
                  return (
                    <button
                      key={link.label}
                      onClick={() => {
                        setIsTrackingOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                    >
                      <Package className="w-4 h-4 text-indigo-500" />
                      <span>{link.label}</span>
                    </button>
                  );
                }

                if (link.isAction === 'warranty') {
                  return (
                    <button
                      key={link.label}
                      onClick={() => {
                        setIsWarrantyOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-left"
                    >
                      <Shield className="w-4 h-4 text-emerald-500" />
                      <span>{link.label}</span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-xl transition flex items-center justify-between ${
                      location.pathname === link.path
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.isSpecial && (
                      <span className="text-[9px] uppercase px-1.5 py-0.5 bg-indigo-500 text-white rounded">
                        PRO
                      </span>
                    )}
                  </Link>
                );
              })}

              {(user?.role === 'admin' || user?.role === 'owner') && (
                <button
                  onClick={() => {
                    toggleAdminPanel();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow"
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-300" />
                    <span>Admin Boshqaruv Markazi</span>
                  </div>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-white/20 rounded">
                    1-Page
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: BUYURTMA VA TOVARNI TEKSHIRISH (TRACK ORDER & PRODUCT ID) */}
      {isTrackingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-black text-base flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-500" />
                <span>Buyurtma & Tovar Tekshirish</span>
              </h3>
              <button
                onClick={() => setIsTrackingOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleTrackSearch} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Tovar yoki Buyurtma Raqamini Kiriting (ID):
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Masalan: #p2 (tovar) yoki 1 (buyurtma)"
                    value={trackingIdInput}
                    onChange={(e) => setTrackingIdInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow transition active:scale-95"
              >
                Tekshirish
              </button>
            </form>

            {/* Tracking Result Display */}
            {trackingSearched && (
              <div className="pt-2 space-y-3">
                {/* 1. Tovar topilsa */}
                {searchedProduct && (
                  <div className="p-4 rounded-2xl bg-indigo-50/90 dark:bg-slate-800/90 border border-indigo-200 dark:border-indigo-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                        Tovar topildi ✅
                      </span>
                      <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700">
                        Tovar ID: #{searchedProduct.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <img
                        src={searchedProduct.image}
                        alt={searchedProduct.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop";
                        }}
                        className="w-16 h-16 object-cover rounded-2xl bg-slate-100 dark:bg-slate-900 shrink-0 border border-slate-200 dark:border-slate-700"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {searchedProduct.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {t[searchedProduct.category] || searchedProduct.category}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-base font-black text-indigo-600 dark:text-indigo-400">
                            ${searchedProduct.price}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            searchedProduct.stock > 0 
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' 
                              : 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                          }`}>
                            {searchedProduct.stock > 0 ? `Omborda: ${searchedProduct.stock} dona` : 'Tugagan'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setModalQuickProduct(searchedProduct);
                        }}
                        className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Batafsil Ko'rish</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(searchedProduct, 1);
                          setIsTrackingOpen(false);
                          navigate('/cart');
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Savatga</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Buyurtma topilsa */}
                {searchedOrder && (
                  <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">Buyurtma #{searchedOrder.id}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-black text-[10px] uppercase">
                        {searchedOrder.status || 'Yetkazilmoqda 🚚'}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      Mijoz: <b>{searchedOrder.customer?.fullName}</b>
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Manzil: <b>{searchedOrder.customer?.address}</b>
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Jami summa: <b className="text-emerald-500">${searchedOrder.totalAmount?.toFixed(2)}</b>
                    </p>
                  </div>
                )}

                {/* 3. Hech biri topilmasa */}
                {!searchedProduct && !searchedOrder && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold text-center">
                    Bunday raqamli tovar yoki buyurtma topilmadi. Raqamni tekshirib qayta kiriting (Masalan: #p2 yoki 1).
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: KAFOLAT VA SERVIS SHARTLARI (WARRANTY) */}
      {isWarrantyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-black text-base flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span>Rasmiy Kafolat & Xizmat Ko'rsatish</span>
              </h3>
              <button
                onClick={() => setIsWarrantyOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white">12 Oylik To'liq Kafolat</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    VOV Shop do'konidagi barcha gadjetlar, noutbuklar va smartfonlar 1 yillik rasmiy servis kafolatiga ega.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 flex items-start gap-3">
                <Truck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white">14 Kunlik Qaytarish Huquqi</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Mahsulotda nuqson aniqlansa, 14 kun ichida yangisiga almashtirish yoki pulni to'liq qaytarib olish kafolatlanadi.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white">100% Original Texnika</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Faqat original Apple, Samsung, ASUS, Lenovo va Dell distribyutorlik mahsulotlari yetkazib beriladi.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setIsWarrantyOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs"
              >
                Tushunarli
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}

      {/* Quick View Modal for Tovar Search */}
      {modalQuickProduct && (
        <QuickViewModal
          product={modalQuickProduct}
          onClose={() => setModalQuickProduct(null)}
        />
      )}
    </header>
  );
}
