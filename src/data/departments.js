// ─── Departments, Courses & Subjects ─────────────────────────────────────────

export const DEPARTMENTS = [
  'Computer Science',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Mathematics & Statistics',
]

export const COURSE_MAP = {
  'Computer Science': [
    'B.Tech CSE', 'B.Tech AI & ML', 'B.Tech Data Science', 'M.Tech CSE', 'MCA',
  ],
  'Electronics & Communication': [
    'B.Tech ECE', 'B.Tech VLSI', 'M.Tech ECE',
  ],
  'Mechanical Engineering': [
    'B.Tech Mechanical', 'B.Tech Automobile', 'M.Tech Thermal',
  ],
  'Civil Engineering': [
    'B.Tech Civil', 'B.Tech Environmental', 'M.Tech Structural',
  ],
  'Business Administration': [
    'BBA', 'MBA', 'B.Com', 'M.Com',
  ],
  'Mathematics & Statistics': [
    'B.Sc Math', 'B.Sc Statistics', 'M.Sc Mathematics', 'M.Sc Statistics',
  ],
}

export const SUBJECT_MAP = {
  'Computer Science': [
    'Data Structures', 'Algorithms', 'DBMS', 'Operating Systems',
    'Computer Networks', 'Machine Learning', 'Web Development',
    'Cloud Computing', 'Cybersecurity', 'DevOps',
  ],
  'Electronics & Communication': [
    'Digital Electronics', 'Signals & Systems', 'Microprocessors',
    'VLSI Design', 'Embedded Systems', 'RF Engineering',
  ],
  'Mechanical Engineering': [
    'Thermodynamics', 'Fluid Mechanics', 'Manufacturing Processes',
    'CAD/CAM', 'Robotics', 'Materials Science',
  ],
  'Civil Engineering': [
    'Structural Analysis', 'Geotechnical Engineering', 'Transportation Engineering',
    'Hydraulics', 'Construction Management', 'Environmental Engineering',
  ],
  'Business Administration': [
    'Marketing Management', 'Financial Management', 'Human Resources',
    'Operations Management', 'Business Law', 'Entrepreneurship', 'Data Analytics',
  ],
  'Mathematics & Statistics': [
    'Real Analysis', 'Abstract Algebra', 'Probability Theory',
    'Numerical Methods', 'Linear Algebra', 'Optimization', 'Statistical Inference',
  ],
}

export const SEMESTERS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']
  .map(s => `${s} Semester`)

export const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']
