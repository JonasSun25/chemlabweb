import React from 'react';
import { motion } from 'motion/react';
import { Layers, Pipette, Zap, Filter, Thermometer, ShieldAlert, Droplets, Target } from 'lucide-react';

export default function ColumnChromatography() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative px-6 py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-emerald-500/10 rounded-full blur-3xl mix-blend-screen" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-[10px] font-bold tracking-widest uppercase border border-blue-800">
            Separation Art / 色谱分离
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            硅胶柱色谱法
            <span className="block text-2xl md:text-4xl mt-3 text-blue-400 font-bold mb-2">
              极性差异带来的微观赛跑
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            利用混合物各组分在固定相（硅胶）和流动相（洗脱剂）中的分配系数微小差异，将极其相似的分子彻底分离。合成实验室最万能的"终极分离武器"。
          </p>
        </div>
      </section>

      {/* Principle Section */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Core Theory</h2>
          <h3 className="text-3xl font-bold text-slate-900">核心原理：吸附与解吸</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">动态平衡</h4>
                <p className="text-sm text-slate-600">
                  分子在硅胶表面（强极性、氢键供体/受体）的滞留时间与其极性正相关。极性大的分子被牢牢抓住，极性小的分子随溶剂迅速流下。
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <Filter className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">洗脱梯度</h4>
                <p className="text-sm text-slate-600">
                  通过逐渐增加洗脱剂的极性（如增加乙酸乙酯比例），可以将吸附力强的极性组分"洗"下来，实现从低极性到高极性的依次出峰。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex justify-center items-center">
             <div className="relative w-32 h-64 flex flex-col items-center">
                {/* Column */}
                <div className="w-12 h-44 bg-slate-100 border-2 border-slate-300 rounded-t-sm z-10 relative overflow-hidden flex flex-col justify-between">
                   <div className="w-full h-8 bg-blue-100/50 absolute top-0"></div>
                   {/* Sand/Silica */}
                   <div className="w-full h-1 bg-amber-200 mb-auto mt-8"></div>
                   <div className="w-full h-24 bg-white border-t border-b border-slate-200 relative">
                     {/* Bands */}
                     <div className="w-full h-3 bg-rose-400 absolute top-2 blur-[1px]"></div>
                     <div className="w-full h-4 bg-emerald-400 absolute top-12 blur-[1px]"></div>
                     <div className="w-full h-2 bg-indigo-400 absolute bottom-4 blur-[1px]"></div>
                   </div>
                   <div className="w-full h-1 bg-amber-200"></div>
                   <div className="w-full h-2 bg-slate-200 mt-auto"></div>
                </div>
                {/* Valve */}
                <div className="w-14 h-3 bg-white border-2 border-slate-300 flex items-center justify-center z-20">
                   <div className="w-2 h-4 bg-red-400 border border-slate-400 rounded-sm absolute left-10"></div>
                </div>
                {/* Stem */}
                <div className="w-2 h-6 bg-white border-x-2 border-slate-300 z-10"></div>
                
                {/* Drops */}
                <div className="absolute bottom-6 w-1 h-3 flex flex-col gap-1 items-center z-10">
                   <div className="w-1 h-1.5 bg-indigo-300 rounded-full"></div>
                   <div className="w-1.5 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                </div>

                {/* Flask */}
                <div className="absolute -bottom-6 w-12 h-12 bg-white border-2 border-slate-300 rounded-full z-0 flex items-end justify-center overflow-hidden pb-1 shadow-inner">
                   <div className="w-full h-4 bg-indigo-100 relative"><div className="absolute top-0 w-full h-1 bg-indigo-200"></div></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Steps & Operations */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-slate-900 border-b-2 border-blue-600 inline-block pb-2">四大核心操作步骤</h2>
          </div>
          
          <div className="space-y-8">
            <div className="flex gap-6 relative">
               <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl shrink-0 z-10">1</div>
               <div className="absolute left-6 top-12 bottom-[-2rem] w-px bg-slate-200"></div>
               <div>
                 <h4 className="text-xl font-bold text-slate-900 mb-2">装柱 (Packing)</h4>
                 <p className="text-sm text-slate-600 mb-3 leading-relaxed">底垫脱脂棉与石英砂。推荐<strong>湿法匀浆装柱</strong>：将硅胶与极性极小的溶剂（如石油醚）混合调匀，一边用洗耳球敲击柱面一边倒下，确保硅胶床沉降紧密、无气泡、无断层，顶面极度平齐，这直接影响理论塔板数（分离效率）。</p>
               </div>
            </div>
            
            <div className="flex gap-6 relative">
               <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl shrink-0 z-10">2</div>
               <div className="absolute left-6 top-12 bottom-[-2rem] w-px bg-slate-200"></div>
               <div>
                 <h4 className="text-xl font-bold text-slate-900 mb-2">上样 (Loading)</h4>
                 <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                   <strong>液相上样：</strong>样品浓缩溶解于极少量的良溶剂中，用长滴管贴壁缓缓加入，保证样品层"极薄"且均匀。<br/>
                   <strong>干法拌样：</strong>对于极性大、溶解度差的样品，将样品用易挥发溶剂溶解后加入少量硅胶拌匀，旋干成粉末后平铺于柱顶。
                 </p>
               </div>
            </div>

            <div className="flex gap-6 relative">
               <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl shrink-0 z-10">3</div>
               <div className="absolute left-6 top-12 bottom-[-2rem] w-px bg-slate-200"></div>
               <div>
                 <h4 className="text-xl font-bold text-slate-900 mb-2">洗脱与加压 (Flash)</h4>
                 <p className="text-sm text-slate-600 mb-3 leading-relaxed">铺上一层石英砂保护层。小心加入洗脱溶剂。利用气泵或双连球从顶端加压，提高流速（Flash chromatography），不仅缩短时间，还能减小样品在柱内的横向扩散，保持色谱带锐利。</p>
               </div>
            </div>

            <div className="flex gap-6 relative">
               <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xl shrink-0 z-10">4</div>
               <div>
                 <h4 className="text-xl font-bold text-slate-900 mb-2">收集与检测 (Collect & TLC)</h4>
                 <p className="text-sm text-slate-600 mb-3 leading-relaxed">按固定体积（使用统一规格试管）连续接流出液。利用 TLC (薄层色谱) 快速点板，使用紫外灯或显色剂判断产物所在的管号，将相同组分的试管合并，旋蒸去除溶剂得到纯品。</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2"><ShieldAlert className="w-6 h-6 text-rose-500" /> 常见问题与对策</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-orange-400">
               <h4 className="font-bold text-slate-800 mb-2">色谱带拖尾</h4>
               <p className="text-xs text-slate-600">由于硅胶表面的游离硅羟基偏弱酸性。若分离带碱性基团（如氨基）产物，极易被强烈吸附导致拖尾。<strong>对策：</strong>洗脱剂中加入 1-5% 的三乙胺或氨水使游离羟基饱和。</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-blue-400">
               <h4 className="font-bold text-slate-800 mb-2">产物分解消失</h4>
               <p className="text-xs text-slate-600">硅胶本身具有微酸性和巨大表面积，可催化某些缩酮、缩醛脱保护或高度敏感物分解。<strong>对策：</strong>改用中性/碱性氧化铝作为固定相，或快速过滤式过柱，甚至改用重结晶。</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-emerald-400">
               <h4 className="font-bold text-slate-800 mb-2">交叉污染重叠</h4>
               <p className="text-xs text-slate-600">如果 Rf 值极度接近且上样层太厚导致峰重叠。<strong>对策：</strong>改动流动相体系（例如从 PE/EA 改为 DCM/MeOH 或正己烷/丙酮），增大柱长，极度减小洗脱剂极性以极低的流速缓慢洗脱。</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
