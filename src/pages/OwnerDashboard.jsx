import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Loader2,
  Percent,
  Award,
  BarChart3,
  Terminal,
  Activity,
  Cpu,
  HardDrive,
  Database,
  Download,
  Upload,
  RefreshCw,
  RotateCcw,
  Zap,
  Radio,
  Printer,
  ChevronDown,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Check,
  AlertTriangle,
  Clock,
  Menu,
  Copy
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/initialData';
import { useApp } from '../context/AppContext';

// High-tech synthesized Web Audio SFX for VIP Owner feel
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
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1300, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'warn') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.setValueAtTime(220, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {}
};

export default function OwnerDashboard() {
  const {
    t,
    lang,
    changeLanguage,
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
    promoCodes,
    addPromoCode,
    deletePromoCode,
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

  const navigate = useNavigate();

  // Active navigation tab
  const [activeTab, setActiveTab] = useState('overview'); 
  // 'overview' | 'admins' | 'promos' | 'customers' | 'products' | 'orders' | 'telegram' | 'terminal' | 'system'

  // Layout & UI State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('rocker_sound') !== 'false');
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ msg, type });
    playSound(type === 'success' ? 'success' : 'warn', soundEnabled);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Real-time clock & uptime
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemUptimeSeconds, setSystemUptimeSeconds] = useState(148920);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setSystemUptimeSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedUptime = useMemo(() => {
    const hours = Math.floor(systemUptimeSeconds / 3600);
    const minutes = Math.floor((systemUptimeSeconds % 3600) / 60);
    const seconds = systemUptimeSeconds % 60;
    return `${hours}s ${minutes}m ${seconds}s`;
  }, [systemUptimeSeconds]);

  // Owner login gate credentials state
  const [ownerUsername, setOwnerUsername] = useState('owner');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showOwnerPassword, setShowOwnerPassword] = useState(false);

  // Chart Timeframe & Hover state
  const [chartTimeframe, setChartTimeframe] = useState('haftalik'); // 'bugun' | 'haftalik' | 'oylik' | 'yillik'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Admin CRUD Modal state
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [adminName, setAdminName] = useState('');
  const [adminUserLogin, setAdminUserLogin] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminPhone, setAdminPhone] = useState('');
  const [adminRole, setAdminRole] = useState('admin');
  const [adminPermissions, setAdminPermissions] = useState({
    canProducts: true,
    canOrders: true,
    canDiscount: true,
    canBroadcast: false
  });
  const [adminSearch, setAdminSearch] = useState('');
  const [revealedAdminPasswords, setRevealedAdminPasswords] = useState({});

  // Product CRUD Modal & Filter state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [previewImageModal, setPreviewImageModal] = useState(null);

  // Form states for product
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState('cat_smartphones');
  const [prodPrice, setProdPrice] = useState('');
  const [prodOldPrice, setProdOldPrice] = useState('');
  const [prodStock, setProdStock] = useState('10');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  // Orders Filter & Receipt Modal state
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [viewingOrder, setViewingOrder] = useState(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [resendingOrderId, setResendingOrderId] = useState(null);

  // Telegram state & Broadcast Modal
  const [botToken, setBotToken] = useState(telegramConfig?.botToken || DEFAULT_TELEGRAM_BOT_TOKEN || '');
  const [chatId, setChatId] = useState(telegramConfig?.chatId || DEFAULT_TELEGRAM_CHAT_ID || '8170197389');
  const [showToken, setShowToken] = useState(false);
  const [isTestingBot, setIsTestingBot] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [botPingMs, setBotPingMs] = useState(null);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  // Promocodes management state
  const [newPromoCodeInput, setNewPromoCodeInput] = useState('');
  const [newPromoDiscountInput, setNewPromoDiscountInput] = useState('20');
  const [newPromoDescInput, setNewPromoDescInput] = useState('');
  const [promoSearch, setPromoSearch] = useState('');

  // Customers CRM state
  const [customerSearch, setCustomerSearch] = useState('');

  // Terminal State for Owner
  const [terminalInput, setTerminalInput] = useState('');
  const terminalLogsContainerRef = useRef(null);
  const systemRestoreInputRef = useRef(null);
  const [ownerLogs, setOwnerLogs] = useState(() => [
    { id: 1, time: '17:00:10', level: 'ROOT', msg: 'VOV Owner Superadmin Shell v2.4 initialized.' },
    { id: 2, time: '17:00:15', level: 'AUTH', msg: 'Owner Session Active: Xabibullo Raxmatjonov (Full Access)' },
    { id: 3, time: '17:00:20', level: 'INFO', msg: `Bazada ${products.length} tovar, ${orders.length} buyurtma va ${admins.length} admin faol.` },
    { id: 4, time: '17:00:25', level: 'SUCCESS', msg: 'Barcha xavfsizlik protokollari 100% barqaror ishlamoqda.' }
  ]);

  useEffect(() => {
    if (terminalLogsContainerRef.current) {
      terminalLogsContainerRef.current.scrollTop = terminalLogsContainerRef.current.scrollHeight;
    }
  }, [ownerLogs]);

  // Derived financial & admin stats
  const calculatedOrdersRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  }, [orders]);

  const totalSalesRevenue = useMemo(() => {
    return 18500 + calculatedOrdersRevenue;
  }, [calculatedOrdersRevenue]);

  const totalSoldItemsCount = useMemo(() => {
    return 1240 + orders.reduce((sum, o) => sum + (o.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 1), 0);
  }, [orders]);

  const activeAdminsCount = useMemo(() => admins.filter(a => a.status === 'active').length, [admins]);
  const blockedAdminsCount = useMemo(() => admins.filter(a => a.status === 'blocked').length, [admins]);

  // Derived unique customers (CRM)
  const uniqueCustomers = useMemo(() => {
    const map = new Map();
    orders.forEach(o => {
      const phone = o.customer?.phone || "Noma'lum";
      const name = o.customer?.fullName || 'Mijoz';
      const address = o.customer?.address || '-';
      const pMethod = o.customer?.paymentMethod || 'click';
      if (!map.has(phone)) {
        map.set(phone, {
          name,
          phone,
          address,
          paymentMethod: pMethod,
          ordersCount: 1,
          totalSpent: Number(o.totalAmount || 0),
          lastOrderDate: o.formattedDate || (o.date ? new Date(o.date).toLocaleDateString('uz-UZ') : 'Yaqinda')
        });
      } else {
        const item = map.get(phone);
        item.ordersCount += 1;
        item.totalSpent += Number(o.totalAmount || 0);
        item.lastOrderDate = o.formattedDate || (o.date ? new Date(o.date).toLocaleDateString('uz-UZ') : item.lastOrderDate);
      }
    });
    return Array.from(map.values());
  }, [orders]);

  const filteredCustomers = useMemo(() => {
    if (!customerSearch.trim()) return uniqueCustomers;
    const q = customerSearch.toLowerCase();
    return uniqueCustomers.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.address.toLowerCase().includes(q)
    );
  }, [uniqueCustomers, customerSearch]);

  const filteredPromos = useMemo(() => {
    if (!promoSearch.trim()) return promoCodes || [];
    const q = promoSearch.toLowerCase();
    return (promoCodes || []).filter(p =>
      p.code.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  }, [promoCodes, promoSearch]);

  const filteredAdmins = useMemo(() => {
    return admins.filter(a =>
      a.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      a.username.toLowerCase().includes(adminSearch.toLowerCase()) ||
      (a.phone && a.phone.includes(adminSearch))
    );
  }, [admins, adminSearch]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch =
        p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
        p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
        String(p.id).toLowerCase().includes(productSearch.toLowerCase());

      const matchCategory =
        productCategoryFilter === 'all' || p.category === productCategoryFilter;

      return matchSearch && matchCategory;
    });
  }, [products, productSearch, productCategoryFilter]);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchStatus =
        orderStatusFilter === 'all' ||
        (orderStatusFilter === 'pending' && (!o.status || o.status.includes('pending'))) ||
        (orderStatusFilter === 'processing' && o.status === 'processing') ||
        (orderStatusFilter === 'delivered' && (o.status === 'delivered' || o.status === 'status_delivered')) ||
        (orderStatusFilter === 'cancelled' && o.status === 'cancelled');

      const matchSearch =
        !orderSearch ||
        o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customer?.fullName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
        o.customer?.phone?.includes(orderSearch);

      return matchStatus && matchSearch;
    });
  }, [orders, orderStatusFilter, orderSearch]);

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
      return "28.5";
    }
  }, [products, orders, admins]);

  // --- Handlers ---
  const handleOpenAddAdmin = () => {
    playSound('click', soundEnabled);
    setEditingAdmin(null);
    setAdminName('');
    setAdminUserLogin('');
    setAdminPass('');
    setAdminPhone('+998 ');
    setAdminRole('admin');
    setAdminPermissions({ canProducts: true, canOrders: true, canDiscount: true, canBroadcast: false });
    setIsAdminModalOpen(true);
  };

  const handleOpenEditAdmin = (adm) => {
    playSound('click', soundEnabled);
    setEditingAdmin(adm);
    setAdminName(adm.name);
    setAdminUserLogin(adm.username);
    setAdminPass(adm.password || 'admin123');
    setAdminPhone(adm.phone || '+998 ');
    setAdminRole(adm.role || 'admin');
    setAdminPermissions(adm.permissions || { canProducts: true, canOrders: true, canDiscount: true, canBroadcast: false });
    setIsAdminModalOpen(true);
  };

  const handleSaveAdmin = (e) => {
    e.preventDefault();
    if (!adminName || !adminUserLogin || !adminPass) return;

    const payload = {
      name: adminName.trim(),
      username: adminUserLogin.trim(),
      password: adminPass.trim(),
      phone: adminPhone.trim(),
      role: adminRole,
      permissions: adminPermissions
    };

    if (editingAdmin) {
      updateAdmin(editingAdmin.id, payload);
      showToast(`Admin "${adminName}" ma'lumotlari muvaffaqiyatli yangilandi! ✏️`);
    } else {
      addAdmin({
        ...payload,
        status: 'active',
        createdAt: new Date().toISOString().slice(0, 10),
        lastLogin: 'Hozir'
      });
      showToast(`Yangi admin "${adminName}" tizimga tayinlandi! 👑`);
    }
    setIsAdminModalOpen(false);
  };

  const handleOpenAddProduct = (preset = null) => {
    playSound('click', soundEnabled);
    if (preset) {
      setProdTitle(preset.title);
      setProdCategory(preset.category);
      setProdPrice(preset.price);
      setProdOldPrice(preset.oldPrice || '');
      setProdStock(preset.stock);
      setProdImage(preset.image);
      setProdDesc(preset.desc || '');
    } else {
      setProdTitle('');
      setProdCategory('cat_smartphones');
      setProdPrice('');
      setProdOldPrice('');
      setProdStock('15');
      setProdImage('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop');
      setProdDesc('');
    }
    setEditingProduct(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditProduct = (p) => {
    playSound('click', soundEnabled);
    setEditingProduct(p);
    setProdTitle(p.title);
    setProdCategory(p.category);
    setProdPrice(p.price);
    setProdOldPrice(p.oldPrice || '');
    setProdStock(p.stock);
    setProdImage(p.image);
    setProdDesc(p.description || '');
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!prodTitle || !prodPrice) return;

    const payload = {
      title: prodTitle.trim(),
      category: prodCategory,
      price: Number(prodPrice),
      oldPrice: prodOldPrice ? Number(prodOldPrice) : null,
      stock: Number(prodStock) || 0,
      image: (prodImage || '').trim() || 'https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop',
      description: (prodDesc || '').trim()
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      setEditingProduct(null);
      showToast("Mahsulot muvaffaqiyatli tahrirlandi! ✏️");
    } else {
      addProduct(payload);
      setIsAddModalOpen(false);
      showToast("Yangi mahsulot omborga muvaffaqiyatli qo'shildi! 🎉");
    }
  };

  const handleQuickAddTV = () => {
    playSound('success', soundEnabled);
    const newTv = {
      title: 'Samsung Smart TV Neo QLED 65" 4K Ultra HD',
      category: 'cat_tv',
      price: 1450,
      oldPrice: 1690,
      stock: 8,
      image: '/images/tv_samsung_neo_qled.jpg',
      description: 'Premium Quantum Matrix, 144Hz, HDR2000 smart televizor'
    };
    addProduct(newTv);
    showToast("📺 Samsung Smart TV muvaffaqiyatli omborga qo'shildi! 🎉");
  };

  const handleQuickStockChange = (productId, delta) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const newStock = Math.max(0, (prod.stock || 0) + delta);
    updateProduct(productId, { stock: newStock });
    playSound('click', soundEnabled);
  };

  const handleApplyBatchDiscount = (percent = 15) => {
    if (selectedProductIds.length === 0) return;
    selectedProductIds.forEach(id => {
      const prod = products.find(p => p.id === id);
      if (prod) {
        const discounted = Math.round(prod.price * (1 - percent / 100));
        updateProduct(id, { oldPrice: prod.price, price: discounted });
      }
    });
    setSelectedProductIds([]);
    showToast(`Tanlangan mahsulotlarga ${percent}% chegirma berildi! 🔥`);
  };

  const handleDeleteSelectedProducts = () => {
    if (selectedProductIds.length === 0) return;
    if (confirm(`${selectedProductIds.length} ta tanlangan tovar o'chirilsinmi?`)) {
      deleteMultipleProducts(selectedProductIds);
      setSelectedProductIds([]);
      showToast("Tanlangan mahsulotlar o'chirildi!");
    }
  };

  const handleCreatePromoCode = (e) => {
    e.preventDefault();
    if (!newPromoCodeInput.trim()) return;
    const res = addPromoCode({
      code: newPromoCodeInput.trim().toUpperCase(),
      discountPercent: Number(newPromoDiscountInput) || 20,
      description: newPromoDescInput.trim() || `Owner ${newPromoDiscountInput}% Maxsus Chegirma`
    });
    if (res?.success) {
      playSound('success', soundEnabled);
      showToast(res.message || "Yangi promokod yaratildi! 🎟️");
      setNewPromoCodeInput('');
      setNewPromoDescInput('');
    } else {
      showToast(res?.message || "Xatolik yuz berdi", "warn");
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    playSound('click', soundEnabled);
    showToast(`"${code}" promokodi nusxalandi! 📋`);
  };

  const handleGenerateTestOrder = async () => {
    playSound('click', soundEnabled);
    const randomProduct = products[Math.floor(Math.random() * products.length)] || products[0];
    const mockCustomer = {
      fullName: 'Bekzod Aliyev (Owner Test Xarid)',
      phone: '+998 90 777 88 99',
      address: 'Toshkent sh., Yunusobod 11, 24-uy',
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
      showToast(`Test buyurtma #${newOrder.id} shakllantirildi va Telegramga yuborildi! 📦`);
    } catch (e) {
      showToast("Xatolik: " + e.message, "warn");
    }
  };

  const handleResendOrder = async (order) => {
    setResendingOrderId(order.id);
    try {
      await resendOrderToTelegram(order);
      showToast(`Buyurtma #${order.id} Telegramga qayta yuborildi! 🚀`);
    } catch (e) {
      showToast("Xatolik: " + e.message, "warn");
    } finally {
      setResendingOrderId(null);
    }
  };

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
    link.href = url;
    link.download = `VOV_Owner_Orders_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Buyurtmalar CSV fayli muvaffaqiyatli yuklab olindi! 📥");
  };

  const handleExportDatabaseBackup = () => {
    playSound('click', soundEnabled);
    const backupData = {
      version: '3.0.0-owner-ultra',
      timestamp: new Date().toISOString(),
      owner: 'Xabibullo Raxmatjonov',
      admins,
      products,
      orders,
      promoCodes,
      telegramConfig
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VOV_OWNER_FULL_BACKUP_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("To'liq ma'lumotlar bazasi (JSON) yuklab olindi! 💾");
  };

  const handleRestoreDatabaseBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    playSound('click', soundEnabled);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.admins && Array.isArray(parsed.admins)) {
          localStorage.setItem('app_admins', JSON.stringify(parsed.admins));
        }
        if (parsed.products && Array.isArray(parsed.products)) {
          localStorage.setItem('app_products', JSON.stringify(parsed.products));
        }
        if (parsed.orders && Array.isArray(parsed.orders)) {
          localStorage.setItem('app_orders', JSON.stringify(parsed.orders));
        }
        if (parsed.telegramConfig) {
          localStorage.setItem('app_telegram_config', JSON.stringify(parsed.telegramConfig));
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
    if (confirm("DIQQAT: Barcha mahsulotlar asl original holatiga qaytariladi. Davom etasizmi?")) {
      playSound('click', soundEnabled);
      localStorage.setItem('app_products', JSON.stringify(INITIAL_PRODUCTS));
      localStorage.removeItem('app_deleted_products');
      showToast("Mahsulotlar asl holatiga qaytarildi! 🔄");
      setTimeout(() => window.location.reload(), 1200);
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
    showToast("Telegram sozlamalari saqlandi! 💾");
  };

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

  const handleSendBroadcast = async () => {
    if (!broadcastMessage.trim()) return;
    setIsBroadcasting(true);
    try {
      const formatted = `👑 <b>VOV SHOP BOSHQARUVI (OWNER) E'LONI</b>\n\n${broadcastMessage}\n\n<i>👤 Loyiha Egasi: Xabibullo Raxmatjonov\n⏰ Sana: ${new Date().toLocaleString('uz-UZ')}</i>`;
      const res = await sendTelegramMessage(formatted);
      if (res.success) {
        showToast("E'lon Telegram kanaliga yuborildi! 🚀");
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

  // Owner Superadmin Terminal Command Execution
  const handleExecuteOwnerCommand = (cmdStr) => {
    const rawCmd = (cmdStr !== undefined ? cmdStr : terminalInput).trim();
    const cmd = rawCmd ? rawCmd.toLowerCase() : 'status';
    setTerminalInput('');
    playSound('click', soundEnabled);
    const nowStr = new Date().toTimeString().slice(0, 8);

    const echoLog = {
      id: Date.now() + Math.random(),
      time: nowStr,
      level: 'CMD',
      msg: `owner@vov-root:~$ ${rawCmd || 'status'}`
    };

    let responseLog = null;

    if (cmd === 'help' || cmd === '?' || cmd === 'yordam') {
      responseLog = {
        id: Date.now() + 1,
        time: nowStr,
        level: 'INFO',
        msg: "BUYRUQLAR: 'admins', 'add admin <LOGIN> <PAROL> <ISM>', 'promos', 'add promo <KOD> <FOIZ>', 'status', 'ping', 'products', 'orders', 'broadcast <XABAR>', 'backup', 'clear'"
      };
    } else if (cmd === 'admins' || cmd === 'admin list') {
      const list = admins.map(a => `[${a.status === 'active' ? 'Faol' : 'Blok'}] ${a.name} (@${a.username})`).join(' | ');
      responseLog = { id: Date.now() + 1, time: nowStr, level: 'SUCCESS', msg: `ADMINLAR (${admins.length} ta): ${list}` };
    } else if (cmd.startsWith('add promo ')) {
      const parts = rawCmd.slice(10).trim().split(/\s+/);
      if (parts[0]) {
        const code = parts[0].toUpperCase();
        const percent = Number(parts[1]) || 20;
        addPromoCode({ code, discountPercent: percent, description: `Terminal orqali ${percent}% chegirma` });
        responseLog = { id: Date.now() + 1, time: nowStr, level: 'SUCCESS', msg: `PROMO: "${code}" (${percent}% chegirma) yaratildi!` };
        showToast(`Promokod ${code} (${percent}%) yaratildi! 🎉`);
      }
    } else if (cmd === 'promos' || cmd === 'promokodlar') {
      const list = (promoCodes || []).map(p => `${p.code} (-${p.discountPercent}%)`).join(', ');
      responseLog = { id: Date.now() + 1, time: nowStr, level: 'INFO', msg: `FAOL PROMOKODLAR: ${list || 'Mavjud emas'}` };
    } else if (cmd === 'status') {
      responseLog = { id: Date.now() + 1, time: nowStr, level: 'INFO', msg: `TIZIM HOLATI: 100% Barqaror | Uptime: ${formattedUptime} | Tushum: $${totalSalesRevenue.toFixed(2)} | Tovarlar: ${products.length} ta` };
    } else if (cmd === 'ping') {
      const p = Math.floor(15 + Math.random() * 12);
      responseLog = { id: Date.now() + 1, time: nowStr, level: 'SUCCESS', msg: `PONG: Server javobi: ${p}ms. Telegram API: 28ms.` };
    } else if (cmd === 'clear' || cmd === 'cls') {
      setOwnerLogs([]);
      showToast("Terminal tozalandi! 🧹");
      return;
    } else if (cmd === 'backup') {
      handleExportDatabaseBackup();
      responseLog = { id: Date.now() + 1, time: nowStr, level: 'SUCCESS', msg: "ZAXIRA: Ma'lumotlar bazasi JSON fayli yuklab olindi." };
    } else {
      responseLog = { id: Date.now() + 1, time: nowStr, level: 'WARN', msg: `Noma'lum buyruq: "${rawCmd}". Buyruqlar ro'yxatini ko'rish uchun 'help' deb yozing.` };
    }

    setOwnerLogs(prev => [...prev, echoLog, responseLog].slice(-50));
  };

  // If user is not logged in as owner, display clean Owner Portal Login Gate
  if (!user || user.role !== 'owner') {
    const handleOwnerLogin = (e) => {
      e.preventDefault();
      const res = login(ownerUsername, ownerPassword);
      if (res.user?.role === 'owner') {
        setLoginError('');
        playSound('success', soundEnabled);
      } else {
        setLoginError('Login yoki maxfiy parol noto\'g\'ri! Faqat Loyiha Egasi (Owner) kira oladi.');
        playSound('warn', soundEnabled);
      }
    };

    return (
      <div className="min-h-screen bg-[#0a0f1d] text-white flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/20 via-purple-600/20 to-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#111728]/90 backdrop-blur-2xl p-8 rounded-3xl border border-amber-500/30 shadow-2xl shadow-amber-500/10 space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30 ring-4 ring-amber-500/20">
              <Crown className="w-9 h-9 text-yellow-200 animate-pulse" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
              <span>VOV OWNER ULTRA</span>
            </h1>
            <p className="text-xs text-amber-400 font-extrabold uppercase tracking-wider">
              👑 Loyiha Egasi Boshqaruv Markazi
            </p>
            <p className="text-[11px] text-slate-400">
              Loyiha Muallifi: <b className="text-amber-300">Xabibullo Raxmatjonov</b>
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-2xl text-xs font-semibold text-rose-300 text-center animate-in fade-in">
              {loginError}
            </div>
          )}

          {/* Quick 1-click Demo Entry for Owner */}
          <div className="space-y-2 pt-1">
            <span className="block text-[11px] font-black uppercase tracking-wider text-slate-400">
              Tezkor Kirish (1-bosish):
            </span>
            <button
              type="button"
              onClick={() => {
                const res = login('owner', 'owner123');
                if (!res.success) setLoginError("Kirishda xatolik yuz berdi");
              }}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 hover:from-amber-500/30 hover:to-yellow-500/20 border border-amber-500/40 text-amber-200 text-xs font-black flex items-center justify-between transition group shadow-md cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Crown className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <div className="font-bold">Loyiha Egasi (Xabibullo Raxmatjonov)</div>
                  <div className="text-[10px] text-amber-400/80 font-mono">Login: owner / Parol: owner123</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-amber-500/30 group-hover:bg-amber-500 text-white text-[10px] font-black transition">
                Kirish ➔
              </span>
            </button>
          </div>

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t border-slate-700/60 w-full" />
            <span className="bg-[#111728] px-3 text-[11px] font-bold text-slate-500 uppercase tracking-widest absolute">
              yoki qo'lda
            </span>
          </div>

          <form onSubmit={handleOwnerLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Owner Login
              </label>
              <input
                type="text"
                required
                value={ownerUsername}
                onChange={(e) => setOwnerUsername(e.target.value)}
                placeholder="owner"
                className="w-full p-3 rounded-2xl bg-[#0b101d] border border-slate-700 text-white outline-none focus:border-amber-500 text-xs transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Maxfiy Parol
              </label>
              <div className="relative">
                <input
                  type={showOwnerPassword ? "text" : "password"}
                  required
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 pr-10 rounded-2xl bg-[#0b101d] border border-slate-700 text-white outline-none focus:border-amber-500 text-xs transition"
                />
                <button
                  type="button"
                  onClick={() => setShowOwnerPassword(!showOwnerPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showOwnerPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/25 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Crown className="w-4 h-4" />
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

            <Link
              to="/admin"
              className="inline-flex items-center gap-1 font-bold text-cyan-400 hover:underline"
            >
              <span>Admin Panel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-[#e2e8f0] flex font-sans selection:bg-amber-500 selection:text-black antialiased relative">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[150] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/10 animate-in slide-in-from-top duration-300 bg-[#12192c]/95 text-white">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${toastMessage.type === 'success' ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'}`}>
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold">{toastMessage.msg}</span>
        </div>
      )}

      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 md:hidden animate-in fade-in"
        />
      )}

      {/* 1. OWNER ROYAL SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 md:sticky md:top-0 md:h-screen md:translate-x-0 bg-[#0c1222] border-r border-[#1a233a] transition-all duration-300 ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${isSidebarCollapsed ? 'md:w-20' : 'md:w-64'} shrink-0 min-h-screen overflow-y-auto custom-scrollbar select-none flex flex-col justify-between`}
      >
        <div className="p-4 space-y-5">
          
          {/* Logo Brand Header */}
          <div className="flex items-center justify-between px-2 pt-1">
            <Link
              to="/owner"
              onClick={() => playSound('click', soundEnabled)}
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/20 ring-2 ring-amber-400/40 group-hover:scale-105 transition">
                <Crown className="w-6 h-6 text-white" />
              </div>
              {!isSidebarCollapsed && (
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-extrabold text-lg text-white tracking-tight">VOV OWNER</span>
                    <span className="text-[9px] text-amber-400 font-black uppercase px-1 rounded bg-amber-500/20 border border-amber-500/30">ULTRA</span>
                  </div>
                  <span className="text-[10px] text-amber-400/90 font-bold block">
                    👑 Xabibullo R. (Boss)
                  </span>
                </div>
              )}
            </Link>

            {/* Collapse toggle */}
            <button
              onClick={() => {
                setIsSidebarCollapsed(!isSidebarCollapsed);
                playSound('click', soundEnabled);
              }}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-[#162035] transition"
              title="Sidebar kengaytirish/yopish"
            >
              <ArrowLeft className={`w-4 h-4 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4 text-xs font-semibold">
            
            {/* GROUP: ASOSIY BOSHQARUV */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span>Asosiy Boshqaruv</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </div>
              )}
              <div className="space-y-1 pt-1">
                {/* Overview */}
                <button
                  onClick={() => {
                    setActiveTab('overview');
                    playSound('click', soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'overview'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#141b2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                    {!isSidebarCollapsed && <span>Savdo & Analitika</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-black">
                      Live
                    </span>
                  )}
                </button>

                {/* Admins */}
                <button
                  onClick={() => {
                    setActiveTab('admins');
                    playSound('click', soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'admins'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#141b2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-purple-400" />
                    {!isSidebarCollapsed && <span>Adminlar Nazorati</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-black">
                      {admins.length} ta
                    </span>
                  )}
                </button>

                {/* Promokodlar */}
                <button
                  onClick={() => {
                    setActiveTab('promos');
                    playSound('click', soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'promos'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#141b2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Percent className="w-4 h-4 text-emerald-400" />
                    {!isSidebarCollapsed && <span>Promokodlar</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-black">
                      {(promoCodes || []).length} ta
                    </span>
                  )}
                </button>

                {/* VIP Mijozlar */}
                <button
                  onClick={() => {
                    setActiveTab('customers');
                    playSound('click', soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'customers'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#141b2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-cyan-400" />
                    {!isSidebarCollapsed && <span>VIP Mijozlar (CRM)</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-black">
                      {uniqueCustomers.length} ta
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* GROUP: MAGAZIN & SAVDO */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span>Magazin & Tovarlar</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </div>
              )}
              <div className="space-y-1 pt-1">
                {/* Products */}
                <button
                  onClick={() => {
                    setActiveTab('products');
                    playSound('click', soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'products'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#141b2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-indigo-400" />
                    {!isSidebarCollapsed && <span>Mahsulotlar Ombori</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-black">
                      {products.length}
                    </span>
                  )}
                </button>

                {/* Orders */}
                <button
                  onClick={() => {
                    setActiveTab('orders');
                    playSound('click', soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'orders'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#141b2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                    {!isSidebarCollapsed && <span>Buyurtmalar & Kassa</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-black">
                      {orders.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* GROUP: AVTOMATIKA & TIZIM */}
            <div className="space-y-1">
              {!isSidebarCollapsed && (
                <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span>Tizim & Avtomatika</span>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </div>
              )}
              <div className="space-y-1 pt-1">
                {/* Telegram */}
                <button
                  onClick={() => {
                    setActiveTab('telegram');
                    playSound('click', soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'telegram'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#141b2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Send className="w-4 h-4 text-sky-400" />
                    {!isSidebarCollapsed && <span>Telegram Bot</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  )}
                </button>

                {/* Owner Terminal */}
                <button
                  onClick={() => {
                    setActiveTab('terminal');
                    playSound('click', soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'terminal'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#141b2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    {!isSidebarCollapsed && <span>Owner Terminali</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[9px] px-1 py-0.5 rounded font-mono bg-amber-500/20 text-amber-300">
                      root
                    </span>
                  )}
                </button>

                {/* System & Backup */}
                <button
                  onClick={() => {
                    setActiveTab('system');
                    playSound('click', soundEnabled);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold transition ${
                    activeTab === 'system'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#141b2e]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-purple-400" />
                    {!isSidebarCollapsed && <span>Baza & Zaxira</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      100%
                    </span>
                  )}
                </button>
              </div>
            </div>

          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-[#1a233a] space-y-2">
          <Link
            to="/admin"
            onClick={() => playSound('click', soundEnabled)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition"
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              {!isSidebarCollapsed && <span>Admin Panel</span>}
            </div>
            {!isSidebarCollapsed && <ExternalLink className="w-3.5 h-3.5 opacity-70" />}
          </Link>

          <Link
            to="/"
            onClick={() => playSound('click', soundEnabled)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-[#141b2e] transition"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-amber-400" />
              {!isSidebarCollapsed && <span>Do'konga qaytish</span>}
            </div>
            {!isSidebarCollapsed && <ExternalLink className="w-3.5 h-3.5 opacity-60" />}
          </Link>

          <button
            onClick={() => {
              playSound('warn', soundEnabled);
              logout();
              navigate('/');
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition active:scale-95"
            title="Owner hisobidan chiqish"
          >
            <LogOut className="w-4 h-4" />
            {!isSidebarCollapsed && <span>Owner Chiqish</span>}
          </button>
        </div>
      </aside>

      {/* 2. MAIN OWNER CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* TOP VIP HEADER BAR */}
        <header className="h-16 border-b border-[#1a233a] bg-[#0c1222]/90 backdrop-blur-xl sticky top-0 z-30 px-6 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => {
                setIsMobileSidebarOpen(true);
                playSound('click', soundEnabled);
              }}
              className="p-2 rounded-xl bg-[#141b2e] text-slate-300 hover:text-white md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-slate-400 hidden sm:inline-block">
                Toshkent: {currentTime.toLocaleTimeString('uz-UZ')}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-[#141b2e] text-amber-300 font-bold border border-[#1f2942]">
                Uptime: {formattedUptime}
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            {/* Quick Action: New Admin */}
            <button
              onClick={handleOpenAddAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 active:scale-95 transition"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Admin</span>
            </button>

            {/* Quick Action: New Product */}
            <button
              onClick={() => handleOpenAddProduct()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xs shadow-md shadow-purple-500/20 active:scale-95 transition"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tovar</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                const next = !soundEnabled;
                setSoundEnabled(next);
                localStorage.setItem('rocker_sound', String(next));
                playSound('click', next);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#141b2e] transition"
              title={soundEnabled ? "Ovozni o'chirish" : "Ovozni yoqish"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                toggleTheme();
                playSound('click', soundEnabled);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#141b2e] transition"
              title="Mavzuni o'zgartirish"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* User Profile Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#1a233a]">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xs ring-2 ring-amber-400/40 shadow-lg">
                XR
              </div>
              <div className="hidden lg:block text-left">
                <span className="block text-xs font-bold text-white leading-tight">Xabibullo Raxmatjonov</span>
                <span className="block text-[10px] text-amber-400 font-extrabold uppercase">Loyiha Egasi (Owner)</span>
              </div>
            </div>
          </div>
        </header>

        {/* HERO VIP OWNER ACTION BANNER */}
        <section className="px-6 pt-6">
          <div className="bg-gradient-to-r from-[#171f33] via-[#12192c] to-[#1a2238] border border-[#222e48] rounded-3xl p-5 shadow-2xl flex flex-wrap items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-1 z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-sm flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5" />
                  <span>LOYIHA EGASI (OWNER PANEL)</span>
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Barcha tizimlar to'liq nazorat ostida
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Xush kelibsiz, Xabibullo Raxmatjonov! Yuqori darajadagi superadmin boshqaruv markazi
              </h2>
            </div>

            {/* Fast Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 z-10">
              <button
                onClick={handleQuickAddTV}
                className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 font-bold text-xs transition flex items-center gap-1.5 active:scale-95"
                title="Samsung Smart TV ni bir bosishda qo'shish"
              >
                <span>📺 Tezkor TV</span>
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

              <button
                onClick={handleExportDatabaseBackup}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold text-xs transition flex items-center gap-1.5 active:scale-95"
              >
                <Database className="w-4 h-4" />
                <span>Zaxira JSON</span>
              </button>
            </div>

            {/* Quick Navigation Horizontal Tabs */}
            <div className="w-full flex overflow-x-auto no-scrollbar items-center gap-2 pt-4 border-t border-[#222e48] mt-2 pb-1">
              {[
                { id: 'overview', label: '📊 Savdo & Analitika', count: 'Live' },
                { id: 'admins', label: '👑 Adminlar Nazorati', count: admins.length },
                { id: 'promos', label: '🎟️ Promokodlar', count: (promoCodes || []).length },
                { id: 'customers', label: '👥 VIP Mijozlar (CRM)', count: uniqueCustomers.length },
                { id: 'products', label: '📦 Mahsulotlar (CRUD)', count: products.length },
                { id: 'orders', label: '🛍️ Buyurtmalar & Kassa', count: orders.length },
                { id: 'telegram', label: '🤖 Telegram Bot', count: 'Online' },
                { id: 'terminal', label: '💻 Owner Terminali', count: 'root' },
                { id: 'system', label: '⚙️ Baza & Zaxira', count: '100%' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    playSound('click', soundEnabled);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-amber-500/25 scale-105'
                      : 'bg-[#0f1526] hover:bg-[#182138] text-slate-300 border border-[#222e48]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count !== null && (
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                      activeTab === tab.id ? 'bg-black/20 text-slate-950' : 'bg-slate-800 text-amber-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 3. DYNAMIC TAB CONTENT */}
        <main className="flex-1 p-6 space-y-6">
          
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* 4 Golden Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Total Revenue */}
                <div className="bg-[#12182a] border border-[#1e2740] rounded-2xl p-5 shadow-xl hover:border-amber-500/40 transition group">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Jami Tushum (Revenue)</span>
                      <h3 className="text-2xl font-black text-white mt-1 group-hover:text-amber-300 transition">
                        ${totalSalesRevenue.toFixed(2)}
                      </h3>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition">
                      <DollarSign className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-[#1e2740]">
                    <span className="text-emerald-400 font-bold">+28.4% o'sish dinamikasi</span>
                    <span className="text-slate-400 text-[11px]">Kassa tushumi</span>
                  </div>
                </div>

                {/* 2. Total Admins */}
                <div 
                  onClick={() => setActiveTab('admins')}
                  className="bg-[#12182a] border border-[#1e2740] rounded-2xl p-5 shadow-xl hover:border-purple-500/40 transition group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Jami Adminlar</span>
                      <h3 className="text-2xl font-black text-white mt-1 group-hover:text-purple-300 transition">
                        {admins.length} nafar
                      </h3>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-[#1e2740]">
                    <span className="text-emerald-400 font-bold">{activeAdminsCount} faol</span>
                    <span className="text-rose-400 font-bold">{blockedAdminsCount} bloklangan</span>
                  </div>
                </div>

                {/* 3. Orders Count */}
                <div 
                  onClick={() => setActiveTab('orders')}
                  className="bg-[#12182a] border border-[#1e2740] rounded-2xl p-5 shadow-xl hover:border-emerald-500/40 transition group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Bajarilgan Buyurtmalar</span>
                      <h3 className="text-2xl font-black text-white mt-1 group-hover:text-emerald-300 transition">
                        {orders.length + 18} ta
                      </h3>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-[#1e2740]">
                    <span className="text-slate-300 font-bold">100% yetkazilgan</span>
                    <span className="text-cyan-400 font-bold">CRM Nazorati</span>
                  </div>
                </div>

                {/* 4. Products in Warehouse */}
                <div 
                  onClick={() => setActiveTab('products')}
                  className="bg-[#12182a] border border-[#1e2740] rounded-2xl p-5 shadow-xl hover:border-indigo-500/40 transition group cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Ombor Mahsulotlari</span>
                      <h3 className="text-2xl font-black text-white mt-1 group-hover:text-indigo-300 transition">
                        {products.length} ta
                      </h3>
                    </div>
                    <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:scale-110 transition">
                      <Package className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-[#1e2740]">
                    <span className="text-amber-400 font-bold">{totalSoldItemsCount} sotilgan</span>
                    <span className="text-slate-400 text-[11px]">Barcha tovarlar</span>
                  </div>
                </div>

              </div>

              {/* REVENUE SPLINE CHART & FINANCIAL BREAKDOWN */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 8 cols: Area Chart */}
                <div className="lg:col-span-8 bg-[#12182a] border border-[#1e2740] rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-amber-400" />
                        <span>Moliyaviy Savdo Oqimi & Dinamika</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                          +{chartTimeframe === 'bugun' ? '14%' : chartTimeframe === 'haftalik' ? '28%' : '52%'} o'sish
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Loyiha egasi uchun sof tushum va xaridlar ko'rsatkichi
                      </p>
                    </div>

                    {/* Timeframe Filter Buttons */}
                    <div className="flex items-center bg-[#0a0f1d] p-1 rounded-xl border border-[#1e2740] text-[10px] font-bold">
                      {[
                        { key: 'bugun', label: 'Bugun' },
                        { key: 'haftalik', label: 'Haftalik' },
                        { key: 'oylik', label: 'Oylik' },
                        { key: 'yillik', label: 'Yillik' }
                      ].map(tf => (
                        <button
                          key={tf.key}
                          onClick={() => {
                            setChartTimeframe(tf.key);
                            playSound('click', soundEnabled);
                          }}
                          className={`px-3 py-1.5 rounded-lg uppercase transition cursor-pointer ${
                            chartTimeframe === tf.key
                              ? 'bg-amber-500 text-slate-950 font-black shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {tf.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Area Chart */}
                  <div className="h-64 w-full relative">
                    <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="ownerGoldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid lines */}
                      {[40, 80, 120, 160, 200].map((y, i) => (
                        <line
                          key={i}
                          x1="30"
                          y1={y}
                          x2="590"
                          y2={y}
                          stroke="#1a233a"
                          strokeDasharray="4 4"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Chart Area */}
                      <polygon
                        fill="url(#ownerGoldGrad)"
                        points="
                          30,220
                          30,170
                          90,140
                          150,160
                          210,110
                          270,120
                          330,80
                          390,95
                          450,55
                          510,70
                          580,45
                          580,220
                        "
                      />

                      {/* Line */}
                      <path
                        d="M 30,170 Q 60,150 90,140 T 150,160 T 210,110 T 270,120 T 330,80 T 390,95 T 450,55 T 510,70 T 580,45"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />

                      {/* Data Points */}
                      {[
                        [30, 170], [90, 140], [150, 160], [210, 110], [270, 120],
                        [330, 80], [390, 95], [450, 55], [510, 70], [580, 45]
                      ].map(([cx, cy], idx) => (
                        <circle
                          key={idx}
                          cx={cx}
                          cy={cy}
                          r="4.5"
                          fill="#ffffff"
                          stroke="#f59e0b"
                          strokeWidth="3"
                          className="hover:scale-150 transition-transform cursor-pointer"
                        />
                      ))}
                    </svg>
                  </div>
                </div>

                {/* 4 cols: Financial Breakdown */}
                <div className="lg:col-span-4 bg-[#12182a] border border-[#1e2740] rounded-2xl p-6 shadow-xl space-y-4">
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span>Owner Moliyaviy Xulosasi</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-[#0a0f1d] rounded-xl border border-[#1e2740] flex items-center justify-between">
                      <span className="text-slate-400">Sof Foyda (Taxminiy 35%)</span>
                      <span className="font-black text-emerald-400 font-mono text-sm">
                        ${(totalSalesRevenue * 0.35).toFixed(2)}
                      </span>
                    </div>

                    <div className="p-3 bg-[#0a0f1d] rounded-xl border border-[#1e2740] flex items-center justify-between">
                      <span className="text-slate-400">O'rtacha Chek (AOV)</span>
                      <span className="font-bold text-white font-mono">
                        ${(totalSalesRevenue / Math.max(1, orders.length + 18)).toFixed(2)}
                      </span>
                    </div>

                    <div className="p-3 bg-[#0a0f1d] rounded-xl border border-[#1e2740] flex items-center justify-between">
                      <span className="text-slate-400">Yetkazish Xarajatlari</span>
                      <span className="font-bold text-cyan-400 font-mono">Bepul / $15</span>
                    </div>

                    <div className="p-3 bg-[#0a0f1d] rounded-xl border border-[#1e2740] flex items-center justify-between">
                      <span className="text-slate-400">Faol Promokodlar Chegirmasi</span>
                      <span className="font-bold text-amber-400 font-mono">15% - 50%</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300 leading-relaxed">
                    💡 <b>Owner maslahati:</b> Telegram bot va aksiyalar orqali mijozlar jalb qilish sotuvni 2 barobar oshirishi mumkin.
                  </div>
                </div>

              </div>

              {/* CURRENT ADMINS ACTIVITY PREVIEW */}
              <div className="bg-[#12182a] border border-[#1e2740] rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e2740]">
                  <div>
                    <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-400" />
                      <span>Tayinlangan Administratorlar ({admins.length} ta)</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Do'kon administratorlarining faollik holati va ruxsatlari
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('admins')}
                    className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold hover:bg-purple-500/30 transition"
                  >
                    Barcha Adminlar →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {admins.map(adm => (
                    <div key={adm.id} className="p-4 bg-[#0a0f1d] rounded-2xl border border-[#1e2740] space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-white font-black text-xs">
                            {adm.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-white block text-xs">{adm.name}</span>
                            <span className="text-[11px] text-indigo-400 font-mono">@{adm.username}</span>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${
                          adm.status === 'active' ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                        }`}>
                          {adm.status === 'active' ? '● Faol' : '✕ Blok'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-[#1e2740]">
                        <span>Tel: {adm.phone || '-'}</span>
                        <span className="text-slate-500">{adm.lastLogin}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ADMINS MANAGEMENT (FULL CONTROL) */}
          {activeTab === 'admins' && (
            <div className="bg-[#12182a] border border-[#1e2740] rounded-2xl p-6 shadow-xl space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2740]">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Crown className="w-5 h-5 text-amber-400" />
                    <span>Adminlar Nazorati & Huquqlar Markazi</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                      {admins.length} nafar
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Adminlarni qo'shish, parollarini o'zgartirish, bloklash yoki o'chirish
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Admin qidirish..."
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500 transition"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>

                  <button
                    onClick={handleOpenAddAdmin}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition flex items-center gap-1.5 shrink-0"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Yangi Admin</span>
                  </button>
                </div>
              </div>

              {/* Admins Table */}
              <div className="overflow-x-auto rounded-xl border border-[#1e2740]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0a0f1d] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1e2740]">
                      <th className="p-3.5">F.I.Sh & Rol</th>
                      <th className="p-3.5">Login</th>
                      <th className="p-3.5">Telefon</th>
                      <th className="p-3.5">Parol</th>
                      <th className="p-3.5">Ruxsatlar</th>
                      <th className="p-3.5">Holat</th>
                      <th className="p-3.5 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2740]">
                    {filteredAdmins.map(adm => {
                      const isRevealed = revealedAdminPasswords[adm.id];
                      return (
                        <tr key={adm.id} className="hover:bg-[#162035] transition">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-purple-600 text-white flex items-center justify-center font-black">
                                {adm.name.charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold text-white block">{adm.name}</span>
                                <span className="text-[10px] text-amber-400/90 font-bold uppercase">{adm.role || 'Administrator'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 font-mono font-bold text-indigo-400">
                            @{adm.username}
                          </td>
                          <td className="p-3.5 text-slate-300 font-mono">
                            {adm.phone || '-'}
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-1.5 font-mono">
                              <span className="text-slate-300">
                                {isRevealed ? (adm.password || 'admin123') : '••••••••'}
                              </span>
                              <button
                                onClick={() => setRevealedAdminPasswords(prev => ({ ...prev, [adm.id]: !prev[adm.id] }))}
                                className="text-slate-500 hover:text-white transition"
                                title={isRevealed ? "Yashirish" : "Ko'rsatish"}
                              >
                                {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-1">
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-500/10 text-cyan-300">Tovarlar</span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-300">Buyurtmalar</span>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <button
                              onClick={() => {
                                toggleAdminStatus(adm.id);
                                playSound('click', soundEnabled);
                                showToast(`${adm.name} holati o'zgartirildi!`);
                              }}
                              className={`px-3 py-1 rounded-full text-[10px] font-black border transition cursor-pointer ${
                                adm.status === 'active'
                                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                                  : 'bg-rose-500/15 text-rose-400 border-rose-500/30 hover:bg-rose-500/25'
                              }`}
                            >
                              {adm.status === 'active' ? '✓ Faol (Active)' : '✕ Bloklangan'}
                            </button>
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditAdmin(adm)}
                              className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition cursor-pointer"
                              title="Tahrirlash"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`"${adm.name}" adminini o'chirishni tasdiqlaysizmi?`)) {
                                  deleteAdmin(adm.id);
                                  playSound('warn', soundEnabled);
                                  showToast("Admin o'chirildi!");
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition cursor-pointer"
                              title="O'chirish"
                            >
                              <Trash2 className="w-4 h-4" />
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

          {/* TAB 3: PROMOCODES & DISCOUNTS */}
          {activeTab === 'promos' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#12182a] border border-[#1e2740] rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#1e2740]">
                  <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <Percent className="w-5 h-5 text-amber-400" />
                      <span>Promokodlar & Chegirmalar Boshqaruvi</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                        {(promoCodes || []).length} ta faol
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Loyiha egasi tomonidan mijozlar uchun maxsus chegirmalar yaratish
                    </p>
                  </div>
                </div>

                <form onSubmit={handleCreatePromoCode} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-4">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Promokod Kodi
                    </label>
                    <input
                      type="text"
                      placeholder="NAVROZ25, VIP50, BOSS30"
                      value={newPromoCodeInput}
                      onChange={(e) => setNewPromoCodeInput(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#0a0f1d] border border-[#1e2740] text-white uppercase font-mono font-bold tracking-wider outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Chegirma Foizi (%)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="99"
                      placeholder="25"
                      value={newPromoDiscountInput}
                      onChange={(e) => setNewPromoDiscountInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#0a0f1d] border border-[#1e2740] text-white font-bold outline-none focus:border-amber-500"
                      required
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">
                      Tavsif (Ixtiyoriy)
                    </label>
                    <input
                      type="text"
                      placeholder="Owner maxsus aksiyasi"
                      value={newPromoDescInput}
                      onChange={(e) => setNewPromoDescInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 active:scale-95 transition flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Yaratish</span>
                    </button>
                  </div>
                </form>

                {/* Promo Table */}
                <div className="overflow-x-auto rounded-xl border border-[#1e2740] mt-4">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#0a0f1d] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1e2740]">
                        <th className="p-3">Kodi</th>
                        <th className="p-3">Chegirma</th>
                        <th className="p-3">Tavsifi</th>
                        <th className="p-3">Holati</th>
                        <th className="p-3 text-right">Amallar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2740]">
                      {filteredPromos.map((promo, idx) => (
                        <tr key={promo.code || idx} className="hover:bg-[#162035] transition">
                          <td className="p-3">
                            <span className="font-mono font-black text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                              {promo.code}
                            </span>
                          </td>
                          <td className="p-3 font-black text-emerald-400">
                            {promo.discountPercent ? `${promo.discountPercent}% OFF` : `$${promo.fixedDiscount} OFF`}
                          </td>
                          <td className="p-3 text-slate-300">
                            {promo.description}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                              Faol (24/7)
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => handleCopyCode(promo.code)}
                              className="px-2 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 font-bold text-xs transition"
                            >
                              Nusxa
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`"${promo.code}" promokodini o'chirishni xohlaysizmi?`)) {
                                  deletePromoCode(promo.code);
                                  showToast(`"${promo.code}" o'chirildi!`);
                                }
                              }}
                              className="p-1 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition align-middle"
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
            </div>
          )}

          {/* TAB 4: VIP CUSTOMERS (CRM) */}
          {activeTab === 'customers' && (
            <div className="bg-[#12182a] border border-[#1e2740] rounded-2xl p-6 shadow-xl space-y-4 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#1e2740]">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-cyan-400" />
                    <span>VIP Mijozlar & Xaridorlar Bazasi (CRM)</span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                      {uniqueCustomers.length} nafar
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Do'konda buyurtma bergan barcha mijozlar va ularning umumiy xaridlari
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Mijoz qidirish..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-cyan-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#1e2740]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0a0f1d] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1e2740]">
                      <th className="p-3.5">Mijoz Ismi</th>
                      <th className="p-3.5">Telefon</th>
                      <th className="p-3.5">Manzil</th>
                      <th className="p-3.5">Buyurtmalar</th>
                      <th className="p-3.5">Jami Xarid ($)</th>
                      <th className="p-3.5">So'nggi Xarid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2740]">
                    {filteredCustomers.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-slate-500">
                          Hozircha mijozlar topilmadi
                        </td>
                      </tr>
                    ) : (
                      filteredCustomers.map((c, i) => (
                        <tr key={c.phone || i} className="hover:bg-[#162035] transition">
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-black text-xs">
                                {c.name.charAt(0)}
                              </div>
                              <span className="font-bold text-white">{c.name}</span>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <a href={`tel:${c.phone}`} className="text-cyan-400 hover:underline font-mono font-bold">
                              {c.phone}
                            </a>
                          </td>
                          <td className="p-3.5 text-slate-300 max-w-xs truncate">
                            {c.address}
                          </td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-bold">
                              {c.ordersCount} ta
                            </span>
                          </td>
                          <td className="p-3.5 font-black text-emerald-400 text-sm">
                            ${c.totalSpent.toFixed(2)}
                          </td>
                          <td className="p-3.5 text-slate-400 font-mono">
                            {c.lastOrderDate}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: PRODUCTS CRUD */}
          {activeTab === 'products' && (
            <div className="bg-[#12182a] border border-[#1e2740] rounded-2xl p-6 shadow-xl space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2740]">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Package className="w-5 h-5 text-indigo-400" />
                    <span>Mahsulotlar Ombori Nazorati</span>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                      {filteredProducts.length} ta
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Do'kondagi barcha mahsulotlar narxi, ombor soni va rasmlarini to'liq nazorat qilish
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={handleQuickAddTV}
                    className="px-3 py-2 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold text-xs hover:bg-purple-500/30 transition"
                  >
                    📺 Tezkor Smart TV
                  </button>

                  <button
                    onClick={() => handleOpenAddProduct()}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tovar Qo'shish</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-5 relative">
                  <input
                    type="text"
                    placeholder="Mahsulot nomi yoki ID..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="md:col-span-4">
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500"
                  >
                    <option value="all">Barcha Kategoriyalar</option>
                    <option value="cat_smartphones">Smartfonlar</option>
                    <option value="cat_laptops">Noutbuklar</option>
                    <option value="cat_tv">Smart Televizorlar</option>
                    <option value="cat_audio">Audio & Quloqchinlar</option>
                    <option value="cat_accessories">Aksessuarlar</option>
                  </select>
                </div>

                <div className="md:col-span-3 flex items-center justify-end gap-2">
                  {selectedProductIds.length > 0 ? (
                    <>
                      <button
                        onClick={() => handleApplyBatchDiscount(15)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold"
                      >
                        -15% Chegirma
                      </button>
                      <button
                        onClick={handleDeleteSelectedProducts}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold"
                      >
                        O'chirish ({selectedProductIds.length})
                      </button>
                    </>
                  ) : (
                    <span className="text-[11px] text-slate-500">
                      Jami: {products.length} tovar
                    </span>
                  )}
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto rounded-xl border border-[#1e2740]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0a0f1d] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1e2740]">
                      <th className="p-3 w-8">
                        <input
                          type="checkbox"
                          checked={selectedProductIds.length === filteredProducts.length && filteredProducts.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedProductIds(filteredProducts.map(p => p.id));
                            else setSelectedProductIds([]);
                          }}
                          className="rounded accent-amber-500 cursor-pointer"
                        />
                      </th>
                      <th className="p-3">Rasm</th>
                      <th className="p-3">Mahsulot Nomi & ID</th>
                      <th className="p-3">Kategoriya</th>
                      <th className="p-3">Narxi</th>
                      <th className="p-3">Omborda</th>
                      <th className="p-3 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2740]">
                    {filteredProducts.map(p => {
                      const isSelected = selectedProductIds.includes(p.id);
                      return (
                        <tr key={p.id} className={`hover:bg-[#162035] transition ${isSelected ? 'bg-amber-500/5' : ''}`}>
                          <td className="p-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedProductIds([...selectedProductIds, p.id]);
                                else setSelectedProductIds(selectedProductIds.filter(id => id !== p.id));
                              }}
                              className="rounded accent-amber-500 cursor-pointer"
                            />
                          </td>
                          <td className="p-3">
                            <img
                              src={p.image}
                              alt={p.title}
                              onClick={() => setPreviewImageModal(p.image)}
                              className="w-12 h-12 object-cover rounded-xl bg-slate-900 cursor-zoom-in hover:scale-105 transition"
                            />
                          </td>
                          <td className="p-3 max-w-xs">
                            <span className="font-bold text-white block truncate">{p.title}</span>
                            <span className="text-[10px] text-amber-400 font-mono">ID: {p.id}</span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                              {p.category}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-black text-amber-400 text-sm">${p.price}</span>
                            {p.oldPrice && (
                              <span className="text-[10px] text-slate-500 line-through block">${p.oldPrice}</span>
                            )}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleQuickStockChange(p.id, -1)}
                                className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-xs"
                              >
                                -
                              </button>
                              <span className={`font-bold px-2 py-0.5 rounded text-xs min-w-8 text-center ${
                                p.stock > 5 ? 'text-emerald-400 bg-emerald-500/10' :
                                p.stock > 0 ? 'text-amber-400 bg-amber-500/10' : 'text-rose-400 bg-rose-500/10'
                              }`}>
                                {p.stock}
                              </span>
                              <button
                                onClick={() => handleQuickStockChange(p.id, +1)}
                                className="w-6 h-6 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-xs"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`"${p.title}" mahsulotini o'chirishni tasdiqlaysizmi?`)) {
                                  deleteProduct(p.id);
                                  showToast("Mahsulot o'chirildi!");
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
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

          {/* TAB 6: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="bg-[#12182a] border border-[#1e2740] rounded-2xl p-6 shadow-xl space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e2740]">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-emerald-400" />
                    <span>Buyurtmalar & Kassa Nazorati</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                      {filteredOrders.length} ta
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Mijoz buyurtmalari, kurer yetkazish bosqichlari va to'lov turlari
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExportOrdersCSV}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CSV Eksport</span>
                  </button>

                  <button
                    onClick={handleGenerateTestOrder}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition flex items-center gap-1.5"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Test Buyurtma</span>
                  </button>
                </div>
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                {[
                  { key: 'all', label: 'Barchasi', count: orders.length },
                  { key: 'pending', label: 'Kutilmoqda', count: orders.filter(o => !o.status || o.status.includes('pending')).length },
                  { key: 'processing', label: 'Yetkazilmoqda', count: orders.filter(o => o.status === 'processing').length },
                  { key: 'delivered', label: 'Bajarildi', count: orders.filter(o => o.status === 'delivered' || o.status === 'status_delivered').length },
                  { key: 'cancelled', label: 'Bekor qilingan', count: orders.filter(o => o.status === 'cancelled').length }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setOrderStatusFilter(tab.key);
                      playSound('click', soundEnabled);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                      orderStatusFilter === tab.key
                        ? 'bg-amber-500 text-slate-950 font-black shadow'
                        : 'bg-[#0a0f1d] text-slate-400 hover:text-white border border-[#1e2740]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] opacity-80">({tab.count})</span>
                  </button>
                ))}
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto rounded-xl border border-[#1e2740]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0a0f1d] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#1e2740]">
                      <th className="p-3">ID</th>
                      <th className="p-3">Sana</th>
                      <th className="p-3">Mijoz</th>
                      <th className="p-3">Telefon</th>
                      <th className="p-3">To'lov</th>
                      <th className="p-3">Jami Summa</th>
                      <th className="p-3">Holat</th>
                      <th className="p-3 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1e2740]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="p-8 text-center text-slate-500">
                          Hozircha buyurtma topilmadi
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(o => (
                        <tr key={o.id} className="hover:bg-[#162035] transition">
                          <td className="p-3 font-mono font-bold text-amber-400">#{o.id}</td>
                          <td className="p-3 text-slate-400">{o.formattedDate || o.date?.slice(0, 10)}</td>
                          <td className="p-3 font-bold text-white">{o.customer?.fullName}</td>
                          <td className="p-3 text-slate-300 font-mono">{o.customer?.phone}</td>
                          <td className="p-3 uppercase font-bold text-slate-400">{o.customer?.paymentMethod}</td>
                          <td className="p-3 font-black text-emerald-400 text-sm">${o.totalAmount?.toFixed(2)}</td>
                          <td className="p-3">
                            <select
                              value={o.status || 'status_pending'}
                              onChange={(e) => {
                                updateOrderStatus(o.id, e.target.value);
                                showToast(`Buyurtma #${o.id} holati yangilandi!`);
                              }}
                              className="bg-[#0a0f1d] text-[10px] font-bold px-2 py-1 rounded-lg border border-[#1e2740] text-slate-200 outline-none focus:border-amber-500"
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
                            >
                              <Printer className="w-3 h-3" />
                              <span>Chek</span>
                            </button>

                            <button
                              onClick={() => handleResendOrder(o)}
                              disabled={resendingOrderId === o.id}
                              className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 text-[10px] font-bold transition inline-flex items-center gap-1"
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
                                if (confirm(`Buyurtma #${o.id} o'chirilsinmi?`)) {
                                  deleteOrder(o.id);
                                  showToast("Buyurtma o'chirildi!");
                                }
                              }}
                              className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition inline-flex items-center"
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

          {/* TAB 7: TELEGRAM BOT INTEGRATION */}
          {activeTab === 'telegram' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in">
              <div className="lg:col-span-7 bg-[#12182a] border border-[#1e2740] rounded-2xl p-6 space-y-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-[#1e2740]">
                  <div>
                    <h2 className="text-lg font-black text-white flex items-center gap-2">
                      <Send className="w-5 h-5 text-sky-400" />
                      <span>Telegram Bot Boshqaruvi</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Barcha yangi buyurtmalar avtomatik tarzda Telegramingizga yuboriladi
                    </p>
                  </div>
                  {botPingMs && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
                      🟢 Ping: {botPingMs}ms
                    </span>
                  )}
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
                        placeholder="8823235791:AA..."
                        className="w-full p-3 pr-10 rounded-xl text-xs bg-[#0a0f1d] border border-[#1e2740] text-white outline-none font-mono focus:border-amber-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowToken(!showToken)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-300">
                        Admin / Owner Chat ID
                      </label>
                      <button
                        type="button"
                        onClick={() => setChatId(DEFAULT_TELEGRAM_CHAT_ID)}
                        className="text-[11px] text-amber-400 hover:underline font-semibold"
                      >
                        Standart Chat ID (8170197389)
                      </button>
                    </div>
                    <input
                      type="text"
                      value={chatId}
                      onChange={(e) => setChatId(e.target.value)}
                      placeholder="8170197389"
                      className="w-full p-3 rounded-xl text-xs bg-[#0a0f1d] border border-[#1e2740] text-white outline-none font-mono focus:border-amber-500"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs hover:opacity-95 transition shadow-lg shadow-amber-500/20"
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
                      <span>{isTestingBot ? "Sinov..." : "Bot Aloqasini Sinash"}</span>
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

              {/* Bot Info Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-[#12182a] border border-[#1e2740] rounded-2xl p-6 space-y-4 shadow-xl">
                  <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span>Telegram Gateway Holati</span>
                  </h3>
                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740]">
                      <span className="text-slate-400">Bot Holati</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        Faol (24/7)
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740]">
                      <span className="text-slate-400">Buyurtma Xabarnomasi</span>
                      <span className="text-amber-400 font-bold">Avtomatik</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740]">
                      <span className="text-slate-400">Rasm va Chek Yuborish</span>
                      <span className="text-purple-400 font-bold">Qo'llab-quvvatlanadi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: OWNER SUPERADMIN TERMINAL (BASH) */}
          {activeTab === 'terminal' && (
            <div className="bg-[#0b0f19] border border-[#1e2740] rounded-2xl p-6 shadow-2xl font-mono text-xs space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-[#1e2740]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <span className="text-slate-400 text-xs font-bold ml-2 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-amber-400" />
                    <span>owner@vov-root:~$ (Superadmin bash shell)</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-1.5 text-[10px] overflow-x-auto">
                    {[
                      { label: 'admins', run: 'admins' },
                      { label: 'promos', run: 'promos' },
                      { label: '+ promo VIP50 50', run: 'add promo VIP50 50' },
                      { label: 'status', run: 'status' },
                      { label: 'ping', run: 'ping' },
                      { label: 'help', run: 'help' }
                    ].map(item => (
                      <button
                        key={item.label}
                        onClick={() => handleExecuteOwnerCommand(item.run)}
                        className="px-2 py-0.5 rounded bg-[#12182a] hover:bg-[#1e2740] text-amber-300 border border-[#1e2740] transition cursor-pointer shrink-0 font-mono"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setOwnerLogs([])}
                    className="text-slate-500 hover:text-slate-300 text-[10px] px-2 py-0.5 rounded bg-slate-800/50"
                  >
                    Tozalash
                  </button>
                </div>
              </div>

              {/* Logs Stream */}
              <div
                ref={terminalLogsContainerRef}
                className="space-y-1.5 max-h-64 overflow-y-auto pr-2 custom-scrollbar flex flex-col"
              >
                {ownerLogs.map(log => (
                  <div key={log.id} className="flex items-start gap-2.5 text-[11px] leading-relaxed">
                    <span className="text-slate-500 select-none">[{log.time}]</span>
                    <span className={`font-bold select-none ${
                      log.level === 'CMD' ? 'text-amber-400' :
                      log.level === 'SUCCESS' ? 'text-emerald-400' :
                      log.level === 'ROOT' ? 'text-amber-300 font-black' :
                      log.level === 'WARN' ? 'text-amber-400' :
                      log.level === 'ERROR' ? 'text-rose-400' : 'text-cyan-400'
                    }`}>
                      [{log.level}]
                    </span>
                    <span className={log.level === 'CMD' ? 'text-amber-200 font-bold' : 'text-slate-200'}>
                      {log.msg}
                    </span>
                  </div>
                ))}
              </div>

              {/* Input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleExecuteOwnerCommand();
                }}
                className="flex items-center gap-2 pt-2 border-t border-[#1e2740]"
              >
                <span className="text-amber-400 font-bold select-none text-xs">owner@vov-root:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Buyruq yozing (masalan: admins, promos, status, ping, help)..."
                  className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-600 text-xs py-1"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 text-slate-950 font-black text-xs transition active:scale-95 cursor-pointer shrink-0"
                >
                  Yuborish ↵
                </button>
              </form>
            </div>
          )}

          {/* TAB 9: DATABASE & SYSTEM BACKUP */}
          {activeTab === 'system' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-[#12182a] border border-[#1e2740] rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1e2740]">
                  <div>
                    <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                      <Database className="w-5 h-5 text-purple-400" />
                      <span>Ma'lumotlar Bazasi & Zaxira Boshqaruvi</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Barcha adminlar, tovarlar, promokodlar va buyurtmalarni to'liq JSON eksport/import qilish
                    </p>
                  </div>

                  <input
                    type="file"
                    ref={systemRestoreInputRef}
                    onChange={handleRestoreDatabaseBackup}
                    accept=".json"
                    className="hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={handleExportDatabaseBackup}
                    className="p-4 rounded-xl bg-[#0a0f1d] border border-[#1e2740] hover:border-amber-500/50 hover:bg-[#131b2f] transition flex flex-col justify-between text-left group"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-xs font-bold text-white group-hover:text-amber-400 transition">To'liq Zaxira (JSON)</span>
                      <Download className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-[11px] text-slate-400">Adminlar, tovarlar va buyurtmalarni yuklab olish</span>
                  </button>

                  <button
                    onClick={() => {
                      playSound('click', soundEnabled);
                      systemRestoreInputRef.current?.click();
                    }}
                    className="p-4 rounded-xl bg-[#0a0f1d] border border-[#1e2740] hover:border-cyan-500/50 hover:bg-[#131b2f] transition flex flex-col justify-between text-left group"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-xs font-bold text-white group-hover:text-cyan-400 transition">Zaxiradan Tiklash</span>
                      <Upload className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-[11px] text-slate-400">Oldin saqlangan JSON zaxira faylini yuklash</span>
                  </button>

                  <button
                    onClick={handleResetToDefaultProducts}
                    className="p-4 rounded-xl bg-[#0a0f1d] border border-[#1e2740] hover:border-purple-500/50 hover:bg-[#131b2f] transition flex flex-col justify-between text-left group"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-xs font-bold text-white group-hover:text-purple-400 transition">Standart Tovarlar</span>
                      <RotateCcw className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-[11px] text-slate-400">Do'kon dastlabki mahsulotlarini qayta tiklash</span>
                  </button>

                  <button
                    onClick={() => {
                      sessionStorage.clear();
                      playSound('click', soundEnabled);
                      showToast("Kesh va xotira tozalandi! 🧹");
                    }}
                    className="p-4 rounded-xl bg-[#0a0f1d] border border-[#1e2740] hover:border-emerald-500/50 hover:bg-[#131b2f] transition flex flex-col justify-between text-left group"
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition">Keshni Tozalash</span>
                      <RefreshCw className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-[11px] text-slate-400">Brauzer xotirasi va qidiruv keshlarini tozalash</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* OWNER FOOTER */}
        <footer className="h-12 border-t border-[#1a233a] bg-[#0c1222] flex items-center justify-between text-xs text-slate-500 font-medium px-6 mt-auto">
          <span>Copyright © 2026. VOV Shop Owner Ultra Portal. Barcha huquqlar himoyalangan.</span>
          <span className="text-amber-400 font-mono text-[10px]">👑 Loyiha Egasi: Xabibullo Raxmatjonov</span>
        </footer>

      </div>

      {/* MODAL 1: ADD / EDIT ADMIN */}
      {isAdminModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAdminModalOpen(false);
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto"
        >
          <div className="bg-[#12182a] rounded-3xl max-w-md w-full p-6 border border-amber-500/40 shadow-2xl space-y-4 text-white max-h-[90vh] overflow-y-auto my-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-[#1e2740] pb-3">
              <h3 className="font-extrabold text-base text-white flex items-center gap-2">
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
                  className="w-full p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500"
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
                  className="w-full p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740] text-white outline-none font-mono focus:border-amber-500"
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
                  className="w-full p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500"
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
                  className="w-full p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740] text-white outline-none font-mono focus:border-amber-500"
                />
              </div>

              {/* Permissions Checklist */}
              <div className="pt-2 border-t border-[#1e2740] space-y-2">
                <span className="block text-[11px] font-bold text-amber-400 uppercase">Admin Huquqlari:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adminPermissions.canProducts}
                      onChange={(e) => setAdminPermissions({ ...adminPermissions, canProducts: e.target.checked })}
                      className="accent-amber-500 rounded"
                    />
                    <span>Tovarlar CRUD</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adminPermissions.canOrders}
                      onChange={(e) => setAdminPermissions({ ...adminPermissions, canOrders: e.target.checked })}
                      className="accent-amber-500 rounded"
                    />
                    <span>Buyurtmalar CRM</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adminPermissions.canDiscount}
                      onChange={(e) => setAdminPermissions({ ...adminPermissions, canDiscount: e.target.checked })}
                      className="accent-amber-500 rounded"
                    />
                    <span>Chegirmalar</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={adminPermissions.canBroadcast}
                      onChange={(e) => setAdminPermissions({ ...adminPermissions, canBroadcast: e.target.checked })}
                      className="accent-amber-500 rounded"
                    />
                    <span>Telegram E'lon</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#1e2740]">
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#0a0f1d] text-slate-300 font-bold hover:bg-[#162035] transition"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20 transition cursor-pointer"
                >
                  {editingAdmin ? 'Saqlash' : 'Admin Tayinlash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT PRODUCT */}
      {(isAddModalOpen || editingProduct) && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAddModalOpen(false);
              setEditingProduct(null);
            }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto"
        >
          <div className="bg-[#12182a] rounded-3xl max-w-lg w-full p-6 border border-[#1e2740] shadow-2xl space-y-4 text-white max-h-[90vh] overflow-y-auto my-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-[#1e2740] pb-3">
              <h3 className="font-extrabold text-base text-white">
                {editingProduct ? 'Mahsulotni Tahrirlash' : 'Yangi Mahsulot Joylash'}
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

            {/* Quick Presets */}
            {!editingProduct && (
              <div className="flex items-center gap-2 pb-1 overflow-x-auto text-[11px]">
                <span className="text-slate-400 font-bold shrink-0">Shablon:</span>
                <button
                  type="button"
                  onClick={() => {
                    setProdTitle('Samsung Smart TV Neo QLED 65" 4K');
                    setProdCategory('cat_tv');
                    setProdPrice('1450');
                    setProdOldPrice('1690');
                    setProdStock('8');
                    setProdImage('/images/tv_samsung_neo_qled.jpg');
                    setProdDesc('Premium Quantum Matrix, 144Hz, HDR2000 smart televizor');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold hover:bg-purple-500/30 transition shrink-0 cursor-pointer"
                >
                  📺 Smart TV
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProdTitle('Apple iPhone 16 Pro Max 256GB Desert Titanium');
                    setProdCategory('cat_smartphones');
                    setProdPrice('1399');
                    setProdOldPrice('1550');
                    setProdStock('12');
                    setProdImage('https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop');
                    setProdDesc('A18 Pro chip, titan korpus va 5x optik zoom kamerasi');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold hover:bg-cyan-500/30 transition shrink-0 cursor-pointer"
                >
                  📱 iPhone 16
                </button>
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Mahsulot Nomi *
                </label>
                <input
                  type="text"
                  required
                  value={prodTitle}
                  onChange={(e) => setProdTitle(e.target.value)}
                  placeholder="Masalan: Samsung Galaxy S25 Ultra"
                  className="w-full p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Kategoriya
                  </label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500"
                  >
                    <option value="cat_smartphones">Smartfonlar</option>
                    <option value="cat_laptops">Noutbuklar</option>
                    <option value="cat_tv">Smart Televizorlar</option>
                    <option value="cat_audio">Audio & Quloqchinlar</option>
                    <option value="cat_accessories">Aksessuarlar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Narxi ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="1200"
                    className="w-full p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Eski Narx ($)
                  </label>
                  <input
                    type="number"
                    value={prodOldPrice}
                    onChange={(e) => setProdOldPrice(e.target.value)}
                    placeholder="1350"
                    className="w-full p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">
                    Omborda (Dona) *
                  </label>
                  <input
                    type="number"
                    value={prodStock}
                    onChange={(e) => setProdStock(e.target.value)}
                    placeholder="10"
                    className="w-full p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Rasm Havolasi (URL)
                </label>
                <input
                  type="text"
                  value={prodImage}
                  onChange={(e) => setProdImage(e.target.value)}
                  placeholder="https://images.unsplash.com/... yoki /images/..."
                  className="w-full p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">
                  Tavsif
                </label>
                <textarea
                  rows="2"
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Mahsulot haqida ma'lumot..."
                  className="w-full p-2.5 rounded-xl bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-amber-500"
                ></textarea>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#1e2740]">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0a0f1d] text-slate-300 font-bold hover:bg-[#162035] transition"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/20 transition cursor-pointer"
                >
                  {editingProduct ? 'Saqlash' : 'Tovar Qo\'shish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: INVOICE RECEIPT */}
      {isInvoiceModalOpen && viewingOrder && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsInvoiceModalOpen(false);
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto"
        >
          <div className="bg-[#12182a] rounded-3xl max-w-lg w-full p-6 border border-[#1e2740] shadow-2xl space-y-4 text-white max-h-[90vh] overflow-y-auto my-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-[#1e2740] pb-3">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base text-white">Rasmiy Xarid Cheki</h3>
              </div>
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-white text-slate-900 rounded-2xl font-mono text-xs space-y-3">
              <div className="text-center border-b border-dashed border-slate-300 pb-2">
                <h4 className="font-extrabold text-sm">VOV SHOP ULTRA</h4>
                <p className="text-[10px] text-slate-600">Loyiha Egasi: Xabibullo Raxmatjonov</p>
                <p className="text-[10px] text-slate-500">Buyurtma ID: #{viewingOrder.id}</p>
                <p className="text-[10px] text-slate-500">Sana: {viewingOrder.formattedDate || viewingOrder.date}</p>
              </div>

              <div className="space-y-1 text-[11px]">
                <div><b>Mijoz:</b> {viewingOrder.customer?.fullName}</div>
                <div><b>Telefon:</b> {viewingOrder.customer?.phone}</div>
                <div><b>Manzil:</b> {viewingOrder.customer?.address}</div>
                <div><b>To'lov:</b> {viewingOrder.customer?.paymentMethod?.toUpperCase()}</div>
              </div>

              <div className="border-t border-b border-dashed border-slate-300 py-2 space-y-1.5">
                {(viewingOrder.items || []).map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[11px]">
                    <span className="truncate max-w-[220px]">{item.product?.title} (x{item.quantity})</span>
                    <span className="font-bold">${((item.product?.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-extrabold text-sm pt-1">
                <span>JAMI SUMMA:</span>
                <span>${viewingOrder.totalAmount?.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Chop etish</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: TELEGRAM BROADCAST */}
      {isBroadcastModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsBroadcastModalOpen(false);
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in overflow-y-auto"
        >
          <div className="bg-[#12182a] rounded-3xl max-w-md w-full p-6 border border-sky-500/30 shadow-2xl space-y-4 text-white max-h-[90vh] overflow-y-auto my-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-[#1e2740] pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-sky-400" />
                <h3 className="font-extrabold text-base text-white">Telegram Ommaviy E'lon</h3>
              </div>
              <button
                onClick={() => setIsBroadcastModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-400">
                Ushbu xabar Telegram kanalingiz yoki botingizdagi mijozlarga Loyiha Egasi imzosi bilan yuboriladi.
              </p>
              <textarea
                rows="4"
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="E'lon matnini yozing (masalan: Yangi Samsung Smart TV va iPhone 16 flagmanlariga 20% chegirma boshlandi!)..."
                className="w-full p-3 rounded-xl bg-[#0a0f1d] border border-[#1e2740] text-white outline-none focus:border-sky-500"
              ></textarea>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#1e2740]">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#0a0f1d] text-slate-300 font-bold hover:bg-[#162035] transition"
                >
                  Bekor qilish
                </button>
                <button
                  type="button"
                  disabled={isBroadcasting || !broadcastMessage.trim()}
                  onClick={handleSendBroadcast}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-xs hover:opacity-95 transition disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isBroadcasting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>{isBroadcasting ? "Yuborilmoqda..." : "E'lonni Tarqatish"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: IMAGE PREVIEW */}
      {previewImageModal && (
        <div
          onClick={() => setPreviewImageModal(null)}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative max-w-2xl max-h-[85vh]">
            <button
              onClick={() => setPreviewImageModal(null)}
              className="absolute -top-10 right-0 p-1.5 rounded-full bg-slate-800 text-white hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImageModal}
              alt="Preview"
              className="max-h-[80vh] w-auto rounded-2xl shadow-2xl object-contain ring-2 ring-amber-500/30"
            />
          </div>
        </div>
      )}

    </div>
  );
}
