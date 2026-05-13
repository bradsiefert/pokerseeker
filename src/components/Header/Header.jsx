import { formatMoney } from '../../game/scoring.js'
import styles from './Header.module.css'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function Header({ timeLeft, score, onPause }) {
  // Time pressure cues:
  //   ≤30s → subtle pulse, ≤10s → red color, ≤5s → urgent pulse
  const timeClass = [
    styles.stat,
    timeLeft <= 30 && timeLeft > 0 ? styles.timeWarn : '',
    timeLeft <= 10 && timeLeft > 0 ? styles.timeDanger : '',
    timeLeft <= 5  && timeLeft > 0 ? styles.timeUrgent : '',
  ].join(' ')

  return (
    <div className={styles.header}>
      <div className={timeClass}>
        <span className={styles.label}>TIME</span>
        {formatTime(timeLeft)}
      </div>
      {onPause && (
        <button type="button" className={styles.pauseBtn} onClick={onPause}>
          Pause
        </button>
      )}
      <div className={styles.stat} style={{ textAlign: 'right' }}>
        <span className={styles.label}>SCORE</span>
        {formatMoney(score)}
      </div>
    </div>
  )
}
