import { Droplet, Info, Scale, ShieldAlert } from "lucide-react";

const solvents = [
  {
    name: "水 (Water)",
    polarity: "极性强",
    bp: "100°C",
    usage:
      "盐类、强极性有机物如短链醇、糖类、酸。廉价且安全，但部分物质在水中溶解度随温度变化不大。",
  },
  {
    name: "乙醇 (Ethanol)",
    polarity: "中等极性",
    bp: "78°C",
    usage:
      "应用最广的溶剂之一。可以溶解许多中等极性到强极性的有机化合物。毒性低，易于蒸除。",
  },
  {
    name: "乙酸乙酯 (Ethyl Acetate)",
    polarity: "中等极性",
    bp: "77°C",
    usage: "适用于中等极性的化合物。常与己烷组成混合溶剂系统，调节溶解力。",
  },
  {
    name: "丙酮 (Acetone)",
    polarity: "中等极性",
    bp: "56°C",
    usage:
      "溶解力强，沸点低易挥发。注意不要用于含有伯胺或仲胺的化合物（可能发生反应）。",
  },
  {
    name: "二氯甲烷 (DCM)",
    polarity: "中低极性",
    bp: "40°C",
    usage:
      "溶解大部分有机物，但沸点极低，通常只作为混合溶剂（如DCM/己烷）中的良溶剂部分。",
  },
  {
    name: "正己烷 / 石油醚",
    polarity: "非极性",
    bp: "69°C / 60-90°C",
    usage:
      '用于溶解非极性化合物如长链烷烃、油脂。常作为混合溶剂体系中的"不良溶剂"来逼出晶体。',
  },
];

export default function Solvents() {
  return (
    <section
      id="solvents"
      className="py-16 bg-white border-t border-slate-200 text-slate-800"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Solvent Strategy
            </h2>
            <h2 className="text-3xl font-bold text-slate-900">
              溶剂选择与策略
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-md md:text-right">
            "重结晶的成败，70%取决于溶剂的选择"。理想溶剂需满足陡峭的溶解度温度曲线。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          {/* Principles */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              核心筛选准则
            </h3>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                1
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  溶解度温差极大化
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  目标物在沸点时极易溶解，在室温或冰浴时极难溶解；或者杂质在冷热溶剂中都极易溶（留于母液），或都极难溶（热过滤除去）。
                </p>
              </div>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                2
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  化学惰性与沸点区间
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  溶剂绝对不能与目标物发生反应。沸点不宜太低（防止热过滤时溶剂挥干析出晶体），也不宜过高（难以干燥去除，最高不超过目标物熔点以免熔化成油）。
                </p>
              </div>
            </div>
            <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center shrink-0 font-bold">
                3
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-900 mb-1">
                  混合溶剂法理论
                </h4>
                <p className="text-xs text-blue-800/80 leading-relaxed">
                  当找不到单一理想溶剂时，可采用"良溶剂+不良溶剂"系统。先用少量热良溶剂完全溶解目标物，再滴加沸点相近的热不良溶剂至微浊，冷却即可析出完美晶相。
                </p>
              </div>
            </div>
          </div>

          {/* Common Solvents Table */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 border-b border-slate-200 p-4 px-6">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-blue-500" />
                  常见结晶溶剂特征库
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-500 border-b border-slate-200">
                      <th className="p-4 px-6 font-semibold">溶剂名称</th>
                      <th className="p-4 font-semibold">极性归类</th>
                      <th className="p-4 font-semibold text-right">沸点</th>
                      <th className="p-4 px-6 font-semibold">特性与适用性</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-600 divide-y divide-slate-100">
                    {solvents.map((s, i) => (
                      <tr
                        key={i}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="p-4 px-6 font-medium text-slate-800 whitespace-nowrap">
                          {s.name}
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                            {s.polarity}
                          </span>
                        </td>
                        <td className="p-4 text-right font-mono text-xs">
                          {s.bp}
                        </td>
                        <td className="p-4 px-6 text-xs leading-relaxed max-w-xs">
                          {s.usage}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
