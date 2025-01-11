import React, { useEffect, useState } from 'react';
import {Campaign} from '@mui/icons-material';
import { Card, CardContent, Typography, Container, Box, Grid } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';

// Define a type for the notice data
type Notice = {
  title: string;
  content: string;
  createdAt: string;
};

const NoticeBoard = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });

    // Fetch notices from the backend
    const fetchNotices = async () => {
      try {
        const response = await axios.get('https://masjideaisha.onrender.com/notice'); // Replace with your backend URL
        const fetchedNotice = response.data.Notice; // Access the Notice object directly

        // Wrap the fetched data in an array if it's not already in array form
        if (fetchedNotice) {
          setNotices([fetchedNotice]); // Wrap it in an array for rendering
        }
      } catch (err) {
        console.error('Error fetching notices:', err);
      }
    };

    fetchNotices();
  }, []);

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: 'background.default' }}>
      <Container  maxWidth="lg">
        <section id="events">
        <Typography variant="h3" gutterBottom align="center" color="primary" sx={{ mb: 4, fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}>
        <Campaign sx={{ fontSize: { xs: 30, md: 40 }, color: 'primary.main', mr: 2 }} /> Latest Notices
        </Typography>
        <Grid container  spacing={4} justifyContent="center">
          {notices.map((notice, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card  data-aos="fade-up" sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' }, fontWeight: 'bold', textAlign: 'center' }}>
                    {notice.title}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, color: 'text.secondary', textAlign: 'center' }}>
                    {notice.content}
                  </Typography>
                  <Typography variant="caption" sx={{ position: 'absolute', bottom: 8, right: 8, fontSize: '0.75rem', color: 'text.disabled' }}>
                  last updated at: {new Date(notice.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        </section>
      </Container>
    </Box>
  );
};

export default NoticeBoard;
