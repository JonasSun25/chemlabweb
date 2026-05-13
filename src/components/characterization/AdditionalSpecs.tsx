import { Locate, Microscope, Eye, Activity } from 'lucide-react';
import OldCharacterization from './OldCharacterization';

export default function AdditionalSpecs() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Multidimensional Specs</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">多维光谱与物理表征</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            从质量确证到光学偏振特性，核磁并非万能，多手段交叉验证才是构建无懈可击分子证据链的唯一方法。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* MS */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl"><Locate className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-slate-900">质谱 (MS / HRMS)</h2>
            </div>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              给出分子的极度精确质量乃至元素组成。在核磁确认骨架连接方式的同时，从宏观总量上进行死锁。
            </p>
            <div className="space-y-4 text-sm text-slate-600 flex-1">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <strong className="text-slate-800 font-bold block mb-1">HRMS (高分辨质谱)：</strong>
                 精度达到小数点后四位（如 301.1245）。自然界同位素组合具有唯一性，只要实测值与理论公式计算值误差在 5 ppm 以内，即可确证分子式的排他正确性。所有顶级期刊的敲门砖。
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <strong className="text-slate-800 font-bold block mb-1">电离模式差异 (ESI vs EI/APCI)：</strong>
                 <strong className="text-emerald-700">ESI (电喷雾电离)</strong> 是软电离，碎片极少，用来找分子离子峰 [M+H]+ 最棒；<strong className="text-emerald-700">EI (电子轰击)</strong> 极度暴力硬电离，没有通常的分子峰，全是裂片，用于对比标准物质数据库。
              </div>
            </div>
          </div>

          <div className="space-y-8">
             {/* IR */}
             <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-rose-100 text-rose-600 p-3 rounded-xl"><Microscope className="w-6 h-6" /></div>
                  <h2 className="text-xl font-bold text-slate-900">红外光谱 (IR)</h2>
                </div>
                
                <h3 className="text-[13px] font-bold text-slate-900 mt-2 mb-1">吸收原理</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  分子特定的化学键可以像弹簧一样发生振动。当红外光的频率与某化学键的固有振动频率一致时，会产生共振吸收。<strong>伸缩振动(Stretching)在较高波数，弯曲振动(Bending)在较低波数（指纹区）。</strong>
                </p>

                {/* IR Principle Diagram */}
                <div className="w-full bg-slate-50 border border-slate-200 rounded-xl h-24 mb-4 flex items-center justify-around px-4">
                   <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center relative w-16 h-8">
                         <div className="w-4 h-4 rounded-full bg-slate-700 z-10"></div>
                         <div className="w-6 h-1 bg-slate-400 absolute"></div>
                         <div className="w-3 h-3 rounded-full bg-rose-500 z-10 translate-x-3"></div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold tracking-wider mt-1">C=O 伸缩</span>
                      <span className="text-[10px] text-rose-600 font-mono">1700 cm⁻¹</span>
                   </div>
                   <div className="w-px h-12 bg-slate-200"></div>
                   <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center relative w-16 h-8 gap-4">
                         <div className="w-5 h-5 rounded-full bg-slate-700 z-10"></div>
                         <div className="w-3 h-3 rounded-full bg-blue-500 z-10 opacity-80 blur-[0.5px]"></div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold tracking-wider mt-1">O-H 伸缩</span>
                      <span className="text-[10px] text-blue-600 font-mono">3300 cm⁻¹</span>
                   </div>
                </div>

                <div className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                  <li><strong>官能团确诊：</strong> 极其强烈的 1700 cm⁻¹ 尖峰就是羰基 (C=O) 的指纹；3300 cm⁻¹ 宽钝的大包则是醇羟基或水；2200 cm⁻¹ 则断定氰基。</li>
                  <li><strong>ATR制样：</strong> 现代衰减全反射技术让粉末直接压在钻石压头上就能出谱，抛弃了古代繁琐的KBr压片法。</li>
                </div>
             </div>

             {/* Polarimetry */}
             <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-cyan-100 text-cyan-600 p-3 rounded-xl"><Eye className="w-6 h-6" /></div>
                  <h2 className="text-xl font-bold text-slate-900">旋光度 (Polarimetry)</h2>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  应用原理：不对称的单构型手性分子能使平面偏振光的偏振面发生旋转。
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  对于含有手性中心（不对称碳），存在对映异构体的单一构型物质，除了用特定晶体衍射能看绝对构型外，测定比旋光度 [a]D 依然是必须提供的物理常数。
                </p>
             </div>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-16">
           <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">综合图谱解构实战课</h2>
           <OldCharacterization />
        </div>
      </div>
    </div>
  );
}
