const cardsValuePowerfulMap = new Map([
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

const cardsSuitPowerfulMap = new Map([
  ['CLUBS', 0],
  ['DIAMONDS', 1],
  ['HEARTS', 2],
  ['SPADES', 3],
]);

/**
 * @typedef Card
 * @type {object}
 * @property {string} value - card value.
 * @property {string} suit - card suit.
 */

/**
 * Return 0 if cards are equal
 * Return 1 if cardA is stronger than cardB
 * Return -1 if cardB is stronger than cardA
 * @param {Card} cardA
 * @param {Card} cardB
 */
const compareCards = (cardA, cardB) => {
  const valueA = cardsValuePowerfulMap.get(cardA.value);
  const valueB = cardsValuePowerfulMap.get(cardB.value);

  const suitA = cardsSuitPowerfulMap.get(cardA.suit);
  const suitB = cardsSuitPowerfulMap.get(cardB.suit);

  // Compare card's value first
  if (valueA > valueB) return 1;
  if (valueA < valueB) return -1;

  // If card values identical, check the suit
  if (suitA > suitB) return 1;
  if (suitA < suitB) return -1;

  return 0;
};

export default compareCards;
