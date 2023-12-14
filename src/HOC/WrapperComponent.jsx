import { Box } from '@mui/material';
import React from 'react'
import NavBar from '../Navigation/NavBar';
import Footer from './../components/Footer';

export default (Wrapper) => {
    const hocComponent = ({ ...props }) => (
      <Box>
        <NavBar />
        <Wrapper {...props} />
        <Footer />
      </Box>
    );
  
    return hocComponent;
  };