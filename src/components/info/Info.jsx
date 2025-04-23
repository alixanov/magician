import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import Tilt from 'react-parallax-tilt';
import { gsap } from 'gsap';

// Styled Components
const InfoContainer = styled(Box)(({ theme }) => ({
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
  fontSize: '5rem',
  fontWeight: 900,
  color: '#fff',
  textShadow: '0 0 25px rgba(255, 0, 0, 0.9), 0 0 40px rgba(139, 0, 0, 0.6)',
  marginBottom: '30px',
  animation: 'pulseGlow 1.8s ease-in-out infinite',
  '@keyframes pulseGlow': {
    '0%, 100%': { textShadow: '0 0 25px rgba(255, 0, 0, 0.9), 0 0 40px rgba(139, 0, 0, 0.6)' },
    '50%': { textShadow: '0 0 40px rgba(255, 0, 0, 1), 0 0 60px rgba(139, 0, 0, 0.8)' },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '3rem',
  },
  // Hover effect removed as requested
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif', // More modern font
  fontSize: '2rem',
  fontWeight: 700,
  color: '#fff',
  textShadow: '0 0 15px rgba(255, 0, 0, 0.7)',
  margin: '20px 0',
  letterSpacing: '0.5px', // Better letter spacing for modern look
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif', // More modern font
  fontSize: '1.4rem',
  color: '#fff',
  maxWidth: '800px',
  lineHeight: '1.8',
  textShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
  marginBottom: '20px',
  fontWeight: 400, // More balanced weight
  letterSpacing: '0.2px', // Subtle letter spacing
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
    maxWidth: '90%',
  },
}));

const FeatureList = styled(List)(({ theme }) => ({
  maxWidth: '800px',
  margin: '20px 0',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '90%',
  },
}));

const FeatureItem = styled(ListItem)(({ theme }) => ({
  padding: '8px 0',
  '& .MuiListItemText-primary': {
    fontFamily: '"Inter", sans-serif', // More modern font
    fontSize: '1.2rem',
    color: '#fff',
    textShadow: '0 0 8px rgba(255, 0, 0, 0.4)',
    fontWeight: 500, // Better readability
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiListItemText-primary': {
      fontSize: '1rem',
    },
  },
}));

const JoinButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif', // More modern font
  fontSize: '1.2rem',
  fontWeight: 700,
  color: '#fff',
  background: 'linear-gradient(45deg, #ff0000, #8b0000)',
  padding: '12px 30px',
  borderRadius: '12px',
  textTransform: 'none', // More modern approach without all caps
  boxShadow: '0 0 15px rgba(255, 0, 0, 0.7), 0 0 25px rgba(139, 0, 0, 0.5)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #ff3333, #a10000)',
    boxShadow: '0 0 25px rgba(255, 0, 0, 0.9), 0 0 35px rgba(139, 0, 0, 0.7)',
    transform: 'scale(1.05)', // Subtle scale for modern feel
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

const Info = () => {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const goldRef = useRef(null);
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

    // Анимация описания - модернизированная версия с более плавным появлением
    const descWords = descRef.current?.querySelectorAll('.word');
    gsap.fromTo(
      descWords,
      { opacity: 0, y: 20, filter: 'blur(2px)' }, // Более тонкие значения для современного вида
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8, // Быстрее для более отзывчивого ощущения
        stagger: 0.03, // Более быстрый стаггер
        ease: 'power3.out', // Другая функция сглаживания
        delay: 0.6,
      }
    );

    // Анимация секции про золото - модернизированная версия
    const goldWords = goldRef.current?.querySelectorAll('.word');
    gsap.fromTo(
      goldWords,
      { opacity: 0, y: 20, filter: 'blur(2px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.03,
        ease: 'power3.out',
        delay: 0.9,
      }
    );

    // Анимация кнопки
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 30, scale: 0.9 }, // Менее драматичные значения
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 1.2,
      }
    );

    // Анимация частиц
    const particles = containerRef.current?.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        x: () => Math.random() * 200 - 100, // Менее агрессивное движение
        y: () => Math.random() * 200 - 100,
        opacity: () => Math.random() * 0.5 + 0.3, // Более заметные частицы
        scale: () => Math.random() * 0.5 + 0.5,
        rotation: () => Math.random() * 360,
        duration: 3.5, // Чуть быстрее
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.06,
      });
    });
  }, []);

  // Разделение текста на слова для анимации
  const descriptionText =
    'ENIGMA RPG is a multiplayer P2E game that runs as a Discord bot. Embark on quests, battle monsters, complete dungeons and raids, and build your character—all through interactive slash commands and button-based choices.';
  const descWords = descriptionText.split(' ').map((word, index) => (
    <span key={index} className="word" style={{ display: 'inline-block', margin: '0 4px' }}>
      {word}
    </span>
  ));

  const goldText =
    'Gold powers ENIGMA RPG – a premium in-game currency earned through engaging in various activities. Battle fierce creatures, conquer challenging dungeons, survive deadly ambushes, and navigate the black market to grow your gold reserves. Special events and unique items – even rare mounts – can unlock extra rewards, giving you an edge in the adventure.';
  const goldWords = goldText.split(' ').map((word, index) => (
    <span key={index} className="word" style={{ display: 'inline-block', margin: '0 4px' }}>
      {word}
    </span>
  ));

  return (
    <InfoContainer ref={containerRef}>
      {/* Декоративные частицы */}
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
        tiltMaxAngleX={15} // Reduced tilt for more subtle effect
        tiltMaxAngleY={15}
        glareEnable={true}
        glareMaxOpacity={0.5}
        glareColor="#ff0000"
        scale={1.1} // Reduced scale for more subtle effect
        perspective={800} // Increased perspective for more natural feel
      >
        <Title ref={titleRef} variant="h1">
          Enigma RPG
        </Title>
      </Tilt>
      <Description ref={descRef} variant="body1">
        {descWords}
      </Description>
      <Subtitle variant="h2">Master the Power of Gold</Subtitle>
      <Description ref={goldRef} variant="body1">
        {goldWords}
      </Description>
  
    </InfoContainer>
  );
};

export default Info;