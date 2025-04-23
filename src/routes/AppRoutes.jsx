import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main, Layout, Map, Getting ,Info} from '../components';
import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import Footer from '../components/footer/Footer';

// Обновляем тему для насыщенного красно-белого фона
const theme = createTheme({
  typography: {
    fontFamily: '"Cinzel", serif',
    h1: { fontWeight: 700, color: '#FFFFFF' }, // Белый для контраста
    h2: { fontWeight: 600, color: '#FFFFFF' }, // Белый
    button: { fontFamily: '"Cinzel", serif', fontWeight: 500, color: '#FFFFFF' },
  },
  palette: {
    primary: { main: '#D00000', contrastText: '#FFFFFF' }, // Яркий красный
    secondary: { main: '#A80000', contrastText: '#FFFFFF' }, // Тёмно-красный
    background: { default: 'rgb(11, 0, 0)', paper: 'rgba(174, 0, 0, 0.9)' }, // Белый фон с лёгким красным
    text: { primary: '#FFFFFF', secondary: '#E0E0E0' }, // Белый и светло-серый для текста
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Cinzel", serif',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          backgroundColor: '#D00000',
          color: '#FFFFFF',
          '&:hover': {
            boxShadow: '0 0 15px rgba(208, 0, 0, 0.8)',
            transform: 'scale(1.08)',
            backgroundColor: '#A80000',
          },
        },
      },
    },
  },
});

const AppRoutes = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Проверка мобильного режима

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="app/main" element={<Main />} />
          <Route path="app/maps" element={<Map />} />
        </Route>
      </Routes>
      <Info />
      <Getting/>
    </ThemeProvider>
  );
};

export default AppRoutes;