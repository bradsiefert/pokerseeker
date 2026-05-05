import { useState } from 'react'
import SuitMarquee from '../SuitMarquee/SuitMarquee.jsx'
import GameRules from '../GameRules/GameRules.jsx'
import Footer from '../Footer/Footer.jsx'
import styles from './HomeScreen.module.css'

// Variant switcher — tabs hidden for now, code preserved for re-enable
const VARIANT_LABELS = {
  1: '1 — Dealt',
  4: '4 — Slide',
}
const SHOW_VARIANT_TABS = false

export default function HomeScreen({ onStart, onHighScores }) {
  const [variant, setVariant] = useState(1)

  return (
    <div className={styles.screen}>
      {SHOW_VARIANT_TABS && (
        <div className={styles.tabs}>
          {[1, 4].map(v => (
            <button
              key={v}
              className={`${styles.tab} ${variant === v ? styles.tabActive : ''}`}
              onClick={() => setVariant(v)}
            >
              {VARIANT_LABELS[v]}
            </button>
          ))}
        </div>
      )}

      <div className={styles.hero}>
        <span className={styles.eyebrow}>Boggle 🤝 Poker</span>
        <h1 className={styles.heroTitle}>Quick break? Play a hand.</h1>
        <p className={styles.heroSub}>
          Waiting on an ai agent to finish? Play a quick hand & beat the 2-minute clock. Score, earn more time, ride the hot streak.
        </p>
      </div>

      <SuitMarquee key={variant} variant={variant} />

      <div className={styles.inner}>
        <button className={styles.btn} onClick={onStart}>New Game</button>
        <button className={styles.btnSecondary} onClick={onHighScores}>High Scores</button>

        <hr className={styles.divider} />

        <GameRules />

        <hr className={styles.divider} />

        <Footer />
      </div>
    </div>
  )
}
