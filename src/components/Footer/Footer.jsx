import styles from './Footer.module.css'

const START_YEAR = 2026

function copyrightYear() {
  const now = new Date().getFullYear()
  return now > START_YEAR ? `${START_YEAR}–${now}` : `${START_YEAR}`
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.line}>
        <span className={styles.suits} aria-hidden="true">♠ ♥ ♦ ♣</span>
      </p>

      <p className={styles.line}>
        &copy; {copyrightYear()} ·{' '}Made by{' '}
        <a
          href="https://bradsiefert.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Brad Siefert
        </a>
      </p>

      <p className={styles.lineMuted}>
        Typeset in{' '}
        <a
          href="https://housefonts.com/hi/signpainter#"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          SignPainter Brush
        </a>{' '}
        by House Industries
      </p>

      <p className={styles.lineMuted}>
        Built with{' '}
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className={styles.link}>React</a>,{' '}
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" className={styles.link}>Vite</a>, &{' '}
        <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className={styles.link}>Netlify</a>
        {' '}· Always play responsibly.
      </p>
    </footer>
  )
}
