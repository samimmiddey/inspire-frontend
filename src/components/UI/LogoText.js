import React from 'react';
import { Typography } from '@mui/material';

const LogoText = () => {
   return (
      <Typography
         variant='h6'
         className='logo-text'
         sx={theme => ({
            fontWeight: 700,
            fontSize: '2rem',
            marginTop: '5px',
            fontFamily: 'Teko',
            [theme.breakpoints.down('md')]: {
               marginTop: '4px'
            },
            [theme.breakpoints.down('sm')]: {
               fontSize: '1.7rem',
               marginTop: '4px'
            },
            [theme.breakpoints.down(350)]: {
               display: 'none'
            }
         })}
      >
         inspire
      </Typography>
   );
};

export default LogoText;