# VMRTIN26 — Detector Logbook

**Motor Oil Refineries · Instrumentation Department**

Web application for fire & gas detector maintenance tracking.

---

## 🚀 Deploy (GitHub Pages)

This repository is configured for **GitHub Pages** static hosting.

### Setup Steps

1. Upload `index.html` and `404.html` to a GitHub repository  
2. Go to **Settings → Pages**  
3. Source: **Deploy from a branch**  
4. Branch: `main` / root `/`  
5. Save — site will be live at `https://<username>.github.io/<repo>/`

---

## 🔧 Google Sheets Backend

The app connects to a Google Apps Script web app for data persistence.

**Script URL:** configured in `GS_URL` inside `index.html`

### Required Sheets structure (Google Spreadsheet):

| Sheet | Columns |
|-------|---------|
| `DETECTORS` | TAG, DESCRIPTION, LOCATION, TYPE, AREA, CATEGORY, CAL_INTERVAL, NEXT_CAL_DATE |
| `ENTRIES` | TAG, DATE, TASK, CYLINDER, TECHNICIAN, NOTES, TIMESTAMP |
| `USERS` | USERNAME, PASS_HASH, ROLE, NAME, DEPT |

### Apps Script Actions

The script must handle these `action` parameters:

**GET:**
- `getDetectors` → returns `{ detectors: [...] }`
- `getAllEntries` → returns `{ entries: [...] }`
- `getUsers` → returns `{ users: [...] }`

**POST (body as JSON):**
- `addEntry` → adds row to ENTRIES sheet
- `addDetector` → adds row to DETECTORS sheet
- `updateDetector` → updates TAG row in DETECTORS
- `updatePassword` → updates PASS_HASH in USERS
- `importDetectors` → bulk import

---

## 🔐 Default Users

| Username | Password | Role |
|----------|----------|------|
| `admin`  | `admin`  | Admin |
| `super`  | `super1` | Supervisor |
| `tech1`  | `tech1`  | Technician |
| `tech2`  | `tech2`  | Technician |
| `view1`  | `view1`  | Read-only |

> ⚠️ Change all passwords after first login.

---

## 📱 Features

- **Dashboard** — KPIs, upcoming calibrations, recent entries
- **Detector list** — Search by TAG, filter by area, calibration status
- **Log entry** — Record calibration, sensor replacement, repair, PM
- **Statistics** — Monthly breakdown, area coverage
- **Admin** — User management, roles, calibration intervals
- **Import** — Excel (.xlsx) import from logbook files
- **Export** — PDF report, CSV for Excel

---

## 🏗️ Tech Stack

- Single HTML file (vanilla JS, no build step)
- Google Sheets via Apps Script as backend
- LocalStorage for offline persistence
- SheetJS (CDN) for Excel import

---

*Motor Oil Refineries · Instruments Dept · 2026*
