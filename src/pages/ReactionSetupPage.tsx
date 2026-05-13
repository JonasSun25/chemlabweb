import { useLocation } from 'react-router-dom';
import AdvancedSetup from '../components/reaction-setup/AdvancedSetup.tsx';
import TemperatureControl from '../components/reaction-setup/TemperatureControl.tsx';
import Addition from '../components/reaction-setup/Addition.tsx';
import Stirring from '../components/reaction-setup/Stirring.tsx';

export default function ReactionSetupPage() {
  const location = useLocation();

  const renderContent = () => {
    const tabId = location.pathname === "/reaction-setup/temperature" ? "temperature" 
      : location.pathname === "/reaction-setup/addition" ? "addition"
      : location.pathname === "/reaction-setup/stirring" ? "stirring"
      : "advanced";
    
    switch (tabId) {
      case "temperature": return <TemperatureControl />;
      case "addition": return <Addition />;
      case "stirring": return <Stirring />;
      default: return <AdvancedSetup />;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}
