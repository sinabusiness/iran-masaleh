import React, { useState } from 'react';
import { TRANSLATIONS } from '../data';
import { Mail, PhoneCall, Clock, MapPin, Send, Check } from 'lucide-react';

interface ContactProps {
  lang: 'fa' | 'en';
}

export default function Contact({ lang }: ContactProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'fa';

  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderNote, setSenderNote] = useState('');
  const [sentNotify, setSentNotify] = useState(false);

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setSentNotify(true);
    setSenderName('');
    setSenderEmail('');
    setSenderNote('');
    setTimeout(() => setSentNotify(false), 4000);
  };

  // Yazd Regional Mining Spots Data for Vector Map Layout
  const YazdMapSpots = [
    { nameFA: "کارخانجات کاشی میبد", nameEN: "Meybod Ceramic Belt", x: "32%", y: "25%", cargo: "Ceramics & Tiles" },
    { nameFA: "معادن تراورتن تفت", nameEN: "Taft Travertine Quarries", x: "42%", y: "58%", cargo: "Ivory Limestone" },
    { nameFA: "فولاد آلیاژی یزد", nameEN: "Yazd Structural Steel", x: "58%", y: "45%", cargo: "Alloy Rebars" },
    { nameFA: "سیمان پرتلند یزد", nameEN: "Yazd Portland Cement", x: "72%", y: "65%", cargo: "Type-I / II Cement" },
    { nameFA: "معادن گرانیت قرمز قلعه", nameEN: "Desert Granite Quarry", x: "20%", y: "75%", cargo: "Red Granite Slabs" }
  ];

  return (
    <section id="contact" className="py-20 bg-[#0A0A0B] border-t border-white/5 relative overflow-hidden">
      
      {/* Background soft lighting */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-[#C5A059]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className={`text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4 ${
            isRtl ? 'font-vazir' : 'font-display'
          }`}>
            {t.contactTitle}
          </h2>
          <p className={`text-zinc-450 text-sm sm:text-base leading-relaxed font-light ${isRtl ? 'font-vazir' : 'font-sans'}`}>
            {t.contactSubtitle}
          </p>
        </div>

        {/* Contact info cards and interactive map grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch ${isRtl ? 'rtl-grid' : 'ltr-grid'}`}>
          
          {/* Left Column (5 Cols) Physical Address Card details */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            
            {/* Address */}
            <div className={`bg-[#141416] p-6 rounded-2xl border border-white/5 shadow-xl flex gap-4 ${
              isRtl ? 'flex-row-reverse text-right font-vazir' : 'flex-row text-left font-sans'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] font-semibold text-[#C5A059] uppercase tracking-wider">{t.addressLabel}</h4>
                <p className="text-xs font-semibold text-white mt-2 leading-relaxed">
                  {t.addressText}
                </p>
              </div>
            </div>

            {/* Support phone */}
            <div className={`bg-[#141416] p-6 rounded-2xl border border-white/5 shadow-xl flex gap-4 ${
              isRtl ? 'flex-row-reverse text-right font-vazir' : 'flex-row text-left font-sans'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className={isRtl ? 'text-right' : 'text-left'}>
                <h4 className="text-[10px] font-semibold text-[#C5A059] uppercase tracking-wider">{t.phoneLabel}</h4>
                <div className="mt-2 space-y-1">
                  <a href="tel:+983537274000" className="text-sm font-semibold text-[#C5A059] block hover:underline font-mono">
                    035-37274000 (۱۰ خط مستقیم)
                  </a>
                  <a href="tel:+989133510000" className="text-xs font-medium text-zinc-400 block font-mono font-light">
                    مدیریت لجستیک جاده‌ای: 09133510000
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className={`bg-[#141416] p-6 rounded-2xl border border-white/5 shadow-xl flex gap-4 ${
              isRtl ? 'flex-row-reverse text-right font-vazir' : 'flex-row text-left font-sans'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] font-semibold text-[#C5A059] uppercase tracking-wider">{t.emailLabel}</h4>
                <a href="mailto:trade@iranmasaleh.com" className="text-xs font-semibold text-white mt-2 block hover:underline font-mono">
                  trade@iranmasaleh.com
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className={`bg-[#141416] p-6 rounded-2xl border border-white/5 shadow-xl flex gap-4 ${
              isRtl ? 'flex-row-reverse text-right font-vazir' : 'flex-row text-left font-sans'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] font-semibold text-[#C5A059] uppercase tracking-wider">{t.workingHoursLabel}</h4>
                <p className="text-xs font-semibold text-white mt-2 leading-relaxed">
                  {t.workingHoursText}
                </p>
              </div>
            </div>

          </div>

          {/* Center Column (5 Cols) Highly Stylized Regional Vector Map of Yazd Mines */}
          <div className="lg:col-span-5 flex">
            <div className="bg-[#141416] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex-1 flex flex-col justify-between relative overflow-hidden border border-white/5 minimum-h-[400px]">
              
              {/* Stars/Grid dust */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] bg-[size:16px_16px] opacity-60"></div>
              
              {/* Map Layout header */}
              <div className="relative z-10">
                <span className="text-[9px] text-[#C5A059] uppercase tracking-widest font-bold block mb-1">
                  Yazd Logistics Core
                </span>
                <h4 className={`text-md font-bold ${isRtl ? 'font-vazir text-right' : 'font-display text-left'}`}>
                  {isRtl ? 'نقشه جانمایی کارخانجات و معادن ممتاز یزد' : 'Spatial Layout of Sourced Quarries'}
                </h4>
              </div>

              {/* Graphical stylized representation map */}
              <div className="relative w-full h-[220px] bg-black/40 border border-white/5 rounded-2xl my-6 flex items-center justify-center overflow-hidden">
                {/* Central Yazd Desert Ring (highly decorative circle lines in gold) */}
                <div className="absolute w-56 h-56 rounded-full border border-[#C5A059]/15 flex items-center justify-center">
                  <div className="absolute w-40 h-40 rounded-full border border-[#C5A059]/5 flex items-center justify-center">
                    <span className="text-[10px] text-[#C5A059]/40 font-bold uppercase tracking-widest font-display">YAZD HUB</span>
                  </div>
                </div>

                {/* Road vector paths */}
                <svg className="absolute inset-0 w-full h-full text-[#C5A059]/10" pointerEvents="none">
                  <line x1="32%" y1="25%" x2="58%" y2="45%" stroke="currentColor" strokeWidth="1" strokeDasharray="4" />
                  <line x1="42%" y1="58%" x2="58%" y2="45%" stroke="currentColor" strokeWidth="1" />
                  <line x1="72%" y1="65%" x2="58%" y2="45%" stroke="currentColor" strokeWidth="1" strokeDasharray="4"/>
                  <line x1="20%" y1="75%" x2="42%" y2="58%" stroke="currentColor" strokeWidth="1" />
                </svg>

                {/* Sourced Locations Pin Spots */}
                {YazdMapSpots.map((spot, i) => (
                  <div 
                    key={i}
                    className="absolute group/pin"
                    style={{ left: spot.x, top: spot.y }}
                  >
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A039] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C5A059]"></span>
                    </span>

                    {/* Highly descriptive hover-or-static popup snippet */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-5 bg-[#19191D] border border-white/10 text-white rounded px-2 py-1 whitespace-nowrap opacity-100 sm:opacity-0 sm:group-hover/pin:opacity-100 transition-opacity pointer-events-none text-[8px] z-20 shadow-md">
                      <span className="font-bold text-[#C5A059] block text-center mb-0.5">{isRtl ? spot.nameFA : spot.nameEN}</span>
                      <span className="text-zinc-400 block text-center font-mono">{spot.cargo}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Footer disclaimer */}
              <div className={`relative z-10 text-[10px] text-zinc-400 leading-relaxed font-light ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                {isRtl
                  ? 'ناوگان ترانزیت ایران مصالح مستقر در پایانه باربری مرکزی یزد به صورت هشت بانده آماده ترخیص بار سنگ و قالب آجر به کلیه مقاصد در کشور می‌باشد.'
                  : 'Equipped with direct container loading gates connecting the Central desert minerals deposits to major Iranian ports.'}
              </div>

            </div>
          </div>

          {/* Right Column (3 Cols) Clean Quick Email Enquiry Form */}
          <div className="lg:col-span-3 flex">
            <div className="bg-[#141416] p-6 sm:p-8 rounded-3xl border border-white/5 shadow-xl flex-1 flex flex-col justify-between">
              
              <form onSubmit={handleSubmitMessage} className={`space-y-4 h-full flex flex-col justify-between ${
                isRtl ? 'font-vazir text-right' : 'font-sans text-left'
              }`}>
                <div>
                  <h4 className="text-[10px] font-semibold text-[#C5A059] uppercase tracking-wider mb-4">
                    {isRtl ? 'ارسال پیام مستقیم' : 'Direct Message'}
                  </h4>

                  <div className="space-y-3.5">
                    <div>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder={isRtl ? "نام شما" : "Your Name"}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 text-white font-medium"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder={isRtl ? "ایمیل یا شماره همراه" : "Email or Phone"}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 text-white font-mono"
                      />
                    </div>

                    <div>
                      <textarea
                        required
                        rows={4}
                        value={senderNote}
                        onChange={(e) => setSenderNote(e.target.value)}
                        placeholder={isRtl ? "پیام شما..." : "Your message..."}
                        className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 text-white font-medium resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit button with notification banner */}
                <button
                  type="submit"
                  className={`w-full flex items-center justify-center gap-1.5 py-3 rounded-xl text-xs font-bold transition-all duration-300 mt-4 cursor-pointer ${
                    sentNotify 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-[#C5A059] text-black hover:bg-white hover:text-black font-extrabold'
                  }`}
                >
                  {sentNotify ? <Check className="w-4 h-4 animate-bounce text-white" /> : <Send className="w-3.5 h-3.5" />}
                  <span>
                    {sentNotify
                      ? (isRtl ? 'پیام ارسال شد' : 'Message Sent')
                      : (isRtl ? 'فرستادن پیام' : 'Send Message')}
                  </span>
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
