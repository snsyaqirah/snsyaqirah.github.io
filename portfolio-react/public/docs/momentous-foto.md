# 📸 momentous-foto

> Photography portfolio and booking inquiry site for a Malaysian wedding and lifestyle photographer.

![Status](https://img.shields.io/badge/status-live-brightgreen)
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
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧭 Overview

momentous-foto is the main portfolio and inquiry site for Momentous Foto, a Malaysian photography brand specialising in weddings, pre-weddings, maternity, convocations, and events. It showcases featured client work across dynamic gallery pages and routes booking inquiries directly through WhatsApp.

**Type:** `Collaborative`
**Brand:** `Momentous Foto`
**Built with:** Independent

---

## ✨ Features

- ✅ Featured client portfolio grid (10 clients, config-driven)
- ✅ Dynamic client gallery pages (`/client/[slug]`)
- ✅ Service catalogue with 5 photography services
- ✅ Dynamic service detail pages (`/services/[slug]`)
- ✅ Booking inquiry form with WhatsApp integration
- ✅ SEO-optimised with JSON-LD schema (Organisation + Website)
- ✅ Image lazy loading and optimisation with Sharp
- ✅ Mobile-responsive layout
- 💡 Admin panel for managing featured clients *(planned)*
- 💡 Online availability calendar *(planned)*

---

## 🛠 Tech Stack

```mermaid
graph TD
    subgraph Frontend
        FE["Next.js 15 · App Router"]
        UI["Tailwind CSS 3"]
        IMG["next/image · Sharp"]
    end
    subgraph Infrastructure
        HOST["GitHub Pages\n(static export)"]
        WA["WhatsApp Web\n(booking inquiries)"]
    end
    FE --> HOST
    FE --> WA
```

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Images | next/image + Sharp |
| Hosting | GitHub Pages (static export) |
| Booking | WhatsApp Web (client-side redirect) |

---

## 📌 Architecture

### High-level Architecture

```mermaid
graph TD
    A[Visitor / Browser] --> B["Next.js Static Site\nGitHub Pages"]
    B --> C["featured-clients.json\n(portfolio config)"]
    B --> D["/public/images\n(client + service photos)"]
    B --> E["WhatsApp Web\n(booking inquiries)"]
```

### System Architecture

```mermaid
graph TD
    subgraph Frontend ["Next.js App Router"]
        P[Pages] --> C[Components]
        P --> CFG["featured-clients.json"]
        P --> FS["/public/images filesystem"]
    end
    subgraph Static ["Static Assets"]
        IMG[Client Images]
        SVC[Service Images]
    end
    C --> Static
    P --> WA["WhatsApp Web\n(contact redirect)"]
```

---

## 👤 User Flow

```mermaid
flowchart TD
    A([Visit Site]) --> B["Home · Portfolio Grid"]
    B --> C{Intent}
    C -->|Browse work| D["/client/[slug]\nClient gallery"]
    C -->|Learn services| E["/services\nService catalogue"]
    C -->|Inquire / Book| F["/contact\nBooking inquiry form"]
    E --> G["/services/[slug]\nService detail"]
    G --> F
    D --> F
    F --> H[Fill inquiry form]
    H --> I[Opens WhatsApp\nwith pre-filled message]
    I --> J([Booking discussed via WhatsApp])
```

### Page Map

```mermaid
graph TD
    subgraph Public ["🌐 All Public Routes"]
        ROOT["/"]
        ABOUT["/about"]
        SERVICES["/services"]
        SVC_SLUG["/services/[slug]"]
        CLIENT["/client/[slug]"]
        CONTACT["/contact"]
    end

    ROOT --> ABOUT
    ROOT --> SERVICES
    ROOT --> CONTACT
    ROOT --> CLIENT
    SERVICES --> SVC_SLUG
    SVC_SLUG --> CONTACT

    style Public fill:#e8f5e9,stroke:#4caf50
```

---

## 🧩 Frontend Components

### Component Tree

```mermaid
graph TD
    App[RootLayout] --> Header
    App --> Page
    App --> Footer
    Page --> Home["Home\n10-client portfolio grid"]
    Page --> About["About\nPhotographer story"]
    Page --> Services["Services\n5 service cards"]
    Page --> SvcDetail["Services/[slug]\nService detail"]
    Page --> ClientGallery["Client/[slug]\nPhoto gallery"]
    Page --> Contact["Contact\nInquiry form + WhatsApp"]
    App --> LoadingScreen["LoadingScreen\nSuspense fallback"]
```

### Key Components

| Component | Purpose |
|---|---|
| `Header` | Fixed navigation with logo, mobile menu, Instagram & Threads links |
| `Footer` | Site footer |
| `LoadingScreen` | Suspense fallback loading UI |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>=18`

### Installation

```bash
git clone https://github.com/momentous-foto/momentous-foto.github.io.git
cd momentous-foto.github.io/momentous-foto
npm install
```

### Running locally

```bash
# Development
npm run dev

# Production build
npm run build
```

---

## 🔑 Environment Variables

This project is a static export — no server-side environment variables are required.

---

## ☁️ Deployment

| Service | Purpose |
|---|---|
| GitHub Pages | Static site hosting |

```mermaid
graph LR
    GitHub -->|push to main| Build["npm run build\n(next export)"]
    Build --> OUT["/out directory"]
    OUT --> GHP["GitHub Pages\nhttps://momentous-foto.github.io"]
```

Built with `output: 'export'` in `next.config.ts`. The `/out` directory is deployed to GitHub Pages.

---

## 📁 Project Structure

```
momentous-foto/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── client/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── LoadingScreen.tsx
├── config/
│   └── featured-clients.json
├── public/
│   └── images/
│       ├── clients/          ← client photo folders (keyed by slug)
│       └── services/         ← service images
├── next.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🗺 Roadmap

- [x] Portfolio grid with 10 featured clients
- [x] Dynamic client gallery pages
- [x] Service catalogue with 5 service types
- [x] Dynamic service detail pages
- [x] Booking inquiry form with WhatsApp redirect
- [x] SEO with JSON-LD schema
- [x] Image lazy loading + Sharp optimisation
- [ ] Admin panel for managing featured clients
- [ ] Online availability calendar

---

## 📄 License

MIT © 2026 Momentous Foto
