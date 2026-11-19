import { avatarColor } from '../../utils/hash'

/**
 * Accent gradient header strip for the ID card front.
 * Props: studentId, children
 */
export default function Strip({ studentId = '', children }) {
  const base = avatarColor(studentId)
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${base} 0%, ${base}99 100%)`,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        borderRadius: '10px 10px 0 0',
      }}
    >
      {children}
    </div>
  )
}
