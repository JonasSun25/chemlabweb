import { FlaskConical, Pill } from "lucide-react";

const applications = [
  {
    icon: FlaskConical,
    title: "化合物纯化 (Compound Purification)",
    bgStyle: "bg-emerald-50 border-emerald-100",
    titleColor: "text-emerald-900",
    iconColor: "text-emerald-600 bg-white",
    desc: "化学合成或提取后的核心分离环节。利用重结晶精准剖分目标分子与结构相似的伴生副产物，是全球科研机构与工业量产中最依赖的高标准、低损耗除杂提纯手段。",
    benchmark: "99.5%+",
    benchmarkLabel: "分析及反应级纯化下限",
    imgUrl:
      "https://picsum.photos/seed/chemistry1/800/600",
  },
  {
    icon: Pill,
    title: "API药物晶型研究 (Polymorphism)",
    bgStyle: "bg-blue-50 border-blue-100",
    titleColor: "text-blue-900",
    iconColor: "text-blue-600 bg-white",
    desc: "深入探索新药研发中的晶体排列奥秘。同分子的不同晶型会决定其在人体的溶解度及生物利用率，控制重结晶条件获得特定优势晶型，是突破药效瓶颈与构建原研专利池的核心。",
    benchmark: "Single Phase",
    benchmarkLabel: "单一热力学优势晶相",
    imgUrl:
      "https://picsum.photos/seed/chemistry2/800/600",
  },
];

export default function Applications() {
  return (
    <section
      id="applications"
      className="py-16 bg-white border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
            Industry Adoption
          </h2>
          <h2 className="text-3xl font-bold text-slate-900">核心应用领域</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {applications.map((app, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border border-slate-100 p-8 rounded-3xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-48 mb-8 overflow-hidden rounded-xl bg-slate-100 relative group">
                <div className="absolute inset-0 bg-blue-900/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img
                  src={app.imgUrl}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  alt={app.title}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-sm ${app.iconColor}`}
                    >
                      <app.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {app.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed min-h-[4.5rem]">
                    {app.desc}
                  </p>
                </div>

                <div
                  className={`w-full lg:w-48 shrink-0 p-5 rounded-2xl border ${app.bgStyle} flex flex-col justify-center`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">
                      Purity Target
                    </span>
                  </div>
                  <div className={`text-2xl font-bold ${app.titleColor}`}>
                    {app.benchmark}
                  </div>
                  <p className="text-[11px] mt-1 opacity-80 font-medium">
                    {app.benchmarkLabel}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
