import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectBalance } from '../store/AppStore/AppSlice';
import numberWithDivider from '../helpers/numberWithDivider';

function ShowBalance() {
  const balance = useSelector(selectBalance);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={60}
    >
      <Typography>
        {`Balance: ${numberWithDivider(balance)}`}
      </Typography>
    </Box>
  );
}

export default ShowBalance;
