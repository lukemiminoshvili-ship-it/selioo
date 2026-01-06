import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  initiateTBCPayment,
  initiateBOGPayment,
  initiateStripePayment
} from '../services/payment';

const CheckoutPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useApp();
  // ნაგულისხმევ მეთოდად დავაყენოთ 'tbc'
  const [paymentMethod, setPaymentMethod] = useState<'tbc' | 'bog' | 'stripe'>('tbc');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 5;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setIsProcessing(true);

    try {
      let response;
      if (paymentMethod === 'tbc') {
        response = await initiateTBCPayment(total);
      } else if (paymentMethod === 'bog') {
        response = await initiateBOGPayment(total);
      } else {
        response = await initiateStripePayment(total);
      }

      if (response.success) {
        // TBC-ს შემთხვევაში ვაჩვენებთ გადამისამართების ანიმაციას
        if (paymentMethod === 'tbc') {
          setRedirecting(true);
          // ბანკის გვერდზე გადასვლას სჭირდება მცირე დრო
          setTimeout(() => {
            clearCart();
          }, 1000);
        } else {
          setIsProcessing(false);
          setOrderComplete(true);
          clearCart();
        }
      } else {
        alert(response.error || "გადახდა ვერ მოხერხდა");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
      setIsProcessing(false);
      alert("გადახდის ინიცირება ვერ მოხერხდა. გთხოვთ სცადოთ მოგვიანებით.");
    }
  };

  if (redirecting) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white dark:bg-slate-950 page-transition">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold mb-2">გადამისამართება ბანკის გვერდზე...</h2>
        <p className="text-slate-500">გთხოვთ არ დახუროთ ფანჯარა</p>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center space-y-8 page-transition">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">შეკვეთა დადასტურებულია!</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">
          გმადლობთ შენაძენისთვის. თქვენი ტრანზაქცია წარმატებით დასრულდა.
        </p>
        <button
          onClick={() => window.location.hash = '#/'}
          className="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-full font-bold hover:opacity-90 transition-all shadow-xl"
        >
          მთავარ გვერდზე დაბრუნება
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 page-transition">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tight mb-2">გადახდა</h1>
        <p className="text-slate-500">დაასრულეთ თქვენი შეკვეთა უსაფრთხოდ TBC-ით.</p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 space-y-6">
          <div className="text-6xl">🛒</div>
          <p className="text-slate-500 text-xl font-medium">თქვენი კალათა ცარიელია.</p>
          <button onClick={() => window.location.hash = '#/catalog'} className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 transition-all">
            პროდუქციის დათვალიერება
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm">1</span>
                შეკვეთის დეტალები
              </h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-6 p-6 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all hover:shadow-lg">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 rounded-2xl object-contain bg-slate-50 dark:bg-slate-950 p-2" />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.product.name}</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{item.product.model}</p>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <div className="font-bold text-lg text-blue-600">${(item.product.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm">2</span>
                გადახდის მეთოდი
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('tbc')}
                  className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center justify-center space-y-3 group ${paymentMethod === 'tbc' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                >
                  <div className={`text-xl font-black italic transition-colors ${paymentMethod === 'tbc' ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>TBC</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">TBC Gateway</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('bog')}
                  className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center justify-center space-y-3 group ${paymentMethod === 'bog' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                >
                  <div className={`text-xl font-black transition-colors ${paymentMethod === 'bog' ? 'text-orange-600' : 'text-slate-400 group-hover:text-slate-600'}`}>BOG</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">BOG iPay</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center justify-center space-y-3 group ${paymentMethod === 'stripe' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                >
                  <div className={`text-xl font-black transition-colors ${paymentMethod === 'stripe' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>STRIPE</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">International</span>
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-10 rounded-[40px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-8 shadow-2xl">
              <h2 className="text-2xl font-bold">შეკვეთის ჯამი</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold uppercase text-slate-400 tracking-widest mb-1">სულ გადასახდელი</span>
                  <span className="font-black text-4xl text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-xl transition-all shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-70 shadow-blue-500/30"
              >
                {isProcessing ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>მუშავდება...</span>
                  </>
                ) : (
                  <span>გადახდა TBC-ით</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;