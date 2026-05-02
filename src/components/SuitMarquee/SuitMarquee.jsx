import MarqueeDealt from './MarqueeDealt.jsx'
import MarqueeSlide from './MarqueeSlide.jsx'

export default function SuitMarquee({ variant = 1 }) {
  if (variant === 4) return <MarqueeSlide />
  return <MarqueeDealt />
}
