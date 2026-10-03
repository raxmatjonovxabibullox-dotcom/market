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
  const [theme, setTheme] = useState(() => localStorage.getItem('app_theme') || 'light');

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

  // 3. User Authentication state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('app_user');
    return saved ? JSON.parse(saved) : null;
  });

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
    // 1. Owner Login (Superadmin / Loyiha Egasi)
    if (
      (usernameOrPhone === 'owner' || usernameOrPhone === 'raxmatjonovxabibullox@gmail.com') &&
      (password === 'owner123' || password === 'owner')
    ) {
      const ownerUser = {
        username: usernameOrPhone,
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
      (a.username === usernameOrPhone || a.phone === usernameOrPhone) &&
      (a.password === password)
    );

    if (matchingAdmin || ((usernameOrPhone === 'admin' || usernameOrPhone === '+998901234567') && password === 'admin123')) {
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
    const normalUser = { username: usernameOrPhone, name: usernameOrPhone, role: 'user' };
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
    const saved = localStorage.getItem('app_products');
    let loaded = saved ? JSON.parse(saved) : INITIAL_PRODUCTS;

    // Automatically append any new assortment products from INITIAL_PRODUCTS
    if (loaded) {
      const existingIds = new Set(loaded.map(p => p.id));
      const missing = INITIAL_PRODUCTS.filter(p => !existingIds.has(p.id));
      if (missing.length > 0) {
        loaded = [...loaded, ...missing];
      }
    }

    return loaded.map(p => {
      if (p.id === 'p8' || !p.image || p.image.includes('1544816155-12df9643f363') || p.image.includes('1583863788434') || p.image.includes('1609592424074')) {
        return { ...p, image: REAL_POWERBANK_IMAGE };
      }
      if (p.id === 'p24' || (p.image && p.image.includes('1626806787461'))) {
        return { ...p, image: REAL_GAMING_MOUSE_IMAGE };
      }
      return p;
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
    setProducts(prev => prev.filter(p => p.id !== id));
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
    const saved = localStorage.getItem('app_cart');
    const loadedCart = saved ? JSON.parse(saved) : [];
    return loadedCart.map(item => {
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
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.product.id === productId) {
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
    const codeUpper = codeStr.trim().toUpperCase();
    const found = INITIAL_PROMO_CODES.find(p => p.code === codeUpper);
    if (found) {
      setAppliedPromo(found);
      return { success: true, message: t.promo_applied, promo: found };
    }
    return { success: false, message: t.invalid_promo };
  };

  const removePromo = () => setAppliedPromo(null);

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

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

  const [telegramConfig, setTelegramConfig] = useState(() => {
    const saved = localStorage.getItem('app_telegram_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          botToken: parsed.botToken || '',
          chatId: parsed.chatId && parsed.chatId !== '123456789' && parsed.chatId !== '@Kitobchalar_bot' ? parsed.chatId : '8170197389'
        };
      } catch (e) {
        // fallback below
      }
    }
    return { botToken: '', chatId: '8170197389' };
  });



  // Telegram delivery log state
  const [telegramLogs, setTelegramLogs] = useState(() => {
    const saved = localStorage.getItem('app_telegram_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const saveTelegramConfig = (config) => {
    setTelegramConfig(config);
    localStorage.setItem('app_telegram_config', JSON.stringify(config));
  };

  const sendTelegramMessage = async (text, inlineKeyboard = null, photoUrl = null) => {
    if (!telegramConfig.chatId) {
      return { success: false, error: "Chat ID belgilanmagan" };
    }

    // Filter inline keyboard buttons: Telegram Bot API ONLY accepts valid public http/https/tg URLs.
    // It rejects 'tel:', 'http://localhost', etc.
    const cleanKeyboard = inlineKeyboard ? inlineKeyboard.map(row =>
      row.filter(btn => btn?.url && (btn.url.startsWith('https://') || (btn.url.startsWith('http://') && !btn.url.includes('localhost') && !btn.url.includes('127.0.0.1'))))
    ).filter(row => row.length > 0) : null;

    const payloadKeyboard = cleanKeyboard && cleanKeyboard.length > 0 ? { inline_keyboard: cleanKeyboard } : null;

    // Secure proxy execution: Hides Bot Token from DevTools Network & Sources!
    const executeApi = async (method, body) => {
      // 1. First priority: Server-side proxy (/api/telegram)
      // DevTools will only see /api/telegram without any Bot Token in URL or headers
      try {
        const proxyRes = await fetch('/api/telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            method,
            body,
            ...(telegramConfig.botToken ? { botToken: telegramConfig.botToken } : {})
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

      // 2. Direct fallback (only if admin manually specified a custom botToken in dashboard)
      if (telegramConfig.botToken) {
        try {
          const res = await fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/${method}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          });
          return await res.json();
        } catch (e) {
          return { ok: false, description: e.message };
        }
      }

      return { ok: false, description: "Telegram xizmatiga ulanib bo'lmadi (.env yoki botToken tekshiring)" };
    };

    try {
      let result = null;

      // Stage 1: Try sendPhoto with formatted caption and buttons if photoUrl is valid
      if (photoUrl && typeof photoUrl === 'string' && photoUrl.startsWith('http')) {
        const photoPayload = {
          chat_id: telegramConfig.chatId,
          photo: photoUrl,
          caption: text.length > 1024 ? text.substring(0, 1020) + '...' : text,
          parse_mode: 'HTML'
        };
        if (payloadKeyboard) photoPayload.reply_markup = payloadKeyboard;

        result = await executeApi('sendPhoto', photoPayload);
        if (!result.ok) {
          console.warn("Telegram sendPhoto with buttons failed, retrying without buttons:", result.description);
          // Retry sendPhoto without buttons in case buttons caused issue
          result = await executeApi('sendPhoto', {
            chat_id: telegramConfig.chatId,
            photo: photoUrl,
            caption: text.length > 1024 ? text.substring(0, 1020) + '...' : text,
            parse_mode: 'HTML'
          });
        }
      }

      // Stage 2: If photo was not provided or failed, send via sendMessage
      if (!result || !result.ok) {
        const msgPayload = {
          chat_id: telegramConfig.chatId,
          text: text,
          parse_mode: 'HTML'
        };
        if (payloadKeyboard) msgPayload.reply_markup = payloadKeyboard;

        result = await executeApi('sendMessage', msgPayload);
      }

      // Stage 3: If still failed (e.g. malformed HTML or rejected button), fallback to simple plain text
      if (!result.ok) {
        const plainText = text.replace(/<[^>]+>/g, '');
        result = await executeApi('sendMessage', {
          chat_id: telegramConfig.chatId,
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

      return { success: result.ok, data: result, error: result.description };
    } catch (err) {
      console.error("Telegram unexpected error:", err);
      return { success: false, error: err.message };
    }
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

    setOrders(prev => [newOrder, ...prev]);

    // Format rich HTML message for Telegram Bot notification
    let orderText = `🛒 <b>YANGI BUYURTMA #${orderId}</b>\n`;
    orderText += `📅 <i>Sana: ${orderDate}</i>\n\n`;
    orderText += `👤 <b>Mijoz:</b> ${customerDetails.fullName}\n`;
    orderText += `📞 <b>Telefon:</b> <code>${customerDetails.phone}</code>\n`;
    orderText += `📍 <b>Manzil:</b> ${customerDetails.address}\n`;
    orderText += `💳 <b>To'lov turi:</b> <code>${customerDetails.paymentMethod.toUpperCase()}</code>\n\n`;
    orderText += `📦 <b>Mahsulotlar ro'yxati:</b>\n`;

    cart.forEach((item, i) => {
      orderText += `${i + 1}. <b>${item.product.title}</b>\n   └ ${item.quantity} dona × $${item.product.price} = <b>$${(item.product.price * item.quantity).toFixed(2)}</b>\n`;
    });

    if (appliedPromo) {
      orderText += `\n🎟 <b>Promokod:</b> <code>${appliedPromo.code}</code> (-$${discountAmount.toFixed(2)})\n`;
    }

    orderText += `🚚 <b>Yetkazish:</b> ${deliveryFee === 0 ? 'BEPUL' : '$' + deliveryFee}\n`;
    orderText += `💰 <b>JAMI TO'LOV:</b> <code>$${totalAmount.toFixed(2)}</code>`;

    // Safe valid HTTPS inline buttons
    const addressQuery = encodeURIComponent(customerDetails.address || 'Toshkent');
    const inlineButtons = [
      [
        { text: "📍 Google Xarita", url: `https://maps.google.com/?q=${addressQuery}` },
        { text: "🗺 Yandex Xarita", url: `https://yandex.uz/maps/?text=${addressQuery}` }
      ],
      [
        { text: "🛍️ VOV Shop Do'koni", url: "https://github.com/raxmatjonovxabibullox-dotcom/magazin" }
      ]
    ];

    const firstProductImage = cart.length > 0 ? cart[0].product.image : null;
    const telegramRes = await sendTelegramMessage(orderText, inlineButtons, firstProductImage);

    clearCart();
    return { ...newOrder, telegramSent: telegramRes.success };
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
        telegramConfig,
        saveTelegramConfig,
        sendTelegramMessage,
        telegramLogs,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        priceRange,
        setPriceRange,
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
