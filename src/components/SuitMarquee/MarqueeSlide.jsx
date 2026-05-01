import { useEffect, useState, useRef } from 'react'
import MarqueeCard from './MarqueeCard.jsx'
import { buildSequence } from './cards.js'
import styles from './MarqueeSlide.module.css'

const MAX_PILE = 12
const DEAL_INTERVAL = 1100 // ms

function randomRestingPosition() {
  // x: -240 to +240px from center
  // y: 0 to 80px from top
  // rotation: -18 to +18 degrees
  return {
    x: (Math.random() * 480) - 240,
    y: Math.random() * 80,
    rot: (Math.random() * 36) - 18,
  }
}

export default function MarqueeSlide() {
  const sequenceRef = useRef(buildSequence(60))
  const indexRef = useRef(0)
  const idRef = useRef(0)
  const [pile, setPile] = useState([])

  useEffect(() => {
    // Deal the first card immediately
    const dealCard = () => {
      const card = sequenceRef.current[indexRef.current % sequenceRef.current.length]
      indexRef.current += 1
      idRef.current += 1
      const pos = randomRestingPosition()
      setPile(prev => {
        const next = [...prev, { ...card, instanceId: idRef.current, ...pos }]
        return next.length > MAX_PILE ? next.slice(next.length - MAX_PILE) : next
      })
    }

    dealCard()
    const id = setInterval(dealCard, DEAL_INTERVAL)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.stage}>
      {pile.map(card => (
        <div
          key={card.instanceId}
          className={styles.cardWrap}
          style={{
            '--final-x': `${card.x}px`,
            '--final-y': `${card.y}px`,
            '--final-rot': `${card.rot}deg`,
          }}
        >
          <MarqueeCard card={card} size="lg" />
        </div>
      ))}
    </div>
  )
}
