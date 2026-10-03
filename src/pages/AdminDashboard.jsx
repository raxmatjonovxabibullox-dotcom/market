import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  DollarSign,
  Users,
  Package,
  Video,
  RefreshCw,
  MoreHorizontal,
  Bell,
  ShoppingBag,
  Sun,
  Moon,
  Grid,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  Plus,
  Edit3,
  Trash2,
  Send,
  X,
  Sparkles,
  TrendingUp,
  LogOut,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  Globe,
  LayoutDashboard,
  Layers,
  FileText,
  Settings
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const {
    t,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    resendOrderToTelegram,
    telegramConfig,
    saveTelegramConfig,
    testTelegramConnection,
    DEFAULT_TELEGRAM_BOT_TOKEN,
    DEFAULT_TELEGRAM_CHAT_ID,
    user,
    login,
    logout,
    theme,
    toggleTheme
  } = useApp();

  // Active navigation tab
  // 'alternate' (Main Rocker Analytics Dashboard) | 'ecommerce' (Products CRUD) | 'tables' (Orders) | 'telegram' (Bot Settings)
  const [activeTab, setActiveTab] = useState('alternate');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Admin login states if not authenticated
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Product CRUD states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productSearch, setProductSearch] = useState('');
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState('cat_smartphones');
  const [prodPrice, setProdPrice] = useState('');
  const [prodOldPrice, setProdOldPrice] = useState('');
  const [prodStock, setProdStock] = useState('10');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  // Telegram settings states
  const [botToken, setBotToken] = useState(telegramConfig?.botToken || DEFAULT_TELEGRAM_BOT_TOKEN || '');
  const [chatId, setChatId] = useState(telegramConfig?.chatId || DEFAULT_TELEGRAM_CHAT_ID || '8170197389');
  const [showToken, setShowToken] = useState(false);
  const [isTestingBot, setIsTestingBot] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [resendingOrderId, setResendingOrderId] = useState(null);

  // If user is not logged in as admin or owner, show dark Rocker-styled Admin Login Portal
  if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
    const handleAdminLogin = (e) => {
      e.preventDefault();
      const res = login(adminUsername, adminPassword);
      if (res.user?.role === 'admin' || res.user?.role === 'owner') {
        setLoginError('');
      } else {
        setLoginError('Parol noto\'g\'ri! Demo: admin / admin123');
      }
    };

    const handleQuickDemoLogin = () => {
      login('admin', 'admin123');
    };

    return (
      <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#131929] p-8 rounded-3xl border border-[#1e2740] shadow-2xl space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/30">
              <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
              <span>Rocker Admin Portal</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Boshqaruv paneliga kirish uchun parolni kiriting
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-xs font-semibold text-rose-400 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Login
              </label>
              <input
                type="text"
                required
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 rounded-2xl bg-[#0b0f19] border border-[#1e2740] text-white text-xs font-semibold focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Parol
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="admin123"
                className="w-full px-4 py-3 rounded-2xl bg-[#0b0f19] border border-[#1e2740] text-white text-xs font-semibold focus:ring-2 focus:ring-cyan-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition"
            >
              Rocker Admin Panelga Kirish 🚀
            </button>
          </form>

          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold transition border border-slate-700"
          >
            ⚡ 1-Bosishda Tezkor Kirish (Demo Admin)
          </button>

          <div className="pt-2 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Do'kon Bosh Sahifasiga Qaytish</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle Product Add/Edit
  const handleOpenAddModal = () => {
    setProdTitle('');
    setProdCategory('cat_smartphones');
    setProdPrice('');
    setProdOldPrice('');
    setProdStock('10');
    setProdImage('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop');
    setProdDesc('');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (p) => {
    setEditingProduct(p);
    setProdTitle(p.title);
    setProdCategory(p.category);
    setProdPrice(p.price);
    setProdOldPrice(p.oldPrice || '');
    setProdStock(p.stock);
    setProdImage(p.image);
    setProdDesc(p.description || '');
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!prodTitle || !prodPrice) return;

    const payload = {
      title: prodTitle,
      category: prodCategory,
      price: Number(prodPrice),
      oldPrice: prodOldPrice ? Number(prodOldPrice) : null,
      stock: Number(prodStock),
      image: prodImage || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
      description: prodDesc
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      setEditingProduct(null);
    } else {
      addProduct(payload);
      setIsAddModalOpen(false);
    }
  };

  const handleSaveTelegram = (e) => {
    e.preventDefault();
    const tokenToSave = (botToken || '').trim() || DEFAULT_TELEGRAM_BOT_TOKEN;
    const chatIdToSave = (chatId || '').trim() || DEFAULT_TELEGRAM_CHAT_ID;
    saveTelegramConfig({ botToken: tokenToSave, chatId: chatIdToSave });
    setBotToken(tokenToSave);
    setChatId(chatIdToSave);
    setTestResult("✅ Telegram sozlamalari muvaffaqiyatli saqlandi!");
  };

  const handleTestTelegramBot = async () => {
    setIsTestingBot(true);
    setTestResult('Yuborilmoqda...');
    try {
      const activeToken = (botToken || '').trim() || telegramConfig?.botToken || DEFAULT_TELEGRAM_BOT_TOKEN;
      const activeChatId = (chatId || '').trim() || telegramConfig?.chatId || DEFAULT_TELEGRAM_CHAT_ID;
      const res = await testTelegramConnection(activeToken, activeChatId);
      if (res && res.ok) {
        setTestResult("✅ Xabar Telegramga muvaffaqiyatli yuborildi!");
      } else {
        setTestResult(`❌ Xatolik: ${res?.description || "Xabar yuborilmadi"}`);
      }
    } catch (err) {
      setTestResult(`❌ Xatolik: ${err.message}`);
    } finally {
      setIsTestingBot(false);
    }
  };

  const handleResendOrder = async (order) => {
    setResendingOrderId(order.id);
    try {
      await resendOrderToTelegram(order);
      alert(`Buyurtma #${order.id} Telegram botga muvaffaqiyatli yuborildi!`);
    } catch (e) {
      alert("Xatolik: " + e.message);
    } finally {
      setResendingOrderId(null);
    }
  };

  const totalSalesRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 6200);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0e1422] text-[#e2e8f0] flex font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* 1. ROCKER LEFT SIDEBAR */}
      <aside
        className={`${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } shrink-0 min-h-screen bg-[#101726] border-r border-[#1a2236] transition-all duration-300 flex flex-col justify-between sticky top-0 h-screen overflow-y-auto custom-scrollbar z-30`}
      >
        <div className="p-4 space-y-6">
          
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between px-2 pt-1">
            <Link to="/admin" className="flex items-center gap-3 group">
              {/* Rocker Swirl Icon */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5S10 17.33 10 16.5V11c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5.5zm-1-8a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill="currentColor" stroke="none" />
                  <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </div>
              {!isSidebarCollapsed && (
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-xl text-white tracking-tight">Rocker</span>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">v2.0</span>
                </div>
              )}
            </Link>

            {/* Collapse / Back Arrow */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-[#1a2338] transition"
              title="Sidebar kengaytirish/yopish"
            >
              <ArrowLeft className={`w-4 h-4 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-5 text-xs">
            
            {/* GROUP: DASHBOARD */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span>Dashboard</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </div>
              )}
              <div className="space-y-1 pt-1">
                <button
                  onClick={() => setActiveTab('alternate')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-bold transition ${
                    activeTab === 'alternate'
                      ? 'bg-[#21293e] text-white shadow-inner border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-[#151d2e]'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full border border-slate-400 group-hover:border-white"></span>
                  {!isSidebarCollapsed && <span>Alternate (Analytics)</span>}
                </button>

                <button
                  onClick={() => setActiveTab('alternate')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151d2e] transition"
                >
                  <span className="w-2 h-2 rounded-full border border-slate-500"></span>
                  {!isSidebarCollapsed && <span>Default</span>}
                </button>

                <button
                  onClick={() => setActiveTab('alternate')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151d2e] transition"
                >
                  <span className="w-2 h-2 rounded-full border border-slate-500"></span>
                  {!isSidebarCollapsed && <span>Graphical</span>}
                </button>
              </div>
            </div>

            {/* GROUP: APPLICATION */}
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('alternate')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151d2e] transition font-bold"
              >
                <div className="flex items-center gap-3">
                  <Grid className="w-4 h-4 text-cyan-400" />
                  {!isSidebarCollapsed && <span>Application</span>}
                </div>
                {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
              </button>
            </div>

            {/* GROUP: UI ELEMENTS */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  UI Elements
                </div>
              )}
              <div className="space-y-1 pt-1">
                <button
                  onClick={() => setActiveTab('alternate')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151d2e] transition font-medium"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {!isSidebarCollapsed && <span>Widgets</span>}
                </button>

                {/* eCommerce (Products Catalog) */}
                <button
                  onClick={() => setActiveTab('ecommerce')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition ${
                    activeTab === 'ecommerce'
                      ? 'bg-[#21293e] text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-[#151d2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-4 h-4 text-cyan-400" />
                    {!isSidebarCollapsed && <span>eCommerce</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold">
                      {products.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('alternate')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151d2e] transition"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-purple-400" />
                    {!isSidebarCollapsed && <span>Components</span>}
                  </div>
                  {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
                </button>

                <button
                  onClick={() => setActiveTab('alternate')}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#151d2e] transition"
                >
                  <FileText className="w-4 h-4 text-pink-400" />
                  {!isSidebarCollapsed && <span>Content</span>}
                </button>
              </div>
            </div>

            {/* GROUP: FORMS & TABLES */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Forms & Tables
                </div>
              )}
              <div className="space-y-1 pt-1">
                {/* Tables (Orders) */}
                <button
                  onClick={() => setActiveTab('tables')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition ${
                    activeTab === 'tables'
                      ? 'bg-[#21293e] text-cyan-400 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-[#151d2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    {!isSidebarCollapsed && <span>Buyurtmalar (Orders)</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold">
                      {orders.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* GROUP: TELEGRAM BOT */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Integratsiya
                </div>
              )}
              <div className="space-y-1 pt-1">
                <button
                  onClick={() => setActiveTab('telegram')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold transition ${
                    activeTab === 'telegram'
                      ? 'bg-[#21293e] text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-[#151d2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Send className="w-4 h-4 text-sky-400" />
                    {!isSidebarCollapsed && <span>Telegram Bot</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </button>
              </div>
            </div>

          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-[#1a2236] space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-[#151d2e] transition"
          >
            <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
            {!isSidebarCollapsed && <span>Do'konga qaytish</span>}
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Chiqish</span>}
          </button>
        </div>
      </aside>

      {/* 2. MAIN BODY AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP NAVBAR (Matching the screenshot) */}
        <header className="h-16 bg-[#101726] border-b border-[#1a2236] px-6 flex items-center justify-between sticky top-0 z-20">
          
          {/* Search Input Bar */}
          <div className="relative w-72 md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-[#162033] border border-[#222e46] text-white placeholder-slate-400 outline-none focus:border-cyan-500/50 transition font-medium"
            />
          </div>

          {/* Right Header Icons */}
          <div className="flex items-center gap-4">
            
            {/* Country Flag (UZ/US) */}
            <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700 text-xs cursor-pointer hover:scale-105 transition" title="Til: O'zbekcha / Global">
              🇺🇿
            </div>

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-[#1a2338]"
              title="Mavzuni almashtirish"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Apps 4-Square Grid Icon */}
            <button
              onClick={() => setActiveTab('ecommerce')}
              className="text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-[#1a2338]"
              title="Ilovalar & Mahsulotlar"
            >
              <Grid className="w-4 h-4" />
            </button>

            {/* Notification Bell with Badge 7 */}
            <div className="relative cursor-pointer">
              <button
                onClick={() => setActiveTab('tables')}
                className="text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-[#1a2338]"
                title="Bildirishnomalar"
              >
                <Bell className="w-4 h-4" />
              </button>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center ring-2 ring-[#101726]">
                7
              </span>
            </div>

            {/* Cart / Shopping Bag with Badge 8 */}
            <div className="relative cursor-pointer">
              <button
                onClick={() => setActiveTab('tables')}
                className="text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-[#1a2338]"
                title="Yangi Buyurtmalar"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center ring-2 ring-[#101726]">
                8
              </span>
            </div>

            {/* User Profile Avatar & Name */}
            <div className="flex items-center gap-3 pl-2 border-l border-[#1a2236]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop"
                alt="Profile Avatar"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-cyan-500/40"
              />
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-white leading-tight">Pauline Seitz</span>
                <span className="block text-[10px] text-slate-400">Web Designer</span>
              </div>
            </div>

          </div>
        </header>

        {/* 3. ROCKER CONTENT CONTAINER */}
        <main className="flex-1 p-6 space-y-6">
          
          {/* TAB 1: ALTERNATE (MAIN ROCKER DASHBOARD FROM SCREENSHOT) */}
          {activeTab === 'alternate' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* TOP CHARTS ROW: Sales Overview (Spline) + Order Status (Gradient Bars) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. SALES OVERVIEW (7 Cols) */}
                <div className="lg:col-span-8 bg-[#131929] border border-[#1d273f] rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-white">Sales Overview</h3>
                    <div className="flex items-center gap-4">
                      {/* Legend */}
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-semibold">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-1.5 bg-[#f59e0b] rounded-sm"></span>
                          <span>Visits</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-1.5 bg-[#00d2ff] rounded-sm"></span>
                          <span>Sales</span>
                        </div>
                      </div>
                      <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-[#1a2338]">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* SVG Spline Smooth Area Chart */}
                  <div className="h-64 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none">
                      <defs>
                        {/* Cyan/Blue Area Gradient */}
                        <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      {[40, 80, 120, 160, 200].map((y, i) => (
                        <line
                          key={i}
                          x1="30"
                          y1={y}
                          x2="590"
                          y2={y}
                          stroke="#1a2338"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Y-axis labels */}
                      <text x="12" y="44" fill="#64748b" fontSize="10">30</text>
                      <text x="12" y="84" fill="#64748b" fontSize="10">25</text>
                      <text x="12" y="124" fill="#64748b" fontSize="10">20</text>
                      <text x="12" y="164" fill="#64748b" fontSize="10">15</text>
                      <text x="12" y="204" fill="#64748b" fontSize="10">10</text>
                      <text x="16" y="235" fill="#64748b" fontSize="10">5</text>

                      {/* Sales Wave Area Fill */}
                      <path
                        d="M 30,230 
                           C 60,120 80,40 120,40 
                           C 160,40 180,140 210,140 
                           C 240,140 270,70 310,70 
                           C 350,70 380,180 420,180 
                           C 460,180 480,140 520,140 
                           C 550,140 570,170 590,170 
                           L 590,230 Z"
                        fill="url(#salesGrad)"
                      />

                      {/* Sales Spline Curve (Cyan) */}
                      <path
                        d="M 30,230 
                           C 60,120 80,40 120,40 
                           C 160,40 180,140 210,140 
                           C 240,140 270,70 310,70 
                           C 350,70 380,180 420,180 
                           C 460,180 480,140 520,140 
                           C 550,140 570,170 590,170"
                        fill="none"
                        stroke="#00d2ff"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Visits Spline Curve (Orange/Coral) */}
                      <path
                        d="M 30,225 
                           C 60,170 80,110 120,110 
                           C 160,110 180,150 210,150 
                           C 240,150 280,140 310,140 
                           C 340,140 370,125 400,125 
                           C 440,125 460,180 500,180 
                           C 540,180 560,160 590,165"
                        fill="none"
                        stroke="#ff6b6b"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* X-axis Days */}
                    <div className="flex justify-between px-8 text-[11px] text-slate-500 font-bold pt-1">
                      <span>Mo</span>
                      <span>Tu</span>
                      <span>We</span>
                      <span>Th</span>
                      <span>Fr</span>
                      <span>Sa</span>
                      <span>Su</span>
                    </div>
                  </div>
                </div>

                {/* 2. ORDER STATUS (Vertical Gradient Rounded Bars) */}
                <div className="lg:col-span-4 bg-[#131929] border border-[#1d273f] rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-white">Order Status</h3>
                    <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-[#1a2338]">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Gradient Pill Bar Chart */}
                  <div className="h-64 flex items-end justify-between px-2 pt-4 relative">
                    {/* Y-axis indicator */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-500 font-bold">
                      <span>14</span>
                      <span>12</span>
                      <span>10</span>
                      <span>8</span>
                      <span>6</span>
                      <span>4</span>
                      <span>2</span>
                      <span>0</span>
                    </div>

                    <div className="w-full flex items-end justify-around pl-6 h-52">
                      {[
                        { month: 'Jan', height: '65%' },
                        { month: 'Feb', height: '52%' },
                        { month: 'Mar', height: '95%' },
                        { month: 'Apr', height: '70%' },
                        { month: 'May', height: '82%' },
                        { month: 'Jun', height: '58%' },
                      ].map((bar, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 group">
                          {/* Pill Bar */}
                          <div className="w-4 bg-[#1a2338] h-48 rounded-full flex items-end p-0.5">
                            <div
                              style={{ height: bar.height }}
                              className="w-full rounded-full bg-gradient-to-t from-[#ff5e62] via-[#ff9966] to-[#ff2a6d] shadow-lg shadow-pink-500/20 group-hover:brightness-125 transition-all duration-300"
                            ></div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">{bar.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* BOTTOM ROW: Donut Chart + 6 Metric Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. DONUT RING CHART (4 Cols) */}
                <div className="lg:col-span-4 bg-[#131929] border border-[#1d273f] rounded-2xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-white">Brand & Category Share</h3>
                    <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-[#1a2338]">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* SVG Multi-Segment Donut */}
                  <div className="my-4 flex items-center justify-center relative">
                    <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
                      {/* Segment 1: Neon Green */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#00e676"
                        strokeWidth="11"
                        strokeDasharray="115 240"
                        strokeDashoffset="0"
                      />
                      {/* Segment 2: Neon Blue */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#00b0ff"
                        strokeWidth="11"
                        strokeDasharray="65 240"
                        strokeDashoffset="-120"
                      />
                      {/* Segment 3: Neon Red/Pink */}
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="transparent"
                        stroke="#ff1744"
                        strokeWidth="11"
                        strokeDasharray="50 240"
                        strokeDashoffset="-190"
                      />
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-base font-extrabold text-white">Nokia</span>
                      <span className="text-xs text-slate-400 font-bold">30</span>
                    </div>
                  </div>

                  {/* Bottom Legend Badges */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#1d273f] text-xs">
                    <span className="font-bold text-slate-300">Apple</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-extrabold text-[10px]">
                      20
                    </span>
                  </div>
                </div>

                {/* 2. STATS MINI CARDS (8 Cols: 2x3 Grid) */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Card 1: Total Orders */}
                  <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400">Total Orders</span>
                        <h4 className="text-2xl font-black text-white mt-0.5">8052</h4>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                    </div>
                    {/* Mini Sparkline & Rate */}
                    <div className="flex items-end justify-between mt-3">
                      {/* Sparkline Bars */}
                      <div className="flex items-end gap-1 h-6">
                        {[40, 60, 30, 80, 50, 90, 70, 100, 60, 80].map((h, i) => (
                          <span key={i} style={{ height: `${h}%` }} className="w-1 bg-cyan-500/80 rounded-t"></span>
                        ))}
                      </div>
                      <span className="text-xs font-extrabold text-emerald-400">+25%</span>
                    </div>
                  </div>

                  {/* Card 2: Total Revenue */}
                  <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400">Total Revenue</span>
                        <h4 className="text-2xl font-black text-white mt-0.5">$6.2K</h4>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
                        <DollarSign className="w-4 h-4" />
                      </div>
                    </div>
                    {/* Mini Sparkline & Rate */}
                    <div className="flex items-end justify-between mt-3">
                      <div className="flex items-end gap-1 h-6">
                        {[50, 70, 40, 90, 60, 100, 80, 50, 70, 90].map((h, i) => (
                          <span key={i} style={{ height: `${h}%` }} className="w-1 bg-rose-500/80 rounded-t"></span>
                        ))}
                      </div>
                      <span className="text-xs font-extrabold text-emerald-400">+15%</span>
                    </div>
                  </div>

                  {/* Card 3: New Users */}
                  <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400">New Users</span>
                        <h4 className="text-2xl font-black text-white mt-0.5">1.3K</h4>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                    {/* Mini Sparkline & Rate */}
                    <div className="flex items-end justify-between mt-3">
                      <div className="flex items-end gap-1 h-6">
                        {[60, 40, 70, 50, 80, 60, 40, 70, 50, 60].map((h, i) => (
                          <span key={i} style={{ height: `${h}%` }} className="w-1 bg-emerald-500/80 rounded-t"></span>
                        ))}
                      </div>
                      <span className="text-xs font-extrabold text-rose-400">-10%</span>
                    </div>
                  </div>

                  {/* Card 4: Sold Items */}
                  <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400">Sold Items</span>
                        <h4 className="text-2xl font-black text-white mt-0.5">956</h4>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                        <Package className="w-4 h-4" />
                      </div>
                    </div>
                    {/* Mini Sparkline & Rate */}
                    <div className="flex items-end justify-between mt-3">
                      <div className="flex items-end gap-1 h-6">
                        {[40, 60, 80, 50, 70, 60, 80, 50, 70, 40].map((h, i) => (
                          <span key={i} style={{ height: `${h}%` }} className="w-1 bg-amber-400/80 rounded-t"></span>
                        ))}
                      </div>
                      <span className="text-xs font-extrabold text-rose-400">-14%</span>
                    </div>
                  </div>

                  {/* Card 5: Total Visits */}
                  <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400">Total Visits</span>
                        <h4 className="text-2xl font-black text-white mt-0.5">12M</h4>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                        <Video className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <span className="text-[11px] text-slate-400 font-medium">Barcha platformalar</span>
                      <span className="text-xs font-extrabold text-emerald-400">+8%</span>
                    </div>
                  </div>

                  {/* Card 6: Total Returns */}
                  <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400">Total Returns</span>
                        <h4 className="text-2xl font-black text-white mt-0.5">170</h4>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center">
                        <RefreshCw className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <span className="text-[11px] text-slate-400 font-medium">Qaytarilgan tovarlar</span>
                      <span className="text-xs font-extrabold text-emerald-400">-2%</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: ECOMMERCE / PRODUCTS MANAGEMENT TABLE */}
          {activeTab === 'ecommerce' && (
            <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-6 space-y-5 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#1d273f]">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-cyan-400" />
                    <span>eCommerce: Mahsulotlar Katalogi</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Do'kondagi mahsulotlarni qo'shish, narxini o'zgartirish va boshqarish
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <input
                      type="text"
                      placeholder="Qidirish..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none focus:border-cyan-500"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <button
                    onClick={handleOpenAddModal}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Qo'shish</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0b0f19] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1d273f]">
                      <th className="p-3">Rasm</th>
                      <th className="p-3">Mahsulot Nomi</th>
                      <th className="p-3">Kategoriya</th>
                      <th className="p-3">Narx</th>
                      <th className="p-3">Omborda</th>
                      <th className="p-3 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1d273f]">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#162033] transition">
                        <td className="p-3">
                          <img
                            src={p.image}
                            alt={p.title}
                            className="w-12 h-12 object-cover rounded-xl bg-slate-800"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop";
                            }}
                          />
                        </td>
                        <td className="p-3">
                          <span className="font-bold text-white block">{p.title}</span>
                          <span className="text-[10px] text-slate-400">ID: #{p.id}</span>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-semibold text-[10px] border border-slate-700">
                            {p.category}
                          </span>
                        </td>
                        <td className="p-3 font-extrabold text-cyan-400">
                          ${p.price}
                        </td>
                        <td className="p-3">
                          <span className={`font-bold ${p.stock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {p.stock} dona
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditModal(p)}
                            className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                            title="Tahrirlash"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
                            title="O'chirish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: TABLES / ORDERS MANAGEMENT */}
          {activeTab === 'tables' && (
            <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-6 space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-[#1d273f]">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-400" />
                    <span>Buyurtmalar Nazorati (Orders)</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Mijozlar buyurtmalari va Telegram bot yetkazish holatlari
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  Jami: {orders.length} ta buyurtma
                </span>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0b0f19] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1d273f]">
                      <th className="p-3">ID</th>
                      <th className="p-3">Sana</th>
                      <th className="p-3">Mijoz</th>
                      <th className="p-3">Telefon</th>
                      <th className="p-3">To'lov</th>
                      <th className="p-3">Jami</th>
                      <th className="p-3">Telegram</th>
                      <th className="p-3 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1d273f]">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="p-8 text-center text-slate-500">
                          Hozircha hech qanday buyurtma yo'q
                        </td>
                      </tr>
                    ) : (
                      orders.map((o) => (
                        <tr key={o.id} className="hover:bg-[#162033] transition">
                          <td className="p-3 font-mono font-bold text-white">#{o.id}</td>
                          <td className="p-3 text-slate-400">{o.formattedDate || o.date?.slice(0, 10)}</td>
                          <td className="p-3 font-bold text-white">{o.customer?.fullName}</td>
                          <td className="p-3 text-slate-300 font-mono">{o.customer?.phone}</td>
                          <td className="p-3 uppercase text-[10px] font-bold text-slate-400">
                            {o.customer?.paymentMethod}
                          </td>
                          <td className="p-3 font-black text-cyan-400">${o.totalAmount?.toFixed(2)}</td>
                          <td className="p-3">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Yetkazilgan</span>
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleResendOrder(o)}
                              disabled={resendingOrderId === o.id}
                              className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 text-[10px] font-bold transition flex items-center gap-1 ml-auto"
                            >
                              {resendingOrderId === o.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Send className="w-3 h-3" />
                              )}
                              <span>Botga qayta jo'natish</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: TELEGRAM BOT SETTINGS */}
          {activeTab === 'telegram' && (
            <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-6 space-y-6 max-w-2xl mx-auto animate-in fade-in">
              <div className="pb-4 border-b border-[#1d273f]">
                <h2 className="text-lg font-black text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-sky-400" />
                  <span>Telegram Bot Sozlamalari</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Xaridorlarning buyurtmalari avtomatik tarzda Telegram botingizga boradi.
                </p>
              </div>

              <form onSubmit={handleSaveTelegram} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-300">
                      Telegram Bot Token
                    </label>
                    <button
                      type="button"
                      onClick={() => setBotToken(DEFAULT_TELEGRAM_BOT_TOKEN)}
                      className="text-[11px] text-cyan-400 hover:underline font-semibold"
                    >
                      Standart tokenni tiklash
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showToken ? "text" : "password"}
                      value={botToken}
                      onChange={(e) => setBotToken(e.target.value)}
                      placeholder="8823235791:AA..."
                      className="w-full p-3 pr-10 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none font-mono focus:border-cyan-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                      title={showToken ? "Yashirish" : "Ko'rsatish"}
                    >
                      {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-300">
                      Admin Chat ID
                    </label>
                    <button
                      type="button"
                      onClick={() => setChatId(DEFAULT_TELEGRAM_CHAT_ID)}
                      className="text-[11px] text-cyan-400 hover:underline font-semibold"
                    >
                      Mening Chat ID
                    </button>
                  </div>
                  <input
                    type="text"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    placeholder="8170197389"
                    className="w-full p-3 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none font-mono focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs hover:opacity-90 transition shadow"
                  >
                    Saqlash
                  </button>

                  <button
                    type="button"
                    disabled={isTestingBot}
                    onClick={handleTestTelegramBot}
                    className="px-4 py-2.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/40 font-bold text-xs hover:bg-sky-500/30 disabled:opacity-50 transition flex items-center gap-1.5"
                  >
                    {isTestingBot ? (
                      <Loader2 className="w-4 h-4 animate-spin text-sky-300" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    )}
                    <span>{isTestingBot ? "Yuborilmoqda..." : "Telegram Botni Sinash"}</span>
                  </button>
                </div>

                {testResult && (
                  <div
                    className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                      testResult.includes('✅')
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                        : testResult.includes('Yuborilmoqda')
                        ? 'bg-sky-950/60 border-sky-500/50 text-sky-300'
                        : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
                    }`}
                  >
                    {testResult}
                  </div>
                )}
              </form>
            </div>
          )}

        </main>

        {/* 4. FOOTER (Matching the screenshot) */}
        <footer className="h-12 border-t border-[#1a2236] bg-[#101726] flex items-center justify-center text-xs text-slate-500 font-medium px-6">
          <span>Copyright © 2026. All right reserved.</span>
        </footer>

      </div>

      {/* 5. ADD / EDIT PRODUCT MODAL */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#131929] rounded-3xl max-w-lg w-full p-6 border border-[#1e2740] shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-[#1e2740] pb-3">
              <h3 className="font-extrabold text-lg text-white">
                {editingProduct ? 'Mahsulotni Tahrirlash' : 'Yangi Mahsulot Qo\'shish'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Mahsulot Nomi *
                </label>
                <input
                  type="text"
                  required
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Kategoriya
                  </label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none focus:border-cyan-500"
                  >
                    <option value="cat_smartphones">Smartphones</option>
                    <option value="cat_laptops">Laptops</option>
                    <option value="cat_audio">Audio</option>
                    <option value="cat_wearables">Wearables</option>
                    <option value="cat_tv">Smart Televizorlar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Narxi ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Eski Narxi ($)
                  </label>
                  <input
                    type="number"
                    value={prodOldPrice}
                    onChange={(e) => setProdOldPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Ombordagi Soni
                  </label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Rasm URL
                </label>
                <input
                  type="text"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Tavsif
                </label>
                <textarea
                  rows="3"
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none focus:border-cyan-500"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#1e2740]">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
