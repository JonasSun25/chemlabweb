import { Zap, Thermometer, Orbit, ArrowRightLeft } from "lucide-react";

export default function AuxiliaryEquipment() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">
            Auxiliary Instrumentation
          </h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            常用辅助设备
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            用于化学反应体系的加热、搅拌、减压蒸发及气体控制的常用实验装置。
          </p>
        </div>

        <div className="space-y-10">
          {/* Heating & Stirring */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col items-center top-0">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Thermometer className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
                加热与混合系统
              </h3>
              <p className="text-sm text-slate-500 text-center">
                提供反应体系的热量传递与混合搅拌功能。
              </p>
            </div>
            <div className="md:w-2/3 p-8 grid lg:grid-cols-3 gap-6">
              {/* Hotplate Stirrer */}
              <div className="flex flex-col">
                <div className="h-32 mb-4 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <img 
                    src="/figures/辅助设备/磁力搅拌器.png" 
                    alt="磁力加热搅拌台" 
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">
                  磁力加热搅拌台
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  实验室基础搅拌设备。通过底部旋转磁场驱动烧瓶内磁力搅拌子旋转，实现液体混合。转速可控，配合加热功能可同时控制反应温度。
                </p>
              </div>

              {/* Silicone Oil Bath */}
              <div className="flex flex-col">
                <div className="h-32 mb-4 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <img 
                    src="/figures/辅助设备/油浴加热.png" 
                    alt="硅油浴" 
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">
                  硅油浴
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  以硅油为传热介质的恒温加热装置。加热均匀、温度波动小。需配合温度控制器和温度探头使用，适用于需要精确控温的反应。
                </p>
              </div>

              {/* Overhead Stirrer */}
              <div className="flex flex-col">
                <div className="h-32 mb-4 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <img 
                    src="/figures/辅助设备/机械搅拌.png" 
                    alt="顶置机械搅拌" 
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-bold text-slate-800 mb-2">
                  顶置机械搅拌
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  通过电机驱动搅拌轴直接插入反应液进行搅拌。适用于非均相体系、高粘度液体或大体积反应，可提供较高的搅拌扭矩。
                </p>
              </div>
            </div>
          </div>

          {/* Vacuum and Concentration */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-slate-50 border-r border-slate-100 p-8 flex flex-col items-center top-0">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Orbit className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">
                减压与相分离系统
              </h3>
              <p className="text-sm text-slate-500 text-center">
                负责蒸发分离与产物浓缩脱水。
              </p>
            </div>
            <div className="md:w-2/3 p-8 flex flex-col gap-6">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Rotary Evaporator */}
                <div className="flex flex-col">
                  <div className="h-32 mb-4 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                    <img 
                      src="/figures/辅助设备/旋蒸.png" 
                      alt="旋转蒸发仪" 
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">
                    旋转蒸发仪 (Rotavap)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    利用减压降低溶剂沸点，通过旋转使溶液形成液膜以增大蒸发面积，实现溶剂快速蒸发与产物浓缩。
                  </p>
                </div>

                {/* Diaphragm Pump */}
                <div className="flex flex-col">
                  <div className="h-32 mb-4 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                    <img 
                      src="/figures/辅助设备/隔膜泵.png" 
                      alt="隔膜真空泵" 
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-bold text-slate-800 mb-2">
                    隔膜真空泵
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    采用耐腐蚀隔膜结构的无油真空泵。可提供中等级别的真空度（≤10 mbar），适用于旋转蒸发仪等设备的真空来源。
                  </p>
                </div>
              </div>

              {/* Cold Trap */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-4 items-center">
                <div className="w-24 h-24 shrink-0 bg-white border border-blue-200 rounded-lg overflow-hidden">
                  <img 
                    src="/figures/辅助设备/cold trap.png" 
                    alt="冷阱防线" 
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-blue-800 mb-1 text-sm">
                    冷阱防线 (Cold Trap)
                  </h4>
                  <p className="text-xs text-blue-800/80 leading-relaxed">
                    置于真空泵与反应体系之间的冷却装置。用于捕集蒸发的有机溶剂和水汽，防止污染泵油并保护真空泵。可使用液氮或干冰/乙醇浴冷却至-78°C。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced synthesis gas control */}
          <div className="bg-slate-900 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-lg">
            <div className="md:w-1/3 border-r border-slate-800 p-8 flex flex-col items-center top-0">
              <div className="w-16 h-16 bg-slate-800 text-purple-400 border border-slate-700 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 text-center">
                Schlenk 双排管
              </h3>
            </div>
            <div className="md:w-2/3 p-8 flex flex-col gap-6">
              <div className="bg-slate-800 rounded-xl border border-slate-700 h-32 flex flex-col items-center justify-center relative p-4 overflow-hidden">
                {/* Manifolds */}
                <div className="w-3/4 h-3 bg-blue-900/40 border border-blue-500/30 rounded-full mb-4 relative shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-[8px] text-blue-400 font-mono">VAC</span>
                </div>
                <div className="w-3/4 h-3 bg-green-900/40 border border-green-500/30 rounded-full relative shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <span className="absolute -left-6 top-1/2 -translate-y-1/2 text-[8px] text-green-400 font-mono">Ar2</span>
                  
                  {/* Stopcocks joining the lines */}
                  <div className="absolute left-1/4 -top-5 w-1 h-10 border-x border-slate-500/50 bg-slate-700/50 flex flex-col items-center justify-center">
                     <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-500 relative flex items-center justify-center cursor-pointer shadow-lg hover:rotate-90 transition-transform">
                        <ArrowRightLeft className="w-2 h-2 text-purple-400" />
                     </div>
                  </div>
                  
                  <div className="absolute left-1/2 -translate-x-1/2 -top-5 w-1 h-10 border-x border-slate-500/50 bg-slate-700/50 flex flex-col items-center justify-center">
                     <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-500 relative flex items-center justify-center cursor-pointer shadow-lg hover:rotate-90 transition-transform">
                        <ArrowRightLeft className="w-2 h-2 text-purple-400" />
                     </div>
                  </div>
                  
                  <div className="absolute right-1/4 -top-5 w-1 h-10 border-x border-slate-500/50 bg-slate-700/50 flex flex-col items-center justify-center">
                     <div className="w-4 h-4 rounded-full bg-slate-900 border border-slate-500 relative flex items-center justify-center cursor-pointer shadow-lg hover:rotate-90 transition-transform">
                        <ArrowRightLeft className="w-2 h-2 text-purple-400" />
                     </div>
                  </div>
                </div>
                {/* Hose dropping down to flask */}
                <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-8 h-8 border-2 border-slate-500/50 rounded-b-xl"></div>
              </div>
              <div className="text-slate-300 text-sm leading-relaxed">
                用于无水无氧反应操作的气体控制装置。由一根或多根玻璃管组成，一端连接真空泵，另一端连接惰性气体（氩气或氮气）源。
              </div>
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-400">
                <li>
                  通过双斜活塞（Double-oblique stopcocks）控制，可在真空与惰性气体之间快速切换，实现反应体系的反复抽真空-惰性气体置换。
                </li>
                <li>
                  可有效排除反应体系中的水分和氧气，适用于对空气敏感的有机金属试剂操作。
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
