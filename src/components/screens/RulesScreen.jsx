import styles from './screens.module.css'

export default function RulesScreen({ onBack }) {
  return (
    <div className={styles.screen}>
      <h2 className={styles.title}>Game Rules</h2>
      <ol className={styles.rulesList}>
        <li>Make as many 5-card hands as you can in 2 minutes.</li>
        <li>Time &amp; money will be added whenever you make a hand.</li>
        <li>Only cards next to each other (including diagonal) can be used to make the 5-card hands.</li>
        <li>Enjoy.</li>
      </ol>
      <button className={styles.btn} onClick={onBack}>Got It</button>
    </div>
  )
}
