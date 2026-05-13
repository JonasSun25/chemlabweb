import { Droplets, Filter, ArrowDown } from 'lucide-react';
import ExtractionSimulationApp from './simulation/ExtractionSimulationApp';

export default function Extraction() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">Extraction & Washing</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">液液萃取与洗涤阵列</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
             分液漏斗是化学合成工作台上出场率最高的玻璃器皿。玩转相分配系数，是初分离的基石。
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
           <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-slate-900 mb-3">萃取分离原理</h3>
                 <p className="text-sm text-slate-600 leading-relaxed mb-4">
                   利用物质在两种互不相溶的溶剂（通常是水相和有机相）中<strong>分配系数 (Partition Coefficient)</strong> 的差异。
                   产物和杂质会根据其极性、酸碱度，自发向溶解度更大的相转移，从而在物理上将混合物分离开来。
                 </p>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">核心应用</h3>
                 <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li><strong>粗品提取 (Extraction)：</strong> 将目标产物从水相反应体系（如淬灭后的水溶液）中"拔"出到有机相中。</li>
                    <li><strong>杂质洗涤 (Washing)：</strong> 用特定的水溶液（如酸、碱、饱和食盐水）洗反方向，除去有机相中的无机盐、催化剂、极性副产物等。</li>
                 </ul>
              </div>
              <div className="md:w-1/3 w-full bg-slate-50 p-6 rounded-2xl border border-slate-200 flex justify-center">
                 {/* Extraction Diagram */}
                 <div className="relative w-40 h-56 flex flex-col items-center">
                    {/* Funnel body */}
                    <div className="relative w-32 h-40">
                       <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
                          {/* Funnel outline */}
                          <path d="M 20 0 L 80 0 C 80 0, 95 10, 95 30 C 95 70, 60 90, 55 120 L 45 120 C 40 90, 5 70, 5 30 C 5 10, 20 0, 20 0 Z" 
                                fill="white" stroke="#94a3b8" strokeWidth="2" />
                          
                          {/* Top Layer (Organic, e.g. EA) */}
                          <path d="M 12 15 L 88 15 C 93 22, 94 30, 93 35 L 7 35 C 6 30, 7 22, 12 15 Z" fill="#fef3c7" className="opacity-80" />
                          
                          {/* Top Layer Label */}
                          <text x="50" y="28" fontSize="8" fontWeight="bold" fill="#b45309" textAnchor="middle">有机相 (EA/Ether)</text>
                          <text x="50" y="38" fontSize="6" fill="#b45309" textAnchor="middle" opacity="0.8">密度 &lt; 1</text>
                          
                          {/* Interface */}
                          <line x1="6" y1="45" x2="94" y2="45" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,1" />
                          
                          {/* Bottom Layer (Aqueous or heavy organic) */}
                          <path d="M 6 45 L 94 45 C 91 60, 60 85, 54 110 L 46 110 C 40 85, 9 60, 6 45 Z" fill="#e0f2fe" className="opacity-80" />
                          
                          {/* Bottom Layer Label */}
                          <text x="50" y="65" fontSize="8" fontWeight="bold" fill="#0369a1" textAnchor="middle">水相 (Aqueous)</text>
                          <text x="50" y="75" fontSize="6" fill="#0369a1" textAnchor="middle" opacity="0.8">或者是密度 &gt; 1 的 DCM</text>
                          
                          {/* Molecules migrating */}
                          <circle cx="40" cy="55" r="1.5" fill="#16a34a" />
                          <circle cx="60" cy="55" r="1.5" fill="#16a34a" />
                          <path d="M 40 52 L 40 40" stroke="#16a34a" strokeWidth="0.5" markerEnd="url(#arrow)" />
                          <path d="M 60 52 L 60 40" stroke="#16a34a" strokeWidth="0.5" markerEnd="url(#arrow)" />

                          {/* Arrow marker definition */}
                          <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="2" markerHeight="2" orient="auto-start-reverse">
                              <path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a" />
                            </marker>
                          </defs>
                       </svg>
                    </div>
                    {/* Stopcock */}
                    <div className="w-12 h-6 border-2 border-slate-300 rounded flex items-center justify-center bg-white z-10">
                       <div className="w-8 h-2 bg-slate-200 rounded-full border border-slate-400"></div>
                    </div>
                    {/* Stem */}
                    <div className="w-4 h-10 border-x-2 border-slate-300 bg-white"></div>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-3 mb-6">
              <div className="bg-amber-100 text-amber-600 p-3 rounded-xl"><Droplets className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-slate-900">分液战术 (Separatory Tactics)</h2>
           </div>
           
           <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                 <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 block">萃取 (Extraction)</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      目标是将产物从水溶液（如刚才的淬灭液）中捕获出来拉入有机相。
                    </p>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                       <li><strong className="text-slate-800">溶剂选择：</strong> 乙酸乙酯(EA)万金油；二氯甲烷(DCM)密度比水大(在下层)；乙醚(Ether)极好脱除但极易燃。</li>
                       <li><strong className="text-slate-800">盐析 (Salting Out) 逼迫法：</strong> 很多极性较大的分子会赖在水里不走。向水相中加入大量食盐直到饱和，水分子会忙着水合钠离子和氯离子，从而将有机分子"挤"入有机相。</li>
                    </ul>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 block">洗涤 (Washing)</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      此时产物已经在有机相中，目标是用水溶液把有机相里不想要的杂质洗掉。
                    </p>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                       <li><strong className="text-slate-800">酸碱特异性洗除：</strong> 碳酸氢钠水溶液能中和并洗掉有机相中残留的酸（如反应没用完的乙酸）；稀盐酸能把有机相里的游离胺杂质变成盐酸盐逼入水相。</li>
                       <li><strong className="text-slate-800">饱和食盐水收尾(Brine)：</strong> 所有的萃取和洗涤最后一步，一定是"Brine Wash"。利用高渗透压吸出有机相中弥散的水滴，为后续干燥减轻负担。</li>
                    </ul>
                 </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl flex gap-4">
                 <Filter className="w-6 h-6 text-amber-600 shrink-0" />
                 <div>
                    <h4 className="text-lg font-bold text-amber-900 mb-2">致命的乳化现象 (Emulsion)</h4>
                    <p className="text-sm text-amber-800/80 leading-relaxed">
                      剧烈摇晃后，水相和有机相不分层，形成浑浊的"牛奶状"乳浊液。千万不要倒掉！<br/>
                      <strong className="font-bold underline">破解之法：</strong>静置等待（喝杯咖啡）；向其中投入大量固体 NaCl；加入数滴消泡剂或几滴甲醇破坏表面张力；或者直接通过硅藻土(Celite)进行抽滤后再倒回漏斗。
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* --- Interactive Animation Section --- */}
        <div className="mb-12 border-b border-slate-200 pb-6 text-center mt-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Interactive Simulation</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">化学混合物萃取模拟器</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
             在这个虚拟实验室中，通过选择有机溶剂并依次加入 HCl 和 NaOH 进行酸碱可逆质子化，将混合的酸性、碱性和中性化合物完美分离。
          </p>
        </div>
        
        <ExtractionSimulationApp />

      </div>
    </div>
  );
}
