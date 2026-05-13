import { SUIT_SVG_URLS } from '../../assets/suitSvgUrls.js'
import { RANK_NAMES } from '../../game/deck.js'
import styles from './MarqueeCard.module.css'

const RED_SUITS = new Set(['hearts', 'diamonds'])

export default function MarqueeCard({ card, size = 'lg', style }) {
  const isRed = RED_SUITS.has(card.suit)
  return (
    <div className={`${styles.card} ${styles[size]}`} style={style}>
      <div className={styles.top}>
        <span className={`${styles.rank} ${isRed ? styles.red : ''}`}>{card.rank}</span>
      </div>
      <div className={`${styles.bottom} ${isRed ? styles.bottomRed : ''}`}>
        <span className={styles.suitName}>{RANK_NAMES[card.rank]}</span>
        <img className={styles.suitIcon} src={SUIT_SVG_URLS[card.suit]} alt={card.suit} />
      </div>
    </div>
  )
}
