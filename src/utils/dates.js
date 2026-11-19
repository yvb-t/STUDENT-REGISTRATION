// ─── Date / Age Utilities ─────────────────────────────────────────────────────

/**
 * Compute age in full years from an ISO date string.
 * Returns '' if dob is empty, 'Invalid' if the result is nonsensical.
 */
export function computeAge(dob) {
  if (!dob) return ''
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  if (age < 0 || age > 120) return 'Invalid'
  return age
}

/**
 * Format an ISO timestamp to a readable local date string.
 * e.g. "19 Nov 2026"
 */
export function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

/**
 * Format an ISO timestamp to date + time.
 * e.g. "19 Nov 2026, 10:30 AM"
 */
export function formatDateTime(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

/**
 * Card validity: 4 years from registration date.
 */
export function cardValidUntil(registeredAt) {
  if (!registeredAt) return '—'
  const d = new Date(registeredAt)
  d.setFullYear(d.getFullYear() + 4)
  return d.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}
