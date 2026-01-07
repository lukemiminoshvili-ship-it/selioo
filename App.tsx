import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import ChatBot from './components/ChatBot';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import { SHOP_NAME } from './constants';

const FooterComponent: React.FC = () => (
  <footer className="py-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-sm text-slate-500">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-2 space-y-4">
          <div className="font-bold text-2xl text-slate-900 dark:text-white">Tech<span className="text-blue-500">Nova.</span></div>
          <p className="max-w-xs text-slate-500">პრემიუმ ტექნოლოგიების მაღაზია საქართველოში. გთავაზობთ უახლეს სმარტ მოწყობილობებს და გადაწყვეტილებებს თქვენი სახლისთვის.</p>
        </div>
        <div className="space-y-4">
          <div className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">მაღაზია</div>
          <ul className="space-y-2">
            <li><a href="#/catalog" className="hover:text-blue-500 transition-colors">კატალოგი</a></li>
            <li><a href="#/" className="hover:text-blue-500 transition-colors">რჩეული</a></li>
            <li><a href="#/checkout" className="hover:text-blue-500 transition-colors">კალათა</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <div className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">დახმარება</div>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-500 transition-colors">მხარდაჭერა</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">კონფიდენციალურობა</a></li>
            <li><a href="#" className="hover:text-blue-500 transition-colors">წესები და პირობები</a></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs">
        <div>© 2024 {SHOP_NAME}. ყველა უფლება დაცულია.</div>
        <div className="flex space-x-4">
          <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-6 w-auto opacity-50 grayscale hover:grayscale-0 transition-all" />
          <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-6 w-auto opacity-50 grayscale hover:grayscale-0 transition-all" />
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <FooterComponent />
          <ChatBot />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
