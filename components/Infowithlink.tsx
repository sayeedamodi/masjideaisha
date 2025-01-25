import React, { useState } from "react";
import { IconButton, Typography, Link } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const InfoWithLink: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false); // State to toggle the visibility of the information

  const toggleInfo = () => {
    setShowInfo(true); // Show the info when the icon is clicked

    // Hide the info after 2 seconds
    setTimeout(() => {
      setShowInfo(false);
    }, 5000);
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Information Icon Button */}
      <IconButton
        onClick={toggleInfo}
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          fontSize: "1rem", // Icon size
          color: "lightgrey", // Icon color (light grey)
        }}
      >
        <InfoIcon />
      </IconButton>

      {/* Display Info when clicked */}
      {showInfo && (
        <Typography
          sx={{
            position: "absolute",
            top: 0, // Move it slightly up
            left: 1, // Move it to the extreme left
            fontSize: "0.75rem", // Smaller font size
            color: "text.secondary", // Light grey color
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Slight background for readability
            padding: "5px 10px",
            borderRadius: "5px",
            maxWidth: "300px", // Ensure the text doesn't overflow
          }}
        >
          source:{" "}
          <Link
            href="https://www.timeanddate.com/astronomy/@1265996"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: "text.secondary" }}
          >
            clickhere 
          </Link>{" "}
          (diff +1/-1 minute may occur).
          <br />
        </Typography>
      )}
    </div>
  );
};

export default InfoWithLink;
