import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown,
  ShieldCheck, 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Send, 
  X, 
  Sparkles,
  TrendingUp,
  Settings,
  LogOut,
  Globe,
  Sun,
  Moon,
  LayoutDashboard,
  Lock,
  User,
  ArrowLeft,
  Search,
  Eye,
  EyeOff,
  Loader2
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

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'telegram'

  // Admin login credentials state if not logged in as admin
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // CRUD Product Modals & Search
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productSearch, setProductSearch] = useState('');

  // Form states for product
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState('cat_smartphones');
  const [prodPrice, setProdPrice] = useState('');
  const [prodOldPrice, setProdOldPrice] = useState('');
  const [prodStock, setProdStock] = useState('10');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  // Telegram test state
  const [botToken, setBotToken] = useState(telegramConfig?.botToken || DEFAULT_TELEGRAM_BOT_TOKEN || '');
  const [chatId, setChatId] = useState(telegramConfig?.chatId || DEFAULT_TELEGRAM_CHAT_ID || '8170197389');
  const [showToken, setShowToken] = useState(false);
  const [isTestingBot, setIsTestingBot] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // If user is not logged in as admin, display clean Admin Login Portal
  if (!user || user.role !== 'admin') {
    const handleAdminLogin = (e) => {
      e.preventDefault();
      const res = login(adminUsername, adminPassword);
      if (res.user?.role === 'admin') {
        setLoginError('');
      } else {
        setLoginError('Parol noto\'g\'ri yoki adminka huquqi yo\'q!');
      }
    };

    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white flex flex-col justify-center items-center p-4 relative overflow-hidden transition-colors duration-300">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-white dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              VOV SHOP Admin Portal
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Boshqaruv paneliga kirish uchun parolni kiriting
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-2xl text-xs font-semibold text-rose-600 dark:text-rose-400 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Login / Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Paroli
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Quick Login Hint */}
            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-2xl flex items-center justify-between text-xs text-indigo-700 dark:text-indigo-300">
              <span className="font-mono text-[11px]">Parol: <b>admin123</b></span>
              <button
                type="button"
                onClick={() => setAdminPassword('admin123')}
                className="font-bold underline text-indigo-600 dark:text-indigo-400 hover:opacity-80"
              >
                Avto-to'ldirish
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-xs shadow-xl shadow-indigo-500/30 hover:opacity-95 transition"
            >
              Admin Panelga Kirish 🚀
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition"
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

  const totalSalesRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 2450);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans transition-colors duration-300">
      
      {/* STANDALONE ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 md:h-screen md:sticky md:top-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between shrink-0 shadow-sm transition-colors duration-300 overflow-y-auto">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-black text-base tracking-wide text-slate-900 dark:text-white">VOV ADMIN</h2>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                ● Status: Online
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Boshqaruv (Overview)', icon: LayoutDashboard },
              { id: 'products', label: 'Mahsulotlar Katalogi', icon: Package, badge: products.length },
              { id: 'orders', label: 'Buyurtmalar Nazorati', icon: ShoppingBag, badge: orders.length + 18 },
              { id: 'telegram', label: 'Telegram Bot', icon: Send, badge: 'Active' },
            ].map(menu => {
              const Icon = menu.icon;
              const isActive = activeTab === menu.id;
              return (
                <button
                  key={menu.id}
                  onClick={() => setActiveTab(menu.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-extrabold transition ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{menu.label}</span>
                  </div>
                  {menu.badge && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                      {menu.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="pt-4 mt-6 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
          <a
            href="/owner"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 transition"
          >
            <div className="flex items-center gap-3">
              <Crown className="w-4 h-4 text-amber-500" />
              <span>Owner Panel</span>
            </div>
            <span className="text-[10px] uppercase font-black bg-amber-500/20 px-1.5 py-0.5 rounded">Boss</span>
          </a>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition"
          >
            <Globe className="w-4 h-4 text-indigo-500" />
            <span>Do'konga o'tish</span>
          </a>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            <span>{theme === 'dark' ? 'Kunduzgi rejim' : 'Tungi rejim'}</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Tizimdan chiqish</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT AREA */}
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 p-6 md:p-8 space-y-8 overflow-y-auto transition-colors duration-300">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {activeTab === 'overview' && 'Boshqaruv Analitikasi'}
              {activeTab === 'products' && 'Mahsulotlar Ombori'}
              {activeTab === 'orders' && 'Sotuv va Buyurtmalar'}
              {activeTab === 'telegram' && 'Telegram Bot Sozlamalari'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              VOV Shop do'kon tizimini real vaqt rejimida boshqarish
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'products' && (
              <button
                onClick={handleOpenAddModal}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/30 hover:opacity-95 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi Mahsulot</span>
              </button>
            )}

            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-bold shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Admin: System Administrator</span>
            </div>
          </div>
        </div>

        {/* OVERVIEW STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block">Jami Tushum</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                ${totalSalesRevenue.toFixed(2)}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block">Buyurtmalar</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                {orders.length + 18}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block">Mahsulotlar Soni</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                {products.length}
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block">Telegram Bot Status</span>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
                ● Faol Telegram API
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
              <Send className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* OVERVIEW TAB CONTENT */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span>So'nggi Sotuv Faoliyati</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ushbu bo'limda do'kondagi so'nggi xaridlar va ularning yetkazib berish darajalari aks etadi.
              </p>
              
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {orders.slice(0, 5).map(o => (
                  <div key={o.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-black text-indigo-600 dark:text-indigo-400 block">#{o.id}</span>
                      <span className="text-slate-700 dark:text-slate-300 font-bold">{o.customer.fullName} • {o.customer.phone}</span>
                    </div>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">${o.totalAmount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Tezkor Admin Amallari</span>
              </h3>
              
              <button
                onClick={handleOpenAddModal}
                className="w-full p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-600/20 border border-indigo-200 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold text-left hover:bg-indigo-100 dark:hover:bg-indigo-600/30 transition flex items-center gap-3"
              >
                <Plus className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Yangi mahsulot joylash</span>
              </button>

              <button
                onClick={() => setActiveTab('telegram')}
                className="w-full p-3 rounded-2xl bg-sky-50 dark:bg-sky-600/20 border border-sky-200 dark:border-sky-500/40 text-sky-700 dark:text-sky-300 text-xs font-bold text-left hover:bg-sky-100 dark:hover:bg-sky-600/30 transition flex items-center gap-3"
              >
                <Send className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Telegram Botni sinash</span>
              </button>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB (CRUD) */}
        {activeTab === 'products' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden space-y-4 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Mahsulotlarni qidirish..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Jami: {filteredProducts.length} ta mahsulot
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800/60 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    <th className="p-4">Rasm</th>
                    <th className="p-4">Mahsulot Nomi</th>
                    <th className="p-4">Kategoriya</th>
                    <th className="p-4">Narxi</th>
                    <th className="p-4">Zaxira</th>
                    <th className="p-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                      <td className="p-4">
                        <img
                          src={p.image}
                          alt={p.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop";
                          }}
                          className="w-12 h-12 object-cover rounded-xl bg-slate-100 dark:bg-slate-800"
                        />
                      </td>
                      <td className="p-4 font-bold text-slate-900 dark:text-white max-w-xs">
                        <div className="truncate">{p.title}</div>
                        <span className="inline-block mt-0.5 font-mono text-[10px] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-indigo-200 dark:border-slate-700">
                          Tovar ID: #{p.id}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400 font-semibold">
                        {t[p.category] || p.category}
                      </td>
                      <td className="p-4 font-black text-indigo-600 dark:text-indigo-400">
                        ${p.price}
                      </td>
                      <td className="p-4 font-bold">
                        <span className={`px-2.5 py-1 rounded-lg ${p.stock > 0 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60' : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60'}`}>
                          {p.stock} dona
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 rounded-xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-slate-700 transition"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm("Ushbu mahsulotni o'chirishni tasdiqlaysizmi?")) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Hozircha yangi buyurtmalar kelmadi.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800/60 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-4">Buyurtma ID</th>
                      <th className="p-4">Mijoz</th>
                      <th className="p-4">To'lov Usuli</th>
                      <th className="p-4">Jami Summa</th>
                      <th className="p-4">Holat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="p-4 font-black text-indigo-600 dark:text-indigo-400">
                          #{o.id}
                        </td>
                        <td className="p-4 space-y-0.5">
                          <span className="font-bold text-slate-900 dark:text-white block">{o.customer.fullName}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{o.customer.phone}</span>
                        </td>
                        <td className="p-4 uppercase font-bold text-slate-700 dark:text-slate-300">
                          {o.customer.paymentMethod}
                        </td>
                        <td className="p-4 font-black text-slate-900 dark:text-white">
                          ${o.totalAmount.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-extrabold text-[10px]">
                            {t[o.status] || o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TELEGRAM BOT TAB */}
        {activeTab === 'telegram' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-sky-500 dark:text-sky-400" />
                  <span>Telegram Bot Integratsiyasi</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Xaridorlarning yangi buyurtmalari avtomatik Telegram botingizga boradi.
                </p>
              </div>

              <form onSubmit={handleSaveTelegram} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Telegram Bot Token
                    </label>
                    <button
                      type="button"
                      onClick={() => setBotToken(DEFAULT_TELEGRAM_BOT_TOKEN)}
                      className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                      Standart tokenni tiklash
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showToken ? "text" : "password"}
                      value={botToken}
                      onChange={(e) => setBotToken(e.target.value)}
                      placeholder="7123456789:AA..."
                      className="w-full p-3 pr-10 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowToken(!showToken)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition"
                      title={showToken ? "Yashirish" : "Ko'rsatish"}
                    >
                      {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Token server orqali himoyalangan. Tarmoq so'rovlarida mutlaqo ko'rinmaydi.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Admin Chat ID
                    </label>
                    <button
                      type="button"
                      onClick={() => setChatId(DEFAULT_TELEGRAM_CHAT_ID)}
                      className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                      Mening Chat ID
                    </button>
                  </div>
                  <input
                    type="text"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    placeholder="8170197389"
                    className="w-full p-3 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition shadow"
                  >
                    Saqlash
                  </button>

                  <button
                    type="button"
                    disabled={isTestingBot}
                    onClick={handleTestTelegramBot}
                    className="px-4 py-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 font-bold text-xs hover:bg-sky-100 dark:hover:bg-sky-900/60 disabled:opacity-50 transition flex items-center gap-1.5"
                  >
                    {isTestingBot ? (
                      <Loader2 className="w-4 h-4 animate-spin text-sky-600 dark:text-sky-400" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                    )}
                    <span>{isTestingBot ? "Yuborilmoqda..." : "Telegram Botni Sinash"}</span>
                  </button>
                </div>

                {testResult && (
                  <div className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                    testResult.includes('✅')
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                      : testResult.includes('Yuborilmoqda')
                      ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300'
                      : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400'
                  }`}>
                    {testResult}
                  </div>
                )}
              </form>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Telegram API Holati</span>
              </h3>
              
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 block">
                  ● Telegram Real-time Webhook & API active
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Buyurtma rasmiylashtirilgan zahoti kuryer va administratorga mijoz ma'lumotlari yuboriladi.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ADD / EDIT PRODUCT MODAL */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                {editingProduct ? 'Mahsulotni Tahrirlash' : 'Yangi Mahsulot Qo\'shish'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingProduct(null);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mahsulot Nomi *
                </label>
                <input
                  type="text"
                  required
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kategoriya
                  </label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-semibold"
                  >
                    <option value="cat_smartphones">{t.cat_smartphones}</option>
                    <option value="cat_laptops">{t.cat_laptops}</option>
                    <option value="cat_tv">{t.cat_tv || 'Televizorlar & Smart TV'}</option>
                    <option value="cat_audio">{t.cat_audio}</option>
                    <option value="cat_watches">{t.cat_watches}</option>
                    <option value="cat_accessories">{t.cat_accessories}</option>
                    <option value="cat_gaming">{t.cat_gaming}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Narxi ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Eski narx ($)
                  </label>
                  <input
                    type="number"
                    value={prodOldPrice}
                    onChange={(e) => setProdOldPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Zaxira (Ombor)
                  </label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Rasm URL havolasi
                </label>
                <input
                  type="text"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tavsifi
                </label>
                <textarea
                  rows="2"
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Bekor qilish
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-extrabold text-xs shadow hover:bg-indigo-700 transition"
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
