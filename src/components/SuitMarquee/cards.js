const ALL_RANKS = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const ALL_SUITS = ['spades','clubs','hearts','diamonds']

function randomCards(count) {
  const cards = []
  for (let i = 0; i < count; i++) {
    cards.push({
      rank: ALL_RANKS[Math.floor(Math.random() * ALL_RANKS.length)],
      suit: ALL_SUITS[Math.floor(Math.random() * ALL_SUITS.length)],
      id: `random-${i}`,
    })
  }
  return cards
}

export function buildSequence(count = 15) {
  const nine = { rank: '9', suit: 'diamonds', id: 'nine-diamonds' }
  return [nine, ...randomCards(count)]
}
