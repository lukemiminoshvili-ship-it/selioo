
import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useApp } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { addToCart } = useApp();
  const tvBox = PRODUCTS[0];

  return (
    <div className="page-transition min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            თანამედროვე ტექნიკა <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">თქვენი კომფორტისთვის</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            მოგესალმებით TechNova-ში. ჩვენ გთავაზობთ საუკეთესო ელექტრონიკას თქვენი ციფრული ცხოვრების გასაუმჯობესებლად.
          </p>
        </div>

        {/* Product Catalog Section - Main Focus */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2 lg:col-span-1">
             <div className="sticky top-24 space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">ჩვენი პროდუქცია</h2>
                <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
                <p className="text-slate-500 dark:text-slate-400">ამჟამად ჩვენს მაღაზიაში წარმოდგენილია საუკეთესო TV Box-ი ბაზარზე. მალე დაემატება სხვა ინოვაციური მოწყობილობებიც.</p>
             </div>
          </div>

          {/* TV Box Product Card - CLICKABLE TO GO TO PRODUCT PAGE */}
          <div className="group relative bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 lg:col-span-2">
            <Link to={`/product/${tvBox.id}`} className="block h-full cursor-pointer">
              <div className="grid md:grid-cols-2 h-full">
                <div className="aspect-square md:aspect-auto overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-8">
                  <img 
                    src={tvBox.images[0]} 
                    alt={tvBox.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-2xl"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-4">
                    <span className="w-8 h-[1px] bg-blue-600"></span>
                    <span>საუკეთესო არჩევანი</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{tvBox.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8 line-clamp-3">
                    {tvBox.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-sm text-slate-400 block mb-1 uppercase font-bold tracking-tighter">ფასი</span>
                      <span className="text-3xl font-black text-blue-600">${tvBox.price}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                       <span className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-full font-bold text-sm">დეტალურად →</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Placeholder Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 border-t border-slate-100 dark:border-slate-800 mt-12">
        <div className="p-10 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div className="font-bold text-slate-500">მალე დაემატება</div>
        </div>
        
        <div className="space-y-4 p-8">
           <div className="text-3xl">🚚</div>
           <h4 className="font-bold text-xl">სწრაფი მიწოდება</h4>
           <p className="text-slate-500 text-sm">მიიღეთ შეკვეთა 24-48 საათში საქართველოს მასშტაბით.</p>
        </div>

        <div className="space-y-4 p-8">
           <div className="text-3xl">🛡️</div>
           <h4 className="font-bold text-xl">გარანტირებული ხარისხი</h4>
           <p className="text-slate-500 text-sm">ჩვენი ყველა პროდუქტი გადის დეტალურ შემოწმებას გაყიდვამდე.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
