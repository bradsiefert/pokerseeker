import styles from './HomeScreen.module.css'

const RULES = [
  'Make as many 5 card hands as you can in 2 minutes.',
  'Time & money will be added whenever you make a hand.',
  'Only cards next to each other (including diagonal) can be used to make the 5 card hands.',
  'Have fun 🤙.',
]

export default function HomeScreen({ onStart, onHighScores }) {
  return (
    <div className={styles.screen}>
      <div className={styles.inner}>
        <button className={styles.btn} onClick={onStart}>New Game</button>
        <button className={styles.btnSecondary} onClick={onHighScores}>High Scores</button>

        <h2 className={styles.rulesTitle}>Game Rules</h2>
        <ul className={styles.rulesList}>
          {RULES.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
