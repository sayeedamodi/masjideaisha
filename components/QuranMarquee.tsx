import React from "react";
import { Box } from "@mui/material";
import { keyframes } from "@mui/system";

const QuranMarquee = () => {
  // Define the marquee animation for left-to-right scrolling
  const marqueeAnimation = keyframes`
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  `;

  return (
    <Box
      sx={{
        backgroundColor: "#f8f9fa",
        color: "#333",
        padding: "12px",
        borderRadius: "8px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
        position: "relative",
        direction: "ltr", // Left-to-right scrolling
      }}
    >
      <Box
        sx={{
          display: "inline-block",
          animation: `${marqueeAnimation} 50s linear infinite`,
          fontSize: "1.3em",
          color : "grey"
        }}
      >
        
        <i>(3:104)</i>
        — Let there be a group among you who call ˹others˺ to goodness, encourage
        what is good, and forbid what is evil—it is they who will be successful.{" "}
        
        
         _اور تم میں ایک جماعت ایسی ہونی چاہیئے جو لوگوں کو نیکی کی طرف بلائے اور اچھے کام کرنے کا حکم دے اور برے کاموں سے منع کرے یہی لوگ ہیں جو نجات پانے والے ہیں
         <i>(3:104)</i>{" "}
        <span style={{ color: "#1b5e20", marginLeft: "5px" }}>
          وَلْتَكُن مِّنكُمْ أُمَّةٌۭ يَدْعُونَ إِلَى ٱلْخَيْرِ وَيَأْمُرُونَ
          بِٱلْمَعْرُوفِ وَيَنْهَوْنَ عَنِ ٱلْمُنكَرِ ۚ وَأُو۟لَـٰٓئِكَ هُمُ
    ٱلْمُفْلِحُونَ 
    <i>(3:104)</i>{" "}
        </span>
      </Box>
    </Box>
  );
};

export default QuranMarquee;

