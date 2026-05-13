import { Layers, Activity, Wind } from "lucide-react";

export default function AdvancedTechniques() {
  return (
    <section
      id="advanced"
      className="py-16 bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Advanced Technologies
            </h2>
            <h2 className="text-3xl font-bold text-slate-900">
              高级结晶前沿技术
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-sm md:text-right">
            针对极端纯度要求和环保标准的复杂结晶工艺体系与质量溯源监测。
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-100">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              分步重结晶
              <span className="block text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-wider">
                Fractional Crystallization
              </span>
            </h3>
            <div className="space-y-4 flex-1">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 h-[104px]">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  核心原理
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  利用混合物中各极其相似组分间溶解度的微小差异，通过反复多次的溶解、冷却与部分析出循环，实现多级放大分离提取。
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 h-[104px]">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  适用场景
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  专用于常规单次结晶失效的极端混合体系。如稀土金属元素的分别提取、光学异构体化学拆分，以及高精尖同位素的富集工程。
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 border border-indigo-100">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              TGA 热重分析
              <span className="block text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-wider">
                Thermogravimetric Analysis
              </span>
            </h3>
            <div className="space-y-4 flex-1">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 h-[104px]">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                  质量动态监测
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  在严格控制的程序升温环境炉中，实时记录结晶样品的质量衰减曲线，利用微积分物理模型精确解析晶体内挥发物的溢出行为规律。
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 h-[104px]">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                  结晶度验证
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  精准测定晶体成品内封闭的微量溶剂残留量、深层晶格结合水，并推算化合物热降解临界温度限制，全面提供晶型结构的热力学稳定报告。
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-100">
              <Wind className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              超临界流体结晶
              <span className="block text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-wider">
                Supercritical Fluids (SCF)
              </span>
            </h3>
            <div className="space-y-4 flex-1">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 h-[104px]">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  绿色流体优势
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  以超临界CO2替代高污染游离有机溶剂，兼具气态强穿透力与液态优良溶解平衡。系统泄压后气化剥离，令晶产物实现工业极渴求的“零溶剂残留”。
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 h-[104px]">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  实务限制挑战
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  超高压态反应釜固定资产投资巨大、动密封泄露防范难度顶配；同时对复杂大位阻强极性API分子的溶解度存在内禀缺陷，常需引入夹带剂调控增加变数。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
