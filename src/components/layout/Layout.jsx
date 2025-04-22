import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, CssBaseline, useMediaQuery } from '@mui/material';
import { gsap } from 'gsap';
import { Sidebar } from '../../components/';
import '../styles/fonts.css';

// Styled Components
const LayoutContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  // Многослойный фон: звёздное небо, магическая дымка и градиент
  background: `
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
  marginTop: '80px', // Add margin to account for fixed navbar

  [theme.breakpoints.down('sm')]: {
    marginRight: 0,
    paddingBottom: '80px',
    padding: '15px',
    marginTop: '10px', // Add margin to account for fixed navbar

  },
}));

const MainLayout = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  // Магические искры и золотистые лучи
  useEffect(() => {
    const sparks = [];
    const sparkCount = isMobile ? 20 : 40; // Больше искр для большей магии
    const container = document.createElement('div');
    container.className = 'spark-field';
    document.querySelector('#layout-container').prepend(container);

    // Создание искр (звёзды с золотистым свечением)
    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      const size = Math.random() * 5 + 3;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.left = `${Math.random() * (isMobile ? 100 : 80)}%`;
      spark.style.top = `${Math.random() * 100}%`;
      container.appendChild(spark);
      sparks.push(spark);
    }

    // Плавное появление искр
    gsap.fromTo(
      sparks,
      { opacity: 0, scale: 0 },
      {
        opacity: () => Math.random() * 0.6 + 0.4,
        scale: 1,
        duration: 2.5,
        stagger: 0.03,
        ease: 'power3.out',
      }
    );

    // Анимация движения искр
    gsap.to(sparks, {
      x: () => Math.random() * 40 - 20,
      y: () => Math.random() * 40 - 20,
      opacity: () => Math.random() * 0.6 + 0.4,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1,
    });

    // Реакция на движение мыши
    const handleMouseMove = (e) => {
      sparks.forEach((spark) => {
        const rect = spark.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          gsap.to(spark, {
            x: dx * 0.3,
            y: dy * 0.3,
            opacity: 1,
            scale: 2,
            duration: 0.5,
            ease: 'power3.out',
          });
        } else {
          gsap.to(spark, {
            x: 0,
            y: 0,
            opacity: () => Math.random() * 0.6 + 0.4,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
          });
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Создание золотистых лучей
    const raysContainer = document.createElement('div');
    raysContainer.className = 'rays';
    document.querySelector('#layout-container').prepend(raysContainer);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
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
    background: radial-gradient(circle, rgba(255, 223, 0, 1) 10%, rgba(255, 191, 0, 0.7) 50%, rgba(255, 223, 0, 0) 80%);
    opacity: 0.5;
    border-radius: 50%;
    box-shadow: 0 0 12px rgba(255, 223, 0, 0.8), 0 0 20px rgba(255, 191, 0, 0.5);
    will-change: transform, opacity, scale;
    animation: pulse 4s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.3); }
  }
  .rays {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    background: radial-gradient(circle at 30% 30%, rgba(255, 223, 0, 0.15) 0%, transparent 60%);
  }
  .rays::before, .rays::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: conic-gradient(from 0deg at 30% 30%, rgba(255, 223, 0, 0.4), transparent 15%, transparent 85%, rgba(255, 223, 0, 0.4));
    animation: spinRays 25s linear infinite;
  }
  .rays::after {
    animation-direction: reverse;
    background: conic-gradient(from 0deg at 30% 30%, rgba(255, 191, 0, 0.3), transparent 20%, transparent 80%, rgba(255, 191, 0, 0.3));
  }
  @keyframes spinRays {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styles);

export default MainLayout;