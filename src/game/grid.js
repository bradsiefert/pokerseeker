import { dealCard } from './deck.js'

export const ROWS = 6
export const COLS = 5

export function createGrid(deck) {
  let remaining = deck
  const grid = []
  for (let r = 0; r < ROWS; r++) {
    const row = []
    for (let c = 0; c < COLS; c++) {
      const { card, remaining: next } = dealCard(remaining)
      remaining = next
      row.push(card)
    }
    grid.push(row)
  }
  return { grid, deck: remaining }
}

export function removeAndRefill(grid, positions, deck) {
  // Deep copy
  let newGrid = grid.map(row => [...row])

  // Null out played positions
  for (const [r, c] of positions) {
    newGrid[r][c] = null
  }

  let remaining = deck

  // For each column, compact non-null cards to the bottom, fill top with new cards
  for (let c = 0; c < COLS; c++) {
    const col = newGrid.map(row => row[c]).filter(card => card !== null)
    const needed = ROWS - col.length
    const newCards = []
    for (let i = 0; i < needed; i++) {
      const { card, remaining: next } = dealCard(remaining)
      remaining = next
      newCards.push(card)
    }
    // New cards go on top, existing cards fall to bottom
    const filled = [...newCards, ...col]
    for (let r = 0; r < ROWS; r++) {
      newGrid[r][c] = filled[r]
    }
  }

  return { grid: newGrid, deck: remaining }
}
