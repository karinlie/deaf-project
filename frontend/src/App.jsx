import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // Resets default browser styles
import theme from "./style/Theme"; 

import Navbar from "./components/Navbar";
import AppRoutes from "./routes";

import TranscriptionPopup from "./components/TranscriptionComp"; 
import AlertHuman from "./components/AlertHuman";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> 
            <Navbar />
            {/* <PopupAlert />  */}
            {/* <AlertHuman /> */}
            <AppRoutes />
            <TranscriptionPopup /> 
        </ThemeProvider>
    );
}

export default App;
