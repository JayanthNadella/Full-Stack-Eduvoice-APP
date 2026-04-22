# EduVoice — College Complaint Portal

A React + Vite conversion of the EduVoice single-page HTML app.

## Project Structure

```
eduvoice/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx               # Entry point
    ├── App.jsx                # Root component
    ├── context/
    │   └── AppContext.jsx     # Global state (auth, complaints, navigation)
    ├── data/
    │   └── demoData.js        # Seed users & complaints
    ├── styles/
    │   └── global.css         # All CSS variables & styles
    ├── pages/
    │   ├── AuthScreen.jsx     # Login & Register
    │   ├── Dashboard.jsx      # Stats overview + recent activity
    │   ├── ComplaintsList.jsx # Filterable complaints list
    │   ├── NewComplaint.jsx   # Complaint submission form
    │   ├── Analytics.jsx      # Charts & stats (admin only)
    │   └── Profile.jsx        # User profile page
    └── components/
        ├── AppLayout.jsx      # Sidebar + topbar + page routing
        ├── Sidebar.jsx        # Navigation sidebar
        ├── ComplaintCard.jsx  # Reusable complaint card
        ├── ComplaintModal.jsx # Detail modal (view + admin actions)
        └── Toast.jsx          # Notification toast
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
cd eduvoice
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Demo Credentials

| Role    | Email                  | Password  |
|---------|------------------------|-----------|
| Student | priya@student.edu      | admin123  |
| Admin   | admin@college.edu      | admin123  |

## Features

- Auth — Login / Register with role selection (Student / Admin)
- Dashboard — Stat cards + recent activity feed
- Complaints List — Search, filter by status / category / priority
- New Complaint — Category picker, priority selector, anonymous toggle
- Complaint Modal — Full detail view; admin can update status & add notes
- Analytics — Bar chart + SVG donut chart (admin only)
- Profile — User info + personal stats
- Responsive — Collapsible sidebar with hamburger on mobile
- Toast notifications — Success / error / info feedback

## Connecting a Real Backend

Replace functions in src/context/AppContext.jsx with real API calls and
add VITE_API_URL=http://localhost:5000/api to a .env file.
