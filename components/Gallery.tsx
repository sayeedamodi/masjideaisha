import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import AOS from 'aos';
import 'aos/dist/aos.css';
const images = [
  './gallery/masjid-photo1.jpg',
  './gallery/masjid-photo2.jpg',
  './gallery/masjid-photo3.jpg',
  './gallery/masjid-photo4.jpg'
];

const Gallery = () => {

        useEffect(() => {
             AOS.init({
               duration: 1200, // animation duration in milliseconds
               once: true, // animation triggers only once
             });
           }, []); 
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          gutterBottom
          // align="center"
          color="primary"
          sx={{ mb: 4, fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}
        >
          Gallery
        </Typography>
        <Carousel
          indicators
          animation="slide"
          navButtonsAlwaysVisible
          autoPlay
          sx={{ mb: 4 }}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              sx={{
                height: { xs: 350, sm: 500 },
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 2,
              }}
            />
          ))}
        </Carousel>
        <ThreeSixtyIcon  color="primary" fontSize="large"  />
        {/* Embed Google Map */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!4v1736521366121!6m8!1m7!1sCAoSLEFGMVFpcFB5bEpwTDdjOE1rR05FbEE1OEYtTVdmYjVwallHelZ4U3RNWDl2!2m2!1d19.34321687361902!2d79.48409377865963!3f267.847756924742!4f4.968064183296065!5f0.7820865974627469"
          width="100%"
          height="500"
          style={{ border: 0, marginTop: '20px', borderRadius: '10px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </Container>
    </Box>
  );
};

export default Gallery;

