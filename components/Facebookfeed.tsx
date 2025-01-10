import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import AOS from 'aos';
import 'aos/dist/aos.css';
const FacebookFeedEmbed = () => {

       useEffect(() => {
            AOS.init({
              duration: 1200, // animation duration in milliseconds
              once: true, // animation triggers only once
            });
          }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 4,
        px: { xs: 2, sm: 4 },
      }}
    >
      {/* Title Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          gap: 1,
        }}
      >
        <FacebookIcon color="primary" fontSize="large" />
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: { xs: '1.25rem', md: '1.5rem' } }}
        >
          Facebook
        </Typography>
      </Box>

      {/* Facebook Embed */}
      <Box
        sx={{
          width: { xs: '100%', sm: '600px', lg: '500px' },
          maxWidth: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
          border: '1px solid #ccc',
        }}
      >
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FJAHKZR&tabs=timeline&width=800&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
          width="100%"
          height="500"
          style={{
            border: 'none',
          }}
          scrolling="no"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      </Box>
    </Box>
  );
};

export default FacebookFeedEmbed;
