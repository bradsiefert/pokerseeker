export const HAND_NAMES = {
  royalFlush:    'Royal Flush',
  straightFlush: 'Straight Flush',
  fourOfAKind:   'Four of a Kind',
  fullHouse:     'Full House',
  flush:         'Flush',
  straight:      'Straight',
  threeOfAKind:  'Three of a Kind',
  twoPair:       'Two Pair',
  pair:          'Pair',
  highCard:      'High Card',
}

const SCORES = {
  royalFlush:    10000,
  straightFlush: 5000,
  fourOfAKind:   3000,
  fullHouse:     1500,
  flush:         1000,
  straight:      750,
  threeOfAKind:  500,
  twoPair:       250,
  pair:          100,
  highCard:      0,
}

const TIME_BONUSES = {
  royalFlush:    25,
  straightFlush: 25,
  fourOfAKind:   10,
  fullHouse:     10,
  flush:         10,
  straight:      10,
  threeOfAKind:  5,
  twoPair:       5,
  pair:          5,
  highCard:      0,
}

export function getScore(hand) {
  return SCORES[hand] ?? 0
}

export function getTimeBonus(hand) {
  return TIME_BONUSES[hand] ?? 5
}

export function formatMoney(amount) {
  return '$' + amount.toLocaleString()
}
