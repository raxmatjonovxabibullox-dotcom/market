import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function QuickViewModal({ product, onClose }) {
  const { t, addToCart, isInWishlist, toggleWishlist } = useApp();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  if (!product) return null;

  const isLiked = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Section */}
        <div className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-950 p-6 flex items-center justify-center relative">
          <img
            src={product.image}
            alt={product.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop";
            }}
            className="max-h-72 md:max-h-96 w-auto object-contain rounded-2xl shadow-lg"
          />
          {product.isFlashSale && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-white font-extrabold text-xs shadow">
              ⚡ Flash Sale
            </span>
          )}
        </div>

        {/* Right Info Section */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wider">
                {t[product.category] || product.category}
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(product.id);
                  setCopiedId(true);
                  setTimeout(() => setCopiedId(false), 2000);
                }}
                className="font-mono text-[11px] font-black px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-slate-700 flex items-center gap-1.5 hover:bg-indigo-100 dark:hover:bg-slate-700 transition"
                title="Tovar ID raqamini nusxalash"
              >
                <span>Tovar ID: #{product.id}</span>
                {copiedId && <span className="text-[10px] text-emerald-500 font-bold">✓ Nusxalandi</span>}
              </button>
            </div>
            <h2 className="mt-1 text-xl font-extrabold text-gray-900 dark:text-white">
              {product.title}
            </h2>

            {/* Rating & Stock */}
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-lg">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                  {product.rating} ({product.reviewsCount} {t.reviews})
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">
                ✓ {t.in_stock} ({product.stock})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl font-black text-gray-900 dark:text-white">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="mt-4 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Specs Grid */}
            {product.specs && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/60 rounded-2xl space-y-1 text-xs">
                <span className="font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  {t.specifications}:
                </span>
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-0.5 text-gray-600 dark:text-gray-400">
                    <span className="font-medium">{key}:</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-200">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-semibold text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                <span>{t.guarantee_info}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-500" />
                <span>{t.free_delivery_info}</span>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                -
              </button>
              <span className="px-3 py-2 text-xs font-extrabold dark:text-white">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 px-4 rounded-2xl font-extrabold text-xs shadow-lg transition flex items-center justify-center gap-2 ${
                added
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-95 shadow-indigo-500/30'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Qo'shildi!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.add_to_cart} (${product.price * qty})</span>
                </>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-2xl border transition ${
                isLiked
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
