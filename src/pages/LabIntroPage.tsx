import { useLocation } from "react-router-dom";
import Glassware from "../components/lab-intro/Glassware.tsx";
import FumeHoods from "../components/lab-intro/FumeHoods.tsx";
import PPE from "../components/lab-intro/PPE.tsx";
import AuxiliaryEquipment from "../components/lab-intro/AuxiliaryEquipment.tsx";

export default function LabIntroPage() {
  const location = useLocation();

  const renderContent = () => {
    const tabId = location.pathname === "/lab-intro/fumehood" ? "fumehood" 
      : location.pathname === "/lab-intro/ppe" ? "ppe"
      : location.pathname === "/lab-intro/auxiliary" ? "auxiliary"
      : "glassware";
    
    switch (tabId) {
      case "fumehood": return <FumeHoods />;
      case "ppe": return <PPE />;
      case "auxiliary": return <AuxiliaryEquipment />;
      default: return <Glassware />;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}
