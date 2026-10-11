# 🚀 TravelLuhh

> A full-stack trip planner and group budget tracker — plan trips, log expenses, split the bill with your travel geng, and keep itineraries and packing lists in one place.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Stack](https://img.shields.io/badge/stack-React%20%2B%20Spring%20Boot%20%2B%20PostgreSQL-0f4c45)

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

TravelLuhh is a travel management web app that keeps the whole trip in one place: the budget, every ringgit (or yen) spent, a day-by-day itinerary, a packing checklist, and a "who owes whom" summary at the end. It works for solo trips and for group trips where several people pay for things and need to settle up afterwards.

The backend is a stateless Spring Boot REST API secured with JWT (plus Google OAuth2). PostgreSQL triggers keep each trip's spent amount in sync with its expenses. The React frontend draws analytics charts from the expense data and pulls live exchange rates from the free Frankfurter API.

**Type:** `Solo`
**Brand:** `Luhh Series`
**Built with:** Independent

---

## ✨ Features

- ✅ Email signup in 3 steps (email → 6-digit OTP → name + password) and Google OAuth2 login
- ✅ Forgot-password flow with an emailed OTP
- ✅ JWT auth (24h access / 7d refresh) with an Axios interceptor that queues requests and refreshes silently
- ✅ First-login onboarding modal to pick home country and currency
- ✅ Trip CRUD with status (Planned / Ongoing / Completed), archive flag and filter tabs
- ✅ Expense tracking across 6 categories, plus **bundle** expenses with sub-item breakdown (e.g. a JR Pass package)
- ✅ DB-trigger-maintained `spent_amount` and a generated `remaining_budget` column
- ✅ Budget modes: solo / shared / separated
- ✅ Budget alerts at 75% / 90% / 100% of total budget, plus per-category warnings
- ✅ Analytics bento: top category, daily target, radial budget gauge, category donut, spending trend, top-spend bars
- ✅ Settle Up: equal-share balances with greedy debt simplification (fewest transfers)
- ✅ Day-by-day itinerary planner (time slots, location, category per item)
- ✅ Packing checklist with progress bar and preset packs (general, beach, hiking, business, Umrah/Hajj)
- ✅ Per-trip activity feed (expense added / removed, member joined)
- ✅ Export: expenses CSV, full trip CSV, printable PDF report
- ✅ Live FX: dashboard currency cards (favourite rates, quick convert, all rates) and a per-trip price converter (Frankfurter API)
- ✅ Profile page: name, country, currency, change password
- ✅ Destination notes and quick info per trip *(saved in localStorage)*
- 🚧 Trip member invite / remove / role change *(dialog UI exists, but the backend has no member endpoints yet)*
- 🚧 Separated-budget per-member allocation *(table, trigger and panel scaffolded, not wired)*
- 🚧 Edit expense *(form opens, but there is no update endpoint yet)*
- 🚧 Travel Portfolio: Year in Review, Timeline and Travel Map *(components built, page not routed yet)*
- 💡 Membership checks on every trip sub-resource *(today they cover trip view/update/delete and expense delete)*
- 💡 Notes persistence to the database (`destination_notes` table already exists)
- 💡 Storing expenses in their original currency and converting to the trip currency
- 💡 Refresh-token revocation on logout (`refresh_tokens` table already exists)
- 💡 Real-time collaboration via WebSocket/SSE
- 💡 Trip cover image upload

---

## 🛠 Tech Stack

```mermaid
graph TD
    subgraph Frontend
        FE["React 18 + TypeScript<br/>Vite 7"]
        UI["shadcn/ui + Tailwind CSS<br/>Framer Motion · Recharts"]
        ST["TanStack React Query<br/>Axios · React Hook Form + Zod"]
    end
    subgraph Backend
        BE["Spring Boot 3.2<br/>Java 17 · Maven"]
        AU["Spring Security<br/>JWT (JJWT 0.12) + Google OAuth2"]
        JPA["Spring Data JPA<br/>Hibernate"]
    end
    subgraph Infrastructure
        DB[("PostgreSQL<br/>triggers + generated columns")]
        HO["Docker<br/>multi-stage build"]
        SMTP["SMTP<br/>JavaMailSender, async"]
        FX["Frankfurter API<br/>live FX rates"]
    end
    FE --> BE
    BE --> JPA
    JPA --> DB
    BE --> SMTP
    FE --> FX
```

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite 7 |
| Routing | React Router v6 |
| Server State | TanStack React Query |
| Forms | React Hook Form + Zod |
| UI | Tailwind CSS + shadcn/ui (Radix UI) · Framer Motion · Recharts · Lucide |
| HTTP Client | Axios (request queue + auto token refresh) |
| Backend | Spring Boot 3.2.1 · Java 17 · Maven |
| Security | Spring Security + JWT (JJWT 0.12.3) + Google OAuth2 client |
| ORM | Spring Data JPA + Hibernate |
| Database | PostgreSQL (hosted on Neon in the owner's setup) |
| Email | Spring Mail (`JavaMailSender`, `@Async`) |
| Containerisation | Docker (multi-stage Maven → JRE Alpine) + Docker Compose |
| Currency | Frankfurter API v2 (free, no key) |
| Testing | Vitest + Testing Library (frontend scaffold) |

---

## 📌 Architecture

### High-level Architecture

```mermaid
graph TD
    U[User / Browser] --> FE[React SPA]
    FE -->|REST + Bearer JWT| BE[Spring Boot API]
    BE --> DB[(PostgreSQL)]
    BE -->|OTP emails| SMTP[SMTP Server]
    FE -->|OAuth2 redirect| BE
    BE <-->|OAuth2 code exchange| GAUTH[Google OAuth2]
    FE -->|live rates| FX[Frankfurter API]
```

### System Architecture

```mermaid
graph TD
    subgraph Frontend
        P[Pages] --> C[Feature Components]
        C --> H[Hooks: useTrips · useExpenses]
        H --> SV[Services]
        SV --> AX[Axios instance + interceptors]
    end
    subgraph Backend
        F[JwtAuthenticationFilter] --> R[REST Controllers]
        R --> E[Services]
        E --> S[JPA Repositories]
        S --> DB[(PostgreSQL)]
        E --> ACT[ActivityService @Async]
        E --> ML[EmailService @Async]
    end
    AX --> F
```

---

## 👤 User Flow

```mermaid
flowchart TD
    A([Start]) --> B[Landing Page]
    B --> C{Logged in?}
    C -->|No| D[Login / Register / Google]
    C -->|Yes| E[Dashboard]
    D --> OB{Onboarded?}
    OB -->|No| OM[Onboarding modal:<br/>country + currency]
    OB -->|Yes| E
    OM --> E
    E --> F[My Trips]
    F --> G[Trip Detail]
    G --> H[Expenses · Itinerary · Packing<br/>Charts · Activity · Settle Up · Notes]
    E --> J[Profile]
```

### Page Map

```mermaid
graph TD
    subgraph Public ["🌐 Public Routes"]
        ROOT["/<br/>Landing"]
        AUTH["/login · /register<br/>/forgot-password"]
        OAUTH["/auth/callback"]
    end
    subgraph Protected ["🔐 Protected Routes"]
        DASH["/dashboard"]
        TRIPS["/trips"]
        TD["/trips/:tripId"]
        PROF["/profile"]
    end
    ROOT --> AUTH
    AUTH --> DASH
    OAUTH --> DASH
    DASH --> TRIPS
    DASH --> PROF
    TRIPS --> TD

    style Public fill:#e8f5e9,stroke:#4caf50
    style Protected fill:#e3f2fd,stroke:#2196f3
```

---

## 🔐 Auth & Session Flow

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as Spring Boot API
    participant DB as PostgreSQL
    participant ML as SMTP

    Note over U,ML: Email signup (3 steps)
    U->>FE: Enter email
    FE->>API: POST /api/auth/initiate-signup
    API->>DB: Check email not taken, store OTP
    API-->>ML: Send 6-digit OTP (async)
    API-->>FE: 200 OK
    U->>FE: Enter OTP
    FE->>API: POST /api/auth/verify-email
    API->>DB: Validate OTP, mark used
    API-->>FE: Short-lived verificationToken (JWT)
    U->>FE: Enter name + password
    FE->>API: POST /api/auth/complete-signup
    API->>DB: Create user (BCrypt hash)
    API-->>FE: accessToken + refreshToken + user

    Note over U,API: Email login
    U->>FE: Email + password
    FE->>API: POST /api/auth/login
    API->>DB: Validate credentials
    API-->>FE: accessToken (24h) + refreshToken (7d)
    FE->>FE: Store in localStorage

    Note over U,API: Google OAuth2
    U->>FE: Click "Continue with Google"
    FE->>API: GET /oauth2/authorization/google
    API-->>U: Redirect to Google consent
    U->>API: Callback with auth code
    API->>DB: Create or link user
    API-->>FE: Redirect /auth/callback?token&refresh&newUser
    FE-->>U: Onboarding or Dashboard
```

### Token Lifecycle

```mermaid
sequenceDiagram
    participant FE as Frontend (Axios interceptor)
    participant API as Spring Boot API

    FE->>API: Request + Bearer accessToken
    API-->>FE: 401 Unauthorized
    FE->>FE: Queue other in-flight requests
    FE->>API: POST /api/auth/refresh (Bearer refreshToken)
    API-->>FE: New accessToken
    FE->>API: Replay original + queued requests
    API-->>FE: 200 OK
    Note over FE: If refresh fails, clear session and go to /login
```

---

## 🗄️ Database (ERD)

### Core ERD

```mermaid
erDiagram
    users {
        bigserial user_id PK
        varchar name
        varchar email UK
        varchar password_hash
        varchar auth_provider
        varchar google_id UK
        boolean email_verified
        varchar country
        varchar currency
        boolean onboarding_completed
        timestamp created_at
    }
    trips {
        bigserial trip_id PK
        bigint owner_id FK
        varchar name
        varchar destination_country
        date start_date
        date end_date
        varchar budget_type
        numeric total_budget
        numeric spent_amount
        numeric remaining_budget
        varchar currency
        varchar status
        boolean is_archived
        timestamp created_at
    }
    trip_members {
        bigserial member_id PK
        bigint trip_id FK
        bigint user_id FK
        varchar role
        timestamp joined_at
    }
    expenses {
        bigserial expense_id PK
        bigint trip_id FK
        bigint added_by FK
        varchar category
        numeric amount
        varchar currency
        date date
        text description
        timestamp created_at
    }
    users ||--o{ trips : "owns"
    users ||--o{ trip_members : "member of"
    trips ||--o{ trip_members : "has"
    trips ||--o{ expenses : "has"
    users ||--o{ expenses : "paid"
```

### Feature ERD

```mermaid
erDiagram
    expenses ||--o{ expense_sub_items : "broken into"
    trips ||--o{ packing_items : "has"
    trips ||--o{ itinerary_items : "has"
    trips ||--o{ trip_activities : "logs"
    trips ||--o{ trip_member_budgets : "allocates"
    trips ||--o{ destination_notes : "has"

    expense_sub_items {
        bigserial sub_item_id PK
        bigint expense_id FK
        varchar description
        numeric amount
        varchar category
    }
    packing_items {
        bigserial item_id PK
        bigint trip_id FK
        bigint added_by FK
        varchar label
        varchar category
        boolean is_checked
    }
    itinerary_items {
        bigserial item_id PK
        bigint trip_id FK
        date item_date
        time start_time
        time end_time
        varchar title
        varchar location
        varchar category
        integer sort_order
    }
    trip_activities {
        bigserial activity_id PK
        bigint trip_id FK
        bigint user_id FK
        varchar actor_name
        varchar action_type
        text description
        timestamp created_at
    }
    trip_member_budgets {
        bigserial budget_id PK
        bigint trip_id FK
        bigint user_id FK
        numeric allocated_budget
        numeric spent_amount
        numeric remaining_budget
    }
    destination_notes {
        bigserial note_id PK
        bigint trip_id FK
        varchar note_type
        varchar info_key
        text content
    }
```

### Database Schema Overview

| Table | Purpose | Key Relations |
|---|---|---|
| `users` | Accounts: local (BCrypt) + Google OAuth | — |
| `email_verification_codes` | OTPs for signup and password reset | — |
| `refresh_tokens` | Reserved for refresh-token revocation *(not used yet)* | belongs to `users` |
| `trips` | Trips with budget, status and archive flag | belongs to `users` |
| `trip_members` | Links users to trips with `owner` / `editor` / `viewer` role | belongs to `users`, `trips` |
| `trip_member_budgets` | Per-member allocation for separated budgets | belongs to `trips`, `users` |
| `expenses` | Expenses per trip, paid by a member | belongs to `trips`, `users` |
| `expense_sub_items` | Breakdown lines for bundle expenses | belongs to `expenses` |
| `packing_items` | Packing checklist items | belongs to `trips` |
| `itinerary_items` | Day-by-day planned activities | belongs to `trips` |
| `trip_activities` | Activity feed entries | belongs to `trips`, `users` |
| `destination_notes` | Reserved for DB-backed notes *(frontend uses localStorage today)* | belongs to `trips` |
| `budget_alerts` | Reserved for persisted alert dismissals | belongs to `users`, `trips` |

> **DB triggers:** `trg_update_trip_spent` recalculates `trips.spent_amount` after any insert/update/delete on `expenses`. `trg_update_member_budget_spent` does the same per member for separated trips. `remaining_budget` is a generated column (`total_budget − spent_amount`), and every table has an `updated_at` trigger.

---

## 🔌 API Structure

### API Overview

```mermaid
mindmap
  root((/api))
    auth
      POST initiate-signup
      POST verify-email
      POST complete-signup
      POST login
      POST forgot-password
      POST reset-password
      POST refresh
      GET health
    trips
      GET list
      POST create
      GET by id
      PUT update
      DELETE remove
    expenses
      POST create
      GET by trip
      DELETE remove
    trip sub-resources
      itinerary CRUD
      packing CRUD
      packing toggle
      packing preset
      activity feed
      settlement
    users
      GET me
      PUT profile
      PUT change-password
```

| Group | Endpoints |
|---|---|
| Auth | `POST /api/auth/{initiate-signup, verify-email, complete-signup, login, forgot-password, reset-password, refresh}` · `GET /api/auth/health` |
| Trips | `GET/POST /api/trips` · `GET/PUT/DELETE /api/trips/{tripId}` |
| Expenses | `POST /api/expenses` · `GET /api/expenses/trip/{tripId}` · `DELETE /api/expenses/{expenseId}` |
| Itinerary | `GET/POST /api/trips/{tripId}/itinerary` · `PUT/DELETE /api/trips/{tripId}/itinerary/{itemId}` |
| Packing | `GET/POST /api/trips/{tripId}/packing` · `PATCH .../{itemId}/toggle` · `DELETE .../{itemId}` · `POST .../preset?type=` |
| Activity | `GET /api/trips/{tripId}/activity` |
| Settlement | `GET /api/trips/{tripId}/settlement` |
| Users | `GET /api/users/me` · `PUT /api/users/profile` · `PUT /api/users/change-password` |
| OAuth2 | `GET /oauth2/authorization/google` → `/login/oauth2/code/google` |

### Request/Response Flow

```mermaid
sequenceDiagram
    participant FE as Frontend
    participant SF as JwtAuthenticationFilter
    participant API as Controller → Service
    participant DB as PostgreSQL

    FE->>SF: Request + Bearer accessToken
    SF->>SF: Validate JWT, load user by email
    SF->>API: SecurityContext populated
    API->>DB: Query / mutate via JPA
    DB-->>API: Rows (triggers update totals)
    API-->>FE: JSON DTO
```

---

## 🧩 Frontend Components

### Component Tree

```mermaid
graph TD
    App["App.tsx<br/>QueryClient · AuthProvider · Router"]
    App --> PR["ProtectedRoute<br/>+ OnboardingModal"]
    PR --> LAYOUT["Layout<br/>Navbar + Outlet"]
    LAYOUT --> DASH["Dashboard"]
    LAYOUT --> TRIPS["Trips"]
    LAYOUT --> TD["TripDetail"]
    LAYOUT --> PROF["Profile"]

    DASH --> CC["CurrencyCards"]
    TRIPS --> TF["TripFilters"]
    TRIPS --> TC["TripCard + TripForm"]

    TD --> BUD["BudgetAlerts"]
    TD --> SHARE["TripSharing"]
    TD --> EXPORT["ExportMenu"]
    TD --> TCC["TripCurrencyCard"]
    TD --> TABS["Tabs"]

    TABS --> EXP["ExpenseListWithTotal<br/>+ ExpenseForm"]
    TABS --> ITIN["TripItinerary"]
    TABS --> PACK["PackingList"]
    TABS --> CHART["BentoCharts"]
    TABS --> ACT["ActivityFeed"]
    TABS --> SETTLE["SettlementSummary"]
    TABS --> NOTES["EditableDestinationNotes"]
```

### Key Components

| Component | Purpose |
|---|---|
| `AuthContext` | Global auth state: user, login/logout, Google login, onboarding, profile updates |
| `ProtectedRoute` | Redirects guests to login, shows `OnboardingModal` for new users |
| `lib/axios.ts` | Axios instance with bearer token, 401 refresh and request queue |
| `CurrencyCards` | Dashboard FX widgets: favourite rates, quick convert, all rates |
| `TripForm` | Create/edit trip with country picker, dates, budget type and currency |
| `ExpenseForm` | Add expense, with optional bundle sub-items |
| `ExpenseListWithTotal` | Expense table with expandable bundle rows and running total |
| `BentoCharts` | Analytics bento: KPI tiles, radial gauge, donut, trend, top-spend bars |
| `BudgetAlerts` | 75 / 90 / 100% threshold and category warnings, dismissible |
| `SettlementSummary` | Who paid what + simplified "X → Y" transfers |
| `TripItinerary` | Day-by-day planner generated from the trip's date range |
| `PackingList` | Grouped checklist with progress bar and preset loader |
| `ExportMenu` | Expenses CSV, trip CSV, printable PDF report |
| `TripSharing` | Share link + collaborator list *(invite not wired to backend)* |

---

## ⚙️ Feature-specific Flows

### Trip CRUD Flow

```mermaid
flowchart TD
    A([User creates trip]) --> B[POST /api/trips]
    B --> C[Insert trip<br/>Insert creator as owner in trip_members]
    C --> D([TripResponse])

    E([User views trips]) --> F[GET /api/trips]
    F --> G[Trips where user is owner OR member<br/>and not archived]
    G --> H([Trips with members + totalExpenses])

    I([User deletes trip]) --> J[DELETE /api/trips/:id]
    J --> K{Is owner?}
    K -->|No| L[Access denied]
    K -->|Yes| M[Delete, cascades to child tables]
    M --> N([204 No Content])
```

### Expense Flow

```mermaid
flowchart TD
    A([User adds expense]) --> B[POST /api/expenses]
    B --> C[Insert expense, added_by = current user]
    C --> D{Has sub-items?}
    D -->|Yes| E[Insert expense_sub_items]
    D -->|No| F[DB trigger fires]
    E --> F
    F --> G[trips.spent_amount recalculated]
    G --> H[ActivityService logs entry async]
    H --> I([ExpenseResponse + subItems])

    J([User deletes expense]) --> K[DELETE /api/expenses/:id]
    K --> L{Payer or trip owner?}
    L -->|No| M[Access denied]
    L -->|Yes| N[Delete + cascade sub-items]
    N --> O[Trigger recalculates spent_amount]
    O --> P([204 No Content])
```

### Settle Up Algorithm

```mermaid
flowchart TD
    A([GET /trips/:id/settlement]) --> B[Load members + expenses]
    B --> C[total = sum of expenses<br/>share = total / member count]
    C --> D[For each member:<br/>net = paid − share]
    D --> E[Debtors: net below 0<br/>Creditors: net above 0]
    E --> F{Any debtor and creditor left?}
    F -->|Yes| G[Match largest debtor with largest creditor<br/>transfer = min of the two]
    G --> H[Reduce both balances]
    H --> F
    F -->|No| I([balances + transactions])
```

### Budget System

```mermaid
flowchart LR
    subgraph DB ["Database (source of truth)"]
        T["trips.total_budget"]
        S["trips.spent_amount<br/>trigger on expenses"]
        R["trips.remaining_budget<br/>generated column"]
        T --> R
        S --> R
    end

    subgraph Modes ["Budget Types"]
        SOLO["solo<br/>one person, one pot"]
        SHARED["shared<br/>group pool, Settle Up tab"]
        SEP["separated<br/>per-member allocation"]
    end

    subgraph FE ["Frontend"]
        ALERTS["BudgetAlerts<br/>75 / 90 / 100%"]
        BENTO["BentoCharts<br/>gauge · donut · trend"]
        SETTLE["SettlementSummary<br/>equal-share model"]
    end

    Modes --> DB
    DB --> FE
```

### Role & Permission Matrix

What the backend enforces today:

| Action | Owner | Editor | Viewer |
|---|---|---|---|
| View trip details | ✅ | ✅ | ✅ |
| Edit trip details | ✅ | ✅ | ❌ |
| Delete trip | ✅ | ❌ | ❌ |
| Add expense | ✅ | ✅ | ✅ *(not role-checked yet)* |
| Delete own expense | ✅ | ✅ | ✅ |
| Delete anyone's expense | ✅ | ❌ | ❌ |
| Manage members | 🚧 *(no endpoint yet)* | ❌ | ❌ |

> A `PermissionGate` component exists on the frontend for role-based UI. Stricter membership checks on expenses, itinerary, packing and settlement are on the roadmap.

---

## 📁 Project Structure

```
TravelLuhh/
├── docker-compose.yml          Backend container
├── TravelLuhh.drawio           Architecture diagrams
├── DOCS.pdf                    Long-form technical docs
│
├── backend/
│   ├── Dockerfile              Multi-stage Maven → JRE Alpine
│   ├── schema.sql              Full DDL, triggers, migration notes
│   └── src/main/java/com/travelluhh/
│       ├── controller/         Auth, Trip, Expense, Itinerary, Packing,
│       │                       Activity, Settlement, User
│       ├── service/            Business logic (+ async email / activity)
│       ├── repository/         Spring Data JPA repositories
│       ├── entity/             JPA entities
│       ├── dto/                Request / response DTOs
│       ├── security/           SecurityConfig, JWT filter, OAuth2 handlers
│       ├── util/               JwtUtil
│       └── exception/          Global exception handler
│
└── frontend/src/
    ├── pages/                  Landing, Login, Register, ForgotPassword,
    │                           Dashboard, Trips, TripDetail, Profile, Portfolio
    ├── components/             expenses, charts, settlement, itinerary,
    │                           packing, currency, portfolio, sharing, ui ...
    ├── services/               API call layer + Frankfurter client
    ├── hooks/                  useTrips, useExpenses
    ├── context/                AuthContext
    ├── lib/                    axios.ts, currency.ts, export.ts
    ├── data/                   Countries + currencies
    └── types/                  TypeScript interfaces
```

---

## 🗺 Roadmap

- [x] Email signup with OTP + Google OAuth2
- [x] JWT auth with silent token refresh
- [x] Onboarding (home country + currency)
- [x] Trip CRUD with status and archive
- [x] Expense tracking with bundle sub-items
- [x] DB triggers for spent / remaining budget
- [x] Budget modes (solo / shared / separated)
- [x] Budget alerts (75% / 90% / 100%)
- [x] Analytics bento charts
- [x] Settle Up with debt simplification
- [x] Packing checklist with preset packs
- [x] Day-by-day itinerary planner
- [x] Activity feed
- [x] CSV + printable PDF export
- [x] Live FX currency cards and converter
- [x] Profile settings + change password
- [ ] Member invite / remove / role change (backend endpoints)
- [ ] Membership checks on all trip sub-resources
- [ ] Edit expense
- [ ] Separated budget allocation per member
- [ ] Route the Travel Portfolio page (Year in Review · Timeline · Map)
- [ ] Notes persistence to database
- [ ] Multi-currency expenses converted to the trip currency
- [ ] Refresh-token revocation on logout
- [ ] Real-time collaboration (WebSocket/SSE)
- [ ] Trip image upload
- [ ] Email notifications for budget alerts

---

## 📄 License

MIT © 2025 Siti Nursyaqirah · Source on [GitHub](https://github.com/snsyaqirah/TravelLuhh)
