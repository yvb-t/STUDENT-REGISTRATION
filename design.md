# Student Registration System — Design Spec

## 1. Design Tokens (`tokens.css`)

### Colors
| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-bg` | `#ffffff` | `#16171d` | Page background |
| `--color-surface` | `#f7f6f3` | `#1f2028` | Card / input background |
| `--color-border` | `#e5e4e7` | `#2e303a` | Borders, dividers |
| `--color-text` | `#6b6375` | `#9ca3af` | Body copy |
| `--color-heading` | `#08060d` | `#f3f4f6` | Headings, labels |
| `--color-accent` | `#aa3bff` | `#c084fc` | Primary CTA, active states |
| `--color-accent-soft` | `rgba(170,59,255,.08)` | `rgba(192,132,252,.12)` | Accent backgrounds |
| `--color-success` | `#22c55e` | `#4ade80` | Success states, done dots |
| `--color-error` | `#ef4444` | `#f87171` | Validation errors |
| `--color-warning` | `#f59e0b` | `#fbbf24` | Warnings |

### Typography
| Token | Value |
|---|---|
| `--font-sans` | `system-ui, 'Segoe UI', Roboto, sans-serif` |
| `--font-mono` | `ui-monospace, Consolas, monospace` |
| `--text-xs` | `11px` |
| `--text-sm` | `13px` |
| `--text-base` | `15px` |
| `--text-lg` | `18px` |
| `--text-xl` | `22px` |

### Spacing
| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |

### Radii
| Token | Value |
|---|---|
| `--radius-sm` | `6px` |
| `--radius-md` | `10px` |
| `--radius-lg` | `14px` |
| `--radius-full` | `9999px` |

---

## 2. Component Inventory

### `<RegistrationForm>`
- 3-step wizard with animated step indicator
- Progress bar (animated width transition)
- Each step slides in with `fadeIn` keyframe
- Navigation buttons: Back (secondary) / Next or Submit (accent primary)

### `<StudentCard>`
- 340 × 210px card with flip animation on hover/click
- **Front**: accent gradient header strip, initials avatar, name, ID, department, course, year
- **Back**: institution name, barcode SVG, validity date
- Shadow: `0 8px 32px rgba(0,0,0,0.12)`

### `<Roster>`
- Full-width table with sticky header
- Search input + department filter dropdown side by side
- Sortable columns (Name ↑↓, Date ↑↓)
- Delete button with confirmation

### `<Avatar>`
- Circle, 56px default
- Background: deterministic color from student ID hash
- Initials: first + last name initials, white bold text

### `<Barcode>`
- SVG barcode from student ID characters
- Each character maps to a unique bar pattern

---

## 3. Layout

```
┌─────────────────────────────────────────────┐
│  🎓 Student Registration    [Form] [Cards] [Roster] │  ← Tab nav
├─────────────────────────────────────────────┤
│                                             │
│   [Step indicator] ───────────────────────  │
│   [Progress bar]                            │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │  Card content (form / cards / table)│   │
│   └─────────────────────────────────────┘   │
│                                             │
│        [Back]              [Next →]         │
└─────────────────────────────────────────────┘
```

---

## 4. Responsive Breakpoints
| Breakpoint | Layout |
|---|---|
| `> 700px` | 2-column form grid |
| `≤ 700px` | 1-column stacked |
| `≤ 540px` | Compact padding, full-width buttons |

---

## 5. Animations
| Element | Animation |
|---|---|
| Step transition | `fadeIn` 0.3s ease |
| Progress bar fill | `width` 0.4s ease |
| Step dots | `background`, `border-color` 0.3s |
| Toast | `bottom` slide-up 0.4s cubic-bezier spring |
| Card flip | `rotateY` 0.6s ease |
| Subject toggle | `background`, `border-color` 0.18s |
