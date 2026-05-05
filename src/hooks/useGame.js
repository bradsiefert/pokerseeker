import { useReducer, useCallback } from 'react'
import { createShuffledDeck } from '../game/deck.js'
import { createGrid, removeAndRefill } from '../game/grid.js'
import { canExtendPath } from '../game/adjacency.js'
import { detectHand } from '../game/handDetection.js'
import { getScore, getTimeBonus } from '../game/scoring.js'
import { useTimer } from './useTimer.js'

const INITIAL_TIME = 120
const COMBO_WINDOW_MS = 5000

// Worst → best, used to track best hand of game
const HAND_RANK_ORDER = [
  'highCard', 'pair', 'twoPair', 'threeOfAKind', 'straight',
  'flush', 'fullHouse', 'fourOfAKind', 'straightFlush', 'royalFlush',
]

function comboMultiplier(combo) {
  if (combo >= 3) return 2
  if (combo === 2) return 1.5
  return 1
}

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
    lastHand: null,  // { hand, score, timeBonus, multiplier } for brief display
    invalidFlash: false,

    // combo
    combo: 0,
    lastHandAt: 0,

    // end-of-game stats
    handsMade: 0,
    highestCombo: 0,
    bestHand: null,

    // validating flow: when set, freezes grid and shows glow on path before refill
    validating: null, // { path, hand, basePoints, timeBonus, multiplier }
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
      const { row, col, at } = action
      const { path, grid, validating } = state

      // Block input while a hand is validating
      if (validating) return state

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
      const basePoints = getScore(hand)

      if (basePoints === 0) {
        // High card — not a scoring hand, flash invalid
        return { ...state, path: [], invalidFlash: true }
      }

      // Combo
      const within = (at - state.lastHandAt) <= COMBO_WINDOW_MS
      const newCombo = within && state.combo > 0 ? state.combo + 1 : 1
      const multiplier = comboMultiplier(newCombo)
      const earned = Math.round(basePoints * multiplier)
      const timeBonus = getTimeBonus(hand)

      // Best hand tracking
      const bestRank = HAND_RANK_ORDER.indexOf(state.bestHand)
      const newRank = HAND_RANK_ORDER.indexOf(hand)
      const newBestHand = newRank > bestRank ? hand : state.bestHand

      // Stage validation — freeze grid, show glow on path. COMPLETE_HAND finishes the move.
      return {
        ...state,
        path: newPath,
        invalidFlash: false,
        validating: {
          path: newPath,
          hand,
          earned,
          basePoints,
          multiplier,
          timeBonus,
        },
        // commit the score-related stats now so the toast/UI reflects them immediately
        score: state.score + earned,
        timeLeft: Math.min(state.timeLeft + timeBonus, 999),
        totalTime: state.totalTime + timeBonus,
        lastHand: { hand, score: earned, timeBonus, multiplier },
        lastHandAt: at,
        combo: newCombo,
        handsMade: state.handsMade + 1,
        highestCombo: Math.max(state.highestCombo, newCombo),
        bestHand: newBestHand,
      }
    }

    case 'COMPLETE_HAND': {
      // Actually remove + refill cards. Triggered after a delay so the validation glow shows.
      if (!state.validating) return state
      const { grid: newGrid, deck: newDeck } = removeAndRefill(state.grid, state.validating.path, state.deck)
      return {
        ...state,
        grid: newGrid,
        deck: newDeck,
        path: [],
        validating: null,
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

  const tapCard = useCallback((row, col) => dispatch({ type: 'TAP_CARD', row, col, at: Date.now() }), [])
  const completeHand = useCallback(() => dispatch({ type: 'COMPLETE_HAND' }), [])
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

  return { state, tapCard, completeHand, startGame, goToRules, backFromRules, goHome, pause, resume, goHighScores, clearFlash, clearLastHand, debugEndGame }
}
