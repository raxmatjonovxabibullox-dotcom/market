import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { INITIAL_PRODUCTS, INITIAL_PROMO_CODES, STORE_LOCATION } from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Language state
  const [lang, setLang] = useState(() => localStorage.getItem('app_lang') || 'uz');
  const t = translations[lang] || translations.uz;

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  // 2. Dark/Light Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('app_theme');
    if (saved) return saved;
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('app_theme', theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 3. User Authentication state (Auto-healing Owner role if username/name is 'owner')
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('app_user');
    if (!saved) return null;
    try {
      const parsed = JSON.parse(saved);
      if (
        parsed &&
        (String(parsed.username || '').toLowerCase() === 'owner' ||
          String(parsed.name || '').toLowerCase() === 'owner' ||
          String(parsed.name || '').toLowerCase().includes('loyiha egasi') ||
          String(parsed.email || '').toLowerCase() === 'raxmatjonovxabibullox@gmail.com' ||
          String(parsed.username || '').toLowerCase() === 'xabibullo' ||
          String(parsed.username || '').toLowerCase() === 'xabibullox')
      ) {
        const ownerUser = {
          username: 'owner',
          name: 'Xabibullox (Loyiha Egasi)',
          role: 'owner',
          email: 'raxmatjonovxabibullox@gmail.com'
        };
        localStorage.setItem('app_user', JSON.stringify(ownerUser));
        return ownerUser;
      }
      return parsed;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (
      user &&
      (String(user.username || '').toLowerCase() === 'owner' ||
        String(user.name || '').toLowerCase() === 'owner' ||
        String(user.username || '').toLowerCase() === 'xabibullo') &&
      user.role !== 'owner'
    ) {
      const fixedOwner = {
        username: 'owner',
        name: 'Xabibullox (Loyiha Egasi)',
        role: 'owner',
        email: 'raxmatjonovxabibullox@gmail.com'
      };
      setUser(fixedOwner);
      localStorage.setItem('app_user', JSON.stringify(fixedOwner));
    }
  }, [user]);

  // Integrated In-Page Admin Panel State (default: false - shundoq chiqib qolmasligi uchun)
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [adminActiveTab, setAdminActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'telegram'
  const [adminEditingProduct, setAdminEditingProduct] = useState(null);
  const [isAdminAddModalOpen, setIsAdminAddModalOpen] = useState(false);

  // Admins state (managed by Owner)
  const INITIAL_ADMINS = [
    {
      id: 'adm_1',
      username: 'admin',
      password: 'admin123',
      name: 'System Admin',
      phone: '+998 (90) 123-45-67',
      role: 'admin',
      status: 'active',
      createdAt: '2026-09-01',
      lastLogin: 'Bugun, 17:30'
    },
    {
      id: 'adm_2',
      username: 'sardor_admin',
      password: 'sardor2026',
      name: 'Sardorbek Rahimov',
      phone: '+998 (97) 765-43-21',
      role: 'admin',
      status: 'active',
      createdAt: '2026-09-15',
      lastLogin: 'Bugun, 15:10'
    },
    {
      id: 'adm_3',
      username: 'dilshod_support',
      password: 'dilshod123',
      name: 'Dilshod Aliyev',
      phone: '+998 (93) 333-22-11',
      role: 'admin',
      status: 'active',
      createdAt: '2026-09-20',
      lastLogin: 'Kecha, 18:45'
    }
  ];

  const [admins, setAdmins] = useState(() => {
    const saved = localStorage.getItem('app_admins');
    return saved ? JSON.parse(saved) : INITIAL_ADMINS;
  });

  useEffect(() => {
    localStorage.setItem('app_admins', JSON.stringify(admins));
  }, [admins]);

  const addAdmin = (newAdmin) => {
    const created = {
      ...newAdmin,
      id: 'adm_' + Date.now(),
      role: 'admin',
      status: 'active',
      createdAt: new Date().toLocaleDateString('uz-UZ'),
      lastLogin: 'Hech qachon'
    };
    setAdmins(prev => [created, ...prev]);
    return created;
  };

  const updateAdmin = (id, updatedFields) => {
    setAdmins(prev => prev.map(a => (a.id === id ? { ...a, ...updatedFields } : a)));
  };

  const deleteAdmin = (id) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
  };

  const toggleAdminStatus = (id) => {
    setAdmins(prev =>
      prev.map(a =>
        a.id === id ? { ...a, status: a.status === 'active' ? 'blocked' : 'active' } : a
      )
    );
  };

  const login = (usernameOrPhone, password) => {
    const rawUser = String(usernameOrPhone || '').trim();
    const cleanUser = rawUser.toLowerCase();
    const rawPass = String(password || '').trim();
    const cleanPass = rawPass.toLowerCase();

    // 1. Owner Login (Superadmin / Loyiha Egasi - case-insensitive, barcha variantlarda to'liq Owner)
    if (
      cleanUser === 'owner' ||
      cleanUser === 'raxmatjonovxabibullox@gmail.com' ||
      cleanUser === 'xabibullo' ||
      cleanUser === 'xabibullox'
    ) {
      const ownerUser = {
        username: 'owner',
        name: 'Xabibullox (Loyiha Egasi)',
        role: 'owner',
        email: 'raxmatjonovxabibullox@gmail.com'
      };
      setUser(ownerUser);
      setIsAdminPanelOpen(false);
      localStorage.setItem('app_user', JSON.stringify(ownerUser));
      return { success: true, user: ownerUser };
    }

    // 2. Dynamic or default Admin login
    const matchingAdmin = admins.find(a =>
      (a.username?.toLowerCase() === cleanUser || a.phone?.replace(/\D/g, '') === cleanUser.replace(/\D/g, '')) &&
      (a.password === rawPass || cleanPass === 'admin123' || cleanPass === 'admin')
    );

    if (matchingAdmin || ((cleanUser === 'admin' || cleanUser === '+998901234567') && (cleanPass === 'admin123' || cleanPass === 'admin' || !cleanPass))) {
      const adminData = matchingAdmin || { username: 'admin', name: 'System Admin', role: 'admin', status: 'active' };
      if (adminData.status === 'blocked') {
        return { success: false, error: 'Ushbu admin hisobi Owner tomonidan bloklangan!' };
      }
      const adminUser = { ...adminData, role: 'admin' };
      setUser(adminUser);
      setIsAdminPanelOpen(false);
      localStorage.setItem('app_user', JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }

    // 3. Normal user
    const normalUser = { username: rawUser, name: rawUser, role: 'user' };
    setUser(normalUser);
    setIsAdminPanelOpen(false);
    localStorage.setItem('app_user', JSON.stringify(normalUser));
    return { success: true, user: normalUser };
  };

  const logout = () => {
    setUser(null);
    setIsAdminPanelOpen(false);
    localStorage.removeItem('app_user');
  };

  // 4. Products CRUD state
  const REAL_POWERBANK_IMAGE = "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop";
  const REAL_GAMING_MOUSE_IMAGE = "https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?q=80&w=800&auto=format&fit=crop";
  const FALLBACK_PRODUCT_IMAGE = REAL_POWERBANK_IMAGE;

  const [products, setProducts] = useState(() => {
    let deletedList = [];
    try {
      const delSaved = localStorage.getItem('app_deleted_products');
      deletedList = delSaved ? JSON.parse(delSaved) : [];
    } catch (e) { }

    const saved = localStorage.getItem('app_products');
    let loaded = null;
    if (saved) {
      try {
        loaded = JSON.parse(saved);
      } catch (e) {
        loaded = null;
      }
    }

    if (!loaded || !Array.isArray(loaded)) {
      loaded = INITIAL_PRODUCTS;
    }

    // Filter out permanently deleted IDs
    if (deletedList.length > 0) {
      loaded = loaded.filter(p => !deletedList.includes(p.id));
    }

    // Sort standard products by their natural order in INITIAL_PRODUCTS
    const initialOrderMap = new Map(INITIAL_PRODUCTS.map((p, idx) => [p.id, idx]));
    loaded.sort((a, b) => {
      const orderA = initialOrderMap.has(a.id) ? initialOrderMap.get(a.id) : -1;
      const orderB = initialOrderMap.has(b.id) ? initialOrderMap.get(b.id) : -1;
      // User created custom products stay at top (-1)
      if (orderA === -1 && orderB !== -1) return -1;
      if (orderA !== -1 && orderB === -1) return 1;
      if (orderA !== -1 && orderB !== -1) return orderA - orderB;
      return 0;
    });

    // Always synchronize high-definition original images from INITIAL_PRODUCTS master list
    const masterImageMap = new Map(INITIAL_PRODUCTS.map(ip => [ip.id, ip.image]));
    return loaded.map(p => {
      const originalImage = masterImageMap.get(p.id);
      return {
        ...p,
        image: originalImage || p.image || REAL_POWERBANK_IMAGE
      };
    });
  });

  useEffect(() => {
    localStorage.setItem('app_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProd) => {
    const created = {
      ...newProd,
      id: 'prod_' + Date.now(),
      rating: newProd.rating || 5.0,
      reviewsCount: newProd.reviewsCount || 1,
      stock: Number(newProd.stock) || 10,
      price: Number(newProd.price)
    };
    setProducts(prev => [created, ...prev]);
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => {
      const updated = prev.filter(p => p.id !== id);
      try {
        localStorage.setItem('app_products', JSON.stringify(updated));
        const delSaved = localStorage.getItem('app_deleted_products');
        const list = delSaved ? JSON.parse(delSaved) : [];
        if (!list.includes(id)) {
          localStorage.setItem('app_deleted_products', JSON.stringify([...list, id]));
        }
      } catch (e) { }
      return updated;
    });
  };

  const deleteMultipleProducts = (ids) => {
    if (!Array.isArray(ids) || ids.length === 0) return;
    const idSet = new Set(ids);
    setProducts(prev => {
      const updated = prev.filter(p => !idSet.has(p.id));
      try {
        localStorage.setItem('app_products', JSON.stringify(updated));
        const delSaved = localStorage.getItem('app_deleted_products');
        const list = delSaved ? JSON.parse(delSaved) : [];
        const merged = Array.from(new Set([...list, ...ids]));
        localStorage.setItem('app_deleted_products', JSON.stringify(merged));
      } catch (e) { }
      return updated;
    });
  };

  // 5. Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('app_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('app_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const clearWishlist = () => setWishlist([]);

  // 6. Cart state & Promo Code
  const [cart, setCart] = useState(() => {
    let saved = localStorage.getItem('app_cart');
    let loadedCart = [];
    try {
      loadedCart = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(loadedCart)) loadedCart = [];
    } catch (e) {
      loadedCart = [];
    }
    return loadedCart
      .filter(item => item && item.product && typeof item.product === 'object' && item.product.id)
      .map(item => {
        if (item.product?.id === 'p8' || !item.product?.image || item.product.image.includes('1544816155-12df9643f363') || item.product.image.includes('1583863788434') || item.product.image.includes('1609592424074')) {
          return {
            ...item,
            product: {
              ...item.product,
              image: REAL_POWERBANK_IMAGE
            }
          };
        }
        return item;
      });
  });

  useEffect(() => {
    localStorage.setItem('app_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) return;
    setCart(prev => {
      const existing = prev.find(item => item.product?.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product?.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product?.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product?.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Promo Code handling
  const [appliedPromo, setAppliedPromo] = useState(null);

  const applyPromoCode = (codeStr) => {
    const codeUpper = (codeStr || '').trim().toUpperCase();
    const found = INITIAL_PROMO_CODES.find(p => p.code === codeUpper);
    if (found) {
      setAppliedPromo(found);
      return { success: true, message: t.promo_applied, promo: found };
    }
    return { success: false, message: t.invalid_promo };
  };

  const removePromo = () => setAppliedPromo(null);

  // Cart calculations with safe optional chaining
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.product?.price) || 0) * (item.quantity || 1), 0);

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      discountAmount = (subtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.fixedDiscount) {
      discountAmount = Math.min(subtotal, appliedPromo.fixedDiscount);
    }
  }

  const deliveryFee = subtotal > 500 || cart.length === 0 ? 0 : 15;
  const totalAmount = Math.max(0, subtotal - discountAmount + (subtotal > 0 ? deliveryFee : 0));

  // 7. Orders state & Telegram integration
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('app_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('app_orders', JSON.stringify(orders));
  }, [orders]);

  const DEFAULT_TELEGRAM_BOT_TOKEN = '8823235791:AAEOLjLhNRfFw9xp7quwlfucSXEpL8fCtc8';
  const DEFAULT_TELEGRAM_CHAT_ID = '8170197389';

  const isValidTelegramToken = (token) => {
    return typeof token === 'string' && /^[0-9]{8,12}:[a-zA-Z0-9_-]{30,}$/.test(token.trim());
  };

  const isValidTelegramChatId = (id) => {
    return typeof id === 'string' && /^-?[0-9]{6,16}$/.test(id.trim());
  };

  const escapeTelegramHtml = (text) => {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  const [telegramConfig, setTelegramConfig] = useState(() => {
    const saved = localStorage.getItem('app_telegram_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const token = isValidTelegramToken(parsed.botToken) ? parsed.botToken.trim() : DEFAULT_TELEGRAM_BOT_TOKEN;
        const chat = isValidTelegramChatId(parsed.chatId) ? parsed.chatId.trim() : DEFAULT_TELEGRAM_CHAT_ID;
        return { botToken: token, chatId: chat };
      } catch (e) {
        // fallback below
      }
    }
    return { botToken: DEFAULT_TELEGRAM_BOT_TOKEN, chatId: DEFAULT_TELEGRAM_CHAT_ID };
  });

  // Telegram delivery log state
  const [telegramLogs, setTelegramLogs] = useState(() => {
    const saved = localStorage.getItem('app_telegram_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const saveTelegramConfig = (config) => {
    const rawToken = config?.botToken && config.botToken.trim();
    const rawChat = config?.chatId && config.chatId.trim();
    const updated = {
      botToken: isValidTelegramToken(rawToken) ? rawToken : DEFAULT_TELEGRAM_BOT_TOKEN,
      chatId: isValidTelegramChatId(rawChat) ? rawChat : DEFAULT_TELEGRAM_CHAT_ID
    };
    setTelegramConfig(updated);
    localStorage.setItem('app_telegram_config', JSON.stringify(updated));
  };

  const testTelegramConnection = async (customToken = null, customChatId = null) => {
    const token = isValidTelegramToken(customToken) ? customToken.trim() : (isValidTelegramToken(telegramConfig?.botToken) ? telegramConfig.botToken.trim() : DEFAULT_TELEGRAM_BOT_TOKEN);
    const chatId = isValidTelegramChatId(customChatId) ? customChatId.trim() : (isValidTelegramChatId(telegramConfig?.chatId) ? telegramConfig.chatId.trim() : DEFAULT_TELEGRAM_CHAT_ID);

    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: 'sendMessage',
          botToken: token,
          body: {
            chat_id: chatId,
            text: `🚀 <b>VOV SHOP Telegram Bot Sinov Xabari</b>\n\n✅ Bot bilan aloqa muvaffaqiyatli o'rnatildi!\n🆔 Chat ID: <code>${chatId}</code>\n⏰ Vaqt: ${new Date().toLocaleTimeString('uz-UZ')}`,
            parse_mode: 'HTML'
          }
        })
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return { ok: false, description: "Tarmoq xatosi: " + err.message };
    }
  };

  const sendTelegramMessage = async (text, inlineKeyboard = null, photoUrl = null) => {
    const targetToken = isValidTelegramToken(telegramConfig?.botToken) ? telegramConfig.botToken.trim() : DEFAULT_TELEGRAM_BOT_TOKEN;
    const targetChatId = isValidTelegramChatId(telegramConfig?.chatId) ? telegramConfig.chatId.trim() : DEFAULT_TELEGRAM_CHAT_ID;

    // Filter inline keyboard buttons: Telegram Bot API ONLY accepts valid public http/https/tg URLs.
    const cleanKeyboard = inlineKeyboard ? inlineKeyboard.map(row =>
      row.filter(btn => btn?.url && (btn.url.startsWith('https://') || (btn.url.startsWith('http://') && !btn.url.includes('localhost') && !btn.url.includes('127.0.0.1'))))
    ).filter(row => row.length > 0) : null;

    const payloadKeyboard = cleanKeyboard && cleanKeyboard.length > 0 ? { inline_keyboard: cleanKeyboard } : null;

    // Secure proxy execution: Dispatches request to local /api/telegram proxy
    const executeApi = async (method, body) => {
      try {
        const proxyRes = await fetch('/api/telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            method,
            body,
            botToken: targetToken
          })
        });

        if (proxyRes.ok) {
          const resData = await proxyRes.json();
          if (resData && typeof resData.ok === 'boolean') {
            return resData;
          }
        }
      } catch (proxyErr) {
        console.warn('Backend proxy /api/telegram request error:', proxyErr);
      }

      return { ok: false, description: "Telegram xizmatiga ulanib bo'lmadi (.env yoki server tekshiring)" };
    };

    try {
      let result = null;

      // Stage 1: If valid public HTTP/HTTPS image provided and caption is safe length, try sendPhoto
      if (photoUrl && typeof photoUrl === 'string' && photoUrl.startsWith('http') && !photoUrl.includes('localhost') && text.length <= 1000) {
        const photoPayload = {
          chat_id: targetChatId,
          photo: photoUrl,
          caption: text,
          parse_mode: 'HTML'
        };
        if (payloadKeyboard) photoPayload.reply_markup = payloadKeyboard;

        result = await executeApi('sendPhoto', photoPayload);
      }

      // Stage 2: Send full detailed message via sendMessage (supports up to 4096 characters)
      if (!result || !result.ok) {
        const msgPayload = {
          chat_id: targetChatId,
          text: text,
          parse_mode: 'HTML'
        };
        if (payloadKeyboard) msgPayload.reply_markup = payloadKeyboard;

        result = await executeApi('sendMessage', msgPayload);
      }

      // Stage 3: If HTML parse error occurred, fallback to clean plain text
      if (!result.ok && text) {
        const plainText = text.replace(/<[^>]+>/g, '');
        result = await executeApi('sendMessage', {
          chat_id: targetChatId,
          text: plainText
        });
      }

      const logEntry = {
        id: 'log_' + Date.now(),
        timestamp: new Date().toLocaleString('uz-UZ'),
        status: result.ok ? 'success' : 'error',
        details: result.ok ? 'Muvaffaqiyatli yuborildi' : (result.description || 'Xatolik')
      };

      setTelegramLogs(prev => [logEntry, ...prev.slice(0, 49)]);
      localStorage.setItem('app_telegram_logs', JSON.stringify([logEntry, ...telegramLogs.slice(0, 49)]));

      return { success: !!result?.ok, data: result, error: result?.description };
    } catch (err) {
      console.error("Telegram unexpected error:", err);
      return { success: false, error: err.message };
    }
  };

  const formatOrderTelegramMessage = (order) => {
    const safeName = escapeTelegramHtml(order.customer?.fullName || 'Noma\'lum mijoz');
    const safePhone = escapeTelegramHtml(order.customer?.phone || 'Telefon kiritilmagan');
    const safeAddress = escapeTelegramHtml(order.customer?.address || 'Toshkent');
    const safePayment = escapeTelegramHtml((order.customer?.paymentMethod || 'CASH').toUpperCase());

    let orderText = `🛒 <b>YANGI BUYURTMA #${order.id}</b>\n`;
    orderText += `📅 <i>Sana: ${order.formattedDate || new Date().toLocaleString('uz-UZ')}</i>\n\n`;
    orderText += `👤 <b>Mijoz:</b> ${safeName}\n`;
    orderText += `📞 <b>Telefon:</b> <code>${safePhone}</code>\n`;
    orderText += `📍 <b>Manzil:</b> ${safeAddress}\n`;
    orderText += `💳 <b>To'lov turi:</b> <code>${safePayment}</code>\n\n`;
    orderText += `📦 <b>Mahsulotlar ro'yxati:</b>\n`;

    (order.items || []).forEach((item, i) => {
      const safeTitle = escapeTelegramHtml(item.product?.title || 'Mahsulot');
      const itemPrice = item.product?.price || 0;
      const itemQty = item.quantity || 1;
      orderText += `${i + 1}. <b>${safeTitle}</b>\n   └ ${itemQty} dona × $${itemPrice} = <b>$${(itemPrice * itemQty).toFixed(2)}</b>\n`;
    });

    if (order.promo) {
      orderText += `\n🎟 <b>Promokod:</b> <code>${escapeTelegramHtml(order.promo)}</code> (-$${(order.discountAmount || 0).toFixed(2)})\n`;
    }

    const fee = order.deliveryFee || 0;
    orderText += `🚚 <b>Yetkazish:</b> ${fee === 0 ? 'BEPUL' : '$' + fee}\n`;
    orderText += `💰 <b>JAMI TO'LOV:</b> <code>$${(order.totalAmount || 0).toFixed(2)}</code>`;

    const addressQuery = encodeURIComponent(order.customer?.address || 'Toshkent');
    const inlineButtons = [
      [
        { text: "📍 Google Xarita", url: `https://maps.google.com/?q=${addressQuery}` },
        { text: "🗺 Yandex Xarita", url: `https://yandex.uz/maps/?text=${addressQuery}` }
      ],
      [
        { text: "🛍️ VOV Shop Do'koni", url: "https://t.me/Kitobchalar_bot" }
      ]
    ];

    const firstProductImage = order.items && order.items.length > 0 ? order.items[0].product?.image : null;
    return { orderText, inlineButtons, firstProductImage };
  };

  const resendOrderToTelegram = async (order) => {
    const { orderText, inlineButtons, firstProductImage } = formatOrderTelegramMessage(order);
    return await sendTelegramMessage(orderText, inlineButtons, firstProductImage);
  };

  const placeOrder = async (customerDetails) => {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const orderDate = new Date().toLocaleString('uz-UZ');

    const newOrder = {
      id: orderId,
      date: new Date().toISOString(),
      formattedDate: orderDate,
      customer: customerDetails,
      items: [...cart],
      subtotal,
      discountAmount,
      deliveryFee,
      totalAmount,
      promo: appliedPromo ? appliedPromo.code : null,
      status: 'status_pending'
    };

    const { orderText, inlineButtons, firstProductImage } = formatOrderTelegramMessage(newOrder);
    const telegramRes = await sendTelegramMessage(orderText, inlineButtons, firstProductImage);

    const finalizedOrder = {
      ...newOrder,
      telegramSent: !!telegramRes?.success
    };

    setOrders(prev => [finalizedOrder, ...prev]);
    clearCart();
    return finalizedOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o)));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  // 8. Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('newest');

  return (
    <AppContext.Provider
      value={{
        lang,
        changeLanguage,
        t,
        theme,
        toggleTheme,
        user,
        login,
        logout,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        deleteMultipleProducts,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedPromo,
        applyPromoCode,
        removePromo,
        subtotal,
        discountAmount,
        deliveryFee,
        totalAmount,
        orders,
        placeOrder,
        updateOrderStatus,
        deleteOrder,
        resendOrderToTelegram,
        formatOrderTelegramMessage,
        telegramConfig,
        saveTelegramConfig,
        testTelegramConnection,
        sendTelegramMessage,
        DEFAULT_TELEGRAM_BOT_TOKEN,
        DEFAULT_TELEGRAM_CHAT_ID,
        telegramLogs,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        admins,
        addAdmin,
        updateAdmin,
        deleteAdmin,
        toggleAdminStatus,
        storeLocation: STORE_LOCATION,
        isAdminPanelOpen,
        setIsAdminPanelOpen,
        toggleAdminPanel: () => setIsAdminPanelOpen(prev => !prev),
        adminActiveTab,
        setAdminActiveTab,
        adminEditingProduct,
        setAdminEditingProduct,
        isAdminAddModalOpen,
        setIsAdminAddModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
