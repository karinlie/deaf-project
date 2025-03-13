import React from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import FactoryIcon from "@mui/icons-material/Factory"; // Industrial icon
import EngineeringIcon from "@mui/icons-material/Engineering"; // Worker icon
import VerifiedIcon from "@mui/icons-material/Verified"; // Quality check icon


function Home() {
    return (
        <Container maxWidth="lg">
            {/* Hero Section */}
            <Box 
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    height: "60vh",
                }}
            >
                <Typography variant="h2" gutterBottom>
                    Welcome to the Industrial Assembly Training Module
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Learn step-by-step assembly procedures and best practices for efficient manufacturing.
                </Typography>
                <Link to="/assembly" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary" size="large">
                        Get Started
                    </Button>
                </Link>
            </Box>

            {/* Key Features Section */}
            <Box sx={{ my: 6 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Key Features of the Training Module
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {/* Feature 1 */}
                    <Grid item xs={12} sm={4}>
                        <Box textAlign="center">
                            <FactoryIcon sx={{ fontSize: 60, color: "primary.main" }} />
                            <Typography variant="h6" gutterBottom>
                                Real-World Assembly Simulations
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Interactive training with real-world manufacturing scenarios.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Feature 2 */}
                    <Grid item xs={12} sm={4}>
                        <Box textAlign="center">
                            <EngineeringIcon sx={{ fontSize: 60, color: "secondary.main" }} />
                            <Typography variant="h6" gutterBottom>
                                Safety and Compliance Training
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Learn essential safety procedures to avoid workplace hazards.
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Feature 3 */}
                    <Grid item xs={12} sm={4}>
                        <Box textAlign="center">
                            <VerifiedIcon sx={{ fontSize: 60, color: "success.main" }} />
                            <Typography variant="h6" gutterBottom>
                                Quality Control Best Practices
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Understand how to maintain high-quality production standards.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default Home;
