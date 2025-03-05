import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes"; // Importerer alle rutene

function App() {
    return (
       <>
            <Navbar />
            <AppRoutes /> {/* Bruker AppRoutes her */}
            </>
    );
}

export default App;
