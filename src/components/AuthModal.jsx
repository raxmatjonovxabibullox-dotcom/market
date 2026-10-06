import React, { useState } from 'react';
import { X, Lock, User, Phone, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthModal({ onClose }) {
  const { t, login } = useApp();
  const [activeTab, setActiveTab] = useState('login');
  const [usernameOrPhone, setUsernameOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanUser = (usernameOrPhone || '').trim().toLowerCase();

    // Agar username "owner" yoki Loyiha Egasi emaili bo'lsa, to'g'ridan-to'g'ri Owner sifatida kiradi
    if (cleanUser === 'owner' || cleanUser === 'raxmatjonovxabibullox@gmail.com' || cleanUser === 'xabibullo' || cleanUser === 'xabibullox') {
      const res = login(usernameOrPhone, password || 'owner123');
      if (res.success) {
        onClose();
      }
      return;
    }

    if (!usernameOrPhone || !password) {
      setErrorMsg('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    const res = login(usernameOrPhone, password);
    if (res.success) {
      onClose();
    } else if (res.error) {
      setErrorMsg(res.error);
    }
  };

  const handleFillAdmin = () => {
    setUsernameOrPhone('admin');
    setPassword('admin123');
    const res = login('admin', 'admin123');
    if (res.success) {
      onClose();
    }
  };

  const handleFillOwner = () => {
    setUsernameOrPhone('owner');
    setPassword('owner123');
    const res = login('owner', 'owner123');
    if (res.success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold">{t.auth_title}</h3>
              <p className="text-xs text-indigo-100 font-medium">VOV SHOP VIP Profiliga kirish</p>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 text-center text-sm font-bold transition ${
              activeTab === 'login'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-gray-800/50'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {t.login_tab}
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 text-center text-sm font-bold transition ${
              activeTab === 'register'
                ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 bg-indigo-50/50 dark:bg-gray-800/50'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {t.register_tab}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 text-xs font-semibold text-rose-600 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-900">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              {t.username_or_phone}
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="masalan: admin yoki +998901234567"
                value={usernameOrPhone}
                onChange={(e) => setUsernameOrPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
              {t.password}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Demo Admin & Owner Buttons */}
          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={handleFillOwner}
              className="w-full py-2 px-3 rounded-xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center justify-between hover:bg-amber-500/20 transition"
            >
              <div className="flex items-center gap-1.5">
                <span>👑</span>
                <span>Loyiha Egasi: <b>Xabibullo Raxmatjonov</b> (owner / owner123)</span>
              </div>
              <span className="underline font-bold">Tanlash</span>
            </button>

            <button
              type="button"
              onClick={handleFillAdmin}
              className="w-full py-2 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-between hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Admin: <b>admin</b> / <b>admin123</b></span>
              </div>
              <span className="underline font-bold">Tanlash</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/30 hover:opacity-95 transition flex items-center justify-center gap-2 mt-4"
          >
            <span>{activeTab === 'login' ? t.login_btn : t.register_tab}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
