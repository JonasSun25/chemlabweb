import { Scale, Zap, Flame, Search } from 'lucide-react';
import { useState } from 'react';

export default function Quench() {
  const [searchTerm, setSearchTerm] = useState('');
  const [reactionSystem, setReactionSystem] = useState('');
  const [catalystType, setCatalystType] = useState('');
  const [reactionTemp, setReactionTemp] = useState('');
  const [expandedReagent, setExpandedReagent] = useState<number | null>(null);

  const reagents = [
    { id: 1, name: '饱和氯化铵', formula: 'NH₄Cl (aq)',适用: '格氏试剂、弱有机金属试剂', concentration: '饱和溶液', safety: '相对安全，注意通风' },
    { id: 2, name: '甲醇', formula: 'MeOH',适用: '丁基锂、格氏试剂', concentration: '无水级', safety: '易燃，远离火源' },
    { id: 3, name: '异丙醇', formula: 'IPA',适用: '丁基锂、LiAlH₄', concentration: '无水级', safety: '可燃液体' },
    { id: 4, name: '稀盐酸', formula: 'HCl',适用: '碱催化剂、胺类', concentration: '1-3 M', safety: '腐蚀性，避免接触皮肤' },
    { id: 5, name: '碳酸氢钠', formula: 'NaHCO₃',适用: '酸性杂质、中和', concentration: '饱和溶液', safety: '相对安全' },
    { id: 6, name: '硫代硫酸钠', formula: 'Na₂S₂O₃',适用: '碘、氧化剂淬灭', concentration: '10%', safety: '避免与酸混合' },
    { id: 7, name: '锌粉', formula: 'Zn',适用: '金属还原、硝基还原', concentration: '粉末状', safety: '远离酸和氧化剂' },
    { id: 8, name: '冰', formula: 'H₂O',适用: '稀释、酸淬灭', concentration: '碎冰', safety: '注意防滑' },
  ];

  const filteredReagents = reagents.filter(r => 
    r.name.includes(searchTerm) || r.formula.includes(searchTerm) || r.适用.includes(searchTerm)
  );

  const getRecommendation = () => {
    if (!reactionSystem || !catalystType) return null;
    if (catalystType === '金属' && (reactionSystem === '有机相' || reactionSystem === '无水')) {
      return { method: '酸淬灭 (Acid Quench)', steps: ['在冰浴条件下缓慢滴加饱和NH₄Cl或MeOH', '注意观察气体释放和温度变化', '滴加完成后继续搅拌30分钟'], note: '金属有机试剂需用醇类淬灭，绝不能直接加水' };
    }
    if (catalystType === '酸') {
      return { method: '碱淬灭 (Base Quench)', steps: ['加入饱和NaHCO₃溶液中和', '控制气泡产生速度', '用pH试纸确认pH 7-8'], note: '避免剧烈放热，必要时稀释' };
    }
    if (catalystType === '碱') {
      return { method: '酸淬灭 (Acid Quench)', steps: ['在冰浴中缓慢加入稀盐酸', '监控温度和pH值', '确保pH达到中性'], note: '酸浓度不宜过高' };
    }
    if (catalystType === '氧化剂') {
      return { method: '还原淬灭 (Reductive Quench)', steps: ['加入10% Na₂S₂O₃溶液', '充分搅拌还原剩余氧化剂', '若有金属残留加Zn粉'], note: '避免使用还原性过强的试剂' };
    }
    return { method: '水淬灭 (Aqueous Quench)', steps: ['加入冰水稀释', '分液萃取产物', '有机相水洗'], note: '根据反应特性调整' };
  };

  const recommendation = getRecommendation();

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">Reaction Quenching</h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">化学淬灭 (Quench) 艺术</h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            反应不是按下停止键就能停止的机器。须通过例如淬灭试剂滴加的手段，与残存的活性试剂反应得到稳定的化合物。
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
           <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-slate-900 mb-3">淬灭原理</h3>
                 <p className="text-sm text-slate-600 leading-relaxed mb-4">
                   利用高活泼试剂与选定淬灭剂之间极快（且不可逆）的放热化学反应，将未反应完的强酸、强碱、有机金属试剂或高活性还原剂转化为稳定且无害的盐或惰性分子。
                   核心在于<strong>控制反应速率与散热</strong>，避免因瞬间爆发的能量导致沸腾、喷溅乃至起火爆炸。
                 </p>
                 <h3 className="text-xl font-bold text-slate-900 mb-3">核心应用</h3>
                 <ul className="text-sm text-slate-600 space-y-2 list-disc pl-5">
                    <li><strong>终止反应：</strong> 固定在设定的最优时间点瞬间切断反应链，防止产物过度反应或副产物增多。</li>
                    <li><strong>安全转相：</strong> 将反应液从极端危险的无水/高活性状态，平稳过渡到可以拉出通风橱进行接触和分液的安全含水混合物状态。</li>
                 </ul>
              </div>
              <div className="md:w-1/3 w-full bg-slate-50 p-6 rounded-2xl border border-slate-200 flex justify-center items-center">
                 {/* Quench Diagram */}
                 <div className="relative w-48 h-48 flex items-center justify-center">
                    {/* Ice Bath */}
                    <div className="absolute bottom-2 w-32 h-16 bg-blue-50 border-2 border-blue-200 rounded-b-2xl border-t-0 shadow-inner overflow-hidden flex justify-center pt-2">
                       {/* ice chunks */}
                       <div className="w-4 h-4 bg-white/80 border border-blue-100 rounded-sm transform rotate-12 ml-2 mt-4 shadow-sm"></div>
                       <div className="w-5 h-4 bg-white/80 border border-blue-100 rounded-sm transform -rotate-12 absolute left-6 top-8 shadow-sm"></div>
                       <div className="w-4 h-5 bg-white/80 border border-blue-100 rounded-sm transform rotate-45 absolute right-8 top-6 shadow-sm"></div>
                       <div className="absolute right-2 bottom-1 text-[8px] font-bold text-blue-400">0°C 冰浴</div>
                    </div>
                    
                    {/* Flask */}
                    <div className="absolute bottom-6 w-16 h-16 border-2 border-slate-400 bg-white rounded-full flex flex-col justify-end overflow-hidden pb-1 items-center z-10 shadow-md">
                       <div className="w-full h-8 bg-amber-100/80 border-t border-amber-200 relative">
                          <Flame className="w-4 h-4 text-orange-400/50 absolute left-1/2 -translate-x-1/2 top-1" />
                       </div>
                    </div>
                    {/* Flask Neck */}
                    <div className="absolute bottom-20 w-6 h-8 border-x-2 border-slate-400 bg-white z-10 flex text-center justify-center pt-1">
                       {/* Venting gas */}
                       <svg viewBox="0 0 10 20" className="w-2 h-4 stroke-slate-300 fill-none -mt-4 animate-pulse">
                         <path d="M 2 20 Q 5 10, 2 0" />
                         <path d="M 8 20 Q 5 10, 8 0" />
                       </svg>
                    </div>
                    
                    {/* Dropping Funnel */}
                    <div className="absolute top-0 w-8 h-12 border-2 border-slate-400 bg-white rounded-t-lg rounded-b-xl z-20 flex flex-col overflow-hidden shadow-sm">
                       <div className="w-full h-10 bg-blue-100/80 border-b border-blue-200 text-[6px] text-center text-blue-600 font-bold leading-tight pt-2">NH₄Cl<br/>(aq)</div>
                    </div>
                    {/* Stopcock of funnel */}
                    <div className="absolute top-12 w-10 h-3 flex items-center justify-center z-20">
                       <div className="w-10 h-1 bg-slate-300 rounded-full border border-slate-400 shadow-sm relative">
                          <div className="absolute -top-1 left-2 w-2 h-3 bg-red-400 rounded-[1px]"></div>
                       </div>
                    </div>
                    {/* Funnel Stem */}
                    <div className="absolute top-15 w-2 h-4 border-x-2 border-slate-400 bg-white z-20"></div>
                    
                    {/* Active Molecule */}
                    <div className="absolute bottom-6 -right-6 text-[8px] font-mono text-red-500 font-bold break-all flex flex-col">
                       <span>R-MgX</span>
                       <span className="text-slate-400 -mt-1">+ O₂/H₂O</span>
                    </div>

                    {/* Slow drop warning */}
                    <div className="absolute top-10 -left-6 bg-yellow-100 border border-yellow-300 text-yellow-700 text-[8px] font-bold px-1 rounded shadow-sm">
                       滴加极其缓慢!
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 text-red-600 p-3 rounded-xl"><Scale className="w-6 h-6" /></div>
              <h2 className="text-2xl font-bold text-slate-900">核心淬灭准则</h2>
           </div>
           
           <div className="space-y-6">
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                 <h4 className="text-lg font-bold text-slate-900 mb-2">1. 永不妥协的降温与扩容</h4>
                 <p className="text-sm text-slate-600 leading-relaxed mb-4">
                   无数爆炸发生于直接室温向强碱/强酸体系倒水。必须将反应瓶移入冰浴，打开所有密闭活塞保证大量氢气与蒸汽能够排出，甚至在滴加前用无活性溶剂稀释原体系。
                 </p>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                 <h4 className="text-lg font-bold text-slate-900 mb-3 block">2. 专属淬灭剂 (Specific Reagents)</h4>
                 <ul className="text-sm text-slate-600 space-y-3 list-disc pl-5">
                    <li><strong className="text-slate-800">丁基锂 / 格氏试剂：</strong> 必须且只能用甲醇或异丙醇、饱和氯化铵溶液极缓慢滴加。绝不允许直接加水，否则剧烈爆沸。</li>
                    <li><strong className="text-slate-800">未反应的 Na / K 金属：</strong> 在异丙醇/叔丁醇浴中静置溶解，直到肉眼观察不到任何金属亮斑。</li>
                    <li><strong className="text-slate-800">强无机酸 (浓硫酸/硝酸)：</strong> 将反应液极缓慢地倒在大量碎冰上（Reverse quench），切忌将水倒入酸中。</li>
                 </ul>
              </div>

              <div className="bg-slate-900 text-slate-300 border border-slate-800 p-6 rounded-2xl flex gap-4">
                 <Zap className="w-6 h-6 text-yellow-400 shrink-0" />
                 <div>
                    <h4 className="text-lg font-bold text-white mb-2">Fieser 法则 —— 处理氢化锂铝 (LiAlH4) 的唯一解</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      LA由于其还原后的凝胶状铝盐极难过滤，淬灭不当会导致产物全军覆没包载在铝盐泥巴里。<br/><br/>
                      若反应使用了 x 克 LiAlH4，操作顺序严格为：<br/>
                      1. 滴加 <strong className="text-white">x mL</strong> 水<br/>
                      2. 滴加 <strong className="text-white">x mL</strong> 15% NaOH 水溶液<br/>
                      3. 滴加 <strong className="text-white">3x mL</strong> 水<br/>
                      4. 剧烈搅拌，直到得到析出的干净、易于抽滤的白色颗粒状铝盐为止。
                    </p>
                 </div>
              </div>
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">什么是淬灭？</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-3">核心定义</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                <strong>淬灭 (Quench)</strong> 是指在化学反应完成后，通过添加特定试剂与体系中残余的活性物质发生快速、不可逆的中和反应，从而<strong className="text-red-600">终止反应</strong>并使体系达到稳定状态的操作过程。
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                淬灭不是简单"停止搅拌"，而是<strong>通过化学反应消耗活性中间体</strong>，防止产物继续反应或发生危险。
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-3">能量曲线对比</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-3 border border-slate-200">
                  <h5 className="text-xs font-semibold text-red-600 mb-2">❌ 无淬灭</h5>
                  <div className="h-16 flex items-end justify-center">
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                      <path d="M 10 45 Q 30 40, 50 20 T 90 5" stroke="#ef4444" strokeWidth="2" fill="none" />
                      <text x="75" y="8" fontSize="8" fill="#ef4444">能量↑</text>
                    </svg>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">反应持续进行</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <h5 className="text-xs font-semibold text-green-600 mb-2">✓ 加淬灭</h5>
                  <div className="h-16 flex items-end justify-center">
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                      <path d="M 10 40 Q 30 35, 45 35 L 55 10 L 90 10" stroke="#22c55e" strokeWidth="2" fill="none" />
                      <text x="60" y="8" fontSize="8" fill="#22c55e">能量骤降</text>
                      <circle cx="50" cy="15" r="3" fill="#22c55e" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">反应立即终止</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-3">中英术语对照</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <span className="text-red-500 font-bold">Quench</span>
                <p className="text-xs text-slate-600 mt-1">淬灭（本义：冷却、熄灭）</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <span className="text-red-500 font-bold">Termination</span>
                <p className="text-xs text-slate-600 mt-1">反应终止</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <span className="text-red-500 font-bold">Stop</span>
                <p className="text-xs text-slate-600 mt-1">停止（一般指物理停止）</p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-slate-200">
                <span className="text-red-500 font-bold">Workup</span>
                <p className="text-xs text-slate-600 mt-1">后处理（广义的淬灭+纯化）</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">淬灭方法分类</h2>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-100 mb-5">
            <p className="text-sm text-slate-600 mb-4">选择您的反应体系特征，系统将为您推荐最优淬灭方案：</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">反应体系</label>
                <select value={reactionSystem} onChange={(e) => setReactionSystem(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm">
                  <option value="">请选择...</option>
                  <option value="水相">水相</option>
                  <option value="有机相">有机相</option>
                  <option value="无水">无水/惰气保护</option>
                  <option value="酶反应">酶反应</option>
                  <option value="自由基">自由基反应</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">催化剂类型</label>
                <select value={catalystType} onChange={(e) => setCatalystType(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm">
                  <option value="">请选择...</option>
                  <option value="酸">酸催化剂</option>
                  <option value="碱">碱催化剂</option>
                  <option value="金属">金属试剂/催化剂</option>
                  <option value="氧化剂">氧化剂</option>
                  <option value="还原剂">还原剂</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">反应温度</label>
                <select value={reactionTemp} onChange={(e) => setReactionTemp(e.target.value)} className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm">
                  <option value="">请选择...</option>
                  <option value="低温">低温 (0°C 以下)</option>
                  <option value="冰浴">冰浴 (0°C)</option>
                  <option value="室温">室温</option>
                  <option value="加热">加热回流</option>
                </select>
              </div>
            </div>
          </div>

          {recommendation && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
              <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">✓</span>
                推荐淬灭方案：{recommendation.method}
              </h4>
              <div className="bg-white rounded-lg p-4 mb-3">
                <h5 className="text-sm font-semibold text-slate-700 mb-2">操作步骤：</h5>
                <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
                  {recommendation.steps.map((step, i) => <li key={i}>{step}</li>)}
                </ol>
              </div>
              <p className="text-sm text-amber-700 bg-amber-50 rounded-lg p-3 border border-amber-200">
                <strong>⚠️ 注意：</strong>{recommendation.note}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600 p-3 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">四大淬灭类型详解</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-5 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🧊</span>
                <div>
                  <h4 className="font-bold text-blue-800">冷淬灭 Cryogenic</h4>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded">🔵 蓝色</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong className="text-slate-700">原理：</strong>通过低温环境降低反应速率，控制放热</p>
                <p><strong className="text-slate-700">常用试剂：</strong>冰水浴、冰盐浴(-20°C)、液氮/丙酮浴(-78°C)、干冰/乙醇浴(-77°C)</p>
                <p><strong className="text-slate-700">操作步骤：</strong>将反应瓶置于冷浴中，缓慢滴加淬灭试剂同时保持低温</p>
                <p><strong className="text-slate-700">注意事项：</strong>冷浴需提前配制，温度需监控，避免冻伤</p>
                <p><strong className="text-slate-700">适用：</strong>高放热反应、金属有机试剂淬灭</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-5 border border-red-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🧪</span>
                <div>
                  <h4 className="font-bold text-red-800">酸淬灭 Acid Quench</h4>
                  <span className="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded">🔴 红色</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong className="text-slate-700">原理：</strong>用酸性试剂中和碱性活性物质</p>
                <p><strong className="text-slate-700">常用试剂：</strong>稀HCl (1-3M)、饱和NH₄Cl、AcOH、柠檬酸</p>
                <p><strong className="text-slate-700">操作步骤：</strong>冰浴下缓慢滴加酸液，监控pH至酸性，继续搅拌后处理</p>
                <p><strong className="text-slate-700">注意事项：</strong>浓酸需稀释后使用，避免局部过热</p>
                <p><strong className="text-slate-700">适用：</strong>碱催化剂、胺类、格氏试剂淬灭</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">⚗️</span>
                <div>
                  <h4 className="font-bold text-green-800">碱淬灭 Base Quench</h4>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">🟢 绿色</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong className="text-slate-700">原理：</strong>用碱性试剂中和酸性杂质或淬灭酸催化剂</p>
                <p><strong className="text-slate-700">常用试剂：</strong>NaHCO₃、Na₂CO₃、NaOH、K₂CO₃</p>
                <p><strong className="text-slate-700">操作步骤：</strong>加入饱和碱溶液搅拌，用pH试纸监控至中性</p>
                <p><strong className="text-slate-700">注意事项：</strong>避免使用过强碱导致产物分解</p>
                <p><strong className="text-slate-700">适用：</strong>酸催化剂淬灭、酯化反应后处理</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-5 border border-yellow-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">⚡</span>
                <div>
                  <h4 className="font-bold text-yellow-800">氧化还原淬灭 Redox</h4>
                  <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded">🟡 黄色</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong className="text-slate-700">原理：</strong>通过氧化或还原子使活性物种失活</p>
                <p><strong className="text-slate-700">常用试剂：</strong>Na₂S₂O₃(还原碘)、Zn粉、FeCl₃、CuCl₂、H₂O₂</p>
                <p><strong className="text-slate-700">操作步骤：</strong>根据活性物种选择氧化/还原剂，充分搅拌反应</p>
                <p><strong className="text-slate-700">注意事项：</strong>控制氧化还原强度，避免破坏产物</p>
                <p><strong className="text-slate-700">适用：</strong>氧化剂残留、金属还原反应</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">常用淬灭试剂速查表</h2>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="搜索试剂名称、化学式或适用反应..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="text-left p-3 font-semibold">试剂名称</th>
                  <th className="text-left p-3 font-semibold">化学式</th>
                  <th className="text-left p-3 font-semibold">适用反应</th>
                  <th className="text-left p-3 font-semibold">浓度</th>
                  <th className="text-left p-3 font-semibold">安全提示</th>
                </tr>
              </thead>
              <tbody>
                {filteredReagents.map((reagent) => (
                  <>
                    <tr
                      key={reagent.id}
                      onClick={() => setExpandedReagent(expandedReagent === reagent.id ? null : reagent.id)}
                      className="border-t border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-3 font-medium text-slate-900">{reagent.name}</td>
                      <td className="p-3 font-mono text-slate-600">{reagent.formula}</td>
                      <td className="p-3 text-slate-600">{reagent.适用}</td>
                      <td className="p-3 text-slate-600">{reagent.concentration}</td>
                      <td className="p-3 text-amber-600">{reagent.safety}</td>
                    </tr>
                    {expandedReagent === reagent.id && (
                      <tr key={`${reagent.id}-detail`} className="bg-amber-50">
                        <td colSpan={5} className="p-4">
                          <div className="bg-white rounded-lg p-4 border border-amber-200">
                            <h5 className="font-bold text-slate-800 mb-2">详细说明 - {reagent.name}</h5>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                              <div>
                                <p><strong>化学式：</strong>{reagent.formula}</p>
                                <p><strong>推荐浓度：</strong>{reagent.concentration}</p>
                                <p><strong>适用反应：</strong>{reagent.适用}</p>
                              </div>
                              <div>
                                <p><strong>安全提示：</strong>{reagent.safety}</p>
                                <p className="mt-2 text-amber-700"><strong>使用建议：</strong>建议在冰浴条件下操作，缓慢滴加并搅拌</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
            {filteredReagents.length === 0 && (
              <p className="text-center text-slate-500 py-8">未找到匹配的淬灭试剂，请尝试其他关键词</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
