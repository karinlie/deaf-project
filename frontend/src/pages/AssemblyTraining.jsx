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
                    height: "50vh", // Reduced height to move topics up
                }}
            >
                <Typography variant="h3" gutterBottom>
                    Industrial Assembly Training
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                    Learn step-by-step assembly techniques and best practices for industrial production.
                </Typography>
            </Box>

            {/* Training Topics Section */}
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Which training topic would you like to start with?
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {/* Topic 1 - Assembly Techniques (Clickable) */}
                    <Grid item xs={12} sm={4}>
                        <Link to="/assembly-technquies"  style={{ textDecoration: "none" }}>
                            <Card sx={{ textAlign: "center", p: 2, cursor: "pointer", "&:hover": { boxShadow: 6 } }}>
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
                    <Link to="/safety-welcome"  style={{ textDecoration: "none" }}>
                            <Card sx={{ textAlign: "center", p: 2, cursor: "pointer", "&:hover": { boxShadow: 6 } }}>
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
                        <Link to="/quality-welcome"  style={{ textDecoration: "none" }}>
                            <Card sx={{ textAlign: "center", p: 2, cursor: "pointer", "&:hover": { boxShadow: 6 } }}>
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
            </Box>
        </Container>
    );
}

export default AssemblyTraining;
