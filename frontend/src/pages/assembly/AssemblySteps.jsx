import React from "react";
import { Container, Typography, Button, Box} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import StepIndicator from "../../components/StepIndicator";

// Step content
const steps = [
    "Gather all required LEGO pieces.",
    "Assemble the base of the dinosaur.",
    "Attach the legs securely.",
    "Build the body structure.",
    "Add the arms and tail.",
    "Finish with the head and details."
];

const AssemblySteps = () => {
    const { stepNumber } = useParams(); // Get step from URL
    const stepIndex = parseInt(stepNumber, 10) || 0; // Convert to number, default to 0

    return (
        <>
        <Navbar />
        {/* Step Indicator Component */}
        <Container maxWidth="md">
            <Box sx={{ textAlign: "center", my: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Assembly Step {stepIndex + 1}
                </Typography>
                
                <StepIndicator stepIndex={stepIndex} totalSteps={steps.length} />   
                
                <Typography variant="h6" color="text.secondary">
                    {steps[stepIndex]}
                </Typography>
            </Box>

            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                {/* Previous Button */}
                {stepIndex > 0 && (
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        component={Link} 
                        to={`/assembly-step/${stepIndex - 1}`}
                    >
                        Previous Step
                    </Button>
                )}

                {/* Next Button */}
                {stepIndex < steps.length - 1 && (
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component={Link} 
                        to={`/assembly-step/${stepIndex + 1}`}
                    >
                        Next Step
                    </Button>
                )}
            </Box>
        </Container>
        </>

    );
};

export default AssemblySteps;
