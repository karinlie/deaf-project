import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlarmDetector from "./pages/AlarmDetector";
import Navbar from "./components/Navbar";
import Transcription from "./pages/Transcription";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/alarm" element={<AlarmDetector />} />
                <Route path="/transcription" element={<Transcription />} />
            </Routes>
        </BrowserRouter>
    );
}
