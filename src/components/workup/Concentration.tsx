import { Wind, PackagePlus, Orbit, ArrowUp } from 'lucide-react';

export default function Concentration() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">Drying & Concentration</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">干燥脱水与旋蒸浓缩</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            将有机相剥离最后一丝水分，并在真空的撕扯下剥除所有挥发性溶剂，最终见证粗产物的真容。
          </p>
        </div>

        {/* Rotavap Principle & Application */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
           <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-slate-900 mb-3">旋蒸浓缩原理</h3>
                 <p className="text-sm text-slate-600 leading-relaxed mb-4">
                   利用<strong>真空降压减小沸点</strong>与<strong>旋转形成液膜</strong>双重原理。通过真空泵降低系统压力，使溶剂的沸点大幅下降。
                   溶液由于烧瓶的旋转在内壁形成大面积薄膜，在水浴锅温和加热下实现溶剂的高效表面蒸发、冷凝与回收收集。
                 </p>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">核心应用</h3>
                 <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li><strong>粗品浓缩：</strong> 从数百毫升的萃取溶剂中快速得到几克固体或粘稠状的有机粗品结晶。</li>
                    <li><strong>溶剂回收：</strong> 收集提纯出的大量过柱洗脱剂以符合环保低消耗原则。</li>
                 </ul>
              </div>
              <div className="md:w-1/3 w-full bg-slate-50 p-6 rounded-2xl border border-slate-200 flex justify-center items-center">
                 {/* Rotavap Diagram */}
                 <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Water bath */}
                    <div className="absolute left-0 bottom-4 w-20 h-10 bg-blue-100 border-2 border-blue-200 rounded-b-2xl border-t-0 shadow-inner flex overflow-hidden">
                       <div className="w-full h-2 bg-blue-200/50 absolute top-0"></div>
                       <div className="absolute right-2 bottom-2 text-[8px] font-bold text-blue-500">水浴 (Water Bath)</div>
                    </div>
                    {/* Flask in bath */}
                    <div className="absolute left-6 bottom-6 w-10 h-10 border-2 border-slate-400 bg-amber-50/50 rounded-full transform -rotate-45 flex items-center justify-center shadow-md">
                       <div className="w-8 h-8 rounded-full border-b border-amber-500/30"></div>
                    </div>
                    {/* Airflow/Vacuum */}
                    <div className="absolute top-1/2 left-12 -translate-y-1/2 flex flex-col items-center rotate-45 transform -translate-x-4">
                       <div className="w-2 h-16 bg-slate-300"></div>
                       <ArrowUp className="w-4 h-4 text-slate-400 -mt-2 rotate-180" />
                    </div>
                    {/* Condenser */}
                    <div className="absolute right-0 top-0 w-16 h-28 border-2 border-blue-200 bg-blue-50/50 rounded-full overflow-hidden flex flex-col pt-2 shadow-sm relative">
                       <div className="w-full text-center text-[8px] font-bold text-blue-400 mt-2">冷凝管</div>
                       <svg viewBox="0 0 10 40" className="w-full h-[60%] stroke-blue-300 fill-none mt-1">
                         <path d="M 5 0 Q 0 5 5 10 T 5 20 T 5 30 T 5 40" strokeWidth="1" />
                       </svg>
                       {/* Drops falling */}
                       <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col gap-1">
                          <div className="w-1 h-1.5 bg-blue-400 rounded-full"></div>
                          <div className="w-1.5 h-2 bg-blue-500 rounded-full drop-shadow-sm"></div>
                       </div>
                    </div>
                    {/* Receiving Flask */}
                    <div className="absolute right-4 bottom-0 w-10 h-10 border-2 border-slate-300 bg-indigo-50/50 rounded-full shadow-inner flex items-end overflow-hidden pb-1 justify-center">
                       <div className="w-[80%] h-[30%] bg-blue-200/50 rounded-b-full"></div>
                    </div>
                    {/* Connectors */}
                    <div className="absolute right-6 top-24 w-12 h-2 bg-slate-300 transform -rotate-45 origin-left"></div>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Drying */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl"><PackagePlus className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-slate-900">物理干燥 (Drying)</h2>
            </div>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              饱含产物的有机溶液从分液漏斗底流出后，仍然含有微量悬浮的水滴，直接蒸发会导致水残留在粗品中，毁掉后续的柱层析或直接导致产物水解变质。
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm">
                <strong className="block font-bold text-slate-800 mb-1">无水硫酸镁 (MgSO4)：</strong>
                <p className="text-slate-600">粉末状。吸水速度极快，吸水容量高。它像雪花一样，"当你在瓶底摇晃硫酸镁，只要看到有松散不结块的粉末飞舞，就说明水已经被吸干了。"</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm">
                <strong className="block font-bold text-slate-800 mb-1">无水硫酸钠 (Na2SO4)：</strong>
                <p className="text-slate-600">颗粒状。吸水慢，相对温和无明显放热，常用于极性很大的产物（因为硫酸镁强极性表面可能会吸附你的产物导致减产）。</p>
              </div>
            </div>
          </div>

          {/* Concentration */}
          <div className="bg-slate-900 rounded-3xl p-8 shadow-sm text-slate-300">
            <div className="flex items-center gap-3 mb-6">
               <div className="bg-slate-800/80 border border-slate-700 text-indigo-400 p-3 rounded-xl"><Wind className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-white">旋转蒸发浓缩 (Rotavap)</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              干燥后的溶液抽滤去除了固体干燥剂，这大半瓶澄清的液体将被送上旋蒸仪，完成最终的收割。
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-sm text-slate-400">
                <strong className="block font-bold text-white mb-1">防倒吸最高指令：</strong>
                装上烧瓶并用夹子卡死。先打开真空泵开始抽气，一旦烧瓶内形成负压被吸住，立刻开启马达旋转，最后再将其降入温水浴中（水温不可过高）。
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-sm text-slate-400">
                <strong className="block font-bold text-white mb-1">破真空下机指令：</strong>
                先将烧瓶抬离水浴，然后停掉旋转马达。一只手托住烧瓶底部防掉落，另一只手打开通气阀放气，等压力表归零后再关停真空泵。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
