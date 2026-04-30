const RANK_ORDER = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

function rankValue(rank) {
  return RANK_ORDER.indexOf(rank)
}

export function detectHand(cards) {
  if (cards.length !== 5) return null

  const ranks = cards.map(c => rankValue(c.rank)).sort((a, b) => a - b)
  const suits = cards.map(c => c.suit)

  const isFlush = suits.every(s => s === suits[0])

  const isStraight = (() => {
    const normal = ranks[4] - ranks[0] === 4 && new Set(ranks).size === 5
    // A-low straight: A,2,3,4,5
    const aceLow = JSON.stringify(ranks) === JSON.stringify([0, 1, 2, 3, 12])
    return normal || aceLow
  })()

  const freq = {}
  for (const r of ranks) freq[r] = (freq[r] || 0) + 1
  const counts = Object.values(freq).sort((a, b) => b - a)

  if (isFlush && isStraight) {
    const highRank = ranks[4] === 12 && ranks[3] === 11 ? 'royal' : 'straightFlush'
    return highRank === 'royal' ? 'royalFlush' : 'straightFlush'
  }
  if (counts[0] === 4) return 'fourOfAKind'
  if (counts[0] === 3 && counts[1] === 2) return 'fullHouse'
  if (isFlush) return 'flush'
  if (isStraight) return 'straight'
  if (counts[0] === 3) return 'threeOfAKind'
  if (counts[0] === 2 && counts[1] === 2) return 'twoPair'
  if (counts[0] === 2) return 'pair'
  return 'highCard'
}
