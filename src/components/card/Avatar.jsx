import { avatarColor } from '../../utils/hash'

/**
 * Initials-based avatar circle.
 * Props: firstName, lastName, studentId, size (px, default 56)
 */
export default function Avatar({ firstName = '', lastName = '', studentId = '', size = 56 }) {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  const bg = avatarColor(studentId)

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 800,
        fontSize: size * 0.36,
        fontFamily: 'var(--font-sans)',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
        userSelect: 'none',
      }}
    >
      {initials}
    </div>
  )
}
