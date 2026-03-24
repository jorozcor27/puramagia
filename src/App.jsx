import { useState } from 'react';
import { ShoppingCart, User, X, Sparkles, Star } from 'lucide-react';
import { supabase } from './supabaseClient';

const MOCK_PRODUCTS = [
  { id: 1, title: 'Vela Roja - Atracción', price: 25.00, image: '/candle_red.png', tag: 'FASE LUNAR' },
  { id: 2, title: 'Vela Blanca - Limpieza Astral', price: 22.00, image: '/candle_white.png', tag: 'ESENCIAL' },
  { id: 3, title: 'Vela Dorada - Abundancia', price: 28.00, image: '/candle_gold.png', tag: 'RITUAL' },
  { id: 4, title: 'Vela Negra - Alta Protección', price: 30.00, image: '/candle_black.png', tag: 'EXCLUSIVO' },
  { id: 5, title: 'Vela Púrpura - Transmutación', price: 24.00, image: '/candle_purple.png', tag: 'MISTICO' },
  { id: 6, title: 'Vela Verde - Ritual de Sanación', price: 20.00, image: '/candle_green.png', tag: 'NUEVO' }
];

function App() {
  const [products] = useState(MOCK_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const cartTotal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  const itemsCount = cart.reduce((acc, curr) => acc + curr.qty, 0);

  return (
    <div className="bg-background text-on-background font-body selection:bg-primary/30 min-h-screen relative">
      <header className="bg-[#17101f] dark:bg-[#17101f] flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <button className="text-[#ebb2ff] hover:text-[#fff9ef] transition-colors">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="font-headline tracking-widest uppercase text-2xl font-bold tracking-[0.2em] text-[#fff9ef]">PURA MAGIA</span>
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a className="font-label text-xs tracking-widest text-[#fff9ef] hover:text-[#ebb2ff] transition-colors" href="#">Santuario</a>
          <a className="font-label text-xs tracking-widest text-[#3e3647] hover:text-[#ebb2ff] transition-colors" href="#">Cristales</a>
          <a className="font-label text-xs tracking-widest text-[#3e3647] hover:text-[#ebb2ff] transition-colors" href="#">Rituales</a>
          <a className="font-label text-xs tracking-widest text-[#3e3647] hover:text-[#ebb2ff] transition-colors" href="#">Tarot</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-[#ebb2ff] hover:text-[#fff9ef] transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button onClick={() => setIsCartOpen(true)} className="text-[#ebb2ff] hover:text-[#fff9ef] transition-colors relative">
            <span className="material-symbols-outlined">shopping_bag</span>
            {itemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-background rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {itemsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[795px] flex items-center justify-center overflow-hidden px-6">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
            <img alt="Celestial night sky" className="w-full h-full object-cover opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgFW1whH9N3aki-4-YJYP7grwv_7mKV4POxQskiRvCr40JuxcVk0VTwzBayk33_0W0ndHOxlNpOBz72qCSioI4QnbT3rJ9X63swYheY49UQLCuYyoifx1wZQCnRSpjuj7a5i0iCtOasT0TWNZsL7_39AwbZpHeXO4ZM-FcFLH4nRJGeGs8rvvjodbb1DLKltBrS_GHylcFI19Ca-q9h9GxmOKRHZSql8RqX-_qZ0MeUDTivC4WDdPMo2-RiLOWyW5-i1IRKgWwDg" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <img src="/logo.jpg" alt="Puramagia Logo" className="h-32 w-32 md:h-48 md:w-48 drop-shadow-[0_0_15px_rgba(235,178,255,0.4)] object-cover" style={{ borderRadius: '50%' }} />
            </div>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-secondary mb-6 tracking-tight">
              Despierta tu <span className="text-primary italic">Pura Magia</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Explora el santuario digital donde la sabiduría ancestral y el lujo contemporáneo se encuentran para elevar tu espíritu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full font-label text-sm tracking-widest uppercase hover:scale-105 transition-transform duration-300 shadow-xl shadow-primary/10">
                Iniciar Ritual
              </button>
              <button className="px-10 py-4 border border-outline-variant/30 text-secondary rounded-full font-label text-sm tracking-widest uppercase hover:bg-surface-container-high transition-colors">
                Ver Catálogo
              </button>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <span className="font-label text-[10px] tracking-widest uppercase">Descubrir</span>
            <span className="material-symbols-outlined animate-bounce">expand_more</span>
          </div>
        </section>

        {/* Categorías Místicas (Bento Grid) */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="font-label text-primary tracking-[0.3em] uppercase block mb-4">El Camino</span>
              <h2 className="font-headline text-4xl md:text-5xl text-secondary">Categorías Místicas</h2>
            </div>
            <p className="font-body text-on-surface-variant max-w-md text-right">
              Herramientas consagradas para cada intención, desde la claridad del cristal hasta el susurro del tarot.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden bg-surface-container-low rounded-xl aspect-square flex flex-col justify-end p-8 transition-all hover:bg-surface-container-high cursor-pointer border border-[#988d9e]/10 shadow-lg">
              <img src="/candle_green.png" alt="Cristales" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17101f] via-[#17101f]/60 to-transparent"></div>
              <div className="relative z-10 w-full flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-5xl text-primary mb-3 drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
                <h3 className="font-headline text-3xl text-secondary mb-2 drop-shadow-md">Cristales</h3>
                <span className="font-label text-xs text-primary tracking-widest flex items-center gap-2 mt-2">
                  EXPLORAR <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-surface-container-low rounded-xl aspect-square flex flex-col justify-end p-8 transition-all hover:bg-surface-container-high cursor-pointer border border-[#988d9e]/10 shadow-lg">
              <img src="/candle_purple.png" alt="Velas" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17101f] via-[#17101f]/60 to-transparent"></div>
              <div className="relative z-10 w-full flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-5xl text-[#ffe16d] mb-3 drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>flare</span>
                <h3 className="font-headline text-3xl text-secondary mb-2 drop-shadow-md">Velas</h3>
                <span className="font-label text-xs text-primary tracking-widest flex items-center gap-2 mt-2">
                  VER MÁS <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-surface-container-low rounded-xl aspect-square flex flex-col justify-end p-8 transition-all hover:bg-surface-container-high cursor-pointer border border-[#988d9e]/10 shadow-lg">
              <img src="/candle_gold.png" alt="Tarot" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17101f] via-[#17101f]/60 to-transparent"></div>
              <div className="relative z-10 w-full flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-5xl text-primary mb-3 drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>style</span>
                <h3 className="font-headline text-3xl text-secondary mb-2 drop-shadow-md">Tarot</h3>
                <span className="font-label text-xs text-primary tracking-widest flex items-center gap-2 mt-2">
                  VER MÁS <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Novedades Celestiales mapped to State */}
        <section className="py-24 bg-surface-container-lowest overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <span className="font-label text-secondary-fixed tracking-[0.4em] uppercase block mb-4">Lo Nuevo</span>
              <h2 className="font-headline text-4xl md:text-6xl text-secondary">Novedades Celestiales</h2>
            </div>
            {/* Products grid mapping */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {products.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative overflow-hidden aspect-[4/5] bg-surface-container mb-6 rounded-lg">
                    <img alt={product.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" src={product.image} />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-on-primary font-label text-[10px] px-3 py-1 rounded-full tracking-tighter shadow-md">
                        {product.tag}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-headline text-xl text-secondary mb-2">{product.title}</h4>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-secondary-fixed-dim text-lg">€{product.price.toFixed(2)}</span>
                    <button onClick={() => addToCart(product)} className="material-symbols-outlined text-primary hover:scale-110 transition-transform cursor-pointer">add_circle</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-40 text-center">
              <a className="font-label text-sm text-secondary tracking-widest uppercase border-b border-primary/40 pb-2 hover:border-primary transition-colors" href="#">Ver todas las novedades</a>
            </div>
          </div>
        </section>

        {/* Ritual Selector */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto bg-surface-container-high rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
            </div>
            <h3 className="font-headline text-3xl text-secondary mb-8">¿Cuál es tu energía hoy?</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <button className="px-6 py-3 bg-primary-container/40 text-primary border border-primary/20 rounded-full font-label text-xs tracking-widest flex items-center gap-2 hover:bg-primary-container transition-colors">
                <span className="material-symbols-outlined text-sm">brightness_1</span> LUNA NUEVA
              </button>
              <button className="px-6 py-3 bg-surface-container-highest text-on-surface-variant border border-outline-variant/10 rounded-full font-label text-xs tracking-widest flex items-center gap-2 hover:bg-primary-container hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">brightness_3</span> CRECIENTE
              </button>
              <button className="px-6 py-3 bg-surface-container-highest text-on-surface-variant border border-outline-variant/10 rounded-full font-label text-xs tracking-widest flex items-center gap-2 hover:bg-primary-container hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">wb_sunny</span> LUNA LLENA
              </button>
              <button className="px-6 py-3 bg-surface-container-highest text-on-surface-variant border border-outline-variant/10 rounded-full font-label text-xs tracking-widest flex items-center gap-2 hover:bg-primary-container hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">brightness_2</span> MENGUANTE
              </button>
            </div>
            <p className="font-body text-on-surface-variant max-w-lg mx-auto mb-8">
              Selecciona una fase para descubrir qué rituales y elementos se alinean mejor con el flujo cósmico actual.
            </p>
            <button className="font-label text-sm text-secondary-fixed font-bold tracking-[0.2em] uppercase">VER RECOMENDACIONES</button>
          </div>
        </section>
      </main>

      {/* Cart Overlay using purely Tailwind styles */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex justify-end">
          <div className="w-[400px] h-full bg-surface border-l border-primary/20 p-8 shadow-2xl flex flex-col z-[101]">
            <div className="flex justify-between items-center mb-8 border-b border-primary/20 pb-4">
              <h2 className="font-headline text-2xl text-secondary flex items-center gap-2">
                <span className="material-symbols-outlined">shopping_bag</span> Tu Carrito
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-secondary hover:text-primary transition-colors">
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-6">
              {cart.length === 0 ? (
                <p className="text-on-surface-variant text-center mt-10 font-body">El carrito está vacío</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-surface-container-low p-4 rounded-lg">
                    <div>
                      <span className="block font-headline text-secondary text-lg">{item.title}</span>
                      <span className="block text-primary text-sm">€{item.price.toFixed(2)} x {item.qty}</span>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-error hover:text-error-container">
                      <X size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-8 pt-4 border-t border-primary/20">
                <div className="flex justify-between font-headline text-2xl text-secondary mb-6">
                  <span>Total:</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold tracking-widest uppercase font-label py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                  Proceder al Pago
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#120b1a] flex flex-col items-center py-12 px-8 space-y-6 w-full">
        <div className="font-headline text-3xl text-[#fff9ef] tracking-[0.3em] mb-4">PURA MAGIA</div>
        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <a className="font-body text-sm text-[#3e3647] hover:text-[#ebb2ff] transition-all" href="#">Lecturas Tarot</a>
          <a className="font-body text-sm text-[#3e3647] hover:text-[#ebb2ff] transition-all" href="#">Guía Cristales</a>
          <a className="font-body text-sm text-[#3e3647] hover:text-[#ebb2ff] transition-all" href="#">Servicio</a>
        </div>
        <p className="font-body text-[10px] tracking-widest text-[#3e3647] uppercase opacity-80">© 2026 PURA MAGIA RITUALES</p>
      </footer>
    </div>
  );
}

export default App;
