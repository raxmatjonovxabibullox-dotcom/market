import React, { useState, useRef, useEffect } from 'react';
import { 
  Laptop, 
  Sparkles, 
  Download, 
  Send, 
  Sliders, 
  Layers, 
  Type, 
  Palette, 
  Image as ImageIcon, 
  Cpu, 
  Zap, 
  Flame, 
  Check, 
  RotateCcw, 
  Copy, 
  Eye, 
  Maximize2,
  Tag,
  ShieldCheck,
  Award,
  Share2,
  RefreshCw,
  Box,
  Monitor
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LaptopCanvaStudio() {
  const { products, sendTelegramMessage, t } = useApp();

  // Filter only laptop products from store
  const storeLaptops = products.filter(p => p.category === 'cat_laptops' || p.category === 'cat_gaming');

  // Canvas ref
  const canvasRef = useRef(null);

  // Canvas Format Size presets
  const [aspectRatio, setAspectRatio] = useState('1:1'); // '1:1' (1080x1080) | '16:9' (1920x1080) | '9:16' (1080x1920)
  
  // Selected Laptop Data
  const [selectedProduct, setSelectedProduct] = useState(storeLaptops[0] || {
    title: "MacBook Pro 16 M3 Max",
    price: 3499,
    oldPrice: 3799,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    specs: { CPU: "M3 Max 16-Core", GPU: "40-Core GPU", RAM: "36GB RAM", Screen: "Liquid Retina XDR" }
  });

  // Custom text states
  const [bannerTag, setBannerTag] = useState('⚡ PREMIUM FLAGSHIP 2026');
  const [bannerTitle, setBannerTitle] = useState(selectedProduct?.title || 'MacBook Pro 16 M3 Max');
  const [bannerSubtitle, setBannerSubtitle] = useState('Eng yuqori unumdorlik va mislsiz quvvat');
  const [bannerPrice, setBannerPrice] = useState(String(selectedProduct?.price || '3499'));
  const [bannerOldPrice, setBannerOldPrice] = useState(String(selectedProduct?.oldPrice || '3799'));
  const [badgeText, setBadgeText] = useState('CHEGIRMA -15%');
  
  // Specs pills
  const [spec1, setSpec1] = useState('Apple M3 Max Chip');
  const [spec2, setSpec2] = useState('40-Core GPU Monster');
  const [spec3, setSpec3] = useState('36GB Unified RAM');
  const [spec4, setSpec4] = useState('16.2" 120Hz XDR');

  // Effects & Styles state
  const [themeStyle, setThemeStyle] = useState('cyberpunk'); // 'cyberpunk' | 'apple-dark' | 'neon-future' | 'gaming-fire' | 'luxury-gold'
  const [glowIntensity, setGlowIntensity] = useState(70); // 0 to 100
  const [showPodium, setShowPodium] = useState(true);
  const [showParticles, setShowParticles] = useState(true);
  const [showCyberGrid, setShowCyberGrid] = useState(true);
  const [showReflection, setShowReflection] = useState(true);
  const [customLaptopImage, setCustomLaptopImage] = useState(selectedProduct?.image || '');
  
  // Export status states
  const [isExporting, setIsExporting] = useState(false);
  const [telegramStatus, setTelegramStatus] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Available Presets
  const presets = [
    {
      id: 'cyberpunk',
      name: 'Cyberpunk Neon',
      bgGradient: ['#090514', '#150930', '#030008'],
      glowColor: '#a855f7',
      accentColor: '#06b6d4',
      badgeColor: '#ec4899',
      tagColor: '#22d3ee',
      tag: '🔥 CYBER BEAST 2026'
    },
    {
      id: 'apple-dark',
      name: 'Apple Space Dark',
      bgGradient: ['#0f172a', '#020617', '#000000'],
      glowColor: '#6366f1',
      accentColor: '#38bdf8',
      badgeColor: '#6366f1',
      tagColor: '#818cf8',
      tag: '⚡ PRO WORKSTATION'
    },
    {
      id: 'gaming-fire',
      name: 'ROG Gaming Fire',
      bgGradient: ['#1a0505', '#2e0a0a', '#0a0000'],
      glowColor: '#ef4444',
      accentColor: '#f59e0b',
      badgeColor: '#dc2626',
      tagColor: '#f97316',
      tag: '🎮 MAXIMUM FPS GAMING'
    },
    {
      id: 'neon-future',
      name: 'Emerald Matrix',
      bgGradient: ['#021a12', '#03261a', '#010d09'],
      glowColor: '#10b981',
      accentColor: '#34d399',
      badgeColor: '#059669',
      tagColor: '#6ee7b7',
      tag: '⚡ ULTRA-EFFICIENCY'
    },
    {
      id: 'luxury-gold',
      name: 'Titanium Gold',
      bgGradient: ['#1c170d', '#2b2314', '#0d0a05'],
      glowColor: '#eab308',
      accentColor: '#fef08a',
      badgeColor: '#ca8a04',
      tagColor: '#fde047',
      tag: '👑 EXECUTIVE EDITION'
    }
  ];

  const currentPreset = presets.find(p => p.id === themeStyle) || presets[0];

  // When store laptop changes
  const handleSelectLaptop = (laptop) => {
    setSelectedProduct(laptop);
    setBannerTitle(laptop.title);
    setBannerPrice(String(laptop.price));
    setBannerOldPrice(String(laptop.oldPrice || Math.round(laptop.price * 1.15)));
    setCustomLaptopImage(laptop.image);

    if (laptop.specs) {
      const keys = Object.keys(laptop.specs);
      if (keys[0]) setSpec1(`${laptop.specs[keys[0]]}`);
      if (keys[1]) setSpec2(`${laptop.specs[keys[1]]}`);
      if (keys[2]) setSpec3(`${laptop.specs[keys[2]]}`);
      if (keys[3]) setSpec4(`${laptop.specs[keys[3]]}`);
    }
  };

  // Render to Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Canvas real resolution
    let width = 1080;
    let height = 1080;
    if (aspectRatio === '16:9') {
      width = 1920;
      height = 1080;
    } else if (aspectRatio === '9:16') {
      width = 1080;
      height = 1920;
    }

    canvas.width = width;
    canvas.height = height;

    // 1. Draw Background Gradient
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.8);
    bgGrad.addColorStop(0, currentPreset.bgGradient[1]);
    bgGrad.addColorStop(0.6, currentPreset.bgGradient[0]);
    bgGrad.addColorStop(1, currentPreset.bgGradient[2]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Cyber Grid Effect if enabled
    if (showCyberGrid) {
      ctx.save();
      ctx.strokeStyle = `${currentPreset.accentColor}18`;
      ctx.lineWidth = 1.5;
      const gridSize = 60;
      // Perspective floor grid
      const horizon = height * 0.65;
      for (let x = -width; x < width * 2; x += gridSize * 2) {
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(width / 2 + (x - width / 2) * 0.2, horizon);
        ctx.stroke();
      }
      for (let y = horizon; y <= height; y += (y - horizon) * 0.35 + 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 3. Draw Ambient Aura / Neon Glow behind Laptop
    ctx.save();
    const glowRadius = (Math.min(width, height) * 0.45 * (glowIntensity / 100));
    const auraGrad = ctx.createRadialGradient(width / 2, height * 0.52, 10, width / 2, height * 0.52, glowRadius);
    auraGrad.addColorStop(0, `${currentPreset.glowColor}99`);
    auraGrad.addColorStop(0.4, `${currentPreset.accentColor}44`);
    auraGrad.addColorStop(0.8, `${currentPreset.glowColor}11`);
    auraGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = auraGrad;
    ctx.beginPath();
    ctx.arc(width / 2, height * 0.52, glowRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 4. Draw Floating Particles / Sparks
    if (showParticles) {
      ctx.save();
      const numParticles = 40;
      for (let i = 0; i < numParticles; i++) {
        const px = (Math.sin(i * 99) * 0.5 + 0.5) * width;
        const py = (Math.cos(i * 33) * 0.5 + 0.5) * height;
        const psize = ((i % 5) + 1.5);
        ctx.fillStyle = (i % 2 === 0) ? currentPreset.accentColor : currentPreset.glowColor;
        ctx.globalAlpha = ((i % 10) + 2) / 15;
        ctx.beginPath();
        ctx.arc(px, py, psize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 5. Draw 3D Light Podium under Laptop
    if (showPodium) {
      ctx.save();
      const pY = height * 0.68;
      const pW = width * 0.65;
      const pH = 55;

      // Glow under podium
      const podGlow = ctx.createRadialGradient(width / 2, pY, 10, width / 2, pY, pW * 0.6);
      podGlow.addColorStop(0, `${currentPreset.accentColor}88`);
      podGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = podGlow;
      ctx.beginPath();
      ctx.ellipse(width / 2, pY + 15, pW * 0.6, 40, 0, 0, Math.PI * 2);
      ctx.fill();

      // Top Glass Disc
      ctx.fillStyle = `${currentPreset.accentColor}33`;
      ctx.strokeStyle = `${currentPreset.accentColor}bb`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(width / 2, pY, pW / 2, pH / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // 6. Draw Laptop Image with Shadow & Reflection
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = customLaptopImage;
    img.onload = () => {
      ctx.save();

      // Desired laptop size on canvas
      const targetW = width * 0.55;
      const aspect = img.width / img.height;
      const targetH = targetW / aspect;
      const imgX = (width - targetW) / 2;
      const imgY = (height * 0.5) - (targetH / 2) + 10;

      // Draw bottom shadow
      ctx.shadowColor = '#000000cc';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 25;

      // Draw main image
      ctx.drawImage(img, imgX, imgY, targetW, targetH);
      ctx.restore();

      // Draw Reflection under laptop if enabled
      if (showReflection) {
        ctx.save();
        ctx.globalAlpha = 0.22;
        ctx.translate(0, (imgY + targetH) * 2);
        ctx.scale(1, -1);
        ctx.drawImage(img, imgX, imgY, targetW, targetH);
        ctx.restore();
      }

      // Re-draw text overlays on top of the image
      drawTextOverlays(ctx, width, height);
    };

    img.onerror = () => {
      // If image fails, still draw text
      drawTextOverlays(ctx, width, height);
    };

  }, [
    aspectRatio, 
    themeStyle, 
    glowIntensity, 
    showPodium, 
    showParticles, 
    showCyberGrid, 
    showReflection, 
    customLaptopImage, 
    bannerTag, 
    bannerTitle, 
    bannerSubtitle, 
    bannerPrice, 
    bannerOldPrice, 
    badgeText, 
    spec1, 
    spec2, 
    spec3, 
    spec4
  ]);

  // Helper function to draw crisp typography & badges
  const drawTextOverlays = (ctx, width, height) => {
    ctx.save();

    // 1. BRAND STORE HEADER
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("VOV SHOP", 80, 95);

    ctx.fillStyle = currentPreset.accentColor;
    ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("PREMIUM TECH STORE", 80, 125);

    // 2. TAG CAPSULE
    if (bannerTag) {
      const tagX = 80;
      const tagY = 175;
      ctx.fillStyle = `${currentPreset.tagColor}22`;
      ctx.strokeStyle = currentPreset.tagColor;
      ctx.lineWidth = 1.5;
      
      const tagText = bannerTag.toUpperCase();
      ctx.font = '900 15px "Plus Jakarta Sans", sans-serif';
      const textWidth = ctx.measureText(tagText).width;

      // Pill shape
      ctx.beginPath();
      ctx.roundRect(tagX, tagY - 24, textWidth + 30, 36, 18);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = currentPreset.tagColor;
      ctx.fillText(tagText, tagX + 15, tagY);
    }

    // 3. MAIN TITLE
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 52px "Plus Jakarta Sans", sans-serif';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 15;
    
    // Wrap title if too long
    const words = bannerTitle.split(' ');
    let line = '';
    let startY = 255;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > width * 0.7 && n > 0) {
        ctx.fillText(line, 80, startY);
        line = words[n] + ' ';
        startY += 62;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 80, startY);

    // 4. SUBTITLE
    ctx.fillStyle = '#94a3b8';
    ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
    ctx.shadowBlur = 0;
    ctx.fillText(bannerSubtitle, 80, startY + 40);

    // 5. DISCOUNT / BADGE TOP RIGHT
    if (badgeText) {
      const badgeX = width - 260;
      const badgeY = 80;
      
      // Glow
      ctx.shadowColor = currentPreset.badgeColor;
      ctx.shadowBlur = 20;

      ctx.fillStyle = currentPreset.badgeColor;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, 180, 52, 26);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 18px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(badgeText, badgeX + 90, badgeY + 33);
      ctx.textAlign = 'left';
    }

    // 6. BOTTOM SPECS PILLS (4 Specs)
    const specs = [spec1, spec2, spec3, spec4].filter(Boolean);
    let specX = 80;
    const specY = height - 160;

    specs.forEach((spec, idx) => {
      ctx.font = '800 15px "Plus Jakarta Sans", sans-serif';
      const sWidth = ctx.measureText(spec).width;

      ctx.fillStyle = '#0f172aee';
      ctx.strokeStyle = `${currentPreset.accentColor}88`;
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      ctx.roundRect(specX, specY, sWidth + 34, 42, 21);
      ctx.fill();
      ctx.stroke();

      // Dot icon
      ctx.fillStyle = currentPreset.accentColor;
      ctx.beginPath();
      ctx.arc(specX + 15, specY + 21, 4, 0, Math.PI * 2);
      ctx.fill();

      // Text
      ctx.fillStyle = '#f8fafc';
      ctx.fillText(spec, specX + 27, specY + 26);

      specX += sWidth + 48;
    });

    // 7. BOTTOM PRICE BLOCK (Right side)
    const priceX = width - 80;
    const priceY = height - 80;
    ctx.textAlign = 'right';

    // Current Price
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 64px "Plus Jakarta Sans", sans-serif';
    ctx.shadowColor = currentPreset.glowColor;
    ctx.shadowBlur = 25;
    ctx.fillText(`$${bannerPrice}`, priceX, priceY);

    // Old Price
    if (bannerOldPrice && Number(bannerOldPrice) > Number(bannerPrice)) {
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '700 26px "Plus Jakarta Sans", sans-serif';
      const oldPriceText = `$${bannerOldPrice}`;
      const oldWidth = ctx.measureText(oldPriceText).width;
      ctx.fillText(oldPriceText, priceX - 250, priceY - 12);
      
      // Strikethrough line
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(priceX - 250 - oldWidth, priceY - 20);
      ctx.lineTo(priceX - 250 + 5, priceY - 20);
      ctx.stroke();
    }

    // Call To Action (Bottom Left)
    ctx.textAlign = 'left';
    ctx.shadowBlur = 0;
    ctx.fillStyle = currentPreset.accentColor;
    ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText("🛒 Xarid qilish: VOV SHOP (O'zbekiston bo'ylab tekin yetkazish)", 80, height - 75);

    ctx.restore();
  };

  // Export as High-Res PNG
  const handleDownload = () => {
    setIsExporting(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `${bannerTitle.replace(/\s+/g, '_')}_VOV_Canva.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("Rasmni yuklab olishda xatolik: " + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  // Send to Telegram Bot / Channel
  const handleSendTelegram = async () => {
    setTelegramStatus('Yuborilmoqda...');
    const canvas = canvasRef.current;
    if (!canvas) return;

    const caption = `🚀 <b>YANGI NOUTBUK AKSIYASI: ${bannerTitle}</b>\n\n` +
      `💰 <b>Maxsus Narx:</b> $${bannerPrice} (Eski narx: $${bannerOldPrice})\n` +
      `🔥 <b>Aksiya:</b> ${badgeText}\n` +
      `⚡ <b>Xususiyatlar:</b>\n` +
      `• ${spec1}\n• ${spec2}\n• ${spec3}\n• ${spec4}\n\n` +
      `🚚 O'zbekiston bo'ylab tekin yetkazib berish!\n` +
      `📞 Buyurtma berish: VOV SHOP`;

    try {
      // Use existing Telegram API helper
      const res = await sendTelegramMessage(caption, null, customLaptopImage);
      if (res.success) {
        setTelegramStatus('Muvaffaqiyatli Telegramga yuborildi! ✅');
      } else {
        setTelegramStatus('Yuborishda xatolik yuz berdi ❌');
      }
    } catch (e) {
      setTelegramStatus('Tarmoq xatosi.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-20">
      
      {/* 1. TOP STUDIO HERO HEADER */}
      <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-500/20 py-8 px-4 sm:px-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>VOV Professional Laptop Canva Studio 2026</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Noutbuklar Reklama & Banner Studiyasi
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Do'kondagi va o'zingizning noutbuklaringiz uchun 4K kiber-effektlar, neon RGB yorug'liklar, shisha podiumlar va tayyor sotuvchi bannerlar yasang!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-black text-xs flex items-center gap-2 shadow-xl shadow-emerald-500/25 active:scale-95 transition"
            >
              <Download className="w-4 h-4" />
              <span>4K PNG Yuklab Olish</span>
            </button>

            <button
              onClick={handleSendTelegram}
              className="px-5 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs flex items-center gap-2 shadow-xl shadow-sky-500/25 active:scale-95 transition"
            >
              <Send className="w-4 h-4" />
              <span>Telegramga Joylash</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN WORKSPACE: CONTROLS & LIVE PREVIEW CANVAS */}
      <div className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: CONTROLS & SETTINGS (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">

          {/* SECTION A: CHOOSE LAPTOP FROM STORE */}
          <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-sm text-white flex items-center gap-2">
                <Laptop className="w-4 h-4 text-indigo-400" />
                <span>1. Do'kondagi Noutbukni Tanlash</span>
              </h3>
              <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded-full">
                {storeLaptops.length} ta model
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto pr-1">
              {storeLaptops.map(laptop => {
                const isSelected = selectedProduct?.title === laptop.title;
                return (
                  <button
                    key={laptop.id}
                    onClick={() => handleSelectLaptop(laptop)}
                    className={`p-2.5 rounded-2xl text-left border transition flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-600/25 border-indigo-500 ring-2 ring-indigo-500/40'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                    }`}
                  >
                    <img
                      src={laptop.image}
                      alt={laptop.title}
                      className="w-full h-16 object-contain rounded-xl bg-slate-950/40 p-1 mb-1"
                    />
                    <span className="text-[11px] font-bold text-white line-clamp-1 block">
                      {laptop.title}
                    </span>
                    <span className="text-[10px] font-black text-emerald-400">
                      ${laptop.price}
                    </span>
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1">
                Yoki O'zingizning Noutbuk Rasmingiz (URL):
              </label>
              <input
                type="text"
                value={customLaptopImage}
                onChange={(e) => setCustomLaptopImage(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* SECTION B: VISUAL EFFECTS & PRESETS */}
          <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4">
            <h3 className="font-black text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>2. Professional Effektlar & Mavzular</span>
            </h3>

            {/* Presets buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {presets.map(p => (
                <button
                  key={p.id}
                  onClick={() => {
                    setThemeStyle(p.id);
                    setBannerTag(p.tag);
                  }}
                  className={`p-2.5 rounded-xl text-xs font-black border transition text-left ${
                    themeStyle === p.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400 shadow-lg'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.glowColor }}></span>
                    <span>{p.name}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Effect Toggles */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-300">Neon / RGB Nur Kuchliligi:</span>
                  <span className="text-indigo-400">{glowIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={glowIntensity}
                  onChange={(e) => setGlowIntensity(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setShowPodium(!showPodium)}
                  className={`p-2 rounded-xl border font-bold flex items-center justify-between ${
                    showPodium ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <span>3D Shisha Podium</span>
                  <Check className={`w-3.5 h-3.5 ${showPodium ? 'opacity-100 text-emerald-400' : 'opacity-0'}`} />
                </button>

                <button
                  onClick={() => setShowReflection(!showReflection)}
                  className={`p-2 rounded-xl border font-bold flex items-center justify-between ${
                    showReflection ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <span>Ko'zgu Aksi (Mirror)</span>
                  <Check className={`w-3.5 h-3.5 ${showReflection ? 'opacity-100 text-emerald-400' : 'opacity-0'}`} />
                </button>

                <button
                  onClick={() => setShowCyberGrid(!showCyberGrid)}
                  className={`p-2 rounded-xl border font-bold flex items-center justify-between ${
                    showCyberGrid ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <span>Kiber Setka / HUD</span>
                  <Check className={`w-3.5 h-3.5 ${showCyberGrid ? 'opacity-100 text-emerald-400' : 'opacity-0'}`} />
                </button>

                <button
                  onClick={() => setShowParticles(!showParticles)}
                  className={`p-2 rounded-xl border font-bold flex items-center justify-between ${
                    showParticles ? 'bg-indigo-600/30 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  <span>Nur Zarralari (Sparks)</span>
                  <Check className={`w-3.5 h-3.5 ${showParticles ? 'opacity-100 text-emerald-400' : 'opacity-0'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* SECTION C: TEXTS & PRICING */}
          <div className="bg-slate-900/90 rounded-3xl p-5 border border-slate-800 shadow-xl space-y-4">
            <h3 className="font-black text-sm text-white flex items-center gap-2">
              <Type className="w-4 h-4 text-purple-400" />
              <span>3. Matnlar va Narxlar</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-bold mb-1">Yuqori Shior (Tag Capsule):</label>
                <input
                  type="text"
                  value={bannerTag}
                  onChange={(e) => setBannerTag(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Noutbuk Modeli Nomi (Title):</label>
                <input
                  type="text"
                  value={bannerTitle}
                  onChange={(e) => setBannerTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Qisqacha Tavsif (Subtitle):</label>
                <input
                  type="text"
                  value={bannerSubtitle}
                  onChange={(e) => setBannerSubtitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Narxi ($):</label>
                  <input
                    type="number"
                    value={bannerPrice}
                    onChange={(e) => setBannerPrice(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-black outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Eski Narx ($):</label>
                  <input
                    type="number"
                    value={bannerOldPrice}
                    onChange={(e) => setBannerOldPrice(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Nishon (Badge):</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Xususiyat 1:</label>
                  <input
                    type="text"
                    value={spec1}
                    onChange={(e) => setSpec1(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Xususiyat 2:</label>
                  <input
                    type="text"
                    value={spec2}
                    onChange={(e) => setSpec2(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Xususiyat 3:</label>
                  <input
                    type="text"
                    value={spec3}
                    onChange={(e) => setSpec3(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-bold mb-1">Xususiyat 4:</label>
                  <input
                    type="text"
                    value={spec4}
                    onChange={(e) => setSpec4(e.target.value)}
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-white outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: INTERACTIVE CANVANS LIVE PREVIEW (7 COLS) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Top Canvas Controls Bar */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">O'lcham / Format:</span>
              {[
                { id: '1:1', label: 'Instagram Post (1:1)' },
                { id: '16:9', label: 'Web Banner (16:9)' },
                { id: '9:16', label: 'Story (9:16)' }
              ].map(fmt => (
                <button
                  key={fmt.id}
                  onClick={() => setAspectRatio(fmt.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                    aspectRatio === fmt.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Ultra HD Canva Canvas</span>
            </div>
          </div>

          {/* The Actual Real-time Canvas Rendering Box */}
          <div className="bg-slate-950 p-4 rounded-3xl border border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-[680px] w-auto h-auto rounded-2xl shadow-2xl transition-all duration-300"
            />
          </div>

          {/* Quick Action Footer */}
          <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">
                Tayyor banner to'g'ridan-to'g'ri PNG rasmga aylanadi.
              </span>
              {telegramStatus && (
                <span className="text-emerald-400 font-black animate-in fade-in">
                  {telegramStatus}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white font-black shadow-lg shadow-emerald-500/20 active:scale-95 transition flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Yuklab olish</span>
              </button>

              <button
                onClick={handleSendTelegram}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-black shadow-lg shadow-sky-500/20 active:scale-95 transition flex items-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>Telegram Bot</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
