import React, { useState } from 'react';
import { PRODUCTS, TRANSLATIONS } from '../data';
import { MaterialProduct } from '../types';
import { Filter, Layers, Info, Check, Plus, Minus, Flame, Eye, Truck } from 'lucide-react';

interface CatalogProps {
  lang: 'fa' | 'en';
  addToCart: (productId: string, quantity: number) => void;
}

export default function Catalog({ lang, addToCart }: CatalogProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'fa';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<MaterialProduct | null>(null);
  
  // Track quantity inputs per product ID
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  // Temporary positive confirmation feedback for added items
  const [addedImpact, setAddedImpact] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'traditional', label: t.categoryTraditional },
    { id: 'tiles', label: t.categoryTiles },
    { id: 'stones', label: t.categoryStones },
    { id: 'cement', label: t.categoryCement },
    { id: 'steel', label: t.categorySteel },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const getQuantity = (id: string) => {
    return quantities[id] || 10; // Default sweet spot starter quantity
  };

  const adjustQty = (id: string, amount: number) => {
    const current = getQuantity(id);
    const updated = Math.max(1, current + amount);
    setQuantities(p => ({ ...p, [id]: updated }));
  };

  const handleAdd = (id: string) => {
    const qty = getQuantity(id);
    addToCart(id, qty);
    
    // Trigger pop check animation feedback
    setAddedImpact(p => ({ ...p, [id]: true }));
    setTimeout(() => {
      setAddedImpact(p => ({ ...p, [id]: false }));
    }, 2000);
  };

  return (
    <section id="catalog" className="py-20 bg-[#0A0A0B] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Header Description */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl sm:text-4xl font-light text-white tracking-tight mb-4 ${
            isRtl ? 'font-vazir' : 'font-display'
          }`}>
            {t.catalogTitle}
          </h2>
          <p className={`text-zinc-400 text-sm sm:text-base font-light leading-relaxed ${isRtl ? 'font-vazir' : 'font-sans'}`}>
            {t.catalogSubtitle}
          </p>
        </div>

        {/* Categories Horizontal Scrolling Rail */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4 scrollbar-none">
          <div className={`flex gap-2.5 p-1.5 bg-[#141416] border border-white/5 rounded-2xl ${
            isRtl ? 'rtl-grid flex-row-reverse font-vazir' : 'ltr-grid flex-row font-sans'
          }`}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-xs font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#C5A059] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Bento Display */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${isRtl ? 'rtl-grid' : 'ltr-grid'}`}>
          {filteredProducts.map((p) => {
            const hasPremiumBadge = p.featured;
            const currentQty = getQuantity(p.id);
            const isAdded = addedImpact[p.id];
            
            return (
              <div 
                key={p.id}
                className="group relative flex flex-col bg-[#141416] border border-white/5 rounded-2xl overflow-hidden hover:border-[#C5A059]/40 transition-all duration-300"
              >
                {/* Product thumbnail containing badges */}
                <div className="relative overflow-hidden aspect-4/3 bg-zinc-950">
                  <img
                    src={p.imageUrl}
                    alt={isRtl ? p.nameFA : p.nameEN}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Backdrop Gradient for text read overlay on thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent"></div>

                  {/* Hot featured tags */}
                  {hasPremiumBadge && (
                    <span className="absolute top-3 right-3 bg-[#C5A059] text-black font-bold text-[9px] uppercase px-2 py-1 rounded-md flex items-center gap-1 shadow-sm font-display">
                      <Flame className="w-3 h-3 text-red-650 fill-red-650 animate-pulse" />
                      Yazd Premium
                    </span>
                  )}

                  {/* Immediate loader overlay icon for freight confidence */}
                  <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-[#C5A059] border border-white/5 px-2 py-1 rounded-md text-[9px] font-medium flex items-center gap-1 font-sans">
                    <Truck className="w-3.5 h-3.5 text-[#C5A059]" />
                    {isRtl ? 'حمل مستقیم از یزد' : 'Yazd Direct Pool'}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`text-base font-bold text-white line-clamp-2 min-h-[48px] ${
                      isRtl ? 'font-vazir text-right' : 'font-display text-left'
                    }`}>
                      {isRtl ? p.nameFA : p.nameEN}
                    </h3>

                    <p className={`text-zinc-400 text-xs line-clamp-2 mt-2 leading-relaxed ${
                      isRtl ? 'font-vazir text-right' : 'font-sans text-left'
                    }`}>
                      {isRtl ? p.descriptionFA : p.descriptionEN}
                    </p>

                    {/* Price and Units info with styling */}
                    <div className={`mt-4 py-3 border-t border-b border-white/5 flex justify-between items-center ${
                      isRtl ? 'flex-row-reverse text-right font-vazir' : 'flex-row text-left font-sans'
                    }`}>
                      <div>
                        <span className="text-[10px] text-zinc-500 block tracking-wider uppercase font-medium">{t.leadTime}</span>
                        <span className="text-xs font-semibold text-zinc-350">{p.id.includes('clay') || p.id.includes('tile') ? t.instantDelivery : `۱-۳ ${t.days}`}</span>
                      </div>
                      
                      <div className={isRtl ? 'text-left' : 'text-right'}>
                        <span className="text-[10px] text-zinc-500 block tracking-wider uppercase font-medium">
                          {t.unitPrice} ({isRtl ? p.unitFA : p.unitEN})
                        </span>
                        <span className="text-sm font-bold text-[#C5A059] font-display">
                          {p.pricePerUnitTomans.toLocaleString()} {t.priceToman}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Operational Footer panel (Quantity Adjuster and Cart addition) */}
                  <div className="mt-5">
                    {/* Spec popup activator */}
                    <button
                      onClick={() => setSelectedProduct(p)}
                      className={`w-full flex items-center justify-center gap-1.5 py-1.5 text-zinc-400 hover:text-white text-xs font-semibold transition-colors mb-3 border border-white/10 hover:border-[#C5A059]/40 hover:bg-white/5 rounded-lg ${
                        isRtl ? 'font-vazir' : 'font-sans'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>{isRtl ? 'مشاهده برگه آنالیز فنی' : 'View Chemical Analysis'}</span>
                    </button>

                    {/* Quantity selectors */}
                    <div className="flex gap-2 items-center">
                      <div className="flex items-center bg-white/5 rounded-xl px-2 py-1.5 border border-white/10">
                        <button 
                          onClick={() => adjustQty(p.id, -5)}
                          className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center font-bold text-xs text-white lg:text-sm font-display">
                          {currentQty}
                        </span>
                        <button 
                          onClick={() => adjustQty(p.id, 5)}
                          className="p-1 hover:bg-white/10 rounded text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Dynamic Cart addition switch */}
                      <button
                        onClick={() => handleAdd(p.id)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                          isAdded 
                          ? 'bg-[#C5A059] text-black font-black'
                          : 'bg-white hover:bg-[#C5A059] text-black shadow-md'
                        } ${isRtl ? 'font-vazir' : 'font-sans'}`}
                      >
                        {isAdded ? <Check className="w-3.5 h-3.5 animate-bounce text-black stroke-[3]" /> : null}
                        <span>{isAdded ? t.addedToQuote : t.addToQuote}</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Exquisite Specs Drawer/Modal Overlay */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="relative bg-[#141416] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] flex flex-col animate-fade-in">
            
            {/* Header image preview inside modal */}
            <div className="relative h-48 bg-[#0A0A0B]">
              <img
                src={selectedProduct.imageUrl}
                alt="Specifications title preview"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-transparent"></div>
              
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 bg-white/10 text-white hover:bg-[#C5A059] hover:text-black rounded-full w-8 h-8 flex items-center justify-center text-xs transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-5 right-5">
                <span className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold block mb-1">
                  {selectedProduct.category} department analysis
                </span>
                <h4 className={`text-lg font-bold text-white ${isRtl ? 'font-vazir text-right' : 'font-display text-left'}`}>
                  {isRtl ? selectedProduct.nameFA : selectedProduct.nameEN}
                </h4>
              </div>
            </div>

            {/* Technical Specifications Specs rows */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-[#141416]">
              <h5 className={`text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-white/5 pb-3 mb-4 flex items-center gap-2 ${
                isRtl ? 'font-vazir flex-row-reverse' : 'font-sans flex-row'
              }`}>
                <Info className="w-4 h-4 text-[#C5A059]" />
                <span>{t.specsLabel} (ISIRI Standards / EN Codes)</span>
              </h5>

              <div className="space-y-3">
                {selectedProduct.specifications.map((spec, i) => (
                  <div 
                    key={i}
                    className={`flex justify-between items-center py-2.5 px-3 border-b border-white/5 rounded-lg hover:bg-white/5 transition-colors ${
                      isRtl ? 'flex-row-reverse text-right font-vazir' : 'flex-row text-left font-sans'
                    }`}
                  >
                    <span className="text-zinc-400 text-xs font-medium">{isRtl ? spec.labelFA : spec.labelEN}</span>
                    <span className="text-[#C5A059] font-bold text-xs">{isRtl ? spec.valueFA : spec.valueEN}</span>
                  </div>
                ))}
              </div>

              {/* Chemical structural disclaimer safe stamp */}
              <div className={`mt-6 p-4 rounded-xl bg-black border border-[#C5A059]/20 flex gap-3 ${
                isRtl ? 'flex-row-reverse text-right font-vazir' : 'flex-row text-left font-sans'
              }`}>
                <div className="text-[#C5A059] pt-0.5 text-sm">
                  🛡️
                </div>
                <div>
                  <h6 className="text-[11px] font-bold text-[#C5A059] uppercase">Certified Mineral Composition</h6>
                  <p className="text-[10px] text-zinc-350 mt-1 leading-relaxed">
                    {isRtl 
                      ? 'تمامی این کالاها تولیدشده با خاک حاصلخیز کویر یزد، مورد تایید آزمایشگاه متالورژی ساختمانی مسکن و شهرسازی استان یزد.'
                      : 'Certified non-radioactive mineral components verified by the National Construction Standards Laboratory of Central Iran.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal close footer */}
            <div className="bg-[#0F0F11] px-6 py-4 border-t border-white/5 flex justify-end">
              <button
                onClick={() => setSelectedProduct(null)}
                className={`bg-white hover:bg-[#C5A059] text-black hover:text-black px-5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  isRtl ? 'font-vazir' : 'font-sans'
                }`}
              >
                {isRtl ? 'بستن مشخصات فنی' : 'Close Details'}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
