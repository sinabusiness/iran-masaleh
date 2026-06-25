import React, { useState } from 'react';
import { PRODUCTS, TRANSLATIONS } from '../data';
import { Trash2, Plus, Minus, FileText, CheckCircle, Smartphone, Truck, ShieldAlert, Navigation, Clock, Printer, X } from 'lucide-react';
import { MaterialProduct, QuoteInquiry } from '../types';

interface QuoteCartProps {
  lang: 'fa' | 'en';
  cartItems: { productId: string; quantity: number }[];
  updateCartQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  onClose: () => void;
  products?: MaterialProduct[];
}

export default function QuoteCart({
  lang,
  cartItems,
  updateCartQty,
  removeFromCart,
  clearCart,
  onClose,
  products,
}: QuoteCartProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'fa';

  // Checkout form options
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [urgency, setUrgency] = useState<'routine' | 'urgent' | 'future'>('routine');
  
  // Receipt stage flags
  const [issuedReceipt, setIssuedReceipt] = useState<any | null>(null);
  const [phoneError, setPhoneError] = useState('');

  // Sourced materials retrieval
  const lookupProducts = products || PRODUCTS;
  const fullCartDetails = cartItems.map((item) => {
    const product = lookupProducts.find((p) => p.id === item.productId);
    return {
      item,
      product,
    };
  }).filter(entry => entry.product !== undefined);

  // Totals calculations
  const totalCostTomans = fullCartDetails.reduce((sum, entry) => {
    return sum + (entry.product!.pricePerUnitTomans * entry.item.quantity);
  }, 0);

  const totalWeightKGs = fullCartDetails.reduce((sum, entry) => {
    const packWeight = entry.product!.packWeightKG || 1;
    return sum + (packWeight * entry.item.quantity);
  }, 0);

  const totalWeightTons = totalWeightKGs / 1000;

  // Decide Freight truck required
  let assignedLogisticVehicle = t.pickupTruck;
  if (totalWeightTons > 2.2 && totalWeightTons <= 5.0) {
    assignedLogisticVehicle = t.lightTruck;
  } else if (totalWeightTons > 5.0 && totalWeightTons <= 15.0) {
    assignedLogisticVehicle = t.heavyTruck;
  } else if (totalWeightTons > 15.0) {
    assignedLogisticVehicle = t.trailerTruck;
  }

  const handleQtyChange = (productId: string, currentQty: number, adjust: number) => {
    const updated = Math.max(1, currentQty + adjust);
    updateCartQty(productId, updated);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');

    // Quick mobile verification check
    if (!phoneNumber || phoneNumber.length < 8) {
      setPhoneError(isRtl ? 'لطفا یک شماره همراه معتبر وارد نمایید.' : 'Please enter a valid active mobile number.');
      return;
    }

    // Generate simulated reference transaction booking code
    const uniqueSerial = "IM-" + Math.floor(100000 + Math.random() * 900000);
    const currentDate = new Date().toLocaleDateString(isRtl ? 'fa-IR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const receiptPackage = {
      invoiceNo: uniqueSerial,
      date: currentDate,
      fullName,
      phoneNumber,
      deliveryLocation,
      urgency,
      items: fullCartDetails,
      totalCostTomans,
      totalWeightTons,
      assignedLogisticVehicle,
    };

    setIssuedReceipt(receiptPackage);
    
    // Auto empty cart upon successful reservation logging
    clearCart();
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate premade whatsapp deep link pre-populated
  const getWhatsAppLink = (receipt: any) => {
    const space = "%20";
    let message = "";
    if (lang === 'fa') {
      message = `سلام. پیش‌فاکتور شماره ${receipt.invoiceNo} را در سایت ایران مصالح ثبت کردم.%0A` +
                `کارفرما: ${receipt.fullName}%0A` +
                `تلفن: ${receipt.phoneNumber}%0A` +
                `کارگاه تخلیه بار: ${receipt.deliveryLocation}%0A` +
                `اولویت: ${receipt.urgency}%0A` +
                `وزن ناخالص محموله: ${receipt.totalWeightTons.toFixed(2)} تن%0A` +
                `لطفاً کرایه حمل و قیمت نهایی تخفیف کارخانه را هماهنگ فرمایید.`;
    } else {
      message = `Hello Iran Masaleh Sales Desk.%0A` +
                `I registered Quote ID: ${receipt.invoiceNo} on your portal.%0A` +
                `Client: ${receipt.fullName}%0A` +
                `Destination: ${receipt.deliveryLocation}%0A` +
                `Payload: ${receipt.totalWeightTons.toFixed(1)} Tons%0A` +
                `Please calculate regional flatbed shipping rates for me.`;
    }
    return `https://wa.me/989131595717?text=${message}`; // Yazd corporate phone prefix
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      
      {/* Scrollable Container Sheet of Cart */}
      <div className="bg-[#0F0F11] border-l border-white/5 w-full max-w-lg h-full shadow-2xl flex flex-col justify-between relative overflow-hidden animate-[slide-in_0.3s_ease-out]">
        
        {/* Absolute top grid lines */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C5A059] to-[#E5E5E5]/20"></div>

        {/* --- STAGE A: ACTIVE BASKET VIEW --- */}
        {!issuedReceipt && (
          <>
            {/* Header Block of Inquiry Drawer */}
            <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center bg-[#141416]/90 backdrop-blur-md">
              <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse text-right' : 'flex-row text-left'}`}>
                <FileText className="w-5 h-5 text-[#C5A059] shrink-0" />
                <div>
                  <h3 className={`text-md font-bold text-white ${isRtl ? 'font-vazir' : 'font-display'}`}>
                    {t.quoteTitle}
                  </h3>
                  <span className={`text-[10px] text-zinc-400 font-medium block ${isRtl ? 'font-vazir' : 'font-sans'}`}>
                    {isRtl ? 'بارگیری متمرکز از هاب لجستیک پایانه یزد' : 'Consolidated Freight from Yazd Port'}
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="text-zinc-500 hover:text-white rounded-full p-1.5 hover:bg-white/5 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Cart Items Flow */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {fullCartDetails.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#C5A059]/10 border border-[#C5A059]/25 rounded-full flex items-center justify-center text-[#C5A059] text-xl">
                    🛒
                  </div>
                  <div className={isRtl ? 'font-vazir' : 'font-sans'}>
                    <h4 className="text-zinc-350 text-sm font-medium">{t.cartEmpty}</h4>
                    <button 
                      onClick={onClose}
                      className="text-xs text-[#C5A059] hover:text-white active:text-[#C5A059] font-semibold mt-2.5 underline cursor-pointer transition-colors"
                    >
                      {isRtl ? 'بازگشت به لیست مصالح ساختمانی' : 'Browse catalog list'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Items List */}
                  <div className="space-y-3">
                    {fullCartDetails.map(({ item, product }) => (
                      <div 
                        key={item.productId}
                        className={`flex gap-3 p-3 bg-[#141416]/90 border border-white/5 rounded-xl hover:border-[#C5A059]/30 transition-colors ${
                          isRtl ? 'flex-row-reverse' : 'flex-row'
                        }`}
                      >
                        <img
                          src={product!.imageUrl}
                          alt={lang === 'fa' ? product!.nameFA : product!.nameEN}
                          className="w-16 h-16 object-cover rounded-lg shrink-0 border border-white/5 bg-black/40"
                        />
                        
                        <div className="flex-1 flex flex-col justify-between">
                          <div className={isRtl ? 'text-right font-vazir' : 'text-left font-sans'}>
                            <h4 className="text-xs font-semibold text-white line-clamp-1">
                              {isRtl ? product!.nameFA : product!.nameEN}
                            </h4>
                            <span className="text-[10px] text-zinc-400 mt-1 block">
                              {isRtl ? 'قیمت برگی:' : 'Price:'} {product!.pricePerUnitTomans.toLocaleString()} {t.priceToman}
                            </span>
                          </div>

                          <div className={`flex justify-between items-center mt-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                            {/* Counter */}
                            <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/10 shadow-inner">
                              <button 
                                onClick={() => handleQtyChange(item.productId, item.quantity, -5)}
                                className="p-0.5 hover:bg-white/5 rounded text-zinc-400 hover:text-white cursor-pointer"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-10 text-center font-bold text-xs text-white font-display">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => handleQtyChange(item.productId, item.quantity, 5)}
                                className="p-0.5 hover:bg-white/5 rounded text-zinc-400 hover:text-white cursor-pointer"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Remove Trigger */}
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="text-zinc-550 hover:text-red-500 p-1 rounded-lg transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cumulative payload weight metadata warning */}
                  <div className={`p-4 bg-[#141416] border border-white/5 text-white rounded-xl ${isRtl ? 'font-vazir text-right' : 'font-sans text-left'}`}>
                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                      <span className="text-[10px] text-zinc-400">{isRtl ? 'مجموع وزن محموله خشک:' : 'Consolidated Payload:'}</span>
                      <span className="text-xs font-bold font-display text-[#C5A059]">
                        {totalWeightTons.toFixed(2)} {isRtl ? 'تن خشک' : 'Tons'}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-3">
                      <span className="text-[10px] text-zinc-400">{isRtl ? 'برآورد هزینه حدودی پایه کالایی:' : 'Subtotal Est. Cost:'}</span>
                      <span className="text-sm font-black font-display text-white">
                        {totalCostTomans.toLocaleString()} {t.priceToman}
                      </span>
                    </div>

                    <div className={`flex items-start gap-2 text-[10px] text-zinc-400 leading-relaxed`}>
                      <span className="text-sm">🚛</span>
                      <div>
                        <span className="font-bold text-white block uppercase text-[8px] tracking-wider">{isRtl ? 'ناوگان ترابری پیشنهادی:' : 'Freight Carrier Class:'}</span>
                        <p className="mt-0.5 text-zinc-300">{assignedLogisticVehicle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Contractor dispatch details FORM section */}
                  <form onSubmit={handleCheckoutSubmit} className={`pt-4 border-t border-white/5 space-y-4 ${
                    isRtl ? 'font-vazir text-right' : 'font-sans text-left'
                  }`}>
                    <h4 className="text-xs font-bold text-white border-l-2 border-[#C5A059] pl-2 uppercase tracking-wide">
                      {t.formHeading}
                    </h4>

                    {/* Full Name */}
                    <div>
                      <label className="text-[11px] font-bold text-zinc-400 block mb-1">
                        {t.clientNameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={isRtl ? "مثال: مهندس صادقی" : "e.g. Architect Sinclair"}
                        className="w-full bg-black/45 px-4.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#C5A039] focus:border-[#C5A059] text-xs text-white"
                      />
                    </div>

                    {/* Cell Phone */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-bold text-zinc-400">
                          {t.clientPhoneLabel}
                        </label>
                        <span className="text-[9px] text-[#C5A059] font-bold">{isRtl ? 'شماره بارنامه' : 'Transit-SMS key'}</span>
                      </div>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={isRtl ? "مثال: 09131595717" : "e.g. 09131595717"}
                        className="w-full bg-black/45 px-4.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#C5A039] focus:border-[#C5A059] text-xs text-white font-mono"
                      />
                      {phoneError && <span className="text-[10px] text-red-400 font-bold block mt-1">{phoneError}</span>}
                    </div>

                    {/* Delivery address spot */}
                    <div>
                      <label className="text-[11px] font-bold text-zinc-400 block mb-1">
                        {t.locationLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        placeholder={isRtl ? "کدام شهر و منطقه کارگاه تخلیه؟" : "City & street for logistics drop"}
                        className="w-full bg-[#141416] px-4.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:ring-1 focus:ring-[#C5A039] focus:border-[#C5A059] text-xs text-white"
                      />
                    </div>

                    {/* Delivery Urgency Option */}
                    <div>
                      <label className="text-[11px] font-bold text-zinc-400 block mb-1.5">
                        {t.urgencyLabel}
                      </label>
                      
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'routine', label: t.urgencyRoutine, icon: Navigation },
                          { id: 'urgent', label: t.urgencyUrgent, icon: AlarmToneBadge },
                          { id: 'future', label: t.urgencyFuture, icon: Clock }
                        ].map((mode) => (
                          <button
                            key={mode.id}
                            type="button"
                            onClick={() => setUrgency(mode.id as any)}
                            className={`p-2.5 rounded-xl border text-[9px] sm:text-[10px] font-bold flex flex-col items-center justify-center text-center gap-1.5 transition-all cursor-pointer ${
                              urgency === mode.id
                                ? 'border-[#C5A059] bg-[#C5A059]/15 text-[#C5A059]'
                                : 'border-white/5 bg-[#141416] text-zinc-400 hover:border-white/10'
                            }`}
                          >
                            <span>{lang === 'fa' ? (mode.id === 'routine' ? 'عادی' : mode.id === 'urgent' ? 'فوری' : 'رزرو انبار') : mode.id}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Inquiry button */}
                    <button
                      type="submit"
                      className="w-full bg-[#C5A059] hover:bg-[#C5A059]/90 text-black rounded-xl py-3.5 font-bold text-xs shadow-lg shadow-black/10 transition-all duration-300 cursor-pointer mt-4"
                    >
                      {t.btnSubmitQuote}
                    </button>

                  </form>
                </>
              )}
            </div>
          </>
        )}

        {/* --- STAGE B: BEAUTIFUL PRE-INVOICE RECEIPT SCREEN --- */}
        {issuedReceipt && (
          <div className="flex-1 flex flex-col justify-between max-h-full overflow-hidden">
            {/* Header control buttons */}
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#141416]/90 backdrop-blur-md">
              <span className={`text-xs font-semibold text-white flex items-center gap-1.5 ${isRtl ? 'font-vazir flex-row-reverse' : 'font-sans'}`}>
                <CheckCircle className="w-5 h-5 text-emerald-500 fill-emerald-500/10 stroke-[2.5]" />
                <span>{t.quoteSuccessHeader}</span>
              </span>
              <button 
                onClick={() => setIssuedReceipt(null)}
                className="text-zinc-500 hover:text-white p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Printable official bill card */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              
              <div 
                id="printable-area" 
                className={`relative border border-[#C5A059]/20 rounded-2xl p-6 bg-[#141416] shadow-xl ${
                  isRtl ? 'dir-rtl text-right font-vazir' : 'dir-ltr text-left font-sans'
                }`}
              >
                {/* Visual authenticity seal */}
                <div className="absolute top-4 right-4 text-[#C5A059]/10 opacity-30 select-none hidden sm:block pointer-events-none text-[8px] tracking-widest font-bold">
                  🔐 IRAN MASALEH OFFICIAL
                </div>

                {/* PreInvoice Title block */}
                <div className={`text-center pb-5 border-b border-white/5 mb-6 flex flex-col items-center justify-center`}>
                  <div className="w-10 h-10 rounded-full bg-[#C5A059] text-black font-extrabold flex items-center justify-center mb-2 font-display">
                    IM
                  </div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{lang === 'fa' ? 'پیش‌فاکتور رسمی استعلام قیمت' : 'Official Sourced Material Waybill'}</h4>
                  <span className="text-[9px] text-zinc-400 mt-1 block font-light">Yazd Central Despatch Terminal</span>
                </div>

                {/* Tracking serial and dates metadata */}
                <div className={`grid grid-cols-2 gap-4 pb-4 border-b border-white/5 mb-4 text-[10px] text-zinc-300`}>
                  <div>
                    <span className="block text-zinc-500">{t.receiptNo}</span>
                    <span className="font-semibold text-white font-mono text-sm">{issuedReceipt.invoiceNo}</span>
                  </div>
                  <div className={isRtl ? 'text-left' : 'text-right'}>
                    <span className="block text-zinc-500">{isRtl ? 'تاریخ ثبت صدور:' : 'Issued Date:'}</span>
                    <span className="font-semibold text-white">{issuedReceipt.date}</span>
                  </div>
                </div>

                {/* Contractor address metadata list */}
                <div className="space-y-2 text-[11px] text-zinc-300 pb-4 border-b border-white/5 mb-5 font-light">
                  <div className={`flex justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-zinc-500">{t.clientNameLabel}:</span>
                    <span className="font-semibold text-white">{issuedReceipt.fullName}</span>
                  </div>
                  <div className={`flex justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-zinc-500">{t.clientPhoneLabel}:</span>
                    <span className="font-semibold text-white font-mono">{issuedReceipt.phoneNumber}</span>
                  </div>
                  <div className={`flex justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-zinc-500">{t.locationLabel}:</span>
                    <span className="font-semibold text-white">{issuedReceipt.deliveryLocation}</span>
                  </div>
                  <div className={`flex justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-zinc-500">{isRtl ? 'فوریت دلیوری باربری:' : 'Transit Mode:'}</span>
                    <span className="font-bold text-[#C5A059] uppercase text-[10px]">{issuedReceipt.urgency}</span>
                  </div>
                </div>

                {/* Items brief Table */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] block text-zinc-450 uppercase tracking-widest font-semibold text-[#C5A059] mb-1.5">{isRtl ? 'اقلام سفارش شده:' : 'Consolidated Items List'}</span>
                  
                  {issuedReceipt.items.map(({ item, product }: any, i: number) => (
                    <div 
                      key={i}
                      className={`flex justify-between items-center py-2 px-2.5 bg-black/40 border border-white/5 rounded-xl text-[11px] ${
                        isRtl ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                        <span className="font-mono text-zinc-500 text-[10px]">#{i+1}</span>
                        <span className="font-medium text-white line-clamp-1 max-w-[200px]">{isRtl ? product.nameFA : product.nameEN}</span>
                      </div>
                      
                      <span className="font-bold text-[#C5A059] font-display">
                        {item.quantity.toLocaleString()} {isRtl ? product.unitFA : product.unitEN}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom line aggregates */}
                <div className="pt-4 border-t border-dashed border-white/10">
                  <div className={`flex justify-between text-xs font-semibold ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-zinc-450">{isRtl ? 'مجموع ناخالص وزن فیزیکی باربری:' : 'Total Freight dryweight:'}</span>
                    <span className="text-white font-display font-semibold">{issuedReceipt.totalWeightTons.toFixed(2)} {isRtl ? 'تن خشک' : 'Tons'}</span>
                  </div>
                  
                  <div className={`flex justify-between text-xs font-bold mt-2 pt-2 border-t border-white/5 ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-[#C5A059]">{isRtl ? 'جمع کل برآورد فرضی مصالح:' : 'Material Total Est:'}</span>
                    <span className="text-[#C5A059] font-display text-sm font-extrabold">
                      {issuedReceipt.totalCostTomans.toLocaleString()} {t.priceToman}
                    </span>
                  </div>
                  
                  <div className={`flex justify-between text-[11px] text-zinc-400 mt-2.5 bg-black/40 border border-white/5 p-2 rounded-lg ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span>{isRtl ? 'ناوگان ترابری پیشنهادی:' : 'Suggested Carrier Fleet:'}</span>
                    <span className="font-bold text-white">{issuedReceipt.assignedLogisticVehicle}</span>
                  </div>
                </div>

                {/* Sealed Stamp signature visualization */}
                <div className="mt-10 flex justify-between items-center text-[10px] text-zinc-500 border-t border-white/5 pt-3 font-light">
                  <span>SYSTEM REGISTERED SECURE</span>
                  <div className="text-center font-serif leading-tight text-[#C5A059]/80 scale-100 italic">
                    <span className="block text-[8px] uppercase not-italic tracking-widest text-[#C5A039]">Hub Dispatcher</span>
                    Yazd Terminal Stamp
                  </div>
                </div>

              </div>

              {/* Informative advice */}
              <p className={`text-zinc-400 text-[10px] leading-relaxed block text-center max-w-sm mx-auto mt-4 font-light ${
                isRtl ? 'font-vazir' : 'font-sans'
              }`}>
                {t.quoteSuccessText}
              </p>
            </div>

            {/* Receipt Footer with Direct Print and Whatsapp Integration */}
            <div className={`p-6 border-t border-white/5 bg-[#141416]/90 backdrop-blur-md flex flex-col gap-3 ${
              isRtl ? 'font-vazir text-right' : 'font-sans text-left'
            }`}>
              {/* WhatsApp direct routing desk */}
              <a
                href={getWhatsAppLink(issuedReceipt)}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-white" />
                <span>{t.whatsappContact}</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center gap-1.5 border border-white/10 hover:border-[#C5A059] hover:bg-white/5 text-zinc-300 hover:text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>{t.printReceipt}</span>
                </button>

                <button
                  onClick={() => setIssuedReceipt(null)}
                  className="flex items-center justify-center bg-white hover:bg-[#C5A059]/30 text-black font-semibold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  <span>{t.closeReceipt}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Simple alarm fallback component
function AlarmToneBadge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      {...props}
    >
      <path d="m12 14-2.5-3" />
      <path d="M12 2v20" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
