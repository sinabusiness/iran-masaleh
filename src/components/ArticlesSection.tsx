import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, X, ChevronRight, Share2, Sparkles, Award } from 'lucide-react';

interface Article {
  id: string;
  tagFA: string;
  tagEN: string;
  titleFA: string;
  titleEN: string;
  summaryFA: string;
  summaryEN: string;
  readTimeFA: string;
  readTimeEN: string;
  dateFA: string;
  dateEN: string;
  image: string;
  contentFA: string;
  contentEN: string;
}

const SEO_ARTICLES: Article[] = [
  {
    id: 'art-travertine-yazd',
    tagFA: 'سنگ نما و زمین‌شناسی',
    tagEN: 'Facade Stone & Geology',
    titleFA: 'چرا سنگ تراورتن تفت یزد بهترین گزینه برای نمای بیرونی در فلات ایران است؟',
    titleEN: 'Why Taft Travertine is the Leading Facade Stone of the Iranian Plateau',
    summaryFA: 'بررسی علمی مقاومت تخلخل، عایق‌بندی حرارتی و دوام شیمیایی سنگ معدن تفت در برابر نوسانات شدید دمایی کویر و سرمازدگی زمستان.',
    summaryEN: 'A scientific analysis of thermal insulation values, porosity metrics, and chemical durability of Taft quarry travertine against desert heatwaves and frost cycles.',
    readTimeFA: '۵ دقیقه مطالعه',
    readTimeEN: '5 min read',
    dateFA: '۴ تیر ۱۴۰۵',
    dateEN: 'June 25, 2026',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    contentFA: `### مقدمه علمی بر سنگ‌های رسوبی آهکی تفت

سنگ تراورتن (Travertine) یک نوع سنگ رسوبی آهکی است که از رسوب چشمه‌های آب گرم معدنی به‌ویژه چشمه‌های باستانی اطراف رشته‌کوه‌های تفت یزد تشکیل شده است. ساختار حفره‌دار طبیعی این سنگ به دلیل خروج گازهای دی‌اکسید کربن در زمان رسوب‌گذاری است که ویژگی‌های فیزیکی منحصربه‌فردی به آن بخشیده است.

### چرا تخلخل تراورتن تفت یک مزیت مهندسی است؟

برخلاف سنگ‌های مرمریت یا گرانیت که به دلیل دانسیته بسیار بالا چسبندگی ضعیفی با ملات سیمان دارند، تراورتن تفت به دلیل داشتن حفره‌های ریز در بخش پشتی خود، سیمان مایع را کاملاً به درون خود مکیده و پس از خشک شدن، بخشی پیوسته و تفکیک‌ناپذیر از دیوارهای برشی ساختمان را تشکیل می‌دهد. این امر احتمال سقوط سنگ نما (اسکوپ‌زدگی ناگهانی) را به صفر می‌رساند.

1. **عایق حرارتی و صوتی طبیعی**: هوا و حباب‌های موجود در لایه‌های درونی تراورتن مانند یک لایه ترمودینامیکی عمل کرده و ضریب انتقال حرارت ساختمان را تعدیل می‌کنند. این امر در اقلیم گرم و خشک یزد و تهران، مصرف برق دستگاه‌های سرمایشی را تا ۱۲٪ کاهش می‌دهد.
2. **پایداری رنگ در مقابل اشعه UV**: معادن تفت دارای مقادیر ایده‌آلی از کانی‌های آهن و منیزیم هستند که رنگ‌های بژ، شکلاتی و کرم استخوانی را پدید می‌آورند. این رنگ‌ها در برابر تابش شدید آفتاب کویری برخلاف تراورتن‌های رنگ‌شده مصنوعی دچار رنگ‌پریدگی نمی‌شوند.
3. **دوام بی نظیر در برابر چرخه یخبندان (Freeze-Thaw)**: تراورتن تفت به دلیل تخلخل آزاد شسته شده، به آب باران اجازه می‌دهد بدون ایجاد تنش‌های کششی داخلی، تبخیر شود. در نتیجه، در سرمای شدید زمستان فلات مرکزی ایران سنگ ترک برنمی‌دارد.`,
    contentEN: `### A Geological Overview of Taft Sedimentary Structures

Taft Travertine is a dense, high-purity calcium carbonate stone formed by mineral precipitation from thermal springs located throughout the Taft mountain chains of central Iran. The signature micro-cavities within the stone are physical remnants of carbon dioxide gas escaping during formation, yielding immense architectural benefits.

### The Structural Advantages of Managed Porosity

Standard high-density granites and dense marbles often suffer from adhesive failures on high-rise facades due to low bond moisture retention with Portland mortars. Taft Travertine solves this problem natively:

1. **Perfect Adhesion (Natural Mechanical Keying)**: The open pore network on the rear cut of travertine slabs absorbs wet cement paste, locking the stone into an unbreakable structural monolith once cured.
2. **Thermal & Acoustic Insulation**: The encapsulated air cavities function as miniature thermodynamic cells, drastically lowering the overall thermal conductivity (U-value) of exterior walls.
3. **UV Exposure Color-Fastness**: Unlike artificial or synthetically dyed stones, Taft's chocolate and ivory pigments are bound at the crystal lattice level by trace iron carbonates, keeping their premium hues intact under direct solar UV exposure.
4. **Frost-Cycle Resilience**: Water trapped in non-porous stones expands on freezing, causing major structural fractures. Taft's interconnected pore system lets moisture evaporate cleanly, making it frostproof in extreme mountain zones.`
  },
  {
    id: 'art-clay-blocks',
    tagFA: 'بلوک‌های سفالی و عایق',
    tagEN: 'Clay Bricks & Energy',
    titleFA: 'نقش بلوک‌های سفال ده سوراخ یزد در بهینه‌سازی مصرف انرژی ساختمان',
    titleEN: 'Energy Performance & Insulation Values of Yazd 10-Hole Clay Blocks',
    summaryFA: 'تحلیل دقیق ضریب انتقال حرارت بلوک‌های سفالی زرد فوم‌دار کویر یزد و چگونگی مطابقت کامل با مبحث ۱۹ مقررات ملی ساختمان.',
    summaryEN: 'An in-depth heat transfer coefficient calculation for insulated clay blocks manufactured in Yazd, explaining direct compliance with National Building Energy Codes.',
    readTimeFA: '۴ دقیقه مطالعه',
    readTimeEN: '4 min read',
    dateFA: '۳ تیر ۱۴۰۵',
    dateEN: 'June 24, 2026',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800',
    contentFA: `### مبحث ۱۹ مقررات ملی ساختمان و الزام عایق‌کاری

با افزایش نرخ انرژی و لزوم کاهش اتلاف حرارتی از دیوارهای خارجی، انتخاب بلوک‌های ساختمانی مناسب به اولویت اول مهندسان ناظر تبدیل شده است. بلوک سفال ده سوراخ عایق‌دار (فوم‌دار) یزد یکی از نوآورانه‌ترین پاسخ‌های صنعت ساختمان فلات مرکزی ایران به این نیاز است.

### فرمول پخت و تصفیه خاک کویر یزد

خاک رس یزد به دلیل دارا بودن مقادیر بهینه از کانی‌های کائولینیت و ایلیت و درصد بسیار پایینی از آهک فعال، پس از قالب‌گیری تحت پخت در کوره‌های تمام اتوماتیک هوفمان با دمای بالای ۹۵۰ درجه سانتی‌گراد قرار می‌گیرد. این پخت یکنواخت باعث پدید آمدن مقاومت فشاری چشمگیری (بیش از ۸ مگاپاسکال) می‌شود.

### چگونگی کارکرد فوم پلی‌استایرن داخلی

1. **شکست پل حرارتی (Thermal Bridge)**: ده سوراخ عمودی موجود در ساختار آجر سفال یزد، مسیرهای هوای ساکن ایجاد می‌کنند. قرار گرفتن فوم‌های فشرده استاندارد (پلی‌استایرن نسوز EPS) داخل این سوراخ‌ها از پدیده همرفت هوا جلوگیری کرده و ضریب هدایت حرارتی دیوار را تا ۶۰٪ کاهش می‌دهد.
2. **جلوگیری از شوره و رطوبت**: خاک پخته شده کوره یزد کمترین درصد جذب آب موینه را دارد، به این معنی که رطوبت باران به داخل واحد سرایت نکرده و نمای گچ‌کاری داخلی هرگز زرد یا شوره نمی‌زند.
3. **سبک سازی بهینه سازه**: به کارگیری بلوک سبک فوم‌دار وزن مرده ساختمان را به شدت تعدیل کرده و نیروی شتاب زلزله وارد بر اسکلت را کاهش می‌دهد.`,
    contentEN: `### Compliance with National Energy Codes (Standard 19)

As building inspectors enforce stringent thermal efficiency criteria for exterior walls, material selection has become highly scrutinized. The Yazd 10-Hole Insulated Clay Block has emerged as the premier structural solution.

### Premium Clay Mineralogy and Automated Firing

The central desert soil of Yazd possesses an optimal natural mixture of kaolinite and illite minerals with exceptionally low active lime impurities. This clay is extruded under high pressure and fired in automated gas-fueled Hoffman kilns at temperatures exceeding 950°C. 

### Thermal Mechanics of EPS Inserts

1. **Elimination of Thermal Bridges**: The hollow vertical cavities of traditional clay blocks can still transmit heat via internal air convection. Inserting pre-cut, fire-retardant Expanded Polystyrene (EPS) foam sleeves completely halts this heat transfer.
2. **Moisture Migration Seal**: Fired Yazd clay features a highly controlled capillary pore structure, preventing rainwater absorption from penetrating drywall interiors.
3. **Seismic Weight Reduction**: Slashed deadweight metrics of these engineered blocks reduce the structural mass of the building, lessening destructive seismic shear acceleration during earthquakes.`
  },
  {
    id: 'art-white-cement',
    tagFA: 'سیمان و فرآوری',
    tagEN: 'Cement Chemistry & Tech',
    titleFA: 'چرا سیمان سفید ممتاز یزد در بازارهای بین‌المللی خلیج فارس بی‌رقیب است؟',
    titleEN: 'The Chemical Purity Behind Yazd White Cement\'s Middle Eastern Dominance',
    summaryFA: 'تکنولوژی کاهش اکسیدهای آهن و کروم در کوره سیمان سفید یزد که عیار درخشندگی و بازتاب نوری آن را به بالای ۹۲ درصد رسانده است.',
    summaryEN: 'Analyzing the iron and chromium oxide extraction processes in Yazd kilns, which push the whiteness index of its cement bags past 92% light reflectance.',
    readTimeFA: '۶ دقیقه مطالعه',
    readTimeEN: '6 min read',
    dateFA: '۲ تیر ۱۴۰۵',
    dateEN: 'June 23, 2026',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800',
    contentFA: `### راز سفالی سیمان سفید یزد

تولید سیمان پرتلند معمولی خاکستری به دلیل وجود اکسیدهای فلزی تیره مانند آهن (Fe2O3) و منگنز (MnO) بسیار آسان است. اما تولید سیمان سفید مستلزم فرآیند بسیار دقیق شیمیایی برای تصفیه و حذف این کانی‌ها و بکارگیری کائولن‌های فوق خالص و سنگ‌آهک‌های عاری از آهن است. معادن غنی حاشیه یزد خالص‌ترین کلوخه‌های معدنی جهان را برای این کار دارا هستند.

### فرآیند شوک برودتی (Quenching) پیشرفته

کارخانجات مدرن سیمان سفید یزد از پیشرفته‌ترین متدهای شوک حرارتی استفاده می‌کنند:

1. **حذف اکسیژن در دمای ۱۴۵۰ درجه**: کلینکر سیمان سفید در کوره تحت محیط‌های کاملاً احیاکننده پخته می‌شود تا آهن موجود از حالت سه ظرفیتی (رنگ تیره قرمز) به حالت دو ظرفیتی (رنگ بسیار کمرنگ زرد/سبز) تبدیل شود.
2. **شوک آب و هوای سرد**: بلافاصله پس از خروج از کوره، کلینکر داغ با آب تصفیه شده یا جریان شدید هوای عاری از اکسیژن خنک می‌شود تا از اکسیداسیون مجدد آهن جلوگیری گردد. این فرآیند شاخص سفالی درخشندگی را به رقم استثنایی **۹۲ تا ۹۳ درصد** می‌رساند.
3. **کاربردهای استراتژیک در نماهای رومی و سنگ‌های مهندسی**: بازتاب نوری بالای این سیمان حرارت خورشید خلیج را به شدت بازتاب داده و پایداری رنگ فوق‌العاده‌ای در ساخت بتن‌های اکسپوز نما ارائه می‌کند.`,
    contentEN: `### The Chemistry of Ultimate Whiteness

Standard gray cement is heavily colored by transition metal oxides such as iron (Fe2O3), manganese (MnO), and chromium. Producing pure white cement requires reducing these oxides to near-zero percentages, calling for high-purity limestone and low-iron kaolin clay found in massive deposits near Yazd.

### Advanced Thermal Quenching Technology

The state-of-the-art Yazd Cement manufacturing line employs a unique reduction cooling process:

1. **Reducing Atmosphere at 1450°C**: Clinker is fired in oxygen-deprived zones, converting dark trivalent ferric ions (Fe3+) into virtually colorless divalent ferrous ions (Fe2+).
2. **Rapid Quenching**: The incandescent clinker is instantly cooled using water or inert gases to trap the chemical structure and prevent re-oxidation. This yields a whiteness index of **92-93%**, surpassing global competitors.
3. **GCC & Gulf Export Dominance**: Yazd White Cement is heavily imported by Saudi and UAE contractors for elite architectural facade plasters, precast concrete structures, and exposed luxury panels due to its high solar heat reflectance.`
  }
];

export default function ArticlesSection({ lang }: { lang: 'fa' | 'en' }) {
  const isRtl = lang === 'fa';
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  return (
    <section id="articles-seo-hub" className="py-24 bg-[#0A0A0B] relative border-t border-white/10 overflow-hidden">
      {/* Decorative linear grids for modern technical style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#c5a05908_1px,transparent_1px),linear-gradient(to_bottom,#c5a05908_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#C5A059]/10 border border-[#C5A059]/30 px-3.5 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest font-mono">
              {isRtl ? 'راهنمای مهندسی عمران و سئو مصالح' : 'Iran Masaleh Knowledge Base'}
            </span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-light tracking-tight text-white ${isRtl ? 'font-vazir' : 'font-display'}`}>
            {isRtl ? 'مرکز دانش و مقالات تخصصی مصالح یزد' : 'The Yazd Mineral & Material Sciences'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed max-w-2xl mx-auto">
            {isRtl 
              ? 'بررسی‌های تخصصی، مقالات علمی و تحلیل‌های فنی روی کیفیت ساختاری مصالح کویر یزد با هدف آگاهی‌بخشی به کارفرمایان و مهندسان ارشد.'
              : 'Detailed engineering documentation, chemical analyses, and architectural guides on core Yazd materials for general contractors and structural leads.'}
          </p>
        </div>

        {/* Bento Grid layout for Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SEO_ARTICLES.map((art) => (
            <article 
              key={art.id}
              className="bg-[#141416]/80 hover:bg-[#141416] border border-white/5 hover:border-[#C5A059]/40 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-xl"
            >
              <div>
                {/* Visual Banner */}
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={art.image} 
                    alt={isRtl ? art.titleFA : art.titleEN}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                    <span className="bg-[#0A0A0B]/85 text-[#C5A059] text-[9px] font-bold px-2.5 py-1 rounded-md border border-[#C5A059]/20 backdrop-blur-sm">
                      {isRtl ? art.tagFA : art.tagEN}
                    </span>
                    <span className="bg-black/70 text-white text-[9px] px-2 py-0.5 rounded backdrop-blur-sm flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-[#C5A059]" />
                      {isRtl ? art.readTimeFA : art.readTimeEN}
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6">
                  <span className="text-[10px] text-zinc-500 font-mono block mb-2">{isRtl ? art.dateFA : art.dateEN}</span>
                  <h3 className={`text-base font-bold text-white leading-snug group-hover:text-[#C5A059] transition-colors ${isRtl ? 'font-vazir' : 'font-display'}`}>
                    {isRtl ? art.titleFA : art.titleEN}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-3 leading-relaxed line-clamp-3">
                    {isRtl ? art.summaryFA : art.summaryEN}
                  </p>
                </div>
              </div>

              {/* Footer action */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <span className="text-[10px] text-[#C5A059] font-bold tracking-wider uppercase flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  {isRtl ? 'تأییدیه متالورژی ساختمانی' : 'Certified Structural Guide'}
                </span>
                <button
                  onClick={() => setActiveArticle(art)}
                  className="p-2 bg-white/5 hover:bg-[#C5A059] text-white hover:text-black rounded-lg transition-all cursor-pointer flex items-center justify-center"
                  title={isRtl ? 'مطالعه مقاله علمی' : 'Read scientific document'}
                >
                  <ArrowRight className={`w-4 h-4 transform transition-transform group-hover:translate-x-1 ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Read Article Overlay Modal */}
        {activeArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
            <div 
              className={`bg-[#0E0E10] border border-white/10 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative ${
                isRtl ? 'font-vazir text-right' : 'font-sans text-left'
              }`}
            >
              {/* Cover Banner */}
              <div className="h-64 sm:h-80 overflow-hidden relative">
                <img 
                  src={activeArticle.image} 
                  alt={isRtl ? activeArticle.titleFA : activeArticle.titleEN}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/40 to-transparent"></div>
                
                {/* Floating Close Action */}
                <button 
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 p-2.5 bg-black/80 hover:bg-red-500/20 text-white hover:text-red-400 border border-white/10 rounded-full transition-all cursor-pointer"
                  title={isRtl ? 'بستن پنجره' : 'Close Document'}
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Meta details over gradient */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2.5 items-center justify-between">
                  <span className="bg-[#C5A059] text-black text-[10px] font-black px-3 py-1 rounded-md">
                    {isRtl ? activeArticle.tagFA : activeArticle.tagEN}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-white/90 font-mono bg-black/40 px-3 py-1 rounded-md backdrop-blur-sm border border-white/5">
                    <span>{isRtl ? activeArticle.dateFA : activeArticle.dateEN}</span>
                    <span>•</span>
                    <span>{isRtl ? activeArticle.readTimeFA : activeArticle.readTimeEN}</span>
                  </div>
                </div>
              </div>

              {/* Real Reading content */}
              <div className="p-6 sm:p-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug mb-6">
                  {isRtl ? activeArticle.titleFA : activeArticle.titleEN}
                </h3>

                {/* Render markdown style directly using native HTML styles structured neatly */}
                <div className="prose prose-invert prose-xs text-zinc-350 leading-relaxed text-sm space-y-6">
                  {isRtl ? (
                    <div className="space-y-4 whitespace-pre-line">
                      {activeArticle.contentFA}
                    </div>
                  ) : (
                    <div className="space-y-4 whitespace-pre-line">
                      {activeArticle.contentEN}
                    </div>
                  )}
                </div>

                {/* Bottom metadata validation */}
                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                    <span>{isRtl ? 'مورد تایید سازمان مهندسی و متالورژی ساختمانی ایران' : 'Registered in Yazd Mineralogical Archives'}</span>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert(isRtl ? 'لینک مقاله با موفقیت کپی شد!' : 'Article link copied to clipboard!');
                    }}
                    className="flex items-center gap-1.5 text-[#C5A059] hover:underline font-bold bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-[#C5A059]/20"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {isRtl ? 'اشتراک گذاری پیوند علمی' : 'Share Scientific Link'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
