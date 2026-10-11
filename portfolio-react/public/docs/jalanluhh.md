# 🚆 JalanLuhh

> A transit discovery web app for Klang Valley commuters. Pick an MRT, LRT, KTM or BRT line, open any station, and see the mosques, malls, parks, hospitals and attractions within walking distance. It also estimates fares and finds the stations closest to you.

![Status](https://img.shields.io/badge/status-in%20development-orange)
![Version](https://img.shields.io/badge/version-0.1.0-blue)
![Frontend](https://img.shields.io/badge/frontend-React%2018%20%2B%20Vite-61dafb)
![Backend](https://img.shields.io/badge/backend-planned-lightgrey)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [User Flow](#-user-flow)
- [Data Model](#-data-model)
- [Frontend Components](#-frontend-components)
- [Feature Flows](#-feature-specific-flows)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧭 Overview

Most transit apps tell you how to get to a station. JalanLuhh starts from the other end: it shows what's around each station once you arrive. Every stop on a line has a list of nearby places (masjid, temples, churches, malls, parks, hospitals, schools, gyms and food spots), each with its walking distance, a short description and a one-tap **Open in Maps** link.

The app was originally called **JalanKit**. Right now it's a frontend-only, installable Progressive Web App with a Workbox service worker. All the station and amenity data is bundled as typed TypeScript, and personal data (favourites, theme) is kept in `localStorage`. The `backend/` folder is a placeholder for a planned API.

**Current coverage**

| Metric | Value |
|---|---|
| Transit lines listed | 13 (MRT, LRT, Monorail, BRT, KTM, ERL) |
| Lines with full station data | 1 (**MRT Putrajaya Line**, 36 stations from Kwasa Damansara to Putrajaya Sentral) |
| Places mapped | 48 across 8 categories |
| Other lines | Shown as *Coming Soon* cards with official station counts |

**Type:** `Solo`
**Brand:** `Luhh Series`
**Built with:** Independent (scaffolded with Lovable, then restructured and redesigned by hand)
**Theme:** SDG 11, Sustainable Cities & Communities

---

## ✨ Features

- ✅ Browse all 13 Klang Valley rail and BRT lines, grouped by MRT / LRT / Other
- ✅ Line detail page with a vertical station timeline, plus category chips per stop
- ✅ Search stations **or** amenity names within a line
- ✅ Multi-select category filter (Mosque, Temple, Church, Attraction, Mall, Park, Hospital, Education, Fitness, Food)
- ✅ Station detail page listing nearby places with walking distance and description
- ✅ Previous / next station navigation along the line
- ✅ "Navigate to Station" and per-place "Open in Maps" (Google Maps search deep links)
- ✅ Native share sheet via the Web Share API
- ✅ Favourites for stations and places, saved in `localStorage`, with a dedicated Favourites page
- ✅ Fare calculator: pick a line, origin and destination, and passenger type (Adult / Student / Senior / OKU / Child) to get an estimated fare, travel time, distance and stop count
- ✅ Nearby Stops: browser geolocation plus Haversine distance to list the 5 closest stations within 3 km
- ✅ Light / dark theme toggle (follows the system setting on first visit)
- ✅ Installable PWA via `vite-plugin-pwa`: generated web manifest (standalone, portrait, 192/512 px and maskable icons, `#1967D2` theme colour)
- ✅ Workbox service worker with auto-update: precaches the app shell (JS, CSS, HTML, icons, fonts) and caches Google Fonts with CacheFirst, so the app and its bundled station data keep working offline
- ✅ Install page that hooks into `beforeinstallprompt`, with manual steps for iOS Safari
- ✅ Responsive layout with a collapsible mobile nav
- 🚧 Station data for the remaining 12 lines *(cards show "Coming Soon")*
- 🚧 Line service status widget (operating hours, peak/off-peak frequency, facilities) *(`LineStatus` component is built but not mounted on any page)*
- 💡 Backend API for stations, amenities and crowd-sourced place submissions *(currently a Google Form link)*
- 💡 Cross-line journeys with interchanges and transfer-aware fares
- 💡 Live arrivals from open GTFS-Realtime feeds
- 💡 Map view of stations and amenities
- 💡 Bus (RapidKL / feeder) coverage

---

## 🛠 Tech Stack

```mermaid
graph TD
    subgraph Frontend
        FE["React 18 + TypeScript<br/>Vite 7 · SWC"]
        UI["Tailwind CSS + shadcn/ui<br/>Radix UI · Framer Motion · Lucide"]
        RT["React Router v6<br/>TanStack Query (provider ready)"]
    end
    subgraph Data["Data (bundled)"]
        TD["Typed static data<br/>transitLines.ts · putrajayaLine.ts"]
        LS[("localStorage<br/>favourites · theme")]
    end
    subgraph Browser["Browser APIs"]
        GEO["Geolocation API"]
        SHARE["Web Share API"]
        PWA["Web App Manifest<br/>beforeinstallprompt"]
        SW["Workbox Service Worker<br/>precache + runtime cache"]
    end
    subgraph Planned["Planned"]
        BE["Backend API"]
    end
    FE --> TD
    FE --> LS
    FE --> GEO
    FE --> SHARE
    FE --> PWA
    FE --> SW
    FE -.-> BE
```

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 7 with `@vitejs/plugin-react-swc` |
| Routing | React Router v6 |
| UI | Tailwind CSS · shadcn/ui (Radix UI primitives) · Lucide icons · Plus Jakarta Sans |
| Animation | Framer Motion |
| Server state | TanStack React Query (provider wired, ready for the API) |
| Data | Typed static TypeScript modules |
| Persistence | `localStorage` (favourites, theme) |
| Geo | Browser Geolocation API + Haversine formula |
| PWA | `vite-plugin-pwa` · Workbox service worker (auto-update) · Web App Manifest · install prompt handling |
| Backend | 🚧 Planned |

---

## 📌 Architecture

### High-level Architecture

```mermaid
graph LR
    U[Commuter / Browser] --> SW[Service Worker<br/>Workbox cache]
    SW --> SPA[React SPA]
    SPA --> DATA[Bundled transit data]
    SPA --> LS[(localStorage)]
    SPA --> GEO[Geolocation API]
    SPA -->|deep link| GM[Google Maps]
    SPA -->|submit a place| GF[Google Form]
    SPA -.->|planned| API[JalanLuhh API]
```

### Frontend Layers

```mermaid
graph TD
    subgraph Pages
        P1[Home] --- P2[Lines] --- P3[Line Detail] --- P4[Stop Detail]
        P5[Fare Calculator] --- P6[Nearby Stops] --- P7[Favourites] --- P8[Install]
    end
    subgraph Components
        C1[layout: Header · Footer]
        C2[lines: LineCard · LineStatus]
        C3[stops: StopCard]
        C4[amenities: AmenityCard · CategoryFilter]
        C5[common: SearchBar · QuickActions]
    end
    subgraph Logic
        H1[useStopSearch]
        H2[useNearbyStops]
        H3[useTheme]
        L1[fareCalculator]
        L2[favorites]
        L3[categories]
        L4[operatingInfo]
    end
    subgraph Data
        D1[transitLines.ts]
        D2[putrajayaLine.ts]
        T1[types/transit.ts]
    end
    Pages --> Components
    Pages --> Logic
    Components --> Logic
    Logic --> Data
    Pages --> Data
```

---

## 👤 User Flow

```mermaid
flowchart TD
    A([Open app]) --> B[Home]
    B --> C[All Lines]
    B --> F[Fare Calculator]
    B --> N[Nearby Stops]
    B --> I[Install App]
    C --> D{Line has data?}
    D -->|No| CS[Coming Soon card]
    D -->|Yes| L[Line Detail<br/>station timeline]
    L --> S[Search / filter by category]
    S --> L
    L --> ST[Stop Detail]
    N -->|allow location| ST
    ST --> AM[Nearby places]
    AM --> MAP[Open in Google Maps]
    ST --> FAV[Save to Favourites]
    AM --> FAV
    FAV --> FP[Favourites page]
    FP --> ST
```

### Page Map

```mermaid
graph TD
    subgraph Explore["🧭 Explore"]
        HOME["/<br/>Home"]
        LINES["/lines"]
        LD["/line/:lineId"]
        SD["/line/:lineId/stop/:stopId"]
    end
    subgraph Tools["🛠 Tools"]
        FARE["/fare-calculator"]
        NEAR["/nearby"]
        INST["/install"]
    end
    subgraph Personal["❤️ Personal"]
        FAVS["/favorites"]
    end
    HOME --> LINES
    HOME --> FARE
    HOME --> NEAR
    HOME --> INST
    HOME --> SD
    LINES --> LD
    LD --> SD
    NEAR --> SD
    FAVS --> SD

    style Explore fill:#e3f2fd,stroke:#2196f3
    style Tools fill:#e8f5e9,stroke:#4caf50
    style Personal fill:#fce4ec,stroke:#e91e63
```

---

## 🗄️ Data Model

There's no database yet. The domain is modelled with TypeScript interfaces in `types/transit.ts`, and the data sits in typed modules. The diagram below shows how those types relate. A future backend would most likely adopt the same shape.

```mermaid
erDiagram
    TransitLine {
        string id PK
        string name
        string shortName
        string color
        string type "MRT LRT BRT KTM Monorail"
        int totalStops
    }
    TransitStop {
        string id PK
        string name
        string lineId FK
        int order
        float lat "optional"
        float lng "optional"
    }
    Amenity {
        string id PK
        string name
        string category "AmenityCategory"
        int distance "metres"
        string description
        string address "optional"
        string openingHours "optional"
    }
    Favorite {
        string id PK
        string type "stop or amenity"
        string itemId FK
        date addedAt
    }
    FareInfo {
        string fromStopId FK
        string toStopId FK
        float fare "RM"
        float distance "km"
        int estimatedTime "min"
    }
    TransitLine ||--o{ TransitStop : "has"
    TransitStop ||--o{ Amenity : "near"
    TransitStop ||--o{ Favorite : "saved as"
    Amenity ||--o{ Favorite : "saved as"
    TransitStop ||--o{ FareInfo : "from / to"
```

### Amenity Categories

| Category | Places mapped | Examples |
|---|---|---|
| 🛍 Mall / Shopping | 12 | The Exchange TRX, AEON Metro Prima, Intermark Mall |
| ✨ Attraction | 11 | Istana Budaya, National Art Gallery, Ilham Gallery |
| 🕌 Mosque | 5 | Asy-Syakirin Mosque, Masjid IJN |
| 🌳 Park | 5 | KLCC Park, TRX City Park, Taman Titiwangsa |
| 🏥 Hospital | 5 | Hospital Kuala Lumpur, IJN, Putrajaya Hospital |
| 💪 Fitness | 5 | Anytime Fitness, WynSports |
| 🎓 Education | 3 | Perpustakaan Negara, UTAR |
| 🛕 Temple | 2 | Wat Meh Liew, Sri Lingeshwarar Temple |
| ⛪ Church · 🍜 Food | 0 | Categories defined, data pending |

### Client-side Storage

| Key | Contents |
|---|---|
| `jalanluhh_favorites` | Array of `Favorite` objects (stops and amenities) |
| `jalanluhh_theme` | `"light"` or `"dark"` |

---

## 🧩 Frontend Components

### Component Tree

```mermaid
graph TD
    App["App.tsx<br/>QueryClientProvider · TooltipProvider · Router"]
    App --> HOME[Index]
    App --> LP[LinesPage]
    App --> LDP[LineDetailPage]
    App --> SDP[StopDetailPage]
    App --> FCP[FareCalculatorPage]
    App --> NSP[NearbyStopsPage]
    App --> FP[FavoritesPage]
    App --> IP[InstallPage]

    HOME --> QA[QuickActions]
    HOME --> LC1[LineCard]
    LP --> LC2[LineCard]
    LDP --> SB[SearchBar]
    LDP --> CF1[CategoryFilter]
    LDP --> SC[StopCard]
    SDP --> CF2[CategoryFilter]
    SDP --> AC[AmenityCard]

    HDR["Header + Footer<br/>on every page"]
    App -.-> HDR
```

### Key Components and Hooks

| Name | Purpose |
|---|---|
| `Header` | Sticky glass nav, theme toggle, mobile menu |
| `LineCard` | Line badge in line colour, type pill, stop count, "Coming Soon" state |
| `StopCard` | Timeline node with stop number, category chips, amenity count, favourite toggle |
| `AmenityCard` | Category icon, walking distance, description, Open in Maps, favourite toggle |
| `CategoryFilter` | Multi-select chip filter with clear action |
| `SearchBar` | Rounded search input used on line detail |
| `QuickActions` | Shortcut tiles to Fare Calculator, Nearby Stops and Install |
| `LineStatus` | Operating hours, peak/off-peak frequency, facilities *(built, not yet mounted)* |
| `useStopSearch` | Memoised filtering by stop name, amenity name and selected categories |
| `useNearbyStops` | Requests geolocation, runs a Haversine search over station coordinates, returns the top 5 |
| `useTheme` | Persists light/dark preference and toggles the `dark` class |
| `fareCalculator` | Distance-based fare estimate with concession rates |
| `favorites` | `localStorage` CRUD for saved stops and places |

---

## ⚙️ Feature-specific Flows

### Stop Search and Category Filter

```mermaid
flowchart LR
    A[Line stops] --> B{Search query?}
    B -->|Yes| C[Keep stops where<br/>stop name OR any amenity name matches]
    B -->|No| D[All stops]
    C --> E{Categories selected?}
    D --> E
    E -->|Yes| F[Keep stops with at least one<br/>amenity in selected categories]
    E -->|No| G[Result]
    F --> G
    G --> H[Showing X of Y stops]
```

### Fare Estimation

```mermaid
flowchart TD
    A([Pick line, origin, destination]) --> B["stops = abs(order_to - order_from)"]
    B --> C["distance = stops × 1.2 km"]
    B --> D["time = stops × 2.5 min"]
    C --> E["base = RM 1.20 + RM 0.12 × km"]
    E --> F["cap at RM 6.40"]
    F --> G{Passenger type}
    G -->|Adult| H["× 1.0"]
    G -->|Student · Senior · OKU · Child| I["× 0.5"]
    H --> J["round to nearest 10 sen"]
    I --> J
    J --> K([Estimated fare + time + distance + stops])
```

> Fares are estimates that approximate distance-based pricing, so the UI tells users to check official sources. For example, Kwasa Damansara to Tun Razak Exchange (21 stops) on a student concession comes out to **RM 2.10**, ~53 min, 25.2 km.

### Nearby Stops

```mermaid
sequenceDiagram
    participant U as User
    participant P as NearbyStopsPage
    participant H as useNearbyStops
    participant G as Geolocation API

    U->>P: Tap "Find Nearby Stops"
    P->>H: requestLocation()
    H->>G: getCurrentPosition (high accuracy, 10s timeout)
    G-->>H: lat, lng
    H->>H: Haversine distance to each known station
    H->>H: Keep within 3 km, sort, take top 5
    H-->>P: nearbyStops
    P-->>U: Station cards with km away
    U->>P: Tap a station
    P-->>U: Stop Detail page
```

### Favourites

```mermaid
flowchart LR
    A[Heart on StopCard / StopDetail / AmenityCard] --> B{isFavorite?}
    B -->|Yes| C[removeFavorite]
    B -->|No| D[addFavorite]
    C --> E[(localStorage<br/>jalanluhh_favorites)]
    D --> E
    E --> F[FavoritesPage<br/>Saved Stops · Saved Places]
    F -->|resolve ids across all lines| G[Stop / Amenity details]
```

### PWA and Offline

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant SW as Workbox Service Worker
    participant C as Cache Storage
    participant N as Network

    U->>B: First visit
    B->>SW: registerSW.js registers the worker
    SW->>N: Fetch app shell (JS, CSS, HTML, icons)
    SW->>C: Precache app shell
    B-->>U: Install prompt (beforeinstallprompt / iOS Add to Home Screen)
    Note over U,N: Later, offline or on a weak signal underground
    U->>B: Open JalanLuhh from home screen
    B->>SW: Request app
    SW->>C: Serve precached shell + bundled station data
    C-->>U: App loads offline
    SW->>N: Google Fonts (CacheFirst, 1 year)
    Note over SW,N: registerType autoUpdate swaps in new builds automatically
```

---

## 📁 Project Structure

```
JalanLuhh/
├── backend/
│   └── README.md            Placeholder for the planned API
│
└── frontend/
    ├── public/
    │   ├── manifest.json    Static web manifest
    │   └── pwa-*.png        PWA icons (192 / 512)
    ├── vite.config.ts       Vite + VitePWA (manifest, Workbox caching)
    └── src/
        ├── pages/
        │   ├── home/        Landing, stats, popular stops
        │   ├── lines/       All lines + line detail timeline
        │   ├── stops/       Stop detail + nearby stops
        │   ├── fare/        Fare calculator
        │   ├── favorites/   Saved stops and places
        │   ├── install/     PWA install guide
        │   └── error/       404
        ├── components/
        │   ├── layout/      Header, Footer
        │   ├── common/      SearchBar, QuickActions, NavLink
        │   ├── lines/       LineCard, LineStatus
        │   ├── stops/       StopCard
        │   ├── amenities/   AmenityCard, CategoryFilter
        │   └── ui/          shadcn/ui primitives
        ├── data/            transitLines.ts, putrajayaLine.ts
        ├── hooks/           useStopSearch, useNearbyStops, useTheme
        ├── lib/             fareCalculator, favorites, categories, operatingInfo
        └── types/           transit.ts
```

---

## 🗺 Roadmap

- [x] Feature-based project structure (pages / components / hooks / lib / data)
- [x] Custom transit-inspired design system with light and dark themes
- [x] All 13 lines listed with type grouping
- [x] Full MRT Putrajaya Line dataset (36 stations, 48 places)
- [x] Station timeline with search and category filters
- [x] Stop detail with nearby places, maps deep links and share
- [x] Favourites for stops and places
- [x] Fare calculator with concession types
- [x] Geolocation-based Nearby Stops
- [x] Installable PWA (manifest, icons, install page)
- [x] Workbox service worker for offline access and auto-updates
- [x] Rebrand from JalanKit to JalanLuhh
- [ ] Station and amenity data for MRT Kajang, LRT Kelana Jaya / Ampang / Sri Petaling, Monorail, KTM, ERL and BRT
- [ ] Mount `LineStatus` on line pages
- [ ] Backend API and database for stations, amenities and submissions
- [ ] In-app "Submit a Place" form with moderation
- [ ] Cross-line routing with interchanges
- [ ] Live arrivals via open GTFS-Realtime data
- [ ] Interactive map view
- [ ] Bus coverage

---

## 📄 License

MIT © 2025 Siti Nursyaqirah
