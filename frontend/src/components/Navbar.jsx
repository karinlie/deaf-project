import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import TranscriptionPopup from "./TranscriptionComp"; // Importer popup-komponenten



export default function Navbar() {
    return (
        <nav style={{ 
            display: "flex",
            alignItems: "center",
            padding: "15px 30px",
            background: "#CC0033",
            color: "white", 
            fontSize: "1.25em", 
            fontFamily: "'Poppins', sans-serif",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}>
            <Link 
                to="/assembly" 
                style={{ 
                    marginLeft: "10px", 
                    color: "white", 
                    textDecoration: "none", 
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                🏠 Homepage
            </Link>
        </nav>
    );
}

