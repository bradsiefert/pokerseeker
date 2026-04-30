import { formatMoney } from '../../game/scoring.js'
import styles from './PauseScreen.module.css'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function PauseScreen({ timeLeft, score, onResume, onRules, onHome }) {
  return (
    <div className={styles.cover}>
      <div className={styles.woodHeader}>
        <img src="/src/assets/wood-header.png" alt="" className={styles.woodBg} />
        <span className={styles.woodTitle}>Pokerseeker</span>
      </div>

      <div className={styles.statsBar}>
        <span className={styles.stat}>{formatTime(timeLeft)}</span>
        <span className={styles.stat}>{formatMoney(score)}</span>
      </div>

      <div className={styles.content}>
        <h2 className={styles.pausedTitle}>Paused</h2>
        <p className={styles.tagline}>Take your time, we'll be here when you get back.</p>
        <div className={styles.buttonRow}>
          <button className={styles.btn} onClick={onResume}>Resume Game</button>
          <button className={styles.btn} onClick={onRules}>Poker Rules</button>
        </div>
        <button className={styles.btnGhost} onClick={onHome}>Quit Game</button>
      </div>
    </div>
  )
}
