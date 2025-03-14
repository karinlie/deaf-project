import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#CC0033", // Your Navbar & Button Color
            dark: "#990026", // Darker shade for hover effects
            contrastText: "#FFFFFF", // White text on buttons
        },
    },
    typography: {
        fontFamily: "'Poppins', sans-serif",
        h3: {
            fontWeight: 700,
        },
        h6: {
            color: "text.secondary",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    textTransform: "none",
                },
            },
        },
    },
});

export default theme;
