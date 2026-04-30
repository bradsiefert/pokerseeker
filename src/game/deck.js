const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const SUITS = ['spades', 'clubs', 'hearts', 'diamonds']

export const RANK_NAMES = {
  A: 'ACE', '2': 'TWO', '3': 'THREE', '4': 'FOUR', '5': 'FIVE',
  '6': 'SIX', '7': 'SEVEN', '8': 'EIGHT', '9': 'NINE', '10': 'TEN',
  J: 'JACK', Q: 'QUEEN', K: 'KING',
}

function makeDeck() {
  const deck = []
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ rank, suit, id: `${rank}-${suit}-${Math.random()}` })
    }
  }
  return deck
}

function shuffle(deck) {
  const d = [...deck]
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j], d[i]]
  }
  return d
}

export function createShuffledDeck() {
  return shuffle(makeDeck())
}

export function dealCard(deck) {
  if (deck.length === 0) deck = shuffle(makeDeck())
  return { card: deck[0], remaining: deck.slice(1) }
}
