import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar"; // Navbar component

const QualityWelcome = () => {
    return (
        <>
        <Container maxWidth="md">
            <Box sx={{ textAlign: "center", mt: 6, p: 4, borderRadius: "12px", boxShadow: 3 }}>
                <Typography variant="h3" gutterBottom>
                    Welcome to Quality Control Training!
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Ensuring the highest **quality standards** is key to great assembly work.  
                    This guide will show you **how to inspect** and **maintain product quality** throughout the process.
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Follow these steps to learn proper inspection techniques and quality assurance 
                    practices. Let's begin!
                </Typography>

                {/* Start Button → Navigates to Quality Control Steps */}
                <Button
                    variant="contained"
                    color="success"
                    size="large"
                    component={Link}
                    to="/quality-step/0" // Navigates to first quality step
                    sx={{ mt: 3 }}
                >
                    Start Learning ✅
                </Button>
            </Box>
        </Container>
        </>
    );
};

export default QualityWelcome;
