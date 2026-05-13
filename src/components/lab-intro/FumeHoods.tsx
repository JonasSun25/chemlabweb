import { Wind, ShieldAlert, CheckCircle2, Factory, FlaskConical, XCircle, ArrowDownToLine, X, Check, VolumeX, AlertTriangle, Beaker } from "lucide-react";

export default function FumeHoods() {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12 border-b border-slate-200 pb-6 text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">
            Ventilation Systems
          </h2>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            通风橱 (Fume Hood) —— 生命防线
          </h2>
          <p className="text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            几乎100%的有机挥发物对人体有害。标准通风橱通过维持微负压并引导平稳层流，切断有毒蒸气向呼吸道扩散的通道。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Principles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 p-8 rounded-3xl text-slate-300">
              <div className="flex items-center gap-3 mb-6 text-white">
                <Wind className="w-8 h-8 text-emerald-400" />
                <h3 className="text-2xl font-bold">空气动力学原理</h3>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                理想的通风橱采用"空气补流"和"面风速控制"设计。风机将室内空气通过观察窗下部开口抽入，扫过实验台面带走毒气，最后经由排风排至室外上方安全区域。
              </p>
              <img 
                src="/figures/fume hood.jpg" 
                alt="通风橱空气动力学原理" 
                className="w-full rounded-xl mb-6"
              />
              <div className="space-y-4">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">
                    关键性能指标
                  </div>
                  <div className="text-xl font-bold text-white">
                    面风速 (Face Velocity)
                  </div>
                  <p className="text-xs mt-1">
                    要求稳定在 0.4 m/s ~ 0.6 m/s
                    之间。过低无法抽走重分子气体，过高会引发湍流，反而将毒气"旋"出橱外。
                  </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">
                    气流扰动破坏 (Turbulence)
                  </div>
                  <p className="text-xs">
                    人在通风橱外快速走动、风扇吹拂等，均能瞬间破坏脆弱的气流屏障导致毒气外溢。
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl">
              <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-2">
                <ShieldAlert className="w-5 h-5" /> 紧急情况 (Emergency)
              </h4>
              <p className="text-sm text-amber-800/80">
                如遇火灾或剧烈爆炸前兆，立即拉下阻挡滑窗(Sash)，人员撤离，不要试图冒险扑救。滑窗的安全防爆钢化玻璃是保护面部的最后屏障。
              </p>
            </div>
          </div>

          {/* Rules */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm h-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Factory className="w-6 h-6 text-emerald-600" />
                合规操作规范
              </h3>

              <div className="space-y-8">
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">
                        6 英寸纵深隔离
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        所有在进行反应的烧瓶和散发气味的试剂瓶，都必须放置于滑窗内侧至少
                        15 厘米 (6 inches) 处，不可悬挂在边缘操作。
                      </p>
                    </div>
                  </div>
                  <div className="ml-10 bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-center">
                    <div className="h-32 w-full max-w-sm bg-white rounded-lg border-2 border-slate-200 relative overflow-hidden flex flex-col justify-end">
                      {/* Safe zone */}
                      <div className="absolute inset-0 bg-emerald-50/50"></div>
                      <div className="absolute inset-0 flex justify-center items-center pb-8 border-b border-emerald-200">
                        <div className="border border-emerald-400 bg-emerald-100 rounded text-emerald-700 text-xs px-3 py-1 flex items-center gap-2">
                           <FlaskConical className="w-4 h-4" /> 安全操作区 (Safe Zone)
                        </div>
                      </div>
                      {/* Danger zone (front 6 inches) */}
                      <div className="h-10 w-full bg-red-50 border-t-2 border-dashed border-red-300 relative flex items-center justify-center">
                        <span className="text-red-500 text-xs font-medium">前沿 6 英寸危险区</span>
                        <XCircle className="w-4 h-4 text-red-400 absolute right-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">
                        滑窗 (Sash) 高度管理
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        实验进行时，如果双手无需伸入，必须完全关闭滑窗。双手进入操作时，滑窗玻璃高度不应超过标识警戒线，利用玻璃阻挡飞溅物。
                      </p>
                    </div>
                  </div>
                  <div className="ml-10 bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-center">
                    <div className="h-40 w-full max-w-sm bg-slate-800 rounded-lg relative overflow-hidden flex flex-col justify-end border-x-4 border-t-4 border-b-8 border-slate-300 shadow-inner">
                      {/* Sash window sliding down */}
                      <div className="absolute top-0 left-0 right-0 h-[45%] bg-blue-100/20 backdrop-blur-[2px] border-b-[3px] border-blue-300/80 flex items-end justify-center pb-2 z-20">
                         <span className="text-blue-100 text-xs font-bold tracking-widest flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded">
                           <ArrowDownToLine className="w-3 h-3" /> 不应超过标识警戒线
                         </span>
                      </div>
                      
                      {/* Inside fume hood */}
                      <div className="flex justify-center gap-6 py-2 relative z-10 w-full">
                         <div className="relative">
                            <FlaskConical className="w-8 h-8 text-emerald-400 opacity-90" />
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 flex flex-col items-center animate-bounce">
                               <ShieldAlert className="w-4 h-4 text-emerald-300 drop-shadow-md" />
                            </div>
                         </div>
                         <Beaker className="w-6 h-6 text-emerald-500 opacity-80" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">
                        避免成为"储藏室"
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        严禁将通风橱用作长期的化学品堆放区。过密的瓶子堆叠将阻断平稳的底部气流，导致形成死区涡流。
                      </p>
                    </div>
                  </div>
                  <div className="ml-10 bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-center">
                    <div className="w-full max-w-sm flex items-stretch gap-4">
                      {/* Wrong setup */}
                      <div className="flex-1 bg-white rounded-lg border-2 border-red-200 p-2 relative flex flex-col justify-end overflow-hidden h-32">
                         <div className="absolute inset-0 bg-red-50/30"></div>
                         <div className="absolute top-2 left-2 text-xs text-red-600 font-bold flex items-center gap-1 bg-white/80 px-1.5 rounded"><X className="w-3 h-3" /> 阻断气流</div>
                         
                         <div className="flex items-end px-1 z-10 w-full justify-around pt-8">
                            <div className="w-3 h-8 bg-slate-300 rounded-sm"></div>
                            <div className="w-5 h-12 bg-slate-400 rounded-sm"></div>
                            <div className="w-4 h-9 bg-slate-300 rounded-sm"></div>
                            <div className="w-6 h-14 bg-slate-500 rounded-sm"></div>
                            <div className="w-3 h-6 bg-slate-300 rounded-sm"></div>
                         </div>
                         
                         {/* Blocked airflow vortex */}
                         <div className="absolute top-8 left-0 right-0 flex justify-center opacity-70 text-red-500">
                           <svg viewBox="0 0 100 20" className="w-[80%] h-8 stroke-current">
                              <path d="M 10 20 C 30 5 50 5 60 20" fill="none" strokeWidth={1.5} />
                              <path d="M 70 20 C 80 5 95 10 100 15" fill="none" strokeWidth={1.5} />
                              <circle cx="45" cy="15" r="3" fill="none" strokeWidth={1} />
                              <circle cx="85" cy="15" r="2" fill="none" strokeWidth={1} />
                           </svg>
                         </div>
                      </div>
                      
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 mt-1">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1">
                        警报器静音错误
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        现代 VAV (变风量)
                        通风橱具有警报功能。如果警报鸣叫，说明面风速失效或排风马达故障，请立即停止并上报维修。
                      </p>
                    </div>
                  </div>
                  <div className="ml-10 bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-center">
                    <div className="h-32 w-full max-w-sm bg-slate-800 rounded-lg p-4 flex flex-col items-center justify-center border-2 border-slate-700 relative shadow-inner">
                      <div className="flex items-center gap-4 bg-slate-900 border border-slate-600 rounded-xl px-5 py-3 shadow-lg relative overflow-hidden group">
                         {/* Flashing alert background */}
                         <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
                         
                         <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></div>
                         <div className="relative z-10 font-mono text-red-500 font-bold tracking-widest text-sm drop-shadow">LOW FLOW</div>
                         
                         <div className="relative z-10 ml-4 border-l border-slate-700 pl-4 flex items-center">
                            <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center relative border border-slate-600">
                               <VolumeX className="w-4 h-4 text-slate-400" />
                               {/* Crossed out mute action */}
                               <X className="w-7 h-7 text-red-500 absolute scale-110 drop-shadow-md" strokeWidth={3} />
                            </div>
                         </div>
                      </div>
                      <div className="mt-3 text-red-400 text-[10px] tracking-wider uppercase font-bold flex items-center gap-1 bg-red-500/10 px-2 py-0.5 rounded">
                        <AlertTriangle className="w-3 h-3" /> 严禁强行静音屏蔽
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
