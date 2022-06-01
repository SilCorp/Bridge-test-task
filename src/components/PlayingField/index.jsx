import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import PlayingCard from '../PlayingCard';
import {
  getTwoCardsAsync,
  makeBet,
  selectCards,
  selectGameStatus,
  setGameStatus,
  winBet,
} from '../../store/AppStore/AppSlice';
import gameStatus from '../../constants/gameStatus-constants';
import WelcomeTextBlock from './components/WelcomeTextBlock';
import compareCards from '../../helpers/compareCards';

function PlayingField() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const currentGameStatus = useSelector(selectGameStatus);
  const isUserMakingDecision = currentGameStatus === gameStatus.preparation;
  const isGameProcessing = currentGameStatus === gameStatus.processing;
  const isGameFinished = currentGameStatus === gameStatus.finished;
  const isGameInitialized = currentGameStatus === gameStatus.initialized;
  const dispatch = useDispatch();
  const [firstCard, secondCard] = useSelector(selectCards);
  const firstCardImage = firstCard?.image;
  const secondCardImage = secondCard?.image;
  const cardNumberWin = (
    (firstCard || 0)
    && compareCards(firstCard, secondCard) === 1 ? 1 : 2
  );
  const hasUserWon = cardNumberWin === selectedCard;

  // Accrual of winnings after the game
  useEffect(() => {
    if (isGameFinished && hasUserWon) {
      dispatch(winBet());
    }
  }, [dispatch, hasUserWon, isGameFinished]);

  // Flip cards
  useEffect(() => {
    setFlipped(isGameFinished);
  }, [isGameFinished]);

  // Fetch random cards for game
  useEffect(() => {
    let promise;
    if (isGameProcessing) {
      promise = dispatch(getTwoCardsAsync());

      // Bet when the game starts
      dispatch(makeBet());
    }

    return () => {
      if (promise) {
        promise.abort();
      }
    };
  }, [dispatch, isGameProcessing]);

  const onCardSelect = (cardNumber) => {
    if (isUserMakingDecision) {
      setSelectedCard(cardNumber);
      dispatch(setGameStatus(gameStatus.processing));
    }
  };

  const onStartGameClick = () => {
    dispatch(setGameStatus(gameStatus.preparation));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="30px"
      sx={{ backgroundColor: '#e5e5e5' }}
    >
      <WelcomeTextBlock hasUserWon={hasUserWon} />
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="inline-flex"
          alignItems="center"
        >
          <PlayingCard
            isFrontSide={flipped}
            sx={{ margin: '20px' }}
            cardFaceSrc={firstCardImage}
            onClick={() => onCardSelect(1)}
          />
          {isUserMakingDecision && (
            <Button
              variant="contained"
              onClick={() => onCardSelect(1)}
            >
              Слева
            </Button>
          )}
        </Box>

        {isGameProcessing && (
          <CircularProgress size={80} />
        )}

        {(isGameFinished || isGameInitialized) && (
          <Button
            onClick={onStartGameClick}
            variant="contained"
          >
            {isGameFinished && 'Играть снова!'}
            {isGameInitialized && 'Играть'}
          </Button>
        )}

        <Box
          display="inline-flex"
          alignItems="center"
        >
          {isUserMakingDecision && (
            <Button
              variant="contained"
              onClick={() => onCardSelect(2)}
            >
              Справа
            </Button>
          )}
          <PlayingCard
            isFrontSide={flipped}
            sx={{ margin: '20px' }}
            cardFaceSrc={secondCardImage}
            onClick={() => onCardSelect(2)}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default PlayingField;
