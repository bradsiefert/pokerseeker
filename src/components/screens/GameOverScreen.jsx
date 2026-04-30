import { formatMoney } from '../../game/scoring.js'
import styles from './screens.module.css'

export default function GameOverScreen({ score, onNewGame, onHighScores }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Game Over</h2>
        <p className={styles.scoreDisplay}>{formatMoney(score)}</p>
        <p className={styles.subtitle}>Not bad. Think you can do better?</p>
        <button className={styles.btn} onClick={onNewGame}>New Game</button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onHighScores}>High Scores</button>
      </div>
    </div>
  )
}
