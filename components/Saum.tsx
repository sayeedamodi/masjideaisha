import React, { useState, useEffect } from "react"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import axios from "axios"
import { translations } from "./translations"
import "aos/dist/aos.css"

// Define light and dark themes
const lightTheme = createTheme({
  palette: {
    primary: { main: "#7c4dff" },
    secondary: { main: "#ff4081" },
    background: {
      default: "#f0f0f0",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: { fontWeight: 500 },
    h6: { fontWeight: 400 },
    body1: { fontWeight: 300 },
    body2: { fontWeight: 300, fontStyle: "italic" },
    
  },
})

const darkTheme = createTheme({
  palette: {
    primary: { main: "#7c4dff" },
    secondary: { main: "#ff4081" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: { fontWeight: 500 , color : "#fff" },
    h6: { fontWeight: 400 , color : "#fff" },
    body1: { fontWeight: 300 , color : "#fff"},
    body2: { fontWeight: 300, fontStyle: "italic" , color : "#fff" },
  },
})

export default function Saum() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [prayerTimes, setPrayerTimes] = useState({ suhoor: null, iftar: null })
  const [isUrdu, setIsUrdu] = useState(false)
  const [hijriDate, setHijriDate] = useState({})
  const [themeMode, setThemeMode] = useState("light") // State to track theme

  const lang = isUrdu ? "ur" : "en"

  // Function to fetch prayer times
  const fetchPrayerTimes = async (date) => {
    const latitude = 19.35176
    const longitude = 79.48323

    try {
      const responsetime = await axios.get(`https://api.sunrise-sunset.org/json`, {
        params: {
          lat: latitude,
          lng: longitude,
          formatted: 0,
          date: format(date, "yyyy-MM-dd"),
        },
      })
      const responsehijridate = await axios.get("https://api.aladhan.com/v1/gToH", {
        params: {
          date: format(date, "dd-MM-yyyy"),
        },
      })

      const hijri = responsehijridate.data.data.hijri
      const data = responsetime.data.results

      setPrayerTimes({
        suhoor: new Date(data.astronomical_twilight_begin),
        iftar: new Date(data.sunset),
      })

      setHijriDate({
        day: hijri.day,
        month: hijri.month.ar,
        year: hijri.year,
      })
    } catch (error) {
      console.error("Error fetching prayer times:", error)
    }
  }

  // Update prayer times at midnight
  useEffect(() => {
    fetchPrayerTimes(currentTime)
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Toggle language every 5 seconds
  useEffect(() => {
    const languageTimer = setInterval(() => {
      setIsUrdu((prev) => !prev)
    }, 5000)

    return () => clearInterval(languageTimer)
  }, [])

  // Function to toggle theme between light and dark
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "light" ? "dark" : "light"))
  }
 // Define variants for container and items
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.3 } },
}

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const textVariants = {
  enter: { y: 20, opacity: 0 },
  center: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
}

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Paper
        onClick={toggleTheme} // Click or touch to toggle theme
        data-aos="fade-up"
        elevation={3}
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          mt : 2,
          mb : 2,
          p: 4,
          maxWidth: "90%",
          width: "100%",
          bgcolor: themeMode === "light" ? "#ffffff" : "#1d1d1d", // Set background color based on theme
          margin: "0 auto",
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box component={motion.div} variants={itemVariants} sx={{ mb: 3, textAlign: "center" }}>
          <Typography sx={{ color: themeMode === "light" ? "darkgrey" : "white" }} variant="body1">
            {format(currentTime, "EEEE, MMMM d, yyyy")}
          </Typography>
          <Typography sx={{ color: themeMode === "light" ? "black" : "white" }} variant="body2">
            {` ${hijriDate.month} ${hijriDate.year} ${hijriDate.day}`}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper
              component={motion.div}
              variants={itemVariants}
              elevation={2}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
                bgcolor: themeMode === "light" ? "#ffffff" : "#2c2c2c", // Adjust card color for dark mode
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <DarkModeIcon sx={{ mr: 1 , color: themeMode === "light" ? "black" : "white" }} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lang}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="h6" >{translations[lang].suhoor}</Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>
              <Typography variant="h5" sx={{  color: themeMode === "light" ? "black" : "white" }}>
          {prayerTimes.suhoor ? format(prayerTimes.suhoor, "hh:mm a") : "Loading..."}
        </Typography> 
            
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper
              component={motion.div}
              variants={itemVariants}
              elevation={2}
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
                bgcolor: themeMode === "light" ? "#ffffff" : "#2c2c2c", // Adjust card color for dark mode
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <WbSunnyIcon sx={{ mr: 1 , color: themeMode === "light" ? "black" : "white" } } />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lang}
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Typography variant="h6" sx={{ mr: 1 , color: themeMode === "light" ? "black" : "white" }} >{translations[lang].iftar}</Typography>
                  </motion.div>
                </AnimatePresence>
              </Box>
              <Typography variant="h5" sx={{  color: themeMode === "light" ? "black" : "white" }}>
          {prayerTimes.iftar ? format(prayerTimes.iftar, "hh:mm a") : "Loading..."}
        </Typography> 
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </ThemeProvider>
  )
}


