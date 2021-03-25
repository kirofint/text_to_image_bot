export function randomy(from: number, to: number = 0): number {
  if (to <= 0 || to < from) {
    to = to ?? 0;
    // If to is less than from it'll swap 
    [to, from] = [from, to]
  }

  // From should not be exactly to
  from === to && (to++)

  // From should not be less than zero
  if (from <= 0 || from === 1 && !to) {
    from = 0
    to <= 0 && (to = from + 1)
  }

  return Math.floor(
    Math.random() * (to - from) + from
  )
}
