import React, { useEffect, useRef, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import Tilt from 'react-parallax-tilt';
import { gsap } from 'gsap';
import { charactersData } from '../data/AiData';
import SwiperComponent from '../swiper/Swiper';

// Styled Components
const MainContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 'clamp(20px, 5vw, 40px) clamp(10px, 2vw, 20px)',
  minHeight: 'calc(100vh - 80px)',
  background: 'transparent',
  color: '#fff',
  position: 'relative',
  zIndex: 10,
  [theme.breakpoints.down('lg')]: {
    padding: 'clamp(15px, 4vw, 30px) clamp(8px, 1.5vw, 15px)',
  },
  [theme.breakpoints.down('md')]: {
    padding: 'clamp(12px, 3vw, 25px) clamp(6px, 1vw, 12px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: 'clamp(10px, 2vw, 20px) clamp(5px, 1vw, 10px) clamp(10px, 2vw, 20px) clamp(5px, 1vw, 10px)',
    minHeight: 'calc(100vh - 60px)',
    paddingBottom: '60px', // Учёт мобильного футера
  },
  [theme.breakpoints.down('xs')]: {
    padding: '10px 5px 60px 5px',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
  fontWeight: 700,
  color: '#ffd700',
  textShadow: '0 0 12px rgba(255, 223, 0, 0.6)',
  marginBottom: 'clamp(15px, 3vw, 25px)',
  animation: 'titlePulse 3s ease-in-out infinite',
  letterSpacing: '0.05em',
  '@keyframes titlePulse': {
    '0%, 100%': { transform: 'scale(1)', textShadow: '0 0 12px rgba(255, 223, 0, 0.6)' },
    '50%': { transform: 'scale(1.05)', textShadow: '0 0 20px rgba(255, 223, 0, 0.9)' },
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
    marginBottom: 'clamp(10px, 2vw, 15px)',
  },
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  maxWidth: 'clamp(600px, 90%, 1200px)',
  textAlign: 'center',
  marginBottom: 'clamp(30px, 5vw, 50px)',
  padding: 'clamp(15px, 3vw, 25px)',
  borderRadius: '12px',
  background: 'transparent',
  [theme.breakpoints.down('md')]: {
    maxWidth: '95%',
    marginBottom: 'clamp(20px, 4vw, 40px)',
    padding: 'clamp(12px, 2vw, 20px)',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
    marginBottom: 'clamp(15px, 3vw, 30px)',
    padding: 'clamp(10px, 1.5vw, 15px)',
  },
}));

const WelcomeTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
  fontWeight: 700,
  color: '#ffd700',
  marginBottom: 'clamp(10px, 2vw, 16px)',
  textShadow: '0 0 10px rgba(255, 223, 0, 0.6)',
  animation: 'titleGlow 2s ease-in-out infinite',
  letterSpacing: '0.03em',
  '@keyframes titleGlow': {
    '0%, 100%': { textShadow: '0 0 10px rgba(255, 223, 0, 0.6)' },
    '50%': { textShadow: '0 0 18px rgba(255, 223, 0, 0.9)' },
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(1rem, 2vw, 1.5rem)',
    marginBottom: 'clamp(8px, 1.5vw, 12px)',
  },
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Lora", serif',
  fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
  fontWeight: 400,
  color: '#e0e0e0',
  lineHeight: '1.8',
  letterSpacing: '0.02em',
  '& span': {
    color: '#ffd700',
    fontWeight: 600,
  },
  animation: 'textFlicker 4s ease-in-out infinite',
  '@keyframes textFlicker': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.95 },
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
    lineHeight: '1.6',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
    lineHeight: '1.5',
  },
}));

const CharactersGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 30vw, 300px), 1fr))',
  gap: 'clamp(20px, 3vw, 30px)',
  width: '100%',
  maxWidth: 'clamp(800px, 90vw, 1600px)',
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(220px, 28vw, 280px), 1fr))',
    maxWidth: 'clamp(700px, 95vw, 1400px)',
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(200px, 45vw, 260px), 1fr))',
    gap: 'clamp(15px, 2vw, 25px)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: 'clamp(10px, 1.5vw, 20px)',
    maxWidth: '100%',
  },
}));

const CharacterCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 223, 0, 0.3)',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(255, 223, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 25px rgba(255, 223, 0, 0.3)',
    border: '1px solid rgba(255, 223, 0, 0.8)',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '340px',
  },
}));

const CharacterImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'clamp(200px, 25vw, 300px)',
  objectFit: 'cover',
  display: 'block',
  [theme.breakpoints.down('md')]: {
    height: 'clamp(180px, 22vw, 260px)',
  },
  [theme.breakpoints.down('sm')]: {
    height: 'clamp(360px, 20vw, 220px)',
  },
}));

const CharacterInfo = styled(Box)(({ theme }) => ({
  padding: 'clamp(15px, 2vw, 20px)',
  color: '#fff',
  textAlign: 'center',
  fontFamily: '"Cinzel", serif',
  [theme.breakpoints.down('sm')]: {
    padding: 'clamp(10px, 1.5vw, 15px)',
  },
}));

const CharacterName = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
  fontWeight: 700,
  marginBottom: 'clamp(6px, 1vw, 8px)',
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
  },
}));

const CharacterClass = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
  fontWeight: 500,
  color: '#ffd700',
  marginBottom: 'clamp(6px, 1vw, 8px)',
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
  },
}));

const CharacterTrait = styled(Typography)(({ theme }) => ({
  fontFamily: '"Lora", serif',
  fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
  fontWeight: 400,
  color: '#ccc',
  marginBottom: 'clamp(8px, 1.2vw, 12px)',
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.8rem, 1vw, 0.9rem)',
  },
}));

const PowerLevel = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)',
  fontWeight: 600,
  color: '#ffd700',
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.8rem, 1vw, 1rem)',
  },
}));

const Main = () => {
  const cardsRef = useRef([]);
  const welcomeRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.1,
    };

    const animateOnScroll = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;

          if (target === welcomeRef.current) {
            // Анимация приветственного блока
            gsap.fromTo(
              target,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
              }
            );
            // Анимация текста
            gsap.fromTo(
              target.querySelectorAll('.welcome-text'),
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power3.out',
                delay: 0.2,
              }
            );
          }

          if (target === swiperRef.current) {
            // Анимация слайдера
            gsap.fromTo(
              target,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
              }
            );
          }

          cardsRef.current.forEach((card, index) => {
            if (card && entry.target.contains(card)) {
              gsap.fromTo(
                card,
                { opacity: 0, y: 50 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.8,
                  ease: 'power3.out',
                  delay: index * 0.1,
                }
              );
            }
          });

          observer.unobserve(target);
        }
      });
    };

    const observer = new IntersectionObserver(animateOnScroll, observerOptions);

    if (welcomeRef.current) observer.observe(welcomeRef.current);
    if (swiperRef.current) observer.observe(swiperRef.current);
    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      if (welcomeRef.current) observer.unobserve(welcomeRef.current);
      if (swiperRef.current) observer.unobserve(swiperRef.current);
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  const memoizedCharacters = useMemo(() => charactersData, []);

  return (
    <MainContainer>
      <Box ref={swiperRef}>
        <SwiperComponent />
      </Box>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
        <Title variant="h1">✨ Magician</Title>
      </Tilt>
      <WelcomeSection ref={welcomeRef}>
        <WelcomeTitle className="welcome-text" variant="h2">
          Arcane Nexus Awaits
        </WelcomeTitle>
        <WelcomeText className="welcome-text">
          Step into <span>Magician</span>, where arcane power shapes destiny. Choose your mage, unleash devastating spells, and conquer cosmic trials. Harness <span>Aether</span> through battles and relics to claim your legacy.
        </WelcomeText>
      </WelcomeSection>
      <CharactersGrid>
        {memoizedCharacters.map((character, index) => (
          <Tilt key={index} tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={true} glareMaxOpacity={0.2} glareColor="#ffd700">
            <CharacterCard ref={(el) => (cardsRef.current[index] = el)}>
              <CharacterImage src={character.image} alt={character.name} />
              <CharacterInfo>
                <CharacterName>{character.name}</CharacterName>
                <CharacterClass>{character.class}</CharacterClass>
                <CharacterTrait>{character.trait}</CharacterTrait>
                <PowerLevel>{character.powerLevel}</PowerLevel>
              </CharacterInfo>
            </CharacterCard>
          </Tilt>
        ))}
      </CharactersGrid>
    </MainContainer>
  );
};

export default Main;