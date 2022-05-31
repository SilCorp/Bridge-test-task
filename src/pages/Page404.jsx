import React from 'react';
import { Navigate, useMatch } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { PAGE_404 } from '../constants/route-constants';

function Page404() {
  const match = useMatch(PAGE_404);

  if (match) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Typography
          fontSize={60}
          fontWeight="bolder"
        >
          404
        </Typography>
      </Box>
    );
  }

  return <Navigate to={PAGE_404} replace />;
}

export default Page404;
