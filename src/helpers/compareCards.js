const cardsPowerfulMap = new Map([
  ['2', 0],
  ['3', 1],
  ['4', 2],
  ['5', 3],
  ['6', 4],
  ['7', 5],
  ['8', 6],
  ['9', 7],
  ['10', 8],
  ['JACK', 9],
  ['QUEEN', 10],
  ['KING', 11],
  ['ACE', 12],
]);

/**
 * Return 0 if cards are equal
 * Return 1 if cardA is stronger than cardB
 * Return -1 if cardB is stronger than cardA
 * @param cardValueA
 * @param cardValueB
 */
const compareCards = (cardValueA, cardValueB) => {
  const powerA = cardsPowerfulMap.get(cardValueA);
  const powerB = cardsPowerfulMap.get(cardValueB);

  if (powerA > powerB) return 1;
  if (powerA < powerB) return -1;

  return 0;
};

export default compareCards;
