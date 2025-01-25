import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const InteractiveMap = () => {
  const [isInteractive, setIsInteractive] = useState(false);

  const enableInteraction = () => {
    setIsInteractive(true);
  };

  return (
    <Box sx={{ mt: 4, position: "relative", textAlign: "center" }}>
      <Typography
        variant="body1"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 10,
          opacity: isInteractive ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
        onClick={enableInteraction}
      >
        Tap to Enable 360° View
      </Typography>
      <iframe
        src="https://www.google.com/maps/embed?pb=!4v1736521366121!6m8!1m7!1sCAoSLEFGMVFpcFB5bEpwTDdjOE1rR05FbEE1OEYtTVdmYjVwallHelZ4U3RNWDl2!2m2!1d19.34321687361902!2d79.48409377865963!3f267.847756924742!4f4.968064183296065!5f0.7820865974627469"
        width="100%"
        height="500"
        style={{
          border: 0,
          marginTop: "20px",
          borderRadius: "10px",
          pointerEvents: isInteractive ? "auto" : "none",
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>
  );
};

export default InteractiveMap;
