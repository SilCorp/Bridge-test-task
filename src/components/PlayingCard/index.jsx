/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './PlayingCard.module.scss';

function PlayingCard(props) {
  const { isFrontSide, cardFaceSrc, ...BoxProps } = props;
  return (
    <Box
      className={clsx(
        styles.PlayingCard,
        isFrontSide && styles.flipped,
      )}
      {...BoxProps}
    >
      <Box className={styles.back}>
        <Box className={styles.content}>
          <Typography
            fontSize={200}
            fontWeight="bold"
          >
            ?
          </Typography>
        </Box>
      </Box>
      <Box className={styles.front}>
        <img src={cardFaceSrc} alt="card-face" />
      </Box>
    </Box>
  );
}

PlayingCard.propTypes = {
  ...Box.PropTypes,
  isFrontSide: PropTypes.bool,
  cardFaceSrc: PropTypes.string,
};

PlayingCard.defaultProps = {
  isFrontSide: false,
  cardFaceSrc: '',
};

export default PlayingCard;
