import React, { useState, useEffect } from 'react';
import { CALCULATORS, TRANSLATIONS, PRODUCTS } from '../data';
import { Calculator, Percent, Layers, HelpCircle, ArrowRight, ArrowLeft, Plus, Check } from 'lucide-react';

interface CalculatorProps {
  lang: 'fa' | 'en';
  onAddCustomEstimateToCart: (items: { productId: string; qty: number }[]) => void;
}

export default function CalculatorTab({ lang, onAddCustomEstimateToCart }: CalculatorProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'fa';

  const [activeCalcId, setActiveCalcId] = useState<string>('concrete-wall');
  const [inputVals, setInputVals] = useState<Record<string, number>>({});
  const [successApplyNotify, setSuccessApplyNotify] = useState(false);

  const activeCalc = CALCULATORS.find(c => c.id === activeCalcId) || CALCULATORS[0];

  // Set default values whenever the calculator type shifts
  useEffect(() => {
    const defaults: Record<string, number> = {};
    activeCalc.inputs.forEach((inp) => {
      defaults[inp.id] = inp.defaultValue;
    });
    setInputVals(defaults);
    setSuccessApplyNotify(false);
  }, [activeCalcId]);

  const handleInputChange = (id: string, val: string) => {
    const num = parseFloat(val);
    setInputVals((p) => ({ ...p, [id]: isNaN(num) ? 0 : num }));
    setSuccessApplyNotify(false);
  };

  // Perform Calculations based on formula logic
  const calculateEstimate = () => {
    const length = inputVals['length'] || 0;
    const height = inputVals['height'] || 0;
    const width = inputVals['width'] || 0;
    const thickness = inputVals['thickness'] || 0;

    let itemsNeeded: { nameFA: string; nameEN: string; quantity: number; unitFA: string; unitEN: string; productId?: string }[] = [];
    let estimatedWeightTons = 0;
    let baseCostTomans = 0;
    let formulaStr = "";

    if (activeCalcId === 'concrete-wall') {
      const surfaceArea = length * height;
      const wallThicknessMeter = thickness / 100;
      
      // We assume standard Yazd Clay Block 15cm
      const blockQty = Math.round(surfaceArea * 25); // 25 blocks per square meter
      const mortarLiters = Math.round(surfaceArea * 15); // 15 liters of mortar per m2
      const cementBagsNeeded = Math.round((mortarLiters * 1.8 * 0.25) / 50) || 1; // 25% cement wt in mortar, 50kg bag

      itemsNeeded = [
        { 
          nameFA: "سفال تیغه‌ای فوم‌دار ۱۵ درجه یک یزد", 
          nameEN: "Premium 15cm Acoustical Clay Blocks", 
          quantity: blockQty, 
          unitFA: "عدد", 
          unitEN: "Pieces",
          productId: "yazd-clay-block-15"
        },
        { 
          nameFA: "سیمان پرتلند تیپ ۲ کارخانجات یزد (برای ملات مفاصل)", 
          nameEN: "Yazd Portland Cement Type II (For mortar joints)", 
          quantity: cementBagsNeeded, 
          unitFA: "پاکت ۵۰ کیلویی", 
          unitEN: "50kg Bags",
          productId: "yazd-cement-type2" 
        }
      ];

      estimatedWeightTons = ((blockQty * 6.8) + (cementBagsNeeded * 50)) / 1000;
      baseCostTomans = (blockQty * 6500) + (cementBagsNeeded * 72000);
      formulaStr = isRtl 
        ? `طول دیوار (${length}m) × ارتفاع (${height}m) = ${surfaceArea.toFixed(1)} متر مربع دیوارچینی. هر متر مربع مجهز به ۲۵ عدد بلوک و حدود ۰.۵ پاکت سیمان.`
        : `Wall area: ${length}m × ${height}m = ${surfaceArea.toFixed(1)} M². Average matrix consumes 25 blocks and approx 0.08 bags of Portland cement per M².`;

    } else if (activeCalcId === 'concrete-slab') {
      const volumeM3 = length * width * (thickness / 100);
      const cementBagsNeeded = Math.round(volumeM3 * 7); // ~7 bags per M3 of standard 350-mix
      const aggregateTons = parseFloat((volumeM3 * 1.25).toFixed(1));

      itemsNeeded = [
        { 
          nameFA: "سیمان پرتلند تیپ ۲ پاکتی کارخانه یزد", 
          nameEN: "Yazd Portland Cement Type II (For concrete mix)", 
          quantity: cementBagsNeeded, 
          unitFA: "پاکت ۵۰ کیلویی", 
          unitEN: "50kg Bags",
          productId: "yazd-cement-type2"
        },
        { 
          nameFA: "شن و ماسه مخلوط فیلتر شده ممتاز یزد", 
          nameEN: "Premium Filtered Concrete Sand/Aggregates", 
          quantity: aggregateTons, 
          unitFA: "تن", 
          unitEN: "Tons"
        }
      ];

      estimatedWeightTons = volumeM3 * 2.4; // 2.4 tons per m3 of wet concrete
      baseCostTomans = (cementBagsNeeded * 72000) + (aggregateTons * 125000); // 125,000 toman per ton of gravel
      formulaStr = isRtl
        ? `حجم کل بتن ریزی = ${volumeM3.toFixed(2)} متر مکعب. عیار سیمان کارگاهی ۳۵۰ کیلوگرم بر متر مکعب (۷ پاکت گونی در هر متر مکعب) و ۱.۲۵ تن ماسه سنگدانه.`
        : `Total Cast Volume = ${volumeM3.toFixed(2)} M³. Compressive ratio uses 350kg/M³ binder cement (7 sacks per M³) and 1.25 tons of aggregates.`;

    } else if (activeCalcId === 'tiling') {
      const basicArea = length * width;
      const layoutWithMargin = basicArea * 1.10; // 10% cutting slivers margin
      const totalPorcelainM2 = Math.round(layoutWithMargin);
      const glueBagsNeeded = Math.round((basicArea * 5) / 25) || 1; // 5kg adhesive powder per M2, 25kg bag

      itemsNeeded = [
        { 
          nameFA: "پرسلان اسلب طرح تراورتن ابریشمی میبد", 
          nameEN: "Meybod Travertine Silk Porcelain Slab", 
          quantity: totalPorcelainM2, 
          unitFA: "متر مربع", 
          unitEN: "Sq Meters",
          productId: "yazd-travertine-porcelain"
        }
      ];

      estimatedWeightTons = (totalPorcelainM2 * 32) / 1000; // 32kg dry tile box weight per sqM
      baseCostTomans = (totalPorcelainM2 * 360000);
      formulaStr = isRtl
        ? `مساحت واقعی سطح کاشی: ${basicArea.toFixed(1)} متر مربع. ضربدر ۱۰٪ ضایعات گوشه‌کنی = ${totalPorcelainM2} متر مربع کل اسلب پرسلان کاشی.`
        : `Primary tile area: ${basicArea.toFixed(1)} M² + 10% cutting fracture padding = ${totalPorcelainM2} total SqM of premium porcelain tile slab.`;
    }

    // Vehicle Allocation Logic
    let logisticVehicleKey: 'pickupTruck' | 'lightTruck' | 'heavyTruck' | 'trailerTruck' = 'pickupTruck';
    if (estimatedWeightTons <= 2.2) {
      logisticVehicleKey = 'pickupTruck';
    } else if (estimatedWeightTons <= 5.0) {
      logisticVehicleKey = 'lightTruck';
    } else if (estimatedWeightTons <= 15.0) {
      logisticVehicleKey = 'heavyTruck';
    } else {
      logisticVehicleKey = 'trailerTruck';
    }

    return {
      itemsNeeded,
      estimatedWeightTons,
      baseCostTomans,
      logisticVehicle: t[logisticVehicleKey],
      formulaStr
    };
  };

  const results = calculateEstimate();

  const handleApplyToQuote = () => {
    const listToInject: { productId: string; qty: number }[] = [];
    results.itemsNeeded.forEach((item) => {
      if (item.productId) {
        listToInject.push({
          productId: item.productId,
          qty: item.quantity
        });
      }
    });

    if (listToInject.length > 0) {
      onAddCustomEstimateToCart(listToInject);
      setSuccessApplyNotify(true);
      setTimeout(() => setSuccessApplyNotify(false), 3500);
    }
  };

  return (
    <section id="calculator" className="py-24 bg-[#0F0F11] border-b border-white/5 relative overflow-hidden">
      {/* Decorative Blueprint Graph Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#C5A05908_1px,transparent_1px),linear-gradient(to_bottom,#C5A05908_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#C5A059]/10 text-[#C5A059] rounded-xl mb-4 border border-[#C5A059]/15">
            <Calculator className="w-5 h-5 stroke-[2]" />
          </div>
          <h2 className={`text-3xl sm:text-4xl font-light text-white tracking-tight mb-4 ${
            isRtl ? 'font-vazir' : 'font-display'
          }`}>
            {t.calcTitle}
          </h2>
          <p className={`text-zinc-400 text-sm sm:text-base font-light leading-relaxed ${isRtl ? 'font-vazir' : 'font-sans'}`}>
            {t.calcSubtitle}
          </p>
        </div>

        {/* Core Split Grid Calculator UI */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 ${isRtl ? 'rtl-grid' : 'ltr-grid'}`}>
          
          {/* Left / Input Controller Panel (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Quick selectors for calculator types */}
            <div className={`flex flex-col gap-2 p-2 bg-[#141416] border border-white/5 rounded-2xl shadow-lg ${
              isRtl ? 'font-vazir' : 'font-sans'
            }`}>
              {[
                { id: 'concrete-wall', label: t.calcConcreteWall, desc: t.calcConcreteWall },
                { id: 'concrete-slab', label: t.calcConcreteSlab, desc: t.calcConcreteSlab },
                { id: 'tiling', label: t.calcTiling, desc: t.calcTiling }
              ].map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalcId(calc.id)}
                  className={`w-full text-right p-3.5 rounded-xl flex items-center justify-between transition-all duration-300 cursor-pointer ${
                    activeCalcId === calc.id
                      ? 'bg-[#C5A059] text-black font-semibold shadow-md'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className={`text-xs font-bold ${isRtl ? 'text-right' : 'text-left'}`}>
                    {lang === 'fa' ? calc.label : calc.id === 'concrete-wall' ? 'Sand Clay Walls' : calc.id === 'concrete-slab' ? 'Concrete Castings' : 'Wall & Floor Slate Tiling'}
                  </span>
                  <span className="text-xs opacity-75">→</span>
                </button>
              ))}
            </div>

            {/* Dynamic Dimensions input field card */}
            <div className="bg-[#141416] p-6 sm:p-8 rounded-2xl border border-white/5 shadow-xl">
              <h3 className={`text-sm font-bold text-white border-b border-white/5 pb-3.5 mb-6 ${
                isRtl ? 'font-vazir text-right' : 'font-display text-left'
              }`}>
                {t.dimensionsInput}
              </h3>

              <div className="space-y-4">
                {activeCalc.inputs.map((inp) => {
                  const currentVal = inputVals[inp.id] !== undefined ? inputVals[inp.id] : inp.defaultValue;
                  return (
                    <div key={inp.id} className={isRtl ? 'text-right font-vazir' : 'text-left font-sans'}>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-semibold text-zinc-350">
                          {isRtl ? inp.labelFA : inp.labelEN}
                        </label>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {isRtl ? inp.unitFA : inp.unitEN}
                        </span>
                      </div>
                      
                      <div className="relative">
                        <input
                          type="number"
                          min="0.1"
                          step="0.1"
                          placeholder={inp.placeholder}
                          value={currentVal}
                          onChange={(e) => handleInputChange(inp.id, e.target.value)}
                          className={`w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 focus:border-[#C5A059] transition-all ${
                            isRtl ? 'text-right' : 'text-left font-mono'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right / Analytics Calculation Results Panel (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-[#1A1A1D] text-white p-6 sm:p-8 rounded-2xl border border-white/5 shadow-2xl flex flex-col justify-between h-full relative overflow-hidden">
              
              {/* Star dust glowing effect in background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/5 rounded-full blur-3xl"></div>

              <div>
                <h3 className={`text-md font-bold text-white border-b border-white/5 pb-4 mb-6 flex items-center gap-1.5 ${
                  isRtl ? 'font-vazir flex-row-reverse text-right' : 'font-display flex-row text-left'
                }`}>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-ping"></span>
                  <span>{t.calcResultTitle}</span>
                </h3>

                {/* Quantitative results list */}
                <div className="space-y-4">
                  <div>
                    <h4 className={`text-xs font-bold text-[#C5A059]/80 mb-2 uppercase tracking-wide ${isRtl ? 'font-vazir text-right' : 'font-sans'}`}>
                      {t.estimatedMaterials}
                    </h4>
                    
                    <div className="space-y-2">
                       {results.itemsNeeded.map((item, i) => (
                        <div 
                          key={i}
                          className={`flex justify-between items-center bg-[#0A0A0B]/40 px-4 py-3 rounded-xl border border-white/5 hover:bg-[#0A0A0B]/70 transition-colors ${
                            isRtl ? 'flex-row-reverse text-right font-vazir' : 'flex-row text-left font-sans'
                          }`}
                        >
                          <span className="text-xs font-semibold text-zinc-350">{isRtl ? item.nameFA : item.nameEN}</span>
                          <span className="text-sm font-extrabold text-[#C5A059] font-display">
                            {item.quantity.toLocaleString()} {isRtl ? item.unitFA : item.unitEN}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial Estimate & Live deadweight metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    
                    {/* Weight Card */}
                    <div className={`bg-[#0A0A0B]/50 p-4 rounded-xl border border-white/5 ${isRtl ? 'text-right font-vazir' : 'text-left font-sans'}`}>
                      <span className="text-[10px] text-zinc-450 block tracking-wider uppercase font-medium">{t.estimatedWeight}</span>
                      <span className="text-xl font-black text-white block mt-1 font-display">
                        {results.estimatedWeightTons.toFixed(2)} {isRtl ? 'تن خشک' : 'Tons'}
                      </span>
                    </div>

                    {/* Cost Factor Card */}
                    <div className={`bg-[#0A0A0B]/50 p-4 rounded-xl border border-white/5 ${isRtl ? 'text-right font-vazir' : 'text-left font-sans'}`}>
                      <span className="text-[10px] text-zinc-450 block tracking-wider uppercase font-medium">{t.estimatedCost}</span>
                      <span className="text-xl font-black text-[#C5A059] block mt-1 font-display">
                        {results.baseCostTomans.toLocaleString()} {t.priceToman}
                      </span>
                    </div>

                  </div>

                  {/* Transport Dispatch Truck Allocations */}
                  <div className={`bg-black/40 p-4 rounded-xl border border-[#C5A059]/20 flex gap-3 mt-4 ${
                    isRtl ? 'flex-row-reverse text-right font-vazir' : 'flex-row text-left font-sans'
                  }`}>
                    <div className="text-[#C5A059] pt-0.5 text-base">
                      🚚
                    </div>
                    <div>
                      <h5 className="text-[10px] text-[#C5A059] uppercase tracking-widest font-black">
                        {t.requiredTruckType} ({isRtl ? 'سامانه باربری یزد' : 'Freight Service'})
                      </h5>
                      <p className="text-sm font-bold text-white mt-1">
                        {results.logisticVehicle}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Dynamic formula documentation box */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className={`flex gap-2 items-start text-xs ${isRtl ? 'flex-row-reverse text-right font-vazir' : 'flex-row text-left font-sans'}`}>
                  <HelpCircle className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-zinc-500 block uppercase tracking-wide">{t.formulaUsed}</span>
                    <p className="text-zinc-400 text-[11px] leading-relaxed mt-0.5 font-light">
                      {results.formulaStr}
                    </p>
                  </div>
                </div>

                {/* Inject to quote action triggers */}
                <div className="mt-6">
                  <button
                    onClick={handleApplyToQuote}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-xs transition-all duration-300 cursor-pointer ${
                      successApplyNotify
                        ? 'bg-[#C5A059] text-black font-black'
                        : 'bg-white hover:bg-[#C5A059] text-black shadow-md hover:scale-[1.01]'
                    } ${isRtl ? 'font-vazir' : 'font-sans'}`}
                  >
                    {successApplyNotify ? <Check className="w-4 h-4 animate-bounce text-black stroke-[3]" /> : <Layers className="w-4 h-4 text-black" />}
                    <span>
                      {successApplyNotify 
                        ? (isRtl ? 'کالاهای محاسباتی با موفقیت به پیش‌فاکتور تزریق شدند' : 'Estimates successfully added!')
                        : t.applyToQuoteBtn}
                    </span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
