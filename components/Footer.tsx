import React, { useEffect, useState } from "react"
import { Box, Container, Grid, Typography, Link, IconButton, useTheme, styled } from "@mui/material"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Download, Phone, Mail, Map, MapPin } from "lucide-react"
import MapFooterEmbed from "./Mapfooterembed"


const StyledLink = styled(Link)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}))

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear())
  const theme = useTheme()

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/JAHKZR", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/J_ahlehadith", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com/ahlehadithskzr", label: "Instagram" },
  ]

  const quickLinks = [
    { href: "/masjideaisha.apk", label: "Download Android App", icon: Download },
    { href: "#services", label: "Services" },
    { href: "#events", label: "Events" },
    
  ]

  const contactInfo = [
    { icon: MapPin, content: "Indira Market, Kaghaznagar, Telangana 504296" },
    { icon: Phone, content: "+91 99892 59049", href: "tel:+919989259049" },
    { icon: Phone, content: "+91 95052 00044", href: "tel:+919505200044" },
  
  ]

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        py: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <MapFooterEmbed />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <section id="about">
              <Typography variant="h5" gutterBottom>
                Masjid e Aisha(R.A) 
              </Typography>
              <Typography variant="h6" gutterBottom>
               مسجد عائشہ (رضی اللہ عنہا)
               </Typography>
              </section>
              <Typography variant="body2">A place of worship, community, and spiritual growth.
            
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {quickLinks.map((link, index) => (
                  <Box
                    component={motion.li}
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    sx={{ mb: 1 }}
                  >
                    <section id="downloads">
                    <StyledLink href={link.href}>
                      {link.icon && <link.icon size={16} style={{ marginRight: theme.spacing(1) }} />}
                      <Typography variant="body2">{link.label}</Typography>
                    </StyledLink>
                    </section>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <section id="contact">
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              </section>
              <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {contactInfo.map((info, index) => (
                  <Box
                    component={motion.li}
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    sx={{ mb: 1 }}
                  >
                    
                    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                      <info.icon size={16} style={{ marginRight: theme.spacing(1), marginTop: 4 }} />
                      <Typography variant="body2">
                        {info.href ? <StyledLink href={info.href}>{info.content}</StyledLink> : info.content}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Box sx={{ mb: 2 }}>
              {socialLinks.map((social, index) => (
                <motion.span key={index} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <IconButton
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: "primary.contrastText", "&:hover": { color: "secondary.main" } }}
                  >
                    <social.icon size={24} />
                  </IconButton>
                </motion.span>
              ))}
            </Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              &copy; {year} Masjid e Aisha. All rights reserved.
            </Typography>
            <section id="developer">
            <Typography variant="caption" sx={{ color: "primary.contrastText" ,  "&:hover": { color: "secondary.main" } }}>
              developed by{" "}
              <Link
                href="http://github.com/sayeedamodi"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: "inherit", "&:hover": { color: "primary.contrastText" } }}
              >
                @sayeedamodi
              </Link>
            </Typography>
            </section>
          </Box>
        </motion.div>
      </Container>

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "40%",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: 0, left: 0 }}
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.2 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            fill={theme.palette.primary.light}
            fillOpacity="0.1"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </Box>
    </Box>
  )
}

export default Footer;