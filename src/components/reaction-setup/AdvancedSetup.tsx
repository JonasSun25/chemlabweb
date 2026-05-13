import { useState } from 'react';
import { Settings2, Plus, Trash2, Calculator, AlertCircle, ChevronDown, ChevronUp, Droplets, FlaskConical, AlertTriangle, ExternalLink } from 'lucide-react';

interface Reagent {
  id: number;
  name: string;
  mw: string;
  equivalents: string;
  mass: string;
  mmol: string;
}

interface CalculationStep {
  step: number;
  description: string;
  formula: string;
  values: string;
  result: string;
}

const formatSignificant = (num: number, sigFigs: number = 4): string => {
  if (num === 0) return '0';
  if (isNaN(num)) return '';
  const rounded = Number(num.toPrecision(sigFigs));
  return rounded.toString();
};

const isValidNumber = (value: string): boolean => {
  if (!value || value.trim() === '') return false;
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num) && num > 0;
};

export default function AdvancedSetup() {
  const [reagents, setReagents] = useState<Reagent[]>([
    { id: 1, name: '', mw: '', equivalents: '1.0', mass: '', mmol: '' },
    { id: 2, name: '', mw: '', equivalents: '', mass: '', mmol: '' },
    { id: 3, name: '', mw: '', equivalents: '', mass: '', mmol: '' },
  ]);
  const [showDetails, setShowDetails] = useState(false);
  const [showSolventDrying, setShowSolventDrying] = useState(false);
  const [showSolventModal, setShowSolventModal] = useState(false);
  const [showGasProtectionModal, setShowGasProtectionModal] = useState(false);
  const [calculationSteps, setCalculationSteps] = useState<CalculationStep[]>([]);

  const addReagent = () => {
    const newId = Math.max(...reagents.map(r => r.id), 0) + 1;
    setReagents([...reagents, { id: newId, name: '', mw: '', equivalents: '', mass: '', mmol: '' }]);
  };

  const removeReagent = (id: number) => {
    if (reagents.length <= 1) return;
    setReagents(reagents.filter(r => r.id !== id));
  };

  const updateReagent = (id: number, field: keyof Reagent, value: string) => {
    setReagents(reagents.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const calculate = () => {
    const steps: CalculationStep[] = [];
    let stepNum = 1;

    const reagentWithMass = reagents.find(r => isValidNumber(r.mass) && isValidNumber(r.mw) && isValidNumber(r.equivalents));
    
    if (!reagentWithMass) return;

    const mw = parseFloat(reagentWithMass.mw);
    const eq = parseFloat(reagentWithMass.equivalents);
    const mass = parseFloat(reagentWithMass.mass);
    const limitingMmol = mass / mw * 1000;

    steps.push({
      step: stepNum++,
      description: `确定限制试剂: ${reagentWithMass.name || `试剂 ${reagentWithMass.id}`}`,
      formula: '限制试剂 = 已知投料质量的试剂',
      values: `投料质量 = ${mass} g, 分子量 = ${mw} g/mol, 当量 = ${eq} eq`,
      result: `限制试剂 = ${reagentWithMass.name || `试剂 ${reagentWithMass.id}`}`,
    });

    steps.push({
      step: stepNum++,
      description: '计算限制试剂的摩尔量',
      formula: '摩尔量 (mmol) = 质量 (g) ÷ 分子量 (g/mol) × 1000',
      values: `${mass} g ÷ ${mw} g/mol × 1000`,
      result: `${formatSignificant(limitingMmol)} mmol`,
    });

    const updatedReagents = reagents.map(r => {
      if (r.id === reagentWithMass.id) {
        return { ...r, mmol: formatSignificant(limitingMmol) };
      }

      if (isValidNumber(r.mw) && isValidNumber(r.equivalents)) {
        const rMw = parseFloat(r.mw);
        const rEq = parseFloat(r.equivalents);
        const rMmol = limitingMmol * rEq;
        const rMass = rMmol * rMw / 1000;

        steps.push({
          step: stepNum++,
          description: `计算 ${r.name || `试剂 ${r.id}`} 的摩尔量`,
          formula: '摩尔量 = 限制试剂摩尔量 × 当量',
          values: `${formatSignificant(limitingMmol)} mmol × ${rEq} eq`,
          result: `${formatSignificant(rMmol)} mmol`,
        });

        steps.push({
          step: stepNum++,
          description: `计算 ${r.name || `试剂 ${r.id}`} 的投料质量`,
          formula: '质量 (g) = 摩尔量 (mmol) × 分子量 (g/mol) ÷ 1000',
          values: `${formatSignificant(rMmol)} mmol × ${rMw} g/mol ÷ 1000`,
          result: `${formatSignificant(rMass)} g`,
        });

        return { ...r, mmol: formatSignificant(rMmol), mass: formatSignificant(rMass) };
      }

      return r;
    });

    setReagents(updatedReagents);
    setCalculationSteps(steps);
    setShowDetails(true);
  };

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2">Advanced Setup</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">高级反应体系搭建</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            根据化学计量学与反应敏感性，选择与配置正确的无水无氧或微量反应体系。
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-100 text-orange-600 p-3 rounded-xl"><Settings2 className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold text-slate-900">核心考量与技术</h2>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
              <h4 className="text-lg font-bold text-slate-900 mb-3">无水无氧体系</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                对于对水分或空气敏感的反应，需要搭建严格的无水无氧反应体系。
              </p>
              <ul className="text-sm text-slate-500 space-y-2 list-disc pl-5">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5"><ExternalLink className="w-4 h-4" /></span>
                  <span>
                    <strong className="text-blue-600 cursor-pointer hover:text-blue-700 hover:underline decoration-2 underline-offset-2 transition-all duration-200 hover:scale-[1.02] inline-block" onClick={() => setShowSolventModal(true)}>溶剂除水</strong>
                    ：常用无水溶剂需经严格干燥处理（如钠/二苯甲酮除水），并保存在惰性气体保护下。
                  </span>
                </li>
                <li><strong className="text-slate-700">反应器皿干燥：</strong>反应瓶、注射器、滴液漏斗等需在烘箱中 120°C 烘干至少 4 小时，使用前趁热组装并用惰性气体置换。</li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5"><ExternalLink className="w-4 h-4" /></span>
                  <span>
                    <strong className="text-cyan-600 cursor-pointer hover:text-cyan-700 hover:underline decoration-2 underline-offset-2 transition-all duration-200 hover:scale-[1.02] inline-block" onClick={() => setShowGasProtectionModal(true)}>气体保护</strong>
                    ：全程保持氮气或氩气正压，气流速度以液面冒泡为宜（约 1-2 个气泡/秒）。
                  </span>
                </li>
                <li><strong className="text-slate-700">转移技术：</strong>液体试剂经注射器转移，气体试剂经双针头技术转移，固体试剂在惰性气体手套箱中称量。</li>
              </ul>
            </div>
  
             <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
              <h4 className="text-lg font-bold text-slate-900 mb-3">反应规模与微量操作</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                微量反应（&lt; 1 mmol）对操作精度要求更高，需要特殊的仪器和技巧。
              </p>
              <ul className="text-sm text-slate-500 space-y-2 list-disc pl-5">
                <li><strong className="text-slate-700">微量天平：</strong>使用十万分之一分析天平，称量精度可达 0.01 mg。</li>
                <li><strong className="text-slate-700">微量注射器：</strong>根据体积选择合适规格（10 μL, 50 μL, 100 μL, 1 mL 等），使用前用溶剂润洗多次。</li>
                <li><strong className="text-slate-700">微量反应管：</strong>使用 1-5 mL 螺旋盖反应管，可耐受加热和冷却循环。</li>
                <li><strong className="text-slate-700">精准称量：</strong>在十万分之一天平上直接称量反应瓶并去皮，将试剂直接转移入瓶中以减少刮刀转移损耗。微量液体使用高精度微量注射器。</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="w-5 h-5 text-orange-600" />
                <h4 className="text-lg font-bold text-slate-900">化学计量学计算器 (Stoichiometry Calculator)</h4>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                精准的物料配比决定了转化率、分离难度及目标产物的纯度。输入任意试剂的投料质量，系统将自动计算其他试剂的理论投料量。
              </p>
              
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="text-left p-3 font-semibold min-w-[180px]">试剂名称</th>
                        <th className="text-left p-3 font-semibold min-w-[120px]">分子量 (g/mol)</th>
                        <th className="text-left p-3 font-semibold min-w-[80px]">当量 (eq)</th>
                        <th className="text-left p-3 font-semibold min-w-[100px]">投料质量 (g)</th>
                        <th className="text-left p-3 font-semibold min-w-[100px]">摩尔量 (mmol)</th>
                        <th className="p-3 w-12"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {reagents.map((reagent, index) => (
                        <tr key={reagent.id} className="border-t border-slate-100">
                          <td className="p-2">
                            <input
                              type="text"
                              value={reagent.name}
                              onChange={(e) => updateReagent(reagent.id, 'name', e.target.value)}
                              placeholder="如: 苯甲醛"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-900"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={reagent.mw}
                              onChange={(e) => updateReagent(reagent.id, 'mw', e.target.value)}
                              placeholder="如: 106.12"
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-900 ${!isValidNumber(reagent.mw) && reagent.mw ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={reagent.equivalents}
                              onChange={(e) => updateReagent(reagent.id, 'equivalents', e.target.value)}
                              placeholder={index === 0 ? "1.0" : ""}
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-900 ${!isValidNumber(reagent.equivalents) && reagent.equivalents ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={reagent.mass}
                              onChange={(e) => updateReagent(reagent.id, 'mass', e.target.value)}
                              placeholder="输入质量计算"
                              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-slate-900 ${!isValidNumber(reagent.mass) && reagent.mass ? 'border-red-300 bg-red-50' : 'border-slate-200'}`}
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={reagent.mmol}
                              readOnly
                              placeholder="计算值"
                              className="w-full px-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-600 cursor-not-allowed"
                            />
                          </td>
                          <td className="p-2">
                            <button
                              onClick={() => removeReagent(reagent.id)}
                              disabled={reagents.length <= 1}
                              className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              title="删除此行"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-3">
                    <button
                      onClick={addReagent}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      添加试剂
                    </button>
                    <button
                      onClick={calculate}
                      className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
                    >
                      <Calculator className="w-4 h-4" />
                      开始计算
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <AlertCircle className="w-4 h-4" />
                    <span>提示：输入各试剂信息后，点击"开始计算"按钮进行化学计量计算。</span>
                  </div>
                </div>
              </div>

              {calculationSteps.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center gap-2 text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {showDetails ? '隐藏计算过程' : '显示计算过程'}
                  </button>
                  
                  {showDetails && (
                    <div className="mt-3 bg-slate-900 rounded-xl p-4 overflow-x-auto">
                      <h5 className="text-white font-semibold mb-3">计算详情</h5>
                      <div className="space-y-3">
                        {calculationSteps.map((step, index) => (
                          <div key={index} className="border-l-2 border-orange-500 pl-4">
                            <div className="text-orange-400 text-xs font-medium mb-1">
                              步骤 {step.step}
                            </div>
                            <div className="text-slate-200 text-sm font-medium mb-1">
                              {step.description}
                            </div>
                            <div className="text-slate-400 text-xs mb-1">
                              公式: <span className="font-mono">{step.formula}</span>
                            </div>
                            <div className="text-slate-400 text-xs mb-1">
                              代入: <span className="font-mono">{step.values}</span>
                            </div>
                            <div className="text-green-400 text-xs font-medium">
                              结果: <span className="font-mono">{step.result}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <h5 className="font-semibold text-slate-900 mb-2">计量学原则</h5>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• <strong className="text-slate-700">限制试剂选取：</strong>以价格最昂贵或合成步骤最长、最困难的原料定为 1.0 eq (当量限制)。</li>
                  <li>• <strong className="text-slate-700">过量试剂投加：</strong>易挥发、易分解的试剂，或为了迫使化学平衡向右移动的情况（如酯化反应），可以投加 1.5 ~ 5.0 eq 的廉价单体。</li>
                </ul>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-orange-100 text-orange-600 p-3 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M10 2v7.31"></path><path d="M14 9.3V2"></path><path d="M8.5 2h7"></path><path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path><path d="M5.58 16.5h12.85"></path></svg>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">常见反应装置搭建</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                    <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">1</span>
                      常温常压反应装置
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <h5 className="font-semibold text-slate-700 mb-2 text-sm">装置示意图</h5>
                        <div className="bg-slate-100 rounded-lg h-40 flex items-center justify-center">
                          <div className="text-center text-slate-500 text-xs">
                            <div className="text-4xl mb-2">🏺</div>
                            <div>单口瓶 + 搅拌子</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-700 mb-2 text-sm">组件说明</h5>
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• <strong>圆底烧瓶：</strong>反应容器</li>
                          <li>• <strong>磁力搅拌子：</strong>提供搅拌</li>
                          <li>• <strong>橡胶塞：</strong>密封反应体系</li>
                        </ul>
                        <h5 className="font-semibold text-slate-700 mb-2 mt-3 text-sm">适用反应</h5>
                        <p className="text-sm text-slate-600">对空气和水分不敏感的反应，如简单混合、室温搅拌等</p>
                        <h5 className="font-semibold text-slate-700 mb-2 mt-3 text-sm">注意事项</h5>
                        <p className="text-sm text-slate-600">仅适用于不产生气体、不放热的反应</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                    <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">2</span>
                      配备恒压滴液漏斗的常温常压反应装置
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <h5 className="font-semibold text-slate-700 mb-2 text-sm">装置示意图</h5>
                        <div className="bg-slate-100 rounded-lg h-40 flex items-center justify-center">
                          <div className="text-center text-slate-500 text-xs">
                            <div className="text-4xl mb-2">🔻🏺</div>
                            <div>圆底烧瓶 + 恒压滴液漏斗</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-700 mb-2 text-sm">组件说明</h5>
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• <strong>圆底烧瓶：</strong>反应容器</li>
                          <li>• <strong>恒压滴液漏斗：</strong>均匀滴加液体，维持体系压力平衡</li>
                          <li>• <strong>磁力搅拌子：</strong>提供搅拌</li>
                        </ul>
                        <h5 className="font-semibold text-slate-700 mb-2 mt-3 text-sm">适用反应</h5>
                        <p className="text-sm text-slate-600">需要缓慢滴加试剂的反应，如加成反应、竞争反应等</p>
                        <h5 className="font-semibold text-slate-700 mb-2 mt-3 text-sm">注意事项</h5>
                        <p className="text-sm text-slate-600">滴加速度需根据反应剧烈程度调节，通常 1-2 滴/秒</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                    <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">3</span>
                      配备惰性气体气球保护的常温常压反应装置
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <h5 className="font-semibold text-slate-700 mb-2 text-sm">装置示意图</h5>
                        <div className="bg-slate-100 rounded-lg h-40 flex items-center justify-center">
                          <div className="text-center text-slate-500 text-xs">
                            <div className="text-4xl mb-2">🎈🏺</div>
                            <div>烧瓶 + 惰气气球</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-700 mb-2 text-sm">组件说明</h5>
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• <strong>圆底烧瓶：</strong>反应容器</li>
                          <li>• <strong>惰性气体气球：</strong>隔绝空气，提供保护气氛</li>
                          <li>• <strong>注射针头：</strong>导出气体/加入试剂</li>
                        </ul>
                        <h5 className="font-semibold text-slate-700 mb-2 mt-3 text-sm">适用反应</h5>
                        <p className="text-sm text-slate-600">对空气敏感但不放热的反应</p>
                        <h5 className="font-semibold text-slate-700 mb-2 mt-3 text-sm">注意事项</h5>
                        <p className="text-sm text-slate-600">气球需充盈，针头位置应高于液面</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                    <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">4</span>
                      加热回流反应装置
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <h5 className="font-semibold text-slate-700 mb-2 text-sm">装置示意图</h5>
                        <div className="bg-slate-100 rounded-lg h-40 flex items-center justify-center">
                          <div className="text-center text-slate-500 text-xs">
                            <div className="text-4xl mb-2">🔥🏺💧</div>
                            <div>加热 + 冷凝管回流</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-700 mb-2 text-sm">组件说明</h5>
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• <strong>圆底烧瓶：</strong>反应容器</li>
                          <li>• <strong>球形冷凝管：</strong>冷凝回流蒸汽</li>
                          <li>• <strong>水浴/油浴：</strong>提供均匀热源</li>
                          <li>• <strong>磁力搅拌子：</strong>搅拌反应液</li>
                        </ul>
                        <h5 className="font-semibold text-slate-700 mb-2 mt-3 text-sm">适用反应</h5>
                        <p className="text-sm text-slate-600">需要加热促进反应进行的体系</p>
                        <h5 className="font-semibold text-slate-700 mb-2 mt-3 text-sm">注意事项</h5>
                        <p className="text-sm text-slate-600">严禁使用明火，油浴温度不超过 200°C，冷凝水需通水</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                    <h4 className="text-base font-bold text-slate-800 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">5</span>
                      三口瓶组合装置（温度计 + 机械搅拌 + 恒压滴液漏斗）
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <h5 className="font-semibold text-slate-700 mb-2 text-sm">装置示意图</h5>
                        <div className="bg-slate-100 rounded-lg h-40 flex items-center justify-center">
                          <div className="text-center text-slate-500 text-xs">
                            <div className="text-4xl mb-2">🌡️⚙️🔻🏺</div>
                            <div>三口瓶完整装置</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-700 mb-2 text-sm">组件说明</h5>
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• <strong>三口烧瓶：</strong>主反应口 x2 + 温度计口</li>
                          <li>• <strong>温度计：</strong>实时监测反应温度</li>
                          <li>• <strong>机械搅拌器：</strong>强力搅拌，适合高粘度/大宗反应</li>
                          <li>• <strong>恒压滴液漏斗：</strong>均匀滴加试剂</li>
                          <li>• <strong>球形冷凝管：</strong>（可选）加热回流</li>
                        </ul>
                        <h5 className="font-semibold text-slate-700 mb-2 mt-3 text-sm">适用反应</h5>
                        <p className="text-sm text-slate-600">标准无水无氧反应体系，如格氏反应、锂化反应等</p>
                        <h5 className="font-semibold text-slate-700 mb-2 mt-3 text-sm">注意事项</h5>
                        <p className="text-sm text-slate-600">机械搅拌需固定稳定，滴液漏斗需惰气置换，温度计水银球位置需浸入液面</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSolventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowSolventModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Droplets className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">有机溶剂除水方法</h2>
              </div>
              <button onClick={() => setShowSolventModal(false)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
                <span className="text-xl">×</span>
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-amber-600" />
                  醚类溶剂 (Et₂O, THF, Dioxane)
                </h5>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex gap-2"><span className="text-amber-600 font-bold">•</span><span><strong>钠/二苯甲酮：</strong>加入钠丝和二苯甲酮，回流至蓝色出现，蒸出使用</span></li>
                  <li className="flex gap-2"><span className="text-amber-600 font-bold">•</span><span><strong>LiAlH₄：</strong>加入适量LiAlH₄，回流后蒸出（仅限THF）</span></li>
                  <li className="flex gap-2"><span className="text-amber-600 font-bold">•</span><span><strong>注意事项：</strong>THF易生成过氧化物，需测过氧化物后再处理</span></li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-amber-600" />
                  卤代烃 (DCM, CHCl₃, CCl₄)
                </h5>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex gap-2"><span className="text-amber-600 font-bold">•</span><span><strong>CaCl₂/五氧化二磷：</strong>加入干燥剂振摇，过滤后蒸出</span></li>
                  <li className="flex gap-2"><span className="text-amber-600 font-bold">•</span><span><strong>注意事项：</strong>CHCl₃和CCl₄见光易分解，需避光保存</span></li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-amber-600" />
                  醇类 (MeOH, EtOH)
                </h5>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex gap-2"><span className="text-amber-600 font-bold">•</span><span><strong>镁条/碘：</strong>加入镁条和少量碘，回流至镁完全溶解，蒸出</span></li>
                  <li className="flex gap-2"><span className="text-amber-600 font-bold">•</span><span><strong>注意事项：</strong>甲醇有毒，需在通风橱中操作</span></li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-amber-600" />
                  乙酸乙酯/乙腈
                </h5>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex gap-2"><span className="text-amber-600 font-bold">•</span><span><strong>无水碳酸钾：</strong>加入无水K₂CO₃振摇，过滤后使用</span></li>
                  <li className="flex gap-2"><span className="text-amber-600 font-bold">•</span><span><strong>分子筛：</strong>加入4Å分子筛浸泡过夜</span></li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h5 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-amber-600" />
                  吡啶/DMF/DMSO
                </h5>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex gap-2"><span className="text-amber-600 font-bold">•</span><span><strong>CaH：</strong>加入适量CaH，回流后蒸出</span></li>
                  <li className="flex gap-2"><span className="text-amber-600 font-bold">•</span><span><strong>分子筛：</strong>加入4Å或5Å分子筛浸泡</span></li>
                  <li className="flex gap-2"><span className="text-amber-600 font-bold">•</span><span><strong>注意事项：</strong>DMSO高温易分解，需控制温度</span></li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <h5 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  安全提示
                </h5>
                <ul className="text-sm text-red-700 space-y-2">
                  <li>• 钠钾金属遇水剧烈反应，操作时避免接触水分</li>
                  <li>• LiAlH₄遇水剧烈放气，需在惰性气体保护下操作</li>
                  <li>• 有机溶剂易燃，远离火源和热源</li>
                  <li>• 建议在通风橱中操作，特别是甲醇、CHCl₃等有毒溶剂</li>
                  <li>• 使用CaH时避免酸液接触，会剧烈放氢</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {showGasProtectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowGasProtectionModal(false)}></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FlaskConical className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">气体保护方法详解</h2>
              </div>
              <button onClick={() => setShowGasProtectionModal(false)} className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors">
                <span className="text-xl">×</span>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-sm font-bold">1</span>
                  氮气保护 (N₂)
                </h4>
                <div className="space-y-4">
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">适用场景</h6>
                    <p className="text-sm text-slate-600">大多数有机合成反应，对水分和空气不太敏感的反应</p>
                  </div>
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">操作步骤</h6>
                    <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                      <li>检查气源压力表，确保压力在 0.2-0.5 MPa</li>
                      <li>将反应装置的出气口接入液封瓶或气球</li>
                      <li>缓慢开启氮气阀，观察气泡产生速率</li>
                      <li>调节气流至 1-2 个气泡/秒</li>
                      <li>置换体系 3-5 次后保持正压</li>
                    </ol>
                  </div>
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">设备规格</h6>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 氮气钢瓶：纯度 ≥ 99.99%</li>
                      <li>• 减压阀：输出压力 0-1 MPa 可调</li>
                      <li>• 液封瓶：25-50 mL</li>
                      <li>• 硅胶管：耐热硅胶，内径 4-6 mm</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <h6 className="font-semibold text-amber-800 mb-1">⚠️ 安全注意</h6>
                    <p className="text-sm text-amber-700">氮气无色无味，在密闭空间使用需注意缺氧风险。操作时保持通风。</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">2</span>
                  氩气保护 (Ar)
                </h4>
                <div className="space-y-4">
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">适用场景</h6>
                    <p className="text-sm text-slate-600">对空气或氮气敏感的高活性反应，如锂试剂使用、格氏反应等</p>
                  </div>
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">操作步骤</h6>
                    <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                      <li>确认氩气钢瓶压力充足（通常≥5 MPa）</li>
                      <li>连接氩气软管至反应装置</li>
                      <li>使用真空泵抽真空至 -0.1 MPa</li>
                      <li>充入氩气至常压，重复 3 次</li>
                      <li>持续通入氩气，保持微正压</li>
                    </ol>
                  </div>
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">设备规格</h6>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 氩气钢瓶：纯度 ≥ 99.999%</li>
                      <li>• 真空泵：旋片泵，极限真空度 ≤ 10 Pa</li>
                      <li>• 双排管：带压力计和多个支路</li>
                      <li>• 低温 trap：用于除水除氧</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <h6 className="font-semibold text-amber-800 mb-1">⚠️ 安全注意</h6>
                    <p className="text-sm text-amber-700">氩气成本较高，注意检查管路连接是否紧密，防止泄漏。</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-bold">3</span>
                  真空-氩气置换法
                </h4>
                <div className="space-y-4">
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">适用场景</h6>
                    <p className="text-sm text-slate-600">严格无水无氧反应，需要高纯度惰性气体环境</p>
                  </div>
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">操作步骤</h6>
                    <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                      <li>组装双排管系统，检查气密性</li>
                      <li>开启真空泵，抽取真空至压力稳定</li>
                      <li>关闭真空阀，开启氩气阀</li>
                      <li>充氩气至常压</li>
                      <li>重复 "抽真空-充氩" 循环 3-4 次</li>
                      <li>最后保持氩气流通过体系</li>
                    </ol>
                  </div>
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">设备规格</h6>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 双排管：四氟阀芯，带压力表</li>
                      <li>• 真空泵：油泵或干泵</li>
                      <li>• 氩气净化柱：CuO/Mg 柱</li>
                      <li>• 储气球：2-5 L</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <h6 className="font-semibold text-amber-800 mb-1">⚠️ 安全注意</h6>
                    <p className="text-sm text-amber-700">真空泵需定期更换油雾过滤器，防止油气返流污染体系。</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-bold">4</span>
                  注射器置换技术
                </h4>
                <div className="space-y-4">
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">适用场景</h6>
                    <p className="text-sm text-slate-600">小规模液体转移，或从惰性气体保护下的瓶中取样</p>
                  </div>
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">操作步骤</h6>
                    <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                      <li>用氩气或氮气置换注射器 3 次</li>
                      <li>将针头插入试剂瓶的隔膜</li>
                      <li>缓慢抽取所需体积的液体</li>
                      <li>将针头移至目标容器</li>
                      <li>缓慢推出液体</li>
                    </ol>
                  </div>
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">设备规格</h6>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 注射器：1-50 mL 规格</li>
                      <li>• 针头：22-25 G，长度 50-100 mm</li>
                      <li>• 隔膜：硅胶/PTFE 复合材质</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-bold">5</span>
                  手套箱操作
                </h4>
                <div className="space-y-4">
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">适用场景</h6>
                    <p className="text-sm text-slate-600">对空气和水分极度敏感的操作，如金属有机化合物称量、固体催化剂活化</p>
                  </div>
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">操作步骤</h6>
                    <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                      <li>开启手套箱净化系统，运行至少 30 分钟</li>
                      <li>检查箱内氧含量（应 {'<'} 1 ppm）和水含量（应 {'<'} 0.1 ppm）</li>
                      <li>将物品放入过渡舱，抽真空后充入惰性气体</li>
                      <li>重复置换 3 次后打开内舱门</li>
                      <li>在箱内完成称量、转移等操作</li>
                    </ol>
                  </div>
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">设备规格</h6>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 手套箱：德国 MBraun 或同类品牌</li>
                      <li>• 水氧分析仪：量程 0-1000 ppm</li>
                      <li>• 净化系统：循环泵流速 ≥ 100 L/min</li>
                      <li>• 过渡舱：单舱或双舱设计</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-semibold text-slate-700 mb-2">维护保养</h6>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• 定期更换净化柱（活性炭、分子筛、铜催化剂）</li>
                      <li>• 检查手套是否有破损，及时更换</li>
                      <li>• 保持箱内整洁，避免有机物堆积</li>
                      <li>• 定期校准水氧分析仪</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  通用安全注意事项
                </h4>
                <ul className="text-sm text-red-700 space-y-2">
                  <li className="flex gap-2"><span className="text-red-500 font-bold">•</span><span>所有气体钢瓶需固定放置，防止倾倒</span></li>
                  <li className="flex gap-2"><span className="text-red-500 font-bold">•</span><span>使用前检查所有连接是否牢固，无泄漏</span></li>
                  <li className="flex gap-2"><span className="text-red-500 font-bold">•</span><span>保持工作区域通风良好</span></li>
                  <li className="flex gap-2"><span className="text-red-500 font-bold">•</span><span>准备灭火器和急救箱，熟悉应急处理流程</span></li>
                  <li className="flex gap-2"><span className="text-red-500 font-bold">•</span><span>操作结束后关闭气源，排空管路</span></li>
                  <li className="flex gap-2"><span className="text-red-500 font-bold">•</span><span>定期检查减压阀和管路老化情况</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
