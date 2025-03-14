import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Resets default browser styles
import theme from "./style/Theme"; // ✅ Import the theme

import Navbar from "./components/Navbar";
import AppRoutes from "./routes";
import PopupAlert from "./components/PopupAlert";
import TranscriptionPopup from "./components/TranscriptionComp"; // ✅ Import floating mic button

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* ✅ Ensures a clean and consistent UI */}
            <Navbar />
            <PopupAlert /> {/* ✅ Always listening for movement */}
            <AppRoutes />
            <TranscriptionPopup /> {/* ✅ Always available */}
        </ThemeProvider>
    );
}

export default App;
