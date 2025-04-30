// import React, { useState, useEffect } from "react";
// import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton, Typography } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const AlertHuman = () => {
//   const [movementDetected, setMovementDetected] = useState(false);
//   const API_URL = "http://localhost:8000/detection/";
//   const [movementSide, setMovementSide] = useState("");

//   // Fetch sensor data from FastAPI
//   const fetchSensorData = async () => {
//     try {
//       const response = await fetch(API_URL);
//       const data = await response.json();
//       console.log("Received sensor data:", data);

//       if (data.movement_alert === true) {
//         setMovementDetected(true);
//         setMovementSide(data.position);
//       }
//     } catch (error) {
//       console.error("❌ Error fetching sensor data:", error);
//     }
//   };

//   // Auto-fetch sensor data every 1 second
//   useEffect(() => {
//     const interval = setInterval(fetchSensorData, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (movementDetected) {
//       const timer = setTimeout(() => setMovementDetected(false), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [movementDetected]);
  
//   return (
//     <Dialog
//   open={movementDetected}
//   onClose={() => setMovementDetected(false)}
//   maxWidth="sm"
//   fullWidth
//   PaperProps={{
//     sx: {
//       position: "fixed",
//       bottom: 20,
//       ...(movementSide === "left"
//         ? { left: 20 }
//         : movementSide === "right"
//         ? { right: 20 }
//         : { left: "50%", transform: "translateX(-50%)" })
//     }
//   }}
// >

//       <DialogTitle>
//         ⚠️ Human alert!
//         <IconButton
//           aria-label="close"
//           onClick={() => setMovementDetected(false)}
//           sx={{ position: "absolute", right: 8, top: 8 }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent>
//         <Typography variant="body1">
//           🚨 Warning: Movement detected on the <strong>{movementSide}</strong> side. Stay alert!
//         </Typography>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={() => setMovementDetected(false)} color="primary" variant="contained">
//           Dismiss
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AlertHuman;

// components/AlertHuman.jsx
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";


const AlertHuman = () => {
  const [movementDetected, setMovementDetected] = useState(false);
  const [movementSide, setMovementSide] = useState("");
  const API_URL = "http://localhost:8000/detection/";

  // Hent data fra backend hvert sekund
  const fetchSensorData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("📡 Received sensor data:", data);

      if (data.movement_alert === true) {
        setMovementDetected(true);
        setMovementSide(data.position); // "left" or "right"
      }
    } catch (error) {
      console.error("❌ Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchSensorData, 1000);
    return () => clearInterval(interval);
  }, []);

  // Lukk popup automatisk etter 4 sekunder
  useEffect(() => {
    if (movementDetected) {
      const timer = setTimeout(() => setMovementDetected(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [movementDetected]);

  return (
    <Modal open={movementDetected} onClose={() => setMovementDetected(false)} hideBackdrop>
        <Box
        sx={{
          position: "fixed",
          bottom: 100,
          ...(movementSide=== "left"
            ? { left: 20 }
            : movementSide === "right"
            ? { right: 20 }
            : { left: "50%", transform: "translateX(-50%)" }),
          bgcolor: "#e3f2fd",
          borderRadius: "16px",
          p: 2,
          px: 2.5,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1500,
        }}
      >
        {/* Tekst over ikonet
        <Typography
          variant="body2"
          sx={{
            color: "#333",
            fontWeight: "500",
            fontSize: "0.9rem",
            mb: 0.8,
            textAlign: "center",
          }}
        >
          Worker detected on the {side}
        </Typography> */}

        {/* Ikonet */}
        <DirectionsWalkIcon sx={{ fontSize: 100, color: "#1976d2" }} />
      </Box>
    </Modal>
  );
    {/* <Box
      sx={{
        position: "fixed",
        bottom: 150,
        ...(movementSide === "left"
          ? { left: 20 }
          : movementSide === "right"
          ? { right: 20 }
          : { left: "50%", transform: "translateX(-50%)" }),
        bgcolor: "#e3f2fd",
        px: 2,
        py: 1,
        borderRadius: 2,
        boxShadow: 6,
        border: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: 160,
       
      }}
    >
      {/* <Typography
        variant="body2"
        sx={{  mb: 1, textAlign: "center" }}
      >
        Worker detected on the {movementSide}
      </Typography> */}
      // <DirectionsWalkIcon sx={{ fontSize: 100, color: "#1976d2" }} />
  //   </Box>
  // </Modal> */}
  // );
};

export default AlertHuman;


