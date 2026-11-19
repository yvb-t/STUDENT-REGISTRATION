// ─── Deterministic Hash Utilities ────────────────────────────────────────────

/**
 * Simple djb2-style hash of a string → unsigned 32-bit integer.
 */
export function hashString(str) {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i)
  }
  return hash >>> 0 // unsigned
}

/**
 * Pick a deterministic avatar background color from a palette
 * based on the student's ID string.
 */
const AVATAR_COLORS = [
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#3b82f6', // blue
  '#ef4444', // red
  '#14b8a6', // teal
  '#f97316', // orange
  '#84cc16', // lime
]

export function avatarColor(id = '') {
  return AVATAR_COLORS[hashString(id) % AVATAR_COLORS.length]
}

/**
 * Generate a fake SVG barcode pattern from a string.
 * Returns an array of bar widths (1 or 2) for rendering.
 */
export function barcodePattern(str = '') {
  const bars = []
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    // narrow or wide bar + gap based on char bits
    bars.push(((code >> 4) & 1) ? 2 : 1)
    bars.push(1) // gap
    bars.push(((code >> 2) & 1) ? 2 : 1)
    bars.push(1) // gap
    bars.push(((code) & 1) ? 2 : 1)
    bars.push(2) // inter-char gap
  }
  return bars
}
