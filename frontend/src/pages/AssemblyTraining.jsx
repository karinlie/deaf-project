import React from "react";
import { Container, Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import BuildIcon from "@mui/icons-material/Build"; // Tools Icon
import SafetyDividerIcon from "@mui/icons-material/SafetyDivider"; // Safety Icon
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing"; // Assembly Icon

function AssemblyTraining() {
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
                    height: "40vh", // Reduced height for better layout
                }}
            >
                <Typography variant="h3" gutterBottom>
                    Industrial Assembly Training
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Learn step-by-step assembly techniques and best practices for industrial production.
                </Typography>
            </Box>

            {/* Training Topics Section - moved up */}
            <Box sx={{ my: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Grid container spacing={4} justifyContent="center">
                    
                    {/* Topic 1 - Assembly Techniques */}
                    <Grid item xs={12} sm={4}>
                        <Link to="/assembly-techniques" style={{ textDecoration: "none" }}>
                            <Card sx={{ textAlign: "center", p: 2, cursor: "pointer", transition: "0.3s", "&:hover": { boxShadow: 8, transform: "translateY(-5px)" } }}>
                                <CardContent>
                                    <PrecisionManufacturingIcon sx={{ fontSize: 60, color: "primary.main" }} />
                                    <Typography variant="h6" gutterBottom>
                                        Assembly Techniques
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Learn how to assemble components efficiently and accurately.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>

                    {/* Topic 2 - Safety Procedures */}
                    <Grid item xs={12} sm={4}>
                        <Link to="/safety-welcome" style={{ textDecoration: "none" }}>
                            <Card sx={{ textAlign: "center", p: 2, cursor: "pointer", transition: "0.3s", "&:hover": { boxShadow: 8, transform: "translateY(-5px)" } }}>
                                <CardContent>
                                    <SafetyDividerIcon sx={{ fontSize: 60, color: "secondary.main" }} />
                                    <Typography variant="h6" gutterBottom>
                                        Safety Procedures
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Understand workplace safety and hazard prevention measures.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>

                    {/* Topic 3 - Quality Control */}
                    <Grid item xs={12} sm={4}>
                        <Link to="/quality-welcome" style={{ textDecoration: "none" }}>
                            <Card sx={{ textAlign: "center", p: 2, cursor: "pointer", transition: "0.3s", "&:hover": { boxShadow: 8, transform: "translateY(-5px)" } }}>
                                <CardContent>
                                    <BuildIcon sx={{ fontSize: 60, color: "success.main" }} />
                                    <Typography variant="h6" gutterBottom>
                                        Quality Control
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Learn inspection techniques to maintain product quality.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>

                {/* Heading - Moved Below the Cards */}
                <Typography variant="h5" align="center" gutterBottom sx={{ mt: 5 }}>
                    Which training topic would you like to start with?
                </Typography>
            </Box>
        </Container>
    );
}

export default AssemblyTraining;
