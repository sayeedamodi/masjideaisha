import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [showHeader, setShowHeader] = React.useState(true); // State to control the visibility of the header
  const [lastScrollY, setLastScrollY] = React.useState(0); // Track the last scroll position

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // Scrolling down, hide the header
        setShowHeader(false);
      } else {
        // Scrolling up, show the header
        setShowHeader(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // Add scroll listener
    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up the listener on component unmount
    };
  }, [lastScrollY]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        top: showHeader ? 0 : '-80px',
        transition: 'top 0.3s ease-in-out',
        backgroundColor: 'white',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo-bg.png" alt="Masjid e Aisha Logo" style={{ height: 60, marginRight: 16 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', display: { xs: 'none', md: 'flex' } }}>
              Masjid e Aisha(R.A)
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <img src="/jamiat-logo-bg.png" alt="Jamiat Logo" style={{ height: 60, marginRight: 0 }} />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {['Donate', 'About', 'Services', 'Contact', 'Downloads' ].map((page) => (
                <MenuItem key={page}
                 onClick={handleCloseNavMenu}  
                component="a" // This makes MenuItem behave like a link
                 href={`#${page.toLowerCase()}`} >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {['Donate','About', 'Services', 'Contact' , 'Downloads'].map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ mx: 1, color: 'primary' }}
                href={`#${page.toLowerCase()}`} // Linking to sections using IDs
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
