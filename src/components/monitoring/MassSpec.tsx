import { Combine, Activity, Zap, Filter, Search, AlertTriangle } from 'lucide-react';

const LC_MS_SYSTEM_IMG = '/figures/MS/液质联用系统.webp';
const WHY_LC_MS_IMG = '/figures/MS/为什么将 LC 与 MS 联用？.webp';
const MS_PRINCIPLE_IMG = '/figures/MS/质谱 (MS) 原理.webp';
const MS_SPECTRA_IMG = '/figures/MS/质谱图.webp';
const LCMS_ADVANTAGE_IMG = '/figures/MS/LCMS 的优势.webp';

export default function MassSpec() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">LC-MS / GC-MS</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">液质谱联用监控反应进程</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            液质联用系统是一种融合液相色谱的分离能力与质谱仪作为检测器的直接质量测量能力的分析技术。
          </p>
        </div>

        {/* LC-MS 工作原理 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl"><Combine className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-slate-900">液质联用系统 (LC/MS)</h2>
          </div>

          <div className="mb-6">
            <img src={LC_MS_SYSTEM_IMG} alt="液质联用系统工作原理" className="w-full rounded-xl border border-slate-200" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>
                液相色谱 (LC) 原理
              </h3>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <p className="text-sm text-slate-600 leading-relaxed">
                  液相色谱又称高效液相色谱 (HPLC)，用于分离液相中所包含的化合物混合物。
                </p>
                <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                  <li><strong>反相液相色谱：</strong> 色谱柱（固定相）采用非极性填料，溶剂（流动相）为极性溶剂</li>
                  <li><strong>高压：</strong> 在约 200–1200 bar 高压下使溶液中的分析物分子通过色谱柱</li>
                  <li><strong>分离机制：</strong> 疏水性化合物在色谱柱上保留时间更长，按保留时间分离</li>
                </ul>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-6 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">2</span>
                为什么将 LC 与 MS 联用？
              </h3>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                <img src={WHY_LC_MS_IMG} alt="为什么将 LC 与 MS 联用" className="w-full rounded-lg mb-4" />
                <p className="text-sm text-slate-600 leading-relaxed">
                  可以将各种检测器集成到液相色谱系统中。最常见的检测器基于吸收、荧光、折射率和质谱。
                </p>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-3">
                  <p className="text-sm text-amber-700">
                    <strong>质谱的优势：</strong> 当分析物具有显著的紫外 (UV) 吸收时，UV 检测器通常用于定量分析。但质谱可提供独特、有价值的正交信息，可以鉴定分析物，同时可重现地定量那些由于缺乏发色团或色谱分离不完全而无法进行紫外检测的化合物。
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-slate-600 mb-2">如右图所示，通过紫外检测器仅检测到两个峰，但样品实际上包含三种化合物。质谱仪能够检测到在紫外检测器中共洗脱的单独化合物。</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">3</span>
                质谱 (MS) 原理
              </h3>
              <img src={MS_PRINCIPLE_IMG} alt="质谱原理" className="w-full rounded-xl mb-4" />
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">电离源</h4>
                  <p className="text-sm text-slate-600">
                    化合物经液相色谱分离后，在质谱仪中遇到的第一个组件。电喷雾电离 (ESI) 是一种常见的电离技术。
                  </p>
                  <ul className="text-sm text-slate-600 space-y-1 mt-2">
                    <li>• 在强静电场和加热干燥气的存在下，液相色谱洗脱物在大气压下被喷入（雾化）到腔室中</li>
                    <li>• 热量导致溶剂从分析物分子中进一步剥离</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">质量分析器（四极杆）</h4>
                  <p className="text-sm text-slate-600">
                    通过进样口毛细管进入质谱仪后，一系列电极（透镜）引导带电的分子离开离子源到达四极杆质量分析器。
                  </p>
                  <ul className="text-sm text-slate-600 space-y-1 mt-2">
                    <li>• 四极杆由施加直流电压和射频的四根杆组成</li>
                    <li>• 这些力的不同组合确保在给定时间内仅特定质量（质荷比 m/z）的碎片沿着四极杆的电场向检测器移动</li>
                    <li>• 此功能可显著降低噪音并提高灵敏度</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">检测器</h4>
                  <p className="text-sm text-slate-600">
                    为生成质谱图，检测器记录各给定时间内到达的离子的信号强度。这种质谱图可用于鉴定，就像指纹一样。
                  </p>
                </div>
              </div>

              {/* 质谱图展示 */}
              <div className="mt-6">
                <img src={MS_SPECTRA_IMG} alt="质谱图示例" className="w-full rounded-xl border border-slate-200" />
              </div>
            </div>
          </div>
        </div>

        {/* LC-MS 优势 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 text-green-600 p-3 rounded-xl"><Zap className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-slate-900">LC/MS 的优势</h2>
          </div>

          <div className="mb-6">
            <img src={LCMS_ADVANTAGE_IMG} alt="LCMS 优势" className="w-full rounded-xl border border-slate-200" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-3">分析选择性提升</h3>
              <p className="text-sm text-slate-600 mb-3">
                LC/MS 通过引入质谱数据，进一步提升了分析的选择性。分析物通过高效液相色谱 (HPLC) 或超高效液相色谱 (UHPLC) 分离，从而生成色谱图。
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• 每种分析物根据各自的保留时间分离得到单独的峰</li>
                <li>• 对于色谱图中的每个时间点，还将形成一幅质谱图</li>
                <li>• 可以对质谱图进行解析以鉴定在该时间点洗脱的组分的 m/z</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100">
              <h3 className="font-bold text-green-800 mb-3">无需参比标样</h3>
              <p className="text-sm text-slate-600 mb-3">
                借助质量信息，无需参比标样即可鉴定分析物，并且可以按质量数分离共洗脱峰。
              </p>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• 质谱检测器对大多数化合物的灵敏度更高且特异性强得多</li>
                <li>• 可以分析缺乏合适的发色团的化合物</li>
                <li>• 能够鉴定未分离（共洗脱）色谱峰中的组分</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100">
              <h3 className="font-bold text-purple-800 mb-3">多检测器结合</h3>
              <p className="text-sm text-slate-600">
                可以将质谱数据与利用其他液相色谱检测器得到的数据结合起来，可靠地鉴定、确认和定量化合物。
              </p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-100">
              <h3 className="font-bold text-amber-800 mb-3">快速分析</h3>
              <p className="text-sm text-slate-600">
                现代 UPLC-MS 可以将液相走带分离时间缩短至 2-3 分钟/针，具备极强的时效反应跟踪价值。
              </p>
            </div>
          </div>
        </div>

        {/* 应用场景 */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-xl"><Search className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-slate-900">核心应用</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">分子量确证</h4>
              <p className="text-sm text-slate-600">
                在复杂反应液中直接寻找目标分子 [M+H]⁺ 的精确质量数，断定产物是否生成。
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">副反应诊断</h4>
              <p className="text-sm text-slate-600">
                发现非预期质量数的色谱峰，通过碎片离子推断副产物结构。
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">无紫外响应物监控</h4>
              <p className="text-sm text-slate-600">
                弥补 UV 检测器无法检测无共轭分子的盲区。
              </p>
            </div>
          </div>
        </div>

        {/* GC-MS */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-xl"><Filter className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-slate-900">气质联用 (GC-MS)</h2>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              适用于易挥发、分子量相对较小且热稳定的底物。主要应用在药物前体的小分子砌块早期合成反应跟踪。
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="font-semibold text-slate-800 mb-2">火焰离子化/电子轰击 (EI)</h4>
                <p className="text-sm text-slate-600">
                  EI 是一种"硬"电离，它会极暴烈地撕碎分子骨架。如果你要看的是 [M]⁺，往往峰图很弱。
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-2">指纹碎片</h4>
                <p className="text-sm text-slate-600">
                  但碎片的裂解模式具有"指纹"独特性，可以高度准确地反推或者查表断定未知副产物结构。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 注意事项 */}
        <div className="bg-red-50 border border-red-200 rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-100 text-red-600 p-3 rounded-xl"><AlertTriangle className="w-6 h-6" /></div>
            <h2 className="text-xl font-bold text-red-800">注意事项</h2>
          </div>

          <ul className="text-sm text-red-700 space-y-2">
            <li>• 质谱仪需要高真空环境操作，样品需经过适当前处理</li>
            <li>• 注意避免污染离子源和四极杆</li>
            <li>• 对于非极性或低极性化合物，可能需要使用 APCI（大气压化学电离）而非 ESI</li>
            <li>• 定量分析前需要进行校准和内标选择</li>
          </ul>
        </div>
      </div>
    </div>
  );
}