import { SUIT_SVG_URLS } from '../../assets/suitSvgUrls.js'
import { RANK_NAMES } from '../../game/deck.js'
import styles from './Card.module.css'

const SUIT_SYMBOLS = {
  spades: '♠', clubs: '♣', hearts: '♥', diamonds: '♦',
}

const RED_SUITS = new Set(['hearts', 'diamonds'])

export default function Card({ card, selected, invalid, validating, onClick }) {
  const isRed = RED_SUITS.has(card.suit)

  return (
    <div
      className={[
        styles.card,
        selected ? styles.selected : '',
        invalid ? styles.invalid : '',
        validating ? styles.validating : '',
      ].join(' ')}
      onClick={onClick}
    >
      <div className={styles.top}>
        <span className={`${styles.rankLarge} ${isRed ? styles.red : ''}`}>
          {card.rank}
        </span>
      </div>
      <div className={`${styles.bottom} ${isRed ? styles.bottomRed : ''}`}>
        <span className={styles.suitName}>{RANK_NAMES[card.rank]}</span>
        <img
          className={styles.suitIcon}
          src={SUIT_SVG_URLS[card.suit]}
          alt={card.suit}
        />
      </div>
    </div>
  )
}
