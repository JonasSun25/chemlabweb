import { useState } from 'react';
import { Beaker, Settings2, ShieldCheck, Zap, Thermometer, Ruler, Droplets, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import Modal from '../ui/Modal';
import { glasswareData, GlasswareItem } from '../../data/glasswareData';

export default function Glassware() {
  const [selectedItem, setSelectedItem] = useState<GlasswareItem | null>(null);

  const containerItems = [
    { name: "圆底烧瓶 Round-bottom Flask", use: "回流、蒸馏、反应" },
    { name: "梨形瓶 Pear-shaped Flask", use: "旋转蒸发接收、结晶" },
    { name: "三口烧瓶 Three-neck Flask", use: "同时安装冷凝管+温度计+导气管，多用于氮气保护反应" },
    { name: "烧杯 Beaker", use: "溶解、配溶液、结晶等" },
    { name: "锥形瓶 Conical Flask", use: "收集溶液、振荡反应" },
    { name: "试管", use: "小规模反应、试剂反应" },
    { name: "试剂瓶", use: "储存试剂" },
  ];

  const funnelItems = [
    { name: "分液漏斗 Separatory Funnel", use: "液-液萃取、洗涤" },
    { name: "恒压滴液漏斗 Pressure-equalizing Dropping Funnel", use: "逐滴添加试剂，敏感试剂" },
    { name: "砂芯漏斗 Fritted Funnel", use: "真空过滤" },
    { name: "普通漏斗 Funnel", use: "转移固体/液体" },
    { name: "布氏漏斗 Büchner Funnel", use: "大量固液分离，需配合抽滤瓶使用" },
  ];

  const condenserItems = [
    { name: "直形冷凝管 Straight Condenser", use: "低沸点溶剂蒸馏，下口进冷水，上口出" },
    { name: "球形冷凝管 Ball Condenser", use: "回流操作标配" },
    { name: "空气冷凝管 Air Condenser", use: "中等沸点溶剂蒸馏，靠空气冷却" },
  ];

  const measurementItems = [
    { name: "温度计 Thermometer", use: "监测反应/蒸馏温度" },
    { name: "量筒 Graduated Cylinder", use: "量取液体体积；不可加热" },
    { name: "容量瓶 Volumetric Flask", use: "配制标准浓度溶液" },
    { name: "移液器", use: "精确量取液体" },
  ];

  const otherItems = [
    "橡胶塞",
    "玻璃塞",
    "滴管",
    "洗瓶",
    "软木瓶托",
    "烧瓶架",
    "铁架台",
    "铁圈",
  ];

  const handleItemClick = (name: string) => {
    const item = glasswareData[name];
    if (item) {
      setSelectedItem(item);
    }
  };

  const renderGlasswareCard = (name: string, use: string, key: number) => {
    const hasDetails = !!glasswareData[name];
    return (
      <div
        key={key}
        onClick={() => hasDetails && handleItemClick(name)}
        className={`bg-slate-50 p-4 rounded-xl border border-slate-100 ${
          hasDetails ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-colors' : ''
        }`}
      >
        <h4 className="font-bold text-slate-900 mb-1">{name}</h4>
        <p className="text-sm text-slate-600">{use}</p>
        {hasDetails && (
          <span className="text-xs text-blue-500 mt-2 inline-block">点击查看详情 →</span>
        )}
      </div>
    );
  };

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
            Essential Apparatus
          </h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            常用玻璃器皿规范指南
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            玻璃器皿是有机化学家的画笔。熟练掌握各类瓶、管、漏斗的特性与规范使用，是构建完美反应体系的第一步。
          </p>
        </div>

        <div className="space-y-8">
          {/* 容器 */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-blue-50 border-b border-blue-100 p-6 flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                <Beaker className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900">
                1. 容器
              </h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {containerItems.map((item, index) => renderGlasswareCard(item.name, item.use, index))}
              </div>
            </div>
          </div>

          {/* 漏斗 */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-emerald-50 border-b border-emerald-100 p-6 flex items-center gap-4">
              <div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-900">
                2. 漏斗
              </h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {funnelItems.map((item, index) => renderGlasswareCard(item.name, item.use, index))}
              </div>
            </div>
          </div>

          {/* 冷凝 */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-indigo-50 border-b border-indigo-100 p-6 flex items-center gap-4">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">
                <Settings2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-indigo-900">
                3. 冷凝
              </h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {condenserItems.map((item, index) => renderGlasswareCard(item.name, item.use, index))}
              </div>
            </div>
          </div>

          {/* 测量 */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-amber-50 border-b border-amber-100 p-6 flex items-center gap-4">
              <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
                <Ruler className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-amber-900">
                4. 测量
              </h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {measurementItems.map((item, index) => renderGlasswareCard(item.name, item.use, index))}
              </div>
            </div>
          </div>

          {/* 其他 */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-slate-50 border-b border-slate-100 p-6 flex items-center gap-4">
              <div className="bg-slate-200 text-slate-600 p-3 rounded-xl">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                5. 其他
              </h3>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherItems.map((item, index) => renderGlasswareCard(item, glasswareData[item]?.shortUse || '', index))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.name || ''}
        size="xl"
      >
        {selectedItem && (
          <div className="space-y-6">
            <div className="flex justify-center bg-slate-100 rounded-xl p-4">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="max-h-48 sm:max-h-56 md:max-h-64 w-auto object-contain rounded-lg"
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-slate-700 leading-relaxed">{selectedItem.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-600" />
                材质特性
              </h3>
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-slate-500">材质：</span>
                    <span className="font-medium text-slate-900">{selectedItem.materialProperties.material}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">耐热性：</span>
                    <span className="font-medium text-slate-900">{selectedItem.materialProperties.thermalResistance}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">耐化学性：</span>
                    <span className="font-medium text-slate-900">{selectedItem.materialProperties.chemicalResistance}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">最高温度：</span>
                    <span className="font-medium text-slate-900">{selectedItem.materialProperties.maxTemp}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                使用说明
              </h3>
              <ol className="space-y-2">
                {selectedItem.usageInstructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3 text-sm text-slate-700">
                    <span className="bg-green-100 text-green-700 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                      {index + 1}
                    </span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                安全警示
              </h3>
              <ul className="space-y-2">
                {selectedItem.safetyWarnings.map((warning, index) => (
                  <li key={index} className="flex gap-3 text-sm text-red-700 bg-red-50 p-3 rounded-lg">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
