import React, { useState } from "react";
import { Container, Typography, Button, Box, Alert, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const AssemblyWelcome = () => {
    const [feedback, setFeedback] = useState("");

    const sendVibration = async (side) => {
        try {
            const response = await fetch("http://localhost:8000/vibrate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ command: side })
            });

            const data = await response.json();
            setFeedback(data.message || "✅ Vibration sent!");
        } catch (error) {
            console.error(error);
            setFeedback("❌ Failed to send vibration.");
        }

        setTimeout(() => setFeedback(""), 4000);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ textAlign: "center", mt: 6, p: 4, borderRadius: "12px", boxShadow: 3 }}>

               
                {/* 🦕 Main LEGO Welcome Text */}
                <Typography variant="h3" gutterBottom>
                    Welcome to the LEGO Dinosaur Assembly!
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Get ready to build your <strong>LEGO Dinosaur</strong>! <br />
                    Follow the step-by-step guide to assemble it using LEGO bricks.
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Each step will guide you through the process, from gathering the correct pieces
                    to putting everything together.
                </Typography>
                 {/* 🔊 Vibration Test Section */}
                
                <Typography variant="body1" color="text.secondary" paragraph>
                You will feel a vibration on the side where someone is approaching to alert you of their presence.
                    Press the buttons below to try it out!
                </Typography>
                <Stack direction="row" spacing={2} justifyContent="center" mb={3}>
                    <Button variant="outlined" color="error" onClick={() => sendVibration("1")}>
                        Test Left Vibration
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => sendVibration("2")}>
                        Test Right Vibration
                    </Button>
                </Stack>
                {feedback && (
                    <Alert severity="info" sx={{ mb: 3 }}>
                        {feedback}
                    </Alert>
                )}


                {/* 🛠️ Start Button */}
                <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/assembly-step/1"
                    sx={{
                        mt: 3,
                        backgroundColor: "#CC0033",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#990026"
                        }
                    }}
                >
                    Start Building 🛠️
                </Button>
            </Box>
        </Container>
    );
};

export default AssemblyWelcome;
