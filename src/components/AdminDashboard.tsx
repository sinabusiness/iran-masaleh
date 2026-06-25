import React, { useState } from 'react';
import { MaterialProduct } from '../types';
import { TRANSLATIONS } from '../data';
import { ArrowLeft, Check, Trash2, Globe, Database, Cpu, Plus, CheckCircle2, ShieldCheck, Loader2, Sparkles, Filter, Search, Play, Building2 } from 'lucide-react';

const DISCOVERED_FACTORIES = [
  {
    id: 'f-meybod',
    nameFA: 'صنایع کاشی و سرامیک میبد یزد',
    nameEN: 'Meybod Tiles & Ceramics Group',
    category: 'tiles',
    url: 'meybodtile.ir',
    statusFA: 'آماده خزش خودکار (کاشی پرسلان)',
    statusEN: 'Ready to scan (Porcelain Tiles)'
  },
  {
    id: 'f-cement',
    nameFA: 'کارخانه سیمان سفید ممتاز یزد',
    nameEN: 'Yazd White Cement Co.',
    category: 'cement',
    url: 'yazdcement.com',
    statusFA: 'آماده خزش خودکار (سیمان و گچ)',
    statusEN: 'Ready to scan (Cement & Plaster)'
  },
  {
    id: 'f-taft',
    nameFA: 'مجموعه معادن و سنگبری تفت یزد',
    nameEN: 'Taft Stone Quarry Yards',
    category: 'stones',
    url: 'taftstone.ir',
    statusFA: 'آماده خزش خودکار (سنگ مرمریت)',
    statusEN: 'Ready to scan (Marble Stone)'
  },
  {
    id: 'f-kavir',
    nameFA: 'صنایع آجر و سفال سنتی کویر یزد',
    nameEN: 'Kavir Traditional Brick & Clay',
    category: 'traditional',
    url: 'kavirbrick.ir',
    statusFA: 'آماده خزش خودکار (بلوک و آجر)',
    statusEN: 'Ready to scan (Brick & Block)'
  },
  {
    id: 'f-golsar',
    nameFA: 'کارخانجات کاشی و سرامیک گلسار یزد',
    nameEN: 'Yazd Golsar Mosaic & Tiles',
    category: 'tiles',
    url: 'golsartile.com',
    statusFA: 'آماده خزش خودکار (سرامیک استخری)',
    statusEN: 'Ready to scan (Pool Mosaic)'
  }
];

interface AdminDashboardProps {
  lang: 'fa' | 'en';
  products: MaterialProduct[];
  onBackToApp: () => void;
}

export default function AdminDashboard({ lang, products, onBackToApp }: AdminDashboardProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'fa';

  const [crawlerTab, setCrawlerTab] = useState<'discover' | 'custom'>('discover');
  const [factorySearchQuery, setFactorySearchQuery] = useState('');
  const [factoryUrl, setFactoryUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tiles');
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlStatus, setCrawlStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');

  const pendingProducts = products.filter(p => (p as any).approved === false);
  const approvedProducts = products.filter(p => (p as any).approved !== false);

  const executeCrawl = async (url: string, category: string) => {
    setIsCrawling(true);
    setCrawlStatus(isRtl ? 'در حال اتصال به سرور کارخانه و خزش هوشمند کاتالوگ...' : 'Connecting to factory server and crawling catalog...');

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, category })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setCrawlStatus(isRtl 
          ? `خزش با موفقیت پایان یافت! تعداد ${data.products.length} نمونه کالا از کارخانه ${url} استخراج و به دیتابیس بخش انتظار برای تأیید افزوده شد.`
          : `Success! Auto-discovered and crawled ${data.products.length} products from factory ${url}. Added to review queue.`
        );
        setFactoryUrl('');
      } else {
        throw new Error(data.error || 'Scrape failed');
      }
    } catch (err: any) {
      setCrawlStatus(isRtl 
        ? `خطا در اتصال به کارخانه: ${err.message || 'شبکه مسدود است. لطفاً دوباره تلاش کنید.'}`
        : `Crawl error: ${err.message || 'Connection failed. Please retry.'}`
      );
    } finally {
      setIsCrawling(false);
    }
  };

  const handleCrawl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!factoryUrl) return;
    await executeCrawl(factoryUrl, selectedCategory);
  };

  const handleApprove = async (productId: string) => {
    try {
      const response = await fetch('/api/admin/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, approved: true })
      });
      if (!response.ok) throw new Error('Failed to approve');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm(isRtl ? 'آیا از حذف این محصول اطمینان دارید؟' : 'Are you sure you want to delete this product?')) {
      return;
    }
    try {
      const response = await fetch('/api/admin/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId })
      });
      if (!response.ok) throw new Error('Failed to delete');
    } catch (err) {
      console.error(err);
    }
  };

  const displayList = activeTab === 'pending' ? pendingProducts : approvedProducts;

  return (
    <div className={`min-h-screen bg-[#070708] text-white p-6 md:p-12 ${isRtl ? 'font-vazir text-right' : 'font-sans text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2 text-[#C5A059]">
            <ShieldCheck className="w-6 h-6" />
            <span className="text-xs font-bold tracking-widest uppercase font-mono">
              {isRtl ? 'سامانه کنترل و خزش مرکزی' : 'Core Crawling Control Hub'}
            </span>
          </div>
          <h1 className="text-3xl font-light tracking-tight">
            {isRtl ? 'مدیریت ایران مصالح' : 'Iran Masaleh Admin Dashboard'}
          </h1>
        </div>
        
        <button
          onClick={onBackToApp}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-white/5 rounded-xl text-xs font-bold hover:bg-[#C5A059] hover:text-black transition-all cursor-pointer"
        >
          {isRtl ? <ArrowLeft className="w-4 h-4 rotate-180" /> : <ArrowLeft className="w-4 h-4" />}
          {isRtl ? 'بازگشت به سایت اصلی' : 'Back to Main Store'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Scraper Input Control Panel */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          <div className="bg-[#101012] border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-[#C5A059]" />
              <h2 className="text-lg font-medium">
                {isRtl ? 'راه‌اندازی خزشگر کارخانه' : 'Launch Factory Crawler'}
              </h2>
            </div>
            
            <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
              {isRtl 
                ? 'موتور هوشمند خزشگر مرکزی ایران مصالح برای مکان‌یابی و استخراج خودکار کاتالوگ‌های تولیدی استان یزد.'
                : 'Iran Masaleh central crawler engine for automated locating and ingestion of Yazd manufacturing catalogs.'}
            </p>

            {/* Inner Tabs for Automated vs Custom mode */}
            <div className="flex border-b border-white/10 mb-6">
              <button
                type="button"
                onClick={() => setCrawlerTab('discover')}
                className={`flex-1 pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  crawlerTab === 'discover' ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-zinc-500 hover:text-zinc-350'
                }`}
              >
                {isRtl ? 'کشف خودکار کارخانه' : 'Auto-Discover'}
              </button>
              <button
                type="button"
                onClick={() => setCrawlerTab('custom')}
                className={`flex-1 pb-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                  crawlerTab === 'custom' ? 'border-[#C5A059] text-[#C5A059]' : 'border-transparent text-zinc-500 hover:text-zinc-350'
                }`}
              >
                {isRtl ? 'درج آدرس دستی' : 'Custom Website'}
              </button>
            </div>

            {crawlerTab === 'discover' ? (
              <div className="flex flex-col gap-4">
                {/* Search Bar for Factory Database */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder={isRtl ? 'جستجوی کارخانه‌های تولیدی یزد...' : 'Search Yazd manufacturing databases...'}
                    value={factorySearchQuery}
                    onChange={(e) => setFactorySearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* List of Discovered Factories */}
                <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                  {DISCOVERED_FACTORIES.filter(f => 
                    f.nameFA.includes(factorySearchQuery) || 
                    f.nameEN.toLowerCase().includes(factorySearchQuery.toLowerCase()) ||
                    f.url.toLowerCase().includes(factorySearchQuery.toLowerCase())
                  ).map(factory => (
                    <div 
                      key={factory.id} 
                      className="p-3 bg-zinc-950/60 hover:bg-zinc-950 border border-white/5 rounded-xl flex items-center justify-between gap-3 transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#C5A059]/10 flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4 text-[#C5A059]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">
                            {isRtl ? factory.nameFA : factory.nameEN}
                          </h4>
                          <span className="text-[10px] text-[#C5A059] font-mono block mt-0.5">
                            {factory.url}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        disabled={isCrawling}
                        onClick={() => executeCrawl(factory.url, factory.category)}
                        className="p-2 bg-[#C5A059]/15 hover:bg-[#C5A059] text-[#C5A059] hover:text-black rounded-lg disabled:bg-zinc-800 disabled:text-zinc-600 transition-all cursor-pointer shrink-0"
                        title={isRtl ? 'خزش و استخراج خودکار کاتالوگ' : 'Crawl & Ingest Catalog'}
                      >
                        {isCrawling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      </button>
                    </div>
                  ))}
                  {DISCOVERED_FACTORIES.filter(f => 
                    f.nameFA.includes(factorySearchQuery) || 
                    f.nameEN.toLowerCase().includes(factorySearchQuery.toLowerCase()) ||
                    f.url.toLowerCase().includes(factorySearchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="text-center py-6 text-xs text-zinc-500">
                      {isRtl ? 'هیچ کارخانه‌ای با این مشخصات یافت نشد.' : 'No matching factories found in database.'}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleCrawl} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 font-bold">
                    {isRtl ? 'آدرس وب‌سایت کارخانه' : 'Factory Website URL'}
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. meybodtile.com"
                      value={factoryUrl}
                      onChange={(e) => setFactoryUrl(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-400 mb-1.5 font-bold">
                    {isRtl ? 'دسته‌بندی مصالح' : 'Material Category'}
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#C5A059] cursor-pointer"
                  >
                    <option value="tiles">{isRtl ? 'کاشی و سرامیک (Meybod Tiles)' : 'Tiles & Ceramics'}</option>
                    <option value="traditional">{isRtl ? 'آجر و سفال سنتی' : 'Traditional Brick & Clay'}</option>
                    <option value="stones">{isRtl ? 'سنگ ساختمانی (Taft Travertine)' : 'Natural Stones'}</option>
                    <option value="cement">{isRtl ? 'سیمان و گچ یزد' : 'Cement & Plaster'}</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isCrawling}
                  className="w-full mt-2 py-3 bg-[#C5A059] text-black font-bold text-xs rounded-xl hover:bg-[#b08e4d] disabled:bg-zinc-800 disabled:text-zinc-500 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isCrawling ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isRtl ? 'در حال خزش...' : 'Crawling Catalog...'}
                    </>
                  ) : (
                    <>
                      <Cpu className="w-4 h-4" />
                      {isRtl ? 'اجرای خزشگر دستی' : 'Execute Custom Scrape'}
                    </>
                  )}
                </button>
              </form>
            )}

            {crawlStatus && (
              <div className="mt-6 p-4 bg-zinc-950 border border-white/5 rounded-xl text-xs leading-relaxed">
                <span className="block font-bold text-[#C5A059] mb-1">
                  {isRtl ? 'وضعیت موتور خزشگر:' : 'Crawler Log output:'}
                </span>
                <span className="text-zinc-300">{crawlStatus}</span>
              </div>
            )}
          </div>

          {/* Quick Info Box */}
          <div className="bg-[#101012] border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-zinc-400" />
              <h3 className="text-sm font-bold">
                {isRtl ? 'آمار دیتابیس زنده' : 'Live Database Status'}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/5">
                <span className="text-xs text-zinc-400 block mb-1">{isRtl ? 'کل مصالح' : 'Total Materials'}</span>
                <span className="text-xl font-bold font-mono text-white">{products.length}</span>
              </div>
              <div className="bg-zinc-950 p-4 rounded-xl border border-white/5">
                <span className="text-xs text-zinc-400 block mb-1">{isRtl ? 'در انتظار تایید' : 'Pending Review'}</span>
                <span className="text-xl font-bold font-mono text-amber-500">{pendingProducts.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Columns: Products Approval Queue & Existing Catalog List */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Section Selector Tab Header */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'pending'
                  ? 'border-[#C5A059] text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-350'
              }`}
            >
              {isRtl ? `در انتظار بررسی و تأیید (${pendingProducts.length})` : `Pending Review (${pendingProducts.length})`}
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-6 py-3 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                activeTab === 'approved'
                  ? 'border-[#C5A059] text-white'
                  : 'border-transparent text-zinc-500 hover:text-zinc-350'
              }`}
            >
              {isRtl ? `منتشر شده در کاتالوگ (${approvedProducts.length})` : `Published Catalog (${approvedProducts.length})`}
            </button>
          </div>

          {/* List display */}
          <div className="flex flex-col gap-4">
            {displayList.length === 0 ? (
              <div className="text-center py-16 bg-[#101012] rounded-2xl border border-dashed border-white/10 text-zinc-500">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-zinc-600" />
                <p className="text-sm">
                  {isRtl ? 'هیچ موردی در این بخش یافت نشد.' : 'No materials found in this category.'}
                </p>
              </div>
            ) : (
              displayList.map((p) => (
                <div 
                  key={p.id}
                  className="bg-[#101012] border border-white/5 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.imageUrl}
                      alt={p.nameFA}
                      className="w-16 h-16 rounded-xl object-cover bg-zinc-950 border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold bg-zinc-800 text-[#C5A059] px-2 py-0.5 rounded-md uppercase">
                          {p.category}
                        </span>
                        {(p as any).scrapedFrom && (
                          <span className="text-[10px] font-mono text-zinc-500">
                            {new URL((p as any).scrapedFrom).hostname}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white mb-0.5">
                        {isRtl ? p.nameFA : p.nameEN}
                      </h4>
                      <p className="text-[11px] text-zinc-400 max-w-md line-clamp-1">
                        {isRtl ? p.descriptionFA : p.descriptionEN}
                      </p>
                      <div className="text-xs text-zinc-300 font-bold mt-1.5">
                        {p.pricePerUnitTomans.toLocaleString()} {isRtl ? 'تومان' : 'Tomans'} / {isRtl ? p.unitFA : p.unitEN}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    {activeTab === 'pending' && (
                      <button
                        onClick={() => handleApprove(p.id)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        {isRtl ? 'تأیید و انتشار' : 'Approve & Publish'}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 bg-red-900/40 hover:bg-red-900 border border-red-500/10 text-red-200 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      {isRtl ? 'حذف' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
