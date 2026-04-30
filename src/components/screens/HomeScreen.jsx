import styles from './screens.module.css'

export default function HomeScreen({ onStart, onRules, onHighScores }) {
  return (
    <div className={styles.screen}>
      <div className={styles.logoWrap}>
        <img src="/src/assets/wood-header.png" alt="Pokerseeker" className={styles.logo} />
      </div>
      <div className={styles.buttonStack}>
        <button className={styles.btn} onClick={onStart}>New Game</button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onHighScores}>High Scores</button>
        <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onRules}>Rules</button>
      </div>
    </div>
  )
}
