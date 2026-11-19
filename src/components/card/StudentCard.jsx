import { useState } from 'react'
import Avatar from './Avatar'
import Strip from './Strip'
import Field from './Field'
import Barcode from './Barcode'
import { cardValidUntil, formatDate } from '../../utils/dates'
import { avatarColor } from '../../utils/hash'
import './card.css'

/**
 * Flip ID card for a registered student.
 * Front: strip, avatar, name/ID/dept/course/year
 * Back : barcode, validity, institution
 */
export default function StudentCard({ student }) {
  const [flipped, setFlipped] = useState(false)
  const accent = avatarColor(student.id)

  return (
    <div
      className={`id-card-wrap${flipped ? ' flipped' : ''}`}
      onClick={() => setFlipped(f => !f)}
      title="Click to flip"
    >
      <div className="id-card-inner">

        {/* ── FRONT ── */}
        <div className="id-card-face id-card-front">
          <Strip studentId={student.id}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 11, letterSpacing: '0.05em' }}>
              🎓 STUDENT ID
            </span>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 10 }}>
              {new Date().getFullYear()}–{new Date().getFullYear() + 1}
            </span>
          </Strip>

          <div className="id-card-body">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
              <Avatar
                firstName={student.firstName}
                lastName={student.lastName}
                studentId={student.id}
                size={52}
              />
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--color-heading)', lineHeight: 1.2 }}>
                  {student.firstName} {student.lastName}
                </div>
                <div style={{
                  display: 'inline-block',
                  marginTop: 4,
                  background: `${accent}22`,
                  color: accent,
                  border: `1px solid ${accent}55`,
                  borderRadius: 999,
                  padding: '1px 8px',
                  fontSize: 10,
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {student.id}
                </div>
              </div>
            </div>

            <div className="id-card-fields">
              <Field label="Department" value={student.department} />
              <Field label="Course"     value={student.course} />
              <Field label="Year"       value={student.year} />
              <Field label="Semester"   value={student.semester} />
              <Field label="Enrolled"   value={formatDate(student.registeredAt)} />
              <Field label="Valid Until" value={cardValidUntil(student.registeredAt)} />
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div className="id-card-face id-card-back">
          <div style={{
            background: accent,
            height: 36,
            borderRadius: '10px 10px 0 0',
          }} />
          <div className="id-card-body" style={{ alignItems: 'center', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-heading)', marginBottom: 8 }}>
              🏫 Student Registration System
            </div>
            <Barcode value={student.id} width={220} height={52} color={accent} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-text)', marginTop: 4 }}>
              {student.id}
            </div>
            <div style={{ marginTop: 10, fontSize: 11, color: 'var(--color-text)' }}>
              Valid Until: <strong style={{ color: 'var(--color-heading)' }}>
                {cardValidUntil(student.registeredAt)}
              </strong>
            </div>
            <div style={{ marginTop: 6, fontSize: 10, color: 'var(--color-text)', lineHeight: 1.5 }}>
              If found, please return to the<br />Student Affairs Office.
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '8px 0 10px', fontSize: 10, color: 'var(--color-text)' }}>
            Click to flip
          </div>
        </div>

      </div>
    </div>
  )
}
