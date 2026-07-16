# NagarSamadhan 🏙️
> **Your City's Voice, Simplified.**

NagarSamadhan is a modern, anonymous, and AI-powered civic reporting web application that empowers citizens to report urban infrastructure issues (like potholes, garbage, or water leaks) instantly. With zero friction—no login or passwords required—citizens get a unique Ticket ID and QR code to track the live progress of their complaints.

## 🔗 Live Demo
https://asmikatke.github.io/NagarSamadhan/

## 🚀 Key Features

### 👤 Citizen Portal
- **Anonymous Reporting**: Report civic issues with zero-setup signup. Just describe the issue, upload media evidence, and submit.
- **Smart GPS Location Capture**: Automatic coordinates capture via HTML5 Geolocation with simulated map previews.
- **Evidence Upload**: Seamless file upload interface for photo and video proof.
- **Instant QR Code Generation**: Upon successful submission, a ticket confirmation modal displays a unique generated Ticket ID and its corresponding QR code (`qrcode.react`).
- **Live Ticket Tracking**: A step-by-step progress visualizer tracking the complaint from submission, AI categorization, worker dispatch, up to resolution.
- **QR Code Scanner**: Built-in camera scanner (`html5-qrcode`) allowing citizens to scan their ticket QR codes on mobile to instantly view progress.

### 🤖 Simulated AI Assistance
- **Language Detection**: Real-time mock detection of description language (detects Devnagari script for Hindi/Marathi or English).
- **Auto-Categorization & Prioritization**: Simulates automated categorization of issues (e.g., "Pothole/Roads") and marks high-priority complaints (like road hazards) as `CRITICAL`.

### 👮 Officer Command Center (Dashboard)
- **Status Metrics**: Real-time cards displaying resolution metrics (Unassigned, In Progress, Completed).
- **Ticket Inbox**: Tabular view of all incoming tickets with search filters.
- **Interactive Map View**: Integrates Leaflet maps plotting active ticket locations based on citizen GPS coordinates.
- **Administrative Action Drawer**: Allows command center admins to trigger "AI Auto-Dispatch" or manually mark issues as resolved.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19 (built with Vite)
- **Router**: React Router DOM v7 (configured with `HashRouter` for sub-page reloading on static servers like GitHub Pages)
- **Styling**: Tailwind CSS v4.0 (fully custom `@theme` styling palette with vibrant government dark-blue, emerald highlights, and custom glassmorphism panels)
- **Animations**: Framer Motion (for smooth slide-ins, drawer transitions, and modals)
- **Icons**: Lucide React
- **Maps API**: Leaflet & React Leaflet
- **QR Utilities**: `html5-qrcode` & `qrcode.react`

---

## 📂 Project Structure

```text
Tvarit/
├── public/                  # Static assets (Favicons, SVG icons)
├── src/
│   ├── assets/              # Static media (Hero images, SVGs)
│   ├── components/
│   │   ├── Navbar.jsx       # Responsive navigation header with mobile drawer
│   │   └── QRScannerModal.jsx # Camera-based QR code scanner module
│   ├── context/
│   │   └── TicketContext.jsx # React context API for local ticket state management
│   ├── pages/
│   │   ├── Home.jsx         # Landing page with CTA cards (Report, Track, Scan)
│   │   ├── ReportPage.jsx   # Issue reporting form with GPS and evidence inputs
│   │   ├── TrackingPage.jsx # Steps timeline tracker for individual Ticket IDs
│   │   └── Dashboard.jsx    # Officer admin portal (List view, Map view, and Actions)
│   ├── App.jsx              # Main App entry, layout wrappers, and HashRouter routing
│   ├── index.css            # Global CSS, Tailwind v4 imports, and glassmorphism class
│   └── main.jsx             # React DOM renderer
├── vite.config.js           # Vite config (configured base path for NagarSamadhan deployment)
└── package.json             # Scripts, homepage, and dependencies
