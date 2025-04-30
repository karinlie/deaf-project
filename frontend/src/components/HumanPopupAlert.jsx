// components/HumanPopupAlert.jsx
import React, { useEffect } from "react";
import { Modal, Box, Typography } from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

const HumanPopupAlert = ({ open, side, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Modal open={open} onClose={onClose} hideBackdrop>
      <Box
        sx={{
          position: "fixed",
          bottom: 100,
          ...(side === "left"
            ? { left: 20 }
            : side === "right"
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
        {/* Tekst over ikonet */}
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
        </Typography>

        {/* Ikonet */}
        <DirectionsWalkIcon sx={{ fontSize: 60, color: "#1976d2" }} />
      </Box>
    </Modal>
  );
};

export default HumanPopupAlert;
