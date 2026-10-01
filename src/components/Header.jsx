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
  Minimize
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import AuthModal from './AuthModal';

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
    searchQuery,
    setSearchQuery,
    isAdminPanelOpen,
    toggleAdminPanel
  } = useApp();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  // Clean Navigation Links
  const navLinks = [
    { path: '/', label: t.home },
    { path: '/shop', label: t.shop },
    { path: '/about', label: t.about },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-colors duration-300">
      {/* Main Glass Navbar with original color but thicker (border-b-2) */}
      <div className="glass-nav border-b-2 border-gray-200 dark:border-gray-800 shadow-md backdrop-blur-xl bg-white/80 dark:bg-slate-950/80">
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

          {/* 2. SEARCH BAR (Clean, Centered, Responsive) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-md relative group"
          >
            <input
              type="text"
              placeholder={t.search_placeholder || "Mahsulotlarni qidirish..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-2xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition shadow-inner group-hover:border-indigo-400/50"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-500 transition-colors" />
          </form>

          {/* 3. DESKTOP NAV LINKS + ADMIN BUTTON */}
          <nav className="hidden lg:flex items-center gap-5 font-bold text-xs">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-all duration-200 px-3 py-1.5 rounded-xl ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-extrabold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* In-Page Admin Panel Button (Elegant & Clean) */}
            {(user?.role === 'admin' || user?.role === 'owner') && (
              <button
                onClick={toggleAdminPanel}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 text-white font-black text-xs shadow-md shadow-indigo-500/20 active:scale-95 transition-all"
                title="Admin panelni ochish (bitta sahifada)"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Admin Boshqaruv</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>
            )}

            {/* Owner Panel Button */}
            {user?.role === 'owner' && (
              <a
                href="/owner"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-black text-xs transition"
                title="Loyiha Egasi Paneli"
              >
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>Owner</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}
          </nav>

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

        {/* 5. MOBILE DRAWER MENU */}
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

            <div className="flex flex-col space-y-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition ${
                    location.pathname === link.path
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

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

              {!user && (
                <button
                  onClick={() => {
                    setIsAuthOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-2 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black flex items-center justify-center gap-2 shadow"
                >
                  <User className="w-4 h-4" />
                  <span>{t.login}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
    </header>
  );
}
