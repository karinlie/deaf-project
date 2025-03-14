import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlarmDetector from "./pages/AlarmDetector";
import Transcription from "./pages/Transcription";
import AssemblyTraining from "./pages/AssemblyTraining";
import AssemblySteps from "./pages/assembly/AssemblySteps";   
import AssemblyWelcome from "./pages/assembly/AssemblyWelcome"; 
import SafetyWelcome from "./pages/safety/SafetyWelcome"; // New Import
import SafetySteps from "./pages/safety/SafetySteps"; // New Import
import QualityWelcome from "./pages/quality/QualityWelcome";
import QualitySteps from "./pages/quality/QualitySteps";


function AppRoutes() {
    return (
        
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/alarm" element={<AlarmDetector />} />
                <Route path="/transcription" element={<Transcription />} />
                <Route path="/assembly" element={<AssemblyTraining />} />
                <Route path= "/assembly-techniques" element={<AssemblyWelcome />}/>
                <Route path="/assembly-step/:stepNumber"  element={<AssemblySteps />} />
                <Route path="/safety-welcome" element={<SafetyWelcome />} /> {/* New Route */}
                <Route path="/safety-step/:stepNumber" element={<SafetySteps />} /> {/* New Route */}
                <Route path="/quality-welcome" element={<QualityWelcome />} />
                <Route path="/quality-step/:stepNumber" element={<QualitySteps />} />
            </Routes>
        
    );
}
export default AppRoutes;
