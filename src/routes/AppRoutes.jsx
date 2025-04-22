import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main, Layout,Map} from '../components';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Создаем тему с магическим шрифтом и цветами
const theme = createTheme({
  typography: {
    fontFamily: '"Cinzel", serif', // Элегантный шрифт для волшебной темы
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    button: { fontFamily: '"Cinzel", serif', fontWeight: 500 },
  },
  palette: {
    primary: {
      main: '#ffd700', // Золотистый для акцентов
      contrastText: '#fff',
    },
    secondary: {
      main: '#500080', // Тёмно-фиолетовый для фона
      contrastText: '#fff',
    },
    background: {
      default: '#0a0032', // Тёмно-синий для body
      paper: 'rgba(50, 0, 100, 0.2)', // Полупрозрачный для Navbar
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Cinzel", serif',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 0 15px rgba(255, 223, 0, 0.5)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
  },
});

const AppRoutes = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="app/main" element={<Main />} />
          <Route path='app/maps' element={<Map/>} /> 
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;