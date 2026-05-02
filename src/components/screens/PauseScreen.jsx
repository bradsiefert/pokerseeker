import Header from '../Header/Header.jsx'
import styles from './PauseScreen.module.css'

export default function PauseScreen({ timeLeft, score, onResume, onRules, onHome }) {
  return (
    <div className={styles.cover}>
      <div className={styles.content}>
        <h2 className={styles.pausedTitle}>Paused</h2>
        <p className={styles.tagline}>Take your time, we'll be here when you get back.</p>
        <Header timeLeft={timeLeft} score={score} />
        <div className={styles.buttonRow}>
          <button className={styles.btn} onClick={onResume}>Resume Game</button>
          <button className={styles.btn} onClick={onRules}>Game Rules</button>
        </div>
        <button className={styles.btnGhost} onClick={onHome}>Quit Game</button>
      </div>
    </div>
  )
}
