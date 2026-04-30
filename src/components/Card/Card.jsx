import { RANK_NAMES } from '../../game/deck.js'
import styles from './Card.module.css'

const SUIT_SVGS = {
  spades:   '/src/assets/suits/suit-spades.svg',
  clubs:    '/src/assets/suits/suit-clubs.svg',
  hearts:   '/src/assets/suits/suit-hearts.svg',
  diamonds: '/src/assets/suits/suit-diamonds.svg',
}

const SUIT_SYMBOLS = {
  spades: '♠', clubs: '♣', hearts: '♥', diamonds: '♦',
}

const RED_SUITS = new Set(['hearts', 'diamonds'])

export default function Card({ card, selected, invalid, onClick }) {
  const isRed = RED_SUITS.has(card.suit)

  return (
    <div
      className={[
        styles.card,
        selected ? styles.selected : '',
        invalid ? styles.invalid : '',
      ].join(' ')}
      onClick={onClick}
    >
      <div className={styles.top}>
        <span className={`${styles.rankLarge} ${isRed ? styles.red : ''}`}>
          {card.rank}
        </span>
        {/* suit symbol next to number removed */}
      </div>
      <div className={`${styles.bottom} ${isRed ? styles.bottomRed : ''}`}>
        <span className={styles.suitName}>{RANK_NAMES[card.rank]}</span>
        <img
          className={styles.suitIcon}
          src={SUIT_SVGS[card.suit]}
          alt={card.suit}
        />
      </div>
    </div>
  )
}
