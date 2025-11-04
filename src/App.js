import React, { useEffect, useMemo, useState } from 'react';
import { ShoppingCart, CreditCard, Check, ArrowLeft } from 'lucide-react';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [cart, setCart] = useState([]);
  const [pulse, setPulse] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Detect older/low-memory devices to ease animations (Android 5–7, <=2GB)
  const performanceMode = useMemo(() => {
    const ua = (navigator.userAgent || '').toLowerCase();
    const isOldAndroid = /android 5|android 6|android 7/.test(ua);
    const deviceMem = navigator.deviceMemory || 2;
    return isOldAndroid || deviceMem <= 2;
  }, []);

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

  // Lightweight keyframes (cheaper than the original effects)
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes heartbeatLite {
        0%, 100% { transform: scale(1); opacity: .95; }
        50%      { transform: scale(1.05); opacity: .85; }
      }
      @keyframes slowPulseLite {
        0%, 100% { opacity: 1; }
        50%      { opacity: .78; }
      }
      @keyframes gradientShiftLite {
        0% { background-position: 0% 50%; }
        50% { background-position: 60% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes ringScaleLite {
        0%, 100% { transform: scale(1); opacity: .95; }
        50%      { transform: scale(1.035); opacity: .85; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const addToCart = (product) => {
    setSelectedProduct(product.id);
    setCart((c) => [...c, product]);
    setPulse(false);
    setTimeout(() => setPulse(true), 1200);
    setTimeout(() => setSelectedProduct(null), 450);
  };

  const removeFromCart = (index) => setCart((c) => c.filter((_, i) => i !== index));
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    setScreen('success');
    setTimeout(() => {
      setCart([]);
      setScreen('home');
    }, 3000);
  };

  // ----------------------------- HOME -----------------------------
  if (screen === 'home') {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden"
        style={{
          // Keep same nightclub gradient; reduce motion on old devices
          background: 'radial-gradient(1200px 800px at 50% 52%, #0b1220 15%, #151232 55%, #3c1268 100%)',
          backgroundSize: '400% 400%',
          animation: performanceMode ? 'none' : 'gradientShiftLite 40s ease infinite',
          willChange: performanceMode ? 'auto' : 'background-position',
          cursor: 'pointer'
        }}
        onClick={() => setScreen('products')}
      >
        {/* Aura glows (smaller blur = smoother) */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 w-[780px] h-[780px] rounded-full"
            style={{
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(closest-side, rgba(236,72,153,.22), rgba(236,72,153,0))',
              filter: performanceMode ? 'blur(10px)' : 'blur(26px)',
              opacity: 0.9,
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-[720px] h-[720px] rounded-full"
            style={{
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(closest-side, rgba(34,211,238,.20), rgba(34,211,238,0))',
              filter: performanceMode ? 'blur(8px)' : 'blur(22px)',
              opacity: 0.85,
            }}
          />
        </div>

        {/* Title + rings (SVG rings = much smoother) */}
        <div className="text-center z-10 max-w-2xl select-none">
          <h1
            className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-purple-200 to-fuchsia-200 mb-6 tracking-[0.35em]"
            style={{ filter: 'drop-shadow(0 0 14px rgba(167,139,250,.45))' }}
          >
            V I B E V E N D
          </h1>

          <p
            className="text-3xl text-fuchsia-200 mb-2 font-extrabold"
            style={{ textShadow: '0 0 18px rgba(236,72,153,.75)' }}
          >
            Elevate Your Vibe
          </p>
          <p
            className="text-lg text-purple-200/90 mb-10"
            style={{ textShadow: '0 0 8px rgba(192,132,252,.5)' }}
          >
            Everything you need, exactly when you need it
          </p>

          {/* Rings */}
          <div className="relative mx-auto w-80 h-80">
            <svg
              width="100%" height="100%" viewBox="0 0 320 320"
              style={{ display: 'block' }}
            >
              {/* Cyan ring */}
              <g
                style={{
                  transformOrigin: '160px 160px',
                  animation: 'ringScaleLite 7s ease-in-out infinite'
                }}
              >
                <circle cx="160" cy="160" r="118" fill="none"
                        stroke="rgba(34,211,238,0.20)" strokeWidth="10" />
                <circle cx="160" cy="160" r="120" fill="none"
                        stroke="rgba(34,211,238,0.65)" strokeWidth="3" />
              </g>

              {/* Fuchsia ring (staggered) */}
              <g
                style={{
                  transformOrigin: '160px 160px',
                  animation: 'ringScaleLite 7s ease-in-out infinite',
                  animationDelay: '2.2s'
                }}
              >
                <circle cx="160" cy="160" r="98" fill="none"
                        stroke="rgba(236,72,153,0.20)" strokeWidth="10" />
                <circle cx="160" cy="160" r="100" fill="none"
                        stroke="rgba(236,72,153,0.65)" strokeWidth="3" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------- PRODUCTS ---------------------------
  if (screen === 'products') {
    const bgStyle = performanceMode
      ? {
          background:
            'linear-gradient(45deg, #1e1b4b, #581c87, #831843, #1e293b, #0f172a, #1e1b4b)',
          backgroundSize: '200% 200%',
          animation: 'none',
        }
      : {
          background:
            'linear-gradient(45deg, #1e1b4b, #581c87, #831843, #1e293b, #0f172a, #1e1b4b)',
          backgroundSize: '400% 400%',
          animation: 'gradientShiftLite 36s ease infinite',
        };

    return (
      <div className="min-h-screen p-6" style={bgStyle}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setScreen('home')}
              className="flex items-center gap-2 text-white bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-full transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <h1
              className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-purple-200 to-fuchsia-200 tracking-widest"
              style={{ filter: 'drop-shadow(0 0 10px rgba(167,139,250,.4))' }}
            >
              V I B E V E N D
            </h1>

            <button
              onClick={() => setScreen('checkout')}
              className="relative flex items-center gap-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500 hover:from-fuchsia-400 hover:to-cyan-400 text-white px-6 py-3 rounded-full font-bold"
              style={{
                boxShadow:
                  '0 0 18px rgba(236,72,153,.55), 0 0 36px rgba(34,211,238,.35)',
                animation: pulse ? 'slowPulseLite 3s ease-in-out infinite' : 'none',
                willChange: 'opacity',
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
                  style={{ filter: 'drop-shadow(0 0 12px rgba(251,191,36,.7))' }}
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
                    className={`bg-gradient-to-br from-yellow-500/15 to-orange-500/15 rounded-2xl p-6 border-2 transition-transform ${
                      selectedProduct === pack.id
                        ? 'border-yellow-300 scale-105'
                        : 'border-yellow-400/40 hover:border-yellow-300'
                    }`}
                    style={{
                      boxShadow:
                        selectedProduct === pack.id
                          ? '0 0 26px rgba(253,224,71,.55)'
                          : '0 0 14px rgba(251,191,36,.25)',
                      willChange: 'transform',
                    }}
                    onClick={() => addToCart(pack)}
                  >
                    <div className="text-6xl mb-4 text-center">{pack.emoji}</div>
                    <div className="text-yellow-300 text-xs font-black text-center mb-1 tracking-wider">
                      {pack.category}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1 text-center">
                      {pack.name}
                    </h3>
                    <div className="text-purple-200 text-xs text-center mb-3 italic">
                      {pack.description}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-gray-400 text-sm line-through">
                        ${pack.originalPrice}
                      </div>
                      <div className="text-cyan-300 text-2xl font-black">
                        ${pack.price}
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
                  style={{ filter: 'drop-shadow(0 0 12px rgba(52,211,153,.7))' }}
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
                    className={`bg-white/10 rounded-2xl p-6 border-2 transition-transform ${
                      selectedProduct === product.id
                        ? 'border-yellow-300 scale-105'
                        : 'border-white/20 hover:border-green-400'
                    }`}
                    style={{
                      boxShadow:
                        selectedProduct === product.id
                          ? '0 0 26px rgba(253,224,71,.55)'
                          : '0 0 12px rgba(255,255,255,.12)',
                      willChange: 'transform',
                    }}
                    onClick={() => addToCart(product)}
                  >
                    <div className="text-6xl mb-4 text-center">{product.emoji}</div>
                    <h3 className="text-white font-bold text-lg mb-2 text-center">
                      {product.name}
                    </h3>
                    <div className="text-green-300 text-sm text-center mb-3">
                      {product.category}
                    </div>
                    <div className="text-cyan-300 text-2xl font-black text-center">
                      ${product.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MONTHLY HEAT */}
            <div>
              <div className="mb-6 text-center">
                <h2
                  className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-300 via-pink-300 to-fuchsia-300 mb-2"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(236,72,153,.7))' }}
                >
                  🔥 MONTHLY HEAT
                </h2>
                <p className="text-fuchsia-200 text-sm italic">
                  Exclusive VibeVend specials — New monthly
                </p>
              </div>
              {monthlyHeat.length === 0 ? (
                <div className="text-center py-12 bg-white/5 rounded-2xl border-2 border-fuchsia-400/30">
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
                      className={`bg-gradient-to-br from-fuchsia-500/15 to-pink-500/15 rounded-2xl p-6 border-2 transition-transform ${
                        selectedProduct === item.id
                          ? 'border-yellow-300 scale-105'
                          : 'border-fuchsia-400/40 hover:border-fuchsia-300'
                      }`}
                      style={{
                        boxShadow:
                          selectedProduct === item.id
                            ? '0 0 26px rgba(253,224,71,.55)'
                            : '0 0 12px rgba(236,72,153,.3)',
                        willChange: 'transform',
                      }}
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
                        ${item.price}
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

  // ---------------------------- CHECKOUT ---------------------------
  if (screen === 'checkout') {
    const bgStyle = performanceMode
      ? { background: 'linear-gradient(45deg, #1e1b4b, #581c87, #831843, #1e293b, #0f172a, #1e1b4b)' }
      : {
          background: 'linear-gradient(45deg, #1e1b4b, #581c87, #831843, #1e293b, #0f172a, #1e1b4b)',
          backgroundSize: '400% 400%',
          animation: 'gradientShiftLite 36s ease infinite',
        };

    return (
      <div className="min-h-screen p-6 flex items-center justify-center" style={bgStyle}>
        <div className="bg-white/10 rounded-3xl p-8 max-w-md w-full border-2 border-white/20 shadow-2xl">
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
                    key={index}
                    className="bg-white/5 rounded-xl p-4 flex justify-between items-center"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{item.emoji}</span>
                      <div>
                        <div className="text-white font-semibold">{item.name}</div>
                        <div className="text-cyan-300 font-bold">${item.price}</div>
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
                  <span className="text-cyan-300">${total}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white py-4 rounded-full text-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                style={{
                  boxShadow: '0 0 26px rgba(236,72,153,.5), 0 0 44px rgba(168,85,247,.35)',
                  animation: pulse ? 'slowPulseLite 3s ease-in-out infinite' : 'none',
                  willChange: 'transform, opacity',
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

  // ---------------------------- SUCCESS ----------------------------
  if (screen === 'success') {
    const bgStyle = performanceMode
      ? { background: 'linear-gradient(45deg, #1e1b4b, #581c87, #831843, #1e293b, #0f172a, #1e1b4b)' }
      : {
          background: 'linear-gradient(45deg, #1e1b4b, #581c87, #831843, #1e293b, #0f172a, #1e1b4b)',
          backgroundSize: '400% 400%',
          animation: 'gradientShiftLite 36s ease infinite',
        };

    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={bgStyle}>
        <div className="text-center">
          <div className="mb-8">
            <Check className="w-32 h-32 mx-auto text-green-400 bg-green-400/20 rounded-full p-6" />
          </div>
          <h2 className="text-6xl font-black text-white mb-4">Success!</h2>
          <p className="text-2xl text-fuchsia-200 mb-8">Your items are on the way!</p>
          <div className="text-purple-200 text-lg">Dispensing your products...</div>
          <div className="mt-12 text-cyan-300 text-xl font-bold">Thanks for choosing VibeVend! ✨😉</div>
        </div>
      </div>
    );
  }

  return null;
}

