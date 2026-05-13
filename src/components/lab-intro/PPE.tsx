import { Activity, Beaker, ShieldPlus, AlertTriangle } from "lucide-react";

export default function PPE() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">
            Personal Protective Equipment
          </h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            PPE 个人安全防护矩阵
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            当通风橱和行政隔离控制失效的瞬间，PPE
            将成为阻挡致命伤害进入人体的肉搏战盾条。
          </p>
        </div>

        <img 
          src="/figures/PPE.png" 
          alt="PPE 个人安全防护矩阵" 
          className="max-w-2xl mx-auto rounded-xl mb-8"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Eye Protection */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              护目镜 (Eye Protection)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              哪怕你只是进实验室喝杯水（这本身也不允许），这块透明屏障也一秒不许摘。
            </p>
            <div className="w-full text-left space-y-3 mt-auto">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <strong className="text-xs text-blue-800 block">
                  安全眼镜 (Safety Glasses)：
                </strong>
                <span className="text-[11px] text-slate-600">
                  处理常规反应。侧面带护罩。
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <strong className="text-xs text-blue-800 block">
                  防溅面罩 (Chemical Goggles)：
                </strong>
                <span className="text-[11px] text-slate-600">
                  大量酸碱或强烈喷溅风险时佩戴。
                </span>
              </div>
            </div>
          </div>

          {/* Gloves */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6">
              <ShieldPlus className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              防护手套 (Gloves)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              没有一副手套可以防住所有溶剂。渗透性是核心问题。
            </p>
            <div className="w-full text-left space-y-3 mt-auto">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <strong className="text-xs text-emerald-800 block">
                  丁腈手套 (Nitrile)：
                </strong>
                <span className="text-[11px] text-slate-600">
                  主流之选。防常见酸碱及极性有机溶剂。
                </span>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <strong className="text-xs text-red-800 block">
                  致命渗透警告：
                </strong>
                <span className="text-[11px] text-red-700">
                  二氯甲烷
                  (DCM)、丙酮等溶剂数秒内即可穿透丁腈并将毒物黏在皮肤上。处理危险特质需带厚重丁基橡胶
                  (Butyl) 或双层更换法。
                </span>
              </div>
            </div>
          </div>

          {/* Lab Coats */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6">
              <Activity className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              实验服 (Lab Coats)
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              它不是用来保暖或耍帅的，它的主要任务是在你被泼满硫酸时，你能以最快速度把它脱掉。这也要求不要买拉链款！
            </p>
            <div className="w-full text-left space-y-3 mt-auto">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <strong className="text-xs text-purple-800 block">
                  全棉材质 (100% Cotton)：
                </strong>
                <span className="text-[11px] text-slate-600">
                  有机实验室标配，遇静电不易爆燃，沾火极少熔滴。合成纤维（聚酯）遇火会融化成热胶灼烧皮肤，绝对严禁。
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <strong className="text-xs text-purple-800 block">
                  及膝/按扣：
                </strong>
                <span className="text-[11px] text-slate-600">
                  保护大腿，且需快拔脱衣设计。必须覆盖手腕以免漏出。
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hazard Banner */}
        <div className="mt-12 bg-slate-900 rounded-3xl p-8 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              脱除污染控制原则
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-4xl">
              进入无毒区（休息室、走廊或用电脑敲击键盘）时，
              <strong className="text-red-400">必须脱掉手套</strong>
              并用肥皂洗手。戴着有毒的实验手套触碰门把手和电梯按钮，是将致癌试剂传给其他人的重大违规行为
              (Gross Negligence)。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
