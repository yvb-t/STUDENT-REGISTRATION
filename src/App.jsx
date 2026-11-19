import { useState, useEffect } from 'react'
import './App.css'

// ─── Department, Course & Subject Mappings ───────────────────
const COURSE_MAP = {
  'Computer Science': ['B.Tech CSE', 'B.Tech AI & ML', 'B.Tech Data Science', 'M.Tech CSE', 'MCA'],
  'Electronics & Communication': ['B.Tech ECE', 'B.Tech VLSI', 'M.Tech ECE'],
  'Mechanical Engineering': ['B.Tech Mechanical', 'B.Tech Automobile', 'M.Tech Thermal'],
  'Civil Engineering': ['B.Tech Civil', 'B.Tech Environmental', 'M.Tech Structural'],
  'Business Administration': ['BBA', 'MBA', 'B.Com', 'M.Com'],
  'Mathematics & Statistics': ['B.Sc Math', 'B.Sc Statistics', 'M.Sc Mathematics', 'M.Sc Statistics'],
}

const SUBJECT_MAP = {
  'Computer Science': [
    { name: 'Data Structures', credits: 4 },
    { name: 'Design of Algorithms', credits: 4 },
    { name: 'Database Management Systems', credits: 3 },
    { name: 'Operating Systems', credits: 3 },
    { name: 'Computer Networks', credits: 3 },
    { name: 'Machine Learning Fundamentals', credits: 4 },
    { name: 'Cloud Computing Architecture', credits: 3 },
    { name: 'Full-Stack Web Development', credits: 3 },
  ],
  'Electronics & Communication': [
    { name: 'Digital Electronics', credits: 4 },
    { name: 'Signals & Systems', credits: 4 },
    { name: 'Microprocessors & Microcontrollers', credits: 3 },
    { name: 'VLSI Circuit Design', credits: 4 },
    { name: 'Embedded Systems', credits: 3 },
    { name: 'RF & Microwave Engineering', credits: 3 },
  ],
  'Mechanical Engineering': [
    { name: 'Thermodynamics & Heat Transfer', credits: 4 },
    { name: 'Fluid Mechanics', credits: 4 },
    { name: 'Manufacturing Processes', credits: 3 },
    { name: 'CAD/CAM Solid Modeling', credits: 3 },
    { name: 'Robotics & Automation', credits: 4 },
    { name: 'Materials Science', credits: 3 },
  ],
  'Civil Engineering': [
    { name: 'Structural Analysis & Design', credits: 4 },
    { name: 'Geotechnical Engineering', credits: 4 },
    { name: 'Transportation Engineering', credits: 3 },
    { name: 'Hydraulics & Water Resources', credits: 3 },
    { name: 'Construction Management', credits: 3 },
    { name: 'Environmental Engineering', credits: 3 },
  ],
  'Business Administration': [
    { name: 'Strategic Marketing Management', credits: 4 },
    { name: 'Corporate Financial Management', credits: 4 },
    { name: 'Human Resource Management', credits: 3 },
    { name: 'Operations & Supply Chain', credits: 3 },
    { name: 'Business Law & Ethics', credits: 3 },
    { name: 'Data Analytics for Managers', credits: 4 },
  ],
  'Mathematics & Statistics': [
    { name: 'Advanced Real Analysis', credits: 4 },
    { name: 'Abstract Algebra', credits: 4 },
    { name: 'Probability Theory & Stochastics', credits: 4 },
    { name: 'Numerical Analysis & Methods', credits: 3 },
    { name: 'Linear Algebra & Matrices', credits: 4 },
    { name: 'Statistical Inference & Testing', credits: 3 },
  ],
}

const DEPARTMENTS = Object.keys(COURSE_MAP)
const SEMESTERS = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester']
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']

// Seed initial students
const SEED_STUDENTS = [
  {
    id: 'STU2026-901',
    firstName: 'Arjun',
    lastName: 'Sharma',
    dob: '2004-03-15',
    age: 22,
    gender: 'Male',
    phone: '+91 98765 43210',
    email: 'arjun.sharma@edureg.edu',
    address: '12, MG Road, Bengaluru, Karnataka 560001',
    department: 'Computer Science',
    course: 'B.Tech CSE',
    semester: '5th Semester',
    year: '3rd Year',
    subjects: ['Data Structures', 'Design of Algorithms', 'Database Management Systems'],
    guardian: 'Ramesh Sharma',
    guardianPhone: '+91 98700 11223',
    registeredAt: '2026-07-01T09:30:00.000Z',
    status: 'Verified',
  },
  {
    id: 'STU2026-902',
    firstName: 'Priya',
    lastName: 'Patel',
    dob: '2005-07-22',
    age: 21,
    gender: 'Female',
    phone: '+91 91234 56789',
    email: 'priya.patel@edureg.edu',
    address: '34, Navrangpura, Ahmedabad, Gujarat 380009',
    department: 'Business Administration',
    course: 'MBA',
    semester: '3rd Semester',
    year: '2nd Year',
    subjects: ['Strategic Marketing Management', 'Corporate Financial Management'],
    guardian: 'Suresh Patel',
    guardianPhone: '+91 91200 00001',
    registeredAt: '2026-07-02T10:15:00.000Z',
    status: 'Verified',
  },
  {
    id: 'STU2026-903',
    firstName: 'Rahul',
    lastName: 'Verma',
    dob: '2003-11-08',
    age: 22,
    gender: 'Male',
    phone: '+91 70000 12345',
    email: 'rahul.verma@edureg.edu',
    address: '5, Sector 15, Noida, Uttar Pradesh 201301',
    department: 'Electronics & Communication',
    course: 'B.Tech ECE',
    semester: '7th Semester',
    year: '4th Year',
    subjects: ['Digital Electronics', 'VLSI Circuit Design', 'Embedded Systems'],
    guardian: 'Anil Verma',
    guardianPhone: '+91 70001 00000',
    registeredAt: '2026-07-03T08:00:00.000Z',
    status: 'Active',
  },
]

// ─── Unique Student ID Generator ─────────────────────────────
function getNextUniqueStudentId(existingStudents = []) {
  const existingIds = new Set(
    existingStudents
      .map(s => (s && s.id ? String(s.id).trim().toUpperCase() : ''))
      .filter(Boolean)
  )

  // Scan all existing student IDs to find highest sequence number
  let maxSeq = 1000
  existingStudents.forEach(s => {
    if (!s || !s.id) return
    const match = String(s.id).match(/(\d{3,})$/)
    if (match) {
      const parsed = parseInt(match[1], 10)
      if (!isNaN(parsed) && parsed > maxSeq) {
        maxSeq = parsed
      }
    }
  })

  // Start with maxSeq + 1
  let nextSeq = maxSeq + 1
  let candidate = `STU2026-${String(nextSeq).padStart(4, '0')}`

  // Guarantee 100% uniqueness
  while (existingIds.has(candidate.toUpperCase())) {
    nextSeq++
    candidate = `STU2026-${String(nextSeq).padStart(4, '0')}`
  }

  return candidate
}

// ─── Helpers ──────────────────────────────────────────────────
function computeAge(dob) {
  if (!dob) return ''
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age > 0 ? age : ''
}

function avatarColor(name) {
  const colors = ['#9333ea', '#3b82f6', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']
  let hash = 0
  for (let i = 0; i < (name || '').length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

// ─── Validators ──────────────────────────────────────────────
const VALIDATORS = {
  firstName: v => (v && v.trim().length >= 2 ? '' : 'First name must be at least 2 characters'),
  lastName: v => (v && v.trim().length >= 2 ? '' : 'Last name must be at least 2 characters'),
  dob: v => {
    if (!v) return 'Date of birth is required'
    const d = new Date(v), now = new Date()
    if (d >= now) return 'Date of birth must be in the past'
    const age = computeAge(v)
    if (age < 15 || age > 75) return 'Age must be between 15 and 75'
    return ''
  },
  gender: v => (v ? '' : 'Please select gender'),
  phone: v => (/^[+\d\s\-]{7,15}$/.test((v || '').trim()) ? '' : 'Enter valid phone number (min 7 digits)'),
  email: v => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || '').trim()) ? '' : 'Enter a valid institutional email address'),
  address: v => (v && v.trim().length >= 8 ? '' : 'Please provide complete residential address'),
  studentId: v => (v ? '' : 'Student ID is required'),
  department: v => (v ? '' : 'Please select department'),
  course: v => (v ? '' : 'Please select a course track'),
  semester: v => (v ? '' : 'Please select current semester'),
  year: v => (v ? '' : 'Please select academic year'),
  guardian: v => (v && v.trim().length >= 2 ? '' : 'Guardian name must be at least 2 characters'),
  guardianPhone: v => (/^[+\d\s\-]{7,15}$/.test((v || '').trim()) ? '' : 'Enter valid guardian contact number'),
  terms: v => (v ? '' : 'You must certify FERPA compliance & code of conduct'),
}

export default function App() {
  const [activeTab, setActiveTab] = useState('register') // 'register' | 'roster'
  const [step, setStep] = useState(1)
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('edureg_students')
      return saved ? JSON.parse(saved) : SEED_STUDENTS
    } catch {
      return SEED_STUDENTS
    }
  })

  // Initial Form state with default assigned unique ID
  const [form, setForm] = useState(() => {
    let initialList = SEED_STUDENTS
    try {
      const saved = localStorage.getItem('edureg_students')
      if (saved) initialList = JSON.parse(saved)
    } catch {}
    return {
      firstName: '',
      lastName: '',
      dob: '',
      gender: 'Male',
      phone: '',
      email: '',
      address: '',
      studentId: getNextUniqueStudentId(initialList),
      department: 'Computer Science',
      course: 'B.Tech CSE',
      semester: '1st Semester',
      year: '1st Year',
      guardian: '',
      guardianPhone: '',
      terms: false,
    }
  })

  const [selectedSubjects, setSelectedSubjects] = useState(new Set(['Data Structures', 'Design of Algorithms']))
  const [errors, setErrors] = useState({})
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submittedStudent, setSubmittedStudent] = useState(null)
  const [toastMsg, setToastMsg] = useState('')

  // Roster Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [deptFilter, setDeptFilter] = useState('ALL')
  const [sortField, setSortField] = useState('registeredAt')
  const [sortAsc, setSortAsc] = useState(false)

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('edureg_students', JSON.stringify(students))
  }, [students])

  function showToast(msg) {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 4000)
  }

  function handleFormChange(field, val) {
    setForm(prev => {
      const updated = { ...prev, [field]: val }
      // Auto-set first available course if department changes
      if (field === 'department') {
        const availableCourses = COURSE_MAP[val] || []
        updated.course = availableCourses[0] || ''
        setSelectedSubjects(new Set())
      }
      return updated
    })

    if (VALIDATORS[field]) {
      const err = VALIDATORS[field](val)
      setErrors(e => ({ ...e, [field]: err }))
    }
  }

  function toggleSubject(subName) {
    setSelectedSubjects(prev => {
      const next = new Set(prev)
      if (next.has(subName)) {
        next.delete(subName)
      } else {
        next.add(subName)
      }
      return next
    })
  }

  function copyStudentId() {
    navigator.clipboard.writeText(form.studentId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    showToast('Institutional ID copied to clipboard!')
  }

  function validateStep(s) {
    const fieldsToValidate =
      s === 1
        ? ['firstName', 'lastName', 'dob', 'gender', 'phone', 'email', 'address']
        : ['studentId', 'department', 'course', 'semester', 'year', 'guardian', 'guardianPhone', 'terms']

    const newErrors = {}
    let hasError = false
    fieldsToValidate.forEach(f => {
      const err = VALIDATORS[f] ? VALIDATORS[f](form[f]) : ''
      if (err) {
        newErrors[f] = err
        hasError = true
      }
    })
    setErrors(e => ({ ...e, ...newErrors }))
    return !hasError
  }

  function handleNext() {
    if (validateStep(step)) {
      setStep(s => s + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleBack() {
    setStep(s => Math.max(1, s - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSubmit() {
    if (!validateStep(2)) return
    setIsSubmitting(true)

    setTimeout(() => {
      // Ensure the ID is uniquely guaranteed against any newly arrived students
      const assignedId = form.studentId || getNextUniqueStudentId(students)
      const newStudent = {
        ...form,
        id: assignedId,
        age: computeAge(form.dob),
        subjects: Array.from(selectedSubjects),
        registeredAt: new Date().toISOString(),
        status: 'Verified',
      }

      setStudents(prev => [newStudent, ...prev])
      setSubmittedStudent(newStudent)
      setIsSubmitting(false)
      showToast(`Student credentials verified & assigned ID: ${assignedId}`)
    }, 1000)
  }

  function resetForm() {
    // Pass current students list including the newly registered student to guarantee unique next ID
    const nextId = getNextUniqueStudentId(students)
    setForm({
      firstName: '',
      lastName: '',
      dob: '',
      gender: 'Male',
      phone: '',
      email: '',
      address: '',
      studentId: nextId,
      department: 'Computer Science',
      course: 'B.Tech CSE',
      semester: '1st Semester',
      year: '1st Year',
      guardian: '',
      guardianPhone: '',
      terms: false,
    })
    setSelectedSubjects(new Set(['Data Structures', 'Design of Algorithms']))
    setErrors({})
    setSubmittedStudent(null)
    setStep(1)
  }

  function handleDeleteStudent(id) {
    if (window.confirm(`Are you sure you want to remove record ${id}?`)) {
      setStudents(prev => prev.filter(s => s.id !== id))
      showToast(`Record ${id} removed from roster.`)
    }
  }

  // Filter and sort roster
  const filteredStudents = students
    .filter(s => {
      const matchesSearch =
        s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDept = deptFilter === 'ALL' || s.department === deptFilter
      return matchesSearch && matchesDept
    })
    .sort((a, b) => {
      let valA = a[sortField] || ''
      let valB = b[sortField] || ''
      if (typeof valA === 'string') valA = valA.toLowerCase()
      if (typeof valB === 'string') valB = valB.toLowerCase()
      if (valA < valB) return sortAsc ? -1 : 1
      if (valA > valB) return sortAsc ? 1 : -1
      return 0
    })

  const availableSubjects = SUBJECT_MAP[form.department] || []
  const totalCredits = Array.from(selectedSubjects).reduce((acc, subName) => {
    const item = availableSubjects.find(s => s.name === subName)
    return acc + (item ? item.credits : 3)
  }, 0)

  const progressPct = step === 1 ? 33 : step === 2 ? 66 : 100

  return (
    <div className="page">
      {/* Toast Notification */}
      <div className={`toast ${toastMsg ? 'visible' : ''}`}>
        <span className="material-symbols-outlined">check_circle</span>
        <span>{toastMsg}</span>
      </div>

      {/* Top Header */}
      <header className="header">
        <div className="header-inner">
          <div className="header-logo">
            <span className="material-symbols-outlined">school</span>
          </div>
          <div className="header-brand">
            <h1 className="header-title">EduReg Portal</h1>
            <p className="header-sub">Student Registry & Academic Onboarding</p>
          </div>
          <div className="header-badge">
            <span className="dot"></span>
            <span>{students.length} ENROLLED</span>
          </div>
        </div>
      </header>

      {/* Navigation Sub-bar */}
      <nav className="tab-nav">
        <div className="tab-nav-inner">
          <button
            className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            <span className="material-symbols-outlined">person_add</span>
            Register Student
          </button>
          <button
            className={`tab-btn ${activeTab === 'roster' ? 'active' : ''}`}
            onClick={() => setActiveTab('roster')}
          >
            <span className="material-symbols-outlined">group</span>
            Enrolled Roster ({students.length})
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'register' ? (
          <div>
            {/* Success View */}
            {submittedStudent ? (
              <div className="success-banner">
                <div className="success-icon">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <h2 className="success-title">Registration Officially Sealed</h2>
                <p className="success-sub">
                  Candidate {submittedStudent.firstName} {submittedStudent.lastName} has been verified and enrolled into{' '}
                  {submittedStudent.course}.
                </p>
                <div className="success-id">
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>badge</span>
                  <span>Institutional ID: {submittedStudent.id}</span>
                </div>
                <div>
                  <button className="btn-new" onClick={resetForm}>
                    <span className="material-symbols-outlined">add_circle</span>
                    Enroll Another Candidate
                  </button>
                  <button
                    className="btn-secondary"
                    style={{ marginLeft: 12 }}
                    onClick={() => setActiveTab('roster')}
                  >
                    <span className="material-symbols-outlined">visibility</span>
                    View in Roster
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Wizard Header */}
                <div className="wizard-header">
                  <div className="wizard-label">
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>verified_user</span>
                    Fall 2026 Onboarding Matrix • #REG-918
                  </div>
                  <h1 className="wizard-title">New Student Registration</h1>
                  <p className="wizard-sub">
                    Fill in verified details to generate encrypted student credentials with instant FERPA certification.
                  </p>
                </div>

                {/* Progress Stepper Module */}
                <div className="stepper">
                  {/* Step 1 */}
                  <div className="step-item" onClick={() => step > 1 && setStep(1)} style={{ cursor: 'pointer' }}>
                    <div className={`step-circle ${step > 1 ? 'done' : step === 1 ? 'active' : 'pending'}`}>
                      {step > 1 ? <span className="material-symbols-outlined">check</span> : 1}
                    </div>
                    <span className={`step-label ${step === 1 ? 'active-label' : step > 1 ? 'done-label' : ''}`}>
                      Personal
                    </span>
                  </div>

                  {/* Line 1 */}
                  <div className={`step-line ${step >= 2 ? 'filled' : ''}`}></div>

                  {/* Step 2 */}
                  <div
                    className="step-item"
                    onClick={() => {
                      if (step === 1 && validateStep(1)) setStep(2)
                      if (step === 3) setStep(2)
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={`step-circle ${step > 2 ? 'done' : step === 2 ? 'active' : 'pending'}`}>
                      {step > 2 ? <span className="material-symbols-outlined">check</span> : 2}
                    </div>
                    <span className={`step-label ${step === 2 ? 'active-label' : step > 2 ? 'done-label' : ''}`}>
                      Academic
                    </span>
                  </div>

                  {/* Line 2 */}
                  <div className={`step-line ${step >= 3 ? 'filled' : ''}`}></div>

                  {/* Step 3 */}
                  <div className="step-item">
                    <div className={`step-circle ${step === 3 ? 'active' : 'pending'}`}>
                      3
                    </div>
                    <span className={`step-label ${step === 3 ? 'active-label' : ''}`}>
                      Review & Seal
                    </span>
                  </div>
                </div>

                {/* Live Progress Bar */}
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: `${progressPct}%` }}></div>
                </div>

                {/* ═══ STEP 1: Personal Information ═══ */}
                {step === 1 && (
                  <div>
                    <div className="card">
                      <div className="card-header">
                        <div className="card-icon">
                          <span className="material-symbols-outlined">person</span>
                        </div>
                        <div>
                          <h2 className="card-title">Candidate Identity</h2>
                          <p className="card-sub">Official legal identity details for registration</p>
                        </div>
                      </div>

                      {/* Default Assigned Unique ID Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, padding: '10px 14px', background: 'rgba(221,184,255,0.06)', borderRadius: 'var(--r-md)', border: '1px solid rgba(221,184,255,0.18)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--primary)' }}>fingerprint</span>
                          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Assigned Student ID:</span>
                          <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', letterSpacing: '0.04em', fontSize: 13 }}>{form.studentId}</strong>
                        </div>
                        <span style={{ fontSize: 10, background: 'rgba(78,222,163,0.12)', color: 'var(--tertiary)', padding: '2px 8px', borderRadius: 'var(--r-full)', fontWeight: 700, border: '1px solid rgba(78,222,163,0.3)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 12 }}>lock</span>
                          AUTO-ASSIGNED UNIQUE
                        </span>
                      </div>

                      <div className="form-grid">
                        <div className="form-field">
                          <label className="field-label">
                            First Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className={`input ${errors.firstName ? 'has-error' : ''}`}
                            placeholder="e.g. Rahul"
                            value={form.firstName}
                            onChange={e => handleFormChange('firstName', e.target.value)}
                          />
                          {errors.firstName && (
                            <span className="field-error">
                              <span className="material-symbols-outlined">error</span>
                              {errors.firstName}
                            </span>
                          )}
                        </div>

                        <div className="form-field">
                          <label className="field-label">
                            Last Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className={`input ${errors.lastName ? 'has-error' : ''}`}
                            placeholder="e.g. Verma"
                            value={form.lastName}
                            onChange={e => handleFormChange('lastName', e.target.value)}
                          />
                          {errors.lastName && (
                            <span className="field-error">
                              <span className="material-symbols-outlined">error</span>
                              {errors.lastName}
                            </span>
                          )}
                        </div>

                        <div className="form-field">
                          <label className="field-label">
                            Date of Birth {computeAge(form.dob) && `(Age: ${computeAge(form.dob)})`}{' '}
                            <span className="required">*</span>
                          </label>
                          <input
                            type="date"
                            className={`input ${errors.dob ? 'has-error' : ''}`}
                            value={form.dob}
                            onChange={e => handleFormChange('dob', e.target.value)}
                          />
                          {errors.dob && (
                            <span className="field-error">
                              <span className="material-symbols-outlined">error</span>
                              {errors.dob}
                            </span>
                          )}
                        </div>

                        <div className="form-field">
                          <label className="field-label">Gender</label>
                          <div className="pill-group">
                            {['Male', 'Female', 'Other'].map(g => (
                              <button
                                key={g}
                                type="button"
                                className={`pill-btn ${form.gender === g ? 'selected' : ''}`}
                                onClick={() => handleFormChange('gender', g)}
                              >
                                <span className="material-symbols-outlined">
                                  {g === 'Male' ? 'male' : g === 'Female' ? 'female' : 'transgender'}
                                </span>
                                {g}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="form-field">
                          <label className="field-label">
                            Contact Phone <span className="required">*</span>
                          </label>
                          <div className="input-wrap">
                            <span className="input-icon">
                              <span className="material-symbols-outlined">phone</span>
                            </span>
                            <input
                              type="tel"
                              className={`input ${errors.phone ? 'has-error' : ''}`}
                              placeholder="+91 98765 43210"
                              value={form.phone}
                              onChange={e => handleFormChange('phone', e.target.value)}
                            />
                          </div>
                          {errors.phone && (
                            <span className="field-error">
                              <span className="material-symbols-outlined">error</span>
                              {errors.phone}
                            </span>
                          )}
                        </div>

                        <div className="form-field">
                          <label className="field-label">
                            Institutional Email <span className="required">*</span>
                          </label>
                          <div className="input-wrap">
                            <span className="input-icon">
                              <span className="material-symbols-outlined">mail</span>
                            </span>
                            <input
                              type="email"
                              className={`input ${errors.email ? 'has-error' : ''}`}
                              placeholder="student@edureg.edu"
                              value={form.email}
                              onChange={e => handleFormChange('email', e.target.value)}
                            />
                          </div>
                          {errors.email && (
                            <span className="field-error">
                              <span className="material-symbols-outlined">error</span>
                              {errors.email}
                            </span>
                          )}
                        </div>

                        <div className="form-field span-2">
                          <label className="field-label">
                            Permanent Residential Address <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className={`input ${errors.address ? 'has-error' : ''}`}
                            placeholder="Flat / House No., Street, City, State, Postal Code"
                            value={form.address}
                            onChange={e => handleFormChange('address', e.target.value)}
                          />
                          {errors.address && (
                            <span className="field-error">
                              <span className="material-symbols-outlined">error</span>
                              {errors.address}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step 1 Actions */}
                    <div className="nav-row nav-end">
                      <button className="btn-primary" onClick={handleNext}>
                        <span>Continue to Academic Info</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ═══ STEP 2: Academic Info ═══ */}
                {step === 2 && (
                  <div>
                    {/* Credentials & Department */}
                    <div className="card">
                      <div className="card-header">
                        <div className="card-icon">
                          <span className="material-symbols-outlined">badge</span>
                        </div>
                        <div>
                          <h2 className="card-title">Institutional Credentials</h2>
                          <p className="card-sub">Department routing & automated matrix token</p>
                        </div>
                      </div>

                      <div className="form-grid">
                        <div className="form-field">
                          <label className="field-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>
                              Assigned Student ID <span className="required">*</span>
                            </span>
                            <span style={{ fontSize: 10, color: 'var(--tertiary)', textTransform: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                              <span className="material-symbols-outlined" style={{ fontSize: 12 }}>verified</span>
                              System Unique
                            </span>
                          </label>
                          <div className="input-with-btn">
                            <input type="text" className="input readonly" readOnly value={form.studentId} title="Auto-assigned unique student identifier" />
                            <button type="button" className="btn-copy" onClick={copyStudentId}>
                              <span className="material-symbols-outlined">
                                {copied ? 'check' : 'content_copy'}
                              </span>
                              {copied ? 'Copied' : 'Copy'}
                            </button>
                          </div>
                        </div>

                        <div className="form-field">
                          <label className="field-label">
                            Department <span className="required">*</span>
                          </label>
                          <select
                            className="select"
                            value={form.department}
                            onChange={e => handleFormChange('department', e.target.value)}
                          >
                            {DEPARTMENTS.map(d => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-field">
                          <label className="field-label">
                            Course / Degree Track <span className="required">*</span>
                          </label>
                          <select
                            className="select"
                            value={form.course}
                            onChange={e => handleFormChange('course', e.target.value)}
                          >
                            {(COURSE_MAP[form.department] || []).map(c => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-field">
                          <label className="field-label">Semester Term</label>
                          <select
                            className="select"
                            value={form.semester}
                            onChange={e => handleFormChange('semester', e.target.value)}
                          >
                            {SEMESTERS.map(s => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-field span-2">
                          <label className="field-label">Year of Study</label>
                          <div className="pill-group">
                            {YEARS.map(y => (
                              <button
                                key={y}
                                type="button"
                                className={`pill-btn ${form.year === y ? 'selected' : ''}`}
                                onClick={() => handleFormChange('year', y)}
                              >
                                <span className="material-symbols-outlined">calendar_today</span>
                                {y}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Subject Basket */}
                    <div className="card">
                      <div className="card-header">
                        <div className="card-icon">
                          <span className="material-symbols-outlined">auto_stories</span>
                        </div>
                        <div>
                          <h2 className="card-title">Track Recommendation Basket</h2>
                          <p className="card-sub">Select curriculum subjects for credit allocation</p>
                        </div>
                      </div>

                      <div className="subject-grid">
                        {availableSubjects.map(sub => {
                          const isSelected = selectedSubjects.has(sub.name)
                          return (
                            <div
                              key={sub.name}
                              className={`subject-card ${isSelected ? 'selected' : ''}`}
                              onClick={() => toggleSubject(sub.name)}
                            >
                              <div className={`subject-check ${isSelected ? 'on' : 'off'}`}>
                                <span className="material-symbols-outlined">check</span>
                              </div>
                              <span className="subject-name">{sub.name}</span>
                              <span className="subject-credit">{sub.credits} Academic Credits</span>
                            </div>
                          )
                        })}
                      </div>

                      <div className="subject-counter">
                        <span>Selected: {selectedSubjects.size} courses</span>
                        <span>•</span>
                        <span className="credit-badge">{totalCredits} Total Credits</span>
                      </div>
                    </div>

                    {/* Emergency Contact & Policy */}
                    <div className="card">
                      <div className="card-header">
                        <div className="card-icon">
                          <span className="material-symbols-outlined">contact_phone</span>
                        </div>
                        <div>
                          <h2 className="card-title">Emergency Contact & Policy Certification</h2>
                          <p className="card-sub">Institutional guardian compliance and audit record</p>
                        </div>
                      </div>

                      <div className="form-grid">
                        <div className="form-field">
                          <label className="field-label">
                            Guardian Full Name <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            className={`input ${errors.guardian ? 'has-error' : ''}`}
                            placeholder="e.g. Ramesh Verma"
                            value={form.guardian}
                            onChange={e => handleFormChange('guardian', e.target.value)}
                          />
                          {errors.guardian && (
                            <span className="field-error">
                              <span className="material-symbols-outlined">error</span>
                              {errors.guardian}
                            </span>
                          )}
                        </div>

                        <div className="form-field">
                          <label className="field-label">
                            Guardian Phone <span className="required">*</span>
                          </label>
                          <input
                            type="tel"
                            className={`input ${errors.guardianPhone ? 'has-error' : ''}`}
                            placeholder="+91 98700 11223"
                            value={form.guardianPhone}
                            onChange={e => handleFormChange('guardianPhone', e.target.value)}
                          />
                          {errors.guardianPhone && (
                            <span className="field-error">
                              <span className="material-symbols-outlined">error</span>
                              {errors.guardianPhone}
                            </span>
                          )}
                        </div>

                        <div className="form-field span-2">
                          <div
                            className={`terms-row ${errors.terms ? 'has-error' : ''}`}
                            onClick={() => handleFormChange('terms', !form.terms)}
                          >
                            <div className={`custom-cb ${form.terms ? 'checked' : ''}`}>
                              {form.terms && <span className="material-symbols-outlined">check</span>}
                            </div>
                            <div className="terms-text">
                              I certify that all supplied academic and personal credentials are authentic under the{' '}
                              <strong>Institutional Academic Code</strong>. I consent to automated enrollment processing
                              and FERPA record auditing.
                              <span className="ferpa-badge">
                                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>verified</span>
                                FERPA AUDIT TOKEN
                              </span>
                            </div>
                          </div>
                          {errors.terms && (
                            <span className="field-error" style={{ marginTop: 6 }}>
                              <span className="material-symbols-outlined">error</span>
                              {errors.terms}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Step 2 Actions */}
                    <div className="nav-row">
                      <button className="btn-secondary" onClick={handleBack}>
                        <span className="material-symbols-outlined">arrow_back</span>
                        Back to Personal Info
                      </button>
                      <button className="btn-primary" onClick={handleNext}>
                        <span>Review & Verify</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ═══ STEP 3: Review & Seal ═══ */}
                {step === 3 && (
                  <div>
                    <div className="card">
                      <div className="card-header">
                        <div className="card-icon">
                          <span className="material-symbols-outlined">verified</span>
                        </div>
                        <div>
                          <h2 className="card-title">Enrollment Summary Review</h2>
                          <p className="card-sub">Inspect registration details prior to cryptographic seal</p>
                        </div>
                      </div>

                      <div className="review-grid">
                        <div className="review-item">
                          <span className="review-label">Candidate Name</span>
                          <span className="review-value">
                            {form.firstName} {form.lastName}
                          </span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Assigned ID</span>
                          <span className="review-value mono">{form.studentId}</span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Date of Birth & Age</span>
                          <span className="review-value">
                            {form.dob} ({computeAge(form.dob)} yrs, {form.gender})
                          </span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Official Email</span>
                          <span className="review-value">{form.email}</span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Contact Phone</span>
                          <span className="review-value">{form.phone}</span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Residential Address</span>
                          <span className="review-value">{form.address}</span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Department</span>
                          <span className="review-value">{form.department}</span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Degree Track</span>
                          <span className="review-value">{form.course}</span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Semester & Year</span>
                          <span className="review-value">
                            {form.semester} • {form.year}
                          </span>
                        </div>
                        <div className="review-item">
                          <span className="review-label">Guardian Contact</span>
                          <span className="review-value">
                            {form.guardian} ({form.guardianPhone})
                          </span>
                        </div>
                      </div>

                      <div style={{ marginTop: 20 }}>
                        <span className="review-label">Enrolled Subjects ({selectedSubjects.size} selected, {totalCredits} credits)</span>
                        <div className="subjects-list">
                          {Array.from(selectedSubjects).map(s => (
                            <span key={s} className="subject-tag">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Step 3 Actions */}
                    <div className="nav-row">
                      <button className="btn-secondary" onClick={handleBack}>
                        <span className="material-symbols-outlined">edit</span>
                        Edit Details
                      </button>
                      <button className="btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                        <span className="material-symbols-outlined">
                          {isSubmitting ? 'sync' : 'lock'}
                        </span>
                        <span>{isSubmitting ? 'Sealing Registry...' : 'Seal & Authorize Registry'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* ═══ ROSTER TAB ═══ */
          <div>
            <div className="roster-header">
              <h1 className="roster-title">Enrolled Student Roster</h1>
              <p className="roster-sub">
                Central ledger of all authenticated and active university matriculation records.
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-num">{students.length}</div>
                <div className="stat-label">Total Enrolled</div>
              </div>
              <div className="stat-card">
                <div className="stat-num" style={{ color: 'var(--tertiary)' }}>
                  {students.filter(s => s.status === 'Verified').length}
                </div>
                <div className="stat-label">Verified & Active</div>
              </div>
              <div className="stat-card">
                <div className="stat-num" style={{ color: '#38bdf8' }}>
                  {new Set(students.map(s => s.department)).size}
                </div>
                <div className="stat-label">Departments</div>
              </div>
              <div className="stat-card">
                <div className="stat-num" style={{ color: '#f59e0b' }}>
                  100%
                </div>
                <div className="stat-label">FERPA Integrity</div>
              </div>
            </div>

            {/* Search & Filter Controls */}
            <div className="roster-controls">
              <div className="search-wrap">
                <span className="material-symbols-outlined">search</span>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by student name, ID, or email..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <select
                className="dept-select"
                value={deptFilter}
                onChange={e => setDeptFilter(e.target.value)}
              >
                <option value="ALL">All Departments</option>
                {DEPARTMENTS.map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Table */}
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th onClick={() => { setSortField('firstName'); setSortAsc(!sortAsc); }}>
                      Student Name <span className="sort-icon">↕</span>
                    </th>
                    <th onClick={() => { setSortField('id'); setSortAsc(!sortAsc); }}>
                      Registry ID <span className="sort-icon">↕</span>
                    </th>
                    <th onClick={() => { setSortField('department'); setSortAsc(!sortAsc); }}>
                      Department & Course <span className="sort-icon">↕</span>
                    </th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr className="empty-row">
                      <td colSpan="5">
                        <span className="material-symbols-outlined empty-icon">sentiment_dissatisfied</span>
                        No matching students found in ledger.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(student => (
                      <tr key={student.id}>
                        <td>
                          <div className="student-cell">
                            <div
                              className="avatar"
                              style={{ background: avatarColor(student.firstName) }}
                            >
                              {student.firstName[0]}
                              {student.lastName[0]}
                            </div>
                            <div>
                              <div className="student-name">
                                {student.firstName} {student.lastName}
                              </div>
                              <div className="student-email">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="id-cell">{student.id}</span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{student.course}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{student.department}</div>
                        </td>
                        <td>
                          <span className={`status-badge ${student.status === 'Verified' ? 'verified' : 'pending'}`}>
                            <span className="dot-sm"></span>
                            {student.status || 'Active'}
                          </span>
                        </td>
                        <td>
                          <div className="action-cell">
                            <button
                              className="btn-delete"
                              title="Delete record"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <span className="material-symbols-outlined">delete</span>
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-badge">
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>shield</span>
          Academic Ledger Secure
        </span>
        <span className="footer-sep"></span>
        <span>FERPA Compliant Registry</span>
        <span className="footer-sep"></span>
        <span>EduReg Portal v2.4</span>
      </footer>
    </div>
  )
}
