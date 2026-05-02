import { useReducer, useCallback } from 'react'
import { createShuffledDeck } from '../game/deck.js'
import { createGrid, removeAndRefill } from '../game/grid.js'
import { canExtendPath } from '../game/adjacency.js'
import { detectHand } from '../game/handDetection.js'
import { getScore, getTimeBonus } from '../game/scoring.js'
import { useTimer } from './useTimer.js'

const INITIAL_TIME = 120

function init() {
  const deck = createShuffledDeck()
  const { grid, deck: remaining } = createGrid(deck)
  return {
    phase: 'home', // home | rules | playing | paused | gameOver | highScores
    grid,
    deck: remaining,
    path: [],        // array of [row, col]
    timeLeft: INITIAL_TIME,
    totalTime: INITIAL_TIME, // grows by timeBonus each hand — total game length when finished
    score: 0,
    lastHand: null,  // { name, score } for brief display
    invalidFlash: false,
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'START_GAME': {
      const deck = createShuffledDeck()
      const { grid, deck: remaining } = createGrid(deck)
      return { ...init(), phase: 'playing', grid, deck: remaining }
    }
    case 'GO_TO_RULES':
      return { ...state, phase: 'rules', rulesReturnPhase: state.phase }
    case 'BACK_FROM_RULES':
      return { ...state, phase: state.rulesReturnPhase || 'home' }
    case 'GO_HOME':
      return { ...init(), phase: 'home' }
    case 'PAUSE':
      return { ...state, phase: 'paused' }
    case 'RESUME':
      return { ...state, phase: 'playing' }
    case 'GO_HIGH_SCORES':
      return { ...state, phase: 'highScores' }

    case 'TAP_CARD': {
      const { row, col } = action
      const { path, grid } = state

      // If already last card in path, deselect (undo last)
      const last = path[path.length - 1]
      if (last && last[0] === row && last[1] === col) {
        return { ...state, path: path.slice(0, -1) }
      }

      if (!canExtendPath(path, [row, col])) {
        return { ...state, invalidFlash: true }
      }

      const newPath = [...path, [row, col]]

      if (newPath.length < 5) {
        return { ...state, path: newPath, invalidFlash: false }
      }

      // Evaluate 5-card hand
      const cards = newPath.map(([r, c]) => grid[r][c])
      const hand = detectHand(cards)
      const earned = getScore(hand)

      if (earned === 0) {
        // High card — not a scoring hand, flash invalid
        return { ...state, path: [], invalidFlash: true }
      }

      const timeBonus = getTimeBonus(hand)
      const { grid: newGrid, deck: newDeck } = removeAndRefill(grid, newPath, state.deck)
      const newTime = Math.min(state.timeLeft + timeBonus, 999)

      return {
        ...state,
        grid: newGrid,
        deck: newDeck,
        path: [],
        score: state.score + earned,
        timeLeft: newTime,
        totalTime: state.totalTime + timeBonus,
        lastHand: { hand, score: earned, timeBonus },
        invalidFlash: false,
      }
    }

    case 'CLEAR_FLASH':
      return { ...state, invalidFlash: false }

    case 'CLEAR_LAST_HAND':
      return { ...state, lastHand: null }

    case 'TICK': {
      if (state.timeLeft <= 1) {
        return { ...state, timeLeft: 0, phase: 'gameOver' }
      }
      return { ...state, timeLeft: state.timeLeft - 1 }
    }

    // TEMP debug: instantly end game with a forced top-10 score
    case 'DEBUG_END_GAME': {
      return {
        ...state,
        phase: 'gameOver',
        timeLeft: 0,
        score: action.score,
        totalTime: action.totalTime ?? state.totalTime,
      }
    }

    default:
      return state
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(reducer, null, init)

  const isRunning = state.phase === 'playing'

  useTimer(
    isRunning,
    () => dispatch({ type: 'TICK' }),
    () => dispatch({ type: 'TICK' }),
  )

  const tapCard = useCallback((row, col) => dispatch({ type: 'TAP_CARD', row, col }), [])
  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), [])
  const goToRules = useCallback(() => dispatch({ type: 'GO_TO_RULES' }), [])
  const backFromRules = useCallback(() => dispatch({ type: 'BACK_FROM_RULES' }), [])
  const goHome = useCallback(() => dispatch({ type: 'GO_HOME' }), [])
  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), [])
  const resume = useCallback(() => dispatch({ type: 'RESUME' }), [])
  const goHighScores = useCallback(() => dispatch({ type: 'GO_HIGH_SCORES' }), [])
  const clearFlash = useCallback(() => dispatch({ type: 'CLEAR_FLASH' }), [])
  const clearLastHand = useCallback(() => dispatch({ type: 'CLEAR_LAST_HAND' }), [])
  const debugEndGame = useCallback((score, totalTime) => dispatch({ type: 'DEBUG_END_GAME', score, totalTime }), [])

  return { state, tapCard, startGame, goToRules, backFromRules, goHome, pause, resume, goHighScores, clearFlash, clearLastHand, debugEndGame }
}
