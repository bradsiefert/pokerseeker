import { useMemo } from 'react'
import MarqueeCard from './MarqueeCard.jsx'
import { buildSequence } from './cards.js'
import styles from './MarqueeHero.module.css'

export default function MarqueeHero() {
  const cards = useMemo(() => buildSequence(20), [])
  const doubled = [...cards, ...cards]

  const heroCard = { rank: '9', suit: 'diamonds', id: 'hero-9d' }

  return (
    <div className={styles.marquee}>
      <div className={styles.tickerWrap}>
        <div className={styles.ticker}>
          {doubled.map((card, i) => (
            <MarqueeCard key={`tick-${card.id}-${i}`} card={card} size="sm" />
          ))}
        </div>
      </div>
      <div className={styles.heroWrap}>
        <div className={styles.hero}>
          <MarqueeCard card={heroCard} size="xl" />
        </div>
      </div>
    </div>
  )
}
