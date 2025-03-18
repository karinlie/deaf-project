import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const AssemblyWelcome = () => {
    return (
        <>
        <Container maxWidth="md">
            <Box sx={{ textAlign: "center", mt: 6, p: 4, borderRadius: "12px", boxShadow: 3 }}>
                <Typography variant="h3" gutterBottom>
                    Welcome to the LEGO Dinosaur Assembly!
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Get ready to build <strong>LEGO Dinosaur</strong>! <br />
                    Follow the step-by-step guide to assemble your dinosaur from LEGO bricks.
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    Each step will guide you through the process, from gathering the right pieces
                    to putting everything together.
                </Typography>

                {/* Start Button → Takes user to the first step */}
                <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/assembly-step/1" // Navigates to the first assembly step
                    sx={{
                        mt: 3,
                        backgroundColor: "#CC0033", // Same as navbar
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#990026" // Darker red on hover
                        }
                    }}
                >
                    Start Building 🛠️
                </Button>
            </Box>
        </Container>
        </>
    );
};

export default AssemblyWelcome;
