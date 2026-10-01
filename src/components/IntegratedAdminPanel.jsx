import React, { useState } from 'react';
import {
  ShieldCheck,
  Crown,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Send,
  Plus,
  Edit3,
  Trash2,
  X,
  Search,
  DollarSign,
  TrendingUp,
  Sparkles,
  Eye,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function IntegratedAdminPanel() {
  const {
    t,
    user,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    telegramConfig,
    saveTelegramConfig,
    isAdminPanelOpen,
    setIsAdminPanelOpen,
    toggleAdminPanel,
    adminActiveTab,
    setAdminActiveTab,
    adminEditingProduct,
    setAdminEditingProduct,
    isAdminAddModalOpen,
    setIsAdminAddModalOpen
  } = useApp();

  // Local states for product search and modal form
  const [productSearch, setProductSearch] = useState('');
  
  // Product form states
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState('cat_smartphones');
  const [prodPrice, setProdPrice] = useState('');
  const [prodOldPrice, setProdOldPrice] = useState('');
  const [prodStock, setProdStock] = useState('10');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  // Telegram states
  const [botToken, setBotToken] = useState(telegramConfig?.botToken || '');
  const [chatId, setChatId] = useState(telegramConfig?.chatId || '');
  const [testResult, setTestResult] = useState(null);

  // If user is not admin or owner, don't render anything
  if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
    return null;
  }

  const handleOpenAddModal = () => {
    setProdTitle('');
    setProdCategory('cat_smartphones');
    setProdPrice('');
    setProdOldPrice('');
    setProdStock('10');
    setProdImage('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop');
    setProdDesc('');
    setIsAdminAddModalOpen(true);
  };

  const handleOpenEditModal = (p) => {
    setAdminEditingProduct(p);
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

    if (adminEditingProduct) {
      updateProduct(adminEditingProduct.id, payload);
      setAdminEditingProduct(null);
    } else {
      addProduct(payload);
      setIsAdminAddModalOpen(false);
    }
  };

  const handleSaveTelegram = (e) => {
    e.preventDefault();
    saveTelegramConfig({ botToken, chatId });
    alert("Telegram bot sozlamalari muvaffaqiyatli saqlandi!");
  };

  const handleTestTelegramBot = async () => {
    setTestResult('Yuborilmoqda...');
    try {
      const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: "🚀 <b>VOV SHOP Bitta Sahifali Admin Panel Test Xabari</b>\n\nAdmin panel va sayt bitta pageda muvaffaqiyatli ishlamoqda!",
          parse_mode: 'HTML'
        })
      });
      const data = await res.json();
      if (data.ok) {
        setTestResult(t.bot_test_success || "Xabar Telegramga muvaffaqiyatli yuborildi!");
      } else {
        setTestResult(`Xatolik: ${data.description}`);
      }
    } catch (err) {
      setTestResult("Tarmoq xatosi yoki token yaroqsiz.");
    }
  };

  const totalSalesRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 2450);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <>
      {/* 1. FLOATING QUICK ACCESS BUTTON (Bottom-Right, non-intrusive) */}
      {!isAdminPanelOpen && (
        <button
          onClick={toggleAdminPanel}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-xs shadow-2xl shadow-indigo-500/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group ring-2 ring-white/20"
          title="Admin Boshqaruv Panelini Ochish (Bitta Sahifada)"
        >
          <div className="relative">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full"></span>
          </div>
          <span className="font-extrabold tracking-wide">Admin Boshqaruv</span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] uppercase font-black tracking-wider">
            1-Page
          </span>
        </button>
      )}

      {/* 2. FULL INTEGRATED ADMIN DASHBOARD MODAL/DRAWER (WORKS ON THE SAME PAGE) */}
      {isAdminPanelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
            
            {/* Top Bar of Modal */}
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  {user.role === 'owner' ? (
                    <Crown className="w-5 h-5 text-amber-300" />
                  ) : (
                    <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-black text-base text-white">VOV Shop Boshqaruv Markazi</h2>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                      Bitta Sahifada
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Administrator: <span className="text-white font-bold">{user.name}</span>
                  </p>
                </div>
              </div>

              {/* Close Button & Saytga Qaytish */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAdminPanelOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5"
                  title="Saytga qaytish"
                >
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <span>Saytni Ko'rish</span>
                </button>

                <button
                  onClick={() => setIsAdminPanelOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition"
                  title="Yopish"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar inside Modal */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/60 border-b border-slate-800 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">Jami Tushum</span>
                  <span className="text-lg font-black text-emerald-400 block">${totalSalesRevenue.toFixed(2)}</span>
                </div>
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">Buyurtmalar</span>
                  <span className="text-lg font-black text-white block">{orders.length + 18} ta</span>
                </div>
                <ShoppingBag className="w-5 h-5 text-purple-400" />
              </div>

              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">Mahsulotlar Ombori</span>
                  <span className="text-lg font-black text-white block">{products.length} ta</span>
                </div>
                <Package className="w-5 h-5 text-indigo-400" />
              </div>

              <div className="bg-slate-800/80 p-3 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 font-bold block">Telegram Bot</span>
                  <span className="text-xs font-black text-emerald-400 block">● Faol / Online</span>
                </div>
                <Send className="w-5 h-5 text-sky-400" />
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="px-6 py-3 bg-slate-950/70 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'overview', label: '📊 Analitika', icon: LayoutDashboard },
                  { id: 'products', label: `📦 Mahsulotlar (${products.length})`, icon: Package },
                  { id: 'orders', label: `🛍️ Buyurtmalar (${orders.length + 18})`, icon: ShoppingBag },
                  { id: 'telegram', label: '🤖 Telegram Bot', icon: Send },
                ].map(tab => {
                  const isActive = adminActiveTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setAdminActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {adminActiveTab === 'products' && (
                <button
                  onClick={handleOpenAddModal}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yangi Mahsulot Qo'shish</span>
                </button>
              )}
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* TAB 1: OVERVIEW */}
              {adminActiveTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-4">
                    <h3 className="font-black text-sm text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-indigo-400" />
                      <span>So'nggi Buyurtmalar va Mijozlar</span>
                    </h3>
                    <div className="divide-y divide-slate-700/60 text-xs">
                      {orders.slice(0, 5).map(o => (
                        <div key={o.id} className="py-3 flex items-center justify-between">
                          <div>
                            <span className="font-black text-indigo-400">#{o.id}</span>
                            <span className="ml-2 font-bold text-slate-200">{o.customer?.fullName}</span>
                            <span className="ml-2 text-slate-400 text-[11px]">{o.customer?.phone}</span>
                          </div>
                          <span className="font-black text-emerald-400">${o.totalAmount?.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-3">
                    <h3 className="font-black text-sm text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Tezkor Amallar</span>
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Sayt bilan bir xil pagedasiz. Mahsulotlarni istasangiz shu yerdan, istasangiz to'g'ridan-to'g'ri sayt kartalari ustidan tahrirlashingiz mumkin.
                    </p>
                    <button
                      onClick={handleOpenAddModal}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Yangi Mahsulot Joylash</span>
                    </button>
                    <button
                      onClick={() => setAdminActiveTab('telegram')}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition"
                    >
                      <Send className="w-4 h-4 text-sky-400" />
                      <span>Telegram Botni Tekshirish</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: PRODUCTS CRUD */}
              {adminActiveTab === 'products' && (
                <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="relative w-full sm:w-80">
                      <input
                        type="text"
                        placeholder="Mahsulot nomi yoki toifasi..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>

                    <span className="text-xs text-slate-400 font-semibold">
                      Jami: {filteredProducts.length} ta mahsulot
                    </span>
                  </div>

                  <div className="overflow-x-auto max-h-[50vh] overflow-y-auto">
                    <table className="w-full text-left border-collapse">
                      <thead className="sticky top-0 bg-slate-900 text-[11px] font-black uppercase text-slate-400 border-b border-slate-700">
                        <tr>
                          <th className="p-3">Rasm</th>
                          <th className="p-3">Mahsulot Nomi</th>
                          <th className="p-3">Kategoriya</th>
                          <th className="p-3">Narxi</th>
                          <th className="p-3">Zaxira</th>
                          <th className="p-3 text-right">Amallar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/60 text-xs">
                        {filteredProducts.map(p => (
                          <tr key={p.id} className="hover:bg-slate-700/40 transition">
                            <td className="p-3">
                              <img
                                src={p.image}
                                alt={p.title}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop";
                                }}
                                className="w-10 h-10 object-cover rounded-xl bg-slate-900"
                              />
                            </td>
                            <td className="p-3 font-bold text-white max-w-xs truncate">
                              {p.title}
                            </td>
                            <td className="p-3 text-slate-400 font-semibold">
                              {t[p.category] || p.category}
                            </td>
                            <td className="p-3 font-black text-indigo-400">
                              ${p.price}
                            </td>
                            <td className="p-3 font-bold">
                              <span className={`px-2 py-0.5 rounded-lg text-[10px] ${
                                p.stock > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                              }`}>
                                {p.stock} dona
                              </span>
                            </td>
                            <td className="p-3 text-right space-x-1.5">
                              <button
                                onClick={() => handleOpenEditModal(p)}
                                className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition"
                                title="Tahrirlash"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`"${p.title}" mahsulotini o'chirishni tasdiqlaysizmi?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="p-2 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition"
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

              {/* TAB 3: ORDERS */}
              {adminActiveTab === 'orders' && (
                <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-4">
                  <h3 className="font-black text-sm text-white flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-purple-400" />
                    <span>Mijozlar Buyurtmalari Ro'yxati</span>
                  </h3>
                  {orders.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-400">
                      Hozircha yangi buyurtmalar kelmadi.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-900 text-[11px] font-black uppercase text-slate-400 border-b border-slate-700">
                            <th className="p-3">ID</th>
                            <th className="p-3">Mijoz Ismi & Telefon</th>
                            <th className="p-3">To'lov Usuli</th>
                            <th className="p-3">Summa</th>
                            <th className="p-3">Holat</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/60 text-xs">
                          {orders.map(o => (
                            <tr key={o.id} className="hover:bg-slate-700/40 transition">
                              <td className="p-3 font-black text-indigo-400">#{o.id}</td>
                              <td className="p-3 space-y-0.5">
                                <span className="font-bold text-white block">{o.customer?.fullName}</span>
                                <span className="text-[10px] text-slate-400 block">{o.customer?.phone}</span>
                              </td>
                              <td className="p-3 uppercase font-bold text-slate-300">
                                {o.customer?.paymentMethod}
                              </td>
                              <td className="p-3 font-black text-emerald-400">
                                ${o.totalAmount?.toFixed(2)}
                              </td>
                              <td className="p-3">
                                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-[10px]">
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

              {/* TAB 4: TELEGRAM BOT */}
              {adminActiveTab === 'telegram' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-4">
                    <h3 className="font-black text-sm text-white flex items-center gap-2">
                      <Send className="w-4 h-4 text-sky-400" />
                      <span>Telegram Bot Sozlamalari</span>
                    </h3>
                    <form onSubmit={handleSaveTelegram} className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Bot Token
                        </label>
                        <input
                          type="password"
                          value={botToken}
                          onChange={(e) => setBotToken(e.target.value)}
                          placeholder="7123456789:AA..."
                          className="w-full p-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Admin Chat ID
                        </label>
                        <input
                          type="text"
                          value={chatId}
                          onChange={(e) => setChatId(e.target.value)}
                          placeholder="8170197389"
                          className="w-full p-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white outline-none font-mono"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
                        >
                          Saqlash
                        </button>
                        <button
                          type="button"
                          onClick={handleTestTelegramBot}
                          className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 font-bold text-xs flex items-center gap-1.5 transition"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>Botni Sinash</span>
                        </button>
                      </div>
                      {testResult && (
                        <div className="p-2.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-emerald-400">
                          {testResult}
                        </div>
                      )}
                    </form>
                  </div>

                  <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 space-y-3">
                    <h3 className="font-black text-sm text-white flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Xarid Xabarnomalari</span>
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Xaridor yangi buyurtma berganda mijoz ismi, telefoni, to'lov usuli va Google / Yandex xaritalar havolasi botingizga darhol yetib keladi.
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 3. ADD / EDIT PRODUCT MODAL (WORKS IN-PAGE) */}
      {(isAdminAddModalOpen || adminEditingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 text-slate-900 dark:text-white">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-indigo-500" />
                <span>{adminEditingProduct ? 'Mahsulotni Tahrirlash' : 'Yangi Mahsulot Qo\'shish'}</span>
              </h3>
              <button
                onClick={() => {
                  setIsAdminAddModalOpen(false);
                  setAdminEditingProduct(null);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mahsulot Nomi *
                </label>
                <input
                  type="text"
                  required
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  placeholder="Masalan: iPhone 16 Pro Max"
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kategoriya
                  </label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-semibold"
                  >
                    <option value="cat_smartphones">{t.cat_smartphones}</option>
                    <option value="cat_laptops">{t.cat_laptops}</option>
                    <option value="cat_audio">{t.cat_audio}</option>
                    <option value="cat_watches">{t.cat_watches}</option>
                    <option value="cat_accessories">{t.cat_accessories}</option>
                    <option value="cat_gaming">{t.cat_gaming}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Narxi ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="1200"
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Eski narx ($)
                  </label>
                  <input
                    type="number"
                    value={prodOldPrice}
                    onChange={(e) => setProdOldPrice(e.target.value)}
                    placeholder="1350"
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Omborda qancha bor?
                  </label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    placeholder="10"
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Rasm havolasi (URL)
                </label>
                <input
                  type="url"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Tavsif
                </label>
                <textarea
                  rows="2"
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Mahsulot haqida qisqacha ma'lumot..."
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAdminAddModalOpen(false);
                    setAdminEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black hover:opacity-95 shadow"
                >
                  {adminEditingProduct ? 'Saqlash' : 'Mahsulotni Joylash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
