import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { gsap } from 'gsap';
import { Sidebar } from '../../components/';
import navMain from '../../assets/backiee-317500-landscape.jpg';
import '../styles/fonts.css';

// Styled Components
const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  background: `
    url(${navMain}) no-repeat center/cover,
    radial-gradient(circle at 50% 50%, rgba(10, 0, 50, 0.9) 0%, rgba(0, 0, 20, 1) 70%),
    linear-gradient(180deg, rgba(50, 0, 100, 0.3) 0%, rgba(0, 0, 50, 0.5) 100%),
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.5)"/><circle cx="100" cy="100" r="3" fill="rgba(255,255,255,0.6)"/><circle cx="180" cy="180" r="2" fill="rgba(255,255,255,0.4)"/><circle cx="50" cy="150" r="1.5" fill="rgba(255,255,255,0.3)"/></svg>') repeat
  `,
  position: 'relative',
  fontFamily: 'Cinzel, sans-serif',
  overflow: 'hidden',
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  minHeight: 'calc(100vh - 40px)',
  position: 'relative',
  zIndex: 10,
  marginTop: '80px',
  [theme.breakpoints.down('sm')]: {
    marginRight: 0,
    paddingBottom: '80px',
    padding: '15px',
    marginTop: '10px',
  },
}));

const MainLayout = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const sparks = [];
    const sparkCount = isMobile ? 20 : 40;
    const container = document.createElement('div');
    container.className = 'spark-field';
    document.querySelector('#layout-container').prepend(container);

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      const size = Math.random() * 6 + 4;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.left = `${Math.random() * (isMobile ? 100 : 80)}%`;
      spark.style.top = `${Math.random() * 100}%`;
      container.appendChild(spark);
      sparks.push(spark);
    }

    gsap.fromTo(
      sparks,
      { opacity: 0, scale: 0, rotate: 0 },
      {
        opacity: () => Math.random() * 0.5 + 0.5,
        scale: 1,
        rotate: () => Math.random() * 360,
        duration: 2,
        stagger: 0.05,
        ease: 'power4.out',
      }
    );

    gsap.to(sparks, {
      x: () => Math.random() * 50 - 25,
      y: () => Math.random() * 50 - 25,
      opacity: () => Math.random() * 0.5 + 0.5,
      scale: () => Math.random() * 0.5 + 0.8,
      rotation: () => Math.random() * 180 - 90,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.15,
    });

    const handleMouseMove = (e) => {
      sparks.forEach((spark) => {
        const rect = spark.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          gsap.to(spark, {
            x: dx * 0.5,
            y: dy * 0.5,
            opacity: 1,
            scale: 2.5,
            rotation: Math.random() * 360,
            duration: 0.4,
            ease: 'power4.out',
          });
        } else {
          gsap.to(spark, {
            x: 0,
            y: 0,
            opacity: () => Math.random() * 0.5 + 0.5,
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: 'power4.out',
          });
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    const raysContainer = document.createElement('div');
    raysContainer.className = 'rays';
    document.querySelector('#layout-container').prepend(raysContainer);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove); // Исправлено
      container.remove();
      raysContainer.remove();
    };
  }, [isMobile]);

  return (
    <LayoutContainer id="layout-container">
      <CssBaseline />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
      <Sidebar />
    </LayoutContainer>
  );
};

// CSS для искр и лучей
const styles = document.createElement('style');
styles.innerHTML = `
  .spark-field {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  .spark {
    position: absolute;
    background: radial-gradient(circle, rgba(255, 0, 0, 1) 10%, rgba(139, 0, 0, 0.7) 50%, rgba(255, 0, 0, 0) 80%);
    opacity: 0.5;
    border-radius: 20%;
    box-shadow: 0 0 15px rgba(255, 0, 0, 0.9), 0 0 25px rgba(139, 0, 0, 0.6);
    will-change: transform, opacity, scale, rotation;
    animation: flicker 3s ease-in-out infinite;
  }
  @keyframes flicker {
    0%, 100% { opacity: 0.5; transform: scale(1) rotate(0deg); }
    50% { opacity: 0.8; transform: scale(1.5) rotate(45deg); }
  }
  .rays {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    background: radial-gradient(circle at 40% 40%, rgba(255, 0, 0, 0.2) 0%, transparent 50%);
    animation: pulseRays 10s ease-in-out infinite;
  }
  .rays::before, .rays::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: conic-gradient(from 0deg at 40% 40%, rgba(255, 0, 0, 0.5), transparent 10%, transparent 90%, rgba(255, 0, 0, 0.5));
    animation: spinRays 20s linear infinite;
  }
  .rays::after {
    animation-direction: reverse;
    background: conic-gradient(from 0deg at 40% 40%, rgba(139, 0, 0, 0.4), transparent 15%, transparent 85%, rgba(139, 0, 0, 0.4));
  }
  @keyframes spinRays {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes pulseRays {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 1; }
  }
`;
document.head.appendChild(styles);

export default MainLayout;