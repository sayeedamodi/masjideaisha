import React, { useEffect } from 'react';
import { Container, Typography, Link, Grid, Box, IconButton } from '@mui/material';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import MapFooterEmbed from './Mapfooterembed';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
          useEffect(() => {
               AOS.init({
                 duration: 1200, // animation duration in milliseconds
                 once: true, // animation triggers only once
               });
             }, []);
  return (
    
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg" >
      <section id="about">
        <Grid container spacing={4} justifyContent="space-around"  >
        <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                textAlign: { xs: 'center', sm: 'left' }, // Center text on small screens
              }}
            >
              Masjid e Aisha
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.8rem', md: '0.875rem' },
                textAlign: { xs: 'center', sm: 'left' }, // Center text on small screens
              }}
            >
              A place of worship, community, and spiritual growth.
            </Typography>

            <MapFooterEmbed />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              Quick Links
            </Typography>
            <Box>
              <Link href ="https://facebook.com/JAHKZR" target="_blank" color="inherit" display="block" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>About Us</Link>
              <Link href="#services" color="inherit" display="block" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Services</Link>
              <Link href="#events" color="inherit" display="block" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Events</Link>
              <Link href="#contact" color="inherit" display="block" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Contact</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
          <section id='contact'>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
              Indira Market,<br />
              Kaghaznagar, Telangana 504296
            </Typography>
            <Link href="tel:+919989259049" color="inherit" display="block" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
              Phone: +91 99892 59049
            </Link>
            <Link href="tel:+919505200044" color="inherit" display="block" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
              Phone: +91 95052 00044
            </Link>
            
            </section>
          </Grid>
          
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <IconButton color="inherit" aria-label="Facebook" href='https://facebook.com/JAHKZR'>
            <Facebook />
          </IconButton>
          <IconButton color="inherit" aria-label="Twitter" href='https://x.com/J_ahlehadith'>
            <Twitter />
          </IconButton>
          <IconButton color="inherit" aria-label="Instagram" href='https://instagram.com/ahlehadithskzr'>
            <Instagram />
          </IconButton>
          
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
          © {new Date().getFullYear()} Masjid e Aisha. All rights reserved.
             </Typography>
             <Typography
  variant="body2"
  align="center"
  sx={{
    mt: 2,
    fontSize: { xs: '0.6rem', md: '0.6rem' },
    color: 'grey',
    '& a': {
      color: 'inherit', // Matches the text color
      textDecoration: 'none', // No underline by default
    },
    '& a:hover': {
      color : 'white',
      textDecoration: 'underline', // Underline on hover
    },
  }}
>
  designed & developed by <a href="http://github.com/sayeedamodi" target="_blank" rel="noopener noreferrer">@sayeedamodi</a>
</Typography>

        </section>
      </Container>
      </Box>
      
    
    
  );
};

export default Footer;

