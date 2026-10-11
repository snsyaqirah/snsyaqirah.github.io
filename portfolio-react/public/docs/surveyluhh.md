# 🏠 SurveyLuhh

> A collaborative property scraper for Malaysian house hunters. Paste a listing link, get every detail pulled into one shared board, shortlist with your house-hunting squad, then let a bracket tournament settle which unit wins.

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Version](https://img.shields.io/badge/version-0.7.1-blue)
![Stack](https://img.shields.io/badge/stack-Next.js%20%2B%20FastAPI%20%2B%20MongoDB-265CE4)
![Scraping](https://img.shields.io/badge/scraping-curl__cffi%20%2B%20BeautifulSoup4%20%2B%20Selenium-7C3AED)

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
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧭 Overview

House hunting with friends usually means a WhatsApp group full of screenshots, half-copied listing details and "eh which one was the one near the LRT ah?". SurveyLuhh puts all of that in one place. Someone starts a session and shares the link. Each person picks a nickname, pastes listing URLs, and the backend scrapes the title, price, size, rooms, photos, facilities, nearby places and agent contact into a shared board.

From there the squad shortlists or rejects units, opens a printable detail view, or WhatsApps the agent in one tap. When it's time to decide, each person runs a head-to-head **bracket tournament**, and the app shows whose winner matches whose.

There are no accounts. A session is a UUID link, and the session (with everything in it) is deleted automatically by a MongoDB TTL index 30 days after it was created. In the last week before expiry it can be extended, up to 3 times.

**Type:** `Solo`
**Brand:** `Luhh Series`
**Built with:** Independent

---

## ✨ Features

- ✅ One-click start: the landing page generates a session UUID and the hunt URL is the share link
- ✅ Nickname join modal with consent checkbox; pick an existing member name or enter a new one
- ✅ Per-member token (random UUID, stored as a SHA-256 hash) that protects each member's bracket vote
- ✅ Scrape **Mudah.my** listings: title, price (with `/month` detection for rentals), sqft, beds, baths, parking, up to 20 photos, facilities, nearby places, agent name / phone / agency, description
- ✅ Fetch pipeline: `curl_cffi` with Chrome TLS impersonation and a homepage warm-up, then a headless Chrome fallback on 403 / 429 / 503
- ✅ Parsing pipeline: `__NEXT_DATA__` JSON first, BeautifulSoup DOM selectors as fallback
- ✅ reCAPTCHA v3 gate on scraping (score ≥ 0.5), a domain allow-list, and a 20-property cap per session
- ✅ Split-view board: property list with source / status / "added by" badges and a detail panel with gallery and lightbox
- ✅ Swipe right to shortlist, swipe left to reject (touch and mouse)
- ✅ Per-device favourites (heart), saved in localStorage
- ✅ One-tap WhatsApp-the-agent link with a prefilled message
- ✅ Print / save-as-PDF detail view (print stylesheet expands every section)
- ✅ Share panel with member list, online dots (active in the last hour) and copy-link button
- ✅ Bracket tournament: start with all properties or only your hearted ones, BYE slots for odd counts, a hover tooltip with beds / baths / sqft, confetti, and a comparison with friends' winners
- ✅ Bracket progress saved per member in localStorage, so a refresh doesn't lose your picks
- ✅ Expiry countdown in the navbar, plus an extend banner (+7 or +30 days) in the final week, max 3 extensions
- ✅ Floating anonymous feedback button (bug / enhancement / general / testimonial)
- ✅ Public feedback board showing replies the admin chose to publish
- ✅ Token-gated `/admin` panel: unread count, reply, mark public
- ✅ Changelog and privacy policy pages (PDPA-style disclosure of what gets stored)
- ✅ Security headers and a per-request nonce CSP on the frontend, security headers and rate limits (slowapi) on the backend
- ✅ Weekly GitHub Actions backup of MongoDB, AES-256 encrypted before upload
- ✅ Sentry error monitoring on backend and frontend server
- 🚧 **PropertyGuru** scraper (undetected-chromedriver under Xvfb). The code exists, but Cloudflare blocks it from the server, so the UI only accepts Mudah links for now
- 🚧 **iProperty** scraper (Next.js `/_next/data` JSON endpoint, then HTML). The code exists, but Akamai blocks it, so it's disabled in the UI too
- 🚧 Live sync: members and bracket results are polled every 30 s. The property list itself only reloads on page load
- 💡 WebSocket / SSE real-time updates
- 💡 Side-by-side comparison table
- 💡 Per-member shortlist votes (status is currently one shared value per property)
- 💡 Price history and re-scrape

---

## 🛠 Tech Stack

```mermaid
graph TD
    subgraph Frontend
        FE["Next.js 16 (App Router)<br/>React 19 + TypeScript"]
        UI["Tailwind CSS 4<br/>Framer Motion · react-swipeable"]
        SEC["reCAPTCHA v3 · nonce CSP<br/>Sentry"]
    end
    subgraph Backend
        BE["FastAPI + Uvicorn<br/>Python 3.11 · Pydantic v2"]
        SCR["Scrapers<br/>curl_cffi · BeautifulSoup4"]
        SEL["Selenium · undetected-chromedriver<br/>headless Chrome + Xvfb"]
        RL["slowapi rate limiting"]
    end
    subgraph Infrastructure
        DB[("MongoDB<br/>Motor async driver · TTL index")]
        GH["GitHub Actions<br/>weekly encrypted backup"]
        HOST["Vercel (web)<br/>Render (API, Docker)"]
    end
    FE --> BE
    BE --> DB
    BE --> SCR
    SCR --> SEL
    GH --> DB
```

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript |
| Styling / UI | Tailwind CSS 4 · Framer Motion · react-swipeable · Geist font |
| Bot protection | Google reCAPTCHA v3 (`react-google-recaptcha-v3`) |
| Backend | FastAPI 0.115 · Uvicorn · Pydantic v2 · Python 3.11 |
| Database | MongoDB (Atlas in production) via Motor async driver |
| Scraping | curl_cffi (Chrome TLS impersonation) · BeautifulSoup4 · Selenium 4 · undetected-chromedriver |
| Rate limiting | slowapi (5 req/min default, per-route overrides) |
| Monitoring | Sentry (`sentry-sdk[fastapi]`, `@sentry/nextjs`) |
| Containers | Docker (Python slim + Google Chrome + Xvfb) · Docker Compose for local dev |
| CI / Ops | GitHub Actions weekly pymongo JSON export, OpenSSL AES-256 encrypted |
| Hosting | Vercel (frontend) · Render (API) |

---

## 📌 Architecture

### High-level Architecture

```mermaid
graph TD
    U["House hunters<br/>(browser / phone)"] --> FE["Next.js frontend<br/>Vercel"]
    FE -->|"REST / JSON"| API["FastAPI backend<br/>Render"]
    FE -->|"token"| RC["Google reCAPTCHA v3"]
    API -->|"siteverify"| RC
    API --> DB[("MongoDB<br/>sessions · feedback")]
    API -->|"curl_cffi / headless Chrome"| SITES["Listing sites<br/>Mudah.my (PropertyGuru, iProperty blocked)"]
    API -.-> SENTRY["Sentry"]
    GHA["GitHub Actions cron"] -->|"weekly backup"| DB
```

### System Architecture

```mermaid
graph TD
    subgraph Frontend
        PG["App Router pages<br/>/ · /hunt/:sessionId · /feedback · /admin"] --> HC["Hunt components<br/>NavBar · HomeTab · PropertiesTab · InsightTab"]
        HC --> API_TS["lib/api.ts<br/>fetch client"]
        HC --> LS["localStorage<br/>nickname · member token · favourites · bracket state"]
        MW["middleware.ts<br/>nonce CSP"] --> PG
    end
    subgraph Backend
        MID["Middleware<br/>CORS · security headers · slowapi"] --> R["Routers<br/>sessions · scrape · feedback"]
        R --> M["Pydantic models"]
        R --> S["services/scraper<br/>dispatch by domain"]
        S --> F["base.fetch_html<br/>curl_cffi → Selenium fallback"]
        R --> D["services/db<br/>Motor client"]
        D --> DB[("MongoDB")]
    end
    API_TS --> MID
```

---

## 👤 User Flow

```mermaid
flowchart TD
    A([Start]) --> B["Landing page"]
    B --> C["Click Lessego!"]
    C --> D["Client generates UUID<br/>→ /hunt/:sessionId"]
    D --> E{"Nickname saved<br/>for this session?"}
    E -->|No| F["Nickname modal + consent"]
    E -->|Yes| G["Register member<br/>(refresh token)"]
    F --> G
    G --> H["Home tab: paste listing URL"]
    H --> I{"Mudah.my link?"}
    I -->|No| J["Inline error<br/>(PG / iProperty blocked)"]
    I -->|Yes| K["reCAPTCHA v3 → POST /api/scrape"]
    K --> L["Properties tab<br/>list + detail"]
    L --> M{"Action"}
    M -->|"Swipe right / left"| N["Shortlist / Reject"]
    M -->|"Heart"| O["Save favourite locally"]
    M -->|"WhatsApp / PDF"| P["Contact agent / print"]
    M -->|"Share"| Q["Copy link → friends join"]
    M -->|"Insight"| R["Bracket tournament"]
    R --> S["Pick winners round by round"]
    S --> T["Winner + confetti<br/>compare with friends' picks"]
    T --> U([Decide together])
```

### Page Map

```mermaid
graph TD
    subgraph Public ["🌐 Public Routes"]
        ROOT["/<br/>Landing"]
        HUNT["/hunt/:sessionId<br/>Session board (Home · Properties · Insight)"]
        FB["/feedback<br/>Public feedback board"]
        CL["/changelog<br/>Version history"]
        PRIV["/privacy<br/>Privacy policy"]
    end
    subgraph Protected ["🔐 Admin token required"]
        ADMIN["/admin<br/>Feedback inbox + replies"]
    end
    ROOT --> HUNT
    ROOT --> CL
    ROOT --> PRIV
    HUNT --> FB
    FB --> ADMIN

    style Public fill:#e8f5e9,stroke:#4caf50
    style Protected fill:#e3f2fd,stroke:#2196f3
```

---

## 🔐 Auth & Session Flow

SurveyLuhh has no user accounts. Access works like this:

- **Session link.** Anyone who has the session UUID can view it and add to it.
- **Member token.** Proves "I am this nickname" when saving a bracket result.
- **reCAPTCHA v3.** Gates the expensive scrape endpoint.
- **Bearer admin token.** Protects the feedback inbox and admin session tools.

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Next.js
    participant API as FastAPI
    participant RC as reCAPTCHA
    participant DB as MongoDB

    Note over U,DB: Joining a session
    U->>FE: Open /hunt/:sessionId
    FE->>FE: Read nickname from localStorage
    alt No nickname yet
        FE-->>U: Nickname modal + consent
        U->>FE: Enter nickname
    end
    FE->>API: PATCH /api/sessions/:id/members
    API->>API: Generate memberToken (UUID)
    API->>DB: Upsert member, store SHA-256(token), lastSeen
    API-->>FE: memberToken
    FE->>FE: Save token in localStorage

    Note over U,DB: Scrape gate
    U->>FE: Paste Mudah link, click Survey Luhh
    FE->>RC: execute('scrape')
    RC-->>FE: token
    FE->>API: POST /api/scrape (url, sessionId, token, nickname)
    API->>RC: siteverify
    RC-->>API: success + score
    alt score below 0.5
        API-->>FE: 403 reCAPTCHA verification failed
    else ok
        API->>API: Scrape + build Property
        API->>DB: Upsert session, push property to front
        API-->>FE: Property
    end

    Note over U,DB: Saving a bracket winner
    FE->>API: PATCH /api/sessions/:id/bracket (nickname, winnerId, memberToken)
    API->>DB: Match nickname + token hash
    alt hash mismatch
        API-->>FE: 403 Invalid member token
    else ok
        API->>DB: Replace this member's bracket result
        API-->>FE: ok
    end
```

### Admin Access

```mermaid
sequenceDiagram
    participant A as Admin
    participant FE as /admin page
    participant API as FastAPI

    A->>FE: Enter admin token
    FE->>FE: Store in localStorage
    FE->>API: GET /api/feedback (Bearer token)
    API->>API: Compare with ADMIN_TOKEN env
    alt match
        API-->>FE: All feedback (marks as read)
        A->>FE: Reply + optionally make public
        FE->>API: PATCH /api/feedback/:id/reply
    else mismatch
        API-->>FE: 401 Unauthorized
    end
```

---

## 🗄️ Database (ERD)

MongoDB with two collections. A session is a single document, and its properties, members and bracket results are embedded arrays. The diagram below shows the embedded arrays as separate entities so the relationships are easier to see.

### Core ERD

```mermaid
erDiagram
    SESSION {
        string _id PK "UUID"
        datetime createdAt
        datetime expiresAt "TTL index, expireAfterSeconds 0"
        int extensionCount "max 3"
    }
    PROPERTY {
        string id PK "UUID"
        string url
        string title
        string price
        array images
        string details_sqft
        int details_bedrooms
        int details_bathrooms
        int details_parking
        array facilities
        array nearbyPlaces
        string agent_name
        string agent_phone
        string agent_agency
        string description
        string status "none, shortlisted, rejected"
        string source "mudah, propertyguru, iproperty"
        string scrapedBy "nickname"
        datetime addedAt
    }
    MEMBER {
        string nickname PK
        datetime lastSeen
        datetime consentGivenAt
        string tokenHash "SHA-256 of member token"
    }
    BRACKET_RESULT {
        string nickname FK
        string winnerId FK
    }
    SESSION ||--o{ PROPERTY : "embeds (max 20)"
    SESSION ||--o{ MEMBER : "embeds"
    SESSION ||--o{ BRACKET_RESULT : "embeds"
    MEMBER ||--o| BRACKET_RESULT : "one per member"
    PROPERTY ||--o{ BRACKET_RESULT : "won by"
```

### Feature ERD

```mermaid
erDiagram
    FEEDBACK {
        string _id PK "UUID"
        string category "bug, enhancement, general, testimonial"
        string message
        string suggestedFix
        datetime createdAt
        string reply
        datetime repliedAt
        boolean read
        boolean isPublic
    }
```

### Database Schema Overview

| Collection / field | Purpose | Notes |
|---|---|---|
| `sessions` | One document per hunt session | `_id` is the UUID in the URL |
| `sessions.expiresAt` | Auto-delete time | TTL index created on startup; legacy `createdAt` TTL index is dropped |
| `sessions.properties[]` | Scraped listings | Newest pushed to position 0, capped at 20 |
| `sessions.members[]` | Nicknames in the session | `tokenHash` + `lastSeen` for presence |
| `sessions.bracketResults[]` | Each member's tournament winner | One entry per nickname (pull then push) |
| `feedback` | Anonymous feedback + admin replies | Shown publicly only if `isPublic` and replied |

---

## 🔌 API Structure

### API Overview

```mermaid
mindmap
  root((SurveyLuhh API))
    health
      GET /health
    sessions
      POST create
      GET by id
      DELETE session
      PATCH property status
      DELETE property
      PATCH members
      PATCH bracket
      POST extend
      POST extend-admin
    scrape
      POST /api/scrape
    feedback
      POST submit
      GET public
      GET all admin
      GET unread-count admin
      PATCH reply admin
```

| Group | Endpoint | Guard / limit |
|---|---|---|
| Health | `GET /health` | default 5/min |
| Sessions | `POST /api/sessions` | 10/min |
| | `GET /api/sessions/:id` · `DELETE /api/sessions/:id` | session UUID |
| | `PATCH /api/sessions/:id/properties/:propId` (status) · `DELETE .../:propId` | session UUID |
| | `PATCH /api/sessions/:id/members` | 20/min, returns member token |
| | `PATCH /api/sessions/:id/bracket` | 30/min, member token |
| | `POST /api/sessions/:id/extend` (7 or 30 days) | 10/hour, last 7 days only, max 3 |
| | `POST /api/sessions/:id/extend-admin` | Bearer admin token |
| Scrape | `POST /api/scrape` | 10/min, reCAPTCHA v3, domain allow-list, 20-property cap |
| Feedback | `POST /api/feedback` | 5/min |
| | `GET /api/feedback/public` | 30/min |
| | `GET /api/feedback` · `GET /api/feedback/unread-count` · `PATCH /api/feedback/:id/reply` | Bearer admin token, 3/min |

### Request/Response Flow

```mermaid
sequenceDiagram
    participant FE as Frontend
    participant MW as CORS + SlowAPI middleware
    participant R as FastAPI router
    participant M as Pydantic model
    participant DB as MongoDB (Motor)

    FE->>MW: HTTP request
    MW->>MW: Check origin + rate limit
    alt over limit
        MW-->>FE: 429 Too Many Requests
    else ok
        MW->>R: Forward
        R->>M: Validate body (length caps, enums)
        R->>DB: find / update_one / $push / $pull
        DB-->>R: Document
        R->>M: Coerce to response model
        R-->>FE: JSON + security headers
    end
```

---

## 🧩 Frontend Components

### Component Tree

```mermaid
graph TD
    L["RootLayout<br/>reads CSP nonce"] --> PRV["Providers<br/>GoogleReCaptchaProvider"]
    PRV --> FBB["FeedbackButton<br/>(floating, every page)"]
    PRV --> LAND["/ LandingPage<br/>+ ApartmentSVG"]
    PRV --> HUNT["/hunt/:sessionId HuntPage"]
    PRV --> FBP["/feedback"]
    PRV --> ADM["/admin"]
    PRV --> CHG["/changelog · /privacy"]

    HUNT --> NM["NicknameModal"]
    HUNT --> NAV["NavBar<br/>tabs · expiry · share + members"]
    HUNT --> EXT["ExtendBanner"]
    HUNT --> HOME["HomeTab<br/>URL input · health pill · scrape phases"]
    HUNT --> PROPS["PropertiesTab"]
    HUNT --> INS["InsightTab"]

    PROPS --> PL["PropertyList<br/>swipeable rows"]
    PROPS --> PD["PropertyDetail<br/>gallery · lightbox · agent · PDF"]
    INS --> LOBBY["Lobby<br/>hearts + friends' picks"]
    INS --> BR["Bracket<br/>MatchCard · PropertyRow tooltip"]
    INS --> WIN["Winner screen<br/>confetti + partner comparison"]
```

### Key Components

| Component | Purpose |
|---|---|
| `HuntPage` | Owns session state, nickname/member token, 30 s polling of members and bracket results, and the tab switch |
| `NavBar` | Tabs, expiry countdown tooltip, share panel with member list and online dots, copy-link |
| `ExtendBanner` | Shows in the last 7 days: +1 week / +1 month, tracks remaining extensions |
| `HomeTab` | URL validation, supported-site chips, backend wake-up pill (handles Render cold starts), reCAPTCHA + scrape with phase messages |
| `PropertyList` | Rows with thumbnail, price, source / status / added-by badges; swipe right = shortlist, left = reject |
| `PropertyDetail` | Gallery + lightbox, details grid, facilities and nearby, description "read more", agent card with WhatsApp deep link, heart, PDF, delete |
| `InsightTab` | Tournament lobby, bracket builder (power-of-2 with BYEs), round progression, winner screen, friends' picks |
| `NicknameModal` | Join flow with existing-member chips and privacy consent |
| `FeedbackButton` | Category-aware feedback form (bugs get a "suggested fix" field) |
| `middleware.ts` | Generates a per-request nonce and sets a strict CSP |

---

## ⚙️ Feature-specific Flows

### Scraping Pipeline

```mermaid
flowchart TD
    A(["POST /api/scrape"]) --> B{"reCAPTCHA score ≥ 0.5?"}
    B -->|No| B1(["403"])
    B -->|Yes| C["Upsert session doc<br/>(direct links work without POST /sessions)"]
    C --> D{"Properties < 20?"}
    D -->|No| D1(["429 limit reached"])
    D -->|Yes| E["scrape_url in thread pool<br/>(Selenium is blocking)"]
    E --> F{"Host in allow-list?"}
    F -->|No| F1(["400 Unsupported domain"])
    F -->|"mudah.my"| G["fetch_html"]
    F -->|"iproperty.com.my"| H["Try /_next/data/buildId JSON<br/>else fetch_html"]
    F -->|"propertyguru.com.my"| I["undetected-chromedriver<br/>non-headless in Xvfb"]

    G --> G1["curl_cffi session<br/>impersonate chrome124"]
    G1 --> G2["Warm up homepage<br/>for CDN cookies"]
    G2 --> G3{"Response"}
    G3 -->|"200"| P["HTML"]
    G3 -->|"403 / 429 / 503"| G4["Headless Chrome fallback<br/>(Selenium Grid or local)"]
    G4 --> P

    P --> Q["BeautifulSoup"]
    Q --> R{"__NEXT_DATA__ JSON?"}
    R -->|Yes| S["Read ad + advertiser:<br/>title · price · params · images · agent"]
    R -->|"Missing fields"| T["DOM fallbacks<br/>data-testid selectors, regex"]
    S --> U["Normalise<br/>RM x,xxx/month · dedupe images (max 20)<br/>nearby places from text"]
    T --> U
    H --> U
    I --> U
    U --> V["Property model<br/>id · scrapedBy · addedAt · source"]
    V --> W["$push at position 0"]
    W --> X(["ScrapeResponse"])
```

> **Why only Mudah in the UI?** PropertyGuru sits behind Cloudflare and iProperty behind Akamai. Both scrapers are still in the codebase (stealth Chrome, Next.js data endpoint), but they don't work reliably from a cloud IP, so the frontend only accepts Mudah links and labels the other two as blocked.

### Bracket Tournament

```mermaid
flowchart TD
    A(["Insight tab"]) --> B{"Hearted ≥ 2?"}
    B -->|Yes| C["Start with favourites"]
    B -->|"Or"| D["Start with all properties"]
    C --> E["Pad to next power of 2<br/>empty slots become BYEs"]
    D --> E
    E --> F["Round N: pick a winner per match<br/>(hover = beds · baths · sqft)"]
    F --> G["Persist rounds in localStorage"]
    G --> H{"One winner left?"}
    H -->|No| I["Pair winners into next round<br/>auto-advance odd one out"]
    I --> F
    H -->|Yes| J["Confetti + winner card"]
    J --> K["PATCH /bracket with member token"]
    K --> L["Compare with friends' winners<br/>🤝 when picks match"]
```

### Session Lifecycle

```mermaid
flowchart LR
    A["Created<br/>expiresAt = now + 30d"] --> B["Active<br/>scrape · shortlist · vote"]
    B --> C{"≤ 7 days left?"}
    C -->|No| B
    C -->|Yes| D["ExtendBanner<br/>+7d or +30d"]
    D -->|"under 3 extensions"| B
    D -->|"ignored / maxed"| E["expiresAt passes"]
    E --> F["MongoDB TTL monitor<br/>deletes the document"]
```

### Feedback Loop

```mermaid
flowchart TD
    A(["User clicks Send Feedback"]) --> B["Pick category<br/>bug · enhancement · general · testimonial"]
    B --> C["POST /api/feedback<br/>(read = false, isPublic = false)"]
    C --> D["Admin opens /admin<br/>unread badge"]
    D --> E["Reply + choose make public"]
    E --> F{"isPublic?"}
    F -->|Yes| G["Shown on /feedback board"]
    F -->|No| H["Private reply kept in inbox"]
```

---

## 🚀 Deployment

| Piece | Where |
|---|---|
| Frontend | Vercel: [surveyluhh.vercel.app](https://surveyluhh.vercel.app/) |
| Backend API | Render (Docker image with Google Chrome + Xvfb for the Selenium fallback) |
| Database | MongoDB Atlas, with the `expiresAt` TTL index set up on API startup |
| Backups | GitHub Actions cron every Sunday 02:00 UTC, JSON export encrypted with AES-256-CBC (PBKDF2), kept 90 days as a workflow artifact |
| Monitoring | Sentry (backend + Next.js server) |

---

## 📁 Project Structure

```
SurveyLuhh/
├── docker-compose.yml          MongoDB + Selenium Chrome + API + frontend (local dev)
├── .github/workflows/
│   └── backup.yml              Weekly encrypted MongoDB backup
│
├── backend/
│   ├── Dockerfile              python:3.11-slim + Google Chrome + Xvfb
│   ├── main.py                 FastAPI app, CORS, security headers, TTL index setup
│   ├── limiter.py              slowapi limiter (5/min default)
│   ├── backup.py               Export sessions + feedback to JSON
│   ├── models/
│   │   ├── property.py         Session, Property, Member, BracketResult, requests
│   │   └── feedback.py         Feedback models + categories
│   ├── routers/
│   │   ├── sessions.py         Sessions, members, status, bracket, extend
│   │   ├── scrape.py           reCAPTCHA check, cap, scrape + persist
│   │   └── feedback.py         Submit, public board, admin inbox / reply
│   └── services/
│       ├── db.py               Motor client + collection helpers
│       └── scraper/
│           ├── __init__.py     Domain allow-list + dispatch
│           ├── base.py         curl_cffi fetch, Selenium + stealth drivers
│           ├── mudah.py        Mudah.my parser
│           ├── iproperty.py    iProperty parser (Next.js data endpoint)
│           └── propertyguru.py PropertyGuru parser (stealth Chrome)
│
└── frontend/
    ├── middleware.ts           Per-request nonce CSP
    ├── next.config.ts          Security headers
    ├── app/
    │   ├── page.tsx            Landing
    │   ├── hunt/[sessionId]/   Session board
    │   ├── feedback/ admin/    Feedback board + admin panel
    │   └── changelog/ privacy/
    ├── components/
    │   ├── hunt/               NavBar, HomeTab, PropertiesTab, PropertyList,
    │   │                       PropertyDetail, InsightTab, NicknameModal, ExtendBanner
    │   ├── landing/            ApartmentSVG
    │   ├── FeedbackButton.tsx
    │   └── Providers.tsx       reCAPTCHA provider
    └── lib/                    api.ts (fetch client), types.ts
```

---

## 🗺 Roadmap

- [x] Mudah.my scraping with shareable session dashboard (v0.1)
- [x] Collaborative sessions, shortlist / reject, bracket tournament (v0.2)
- [x] curl_cffi warm-up pipeline, stealth Selenium, iProperty JSON scraper (v0.3)
- [x] Feedback board + admin panel, bracket BYE fix, TTL enforcement (v0.4)
- [x] Member tokens, Sentry, public/private feedback, encrypted backups (v0.5)
- [x] Rate limiting on all public endpoints + pre-launch security review (v0.6)
- [x] 30-day sessions with `expiresAt` TTL and up to 3 extensions (v0.7)
- [x] Price + spec tooltip on bracket cards (v0.7.1)
- [ ] Get PropertyGuru / iProperty working again from the server
- [ ] Real-time sync (WebSocket / SSE) instead of 30 s polling
- [ ] Side-by-side comparison view
- [ ] Per-member shortlist votes
- [ ] Price history / re-scrape
- [ ] Owner controls on destructive actions (delete property / session)

---

## 📄 License

No license file is published yet, so all rights are reserved by the author. © 2026 Siti Nursyaqirah · Source on [GitHub](https://github.com/snsyaqirah/SurveyLuhh)
