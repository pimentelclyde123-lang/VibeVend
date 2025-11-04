import React, { useState, useEffect } from 'react';
import { ShoppingCart, CreditCard, Check, ArrowLeft } from 'lucide-react';

export default function VibeVend() {
  const [screen, setScreen] = useState('home');
  const [cart, setCart] = useState([]);
  const [pulse, setPulse] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const vipPacks = [
    { id: 'vip1', name: 'Self Care',    price: 34, originalPrice: 38, emoji: '🌹', category: 'VIP PACK', description: 'Vibrator + Flavored Wipe + Lube' },
    { id: 'vip2', name: 'Zaddy Pack',   price: 22, originalPrice: 24, emoji: '🥃', category: 'VIP PACK', description: 'Cigar + Cutter + Lighter + Wipe' },
    { id: 'vip3', name: 'Caught in 4K', price: 32, originalPrice: 36, emoji: '😈', category: 'VIP PACK', description: 'Camera + Condoms + Lube' },
    { id: 'vip4', name: 'ReVibe Pack',  price: 19, originalPrice: 21, emoji: '🔋', category: 'VIP PACK', description: 'Advil + Eyedrops + Liquid IV' },
  ];

  const quickPicks = [
    { id: 1, name: 'Advil',            price: 5,  emoji: '💊', category: 'Quick Picks' },
    { id: 2, name: 'Cologne/Perfume',  price: 8,  emoji: '😏', category: 'Quick Picks' },
    { id: 3, name: 'Hydration Packet', price: 6,  emoji: '🥤', category: 'Quick Picks' },
    { id: 4, name: 'Gum',              price: 3,  emoji: '🍬', category: 'Quick Picks' },
    { id: 5, name: 'Premium Cigar',    price: 12, emoji: '🥃', category: 'Quick Picks' },
    { id: 6, name: 'Lube',             price: 10, emoji: '💧', category: 'Quick Picks' },
  ];

  const monthlyHeat = [];

  useEffect(() => {
    // Global keyframes (Claude-style blobs), animated wordmark, and "breathing" rings
    const style = document.createElement('style');
    style.textContent = `
      @keyframes waterRipple {
        0%   { transform: translate(0, 0) scale(1) rotate(0deg);    opacity: 1; }
        50%  { transform: translate(400px, 400px) scale(2) rotate(180deg); opacity: 1; }
        100% { transform: translate(800px, 800px) scale(3) rotate(360deg); opacity: .5; }
      }
      /* Smooth, relaxed "breathing" pulse */
      @keyframes breatheRings {
        0%   { transform: scale(1);    opacity: .65; }
        20%  { transform: scale(1.04); opacity: .72; }
        40%  { transform: scale(1.08); opacity: .80; }
        55%  { transform: scale(1.10); opacity: .85; }
        70%  { transform: scale(1.06); opacity: .78; }
        85%  { transform: scale(1.02); opacity: .70; }
        100% { transform: scale(1);    opacity: .65; }
      }
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes slowPulse {
        0%, 100% { opacity: 1; }
        50%      { opacity: .7; }
      }
      .fade-in { animation: fadeIn .8s ease both; }
      @keyframes fadeIn { from {opacity: 0; transform: translateY(8px)} to {opacity: 1; transform: none} }
      @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:.85;} }

      /* Animated gradient for the VIBE VEND wordmark */
      @keyframes logoGradShift {
        0%   { background-position: 0% 50%;   filter: drop-shadow(0 0 12px rgba(167,139,250,.45)); }
        50%  { background-position: 100% 50%; filter: drop-shadow(0 0 18px rgba(167,139,250,.65)); }
        100% { background-position: 0% 50%;   filter: drop-shadow(0 0 12px rgba(167,139,250,.45)); }
      }

      @media (prefers-reduced-motion: reduce) {
        [data-anim], .fade-in { animation: none !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const addToCart = (product) => {
    setSelectedProduct(product.id);
    setCart((c) => [...c, product]);
    setPulse(false);
    setTimeout(() => setPulse(true), 1500);
    setTimeout(() => setSelectedProduct(null), 600);
  };

  const removeFromCart = (index) => {
    setCart((c) => c.filter((_, i) => i !== index));
  };

  const fmt = (n) => Number(n).toFixed(2);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    setScreen('success');
    setTimeout(() => {
      setCart([]);
      setScreen('home');
    }, 4000);
  };

  // ---------- HOME ----------
  if (screen === 'home') {
    return (
      <div
        onClick={() => setScreen('products')}
        className="h-screen min-h-screen w-full relative overflow-hidden cursor-pointer flex items-center justify-center select-none"
        style={{
          background:
            'linear-gradient(45deg, #1e1b4b, #581c87, #831843, #1e293b, #0f172a, #1e1b4b)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 30s ease infinite',
        }}
      >
        {/* moving gradient blobs (Claude look) */}
        <div className="absolute inset-0 -z-10">
          <div
            data-anim
            className="absolute -top-40 -left-40 rounded-full blur-[80px]"
            style={{
              width: 1000,
              height: 1000,
              background: 'linear-gradient(to bottom right, #f472b6, #ec4899)',
              animation: 'waterRipple 3.5s ease-in-out infinite',
            }}
          />
          <div
            data-anim
            className="absolute -top-40 -left-40 rounded-full blur-[80px]"
            style={{
              width: 1000,
              height: 1000,
              background: 'linear-gradient(to bottom right, #c084fc, #a855f7)',
              animation: 'waterRipple 3.5s ease-in-out infinite',
              animationDelay: '1.2s',
            }}
          />
          <div
            data-anim
            className="absolute -top-40 -left-40 rounded-full blur-[80px]"
            style={{
              width: 1000,
              height: 1000,
              background: 'linear-gradient(to bottom right, #67e8f9, #06b6d4)',
              animation: 'waterRipple 3.5s ease-in-out infinite',
              animationDelay: '2.4s',
            }}
          />
        </div>

        {/* center content */}
        <div className="relative z-10 text-center max-w-[800px] px-6">
          {/* Animated color-shifting gradient text */}
          <h1
            className="font-black whitespace-nowrap"
            style={{
              fontSize: '84px',
              letterSpacing: '0.1em',
              background:
                'linear-gradient(90deg, #a5f3fc, #e9d5ff, #fbbf24, #a5f3fc)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              animation: 'logoGradShift 8s ease-in-out infinite, pulse 2.6s ease-in-out infinite',
            }}
          >
            V I B E V E N D
          </h1>

          <p
            className="font-bold"
            style={{
              fontSize: 36,
              color: '#f9a8d4',
              marginBottom: 16,
              textShadow:
                '0 0 20px rgba(236,72,153,0.8), 0 0 40px rgba(236,72,153,0.5)',
            }}
          >
            Elevate Your Vibe
          </p>
          <p
            style={{
              fontSize: 20,
              color: '#e9d5ff',
              marginBottom: 48,
              textShadow: '0 0 10px rgba(192,132,252,0.6)',
            }}
          >
            Everything you need, exactly when you need it
          </p>
        </div>

        {/* triple "breathing" rings — faster than before (10s), staggered */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div
            data-anim
            className="absolute rounded-full"
            style={{
              width: 384,
              height: 384,
              border: '4px solid rgba(34,211,238,0.6)',
              borderRadius: '50%',
              boxShadow:
                '0 0 40px rgba(34,211,238,0.8), 0 0 80px rgba(34,211,238,0.6)',
              animation: 'breatheRings 10s ease-in-out infinite',
            }}
          />
          <div
            data-anim
            className="absolute rounded-full"
            style={{
              width: 384,
              height: 384,
              border: '4px solid rgba(236,72,153,0.6)',
              borderRadius: '50%',
              boxShadow:
                '0 0 40px rgba(236,72,153,0.8), 0 0 80px rgba(236,72,153,0.6)',
              animation: 'breatheRings 10s ease-in-out infinite',
              animationDelay: '3.4s',
            }}
          />
          <div
            data-anim
            className="absolute rounded-full"
            style={{
              width: 384,
              height: 384,
              border: '4px solid rgba(168,85,247,0.6)',
              borderRadius: '50%',
              boxShadow:
                '0 0 40px rgba(168,85,247,0.8), 0 0 80px rgba(168,85,247,0.6)',
              animation: 'breatheRings 10s ease-in-out infinite',
              animationDelay: '6.8s',
            }}
          />
        </div>
      </div>
    );
  }

  // ---------- PRODUCTS ----------
  if (screen === 'products') {
    return (
      <div
        className="min-h-screen p-6"
        style={{
          background:
            'linear-gradient(45deg, #1e1b4b, #581c87, #831843, #1e293b, #0f172a, #1e1b4b)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 30s ease infinite',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setScreen('home')}
              className="flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full transition-all transform hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <h1
              className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-purple-200 to-fuchsia-200 tracking-widest"
              style={{ filter: 'drop-shadow(0 0 12px rgba(167,139,250,.5))' }}
            >
              V I B E V E N D
            </h1>

            <button
              onClick={() => setScreen('checkout')}
              className="relative flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400 text-white px-6 py-3 rounded-full transition-all font-bold"
              style={{
                boxShadow:
                  '0 0 20px rgba(236,72,153,.6), 0 0 40px rgba(34,211,238,.4)',
                animation: pulse ? 'slowPulse 3s ease-in-out infinite' : 'none',
              }}
            >
              <ShoppingCart className="w-5 h-5" />
              Cart ({cart.length})
            </button>
          </div>

          <div className="space-y-8">
            {/* VIP PACKS */}
            <div>
              <div className="mb-6 text-center">
                <h2
                  className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 mb-2"
                  style={{ filter: 'drop-shadow(0 0 15px rgba(251,191,36,.8))' }}
                >
                  💎 VIP PACKS
                </h2>
                <p className="text-yellow-200 text-sm italic">
                  Curated vibes — Everything you need, all in one pack
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vipPacks.map((pack) => (
                  <div
                    key={pack.id}
                    className={`bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border-2 transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer ${
                      selectedProduct === pack.id
                        ? 'border-yellow-300 shadow-2xl shadow-yellow-300/50 scale-110 bg-yellow-300/20'
                        : 'border-yellow-400/40 hover:border-yellow-300 hover:shadow-yellow-500/50'
                    }`}
                    style={
                      selectedProduct !== pack.id
                        ? { boxShadow: '0 0 20px rgba(251,191,36,.3)' }
                        : {
                            boxShadow:
                              '0 0 30px rgba(253,224,71,.8), 0 0 60px rgba(253,224,71,.5)',
                          }
                    }
                    onClick={() => addToCart(pack)}
                  >
                    <div className="text-6xl mb-4 text-center">{pack.emoji}</div>
                    <div className="text-yellow-300 text-xs font-black text-center mb-1 tracking-wider">
                      {pack.category}
                    </div>
                    <h3
                      className="text-white font-bold text-lg mb-1 text-center"
                      style={{ textShadow: '0 0 10px rgba(255,255,255,.5)' }}
                    >
                      {pack.name}
                    </h3>
                    <div className="text-purple-200 text-xs text-center mb-3 italic">
                      {pack.description}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-gray-400 text-sm line-through">
                        ${fmt(pack.originalPrice)}
                      </div>
                      <div
                        className="text-cyan-300 text-2xl font-black"
                        style={{
                          textShadow:
                            '0 0 15px rgba(34,211,238,.8), 0 0 30px rgba(34,211,238,.5)',
                        }}
                      >
                        ${fmt(pack.price)}
                      </div>
                    </div>
                    <div className="text-yellow-300 text-xs text-center mt-2 font-bold">
                      SAVE 10%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUICK PICKS */}
            <div>
              <div className="mb-6 text-center">
                <h2
                  className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-200 to-green-300 mb-2"
                  style={{ filter: 'drop-shadow(0 0 15px rgba(52,211,153,.8))' }}
                >
                  ⚡ QUICK PICKS
                </h2>
                <p className="text-green-200 text-sm italic">
                  The essentials that keep the night going
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {quickPicks.map((product) => (
                  <div
                    key={product.id}
                    className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer ${
                      selectedProduct === product.id
                        ? 'border-yellow-300 shadow-2xl shadow-yellow-300/50 scale-110 bg-yellow-300/20'
                        : 'border-white/20 hover:border-green-400 hover:shadow-green-500/50'
                    }`}
                    style={
                      selectedProduct !== product.id
                        ? { boxShadow: '0 0 15px rgba(255,255,255,.1)' }
                        : {
                            boxShadow:
                              '0 0 30px rgba(253,224,71,.8), 0 0 60px rgba(253,224,71,.5)',
                          }
                    }
                    onClick={() => addToCart(product)}
                  >
                    <div className="text-6xl mb-4 text-center">{product.emoji}</div>
                    <h3
                      className="text-white font-bold text-lg mb-2 text-center"
                      style={{ textShadow: '0 0 10px rgba(255,255,255,.5)' }}
                    >
                      {product.name}
                    </h3>
                    <div
                      className="text-green-300 text-sm text-center mb-3"
                      style={{ textShadow: '0 0 10px rgba(52,211,153,.6)' }}
                    >
                      {product.category}
                    </div>
                    <div
                      className="text-cyan-300 text-2xl font-black text-center"
                      style={{
                        textShadow:
                          '0 0 15px rgba(34,211,238,.8), 0 0 30px rgba(34,211,238,.5)',
                      }}
                    >
                      ${fmt(product.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MONTHLY HEAT / HOT DROPS */}
            <div>
              <div className="mb-6 text-center">
                <h2
                  className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-pink-300 to-fuchsia-300 mb-2 animate-pulse"
                  style={{ filter: 'drop-shadow(0 0 15px rgba(236,72,153,.8))' }}
                >
                  🔥 MONTHLY HEAT
                </h2>
                <p className="text-fuchsia-200 text-sm italic">
                  Exclusive VibeVend specials — New monthly
                </p>
              </div>
              {monthlyHeat.length === 0 ? (
                <div className="text-center py-12 bg-white/5 backdrop-blur-lg rounded-2xl border-2 border-fuchsia-400/30">
                  <p className="text-fuchsia-200 text-lg font-bold mb-2">
                    Coming Soon 🔥
                  </p>
                  <p className="text-purple-200 text-sm">
                    Check back next month for exclusive drops!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {monthlyHeat.map((item) => (
                    <div
                      key={item.id}
                      className={`bg-gradient-to-br from-fuchsia-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border-2 transition-all transform hover:scale-105 hover:shadow-2xl cursor-pointer ${
                        selectedProduct === item.id
                          ? 'border-yellow-300 shadow-2xl shadow-yellow-300/50 scale-110 bg-yellow-300/20'
                          : 'border-fuchsia-400/40 hover:border-fuchsia-300 hover:shadow-fuchsia-500/50'
                      }`}
                      onClick={() => addToCart(item)}
                    >
                      <div className="text-6xl mb-4 text-center">{item.emoji}</div>
                      <div className="text-fuchsia-300 text-xs font-black text-center mb-1 tracking-wider">
                        LIMITED
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1 text-center">
                        {item.name}
                      </h3>
                      <div className="text-cyan-300 text-2xl font-black text-center">
                        ${fmt(item.price)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------- CHECKOUT ----------
  if (screen === 'checkout') {
    return (
      <div
        className="min-h-screen p-6 flex items-center justify-center"
        style={{
          background:
            'linear-gradient(45deg, #1e1b4b, #581c87, #831843, #1e293b, #0f172a, #1e1b4b)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 30s ease infinite',
        }}
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full border-2 border-white/20 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black text-white">Your Cart</h2>
            <button
              onClick={() => setScreen('products')}
              className="text-fuchsia-300 hover:text-fuchsia-200 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-purple-300 mb-4" />
              <p className="text-purple-200 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="bg-white/5 rounded-xl p-4 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.emoji}</span>
                      <div>
                        <div className="text-white font-semibold">{item.name}</div>
                        <div className="text-cyan-300 font-bold">${fmt(item.price)}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-400 hover:text-red-300 transition-colors font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-white/20 pt-4 mb-6">
                <div className="flex justify-between items-center text-white text-2xl font-black">
                  <span>Total:</span>
                  <span className="text-cyan-300">${fmt(total)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white py-4 rounded-full text-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg"
                style={{
                  boxShadow:
                    '0 0 30px rgba(236,72,153,.6), 0 0 60px rgba(168,85,247,.4)',
                  textShadow: '0 0 10px rgba(255,255,255,.8)',
                }}
              >
                <CreditCard className="w-6 h-6" />
                Complete Purchase
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ---------- SUCCESS ----------
  if (screen === 'success') {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-8"
        style={{
          background:
            'linear-gradient(45deg, #1e1b4b, #581c87, #831843, #1e293b, #0f172a, #1e1b4b)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 30s ease infinite',
        }}
      >
        <div className="text-center">
          <div className="mb-8 animate-bounce">
            <Check className="w-32 h-32 mx-auto text-green-400 bg-green-400/20 rounded-full p-6" />
          </div>

          <h2 className="text-6xl font-black text-white mb-4">Success!</h2>
          <p className="text-2xl text-fuchsia-200 mb-8">Your items are on the way!</p>

          <div className="text-purple-200 text-lg animate-pulse">
            Dispensing your products...
          </div>

          <div className="mt-12 text-cyan-300 text-xl font-bold">
            Thanks for choosing VibeVend! ✨😉
          </div>
        </div>
      </div>
    );
  }

  return null;
}
