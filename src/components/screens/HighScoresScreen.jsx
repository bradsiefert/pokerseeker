import { formatMoney } from '../../game/scoring.js'
import Footer from '../Footer/Footer.jsx'
import styles from './HighScoresScreen.module.css'

function formatLength(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function saveHighScore(score, length) {
  const scores = loadHighScores()
  const newEntry = {
    score,
    length: length ?? null,
    dateTime: new Date().toLocaleString(),
    _new: true,
  }
  scores.push(newEntry)
  scores.sort((a, b) => b.score - a.score)
  const top10 = scores.slice(0, 10)
  const rank = top10.findIndex(e => e._new) + 1 // 1-based; 0 means not in top 10
  // Strip the temporary marker before persisting
  const toSave = top10.map(({ _new, ...rest }) => rest)
  localStorage.setItem('pokerseeker-scores', JSON.stringify(toSave))
  return rank > 0 ? rank : null
}

export function loadHighScores() {
  try {
    return JSON.parse(localStorage.getItem('pokerseeker-scores') || '[]')
  } catch {
    return []
  }
}

// TODO: wire to Supabase auth
function handleGoogleSignIn() {
  console.log('TODO: Google sign-in')
}

function handleEmailSignIn() {
  console.log('TODO: Email magic-link sign-in')
}

export default function HighScoresScreen({ onHome }) {
  const scores = loadHighScores()

  return (
    <div className={styles.screen}>
      <div className={styles.inner}>
        <button className={styles.btn} onClick={onHome}>Home</button>

        <hr className={styles.divider} />

        <section className={styles.authSection}>
          <h2 className={styles.title}>Login / Sign Up</h2>
          <div className={styles.authButtons}>
            <button className={`${styles.authBtn} ${styles.authBtnSecondary}`} onClick={handleGoogleSignIn}>
              Continue with Google
            </button>
            <button className={`${styles.authBtn} ${styles.authBtnSecondary}`} onClick={handleEmailSignIn}>
              Continue with Email
            </button>
          </div>
          <p className={styles.authNote}>
            No account required to play. If you sign up for an account,
            your high scores will be saved and added to the global high scores list.
          </p>
        </section>

        <hr className={styles.divider} />

        <h2 className={styles.title}>Your High Scores</h2>

        {scores.length === 0 ? (
          <p className={styles.empty}>No scores yet. Play a game!</p>
        ) : (
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <span>Rank</span>
              <span>Money</span>
              <span>Length</span>
              <span>Date &amp; Time</span>
            </div>
            {scores.map((entry, i) => (
              <div key={i} className={styles.tableRow}>
                <span>#{i + 1}</span>
                <span>{formatMoney(entry.score)}</span>
                <span>{entry.length != null ? formatLength(entry.length) : '—'}</span>
                <span>{entry.dateTime ?? entry.date}</span>
              </div>
            ))}
          </div>
        )}

        <hr className={styles.divider} />

        <Footer />
      </div>
    </div>
  )
}
