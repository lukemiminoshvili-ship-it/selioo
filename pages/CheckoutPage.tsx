
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  initiateTBCPayment, 
  initiateBOGPayment, 
  initiateStripePayment, 
  initiateMockPayment 
} from '../services/payment';

const CheckoutPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useApp();
  const [paymentMethod, setPaymentMethod] = useState<'tbc' | 'bog' | 'stripe' | 'mock'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 5;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setIsProcessing(true);
    const orderId = `ORD-${Date.now()}`;

    try {
      let response;
      if (paymentMethod === 'tbc') {
        response = await initiateTBCPayment(total, orderId);
      } else if (paymentMethod === 'bog') {
        response = await initiateBOGPayment(total, orderId);
      } else if (paymentMethod === 'stripe') {
        response = await initiateStripePayment(total, orderId);
      } else {
        response = await initiateMockPayment(total);
      }

      if (response.success) {
        // Methods that involve external redirection
        if (paymentMethod === 'tbc' || paymentMethod === 'bog') {
          setRedirecting(true);
          setTimeout(() => {
            setRedirecting(false);
            setIsProcessing(false);
            setOrderComplete(true);
            clearCart();
          }, 2000);
        } 
        // Stripe integration would normally use stripe.confirmCardPayment here
        else if (paymentMethod === 'stripe') {
           // Simulating the Stripe checkout modal/processing
           setTimeout(() => {
            setIsProcessing(false);
            setOrderComplete(true);
            clearCart();
           }, 2500);
        }
        else {
          // Mock direct success
          setIsProcessing(false);
          setOrderComplete(true);
          clearCart();
        }
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
          გმადლობთ შენაძენისთვის. თქვენი ტრანზაქცია წარმატებით დასრულდა. შეკვეთა მოგეწოდებათ 24-48 საათის განმავლობაში.
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
        <p className="text-slate-500">დაასრულეთ თქვენი შეკვეთა უსაფრთხოდ.</p>
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
                    <div className="flex items-center space-x-3 bg-slate-50 dark:bg-slate-950 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <button 
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="font-bold w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <div className="font-bold text-lg text-blue-600">${(item.product.price * item.quantity).toFixed(2)}</div>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-[10px] text-red-500 uppercase font-bold tracking-widest hover:underline mt-1">წაშლა</button>
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button 
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center justify-center space-y-3 group ${paymentMethod === 'stripe' ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="20" viewBox="0 0 48 20" className={`transition-opacity ${paymentMethod === 'stripe' ? 'opacity-100' : 'opacity-40 group-hover:opacity-70'}`}>
                    <path fill={paymentMethod === 'stripe' ? '#635bff' : '#64748b'} d="M41.03 9.3c0-2.3-1.07-3.9-3.13-3.9-2.07 0-3.33 1.7-3.33 3.97 0 2.63 1.5 3.93 3.53 3.93 1 0 1.87-.23 2.57-.67l.1-.97c-.6.37-1.4.57-2.1.57-1.27 0-2.03-.6-2.13-1.87h4.43c0-.1.07-1 .07-1.07zm-4.47-.8c0-1.1.7-1.77 1.4-1.77.7 0 1.23.67 1.23 1.77h-2.63zM28.07 5.7c-1.1 0-1.9.53-2.37 1.13V5.87h-1.93v9.77l2.03-.43v-2.13c.47.5 1.27.93 2.27.93 1.93 0 3.37-1.63 3.37-4.17s-1.44-4.14-3.37-4.14zm-.33 6.67c-.87 0-1.57-.67-1.57-1.6 0-.97.7-1.63 1.57-1.63s1.53.67 1.53 1.63c0 .93-.67 1.6-1.53 1.6zM20.27 1.63L18.23 2.1v2.5h-1.4v1.73h1.4v4.57c0 1.53.8 2.47 2.27 2.47.53 0 1.07-.1 1.47-.3l.07-1.63c-.33.13-.7.23-1.1.23-.5 0-.7-.27-.7-.77V6.33h1.8V4.6h-1.8V1.63zM13.27 5.7c-1.1 0-1.73.53-2.2 1.07V5.87h-1.93V13.1l2.03-.43V9.2c0-1.27.77-2 1.83-2 .33 0 .7.07.97.2L14.7 5.7c-.37-.1-.97-.1-.97-.1l-.46.1zM7.27 1.77L5.23 2.2v10.9l2.03-.43V1.77zM4.77 15.63c0 .67.53 1.2 1.23 1.2.7 0 1.23-.53 1.23-1.2 0-.67-.53-1.2-1.23-1.2-.7 0-1.23.53-1.23 1.2z" />
                  </svg>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Stripe (Card)</span>
                </button>
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
                  <span className="text-[10px] font-bold uppercase tracking-widest">BOG ipay</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('mock')}
                  className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center justify-center space-y-3 group ${paymentMethod === 'mock' ? 'border-slate-900 dark:border-slate-200 bg-slate-100 dark:bg-slate-800' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                >
                  <div className={`text-xl font-black transition-colors ${paymentMethod === 'mock' ? 'text-slate-900 dark:text-white' : 'text-slate-400 group-hover:text-slate-600'}`}>MOCK</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Test Mode</span>
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-10 rounded-[40px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-8 shadow-2xl">
              <h2 className="text-2xl font-bold">შეკვეთის ჯამი</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>პროდუქცია</span>
                  <span className="text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>მიწოდება</span>
                  <span className="text-slate-900 dark:text-white">{shipping === 0 ? 'უფასო' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                  <span className="text-sm font-bold uppercase text-slate-400 tracking-widest mb-1">სულ გადასახდელი</span>
                  <span className="font-black text-4xl text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isProcessing}
                className={`w-full py-6 text-white rounded-full font-bold text-xl transition-all shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-70 ${
                  paymentMethod === 'stripe' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>მუშავდება...</span>
                  </>
                ) : (
                  <span>გადახდა</span>
                )}
              </button>
              
              <div className="flex flex-col items-center space-y-4">
                <p className="text-[10px] text-slate-400 text-center uppercase font-bold tracking-[0.2em]">უსაფრთხო გადახდა</p>
                <div className="flex items-center space-x-4 opacity-40 grayscale">
                  <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-5" />
                  <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-5" />
                  <img src="https://img.icons8.com/color/48/stripe.png" alt="Stripe" className="h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
