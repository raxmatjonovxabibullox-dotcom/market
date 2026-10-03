import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Tag, 
  Send, 
  Check, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  CreditCard,
  Building,
  User,
  Phone,
  MapPin,
  Sparkles,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CartCheckoutPage() {
  const { 
    t, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal,
    discountAmount,
    deliveryFee,
    totalAmount,
    appliedPromo,
    applyPromoCode,
    removePromo,
    placeOrder,
    resendOrderToTelegram,
    telegramConfig
  } = useApp();

  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState(null);

  // Form details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('payme');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setPhone('');
      return;
    }
    // Only allow + at index 0 and digits 0-9
    let filtered = val.replace(/[^\d+]/g, '');
    if (filtered.includes('+')) {
      filtered = '+' + filtered.replace(/\+/g, '');
    }
    setPhone(filtered);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    setPromoMsg(res);
  };

  const handleQuickPromoSelect = (code) => {
    setPromoInput(code);
    const res = applyPromoCode(code);
    setPromoMsg(res);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert("Iltimos, barcha yetkazib berish maydonlarini to'ldiring!");
      return;
    }

    setIsSubmitting(true);
    const orderDetails = {
      fullName,
      phone,
      address,
      paymentMethod
    };

    const newOrder = await placeOrder(orderDetails);
    setIsSubmitting(false);
    setCompletedOrder(newOrder);
  };

  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState(null);

  const handleResendTelegram = async () => {
    if (!completedOrder) return;
    setIsResending(true);
    setResendStatus('Yuborilmoqda...');
    try {
      const res = await resendOrderToTelegram(completedOrder);
      if (res && res.success) {
        setResendStatus('✅ Muvaffaqiyatli yuborildi!');
        setCompletedOrder(prev => ({ ...prev, telegramSent: true }));
      } else {
        setResendStatus('❌ ' + (res?.error || 'Yetkazib bo\'lmadi'));
      }
    } catch (e) {
      setResendStatus('❌ ' + e.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">
              {t.cart_title}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Savatda {cart.reduce((s, i) => s + i.quantity, 0)} ta mahsulot bor
            </p>
          </div>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            <span>Savatni tozalash</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 p-8 space-y-4">
          <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-gray-700 text-indigo-500 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
            {t.cart_empty}
          </h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Katalogimizga o'tib, o'zingizga maqbul gadjet va aksessuarlarni tanlang!
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-extrabold text-xs shadow hover:bg-indigo-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.continue_shopping}</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT 2 COLS: ITEM LIST */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700/60 shadow-sm space-y-4">
              <h3 className="font-extrabold text-lg text-gray-900 dark:text-white mb-4">
                Mahsulotlar Ro'yxati
              </h3>

              {cart.filter(i => i && i.product).map(({ product, quantity }) => (
                <div 
                  key={product?.id || Math.random()}
                  className="flex items-center gap-4 py-4 border-b border-gray-100 dark:border-gray-700/60 last:border-none"
                >
                  <img
                    src={product?.image || 'https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop'}
                    alt={product?.title || 'Mahsulot'}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop";
                    }}
                    className="w-20 h-20 object-cover rounded-2xl bg-gray-100 dark:bg-gray-900 shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-gray-900 dark:text-white truncate">
                        {product?.title || 'Mahsulot'}
                      </h4>
                      <span className="shrink-0 font-mono text-[10px] font-black px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-slate-700">
                        Tovar ID: #{product?.id}
                      </span>
                    </div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                      ${product?.price || 0} / dona
                    </p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <button
                      onClick={() => updateQuantity(product?.id, -1)}
                      className="px-2.5 py-1 text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-black dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product?.id, 1)}
                      className="px-2.5 py-1 text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      +
                    </button>
                  </div>

                  {/* Item total price */}
                  <span className="font-black text-sm text-gray-900 dark:text-white w-20 text-right">
                    ${((product?.price || 0) * quantity).toFixed(2)}
                  </span>

                  {/* Delete button */}
                  <button
                    onClick={() => removeFromCart(product?.id)}
                    className="p-2 text-gray-400 hover:text-rose-500 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* CHECKOUT FORM */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700/60 shadow-sm space-y-6">
              <h3 className="font-extrabold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-500" />
                <span>{t.checkout_title}</span>
              </h3>

              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      {t.full_name} *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Alisher Navoiy"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      {t.phone_number} *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        inputMode="tel"
                        required
                        placeholder="+998 90 123 45 67"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    {t.address} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Toshkent sh., Yunusobod tumani, 4-mavze, 12-uy, 45-xonadon"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Payment Selection */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                    {t.payment_method}
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'payme', label: 'Payme', badge: 'Online' },
                      { id: 'click', label: 'Click', badge: 'Online' },
                      { id: 'cash', label: 'Naqd Pul', badge: 'Courier' },
                    ].map(p => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPaymentMethod(p.id)}
                        className={`p-3 rounded-2xl border text-center transition ${
                          paymentMethod === p.id
                            ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 font-black text-indigo-600 dark:text-indigo-400 shadow'
                            : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="block text-xs">{p.label}</span>
                        <span className="text-[9px] text-gray-400 uppercase font-bold">{p.badge}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-sm shadow-xl shadow-indigo-500/30 hover:opacity-95 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5 animate-pulse" />
                  <span>{t.send_to_telegram}</span>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COL: SUMMARY & PROMO */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700/60 shadow-sm space-y-4">
              <h3 className="font-extrabold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-3">
                {t.item_total}
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{t.subtotal}:</span>
                  <span className="font-bold text-gray-900 dark:text-white">${subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-rose-500 font-bold">
                    <span>{t.discount} ({appliedPromo?.code}):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>{t.delivery_fee}:</span>
                  <span className="font-bold text-emerald-500">
                    {deliveryFee === 0 ? t.free : `$${deliveryFee}`}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-baseline text-base font-black text-gray-900 dark:text-white">
                  <span>{t.total_amount}:</span>
                  <span className="text-xl text-indigo-600 dark:text-indigo-400">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
                <span className="font-bold text-xs text-gray-800 dark:text-gray-200 block">
                  {t.promo_code}
                </span>

                {appliedPromo ? (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-4 h-4" />
                      <span>{appliedPromo.code} faol!</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-rose-500 hover:underline text-[11px]"
                    >
                      O'chirish
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="masalan: VOV2026"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 uppercase px-3 py-2 rounded-xl text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 dark:text-white outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition"
                    >
                      {t.apply_promo}
                    </button>
                  </form>
                )}

                {promoMsg && !appliedPromo && (
                  <p className={`text-[11px] font-semibold ${promoMsg.success ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {promoMsg.message}
                  </p>
                )}

                {/* Available Promo Badges */}
                <div className="pt-2">
                  <span className="text-[10px] text-gray-400 font-bold block mb-1.5">
                    Mavjud promokodlar:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {['VOV2026', 'TEGO50', 'SUPER10'].map(code => (
                      <button
                        key={code}
                        onClick={() => handleQuickPromoSelect(code)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-gray-700 text-indigo-600 dark:text-indigo-300 text-[10px] font-extrabold border border-indigo-200 dark:border-gray-600 hover:scale-105 transition"
                      >
                        🏷️ {code}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Success Confirmation Receipt Modal */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-md w-full p-6 text-center space-y-5 border border-gray-200 dark:border-gray-800 shadow-2xl relative">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                {t.order_success_title}
              </h3>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-extrabold mt-1">
                {t.order_success_desc}{completedOrder.id}
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl text-left text-xs space-y-2 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2 font-bold">
                <span>Mijoz:</span>
                <span>{completedOrder.customer.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <span>Telefon:</span>
                <span>{completedOrder.customer.phone}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <span>To'lov usuli:</span>
                <span className="uppercase font-bold">{completedOrder.customer.paymentMethod}</span>
              </div>
              <div className="flex justify-between font-black text-indigo-600 dark:text-indigo-400 pt-1 text-sm">
                <span>Jami to'lov:</span>
                <span>${completedOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl text-indigo-800 dark:text-indigo-300 text-xs font-semibold flex items-center gap-2 justify-center">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.order_telegram_sent}</span>
            </div>

            <button
              onClick={() => setCompletedOrder(null)}
              className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-extrabold text-xs shadow hover:bg-indigo-700 transition"
            >
              Yopish & Do'konga qaytish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
