import React, { useEffect, useState } from "react"
import { Campaign, Announcement, Brightness4, Brightness7 } from "@mui/icons-material"
import {
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  Grid,
  useMediaQuery,
  CircularProgress,
  Fade,
  IconButton,
  createTheme,
  ThemeProvider,
} from "@mui/material"
import AOS from "aos"
import "aos/dist/aos.css"
import axios from "axios"

// Define a type for the notice data
type Notice = {
  title: string
  content: string
  createdAt: string
}

const NoticeBoard = () => {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#fff" : "#1e3a8a",
      },
      background: {
        default: darkMode ? "#121212" : "#ffffff",
        paper: darkMode ? "#3C3D37" : "#ffffff",
      },
    },
  })

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })

    const fetchNotices = async () => {
      try {
        const response = await axios.get("https://masjideaisha.onrender.com/notice")
        const fetchedNotices = response.data.Notice
        if (Array.isArray(fetchedNotices)) {
          setNotices(fetchedNotices)
        } else if (fetchedNotices) {
          setNotices([fetchedNotices])
        }
      } catch (err) {
        console.error("Error fetching notices:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchNotices()
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const islamicPattern = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${darkMode ? "%23424242" : "%23009688"}' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: "repeat",
    backgroundSize: "60px 60px",
  }

  return (
   
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: "background.default",
          ...islamicPattern,
          position: "relative",
          transition: "background-color 0.3s ease-in-out",
          cursor: "pointer",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            transition: "background-color 0.3s ease-in-out",
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" data-aos="fade-up" sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h3"
              gutterBottom
              align="center"
              color="primary.main"
              sx={{
                mb: 2,
                fontSize: { xs: "2rem", sm: "2.75rem", md: "3.5rem" },
                fontWeight: "bold",
                textShadow: darkMode ? "2px 2px 4px rgba(255,255,255,0.1)" : "2px 2px 4px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.3s ease-in-out",
              }}
            >
              <Campaign sx={{ fontSize: { xs: 40, md: 50 }, color: "primary.main", mr: 2 }} />
              Latest Notices
            </Typography>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : notices.length > 0 ? (
            <Grid container spacing={4} justifyContent="center">
              {notices.map((notice, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                   <ThemeProvider theme={theme}>
                  <Card
                  onClick={toggleDarkMode}
                    // data-aos-delay={index * 100}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 3,
                      borderRadius: 2,
                      transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                      background: darkMode
                        ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[900]})`
                        : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.grey[100]})`,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, position: "relative", p: 3 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          fontSize: { xs: "1.1rem", md: "1.3rem" },
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "primary.main",
                          mb: 2,
                          transition: "color 0.3s ease-in-out",
                        }}
                      >
                        {notice.title}
                      </Typography>
                      <hr/>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "0.9rem", md: "1rem" },
                          color: "text.primary.light",
                          mb: 3,
                          transition: "color 0.3s ease-in-out",
                        }}
                      >
                        {notice.content}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          position: "absolute",
                          bottom: 8,
                          right: 8,
                          fontSize: "0.75rem",
                          color: "text.disabled",
                          fontStyle: "italic",
                          transition: "color 0.3s ease-in-out",
                        }}
                      >
                        Last updated: {new Date(notice.createdAt).toLocaleString()}
                      </Typography>
                    </CardContent>
                    
                  </Card>
                  </ThemeProvider>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                py: 4,
                backgroundColor: "background.paper",
                borderRadius: 2,
                boxShadow: 2,
                transition: "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              }}
            >
              <Announcement
                sx={{ fontSize: 60, color: "text.secondary", mb: 2, transition: "color 0.3s ease-in-out" }}
              />
              <Typography variant="h6" color="text.secondary" sx={{ transition: "color 0.3s ease-in-out" }}>
                No notices available at the moment.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>
    
  )
}

export default NoticeBoard;


