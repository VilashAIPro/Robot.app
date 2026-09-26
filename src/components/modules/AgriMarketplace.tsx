import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MarketplaceProduct } from '../../types';
import { MARKETPLACE_PRODUCTS } from '../../data/mockData';
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Star,
  Plus,
  Minus,
  Trash2,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AgriMarketplace: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart, user } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOrderModal, setShowOrderModal] = useState(false);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'bio_fertilizers', label: 'Bio-Fertilizers' },
    { id: 'seeds', label: 'Certified Seeds' },
    { id: 'robot_tools', label: 'ROV-BOT Attachments' },
    { id: 'sensors', label: 'IoT Sensors' },
    { id: 'drones', label: 'Drone Services' }
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? MARKETPLACE_PRODUCTS
      : MARKETPLACE_PRODUCTS.filter((p) => p.category === selectedCategory);

  const cartTotalInr = cart.reduce(
    (acc, item) => acc + item.product.priceInr * item.quantity,
    0
  );

  const handleCheckout = () => {
    setShowOrderModal(true);
    confetti({ particleCount: 70, spread: 60 });
  };

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 lg:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5" />
                AgriStack Certified Marketplace & Direct Subsidy (DBT)
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black font-display text-white">
              Agri-Marketplace & Krishi Seva Kendra Hub
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl">
              Procure certified organic inputs, seeds, robot tool attachments, and drone services with up to 50% DBT government subsidy and verified local KVK vendor dispatch.
            </p>
          </div>

          {cart.length > 0 && (
            <button
              onClick={handleCheckout}
              className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Checkout ({cart.length} items • ₹{cartTotalInr.toLocaleString()})</span>
            </button>
          )}
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                : 'glass-panel border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="glass-panel rounded-3xl p-5 border border-white/10 flex flex-col justify-between hover:border-emerald-500/40 transition-all group"
          >
            <div>
              {/* Product Image & Subsidy Tag */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-3 border border-white/10">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.subsidyAvailablePercent && (
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                    {product.subsidyAvailablePercent}% DBT Subsidy
                  </span>
                )}
              </div>

              {/* Title & Brand */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-semibold">{product.brand}</span>
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {product.rating} ({product.reviewsCount})
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {product.name}
              </h3>

              <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                {product.description}
              </p>

              {/* Vendor Info */}
              <div className="mt-3 p-2.5 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{product.vendor.location}</span>
                </div>
                <span className="font-mono text-emerald-400 font-bold shrink-0">{product.vendor.distanceKm} km</span>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-slate-400 block">Farmer Price</span>
                <span className="text-xl font-black text-white font-display">
                  ₹{product.priceInr.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/919849214320?text=Hi,%20I%20want%20to%20order%20${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900 transition-colors"
                  title="Order via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>

                <button
                  onClick={() => addToCart(product)}
                  className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Drawer / Order Success Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 max-w-md w-full border border-emerald-500/40 space-y-4 text-center animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white">Direct Benefit Transfer Order Dispatched!</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Order confirmed for <strong className="text-white">{user.name}</strong> at <strong className="text-white">{user.village}, {user.district}</strong>. The local Krishi Seva Kendra vendor will deliver inputs within 24 hours.
            </p>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-xs text-left space-y-1 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Order Value:</span>
                <span className="text-white font-bold">₹{cartTotalInr.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>AgriStack Subsidy Applied:</span>
                <span>- ₹{(cartTotalInr * 0.3).toFixed(0)} (30%)</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-white/10 text-cyan-300 font-bold">
                <span>Net Payable at Delivery:</span>
                <span>₹{(cartTotalInr * 0.7).toFixed(0)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                clearCart();
                setShowOrderModal(false);
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
            >
              Done & Return to Marketplace
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
