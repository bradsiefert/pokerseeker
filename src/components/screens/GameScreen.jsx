import { useEffect } from 'react'
import Header from '../Header/Header.jsx'
import CardGrid from '../CardGrid/CardGrid.jsx'
import PauseScreen from './PauseScreen.jsx'
import GameOverScreen from './GameOverScreen.jsx'
import { HAND_NAMES, formatMoney } from '../../game/scoring.js'
import { saveHighScore } from './HighScoresScreen.jsx'
import styles from './GameScreen.module.css'

export default function GameScreen({ state, actions }) {
  const { grid, path, timeLeft, score, phase, lastHand, invalidFlash } = state
  const { tapCard, pause, resume, goHome, goToRules, startGame, goHighScores, clearFlash, clearLastHand } = actions

  // Save score when game ends
  useEffect(() => {
    if (phase === 'gameOver' && score > 0) {
      saveHighScore(score)
    }
  }, [phase, score])

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

      {phase === 'paused' && (
        <PauseScreen timeLeft={timeLeft} score={score} onResume={resume} onRules={goToRules} onHome={goHome} />
      )}

      {phase === 'gameOver' && (
        <GameOverScreen score={score} onNewGame={startGame} onHighScores={goHighScores} />
      )}
    </div>
  )
}
