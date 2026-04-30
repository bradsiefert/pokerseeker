import { formatMoney } from '../../game/scoring.js'
import styles from './Header.module.css'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function Header({ timeLeft, score, onPause }) {
  return (
    <div className={styles.header}>
      <div className={styles.stat}>
        {formatTime(timeLeft)}
        <span className={styles.label}>TIME</span>
      </div>
      <button className={styles.pauseBtn} onClick={onPause} aria-label="Pause">⏸</button>
      <div className={styles.stat} style={{ textAlign: 'right' }}>
        {formatMoney(score)}
        <span className={styles.label}>SCORE</span>
      </div>
    </div>
  )
}
