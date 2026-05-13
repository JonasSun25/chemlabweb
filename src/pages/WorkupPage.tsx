import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Quench from '../components/workup/Quench.tsx';
import Extraction from '../components/workup/Extraction.tsx';
import Concentration from '../components/workup/Concentration.tsx';

export default function WorkupPage() {
  const location = useLocation();

  const renderContent = () => {
    const tabId = location.pathname === "/workup/extraction" ? "extraction" 
      : location.pathname === "/workup/concentration" ? "concentration"
      : "quench";
    
    switch (tabId) {
      case "extraction": return <Extraction />;
      case "concentration": return <Concentration />;
      default: return <Quench />;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}
