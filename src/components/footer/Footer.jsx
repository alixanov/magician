import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import XIcon from '@mui/icons-material/X';


// Styled Components
const FooterContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: '0 auto',
  padding: '50px 40px',
  backdropFilter: 'blur(15px)',
  borderTop: '2px solid rgba(255, 223, 0, 0.5)',
  color: '#fff',
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    maxWidth: '780px',
    padding: '40px 20px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '340px',
    padding: '20px 15px',
    flexDirection: 'column',
    gap: '20px',
    minHeight: '60px', // Совместимость с Navbar
  },
  [theme.breakpoints.down('xs')]: {
    maxWidth: '100%',
    padding: '15px 10px',
  },
}));

const RuneOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '20px',
  background: 'linear-gradient(to bottom, rgba(255, 223, 0, 0.3), transparent)',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  '&:before': {
    content: '"ᚱ ᚢ ᚾ ᛖ ᛋ"',
    fontSize: '14px',
    color: '#ffd700',
    textShadow: '0 0 10px rgba(255, 223, 0, 0.7)',
    animation: 'runePulse 3s ease-in-out infinite',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none', // Скрываем руны на мобильных
  },
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const LogoTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: 'clamp(1.8rem, 3vw, 2rem)',
  fontWeight: 700,
  color: '#ffd700',
  textShadow: '0 0 12px rgba(255, 223, 0, 0.7)',
  marginBottom: '10px',
  animation: 'logoPulse 4s ease-in-out infinite',
  '@keyframes logoPulse': {
    '0%, 100%': { textShadow: '0 0 12px rgba(255, 223, 0, 0.7)' },
    '50%': { textShadow: '0 0 20px rgba(255, 223, 0, 1)' },
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1.6rem, 2.8vw, 1.8rem)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(1.4rem, 2.5vw, 1.6rem)',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Lora", serif',
  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
  fontWeight: 400,
  color: '#e0e0e0',
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
  },
}));

const CopyrightText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Lora", serif',
  fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
  fontWeight: 400,
  color: '#e0e0e0',
  marginTop: '8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.7rem, 1vw, 0.8rem)',
  },
}));

const NavSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '25px',
  [theme.breakpoints.down('sm')]: {
    gap: '15px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

const NavLink = styled(Button)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: 'clamp(1rem, 1.6vw, 1.1rem)',
  fontWeight: 600,
  color: '#ffd700',
  textTransform: 'none',
  padding: '8px 16px',
  background: 'rgba(255, 223, 0, 0.1)',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    background: 'rgba(255, 223, 0, 0.3)',
    boxShadow: '0 0 15px rgba(255, 223, 0, 0.7)',
    transform: 'scale(1.1)',
    '&:before': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to top, rgba(255, 223, 0, 0.4), transparent)',
    opacity: 0,
    transition: 'all 0.3s ease',
    transform: 'translateY(20px)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
    padding: '6px 12px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
  },
}));

const SocialSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    gap: '15px',
    justifyContent: 'center',
  },
}));

const SocialIcon = styled('img')(({ theme }) => ({
  width: '36px',
  height: '36px',
  filter: 'grayscale(30%) brightness(0.9)',
  transition: 'all 0.4s ease',
  position: 'relative',
  '&:hover': {
    filter: 'grayscale(0%) brightness(1.3)',
    transform: 'scale(1.3) rotate(10deg)',
    boxShadow: '0 0 20px rgba(255, 223, 0, 0.9)',
    '&:after': {
      opacity: 1,
      transform: 'scale(1.5)',
    },
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle, rgba(255, 223, 0, 0.5) 10%, transparent 70%)',
    transform: 'translate(-50%, -50%) scale(0)',
    opacity: 0,
    transition: 'all 0.4s ease',
  },
  [theme.breakpoints.down('sm')]: {
    width: '32px',
    height: '32px',
  },
  [theme.breakpoints.down('xs')]: {
    width: '28px',
    height: '28px',
  },
}));

const Footer = () => {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    // Анимация появления футера
    gsap.fromTo(
      footerRef.current,
      { opacity: 0, scale: 0.95, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.3,
      }
    );

    // Анимация логотипа
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.5,
      }
    );

    // Анимация навигации
    gsap.fromTo(
      navRef.current.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.7,
      }
    );

    // Анимация соцсетей
    gsap.fromTo(
      socialRef.current.children,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.9,
      }
    );

    // Частицы
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    footerRef.current.prepend(particleContainer);

    const particles = [];
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particleContainer.appendChild(particle);
      particles.push(particle);
    }

    gsap.to(particles, {
      x: () => Math.random() * 50 - 25,
      y: () => Math.random() * 50 - 25,
      opacity: () => Math.random() * 0.5 + 0.3,
      scale: () => Math.random() * 0.5 + 0.8,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.15,
    });

    return () => {
      particleContainer.remove();
    };
  }, []);

  const socialLinks = [
    { icon: <XIcon sx={{ color: 'white' }} />, alt: 'X-COM', url: 'https://x.com/xcom' },
    { icon: <InstagramIcon sx={{ color: 'white' }} />, alt: 'Instagram', url: 'https://instagram.com' },
    { icon: <TelegramIcon sx={{ color: 'white' }} />, alt: 'Telegram', url: 'https://t.me' },]
  return (
    <FooterContainer ref={footerRef}>
      <RuneOverlay />
      <LogoSection ref={logoRef}>
        <LogoTitle variant="h3">Arcane Realms</LogoTitle>
        <LogoText>Unveil the Arcane Secrets</LogoText>
        <CopyrightText>© {new Date().getFullYear()} Arcane Realms. All rights reserved.</CopyrightText>
      </LogoSection>
      <NavSection ref={navRef}>
        <NavLink component={Link} to="/app/main">Home</NavLink>
        <NavLink component={Link} to="/app/maps">Maps</NavLink>
      </NavSection>
      <SocialSection ref={socialRef}>
        {socialLinks.map((link) => (
          <a key={link.alt} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.icon}
          </a>
        ))}
      </SocialSection>
    </FooterContainer>
  );
};

// CSS для частиц и рун
const styles = document.createElement('style');
styles.innerHTML = `
  .particle-container {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 5;
  }
  .particle {
    position: absolute;
    background: radial-gradient(circle, rgba(255, 223, 0, 0.9) 10%, rgba(255, 191, 0, 0.5) 50%, transparent 80%);
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(255, 223, 0, 0.8);
    opacity: 0.5;
    will-change: transform, opacity, scale;
  }
  @keyframes runePulse {
    0%, 100% { opacity: 0.6; text-shadow: 0 0 10px rgba(255, 223, 0, 0.7); }
    50% { opacity: 1; text-shadow: 0 0 20px rgba(255, 223, 0, 1); }
  }
`;
document.head.appendChild(styles);

export default Footer;