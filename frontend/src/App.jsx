import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import PopupAlert from "./components/PopupAlert";
import TranscriptionPopup from "./components/TranscriptionComp"; // ✅ Import floating mic button

function App() {
    return (
        <>
            <Navbar />
            <PopupAlert /> {/* ✅ Always listening for movement */}
            <AppRoutes />
            <TranscriptionPopup /> {/* ✅ Always available */}
        </>
    );
}

export default App;
