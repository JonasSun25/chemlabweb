import React from "react";
import { motion } from "motion/react";
import { Target, TrendingUp, Droplets } from "lucide-react";

export default function Principle() {
  return (
    <section
      id="principle"
      className="py-16 bg-white border-y border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
            Core Theory
          </h2>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">
            科学结晶原理
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto text-center leading-relaxed">
            利用固体混合物中目标成分溶解度随温度变化的显著差异，实现从液相到固相的高效分离与纯化。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <FeatureBlock
              icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
              title="溶解度曲线的魔法"
              description="大多数固体物质的溶解度随温度升高而增大。高温时，物质均溶解；冷却时，目标物质溶解度急剧下降析出。"
            />
            <FeatureBlock
              icon={<Target className="w-5 h-5 text-blue-600" />}
              title="选择性结晶"
              description="杂质含量少，冷却后浓度未达饱和，留在母液中，保证纯度。"
            />
            <FeatureBlock
              icon={<Droplets className="w-5 h-5 text-blue-600" />}
              title="晶格的排他性"
              description="晶体生长具有高度有序的晶格结构，结构不同的杂质分子难以掺入其中。"
            />
          </motion.div>

          {/* Solubility graph placeholder/visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900 rounded-3xl p-6 border-4 border-white shadow-2xl relative overflow-hidden flex flex-col justify-center text-white"
          >
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute w-full h-full"
                style={{
                  backgroundImage:
                    "radial-gradient(#3b82f6 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              ></div>
            </div>
            <h3 className="text-sm font-semibold mb-6 flex items-center justify-center gap-2 relative z-10">
              <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]"></span>{" "}
              目标物质
              <span className="w-2 h-2 rounded-full bg-slate-400 ml-4"></span>{" "}
              杂质
            </h3>

            {/* SVG Graph */}
            <div className="relative w-full aspect-video rounded-lg p-2 font-mono text-xs z-10">
              <svg
                viewBox="0 0 400 250"
                className="w-[100%] h-[100%] overflow-visible"
              >
                {/* Axes */}
                <line
                  x1="40"
                  y1="210"
                  x2="380"
                  y2="210"
                  stroke="#475569"
                  strokeWidth="2"
                />
                <line
                  x1="40"
                  y1="210"
                  x2="40"
                  y2="20"
                  stroke="#475569"
                  strokeWidth="2"
                />

                {/* Labels */}
                <text x="35" y="15" fill="#94a3b8" textAnchor="middle">
                  溶解度
                </text>
                <text x="380" y="225" fill="#94a3b8" textAnchor="end">
                  温度
                </text>
                <text x="70" y="225" fill="#94a3b8" textAnchor="middle">
                  冷 (T1)
                </text>
                <text x="320" y="225" fill="#94a3b8" textAnchor="middle">
                  热 (T2)
                </text>

                <line
                  x1="70"
                  y1="210"
                  x2="70"
                  y2="215"
                  stroke="#475569"
                  strokeWidth="2"
                />
                <line
                  x1="320"
                  y1="210"
                  x2="320"
                  y2="215"
                  stroke="#475569"
                  strokeWidth="2"
                />

                {/* Target Product Curve */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  d="M 40,200 Q 200,190 340,40"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="3"
                />

                {/* Impurity Line (Low concentration, assumes doesn't hit saturation) */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  d="M 40,180 L 340,170"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Working points */}
                <motion.circle
                  cx="320"
                  cy="55"
                  r="4"
                  fill="#60a5fa"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                />
                <motion.text
                  x="310"
                  y="45"
                  fill="#60a5fa"
                  textAnchor="end"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  热溶完全
                </motion.text>

                <motion.circle
                  cx="70"
                  cy="195"
                  r="4"
                  fill="#60a5fa"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                />
                <motion.text
                  x="80"
                  y="185"
                  fill="#60a5fa"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 2.2 }}
                >
                  冷却析出
                </motion.text>

                {/* Connecting lines */}
                <motion.line
                  x1="320"
                  y1="55"
                  x2="70"
                  y2="195"
                  stroke="#94a3b8"
                  strokeDasharray="2 2"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.5 }}
                  transition={{ delay: 2.5 }}
                />
              </svg>
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center pb-12 w-full">
              <p className="text-blue-400 font-mono text-[10px] tracking-widest uppercase">
                Solubility Gradient Model
              </p>
              <div className="flex gap-1 justify-center mt-2">
                <div className="w-12 h-1 bg-blue-500"></div>
                <div className="w-4 h-1 bg-slate-700"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 transition-all hover:shadow-md">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
