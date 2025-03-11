import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import StepIndicator from "../../components/StepIndicator";

const AssemblySteps = () => {
    const { stepNumber } = useParams(); // Get step number from URL
    const stepIndex = parseInt(stepNumber, 10) || 0; // Convert to number, default to 0

    const [steps, setSteps] = useState([]);  // Store step data
    const [loading, setLoading] = useState(true); // Handle loading state

    // Fetch data from the JSON file
    useEffect(() => {
        fetch("/data/assemblySteps.json")
            .then((res) => res.json())
            .then((data) => {
                setSteps(data);
                setLoading(false);
            })
            .catch((error) => console.error("Error loading assembly steps:", error));
    }, []);

    // Show loading message while fetching data
    if (loading) {
        return <p>Loading assembly steps...</p>;
    }

    // Handle invalid step index
    if (stepIndex < 0 || stepIndex >= steps.length) {
        return <p>Invalid step. Please go back.</p>;
    }

    const currentStep = steps[stepIndex];

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
                        {currentStep.text}
                    </Typography>

                    {/* Display images for the current step */}
                    <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                        {currentStep.images.map((imgSrc, index) => (
                            <img 
                                key={index}
                                src={imgSrc} 
                                alt={`Step ${stepIndex + 1} - ${index}`}
                                style={{ maxWidth: "300px", height: "auto", borderRadius: "10px" }}
                            />
                        ))}
                    </Box>
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
