import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import StepIndicator from "../../components/StepIndicator";
// Safety step content
const safetySteps = [
    "Step 1: Wear personal protective equipment (PPE) before starting work.",
    "Step 2: Keep your workspace clean and organized to prevent accidents.",
    "Step 3: Follow proper procedures for handling tools and machinery.",
    "Step 4: Be aware of emergency exits and fire safety protocols.",
    "Step 5: Always report hazards or unsafe conditions to your supervisor.",
    "Step 6: Get familiar with the environment and possible danger",
    "Step 7: Listen to the alert and be careful when something is approaching"
];

const SafetySteps = () => {
    const { stepNumber } = useParams();
    const stepIndex = parseInt(stepNumber, 10) || 0;

    return (
        <>
        
        <Container maxWidth="md">
            <Box sx={{ textAlign: "center", my: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Safety Step {stepIndex + 1}
                </Typography>
                
                {/* Step Indicator Component */}
                <StepIndicator stepIndex={stepIndex} totalSteps={safetySteps.length} /> 
                <Typography variant="h6" color="text.secondary">
                    {safetySteps[stepIndex]}
                </Typography>
            </Box>

            {/* Navigation Buttons */}
<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 10 }}>
    {/* Previous Button */}
    {stepIndex > 0 ? (
        <Button 
            variant="contained" 
            color="secondary" 
            component={Link} 
            to={`/safety-step/${stepIndex - 1}`}
        >
            ⬅ Previous Step
        </Button>
    ) : (
        <Box /> // Tomt element for å beholde spacing
    )}

    <Box sx={{ flexGrow: 1 }} /> {/* Plasserer mellomrom mellom knappene */}

    {/* Next Button */}
    {stepIndex < safetySteps.length - 1 && (
        <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to={`/safety-step/${stepIndex + 1}`}
        >
            Next Step ➡
        </Button>
    )}
</Box>
        </Container>
        </>
    );
};

export default SafetySteps;
