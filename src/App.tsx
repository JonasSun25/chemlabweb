import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LabIntroPage from "./pages/LabIntroPage";
import ReactionSetupPage from "./pages/ReactionSetupPage";
import MonitoringPage from "./pages/MonitoringPage";
import TLCSimulatorPage from "./pages/TLCSimulatorPage";
import WorkupPage from "./pages/WorkupPage";
import ExtractionSimulatorPage from "./pages/ExtractionSimulatorPage";
import PurificationPage from "./pages/PurificationPage";
import ColumnSimulatorPage from "./pages/ColumnSimulatorPage";
import CharacterizationPage from "./pages/CharacterizationPage";
import NMRPage from "./pages/NMRPage";

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/lab-intro" element={<LabIntroPage />} />
          <Route path="/lab-intro/fumehood" element={<LabIntroPage />} />
          <Route path="/lab-intro/ppe" element={<LabIntroPage />} />
          <Route path="/lab-intro/auxiliary" element={<LabIntroPage />} />
          <Route path="/reaction-setup" element={<ReactionSetupPage />} />
          <Route path="/reaction-setup/temperature" element={<ReactionSetupPage />} />
          <Route path="/reaction-setup/addition" element={<ReactionSetupPage />} />
          <Route path="/reaction-setup/stirring" element={<ReactionSetupPage />} />
          <Route path="/monitoring" element={<MonitoringPage />} />
          <Route path="/monitoring/mass" element={<MonitoringPage />} />
          <Route path="/monitoring/adv" element={<MonitoringPage />} />
          <Route path="/monitoring/tlc-simulator" element={<TLCSimulatorPage />} />
          <Route path="/workup" element={<WorkupPage />} />
          <Route path="/workup/extraction" element={<WorkupPage />} />
          <Route path="/workup/concentration" element={<WorkupPage />} />
          <Route path="/workup/extraction-simulator" element={<ExtractionSimulatorPage />} />
          <Route path="/purification" element={<PurificationPage />} />
          <Route path="/purification/column" element={<PurificationPage />} />
          <Route path="/purification/simulator" element={<ColumnSimulatorPage />} />
          <Route path="/purification/distillation" element={<PurificationPage />} />
          <Route path="/characterization" element={<CharacterizationPage />} />
          <Route path="/characterization/add" element={<CharacterizationPage />} />
          <Route path="/characterization/nmr" element={<NMRPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
