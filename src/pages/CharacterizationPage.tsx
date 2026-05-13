import { useLocation } from 'react-router-dom';
import NMR from '../components/characterization/NMR.tsx';
import AdditionalSpecs from '../components/characterization/AdditionalSpecs.tsx';

export default function CharacterizationPage() {
  const location = useLocation();

  const renderContent = () => {
    const tabId = location.pathname === "/characterization/add" ? "add" 
      : "nmr";
    
    switch (tabId) {
      case "add": return <AdditionalSpecs />;
      default: return <NMR />;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}
