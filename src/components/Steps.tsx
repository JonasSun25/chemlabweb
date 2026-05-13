import { Search, Flame, Filter, Snowflake, GitMerge, Wind } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "选择溶剂",
    icon: Search,
    desc: "加热时能溶解大量溶质，冷至室温时仅能少量溶解，且不发生化学反应。",
    note: "最佳容差配对设计",
  },
  {
    id: "02",
    title: "加热溶解",
    icon: Flame,
    desc: "加入适宜溶剂，在水浴或砂浴加热至沸腾，配置热饱和溶液。",
    note: "能量活化边界",
  },
  {
    id: "03",
    title: "热过滤",
    icon: Filter,
    desc: "加入活性炭脱色，使用保温漏斗趁热过滤，截留不溶性异物。",
    note: "第一级粗筛阶段",
  },
  {
    id: "04",
    title: "缓慢冷却",
    icon: Snowflake,
    desc: "滤液静置自然降温，依靠溶解度差驱动高有序度晶核形成与生长。",
    note: "热力学平衡态建立",
  },
  {
    id: "05",
    title: "减压抽滤",
    icon: GitMerge,
    desc: "使用布氏漏斗与抽气泵结合，快速实现晶液两相分离。",
    note: "相态剥离",
  },
  {
    id: "06",
    title: "洗涤与干燥",
    icon: Wind,
    desc: "少量冷溶剂冲洗，真空干燥箱彻底脱除层间残留溶剂。",
    note: "终端纯化锁定",
  },
];

export default function Steps() {
  return (
    <section id="steps" className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              Standard Operating Procedure
            </h2>
            <h2 className="text-3xl font-bold text-slate-900">
              实验标准规程 (SOP)
            </h2>
          </div>
          <div className="hidden sm:block text-xs font-mono text-slate-500">
            VERSION 4.2 / LAB PROTOCOL
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow group flex flex-col"
            >
              <div className="absolute top-4 right-6 text-blue-600 font-black text-4xl italic opacity-10 select-none group-hover:opacity-20 transition-opacity">
                {step.id}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700">
                  <step.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {step.title}
                </h3>
              </div>
              <p className="text-slate-600 text-[13px] leading-relaxed mb-4 flex-1">
                {step.desc}
              </p>
              <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {step.note}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
