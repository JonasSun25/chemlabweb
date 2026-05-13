import React from 'react';
import { motion } from 'motion/react';
import { ThermometerSun, Wind, Layers, Droplets, FlaskConical, ShieldAlert, Zap } from 'lucide-react';

export default function Distillation() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative px-6 py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[100px] mix-blend-screen" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 rounded-full bg-indigo-900/50 text-indigo-300 text-[10px] font-bold tracking-widest uppercase border border-indigo-800">
            Phase Transition / 气液相变分离
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            蒸馏技术
            <span className="block text-2xl md:text-4xl mt-3 text-indigo-400 font-bold mb-2">
              热力学与真空的交响曲
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            利用液体混合物各组分在相同温度下蒸汽压不同的特性，通过气化与冷凝两步相变实现分离纯化。从常规脱溶剂到高难度粘稠油状物提纯的核心手段。
          </p>
        </div>
      </section>

      {/* Grid Menu of Distillation Types */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">四大蒸馏武库</h2>
          <p className="text-slate-500 mt-3 text-sm">应对不同沸点差、不同热稳定性的物质分离需求</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Simple */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4">
             <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                   <ThermometerSun className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-900">常压蒸馏</h3>
                   <span className="text-xs text-orange-600 font-mono">Boiling Diff {'>'} 30°C</span>
                </div>
             </div>
             <p className="text-sm text-slate-600 flex-1 leading-relaxed">
               最经典的基础操作。用加热套在常压下加热混合物，低沸点蒸汽上升进入直形冷凝管冷却收集。只适用于组份沸点差异极大或大量脱除低沸点溶剂的情况。
             </p>
             <div className="mt-4 text-xs font-bold text-slate-500 bg-slate-50 p-3 rounded-lg flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" /> 必须加入沸石或磁力搅拌，防止系统暴沸。
             </div>
          </div>

          {/* Vacuum */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4">
             <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                   <Wind className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-900">减压蒸馏</h3>
                   <span className="text-xs text-blue-600 font-mono">High B.P. & Sensitive</span>
                </div>
             </div>
             <p className="text-sm text-slate-600 flex-1 leading-relaxed">
               当目标产物沸点超过 150°C 或在高温下容易变性分解时采用。降低系统压强能够极其显著地降低液体的沸点（例如油泵高真空下可能降低几十甚至上百摄氏度）。
             </p>
             <div className="mt-4 text-xs font-bold text-slate-500 bg-slate-50 p-3 rounded-lg flex flex-col gap-2">
                <div>由于负压状态极易暴沸，不可使用普通沸石。必须使用磁力强力搅拌，或插入直通瓶底的毛细管鼓入微量极细气泡作为气化中心。</div>
                <div>通常需配套<strong>克氏蒸馏头 (Claisen adapter)</strong>，其分叉结构防暴沸冲料。</div>
             </div>
          </div>

          {/* Fractional */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4">
             <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                   <Layers className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-900">分馏</h3>
                   <span className="text-xs text-emerald-600 font-mono">Boiling Diff {'<'} 30°C</span>
                </div>
             </div>
             <p className="text-sm text-slate-600 flex-1 leading-relaxed">
               当组份沸点非常接近时，一次简单的气化冷凝无法提纯。引入<strong>分馏柱（如维格罗柱 Vigreux column）</strong>，蒸汽在刺形玻璃齿上冷凝释放热能供新的液体气化，在一段柱子内实现多次微观层面的"蒸馏"，提供多个理论塔板数。
             </p>
          </div>

          {/* Short-path / Kugelrohr */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4">
             <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
                   <Zap className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-xl font-bold text-slate-900">球管蒸馏 (Kugelrohr)</h3>
                   <span className="text-xs text-purple-600 font-mono">Ultra High B.P. Oils</span>
                </div>
             </div>
             <p className="text-sm text-slate-600 flex-1 leading-relaxed">
               终极高沸点或极热敏甚至粘稠油状物的克星。也被称为短程蒸馏。加热区和冷凝区距离只有几厘米，蒸汽几乎无滞留、不回流。配合油泵高真空与装置整体倾斜旋转提纯高难度产物。
             </p>
             <div className="mt-4 text-xs font-bold text-slate-500 bg-slate-50 p-3 rounded-lg flex items-center justify-center">
                <div className="relative w-40 h-10 border border-slate-300 rounded flex items-center gap-2 px-2 overflow-hidden bg-white">
                   <div className="w-8 h-8 rounded-full border border-orange-400 bg-orange-100/50 flex items-center justify-center shadow-inner"><ThermometerSun className="w-4 h-4 text-orange-500" /></div>
                   <div className="w-12 h-0.5 border-t-2 border-slate-300 border-dashed"></div>
                   <div className="w-8 h-8 rounded-full border border-blue-400 bg-blue-100/50 flex items-center justify-center shadow-inner"><Droplets className="w-4 h-4 text-blue-500" /></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Safety & Protocol */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="p-8 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 blur-3xl rounded-full"></div>
             <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-lg">
                <ShieldAlert className="w-8 h-8 text-white" />
             </div>
             <div className="z-10">
                <h3 className="text-2xl font-bold mb-3">减压蒸馏铁律 (Safety Rules)</h3>
                <ul className="space-y-3 text-sm text-slate-300">
                   <li className="flex items-start gap-2">
                     <span className="text-rose-400 font-bold mt-0.5">01</span>
                     <strong>绝不可在真空状态下切断搅拌。</strong> 会瞬间引发剧烈暴沸冲料甚至导致玻璃器皿碎裂。
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-rose-400 font-bold mt-0.5">02</span>
                     <strong>停泵顺序：</strong> 必须先移除热源降温，打开通气阀缓慢解除系统负压，最后才能关闭真空泵。若先关泵，会导致泵油倒吸入系统毁掉纯品。
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="text-rose-400 font-bold mt-0.5">03</span>
                     <strong>检查星形裂纹：</strong> 高度真空对烧瓶器壁施加极强压应力，任何有细微星形裂纹的玻璃圆底烧瓶都会内爆。使用前必须对光检查。
                   </li>
                </ul>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
