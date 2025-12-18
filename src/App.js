// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { ShoppingBag, Heart, Menu, X, Star, ArrowRight, Trash2, CheckCircle, Instagram } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { products } from './data/products';

/* --- UI COMPONENTS --- */

const Button = ({ children, onClick, variant = 'primary', className = '', fullWidth = false }) => {
  const baseStyle = "px-6 py-3 rounded-full font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-rose-400 hover:bg-rose-500 text-white shadow-lg shadow-rose-200",
    secondary: "bg-emerald-900 hover:bg-emerald-800 text-white shadow-lg",
    outline: "border-2 border-emerald-900 text-emerald-900 hover:bg-emerald-50",
    ghost: "text-emerald-800 hover:bg-stone-100"
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col h-full">
      <div className="relative overflow-hidden aspect-[4/5]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm">
          <Heart size={18} className="text-rose-400 hover:fill-rose-400 transition-colors cursor-pointer" />
        </div>
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
           <Button variant="secondary" fullWidth onClick={() => addToCart(product)}>Add to Cart</Button>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`} className="text-lg font-serif font-semibold text-emerald-950 mb-2 hover:text-rose-500 transition-colors">
          {product.name}
        </Link>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xl font-medium text-emerald-900">₹{product.price}</span>
          <div className="flex items-center text-amber-400 text-sm">
            <Star size={14} fill="currentColor" />
            <span className="ml-1 text-stone-500">{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="font-serif text-2xl font-bold text-emerald-950 flex items-center gap-2">
            <span className="bg-rose-100 p-2 rounded-full">🧶</span> The Knit Basket
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-medium text-stone-600">
            <Link to="/" className="hover:text-rose-500 transition-colors">Home</Link>
            <Link to="/shop" className="hover:text-rose-500 transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-rose-500 transition-colors">Our Story</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-emerald-900 hover:bg-stone-100 rounded-full transition-colors">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-stone-100 p-4 flex flex-col gap-4">
           <Link to="/" className="text-lg" onClick={() => setIsOpen(false)}>Home</Link>
           <Link to="/shop" className="text-lg" onClick={() => setIsOpen(false)}>Shop</Link>
           <Link to="/about" className="text-lg" onClick={() => setIsOpen(false)}>Our Story</Link>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-emerald-950 text-stone-200 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-serif text-2xl mb-4 text-rose-200">The Knit Basket</h3>
        <p className="text-stone-400 font-light leading-relaxed">
          Handcrafted with patience, love, and the finest yarn. 
          Every loop tells a story, every stitch holds a memory.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">Links</h4>
        <ul className="space-y-2 text-stone-400">
          <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
          <li><Link to="#" className="hover:text-white transition-colors">Shipping Policy</Link></li>
          <li><Link to="#" className="hover:text-white transition-colors">Custom Orders</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4 uppercase tracking-wider text-sm">Connect</h4>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/theknitbasket" target="_blank" rel="noopener noreferrer" aria-label="The Knit Basket on Instagram" className="text-stone-200 hover:text-rose-400">
             <Instagram className="cursor-pointer" />
            </a>
            {/* Add other icons */}
          </div>
        <p className="mt-4 text-stone-500 text-sm">© 2025 The Knit Basket.</p>
      </div>
    </div>
  </footer>
);

/* --- PAGES --- */

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-stone-100 py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <span className="bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-sm font-bold tracking-wide">HANDCRAFTED WITH LOVE</span>
            <h1 className="font-serif text-5xl md:text-6xl text-emerald-950 leading-tight">
              Bring Warmth to <br/><span className="italic text-rose-400">Your Life</span>
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed max-w-md">
              Discover unique, handmade crochet treasures. From blooming bouquets to cozy accessories, each piece is stitched to perfection.
            </p>
            <div className="flex gap-4 pt-4">
              <Link to="/shop"><Button>Shop Collection</Button></Link>
              <Button variant="outline">View Gallery</Button>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
             <div className="aspect-square rounded-full bg-rose-100 absolute -z-10 top-10 right-10 w-full h-full scale-90 blur-3xl opacity-50"></div>
             <img 
               src="/keychain.webp" 
               alt="Crochet Art" 
               className="rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 w-full object-cover"
             />
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-emerald-950 mb-4">Customer Favorites</h2>
          <div className="w-20 h-1 bg-rose-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-emerald-900 text-stone-100 py-16">
         <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
               <div className="w-16 h-16 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🌱</div>
               <h3 className="font-serif text-xl mb-2">Eco-Friendly</h3>
               <p className="text-emerald-200">Sustainable yarn and plastic-free packaging.</p>
            </div>
            <div className="p-6">
               <div className="w-16 h-16 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">👐</div>
               <h3 className="font-serif text-xl mb-2">100% Handmade</h3>
               <p className="text-emerald-200">No machines. Just skilled hands and time.</p>
            </div>
            <div className="p-6">
               <div className="w-16 h-16 bg-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🎁</div>
               <h3 className="font-serif text-xl mb-2">Perfect for Gifting</h3>
               <p className="text-emerald-200">Wrapped beautifully, ready to surprise.</p>
            </div>
         </div>
      </section>
    </>
  );
};

const ShopPage = () => {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Bags", "Accessories", "Gifts", "Decor"];

  const filteredProducts = filter === "All" 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl text-emerald-950 mb-8 text-center">Shop Our Collection</h1>
      
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full border transition-all ${
              filter === cat 
              ? 'bg-rose-400 border-rose-400 text-white' 
              : 'border-stone-200 text-stone-600 hover:border-rose-300 hover:text-rose-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <div className="p-20 text-center">Product not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-stone-50 rounded-3xl overflow-hidden shadow-lg border border-stone-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-rose-400 font-bold tracking-wide uppercase">{product.category}</h3>
            <h1 className="font-serif text-4xl text-emerald-950">{product.name}</h1>
            <div className="flex items-center text-amber-400 gap-1">
               <Star size={18} fill="currentColor" />
               <span className="text-stone-500 text-sm ml-1">({product.rating} / 5.0)</span>
            </div>
          </div>
          
          <p className="text-stone-600 text-lg leading-relaxed">{product.description}</p>
          
          <div className="text-3xl font-medium text-emerald-900">₹{product.price}</div>
          
          <div className="pt-6 border-t border-stone-100 flex gap-4">
             <Button onClick={() => addToCart(product)} className="flex-1">
               Add to Cart
             </Button>
          </div>

          <div className="bg-rose-50 p-4 rounded-xl mt-6">
            <p className="text-sm text-rose-800 italic">
              "Note: Since this is 100% handmade, slight variations in color or size may occur, making your item truly unique."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const { cart, removeFromCart, updateQty, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
       <ShoppingBag size={64} className="text-stone-300 mb-4" />
       <h2 className="text-2xl font-serif text-emerald-950 mb-2">Your cart is empty</h2>
       <p className="text-stone-500 mb-6">Looks like you haven't found your perfect match yet.</p>
       <Link to="/shop"><Button>Start Shopping</Button></Link>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl text-emerald-950 mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
        {cart.map(item => (
          <div key={item.id} className="p-6 border-b border-stone-100 flex gap-6 items-center">
            <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover bg-stone-50" />
            <div className="flex-1">
               <h3 className="font-serif text-lg text-emerald-900">{item.name}</h3>
               <p className="text-stone-500 text-sm">{item.category}</p>
            </div>
            <div className="flex items-center gap-3">
               <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold">-</button>
               <span className="w-4 text-center">{item.qty}</span>
               <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold">+</button>
            </div>
            <div className="text-lg font-medium text-emerald-900 w-24 text-right">₹{item.price * item.qty}</div>
            <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-rose-500 ml-4"><Trash2 size={20}/></button>
          </div>
        ))}
        <div className="p-8 bg-stone-50 flex flex-col items-end gap-4">
           <div className="flex justify-between w-full md:w-1/2 text-lg">
              <span className="text-stone-600">Subtotal</span>
              <span className="font-bold text-emerald-900">₹{cartTotal}</span>
           </div>
           <p className="text-xs text-stone-400">Shipping calculated at checkout</p>
           <Button onClick={() => navigate('/checkout')} className="w-full md:w-auto px-12">Checkout</Button>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const { cartTotal } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <CheckCircle size={80} className="text-green-500 mb-6" />
      <h1 className="font-serif text-4xl text-emerald-950 mb-4">Order Confirmed!</h1>
      <p className="text-lg text-stone-600 max-w-md">Thank you for supporting handmade. We will start crafting your order immediately.</p>
      <Link to="/" className="mt-8"><Button variant="outline">Back to Home</Button></Link>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl text-emerald-950 mb-8 text-center">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
           <h3 className="font-bold text-emerald-900 mb-4">Shipping Details</h3>
           <div className="grid grid-cols-2 gap-4">
             <input type="text" placeholder="First Name" required className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 focus:outline-none focus:border-rose-400" />
             <input type="text" placeholder="Last Name" required className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 focus:outline-none focus:border-rose-400" />
           </div>
           <input type="email" placeholder="Email Address" required className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 focus:outline-none focus:border-rose-400" />
           <input type="text" placeholder="Address" required className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 focus:outline-none focus:border-rose-400" />
           <div className="grid grid-cols-2 gap-4">
             <input type="text" placeholder="City" required className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 focus:outline-none focus:border-rose-400" />
             <input type="text" placeholder="Pincode" required className="w-full p-3 bg-stone-50 rounded-lg border border-stone-200 focus:outline-none focus:border-rose-400" />
           </div>
           <Button fullWidth className="mt-6">Pay ₹{cartTotal}</Button>
        </form>
        
        <div className="bg-stone-50 p-6 rounded-2xl h-fit">
           <h3 className="font-bold text-emerald-900 mb-4">Order Summary</h3>
           <div className="flex justify-between py-2 border-b border-stone-200">
             <span>Subtotal</span>
             <span>₹{cartTotal}</span>
           </div>
           <div className="flex justify-between py-2 border-b border-stone-200">
             <span>Shipping</span>
             <span className="text-green-600">Free</span>
           </div>
           <div className="flex justify-between py-4 font-bold text-xl text-emerald-900">
             <span>Total</span>
             <span>₹{cartTotal}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

/* --- MAIN LAYOUT & ROUTER --- */

const Layout = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-stone-800 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
}

export default App;