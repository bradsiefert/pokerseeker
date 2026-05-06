import { useEffect, useState } from 'react'
import Header from '../Header/Header.jsx'
import CardGrid from '../CardGrid/CardGrid.jsx'
import PauseScreen from './PauseScreen.jsx'
import GameOverScreen from './GameOverScreen.jsx'
import { HAND_NAMES, formatMoney } from '../../game/scoring.js'
import { saveHighScore } from './HighScoresScreen.jsx'
import styles from './GameScreen.module.css'

// Flip to true to surface the End → #1 / End → Top 10 helpers for testing celebrations
const SHOW_DEBUG_BUTTONS = false
const VALIDATION_DURATION = 420 // ms — keep in sync with .validating animation

export default function GameScreen({ state, actions }) {
  const {
    grid, path, timeLeft, totalTime, score, phase, lastHand, invalidFlash, validating,
    handsMade, highestCombo, bestHand,
  } = state
  const {
    tapCard, completeHand, pause, resume, goHome, goToRules, startGame, goHighScores,
    clearFlash, clearLastHand, debugEndGame,
  } = actions

  const debugWin = (rank) => {
    if (rank === 1) {
      debugEndGame(99999, 145)
    } else {
      const randomScore = 1000 + Math.floor(Math.random() * 4000)
      debugEndGame(randomScore, 130)
    }
  }
  const [finalRank, setFinalRank] = useState(null)

  // Save score when game ends
  useEffect(() => {
    if (phase === 'gameOver' && score > 0) {
      const rank = saveHighScore(score, totalTime)
      setFinalRank(rank)
    } else if (phase !== 'gameOver') {
      setFinalRank(null)
    }
  }, [phase, score, totalTime])

  // After a hand is detected, wait for the validation animation, then refill the grid
  useEffect(() => {
    if (!validating) return
    const id = setTimeout(completeHand, VALIDATION_DURATION)
    return () => clearTimeout(id)
  }, [validating, completeHand])

  // Clear invalid flash after a short delay
  useEffect(() => {
    if (!invalidFlash) return
    const id = setTimeout(clearFlash, 400)
    return () => clearTimeout(id)
  }, [invalidFlash, clearFlash])

  // Clear last hand display after a short delay
  useEffect(() => {
    if (!lastHand) return
    const id = setTimeout(clearLastHand, 2400)
    return () => clearTimeout(id)
  }, [lastHand, clearLastHand])

  const showVignette = phase === 'playing' && timeLeft <= 5 && timeLeft > 0

  return (
    <div className={styles.gameScreen}>
      <Header timeLeft={timeLeft} score={score} onPause={pause} />

      {lastHand && (
        <div className={styles.handToast}>
          <span className={styles.handName}>
            {HAND_NAMES[lastHand.hand]}
            {lastHand.multiplier > 1 && (
              <span className={styles.combo}> {lastHand.multiplier}×</span>
            )}
          </span>
          <span className={styles.handScore}>
            +{formatMoney(lastHand.score)} · +{lastHand.timeBonus}s
          </span>
        </div>
      )}

      <div className={styles.gridWrap}>
        <CardGrid
          grid={grid}
          path={path}
          invalidFlash={invalidFlash}
          validating={validating}
          onTapCard={tapCard}
        />
      </div>

      {showVignette && <div className={styles.vignette} aria-hidden="true" />}

      {/* TEMP debug controls — gated by SHOW_DEBUG_BUTTONS, kept for future testing */}
      {SHOW_DEBUG_BUTTONS && phase === 'playing' && (
        <div className={styles.debugButtons}>
          <button className={styles.debugBtn} onClick={() => debugWin(1)}>End → #1</button>
          <button className={styles.debugBtn} onClick={() => debugWin(5)}>End → Top 10</button>
        </div>
      )}

      {phase === 'paused' && (
        <PauseScreen timeLeft={timeLeft} score={score} onResume={resume} onRules={goToRules} onHome={goHome} />
      )}

      {phase === 'gameOver' && (
        <GameOverScreen
          score={score}
          totalTime={totalTime}
          rank={finalRank}
          handsMade={handsMade}
          highestCombo={highestCombo}
          bestHand={bestHand}
          onNewGame={startGame}
          onHighScores={goHighScores}
        />
      )}
    </div>
  )
}
