import React from 'react';
import { motion } from 'motion/react';
import { Snowflake, Thermometer, Droplets, Filter, ShieldAlert, Beaker, Sparkles, Target, Scale } from 'lucide-react';
import AnimationDemo from '../AnimationDemo';

export default function Recrystallization() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative px-6 py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl mix-blend-screen" />
          <div className="absolute bottom-1/4 left-1/4 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl mix-blend-screen" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 rounded-full bg-cyan-900/50 text-cyan-300 text-[10px] font-bold tracking-widest uppercase border border-cyan-800">
            Purification Science / 纯化科学
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            重结晶法
            <span className="block text-2xl md:text-4xl mt-3 text-cyan-400 font-bold mb-2">
              溶解度差异创造的微观分离
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            利用化合物在溶剂中溶解度的温度依赖性，通过降温析出晶体获得高纯度产物。这是有机合成中最温和、最环保的纯化手段。
          </p>
        </div>
      </section>

      {/* Principle Section */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2">Core Theory</h2>
          <h3 className="text-3xl font-bold text-slate-900">核心原理：溶解度温度系数</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                <Thermometer className="w-5 h-5 text-cyan-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">温度依赖性</h4>
                <p className="text-sm text-slate-600">
                  大多数有机化合物遵循"热溶解、冷析出"规律。理想的重结晶溶剂应具有陡峭的溶解度-温度曲线，即低温时溶解度极低，高温时溶解度极高。
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                <Filter className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">杂质分离</h4>
                <p className="text-sm text-slate-600">
                  杂质要么在热溶剂中完全溶解（留在母液中），要么在冷溶剂中也不溶解（通过热过滤除去）。目标物则在冷却过程中以晶体形式析出。
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">晶体的力量</h4>
                <p className="text-sm text-slate-600">
                  晶体生长是一个"自净"过程。杂质分子由于尺寸或形状不匹配，无法进入晶格，因而被排除在晶体之外，获得高纯度产物。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex justify-center items-center">
            <div className="relative w-48 h-64 flex flex-col items-center">
              {/* Beaker */}
              <div className="w-36 h-48 bg-slate-50 border-4 border-slate-200 rounded-b-3xl rounded-t-sm relative overflow-hidden">
                {/* Solution */}
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-cyan-200/60 to-cyan-100/30"></div>
                {/* Crystals forming */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 bg-white rounded-sm rotate-45 shadow-sm"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    className="w-3 h-3 bg-white rounded-sm rotate-12 shadow-sm"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    className="w-5 h-5 bg-white rounded-sm -rotate-12 shadow-sm"
                  />
                </div>
                {/* More crystals */}
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                  className="absolute bottom-2 left-8 w-3 h-3 bg-white rounded-sm rotate-45 shadow-sm"
                />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-4 right-10 w-4 h-4 bg-white rounded-sm -rotate-12 shadow-sm"
                />
              </div>
              {/* Beaker rim */}
              <div className="w-40 h-4 border-4 border-slate-300 rounded-t-lg -mt-1 bg-slate-100"></div>
              
              {/* Heating mantle */}
              <div className="absolute -bottom-8 w-32 h-8 bg-slate-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Solvent Selection */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2">Key Success Factor</h2>
            <h3 className="text-3xl font-bold text-slate-900">溶剂选择：70%的成功</h3>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mb-4">
                <Droplets className="w-6 h-6 text-cyan-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">单一溶剂法</h4>
              <p className="text-sm text-slate-600 mb-4">
                目标物在热溶剂中易溶，在冷溶剂中难溶。杂质在冷热溶剂中皆溶（留母液）或皆不溶（热过滤除去）。
              </p>
              <div className="text-xs text-slate-500">
                <strong>常用溶剂：</strong>乙醇、甲醇、乙酸乙酯、丙酮、水
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <Beaker className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">混合溶剂法</h4>
              <p className="text-sm text-slate-600 mb-4">
                找不到单一理想溶剂时使用。"良溶剂+不良溶剂"系统，先用热良溶剂溶解，再滴加热不良溶剂至微浊。
              </p>
              <div className="text-xs text-slate-500">
                <strong>经典组合：</strong>乙醇-水、乙酸乙酯-石油醚、丙酮-水
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <Snowflake className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">针晶策略</h4>
              <p className="text-sm text-slate-600 mb-4">
                对于油状物或黏稠液体，可使用"种晶"技术。加入少量目标物的晶体作为晶种，诱导定向生长。
              </p>
              <div className="text-xs text-slate-500">
                <strong>提示：</strong>冷冻过夜可提高结晶收率
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Animation Demo */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2">Interactive Demo</h2>
            <h3 className="text-3xl font-bold text-slate-900">交互式重结晶模拟</h3>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">
              通过下方交互式动画，观察温度变化对溶解度和晶体形成的影响
            </p>
          </div>
          <AnimationDemo />
        </div>
      </section>

      {/* Operation Steps */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-600 mb-2">Standard Procedure</h2>
          <h3 className="text-3xl font-bold text-slate-900">标准操作流程</h3>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: 1, title: "溶解", icon: Droplets, desc: "将粗产品溶于少量热溶剂", color: "cyan" },
            { step: 2, title: "脱色", icon: Sparkles, desc: "加入活性炭脱色除杂", color: "purple" },
            { step: 3, title: "过滤", icon: Filter, desc: "热过滤除去不溶杂质", color: "emerald" },
            { step: 4, title: "析晶", icon: Snowflake, desc: "缓慢冷却析出晶体", color: "blue" },
          ].map((item) => (
            <div key={item.step} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className={`w-10 h-10 rounded-full bg-${item.color}-100 flex items-center justify-center mb-4`}>
                <item.icon className={`w-5 h-5 text-${item.color}-600`} />
              </div>
              <div className="text-xs font-bold text-slate-400 mb-1">STEP {item.step}</div>
              <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips & Warnings */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
              <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                <Target className="w-5 h-5" />
                成功秘诀
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-emerald-800">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-xs font-bold">✓</span>
                  <span className="text-sm">使用过量5-20%的热溶剂，确保完全溶解</span>
                </li>
                <li className="flex gap-3 text-emerald-800">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-xs font-bold">✓</span>
                  <span className="text-sm">结晶时避免震动和搅拌，静置自然冷却</span>
                </li>
                <li className="flex gap-3 text-emerald-800">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-xs font-bold">✓</span>
                  <span className="text-sm">冰浴冷却比室温冷却晶体更细小均匀</span>
                </li>
                <li className="flex gap-3 text-emerald-800">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-xs font-bold">✓</span>
                  <span class className="text-sm">母液浓缩可进一步提高收率</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
              <h3 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5" />
                风险预警
              </h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-amber-800">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-xs font-bold">!</span>
                  <span className="text-sm">溶剂沸点不得超过产物熔点，以防油化</span>
                </li>
                <li className="flex gap-3 text-amber-800">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-xs font-bold">!</span>
                  <span className="text-sm">活性炭脱色应在溶解后稍冷却再加入</span>
                </li>
                <li className="flex gap-3 text-amber-800">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-xs font-bold">!</span>
                  <span className="text-sm">避免快速降温，会导致晶体团聚或油化</span>
                </li>
                <li className="flex gap-3 text-amber-800">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-xs font-bold">!</span>
                  <span className="text-sm">易爆或光敏物质谨慎操作，注意防护</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
