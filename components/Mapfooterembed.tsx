import React from "react"
import { Box, Button, Link, Typography  } from "@mui/material"
import {  Map } from "lucide-react"
const MapFooterEmbed: React.FC = () => {
  return (
    <Box sx={{ width: "100%", height: "300px", mb: 4 , pb : 4 , textAlign : 'center',} }>
       <Box sx={{ mt: 0 }}>
                <Button
                  variant="outlined"
                  startIcon={<Map />}
                  component={Link}
                  href="https://maps.app.goo.gl/uMPKNthwmbL8cF9U9"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderColor: "secondary.light",
                    color: "white",
                    mb: 2 , 
                    "&:hover": {
                      borderColor: "secondary.light",
                      color: "white",
                      bgcolor: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Find Us on Maps
                </Button>
              </Box>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30116.78644862859!2d79.46336093476562!3d19.343229500000014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2d56bb01368ee3%3A0x21da7f9b2095a48e!2sMASJID%20AI&#39;SHAH%20R.A!5e0!3m2!1sen!2sin!4v1736524446239!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 , paddingBottom : 10 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Box>
  )
}

export default MapFooterEmbed

