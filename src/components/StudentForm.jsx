import { useState } from 'react'
import { DEPARTMENTS, COURSE_MAP, SUBJECT_MAP, SEMESTERS, YEARS } from '../data/departments'
import { computeAge } from '../utils/dates'

// ─── Validation ───────────────────────────────────────────────────────────────
const VALIDATORS = {
  firstName:    v => v.trim().length >= 2 ? '' : 'At least 2 characters required',
  lastName:     v => v.trim().length >= 2 ? '' : 'At least 2 characters required',
  dob: v => {
    if (!v) return 'Date of birth is required'
    const d = new Date(v), now = new Date()
    if (d >= now) return 'Must be in the past'
    const age = now.getFullYear() - d.getFullYear()
    if (age < 10 || age > 80) return 'Age must be between 10 and 80'
    return ''
  },
  gender:       v => v ? '' : 'Please select a gender',
  phone:        v => /^[+\d\s\-]{7,15}$/.test(v.trim()) ? '' : 'Enter a valid phone number',
  email:        v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email',
  address:      v => v.trim().length >= 10 ? '' : 'Please enter a complete address',
  studentId:    v => /^[A-Za-z0-9]{5,15}$/.test(v.trim()) ? '' : '5–15 alphanumeric characters',
  department:   v => v ? '' : 'Please select a department',
  course:       v => v ? '' : 'Please select a course',
  semester:     v => v ? '' : 'Please select a semester',
  year:         v => v ? '' : 'Please select your year',
  guardian:     v => v.trim().length >= 2 ? '' : 'Please enter guardian name',
  guardianPhone:v => /^[+\d\s\-]{7,15}$/.test(v.trim()) ? '' : 'Enter a valid phone number',
  terms:        v => v ? '' : 'You must agree to the terms',
}
const STEP1 = ['firstName','lastName','dob','gender','phone','email','address']
const STEP2 = ['studentId','department','course','semester','year','guardian','guardianPhone','terms']

const INIT = {
  firstName:'', lastName:'', dob:'', gender:'', phone:'', email:'', address:'',
  studentId:'', department:'', course:'', semester:'', year:'', prevGrade:'',
  guardian:'', guardianPhone:'', terms: false,
}

// ─── Helper sub-components ────────────────────────────────────────────────────
function FieldWrap({ label, required, error, full, children }) {
  return (
    <div className={`form-field${full ? ' full' : ''}`}>
      <label>{label}{required && <span className="req"> *</span>}</label>
      {children}
      {error && <div className="error-msg">{error}</div>}
    </div>
  )
}

function StepDot({ n, cur }) {
  const cls = n < cur ? 'done' : n === cur ? 'active' : ''
  return (
    <div className={`step-dot ${cls}`}>
      {n < cur ? '✓' : n}
    </div>
  )
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────
function Step1({ form, errors, onChange }) {
  const age = computeAge(form.dob)
  const cls = f => errors[f] ? 'is-error' : form[f] ? 'is-ok' : ''

  return (
    <div className="card fade-in">
      <h2 className="section-title">👤 Personal Information</h2>
      <div className="grid-2">
        <FieldWrap label="First Name" required error={errors.firstName}>
          <input className={cls('firstName')} value={form.firstName}
            placeholder="e.g. Arjun" onChange={e => onChange('firstName', e.target.value)} />
        </FieldWrap>
        <FieldWrap label="Last Name" required error={errors.lastName}>
          <input className={cls('lastName')} value={form.lastName}
            placeholder="e.g. Sharma" onChange={e => onChange('lastName', e.target.value)} />
        </FieldWrap>
        <FieldWrap label="Date of Birth" required error={errors.dob}>
          <input type="date" className={cls('dob')} value={form.dob}
            onChange={e => onChange('dob', e.target.value)} />
        </FieldWrap>
        <FieldWrap label="Age (auto-calculated)">
          <input value={age ? `${age} years` : ''} readOnly className="readonly-field" placeholder="—" />
        </FieldWrap>
        <FieldWrap label="Gender" required error={errors.gender}>
          <select className={cls('gender')} value={form.gender}
            onChange={e => onChange('gender', e.target.value)}>
            <option value="">Select gender…</option>
            {['Male','Female','Non-binary','Prefer not to say'].map(g => <option key={g}>{g}</option>)}
          </select>
        </FieldWrap>
        <FieldWrap label="Phone Number" required error={errors.phone}>
          <input type="tel" className={cls('phone')} value={form.phone}
            placeholder="+91 XXXXXXXXXX" maxLength={15}
            onChange={e => onChange('phone', e.target.value)} />
        </FieldWrap>
        <FieldWrap label="Email Address" required error={errors.email} full>
          <input type="email" className={cls('email')} value={form.email}
            placeholder="student@example.com"
            onChange={e => onChange('email', e.target.value)} />
        </FieldWrap>
        <FieldWrap label="Residential Address" required error={errors.address} full>
          <textarea rows={2} className={cls('address')} value={form.address}
            placeholder="House No, Street, City, State, Pincode"
            onChange={e => onChange('address', e.target.value)} />
        </FieldWrap>
      </div>
    </div>
  )
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────
function Step2({ form, errors, onChange, subjects, toggleSubject }) {
  const courses = COURSE_MAP[form.department] || []
  const subjectList = SUBJECT_MAP[form.department] || []
  const cls = f => errors[f] ? 'is-error' : form[f] ? 'is-ok' : ''

  return (
    <div className="card fade-in">
      <h2 className="section-title">🎓 Academic Information</h2>
      <div className="grid-2">
        <FieldWrap label="Student ID" required error={errors.studentId}>
          <input className={cls('studentId')} value={form.studentId}
            placeholder="e.g. STU2026001"
            onChange={e => onChange('studentId', e.target.value)} />
        </FieldWrap>
        <FieldWrap label="Department" required error={errors.department}>
          <select className={cls('department')} value={form.department}
            onChange={e => onChange('department', e.target.value)}>
            <option value="">Select department…</option>
            {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
          </select>
        </FieldWrap>
        <FieldWrap label="Course" required error={errors.course}>
          <select className={cls('course')} value={form.course} disabled={!form.department}
            onChange={e => onChange('course', e.target.value)}>
            <option value="">{form.department ? 'Select course…' : 'Select department first…'}</option>
            {courses.map(c => <option key={c}>{c}</option>)}
          </select>
        </FieldWrap>
        <FieldWrap label="Semester" required error={errors.semester}>
          <select className={cls('semester')} value={form.semester}
            onChange={e => onChange('semester', e.target.value)}>
            <option value="">Select semester…</option>
            {SEMESTERS.map(s => <option key={s}>{s}</option>)}
          </select>
        </FieldWrap>
        <FieldWrap label="Year of Study" required error={errors.year}>
          <select className={cls('year')} value={form.year}
            onChange={e => onChange('year', e.target.value)}>
            <option value="">Select year…</option>
            {YEARS.map(y => <option key={y}>{y}</option>)}
          </select>
        </FieldWrap>
        <FieldWrap label="Previous GPA / %">
          <input type="number" value={form.prevGrade} placeholder="e.g. 8.5" min={0} max={100} step={0.01}
            onChange={e => onChange('prevGrade', e.target.value)} />
        </FieldWrap>

        {/* Subjects */}
        <div className="full">
          <label className="field-label">
            Subjects / Electives <span className="muted">(optional)</span>
          </label>
          <div className="subject-grid">
            {subjectList.length === 0
              ? <span className="muted" style={{ fontSize: 12 }}>Select a department first.</span>
              : subjectList.map(s => (
                <button key={s} type="button"
                  className={`subject-btn${subjects.has(s) ? ' selected' : ''}`}
                  onClick={() => toggleSubject(s)}>{s}</button>
              ))}
          </div>
        </div>

        <FieldWrap label="Guardian Name" required error={errors.guardian} full>
          <input className={cls('guardian')} value={form.guardian}
            placeholder="Full name of parent or guardian"
            onChange={e => onChange('guardian', e.target.value)} />
        </FieldWrap>
        <FieldWrap label="Guardian Phone" required error={errors.guardianPhone} full>
          <input type="tel" className={cls('guardianPhone')} value={form.guardianPhone}
            placeholder="+91 XXXXXXXXXX" maxLength={15}
            onChange={e => onChange('guardianPhone', e.target.value)} />
        </FieldWrap>

        {/* Terms */}
        <div className="full">
          <div className={`terms-box${errors.terms ? ' has-error' : ''}`}>
            <input type="checkbox" id="terms" checked={form.terms}
              onChange={e => onChange('terms', e.target.checked)} />
            <label htmlFor="terms" className="terms-label">
              I confirm all information is accurate and agree to the institution's{' '}
              <strong>Terms & Conditions</strong> and <strong>Academic Policy</strong>.
            </label>
          </div>
          {errors.terms && <div className="error-msg">{errors.terms}</div>}
        </div>
      </div>
    </div>
  )
}

// ─── Step 3: Review ───────────────────────────────────────────────────────────
function Step3({ form, subjects }) {
  const age = computeAge(form.dob)
  const rows1 = [
    ['Full Name',  `${form.firstName} ${form.lastName}`],
    ['Date of Birth', form.dob],
    ['Age',        age ? `${age} years` : '—'],
    ['Gender',     form.gender],
    ['Phone',      form.phone],
    ['Email',      form.email],
    ['Address',    form.address],
  ]
  const rows2 = [
    ['Student ID',   form.studentId],
    ['Department',   form.department],
    ['Course',       form.course],
    ['Semester',     form.semester],
    ['Year',         form.year],
    ['Previous GPA', form.prevGrade || '—'],
    ['Subjects',     subjects.size > 0 ? [...subjects].join(', ') : '—'],
    ['Guardian',     form.guardian],
    ['Guardian Ph.', form.guardianPhone],
  ]
  return (
    <div className="card fade-in">
      <h2 className="section-title">✅ Review Your Information</h2>
      <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
        Verify all details before submitting. Click "Edit" to go back and make changes.
      </p>
      <PreviewGroup label="Personal Details" rows={rows1} />
      <PreviewGroup label="Academic Details" rows={rows2} style={{ marginTop: 14 }} />
    </div>
  )
}

function PreviewGroup({ label, rows, style }) {
  return (
    <div style={style}>
      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.07em', color: 'var(--color-text)', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden' }}>
        {rows.map(([l, v], i) => (
          <div key={l} style={{
            display: 'flex',
            borderBottom: i < rows.length - 1 ? '1px solid var(--color-border)' : 'none',
            fontSize: 13,
          }}>
            <div style={{
              width: 140, minWidth: 140, padding: '7px 12px',
              color: 'var(--color-text)', fontWeight: 500,
              background: 'color-mix(in srgb, var(--color-border) 35%, transparent)',
            }}>{l}</div>
            <div style={{ flex: 1, padding: '7px 12px', color: 'var(--color-heading)', wordBreak: 'break-word' }}>
              {v || <span className="muted">—</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main StudentForm ─────────────────────────────────────────────────────────
export default function StudentForm({ onRegistered }) {
  const [step, setStep]       = useState(1)
  const [form, setForm]       = useState(INIT)
  const [errors, setErrors]   = useState({})
  const [subjects, setSubjects] = useState(new Set())
  const [submitting, setSubmitting] = useState(false)

  function handleChange(field, value) {
    setForm(f => {
      const next = { ...f, [field]: value }
      if (field === 'department') { next.course = '' }
      return next
    })
    if (field === 'department') setSubjects(new Set())
    const err = VALIDATORS[field] ? VALIDATORS[field](value) : ''
    setErrors(e => ({ ...e, [field]: err }))
  }

  function toggleSubject(s) {
    setSubjects(prev => {
      const n = new Set(prev)
      n.has(s) ? n.delete(s) : n.add(s)
      return n
    })
  }

  function validate(fields) {
    const errs = {}
    let ok = true
    fields.forEach(f => {
      const val = f === 'terms' ? form[f] : (form[f] ?? '')
      const e = VALIDATORS[f] ? VALIDATORS[f](val) : ''
      errs[f] = e
      if (e) ok = false
    })
    setErrors(e => ({ ...e, ...errs }))
    return ok
  }

  function goStep(n) {
    if (n > step && !validate(step === 1 ? STEP1 : STEP2)) return
    setStep(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function submit() {
    setSubmitting(true)
    const age = computeAge(form.dob)
    const student = {
      ...form,
      age: typeof age === 'number' ? age : 0,
      subjects: [...subjects],
      registeredAt: new Date().toISOString(),
    }
    setTimeout(() => {
      onRegistered(student)
      setForm(INIT)
      setErrors({})
      setSubjects(new Set())
      setStep(1)
      setSubmitting(false)
    }, 900)
  }

  const pct = Math.round((step / 3) * 100)

  return (
    <div>
      {/* Progress */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ height: 5, background: 'var(--color-border)', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--color-accent)',
            borderRadius: 999, transition: 'width 0.4s ease' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4,
          fontSize: 11, color: 'var(--color-text)' }}>
          <span>Step {step} of 3</span>
          <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{pct}%</span>
        </div>
      </div>

      {/* Step dots */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
        <StepDot n={1} cur={step} />
        <div className={`step-line${step > 1 ? ' done' : ''}`} />
        <StepDot n={2} cur={step} />
        <div className={`step-line${step > 2 ? ' done' : ''}`} />
        <StepDot n={3} cur={step} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between',
        fontSize: 11, color: 'var(--color-text)', marginBottom: 22 }}>
        <span>Personal</span><span>Academic</span><span>Review</span>
      </div>

      {step === 1 && <Step1 form={form} errors={errors} onChange={handleChange} />}
      {step === 2 && <Step2 form={form} errors={errors} onChange={handleChange}
        subjects={subjects} toggleSubject={toggleSubject} />}
      {step === 3 && <Step3 form={form} subjects={subjects} />}

      {/* Nav */}
      <div style={{ display: 'flex', justifyContent: step === 1 ? 'flex-end' : 'space-between', marginTop: 16 }}>
        {step > 1 && (
          <button className="btn-secondary" onClick={() => goStep(step - 1)}>
            ← {step === 3 ? 'Edit' : 'Back'}
          </button>
        )}
        {step < 3 && (
          <button className="btn-primary" onClick={() => goStep(step + 1)}>
            {step === 1 ? 'Next: Academic Info →' : 'Review & Submit →'}
          </button>
        )}
        {step === 3 && (
          <button className="btn-primary" onClick={submit} disabled={submitting}>
            {submitting ? '⏳ Registering…' : '🎓 Submit Registration'}
          </button>
        )}
      </div>
    </div>
  )
}
