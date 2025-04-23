import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import Tilt from 'react-parallax-tilt';
import { gsap } from 'gsap';

const BigContainer = styled(Box)(({ theme }) => ({
width:"100%",
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

}));
// Styled Components
const MainContainer = styled(Box)(({ theme }) => ({
  background: 'transparent',
  minHeight: 'calc(100vh - 80px)',
  padding: '80px 20px',
  color: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: '40px 15px',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: '6rem',
  fontWeight: 900,
  color: '#fff',
  textShadow: '0 0 25px rgba(255, 0, 0, 0.9), 0 0 40px rgba(139, 0, 0, 0.6)',
  marginBottom: '40px',
  animation: 'pulseGlow 1.8s ease-in-out infinite',
  '@keyframes pulseGlow': {
    '0%, 100%': { textShadow: '0 0 25px rgba(255, 0, 0, 0.9), 0 0 40px rgba(139, 0, 0, 0.6)' },
    '50%': { textShadow: '0 0 40px rgba(255, 0, 0, 1), 0 0 60px rgba(139, 0, 0, 0.8)' },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '3.5rem',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: '"Lora", "Cinzel", serif',
  fontSize: '1.5rem',
  color: '#fff',
  maxWidth: '800px',
  lineHeight: '1.9',
  textShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
  marginBottom: '30px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
    maxWidth: '90%',
  },
}));

const PlayButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: '1.2rem',
  fontWeight: 700,
  color: '#fff',
  background: 'linear-gradient(45deg, #ff0000, #8b0000)',
  padding: '12px 30px',
  borderRadius: '12px',
  textTransform: 'uppercase',
  boxShadow: '0 0 15px rgba(255, 0, 0, 0.7), 0 0 25px rgba(139, 0, 0, 0.5)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #ff3333, #a10000)',
    boxShadow: '0 0 25px rgba(255, 0, 0, 0.9), 0 0 35px rgba(139, 0, 0, 0.7)',
    transform: 'scale(1.1)',
  },
  animation: 'pulseButton 2s ease-in-out infinite',
  '@keyframes pulseButton': {
    '0%, 100%': { boxShadow: '0 0 15px rgba(255, 0, 0, 0.7), 0 0 25px rgba(139, 0, 0, 0.5)' },
    '50%': { boxShadow: '0 0 20px rgba(255, 0, 0, 0.9), 0 0 30px rgba(139, 0, 0, 0.7)' },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    padding: '10px 20px',
  },
}));

const Particle = styled(Box)(({ theme, shape }) => ({
  position: 'absolute',
  width: shape === 'star' ? '12px' : '8px',
  height: shape === 'star' ? '12px' : '8px',
  background:
    shape === 'star'
      ? 'radial-gradient(circle, rgba(255, 0, 0, 0.9), rgba(255, 0, 0, 0))'
      : 'radial-gradient(circle, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0))',
  borderRadius: shape === 'star' ? '0' : '50%',
  clipPath:
    shape === 'star'
      ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
      : 'none',
  pointerEvents: 'none',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    width: shape === 'star' ? '8px' : '6px',
    height: shape === 'star' ? '8px' : '6px',
  },
}));

const Main = () => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Анимация заголовка
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -80, scale: 0.6, filter: 'blur(5px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.8,
        ease: 'power4.out',
      }
    );

    // Анимация описания (появление слов)
    const words = descRef.current?.querySelectorAll('.word');
    gsap.fromTo(
      words,
      { opacity: 0, y: 30, filter: 'blur(3px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.04,
        ease: 'power4.out',
        delay: 0.6,
      }
    );

    // Анимация кнопки
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
        delay: 1,
      }
    );

    // Анимация частиц
    const particles = containerRef.current?.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: () => Math.random() * 250 - 125,
        y: () => Math.random() * 250 - 125,
        opacity: () => Math.random() * 0.4 + 0.2,
        scale: () => Math.random() * 0.6 + 0.4,
        rotation: () => Math.random() * 360,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.08,
      });
    });
  }, []);

  // Разделение текста на слова для анимации
  const descriptionText =
    'Enigma RPG is a multiplayer P2E game that runs as a Discord bot. Embark on quests, battle monsters, complete dungeons and raids, and build your character—all through interactive slash commands and button-based choices.';
  const words = descriptionText.split(' ').map((word, index) => (
    <span key={index} className="word" style={{ display: 'inline-block', margin: '0 4px' }}>
      {word}
    </span>
  ));

  return (
<BigContainer>

      <MainContainer ref={containerRef}>
        {/* Декоративные частицы (круги и звёзды) */}
        {[...Array(30)].map((_, index) => (
          <Particle
            key={index}
            className="particle"
            shape={index % 2 === 0 ? 'circle' : 'star'}
            sx={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
        <Tilt
          tiltMaxAngleX={20}
          tiltMaxAngleY={20}
          glareEnable={true}
          glareMaxOpacity={0.6}
          glareColor="#ff0000"
          scale={1.15}
          perspective={700}
        >
          <Title ref={titleRef} variant="h1">
            Enigma
          </Title>
        </Tilt>
        <Description ref={descRef} variant="body1">
          {words}
        </Description>
        <PlayButton
          ref={buttonRef}
          variant="contained"
          href="https://discord.com" // Замените на реальную ссылку
          target="_blank"
          rel="noopener noreferrer"
        >
          Play Now
        </PlayButton>
      </MainContainer>
</BigContainer>
  );
};

export default Main;