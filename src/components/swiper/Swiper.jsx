import React, { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Данные для слайдера
const swiperData = [
  {
    image: 'https://backiee.com/static/wallpapers/1000x563/402806.jpg',
    title: 'Portal to Aether',
    description: 'A gateway to celestial realms, pulsing with arcane energy.',
  },
  {
    image: 'https://backiee.com/static/wallpapers/1000x563/305173.jpg',
    title: 'Mystic Ruins',
    description: 'Ancient stones whisper secrets of forgotten magic.',
  },
  {
    image: 'https://backiee.com/static/wallpapers/1000x563/343827.jpg',
    title: 'Starlit Sanctuary',
    description: 'A sacred haven under a cosmic sky.',
  },
  {
    image: 'https://backiee.com/static/wallpapers/1000x563/303387.jpg',
    title: 'Shadow Enclave',
    description: 'Where darkness and light dance in eternal balance.',
  },
  {
    image: 'https://backiee.com/static/wallpapers/1000x563/235640.jpg',
    title: 'Crystal Spires',
    description: 'Towers of radiant quartz channel primal forces.',
  },
];

// Styled Components
const SwiperContainer = styled(Box)(({ theme }) => ({
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

const SlideWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 223, 0, 0.3)',
  boxShadow: '0 4px 15px rgba(255, 223, 0, 0.15)',
  transition: 'all 0.4s ease',
  margin: '0 auto',
  '&:hover': {
    boxShadow: '0 8px 25px rgba(255, 223, 0, 0.4)',
    border: '1px solid rgba(255, 223, 0, 0.9)',
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '780px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '340px',
    borderRadius: '12px',
  },
  [theme.breakpoints.down('xs')]: {
    maxWidth: '100%',
  },
}));

const SlideImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '400px',
  objectFit: 'cover',
  display: 'block',
  filter: 'brightness(0.9)',
  transition: 'filter 0.3s ease',
  '&:hover': {
    filter: 'brightness(1.1)',
  },
  [theme.breakpoints.down('md')]: {
    height: '300px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '400px',
    aspectRatio: '16/9', // Сохраняет альбомный формат
  },
  [theme.breakpoints.down('xs')]: {
    height: '500px',
  },
}));

const SlideOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: '0',
  width: '100%',
  height: '100%',
  background: 'radial-gradient(circle at center, rgba(255, 223, 0, 0.2) 0%, transparent 70%)',
  opacity: 0,
  transition: 'opacity 0.4s ease',
  '&:hover': {
    opacity: 0.5,
  },
  [theme.breakpoints.down('sm')]: {
    opacity: 0.2, // Лёгкий эффект для мобильных
  },
}));

const SlideContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: '20px',
  background: 'rgba(50, 0, 100, 0.49)',
  backdropFilter: 'blur(8px)',
  color: '#fff',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(50, 0, 100, 0.41)',
    boxShadow: '0 -4px 15px rgba(255, 223, 0, 0.3)',
  },
  [theme.breakpoints.down('md')]: {
    padding: '18px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '15px',
  },
  [theme.breakpoints.down('xs')]: {
    padding: '10px',
  },
}));

const SlideTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Cinzel", serif',
  fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
  fontWeight: 700,
  color: '#ffd700',
  textShadow: '0 0 8px rgba(255, 223, 0, 0.5)',
  marginBottom: '8px',
  [theme.breakpoints.down('md')]: {
    fontSize: 'clamp(1.3rem, 2.3vw, 1.6rem)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
    marginBottom: '6px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
  },
}));

const SlideDescription = styled(Typography)(({ theme }) => ({
  fontFamily: '"Lora", serif',
  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
  fontWeight: 400,
  color: '#e0e0e0',
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

const SwiperComponent = () => {
  const swiperRef = useRef(null);
  const particleContainerRef = useRef(null);

  useEffect(() => {
    // Анимация появления слайдера
    gsap.fromTo(
      swiperRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
      }
    );

    // Анимация текста на слайдах
    const slides = swiperRef.current.querySelectorAll('.swiper-slide');
    slides.forEach((slide) => {
      const content = slide.querySelector('.slide-content');
      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.7,
          }
        );
      }
    });

    // Частицы вокруг активного слайда
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainerRef.current = particleContainer;
    swiperRef.current.prepend(particleContainer);

    const particles = [];
    const particleCount = 15;
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

  return (
    <SwiperContainer ref={swiperRef}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: false,
          },
          600: {
            slidesPerView: 1.2,
            spaceBetween: 15,
            centeredSlides: true,
          },
          960: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        style={{ paddingBottom: '50px' }}
      >
        {swiperData.map((item, index) => (
          <SwiperSlide key={index}>
            <SlideWrapper>
              <SlideImage src={item.image} alt={item.title} />
              <SlideOverlay />
              <SlideContent className="slide-content">
                <SlideTitle>{item.title}</SlideTitle>
                <SlideDescription>{item.description}</SlideDescription>
              </SlideContent>
            </SlideWrapper>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};

// CSS для частиц и кастомизации Swiper
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
  .swiper-button-next, .swiper-button-prev {
    color: #ffd700;
    background: rgba(50, 0, 100, 0.3);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    transition: all 0.3s ease;
  }
  .swiper-button-next:hover, .swiper-button-prev:hover {
    background: rgba(255, 223, 0, 0.5);
    box-shadow: 0 0 15px rgba(255, 223, 0, 0.7);
  }
  .swiper-button-next:after, .swiper-button-prev:after {
    font-size: 20px;
  }
  @media (max-width: 600px) {
    .swiper-button-next, .swiper-button-prev {
      width: 32px;
      height: 32px;
    }
    .swiper-button-next:after, .swiper-button-prev:after {
      font-size: 16px;
    }
  }
  .swiper-pagination-bullet {
    background: rgba(255, 223, 0, 0.5);
    opacity: 0.7;
    transition: all 0.3s ease;
  }
  .swiper-pagination-bullet-active {
    background: #ffd700;
    opacity: 1;
    transform: scale(1.3);
  }
  @media (max-width: 600px) {
    .swiper-pagination-bullet {
      width: 6px;
      height: 6px;
    }
    .swiper-pagination-bullet-active {
      transform: scale(1.5);
    }
  }
`;
document.head.appendChild(styles);

export default SwiperComponent;