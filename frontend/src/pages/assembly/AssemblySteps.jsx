import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import StepIndicator from "../../components/StepIndicator";

const AssemblySteps = () => {
    const { stepNumber } = useParams(); 
    const stepIndex = parseInt(stepNumber, 10) || 0; 

    const [steps, setSteps] = useState([]);  
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetch("/data/assemblySteps.json")
            .then((res) => res.json())
            .then((data) => {
                setSteps(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error loading assembly steps:", error));
    }, []);

    if (loading) {
        return <p>Loading assembly steps...</p>;
    }

    if (stepIndex < 0 || stepIndex >= steps.length) {
        return <p>Invalid step. Please go back.</p>;
    }

    const currentStep = steps[stepIndex];

    return (
        <>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", my: 4 }}>
                    <Typography variant="h3" gutterBottom>
                        Assembly Step {stepIndex + 1}
                    </Typography>

                    <StepIndicator stepIndex={stepIndex} totalSteps={steps.length} />

                    <Typography variant="h5" color="black" sx={{ mt: 2 }}>
                        {currentStep.text}
                    </Typography>

                    {/* 📌 Image Section with Headings */}
                    <Box sx={{ mt: 8, display: "flex", justifyContent: "center", gap: 15, flexWrap: "wrap" }}>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="subtitle1"  color="text.secondary">
                                🧱 Make sure you have these bricks
                            </Typography>
                            <img 
                                src={currentStep.images[0]} 
                                alt={`Step ${stepIndex + 1} - Parts`} 
                                style={{ width: "100%", maxWidth: "800px", height: "auto", borderRadius: "10px", marginTop: "10px" }}
/>
                        </Box>

                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="subtitle1" fontWeight="bold" color="black">
                                🔨 Assemble like this
                            </Typography>
                            <img 
                                src={currentStep.images[1]} 
                                alt={`Step ${stepIndex + 1} - Assembly`} 
                                style={{ width: "100%", maxWidth: "800px", height: "auto", borderRadius: "10px", marginTop: "10px" }}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Navigation Buttons */}
<Box sx={{ display: "flex", justifyContent: "space-between", mt: 15 }}>
    {stepIndex > 0 && (
        <Button 
            variant="contained" 
            color="secondary" 
            component={Link} 
            to={`/assembly-step/${stepIndex - 1}`}
            sx={{ flexGrow: 0 }} // Sikrer at knappen holder sin posisjon
        >
            ⬅ Previous Step
        </Button>
    )}
    
    <Box sx={{ flexGrow: 1 }} /> {/* Plasserer mellomrom mellom knappene */}

    {stepIndex < steps.length - 1 && (
        <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to={`/assembly-step/${stepIndex + 1}`}
            sx={{ flexGrow: 0 }} // Holder "Next Step" til høyre
        >
            Next Step ➡
        </Button>
    )}
</Box>

            </Container>
        </>
    );
};

export default AssemblySteps;
