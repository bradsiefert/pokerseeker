export function isAdjacent([r1, c1], [r2, c2]) {
  return Math.abs(r1 - r2) <= 1 && Math.abs(c1 - c2) <= 1 && !(r1 === r2 && c1 === c2)
}

export function canExtendPath(path, [row, col]) {
  const key = `${row},${col}`
  const alreadySelected = path.some(([r, c]) => r === row && c === col)
  if (alreadySelected) return false
  if (path.length === 0) return true
  const last = path[path.length - 1]
  return isAdjacent(last, [row, col])
}

export function isInPath(path, row, col) {
  return path.some(([r, c]) => r === row && c === col)
}
