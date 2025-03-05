import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";


const SafetyWelcome = () => {
    return (
        <>
       
        <Container maxWidth="md">
            <Box sx={{ textAlign: "center", mt: 6, p: 4, borderRadius: "12px", boxShadow: 3 }}>
                <Typography variant="h3" gutterBottom>
                    Welcome to Safety Procedures Training!
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Safety is a **top priority** when working with industrial assembly. 
                    This guide will take you through the most important **workplace safety rules** 
                    and how to prevent hazards.
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Follow each step carefully and learn how to ensure a safe and efficient 
                    work environment. Let's get started!
                </Typography>

                {/* Start Button → Navigates to Safety Steps */}
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    component={Link}
                    to="/safety-step/0" // Navigates to first safety step
                    sx={{ mt: 3 }}
                >
                    Start Learning 🛠️
                </Button>
            </Box>
        </Container>
        </>
    );
};

export default SafetyWelcome;
