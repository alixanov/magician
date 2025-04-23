import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Card, CardContent as MuiCardContent, Grid } from '@mui/material';
import { gsap } from 'gsap';
import gettingBackground from '../../assets/backiee-303757-landscape.jpg';
import { Fireplace, PersonAdd, Explore, Group } from '@mui/icons-material';

// Styled Components
const GettingContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  background: `url(${gettingBackground}) no-repeat center center`,
  backgroundSize: 'cover',
  minHeight: '100vh',
  padding: '60px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 10, 20, 0.24)', // Тёмный оверлей с лёгким синим оттенком
    zIndex: 1,
  },
  [theme.breakpoints.down('sm')]: {
    padding: '40px 10px',
  },
}));

const NeonGrid = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: `
    linear-gradient(90deg, rgba(255, 50, 50, 0.1) 1px, transparent 1px),
    linear-gradient(0deg, rgba(255, 50, 50, 0.1) 1px, transparent 1px)
  `,
  backgroundSize: '50px 50px',
  zIndex: 2,
  opacity: 0.3,
});

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  width: '100%',
  maxWidth: '900px', // Для сетки 2x2
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Exo 2", sans-serif',
  fontSize: '3.5rem',
  fontWeight: 900,
  color: '#fff',
  textAlign: 'center',
  marginBottom: '50px',
  background: 'linear-gradient(45deg, #ff3232, #ff8c00)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 20px rgba(255, 50, 50, 0.7), 0 0 40px rgba(255, 140, 0, 0.5)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.2rem',
    marginBottom: '30px',
  },
}));

const StepCard = styled(Card)(({ theme }) => ({
  background: 'rgba(20, 20, 30, 0.6)', // Glassmorphism
  backdropFilter: 'blur(10px)',
  borderRadius: '20px',
  border: '1px solid rgba(255, 50, 50, 0.3)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 15px rgba(255, 50, 50, 0.2)',
  transition: 'all 0.3s ease',
  transform: 'translateZ(0)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5), 0 0 25px rgba(255, 50, 50, 0.4)',
    borderColor: 'rgba(255, 50, 50, 0.6)',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '10px auto',
  },
}));

const StepNumber = styled(Typography)(({ theme }) => ({
  fontFamily: '"Exo 2", sans-serif',
  fontSize: '2rem',
  fontWeight: 800,
  color: '#ff3232',
  marginBottom: '10px',
  textShadow: '0 0 12px rgba(255, 50, 50, 0.6)',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.6rem',
  },
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Exo 2", sans-serif',
  fontSize: '1.3rem',
  fontWeight: 700,
  color: '#fff',
  marginBottom: '10px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));

const StepDescription = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: '0.9rem',
  color: '#d0d0d0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
}));

const StepIcon = styled(Box)(({ theme }) => ({
  color: '#ff3232',
  marginBottom: '12px',
  '& svg': {
    fontSize: '2rem',
    filter: 'drop-shadow(0 0 10px rgba(255, 50, 50, 0.5))',
  },
  [theme.breakpoints.down('sm')]: {
    '& svg': {
      fontSize: '1.6rem',
    },
  },
}));

const CustomCardContent = styled(MuiCardContent)({
  padding: '20px',
  textAlign: 'center',
});

const Getting = () => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const titleRef = useRef(null);

  const steps = [
    {
      number: '1',
      title: 'Invite the Bot or Join Discord',
      description: 'Easily invite our bot to your own server or join our official Discord to start your journey.',
      icon: <Fireplace />,
    },
    {
      number: '2',
      title: 'Create Your Character',
      description: 'Once you join, your character is automatically created with basic gear plus starting currency and XP.',
      icon: <PersonAdd />,
    },
    {
      number: '3',
      title: 'Begin Your Adventure',
      description: 'Use /adventure to start random quests. Gain XP, silver, gold, lootboxes, and more.',
      icon: <Explore />,
    },
    {
      number: '4',
      title: 'Dungeons, Raids & Duels',
      description: 'Challenge yourself with /dungeon (full health!), team raids, or duels for greater rewards.',
      icon: <Group />,
    },
  ];

  useEffect(() => {
    // Интерактивная неоновая сетка (реакция на движение мыши)
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      gsap.to(gridRef.current, {
        x,
        y,
        rotationX: y * 0.1,
        rotationY: -x * 0.1,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Пульсация сетки
    gsap.to(gridRef.current, {
      opacity: 0.5,
      scale: 1.05,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Анимация заголовка
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, scale: 0.8, filter: 'blur(12px)' },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'power4.out',
      }
    );

    // Анимация карточек
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 150,
          scale: 0.9,
          rotation: index % 2 === 0 ? 10 : -10,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.15,
        }
      );
    });

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf([gridRef.current, titleRef.current, cardRefs.current]);
    };
  }, []);

  return (
    <GettingContainer className="getting__container" ref={containerRef}>
      <NeonGrid ref={gridRef} />
      <ContentWrapper>
        <SectionTitle variant="h2" ref={titleRef}>
          Getting Started
        </SectionTitle>
        <Grid container spacing={3} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <StepCard
                ref={(el) => (cardRefs.current[index] = el)}
                sx={{ maxWidth: 400, margin: '0 auto' }}
              >
                <CustomCardContent>
                  <StepIcon>{step.icon}</StepIcon>
                  <StepNumber variant="h3">{step.number}</StepNumber>
                  <StepTitle variant="h4">{step.title}</StepTitle>
                  <StepDescription variant="body1">{step.description}</StepDescription>
                </CustomCardContent>
              </StepCard>
            </Grid>
          ))}
        </Grid>
      </ContentWrapper>
    </GettingContainer>
  );
};

export default Getting;