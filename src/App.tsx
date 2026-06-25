import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import CalculatorTab from './components/Calculator';
import Heritage from './components/Heritage';
import ArticlesSection from './components/ArticlesSection';
import QuoteCart from './components/QuoteCart';
import Contact from './components/Contact';
import { TRANSLATIONS, PRODUCTS } from './data';
import { MaterialProduct } from './types';
import { ShieldCheck, Truck, Recycle, Award, Sparkles, Star, ChevronUp } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './lib/firebase';
import { seedProductsIfEmpty } from './lib/firebaseSeeder';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // Persian is the primary language, so set 'fa' as the first default
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  
  // Dynamic products loaded from Firestore
  const [products, setProducts] = useState<MaterialProduct[]>(PRODUCTS);
  
  // Track Admin Portal page views via routing
  const [isAdminPage, setIsAdminPage] = useState<boolean>(() => {
    return window.location.pathname === '/admin' || window.location.hash === '#admin';
  });

  // Navigation active anchors tracker
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Slide out Quotation Basket Overlay Drawer trigger
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Quote cart items state [synced with localStorage]
  const [cartItems, setCartItems] = useState<{ productId: string; quantity: number }[]>(() => {
    try {
      const saved = localStorage.getItem('im_quote_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Seed database and listen to real-time products collection in Firestore
  useEffect(() => {
    // Listen for hash and pathname changes to trigger admin panel
    const handleLocationChange = () => {
      setIsAdminPage(window.location.pathname === '/admin' || window.location.hash === '#admin');
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Initial Database seed if empty, followed by real-time sync
    seedProductsIfEmpty().then(() => {
      const q = collection(db, 'products');
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetched: MaterialProduct[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetched.push({
            id: data.id || doc.id,
            category: data.category,
            nameFA: data.nameFA,
            nameEN: data.nameEN,
            descriptionFA: data.descriptionFA,
            descriptionEN: data.descriptionEN,
            unitFA: data.unitFA,
            unitEN: data.unitEN,
            pricePerUnitTomans: data.pricePerUnitTomans,
            densityKGperM3: data.densityKGperM3,
            packWeightKG: data.packWeightKG,
            coverageM2PerUnit: data.coverageM2PerUnit,
            imageUrl: data.imageUrl,
            featured: data.featured,
            specifications: data.specifications || [],
            approved: data.approved !== false
          } as any);
        });
        if (fetched.length > 0) {
          setProducts(fetched);
        }
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'products');
      });
      
      return () => {
        unsubscribe();
      };
    });

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Sync basket to localStorage
  useEffect(() => {
    localStorage.setItem('im_quote_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Dynamically change layout physical alignment (RTL / LTR) on document level
  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Sync scroll positioning to trigger active header highlights
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'catalog', 'calculator', 'heritage', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Cart State Modifiers ---
  const handleAddToCart = (productId: string, quantity: number) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.productId === productId);
      if (exists) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId, quantity }];
    });
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Inject multiple items (used to apply entire Calculator results dynamically)
  const handleAddCalculationsToCart = (itemsList: { productId: string; qty: number }[]) => {
    setCartItems((prev) => {
      let updated = [...prev];
      itemsList.forEach((incoming) => {
        const idx = updated.findIndex((item) => item.productId === incoming.productId);
        if (idx > -1) {
          updated[idx].quantity = updated[idx].quantity + incoming.qty;
        } else {
          updated.push({ productId: incoming.productId, quantity: incoming.qty });
        }
      });
      return updated;
    });
    
    // Automatically lift open the Quotation Drawer to showcase the added list! (Terrific UX detail)
    setIsCartOpen(true);
  };

  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'fa';

  const cartCount = cartItems.reduce((sum, item) => sum + 1, 0);

  if (isAdminPage) {
    return (
      <AdminDashboard
        lang={lang}
        products={products}
        onBackToApp={() => {
          window.location.hash = '';
          setIsAdminPage(false);
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen bg-[#0A0A0B] text-[#E5E5E5] transition-colors duration-300 selection:bg-[#C5A059] selection:text-black ${
      isRtl ? 'font-vazir' : 'font-sans'
    }`}>
      
      {/* 1. Header Desk Panel */}
      <Header
        lang={lang}
        setLang={setLang}
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 2. Hero Interactive Stage */}
      <Hero
        lang={lang}
        onNavigateToCatalog={() => {
          const cat = document.getElementById('catalog');
          if (cat) cat.scrollIntoView({ behavior: 'smooth' });
        }}
        onNavigateToCalculator={() => {
          const calc = document.getElementById('calculator');
          if (calc) calc.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 3. Horizontal Core Value Propositions (Tiles, Bricks, Sourced Steel assurance flags) */}
      <section className="bg-[#0F0F11] border-t border-b border-white/10 py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${isRtl ? 'rtl-grid' : 'ltr-grid'}`}>
            {[
              {
                icon: "🏅",
                titleFA: "ضمانت خلوص معدنی کالاها",
                titleEN: "Pure Sourced Minerals",
                descFA: "تامین مستقیم از غنی‌ترین معادن سنگ تراورتن تفت و گل کویر خشته سرخ یزد.",
                descEN: "Direct quarrying from central desert reserves avoiding broker adulteration."
              },
              {
                icon: "📐",
                titleFA: "تلرانس استاندارد ملی ایران",
                titleEN: "Sizing Calibration",
                descFA: "برش‌های لیزری کالیبره با گواهی رسمی اصالت مصالح ساختمانی استان.",
                descEN: "Laser rectified edges aligning perfectly to elite engineering specifications."
              },
              {
                icon: "🚚",
                titleFA: "ناوگان باربری تخصصی جاده‌ای",
                titleEN: "Dedicated Shipping Fleets",
                descFA: "هماهنگی ایمن تریلی‌های کفی و خاور متصل به ایستگاه مبدأ بندرگاه لجستیک یزد.",
                descEN: "Flatbed heavy trailer loading routed securely directly from Yazd Freight Gate."
              },
              {
                icon: "♻️",
                titleFA: "سازگاری کامل با اقلیم کشور",
                titleEN: "Eco Weatherization",
                descFA: "حفره‌های عایق فوم بلوک‌ها متناسب سازگار با نوسانات شدید گرمایی فلات ایران.",
                descEN: "Micro-cavities providing natural thermodynamic buffering ready for extreme environments."
              }
            ].map((prop, i) => (
              <div 
                key={i} 
                className={`p-5 rounded-2xl bg-[#141416] border border-white/5 flex flex-col justify-between hover:border-[#C5A059]/40 hover:-translate-y-0.5 transition-all duration-300 ${
                  isRtl ? 'text-right font-vazir' : 'text-left font-sans'
                }`}
              >
                <div className="text-3xl mb-3.5">{prop.icon}</div>
                <div>
                  <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-widest mb-1.5 font-display">
                    {isRtl ? prop.titleFA : prop.titleEN}
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {isRtl ? prop.descFA : prop.descEN}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Products Curated catalog */}
      <Catalog
        lang={lang}
        addToCart={handleAddToCart}
        products={products}
      />

      {/* 5. Dynamic Dimensional Calculator */}
      <CalculatorTab
        lang={lang}
        onAddCustomEstimateToCart={handleAddCalculationsToCart}
      />

      {/* 6. Yazd Cultural Geological storytelling */}
      <Heritage
        lang={lang}
      />

      {/* 6.5 Yazd Knowledge and SEO Articles Hub */}
      <ArticlesSection
        lang={lang}
      />

      {/* 7. Client feedback and Testimonial board */}
      <section className="py-20 bg-[#0F0F11] relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className={`text-3xl font-light text-white tracking-tight ${isRtl ? 'font-vazir' : 'font-display'}`}>
              {isRtl ? 'اعتبار ما در کلام مهندسان ارشد نما و سازه' : 'Endorsed by Top National Engineers'}
            </h2>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRtl ? 'rtl-grid text-right' : 'ltr-grid text-left'}`}>
            {[
              {
                authorFA: "دکتر مسعود عامری | پیمانکار پروژه‌های مسکونی شیراز",
                authorEN: "Dr. Masoud Ameri | Master Contractor, Shiraz Complex",
                quoteFA: "سال‌هاست برای پروژه‌های مجلل نما رومی در شیراز از تراورتن بژ تفت هماهنگ شده توسط ایران مصالح استفاده می‌کنیم. ثبات رنگ سنگ پروانه دار آن‌ها بی‌رقیب است.",
                quoteEN: "We have sourced natural Taft Travertine block panels exclusively from Iran Masaleh for years. Density specifications are exceptionally consistent."
              },
              {
                authorFA: "مهندس ویدا صادقی | مدیر فنی توسعه اصفهان",
                authorEN: "Vida Sadeghi, CE | Structural Lead, Isfahan Hub",
                quoteFA: "صرفه‌جویی لجستیکی که با محاسبه‌گر هوشمند جاده‌ای سایت ایران مصالح انجام دادیم هزینه‌های واسطه‌ای حمل خاور بلوک‌های سفال یزد را تا ۱۵ درصد برای ما تعدیل کرد.",
                quoteEN: "Their smart transport tonnage allocation estimator saved us 15% on direct clay block freight haul logistics to Isfahan's high-rises."
              },
              {
                authorFA: "مهندس حمیدرضا میبدی | مجری ارشد پروژه‌های سنتی بندرعباس",
                authorEN: "H. Meybodi | Architect of Coastal Heritage",
                quoteFA: "کاشی فیروزه‌ای ضد رطوبت میبد ارائه‌شده تافت نسوز خارق‌العاده‌ای مقابل رطوبت ساحلی خلیج دارد. عیار لعاب آنها برگی طلا است.",
                quoteEN: "The Meybod handmade glazed azure tile selection holds an absolute chemical water seal perfect for grueling humid coastal environments."
              }
            ].map((feed, i) => (
              <div 
                key={i}
                className="bg-[#141416]/90 p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-[#C5A059]/40 transition-colors duration-300"
              >
                <div className="flex gap-1 text-brand-gold mb-4">
                  {[...Array(5)].map((_, index) => <Star key={index} className="w-4.5 h-4.5 fill-[#C5A059] stroke-none" />)}
                </div>

                <p className={`text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 italic ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                  "{isRtl ? feed.quoteFA : feed.quoteEN}"
                </p>

                <h5 className={`text-[11px] font-bold tracking-wide text-[#C5A059] border-t border-white/5 pt-4 uppercase ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                  {isRtl ? feed.authorFA : feed.authorEN}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Central Logistics Address block */}
      <Contact
        lang={lang}
      />

      {/* 9. Premium Footer */}
      <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-zinc-800 pb-12 mb-12 ${isRtl ? 'rtl-grid text-right' : 'ltr-grid text-left'}`}>
            
            <div className="md:col-span-1.5">
              <h3 className="text-white text-md font-bold flex items-center gap-2 mb-4 font-display">
                🏢 {isRtl ? 'ایران مصالح یزد' : 'Iran Masaleh Sourced'}
              </h3>
              <p className={`text-xs text-zinc-500 leading-relaxed max-w-sm ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                {isRtl 
                  ? 'جامع‌ترین سامانه بدون‌واسطه استعلام قیمت و حمل سراسری مصالح از کارخانجات جاده‌ای و معادن کویر یزد. حامی کیفیت مهندسی عمران کالبد کشور.'
                  : 'The primary domestic and export gateway sourcing natural building stones, hollow clay masonry blocks, and high strength cements from Central Iran.'}
              </p>
            </div>

            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4">{isRtl ? 'دپارتمان مصالح' : 'Mining Operations'}</h4>
              <ul className={`space-y-2 text-xs text-zinc-500 ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                <li>{isRtl ? 'معادن تراورتن و مرمریت تفت' : 'Taft Travertine Blocks'}</li>
                <li>{isRtl ? 'آجر و سفال تصفیه کویر یزد' : 'Precision Sand-Clay Blocks'}</li>
                <li>{isRtl ? 'کاشی و اسلب پرسلان کالیبره میبد' : 'Rectified Meybod Porcelain'}</li>
                <li>{isRtl ? 'سیمان تیپ ۲ اصلاح شده و پودر گچ' : 'Plasters & Sacked Portland Cement'}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4">{isRtl ? 'حقوق کاربری' : 'Compliance & Standards'}</h4>
              <ul className={`space-y-2 text-xs text-zinc-500 ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                <li>{isRtl ? 'ضوابط حمل جاده‌ای و بارنامه دولتی' : 'Waybill Logistics Codes'}</li>
                <li>{isRtl ? 'استانداردهای مقاومت مصالح مسکن و شهرسازی' : 'ISIRI Concrete Compliance'}</li>
                <li>{isRtl ? 'جدول کرایه‌های مصوب مبمدا پایانه یزد' : 'Official Transportation Rate Table'}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-xs font-black uppercase tracking-wider mb-4">Verification</h4>
              <div className="flex gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg hover:bg-white/10 transition-colors" title="ISIRI 100% Certified">🛡️</span>
                <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg hover:bg-white/10 transition-colors" title="Yazd Mining Union member">🧱</span>
                <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg hover:bg-white/10 transition-colors" title="Eco insulation compliance">🌿</span>
              </div>
            </div>

          </div>

          <div className={`flex flex-col sm:flex-row justify-between items-center text-[11px] text-zinc-650 gap-4 ${
            isRtl ? 'font-vazir text-right' : 'font-sans text-left'
          }`}>
            <div className="flex flex-wrap items-center gap-4">
              <span>
                {isRtl 
                  ? '© 2026 ایران مصالح. تمامی حقوق مادی و معنوی محفوظ و متعلق به سامانه توزیع مصالح یزد می‌باشد.' 
                  : '© 2026 Iran Masaleh. All rights reserved. Sourced direct from automated kilns of Yazd, Iran.'}
              </span>
              <button
                onClick={() => {
                  window.location.hash = '#admin';
                  setIsAdminPage(true);
                }}
                className="text-[#C5A059] hover:underline font-bold text-[10px] cursor-pointer flex items-center gap-1 border border-[#C5A059]/20 px-2 py-1 rounded bg-[#C5A059]/5 hover:bg-[#C5A059]/10 transition-all"
              >
                🔒 {isRtl ? 'پنل مدیریت و خزشگر' : 'Admin Hub & Crawler'}
              </button>
            </div>
            <span className="mt-2 sm:mt-0 font-display">
              Designed for iranmasaleh.com | Yazd Hub
            </span>
          </div>
        </div>
      </footer>

      {/* 10. Drawer overlay for Quotation Cart */}
      {isCartOpen && (
        <QuoteCart
          lang={lang}
          cartItems={cartItems}
          updateCartQty={handleUpdateCartQty}
          removeFromCart={handleRemoveFromCart}
          clearCart={handleClearCart}
          onClose={() => setIsCartOpen(false)}
          products={products}
        />
      )}

      {/* Floating Action: Quick Scroll back to Hero top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 z-40 bg-zinc-900 hover:bg-brand-clay text-white rounded-full p-3 shadow-lg hover:scale-105 transition-all cursor-pointer border border-white/10"
        title="Scroll to Top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

    </div>
  );
}
