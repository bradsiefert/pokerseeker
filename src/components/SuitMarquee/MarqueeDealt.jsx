import { useMemo } from 'react'
import MarqueeCard from './MarqueeCard.jsx'
import { buildSequence } from './cards.js'
import styles from './MarqueeDealt.module.css'

function randTilt(seed) {
  // Simple pseudo-random per index
  const r = Math.sin(seed * 9301 + 49297) * 233280
  return ((r - Math.floor(r)) * 12) - 6 // -6 to +6 deg
}

function randY(seed) {
  const r = Math.sin(seed * 1234 + 5678) * 233280
  return ((r - Math.floor(r)) * 8) - 4 // -4 to +4 px
}

export default function MarqueeDealt() {
  const cards = useMemo(() => buildSequence(15), [])
  const doubled = [...cards, ...cards]

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {doubled.map((card, i) => (
          <MarqueeCard
            key={`${card.id}-${i}`}
            card={card}
            size="lg"
            style={{
              transform: `rotate(${randTilt(i)}deg) translateY(${randY(i)}px)`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
