# 🎓 Student Registration System

A fully client-side **Student Registration System** built with **React 19 + Vite 8**. No backend required — all data persists in `localStorage`.

---

## ✨ Features

| Feature | Details |
|---|---|
| **3-Step Registration Wizard** | Personal → Academic → Review & Submit |
| **Live Validation** | Inline errors clear as you type |
| **Dynamic Dropdowns** | Courses update based on selected department |
| **Subject Toggles** | Multi-select subject buttons per department |
| **Auto Age Calculation** | Computed from date of birth |
| **Student ID Cards** | Flip card with avatar, barcode, details |
| **Roster Table** | Search, filter by department, sort, delete |
| **localStorage Persistence** | Data survives page refresh |
| **Light / Dark Mode** | Respects `prefers-color-scheme` |
| **Responsive** | Works on desktop and mobile |

---

## 📁 Project Structure

```
STUDENT-REGISTRATION/
├── prd.md                          # Product Requirements
├── design.md                       # Design Spec & Tokens
├── readme.md                       # This file
└── student-registration/           # Vite + React app
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx                # Entry point
        ├── App.jsx                 # Root — tab navigation
        ├── App.css                 # App-level styles
        ├── index.css               # Global reset + tokens
        ├── components/
        │   ├── StudentForm.jsx     # 3-step registration form
        │   ├── StudentCardSystem.jsx  # ID card grid
        │   ├── Roster.jsx          # Student table
        │   └── card/
        │       ├── StudentCard.jsx # Flip card component
        │       ├── Avatar.jsx      # Initials avatar
        │       ├── Barcode.jsx     # SVG barcode
        │       ├── Strip.jsx       # Header strip
        │       ├── Field.jsx       # Card field row
        │       ├── card.css        # Card flip styles
        │       └── index.js        # Barrel export
        ├── data/
        │   ├── departments.js      # Departments / courses / subjects
        │   └── sampleStudents.js   # Seed data
        ├── hooks/
        │   └── useStudents.js      # localStorage state hook
        ├── styles/
        │   ├── tokens.css          # Design tokens
        │   └── app.css             # Shared component styles
        └── utils/
            ├── dates.js            # Age / date helpers
            └── hash.js             # Deterministic color hash
```

---

## 🚀 Getting Started

```bash
# 1. Enter project
cd student-registration

# 2. Install dependencies (already done if node_modules exists)
npm install

# 3. Start dev server
npm run dev
# → http://localhost:5173

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview
```

---

## 🗂 Tabs

| Tab | Description |
|---|---|
| **Register** | Fill the 3-step form to register a new student |
| **ID Cards** | View all registered students as flip ID cards |
| **Roster** | Searchable, filterable table of all students |

---

## 🛠 Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tool & dev server
- **Plain CSS** — Custom properties, no framework
- **localStorage** — Client-side persistence

---

## 📄 License

MIT — free to use, modify and distribute.
