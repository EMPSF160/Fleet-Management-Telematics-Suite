# OCT Smart Fleet — Fleet Management & Telematics Suite

A full-stack SaaS web application for Fleet Management & Telematics Suite with secure user authentication, interactive telemetry dashboards, multi-format export tools, and client access control.

## Running Locally

```bash
npm run dev
```

The application will be served at `http://localhost:3000/` or `http://localhost:3001/`.

## Key Features & Compliance
- **Exact 5 Pages**:
  1. `Overview` (Home)
  2. `Live Map` (Interactive telemetry radar dashboard)
  3. `Telematics` (OBD-II DTC fault scanner, driver safety scoring, route scrubber)
  4. `Maintenance` (Work orders ledger & digital DVIR compliance)
  5. `Reports & Access` (CSV / JSON / PDF export center & client role permissions)
- **Strict Logo & Auth Requirements**:
  - Logo centered inside authentication cards (Login, Register, Forgot Password)
  - Logo clickable &rarr; routes directly to Home page
- **Strict Favicon Requirements**:
  - High-definition SVG favicon added to `<head>` of all pages
- **Strict Footer Social Icons**:
  - 5 platforms: LinkedIn, X/Twitter, Facebook, Instagram, YouTube
  - Equal size (44x44px), equal spacing (16px), circular shape
  - Working clickable links (target="_blank" rel="noopener noreferrer")
  - Responsive at 320px, 375px, 425px, 576px, 768px, 834px, 900px, 1024px, and desktop
- **Theme Color Change**:
  - 4 themes: Cyber Fleet (Dark Navy), Emerald Eco (Green), Solar Amber (Gold), Daylight Light (Clean)
