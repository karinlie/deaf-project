import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import TranscriptionPopup from "./TranscriptionComp"; // Importer popup-komponenten



export default function Navbar() {
    return (
        <nav style={{ 
            padding: "20px", 
            background: "#333", 
            color: "white", 
            margin: "0px", 
            fontSize: "1.25em", 
            fontFamily: "'Poppins', sans-serif"
        }}>
            <Link to="/assembly" style={{ margin: "0.5em", color: "white", textDecoration: "none" }}>🏠 Home</Link>
            <Link to="/alarm" style={{ margin: "0.5em", color: "white", textDecoration: "none" }}>🚨 Alarm Detection</Link>
        </nav>
    );
}

