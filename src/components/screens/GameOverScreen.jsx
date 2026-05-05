import { formatMoney, HAND_NAMES } from '../../game/scoring.js'
import styles from './GameOverScreen.module.css'

function formatLength(seconds) {
  if (seconds == null) return null
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function CelebrationBanner({ rank }) {
  if (!rank) return null

  if (rank === 1) {
    return (
      <div className={`${styles.celebration} ${styles.topRank}`}>
        <div className={styles.confetti}>🎉 🏆 🎉</div>
        <div className={styles.headline}>New High Score!</div>
        <div className={styles.subline}>You're #1 on the leaderboard</div>
      </div>
    )
  }

  return (
    <div className={styles.celebration}>
      <div className={styles.medal}>🏅</div>
      <div className={styles.headlineSm}>Top 10!</div>
      <div className={styles.subline}>Ranked #{rank} on the leaderboard</div>
    </div>
  )
}

export default function GameOverScreen({
  score, totalTime, rank,
  handsMade, highestCombo, bestHand,
  onNewGame, onHighScores,
}) {
  const length = formatLength(totalTime)
  const hasStats = (handsMade != null && handsMade > 0)

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Game Over</h2>

        <CelebrationBanner rank={rank} />

        <p className={styles.scoreDisplay}>{formatMoney(score)}</p>

        {length && (
          <p className={styles.lengthLabel}>
            Game Length <span className={styles.lengthValue}>{length}</span>
          </p>
        )}

        {hasStats && (
          <div className={styles.stats}>
            {bestHand && (
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Best hand</span>
                <span className={styles.statValue}>{HAND_NAMES[bestHand]}</span>
              </div>
            )}
            <div className={styles.statRow}>
              <span className={styles.statLabel}>Hands made</span>
              <span className={styles.statValue}>{handsMade}</span>
            </div>
            {highestCombo > 1 && (
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Highest combo</span>
                <span className={styles.statValue}>{highestCombo}×</span>
              </div>
            )}
          </div>
        )}

        {!rank && !hasStats && (
          <p className={styles.subtitle}>Not bad. Think you can do better?</p>
        )}

        <button className={styles.btn} onClick={onNewGame}>New Game</button>
        <button className={styles.btnSecondary} onClick={onHighScores}>High Scores</button>
      </div>
    </div>
  )
}
