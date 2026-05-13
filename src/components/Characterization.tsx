import { Thermometer, Microscope, Activity, ScanSearch } from "lucide-react";

export default function Characterization() {
  return (
    <section
      id="characterization"
      className="py-16 bg-slate-900 border-t border-slate-800 relative text-slate-200 overflow-hidden"
    >
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-blue-500 rounded-full blur-[100px] mix-blend-screen translate-x-1/2 -translate-y-1/2 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-indigo-500 rounded-full blur-[100px] mix-blend-screen -translate-x-1/2 translate-y-1/2 opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-12 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
              Quality & Characterization
            </h2>
            <h2 className="text-3xl font-bold text-white">
              质量检定与晶型探究
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md md:text-right">
            重结晶后，使用精密的热力学及光谱学手段验证物质纯度与内部三维晶格结构。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 熔点测定 */}
          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl backdrop-blur-sm hover:bg-slate-800/60 transition-colors group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                <Thermometer className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                熔点测定 (Melting Point)
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-1">
                    物理常数与纯度指示标
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    纯粹的结晶化合物通常具有极敏锐的熔点（熔距极窄，通常在0.5~1℃内）。如果重结晶产物中仍裹挟微量杂质，会破坏原本完美的晶格结构，导致
                    <strong className="text-orange-300 font-medium">
                      熔点下降且熔距变宽
                    </strong>
                    。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ScanSearch className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-1">
                    微量毛细管法的高效验证
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    这是有机合成实验室中最快速、最经典的纯化判据。一次成功的重结晶后，产物的实测熔点将大幅趋近于文献理论值，同时熔融过程从"萎缩"到"全清"的温度跨度将收敛至极致。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 药物晶型鉴定 */}
          <div className="bg-slate-800/40 border border-slate-700/50 p-8 rounded-3xl backdrop-blur-sm hover:bg-slate-800/60 transition-colors group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Microscope className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                药物晶型鉴定表征
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-1">
                    多晶型现象 (Polymorphism)
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    同一化学分子能在空间中排列成不同的晶格结构。不同晶型（如无定型态与晶态，或α型与β型）的表观溶解度、生物利用度和热力学稳定性存在天壤之别，直接决定了
                    <strong className="text-blue-300 font-medium">
                      原料药的最终疗效
                    </strong>
                    。
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ScanSearch className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-300 mb-1">
                    粉末X射线衍射 (PXRD) 与表征引擎
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    通过PXRD捕捉晶面的布拉格衍射峰，并结合DSC（差示扫描量热法）分析相变吸放热能量，精确勾勒出药物的微观堆叠指纹图谱，是药企进行原研专利保护和规避"晶型转变惨定"的最核心工具。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
