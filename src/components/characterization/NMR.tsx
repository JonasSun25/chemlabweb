import { Zap, Activity } from 'lucide-react';

export default function NMR() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Nuclear Magnetic Resonance</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">核磁共振波谱 (NMR)</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            现代有机结构鉴定中最核心、无可替代的绝对工具。它像X光一样穿透分子，揭示碳氢骨架的精确连接方式与立体构象。
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm mb-8">
           <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                 <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">核磁共振原理</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      处于强外磁场中的原子核（如 <sup>1</sup>H 或 <sup>13</sup>C）自旋能级发生塞曼分裂。当用特定频率的射频脉冲(RF pulse)照射时，核会吸收能量跃迁产生"共振"。
                      <strong>由于不同位置的原子被周围电子云遮蔽的程度（屏蔽效应）不同，它们发生共振所需的频率出现微小差异（化学位移）。</strong>
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">核心应用</h3>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                       <li><strong>结构确证：</strong> 解析新分子的绝对连结方式，确认目标产物结构。</li>
                       <li><strong>异构体鉴定：</strong> 区分区域异构体和立体异构体（如双键顺反异构、手性非对映异构）。</li>
                       <li><strong>定量分析 (qNMR)：</strong> 无需标准品，通过积分面积可以直接测算混合物的摩尔比例、纯度与反应产率。</li>
                    </ul>
                 </div>
                 <div className="md:w-1/3 w-full bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-center items-center">
                    {/* NMR Principle Diagram */}
                    <div className="relative w-full h-40 flex items-center justify-center">
                       {/* Magnet Field B0 */}
                       <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-24 bg-red-500 rounded-sm flex items-center justify-center text-white font-bold text-xs">N</div>
                       <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-24 bg-blue-500 rounded-sm flex items-center justify-center text-white font-bold text-xs">S</div>
                       
                       {/* B0 Arrows */}
                       <div className="absolute top-12 left-12 right-12 h-0.5 border-t-2 border-slate-300 border-dashed"></div>
                       <div className="absolute top-28 left-12 right-12 h-0.5 border-t-2 border-slate-300 border-dashed"></div>
                       <div className="absolute top-20 left-12 right-12 h-0.5 bg-slate-400 flex items-center">
                          <div className="absolute right-0 -mt-1 w-0 h-0 border-y-4 border-y-transparent border-l-6 border-l-slate-400"></div>
                       </div>
                       <div className="absolute top-16 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-500">B₀ (外磁场)</div>

                       {/* Protons spinning */}
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600">
                          <Activity className="w-8 h-8 opacity-20" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-indigo-100 border-2 border-indigo-500 flex items-center justify-center">
                             <span className="text-[8px] font-bold">+</span>
                          </div>
                          {/* Spin arrow */}
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-4 bg-indigo-500 rounded-full transform rotate-12">
                             <div className="absolute -top-1 -left-1 w-0 h-0 border-x-2 border-x-transparent border-b-3 border-b-indigo-500"></div>
                          </div>
                       </div>

                       {/* RF Pulse */}
                       <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                          <svg width="40" height="20" viewBox="0 0 40 20" className="stroke-amber-500 fill-none opacity-80">
                             <path d="M 0 10 Q 5 0, 10 10 T 20 10 T 30 10 T 40 10" strokeWidth="2" />
                          </svg>
                          <div className="text-[8px] font-bold text-amber-600 text-center uppercase tracking-tighter">RF Pulse</div>
                       </div>
                    </div>
                    {/* Simulated Spectra */}
                    <div className="mt-4 w-full h-12 border-b-2 border-slate-300 relative flex items-end px-2">
                       <svg width="100%" height="40" viewBox="0 0 100 40" className="stroke-indigo-600 fill-none mb-[1px]">
                          <path d="M 0 40 L 20 40 L 22 10 L 24 40 L 50 40 L 52 30 L 53 40 L 54 20 L 55 40 L 56 30 L 58 40 L 80 40 L 85 5 L 90 40 L 100 40" strokeWidth="1.5" strokeLinejoin="round" />
                       </svg>
                       <div className="absolute bottom-0 w-full flex justify-between text-[6px] text-slate-400 font-mono -mb-3 px-2">
                          <span>10 ppm</span>
                          <span>0</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
           <div className="bg-indigo-50 border-b border-indigo-100 p-6 flex items-center gap-4">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl"><Zap className="w-6 h-6" /></div>
              <h3 className="text-2xl font-bold text-indigo-900">核心维度的谱图解析</h3>
           </div>
           
           <div className="p-8 grid md:grid-cols-2 gap-8">
              <div>
                 <h4 className="text-xl font-bold text-slate-900 mb-4 block">1H-NMR (氢谱)</h4>
                 <p className="text-sm text-slate-600 leading-relaxed mb-4">
                   提供分子中氢原子的最详尽情报：它是属于甲基、双键还是芳环？它旁边连着几个其他氢原子？
                 </p>
                 <ul className="text-sm text-slate-600 space-y-3 list-disc pl-5">
                    <li><strong className="text-slate-800">化学位移 (Chemical Shift, δ)：</strong> 横坐标位置。揭示屏蔽效应：连着吸电子基（如氧、卤素）或处于芳环上的氢，δ值更大（更靠左/低场）。</li>
                    <li><strong className="text-slate-800">积分面积 (Integration)：</strong> 峰的相对面积精确对应该化学环境下氢原子的绝对数量。这是判断基团比例的神器。</li>
                    <li><strong className="text-slate-800">自旋裂分与耦合 (Spin-Spin Splitting & J)：</strong> 经典的 n+1 规则。峰被裂分成几瓣，直接告诉你它邻近碳上有几个氢。耦合常数 J(Hz) 更能用来判断双键的顺反构型 (顺式J小，反式J大) 或环的刚性构象。</li>
                 </ul>
              </div>

              <div>
                 <h4 className="text-xl font-bold text-slate-900 mb-4 block">13C-NMR (碳谱)</h4>
                 <p className="text-sm text-slate-600 leading-relaxed mb-4">
                   直接观察分子的碳骨架。虽然灵敏度比氢谱低得多，测试时间长，但它不存在氢谱复杂的裂分重叠，每一根线代表一种独特环境的碳。
                 </p>
                 <ul className="text-sm text-slate-600 space-y-3 list-disc pl-5">
                    <li><strong className="text-slate-800">碳架透视：</strong> 化学位移范围极宽 (0-220+ ppm)。羰基碳高达 170-220，芳香碳在 110-150，饱和脂肪碳在 0-50。高度一目了然。</li>
                    <li><strong className="text-slate-800">DEPT-135 谱：</strong> 碳谱的最佳伴侣。它能把碳分类：让 CH 和 CH3 的峰朝上，CH2 的峰朝下，而没有连氢的季碳(Quaternary Carbon)则完全不出峰而隐形。</li>
                 </ul>
              </div>

              <div className="md:col-span-2 bg-slate-900 rounded-2xl p-6 text-slate-300">
                 <h4 className="text-lg font-bold text-white mb-2">高阶 2D-NMR (二维核磁)</h4>
                 <p className="text-sm text-slate-400 leading-relaxed">
                   当平面一维波谱由于信号极端重叠而彻底失效时，必须祭出二维核磁：
                   <strong className="text-indigo-400 block mt-2">COSY (同核相关)：</strong>告诉你哪两个氢原子在相邻的碳上牵着手。<br/>
                   <strong className="text-indigo-400">NOESY/ROESY (空间相关)：</strong>无视化学键连接，只要横跨空间距离小于 5 个埃，就能产生交叉峰。绝对立体构型测定的终极核武。<br/>
                   <strong className="text-indigo-400">HSQC/HMBC (异核相关)：</strong>将碳谱和氢谱关联起来，尤其 HMBC 可以看到隔着 2-3 个化学键的碳氢关联，用于拼接断裂的大型分子骨架。
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
