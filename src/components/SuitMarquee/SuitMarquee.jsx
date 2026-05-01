import MarqueeDealt from './MarqueeDealt.jsx'
import MarqueeParallax from './MarqueeParallax.jsx'
import MarqueeHero from './MarqueeHero.jsx'
import MarqueeSlide from './MarqueeSlide.jsx'

export default function SuitMarquee({ variant = 1 }) {
  if (variant === 2) return <MarqueeParallax />
  if (variant === 3) return <MarqueeHero />
  if (variant === 4) return <MarqueeSlide />
  return <MarqueeDealt />
}
