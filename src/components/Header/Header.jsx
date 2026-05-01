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
        <span className={styles.label}>TIME</span>
        {formatTime(timeLeft)}
      </div>
      {onPause && <button className={styles.pauseBtn} onClick={onPause}>Pause</button>}
      <div className={styles.stat} style={{ textAlign: 'right' }}>
        <span className={styles.label}>SCORE</span>
        {formatMoney(score)}
      </div>
    </div>
  )
}
