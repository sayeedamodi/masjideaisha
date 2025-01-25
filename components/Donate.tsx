import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Container, Box, CardContent, Card } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';  // Import QRCode component
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Copy } from "lucide-react";

const Donate = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [upiId, setUpiId] = useState("");
  const [copied, setCopied] = useState(false);
 const [updated , setUpdated] = useState("");
   useEffect(() => {
          AOS.init({
            duration: 1200, // animation duration in milliseconds
            once: true, // animation triggers only once
          });

          
        }, []);

        useEffect(() => {
          const fetchDonationSettings = async () => {
            try {
              const response = await fetch("https://masjideaisha.onrender/api/donation-settings");
              const data = await response.json();
              console.log(data);
              setUpiId(data.upiId || "Not Available");
              setQrCodeUrl(data.imageUrl || "https://via.placeholder.com/200");
              setUpdated(data.updatedAt || "Not Available");
            } catch (error) {
              console.error("Error fetching donation settings:", error);
            }
          };
          fetchDonationSettings();
        }, []); 

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  const handleCopyUpiId = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUPIPayment = () => {
    if (!amount) {
      alert("Please enter the amount");
      return;
    }

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
            <Card variant="outlined" className="mt-4">
              <CardContent>
                <div className="relative w-full h-40 mb-4">
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center">
                      <Typography variant="h6" color="inherit" className="mb-2">
                        {upiId}
                      </Typography>
                      <Button
                        onClick={handleCopyUpiId}
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<Copy />}
                      >
                        {copied ? "Copied!" : "Copy UPI ID"}
                      </Button>
                    </div>
                  </div>
                </div>
                <Typography variant="body2" color="textSecondary" align="center" className="mb-4">
                  Copy the UPI ID and paste and pay in any UPI app or scan the QR below with any UPI app
                </Typography>
                <div className="text-center">
                  <Typography variant="h6" className="mb-2">
                    Scan to Pay:
                  </Typography>
                  <img
                    src={qrCodeUrl}
                    alt="UPI QR Code"
                    className="mx-auto"
                    width={200}
                    height={200}
                  />
                </div>
              </CardContent>
              <Typography variant="caption" sx={{ position: 'absolute', bottom: 8, right: 8, fontSize: '0.75rem', color: 'text.disabled' }}>
                                last updated at: {new Date(updated).toLocaleString()}
                                </Typography>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleUPIPayment}>
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
