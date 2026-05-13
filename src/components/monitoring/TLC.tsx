import React, { useState } from 'react';
import { Target, AlertTriangle, ArrowUp, Beaker, Droplets, Info, Flame, Sliders } from 'lucide-react';

const TLC_STAINS = [
  {
    id: "KMnO4",
    name: "KMnO4 (高锰酸钾)",
    shortDesc: "氧化性显色剂。遇双键、醇羟基或容易起氧化的基团呈现黄斑。",
    recipe: "水 100 mL，KMnO4 1.5 g，K2CO3 10 g，5% NaOH 1.25 mL。混合溶解，寿命数月。",
    usage: "浸入显色剂后，用热风枪或烤板机温和加热。显色快，若过热整个底板会变黄甚至焦黑。",
    principle: "依靠 KMnO4 的强氧化性，将底物氧化自身还原为 MnO2 (黄色斑点)，背景保持紫红色。"
  },
  {
    id: "PMA",
    name: "PMA (磷钼酸)",
    shortDesc: "通用显色剂。绝大多数有机物都会烧成致密的深蓝色或黑色斑点。",
    recipe: "10 g 磷钼酸 (Phosphomolybdic acid) 溶解在 100 mL 无水乙醇中。建议避光保存。",
    usage: "浸后拔出控干溶剂，用热风枪强烈加热（200°C+）。斑点会变成深蓝色或黑绿色，背景呈明亮的黄绿色或浅绿色。",
    principle: "磷钼酸在受热以及有机物存在的条件下被还原形成一种复杂的杂多蓝发色混团。"
  },
  {
    id: "Anisaldehyde",
    name: "p-Anisaldehyde (对茴香醛)",
    shortDesc: "通用显色剂，且能产生不同层次的彩色斑点。",
    recipe: "135 mL 无水乙醇，加 5 mL 浓硫酸，1.5 mL 冰醋酸，最后滴入 3.7 mL 对茴香醛。需避光冷藏，若整体溶液变红即失效。",
    usage: "浸没后必须用极高温度的热风枪加热。斑点呈现红、绿、蓝、紫等复杂的特征色彩，对萜类和含氧化合物尤为灵敏。",
    principle: "在强酸催化下的加成消除或亲电芳香取代，诱导生成的碳正离子和共轭体系发色且对极性敏感。"
  },
  {
    id: "Ninhydrin",
    name: "Ninhydrin (茚三酮)",
    shortDesc: "胺类化合物。氨基酸或一级/二级胺烤板后会现出粉紫色。",
    recipe: "1.5 g 茚三酮溶解于 100 mL 正丁醇中，加入 3 mL 冰醋酸增加酸性催化。",
    usage: "浸液后温和加热至 120°C，胺类化合物将产生典型的紫色或粉红色极亮斑点。",
    principle: "茚三酮与游离氨基发生高专一性的缩合反应。"
  },
  {
    id: "Iodine",
    name: "Iodine (碘缸)",
    shortDesc: "非破坏性的可逆显色，极度适用于含有孤对电子的化合物或不饱和烃。",
    recipe: "在密封的深色广口瓶底部加入少量碘单质晶体，和适量粗糙硅胶（增加比表面积），摇匀静置等碘蒸汽充满。",
    usage: "将彻底挥发干溶剂的 TLC 板放入碘缸中几分钟封盖。斑点变黄褐色后取出，用铅笔做标记。稍后室温放置碘升华挥发完毕，原板又可进行别的显色手段。",
    principle: "碘蒸汽会通过物理或弱化学吸附分子表面，特别是拥有共轭双键和高电子云密度孤对电子的分子。"
  },
  {
    id: "Vanillin",
    name: "Vanillin (香草醛)",
    shortDesc: "作用机制类似对茴香醛。",
    recipe: "15 g 香草醛，溶于 250 mL 无水乙醇，在冰浴中缓慢滴加 2.5 mL 浓硫酸。务必避光配制和保存。",
    usage: "浸板后加热。可区分醇类和酮类等不同官能团，通常呈现亮蓝、绿或粉红深点。",
    principle: "香草醛与有机分子的醇或酮羟基发生缩聚反应或碳正离子反应，组合并生成发色分子团。"
  },
  {
    id: "CAM",
    name: "CAM (角野钼酸铵)",
    shortDesc: "被称为 Hanessian's Stain，对极其低浓度的痕量斑点比 PMA 更加敏锐。",
    recipe: "5 g 钼酸铵，0.5 g 硝酸铈铵，完全溶解在含有 15 mL 浓硫酸的 100 mL 水溶液中。（溶解放热剧烈须冰浴）",
    usage: "浸后用热风枪加热至 200°C。出现深蓝色或黑色斑点浮雕式展现在极浅的蓝底色上。",
    principle: "利铈和钼的高价离子与有机分子发生氧化还原反应并伴有金属杂原子的深色还原沉淀。"
  },
];

const ELUENT_SYSTEMS = [
  { id: "PE", name: "100% PE (极低极性)", polarity: 0, rfSM: 2, rfProduct: 5 },
  { id: "PE_EA_10_1", name: "PE/EA = 10:1 (低极性)", polarity: 1, rfSM: 5, rfProduct: 30 },
  { id: "PE_EA_3_1", name: "PE/EA = 3:1 (中极性)", polarity: 2, rfSM: 25, rfProduct: 60 },
  { id: "PE_EA_1_1", name: "PE/EA = 1:1 (较高极性)", polarity: 3, rfSM: 60, rfProduct: 85 },
  { id: "EA", name: "100% EA (极高极性)", polarity: 4, rfSM: 90, rfProduct: 98 },
];

const COMMON_SOLVENTS = [
  { name: "石油醚 (Petroleum Ether)", abbr: "PE", mw: "N/A (混合物)", bp: "30~90°C", polarity: "0.01 (极低)", trait: "最常用的非极性展开剂成分（通常使用60-90°C馏分）。" },
  { name: "正己烷 (Hexane)", abbr: "Hexane", mw: "86.18", bp: "69°C", polarity: "0.09 (极低)", trait: "比PE更昂贵但纯度更高，紫外下无吸收。" },
  { name: "二氯甲烷 (Dichloromethane)", abbr: "DCM", mw: "84.93", bp: "39.6°C", polarity: "3.1 (中低)", trait: "溶解力强，常与极性溶剂(如甲醇)配对用于强极性化合物展开。" },
  { name: "乙醚 (Diethyl Ether)", abbr: "Et2O", mw: "74.12", bp: "34.6°C", polarity: "2.8 (中等)", trait: "挥发度极高，极性略低于EA，但极易挥发导致TLC边缘效应。" },
  { name: "乙酸乙酯 (Ethyl Acetate)", abbr: "EA", mw: "88.11", bp: "77.1°C", polarity: "4.4 (中等)", trait: "最常用的极性展开剂成分，与PE任意比例互溶构筑梯级极性。" },
  { name: "丙酮 (Acetone)", abbr: "Acetone", mw: "58.08", bp: "56°C", polarity: "5.1 (高)", trait: "替代EA的备选极性溶剂，常用于PE/EA体系分不开的情况。" },
  { name: "甲醇 (Methanol)", abbr: "MeOH", mw: "32.04", bp: "64.7°C", polarity: "5.1 (极高，强氢键)", trait: "用于极性极大的化合物(如多羟基或盐类)，常在DCM中加入1%~10%。" },
];

export default function TLC() {
  const [activeStain, setActiveStain] = useState(TLC_STAINS[0].id);
  const selectedStain = TLC_STAINS.find(s => s.id === activeStain) || TLC_STAINS[0];
  
  const [activeEluentId, setActiveEluentId] = useState(ELUENT_SYSTEMS[2].id);
  const activeEluent = ELUENT_SYSTEMS.find(e => e.id === activeEluentId) || ELUENT_SYSTEMS[2];

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">Thin-Layer Chromatography</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">薄层色谱 (TLC) 监控指南</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            反应釜边最即时、最直观的化学进程监视器。它决定了你什么时候该关掉加热炉。
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
           <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-slate-900 mb-3">色谱分离原理</h3>
                 <p className="text-sm text-slate-600 leading-relaxed mb-4">
                   利用毛细管作用使流动相（展开剂）在固定相（硅胶板）上上升。不同化学分子根据其极性差异，对硅胶表面羟基的吸附力（氢键）不同。
                   <strong>极性越大，吸附越强，爬行越慢（Rf值越小）；极性越小，随溶剂流动越快（Rf值越大）。</strong>
                 </p>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">核心应用</h3>
                 <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li><strong>监控反应：</strong> 验证原料是否耗尽，新产物是否生成。</li>
                    <li><strong>判断纯度：</strong> 快速筛查分离馏分中的目标分子。</li>
                    <li><strong>极性探索：</strong> 为柱色谱分离 (Column Chromatography) 摸索最佳洗脱溶剂比例。</li>
                 </ul>
              </div>
              <div className="md:w-1/3 w-full bg-slate-50 p-6 rounded-2xl border border-slate-200 flex justify-center">
                 {/* TLC Diagram */}
                 <div className="relative w-32 h-48 bg-white border-2 border-slate-300 rounded shadow-sm overflow-hidden flex flex-col justify-end">
                    {/* Solvent level in chamber */}
                    <div className="absolute bottom-0 w-full h-8 bg-blue-100/50 border-t border-blue-200"></div>
                    
                    {/* Solvent front line */}
                    <div className="absolute top-6 w-full border-b border-slate-300 border-dashed"></div>
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 font-bold">溶剂前沿</div>
                    
                    {/* Origin line */}
                    <div className="absolute bottom-10 w-full border-b border-slate-400"></div>
                    
                    {/* Direction Arrow */}
                    <div className="absolute right-2 bottom-12 flex flex-col items-center">
                       <ArrowUp className="w-3 h-16 text-blue-300" strokeWidth={1.5} />
                    </div>

                    {/* Spots */}
                    {/* SM Spot (Starting Material) - High polarity */}
                    <div className="absolute left-[20%] bottom-[45%] w-2 h-2 bg-slate-800 rounded-full blur-[0.5px]"></div>
                    <div className="absolute left-[20%] bottom-6 text-[8px] font-bold text-slate-600 -translate-x-1/2">SM</div>
                    
                    {/* Co-spot */}
                    <div className="absolute left-[50%] bottom-[45%] w-2 h-2 bg-slate-800 rounded-full blur-[0.5px]"></div>
                    <div className="absolute left-[50%] top-[40%] w-2.5 h-2.5 bg-indigo-600 rounded-full blur-[1px]"></div>
                    <div className="absolute left-[50%] bottom-6 text-[8px] font-bold text-indigo-600 -translate-x-1/2">Co</div>
                    
                    {/* Product Spot - Lower polarity */}
                    <div className="absolute left-[80%] top-[40%] w-2.5 h-2.5 bg-indigo-600 rounded-full blur-[1px]"></div>
                    <div className="absolute left-[80%] bottom-6 text-[8px] font-bold text-slate-600 -translate-x-1/2">RM</div>
                 </div>
              </div>
           </div>

           {/* Eluent Selection Animation Section */}
           <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                 <div className="flex-1 order-2 md:order-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2"><Sliders className="w-5 h-5 text-blue-500" /> 如何选择展开剂？(Eluent Selection)</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      展开剂的极性直接决定了化合物的爬行高度（Rf 值）。一个理想的展开剂体系应该让目标产物的 Rf 值落在 <strong>0.2 ~ 0.5</strong> 之间，这样在随后的柱色谱分离中能获得最佳分离度。
                    </p>
                    <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5 mb-8">
                       <li><strong>极性太低 (<span className="text-slate-800 font-mono text-xs">如 100% PE</span>)：</strong>所有点都停留在原点（Rf ≈ 0），无法分开。</li>
                       <li><strong>极性太高 (<span className="text-slate-800 font-mono text-xs">如 100% EA</span>)：</strong>所有点都被推到溶剂前沿（Rf ≈ 1），同样无法分开。</li>
                       <li><strong>最佳策略：</strong>从极性小的溶剂中逐渐滴加极性大的溶剂，微调极性直到目标点出现在板面中下部。</li>
                    </ul>

                    {/* Eluent Controls */}
                    <div className="space-y-4">
                       <h4 className="text-sm font-bold text-slate-800">交互演示：调节展开剂极性</h4>
                       <div className="flex flex-wrap gap-3">
                         {ELUENT_SYSTEMS.map((eluent) => (
                           <button
                             key={eluent.id}
                             onClick={() => setActiveEluentId(eluent.id)}
                             className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                               activeEluentId === eluent.id 
                                 ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                                 : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50'
                             }`}
                           >
                             {eluent.name}
                           </button>
                         ))}
                       </div>
                    </div>
                 </div>
                 
                 {/* Animated TLC Plate */}
                 <div className="md:w-1/3 w-full bg-slate-50 p-6 rounded-2xl border border-slate-200 flex py-8 justify-center items-center order-1 md:order-2">
                    <div className="relative w-32 h-56 bg-white border-2 border-slate-300 rounded shadow-sm overflow-hidden flex flex-col justify-end">
                       {/* Solvent level */}
                       <div className="absolute bottom-0 w-full h-8 bg-blue-100/50 border-t border-blue-200 transition-all duration-300" style={{ height: activeEluent.polarity === 0 ? '1.5rem' : '2rem' }}></div>
                       
                       {/* Solvent front line (top 1.5rem / 24px) */}
                       <div className="absolute top-6 w-full border-b border-slate-300 border-dashed"></div>
                       <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold whitespace-nowrap">溶剂前沿 (Rf=1.0)</div>
                       
                       {/* Origin line (bottom 2.5rem / 40px) */}
                       <div className="absolute bottom-10 w-full border-b border-slate-400"></div>
                       <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 font-bold w-full text-center">原点 (Rf=0)</div>

                       {/* SM Spot (Starting Material) - High polarity (slower) */}
                       <div 
                          className="absolute left-[30%] w-2.5 h-2.5 bg-slate-800 rounded-full blur-[0.5px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                          style={{ bottom: `calc(2.5rem + ${activeEluent.rfSM * 1.6}px)` }}
                       ></div>
                       <div 
                          className="absolute left-[30%] text-[9px] font-bold text-slate-600 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]" 
                          style={{ bottom: `calc(1.5rem + ${activeEluent.rfSM * 1.6}px)`}}
                       >
                         SM
                       </div>
                       
                       {/* Product Spot - Low polarity (faster) */}
                       <div 
                          className="absolute left-[70%] w-2.5 h-2.5 bg-indigo-500 rounded-full blur-[1px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                          style={{ bottom: `calc(2.5rem + ${activeEluent.rfProduct * 1.6}px)` }}
                       ></div>
                       <div 
                          className="absolute left-[70%] text-[9px] font-bold text-indigo-600 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]" 
                          style={{ bottom: `calc(1.5rem + ${activeEluent.rfProduct * 1.6}px)`}}
                       >
                         产物
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Common TLC Solvents Table */}
           <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8 overflow-hidden">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Droplets className="w-5 h-5 text-blue-500" /> 常用 TLC 展开剂速查表</h3>
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                       <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                          <th className="p-4 border-b border-slate-200 font-bold rounded-tl-xl whitespace-nowrap">溶剂名称</th>
                          <th className="p-4 border-b border-slate-200 font-bold whitespace-nowrap">缩写</th>
                          <th className="p-4 border-b border-slate-200 font-bold whitespace-nowrap">分子量</th>
                          <th className="p-4 border-b border-slate-200 font-bold whitespace-nowrap">沸点</th>
                          <th className="p-4 border-b border-slate-200 font-bold text-blue-600 whitespace-nowrap">极性参数</th>
                          <th className="p-4 border-b border-slate-200 font-bold rounded-tr-xl w-1/3">特性与应用说明</th>
                       </tr>
                    </thead>
                    <tbody className="text-sm">
                       {COMMON_SOLVENTS.map((solvent, i) => (
                          <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                             <td className="p-4 font-bold text-slate-800">{solvent.name}</td>
                             <td className="p-4"><span className="px-2 py-1 bg-slate-100 text-slate-600 rounded font-mono text-xs font-bold">{solvent.abbr}</span></td>
                             <td className="p-4 text-slate-500 whitespace-nowrap">{solvent.mw}</td>
                             <td className="p-4 text-slate-500 whitespace-nowrap">{solvent.bp}</td>
                             <td className="p-4 font-mono font-bold text-blue-600 whitespace-nowrap">{solvent.polarity}</td>
                             <td className="p-4 text-slate-600 leading-relaxed text-xs">{solvent.trait}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl"><Target className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-slate-900">核心实战原则</h2>
           </div>
           
           <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                 <h4 className="text-lg font-bold text-slate-900 mb-2">1. 共点法 (Co-spotting) 是铁律</h4>
                 <p className="text-sm text-slate-600 leading-relaxed">
                   决不能只点一滴纯原料和一滴纯反应液。如果你不把两者点在同一个圆点重合交叠，那么因点板位置、极性拖尾等引起的微弱相对位移就会蒙蔽你的双眼，让你误把未反应的原料当成了新产物。
                 </p>
              </div>

              {/* TLC Stains Multi-selector Section */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                 <h4 className="text-lg font-bold text-slate-900 mb-4">2. 多维度显色系统辞典 (Stain Dictionary)</h4>
                 <p className="text-sm text-slate-600 leading-relaxed mb-6">
                   紫外灯 (UV 254nm) 只能让你看见拥有共轭体系的分子骨架。如果分子没有荧光基团或者在紫外区无吸收（如脂肪族链），在 UV 灯下完全是隐形的！因此必须利用多元化的化学显色剂来捕捉目标。
                 </p>

                 {/* Interactive Stain Chooser */}
                 <div className="flex flex-col gap-6">
                   <div className="flex flex-wrap gap-2">
                     {TLC_STAINS.map((stain) => (
                       <button
                         key={stain.id}
                         onClick={() => setActiveStain(stain.id)}
                         className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                           activeStain === stain.id 
                             ? 'bg-slate-800 text-white shadow-md' 
                             : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-100'
                         }`}
                       >
                         {stain.name}
                       </button>
                     ))}
                   </div>
                   
                   {/* Stain Details Card */}
                   <div className="bg-white border-2 border-emerald-50 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
                     <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center justify-between">
                       <h5 className="font-bold text-emerald-900 text-lg flex items-center gap-2">
                         <Droplets className="w-5 h-5 text-emerald-600" />
                         {selectedStain.name}
                       </h5>
                     </div>
                     <div className="p-6">
                       <p className="font-bold text-slate-800 mb-6 border-l-4 border-emerald-400 pl-3">
                         {selectedStain.shortDesc}
                       </p>
                       
                       <div className="grid md:grid-cols-2 gap-6">
                         <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200">
                               <Beaker className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                               <h6 className="font-bold text-slate-900 text-sm mb-1">配置方法 (Recipe)</h6>
                               <p className="text-sm text-slate-600 leading-relaxed">{selectedStain.recipe}</p>
                            </div>
                         </div>
                         <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200">
                               <Flame className="w-5 h-5 text-orange-500" />
                            </div>
                            <div>
                               <h6 className="font-bold text-slate-900 text-sm mb-1">使用操作 (Protocol)</h6>
                               <p className="text-sm text-slate-600 leading-relaxed">{selectedStain.usage}</p>
                            </div>
                         </div>
                         <div className="flex gap-4 md:col-span-2">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200">
                               <Info className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                               <h6 className="font-bold text-slate-900 text-sm mb-1">显色原理 (Principle)</h6>
                               <p className="text-sm text-slate-600 leading-relaxed">{selectedStain.principle}</p>
                            </div>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
              </div>
              </div>

              <div className="bg-red-50 border border-red-100 p-6 rounded-2xl flex gap-4">
                 <AlertTriangle className="w-6 h-6 text-red-600 shrink-0" />
                 <div>
                    <h4 className="text-lg font-bold text-red-900 mb-2">3. 淬灭监控防范伪影</h4>
                    <p className="text-sm text-red-800/80 leading-relaxed">
                      对于格氏反应等活泼金属中间体，直接点板会导致其中间体在硅胶板的高活性羟基表面发生未知分解反应。必须取 0.1mL 反应液，先用饱和氯化铵微量淬灭后，再取有机相点板，否则你看到的根本不是反应釜内的真实情况。
                    </p>
                 </div>
              </div>
           </div>
      </div>
    </div>
  );
}

