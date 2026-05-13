import { Thermometer, Snowflake, Flame } from 'lucide-react';

export default function TemperatureControl() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">Temperature Control</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">温度控制浴槽技术</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            反应的动力学与热力学极大地依赖系统温度。掌握各类冷却浴和加热源，实现全温域的高精度调控。
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
           <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-slate-900 mb-3">控温原理：动力学与热力学博弈</h3>
                 <p className="text-sm text-slate-600 leading-relaxed mb-4">
                   阿伦尼乌斯方程指出，温度哪怕上升微小的度数，也可能让反应速率呈指数级暴增。加热旨在<strong>提供越过反应能垒（活化能）所需的能量</strong>，促发惰性分子的转化。
                   而降温冷却，则是通过剥夺体系动能来冻结不稳定的活泼中间体（如碳负离子），迫使其只按照人为设定的路径发生具有<strong>高度选择性</strong>的最优碰撞，同时抑制所有寄生副反应。
                 </p>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">核心应用</h3>
                 <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li><strong>低温动力学控制：</strong> 获取在热力学上虽然不完美，但在动力学上生成最快的目标异构体（如使用LDA在-78°C下生成动力学烯醇负离子）。</li>
                    <li><strong>高温回流：</strong> 将溶剂沸腾以实现系统在某个最高限定温度下（溶剂沸点）长时间稳定维持。</li>
                 </ul>
              </div>
              <div className="md:w-1/3 w-full bg-slate-50 p-6 rounded-2xl border border-slate-200 flex py-8 justify-center items-center">
                 {/* Temp Control Diagram */}
                 <div className="relative w-40 h-48 flex items-end justify-center">
                    {/* Heating Stirrer */}
                    <div className="absolute bottom-0 w-32 h-6 bg-slate-300 border-2 border-slate-400 rounded-b-lg rounded-t-sm z-0 flex flex-col justify-between hidden md:flex">
                       {/* Dials */}
                       <div className="flex justify-around items-center w-full h-full px-4">
                          <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-400 shadow-sm relative"><div className="absolute top-1 left-2 w-1 h-0.5 bg-slate-500 transform rotate-45"></div></div>
                          <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-400 shadow-sm relative"><div className="absolute top-1 left-1 w-1 h-0.5 bg-slate-500 transform -rotate-45"></div></div>
                       </div>
                    </div>
                    {/* Oil Bath */}
                    <div className="absolute bottom-6 w-36 h-20 bg-amber-600/30 border-2 border-amber-600/50 rounded-b-3xl border-t border-t-amber-400/50 shadow-inner flex overflow-hidden justify-center items-end">
                       {/* Thermocouple in oil */}
                       <div className="w-1 h-14 bg-slate-800 rounded-full border border-slate-600 absolute right-4 transform rotate-12 top-2"></div>
                       <div className="absolute right-0 bottom-2 text-amber-700 font-bold text-[6px]">120°C</div>
                    </div>
                    
                    {/* Flask */}
                    <div className="absolute bottom-10 w-24 h-24 border-2 border-slate-400 bg-white rounded-full flex flex-col justify-end overflow-hidden pb-1 items-center z-10 shadow-md">
                       <div className="w-full h-12 bg-rose-100/80 border-t border-rose-200 relative opacity-90">
                          {/* bubbles */}
                          <div className="w-1 h-1 rounded-full bg-rose-300 absolute left-8 bottom-4 animate-bounce"></div>
                          <div className="w-1 h-1 rounded-full bg-rose-300 absolute right-6 bottom-2 animate-bounce animation-delay-200"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-300 absolute left-4 bottom-6 animate-bounce"></div>
                       </div>
                    </div>
                    
                    {/* Condenser Base */}
                    <div className="absolute bottom-34 w-6 h-8 border-x-2 border-slate-400 bg-blue-50/50 z-10"></div>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl"><Snowflake className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-slate-900">冷却浴 (Cooling Baths)</h2>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              通过混合特定溶剂与干冰/液氮，或单纯冰水，获取稳定降温区间，控制剧烈放热反应或稳定活泼中间体。
            </p>
            <div className="space-y-4">
              <div className="flex items-start text-sm">
                <div className="w-20 font-bold text-blue-800 shrink-0">0 °C</div>
                <div className="text-slate-600"><strong className="text-slate-800">冰水混合浴：</strong>最常见，加入少量纯水使冰块成为"淤泥状"包覆烧瓶，导热效率最高。</div>
              </div>
              <div className="flex items-start text-sm">
                <div className="w-20 font-bold text-blue-800 shrink-0">-5 到 -20 °C</div>
                <div className="text-slate-600"><strong className="text-slate-800">冰盐浴：</strong>冰水混合物中大规模撒入氯化钠或氯化钙能够进一步突破0度下限抑制冰结。</div>
              </div>
              <div className="flex items-start text-sm">
                <div className="w-20 font-bold text-blue-800 shrink-0">-40 °C</div>
                <div className="text-slate-600"><strong className="text-slate-800">干冰/乙腈浴：</strong>干冰（固态二氧化碳）不断加入乙腈溶剂，直到有剩余固态干冰呈现。</div>
              </div>
              <div className="flex items-start text-sm">
                <div className="w-20 font-bold text-blue-800 shrink-0">-78 °C</div>
                <div className="text-slate-600"><strong className="text-slate-800">干冰/丙酮浴：</strong>有机金属化学中的经典温度。丙酮价格低廉，但要小心易燃易爆且吸收水分。</div>
              </div>
              <div className="flex items-start text-sm">
                <div className="w-20 font-bold text-blue-800 shrink-0">-100 °C</div>
                <div className="text-slate-600"><strong className="text-slate-800">液氮/乙醚浴 (或液氮/二氯甲烷)：</strong>极端低温环境，须使用液氮小心控制。</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 text-red-600 p-3 rounded-xl"><Flame className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-slate-900">加热浴 (Heating Baths)</h2>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              为越过反应活化能垒提供能量。不仅需要考虑最终目标温度，还需考虑到升温与降温的速率以及安全性。
            </p>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                <h4 className="text-md font-bold text-red-900 mb-2">水浴 (Water Bath，0 - 95°C)</h4>
                <p className="text-xs text-red-800/80 leading-relaxed">
                  最为安全，对几乎所有常规轻工业低沸点溶剂均适用。温度接近沸点时水会迅速蒸发，需盖住。
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl">
                <h4 className="text-md font-bold text-orange-900 mb-2">硅油浴 (Silicone Oil Bath，常温 - 200°C+)</h4>
                <p className="text-xs text-orange-800/80 leading-relaxed">
                  温度控制极佳，蓄热能力强。须注意高温老化发黑的硅油可能在接触明火时燃烧，避免水滴溅入导致高温热油飞溅。
                </p>
              </div>
              <div className="bg-slate-100 border border-slate-200 p-4 rounded-xl">
                <h4 className="text-md font-bold text-slate-800 mb-2">铝加热块 (Aluminum Heating Block)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  替代油浴的现代方案。开模吻合各种口径烧瓶。避免了油污，加热降温快，但在接触面不足处升温较易不匀。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
