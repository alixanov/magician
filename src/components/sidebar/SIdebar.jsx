import React, { useRef, useEffect } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, useMediaQuery, Typography, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';
import MapIcon from '@mui/icons-material/Map';
import XIcon from '@mui/icons-material/X';
import { gsap } from 'gsap';

// Styled Components
const NavbarContainer = styled(Box)(({ theme, showProduct }) => ({
  position: 'fixed',
  top: showProduct ? 0 : 0,
  left: 0,
  width: '100%',
  height: showProduct ? '100vh' : '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: showProduct ? 'center' : 'space-between',
  padding: showProduct ? '20px' : '0 40px',
  background: showProduct ? 'rgba(50, 0, 0, 0.95)' : 'rgba(139, 0, 0, 0.2)', // Красный фон
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 15px rgba(255, 0, 0, 0.2)', // Красная тень
  borderBottom: '1px solid rgba(255, 0, 0, 0.3)', // Красная граница
  zIndex: 1000,
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    position: showProduct ? 'fixed' : 'fixed',
    top: showProduct ? 0 : 'auto',
    bottom: showProduct ? 'auto' : 0,
    height: showProduct ? '100vh' : '60px',
    padding: showProduct ? '20px' : '0 10px',
    flexDirection: showProduct ? 'column' : 'row',
    justifyContent: showProduct ? 'start' : 'space-around',
    alignItems: showProduct ? 'center' : 'center',
    background: showProduct ? 'rgba(50, 0, 0, 0.95)' : 'rgba(139, 0, 0, 0.4)',
    borderTop: showProduct ? 'none' : '1px solid rgba(255, 0, 0, 0.3)',
    borderBottom: showProduct ? '1px solid rgba(255, 0, 0, 0.3)' : 'none',
    gap: showProduct ? '20px' : '0',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: '#fff',
  background: 'rgba(255, 0, 0, 0.1)', // Красный фон кнопки
  borderRadius: '12px',
  padding: '10px 20px',
  fontFamily: '"Cinzel", serif',
  fontWeight: 'bold',
  fontSize: '1rem',
  display: 'flex',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255, 0, 0, 0.3)', // Красная граница
  '& svg': {
    marginRight: '8px',
    fontSize: '1.5rem',
    color: '#fff',
  },
  '&:hover, &.active': {
    background: 'rgba(255, 0, 0, 0.3)', // Красный при наведении
    boxShadow: '0 0 15px rgba(255, 0, 0, 0.5)', // Красное свечение
    transform: 'scale(1.05)',
    border: '1px solid rgba(255, 0, 0, 0.8)',
    '& svg': {
      color: '#fff',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: '8px',
    minWidth: '50px',
    flexDirection: 'column',
    fontSize: '0', // Hide text
    background: 'transparent',
    border: 'none',
    '& svg': {
      marginRight: 0,
      fontSize: '1.8rem',
    },
    '&:hover, &.active': {
      background: 'transparent',
      boxShadow: 'none',
      transform: 'scale(1.1)',
      '& svg': {
        color: '#ff0000', // Яркий красный для иконок
      },
    },
  },
}));

const ProductContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '500px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 0, 0, 0.3)', // Красная граница
  borderRadius: '16px',
  padding: '20px',
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 0 20px rgba(255, 0, 0, 0.2)', // Красная тень
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: '2px solid transparent',
    borderImage: 'linear-gradient(45deg, #ff0000, #8b0000, #ff0000) 1', // Красный градиент
    borderRadius: '16px',
    opacity: 0.8,
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '90%',
    padding: '15px',
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '15px',
  right: '15px',
  color: '#fff',
  background: 'rgba(255, 0, 0, 0.2)', // Красный фон
  '&:hover': {
    background: 'rgba(255, 0, 0, 0.4)', // Красный при наведении
  },
}));

const Navbar = () => {
  const navbarRef = useRef(null);
  const productRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { id } = useParams();
  const location = useLocation();
  const userData = localStorage.getItem('userData');
  const isLoggedIn = userData ? !!JSON.parse(userData).email : false;
  const accountPath = isLoggedIn ? '/app/account' : '/';
  const accountLabel = isLoggedIn ? 'Account' : 'Register';
  const showProduct = location.pathname.startsWith('/app/shop/info-product');

  useEffect(() => {
    if (navbarRef.current) {
      gsap.fromTo(
        navbarRef.current,
        { opacity: 0, y: showProduct || !isMobile ? -20 : 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    }
    if (showProduct && productRef.current) {
      gsap.fromTo(
        productRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
        }
      );
    }
  }, [showProduct, isMobile]);

  return (
    <NavbarContainer ref={navbarRef} showProduct={showProduct}>
      {!showProduct && (
        <Box display="flex" gap="20px" flexWrap="wrap" justifyContent="center">
          <NavButton
            component={NavLink}
            to="/app/main"
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-label="Go to main page"
          >
            <HomeIcon fontSize="inherit" />
            <span>About</span>
          </NavButton>
          <NavButton
            component={NavLink}
            to="/app/maps"
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-label="Go to maps"
          >
            <MapIcon fontSize="inherit" />
            <span>Getting Started</span>
          </NavButton>
          <NavButton
            component={NavLink}
            to="/app/maps"
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-label="Go to maps"
          >
            <MapIcon fontSize="inherit" />
            <span>Tokenomics</span>
          </NavButton>
          <NavButton
            component={NavLink}
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
            aria-label="Join us"
          >
            <XIcon fontSize="inherit" />
            <span>Join us</span>
          </NavButton>
        </Box>
      )}
      {showProduct && (
        <ProductContainer ref={productRef}>
          <CloseButton component={NavLink} to="/app/shop" aria-label="Close product">
            <CloseIcon />
          </CloseButton>
          <Typography variant="h6" gutterBottom>
            Product Details {id}
          </Typography>
          <Typography>Placeholder for product info...</Typography>
        </ProductContainer>
      )}
    </NavbarContainer>
  );
};

export default Navbar;