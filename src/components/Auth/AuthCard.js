import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import LogoText from '../UI/LogoText';
import Login from './Login';
import SignUp from './SignUp';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavigateBackButton from '../UI/NavigateBackButton';
import ResetPassword from './ResetPassword';
import { useSelector } from 'react-redux';
import { uiValues } from '../../Redux/slices/uiSlice';

const AuthCard = () => {
   const { darkMode } = useSelector(uiValues);

   const router = useRouter();

   const loginPath = router.pathname === '/auth/login';
   const signupPath = router.pathname === '/auth/signup';
   const path = loginPath ? 'signup' : 'login';

   const theme = useTheme();
   const mdWidth = useMediaQuery(theme.breakpoints.down('md'));

   return (
      <>
         <Link href='/auth'>
            <Box
               sx={theme => ({
                  position: 'absolute',
                  top: '25px',
                  left: '40px',
                  zIndex: 500,
                  backgroundColor: '#F2F3F4',
                  borderRadius: '50%',
                  [theme.breakpoints.down('sm')]: {
                     display: 'none'
                  }
               })}
            >
               <NavigateBackButton />
            </Box>
         </Link>
         <Box
            sx={theme => ({
               margin: '2rem 0',
               maxWidth: '500px',
               width: '100%',
               backgroundColor: darkMode ? '#2c303a' : '#F8F9F9',
               padding: '2.5rem',
               zIndex: 200,
               borderRadius: '20px',
               boxShadow: '0 0 50px rgba(0, 0, 0, 0.015)',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               rowGap: '10px',
               [theme.breakpoints.down('xl')]: {
                  padding: '2rem'
               },
               [theme.breakpoints.down('sm')]: {
                  width: '90%',
                  padding: '1.5rem',
                  position: 'relative'
               },
               [theme.breakpoints.down(350)]: {
                  width: '95%'
               }
            })}
         >
            <Link href='/auth'>
               <Box sx={theme => ({
                  display: 'none',
                  [theme.breakpoints.down('sm')]: {
                     display: 'block',
                     position: 'absolute',
                     top: '12px',
                     left: '16px'
                  },
                  [theme.breakpoints.down(350)]: {
                     top: '8px',
                     left: '10px'
                  }
               })}
               >
                  <NavigateBackButton />
               </Box>
            </Link>
            <LogoText />
            <Typography
               sx={theme => ({
                  color: darkMode ? '#bcbac4' : '#302f37',
                  fontSize: '2.25rem',
                  fontWeight: 600,
                  marginTop: '-15px',
                  textAlign: 'center',
                  [theme.breakpoints.down('xl')]: {
                     fontSize: '2rem'
                  },
                  [theme.breakpoints.down('md')]: {
                     fontSize: '1.75rem'
                  },
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '1.5rem'
                  },
                  [theme.breakpoints.down(350)]: {
                     marginTop: '15px',
                     fontSize: '1.25rem'
                  }
               })}
            >
               Welcome to Inspire
            </Typography>
            <Typography
               sx={theme => ({
                  color: darkMode ? '#afacb9' : '#6d6a7c',
                  fontSize: '1rem',
                  marginTop: '-8px',
                  textAlign: 'center',
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '14px',
                     marginTop: '-10px'
                  }
               })}
            >
               Find new ideas & get inspired
            </Typography>
            {
               router.pathname === '/auth/login' ? (
                  <Login mdWidth={mdWidth} />
               ) : router.pathname === '/auth/signup' ? (
                  <SignUp mdWidth={mdWidth} />
               ) : (
                  <ResetPassword mdWidth={mdWidth} />
               )
            }
            <Typography
               sx={theme => ({
                  fontSize: '15px',
                  color: darkMode ? '#afacb9' : '#6d6a7c',
                  fontWeight: 600,
                  marginTop: '10px',
                  textAlign: 'center',
                  [theme.breakpoints.down('sm')]: {
                     fontSize: '14px',
                     marginTop: '5px'
                  }
               })}
            >
               {loginPath ? "Don't have an account?" : signupPath ? "Already have an account?" : 'Changed your mind?'}
               <Link href={`/auth/${path}`}>
                  <span
                     style={{
                        color: darkMode ? '#446dc1' : '#3366cc',
                        marginLeft: '5px',
                        cursor: 'pointer'
                     }}
                  >
                     {loginPath ? 'Sign up' : 'Login'}
                  </span>
               </Link>
            </Typography>
         </Box>
      </>
   );
};

export default AuthCard;