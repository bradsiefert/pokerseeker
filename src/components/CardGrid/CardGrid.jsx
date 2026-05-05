import Card from '../Card/Card.jsx'
import { isInPath } from '../../game/adjacency.js'
import styles from './CardGrid.module.css'

export default function CardGrid({ grid, path, invalidFlash, validating, onTapCard }) {
  return (
    <div className={styles.grid}>
      {grid.map((row, r) =>
        row.map((card, c) => {
          const selected = isInPath(path, r, c)
          const pathIndex = path.findIndex(([pr, pc]) => pr === r && pc === c)
          const isValidating = !!validating && selected
          return (
            <Card
              key={card.id}
              card={card}
              selected={selected}
              invalid={invalidFlash && pathIndex === path.length - 1}
              validating={isValidating}
              onClick={() => onTapCard(r, c)}
            />
          )
        })
      )}
    </div>
  )
}
