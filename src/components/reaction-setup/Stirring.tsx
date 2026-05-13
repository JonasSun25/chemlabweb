import { RotateCw, Activity, Layers } from 'lucide-react';

export default function Stirring() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-2">Mass Transfer & Mixing</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">搅拌传质技术</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            反应的成功往往被归因于温度和试剂，但无数局部过热和副产物的诞生，皆是因为槽内搅拌死区和传质阻力引起。
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
           <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-slate-900 mb-3">混合与传质原理</h3>
                 <p className="text-sm text-slate-600 leading-relaxed mb-4">
                   化学反应的基础是反应物分子之间必须发生物理碰撞。搅拌通过产生<strong>宏观对流</strong>和<strong>微观剪切力</strong>，极大减小了相界面的扩散边界层厚度。
                   对于非均相体系（液-液两相、固-液悬浮），搅拌直接决定了接触总表面积，突破所谓的“包裹效应”，从而主导宏观反应速率。
                 </p>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">核心应用</h3>
                 <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li><strong>消除热点效应：</strong> 将烧瓶边缘接触热源（或冷源）的介质迅速置换到中心，防止局部过热导致分解或飞温。</li>
                    <li><strong>突破两相壁垒：</strong> 如酯化反应的油水分水、相转移催化反应，高强度搅拌将一相打碎成无数微液滴以极大增加反应接触面积。</li>
                 </ul>
              </div>
              <div className="md:w-1/3 w-full bg-slate-50 p-6 rounded-2xl border border-slate-200 flex py-8 justify-center items-center">
                 {/* Stirring Fluid Diagram */}
                 <div className="relative w-40 h-48 flex items-center justify-center">
                    {/* Flask outline */}
                    <div className="absolute top-4 w-6 h-12 border-x-2 border-slate-400"></div>
                    <div className="absolute bottom-4 w-32 h-32 border-2 border-slate-400 rounded-full flex justify-center overflow-hidden pb-1 z-10 shadow-sm bg-white">
                       {/* Liquid */}
                       <div className="absolute bottom-0 w-full h-20 bg-purple-100 border-t border-purple-200 flex items-center justify-center">
                          {/* Vortex lines */}
                          <svg viewBox="0 0 100 50" className="w-[80%] h-full stroke-purple-300 fill-none opacity-50 absolute top-2">
                             <path d="M 10 25 Q 50 40 90 25" strokeWidth="1" />
                             <path d="M 20 15 Q 50 35 80 15" strokeWidth="1" />
                          </svg>
                          
                          {/* Stir Bar */}
                          <div className="absolute bottom-2 w-10 h-3 bg-white rounded-full border-2 border-slate-400 rotate-12 flex relative overflow-hidden shadow-md group animate-pulse">
                             {/* Motion lines */}
                             <div className="w-full h-full bg-slate-200/50 absolute top-0 -left-1"></div>
                          </div>
                       </div>
                    </div>
                    
                    {/* Stirring Platform */}
                    <div className="absolute bottom-0 w-36 h-4 border-2 border-slate-400 bg-slate-200 rounded-t-lg z-0"></div>
                    
                    {/* Magnetic Field Lines */}
                    <svg viewBox="0 0 40 40" className="absolute bottom-5 w-20 h-20 stroke-purple-400 fill-none z-20 opacity-30 animate-[spin_3s_linear_infinite]">
                       <circle cx="20" cy="20" r="16" strokeWidth="2" strokeDasharray="6 4" />
                    </svg>

                    {/* Flow text */}
                    <div className="absolute top-16 left-2 font-bold text-[8px] text-purple-600 flex flex-col items-center gap-1 z-30">
                       <RotateCw className="w-4 h-4 text-purple-500" />
                       <span>涡流剪切</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 text-purple-600 p-3 rounded-xl"><RotateCw className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-slate-900">磁力搅拌系统 (Magnetic Stirring)</h2>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              使用铁氟龙包裹的高强度磁铁转子（搅拌子）放入烧瓶内，受搅拌台下部旋转磁场驱动。
            </p>
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm">
                <strong className="text-slate-800 font-bold block mb-1">转子形态学：</strong>
                <ul className="text-slate-600 space-y-1 list-disc pl-4">
                  <li><strong>橄榄形 / 圆柱形：</strong>经典全能形状，适用于圆底烧瓶产生极佳漩涡。</li>
                  <li><strong>十字形 / 星形：</strong>用于极小试管及平底容器。</li>
                  <li><strong>八角带棱环形：</strong>适合锥形瓶和平底烧瓶，产生极高的剪切力与底部清扫能力。</li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm text-slate-600">
                <strong className="text-slate-800 font-bold block mb-1">涡流观察与去耦合：</strong>
                良好的搅拌必须在中心形成微型漩涡。当溶液粘度显著增高、或转速调得过高时，转子会失去磁场同步（发生剧烈的跳动和"咔哒"噪音，无法起效），必须立即降低转速重新吸附。
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 shadow-sm text-slate-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-slate-800 border border-slate-700 text-blue-400 p-3 rounded-xl"><Activity className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-white">机械搅拌系统 (Overhead Stirrers)</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6">
              当反应介质从清澈液体开始转化为难以流动的"面糊状"厚重悬浊液或膏体，磁性耦合的转矩会被彻底击穿抛锚，必须使用顶置机械搅拌马达。
            </p>
            <div className="space-y-4">
              <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl text-sm">
                <strong className="text-white font-bold block mb-1">核心组件体系：</strong>
                <ul className="text-slate-400 space-y-1 list-disc pl-4">
                  <li><strong>马达主机：</strong>悬挂于铁架台高处固定，提供无与伦比的齿轮箱大扭矩。</li>
                  <li><strong>玻璃 / 聚四氟乙烯搅拌桨：</strong>插入烧瓶的推力发生器。桨叶有锚式（刮壁效果强）、桨式（轴向混合器）等。</li>
                  <li><strong>密封驱动连接器 (Stirrer Bearing)：</strong>通过特殊玻璃件允许转轴穿过烧瓶中间口同时依然保持系统内部气体的高度密封。</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
