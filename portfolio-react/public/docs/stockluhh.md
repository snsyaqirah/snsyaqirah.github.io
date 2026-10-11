# 📦 StockLuhh

> A smart household inventory tracker: low-stock alerts, expiry reminders, an auto-built shopping list, travel packing kits and spending analytics, all in RM.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F)
![Neon](https://img.shields.io/badge/Postgres-Neon-00E599)
![PWA](https://img.shields.io/badge/PWA-installable-5A0FC8)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [User Flow](#-user-flow)
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

StockLuhh is a personal stock manager for the stuff you keep at home: toiletries, skincare, groceries, cleaning supplies, medicine and so on. It answers the everyday questions: *"Ada lagi tak shampoo?"*, *"Apa yang dah nak expired?"* and *"What do I need to buy this weekend?"*

Each item tracks its quantity, low-stock threshold, price, purchase/opened/expiry dates and a usage history. From those, the app works out:

- a **shopping list** of everything running low or finished,
- an **expiry tracker** that sorts items into expired / this week / within 30 days,
- **smart suggestions**: rule-based nudges such as "you'll finish this in ~4 days" or "this expires in 2 days",
- **travel kits** generated from items you've marked as travel essentials,
- **analytics**: a monthly report, a waste-based "health score" and spending by category.

The project started as **Stockee**, a Vite + React SPA. It was later migrated to **Next.js App Router** with **Route Handlers** as the API and **Drizzle ORM on Neon Postgres** for storage, and renamed StockLuhh.

**Type:** `Solo`
**Brand:** `Luhh Series`
**Built with:** Independent

---

## ✨ Features

- ✅ Dashboard with stat cards: total items/units, low stock, expiring within 30 days, inventory value (RM)
- ✅ Smart Suggestions: usage prediction, low stock, expiring within 14 days, and same-category substitutes when an item is finished
- ✅ Inventory CRUD with search and a 10-category filter (toiletries, skincare, haircare, dental, cleaning, grocery, snacks, beverages, medicine, other)
- ✅ Inline `+` / `−` quantity stepper that sets the status for you (`new` → `in-use` → `low` → `finished`)
- ✅ One-tap usage logging (**Used Once / Half / Finished**) that writes to the item's usage history and recalculates average lifespan
- ✅ Undo for the last edit or delete (keeps up to 10 entries, best effort)
- ✅ Shopping list built from low and finished items, with a check-off progress bar, estimated total (RM) and batch restock
- ✅ Expiry tracker grouped as Expired / Expiring This Week / Coming Up, with Discard and Used actions
- ✅ Travel Mode: mark travel essentials, auto-generate a kit from essentials that are in stock, tick items off as you pack
- ✅ Wishlist with priority, estimated price, star rating and notes; **Buy** moves the item into inventory
- ✅ Analytics: monthly report (bought / used / expired / health score), status pie chart, category spending donut and bar chart
- ✅ Neumorphic design system with a light/dark theme toggle
- ✅ Mobile-first shell: bottom nav, a "More" menu, and a floating action button with long-press quick actions
- ✅ Installable PWA manifest with Add Item and Shopping List shortcuts, plus an offline-status banner
- 🚧 Simple / Smart / Power **app modes**: the selector saves to localStorage, but pages aren't gated yet and the auto-upgrade logic is never called
- 🚧 Shopping list **Share** button *(UI only, no handler)*
- 🚧 FAB and manifest "Add Item" shortcut go to `/inventory?action=add`, but the page doesn't read the param yet
- 🚧 Offline caching: the old Vite build had a service worker; the Next.js build has none yet (`offline.html` exists but isn't wired up)
- 🚧 Cross-category substitution groups (`smart-substitutions.ts`) are written but not used in the UI
- 💡 User accounts and per-household inventories *(right now everyone shares one inventory)*
- 💡 Household sharing between family members
- 💡 Proper history/versioning instead of best-effort undo

---

## 🛠 Tech Stack

```mermaid
graph TD
    subgraph Client ["Client (Browser / PWA)"]
        UI["React 19 + TypeScript<br/>Tailwind CSS + shadcn/ui (Radix)"]
        RQ["TanStack Query<br/>fetch + cache + invalidation"]
        CH["Recharts · date-fns<br/>lucide-react · next-themes"]
    end
    subgraph Server ["Next.js 16 App Router"]
        RH["Route Handlers<br/>/api/*"]
        ORM["Drizzle ORM<br/>neon-http driver"]
    end
    subgraph Data ["Data"]
        DB[("Neon Postgres<br/>serverless")]
    end
    UI --> RQ
    RQ -->|JSON over HTTP| RH
    RH --> ORM
    ORM --> DB
```

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| API | Next.js Route Handlers (`app/api/**/route.ts`) |
| ORM | Drizzle ORM 0.45 + drizzle-kit (`db:push`, `db:generate`, `db:studio`) |
| Database | Neon serverless Postgres (`@neondatabase/serverless`, `drizzle-orm/neon-http`) |
| Client data | TanStack React Query v5 (5-min stale time, invalidation on mutation) |
| UI | Tailwind CSS 3 + shadcn/ui (Radix primitives), custom neumorphic shadows |
| Charts | Recharts (pie, donut, horizontal bar) |
| Dates | date-fns |
| Theming | next-themes (light / dark) |
| Toasts | shadcn toast + Sonner |
| PWA | `app/manifest.ts` (installable, shortcuts) |
| Hosting | Vercel |

---

## 📌 Architecture

### High-level Architecture

```mermaid
graph LR
    U["User<br/>(mobile / desktop)"] --> APP["Next.js App<br/>(client pages)"]
    APP -->|"fetch /api/*"| API["Route Handlers"]
    API -->|Drizzle| DB[("Neon Postgres")]
    APP -.->|preferences only| LS[("localStorage")]
```

All inventory data lives in Postgres. `localStorage` only holds client preferences such as the app mode and theme.

### System Architecture

```mermaid
graph TD
    subgraph Pages ["app/ (client components)"]
        P1["Dashboard · Inventory · Shopping<br/>Expiry · Travel · Wishlist · Analytics"]
    end
    subgraph Hook ["hooks/useInventory"]
        Q["useQuery: items · wishlist · travel-kits"]
        M["useMutation: add / update / batch / usage / delete ..."]
        D["Derived selectors<br/>lowStock · expiring · expired · stats · spendingByCategory"]
    end
    subgraph Lib ["lib/"]
        SS["smart-suggestions.ts"]
        FM["formatters.ts"]
    end
    subgraph API ["app/api (Route Handlers)"]
        R1["items"]
        R2["wishlist"]
        R3["travel-kits"]
    end
    Pages --> Hook
    Pages --> Lib
    Q --> API
    M --> API
    API --> DRZ["lib/db (Drizzle + schema)"]
    DRZ --> PG[("Postgres")]
```

Everything goes through a single hook, `useInventory`. It runs three queries, exposes the mutations, and computes the derived lists (low stock, expiring, travel essentials, stats) with `useMemo`. Every page reads from the same React Query cache, so a mutation followed by an invalidation updates the whole app.

---

## 👤 User Flow

```mermaid
flowchart TD
    A([Open StockLuhh]) --> B[Dashboard]
    B --> C{What do I need?}
    C -->|Add / update stock| D[Inventory]
    C -->|Going shopping| E[Shopping List]
    C -->|Check freshness| F[Expiry Tracker]
    C -->|Packing for a trip| G[Travel Mode]
    C -->|Want to try something| H[Wishlist]
    C -->|How am I doing?| I[Analytics]
    D -->|Log usage / adjust qty| D
    D -->|qty at or below min| E
    E -->|Restock selected| D
    H -->|Buy| D
    F -->|Discard / Used| D
```

### Page Map

```mermaid
graph TD
    ROOT["/ Dashboard"]
    INV["/inventory"]
    SHOP["/shopping"]
    EXP["/expiry"]
    TRV["/travel"]
    WISH["/wishlist"]
    ANA["/analytics"]
    ROOT --> INV
    ROOT --> SHOP
    ROOT --> EXP
    ROOT --> TRV
    ROOT --> WISH
    ROOT --> ANA

    subgraph Mobile ["📱 Bottom Nav"]
        BN["Home · Items · Shop · Expiry · Stats · More"]
    end
    subgraph Desktop ["🖥️ Header Nav"]
        HN["Dashboard · Inventory · Shopping · Expiry · Travel · Wishlist · Analytics"]
    end
```

> 🔓 **No auth yet.** There are no login or protected routes; everyone who opens a deployment shares one inventory. Accounts and household sharing are on the roadmap.

---

## 🗄️ Database (ERD)

```mermaid
erDiagram
    items {
        uuid id PK
        text name
        text brand
        item_category category
        real quantity
        real min_quantity
        item_status status
        text size
        real price
        text purchase_date
        text opened_date
        text expiry_date
        text notes
        text image_url
        boolean is_travel_essential
        real travel_quantity
        jsonb usage_history
        real average_lifespan_days
        timestamptz created_at
        timestamptz updated_at
    }
    wishlist_items {
        uuid id PK
        text name
        text brand
        item_category category
        real estimated_price
        priority priority
        text notes
        text added_date
        text product_url
        integer rating
        timestamptz created_at
    }
    travel_kits {
        uuid id PK
        text name
        text destination
        text trip_date
        text created_date
        jsonb items
        timestamptz created_at
    }
    travel_kits }o--o{ items : "items[].itemId (jsonb ref)"
    wishlist_items |o--o| items : "Buy creates item"
```

### Enums

| Enum | Values |
|---|---|
| `item_category` | toiletries, skincare, haircare, dental, cleaning, grocery, snacks, beverages, medicine, other |
| `item_status` | new, in-use, low, finished |
| `priority` | low, medium, high |

### JSONB shapes

| Column | Shape |
|---|---|
| `items.usage_history` | `UsageRecord[]`: `{ id, action: once / half / daily / finished / opened / restocked, date, quantityUsed? }` |
| `travel_kits.items` | `TravelKitItem[]`: `{ itemId, itemName, category, quantity, packed }` |

> Dates such as `purchase_date` and `expiry_date` are stored as ISO `YYYY-MM-DD` text. Travel kit items are a denormalised JSONB snapshot rather than a join table, which keeps toggling "packed" to a single-row update.

---

## 🔌 API Structure

### API Overview

```mermaid
mindmap
  root((api))
    items
      GET list
      POST create
      PATCH :id update
      DELETE :id
      POST :id/usage
      PATCH batch
    wishlist
      GET list
      POST create
      PATCH :id update
      DELETE :id
      POST :id/purchase
    travel-kits
      GET list
      POST create
      POST generate
      PATCH :id update
      DELETE :id
      PATCH :id/items/:itemId/toggle
```

| Method | Route | What it does |
|---|---|---|
| `GET` | `/api/items` | List all items (newest first) |
| `POST` | `/api/items` | Create an item |
| `PATCH` | `/api/items/:id` | Partial update (bumps `updated_at`) |
| `DELETE` | `/api/items/:id` | Delete an item |
| `POST` | `/api/items/:id/usage` | Log usage `{ type: once / half / daily / finished }`, recalculate qty, status and average lifespan |
| `PATCH` | `/api/items/batch` | Apply `[{ id, changes }]` in parallel (used by Restock Selected) |
| `GET` / `POST` | `/api/wishlist` | List / add wishlist items |
| `PATCH` / `DELETE` | `/api/wishlist/:id` | Update / remove a wishlist item |
| `POST` | `/api/wishlist/:id/purchase` | Insert as an inventory item (qty 1, status `new`) and delete from the wishlist |
| `GET` / `POST` | `/api/travel-kits` | List / create kits |
| `POST` | `/api/travel-kits/generate` | Build a kit from every travel essential with `quantity > 0` |
| `PATCH` / `DELETE` | `/api/travel-kits/:id` | Update / delete a kit |
| `PATCH` | `/api/travel-kits/:id/items/:itemId/toggle` | Flip `packed` on one kit item |

### Request/Response Flow

```mermaid
sequenceDiagram
    participant UI as Page component
    participant H as useInventory (React Query)
    participant RH as Route Handler
    participant DB as Neon Postgres

    UI->>H: logUsage(id, "once")
    H->>RH: POST /api/items/:id/usage
    RH->>DB: SELECT item
    RH->>RH: append UsageRecord, qty - 1, recalc status + lifespan
    RH->>DB: UPDATE items ... RETURNING
    RH-->>H: updated item (JSON)
    H->>H: invalidateQueries(["items"])
    H-->>UI: toast "Used once" + fresh data everywhere
```

---

## 🧩 Frontend Components

### Component Tree

```mermaid
graph TD
    L["RootLayout"] --> PR["Providers<br/>ErrorBoundary · ThemeProvider · QueryClient · Toasters"]
    PR --> SH["AppShell"]
    SH --> HD["Header<br/>desktop nav · mode selector · theme toggle"]
    SH --> OB["OfflineBanner / UpdateBanner"]
    SH --> MAIN["Page content"]
    SH --> BN["BottomNav (mobile)"]
    SH --> FAB["FAB (mobile, long-press menu)"]
    SH --> IB["InstallBanner"]

    MAIN --> DSH["Dashboard"]
    DSH --> SC["StatCard x4"]
    DSH --> SSG["SmartSuggestions"]
    DSH --> QA["QuickActions"]
    DSH --> SPC["SpendingChart"]
    DSH --> RI["RecentItems"]

    MAIN --> INVP["Inventory"]
    INVP --> CF["CategoryFilter"]
    INVP --> IC["ItemCard"]
    INVP --> AID["AddItemDialog"]
    INVP --> EID["EditItemDialog"]
    INVP --> DCD["DeleteConfirmDialog"]

    MAIN --> ANP["Analytics"]
    ANP --> MR["MonthlyStockReport"]
    ANP --> SPC
```

### Key Components & Hooks

| Component / Hook | Purpose |
|---|---|
| `useInventory` | Single source of truth: queries, mutations, undo stack, derived selectors |
| `ItemCard` | Item tile with status badges, qty stepper, usage buttons, expiry highlight, actions menu |
| `AddItemDialog` / `EditItemDialog` | Item forms (category, status, qty, low-stock alert, size, price, expiry, notes, travel essential) |
| `SmartSuggestions` | Shows the top 3 rule-based suggestions, each dismissible |
| `MonthlyStockReport` | 30-day summary: bought, used, expired waste and health score |
| `SpendingChart` | Recharts donut of inventory value by category |
| `StatusBadge` / `CategoryIcon` | Colour-coded status pills and category icons |
| `FAB` | Mobile floating button: tap to add, long-press for Shopping / Travel / Expiry |
| `useUserPreferences` | Simple / Smart / Power mode in localStorage (gating not wired yet) |
| `useOnlineStatus` / `usePWA` | Offline banner, install prompt, update detection |

---

## ⚙️ Feature-specific Flows

### Usage Logging & Status Logic

```mermaid
flowchart TD
    A([Tap usage button]) --> B{type}
    B -->|finished| C["qty = 0<br/>status = finished"]
    B -->|half| D["qty = qty - 0.5"]
    B -->|once| E["qty = qty - 1"]
    B -->|daily| F["log only<br/>qty unchanged"]
    D --> G{"qty at or below min?"}
    E --> H{"qty = 0?"}
    H -->|Yes| C
    H -->|No| G
    G -->|Yes| I["status = low"]
    G -->|No| J["status unchanged"]
    C --> K["Append UsageRecord to usage_history"]
    I --> K
    J --> K
    F --> K
    K --> L{"2+ records and opened_date?"}
    L -->|Yes| M["Recalculate average_lifespan_days"]
    L -->|No| N([Save])
    M --> N
```

### Smart Suggestions Engine

```mermaid
flowchart LR
    I["All items"] --> R1{"in-use + lifespan + opened?"}
    R1 -->|"ends in 0-10 days"| S1["🔮 Usage prediction (medium)"]
    R1 -->|"already overdue"| S1b["🔮 Have you restocked? (low)"]
    I --> R2{"qty at or below min<br/>and not finished?"}
    R2 -->|Yes| S2["🛒 Running low (high)"]
    I --> R3{"expires in 1-14 days?"}
    R3 -->|Yes| S3["⏰ Expiring (high)"]
    I --> R4{"finished?"}
    R4 -->|"same-category stock exists"| S4["🔁 Use this instead (low)"]
    S1 --> SORT["Sort by priority, show top 3"]
    S1b --> SORT
    S2 --> SORT
    S3 --> SORT
    S4 --> SORT
```

### Shopping List → Restock

```mermaid
sequenceDiagram
    participant U as User
    participant SL as Shopping page
    participant API as /api/items/batch
    participant DB as Postgres

    SL->>SL: lowStockItems = status low or finished
    U->>SL: Tick items while shopping
    SL->>SL: Estimated total = sum of unchecked prices
    U->>SL: Restock Selected, then Confirm Purchase
    SL->>API: PATCH [{ id, changes: { qty + 1, status: new, purchaseDate: today } }]
    API->>DB: UPDATE each item in parallel
    API-->>SL: updated rows
    SL-->>U: Toast "N items updated", list refreshes
```

### Travel Kit Generation

```mermaid
flowchart TD
    A([New Trip: name, destination, date]) --> B["POST /api/travel-kits/generate"]
    B --> C["SELECT items WHERE is_travel_essential AND quantity > 0"]
    C --> D["Map to TravelKitItem<br/>qty = travel_quantity or 1, packed = false"]
    D --> E["INSERT travel_kits with jsonb items"]
    E --> F([Kit card with packing progress])
    F --> G["Tap item → PATCH .../toggle"]
    G --> F
```

### Expiry Buckets

| Bucket | Rule | Actions |
|---|---|---|
| 🔴 Expired | `expiry_date < today` | Discard (delete) · Used (qty 0, finished) |
| 🟠 Expiring This Week | 0–7 days left | Item card with "N days left" badge |
| 🟢 Coming Up | 8–30 days left | Item card |

### Monthly Report & Health Score

| Metric | How it's computed |
|---|---|
| Items Bought | Items with `purchase_date` in the last 30 days (and their RM spend) |
| Items Used | Items with status `finished` |
| Expired | Items past `expiry_date`, with their price counted as waste |
| Health Score | `100 − (waste ÷ total inventory value × 100)`, clamped to 0–100 |

---

## ☁️ Deployment

| Service | Platform | Purpose |
|---|---|---|
| App + API | Vercel | Next.js pages and Route Handlers |
| Database | Neon | Serverless Postgres (HTTP driver) |

Live: [stockluhh-six.vercel.app](https://stockluhh-six.vercel.app)

---

## 📁 Project Structure

```
StockLuhh/
├── app/
│   ├── layout.tsx            Root layout, metadata, viewport
│   ├── providers.tsx         React Query, theme, toasts, error boundary
│   ├── manifest.ts           PWA manifest + shortcuts
│   ├── page.tsx              Dashboard
│   ├── inventory/            Inventory page
│   ├── shopping/             Shopping list
│   ├── expiry/               Expiry tracker
│   ├── travel/               Travel mode
│   ├── wishlist/             Wishlist
│   ├── analytics/            Analytics
│   └── api/
│       ├── items/            route.ts · [id]/ · [id]/usage/ · batch/
│       ├── wishlist/         route.ts · [id]/ · [id]/purchase/
│       └── travel-kits/      route.ts · [id]/ · generate/ · [id]/items/[itemId]/toggle/
├── components/
│   ├── dashboard/            StatCard, SmartSuggestions, QuickActions, RecentItems, MonthlyReport
│   ├── inventory/            ItemCard, Add/Edit/Delete dialogs, CategoryFilter, StatusBadge
│   ├── charts/               SpendingChart
│   ├── layout/               AppShell, Header, BottomNav
│   ├── common/               FAB, banners, ErrorBoundary, EmptyState, Loading
│   └── ui/                   shadcn/ui primitives
├── hooks/                    useInventory, useUserPreferences, usePWA, useOnlineStatus ...
├── lib/
│   ├── db/                   schema.ts, index.ts (Drizzle client), seed.ts
│   ├── smart-suggestions.ts  Rule-based suggestion engine
│   ├── smart-substitutions.ts
│   ├── formatters.ts         Dates (ms-MY), RM currency, days-until helpers
│   └── constants.ts          App config, nav items, default settings
├── types/                    InventoryItem, WishlistItem, TravelKit, categories
└── drizzle.config.ts
```

---

## 🗺 Roadmap

- [x] Inventory CRUD with categories, search and status auto-calculation
- [x] Usage logging with history and lifespan estimate
- [x] Auto shopping list + batch restock
- [x] Expiry tracker (expired / 7-day / 30-day)
- [x] Travel essentials + generated packing kits
- [x] Wishlist → inventory "Buy" flow
- [x] Analytics + monthly report + health score
- [x] Rule-based smart suggestions
- [x] Migration from Vite SPA (Stockee) to Next.js + Drizzle + Neon
- [ ] Wire up Simple / Smart / Power mode gating and auto-upgrade
- [ ] `?action=add` deep link (FAB + PWA shortcut opens Add Item)
- [ ] Shopping list sharing
- [ ] Service worker / offline caching on Next.js
- [ ] User accounts + per-household inventories
- [ ] Household sharing between family members
- [ ] Proper change history instead of best-effort undo

---

## 📄 License

No license file yet. © 2025–2026 Siti Nursyaqirah. All rights reserved.
