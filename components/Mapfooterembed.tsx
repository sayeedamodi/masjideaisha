import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const MapFooterEmbed = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        py: 4,
        mt: 4,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        textAlign: 'center',
        px: 2, // Padding for small screens
        display: { xs: 'block', lg: 'none' }, // Hide the entire component on large screens
      }}
    >
      {/* Footer Title */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
 // Center alignment
        }}
      >
        <LocationOnIcon fontSize="medium" />
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
            fontWeight: 'italic',
          }}
        >
          Find Us on Maps
        </Typography>
      </Box>

      {/* Map Embed or Link */}
      <Box
        sx={{
          width: '100%', // Full width to make it responsive
          maxWidth: '100%',
          height: { xs: '250px', sm: '350px', md: '500px', lg: '600px' }, // Dynamic height for different screen sizes
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 4,
          position: 'relative',
          display: { xs: 'block', lg: 'none' }, // Hide the map on large screens
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30116.78644862859!2d79.46336093476562!3d19.343229500000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2d56bb01368ee3%3A0x21da7f9b2095a48e!2sMASJID%20AI&#39;SHAH%20R.A!5e0!3m2!1sen!2sin!4v1736524446239!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{
            border: 'none',
            borderRadius: 'inherit',
            position: 'absolute',
            top: '0',
            left: '0',
          }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>

      {/* Link for Large Screens */}
      <Box
        sx={{
          display: { xs: 'none', lg: 'none' }, // Hide the link on both small and large screens
        }}
      >

      </Box>
    </Box>
  );
};

export default MapFooterEmbed;
