
import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useApp } from '../context/AppContext';

const CatalogPage: React.FC = () => {
  const { addToCart } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 page-transition">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-4xl font-bold mb-2">პროდუქციის კატალოგი</h1>
          <p className="text-slate-500">აღმოაჩინეთ უახლესი ტექნოლოგიური გადაწყვეტილებები.</p>
        </div>
        <div className="flex space-x-2 text-sm">
          <span className="px-4 py-2 rounded-full bg-blue-600 text-white font-bold cursor-default">ყველა</span>
          <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed">Smart Home</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {PRODUCTS.map(product => (
          <div key={product.id} className="group flex flex-col bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-500">
            <Link to={`/product/${product.id}`} className="aspect-[4/3] overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
            </Link>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <Link to={`/product/${product.id}`} className="font-bold text-lg hover:text-blue-500 transition-colors">
                  {product.name}
                </Link>
                <div className="font-bold text-blue-600">${product.price}</div>
              </div>
              <p className="text-sm text-slate-500 line-clamp-2 mb-6">{product.description}</p>
              
              <div className="mt-auto flex space-x-2">
                <Link 
                  to={`/product/${product.id}`}
                  className="flex-1 py-3 text-center bg-slate-100 dark:bg-slate-800 rounded-2xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  დეტალურად
                </Link>
                <button 
                  onClick={() => addToCart(product)}
                  className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[32px] flex flex-col items-center justify-center p-12 text-center space-y-4 opacity-50">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-slate-400 uppercase text-xs tracking-widest">მალე დაემატება</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
