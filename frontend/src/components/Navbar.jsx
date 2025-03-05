import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav style={{ padding: "10px", background: "#333", color: "white" }}>
            <Link to="/" style={{ margin: "10px", color: "white" }}>🏠 Home</Link>
            <Link to="/alarm" style={{ margin: "10px", color: "white" }}>🚨 Alarm Detection</Link>
            <Link to="/transcription" style={{ margin: "10px", color: "white" }}>🎙️ Transcription</Link>
        </nav>
    );
}
