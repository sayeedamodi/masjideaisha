import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Container, Box } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';  // Import QRCode component
import AOS from 'aos';
import 'aos/dist/aos.css';

const Donate = () => {
   useEffect(() => {
          AOS.init({
            duration: 1200, // animation duration in milliseconds
            once: true, // animation triggers only once
          });
        }, []);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleUPIPayment = () => {
    if (!amount) {
      alert("Please enter the amount");
      return;
    }

    const upiLink = `upi://pay?pa=yourupi@upi&pn=Masjid%20Donation&mc=0000&tid=1234567890&txnid=1&amount=${amount}&url=https://masjideaisha.com`;

    // Open the UPI apps using the link
    window.location.href = upiLink;
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, backgroundColor: 'primary.main', color: 'white' }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <section id="donate">
        <Typography variant="h3" gutterBottom>Support Our Mosque</Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Your generous donations help us maintain the mosque and support our community programs.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpen}
          size="large"
        >
          Donate Now
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Donate via UPI</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Amount (INR)"
              type="number"
              fullWidth
              variant="outlined"
              value={amount}
              onChange={handleAmountChange}
            />
            
            {amount && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="h6">Scan to Pay:</Typography>
                {/* Generate and display QR code */}
                <QRCodeCanvas value={`upi://pay?pa=saysay@&pn=Masjid%20Donation&mc=0000&tid=1234567890&txnid=1&amount=${amount}&url=https://masjideaisha.com`} />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUPIPayment} variant="contained" color="primary">
              Donate
            </Button>
          </DialogActions>
        </Dialog>
        </section>
      </Container>
    </Box>
  );
};

export default Donate;
