import { formatMoney } from '../../game/scoring.js'
import styles from './screens.module.css'

export function saveHighScore(score) {
  const scores = loadHighScores()
  scores.push({ score, date: new Date().toLocaleDateString() })
  scores.sort((a, b) => b.score - a.score)
  localStorage.setItem('pokerseeker-scores', JSON.stringify(scores.slice(0, 10)))
}

export function loadHighScores() {
  try {
    return JSON.parse(localStorage.getItem('pokerseeker-scores') || '[]')
  } catch {
    return []
  }
}

export default function HighScoresScreen({ onNewGame, onHome }) {
  const scores = loadHighScores()

  return (
    <div className={styles.screen}>
      <h2 className={styles.title}>Pokerseeker</h2>
      <div className={styles.scoreTable}>
        <div className={styles.scoreHeader}>
          <span>Rank</span>
          <span>Money</span>
          <span>Date</span>
        </div>
        {scores.length === 0 && (
          <p className={styles.subtitle}>No scores yet. Play a game!</p>
        )}
        {scores.map((entry, i) => (
          <div key={i} className={styles.scoreRow}>
            <span>#{i + 1}</span>
            <span>{formatMoney(entry.score)}</span>
            <span>{entry.date}</span>
          </div>
        ))}
      </div>
      <button className={styles.btn} onClick={onNewGame}>New Game</button>
      <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onHome}>Home</button>
    </div>
  )
}
