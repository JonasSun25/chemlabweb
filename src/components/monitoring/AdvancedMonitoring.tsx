import { Activity, Zap } from 'lucide-react';

export default function AdvancedMonitoring() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-teal-600 mb-2">HPLC & In situ NMR</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">精确定量与原位表征</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            定性判断有无，定量判定优劣。高维度的过程控制能够锁定反应途径的所有分支点。
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* HPLC */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-teal-100 text-teal-600 p-3 rounded-xl"><Activity className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-slate-900">高效液相色谱 (HPLC)</h2>
            </div>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              主要提供绝对的"定量"与"比例"数据信息。相较于LC-MS对质量的敏锐探求，HPLC更侧重高理论塔板数的吸附分离与紫外吸收图谱的积分学评判。
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600">
                <strong className="block font-bold text-slate-800 mb-1">面积归一化转换率检测：</strong>
                反应液中微过量的起始物料峰何时彻底消失，或者转化为另一座峰的峰面积积分是否停止增加（达到平衡）。
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600">
                <strong className="block font-bold text-slate-800 mb-1">手性色谱柱 (Chiral Columns)：</strong>
                在不对称诱导反应追踪中，这是唯一可以直观测量一对对映异构体(enantiomers)之间比例差异，从而算出反应ee值的宏观手段。
              </div>
            </div>
          </div>

          {/* In situ NMR */}
          <div className="bg-slate-900 rounded-3xl p-8 shadow-sm text-slate-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-slate-800/80 border border-slate-700 text-purple-400 p-3 rounded-xl"><Zap className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-white">粗品原位核磁 (In situ NMR)</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              拔出0.1mL混浊且夹杂催化剂和溶剂的高浓度反应粗液，这看似是最不修边幅的操作，却能直取分子跳动的脉穴。
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-sm text-slate-400">
                <strong className="block font-bold text-white mb-1">1H-NMR 直接读谱：</strong>
                重点寻找生成物中新构建起连键的特征氢原子的化学位移信号（例如由醇氧化成醛后新冒出的 9.5 ppm 尖锐单峰）。只要看见这个信号塔立起，反之起始原料特征峰坍灭，一切便有了定论。
              </div>
              <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-sm text-slate-400">
                <strong className="block font-bold text-white mb-1">动力学测定：</strong>
                通过锁定反应釜内特定原子峰的积分面积随时间的连续衰减变化，可以直接求导出整个复杂协同反应机理的反应速率常数等动力学核心数据。
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
