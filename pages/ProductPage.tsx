
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../constants';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useApp();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setActiveImage(product.images[0]);
    window.scrollTo(0, 0);
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 page-transition">
      <div className="mb-8">
        <Link to="/catalog" className="text-sm font-medium text-slate-500 hover:text-blue-500 flex items-center space-x-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>უკან კატალოგში</span>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] rounded-[32px] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
            <img src={activeImage} alt={product.name} className="w-full h-full object-contain transition-all duration-500 hover:scale-105" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all p-2 flex items-center justify-center ${activeImage === img ? 'border-blue-500' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-8 py-4">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-blue-600">${product.price}</span>
              <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest">მარაგშია</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">მოდელი</div>
              <div className="font-semibold">{product.model}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">სისტემა</div>
              <div className="font-semibold">{product.specs.system}</div>
            </div>
            <div className="col-span-2 pt-4 border-t border-slate-200 dark:border-slate-800 mt-2">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">პროცესორი</div>
              <div className="font-semibold">{product.specs.cpu} — {product.specs.core}</div>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            className={`w-full py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center space-x-2 ${
              added 
              ? 'bg-green-500 text-white' 
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:opacity-90 shadow-2xl shadow-slate-900/10'
            }`}
          >
            {added ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>დაემატა კალათაში!</span>
              </>
            ) : (
              <span>კალათაში დამატება</span>
            )}
          </button>
        </div>
      </div>

      {/* Video Presentation Section */}
      <section className="py-24 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center mb-12 max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">იხილეთ მიმოხილვა</h2>
          <p className="text-slate-500">დეტალური ინფორმაცია {product.model}-ის შესაძლებლობების შესახებ 4K სტრიმინგისას.</p>
        </div>
        <div className="relative aspect-video max-w-4xl mx-auto rounded-[40px] overflow-hidden shadow-2xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-700">
          <iframe 
            src={product.videoUrl}
            title={`${product.name} ვიდეო მიმოხილვა`}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Detailed Specs */}
      <section className="py-24 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-3xl font-bold mb-12 text-center">ტექნიკური მახასიათებლები</h2>
        <div className="max-w-2xl mx-auto divide-y divide-slate-100 dark:divide-slate-800">
          {Object.entries(product.specs).map(([key, val]) => (
            <div key={key} className="flex justify-between py-6 group">
              <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors font-medium capitalize">{key.replace('_', ' ')}</span>
              <span className="font-bold">{val}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
