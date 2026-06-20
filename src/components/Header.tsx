import React from 'react';
import { TRANSLATIONS } from '../data';
import { Anchor, Building2, ShoppingCart, Globe, PhoneCall, HelpCircle, MapPin } from 'lucide-react';

interface HeaderProps {
  lang: 'fa' | 'en';
  setLang: (lang: 'fa' | 'en') => void;
  cartCount: number;
  openCart: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Header({
  lang,
  setLang,
  cartCount,
  openCart,
  activeSection,
  setActiveSection,
}: HeaderProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'fa';

  const menuItems = [
    { id: 'hero', label: t.navHome },
    { id: 'catalog', label: t.navCatalog },
    { id: 'calculator', label: t.navCalculator },
    { id: 'heritage', label: t.navHeritage },
    { id: 'contact', label: t.navContact },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0B]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30 transition-all duration-300">
      {/* Top Banner with Yazd Hub Information */}
      <div className="bg-[#141416] text-[#E5E5E5] py-2 px-4 text-xs font-semibold border-b border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 relative z-10 w-full">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
            <span className={isRtl ? 'font-vazir' : 'font-sans'}>{t.locationBadge}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] opacity-95">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="ltr text-[#C5A059] font-bold">035-37274000</span>
            </span>
            <span className="hidden md:flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-400">Yazd Logistics Terminal</span>
            </span>
          </div>
        </div>
        {/* Subtle decorative linear grid lines in background of banner */}
        <div className="absolute inset-x-0 bottom-0 top-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px)] bg-[size:16px_16px] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Brand Title configured for Elegant Dark Theme */}
          <div 
            onClick={() => scrollToSection('hero')}
            className={`flex items-center gap-3.5 cursor-pointer select-none group ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className="w-10 h-10 bg-[#C5A059] flex items-center justify-center rounded-lg shadow-md shadow-[#C5A059]/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-black font-black text-lg">IM</span>
            </div>
            <div className={isRtl ? 'text-right' : 'text-left'}>
              <h1 className="text-base sm:text-lg font-bold tracking-widest text-white uppercase font-display leading-tight flex items-center gap-1">
                <span>{lang === 'fa' ? 'ایران مصالح' : 'Iran Masaleh'}</span>
              </h1>
              <p className={`text-[9px] uppercase tracking-[0.25em] text-[#C5A059] font-black leading-none mt-1`}>
                {lang === 'fa' ? 'صفحه استعلام مرکزی مصالح یزد' : 'Premium desert Sourced Minerals'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links with gold focus active indicators */}
          <nav className={`hidden md:flex items-center gap-2 ${isRtl ? 'font-vazir flex-row-reverse' : 'font-sans'}`}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-[13.5px] tracking-wide uppercase transition-all duration-300 rounded-lg ${
                  activeSection === item.id
                    ? 'text-[#C5A059] bg-white/5 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 bg-[#C5A059] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Language Switcher & Quote Cart Trigger Panel */}
          <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
            
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:border-[#C5A059] bg-white/5 border border-white/10 transition-all rounded-lg"
              title={lang === 'fa' ? 'En - Switch to English' : 'Fa - تغییر به فارسی'}
            >
              <Globe className="w-4 h-4 text-[#C5A059] animate-spin-slow" />
              <span>{lang === 'fa' ? 'English' : 'فارسی'}</span>
            </button>

            {/* Quote Cart Slider Indicator with classic gold border */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 bg-white text-black hover:bg-[#C5A059] hover:text-black px-4.5 py-2.5 rounded-lg transition-all duration-300 shadow-md cursor-pointer relative group"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-3.5 -right-3.5 w-5 h-5 bg-[#C5A059] text-black font-black text-[10px] flex items-center justify-center rounded-full border border-white/50 animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className={`text-[11px] uppercase tracking-wider font-bold hidden sm:inline ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                {t.navQuoteCart}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
