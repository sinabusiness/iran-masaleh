import React from 'react';
import { TRANSLATIONS } from '../data';
import { Sparkles, ArrowRight, ArrowLeft, Trophy, CheckCircle, Flame } from 'lucide-react';
import heroImageSrc from '../assets/images/yazd_hero_concept_1782024641735.jpg';

interface HeroProps {
  lang: 'fa' | 'en';
  onNavigateToCatalog: () => void;
  onNavigateToCalculator: () => void;
}

export default function Hero({ lang, onNavigateToCatalog, onNavigateToCalculator }: HeroProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'fa';

  return (
    <section id="hero" className="relative overflow-hidden bg-[#0A0A0B] pt-12 pb-20 md:py-28 border-b border-white/5">
      {/* Background textures */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A05910_1px,transparent_1px)] [background-size:24px_24px] opacity-80"></div>
      
      {/* Arch-shaped soft background glow */}
      <div className="absolute -top-40 right-1/4 w-[400px] h-[600px] bg-[#C5A059]/3 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${isRtl ? 'rtl-grid' : 'ltr-grid'}`}>
          
          {/* Left / Right Text Content (8 cols on big desktops for readability) */}
          <div className={`lg:col-span-7 flex flex-col justify-center text-center ${isRtl ? 'lg:text-right' : 'lg:text-left'}`}>
            
            {/* Live Badge for authenticity */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] text-xs font-semibold self-center lg:self-start mb-6 ${isRtl ? 'font-vazir' : 'font-sans'}`}>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]/40" />
              <span>{isRtl ? 'کیفیت برگزیده کویر مرکزی ایران' : 'Pristine Central Desert Standard'}</span>
            </div>

            {/* Giant Display Header */}
            <h2 className={`text-4xl sm:text-5xl xl:text-6.5xl font-light tracking-tight text-white leading-[1.2] xl:leading-[1.12] mb-6 ${
              isRtl ? 'font-vazir text-right' : 'font-display text-left'
            }`}>
              <span className="block text-white">{t.heroTitlePart1}</span>
              <span className="block text-[#C5A059] font-serif italic mt-2">{t.heroTitlePart2}</span>
            </h2>

            {/* Paragraph Subtitle */}
            <p className={`text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8 ${
              isRtl ? 'font-vazir text-right' : 'font-sans text-left'
            }`}>
              {t.heroDesc}
            </p>

            {/* Call to Actions with Elegant Dark buttons (white-black primary & dark-outline) */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12 ${
              isRtl ? 'font-vazir' : 'font-sans'
            }`}>
              <button
                onClick={onNavigateToCatalog}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black hover:bg-[#C5A059] hover:text-black font-bold text-sm px-7 py-4 rounded-xl shadow-lg transition-all duration-300 cursor-pointer"
              >
                <span>{t.btnCatalog}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={onNavigateToCalculator}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-sm px-6 py-4 rounded-xl transition-all duration-300 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-[#C5A059] animate-pulse" />
                <span>{t.btnCalculateShortcut}</span>
              </button>
            </div>

            {/* Stats Breakdown Panel */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10 ${
              isRtl ? 'text-right font-vazir' : 'text-left font-sans'
            }`}>
              {[
                { value: t.statProjects, label: t.statProjectsLabel },
                { value: t.statQuarries, label: t.statQuarriesLabel },
                { value: t.statExport, label: t.statExportLabel },
                { value: t.statSatisfied, label: t.statSatisfiedLabel }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl sm:text-3.5xl font-light text-[#C5A059] tracking-tight font-display">
                    {stat.value}
                  </span>
                  <span className="text-zinc-400 text-[11px] font-medium leading-normal mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column Custom-Generated Image Frame */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end">
            {/* Structural clay frame behind */}
            <div className="absolute top-4 -left-4 w-full h-full border-2 border-[#C5A059]/20 rounded-3xl -z-10 bg-white/3"></div>
            
            {/* The generated image wrapper with Yazdi Traditional Arch mask */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-full overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <img
                src={heroImageSrc}
                alt="Yazd Modern Earthen Brick Villa Concept"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Golden desert sunset dust layer overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/85 via-transparent to-transparent opacity-80"></div>
              
              {/* Architectural badge */}
              <div className="absolute bottom-4 right-4 left-4 bg-[#141416]/95 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-lg">
                <div className={`flex justify-between items-center ${isRtl ? 'flex-row-reverse text-right font-vazir' : 'flex-row text-left font-sans'}`}>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {isRtl ? 'طرح ویلای خشتی مدرن یزد' : 'Yazd Earthen-Modernist Villa'}
                    </h4>
                    <p className="text-[10px] text-zinc-400 mt-0.5">
                      {isRtl ? 'خاک رس، آجر نسوز و تراورتن سفید' : 'Refine clay brick with ivory travertine'}
                    </p>
                  </div>
                  <div className="bg-[#C5A059] text-black text-[10px] uppercase font-bold px-2 py-1 rounded">
                    Concept
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
