import React from 'react';
import { Container, Typography, Link, Grid, Box, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              Masjid e Aisha
            </Typography>
            <Typography variant="body2" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
              A place of worship, community, and spiritual growth.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              Quick Links
            </Typography>
            <Box>
              <Link href="#" color="inherit" display="block" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>About Us</Link>
              <Link href="#" color="inherit" display="block" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Services</Link>
              <Link href="#" color="inherit" display="block" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Events</Link>
              <Link href="#" color="inherit" display="block" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>Contact</Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
              123 Islamic Center Road,<br />
              City, State 12345
            </Typography>
            <Link href="tel:+1234567890" color="inherit" display="block" sx={{ mb: 1, fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
              Phone: +123 456 7890
            </Link>
            <Link href="mailto:info@masjideaisha.com" color="inherit" display="block" sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}>
              Email: info@masjideaisha.com
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <IconButton color="inherit" aria-label="Facebook">
            <Facebook />
          </IconButton>
          <IconButton color="inherit" aria-label="Twitter">
            <Twitter />
          </IconButton>
          <IconButton color="inherit" aria-label="Instagram">
            <Instagram />
          </IconButton>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2, fontSize: { xs: '0.7rem', md: '0.75rem' } }}>
          © {new Date().getFullYear()} Masjid e Aisha. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

