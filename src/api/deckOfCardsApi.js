const baseUrl = 'https://deckofcardsapi.com/api/deck';

const deckOfCardsApi = {
  getNewDeck: () => {
    const url = `${baseUrl}/new/`;
    return fetch(url);
  },
  reshuffleDeck: (deckId) => {
    const url = `${baseUrl}/${deckId}/shuffle/`;
    return fetch(url);
  },
  showTwoCards: (deckId) => {
    const url = `${baseUrl}/${deckId}/draw/?count=2`;
    return fetch(url);
  },
};

export default deckOfCardsApi;
