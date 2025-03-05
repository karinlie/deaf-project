import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlarmDetector from "./pages/AlarmDetector";
import Transcription from "./pages/Transcription";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/alarm" element={<AlarmDetector />} />
                <Route path="/transcription" element={<Transcription />} />
            </Routes>
        </>
    );
}

export default App;
