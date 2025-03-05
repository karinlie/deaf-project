import React from "react";
import { Typography, Box } from "@mui/material";

const StepIndicator = ({ stepIndex, totalSteps }) => {
    return (
        <Box sx={{ textAlign: "center", my: 2 }}>
            <Typography variant="body1" color="text.secondary">
                Step {stepIndex + 1} of {totalSteps}
            </Typography>
        </Box>
    );
};

export default StepIndicator;
