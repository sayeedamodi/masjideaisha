import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Box, rgbToHex } from '@mui/material';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Define a type for the prayer data
type Prayer = {
  name: string;
  nameArabic: string;
  Azaantime: string;
  time: string;
};

const PrayerTimings = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [createdAt, setCreatedAt] = useState<string | null>(null); // Define the state type as an array of Prayer objects
 
  const fetchMaghribPrayerTime = async () => {
    try {
      const response = await axios.get('https://api.sunrise-sunset.org/json?lat=19.35176&lng=79.48323&date=2025-01-24&formatted=0'); // Replace with your actual backend URL
      const prayerData = response.data.results.sunset;
      
      // Convert time to 12-hour format (AM/PM)
      const convertTo12HourFormat = (time: string) => {
        const date = new Date(time);
        return date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      };
      
      // Update only Maghrib prayer data
      setPrayers((prevPrayers) => {
        const updatedPrayers = [...prevPrayers];
        updatedPrayers[3] = {
          ...updatedPrayers[3],  // Keep other fields unchanged
          Azaantime: convertTo12HourFormat(prayerData),
          time: convertTo12HourFormat(prayerData),
        };
        return updatedPrayers;
      });

    } catch (err) {
      console.error('Error fetching Maghrib prayer time:', err);
    }
  };
  

  useEffect(() => {
    // Fetch prayer times from the backend when the component mounts
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get('https://masjideaisha.onrender.com/data'); // Replace with your actual backend URL
        const prayerData = response.data.prayerTimings;
        

        // Format the prayer data to match the structure in the frontend
        const prayerArray: Prayer[] = [
          {
            name: 'Fajr',
            nameArabic: 'الفجر',
            Azaantime: prayerData.fajr.azanTime,
            time: prayerData.fajr.prayerTime,
          },
          {
            name: 'Zuhr',
            nameArabic: 'الظهر',
            Azaantime: prayerData.zuhr.azanTime,
            time: prayerData.zuhr.prayerTime,
          },
          {
            name: 'Asr',
            nameArabic: 'العصر',
            Azaantime: prayerData.asr.azanTime,
            time: prayerData.asr.prayerTime,
          },
          {
            name: 'Maghrib',
            nameArabic: 'المغرب',
            Azaantime: prayerData.maghrib.azanTime,
            time: prayerData.maghrib.prayerTime,
          },
          {
            name: 'Isha',
            nameArabic: 'العشاء',
            Azaantime: prayerData.isha.azanTime,
            time: prayerData.isha.prayerTime,
          },
          {
            name: 'Jumuah',
            nameArabic: 'الجمعة',
            Azaantime: prayerData.jumuah.azanTime,
            time: prayerData.jumuah.prayerTime,
          },
        ];

        setPrayers(prayerArray);
        setCreatedAt( prayerData.createdAt); 
        fetchMaghribPrayerTime();
      } catch (err) {
        console.error('Error fetching prayer times:', err);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <Box data-aos="fade-up" sx={
      { 
        py: { xs: 4, md: 8 }, 
        backgroundColor: '#f9f9f9', 
        borderRadius: '12px', 
        boxShadow: '0px 8px 16px rgba(0,0,0,0.1)', 
        overflow: 'hidden'
      }
    }>
      <Container maxWidth="md">
        <Typography
         variant="h3" 
         gutterBottom 
         align="center" 
         color="primary" 
         sx={{ 
           mb: 4, 
           fontSize: { xs: '1.4rem', sm: '2.5rem', md: '3rem' },
           fontWeight: 'bold',
           fontFamily: 'fancy', 
           textShadow: '0px 2px 4px rgba(0,0,0,0.1)' 
         }}>
          Prayer timings  نماز کے اوقات
        </Typography>
        <TableContainer 
        component={Paper} 
        elevation={0} 
        sx={{ 
          border: '1px solid', 
          borderColor: 'divider', 
          borderRadius: '25px', 
          overflow: 'hidden', 
          backgroundColor: '#ffffff',
          animation: 'fadeIn 1s ease-in-out'
        }}>
          <Table >
            <TableHead>
              <TableRow  sx={{ backgroundColor:'rgb(233, 233, 233)'}}>
                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}>Prayer</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}></TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}>Azaan</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}>Iqamah</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prayers.map((prayer) => (
                <TableRow
                key={prayer.name}
                sx={{ 
                  '&:hover': { backgroundColor: '#f1f1f1' }, 
                  transition: 'background-color 0.2s ease' 
                }}>
                  <TableCell component="th" scope="row" sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}>
                    {prayer.name}
                  </TableCell>
                  <TableCell component="th" scope="row" sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}>
                    {prayer.nameArabic}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}>{prayer.Azaantime}</TableCell>
                  <TableCell align="right" sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}>{prayer.time}</TableCell>
                </TableRow>
              ))}
             
            </TableBody>
            <Typography variant="caption" sx={{ position: 'absolute', bottom: 8, right: 8, fontSize: '0.75rem', color: 'text.disabled' }}>
            last updated at:{new Date(createdAt).toLocaleString()}
              </Typography>
          </Table>
          
        </TableContainer>
      </Container>
    </Box>
  );
};

export default PrayerTimings;
