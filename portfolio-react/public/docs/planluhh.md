# 🚀 PlanLuhh

> An all-in-one wedding planner built for Malaysian couples: budget, vendors, hantaran, aturcara, guest list, e-jemputan with RSVP, seating and honeymoon, from akad nikah to bertandang.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20FastAPI%20%2B%20PostgreSQL-7c3aed)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [User Flow](#-user-flow)
- [Auth Flow](#-auth--session-flow)
- [Database](#-database-erd)
- [API Structure](#-api-structure)
- [Frontend Components](#-frontend-components)
- [Feature Flows](#-feature-specific-flows)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧭 Overview

PlanLuhh is a private planning dashboard for the whole Malay wedding journey. A typical wedding here is not one event but three: the **akad nikah**, the **majlis sanding** at the bride's side, and the **bertandang** at the groom's side. Each has its own date, venue, colour theme and minute-by-minute aturcara. PlanLuhh models that directly, and adds the things generic planners don't have: a dulang-by-dulang **hantaran tracker**, a **nikah document checklist**, a phase-based checklist pre-filled with local tasks (Kursus Pra-Perkahwinan, ujian HIV, Tok Kadi), and a mobile-first **e-jemputan** that guests open, RSVP to and sign in the guestbook.

The backend is a FastAPI service with SQLAlchemy and Alembic on PostgreSQL. Auth uses JWTs in HttpOnly cookies. Money fields (budget, vendor prices, honeymoon costs, cash gifts) are encrypted at rest with Fernet. The React frontend talks to it through a Vite proxy and generates a full **Journey Book** PDF in the browser.

**Type:** `Solo`
**Brand:** `Luhh Series`
**Built with:** Independent

---

## ✨ Features

- ✅ Email signup in 3 steps (email + name + currency → 6-digit OTP → set password), login, forgot/reset password via OTP
- ✅ JWT access + refresh tokens in HttpOnly, SameSite=Lax cookies
- ✅ **Mission Control** dashboard: countdown ("124 hari lagi"), total pax, total paid ("Total Damage"), RSVP rate, confirmed vendor categories, checklist progress
- ✅ Wedding settings for three majlis: Akad Nikah, Sanding Pihak Perempuan, Sanding Pihak Lelaki (date, time, venue, colour theme), plus parents' names for the e-card
- ✅ **Budget tracker**: 13 categories, estimated vs actual vs paid, budget ceiling and usage bar, PDF + Excel export
- ✅ **Vendor manager**: 13 categories, status pipeline (Prospect → Contacted → Booked → Deposit Paid → Fully Paid → Completed), contract flag, side-by-side compare panel
- ✅ **Moodboard**: colour swatches, image URLs or uploads, across 11 categories including Pelamin and Henna
- ✅ **Documents Hub**: preset nikah document checklist per side (groom / bride / both) with expiry dates and reminders
- ✅ **Schedule** for pre-wedding appointments (merisik, kursus, fitting, photoshoot, raptai)
- ✅ **Rundown / Aturcara**: minute-by-minute script per majlis with PIC
- ✅ **Checklist**: 34 preset Malaysian wedding tasks across 6 phases, one click to seed
- ✅ **Guest list**: side, pax, VIP flag, RSVP status, meal preference, PDF + Excel export
- ✅ **Menu**: dish list by course with quantities, halal / vegetarian flags and confirmation status
- ✅ **Hantaran tracker**: items for both sides by dulang number, status flow (Belum Beli → Dah Beli → Sudah Gubah → Siap), cost totals, and a warning when the dulang count is even (adat says odd)
- ✅ **E-Invitation builder** in 5 steps: pick one of 20 preset designs (Floral / Tradisional) or upload your own 9:16 slides, envelope, card text, settings, share
- ✅ **Public e-jemputan** at `/i/:slug`: envelope opening, love-story timeline, RSVP, guestbook, Waze / Google Maps, contacts, gift list + DuitNow QR, add-to-Google-Calendar, YouTube music
- ✅ **RSVP dashboard** with response filters and guestbook moderation (wishes show by default; toggle to hide, or delete)
- ✅ **Seating**: tables with capacity, assign attending guests, capacity bars
- ✅ **Gift registry + gifts received** (physical, cash, e-wallet), thank-you tracking
- ✅ **Honeymoon planner**: destination, dates, budget, bookings by category with booking refs
- ✅ **Journey Book PDF**: whole-wedding summary rendered client-side with @react-pdf/renderer
- ✅ Fernet encryption at rest for all money fields, soft deletes and an audit log on key writes
- 🚧 Collaborators (partner / admin / viewer): the backend endpoint and table exist, but there is no invite UI and role checks are not enforced per module
- 🚧 Gift "claim" from the public page: the registry shows `claimed / target`, but there is no claim endpoint yet
- 🚧 Silent token refresh: a refresh cookie is issued, but there is no `/auth/refresh` endpoint yet
- 🚧 Rate limiting: SlowAPI is wired into the app, but no route has a limit applied yet
- 🚧 Vendor document upload and vendor reviews: API exists, not surfaced in the UI
- 💡 Link public RSVPs to guest-list entries automatically
- 💡 Responsive dashboard layout (the public invitation is mobile-first; the planner is desktop-first)
- 💡 Reminder emails for due payments and upcoming appointments

---

## 🛠 Tech Stack

```mermaid
graph TD
    subgraph Frontend
        FE["React 18 + Vite 8<br/>React Router v6"]
        UI["Tailwind CSS 3<br/>Framer Motion · Lucide"]
        ST["React Query v3 · Axios<br/>React Hook Form + Zod"]
        PDF["@react-pdf/renderer<br/>Journey Book"]
    end
    subgraph Backend
        BE["FastAPI<br/>Python 3.12 · Uvicorn"]
        ORM["SQLAlchemy 2 + Alembic<br/>Pydantic v2"]
        SEC["PyJWT · bcrypt<br/>Fernet (cryptography)"]
        EXP["ReportLab + openpyxl<br/>PDF / Excel export"]
    end
    subgraph Infrastructure
        DB[("PostgreSQL 16")]
        FS["/uploads<br/>static files"]
        ML["SMTP<br/>FastAPI-Mail"]
        DK["Docker Compose<br/>db · backend · frontend"]
    end
    FE --> BE
    BE --> ORM
    ORM --> DB
    BE --> FS
    BE --> ML
```

| Layer | Technology |
|---|---|
| Frontend | React 18.3, Vite 8 (`@vitejs/plugin-react-oxc`), React Router 6 |
| UI | Tailwind CSS 3, Framer Motion, Lucide React, react-hot-toast |
| Data / Forms | React Query v3, Axios (cookie credentials), React Hook Form + Zod, date-fns |
| PDF (client) | @react-pdf/renderer 4 (Journey Book) |
| Backend | FastAPI 0.115, Uvicorn, Pydantic v2 + pydantic-settings |
| ORM / Migrations | SQLAlchemy 2.0, Alembic (11 migrations) |
| Database | PostgreSQL 16 |
| Auth | PyJWT (HS256) in HttpOnly cookies, bcrypt password hashing, email OTP |
| Encryption | Fernet (`cryptography`) for money fields |
| Exports (server) | ReportLab (PDF), openpyxl (Excel) |
| Email | FastAPI-Mail over SMTP |
| Containers | Docker Compose (postgres, FastAPI, Vite dev server) |

---

## 📌 Architecture

### High-level Architecture

```mermaid
graph TD
    U[Couple / Browser] --> FE[React SPA]
    G[Guest / Phone] --> INV["Public e-jemputan<br/>/i/:slug"]
    INV --> FE
    FE -->|"/api/v1 via Vite proxy<br/>HttpOnly cookie"| API[FastAPI]
    API --> DB[(PostgreSQL)]
    API -->|OTP emails| SMTP[SMTP Server]
    API --> FS["/uploads<br/>moodboard · QR · custom pages · avatars"]
```

### System Architecture

```mermaid
graph TD
    subgraph Frontend
        P[Pages] --> Q[React Query hooks]
        Q --> AX["api.js<br/>Axios, withCredentials"]
        P --> JB[JourneyBook PDF]
    end
    subgraph Backend
        R["17 routers<br/>/api/v1"] --> D["Depends:<br/>get_verified_user · _assert_access"]
        D --> H[Route handlers]
        H --> C["security.py<br/>JWT · bcrypt · Fernet"]
        H --> O[SQLAlchemy models]
        H --> X["utils:<br/>export · email · otp · audit"]
        O --> DB[(PostgreSQL)]
    end
    AX --> R
```

---

## 👤 User Flow

```mermaid
flowchart TD
    A([Start]) --> B{Logged in?}
    B -->|No| C[Login]
    C --> R[Register:<br/>email + name + currency]
    R --> O[Verify 6-digit OTP]
    O --> S[Set password]
    S --> C
    B -->|Yes| D[Mission Control]
    C --> D
    D --> E{Wedding exists?}
    E -->|No| F[Fill Wedding Settings<br/>names · 3 majlis · budget]
    E -->|Yes| G[Plan]
    F --> G
    G --> H[Foundation:<br/>Budget · Moodboard · Vendors · Documents]
    G --> I[Planning:<br/>Schedule · Rundown · Checklist · Guests · Menu · Hantaran]
    G --> J[Execution:<br/>E-Invitation · RSVP · Seating]
    G --> K[Post-Wedding:<br/>Gifts · Honeymoon]
    D --> L[Download Journey Book PDF]
```

### Page Map

```mermaid
graph TD
    subgraph Public ["🌐 Public Routes"]
        AUTH["/login · /register · /verify-otp<br/>/set-password · /forgot-password"]
        INV["/i/:slug<br/>Public e-jemputan"]
    end
    subgraph Protected ["🔐 Protected Routes"]
        DASH["/dashboard<br/>Mission Control"]
        PROF["/dashboard/profile"]
        FOUND["/foundation/*<br/>budget · moodboard<br/>vendors · documents"]
        PLAN["/planning/*<br/>schedule · rundown · tasks<br/>guests · menu · hantaran"]
        EXEC["/execution/*<br/>invitation · rsvp · seating"]
        POST["/post-wedding/*<br/>gifts · honeymoon"]
    end
    AUTH --> DASH
    DASH --> FOUND
    DASH --> PLAN
    DASH --> EXEC
    DASH --> POST
    DASH --> PROF

    style Public fill:#e8f5e9,stroke:#4caf50
    style Protected fill:#e3f2fd,stroke:#2196f3
```

---

## 🔐 Auth & Session Flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as FastAPI
    participant DB as PostgreSQL
    participant ML as SMTP

    Note over U,ML: Registration (3 steps)
    U->>FE: Email, full name, currency
    FE->>API: POST /auth/register
    API->>DB: Create PENDING user + OTP (10 min)
    API->>ML: Send 6-digit code
    U->>FE: Enter OTP
    FE->>API: POST /auth/verify-otp
    API->>DB: Mark OTP used
    U->>FE: Password + confirm
    FE->>API: POST /auth/set-password
    API->>DB: bcrypt hash, status VERIFIED
    API-->>FE: Redirect to login

    Note over U,DB: Login
    U->>FE: Email + password
    FE->>API: POST /auth/login
    API->>DB: Verify bcrypt hash + is_verified
    API-->>FE: Set-Cookie access_token + refresh_token (HttpOnly)
    FE->>API: GET /users/me
    API-->>FE: Profile, then /dashboard
```

### Token Lifecycle

```mermaid
sequenceDiagram
    participant FE as Frontend (Axios)
    participant API as FastAPI

    FE->>API: Request with access_token cookie
    API->>API: Decode JWT, check type = access
    alt valid
        API-->>FE: 200 OK
    else expired or missing
        API-->>FE: 401
        FE->>FE: Interceptor redirects to /login
    end
    Note over FE,API: refresh_token cookie (7 days) is issued,<br/>refresh endpoint is on the roadmap
```

---

## 🗄️ Database (ERD)

### Core ERD

```mermaid
erDiagram
    USERS {
        uuid id PK
        string email
        string password_hash
        string full_name
        enum account_status
        bool is_verified
        string preferred_currency
    }
    OTP_VERIFICATIONS {
        uuid id PK
        uuid user_id FK
        string code
        timestamp expires_at
        bool is_used
    }
    WEDDINGS {
        uuid id PK
        string groom_name
        string bride_name
        date wedding_date
        string venue_name
        enum theme
        decimal budget_total
        date tarikh_nikah
        date tarikh_sanding_perempuan
        date tarikh_sanding_lelaki
    }
    WEDDING_COLLABORATORS {
        uuid id PK
        uuid wedding_id FK
        uuid user_id FK
        enum role
    }
    AUDIT_LOGS {
        uuid id PK
        uuid user_id FK
        uuid wedding_id FK
        string action
        string entity_type
    }
    USERS ||--o{ OTP_VERIFICATIONS : receives
    USERS ||--o{ WEDDING_COLLABORATORS : joins
    WEDDINGS ||--o{ WEDDING_COLLABORATORS : has
    USERS ||--o{ AUDIT_LOGS : writes
    WEDDINGS ||--o{ AUDIT_LOGS : tracks
```

### Planning ERD

```mermaid
erDiagram
    WEDDINGS ||--o{ BUDGET_ITEMS : has
    WEDDINGS ||--o{ VENDORS : has
    VENDORS ||--o{ VENDOR_REVIEWS : has
    WEDDINGS ||--o{ GUESTS : invites
    WEDDINGS ||--o{ SEATING_TABLES : has
    SEATING_TABLES ||--o{ GUESTS : seats
    WEDDINGS ||--o{ HANTARAN_ITEMS : has
    WEDDINGS ||--o{ RUNDOWN_ENTRIES : has

    BUDGET_ITEMS {
        uuid id PK
        enum category
        string item_name
        text paid_amount_encrypted
    }
    VENDORS {
        uuid id PK
        string name
        enum vendor_status
        text price_encrypted
    }
    GUESTS {
        uuid id PK
        string name
        enum side
        int pax_count
        enum rsvp_status
        uuid table_id FK
    }
    SEATING_TABLES {
        uuid id PK
        int table_number
        int capacity
    }
    HANTARAN_ITEMS {
        uuid id PK
        enum side
        int dulang_number
        enum item_status
    }
    RUNDOWN_ENTRIES {
        uuid id PK
        enum majlis
        string activity
        time start_time
    }
```

### Invitation & Post-Wedding ERD

```mermaid
erDiagram
    WEDDINGS ||--|| INVITATIONS : has
    INVITATIONS ||--o{ RSVP_RESPONSES : collects
    INVITATIONS ||--o{ GUESTBOOK_ENTRIES : collects
    INVITATIONS ||--o{ INVITATION_CUSTOM_PAGES : has
    INVITATIONS ||--o{ LOVE_STORIES : has
    WEDDINGS ||--o{ GIFT_REGISTRY_ITEMS : lists
    GIFT_REGISTRY_ITEMS ||--o{ GIFTS_RECEIVED : fulfils
    WEDDINGS ||--|| HONEYMOONS : plans
    HONEYMOONS ||--o{ HONEYMOON_ITEMS : has

    INVITATIONS {
        uuid id PK
        uuid slug
        bool is_published
        int design_id
        bool use_custom_design
    }
    RSVP_RESPONSES {
        uuid id PK
        string guest_name
        string response
        int pax_count
    }
    GUESTBOOK_ENTRIES {
        uuid id PK
        string guest_name
        bool is_approved
    }
    GIFTS_RECEIVED {
        uuid id PK
        string donor_name
        string gift_type
        text amount_encrypted
    }
    HONEYMOON_ITEMS {
        uuid id PK
        enum category
        bool is_booked
        text cost_encrypted
    }
```

### Database Schema Overview

| Table | Purpose | Key Relations |
|---|---|---|
| `users` | Account, profile, preferred currency | — |
| `otp_verifications` | 6-digit email codes (signup + reset) | → `users` |
| `weddings` | Couple names, parents, 3 majlis dates/venues, budget ceiling | — |
| `wedding_collaborators` | User ↔ wedding with role (GROOM / BRIDE / ADMIN / VIEWER) | → `weddings`, `users` |
| `budget_items` | Encrypted estimated / actual / paid per category | → `weddings` |
| `vendors` | Vendor pipeline, encrypted price / deposit / balance | → `weddings` |
| `vendor_documents`, `vendor_reviews` | Contracts / invoices, ratings | → `vendors` |
| `guests` | Guest list, pax, RSVP, VIP, table | → `weddings`, `seating_tables` |
| `seating_tables` | Table number, name, capacity | → `weddings` |
| `tasks` | Phase-based checklist | → `weddings` |
| `document_checklist_items` | Nikah documents per side, expiry + reminder | → `weddings` |
| `event_schedules` | Pre-wedding appointments | → `weddings` |
| `rundown_entries` | Aturcara per majlis | → `weddings` |
| `hantaran_items` | Dulang items per side + status | → `weddings` |
| `menu_items` | Dishes, quantity, halal / veg flags | → `weddings` |
| `moodboards` | Inspiration images and colour swatches | → `weddings` |
| `invitations` | E-card config, slug, publish flag, design / envelope / card JSON | → `weddings` |
| `love_stories`, `contact_persons`, `gallery_photos` | Invitation sections | → `invitations` |
| `invitation_custom_pages` | Uploaded 9:16 slides (max 20) | → `invitations` |
| `rsvp_responses`, `guestbook_entries` | Public guest submissions | → `invitations` |
| `gift_registry_items`, `gifts_received` | Wishlist and received gifts (encrypted amount) | → `weddings` |
| `honeymoons`, `honeymoon_items` | Trip plan, encrypted budget and costs | → `weddings` |
| `audit_logs` | CREATE / UPDATE / DELETE trail | → `users`, `weddings` |

---

## 🔌 API Structure

All routes live under `/api/v1`. Almost everything is scoped to a wedding (`/weddings/{id}/...`) and checked against `wedding_collaborators`.

### API Overview

```mermaid
mindmap
  root((/api/v1))
    auth
      register
      verify-otp
      set-password
      login · logout
      resend-otp
      forgot · reset-password
    users
      GET PATCH /me
      change-password
      avatar
    weddings
      CRUD
      stats
      collaborators
    planning
      budget + export pdf/excel
      vendors + documents + review
      guests + export pdf/excel
      tasks + seed
      documents + seed
      schedule · rundown
      menu · hantaran · moodboard
      seating-tables · assign-table
    invitation
      config · publish
      love-story · contacts · gallery
      upload-qr · custom-pages
      rsvp · guestbook moderation
    post-wedding
      gifts registry
      gifts received
      honeymoon + items
    public
      GET /i/:slug
      POST /i/:slug/rsvp
      GET POST /i/:slug/guestbook
      GET /i/:slug/gifts
```

| Group | Endpoints |
|---|---|
| Auth | `POST /auth/register`, `/verify-otp`, `/set-password`, `/login`, `/logout`, `/resend-otp`, `/forgot-password`, `/reset-password` |
| Users | `GET/PATCH /users/me`, `POST /users/me/change-password`, `POST /users/me/avatar` |
| Weddings | `GET/POST /weddings`, `GET/PATCH/DELETE /weddings/{id}`, `GET /weddings/{id}/stats`, `POST /weddings/{id}/collaborators` |
| Module CRUD | `/weddings/{id}/budget`, `/vendors`, `/guests`, `/tasks`, `/documents`, `/schedule`, `/rundown`, `/menu`, `/hantaran`, `/moodboard`, `/seating-tables` |
| Exports | `GET /weddings/{id}/budget/export/{pdf,excel}`, `GET /weddings/{id}/guests/export/{pdf,excel}` |
| Invitation (owner) | `/weddings/{id}/invitation` (+ `/publish`, `/love-story`, `/contacts`, `/gallery`, `/upload-qr`, `/custom-pages`, `/rsvp`, `/guestbook`) |
| Post-wedding | `/weddings/{id}/gifts/registry`, `/gifts/received`, `PUT /honeymoon`, `/honeymoon/items` |
| Public | `GET /i/{slug}`, `POST /i/{slug}/rsvp`, `GET/POST /i/{slug}/guestbook`, `GET /i/{slug}/gifts` |

### Request/Response Flow

```mermaid
sequenceDiagram
    participant FE as Frontend
    participant API as FastAPI router
    participant DEP as Dependencies
    participant SEC as security.py
    participant DB as PostgreSQL

    FE->>API: PATCH /weddings/{id}/budget/{item} + cookie
    API->>DEP: get_verified_user()
    DEP->>DEP: Decode JWT, load VERIFIED user
    API->>DEP: _assert_access(wedding_id)
    DEP->>DB: Find active collaborator row
    API->>SEC: encrypt_data(amounts)
    API->>DB: UPDATE budget_items + audit_logs
    DB-->>API: Row
    API->>SEC: decrypt_data(amounts)
    API-->>FE: JSON (plaintext amounts)
```

---

## 🧩 Frontend Components

### Component Tree

```mermaid
graph TD
    App["App.jsx<br/>Routes"] --> AP["AuthProvider<br/>GET /users/me"]
    AP --> AuthPages["Auth pages<br/>Login · Register · VerifyOTP<br/>SetPassword · ForgotPassword"]
    AP --> Pub["InvitationPublicPage<br/>/i/:slug"]
    AP --> PR[ProtectedRoute]
    PR --> L["DashboardLayout<br/>collapsible sidebar"]
    L --> MC["MissionControlPage<br/>stats · settings · Journey Book"]
    L --> F["Budget · Moodboard<br/>Vendors · DocumentsHub"]
    L --> PL["Schedule · Rundown · Tasks<br/>Guests · Menu · Hantaran"]
    L --> EX["InvitationBuilder<br/>RSVPDashboard · Seating"]
    L --> PW["GiftRegistry · Honeymoon"]
    L --> PF[ProfilePage]
    MC -.lazy import.-> JB["JourneyBook<br/>@react-pdf/renderer"]
    Pub --> DR["Drawers:<br/>RSVP · Ucapan · Lokasi<br/>Hubungi · Hadiah · Kalendar · Muzik"]
```

### Key Components

| Component | Purpose |
|---|---|
| `AuthContext` | Loads the current user from `/users/me`, exposes `login` / `logout` |
| `ProtectedRoute` | Spinner while loading, redirect to `/login` if no user |
| `DashboardLayout` | Sidebar grouped into Foundation / Planning / Execution / Post-Wedding, collapsible |
| `MissionControlPage` | Countdown, stat cards, progress bars, wedding settings form, Journey Book button |
| `InvitationBuilderPage` | 5-step builder (design, envelope, card text, settings, share) with custom slide upload and DuitNow QR upload |
| `InvitationPublicPage` | Envelope intro, story timeline, custom slide viewer, floating action bar with drawers |
| `JourneyBook` | Multi-section PDF: overview, budget, vendors, guests, checklist, rundown, hantaran, menu |
| `api.js` | Axios instance on `/api/v1` with cookies and a 401 → `/login` interceptor |

---

## ⚙️ Feature-specific Flows

### E-Invitation Publish & RSVP Flow

```mermaid
sequenceDiagram
    participant O as Couple
    participant FE as Builder
    participant API as FastAPI
    participant G as Guest (phone)

    O->>FE: Pick design, envelope, card text
    FE->>API: POST/PATCH /weddings/{id}/invitation
    O->>FE: Publish
    FE->>API: POST /weddings/{id}/invitation/publish
    API-->>FE: is_published + slug (UUID)
    O->>G: Share /i/{slug} link
    G->>API: GET /i/{slug}
    API-->>G: Invitation, wedding, story, contacts, gallery
    G->>API: POST /i/{slug}/rsvp
    API->>API: Check RSVP open + rsvp_max_pax
    API-->>G: 201 Created
    G->>API: POST /i/{slug}/guestbook
    O->>FE: RSVP Dashboard
    FE->>API: GET /invitation/rsvp + /invitation/guestbook
    O->>API: PATCH guestbook/{id}/approve (toggle)
```

### Custom Design Upload Flow

```mermaid
flowchart TD
    A["Builder: Upload Sendiri"] --> B[Pick image files]
    B --> C{"Client check:<br/>ratio 0.505 to 0.620<br/>(9:16 portrait)"}
    C -->|Fail| D[Toast error per file]
    C -->|Pass| E["POST /invitation/custom-pages<br/>multipart, max 20 pages"]
    E --> F["Saved under /uploads<br/>use_custom_design = true"]
    F --> G[Guest opens /i/slug]
    G --> H["Full-screen slide viewer<br/>tap left / right · dot nav"]
```

### Hantaran Tracker

```mermaid
flowchart LR
    A[Add item:<br/>side · category · dulang no.] --> B[Belum Beli]
    B --> C[Dah Beli]
    C --> D[Sudah Gubah]
    D --> E[Siap ✓]
    A --> F{Dulang count<br/>per side}
    F -->|Even| W["⚠️ Warn:<br/>adat prefers odd numbers"]
    F -->|Odd| OK[OK]
```

### Budget & Encryption

```mermaid
flowchart TD
    IN["Amount from form<br/>(plain string)"] --> ENC["encrypt_data()<br/>Fernet"]
    ENC --> DB[("*_encrypted<br/>Text columns")]
    DB --> DEC["decrypt_data()"]
    DEC --> OUT[JSON response]
    DB --> ST["/weddings/{id}/stats<br/>sums decrypted paid_amount"]
    DB --> EX["Export PDF / Excel<br/>ReportLab · openpyxl"]
```

### Role & Permission Matrix

What the backend enforces today:

| Action | ADMIN / GROOM / BRIDE | VIEWER |
|---|---|---|
| View and edit wedding modules | ✅ | ✅ *(any active collaborator passes `_assert_access`)* |
| Delete wedding | ✅ | ❌ |
| Add / change collaborators | ✅ | ❌ |
| Publish e-invitation | ✅ | ✅ *(not role-checked yet)* |

> The wedding creator becomes ADMIN. Finer-grained roles per module are on the roadmap.

---

## 📁 Project Structure

```
PlanLuhh/
├── docker-compose.yml          db (postgres:16) · backend · frontend
├── DOCS.md                     Long-form product notes
│
├── backend/
│   ├── Dockerfile              python:3.12-slim
│   ├── alembic/versions/       11 migrations
│   └── app/
│       ├── main.py             FastAPI app, CORS, /uploads, router registration
│       ├── core/               config · database · deps (auth, access) · security (JWT, bcrypt, Fernet)
│       ├── models/             20 model files (29 tables)
│       ├── schemas/            Pydantic request / response models
│       ├── routers/            auth, users, wedding, budget, vendors, guests, tasks,
│       │                       documents, schedule, rundown, menu, hantaran, moodboard,
│       │                       seating, invitation, gift, honeymoon
│       └── utils/              email · otp · export (PDF / Excel) · audit
│
└── frontend/
    ├── Dockerfile              node:23-alpine, Vite dev server
    ├── vite.config.js          /api proxy → backend
    └── src/
        ├── App.jsx             Route table
        ├── context/            AuthContext
        ├── components/         dashboard/DashboardLayout · pdf/JourneyBook · shared/ProtectedRoute
        ├── pages/auth/         Login, Register, VerifyOTP, SetPassword, ForgotPassword
        ├── pages/dashboard/    One page per module + Profile
        ├── pages/invitation/   InvitationPublicPage
        ├── data/               invitationDesigns.js (20 preset designs)
        ├── assets/img/         Floral + Tradisional card backgrounds
        └── utils/api.js        Axios instance
```

---

## 🗺 Roadmap

- [x] Email OTP signup + JWT in HttpOnly cookies
- [x] Mission Control dashboard + wedding settings for 3 majlis
- [x] Budget tracker with PDF / Excel export
- [x] Vendor pipeline + compare panel
- [x] Moodboard, Documents Hub, Schedule, Rundown, Checklist
- [x] Guest list with PDF / Excel export, Menu, Hantaran tracker
- [x] E-invitation builder (20 presets + custom slides) and public page
- [x] RSVP dashboard + guestbook moderation
- [x] Seating, Gift registry, Honeymoon planner
- [x] Journey Book PDF (client-side)
- [x] Fernet encryption for money fields + audit log
- [ ] Token refresh endpoint + silent refresh
- [ ] Apply SlowAPI limits to auth and public routes
- [ ] Collaborator invite UI + per-module role checks
- [ ] Public gift claim endpoint
- [ ] Auto-match public RSVPs to the guest list
- [ ] Vendor documents + reviews in the UI
- [ ] Responsive planner layout for phones
- [ ] Payment / appointment reminder emails

---

## 📄 License

MIT © 2025 Siti Nursyaqirah · Source on [GitHub](https://github.com/snsyaqirah/PlanLuhh)
