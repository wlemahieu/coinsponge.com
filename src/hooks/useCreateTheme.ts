/**
 * Theme definition for MUI
 */
import { createTheme, Theme } from '@mui/material/styles';

const useCreateTheme = (): Theme => {
  return createTheme({
    typography: {
      fontFamily: 'Hanken Grotesk',
      h1: {
        fontSize: '57px',
        fontWeight: 500,
      },
      h2: {
        fontSize: '49px',
        fontWeight: 500,
        marginBottom: '1rem',
      },
      h3: {
        fontSize: '41px',
      },
      h4: {
        fontSize: '33px',
      },
      h5: {
        fontSize: '25px',
      },
      h6: {
        fontSize: '17px',
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
