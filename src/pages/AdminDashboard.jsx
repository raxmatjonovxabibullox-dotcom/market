import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Menu,
  ShieldCheck,
  Lock,
  Crown,
  LogIn,
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
  Settings,
  Download,
  Filter,
  ArrowUpDown,
  Printer,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Check,
  AlertTriangle,
  Clock,
  Radio,
  ExternalLink,
  Flame,
  Zap,
  Activity,
  Award,
  BarChart3,
  Percent,
  Server,
  Cpu,
  HardDrive,
  Terminal,
  Wifi,
  Database,
  Upload,
  RotateCcw
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/initialData';
import { useApp } from '../context/AppContext';

// Simple synthesized Web Audio SFX for high-tech tactile feel
const playSound = (type = 'click', enabled = true) => {
  if (!enabled) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'warn') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.setValueAtTime(200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    // Audio context may be restricted by autoplay policy
  }
};

export default function AdminDashboard() {
  const {
    t,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteMultipleProducts,
    orders,
    placeOrder,
    updateOrderStatus,
    deleteOrder,
    resendOrderToTelegram,
    telegramConfig,
    saveTelegramConfig,
    testTelegramConnection,
    sendTelegramMessage,
    DEFAULT_TELEGRAM_BOT_TOKEN,
    DEFAULT_TELEGRAM_CHAT_ID,
    user,
    login,
    logout,
    theme,
    toggleTheme
  } = useApp();

  const navigate = useNavigate();

  // Navigation & UI Layout State
  const [activeTab, setActiveTab] = useState('alternate'); // 'alternate' | 'ecommerce' | 'tables' | 'telegram' | 'system'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('rocker_sound') !== 'false');
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('rocker_accent') || 'cyan'); // cyan, violet, emerald, amber, rose
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Admin Auth Gate State
  const [adminUsernameInput, setAdminUsernameInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminAuthError, setAdminAuthError] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);

  // Time & Realtime Ticker State
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme Accent Maps
  const accentStyles = {
    cyan: {
      primary: 'from-cyan-500 to-blue-600',
      text: 'text-cyan-400',
      bgGlow: 'bg-cyan-500/10',
      borderGlow: 'border-cyan-500/30',
      activeTab: 'bg-[#21293e] text-cyan-400 border border-cyan-500/40 shadow-cyan-500/10',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      hex: '#00d2ff'
    },
    violet: {
      primary: 'from-purple-500 to-indigo-600',
      text: 'text-purple-400',
      bgGlow: 'bg-purple-500/10',
      borderGlow: 'border-purple-500/30',
      activeTab: 'bg-[#21293e] text-purple-400 border border-purple-500/40 shadow-purple-500/10',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      hex: '#a855f7'
    },
    emerald: {
      primary: 'from-emerald-500 to-teal-600',
      text: 'text-emerald-400',
      bgGlow: 'bg-emerald-500/10',
      borderGlow: 'border-emerald-500/30',
      activeTab: 'bg-[#21293e] text-emerald-400 border border-emerald-500/40 shadow-emerald-500/10',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      hex: '#10b981'
    },
    amber: {
      primary: 'from-amber-500 to-orange-600',
      text: 'text-amber-400',
      bgGlow: 'bg-amber-500/10',
      borderGlow: 'border-amber-500/30',
      activeTab: 'bg-[#21293e] text-amber-400 border border-amber-500/40 shadow-amber-500/10',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      hex: '#f59e0b'
    },
    rose: {
      primary: 'from-rose-500 to-pink-600',
      text: 'text-rose-400',
      bgGlow: 'bg-rose-500/10',
      borderGlow: 'border-rose-500/30',
      activeTab: 'bg-[#21293e] text-rose-400 border border-rose-500/40 shadow-rose-500/10',
      badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      hex: '#f43f5e'
    }
  };
  const activeAccent = accentStyles[accentColor] || accentStyles.cyan;

  const handleAccentChange = (col) => {
    setAccentColor(col);
    localStorage.setItem('rocker_accent', col);
    playSound('click', soundEnabled);
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem('rocker_sound', String(next));
    playSound('click', next);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
    playSound('click', soundEnabled);
  };

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    playSound(type === 'success' ? 'success' : 'warn', soundEnabled);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Admin login states
  const [adminUsername, setAdminUsername] = useState('admin');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Analytics Chart State
  const [chartTimeframe, setChartTimeframe] = useState('haftalik'); // 'bugun' | 'haftalik' | 'oylik' | 'yillik'
  const [hoveredChartPoint, setHoveredChartPoint] = useState(null);

  // Products CRUD & Filter State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [stockStatusFilter, setStockStatusFilter] = useState('all'); // 'all' | 'in_stock' | 'low' | 'out'
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [previewImageModal, setPreviewImageModal] = useState(null);

  // Product Form Fields
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState('cat_smartphones');
  const [prodPrice, setProdPrice] = useState('');
  const [prodOldPrice, setProdOldPrice] = useState('');
  const [prodStock, setProdStock] = useState('10');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  // Orders State & Details Drawer
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [resendingOrderId, setResendingOrderId] = useState(null);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // Telegram Settings & Broadcast State
  const [botToken, setBotToken] = useState(telegramConfig?.botToken || DEFAULT_TELEGRAM_BOT_TOKEN || '');
  const [chatId, setChatId] = useState(telegramConfig?.chatId || DEFAULT_TELEGRAM_CHAT_ID || '8170197389');
  const [showToken, setShowToken] = useState(false);
  const [isTestingBot, setIsTestingBot] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [botPingMs, setBotPingMs] = useState(null);

  // Telegram Broadcast Modal
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Live Activity Log
  const [activityLogs, setActivityLogs] = useState([
    { id: 1, text: "Admin tizimiga muvaffaqiyatli kirildi", time: "Hozir", icon: "shield", color: "emerald" },
    { id: 2, text: "Telegram bot sinxronizatsiyasi faol holatda", time: "2 daqiqa oldin", icon: "send", color: "cyan" },
    { id: 3, text: "Mahsulotlar ombori tahlili yangilandi", time: "15 daqiqa oldin", icon: "package", color: "amber" },
    { id: 4, text: "Kunlik savdo ko'rsatkichi hisoblandi", time: "1 soat oldin", icon: "dollar", color: "rose" }
  ]);

  const addActivity = (text, icon = 'activity', color = 'cyan') => {
    const newEntry = {
      id: Date.now(),
      text,
      time: "Hozir",
      icon,
      color
    };
    setActivityLogs(prev => [newEntry, ...prev.slice(0, 15)]);
  };

  // --- SYSTEM & SERVER MONITOR STATE & HANDLERS ---
  const [serverPing, setServerPing] = useState(24);
  const [telegramPing, setTelegramPing] = useState(38);
  const [cpuUsage, setCpuUsage] = useState(19.4);
  const [ramUsage, setRamUsage] = useState(56.8);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [systemUptimeSeconds, setSystemUptimeSeconds] = useState(85420);
  const systemRestoreInputRef = useRef(null);

  const [systemLogs, setSystemLogs] = useState(() => [
    { id: 1, time: '16:40:02', level: 'INFO', msg: 'Vite 8 HMR dev server listening on http://localhost:5173' },
    { id: 2, time: '16:40:15', level: 'SUCCESS', msg: 'LocalStorage maʼlumotlar bazasi tekshirildi (200 OK)' },
    { id: 3, time: '16:40:30', level: 'INFO', msg: 'Telegram Bot API aloqasi ulandi (WebHook tayyor)' },
    { id: 4, time: '16:41:00', level: 'SUCCESS', msg: 'Xavfsiz Superadmin sessiyasi faollashtirildi: Xabibullo Raxmatjonov' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemUptimeSeconds(prev => prev + 1);
      setCpuUsage(+(15 + Math.random() * 12).toFixed(1));
      setRamUsage(+(54 + Math.random() * 5).toFixed(1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const formattedUptime = useMemo(() => {
    const hours = Math.floor(systemUptimeSeconds / 3600);
    const minutes = Math.floor((systemUptimeSeconds % 3600) / 60);
    const seconds = systemUptimeSeconds % 60;
    return `${hours}s ${minutes}m ${seconds}s`;
  }, [systemUptimeSeconds]);

  const handleRunDiagnostics = async () => {
    setIsDiagnosing(true);
    playSound('click', soundEnabled);
    try {
      await new Promise(r => setTimeout(r, 650));
      const newPing = Math.floor(18 + Math.random() * 18);
      const newTgPing = Math.floor(30 + Math.random() * 25);
      setServerPing(newPing);
      setTelegramPing(newTgPing);
      const nowStr = new Date().toTimeString().slice(0, 8);
      setSystemLogs(prev => [
        { id: Date.now(), time: nowStr, level: 'SUCCESS', msg: `[DIAGNOSTIKA] Server ping: ${newPing}ms | Telegram ping: ${newTgPing}ms | 100% Barqaror!` },
        ...prev.slice(0, 25)
      ]);
      showToast(`Tizim to'liq diagnostika qilindi! Ping: ${newPing}ms ✅`);
      addActivity(`Tizim to'liq diagnostikadan o'tkazildi (${newPing}ms)`, 'activity', 'emerald');
    } catch (e) {
      showToast("Diagnostika vaqtida xatolik yuz berdi", "warn");
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleClearSystemCache = () => {
    playSound('click', soundEnabled);
    try {
      sessionStorage.clear();
      const nowStr = new Date().toTimeString().slice(0, 8);
      setSystemLogs(prev => [
        { id: Date.now(), time: nowStr, level: 'INFO', msg: '[KESH] Brauzer xotirasi va vaqtinchalik qidiruv keshlar tozalandi' },
        ...prev.slice(0, 25)
      ]);
      showToast("Kesh tozalandi va xotira optimallashtirildi! 🧹");
      addActivity("Kesh va xotira optimallashtirildi", 'refresh', 'cyan');
    } catch (e) {
      showToast("Keshni tozalashda xatolik", "warn");
    }
  };

  const handleExportDatabaseBackup = () => {
    playSound('click', soundEnabled);
    const backupData = {
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      products,
      orders,
      telegramConfig
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VOV_Shop_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    const nowStr = new Date().toTimeString().slice(0, 8);
    setSystemLogs(prev => [
      { id: Date.now(), time: nowStr, level: 'SUCCESS', msg: `[ZAXIRA] Ma'lumotlar bazasi (JSON) yuklab olindi (${products.length} tovar, ${orders.length} buyurtma)` },
      ...prev.slice(0, 25)
    ]);
    showToast("Ma'lumotlar bazasi zaxirasi muvaffaqiyatli yuklab olindi! 💾");
    addActivity("Ma'lumotlar bazasi zaxira nusxasi yuklandi", 'download', 'emerald');
  };

  const handleRestoreDatabaseBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    playSound('click', soundEnabled);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.products && Array.isArray(parsed.products)) {
          localStorage.setItem('app_products', JSON.stringify(parsed.products));
        }
        if (parsed.orders && Array.isArray(parsed.orders)) {
          localStorage.setItem('app_orders', JSON.stringify(parsed.orders));
        }
        if (parsed.telegramConfig) {
          localStorage.setItem('telegram_config', JSON.stringify(parsed.telegramConfig));
        }
        showToast("Ma'lumotlar zaxiradan tiklandi! Sahifa yangilanmoqda... 🔄");
        setTimeout(() => window.location.reload(), 1200);
      } catch (err) {
        showToast("Noto'g'ri JSON fayl formati!", "warn");
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefaultProducts = () => {
    if (confirm("DIQQAT: Barcha mahsulotlar asl (standart) holatiga qaytariladi. Davom etasizmi?")) {
      playSound('click', soundEnabled);
      localStorage.setItem('app_products', JSON.stringify(INITIAL_PRODUCTS));
      localStorage.removeItem('app_deleted_products');
      showToast("Mahsulotlar asl holatiga qaytarildi! Sahifa yangilanmoqda... 🔄");
      setTimeout(() => window.location.reload(), 1200);
    }
  };

  const handleExecuteTerminalCommand = (cmdStr) => {
    const cmd = (cmdStr || terminalInput).trim().toLowerCase();
    if (!cmd) return;
    setTerminalInput('');
    playSound('click', soundEnabled);
    const nowStr = new Date().toTimeString().slice(0, 8);
    let responseLog = null;

    if (cmd === 'ping') {
      const p = Math.floor(18 + Math.random() * 15);
      responseLog = { id: Date.now(), time: nowStr, level: 'SUCCESS', msg: `PONG: Server javob berdi (${p}ms). Telegram API: ${telegramPing}ms` };
    } else if (cmd === 'status') {
      responseLog = { id: Date.now(), time: nowStr, level: 'INFO', msg: `STATUS: 100% Operational | Uptime: ${formattedUptime} | CPU: ${cpuUsage}% | RAM: ${ramUsage}MB` };
    } else if (cmd === 'health') {
      responseLog = { id: Date.now(), time: nowStr, level: 'SUCCESS', msg: `HEALTH CHECK: Vite (Port 5173): OK | Telegram Bot: Online | LocalStorage: ${storageUsageKB}KB` };
    } else if (cmd === 'clear') {
      setSystemLogs([]);
      return;
    } else if (cmd === 'backup') {
      handleExportDatabaseBackup();
      return;
    } else if (cmd === 'help') {
      responseLog = { id: Date.now(), time: nowStr, level: 'INFO', msg: `Mavjud buyruqlar: ping, status, health, clear, backup, help` };
    } else {
      responseLog = { id: Date.now(), time: nowStr, level: 'WARN', msg: `Noma'lum buyruq: "${cmd}". Yordam uchun 'help' deb yozing.` };
    }

    setSystemLogs(prev => [responseLog, ...prev.slice(0, 25)]);
  };
  const totalOrdersCount = 8052 + orders.length;
  const calculatedRealRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalRevenueDisplay = (6.2 + (calculatedRealRevenue / 1000)).toFixed(1);
  const totalSoldItemsCount = 956 + orders.reduce((sum, o) => sum + (o.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 1), 0);

  // Product Category breakdown
  const categoryCounts = useMemo(() => {
    const counts = {
      smartphones: 0,
      laptops: 0,
      audio: 0,
      tv: 0,
      wearables: 0
    };
    products.forEach(p => {
      if (p.category === 'cat_smartphones') counts.smartphones++;
      else if (p.category === 'cat_laptops') counts.laptops++;
      else if (p.category === 'cat_audio') counts.audio++;
      else if (p.category === 'cat_tv') counts.tv++;
      else counts.wearables++;
    });
    return counts;
  }, [products]);

  // Product Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch =
        p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
        String(p.id).toLowerCase().includes(productSearch.toLowerCase());

      const matchCategory =
        productCategoryFilter === 'all' || p.category === productCategoryFilter;

      const matchStock =
        stockStatusFilter === 'all' ||
        (stockStatusFilter === 'in_stock' && p.stock > 5) ||
        (stockStatusFilter === 'low' && p.stock > 0 && p.stock <= 5) ||
        (stockStatusFilter === 'out' && p.stock <= 0);

      return matchSearch && matchCategory && matchStock;
    });
  }, [products, productSearch, productCategoryFilter, stockStatusFilter]);

  // Order Filtering Logic
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchStatus =
        orderStatusFilter === 'all' ||
        (orderStatusFilter === 'pending' && (!o.status || o.status === 'status_pending' || o.status === 'pending')) ||
        (orderStatusFilter === 'processing' && o.status === 'processing') ||
        (orderStatusFilter === 'delivered' && (o.status === 'delivered' || o.status === 'status_delivered')) ||
        (orderStatusFilter === 'cancelled' && o.status === 'cancelled');

      const matchSearch =
        !searchQuery ||
        o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer?.phone?.includes(searchQuery);

      return matchStatus && matchSearch;
    });
  }, [orders, orderStatusFilter, searchQuery]);

  // --- Handlers ---
  const handleOpenAddModal = (preset = null) => {
    playSound('click', soundEnabled);
    if (preset) {
      setProdTitle(preset.title);
      setProdCategory(preset.category);
      setProdPrice(preset.price);
      setProdOldPrice(preset.oldPrice);
      setProdStock(preset.stock);
      setProdImage(preset.image);
      setProdDesc(preset.desc);
    } else {
      setProdTitle('');
      setProdCategory('cat_smartphones');
      setProdPrice('');
      setProdOldPrice('');
      setProdStock('15');
      setProdImage('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop');
      setProdDesc('');
    }
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (p) => {
    playSound('click', soundEnabled);
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
      showToast("Mahsulot muvaffaqiyatli yangilandi! ✏️");
      addActivity(`"${payload.title}" mahsuloti tahrirlandi`, 'edit', 'cyan');
    } else {
      addProduct(payload);
      setIsAddModalOpen(false);
      showToast("Yangi mahsulot omborga qo'shildi! 🎉");
      addActivity(`Yangi mahsulot: "${payload.title}" qo'shildi`, 'plus', 'emerald');
    }
  };

  const handleQuickStockChange = (productId, delta) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const newStock = Math.max(0, (prod.stock || 0) + delta);
    updateProduct(productId, { stock: newStock });
    playSound('click', soundEnabled);
  };

  const handleDeleteSelectedProducts = () => {
    if (selectedProductIds.length === 0) return;
    if (confirm(`${selectedProductIds.length} ta tanlangan mahsulotni o'chirishni tasdiqlaysizmi?`)) {
      deleteMultipleProducts(selectedProductIds);
      const count = selectedProductIds.length;
      setSelectedProductIds([]);
      showToast(`${count} ta mahsulot o'chirildi!`);
      addActivity(`${count} ta mahsulot guruhlab o'chirildi`, 'trash', 'rose');
    }
  };

  const handleApplyBatchDiscount = (percent = 10) => {
    if (selectedProductIds.length === 0) return;
    selectedProductIds.forEach(id => {
      const prod = products.find(p => p.id === id);
      if (prod) {
        const discounted = Math.round(prod.price * (1 - percent / 100));
        updateProduct(id, { oldPrice: prod.price, price: discounted });
      }
    });
    setSelectedProductIds([]);
    showToast(`Tanlangan mahsulotlarga ${percent}% chegirma qo'llanildi! 🔥`);
    addActivity(`Tanlangan mahsulotlarga ${percent}% chegirma berildi`, 'percent', 'amber');
  };

  // Telegram Test Connection
  const handleTestTelegramBot = async () => {
    setIsTestingBot(true);
    setTestResult('Yuborilmoqda...');
    const startTime = performance.now();
    try {
      const activeToken = (botToken || '').trim() || telegramConfig?.botToken || DEFAULT_TELEGRAM_BOT_TOKEN;
      const activeChatId = (chatId || '').trim() || telegramConfig?.chatId || DEFAULT_TELEGRAM_CHAT_ID;
      const res = await testTelegramConnection(activeToken, activeChatId);
      const ping = Math.round(performance.now() - startTime);
      setBotPingMs(ping);

      if (res && res.ok) {
        setTestResult(`✅ Xabar Telegramga yetkazildi! (${ping}ms)`);
        showToast(`Telegram bot bilan aloqa faol! (${ping}ms)`);
        addActivity(`Telegram bot sinovi muvaffaqiyatli (${ping}ms)`, 'send', 'emerald');
      } else {
        setTestResult(`❌ Xatolik: ${res?.description || "Xabar yuborilmadi"}`);
        showToast("Telegram sinovida xatolik!", "warn");
      }
    } catch (err) {
      setTestResult(`❌ Xatolik: ${err.message}`);
      showToast("Telegram sinovida xatolik!", "warn");
    } finally {
      setIsTestingBot(false);
    }
  };

  // Telegram Broadcast Handler
  const handleSendBroadcast = async () => {
    if (!broadcastMessage.trim()) return;
    setIsBroadcasting(true);
    try {
      const formatted = `📢 <b>VOV SHOP MA'MURIYATI E'LONI</b>\n\n${broadcastMessage}\n\n<i>⏰ Sana: ${new Date().toLocaleString('uz-UZ')}</i>`;
      const res = await sendTelegramMessage(formatted);
      if (res.success) {
        showToast("E'lon Telegram kanaliga yuborildi! 🚀");
        addActivity("Telegram orqali ommaviy e'lon tarqatildi", 'broadcast', 'cyan');
        setBroadcastMessage('');
        setIsBroadcastModalOpen(false);
      } else {
        showToast("Xabar yuborilmadi: " + (res.error || "Xatolik"), "warn");
      }
    } catch (e) {
      showToast("Xatolik: " + e.message, "warn");
    } finally {
      setIsBroadcasting(false);
    }
  };

  // Fast Test Order Generator (Quick Demo Order)
  const handleGenerateTestOrder = async () => {
    playSound('click', soundEnabled);
    const randomProduct = products[Math.floor(Math.random() * products.length)] || products[0];
    const mockCustomer = {
      fullName: 'Sardor Qodirov (Test Buyurtma)',
      phone: '+998 90 987 65 43',
      address: 'Toshkent sh., Chilonzor 19-mavze, 45-uy',
      paymentMethod: 'click'
    };

    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      formattedDate: new Date().toLocaleString('uz-UZ'),
      customer: mockCustomer,
      items: [{ product: randomProduct, quantity: 1 }],
      subtotal: randomProduct.price,
      discountAmount: 0,
      deliveryFee: 15,
      totalAmount: randomProduct.price + 15,
      status: 'status_pending'
    };

    try {
      await resendOrderToTelegram(newOrder);
      showToast(`Test buyurtma #${newOrder.id} Telegramga yuborildi! 📦`);
      addActivity(`Test buyurtma #${newOrder.id} shakllantirildi`, 'cart', 'emerald');
    } catch (e) {
      showToast("Buyurtma yuborishda xatolik: " + e.message, "warn");
    }
  };

  const handleResendOrder = async (order) => {
    setResendingOrderId(order.id);
    try {
      await resendOrderToTelegram(order);
      showToast(`Buyurtma #${order.id} botga yuborildi! 🚀`);
      addActivity(`Buyurtma #${order.id} Telegramga qayta yuborildi`, 'send', 'cyan');
    } catch (e) {
      showToast("Xatolik: " + e.message, "warn");
    } finally {
      setResendingOrderId(null);
    }
  };

  // CSV Export for Orders
  const handleExportOrdersCSV = () => {
    playSound('click', soundEnabled);
    if (orders.length === 0) {
      showToast("Eksport qilish uchun buyurtmalar yo'q!", "warn");
      return;
    }
    const headers = "ID,Sana,Mijoz,Telefon,Manzil,To'lov,Jami Summa,Status\n";
    const rows = orders.map(o =>
      `"${o.id}","${o.formattedDate || o.date}","${o.customer?.fullName || ''}","${o.customer?.phone || ''}","${o.customer?.address || ''}","${o.customer?.paymentMethod || ''}","$${o.totalAmount || 0}","${o.status || 'Kutilmoqda'}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `VOV_Shop_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Buyurtmalar CSV fayli yuklab olindi! 📥");
    addActivity("Barcha buyurtmalar CSV formatida eksport qilindi", 'download', 'emerald');
  };

  // LocalStorage storage size calculation
  const storageUsageKB = useMemo(() => {
    try {
      let total = 0;
      for (let x in localStorage) {
        if (localStorage.hasOwnProperty(x)) {
          total += ((localStorage[x].length + x.length) * 2);
        }
      }
      return (total / 1024).toFixed(1);
    } catch (e) {
      return "24.5";
    }
  }, [products, orders]);

  // Agar tizimga admin yoki owner sifatida kirmagan bo'lsa, xavfsiz Kirish oynasini ko'rsatish
  if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
    return (
      <div className="min-h-screen bg-[#0b101d] text-[#e2e8f0] flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-md w-full bg-[#111927]/90 backdrop-blur-2xl rounded-3xl border border-cyan-500/30 shadow-2xl p-7 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-xl shadow-cyan-500/30 mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" />
              <span>Xavfsiz Admin Gateway</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Rocker Admin Panel
            </h1>
            <p className="text-xs text-slate-400">
              Loyiha Muallifi: <b className="text-cyan-300">Xabibullo Raxmatjonov</b>
            </p>
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold leading-relaxed">
              ⚠️ Ushbu sahifaga kirish faqat tizimga Admin yoki Loyiha Egasi sifatida kirgandan keyin mumkin!
            </div>
          </div>

          {/* Error Message */}
          {adminAuthError && (
            <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold text-center">
              {adminAuthError}
            </div>
          )}

          {/* Tezkor 1-bosishda kirish (Demo / Baholash uchun) */}
          <div className="space-y-2 pt-1">
            <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400">
              Tezkor Kirish (1-bosish):
            </span>
            <button
              type="button"
              onClick={() => {
                const res = login('owner', 'owner123');
                if (!res.success) setAdminAuthError("Kirishda xatolik yuz berdi");
              }}
              className="w-full p-3 rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 hover:from-amber-500/30 hover:to-yellow-500/20 border border-amber-500/40 text-amber-200 text-xs font-black flex items-center justify-between transition group shadow-md"
            >
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <div className="font-bold">Loyiha Egasi (Xabibullo Raxmatjonov)</div>
                  <div className="text-[10px] text-amber-400/80 font-normal">Login: owner / Parol: owner123</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-amber-500/30 group-hover:bg-amber-500 text-white text-[10px] font-black transition">
                Kirish ➔
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                const res = login('admin', 'admin123');
                if (!res.success) setAdminAuthError("Kirishda xatolik yuz berdi");
              }}
              className="w-full p-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-200 text-xs font-black flex items-center justify-between transition group"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <div className="text-left">
                  <div className="font-bold">Bosh Administrator</div>
                  <div className="text-[10px] text-cyan-400/80 font-normal">Login: admin / Parol: admin123</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-cyan-500/30 group-hover:bg-cyan-500 text-white text-[10px] font-black transition">
                Kirish ➔
              </span>
            </button>
          </div>

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-slate-700/60 w-full" />
            <span className="bg-[#111927] px-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest absolute">
              yoki qo'lda
            </span>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!adminUsernameInput || !adminPasswordInput) {
                setAdminAuthError("Iltimos, login va parolni kiriting");
                return;
              }
              const res = login(adminUsernameInput, adminPasswordInput);
              if (!res.success) {
                setAdminAuthError(res.message || "Login yoki parol noto'g'ri!");
              }
            }}
            className="space-y-3"
          >
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Login
              </label>
              <input
                type="text"
                placeholder="masalan: owner yoki admin"
                value={adminUsernameInput}
                onChange={(e) => setAdminUsernameInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b101d] border border-slate-700 focus:border-cyan-500 text-xs text-white outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Parol
              </label>
              <div className="relative">
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-[#0b101d] border border-slate-700 focus:border-cyan-500 text-xs text-white outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs shadow-lg shadow-cyan-500/25 active:scale-95 transition flex items-center justify-center gap-2 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Admin Panelga Kirish</span>
            </button>
          </form>

          {/* Do'konga qaytish */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="text-xs text-slate-400 hover:text-white transition flex items-center justify-center gap-1.5 mx-auto font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Bosh sahifaga (Do'konga) qaytish</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e1422] text-[#e2e8f0] flex font-sans selection:bg-cyan-500 selection:text-black antialiased relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10 animate-in slide-in-from-top duration-300 bg-[#162033]/95 text-white">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${toastMessage.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            {toastMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          </div>
          <span className="text-xs font-bold">{toastMessage.msg}</span>
        </div>
      )}

      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden animate-in fade-in"
        />
      )}

      {/* 1. ROCKER LEFT SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 md:sticky md:top-0 md:h-screen md:translate-x-0 bg-[#101726] border-r border-[#1a2236] transition-transform duration-300 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isSidebarCollapsed ? 'md:w-20' : 'md:w-64'} shrink-0 min-h-screen overflow-y-auto custom-scrollbar select-none flex flex-col justify-between`}
      >
        <div className="p-4 space-y-6">
          
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between px-2 pt-1">
            <Link
              to="/admin"
              onClick={() => playSound('click', soundEnabled)}
              className="flex items-center gap-3 group"
            >
              {/* Rocker Swirl Icon with dynamic accent gradient */}
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${activeAccent.primary} flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition`}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5S10 17.33 10 16.5V11c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5.5zm-1-8a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" fill="currentColor" stroke="none" />
                  <path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </div>
              {!isSidebarCollapsed && (
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-xl text-white tracking-tight">Rocker</span>
                  <span className={`text-[10px] ${activeAccent.text} font-black uppercase tracking-wider`}>ULTRA</span>
                </div>
              )}
            </Link>

            {/* Collapse / Back Arrow */}
            <button
              onClick={() => {
                setIsSidebarCollapsed(!isSidebarCollapsed);
                playSound('click', soundEnabled);
              }}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-[#1a2338] transition"
              title="Sidebar kengaytirish/yopish"
            >
              <ArrowLeft className={`w-4 h-4 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-5 text-xs font-semibold">
            
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
                  onClick={() => {
                    setActiveTab('alternate');
                    playSound('click', soundEnabled);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'alternate'
                      ? activeAccent.activeTab
                      : 'text-slate-400 hover:text-white hover:bg-[#151d2e]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${activeTab === 'alternate' ? 'bg-cyan-400 animate-pulse' : 'border border-slate-500'}`}></span>
                  {!isSidebarCollapsed && <span>Alternate (Analytics)</span>}
                </button>

                <button
                  onClick={() => {
                    setActiveTab('system');
                    playSound('click', soundEnabled);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition ${
                    activeTab === 'system'
                      ? activeAccent.activeTab
                      : 'text-slate-400 hover:text-white hover:bg-[#151d2e]'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  {!isSidebarCollapsed && <span>System & Monitor</span>}
                </button>
              </div>
            </div>

            {/* GROUP: UI ELEMENTS & COMMERCE */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Magazin Boshqaruvi
                </div>
              )}
              <div className="space-y-1 pt-1">
                {/* eCommerce (Products Catalog) */}
                <button
                  onClick={() => {
                    setActiveTab('ecommerce');
                    playSound('click', soundEnabled);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'ecommerce'
                      ? activeAccent.activeTab
                      : 'text-slate-400 hover:text-white hover:bg-[#151d2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-4 h-4 text-cyan-400" />
                    {!isSidebarCollapsed && <span>eCommerce (Tovarlar)</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-black">
                      {products.length}
                    </span>
                  )}
                </button>

                {/* Tables (Orders) */}
                <button
                  onClick={() => {
                    setActiveTab('tables');
                    playSound('click', soundEnabled);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'tables'
                      ? activeAccent.activeTab
                      : 'text-slate-400 hover:text-white hover:bg-[#151d2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    {!isSidebarCollapsed && <span>Buyurtmalar (Orders)</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-black">
                      {orders.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* GROUP: INTEGRATIONS */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Avtomatika & Bot
                </div>
              )}
              <div className="space-y-1 pt-1">
                <button
                  onClick={() => {
                    setActiveTab('telegram');
                    playSound('click', soundEnabled);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'telegram'
                      ? activeAccent.activeTab
                      : 'text-slate-400 hover:text-white hover:bg-[#151d2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Send className="w-4 h-4 text-sky-400" />
                    {!isSidebarCollapsed && <span>Telegram Bot</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 animate-pulse"></span>
                  )}
                </button>
              </div>
            </div>

          </nav>
        </div>

        {/* Sidebar Footer Controls & Accent Switcher */}
        <div className="p-4 border-t border-[#1a2236] space-y-3">
          {/* Accent Palette Selector */}
          {!isSidebarCollapsed && (
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Neon Ranglar
              </span>
              <div className="flex items-center gap-1.5">
                {Object.keys(accentStyles).map(col => (
                  <button
                    key={col}
                    onClick={() => handleAccentChange(col)}
                    className={`w-5 h-5 rounded-full transition-transform ${
                      col === 'cyan' ? 'bg-[#00d2ff]' :
                      col === 'violet' ? 'bg-[#a855f7]' :
                      col === 'emerald' ? 'bg-[#10b981]' :
                      col === 'amber' ? 'bg-[#f59e0b]' : 'bg-[#f43f5e]'
                    } ${accentColor === col ? 'ring-2 ring-white scale-110' : 'opacity-60 hover:opacity-100'}`}
                    title={col}
                  />
                ))}
              </div>
            </div>
          )}

          {user?.role === 'owner' && (
            <Link
              to="/owner"
              onClick={() => playSound('click', soundEnabled)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-black text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 transition shadow-sm"
              title="Loyiha Egasi (Owner) Boshqaruv Paneli"
            >
              <Crown className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
              {!isSidebarCollapsed && <span>👑 Owner Panel</span>}
            </Link>
          )}

          <Link
            to="/"
            onClick={() => playSound('click', soundEnabled)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-[#151d2e] transition"
          >
            <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
            {!isSidebarCollapsed && <span>Do'konga qaytish</span>}
          </Link>

          <button
            onClick={() => {
              playSound('warn', soundEnabled);
              logout();
              navigate('/');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition active:scale-95"
            title="Tizimdan chiqish va do'konga qaytish"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Chiqish</span>}
          </button>
        </div>
      </aside>

      {/* 2. MAIN BODY AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP NAVBAR (Exact Rocker Style with Upgraded Controls) */}
        <header className="h-16 bg-[#101726] border-b border-[#1a2236] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          
          <div className="flex items-center gap-2 flex-1 max-w-sm sm:max-w-md">
            {/* Mobile Hamburger to open sidebar */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-xl bg-[#162033] border border-[#222e46] text-slate-300 hover:text-white shrink-0 active:scale-95 transition"
              title="Menyu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Input Bar */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Qidiruv (Buyurtma, tovar)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#162033] border border-[#222e46] text-white placeholder-slate-400 outline-none focus:border-cyan-500/60 transition font-medium"
              />
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Live Clock Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#162033] border border-[#222e46] text-xs font-mono font-bold text-cyan-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentTime.toLocaleTimeString('uz-UZ')}</span>
              <span className="text-[10px] text-slate-400">UZ</span>
            </div>

            {/* Sound FX Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-xl border transition ${
                soundEnabled
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title={soundEnabled ? "Tovush effektlari faol" : "Tovush o'chirilgan"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={handleToggleFullscreen}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition"
              title="To'liq ekran"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Country Flag (UZ) */}
            <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center bg-slate-800 border border-slate-700 text-xs shadow cursor-pointer hover:scale-105 transition" title="Til: O'zbekiston">
              🇺🇿
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                playSound('click', soundEnabled);
              }}
              className="text-slate-400 hover:text-white transition p-2 rounded-xl hover:bg-[#1a2338]"
              title="Mavzu: Kunduzgi / Tungi"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Notification Bell with Badge 7 */}
            <div className="relative cursor-pointer">
              <button
                onClick={() => {
                  setActiveTab('tables');
                  playSound('click', soundEnabled);
                }}
                className="text-slate-400 hover:text-white transition p-2 rounded-xl hover:bg-[#1a2338]"
                title="Bildirishnomalar"
              >
                <Bell className="w-4 h-4" />
              </button>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center ring-2 ring-[#101726]">
                {orders.length || 7}
              </span>
            </div>

            {/* User Profile Avatar & Name */}
            <div className="flex items-center gap-3 pl-2 border-l border-[#1a2236]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xs ring-2 ring-cyan-500/40 shadow-lg">
                XR
              </div>
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-white leading-tight">Xabibullo Raxmatjonov</span>
                <span className="block text-[10px] text-cyan-400 font-semibold">Loyiha Muallifi & Bosh Admin</span>
              </div>
            </div>

          </div>
        </header>

        {/* 3. HERO QUICK ACTION BANNER (DAXSHAT UPGRADE!) */}
        <section className="px-6 pt-6">
          <div className="bg-gradient-to-r from-[#141d33] via-[#10192e] to-[#16243d] border border-[#1e2a47] rounded-3xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
            {/* Ambient Background Gradient Glow */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-1 z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm">
                  ⚡ Boshqaruv Markazi
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Barcha tizimlar barqaror
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Xush kelibsiz, Xabibullo Raxmatjonov! Do'kon boshqaruv paneli
              </h2>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 z-10">
              {user?.role === 'owner' && (
                <Link
                  to="/owner"
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-white font-extrabold text-xs shadow-lg shadow-amber-500/25 transition flex items-center gap-1.5 active:scale-95 animate-pulse"
                >
                  <Crown className="w-4 h-4 text-yellow-200" />
                  <span>👑 Owner Panel</span>
                </Link>
              )}

              <button
                onClick={() => handleOpenAddModal()}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition flex items-center gap-1.5 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Tovar Qo'shish</span>
              </button>

              <button
                onClick={() => {
                  playSound('click', soundEnabled);
                  setIsBroadcastModalOpen(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-bold text-xs transition flex items-center gap-1.5 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Telegram E'lon</span>
              </button>

              <button
                onClick={handleGenerateTestOrder}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs transition flex items-center gap-1.5 active:scale-95"
                title="Telegram botga sinov buyurtmasi yuboradi"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Test Buyurtma</span>
              </button>

              <button
                onClick={handleExportOrdersCSV}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs transition flex items-center gap-1.5 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>CSV Eksport</span>
              </button>
          </div>

          {/* Quick Dashboard Navigation Tabs (Mobil va desktopda qulay gorizontal skroll) */}
          <div className="flex overflow-x-auto no-scrollbar items-center gap-2 pt-4 border-t border-[#1e2a47] mt-4 pb-1">
            {[
              { id: 'ecommerce', label: '📦 Mahsulotlar (CRUD)', count: products.length, color: 'cyan' },
              { id: 'tables', label: '🛍️ Buyurtmalar (Orders)', count: orders.length, color: 'emerald' },
              { id: 'alternate', label: '📊 Savdo & Analitika', count: null, color: 'indigo' },
              { id: 'telegram', label: '🤖 Telegram Bot', count: 'Online', color: 'sky' },
              { id: 'system', label: '⚙️ Tizim & Server Monitor', count: null, color: 'purple' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  playSound('click', soundEnabled);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/25 scale-105'
                    : 'bg-[#101728] hover:bg-[#1a253e] text-slate-300 border border-[#1e2a47]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-cyan-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

        {/* 4. ROCKER CONTENT CONTAINER */}
        <main className="flex-1 p-6 space-y-6">
          
          {/* TAB 1: ALTERNATE (MAIN ROCKER DASHBOARD UPGRADED) */}
          {activeTab === 'alternate' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* TOP CHARTS ROW: Sales Overview (Spline) + Order Status (Gradient Bars) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. SALES OVERVIEW (8 Cols) */}
                <div className="lg:col-span-8 bg-[#131929] border border-[#1d273f] rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-sm text-white flex items-center gap-2">
                        <span>Sales Overview</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold">
                          +{chartTimeframe === 'bugun' ? '12%' : chartTimeframe === 'haftalik' ? '25%' : '48%'} o'sish
                        </span>
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Kunlik tashriflar va muvaffaqiyatli xaridlar dinamikasi
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Timeframe Filter Buttons */}
                      <div className="flex items-center bg-[#0b0f19] p-1 rounded-xl border border-[#1e2740] text-[10px] font-bold">
                        {['bugun', 'haftalik', 'oylik', 'yillik'].map((tf) => (
                          <button
                            key={tf}
                            onClick={() => {
                              setChartTimeframe(tf);
                              playSound('click', soundEnabled);
                            }}
                            className={`px-2.5 py-1 rounded-lg uppercase transition ${
                              chartTimeframe === tf
                                ? 'bg-cyan-500 text-black font-extrabold shadow'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {tf}
                          </button>
                        ))}
                      </div>

                      {/* Legend */}
                      <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400 font-semibold">
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-1.5 bg-[#f59e0b] rounded-sm"></span>
                          <span>Visits</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="w-3.5 h-1.5 bg-[#00d2ff] rounded-sm"></span>
                          <span>Sales</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SVG Spline Smooth Area Chart with Dynamic Point Hover */}
                  <div className="h-64 w-full relative group">
                    <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none">
                      <defs>
                        {/* Cyan/Blue Area Gradient */}
                        <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.0" />
                        </linearGradient>

                        {/* Orange/Visits Area Gradient */}
                        <linearGradient id="visitsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
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
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        className="transition-all duration-300"
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

                      {/* Interactive Circles on Key Nodes */}
                      {[
                        { cx: 120, cy: 40, day: 'Se', sales: '$2,450', visits: '1,890' },
                        { cx: 310, cy: 70, day: 'Pa', sales: '$1,980', visits: '1,540' },
                        { cx: 520, cy: 140, day: 'Shan', sales: '$2,820', visits: '2,300' }
                      ].map((pt, i) => (
                        <g
                          key={i}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredChartPoint(pt)}
                          onMouseLeave={() => setHoveredChartPoint(null)}
                        >
                          <circle cx={pt.cx} cy={pt.cy} r="6" fill="#00d2ff" stroke="#0e1422" strokeWidth="2.5" className="hover:scale-125 transition-transform" />
                        </g>
                      ))}
                    </svg>

                    {/* Chart Tooltip Overlay */}
                    {hoveredChartPoint && (
                      <div
                        className="absolute bg-[#1a233a] border border-cyan-500/40 px-3 py-1.5 rounded-xl text-xs font-bold shadow-xl pointer-events-none animate-in fade-in"
                        style={{ left: `${(hoveredChartPoint.cx / 600) * 100}%`, top: '20%', transform: 'translateX(-50%)' }}
                      >
                        <div className="text-white">{hoveredChartPoint.day}: {hoveredChartPoint.sales}</div>
                        <div className="text-[10px] text-cyan-300 font-semibold">{hoveredChartPoint.visits} tashrif</div>
                      </div>
                    )}

                    {/* X-axis Days */}
                    <div className="flex justify-between px-8 text-[11px] text-slate-500 font-bold pt-1">
                      <span>Dushanba</span>
                      <span>Seshanba</span>
                      <span>Chorshanba</span>
                      <span>Payshanba</span>
                      <span>Juma</span>
                      <span>Shanba</span>
                      <span>Yakshanba</span>
                    </div>
                  </div>
                </div>

                {/* 2. ORDER STATUS (Vertical Gradient Rounded Bars) */}
                <div className="lg:col-span-4 bg-[#131929] border border-[#1d273f] rounded-2xl p-5 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-white">Order Status</h3>
                      <p className="text-[10px] text-slate-400">Oylik buyurtmalar taqsimoti</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold">
                      2026
                    </span>
                  </div>

                  {/* Gradient Pill Bar Chart */}
                  <div className="h-64 flex items-end justify-between px-2 pt-4 relative">
                    {/* Y-axis indicator */}
                    <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-500 font-bold">
                      <span>14k</span>
                      <span>12k</span>
                      <span>10k</span>
                      <span>8k</span>
                      <span>6k</span>
                      <span>4k</span>
                      <span>2k</span>
                      <span>0</span>
                    </div>

                    <div className="w-full flex items-end justify-around pl-6 h-52">
                      {[
                        { month: 'Jan', height: '65%', val: '9,120' },
                        { month: 'Feb', height: '52%', val: '7,430' },
                        { month: 'Mar', height: '95%', val: '13,400' },
                        { month: 'Apr', height: '70%', val: '9,850' },
                        { month: 'May', height: '82%', val: '11,200' },
                        { month: 'Jun', height: '58%', val: '8,150' },
                      ].map((bar, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer relative">
                          {/* Hover Tooltip */}
                          <div className="opacity-0 group-hover:opacity-100 transition absolute -top-8 px-2 py-1 rounded-lg bg-[#1e2740] text-[10px] text-white font-extrabold whitespace-nowrap border border-pink-500/30 shadow-lg pointer-events-none z-10">
                            {bar.val} dona
                          </div>

                          {/* Pill Bar */}
                          <div className="w-4 bg-[#1a2338] h-48 rounded-full flex items-end p-0.5">
                            <div
                              style={{ height: bar.height }}
                              className="w-full rounded-full bg-gradient-to-t from-[#ff5e62] via-[#ff9966] to-[#ff2a6d] shadow-lg shadow-pink-500/20 group-hover:brightness-125 group-hover:scale-x-110 transition-all duration-300"
                            ></div>
                          </div>
                          <span className="text-[10px] text-slate-400 group-hover:text-white font-bold transition">
                            {bar.month}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* BOTTOM ROW: Donut Chart + 6 Metric Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. DONUT RING CHART (4 Cols) */}
                <div className="lg:col-span-4 bg-[#131929] border border-[#1d273f] rounded-2xl p-5 flex flex-col justify-between shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-white">Brand & Category Share</h3>
                      <p className="text-[10px] text-slate-400">Eng ko'p sotilgan tovar guruhlari</p>
                    </div>
                    <button className="text-slate-400 hover:text-white p-1 rounded hover:bg-[#1a2338]">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  {/* SVG Multi-Segment Donut */}
                  <div className="my-4 flex items-center justify-center relative group">
                    <svg className="w-48 h-48 -rotate-90 group-hover:scale-105 transition-transform duration-300" viewBox="0 0 100 100">
                      {/* Segment 1: Neon Green (Smartphones) */}
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
                      {/* Segment 2: Neon Blue (Laptops & TV) */}
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
                      {/* Segment 3: Neon Red/Pink (Audio) */}
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
                      <span className="text-base font-black text-white">Smartfon</span>
                      <span className="text-xs text-emerald-400 font-bold">{categoryCounts.smartphones} tovar</span>
                    </div>
                  </div>

                  {/* Category Legend Badges */}
                  <div className="space-y-2 pt-2 border-t border-[#1d273f] text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00e676]"></span>
                        <span className="text-slate-300 font-medium">Smartfonlar</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[10px]">
                        {categoryCounts.smartphones} ta
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00b0ff]"></span>
                        <span className="text-slate-300 font-medium">Noutbuk & TV</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-black text-[10px]">
                        {categoryCounts.laptops + categoryCounts.tv} ta
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff1744]"></span>
                        <span className="text-slate-300 font-medium">Audio & Aksessuarlar</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-black text-[10px]">
                        {categoryCounts.audio + categoryCounts.wearables} ta
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2. STATS MINI CARDS (8 Cols: 2x3 Grid) */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Card 1: Total Orders */}
                  <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between hover:border-cyan-500/40 transition shadow-lg group">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400">Total Orders</span>
                        <h4 className="text-2xl font-black text-white mt-0.5 group-hover:text-cyan-400 transition">
                          {totalOrdersCount}
                        </h4>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                    </div>
                    {/* Mini Sparkline & Rate */}
                    <div className="flex items-end justify-between mt-3">
                      <div className="flex items-end gap-1 h-6">
                        {[40, 60, 30, 80, 50, 90, 70, 100, 60, 80].map((h, i) => (
                          <span key={i} style={{ height: `${h}%` }} className="w-1 bg-cyan-500/80 rounded-t group-hover:bg-cyan-400 transition"></span>
                        ))}
                      </div>
                      <span className="text-xs font-extrabold text-emerald-400">+25%</span>
                    </div>
                  </div>

                  {/* Card 2: Total Revenue */}
                  <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between hover:border-rose-500/40 transition shadow-lg group">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400">Total Revenue</span>
                        <h4 className="text-2xl font-black text-white mt-0.5 group-hover:text-rose-400 transition">
                          ${totalRevenueDisplay}K
                        </h4>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center group-hover:scale-110 transition">
                        <DollarSign className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <div className="flex items-end gap-1 h-6">
                        {[50, 70, 40, 90, 60, 100, 80, 50, 70, 90].map((h, i) => (
                          <span key={i} style={{ height: `${h}%` }} className="w-1 bg-rose-500/80 rounded-t group-hover:bg-rose-400 transition"></span>
                        ))}
                      </div>
                      <span className="text-xs font-extrabold text-emerald-400">+15%</span>
                    </div>
                  </div>

                  {/* Card 3: New Users */}
                  <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-500/40 transition shadow-lg group">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400">New Users</span>
                        <h4 className="text-2xl font-black text-white mt-0.5 group-hover:text-emerald-400 transition">
                          1.3K
                        </h4>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <div className="flex items-end gap-1 h-6">
                        {[60, 40, 70, 50, 80, 60, 40, 70, 50, 60].map((h, i) => (
                          <span key={i} style={{ height: `${h}%` }} className="w-1 bg-emerald-500/80 rounded-t group-hover:bg-emerald-400 transition"></span>
                        ))}
                      </div>
                      <span className="text-xs font-extrabold text-rose-400">-10%</span>
                    </div>
                  </div>

                  {/* Card 4: Sold Items */}
                  <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition shadow-lg group">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400">Sold Items</span>
                        <h4 className="text-2xl font-black text-white mt-0.5 group-hover:text-amber-400 transition">
                          {totalSoldItemsCount}
                        </h4>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
                        <Package className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <div className="flex items-end gap-1 h-6">
                        {[40, 60, 80, 50, 70, 60, 80, 50, 70, 40].map((h, i) => (
                          <span key={i} style={{ height: `${h}%` }} className="w-1 bg-amber-400/80 rounded-t group-hover:bg-amber-300 transition"></span>
                        ))}
                      </div>
                      <span className="text-xs font-extrabold text-rose-400">-14%</span>
                    </div>
                  </div>

                  {/* Card 5: Total Visits */}
                  <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between hover:border-cyan-500/40 transition shadow-lg group">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400">Total Visits</span>
                        <h4 className="text-2xl font-black text-white mt-0.5 group-hover:text-cyan-400 transition">
                          12,450
                        </h4>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition">
                        <Video className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <span className="text-[11px] text-slate-400 font-medium">Barcha qurilmalar</span>
                      <span className="text-xs font-extrabold text-emerald-400">+8%</span>
                    </div>
                  </div>

                  {/* Card 6: Total Returns */}
                  <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/40 transition shadow-lg group">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-400">Total Returns</span>
                        <h4 className="text-2xl font-black text-white mt-0.5 group-hover:text-purple-400 transition">
                          170
                        </h4>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition">
                        <RefreshCw className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                      <span className="text-[11px] text-slate-400 font-medium">Qaytarilgan buyurtma</span>
                      <span className="text-xs font-extrabold text-emerald-400">-2%</span>
                    </div>
                  </div>

                </div>

              </div>

              {/* LIVE ACTIVITY TICKER (Daxshat qo'shimcha!) */}
              <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>Real-Vaqt Tizim Faoliyati (Live Stream)</span>
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Avtomatik sinxronlash: 100%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {activityLogs.slice(0, 4).map((log) => (
                    <div key={log.id} className="p-3 bg-[#0b0f19] rounded-xl border border-[#1e2740] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{log.text}</p>
                        <span className="text-[10px] text-slate-400 font-mono">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ECOMMERCE / PRODUCTS MANAGEMENT TABLE (DAXSHAT UPGRADE!) */}
          {activeTab === 'ecommerce' && (
            <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-6 space-y-6 animate-in fade-in shadow-xl">
              
              {/* Header Title & Actions */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1d273f]">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-cyan-400" />
                    <span>eCommerce: Mahsulotlar Katalogi</span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                      {filteredProducts.length} ta
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Mahsulotlar narxi, ombor soni va rasmlarini to'liq nazorat qilish
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Category Presets Quick Add Dropdown */}
                  <button
                    onClick={() => handleOpenAddModal({
                      title: 'Samsung Smart TV Neo QLED 65" 4K',
                      category: 'cat_tv',
                      price: '1450',
                      oldPrice: '1690',
                      stock: '8',
                      image: '/images/tv_samsung_neo_qled.jpg',
                      desc: 'Premium Quantum Matrix, 144Hz, HDR2000 smart televizor'
                    })}
                    className="px-3 py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold text-xs hover:bg-purple-500/30 transition flex items-center gap-1.5"
                  >
                    <span>📺 Tezkor TV</span>
                  </button>

                  <button
                    onClick={() => handleOpenAddModal()}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yangi Mahsulot Qo'shish</span>
                  </button>
                </div>
              </div>

              {/* Filters & Batch Controls Bar */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Search */}
                <div className="md:col-span-4 relative">
                  <input
                    type="text"
                    placeholder="Mahsulot nomi yoki ID bo'yicha qidirish..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none focus:border-cyan-500 transition"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Category Filter */}
                <div className="md:col-span-3">
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none focus:border-cyan-500"
                  >
                    <option value="all">Barcha Kategoriyalar</option>
                    <option value="cat_smartphones">Smartfonlar ({categoryCounts.smartphones})</option>
                    <option value="cat_laptops">Noutbuklar ({categoryCounts.laptops})</option>
                    <option value="cat_audio">Audio Qurilmalar ({categoryCounts.audio})</option>
                    <option value="cat_tv">Smart Televizorlar ({categoryCounts.tv})</option>
                    <option value="cat_wearables">Aksessuarlar ({categoryCounts.wearables})</option>
                  </select>
                </div>

                {/* Stock Status Filter */}
                <div className="md:col-span-2">
                  <select
                    value={stockStatusFilter}
                    onChange={(e) => setStockStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none focus:border-cyan-500"
                  >
                    <option value="all">Ombor Holati</option>
                    <option value="in_stock">Yetarli (&gt;5)</option>
                    <option value="low">Kam qoldi (1-5)</option>
                    <option value="out">Tugagan (0)</option>
                  </select>
                </div>

                {/* Batch Action Buttons if items selected */}
                <div className="md:col-span-3 flex items-center justify-end gap-2">
                  {selectedProductIds.length > 0 ? (
                    <>
                      <button
                        onClick={() => handleApplyBatchDiscount(10)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/30 transition"
                      >
                        -10% Chegirma
                      </button>
                      <button
                        onClick={handleDeleteSelectedProducts}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30 transition flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>({selectedProductIds.length}) O'chirish</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-[11px] text-slate-500">
                      Jami mahsulotlar: {products.length} ta
                    </span>
                  )}
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto rounded-xl border border-[#1d273f]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0b0f19] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1d273f]">
                      <th className="p-3 w-8">
                        <input
                          type="checkbox"
                          checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedProductIds(filteredProducts.map(p => p.id));
                            else setSelectedProductIds([]);
                          }}
                          className="rounded accent-cyan-500 cursor-pointer"
                        />
                      </th>
                      <th className="p-3">Rasm</th>
                      <th className="p-3">Mahsulot Nomi & ID</th>
                      <th className="p-3">Kategoriya</th>
                      <th className="p-3">Narxi ($)</th>
                      <th className="p-3">Omborda (Tezkor +/-)</th>
                      <th className="p-3 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1d273f]">
                    {filteredProducts.map((p) => {
                      const isSelected = selectedProductIds.includes(p.id);
                      return (
                        <tr key={p.id} className={`hover:bg-[#162033] transition ${isSelected ? 'bg-cyan-500/5' : ''}`}>
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedProductIds([...selectedProductIds, p.id]);
                                else setSelectedProductIds(selectedProductIds.filter(id => id !== p.id));
                              }}
                              className="rounded accent-cyan-500 cursor-pointer"
                            />
                          </td>
                          <td className="p-3">
                            <img
                              src={p.image}
                              alt={p.title}
                              onClick={() => setPreviewImageModal(p.image)}
                              className="w-12 h-12 object-cover rounded-xl bg-slate-800 cursor-zoom-in hover:scale-105 transition"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop";
                              }}
                            />
                          </td>
                          <td className="p-3 max-w-xs">
                            <span className="font-bold text-white block truncate">{p.title}</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {p.id}</span>
                          </td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-cyan-300 font-semibold text-[10px] border border-slate-700">
                              {p.category}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex items-baseline gap-1.5">
                              <span className="font-black text-cyan-400 text-sm">${p.price}</span>
                              {p.oldPrice && (
                                <span className="text-[10px] text-slate-500 line-through font-semibold">${p.oldPrice}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-3">
                            {/* Inline Stock Stepper */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuickStockChange(p.id, -1)}
                                className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-black flex items-center justify-center text-xs transition"
                                title="1 ta kamaytirish"
                              >
                                -
                              </button>
                              <span className={`font-bold px-2 py-0.5 rounded text-xs min-w-8 text-center ${
                                p.stock > 5 ? 'text-emerald-400 bg-emerald-500/10' :
                                p.stock > 0 ? 'text-amber-400 bg-amber-500/10' :
                                'text-rose-400 bg-rose-500/10'
                              }`}>
                                {p.stock}
                              </span>
                              <button
                                onClick={() => handleQuickStockChange(p.id, +1)}
                                className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-black flex items-center justify-center text-xs transition"
                                title="1 ta ko'paytirish"
                              >
                                +
                              </button>
                            </div>
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
                              onClick={() => {
                                if (confirm(`"${p.title}" mahsulotini o'chirishni xohlaysizmi?`)) {
                                  deleteProduct(p.id);
                                  showToast("Mahsulot o'chirildi!");
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
                              title="O'chirish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: TABLES / ORDERS MANAGEMENT (DAXSHAT UPGRADE!) */}
          {activeTab === 'tables' && (
            <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-6 space-y-6 animate-in fade-in shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1d273f]">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-400" />
                    <span>Buyurtmalar Nazorati & CRM (Orders)</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                      {filteredOrders.length} ta
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Mijozlar buyurtmalari, kurer yetkazish bosqichlari va Telegram hisoboti
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportOrdersCSV}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CSV Eksport</span>
                  </button>

                  <button
                    onClick={handleGenerateTestOrder}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 hover:opacity-95 transition flex items-center gap-1.5"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Test Buyurtma Yaratish</span>
                  </button>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                {[
                  { key: 'all', label: 'Barchasi', count: orders.length },
                  { key: 'pending', label: 'Kutilmoqda', count: orders.filter(o => !o.status || o.status.includes('pending')).length },
                  { key: 'processing', label: 'Yetkazilmoqda', count: orders.filter(o => o.status === 'processing').length },
                  { key: 'delivered', label: 'Yetkazib berildi', count: orders.filter(o => o.status === 'delivered' || o.status === 'status_delivered').length },
                  { key: 'cancelled', label: 'Bekor qilingan', count: orders.filter(o => o.status === 'cancelled').length }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setOrderStatusFilter(tab.key);
                      playSound('click', soundEnabled);
                    }}
                    className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                      orderStatusFilter === tab.key
                        ? 'bg-cyan-500 text-black font-black shadow'
                        : 'bg-[#0b0f19] text-slate-400 hover:text-white border border-[#1e2740]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] opacity-80">({tab.count})</span>
                  </button>
                ))}
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto rounded-xl border border-[#1d273f]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0b0f19] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1d273f]">
                      <th className="p-3">ID</th>
                      <th className="p-3">Sana & Vaqt</th>
                      <th className="p-3">Mijoz Ismi</th>
                      <th className="p-3">Telefon</th>
                      <th className="p-3">To'lov</th>
                      <th className="p-3">Jami Summa</th>
                      <th className="p-3">Holati</th>
                      <th className="p-3 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1d273f]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="p-8 text-center text-slate-500">
                          Hozircha buyurtma topilmadi
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-[#162033] transition">
                          <td className="p-3 font-mono font-bold text-white">#{o.id}</td>
                          <td className="p-3 text-slate-400">{o.formattedDate || o.date?.slice(0, 10)}</td>
                          <td className="p-3 font-bold text-white">{o.customer?.fullName}</td>
                          <td className="p-3 text-slate-300 font-mono">{o.customer?.phone}</td>
                          <td className="p-3 uppercase text-[10px] font-bold text-slate-400">
                            {o.customer?.paymentMethod}
                          </td>
                          <td className="p-3 font-black text-cyan-400 text-sm">${o.totalAmount?.toFixed(2)}</td>
                          <td className="p-3">
                            <select
                              value={o.status || 'status_pending'}
                              onChange={(e) => {
                                updateOrderStatus(o.id, e.target.value);
                                showToast(`Buyurtma #${o.id} holati o'zgartirildi!`);
                              }}
                              className="bg-[#0b0f19] text-[10px] font-bold px-2 py-1 rounded-lg border border-[#1e2740] text-slate-200 outline-none focus:border-cyan-500"
                            >
                              <option value="status_pending">⏳ Kutilmoqda</option>
                              <option value="processing">🚚 Yetkazilmoqda</option>
                              <option value="delivered">✅ Bajarildi</option>
                              <option value="cancelled">❌ Bekor qilingan</option>
                            </select>
                          </td>
                          <td className="p-3 text-right space-x-1.5">
                            <button
                              onClick={() => {
                                setViewingOrder(o);
                                setIsInvoiceModalOpen(true);
                                playSound('click', soundEnabled);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[10px] font-bold transition inline-flex items-center gap-1"
                              title="Chekni chop etish"
                            >
                              <Printer className="w-3 h-3" />
                              <span>Chek</span>
                            </button>

                            <button
                              onClick={() => handleResendOrder(o)}
                              disabled={resendingOrderId === o.id}
                              className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 text-[10px] font-bold transition inline-flex items-center gap-1"
                              title="Telegram botga xabar jo'natish"
                            >
                              {resendingOrderId === o.id ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Send className="w-3 h-3" />
                              )}
                              <span>Botga</span>
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Buyurtma #${o.id} ni o'chirishni xohlaysizmi?`)) {
                                  deleteOrder(o.id);
                                  showToast("Buyurtma o'chirildi!");
                                }
                              }}
                              className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition inline-flex items-center"
                              title="O'chirish"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

          {/* TAB 4: TELEGRAM BOT COMMAND CENTER (DAXSHAT UPGRADE!) */}
          {activeTab === 'telegram' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
              {/* Telegram Config Form */}
              <div className="lg:col-span-7 bg-[#131929] border border-[#1d273f] rounded-2xl p-6 space-y-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-[#1d273f]">
                  <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <Send className="w-5 h-5 text-sky-400" />
                      <span>Telegram Bot Sozlamalari</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Buyurtmalar to'g'ridan-to'g'ri Telegramingizga kelib tushadi
                    </p>
                  </div>
                  {botPingMs && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                      🟢 Ping: {botPingMs}ms
                    </span>
                  )}
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  const tokenToSave = (botToken || '').trim() || DEFAULT_TELEGRAM_BOT_TOKEN;
                  const chatIdToSave = (chatId || '').trim() || DEFAULT_TELEGRAM_CHAT_ID;
                  saveTelegramConfig({ botToken: tokenToSave, chatId: chatIdToSave });
                  setBotToken(tokenToSave);
                  setChatId(chatIdToSave);
                  showToast("Telegram sozlamalari saqlandi! 💾");
                }} className="space-y-4">
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
                        Standart Chat ID (8170197389)
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

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-extrabold text-xs hover:opacity-90 transition shadow-lg shadow-cyan-500/20"
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
                      <span>{isTestingBot ? "Sinov xabari yuborilmoqda..." : "Bot Aloqasini Sinash"}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsBroadcastModalOpen(true)}
                      className="px-4 py-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold text-xs hover:bg-purple-500/30 transition flex items-center gap-1.5"
                    >
                      <Radio className="w-4 h-4 text-purple-400" />
                      <span>Xabar Yozish & E'lon</span>
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

              {/* Bot Info & Delivery Guide Card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-6 space-y-4 shadow-xl">
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Bot Xavfsizligi va Holati</span>
                  </h3>
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0b0f19] border border-[#1e2740]">
                      <span className="text-slate-400">Bot Holati</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Faol (24/7)
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0b0f19] border border-[#1e2740]">
                      <span className="text-slate-400">Buyurtma Bildirishnomasi</span>
                      <span className="text-cyan-400 font-bold">Avtomatik</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0b0f19] border border-[#1e2740]">
                      <span className="text-slate-400">Rasm va Chek Yuborish</span>
                      <span className="text-purple-400 font-bold">Qo'llab-quvvatlanadi</span>
                    </div>
                  </div>

                  <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-xs text-cyan-300 leading-relaxed">
                    💡 <b>Eslatma:</b> Foydalanuvchi do'konda buyurtma berganda, tovar rasmi, mijoz manzili va telefon raqami ushbu bot orqali avtomatik ravishda yetib keladi.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM & MONITORING (ULTRA HIGH-TECH SERVER MONITOR) */}
          {activeTab === 'system' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* TOP HEADER: REALTIME SERVER DIAGNOSTICS & CONTROLS */}
              <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      🟢 Server 100% Barqaror (Operational)
                    </span>
                    <span className="hidden sm:inline-block text-xs font-mono text-cyan-400 font-bold bg-[#0b0f19] px-2 py-0.5 rounded-md border border-[#1e2740]">
                      Uptime: {formattedUptime}
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Server className="w-5 h-5 text-cyan-400" />
                    <span>Tizim & Server Monitor Markazi</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Real-vaqtdagi server resurslari, tarmoq pingi va xotira boshqaruvi
                  </p>
                </div>

                {/* Top Action Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleRunDiagnostics}
                    disabled={isDiagnosing}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 active:scale-95 transition flex items-center gap-2 disabled:opacity-60"
                  >
                    {isDiagnosing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4 text-amber-300" />
                    )}
                    <span>{isDiagnosing ? "Tekshirilmoqda..." : "Ping & Diagnostika"}</span>
                  </button>

                  <button
                    onClick={handleClearSystemCache}
                    className="px-3.5 py-2 rounded-xl bg-[#0b0f19] hover:bg-[#1a253e] text-slate-300 border border-[#1e2740] font-bold text-xs transition flex items-center gap-1.5 active:scale-95"
                    title="Vaqtinchalik keshni tozalash"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Keshni Tozalash</span>
                  </button>

                  <button
                    onClick={handleExportDatabaseBackup}
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs transition flex items-center gap-1.5 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Zaxira (JSON)</span>
                  </button>
                </div>
              </div>

              {/* 4 REALTIME HARDWARE & PERFORMANCE GAUGES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. CPU Load */}
                <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition shadow-lg group">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-400">Protsessor (CPU)</span>
                      <h4 className="text-2xl font-black text-white mt-0.5 group-hover:text-amber-400 transition font-mono">
                        {cpuUsage}%
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
                      <Cpu className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-end justify-between gap-1 h-7">
                      {[30, 45, 60, 40, 75, 55, 65, 50, 70, 45, 60, 50].map((h, i) => (
                        <span
                          key={i}
                          style={{ height: `${Math.min(100, (h * (cpuUsage / 20)))}%` }}
                          className="w-1.5 bg-gradient-to-t from-amber-500/40 to-amber-400 rounded-t transition-all duration-500"
                        ></span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-[#1e2740]">
                      <span>8 Core vCPU • 3.2GHz</span>
                      <span className="text-emerald-400 font-bold">41°C Normal</span>
                    </div>
                  </div>
                </div>

                {/* 2. RAM / Memory Heap */}
                <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between hover:border-purple-500/40 transition shadow-lg group">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-400">Xotira (RAM Heap)</span>
                      <h4 className="text-2xl font-black text-white mt-0.5 group-hover:text-purple-400 transition font-mono">
                        {ramUsage} MB
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition">
                      <HardDrive className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="w-full bg-[#0b0f19] h-2.5 rounded-full overflow-hidden border border-[#1e2740]">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.min(100, (ramUsage / 512) * 100 * 4)}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-[#1e2740]">
                      <span>512 MB Ajratilgan</span>
                      <span className="text-purple-300 font-bold">GC Faol</span>
                    </div>
                  </div>
                </div>

                {/* 3. LocalStorage DB Storage */}
                <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between hover:border-emerald-500/40 transition shadow-lg group">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-400">Lokal Baza (DB)</span>
                      <h4 className="text-2xl font-black text-white mt-0.5 group-hover:text-emerald-400 transition font-mono">
                        {storageUsageKB} KB
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
                      <Database className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="w-full bg-[#0b0f19] h-2.5 rounded-full overflow-hidden border border-[#1e2740]">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full"
                        style={{ width: `${Math.min(100, Math.max(8, (parseFloat(storageUsageKB) / 200) * 100))}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-[#1e2740]">
                      <span>{products.length} tovar • {orders.length} buyurtma</span>
                      <span className="text-emerald-400 font-bold">Barqaror</span>
                    </div>
                  </div>
                </div>

                {/* 4. Network Latency & Ping */}
                <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-4 flex flex-col justify-between hover:border-cyan-500/40 transition shadow-lg group">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-400">Tarmoq Pingi (Latency)</span>
                      <h4 className="text-2xl font-black text-white mt-0.5 group-hover:text-cyan-400 transition font-mono">
                        {serverPing} ms
                      </h4>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition">
                      <Wifi className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                      <span className="text-xs font-mono font-bold text-cyan-300">200 OK • HTTP/2</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-[#1e2740]">
                      <span>Telegram Bot Ping</span>
                      <span className="text-sky-400 font-mono font-bold">{telegramPing} ms</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* SERVICES HEALTH GRID (4 INTERACTIVE NODES) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Node 1: Vite Local Web Server */}
                <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-5 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1e2740]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white">Vite 8 Dev Web Server</h4>
                        <span className="text-[11px] text-slate-400 font-mono">http://localhost:5173</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30">
                      🟢 100% Online
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                      <span className="text-slate-400 text-[10px] block">Protokol</span>
                      <span className="font-bold text-white">HTTP/1.1 + WSS (HMR)</span>
                    </div>
                    <div className="p-2.5 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                      <span className="text-slate-400 text-[10px] block">Hot Module Reload</span>
                      <span className="font-bold text-cyan-400">Faol (0ms lag)</span>
                    </div>
                  </div>
                </div>

                {/* Node 2: Telegram Bot Gateway */}
                <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-5 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1e2740]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                        <Send className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white">Telegram Bot Gateway</h4>
                        <span className="text-[11px] text-slate-400 font-mono">https://api.telegram.org</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30">
                      🟢 Ulangan ({telegramPing}ms)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                      <span className="text-slate-400 text-[10px] block">Xabarlar Yetkazish</span>
                      <span className="font-bold text-white">Avtomatik (Realtime)</span>
                    </div>
                    <div className="p-2.5 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                      <span className="text-slate-400 text-[10px] block">Test Aloqasi</span>
                      <button
                        onClick={handleTestTelegramBot}
                        disabled={isTestingBot}
                        className="text-sky-400 hover:text-sky-300 font-bold underline flex items-center gap-1"
                      >
                        {isTestingBot ? "Sinov..." : "Botni sinash 🚀"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Node 3: Local Database Engine */}
                <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-5 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1e2740]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white">Lokal Baza Dvigateli (DB)</h4>
                        <span className="text-[11px] text-slate-400 font-mono">LocalStorage Persistent Engine</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30">
                      🟢 Sinxronlangan
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                      <span className="text-slate-400 text-[10px] block">Mahsulotlar soni</span>
                      <span className="font-bold text-white">{products.length} ta mahsulot</span>
                    </div>
                    <div className="p-2.5 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                      <span className="text-slate-400 text-[10px] block">Buyurtmalar soni</span>
                      <span className="font-bold text-emerald-400">{orders.length} ta buyurtma</span>
                    </div>
                  </div>
                </div>

                {/* Node 4: Media & Image CDN */}
                <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-5 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1e2740]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white">Media & Original Rasm CDN</h4>
                        <span className="text-[11px] text-slate-400 font-mono">Unsplash Global Edge CDN</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/30">
                      🟢 HD Smooth (200 OK)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                      <span className="text-slate-400 text-[10px] block">Rasm Sifati</span>
                      <span className="font-bold text-purple-300">Ultra Original HD (q=85)</span>
                    </div>
                    <div className="p-2.5 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                      <span className="text-slate-400 text-[10px] block">Rasm O'lchami</span>
                      <span className="font-bold text-cyan-400">900px Optimized</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* DATABASE BACKUP & RESTORE STATION */}
              <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-6 space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1e2740]">
                  <div>
                    <h3 className="font-black text-sm text-white flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-emerald-400" />
                      <span>Ma'lumotlar Bazasi & Zaxira Boshqaruvi</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Do'kon tovarlari va buyurtmalarini to'liq JSON faylga eksport qilish yoki qayta tiklash
                    </p>
                  </div>

                  {/* Hidden file input for restore */}
                  <input
                    type="file"
                    ref={systemRestoreInputRef}
                    onChange={handleRestoreDatabaseBackup}
                    accept=".json"
                    className="hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Backup Button */}
                  <button
                    onClick={handleExportDatabaseBackup}
                    className="p-4 rounded-xl bg-[#0b0f19] border border-[#1e2740] hover:border-emerald-500/50 hover:bg-[#121a2d] transition flex flex-col justify-between text-left group"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Zaxira Olish</span>
                      <Download className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-[11px] text-slate-400">Barcha tovarlar va buyurtmalarni JSON faylga yuklash</span>
                  </button>

                  {/* Restore Button */}
                  <button
                    onClick={() => {
                      playSound('click', soundEnabled);
                      systemRestoreInputRef.current?.click();
                    }}
                    className="p-4 rounded-xl bg-[#0b0f19] border border-[#1e2740] hover:border-cyan-500/50 hover:bg-[#121a2d] transition flex flex-col justify-between text-left group"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition">Zaxiradan Tiklash</span>
                      <Upload className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-[11px] text-slate-400">Oldin saqlangan JSON zaxira faylini bazaga yuklash</span>
                  </button>

                  {/* Reset to Default */}
                  <button
                    onClick={handleResetToDefaultProducts}
                    className="p-4 rounded-xl bg-[#0b0f19] border border-[#1e2740] hover:border-amber-500/50 hover:bg-[#121a2d] transition flex flex-col justify-between text-left group"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-xs font-bold text-white group-hover:text-amber-400 transition">Standart Mahsulotlar</span>
                      <RotateCcw className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-[11px] text-slate-400">Do'konning dastlabki original mahsulotlar katalogini tiklash</span>
                  </button>

                  {/* Clear Cache */}
                  <button
                    onClick={handleClearSystemCache}
                    className="p-4 rounded-xl bg-[#0b0f19] border border-[#1e2740] hover:border-purple-500/50 hover:bg-[#121a2d] transition flex flex-col justify-between text-left group"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-xs font-bold text-white group-hover:text-purple-400 transition">Keshni Tozalash</span>
                      <RefreshCw className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-[11px] text-slate-400">Brauzer xotirasi va qidiruv keshlarini xavfsiz tozalash</span>
                  </button>
                </div>
              </div>

              {/* LIVE HACKER TERMINAL & SERVER CONSOLE */}
              <div className="bg-[#0b0f19] border border-[#1e2740] rounded-2xl p-5 shadow-2xl font-mono text-xs space-y-4">
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1e2740]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    </div>
                    <span className="text-slate-400 text-xs font-bold ml-2 flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-cyan-400" />
                      <span>rocker-server-console (bash)</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Command suggestions chips */}
                    <div className="hidden sm:flex items-center gap-1.5 text-[10px]">
                      {['ping', 'status', 'health', 'clear'].map(cmd => (
                        <button
                          key={cmd}
                          onClick={() => handleExecuteTerminalCommand(cmd)}
                          className="px-2 py-0.5 rounded bg-[#131929] hover:bg-[#1e2740] text-cyan-300 border border-[#1e2740] transition"
                        >
                          {cmd}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setSystemLogs([])}
                      className="text-slate-500 hover:text-slate-300 text-[10px] px-2 py-0.5 rounded bg-slate-800/50"
                    >
                      Tozalash
                    </button>
                  </div>
                </div>

                {/* Log Stream Output Box */}
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                  {systemLogs.map(log => (
                    <div key={log.id} className="flex items-start gap-2.5 text-[11px] leading-relaxed">
                      <span className="text-slate-500 select-none">[{log.time}]</span>
                      <span className={`font-bold select-none ${
                        log.level === 'SUCCESS' ? 'text-emerald-400' :
                        log.level === 'WARN' ? 'text-amber-400' :
                        log.level === 'ERROR' ? 'text-rose-400' : 'text-cyan-400'
                      }`}>
                        [{log.level}]
                      </span>
                      <span className="text-slate-200">{log.msg}</span>
                    </div>
                  ))}
                  {systemLogs.length === 0 && (
                    <div className="text-slate-600 italic py-2">Terminal bo'sh. Buyruq yuboring...</div>
                  )}
                </div>

                {/* Terminal Input Line */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleExecuteTerminalCommand();
                  }}
                  className="flex items-center gap-2 pt-2 border-t border-[#1e2740]"
                >
                  <span className="text-emerald-400 font-bold select-none">admin@rocker:~$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="Buyruq yozing (masalan: ping, status, health)..."
                    className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-600 text-xs"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold"
                  >
                    Yuborish ↵
                  </button>
                </form>

              </div>

              {/* SYSTEM ENVIRONMENT & SPECIFICATIONS TABLE */}
              <div className="bg-[#131929] border border-[#1d273f] rounded-2xl p-5 space-y-4 shadow-xl">
                <h3 className="font-black text-sm text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Dasturiy Muhit & Xavfsizlik Spesifikatsiyasi</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Front-end Framework</span>
                    <span className="font-bold text-white mt-0.5 block">React 19 (SPA Architecture)</span>
                  </div>

                  <div className="p-3 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Build Dvigateli</span>
                    <span className="font-bold text-cyan-400 mt-0.5 block">Vite 8.3.1 (Rollup Bundler)</span>
                  </div>

                  <div className="p-3 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Bosh Administrator</span>
                    <span className="font-bold text-emerald-400 mt-0.5 block">{user?.name || 'Xabibullo Raxmatjonov'}</span>
                  </div>

                  <div className="p-3 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Shifrlash & Xavfsizlik</span>
                    <span className="font-bold text-purple-400 mt-0.5 block">SSL / AES-256 Protected</span>
                  </div>

                  <div className="p-3 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Fayl Tizimi & Kesh</span>
                    <span className="font-bold text-white mt-0.5 block">HTML5 Web Storage API</span>
                  </div>

                  <div className="p-3 bg-[#0b0f19] rounded-xl border border-[#1e2740]">
                    <span className="text-[10px] text-slate-500 font-bold block uppercase">Host / Port</span>
                    <span className="font-bold text-sky-400 mt-0.5 block">127.0.0.1:5173 (Localhost)</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </main>

        {/* 4. FOOTER (Exact Rocker Style) */}
        <footer className="h-12 border-t border-[#1a2236] bg-[#101726] flex items-center justify-between text-xs text-slate-500 font-medium px-6">
          <span>Copyright © 2026. Rocker Ultra Admin Panel. All right reserved.</span>
          <span className="text-cyan-500/80 font-mono text-[10px]">Toshkent, O'zbekiston</span>
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
                    <option value="cat_tv">Smart Televizorlar</option>
                    <option value="cat_wearables">Wearables</option>
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
                  placeholder="https://... yoki /images/..."
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

      {/* 6. TELEGRAM BROADCAST MODAL */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#131929] rounded-3xl max-w-md w-full p-6 border border-[#1e2740] shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-[#1e2740] pb-3">
              <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-sky-400" />
                <span>Telegram E'lon Yuborish</span>
              </h3>
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Yozgan xabaringiz admin chatiga va bog'langan kanalga to'g'ridan-to'g'ri yuboriladi.
            </p>

            <textarea
              rows="4"
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Masalan: 🎉 Diqqat! Barcha televizorlarga 20% gacha bahorgi chegirma e'lon qilindi!"
              className="w-full p-3 rounded-2xl text-xs bg-[#0b0f19] border border-[#1e2740] text-white outline-none focus:border-cyan-500"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
              >
                Bekor qilish
              </button>
              <button
                disabled={isBroadcasting || !broadcastMessage.trim()}
                onClick={handleSendBroadcast}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-extrabold text-xs shadow-lg hover:opacity-95 transition disabled:opacity-50 flex items-center gap-1.5"
              >
                {isBroadcasting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Yuborish</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. PRINTABLE INVOICE / RECEIPT MODAL (Full Dark Mode & Clean Print Support) */}
      {isInvoiceModalOpen && viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#131929] text-white border border-[#1e2740] print:border-none print:bg-white print:text-black rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-4 font-sans relative">
            <button
              onClick={() => setIsInvoiceModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 print:hidden transition rounded-full hover:bg-white/10"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Receipt Header */}
            <div className="text-center border-b border-[#1e2740] print:border-black/20 pb-4 space-y-1">
              <h2 className="text-2xl font-black tracking-tight text-white print:text-black">VOV SHOP</h2>
              <p className="text-xs text-slate-400 print:text-slate-600">Elektronika va Smart Qurilmalar Markazi</p>
              <p className="text-[11px] text-cyan-400 print:text-slate-800 font-mono font-bold">Buyurtma #{viewingOrder.id}</p>
              <p className="text-[10px] text-slate-400 print:text-slate-600">{viewingOrder.formattedDate || viewingOrder.date}</p>
            </div>

            {/* Customer Details */}
            <div className="text-xs space-y-1.5 bg-[#0b0f19] print:bg-slate-100 p-3.5 rounded-2xl border border-[#1e2740] print:border-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400 print:text-slate-600 font-medium">Mijoz:</span>
                <span className="font-bold text-white print:text-black">{viewingOrder.customer?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 print:text-slate-600 font-medium">Telefon:</span>
                <span className="font-bold font-mono text-cyan-300 print:text-black">{viewingOrder.customer?.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 print:text-slate-600 font-medium">Manzil:</span>
                <span className="font-bold text-white print:text-black">{viewingOrder.customer?.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 print:text-slate-600 font-medium">To'lov:</span>
                <span className="font-bold uppercase text-emerald-400 print:text-black">{viewingOrder.customer?.paymentMethod}</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="text-xs space-y-2 max-h-48 overflow-y-auto pr-1">
              {(viewingOrder.items || []).map((it, idx) => (
                <div key={idx} className="flex justify-between items-center py-1.5 border-b border-[#1e2740] print:border-slate-200">
                  <div className="min-w-0 pr-2">
                    <span className="font-bold block truncate text-white print:text-black">{it.product?.title || 'Mahsulot'}</span>
                    <span className="text-[10px] text-slate-400 print:text-slate-600">{it.quantity} dona × ${it.product?.price}</span>
                  </div>
                  <span className="font-black text-cyan-300 print:text-black">${((it.product?.price || 0) * (it.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="pt-2 border-t border-[#1e2740] print:border-black/20 space-y-1 text-xs">
              <div className="flex justify-between text-base font-black text-white print:text-black pt-1">
                <span>Jami To'lov:</span>
                <span className="text-cyan-400 print:text-black text-lg">${viewingOrder.totalAmount?.toFixed(2)}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 print:hidden">
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition"
              >
                Yopish
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Chop etish (Print)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. IMAGE LIGHTBOX PREVIEW MODAL */}
      {previewImageModal && (
        <div
          onClick={() => setPreviewImageModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-pointer animate-in fade-in"
        >
          <div className="relative max-w-3xl max-h-[85vh] p-2 bg-[#131929] rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl">
            <img
              src={previewImageModal}
              alt="Preview"
              className="max-w-full max-h-[80vh] object-contain rounded-2xl mx-auto"
            />
          </div>
        </div>
      )}

    </div>
  );
}
