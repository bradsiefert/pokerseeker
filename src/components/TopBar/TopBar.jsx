import styles from './TopBar.module.css'

export default function TopBar({ onSignInClick }) {
  return (
    <div className={styles.topBar}>
      <span className={styles.title}>Pokerseeker</span>
      {onSignInClick && (
        <button className={styles.signInBtn} onClick={onSignInClick}>
          Login<span className={styles.signUpExtra}> / Sign Up</span>
        </button>
      )}
    </div>
  )
}
