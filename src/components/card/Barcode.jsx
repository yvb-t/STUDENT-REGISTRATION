import { barcodePattern } from '../../utils/hash'

/**
 * SVG barcode derived from the student ID string.
 * Props: value (string), width, height, color
 */
export default function Barcode({ value = '', width = 240, height = 56, color = '#1a1a2e' }) {
  const bars = barcodePattern(value)
  const totalUnits = bars.reduce((a, b) => a + b, 0)
  const scale = width / (totalUnits || 1)

  let x = 0
  const rects = bars.map((w, i) => {
    const rect = i % 2 === 0
      ? <rect key={i} x={x * scale} y={0} width={w * scale - 0.5} height={height} fill={color} />
      : null // odd indices are gaps (transparent)
    x += w
    return rect
  })

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      {rects}
      {/* Always add start/end guards */}
      <rect x={0} y={0} width={2} height={height} fill={color} />
      <rect x={width - 2} y={0} width={2} height={height} fill={color} />
    </svg>
  )
}
