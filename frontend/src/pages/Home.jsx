import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>🏠 Welcome!</h1>
            <p>This is a real-time alarm detection system.</p>
            <Link to="/alarm">Go to Alarm Detector</Link>
        </div>
    );
}
