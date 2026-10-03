import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Crown,
  ShieldCheck,
  Users,
  UserPlus,
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
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  ExternalLink,
  Phone,
  Key,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OwnerDashboard() {
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
    toggleTheme,
    admins,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    toggleAdminStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'admins' | 'products' | 'orders' | 'telegram'

  // Owner login credentials state
  const [ownerUsername, setOwnerUsername] = useState('owner');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin CRUD Modal state
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [adminName, setAdminName] = useState('');
  const [adminUserLogin, setAdminUserLogin] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminSearch, setAdminSearch] = useState('');

  // Product CRUD Modal & Search state
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

  // If user is not logged in as owner, display clean Owner Portal Login
  if (!user || user.role !== 'owner') {
    const handleOwnerLogin = (e) => {
      e.preventDefault();
      const res = login(ownerUsername, ownerPassword);
      if (res.user?.role === 'owner') {
        setLoginError('');
      } else {
        setLoginError('Login yoki maxfiy parol noto\'g\'ri! Faqat Loyiha Egasi (Owner) kira oladi.');
      }
    };

    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl p-8 rounded-3xl border border-amber-500/30 shadow-2xl shadow-amber-500/10 space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 ring-4 ring-amber-500/20">
              <Crown className="w-9 h-9 text-amber-300" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
              <span>VOV OWNER PORTAL</span>
            </h1>
            <p className="text-xs text-amber-400/90 font-bold uppercase tracking-wider">
              👑 Loyiha Egasi Boshqaruv Markazi
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-2xl text-xs font-semibold text-rose-300 text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleOwnerLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Owner Login / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={ownerUsername}
                  onChange={(e) => setOwnerUsername(e.target.value)}
                  placeholder="owner"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <User className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Owner Maxfiy Paroli
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-700 text-white text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none"
                />
                <Lock className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Quick Auto-Fill for Owner */}
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs text-amber-300">
              <span className="font-mono text-[11px]">Parol: <b>owner123</b></span>
              <button
                type="button"
                onClick={() => setOwnerPassword('owner123')}
                className="font-bold underline text-amber-400 hover:text-amber-200"
              >
                Avto-to'ldirish
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-white font-black text-xs shadow-xl shadow-amber-500/25 hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4 text-amber-200" />
              <span>Owner Panelga Kirish</span>
            </button>
          </form>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-bold hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Bosh sahifaga</span>
            </Link>

            <a
              href="/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-indigo-400 hover:underline"
            >
              <span>Admin Panel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Handle Admin CRUD
  const handleOpenAddAdmin = () => {
    setEditingAdmin(null);
    setAdminName('');
    setAdminUserLogin('');
    setAdminPass('');
    setAdminPhone('+998 ');
    setIsAdminModalOpen(true);
  };

  const handleOpenEditAdmin = (adm) => {
    setEditingAdmin(adm);
    setAdminName(adm.name);
    setAdminUserLogin(adm.username);
    setAdminPass(adm.password);
    setAdminPhone(adm.phone || '+998 ');
    setIsAdminModalOpen(true);
  };

  const handleSaveAdmin = (e) => {
    e.preventDefault();
    if (!adminName || !adminUserLogin || !adminPass) return;

    if (editingAdmin) {
      updateAdmin(editingAdmin.id, {
        name: adminName,
        username: adminUserLogin,
        password: adminPass,
        phone: adminPhone
      });
    } else {
      addAdmin({
        name: adminName,
        username: adminUserLogin,
        password: adminPass,
        phone: adminPhone
      });
    }
    setIsAdminModalOpen(false);
  };

  // Handle Product CRUD
  const handleOpenAddProduct = () => {
    setProdTitle('');
    setProdCategory('cat_smartphones');
    setProdPrice('');
    setProdOldPrice('');
    setProdStock('10');
    setProdImage('https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop');
    setProdDesc('');
    setIsAddModalOpen(true);
  };

  const handleOpenEditProduct = (p) => {
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
      image: prodImage || 'https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop',
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

  const activeAdminsCount = admins.filter(a => a.status === 'active').length;
  const blockedAdminsCount = admins.filter(a => a.status === 'blocked').length;

  const filteredAdmins = admins.filter(a =>
    a.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
    a.username.toLowerCase().includes(adminSearch.toLowerCase()) ||
    (a.phone && a.phone.includes(adminSearch))
  );

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-sans transition-colors duration-300">
      
      {/* OWNER SIDEBAR */}
      <aside className="w-full md:w-68 md:h-screen md:sticky md:top-0 bg-slate-950 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0 shadow-2xl overflow-y-auto">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-amber-500/20 ring-2 ring-amber-500/40">
              <Crown className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-black text-base tracking-wide text-white">VOV OWNER</h2>
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-black text-[9px] uppercase border border-amber-500/30">
                  BOSS
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                ● Loyiha Egasi Nazorati
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5">
            {[
              { id: 'overview', label: 'Boshqaruv (Overview)', icon: LayoutDashboard },
              { id: 'admins', label: `Adminlar (${admins.length} ta)`, icon: Users, badge: `${activeAdminsCount} faol`, highlight: true },
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
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-extrabold transition ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-white shadow-xl shadow-amber-500/20 ring-1 ring-amber-400/30'
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${menu.highlight ? 'text-amber-400' : ''}`} />
                    <span>{menu.label}</span>
                  </div>
                  {menu.badge && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300 border border-slate-700'}`}>
                      {menu.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="pt-4 mt-6 border-t border-slate-800 space-y-1.5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Do'konga o'tish</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>

          <a
            href="/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-indigo-400 hover:bg-slate-800 hover:text-indigo-300 transition"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Oddiy Admin Panel</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>

          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            <span>{theme === 'dark' ? 'Kunduzgi rejim' : 'Tungi rejim'}</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Owner chiqish</span>
          </button>
        </div>
      </aside>

      {/* MAIN OWNER CONTENT AREA */}
      <main className="flex-1 bg-slate-900 p-6 md:p-8 space-y-8 overflow-y-auto">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-black uppercase">
                👑 Superadmin / Owner
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
              {activeTab === 'overview' && 'Loyiha Boshqaruv Markazi'}
              {activeTab === 'admins' && `Adminlar Boshqaruvi (${admins.length} ta)`}
              {activeTab === 'products' && 'Mahsulotlar Ombori'}
              {activeTab === 'orders' && 'Sotuv va Buyurtmalar Nazorati'}
              {activeTab === 'telegram' && 'Telegram Bot Sozlamalari'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              VOV Shop do'konining barcha adminlari, ombori va moliyaviy oqimini to'liq nazorat qilish
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'admins' && (
              <button
                onClick={handleOpenAddAdmin}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-xl shadow-amber-500/20 hover:opacity-95 transition flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Yangi Admin Tayinlash</span>
              </button>
            )}

            {activeTab === 'products' && (
              <button
                onClick={handleOpenAddProduct}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-extrabold text-xs shadow-lg shadow-indigo-500/30 hover:opacity-95 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi Mahsulot</span>
              </button>
            )}

            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-800 border border-amber-500/30 text-xs text-amber-300 font-bold shadow-sm">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Egasi: Xabibullox</span>
            </div>
          </div>
        </div>

        {/* OVERVIEW STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Admins Count Card */}
          <div 
            onClick={() => setActiveTab('admins')}
            className="bg-slate-800/90 hover:bg-slate-800 p-6 rounded-3xl border border-amber-500/30 shadow-lg cursor-pointer transition flex items-center justify-between group"
          >
            <div>
              <span className="text-xs text-amber-400 font-bold block uppercase tracking-wider">Jami Adminlar</span>
              <span className="text-3xl font-black text-white mt-1 block">
                {admins.length} ta
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                <b className="text-emerald-400">{activeAdminsCount} ta</b> faol • <b className="text-rose-400">{blockedAdminsCount} ta</b> bloklangan
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold group-hover:scale-105 transition">
              <Users className="w-7 h-7" />
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Jami Tushum</span>
              <span className="text-3xl font-black text-white mt-1 block">
                ${totalSalesRevenue.toFixed(2)}
              </span>
              <span className="text-[11px] text-emerald-400 mt-1 block font-semibold">
                ● Sof foyda va sotuvlar
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-bold">
              <DollarSign className="w-7 h-7" />
            </div>
          </div>

          {/* Orders */}
          <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Buyurtmalar</span>
              <span className="text-3xl font-black text-white mt-1 block">
                {orders.length + 18}
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block font-semibold">
                Barcha yetkazilgan xaridlar
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold">
              <ShoppingBag className="w-7 h-7" />
            </div>
          </div>

          {/* Products */}
          <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700/80 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-bold block uppercase tracking-wider">Mahsulotlar Soni</span>
              <span className="text-3xl font-black text-white mt-1 block">
                {products.length} ta
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block font-semibold">
                Omborda mavjud tovarlar
              </span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center font-bold">
              <Package className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* OVERVIEW TAB CONTENT */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span>Joriy Adminlar Faolligi ({admins.length} ta)</span>
                </h3>
                <button
                  onClick={() => setActiveTab('admins')}
                  className="text-xs font-bold text-amber-400 hover:underline"
                >
                  Barchasini ko'rish →
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Sizning do'koningizda {admins.length} nafar administrator buyurtmalarni qabul qilmoqda.
              </p>
              
              <div className="divide-y divide-slate-700 text-xs">
                {admins.map(a => (
                  <div key={a.id} className="py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-700 text-amber-400 flex items-center justify-center font-black">
                        {a.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-black text-white block">{a.name}</span>
                        <span className="text-slate-400 text-[11px]">@{a.username} • {a.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                        a.status === 'active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      }`}>
                        {a.status === 'active' ? '● Faol' : '✕ Bloklangan'}
                      </span>
                      <span className="text-[10px] text-slate-400">{a.lastLogin}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <span>Tezkor Owner Amallari</span>
              </h3>
              
              <button
                onClick={handleOpenAddAdmin}
                className="w-full p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold text-left hover:bg-amber-500/25 transition flex items-center gap-3"
              >
                <UserPlus className="w-4 h-4 text-amber-400" />
                <span>Yangi Admin tayinlash</span>
              </button>

              <button
                onClick={handleOpenAddProduct}
                className="w-full p-3.5 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold text-left hover:bg-indigo-500/25 transition flex items-center gap-3"
              >
                <Plus className="w-4 h-4 text-indigo-400" />
                <span>Yangi mahsulot qo'shish</span>
              </button>

              <a
                href="/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3.5 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold text-left hover:bg-purple-500/25 transition flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Oddiy Admin Panelini ochish</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              <button
                onClick={() => setActiveTab('telegram')}
                className="w-full p-3.5 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold text-left hover:bg-sky-500/25 transition flex items-center gap-3"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>Telegram Botni tekshirish</span>
              </button>
            </div>
          </div>
        )}

        {/* ADMINS MANAGEMENT TAB ("nechta admin va ularni boshqarish") */}
        {activeTab === 'admins' && (
          <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 shadow-sm overflow-hidden space-y-4 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Adminlarni qidirish..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-amber-300 font-bold bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/30">
                  Jami: {admins.length} ta admin ({activeAdminsCount} faol, {blockedAdminsCount} bloklangan)
                </span>
                <button
                  onClick={handleOpenAddAdmin}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Yangi Admin</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 text-[11px] font-extrabold uppercase text-slate-400 border-b border-slate-700">
                    <th className="p-4">Admin F.I.Sh</th>
                    <th className="p-4">Login / Username</th>
                    <th className="p-4">Telefon</th>
                    <th className="p-4">Parol</th>
                    <th className="p-4">Yaratilgan sana</th>
                    <th className="p-4">Holati</th>
                    <th className="p-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 text-xs">
                  {filteredAdmins.map(adm => (
                    <tr key={adm.id} className="hover:bg-slate-700/40 transition">
                      <td className="p-4 font-bold text-white flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-purple-600 text-white flex items-center justify-center font-black shadow">
                          {adm.name.charAt(0)}
                        </div>
                        <div>
                          <span>{adm.name}</span>
                          <span className="text-[10px] text-slate-400 block">{adm.role === 'admin' ? 'Administrator' : adm.role}</span>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-indigo-400">
                        @{adm.username}
                      </td>
                      <td className="p-4 text-slate-300 font-semibold">
                        {adm.phone || 'Kiritilmagan'}
                      </td>
                      <td className="p-4 font-mono text-slate-400">
                        <code>{adm.password ? '••••••••' : 'admin123'}</code>
                      </td>
                      <td className="p-4 text-slate-400 font-semibold">
                        {adm.createdAt}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleAdminStatus(adm.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-black border transition ${
                            adm.status === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
                          }`}
                          title="Statusni o'zgartirish uchun bosing"
                        >
                          {adm.status === 'active' ? '✓ Faol (Active)' : '✕ Bloklangan'}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditAdmin(adm)}
                          className="p-2 rounded-xl bg-slate-700 text-amber-400 hover:bg-slate-600 transition"
                          title="Tahrirlash"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`${adm.name} nomli adminni o'chirishni tasdiqlaysizmi?`)) {
                              deleteAdmin(adm.id);
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition"
                          title="Adminni o'chirish"
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

        {/* PRODUCTS TAB (CRUD) */}
        {activeTab === 'products' && (
          <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 shadow-sm overflow-hidden space-y-4 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Mahsulotlarni qidirish..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <span className="text-xs text-slate-400 font-semibold">
                Jami: {filteredProducts.length} ta mahsulot
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/80 text-[11px] font-extrabold uppercase text-slate-400 border-b border-slate-700">
                    <th className="p-4">Rasm</th>
                    <th className="p-4">Mahsulot Nomi</th>
                    <th className="p-4">Kategoriya</th>
                    <th className="p-4">Narxi</th>
                    <th className="p-4">Zaxira</th>
                    <th className="p-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 text-xs">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-700/40 transition">
                      <td className="p-4">
                        <img
                          src={p.image}
                          alt={p.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop";
                          }}
                          className="w-12 h-12 object-cover rounded-xl bg-slate-900"
                        />
                      </td>
                      <td className="p-4 font-bold text-white max-w-xs">
                        <div className="truncate">{p.title}</div>
                        <span className="inline-block mt-0.5 font-mono text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                          Tovar ID: #{p.id}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400 font-semibold">
                        {t[p.category] || p.category}
                      </td>
                      <td className="p-4 font-black text-amber-400">
                        ${p.price}
                      </td>
                      <td className="p-4 font-bold">
                        <span className={`px-2.5 py-1 rounded-lg ${p.stock > 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}>
                          {p.stock} dona
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-2 rounded-xl bg-slate-700 text-indigo-400 hover:bg-slate-600 transition"
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
                          className="p-2 rounded-xl bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition"
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
          <div className="bg-slate-800/90 rounded-3xl border border-slate-700/80 shadow-sm overflow-hidden">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 font-semibold">
                Hozircha yangi buyurtmalar kelmadi.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 text-[11px] font-extrabold uppercase text-slate-400 border-b border-slate-700">
                      <th className="p-4">Buyurtma ID</th>
                      <th className="p-4">Mijoz</th>
                      <th className="p-4">To'lov Usuli</th>
                      <th className="p-4">Jami Summa</th>
                      <th className="p-4">Holat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700 text-xs">
                    {orders.map(o => (
                      <tr key={o.id} className="hover:bg-slate-700/40 transition">
                        <td className="p-4 font-black text-amber-400">
                          #{o.id}
                        </td>
                        <td className="p-4 space-y-0.5">
                          <span className="font-bold text-white block">{o.customer.fullName}</span>
                          <span className="text-[10px] text-slate-400 block">{o.customer.phone}</span>
                        </td>
                        <td className="p-4 uppercase font-bold text-slate-300">
                          {o.customer.paymentMethod}
                        </td>
                        <td className="p-4 font-black text-white">
                          ${o.totalAmount.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-extrabold text-[10px]">
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
            <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 shadow-sm space-y-6">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Send className="w-5 h-5 text-sky-400" />
                  <span>Telegram Bot Integratsiyasi</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Yangi buyurtmalar avtomatik tarzda Telegram bot orqali sizga yetkaziladi.
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
                      className="text-[11px] text-amber-400 hover:underline font-semibold"
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
                      className="w-full p-3 pr-10 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none font-mono"
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
                  <p className="text-[11px] text-slate-400 mt-1">
                    Token server orqali himoyalangan. Tarmoq so'rovlarida mutlaqo ko'rinmaydi.
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-300">
                      Admin Chat ID
                    </label>
                    <button
                      type="button"
                      onClick={() => setChatId(DEFAULT_TELEGRAM_CHAT_ID)}
                      className="text-[11px] text-amber-400 hover:underline font-semibold"
                    >
                      Mening Chat ID
                    </button>
                  </div>
                  <input
                    type="text"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    placeholder="8170197389"
                    className="w-full p-3 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400 transition shadow"
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
                      <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                    ) : (
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    )}
                    <span>{isTestingBot ? "Yuborilmoqda..." : "Telegram Botni Sinash"}</span>
                  </button>
                </div>

                {testResult && (
                  <div className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                    testResult.includes('✅')
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                      : testResult.includes('Yuborilmoqda')
                      ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                      : 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  }`}>
                    {testResult}
                  </div>
                )}
              </form>
            </div>

            <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700/80 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span>Owner Xavfsizlik & Huquqlari</span>
              </h3>
              
              <div className="p-4 bg-slate-900 border border-slate-700 rounded-2xl space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Cheklanmagan Tizim Huquqlari</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Loyiha Egasi sifatida siz do'kondagi istalgan administratorni qo'shishingiz, bloklashingiz yoki o'chirishingiz mumkin.
                </p>
                <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px]">
                  <div>● Jami Adminlar: <b>{admins.length} nafar</b></div>
                  <div>● Faol Adminlar: <b className="text-emerald-400">{activeAdminsCount} nafar</b></div>
                  <div>● Bloklangan Adminlar: <b className="text-rose-400">{blockedAdminsCount} nafar</b></div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ADD / EDIT ADMIN MODAL */}
      {isAdminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-800 rounded-3xl max-w-md w-full p-6 border border-amber-500/30 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-400" />
                <span>{editingAdmin ? 'Adminni Tahrirlash' : 'Yangi Admin Tayinlash'}</span>
              </h3>
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAdmin} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Admin F.I.Sh *
                </label>
                <input
                  type="text"
                  required
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  placeholder="Masalan: Sardorbek Rahimov"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Admin Login (Username) *
                </label>
                <input
                  type="text"
                  required
                  value={adminUserLogin}
                  onChange={(e) => setAdminUserLogin(e.target.value)}
                  placeholder="sardor_admin"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Telefon Raqami
                </label>
                <input
                  type="text"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Admin Paroli *
                </label>
                <input
                  type="text"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="sardor2026"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none font-mono focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 text-slate-300 font-bold hover:bg-slate-600 transition"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black hover:bg-amber-400 transition shadow"
                >
                  {editingAdmin ? 'Saqlash' : 'Admin Tayinlash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {(isAddModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-800 rounded-3xl max-w-lg w-full p-6 border border-slate-700 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
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
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none"
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
                    className="w-full p-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none font-semibold"
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
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Narxi ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Eski narx ($)
                  </label>
                  <input
                    type="number"
                    value={prodOldPrice}
                    onChange={(e) => setProdOldPrice(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none"
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
                    className="w-full p-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Rasm URL havolasi
                </label>
                <input
                  type="text"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Tavsif
                </label>
                <textarea
                  rows="2"
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-600 transition"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 text-white text-xs font-black shadow"
                >
                  {editingProduct ? 'Saqlash' : 'Mahsulotni Joylash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
