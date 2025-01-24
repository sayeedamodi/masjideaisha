import React, { ErrorInfo, ReactNode, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box, Typography } from '@mui/material';
import Header from '../components/Header'
import Hero from '../components/Hero';
import PrayerTimings from '../components/PrayerTimings';
import NoticeBoard from '../components/NoticeBoard';
import LatestInfo from '../components/LatestInfo';
import Donate from '../components/Donate';
import Gallery from '../components/Gallery';
import FacebookFeed from '../components/Facebookfeed';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Saum from '../components/Saum';



const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3a8a',
    },
    secondary: {
      main: '#fbbf24',
    },
    background: {
      default: '#f3f4f6',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Typography>Something went wrong. Please try again later.</Typography>;
    }

    return this.props.children;
  }
}

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1200, // animation duration in milliseconds
      once: true, // animation triggers only once
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Box sx={{ 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Header />
          <Hero />
          <PrayerTimings  />
          <NoticeBoard/>
          <Saum/>
          <LatestInfo />
          <Donate />
          <Gallery />
          <FacebookFeed/>
          <Footer />
        </Box>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;


