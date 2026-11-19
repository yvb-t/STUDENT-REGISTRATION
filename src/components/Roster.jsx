import { useState, useMemo } from 'react'
import { DEPARTMENTS } from '../data/departments'
import { formatDateTime } from '../utils/dates'

/**
 * Searchable, filterable, sortable roster table.
 */
export default function Roster({ students, onDelete }) {
  const [search, setSearch]     = useState('')
  const [dept, setDept]         = useState('')
  const [sortKey, setSortKey]   = useState('registeredAt')
  const [sortAsc, setSortAsc]   = useState(false)
  const [confirmId, setConfirmId] = useState(null)

  const filtered = useMemo(() => {
    let list = [...students]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(s =>
        `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
      )
    }
    if (dept) list = list.filter(s => s.department === dept)
    list.sort((a, b) => {
      let va = a[sortKey] ?? '', vb = b[sortKey] ?? ''
      if (sortKey === 'name') { va = `${a.firstName} ${a.lastName}`; vb = `${b.firstName} ${b.lastName}` }
      if (va < vb) return sortAsc ? -1 : 1
      if (va > vb) return sortAsc ? 1 : -1
      return 0
    })
    return list
  }, [students, search, dept, sortKey, sortAsc])

  function toggleSort(key) {
    if (sortKey === key) setSortAsc(a => !a)
    else { setSortKey(key); setSortAsc(true) }
  }

  function SortIcon({ col }) {
    if (sortKey !== col) return <span style={{ opacity: 0.3 }}>↕</span>
    return <span>{sortAsc ? '↑' : '↓'}</span>
  }

  if (students.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px',
        color: 'var(--color-text)', fontSize: 14 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
        <div style={{ fontWeight: 700, color: 'var(--color-heading)', marginBottom: 6 }}>
          Roster Is Empty
        </div>
        <div>Register a student to populate the roster.</div>
      </div>
    )
  }

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="🔍 Search by name, ID or email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: '1 1 200px', minWidth: 160 }}
        />
        <select value={dept} onChange={e => setDept(e.target.value)} style={{ flex: '0 0 auto' }}>
          <option value="">All Departments</option>
          {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <span style={{ fontSize: 12, color: 'var(--color-text)', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
          {filtered.length} of {students.length} student{students.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: 10, border: '1px solid var(--color-border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'color-mix(in srgb, var(--color-border) 40%, transparent)' }}>
              {[
                { key: 'name',         label: 'Name' },
                { key: 'id',           label: 'Student ID' },
                { key: 'department',   label: 'Department' },
                { key: 'course',       label: 'Course' },
                { key: 'year',         label: 'Year' },
                { key: 'registeredAt', label: 'Registered' },
              ].map(col => (
                <th key={col.key}
                  onClick={() => toggleSort(col.key)}
                  style={{
                    padding: '9px 12px', textAlign: 'left', fontWeight: 700,
                    fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em',
                    color: 'var(--color-text)', cursor: 'pointer', userSelect: 'none',
                    whiteSpace: 'nowrap',
                    borderBottom: '1px solid var(--color-border)',
                  }}>
                  {col.label} <SortIcon col={col.key} />
                </th>
              ))}
              <th style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 700,
                fontSize: 11, color: 'var(--color-text)',
                borderBottom: '1px solid var(--color-border)' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id} style={{
                borderBottom: i < filtered.length - 1 ? '1px solid var(--color-border)' : 'none',
                background: i % 2 === 0 ? 'transparent' : 'color-mix(in srgb, var(--color-border) 15%, transparent)',
                transition: 'background 0.15s',
              }}>
                <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--color-heading)' }}>
                  {s.firstName} {s.lastName}
                  <div style={{ fontSize: 11, color: 'var(--color-text)', fontWeight: 400 }}>{s.email}</div>
                </td>
                <td style={{ padding: '8px 12px', fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
                  {s.id}
                </td>
                <td style={{ padding: '8px 12px', color: 'var(--color-text)' }}>{s.department}</td>
                <td style={{ padding: '8px 12px', color: 'var(--color-text)' }}>{s.course}</td>
                <td style={{ padding: '8px 12px', color: 'var(--color-text)' }}>{s.year}</td>
                <td style={{ padding: '8px 12px', color: 'var(--color-text)', fontSize: 12 }}>
                  {formatDateTime(s.registeredAt)}
                </td>
                <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                  {confirmId === s.id ? (
                    <span style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                      <button className="btn-danger" onClick={() => { onDelete(s.id); setConfirmId(null) }}>
                        Confirm
                      </button>
                      <button className="btn-secondary" style={{ padding: '5px 8px', fontSize: 12 }}
                        onClick={() => setConfirmId(null)}>
                        Cancel
                      </button>
                    </span>
                  ) : (
                    <button className="btn-danger" onClick={() => setConfirmId(s.id)}>Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-text)', fontSize: 13 }}>
          No students match your search.
        </div>
      )}
    </div>
  )
}
