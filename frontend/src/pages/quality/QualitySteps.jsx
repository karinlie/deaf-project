import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";  // Correct path
import StepIndicator from "../../components/StepIndicator";  // Correct path

const qualitySteps = [
    "Step 1: Understand product specifications before beginning inspection.",
    "Step 2: Check for defects and irregularities in materials.",
    "Step 3: Measure dimensions to ensure accuracy.",
    "Step 4: Verify proper assembly of all components.",
    "Step 5: Perform a final quality assurance check before completion.",
];

const QualitySteps = () => {
    const { stepNumber } = useParams();
    const stepIndex = parseInt(stepNumber, 10) || 0;

    return (
        <>
            <Navbar /> {/* Navbar inside the page */}
            <Container maxWidth="md">
                <Box sx={{ textAlign: "center", my: 4 }}>
                    <Typography variant="h3" gutterBottom>
                        Quality Control Step {stepIndex + 1}
                    </Typography>

                    {/* Step Indicator Component */}
                    <StepIndicator stepIndex={stepIndex} totalSteps={qualitySteps.length} />

                    <Typography variant="h6" color="text.secondary">
                        {qualitySteps[stepIndex]}
                    </Typography>
                </Box>

                {/* Navigation Buttons */}
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                    {stepIndex > 0 && (
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            component={Link} 
                            to={`/quality-step/${stepIndex - 1}`}
                        >
                            Previous Step
                        </Button>
                    )}
                    {stepIndex < qualitySteps.length - 1 && (
                        <Button 
                            variant="contained" 
                            color="primary" 
                            component={Link} 
                            to={`/quality-step/${stepIndex + 1}`}
                        >
                            Next Step
                        </Button>
                    )}
                </Box>

                {/* Home Button */}
                <Box sx={{ textAlign: "center", mt: 4 }}>
                    <Button 
                        variant="outlined" 
                        color="error" 
                        component={Link} 
                        to="/" 
                    >
                        Home 🏠
                    </Button>
                </Box>
            </Container>
        </>
    );
};

export default QualitySteps;
