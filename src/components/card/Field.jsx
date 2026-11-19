/**
 * A label + value row on the ID card.
 * Props: label, value, mono (boolean — use monospace for value)
 */
export default function Field({ label, value, mono = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <span style={{
        fontSize: 9,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        color: 'var(--color-text)',
      }}>
        {label}
      </span>
      <span style={{
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--color-heading)',
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
        lineHeight: 1.3,
      }}>
        {value || '—'}
      </span>
    </div>
  )
}
