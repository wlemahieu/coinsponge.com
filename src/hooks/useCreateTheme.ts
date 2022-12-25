/**
 * Theme definition for MUI
 */
import { createTheme, Theme } from '@mui/material/styles';

const useCreateTheme = (): Theme => {
  return createTheme({
    typography: {
      fontFamily: 'Hanken Grotesk',
      h1: {
        fontSize: '66px',
        fontWeight: 500,
      },
      h2: {
        fontSize: '56px',
        fontWeight: 500,
        marginBottom: '1rem',
      },
      h3: {
        fontSize: '46px',
      },
      h4: {
        fontSize: '36px',
      },
      h5: {
        fontSize: '26px',
      },
      h6: {
        fontSize: '18px',
        fontWeight: 600,
      },
      body2: {
        marginBottom: '1rem',
      },
    },
    palette: {
      primary: {
        // green
        light: '#4FBF6C',
        main: '#31AB51',
        dark: '#159737',
        contrastText: '#fff',
      },
      secondary: {
        // yellow
        light: '#FFC86A',
        main: '#E5A841',
        dark: '#CA8A1C',
        contrastText: '#000',
      },
    },
  });
};

export default useCreateTheme;
