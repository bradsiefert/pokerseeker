import { HAND_NAMES, getScore, getTimeBonus } from '../../game/scoring.js'
import { formatMoney } from '../../game/scoring.js'
import styles from './RulesScreen.module.css'

const HANDS = ['pair', 'twoPair', 'threeOfAKind', 'straight', 'flush', 'fullHouse', 'fourOfAKind', 'straightFlush', 'royalFlush']

export default function RulesScreen({ onBack }) {
  return (
    <div className={styles.screen}>
      <div className={styles.inner}>
        <button className={styles.btn} onClick={onBack}>← Back</button>
        <h2 className={styles.sectionTitle}>Game Rules</h2>
        <ol className={styles.rulesList}>
          <li>Make as many 5-card hands as you can in 2 minutes.</li>
          <li>Time &amp; money will be added whenever you make a hand.</li>
          <li>Only cards next to each other (including diagonal) can be used to make the 5-card hands.</li>
          <li>Have fun 🤙.</li>
        </ol>

        <h2 className={styles.sectionTitle}>Hand Values</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Hand</th>
              <th>Money</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {HANDS.map(hand => (
              <tr key={hand}>
                <td>{HAND_NAMES[hand]}</td>
                <td>{formatMoney(getScore(hand))}</td>
                <td>+{getTimeBonus(hand)}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
