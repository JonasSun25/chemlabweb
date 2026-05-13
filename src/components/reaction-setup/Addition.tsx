import { Droplets, ShieldAlert, ThermometerSnowflake } from 'lucide-react';

export default function Addition() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2">Reagent Addition</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">试剂投加与滴加技术</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            反应的放热往往瞬间激增，过快加入试剂可能导致体系暴沸、副反应狂飙甚至引发安全事故。合理的物料分配至关重要。
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
           <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-slate-900 mb-3">物料控制原理</h3>
                 <p className="text-sm text-slate-600 leading-relaxed mb-4">
                   化学反应速率与反应物浓度成正比。通过<strong>控制加料速度</strong>，人为限制体系中高活性试剂的瞬间浓度，使得巨大的反应放热能够被冷却系统及时带走，维持恒温环境。
                   这不仅是防暴沸的安全屏障，更是抑制副反应、确保主产物选择性的核心手段。
                 </p>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">核心应用</h3>
                 <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li><strong>强放热反应：</strong> 如格式试剂合成、硝化反应、强碱拔氢等，必须维持反应液在安全的低温区间。</li>
                    <li><strong>高选择性反应：</strong> 防止生成的产物与过剩的原料继续发生连串二次反应（例如单取代而非多取代）。</li>
                 </ul>
              </div>
              <div className="md:w-1/3 w-full bg-slate-50 p-6 rounded-2xl border border-slate-200 flex py-8 justify-center items-center">
                 {/* Addition Setup Diagram */}
                 <div className="relative w-40 h-48 flex items-center justify-center">
                    {/* Dropping Funnel */}
                    <div className="absolute top-0 w-12 h-20 border-2 border-slate-400 bg-white rounded-t-lg rounded-b-3xl z-20 flex flex-col overflow-hidden shadow-sm">
                       <div className="w-full h-12 bg-cyan-100/80 border-b border-cyan-200 mt-2"></div>
                       {/* Drop */}
                       <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    </div>
                    {/* Equalizing Side Arm */}
                    <div className="absolute top-2 w-16 h-18 border-2 border-slate-300 border-l-0 rounded-r-xl z-10 right-10"></div>
                    {/* Stopcock */}
                    <div className="absolute top-20 w-16 h-2 flex items-center justify-center z-20">
                       <div className="w-12 h-2 bg-slate-300 rounded-full border border-slate-400 relative">
                          <div className="absolute -top-1 right-2 w-3 h-4 bg-amber-500 rounded-[2px] border border-amber-600"></div>
                       </div>
                    </div>
                    {/* Stem */}
                    <div className="absolute top-22 w-4 h-6 border-x-2 border-slate-400 bg-white z-20"></div>

                    {/* Reaction Flask */}
                    <div className="absolute bottom-0 w-20 h-20 border-2 border-slate-400 bg-white rounded-full flex items-end justify-center overflow-hidden pb-1 z-10">
                       <div className="w-full h-10 bg-indigo-100/50 relative overflow-hidden flex items-end">
                          <div className="w-full h-2 bg-indigo-200 absolute top-0"></div>
                          {/* Stir bar */}
                          <div className="w-8 h-2 bg-white rounded-full border border-slate-300 mb-2 mx-auto animate-pulse"></div>
                       </div>
                    </div>
                    
                    {/* Thermometer Probe */}
                    <div className="absolute top-10 right-4 w-2 h-32 bg-slate-300 rounded-full border border-slate-400 z-30 flex flex-col overflow-hidden transform rotate-12 items-center justify-end">
                       <div className="w-full h-8 bg-red-500 mb-1 rounded-full border-2 border-red-600"></div>
                    </div>
                    <ThermometerSnowflake className="absolute top-6 right-0 w-4 h-4 text-slate-500 z-30" />
                    
                    {/* Temp text */}
                    <div className="absolute bottom-4 -right-10 text-[8px] font-bold text-red-600 bg-red-50 px-1 rounded shadow-sm">
                       ΔT &lt; 5°C
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="bg-cyan-50 border-b border-cyan-100 p-6 flex items-center gap-4">
            <div className="bg-cyan-100 text-cyan-600 p-3 rounded-xl"><Droplets className="w-6 h-6" /></div>
            <h3 className="text-2xl font-bold text-cyan-900">核心加料工具与方案</h3>
          </div>
          
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 block">1. 恒压滴液漏斗 (Addition Funnels)</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  带有平衡气管路的设计，漏斗上下压强一致，液体无需打开上盖即可在完全封闭充盈惰性气体状态下进行滴加。控制旋塞可实现极缓慢滴速控制。
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 block">2. 气密注射器与聚四氟乙烯管路</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  对于体积较小（{'<'} 50mL）的敏感液体，如高浓度酸碱或者自燃物，隔着橡胶塞穿刺提取并滴加是最标准的防氧防潮范式。
                </p>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-3 block">3. 固体加样管 (Solid Addition Tube)</h4>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  一种能倾斜并连接到体系颈口的玻璃管配置。通过轻敲管壁可将无水无氧状态下储存的粉末试剂分批振入反应液，避免打开瓶塞放入空气。
                </p>
              </div>
            </div>

            <div className="mt-8 bg-amber-50 rounded-2xl p-6 border border-amber-200 flex gap-4">
               <div className="shrink-0 mt-1">
                 <ShieldAlert className="w-6 h-6 text-amber-600" />
               </div>
               <div>
                 <h4 className="font-bold text-amber-900 mb-2">滴加过程的安全与副反应抑制监控</h4>
                 <ul className="text-sm text-amber-800/80 space-y-2 list-disc pl-4">
                    <li><strong className="font-bold">逆向加料法则 (Reverse Addition)：</strong> 为保持极度低温或者抑制目标分子自身的聚合，可将原先待在瓶中的物料溶液缓慢滴加到处于冷却浴中的高浓度试剂体系中。</li>
                    <li><strong className="font-bold">内部测温监控 (Internal Probe)：</strong> 仅凭外部冷却浴往往掩盖了烧瓶内溶液真实温度飙升（由于玻璃阻热）。插入内部探针，时刻保持滴加速度满足反应温度被控制在阈值之下。如果探测到骤然升温，须立刻拉紧旋塞。</li>
                 </ul>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
