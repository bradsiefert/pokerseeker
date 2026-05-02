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

export default function GameScreen({ state, actions }) {
  const { grid, path, timeLeft, totalTime, score, phase, lastHand, invalidFlash } = state
  const { tapCard, pause, resume, goHome, goToRules, startGame, goHighScores, clearFlash, clearLastHand, debugEndGame } = actions

  const debugWin = (rank) => {
    if (rank === 1) {
      debugEndGame(99999, 145) // huge score guaranteed #1
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

  // Clear invalid flash after a short delay
  useEffect(() => {
    if (!invalidFlash) return
    const id = setTimeout(clearFlash, 400)
    return () => clearTimeout(id)
  }, [invalidFlash, clearFlash])

  // Clear last hand display after a short delay
  useEffect(() => {
    if (!lastHand) return
    const id = setTimeout(clearLastHand, 1500)
    return () => clearTimeout(id)
  }, [lastHand, clearLastHand])

  return (
    <div className={styles.gameScreen}>
      <Header timeLeft={timeLeft} score={score} onPause={pause} />

      {lastHand && (
        <div className={styles.handToast}>
          <span className={styles.handName}>{HAND_NAMES[lastHand.hand]}</span>
          <span className={styles.handScore}>+{formatMoney(lastHand.score)} · +{lastHand.timeBonus}s</span>
        </div>
      )}

      <div className={styles.gridWrap}>
        <CardGrid grid={grid} path={path} invalidFlash={invalidFlash} onTapCard={tapCard} />
      </div>

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
          onNewGame={startGame}
          onHighScores={goHighScores}
        />
      )}
    </div>
  )
}
