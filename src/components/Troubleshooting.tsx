import { AlertTriangle, Lightbulb, Zap } from "lucide-react";

const issues = [
  {
    problem: "冷却后晶体不析出 (无自发成核)",
    symptoms:
      '溶液冷却至室温甚至冰浴后，仍呈现澄清透明的状态，无任何晶体出现，系统处于"过饱和状态"。',
    causes: [
      "溶剂用量过多，溶液并未达到过饱和。",
      "目标物极性大或体系黏度过高，动能壁垒阻止了晶核的自发形成。",
    ],
    solutions: [
      {
        text: "刮擦器壁",
        desc: "用玻璃棒末端摩擦烧杯内壁，微小的玻璃碎屑可作为晶核中心。",
      },
      {
        text: "植入晶种",
        desc: "加入极少量该物质的纯净晶体（晶种）直接诱导结晶。",
      },
      {
        text: "浓缩截流",
        desc: "重新加热蒸发掉一部分溶剂，人为提高体系浓度后再冷却。",
      },
    ],
  },
  {
    problem: "析出油状物 (Oiling Out Phenomenon)",
    symptoms:
      "降温过程中，没有固体颗粒析出，而是出现浑浊并沉降出黏稠的液态油状滴层。",
    causes: [
      "冷却时目标物质析出温度甚至高于其自身熔点，导致先以液态析出。",
      "混合物极其复杂，杂质作为增塑剂降低了目标物的熔点。",
      "溶剂选择极不恰当。",
    ],
    solutions: [
      {
        text: "重新加热补液",
        desc: "重新加热至溶解，并滴加更多溶剂，使其饱和温度降至物质熔点以下。",
      },
      {
        text: "引入良不良微调",
        desc: '若使用单一溶剂容易出油，必须切换为"良溶剂-不良溶剂"混合体系。',
      },
      {
        text: "超声震荡",
        desc: "在油状物出现时施加超声波能量，强行打碎油滴并促其结晶。",
      },
    ],
  },
  {
    problem: "晶体细碎包裹杂质",
    symptoms:
      "析出的晶体呈粉末状而非结晶颗粒，甚至包裹母液发黄，抽滤洗涤困难且产物不纯。",
    causes: [
      "冷却速度过快（直接扔进冰浴），导致瞬间大量成核，晶体来不及长大。",
      "在结晶过程中过度剧烈搅拌体系。",
    ],
    solutions: [
      {
        text: "缓慢降温程序",
        desc: "重新加热溶解后，让烧杯在室温下的隔热物（如棉花、软木垫）表面自然缓慢降温。",
      },
      {
        text: "禁止扰动",
        desc: "在晶体初步析出和生长的漫长阶段，严禁摇晃或搅拌容器，让分子有充分时间修补堆叠缺陷。",
      },
    ],
  },
];

export default function Troubleshooting() {
  return (
    <section
      id="troubleshooting"
      className="py-16 bg-slate-900 text-slate-200 border-t border-slate-800"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-800 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2">
            Troubleshooting Lab
          </h2>
          <h2 className="text-3xl font-bold text-white mb-4">
            异常诊断与解决方案诊断舱
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            重结晶是一门在失败与意外中修行的艺术。当晶体拒绝生长或行为异常时，请对照以下实验室常见故障代码。
          </p>
        </div>

        <div className="space-y-6">
          {issues.map((issue, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8 hover:bg-slate-800/80 transition-colors"
            >
              {/* Problem Statement */}
              <div className="lg:w-1/3 shrink-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {issue.problem}
                  </h3>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  <strong className="text-slate-300">表征症状：</strong>
                  {issue.symptoms}
                </p>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-2">
                    底层诱因 (Root Causes)
                  </p>
                  <ul className="text-sm text-slate-400 space-y-1">
                    {issue.causes.map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-orange-500">•</span>{" "}
                        <span className="leading-relaxed">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Solutions */}
              <div className="lg:w-2/3">
                <h4 className="text-[11px] uppercase tracking-wider text-emerald-500 font-bold mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> 修复方案 (Resolution Protocals)
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {issue.solutions.map((sol, i) => (
                    <div
                      key={i}
                      className="bg-slate-900 p-5 rounded-2xl border border-emerald-900/30"
                    >
                      <h5 className="text-emerald-400 font-bold text-sm mb-2">
                        {sol.text}
                      </h5>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {sol.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
