import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Box } from '@mui/material';
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

  useEffect(() => {
    // Fetch prayer times from the backend when the component mounts
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get('http://masjideaisha.onrender.com/data'); // Replace with your actual backend URL
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
        setCreatedAt( prayerData.createdAt);  // Set prayers state with fetched data
      } catch (err) {
        console.error('Error fetching prayer times:', err);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <Box data-aos="fade-up" sx={{ py: { xs: 4, md: 8 }, backgroundColor: 'white' }}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom align="center" color="primary" sx={{ mb: 4, fontSize: { xs: '1.4rem', sm: '2.5rem', md: '3rem' } }}>
          Prayer Timings  نماز کے اوقات
        </Typography>
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}>Prayer</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}></TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}>Azaan</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', md: '1.1rem' } }}>Iqamah</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prayers.map((prayer) => (
                <TableRow key={prayer.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    {prayer.name}
                  </TableCell>
                  <TableCell component="th" scope="row" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                    {prayer.nameArabic}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>{prayer.Azaantime}</TableCell>
                  <TableCell align="right" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>{prayer.time}</TableCell>
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
