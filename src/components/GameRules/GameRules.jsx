import styles from './GameRules.module.css'

const RULES = [
  'Make as many 5 card hands as you can in 2 minutes.',
  'Time & points will be added whenever you make a hand.',
  'Only cards next to each other (including diagonal) can be used to make the 5 card hands.',
  'Have fun. Don\'t play too long. 🤙',
]

export default function GameRules() {
  return (
    <>
      <h2 className={styles.title}>Game Rules</h2>
      <ul className={styles.list}>
        {RULES.map((rule, i) => (
          <li key={i}>{rule}</li>
        ))}
      </ul>
    </>
  )
}
