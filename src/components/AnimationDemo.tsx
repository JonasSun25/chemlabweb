import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, RotateCcw } from "lucide-react";

type ProcessState =
  | "idle"
  | "heating"
  | "dissolved"
  | "cooling"
  | "crystallized";

export default function AnimationDemo() {
  const [step, setStep] = useState<ProcessState>("idle");
  const [temperature, setTemperature] = useState(25); // Celsius

  useEffect(() => {
    let tempTimer: NodeJS.Timeout;
    if (step === "heating" && temperature < 95) {
      tempTimer = setTimeout(
        () => setTemperature((t) => Math.min(95, t + 2)),
        50,
      );
    } else if (step === "heating" && temperature >= 95) {
      setStep("dissolved");
    } else if (step === "cooling" && temperature > 20) {
      tempTimer = setTimeout(
        () => setTemperature((t) => Math.max(20, t - 2)),
        50,
      );
    } else if (step === "cooling" && temperature <= 20) {
      setStep("crystallized");
    }
    return () => clearTimeout(tempTimer);
  }, [step, temperature]);

  const startHeating = () => setStep("heating");
  const startCooling = () => setStep("cooling");
  const reset = () => {
    setStep("idle");
    setTemperature(25);
  };

  const particles = Array.from({ length: 120 }).map((_, i) => {
    const isImpurity = i % 8 === 0;
    return {
      id: i,
      isImpurity,
      color: isImpurity ? "#94a3b8" : "#3b82f6", // slate-400 and blue-500
    };
  });

  return (
    <section id="demo" className="py-16 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
            Simulation
          </h2>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">
            微观演示模型
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-1">
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                过程状态监控
              </h3>
              <div className="text-lg font-bold text-blue-600 mb-4 h-8">
                {step === "idle" && "01: 混合晶态分析"}
                {step === "heating" && "02: 加热活化相变中"}
                {step === "dissolved" && "03: 饱和同质溶解"}
                {step === "cooling" && "04: 降温晶格重组中"}
                {step === "crystallized" && "05: 高纯度结构成型"}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed min-h-[4rem]">
                {step === "idle" &&
                  "体系处于室温。混合物中包含目标分子（蓝色）与微量杂质（灰色），尚未建立有效溶解梯度。"}
                {step === "heating" &&
                  "输入热能打破分子间作用力，系统熵增，宏观表现为物质逐渐融入溶剂。"}
                {step === "dissolved" &&
                  "达到热饱和状态。杂质远低于饱和阈值，此时体系具备了重新构建单一晶格的潜力。"}
                {step === "cooling" &&
                  "热能缓释，目标分子的过饱和度上升，自发向能量更低的有序晶格结构组装。"}
                {step === "crystallized" &&
                  "基于空间排阻效应，杂质分子由于几何构型与晶胞不匹配而滞留于母液，实现高度纯化。"}
              </p>
            </div>

            <div className="bg-blue-600 p-6 rounded-2xl shadow-lg text-white">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold">系统温度监控</span>
                <span className="text-xl font-mono">{temperature}°C</span>
              </div>

              <div className="h-2 w-full bg-blue-800 rounded-full overflow-hidden relative mb-6 border border-blue-400">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-white"
                  animate={{ width: `${(temperature / 100) * 100}%` }}
                  transition={{ ease: "linear", duration: 0.1 }}
                />
              </div>

              <div className="flex gap-4">
                <button
                  disabled={step !== "idle"}
                  onClick={startHeating}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
                    step === "idle"
                      ? "bg-white text-blue-600 shadow"
                      : "bg-blue-500/50 text-blue-200 cursor-not-allowed"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" /> 启动加热
                  </span>
                </button>
                <button
                  disabled={step !== "dissolved"}
                  onClick={startCooling}
                  className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
                    step === "dissolved"
                      ? "bg-white text-blue-600 shadow"
                      : "bg-blue-500/50 text-blue-200 cursor-not-allowed"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Pause className="w-4 h-4" /> 触发冷却
                  </span>
                </button>
                <button
                  onClick={reset}
                  className="w-10 h-10 flex-shrink-0 rounded-xl bg-blue-500 hover:bg-blue-400 flex items-center justify-center transition-colors shadow"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-[450px] relative bg-slate-900 rounded-3xl border-4 border-white shadow-xl overflow-hidden flex items-end justify-center">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div
                className="absolute w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(#3b82f6 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              ></div>
            </div>

            <div className="absolute bottom-0 w-32 h-6 bg-slate-800 border-t-2 border-slate-600 rounded-t-lg flex justify-center pt-2 z-10">
              <AnimatePresence>
                {(step === "heating" || step === "dissolved") && (
                  <motion.div
                    key="flame"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: [1, 1.1, 1], y: [0, -2, 0] }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      opacity: { duration: 0.3 },
                      scale: { repeat: Infinity, duration: 0.5 },
                      y: { repeat: Infinity, duration: 0.3 },
                    }}
                    className="w-16 h-12 bg-blue-500/50 rounded-full blur-md -mt-10"
                    style={{
                      boxShadow:
                        "0 0 20px 10px rgba(59, 130, 246, 0.4), 0 0 10px 5px rgba(147, 197, 253, 0.6) inset",
                    }}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="relative z-10 w-64 h-80 border-4 border-t-0 border-white/30 rounded-b-3xl mb-6 bg-slate-800/50 backdrop-blur-sm overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-blue-500/10"
                animate={{
                  height: ["60%", "62%", "60%"],
                  backgroundColor:
                    temperature > 60
                      ? "rgba(59, 130, 246, 0.2)"
                      : "rgba(148, 163, 184, 0.1)",
                }}
                transition={{
                  height: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                  backgroundColor: { duration: 1 },
                }}
              >
                <div className="h-[2px] w-full bg-blue-400/30" />
              </motion.div>

              <div className="absolute inset-0 p-4 pb-8">
                {particles.map((p) => {
                  const isCrystal = step === "crystallized" && !p.isImpurity;
                  const isDissolved =
                    step === "heating" ||
                    step === "dissolved" ||
                    (step === "cooling" && temperature > 40) ||
                    (step === "crystallized" && p.isImpurity);

                  const cols = 10;
                  const gridX = 40 + (p.id % cols) * 14;
                  const gridY = 280 - Math.floor(p.id / cols) * 14;

                  const randX = 10 + Math.random() * 200;
                  const randY = 100 + Math.random() * 160;

                  const heapX =
                    100 +
                    (Math.random() - 0.5) * 120 * (1 - Math.random() * 0.5);
                  const heapY = 285 - Math.random() * 40;

                  return (
                    <motion.div
                      key={p.id}
                      className={`absolute w-3 h-3 ${isCrystal ? "rounded-sm rotate-45" : "rounded-full"}`}
                      style={{
                        backgroundColor: p.color,
                        boxShadow: isCrystal ? `0 0 10px ${p.color}80` : "none",
                      }}
                      initial={false}
                      animate={{
                        x: isCrystal ? gridX : isDissolved ? randX : heapX,
                        y: isCrystal ? gridY : isDissolved ? randY : heapY,
                        scale: isCrystal ? 1 : 0.8,
                        opacity: isCrystal ? 1 : 0.8,
                      }}
                      transition={{
                        type: isDissolved ? "spring" : "tween",
                        stiffness: 50,
                        damping: 10,
                        mass: Math.random() * 0.5 + 0.5,
                        duration: isCrystal ? 1.5 + Math.random() : 1,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="absolute top-4 right-4 z-20">
              <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-2 text-[10px] font-mono text-slate-400 flex flex-col gap-1 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-sm rotate-45"></div>{" "}
                  目标晶体
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>{" "}
                  游离杂质
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
