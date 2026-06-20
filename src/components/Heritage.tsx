import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Landmark, Compass, Award, ShieldCheck, Gem } from 'lucide-react';

interface HeritageProps {
  lang: 'fa' | 'en';
}

export default function Heritage({ lang }: HeritageProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'fa';
  
  const [activeTab, setActiveTab] = useState<'clay' | 'stone' | 'tile'>('clay');

  const tabItems = [
    { id: 'clay' as const, label: t.heritageTabClay, icon: Landmark },
    { id: 'stone' as const, label: t.heritageTabStone, icon: Gem },
    { id: 'tile' as const, label: t.heritageTabTile, icon: Compass },
  ];

  return (
    <section id="heritage" className="py-24 bg-[#0A0A0B] border-b border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C5A059]/2 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl sm:text-4xl font-light text-white tracking-tight mb-4 ${
            isRtl ? 'font-vazir' : 'font-display'
          }`}>
            {t.heritageTitle}
          </h2>
          <p className={`text-zinc-400 text-sm sm:text-base font-light leading-relaxed ${isRtl ? 'font-vazir' : 'font-sans'}`}>
            {t.heritageSubtitle}
          </p>
        </div>

        {/* Tab Controllers */}
        <div className="flex justify-center mb-12">
          <div className={`p-1.5 bg-[#141416] border border-white/5 rounded-2xl flex max-w-md w-full gap-1 ${
            isRtl ? 'flex-row-reverse font-vazir' : 'flex-row font-sans'
          }`}>
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all duration-300 relative cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#C5A059] text-black shadow-md'
                      : 'text-zinc-450 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-black' : 'text-zinc-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Contents Panel Grid layout */}
        <div className="bg-[#141416] border border-white/5 p-6 sm:p-10 md:p-12 rounded-2xl shadow-xl">
          {activeTab === 'clay' && (
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isRtl ? 'rtl-grid text-right' : 'ltr-grid text-left'}`}>
              <div className="lg:col-span-7">
                <span className="text-[10px] text-[#C5A059] uppercase font-bold tracking-widest block mb-1.5 font-display">
                  Geological Alchemy
                </span>
                <h3 className={`text-xl sm:text-2xl font-semibold text-white mb-4 ${isRtl ? 'font-vazir' : 'font-display'}`}>
                  {t.heritageClayTitle}
                </h3>
                <p className={`text-zinc-400 text-sm leading-relaxed font-light ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                  {t.heritageClayDesc}
                </p>

                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5 ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                  <div className="flex gap-3 items-start">
                    <span className="text-xl">☀️</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{isRtl ? 'مقاومت دمایی فوق‌العاده' : 'Thermal Buffer'}</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-normal font-light">
                        {isRtl ? 'ثبات ساختاری کامل در دماهای مابین -۱۵ الی +۴۸ درجه سانتی‌متر.' : 'Retains structural safety between extreme Desert shifts of -15°C to +48°C.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-xl">💧</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{isRtl ? 'فرمولاسیون ضد شوره کویری' : 'No Efflorescence Salt'}</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-normal font-light">
                        {isRtl ? 'خاک رس معدنی دست‌چین شده فاقد شوره و تبلور بلورهای نمک آسیب‌رسان.' : 'High aluminates block underground salts from climbing the interior drywall.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm aspect-4/3 rounded-xl overflow-hidden shadow-lg border-2 border-[#C5A059]/15">
                  <img
                    src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=500"
                    alt="Yazd pure desert clay blocks close up"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white text-[11px] font-bold bg-[#141416]/95 border border-white/10 px-2 py-1 rounded">
                    Yazd Clay Kiln Tunnel
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stone' && (
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isRtl ? 'rtl-grid text-right' : 'ltr-grid text-left'}`}>
              <div className="lg:col-span-7">
                <span className="text-[10px] text-[#C5A059] uppercase font-bold tracking-widest block mb-1.5 font-display">
                  Quarry Sourced Granularity
                </span>
                <h3 className={`text-xl sm:text-2xl font-semibold text-white mb-4 ${isRtl ? 'font-vazir' : 'font-display'}`}>
                  {t.heritageStoneTitle}
                </h3>
                <p className={`text-zinc-400 text-sm leading-relaxed font-light ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                  {t.heritageStoneDesc}
                </p>

                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5 ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                  <div className="flex gap-3 items-start">
                    <span className="text-xl">🏗️</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{isRtl ? 'گیرش سیمانی ۱۰۰ درصدی' : 'Permanent Anchorage'}</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-normal font-light">
                        {isRtl ? 'تخلخل‌های همگن پشت سنگ سبب قفل شدن مکانیکی سنگ در ارتفاع بلند ملات می‌شود.' : 'Pore systems create extreme mechanical integration with vertical concrete stucco.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-xl">🎨</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{isRtl ? 'رنگ‌های گرم شکلاتی و بژ تفت' : 'Deep Cream / Ochre Hue'}</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-normal font-light">
                        {isRtl ? 'تنوع رنگی لوکس برگرفته از ته نشست‌های کلسیم کربنات چشمه‌های آبگرم تاریخی یزد.' : 'Formed by historic geothermal springs in Taft mountains, giving timeless luxurious patterns.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm aspect-4/3 rounded-xl overflow-hidden shadow-lg border-2 border-[#C5A059]/15">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=500"
                    alt="Polished travertine facade stone"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white text-[11px] font-bold bg-[#141416]/95 border border-white/10 px-2 py-1 rounded font-display">
                    Travertine Quarry Taft
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'tile' && (
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isRtl ? 'rtl-grid text-right' : 'ltr-grid text-left'}`}>
              <div className="lg:col-span-7">
                <span className="text-[10px] text-[#C5A059] uppercase font-bold tracking-widest block mb-1.5 font-display">
                  Industrial Powerhouse of Iran
                </span>
                <h3 className={`text-xl sm:text-2xl font-semibold text-white mb-4 ${isRtl ? 'font-vazir' : 'font-display'}`}>
                  {t.heritageTileTitle}
                </h3>
                <p className={`text-zinc-400 text-sm leading-relaxed font-light ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                  {t.heritageTileDesc}
                </p>

                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/5 ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                  <div className="flex gap-3 items-start">
                    <span className="text-xl">💎</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{isRtl ? 'جذب آب صفر ممیز دو درصدی' : 'Absorption Nullified'}</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-normal font-light">
                        {isRtl ? 'پخت با فشار ۵۰۰ تن و حرارت ۱۲۰۰ درجه؛ کاشی‌ها هرگز رطوبت جذب نکرده و نمی‌ترکند.' : 'Fired under massive pressure and 1200°C limits, guaranteeing total frost immunity.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <span className="text-xl">🌟</span>
                    <div>
                      <h4 className="text-xs font-bold text-white">{isRtl ? 'کالیبره بدون بندکشی کاشی' : 'Nano Rectification'}</h4>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-normal font-light">
                        {isRtl ? 'برش‌های لیزری کالیبره که در نصب یکدست نیازی به فضاهای خالی و بندکشی ندارند.' : 'Laser-rectified edges allowing zero-grout layouts for high class seamless halls.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm aspect-4/3 rounded-xl overflow-hidden shadow-lg border-2 border-[#C5A059]/15">
                  <img
                    src="https://images.unsplash.com/photo-1615876234886-fd9a39faa97f?auto=format&fit=crop&q=80&w=500"
                    alt="Meybod premium glazed porcelain slab tiles"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white text-[11px] font-bold bg-[#141416]/95 border border-white/10 px-2 py-1 rounded">
                    Meybod Automated Factory
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
