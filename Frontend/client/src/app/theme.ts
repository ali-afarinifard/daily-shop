// ** MUI Settings
import { createTheme } from '@mui/material/styles';


declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        '2xs': true;
        '2xl': true;
        '2sm': true;
        '2md': true;
    }
    interface Palette {
        customBackground: {
            gradientPrimary: string;
            gradientMain: string;
            gradientSecondary: string;
        };
        customColors: {
            blue: string;
        };
    }
    interface PaletteOptions {
        customBackground?: {
            gradientPrimary?: string;
            gradientMain?: string;
            gradientSecondary?: string;
        };
        customColors?: {
            blue?: string;
        };
    }
}


const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            '2xs': 400,
            sm: 460,
            '2sm': 580, 
            md: 770,
            lg: 880,
            xl: 1000,
            '2xl': 1920,
            '2md': 1000,
        },
    },
    palette: {
        primary: {
            main: '#DFE1F9',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#ed2481',
            light: '#CBCBCB'
        },
        background: {
            default: '#fff',
            paper: '#fafafa',
        },
        customBackground: {
            gradientPrimary: 'linear-gradient(to right, #391A48, #1C1A26)',
            gradientMain: 'linear-gradient(to right, #C41BD3, #790FCB)',
            gradientSecondary: 'rgba(255, 255, 255, 0.07)',
        },
        customColors: {
            blue: '#48c1e8'
        },
        text: {
            primary: '#EAEAEA'
        },
    },
    typography: {
        fontFamily: '"Vazir", "Inter", "Arial", sans-serif',
        h1: {
            fontSize: '1.875rem',
            fontWeight: '900'
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: '900'
        },
        h3: {
            fontSize: '1.25rem',
            fontWeight: '900'
        },
        h4: {
            fontSize: '1.1rem',
            fontWeight: '900'
        },
        body1: {
            fontSize: '0.95rem',
            fontWeight: '700',
            color: '#000000'
        },
        body2: {
            fontSize: '0.85rem',
            fontWeight: '700',
            color: '#000000'
        },
    },
});

export default theme;
