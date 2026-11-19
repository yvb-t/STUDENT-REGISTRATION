import { StudentCard } from './card'

/**
 * Grid of ID cards for all registered students.
 */
export default function StudentCardSystem({ students }) {
  if (students.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '60px 20px',
        color: 'var(--color-text)', fontSize: 14,
      }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🪪</div>
        <div style={{ fontWeight: 700, color: 'var(--color-heading)', marginBottom: 6 }}>
          No Students Yet
        </div>
        <div>Register a student to see their ID card here.</div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--color-heading)' }}>
          🪪 Student ID Cards
        </h2>
        <span style={{ fontSize: 12, color: 'var(--color-text)' }}>
          {students.length} student{students.length !== 1 ? 's' : ''} · Click a card to flip
        </span>
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 20,
        justifyContent: 'flex-start',
      }}>
        {students.map(s => (
          <StudentCard key={s.id} student={s} />
        ))}
      </div>
    </div>
  )
}
