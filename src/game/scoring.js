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
  royalFlush:    100000,
  straightFlush: 50000,
  fourOfAKind:   30000,
  fullHouse:     15000,
  flush:         10000,
  straight:      7500,
  threeOfAKind:  5000,
  twoPair:       2500,
  pair:          1000,
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
