import { HAND_NAMES, getScore, getTimeBonus } from '../../game/scoring.js'
import { formatMoney } from '../../game/scoring.js'
import GameRules from '../GameRules/GameRules.jsx'
import Footer from '../Footer/Footer.jsx'
import styles from './RulesScreen.module.css'

const HANDS = ['pair', 'twoPair', 'threeOfAKind', 'straight', 'flush', 'fullHouse', 'fourOfAKind', 'straightFlush', 'royalFlush']

export default function RulesScreen({ onBack }) {
  return (
    <div className={styles.screen}>
      <div className={styles.inner}>
        <button className={styles.btn} onClick={onBack}>Back</button>

        <GameRules />

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

        <Footer />
      </div>
    </div>
  )
}
