import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Container, Box, Grid } from '@mui/material';
import { Event, MeetingRoom, Announcement, School } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';

const infoItems = [
  {
    title: 'Ladies Prayer Area',
    content: 'We have a dedicated prayer area for sisters, ensuring privacy and comfort. ',
    icon: MeetingRoom,
  },
  {
    title: 'Eid ul-Fitr Announcement',
    content: 'Eid ul-Fitr prayer will be held on [Date] at [Time]. Please join us for this blessed occasion.',
    icon: Event,
  },
  {
    title: 'Weekly Quran Classes',
    content: 'Join our weekly Quran classes every Saturday and Sunday from 10 AM to 12 PM.',
    icon: School,
  },
  {
    title: 'Community Iftar',
    content: 'We are organizing a community iftar every Friday during Ramadan. All are welcome to join.',
    icon: Announcement,
  },
];

const LatestInfo = () => {
    useEffect(() => {
        AOS.init({
          duration: 1200, // animation duration in milliseconds
          once: true, // animation triggers only once
        });
      }, []);
    
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" gutterBottom align="center" color="primary" sx={{ mb: 4, fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' } }}>
          Latest Information
        </Typography>
        <Grid container spacing={4}>
          {infoItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card data-aos="fade-up" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <item.icon sx={{ fontSize: { xs: 32, md: 40 }, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h6" gutterBottom  sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                      {item.title}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    {item.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LatestInfo;

