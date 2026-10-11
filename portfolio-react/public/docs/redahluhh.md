# 🏍️ RedahLuhh

> Route weather checker for Malaysian riders — see the weather at every stretch of your route, not just the destination. *Redah tanpa ragu* (ride without doubt).

![Status](https://img.shields.io/badge/status-live-brightgreen)
![Version](https://img.shields.io/badge/version-0.3.0-blue)
![Stack](https://img.shields.io/badge/stack-Next.js%20%2B%20FastAPI-e94560)
![Maps](https://img.shields.io/badge/maps-Google%20Maps%20Platform-4285F4)

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

RedahLuhh answers the question every Malaysian biker asks before a ride: *"Hujan tak kat tengah jalan nanti?"* You type an origin and destination (or let it detect your location), choose to leave now or at a set time, and the app gets up to three driving routes. It samples 3–7 waypoints along each route, works out when you will reach each one, and fetches the weather forecast for that place at that time.

Each route gets a weather score (green = 0, yellow = 1, red = 3 per waypoint). Routes are ranked driest first and labelled *Recommended*, *Driest Route*, *Fastest Route* or *Alternative N*. On the map, the polyline is coloured green, yellow or red section by section, with an emoji weather marker at each waypoint. A Summary tab shows the full breakdown and any active official warnings from MET Malaysia.

There are no user accounts. The main app is fully public, and nothing about your trip is stored. Supabase is used only for a community feedback wall, simple anonymous analytics, and a small admin dashboard for the developer.

**Type:** `Solo`
**Brand:** `Luhh Series`
**Built with:** Independent

---

## ✨ Features

- ✅ Weather at every sampled waypoint along the route (3–7 points, depending on route length), each with its own ETA
- ✅ Multi-route comparison: up to 3 routes from Google Routes API, ranked by weather score, ties broken by duration
- ✅ Route chips labelled *Recommended / Driest Route / Fastest Route / Alternative N*, with distance, duration and a safety badge
- ✅ Google Map with a green/yellow/red polyline per section and emoji markers (Start / Destination labelled)
- ✅ Summary tab: worst-condition banner, distance / duration / departure tiles, a status timeline dot strip, and per-waypoint weather cards (temp, rain %, wind, humidity, feels-like, ETA)
- ✅ Departure scheduler: *Leave now* or *Depart at* a set date and time, using hourly forecasts for future trips
- ✅ 5-provider weather cascade with automatic fallback: XWeather (road weather) → Meteoblue → Tomorrow.io (realtime for start and destination) → Open-Meteo → WeatherAPI
- ✅ Reality-check filter on rain readings, so model "phantom rain" doesn't turn a dry route red
- ✅ MET Malaysia official warnings (via api.data.gov.my) shown at the top of the summary
- ✅ **Go Now** mode: full-screen map, live GPS bike marker, Screen Wake Lock, auto weather refresh every 15 minutes
- ✅ Day/night map theme based on Malaysia time (light from 06:00 to 19:00)
- ✅ Auto-detects your location on load (browser geolocation + Google Geocoder), with a tip if location is blocked
- ✅ Places Autocomplete biased to Malaysia, clear buttons, and an origin/destination swap button
- ✅ Shows which weather provider is active, with toast alerts when a provider's quota runs out
- ✅ Backend status dot and a "warming up" notice for Render free-tier cold starts
- ✅ Floating feedback widget (bug / enhancement / general / testimonial; bugs need a suggested fix)
- ✅ Public community feedback wall with developer replies (`/feedback`)
- ✅ Admin dashboard (`/admin`): 7-day searches and page views chart, hide/restore feedback, reply to feedback
- ✅ Changelog page, PWA manifest with generated icons, sitemap, robots and bilingual (BM/EN) SEO metadata
- ✅ API rate limit (30 requests per minute per IP) and input validation on locations
- 🚧 MET Malaysia district-level forecasts *(service and reverse-geocode helper written, not yet wired into the cascade)*
- 💡 Saved / favourite routes
- 💡 Avoid-tolls and route preference options
- 💡 Push notifications when the weather changes mid-ride
- 💡 Offline support / service worker (only the manifest exists today)

---

## 🛠 Tech Stack

```mermaid
graph TD
    subgraph Frontend
        FE["Next.js 14 App Router<br/>React 18 + TypeScript"]
        UI["Tailwind CSS · clsx · date-fns"]
        MAP["@vis.gl/react-google-maps<br/>Maps JS · Places · Geocoder · AdvancedMarker"]
    end
    subgraph Backend
        BE["FastAPI + Uvicorn<br/>Python 3.12"]
        RL["slowapi rate limiting<br/>Pydantic v2 validation"]
        HX["httpx async client<br/>polyline decoder"]
    end
    subgraph External
        GR["Google Routes API v2"]
        WX["XWeather · Meteoblue · Tomorrow.io<br/>Open-Meteo · WeatherAPI"]
        MET["MET Malaysia<br/>api.data.gov.my"]
        SB[("Supabase<br/>feedback · analytics · auth")]
    end
    FE --> BE
    FE --> SB
    BE --> GR
    BE --> WX
    BE --> MET
```

| Layer | Technology |
|---|---|
| Frontend | Next.js 14.2 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, clsx, custom keyframe animations |
| Maps | Google Maps JavaScript API via `@vis.gl/react-google-maps` (vector map, AdvancedMarker, Places Autocomplete, Geocoder) |
| Backend | FastAPI 0.115, Uvicorn, Pydantic v2, pydantic-settings |
| HTTP | httpx (async) |
| Routing | Google Routes API v2 (`computeRoutes`, traffic-aware, alternative routes) |
| Weather | XWeather, Meteoblue, Tomorrow.io, Open-Meteo, WeatherAPI |
| Warnings | MET Malaysia open data (`api.data.gov.my/weather/warning`) |
| Data / Auth | Supabase (Postgres + Auth), used from the browser with `@supabase/supabase-js` |
| Rate limiting | slowapi |
| Hosting | Vercel (frontend), Render (backend) |
| Containers | Dockerfiles for both apps + Docker Compose |

---

## 📌 Architecture

### High-level Architecture

```mermaid
graph TD
    U["Rider / Browser"] --> FE["Next.js Frontend<br/>Vercel"]
    FE -->|"Maps JS, Places, Geocoder"| GM["Google Maps Platform"]
    FE -->|"POST /api/route-weather"| API["FastAPI Backend<br/>Render"]
    FE -->|"feedback, analytics, admin auth"| SB[("Supabase")]
    API --> GR["Google Routes API"]
    API --> WC["Weather cascade<br/>5 providers"]
    API --> MET["MET Malaysia warnings"]
```

### System Architecture

```mermaid
graph TD
    subgraph Frontend
        P["Pages<br/>/ · /feedback · /admin · /changelog"] --> C["Components<br/>RouteForm · WeatherMap · WeatherSummary"]
        C --> H["Hooks<br/>useRouteWeather · useBackendHealth"]
        H --> L["lib/api.ts<br/>fetch + polyline decoder"]
    end
    subgraph Backend
        R["weather_route router<br/>/api"] --> MW["CORS + slowapi"]
        MW --> MS["maps_service<br/>Routes API · haversine · waypoint sampler"]
        MW --> WS["weather_service<br/>5-provider cascade"]
        MW --> MM["met_malaysia_service<br/>active warnings"]
    end
    L --> R
    MS --> GR["Google Routes API"]
    WS --> EXT["Weather APIs"]
    MM --> DGM["api.data.gov.my"]
```

> API keys for Google Routes and the weather providers stay on the backend. The browser only holds the Google Maps JS key and the Supabase anon key.

---

## 👤 User Flow

```mermaid
flowchart TD
    A([Open RedahLuhh]) --> B{Location allowed?}
    B -->|Yes| C["Origin auto-filled<br/>via Geocoder"]
    B -->|No| D["Show tip to allow location"]
    C --> E["Enter destination<br/>Places Autocomplete"]
    D --> E
    E --> F{"Leave now or Depart at?"}
    F --> G["Check Route Weather"]
    G --> H["Riding bike loading animation"]
    H --> I{Routes found?}
    I -->|No| J["Error card"]
    I -->|Yes| K["Route chips<br/>Best route selected"]
    K --> L["Map View<br/>coloured polyline + emoji markers"]
    K --> M["Summary<br/>warnings, banner, waypoint cards"]
    L --> N["Tap Go Now"]
    N --> O["Full-screen live GPS<br/>wake lock + 15-min refresh"]
    M --> P([Decide: redah or tunggu])
    O --> P
```

### Page Map

```mermaid
graph TD
    subgraph Public ["🌐 Public"]
        ROOT["/<br/>Route weather app"]
        FB["/feedback<br/>Community wall"]
        CL["/changelog<br/>Release notes"]
    end
    subgraph Admin ["🔐 Supabase Auth"]
        AD["/admin<br/>Analytics + moderation"]
    end
    ROOT --> FB
    ROOT --> CL
    FB -.-> AD

    style Public fill:#e8f5e9,stroke:#4caf50
    style Admin fill:#e3f2fd,stroke:#2196f3
```

### Wireframe Overview

```mermaid
graph LR
    subgraph Home ["📄 / Home"]
        direction TB
        H1["Header: logo · backend status dot"]
        H2["Hero text, before first search"]
        H3["RouteForm: from · to · swap · departure"]
        H4["Available routes chips"]
        H5["Map View | Summary tabs"]
        H6["WeatherMap or WeatherSummary"]
        H7["Mini waypoint cards row"]
        H8["Footer: version · active provider"]
        H1 --- H2 --- H3 --- H4 --- H5 --- H6 --- H7 --- H8
    end
    subgraph Nav ["📄 Go Now overlay"]
        direction TB
        N1["Full-screen Google Map"]
        N2["Live GPS badge · Screen On"]
        N3["Updated N min ago"]
        N1 --- N2 --- N3
    end
    Home -.->|"tap Go Now"| Nav
```

---

## 🔐 Auth & Session Flow

> Riders never log in. Only `/admin` needs a login, using Supabase email + password auth. The `isAdmin` flag in localStorage just stops the developer's own visits from being counted in analytics.

```mermaid
sequenceDiagram
    participant D as Developer
    participant FE as /admin page
    participant SA as Supabase Auth
    participant DB as Supabase Postgres

    D->>FE: Open /admin
    FE->>SA: auth.getSession()
    SA-->>FE: No session
    FE-->>D: Login screen
    D->>FE: Email + password
    FE->>SA: signInWithPassword()
    SA-->>FE: Session (JWT)
    FE->>FE: localStorage isAdmin = true
    FE->>DB: select feedback + admin_replies, analytics_events
    DB-->>FE: Rows (access controlled by Supabase policies)
    FE-->>D: Dashboard
    D->>FE: Logout
    FE->>SA: auth.signOut()
    FE->>FE: remove isAdmin
```

---

## 🗄️ Database (ERD)

> Supabase holds only the feedback and analytics data. Routes and weather are fetched live and never stored. The table shapes below come from the queries in the frontend code. The SQL schema itself is not in the repo.

### Core ERD

```mermaid
erDiagram
    FEEDBACK {
        uuid id PK
        text category "bug, enhancement, general, testimonial"
        text description
        text suggested_fix "required for bugs"
        int status "1 visible, 0 hidden"
        timestamptz created_at
    }
    ADMIN_REPLIES {
        uuid id PK
        uuid feedback_id FK
        text reply
        int status "1 active, 0 deleted"
        timestamptz created_at
    }
    ANALYTICS_EVENTS {
        bigint id PK
        text event "page_view or search"
        jsonb meta "route_count"
        timestamptz created_at
    }
    FEEDBACK ||--o{ ADMIN_REPLIES : "has"
```

### Database Schema Overview

| Table | Purpose | Written by |
|---|---|---|
| `feedback` | Bug reports, enhancement ideas, general comments and testimonials | Anyone, via the feedback widget |
| `admin_replies` | Developer replies shown on the public wall (soft delete with `status`) | Admin dashboard |
| `analytics_events` | Anonymous `page_view` and `search` events for the 7-day chart | Home page (skipped for admin) |

---

## 🔌 API Structure

### API Overview

```mermaid
mindmap
  root((RedahLuhh API))
    meta
      GET /health
      GET /api/provider-status
    weather-route
      POST /api/route-weather
    debug
      GET /api/debug-weather
    docs
      /docs Swagger UI
      /redoc
```

### Endpoint Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check, used for the status dot and cold-start notice |
| `GET` | `/api/provider-status` | Active weather provider + per-provider quota-exhausted flags |
| `POST` | `/api/route-weather` | Main endpoint: `{ origin, destination, departure_time? }` → weather for all routes, ranked. Limited to 30 requests/min per IP |
| `GET` | `/api/debug-weather?lat=&lon=` | Developer helper that calls WeatherAPI for one coordinate |

### Request/Response Flow

```mermaid
sequenceDiagram
    participant FE as Frontend
    participant MW as CORS + slowapi
    participant API as route-weather handler
    participant GR as Google Routes
    participant MET as MET Malaysia
    participant WC as Weather cascade

    FE->>MW: POST /api/route-weather
    MW->>API: Validated request
    par Fetch together
        API->>GR: computeRoutes, alternatives on
        API->>MET: GET /weather/warning
    end
    GR-->>API: 1 to 3 encoded polylines
    MET-->>API: Warnings, keep only still-valid ones
    loop Each route, concurrently
        API->>API: Decode polyline, sample 3 to 7 waypoints with ETAs
        API->>WC: Weather per waypoint at its ETA
        WC-->>API: WeatherCondition
        API->>API: Overall status, alerts, weather score
    end
    API->>API: Sort by score then duration, assign labels
    API-->>FE: MultiRouteWeatherResponse
```

---

## 🧩 Frontend Components

### Component Tree

```mermaid
graph TD
    Root["layout.tsx<br/>metadata · FeedbackWidget · AnalyticsTracker"]
    Root --> Home["page.tsx<br/>APIProvider + Home"]
    Root --> FBP["feedback/page.tsx"]
    Root --> ADP["admin/page.tsx"]
    Root --> CLP["changelog/page.tsx"]
    Home --> RF["RouteForm<br/>PlaceInput · departure picker"]
    Home --> RC["RouteChip"]
    Home --> WM["WeatherMap<br/>dynamic import, no SSR"]
    Home --> WSU["WeatherSummary"]
    Home --> MC["MiniCard"]
    WM --> CR["ColoredRoute"]
    WM --> EM["EmojiMarker"]
    WM --> GD["GpsDot + MapController"]
    WSU --> WCD["WeatherCard"]
    ADP --> AN["AnalyticsSection"]
    ADP --> DB["Dashboard"]
```

### Key Components

| Component | Purpose |
|---|---|
| `RouteForm` | Origin/destination inputs with Places Autocomplete, use-my-location, swap, and the Leave now / Depart at picker |
| `WeatherMap` | Google vector map with section-coloured polylines, emoji waypoint markers, legend, and Go Now mode (GPS follow, wake lock, 15-min refresh) |
| `WeatherSummary` | MET warnings, worst-condition banner, stat tiles, status timeline, waypoint cards, refresh button |
| `WeatherCard` | Weather details for one waypoint: temperature, condition, rain %, wind, humidity, feels-like, ETA |
| `FeedbackWidget` | Floating button + modal that writes to the Supabase `feedback` table |
| `AnalyticsTracker` | Logs one anonymous `page_view` per visit (skipped for admin) |
| `useRouteWeather` | Search state, selected route, refresh, `search` analytics event |
| `useBackendHealth` | Pings `/health` with a 35 s timeout to cover Render cold starts |

---

## ⚙️ Feature-specific Flows

### Weather Cascade Flow

```mermaid
flowchart TD
    A([Waypoint + ETA]) --> X{"XWeather key set<br/>and quota OK?"}
    X -->|Yes| X1["XWeather road weather"]
    X -->|No| M{"Meteoblue key set<br/>and quota OK?"}
    X1 -->|OK| Z([WeatherCondition])
    X1 -->|"429/403 or error"| M
    M -->|Yes| M1["Meteoblue basic-1h"]
    M -->|No| T{"Tomorrow.io key set<br/>and quota OK?"}
    M1 -->|OK| Z
    M1 -->|429 or error| T
    T -->|Yes| T1["Tomorrow.io<br/>realtime for start and end,<br/>hourly forecast in between"]
    T -->|No| O["Open-Meteo<br/>free, no key"]
    T1 -->|OK| Z
    T1 -->|429 or error| O
    O -->|OK| Z
    O -->|error| W["WeatherAPI.com"]
    W -->|OK| Z
    W -->|error| F(["Fallback: Weather data unavailable"])
```

> Quota hits set module-level "exhausted" flags. `/api/provider-status` exposes these flags so the UI can show toasts and the active provider in the footer.

### Status Classification

```mermaid
flowchart LR
    A["Any provider reading<br/>shared reality check"] --> B{"Rain at least 2 mm?"}
    B -->|Yes| R["🔴 red<br/>Rain / Heavy Rain"]
    B -->|No| C{"Rain at least 1 mm,<br/>or 0.5 mm with 40% chance?"}
    C -->|Yes| Y1["🟡 yellow<br/>Light Rain"]
    C -->|No| D{"Cloud cover at least 50%?"}
    D -->|Yes| Y2["🟡 yellow<br/>Cloudy / Overcast"]
    D -->|No| G["🟢 green<br/>Clear / Partly Cloudy"]
```

### Route Ranking Flow

```mermaid
flowchart TD
    A([1 to 3 routes]) --> B["Sample waypoints<br/>3 to 7, scaled by polyline length"]
    B --> C["Weather per waypoint"]
    C --> D["Score: green 0, yellow 1, red 3"]
    D --> E["Sort by score, then duration"]
    E --> F{"Rank 0 is also fastest,<br/>or only one route?"}
    F -->|Yes| G["Recommended"]
    F -->|No| H["Rank 0: Driest Route"]
    E --> I["Fastest Route label"]
    E --> J["Others: Alternative N"]
```

### Go Now Navigation Flow

```mermaid
sequenceDiagram
    participant R as Rider
    participant FE as WeatherMap
    participant GPS as Geolocation API
    participant WL as Wake Lock API
    participant API as Backend

    R->>FE: Tap Go Now
    FE->>FE: Container goes fixed full-screen, map stays mounted
    FE->>WL: request screen lock
    FE->>GPS: watchPosition, high accuracy
    GPS-->>FE: Position updates
    FE-->>R: Bike marker, map follows at zoom 16
    loop Every 15 minutes
        FE->>API: POST /api/route-weather again
        API-->>FE: Fresh conditions
        FE-->>R: Updated just now
    end
    R->>FE: Tap Stop
    FE->>WL: release
    FE->>GPS: clearWatch, stop timers
    Note over FE,WL: Hiding the tab also releases the wake lock
```

### Feedback Loop

```mermaid
sequenceDiagram
    participant U as Rider
    participant W as FeedbackWidget
    participant SB as Supabase
    participant A as Admin
    participant P as /feedback wall

    U->>W: Pick category, write message
    W->>SB: insert feedback, status 1
    A->>SB: Read feedback + replies
    A->>SB: insert admin_replies or toggle status
    P->>SB: select feedback where status = 1, with replies
    SB-->>P: Visible feedback + dev replies
```

---

## ☁️ Deployment

```mermaid
graph LR
    GH["GitHub repo"] --> V["Vercel<br/>Next.js frontend"]
    GH --> RD["Render<br/>FastAPI backend"]
    V --> SB[("Supabase")]
    V --> RD
    RD --> EXT["Google Routes · weather APIs · MET Malaysia"]
```

| Service | Platform | Notes |
|---|---|---|
| Frontend | Vercel | [redahluhh.vercel.app](https://redahluhh.vercel.app/) |
| Backend | Render | Free tier, so expect a ~30 s cold start (the UI shows a warm-up notice) |
| Data / Auth | Supabase | Feedback, analytics and admin login |

---

## 📁 Project Structure

```
RedahLuhh/
├── docker-compose.yml          backend :8000 + frontend :3000
│
├── backend/
│   ├── Dockerfile              python:3.12-slim + uvicorn
│   ├── requirements.txt
│   └── app/
│       ├── main.py             FastAPI app, CORS, slowapi, /health
│       ├── config.py           pydantic-settings (API keys, CORS origins)
│       ├── models/schemas.py   Request / response models + validation
│       ├── routers/
│       │   └── weather_route.py   route-weather, provider-status, debug
│       └── services/
│           ├── maps_service.py        Routes API, haversine, waypoint sampler
│           ├── weather_service.py     5-provider cascade + classifiers
│           └── met_malaysia_service.py  Warnings + district forecast
│
└── frontend/
    ├── Dockerfile
    └── src/
        ├── app/
        │   ├── page.tsx        Main app
        │   ├── layout.tsx      SEO metadata, widgets
        │   ├── feedback/       Community wall
        │   ├── admin/          Analytics + moderation
        │   ├── changelog/      Release notes
        │   ├── icons/[size]/   Edge-generated PWA icons
        │   ├── manifest.ts · robots.ts · sitemap.ts
        ├── components/         RouteForm, WeatherMap, WeatherSummary,
        │                       WeatherCard, FeedbackWidget, AnalyticsTracker
        ├── hooks/              useRouteWeather, useBackendHealth
        └── lib/                api.ts, supabase.ts, types.ts
```

---

## 🗺 Roadmap

- [x] Weather along the entire route, not just the destination (v0.1.0)
- [x] Google Routes API for Malaysian routing (v0.1.0)
- [x] Multi-route comparison with weather scoring (v0.2.0)
- [x] Colour-coded polyline + emoji waypoint markers (v0.2.0)
- [x] Departure time scheduler + hourly forecasts (v0.2.0)
- [x] 5-provider weather cascade with automatic fallback (v0.3.0)
- [x] MET Malaysia official warnings (v0.3.0)
- [x] Go Now full-screen GPS mode + screen wake lock (v0.3.0)
- [x] Day/night map theme + auto-detect location (v0.3.0)
- [x] Feedback wall + admin dashboard on Supabase (v0.3.0)
- [ ] Wire MET Malaysia district forecasts into the cascade
- [ ] Only show warnings relevant to the route (skip marine/shipping ones)
- [ ] Saved / favourite routes
- [ ] Avoid tolls / route preferences
- [ ] Push notifications for mid-ride weather changes
- [ ] Offline mode with a service worker

---

## 📄 License

No license file has been published yet, so all rights are reserved. © 2025 Siti Nursyaqirah · Source on [GitHub](https://github.com/snsyaqirah/RedahLuhh)
