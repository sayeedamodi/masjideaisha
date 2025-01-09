import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Slider from 'react-slick'; // Import the react-slick component
import 'slick-carousel/slick/slick.css'; // Import slick carousel styles
import 'slick-carousel/slick/slick-theme.css'; // Import slick theme styles

const images = [
  './gallery/logo.jpg',
  './gallery/logo.jpg',
  './gallery/logo.jpg',
  './gallery/logo.jpg',
  './gallery/logo.jpg',
  './gallery/logo.jpg',
];

const Gallery = () => {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite scroll
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set the autoplay speed (2 seconds)
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom align="center" color="primary" sx={{ mb: 4, fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}>
          Gallery
        </Typography>
        <Slider {...settings}> {/* Apply settings to the Slider component */}
          {images.map((image, index) => (
            <Box key={index} sx={{ height: { xs: 200, md: 250 }, backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 2 }} />
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Gallery;

