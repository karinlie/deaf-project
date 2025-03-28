import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AlertHuman = () => {
  const [movementDetected, setMovementDetected] = useState(false);
  const API_URL = "http://localhost:8000/detection/";

  // Fetch sensor data from FastAPI
  const fetchSensorData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("Received sensor data:", data);

      if (data.movement_alert === true) {
        setMovementDetected(true);
      }
    } catch (error) {
      console.error("❌ Error fetching sensor data:", error);
    }
  };

  // Auto-fetch sensor data every 1 second
  useEffect(() => {
    const interval = setInterval(fetchSensorData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Dialog open={movementDetected} onClose={() => setMovementDetected(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        ⚠️ Human alert!
        <IconButton
          aria-label="close"
          onClick={() => setMovementDetected(false)}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1">
          🚨 Warning: Movement detected by the Computer vision sensor. Stay alert!
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setMovementDetected(false)} color="primary" variant="contained">
          Dismiss
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertHuman;
