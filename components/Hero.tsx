import React, { useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { BlurCircular } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Hero = () => {
    useEffect(() => {
        AOS.init({
          duration: 1200, // animation duration in milliseconds
          once: true, // animation triggers only once
        });
      }, []);
  return (
    <Box
      sx={{
        backgroundImage: 'url(/logo-bg.png)', // Ensure the image path is correct
        backgroundSize: 'contain', // Ensure the entire image fits within the container
        backgroundPosition: 'center center', // Ensure the image is centered both vertically and horizontally
        backgroundRepeat: 'no-repeat',
        height: '100vh', // Full screen height for desktop
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
          
        transition: 'background-size 0.3s ease', // Smooth transition for hover zoom effect
        '&::before': {
          content: '""',
          
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
           // Dark overlay for better text contrast
        },
      }}
    >
      <Container data-aos="fade-up" maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          data-aos="fade-up"
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '4rem' }, // Adjust font size for different screens
            fontWeight: 'bold',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'none', // Removed scaling on text for smoother performance
            },
          }}
        >
          مسجد عائشہ (رضی اللہ عنہا)
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' }, // Responsive font size
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'none', // Removed scaling on text for smoother performance
            },
          }}
        >
          Masjid e Aisha (R.A)
        </Typography>
      </Container>
    </Box>
  );
};

export default Hero;
