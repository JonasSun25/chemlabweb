import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Beaker,
  FlaskConical,
  Activity,
  Filter,
  Microscope,
  TestTube,
  ArrowRight,
} from "lucide-react";

const modules = [
  {
    id: "lab-intro",
    title: "有机化学实验室介绍",
    description:
      "实验室环境与安全基础。包含常用的玻璃器皿、常见实验装置介绍、通风橱规范及个人防护装备 (PPE)。",
    icon: Beaker,
    path: "/lab-intro",
    color: "bg-indigo-50 border-indigo-200 text-indigo-700",
    iconColor: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "reaction-setup",
    title: "反应装置搭建",
    description:
      "核心反应设计与操作。无水无氧反应、微量反应、化学计量学、常见反应类型、温度控制、物料添加及搅拌技术。",
    icon: TestTube,
    path: "/reaction-setup",
    color: "bg-orange-50 border-orange-200 text-orange-700",
    iconColor: "bg-orange-100 text-orange-600",
  },
  {
    id: "monitoring",
    title: "反应监控",
    description:
      "反应进程的实时追踪。详细解读 TLC、HPLC、LC-MS 以及 NMR 在反应过程监控中的核心应用。",
    icon: Activity,
    path: "/monitoring",
    color: "bg-emerald-50 border-emerald-200 text-emerald-700",
    iconColor: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "workup",
    title: "反应后处理",
    description:
      "终止反应与初步分离。淬灭 (Quench)、液液萃取、干燥除水、产物过滤与溶剂浓缩旋蒸 (Rotavap)。",
    icon: Filter,
    path: "/workup",
    color: "bg-amber-50 border-amber-200 text-amber-700",
    iconColor: "bg-amber-100 text-amber-600",
  },
  {
    id: "purification",
    title: "产品分离纯化",
    description:
      "高精度的产物纯化技术。深入探讨柱色谱 (Column Chromatography)、重结晶 (Recrystallization) 与常减压蒸馏。",
    icon: FlaskConical,
    path: "/purification",
    color: "bg-blue-50 border-blue-200 text-blue-700",
    iconColor: "bg-blue-100 text-blue-600",
  },
  {
    id: "characterization",
    title: "结构解析与表征",
    description:
      "最终产物的身世证明。核磁共振 (NMR)、质谱 (MS)、红外光谱 (IR) 与旋光度 (Polarimetry) 测定。",
    icon: Microscope,
    path: "/characterization",
    color: "bg-purple-50 border-purple-200 text-purple-700",
    iconColor: "bg-purple-100 text-purple-600",
  },
];

const floatingElements = [
  { icon: FlaskConical, x: "10%", y: "20%", delay: 0, color: "text-blue-400/30", size: 64 },
  { icon: Beaker, x: "85%", y: "15%", delay: 1, color: "text-amber-400/30", size: 56 },
  { icon: TestTube, x: "75%", y: "70%", delay: 2, color: "text-emerald-400/30", size: 48 },
  { icon: Activity, x: "15%", y: "75%", delay: 1.5, color: "text-orange-400/30", size: 72 },
  { icon: Microscope, x: "50%", y: "10%", delay: 0.5, color: "text-purple-400/30", size: 40 },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Animated Hero Section */}
      <div className="relative overflow-hidden bg-slate-50 border-b border-slate-200 pt-24 pb-32 mb-20">
        <div className="absolute inset-0 pointer-events-none">
          {/* Background Gradient Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-pulse" style={{ animationDelay: "1s" }} />
          
          {/* Floating Chemical Elements */}
          {floatingElements.map((element, index) => (
            <motion.div
              key={index}
              className={`absolute ${element.color}`}
              style={{ left: element.x, top: element.y }}
              animate={{
                y: [0, -20, 0],
                rotate: [-5, 5, -5],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: element.delay,
              }}
            >
              <element.icon size={element.size} strokeWidth={1} />
            </motion.div>
          ))}

          {/* Rising Bubbles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              className="absolute bg-blue-400/20 rounded-full blur-[1px]"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: "-5%",
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
              }}
              animate={{
                y: [-20, -800],
                x: [0, Math.random() * 50 - 25],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: Math.random() * 4 + 4,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase border border-blue-200 shadow-sm">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Chemistry Lab Hub
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 drop-shadow-sm">
              有机化学
              <br />
              <span className="text-blue-600 block mt-2">实验技术</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              涵盖从实验室基础建立、反应装置设计、过程监控，直到后处理、分离纯化与最终分子结构解析的全链路规程指导。
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-20">
          {modules.map((mod, index) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={mod.path}
                className="group flex flex-col bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${mod.iconColor}`}
                >
                  <mod.icon className="w-7 h-7" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {mod.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-8 flex-1">
                  {mod.description}
                </p>
                <div className="flex items-center text-sm font-bold text-blue-600 uppercase tracking-widest group-hover:gap-2 transition-all mt-auto">
                  进入模块 <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
