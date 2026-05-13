import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Beaker, ArrowRight } from 'lucide-react';
import TLC from '../components/monitoring/TLC.tsx';
import MassSpec from '../components/monitoring/MassSpec.tsx';

export default function MonitoringPage() {
  const location = useLocation();

  const renderContent = () => {
    const tabId = location.pathname === "/monitoring/mass" ? "mass" : "tlc";
    
    switch (tabId) {
      case "mass": return <MassSpec />;
      default: return <TLC />;
    }
  };

  const isTlcPage = location.pathname === "/monitoring" || location.pathname === "/monitoring/tlc";

  return (
    <div>
      {isTlcPage && (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link to="/monitoring/tlc-simulator" className="block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Beaker className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">TLC 模拟器</h3>
                  <p className="text-blue-100 text-sm">交互式薄层色谱模拟，实践分离原理</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6" />
            </div>
          </Link>
        </div>
      )}

      <div>
        {renderContent()}
      </div>
    </div>
  );
}
