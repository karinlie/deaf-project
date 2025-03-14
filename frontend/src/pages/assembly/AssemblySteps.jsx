import React, { useState, useEffect } from "react";
import { Container, Typography, Button, Box, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const AssemblyStep = () => {
    const { stepNumber } = useParams(); // Get current step from URL
    const [stepData, setStepData] = useState(null);

    useEffect(() => {
        fetch("/data/assemblySteps.json")  // ✅ Fetch JSON from public/data/
            .then(response => response.json())
            .then(data => {
                const step = data.find(s => s.id === parseInt(stepNumber));
                setStepData(step);
            })
            .catch(error => console.error("Error loading JSON:", error));
    }, [stepNumber]);

    if (!stepData) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container maxWidth="lg">
            {/* Header Section */}
            <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    Assembly Step {stepData.id}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Step {stepData.id} of 8
                </Typography>
                <Typography variant="h5" sx={{ mt: 2 }}>
                    {stepData.text}
                </Typography>
            </Box>

            {/* Images Section */}
            <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
                {stepData.images.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box sx={{ textAlign: "center" }}>
                            <img 
                                src={image} 
                                alt={`Step ${stepData.id} Image ${index + 1}`} 
                                style={{ 
                                    maxWidth: "100%", 
                                    height: "auto", 
                                    transition: "0.3s", 
                                    cursor: "pointer",
                                    "&:hover": { transform: "scale(1.1)" } 
                                }}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
                {stepData.id > 1 && (
                    <Button
                        variant="contained"
                        component={Link}
                        to={`/assembly-step/${stepData.id - 1}`}
                        sx={{
                            backgroundColor: "#CCCCCC",
                            color: "black",
                            padding: "12px 24px",
                            fontSize: "1.2rem",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            "&:hover": { backgroundColor: "#AAAAAA" },
                        }}
                    >
                        ← Previous Step
                    </Button>
                )}

                {stepData.id < 8 && (
                    <Button
                        variant="contained"
                        component={Link}
                        to={`/assembly-step/${stepData.id + 1}`}
                        sx={{
                            backgroundColor: "#CC0033",
                            color: "white",
                            padding: "12px 24px",
                            fontSize: "1.2rem",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            "&:hover": { backgroundColor: "#990026" },
                        }}
                    >
                        Next Step →
                    </Button>
                )}
            </Box>
        </Container>
    );
};

export default AssemblyStep;
