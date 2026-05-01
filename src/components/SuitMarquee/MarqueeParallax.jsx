import { useMemo } from 'react'
import MarqueeCard from './MarqueeCard.jsx'
import { buildSequence } from './cards.js'
import styles from './MarqueeParallax.module.css'

export default function MarqueeParallax() {
  const topCards = useMemo(() => buildSequence(18), [])
  const bottomCards = useMemo(() => buildSequence(13), [])

  const topDoubled = [...topCards, ...topCards]
  const bottomDoubled = [...bottomCards, ...bottomCards]

  return (
    <div className={styles.marquee}>
      <div className={styles.rowTop}>
        {topDoubled.map((card, i) => (
          <MarqueeCard key={`top-${card.id}-${i}`} card={card} size="md" />
        ))}
      </div>
      <div className={styles.rowBottom}>
        {bottomDoubled.map((card, i) => (
          <MarqueeCard key={`bot-${card.id}-${i}`} card={card} size="lg" />
        ))}
      </div>
    </div>
  )
}
