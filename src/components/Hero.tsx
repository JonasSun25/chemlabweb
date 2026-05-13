import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-88px)] flex items-center justify-center overflow-hidden bg-slate-50 text-slate-800 py-20 lg:py-0 border-b border-slate-200">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-3xl mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="inline-block mb-6 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold tracking-widest uppercase border border-blue-200 relative">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              The Principle / 晶体动力学
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-tight">
            重结晶
            <span className="block text-3xl md:text-5xl mt-3 text-blue-600 font-bold mb-2">
              溶解度梯度与分子排列
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            利用混合物中各组分在某种溶剂中的溶解度随温度变化的不同，使目标物质以晶体形式纯粹析出，从而达到分离提纯的经典手段。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex justify-center"
        >
          <a
            href="#principle"
            className="flex flex-col items-center text-slate-400 hover:text-blue-600 transition-colors"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest mb-2 border-b border-transparent hover:border-blue-600">
              探索原理模型
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </a>
        </motion.div>
      </div>

      {/* Hero 3D/Visual Elements (Abstract) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-0 opacity-10">
        <svg viewBox="0 0 800 600" className="w-[800px] h-auto">
          {/* Some abstract geometric shapes representing crystals */}
          <motion.polygon
            points="400,100 500,250 400,400 300,250"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            style={{ originX: "400px", originY: "250px" }}
          />
          <motion.polygon
            points="400,150 460,250 400,350 340,250"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="4"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            style={{ originX: "400px", originY: "250px" }}
          />
        </svg>
      </div>
    </section>
  );
}
