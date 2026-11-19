# Student Registration System — PRD

## 1. Overview
A web-based **Student Registration System** built with React + Vite that allows students to register, view registered students as ID cards, and manage a student roster — all client-side with localStorage persistence.

## 2. Goals
- Replace the default Vite scaffold with a fully functional student registration app
- Provide a 3-step guided registration wizard with live validation
- Display registered students as printable ID cards
- Maintain a searchable, filterable roster table

## 3. Users
| Role | Description |
|---|---|
| Student | Fills in personal & academic info to register |
| Admin | Views the roster and student ID cards |

## 4. Features

### 4.1 Registration Form (3-step wizard)
- **Step 1 — Personal Info**: First name, last name, DOB (auto-calculates age), gender, phone, email, address
- **Step 2 — Academic Info**: Student ID, department (drives course dropdown dynamically), course, semester, year, GPA, subjects (multi-select toggle), guardian name & phone, terms checkbox
- **Step 3 — Review & Submit**: Read-only preview of all fields; submit saves to localStorage and shows toast

### 4.2 Student ID Card
- Photo avatar (initials-based with deterministic color)
- Barcode strip (fake SVG barcode from student ID)
- Fields: name, ID, department, course, year, validity
- Flip animation (front = photo + details, back = barcode)

### 4.3 Roster / Dashboard
- Table of all registered students
- Search by name or ID
- Filter by department
- Sort by name or date registered
- Delete a student record

## 5. Data Model
```ts
interface Student {
  id: string           // STUxxxxxxxx
  firstName: string
  lastName: string
  dob: string          // ISO date
  age: number
  gender: string
  phone: string
  email: string
  address: string
  department: string
  course: string
  semester: string
  year: string
  prevGrade: string
  subjects: string[]
  guardian: string
  guardianPhone: string
  registeredAt: string // ISO timestamp
}
```

## 6. Tech Stack
| Layer | Choice |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Styling | Plain CSS with custom properties (no Tailwind) |
| State | React useState + useReducer via custom hook |
| Persistence | localStorage |
| Routing | None (SPA tabs) |

## 7. Non-Goals
- Backend / database integration
- Authentication
- File upload for photos

## 8. Success Metrics
- Zero build errors
- Form submits in < 1s
- Roster filters update in < 100ms
- Works in Chrome, Firefox, Safari
