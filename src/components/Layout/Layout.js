import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import Navigation from '../Navigation/Navigation';
import ProtectedRoute from '../Auth/ProtectedRoute';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setPath } from '../../Redux/slices/pinSlice';
import { setButtonIndex, setDarkMode, uiValues } from '../../Redux/slices/uiSlice';

const authRoutes = ['/auth', '/auth/login', '/auth/signup', '/auth/reset-password'];

const Layout = ({ children }) => {
   const { darkMode } = useSelector(uiValues);

   const router = useRouter();

   let getMode = darkMode ? 'dark' : 'light';

   if (typeof window !== 'undefined') {
      if (getMode === 'dark') {
         document.body.classList.add('dark');
      } else {
         document.body.classList.remove('dark');
      }
   }

   const getDesignTokens = (mode) => ({
      breakpoints: {
         values: {
            x: 0,
            xs: 500,
            sm: 650,
            md: 950,
            lg: 1280,
            xl: 1536
         }
      },
      palette: {
         mode,
         ...(mode === 'light'
            ? {
               // palette values for light mode
               primary: {
                  main: '#e60023'
               },
               secondary: {
                  main: '#3366cc'
               },
               text: {
                  primary: '#302f37',
                  secondary: '#868395',
                  disabled: '#a19fad',
                  icon: '#545260',
                  iconLight: '#868395'
               }
            }
            : {
               // palette values for dark mode
               primary: {
                  main: '#d3223d'
               },
               secondary: {
                  main: '#446dc1'
               },
               background: {
                  default: '#2c303a',
                  paper: '#2c303a',
               },
               text: {
                  primary: '#bcbac4',
                  secondary: '#afacb9',
                  disabled: '#a19fad',
                  icon: '#aeacb9',
                  iconLight: '#868395'
               }
            })
      },
      typography: {
         fontFamily: 'Inter, sans-serif'
      },
      components: {
         MuiCssBaseline: {
            styleOverrides: `
		  @font-face {
			font-family: 'Inter';
			font-style: normal;
			font-weight: 400;
		  }
		 `,
         },
         MuiCard: {
            styleOverrides: {
               root: {
                  border: 'none',
                  borderRadius: '20px',
                  backgroundColor: darkMode ? '#2c303a' : '#F8F9F9',
                  boxShadow: darkMode ? 'rgba(0, 0, 0, 0.05) 0px 5px 20px 0px' : 'rgb(90 114 123 / 11%) 0px 5px 20px 0px'
               }
            }
         },
         MuiMenuItem: {
            styleOverrides: {
               root: {
                  '&.Mui-selected': {
                     backgroundColor: darkMode ? '#2e5cb890' : '#3366cc25',
                     '&.Mui-selected:hover': {
                        backgroundColor: darkMode ? '#2e5cb890' : '#3366cc25'
                     }
                  }
               }
            }
         }
      }
   });

   const appTheme = createTheme(getDesignTokens(getMode));
   const dispatch = useDispatch();

   // Setting the path
   useEffect(() => {
      if (!authRoutes.includes(router.pathname)) {
         dispatch(setPath(router.pathname));
      }
   }, [router, dispatch]);

   // Retrieve data from localStorage
   useEffect(() => {
      if (typeof window !== 'undefined') {
         const index = JSON.parse(localStorage.getItem('darkModeButtonIndex'));
         const mode = JSON.parse(localStorage.getItem('inspireDarkMode'));
         if (index && mode) {
            dispatch(setButtonIndex(index));
            dispatch(setDarkMode(mode));
         }
      }
   }, [dispatch]);

   return (
      <ThemeProvider theme={appTheme}>
         {
            authRoutes.includes(router.pathname) ? (
               <ProtectedRoute>
                  {children}
               </ProtectedRoute>
            ) : (
               <ProtectedRoute>
                  <Navigation>
                     <main className='container'>
                        {children}
                     </main>
                  </Navigation>
               </ProtectedRoute>
            )
         }
      </ThemeProvider>
   );
};

export default Layout;