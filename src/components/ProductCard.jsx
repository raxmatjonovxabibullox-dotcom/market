import React, { useState } from 'react';
import { Heart, ShoppingBag, Star, Eye, Check, Edit3, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ProductCard({ product, onQuickView }) {
  const {
    t,
    addToCart,
    cart,
    wishlist,
    toggleWishlist,
    isInWishlist,
    user,
    deleteProduct,
    setAdminEditingProduct
  } = useApp();
  const [added, setAdded] = useState(false);

  const isLiked = isInWishlist(product?.id);
  const inCartItem = cart.find(item => item?.product?.id === product?.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700/60 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1525858907241-d230b66fb9fa?q=80&w=800&auto=format&fit=crop";
          }}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {discountPercent && (
            <span className="px-2.5 py-1 rounded-full bg-rose-500 text-white font-extrabold text-[10px] uppercase shadow">
              -{discountPercent}%
            </span>
          )}
          {product.isFlashSale && (
            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-white font-extrabold text-[10px] uppercase shadow animate-pulse">
              ⚡ Flash
            </span>
          )}
        </div>

        {/* Action Overlay Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Admin Direct Actions on the same page */}
          {(user?.role === 'admin' || user?.role === 'owner') && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setAdminEditingProduct(product);
                }}
                className="p-2 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 backdrop-blur-md transition-all shadow-lg active:scale-90"
                title="Mahsulotni shu yerda tahrirlash"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm(`"${product.title}" mahsulotini o'chirishni xohlaysizmi?`)) {
                    deleteProduct(product.id);
                  }
                }}
                className="p-2 rounded-2xl bg-rose-600 text-white hover:bg-rose-700 backdrop-blur-md transition-all shadow-lg active:scale-90"
                title="Mahsulotni shu yerda o'chirish"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}

          <button
            onClick={handleWishlistToggle}
            className={`p-2 rounded-2xl backdrop-blur-md transition-all shadow-md active:scale-90 ${isLiked
                ? 'bg-rose-500 text-white'
                : 'bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-200 hover:text-rose-500'
              }`}
            title={t.wishlist}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2 rounded-2xl bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 backdrop-blur-md transition shadow-md opacity-0 group-hover:opacity-100"
            title={t.view_details}
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-indigo-600 dark:text-indigo-400 truncate">
              {t[product.category] || product.category}
            </span>
            <span
              className="shrink-0 font-mono text-[10.5px] font-extrabold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 shadow-sm"
              title={`Tovar ID: #${product.id}`}
            >
              Tovar ID: #{product.id}
            </span>
          </div>
          <h4
            onClick={() => onQuickView(product)}
            className="mt-1 font-bold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-2 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            {product.title}
          </h4>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                {product.rating}
              </span>
              <span className="text-[10px] text-gray-400">
                ({product.reviewsCount})
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`p-3 rounded-2xl transition-all duration-200 shadow-md active:scale-95 flex items-center gap-1.5 text-xs font-bold ${added || inCartItem
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-indigo-500/20'
              }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 animate-bounce" />
                <span className="hidden sm:inline">{t.in_cart}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">{inCartItem ? `(${inCartItem.quantity})` : t.add_to_cart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
