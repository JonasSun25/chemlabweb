import { useLocation } from 'react-router-dom';
import Recrystallization from '../components/purification/Recrystallization.tsx';
import ColumnChromatography from '../components/purification/ColumnChromatography.tsx';
import Distillation from '../components/purification/Distillation.tsx';

export default function PurificationPage() {
  const location = useLocation();

  const renderContent = () => {
    const tabId = location.pathname === "/purification/column" ? "column" 
      : location.pathname === "/purification/distillation" ? "distillation"
      : "recrystallization";
    
    switch (tabId) {
      case "column": return <ColumnChromatography />;
      case "distillation": return <Distillation />;
      default: return <Recrystallization />;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}
