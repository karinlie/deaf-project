import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import StepIndicator from "../../components/StepIndicator";  

const qualitySteps = [
    "Step 1: Understand product specifications before beginning inspection.",
    "Step 2: Check for defects and irregularities in materials.",
    "Step 3: Verify proper assembly of all components.",
    "Step 4: Make sure that all pieces sit tight"
];

const QualitySteps = () => {
    const { stepNumber } = useParams();
    const stepIndex = parseInt(stepNumber, 10);

    // ✅ Ensure stepIndex is valid
    if (isNaN(stepIndex) || stepIndex < 0 || stepIndex >= qualitySteps.length) {
        return (
            <Container maxWidth="md" sx={{ textAlign: "center", my: 4 }}>
                <Typography variant="h4" color="error">
                    ❌ Invalid Step Number
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    Please go back and select a valid step.
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/quality-step/0" sx={{ mt: 2 }}>
                    🔄 Go to First Step
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: "center", my: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Quality Control Step {stepIndex + 1}
                </Typography>

                {/* Step Indicator Component */}
                <StepIndicator stepIndex={stepIndex} totalSteps={qualitySteps.length} />

                <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
                    {qualitySteps[stepIndex]}
                </Typography>

                {/* ✅ Image with Text Below - FIXED */}
                <Box sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    mt: 4,
                    textAlign: "center"  // ✅ Ensures text is centered under the image
                }}>
                    <img 
                        src={`/data/images/dino.jpg`}  
                        alt="Dinosaur Quality Check" 
                        style={{ 
                            width: "300px", 
                            borderRadius: "10px", 
                            boxShadow: "2px 2px 10px rgba(0,0,0,0.2)" 
                        }} 
                    />
                    <Typography 
                        variant="h6" 
                        color="text.primary" 
                        sx={{ 
                            mt: 2, 
                            
                            display: "block", // ✅ Ensures text is treated as a block element
                            width: "100%", 
                            textAlign: "center"
                        }}
                    >
                        This is how it should look like.
                    </Typography>
                </Box>
            </Box>

            {/* ✅ Navigation Buttons (Next Button Aligned to Right) */}
            <Box sx={{ display: "flex", justifyContent: stepIndex > 0 ? "space-between" : "flex-end", mt: 5 }}>
                {stepIndex > 0 && (
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        component={Link} 
                        to={`/quality-step/${stepIndex - 1}`}
                    >
                        ⬅ Previous Step
                    </Button>
                )}
                <Box sx={{ flexGrow: 1 }} />  {/* ✅ Adds spacing between buttons */}
                {stepIndex < qualitySteps.length - 1 && (
                    <Button 
                        variant="contained" 
                        color="primary" 
                        component={Link} 
                        to={`/quality-step/${stepIndex + 1}`}
                    >
                        Next Step ➡
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default QualitySteps;
