import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Beaker,
  Home,
  FlaskConical,
  Activity,
  Filter,
  Microscope,
  TestTube,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { 
    path: "/", 
    label: "主页", 
    icon: Home,
    subItems: []
  },
  { 
    path: "/lab-intro", 
    label: "化学实验室", 
    icon: Beaker,
    subItems: [
      { path: "/lab-intro", label: "常用玻璃器皿" },
      { path: "/lab-intro/fumehood", label: "通风橱" },
      { path: "/lab-intro/ppe", label: "PPE安全防护" },
      { path: "/lab-intro/auxiliary", label: "实验仪器" },
    ]
  },
  { 
    path: "/reaction-setup", 
    label: "反应搭建", 
    icon: TestTube,
    subItems: [
      { path: "/reaction-setup", label: "高级体系与化学计量" },
      { path: "/reaction-setup/temperature", label: "温度控制" },
      { path: "/reaction-setup/addition", label: "加料极控" },
      { path: "/reaction-setup/stirring", label: "搅拌传质" },
    ]
  },
  { 
    path: "/monitoring", 
    label: "反应监控", 
    icon: Activity,
    subItems: [
      { path: "/monitoring", label: "薄层色谱TLC" },
      { path: "/monitoring/mass", label: "质谱追踪" },
    ]
  },
  { 
    path: "/workup", 
    label: "后处理", 
    icon: Filter,
    subItems: [
      { path: "/workup", label: "淬灭策略" },
      { path: "/workup/extraction", label: "萃取洗涤" },
      { path: "/workup/concentration", label: "干燥浓缩" },
    ]
  },
  { 
    path: "/purification", 
    label: "分离纯化", 
    icon: FlaskConical,
    subItems: [
      { path: "/purification", label: "重结晶" },
      { path: "/purification/column", label: "硅胶柱色谱" },
      { path: "/purification/simulator", label: "柱色谱模拟器" },
      { path: "/purification/distillation", label: "蒸馏" },
    ]
  },
  { 
    path: "/characterization", 
    label: "结构解析", 
    icon: Microscope,
    subItems: [
      { path: "/characterization", label: "核磁矩阵NMR" },
      { path: "/characterization/add", label: "多维图谱" },
      { path: "/characterization/nmr", label: "NMR模拟器" },
    ]
  },
];

export default function MainLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isSubItemActive = (subItems: { path: string }[]) => {
    return subItems.some(item => item.path === location.pathname);
  };

  const getCurrentSubItemLabel = (subItems: { path: string, label: string }[]) => {
    const activeItem = subItems.find(item => item.path === location.pathname);
    return activeItem?.label || subItems[0]?.label || "";
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-800 min-h-screen flex flex-col">
      <nav className="flex items-center justify-start px-2 lg:px-4 py-4 bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm flex-wrap gap-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white rotate-45"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            CHEM<span className="text-blue-600">LAB</span>
          </span>
        </Link>
        <div className="flex gap-1 text-sm font-medium text-slate-500 overflow-x-visible pb-1 max-w-full items-center">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || isSubItemActive(item.subItems);
            const showArrow = index >= 2;
            const hasSubItems = item.subItems.length > 0;
            const currentLabel = hasSubItems ? getCurrentSubItemLabel(item.subItems as { path: string, label: string }[]) : item.label;

            return (
              <div 
                key={item.path} 
                className="flex items-center relative"
                onMouseEnter={() => hasSubItems && setOpenDropdown(item.path)}
                onMouseLeave={() => hasSubItems && setOpenDropdown(null)}
              >
                {showArrow && <ArrowRight className="w-4 h-4 text-slate-300 mx-1 shrink-0" />}
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{currentLabel}</span>
                  {hasSubItems && (
                    <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === item.path ? 'rotate-180' : ''}`} />
                  )}
                </Link>
                
                {hasSubItems && openDropdown === item.path && (
                  <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-[100] min-w-[180px]">
                    {(item.subItems as { path: string, label: string }[]).map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`block px-4 py-2 text-sm transition-colors whitespace-nowrap ${
                          subItem.path === location.pathname
                            ? "bg-blue-600 text-white"
                            : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
      <main className="flex-1">{children}</main>
      <footer className="bg-slate-950 py-12 text-slate-400 text-center text-sm border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            © 2026 Yuanjun Sun
          </p>
        </div>
      </footer>
    </div>
  );
}
