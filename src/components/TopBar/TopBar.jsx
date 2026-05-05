import styles from './TopBar.module.css'

export default function TopBar({ onPlayClick, onSignInClick }) {
  return (
    <div className={styles.topBar}>
      {onPlayClick && (
        <button className={styles.playBtn} onClick={onPlayClick}>
          Play<span className={styles.playExtra}> New Game</span>
        </button>
      )}
      <span className={styles.title}>Pokerseeker</span>
      {onSignInClick && (
        <button className={styles.signInBtn} onClick={onSignInClick}>
          Log In<span className={styles.signUpExtra}> / Sign Up</span>
        </button>
      )}
    </div>
  )
}
