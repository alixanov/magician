import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';
import { gsap } from 'gsap';
import Tilt from 'react-parallax-tilt';

// Данные для карт
const mapData = [
  {
    id: 1,
    image: 'https://backiee.com/static/wallpapers/1000x563/310658.jpg',
    title: 'Astral Veil',
    description: 'A shimmering map woven from starlight, guiding mages to hidden realms.',
  },
  {
    id: 2,
    image: 'https://backiee.com/static/wallpapers/1000x563/369161.jpg',
    title: 'Crimson Abyss',
    description: 'A fiery expanse where only the boldest wizards dare to tread.',
  },
  {
    id: 3,
    image: 'https://backiee.com/static/wallpapers/1000x563/377533.jpg',
    title: 'Moonlit Grove',
    description: 'A tranquil forest under eternal moonlight, filled with ancient magic.',
  },
  {
    id: 4,
    image: 'https://backiee.com/static/wallpapers/1000x563/366435.jpg',
    title: 'Obsidian Spire',
    description: 'A towering fortress of dark stone, pulsing with forbidden power.',
  },
  {
    id: 5,
    image: 'https://backiee.com/static/wallpapers/1000x563/382565.jpg',
    title: 'Celestial Plains',
    description: 'Vast fields under a cosmic sky, where aether flows freely.',
  },
  {
    id: 6,
    image: 'https://backiee.com/static/wallpapers/1000x563/364651.jpg',
    title: 'Void Nexus',
    description: 'A chaotic rift where realities converge and unravel.',
  },
];

// Styled Components
const MapContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '40px 20px',
  position: 'relative',
  zIndex: 10,
  [theme.breakpoints.down('md')]: {
    maxWidth: '780px',
    padding: '30px 15px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '340px',
    padding: '20px 10px 60px', // Учитывает футер
  },
  [theme.breakpoints.down('xs')]: {
    maxWidth: '100%',
    padding: '15px 8px 60px',
  },
}));

const WelcomeSection = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1200px',
  textAlign: 'center',
  marginBottom: '40px',
  padding: '20px',
  borderRadius: '12px',
  background: 'transparent',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '780px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '340px',
    padding: '15px',
    marginBottom: '20px',
  },
  [theme.breakpoints.down('xs')]: {
    maxWidth: '100%',
    padding: '10px',
  },
}));

const WelcomeTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: 'clamp(1.8rem, 3vw, 2rem)',
  fontWeight: 700,
  color: '#ffd700',
  marginBottom: '16px',
  textShadow: '0 0 10px rgba(255, 223, 0, 0.6)',
  animation: 'titleGlow 2s ease-in-out infinite',
  '@keyframes titleGlow': {
    '0%, 100%': { textShadow: '0 0 10px rgba(255, 223, 0, 0.6)' },
    '50%': { textShadow: '0 0 18px rgba(255, 223, 0, 0.9)' },
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1.6rem, 2.8vw, 1.8rem)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(1.4rem, 2.5vw, 1.5rem)',
    marginBottom: '10px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 'clamp(1.2rem, 2vw, 1.3rem)',
  },
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Lora", serif',
  fontSize: 'clamp(1.1rem, 2vw, 1.2rem)',
  fontWeight: 400,
  color: '#e0e0e0',
  lineHeight: '1.8',
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
    fontSize: 'clamp(1rem, 1.8vw, 1.1rem)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.9rem, 1.6vw, 1rem)',
    lineHeight: '1.6',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 'clamp(0.8rem, 1.4vw, 0.9rem)',
  },
}));

const MapGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '30px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
    maxWidth: '780px',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    maxWidth: '340px',
    gap: '20px',
  },
  [theme.breakpoints.down('xs')]: {
    maxWidth: '100%',
    gap: '15px',
  },
}));

const MapCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 223, 0, 0.3)',
  borderRadius: '16px',
  overflow: 'hidden',
  transition: 'all 0.4s ease',
  boxShadow: '0 4px 15px rgba(255, 223, 0, 0.15)',
  position: 'relative',
  margin: '0 auto',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 25px rgba(255, 223, 0, 0.4)',
    border: '1px solid rgba(255, 223, 0, 0.9)',
    '&:before': {
      opacity: 1,
      transform: 'scale(1.2)',
    },
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, rgba(255, 223, 0, 0.2) 0%, transparent 70%)',
    opacity: 0,
    transition: 'all 0.4s ease',
    zIndex: 0,
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '340px',
  },
  [theme.breakpoints.down('xs')]: {
    maxWidth: '100%',
  },
}));

const MapImage = styled('img')(({ theme }) => ({
  width: '100%',
  aspectRatio: '16/9', // Подчёркивает альбомный формат
  objectFit: 'cover',
  display: 'block',
  filter: 'brightness(0.9)',
  transition: 'filter 0.3s ease',
  '&:hover': {
    filter: 'brightness(1.1)',
  },
  [theme.breakpoints.down('md')]: {
    height: '200px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '180px',
  },
  [theme.breakpoints.down('xs')]: {
    height: '160px',
  },
}));

const MapContent = styled(Box)(({ theme }) => ({
  padding: '20px',
  color: '#fff',
  textAlign: 'center',
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    padding: '18px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '15px',
  },
  [theme.breakpoints.down('xs')]: {
    padding: '12px',
  },
}));

const MapTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: 'clamp(1.6rem, 2.5vw, 1.8rem)',
  fontWeight: 700,
  color: '#ffd700',
  textShadow: '0 0 8px rgba(255, 223, 0, 0.5)',
  marginBottom: '10px',
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1.5rem, 2.3vw, 1.7rem)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(1.4rem, 2vw, 1.5rem)',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 'clamp(1.2rem, 1.8vw, 1.3rem)',
  },
}));

const MapDescription = styled(Typography)(({ theme }) => ({
  fontFamily: '"Lora", serif',
  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
  fontWeight: 400,
  color: '#e0e0e0',
  marginBottom: '15px',
  lineHeight: '1.5',
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.8rem, 1.3vw, 0.9rem)',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
    lineHeight: '1.4',
  },
}));

const SelectButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: 'clamp(1rem, 1.6vw, 1.1rem)',
  fontWeight: 600,
  color: '#fff',
  background: 'linear-gradient(45deg, #ffd700, #ffbf00)',
  borderRadius: '8px',
  padding: '10px 20px',
  textTransform: 'none',
  boxShadow: '0 0 10px rgba(255, 223, 0, 0.5)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(45deg, #ffbf00, #ffd700)',
    boxShadow: '0 0 15px rgba(255, 223, 0, 0.8)',
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
    padding: '8px 16px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 'clamp(0.85rem, 1.3vw, 0.95rem)',
    padding: '6px 12px',
  },
}));

const Map = () => {
  const cardsRef = useRef([]);
  const welcomeRef = useRef(null);

  useEffect(() => {
    // Анимация приветственного блока
    gsap.fromTo(
      welcomeRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3,
      }
    );

    // Анимация текста
    gsap.fromTo(
      welcomeRef.current.querySelectorAll('.welcome-text'),
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5,
      }
    );

    // Анимация появления карточек
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.8,
      }
    );

    // Частицы вокруг карт
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    document.querySelector('#map-container').prepend(particleContainer);

    const particles = [];
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 3 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particleContainer.appendChild(particle);
      particles.push(particle);
    }

    gsap.to(particles, {
      x: () => Math.random() * 40 - 20,
      y: () => Math.random() * 40 - 20,
      opacity: () => Math.random() * 0.4 + 0.3,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1,
    });

    return () => {
      particleContainer.remove();
    };
  }, []);

  const handleSelectDesign = (map) => {
    console.log(`Selected map: ${map.title}`);
  };

  return (
    <MapContainer id="map-container">
      <WelcomeSection ref={welcomeRef}>
        <WelcomeTitle className="welcome-text" variant="h2">
          Explore the Arcane Atlas
        </WelcomeTitle>
        <WelcomeText className="welcome-text">
          Unfold the <span>Arcane Atlas</span>, a collection of mystical maps charting realms of untold power. Navigate enchanted groves, fiery abysses, and cosmic plains. Channel <span>Aether</span> through ancient pathways to unlock the secrets of wizardry.
        </WelcomeText>
      </WelcomeSection>
      <MapGrid>
        {mapData.map((map, index) => (
          <Tilt key={map.id} tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.3} glareColor="#ffd700">
            <MapCard ref={(el) => (cardsRef.current[index] = el)}>
              <MapImage src={map.image} alt={map.title} />
              <MapContent>
                <MapTitle>{map.title}</MapTitle>
                <MapDescription>{map.description}</MapDescription>
                <SelectButton onClick={() => handleSelectDesign(map)}>
                  Select Design
                </SelectButton>
              </MapContent>
            </MapCard>
          </Tilt>
        ))}
      </MapGrid>
    </MapContainer>
  );
};

// CSS для частиц
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
    background: radial-gradient(circle, rgba(255, 223, 0, 0.8) 20%, rgba(255, 191, 0, 0.4) 60%, transparent 80%);
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(255, 223, 0, 0.6);
    opacity: 0.4;
    will-change: transform, opacity;
  }
`;
document.head.appendChild(styles);

export default Map;