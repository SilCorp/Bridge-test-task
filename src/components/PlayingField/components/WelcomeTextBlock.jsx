import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectGain, selectGameStatus } from '../../../store/AppStore/AppSlice';
import gameStatus from '../../../constants/gameStatus-constants';

function WelcomeTextBlock({ hasUserWon }) {
  const currentGameStatus = useSelector(selectGameStatus);
  const isIntrigue = (
    currentGameStatus === gameStatus.initialized
    || currentGameStatus === gameStatus.preparation
    || currentGameStatus === gameStatus.processing
  );
  const isGameFinished = currentGameStatus === gameStatus.finished;
  const gain = useSelector(selectGain);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography
        fontSize={50}
        fontWeight="bold"
      >
        {isIntrigue && 'Кто выиграет?'}
        {isGameFinished && (
          hasUserWon
            ? `Вы выиграли ${gain}$`
            : 'Вы проиграли :('
        )}
      </Typography>

      <Typography
        fontSize={20}
        color="#989898"
      >
        Сыграй в игру и испытай удачу
      </Typography>
    </Box>
  );
}

WelcomeTextBlock.propTypes = {
  hasUserWon: PropTypes.bool.isRequired,
};

export default WelcomeTextBlock;
