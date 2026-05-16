# 🌙 momentous-studio-raya

> Event booking system for the Momentous Foto Raya 2026 outdoor photoshoot season — now closed.

![Status](https://img.shields.io/badge/status-archived-lightgrey)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [User Flow](#-user-flow)
- [Frontend Components](#-frontend-components)
- [Feature Flows](#-feature-specific-flows)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧭 Overview

momentous-studio-raya was the dedicated booking site for Momentous Foto's Raya 2026 outdoor photoshoot event at Bukit Lagong, Batu Caves. It featured a multi-step booking wizard, live slot management via Google Sheets, dynamic clearance-sale pricing, and WhatsApp-based booking confirmation. The 2026 season has ended — the site now displays the Closed page with a sample gallery.

**Type:** `Solo`
**Brand:** `Momentous Foto`
**Built with:** Independent

---

## ✨ Features

- ✅ Multi-step booking wizard (date, time, customer details, confirmation)
- ✅ Live slot availability via Google Sheets API
- ✅ Dynamic pricing with clearance sale date ranges
- ✅ Add-ons system (adults +RM10, children under 6 free)
- ✅ Bento-grid photo gallery with fullscreen lightbox
- ✅ WhatsApp booking notifications (pre-filled message)
- ✅ Google Calendar event generation
- ✅ Image usage consent with scrollable terms
- ✅ Responsive mobile-first layout
- ✅ Closed page with sample gallery (season ended)
- 💡 Backend booking management system *(planned)*
- 💡 Email booking confirmations *(planned)*
- 💡 Admin dashboard for slot management *(planned)*

---

## 🛠 Tech Stack

```mermaid
graph TD
    subgraph Frontend
        FE["React 18 · Vite 7"]
        UI["shadcn/ui · Tailwind CSS 3"]
        RR["React Router DOM 6"]
        RHF["react-hook-form 7"]
        DF["date-fns 3"]
    end
    subgraph Infrastructure
        HOST["GitHub Pages\n/momentous-studio-raya/"]
        GS["Google Sheets API\n(slot availability)"]
        WA["WhatsApp Web\n(booking confirmation)"]
        GC["Google Calendar\n(event generation)"]
    end
    FE --> HOST
    FE --> GS
    FE --> WA
    FE --> GC
```

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 7 |
| Language | TypeScript 5 |
| Routing | React Router DOM 6 |
| Styling | Tailwind CSS 3 + shadcn/ui |
| Forms | react-hook-form 7 |
| Dates | date-fns 3 |
| Slot data | Google Sheets API |
| Hosting | GitHub Pages (sub-path `/momentous-studio-raya/`) |
| Booking | WhatsApp Web (client-side redirect) |

---

## 📌 Architecture

### High-level Architecture

```mermaid
graph TD
    A[Visitor / Browser] --> B["React App\nGitHub Pages"]
    B --> C["Google Sheets API\n(live slot availability)"]
    B --> D["WhatsApp Web\n(booking confirmation)"]
    B --> E["Google Calendar\n(add event link)"]
    B --> F["Static Assets\n(gallery images)"]
```

### System Architecture

```mermaid
graph TD
    subgraph Frontend ["React + Vite"]
        P[Pages] --> C[Components]
        C --> H[Hooks]
        H --> U[Utils / Data]
    end
    subgraph Data ["Data & Utils"]
        D1["packages.ts\n(pricing, dates, slots)"]
        D2["sheets.ts\n(Google Sheets API)"]
        D3["notifications.ts\n(WhatsApp)"]
        D4["bookingData.ts\n(helpers)"]
        D5["imagePath.ts\n(prod base path)"]
    end
    H --> D1
    H --> D2
    C --> D3
    C --> D5
```

---

## 👤 User Flow

> The flow below documents the booking experience when the event was active.

```mermaid
flowchart TD
    A([Visit Site]) --> B["Closed Page · Season ended"]
    B --> C{Season active?}
    C -->|No| Z([View sample gallery])
    C -->|Yes| D["/packages · Browse Slay Package"]
    D --> E[Click Book Now]
    E --> F["/book · Step 1: Pick date & time"]
    F --> G{Slot available?}
    G -->|No| F
    G -->|Yes| H["Step 2: Fill customer details"]
    H --> I["Step 3: Review & confirm"]
    I --> J["/confirmation"]
    J --> K[Open WhatsApp\nwith booking details]
    J --> L[Add to Google Calendar]
    K --> M([Booking confirmed via WhatsApp])
```

### Page Map

```mermaid
graph TD
    subgraph Public ["🌐 Public Routes"]
        ROOT["/"]
        PKG["/packages"]
        BOOK["/book"]
        CONF["/confirmation"]
        WILD["/* → redirect to /"]
    end

    ROOT --> PKG
    PKG --> BOOK
    BOOK --> CONF

    style Public fill:#e8f5e9,stroke:#4caf50
```

---

## 🧩 Frontend Components

### Component Tree

```mermaid
graph TD
    App --> RR["React Router"]
    RR --> Closed
    RR --> Packages
    RR --> Booking
    RR --> Confirmation

    Packages --> GallerySection
    Packages --> PackageCard

    Booking --> BookingSteps
    Booking --> DateTimePicker
    Booking --> PaxCounter
    Booking --> CustomerForm
    Booking --> BookingSummary

    Confirmation --> BookingSummary
```

### Key Components

| Component | Purpose |
|---|---|
| `BookingSteps` | Step indicator showing progress through the booking wizard |
| `DateTimePicker` | Calendar + 15-min time slot selector with live slot availability |
| `PaxCounter` | Increment/decrement counter for adults and children |
| `CustomerForm` | Name, email, phone, notes, and image consent form |
| `BookingSummary` | Booking detail and price summary card |
| `GallerySection` | Bento-grid photo gallery |
| `PackageCard` | Package showcase with pricing and inclusions |
| `Header` | Navigation: Home, Packages, Book Now |
| `Footer` | Footer with social links (Instagram, TikTok, Threads) |
| `FloatingClouds` | Animated background decoration |

---

## ⚙️ Feature-specific Flows

### Booking Wizard Flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant GS as Google Sheets

    U->>FE: Select date
    FE->>GS: fetchBookingsFromSheet()
    GS-->>FE: Return booked / pending slots
    FE-->>U: Show available time slots

    U->>FE: Select time slot
    U->>FE: Fill customer details (name, email, phone)
    U->>FE: Review & confirm
    FE-->>U: Show confirmation page + total price
    FE-->>U: Open WhatsApp with pre-filled booking message
    FE-->>U: Generate Google Calendar event link
```

### Dynamic Pricing Flow

```mermaid
flowchart TD
    A([Select booking date]) --> B{Within clearance\nsale period?}
    B -->|Yes · Feb 15–27, 2026| C["RM129 per session"]
    B -->|No| D{Extended date?}
    D -->|Yes| E["RM99 per session"]
    D -->|Standard| F["RM149 per session"]
    C --> G["+ adults × RM10"]
    E --> G
    F --> G
    G --> H{Children under 6?}
    H -->|Yes| I[+ RM0 per child]
    H -->|No| J[+ RM10 per child]
    I --> K([Final total])
    J --> K
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=18`

### Installation

```bash
git clone https://github.com/momentous-foto/momentous-foto.github.io.git
cd momentous-foto.github.io/momentous-studio-raya
npm install
```

### Running locally

```bash
# Development (http://localhost:8080)
npm run dev

# Production build
npm run build

# Run tests
npm run test
```

---

## 🔑 Environment Variables

```env
# Google Sheets integration (slot availability)
VITE_GOOGLE_SHEETS_API_KEY=
VITE_GOOGLE_SHEET_ID=
```

> The app runs without these set — it will fall back gracefully if the Sheets API is unavailable.

---

## ☁️ Deployment

| Service | Purpose |
|---|---|
| GitHub Pages | Static site hosting at sub-path |

```mermaid
graph LR
    GitHub -->|push to main| Build["npm run build\n(Vite static build)"]
    Build --> DIST["/dist directory"]
    DIST --> GHP["GitHub Pages\nhttps://momentous-foto.github.io/momentous-studio-raya/"]
```

Built with base path `/momentous-studio-raya/` in `vite.config.ts` for GitHub Pages sub-path deployment.

---

## 📁 Project Structure

```
momentous-studio-raya/
├── src/
│   ├── components/
│   │   ├── ui/                  ← shadcn/ui components
│   │   ├── BookingSteps.tsx
│   │   ├── BookingSummary.tsx
│   │   ├── CustomerForm.tsx
│   │   ├── DateTimePicker.tsx
│   │   ├── FloatingClouds.tsx
│   │   ├── Footer.tsx
│   │   ├── GallerySection.tsx
│   │   ├── Header.tsx
│   │   ├── PackageCard.tsx
│   │   ├── PackagesPreview.tsx
│   │   └── PaxCounter.tsx
│   ├── data/
│   │   └── packages.ts          ← pricing, available dates, time slots
│   ├── hooks/
│   │   ├── useBooking.ts        ← booking state, validation, slot logic
│   │   └── usePackages.ts       ← package data and dynamic pricing
│   ├── pages/
│   │   ├── Booking.tsx
│   │   ├── Closed.tsx
│   │   ├── Confirmation.tsx
│   │   └── Packages.tsx
│   ├── utils/
│   │   ├── bookingData.ts
│   │   ├── imagePath.ts         ← resolves prod base path for images
│   │   ├── notifications.ts     ← WhatsApp pre-filled message builder
│   │   └── sheets.ts            ← Google Sheets API integration
│   ├── App.tsx
│   └── main.tsx
├── public/                      ← gallery images
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🗺 Roadmap

- [x] Multi-step booking wizard
- [x] Live slot availability via Google Sheets
- [x] Dynamic pricing with clearance sale logic
- [x] Add-ons system (adults + children)
- [x] WhatsApp booking notification
- [x] Google Calendar event generation
- [x] Bento-grid gallery with fullscreen lightbox
- [x] Closed page with sample gallery (season ended)
- [ ] Backend booking management system
- [ ] Email booking confirmations
- [ ] Admin dashboard for slot management

---

## 📄 License

MIT © 2026 Momentous Foto
