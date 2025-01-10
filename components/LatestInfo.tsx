import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Container, Box, Grid, Button } from '@mui/material';
import { Event, LiveTv, MeetingRoom, Announcement, School } from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';

const infoItems = [
  {
    title: { en: 'Ladies Prayer Area', ur: 'خواتین کی نماز کا علاقہ' },
    content: {
      en: 'We have a dedicated prayer area for sisters, ensuring privacy and comfort.',
      ur: 'ہمارے پاس بہنوں کے لیے ایک مخصوص نماز کا علاقہ ہے جو پرائیویسی اور آرام فراہم کرتا ہے۔',
    },
    icon: MeetingRoom,
  },
  {
    title: { en: 'Islamic Lectures', ur: 'اسلامی خطبے' },
    content: {
      en: 'Join us for weekly Islamic lectures every Tuesday evening, where we discuss important topics of faith and community.',
      ur: 'ہمارے ساتھ ہر منگل کی شام اسلامی خطبوں میں شامل ہوں، جہاں ہم ایمان اور کمیونٹی کے اہم موضوعات پر بات کرتے ہیں۔',
    },
    icon: LiveTv,
  },
  {
    title: { en: 'Jamiat e Ahle Hadith', ur: 'جمعیت اہل حدیث' },
    content: {
      en: 'We are a proud part of the Jamiat e Ahle Hadith community, committed to following the authentic teachings of Islam.',
      ur: 'ہم جمعیت اہل حدیث کمیونٹی کا فخر حصہ ہیں، جو اسلام کی حقیقی تعلیمات پر عمل پیرا ہیں۔',
    },
    icon: School,
  },
  {
    title: { en: 'Community Iftar', ur: 'کمیونٹی افطار' },
    content: {
      en: 'We are organizing a community iftar every Friday during Ramadan. All are welcome to join.',
      ur: 'ہم رمضان کے دوران ہر جمعہ کو کمیونٹی افطار کا اہتمام کرتے ہیں۔ تمام افراد کو مدعو کیا جاتا ہے۔',
    },
    icon: Announcement,
  },
];

const LatestInfo = () => {
  const [language, setLanguage] = useState('en'); // 'en' for English, 'ur' for Urdu

  useEffect(() => {
    AOS.init({
      duration: 1200, // animation duration in milliseconds
      once: true, // animation triggers only once
    });
  }, []);

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'en' ? 'ur' : 'en'));
  };

  return (
    <section id="services">
      <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
        <Button
  onClick={toggleLanguage}
  variant="outlined"   // Makes the button less prominent
  color="secondary"  // Makes the button use the default color (not primary)
  sx={{ mb: 4 }}
>
  {language === 'en' ? 'اُردُو' : 'english'}  {/* Urdu for "e" when in English and vice versa */}
</Button>

          <Grid container spacing={4}>
            {infoItems.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card data-aos="fade-up" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <item.icon sx={{ fontSize: { xs: 32, md: 40 }, color: 'primary.main', mr: 2 }} />
                      <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                        {item.title[language]} {/* Toggle title based on language */}
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                      {item.content[language]} {/* Toggle content based on language */}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </section>
  );
};

export default LatestInfo;


