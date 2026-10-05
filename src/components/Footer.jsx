import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Heart 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { t, storeLocation } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-500/30">
                V
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                VOV SHOP
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              {t.hero_subtitle}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/Kitobchalar_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
                title="Telegram botimizga o'tish"
              >
                <Send className="w-3.5 h-3.5 text-white" />
                <span>Telegram Bot Store</span>
              </a>
            </div>
          </div>

          {/* Col 2: 5 Main Pages & Admin */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>5 ta Asosiy Sahifa</span>
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-gray-300">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-black flex items-center justify-center">1</span>
                  <span>{t.home} (Landing Page)</span>
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-black flex items-center justify-center">2</span>
                  <span>{t.shop} (Magazin / Katalog)</span>
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-black flex items-center justify-center">3</span>
                  <span>{t.wishlist} (Sevimlilar)</span>
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-black flex items-center justify-center">4</span>
                  <span>{t.cart} (Savat & Checkout)</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 text-[10px] font-black flex items-center justify-center">5</span>
                  <span>{t.about} (Biz haqimizda & Xarita)</span>
                </Link>
              </li>
              <li className="pt-2 border-t border-gray-800">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black shadow-lg shadow-cyan-500/20 hover:opacity-95 transition"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>👑 Rocker Admin Panel</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Store Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-gray-200 uppercase tracking-wider">
              {t.contact_us}
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{storeLocation.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${storeLocation.phone}`} className="hover:text-emerald-400 transition">
                  {storeLocation.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Send className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href="https://t.me/Kitobchalar_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition underline underline-offset-2 flex items-center gap-1"
                >
                  <span>Telegram Bot: @Kitobchalar_bot</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-gray-200 uppercase tracking-wider">
              Aksiyalardan Xabardor Bo'ling
            </h4>
            <p className="text-xs text-gray-400">
              Haftalik 30% gacha chegirmalar va yangi mahsulotlar haqida bilib boring.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Elektron pochtangiz..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-bold text-emerald-400 animate-pulse">
                  ✓ Rahmat! Obuna muvaffaqiyatli rasmiylashtirildi!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar & Payments */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 VOV SHOP.</span>
            <span className="text-gray-400 font-bold">Loyiha muallifi:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-black border border-cyan-500/20">
              Xabibullo Raxmatjonov
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-gray-800 text-[10px] font-extrabold text-emerald-400 border border-gray-700">
              Payme
            </span>
            <span className="px-2.5 py-1 rounded bg-gray-800 text-[10px] font-extrabold text-sky-400 border border-gray-700">
              Click
            </span>
            <span className="px-2.5 py-1 rounded bg-gray-800 text-[10px] font-extrabold text-indigo-400 border border-gray-700">
              Uzcard / Humo
            </span>
            <span className="px-2.5 py-1 rounded bg-gray-800 text-[10px] font-extrabold text-amber-400 border border-gray-700">
              Cash Courier
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
