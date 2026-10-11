# 🍛 KenduriLuhh

> AI-powered multi-agent system for smart catering operations. Seven AI agents with kampung personas negotiate a menu, price it at Pasar Borong rates, audit the budget, plan the logistics and hand you a quotation or shopping list.

![Status](https://img.shields.io/badge/status-hackathon%20build-orange)
![Award](https://img.shields.io/badge/Code%3B%20Without%20Barriers%202026-2nd%20place-gold)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)
![Stack](https://img.shields.io/badge/stack-AutoGen%20%2B%20FastAPI%20%2B%20React-0f4c45)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [User Flow](#-user-flow)
- [Session Lifecycle](#-session-lifecycle)
- [Data Model](#-data-model)
- [API Structure](#-api-structure)
- [Frontend Components](#-frontend-components)
- [Feature Flows](#-feature-specific-flows)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🧭 Overview

KenduriLuhh takes a few event details (event type, pax, budget, date, venue, dietary notes) and has a team of AI agents plan the whole kenduri. Each agent has its own role and persona. **Tok Penghulu** chairs the meeting, **Mak Tok** plans the menu, **Tokey Pasar** prices ingredients at wholesale rates, **Bendahari** audits the budget and can reject it, **Abang Lorry** plans the T-3 to T-0 logistics, and **Pemantau** runs a final risk check. You watch them negotiate live, message by message, and get structured results at the end.

If Bendahari says the plan is **GAGAL** (over budget), the team loops back: Mak Tok proposes a cheaper menu, Tokey Pasar re-prices it, and Bendahari audits again. Nobody has to step in.

There are two modes:
- **Katering Pro** is for catering businesses. It adds overhead, labour, transport and a profit margin, and produces a downloadable **PDF quotation**.
- **Rewang DIY** is for families running a gotong-royong kenduri. It counts ingredient cost only and produces a **shopping list** with a per-head budget.

All agents run on Azure OpenAI GPT-4o, orchestrated by Microsoft AutoGen 0.4's `SelectorGroupChat`. Five curated JSON knowledge bases (Malaysian dishes, Pasar Borong prices, suppliers, rempah blends, halal rules) feed the agents through a lightweight TF-IDF retriever. Everything works in English and Bahasa Malaysia.

**Type:** `Hackathon`, built for the **Code; Without Barriers Hackathon 2026** (iNextLabs problem statement) 🏆 **2nd place**
**Brand:** `Luhh Series`
**Built with:** Solo build by Syaqirah

---

## ✨ Features

- ✅ **7-agent negotiation:** Pelanggan → Tok Penghulu → Mak Tok → Tokey Pasar → Bendahari → Abang Lorry → Pemantau → Tok Penghulu (`SELESAI`)
- ✅ **LLM-driven speaker selection** using a custom `SelectorGroupChat` prompt with strict rules (no repeat speakers, mandatory budget audit, force-close after 20 messages)
- ✅ **Budget rejection loop:** a `GAGAL`/`FAILED` verdict sends the menu back for one cheaper revision, a re-price and a re-audit
- ✅ **Two modes:** Katering Pro (quotation + margin) and Rewang DIY (shopping list, no labour cost)
- ✅ **Bilingual EN / BM:** a hard language banner sits at the top of every agent's system prompt
- ✅ **Live SSE streaming:** each agent message is pushed as it is produced, with a pulsing status chip for the agent that is speaking
- ✅ **RAG over 5 knowledge bases:** stdlib TF-IDF retriever picks the top 8 chunks from 13 dishes, 22 ingredients, 5 suppliers, 5 rempah blends and 6 halal rules. A collapsible "Knowledge Base Retrieval" bubble shows what was retrieved
- ✅ **Stock awareness:** ingredients marked `low_stock` / `order_required` show up as ⚠️ flags with their lead time
- ✅ **Weather-aware logistics:** RedahLuhh API → Tomorrow.io → Open-Meteo → seasonal-risk fallback, injected into Abang Lorry's prompt
- ✅ **Structured audit trail:** every message is classified server-side (`MENU_PROPOSAL`, `PRICE_REPORT`, `BUDGET_AUDIT` …) with extracted key outputs and an APPROVED/REJECTED status
- ✅ **Results panel:** quotation card or shopping list, Recharts budget breakdown, waste-reduction KPI, T-3 → T-0 logistics timeline, halal badge
- ✅ **Decision Flow** and **Audit Log** tabs that trace the negotiation node by node, with an expandable JSON view
- ✅ **PDF export** (jsPDF): A4 quotation for Katering, printable checklist for Rewang
- ✅ **Emergency guest spike:** add +30 / +50 / +100 pax (or a custom number) and the agents re-negotiate from scratch
- ✅ **Session history:** the last 10 sessions are saved in localStorage and can be replayed read-only
- ✅ **Supply route card:** nearest Pasar Borong → venue drive time and traffic through an Azure Maps proxy (key stays server-side), plus current weather from Open-Meteo
- ✅ **Prompt-injection filter** on every free-text field, plus Pydantic validation (10–5000 pax, future dates only)
- ✅ **Data notebooks:** paste a recipe and GPT-4o turns it into a `menus.json` entry. A second notebook pulls data.gov.my PriceCatcher prices into `ingredients.json`
- 🚧 Final summary panel reads the **first** Bendahari report, so after a rejection loop the quotation card can still show the rejected figures *(the Decision Flow and Audit Log tabs show the right outcome)*
- 🚧 Health endpoint still lists the original 5 agents *(Pelanggan and Pemantau were added later)*
- 💡 Redis-backed sessions *(the in-memory store has a TTL and is described as "Redis-ready")*
- 💡 Persistent bookings and a catering-business dashboard
- 💡 Part of the wider **PlanLuhh** wedding-planning ecosystem

---

## 🛠 Tech Stack

```mermaid
graph TD
    subgraph Frontend
        FE["React 19 + TypeScript<br/>Vite 8"]
        UI["Tailwind CSS v4<br/>Framer Motion · Recharts · Lucide"]
        ST["Zustand store<br/>EventSource SSE"]
        MD["react-markdown + remark-gfm<br/>jsPDF"]
    end
    subgraph Backend
        API["FastAPI 0.115<br/>Uvicorn · sse-starlette"]
        VAL["Pydantic v2<br/>injection filter"]
        RAG["TF-IDF retriever<br/>stdlib only"]
        SES["In-memory sessions<br/>TTL 1h"]
    end
    subgraph AI ["AI Layer"]
        AG["Microsoft AutoGen 0.4<br/>SelectorGroupChat"]
        LLM["Azure OpenAI<br/>gpt-4o"]
    end
    subgraph External ["External Services"]
        WX["RedahLuhh · Tomorrow.io<br/>Open-Meteo"]
        MAPS["Azure Maps<br/>geocode + route"]
    end
    FE --> API
    API --> VAL
    API --> RAG
    API --> SES
    API --> AG
    AG --> LLM
    API --> WX
    API --> MAPS
```

| Layer | Technology |
|---|---|
| Agent framework | Microsoft AutoGen 0.4 (`autogen-agentchat`, `autogen-ext[azure]`) |
| LLM | Azure OpenAI GPT-4o (`gpt-4o-2024-11-20`, deployment `gpt-4o-kenduri`) |
| Orchestration | `SelectorGroupChat` + `TextMentionTermination("SELESAI")` OR `MaxMessageTermination(24)` |
| API server | FastAPI 0.115 + Uvicorn |
| Streaming | Server-Sent Events via `sse-starlette` |
| Validation | Pydantic v2 + pydantic-settings, regex prompt-injection filter |
| Retrieval | Hand-rolled TF-IDF over chunked JSON knowledge bases |
| Session store | In-memory dict with TTL |
| Weather | RedahLuhh API → Tomorrow.io → Open-Meteo → seasonal estimate |
| Maps | Azure Maps Search + Route (server-side proxy) |
| Frontend | React 19 + TypeScript + Vite 8 |
| Styling | Tailwind CSS v4, Playfair Display + Inter |
| State | Zustand |
| Animation / Charts | Framer Motion · Recharts |
| PDF | jsPDF |
| Data tooling | Jupyter notebooks (Azure OpenAI recipe extractor, PriceCatcher scraper) |
| Testing | pytest + pytest-asyncio |

---

## 📌 Architecture

### High-level Architecture

```mermaid
graph TD
    U[User / Browser] --> FE[React SPA]
    FE -->|POST /api/chat/start| BE[FastAPI]
    FE -->|EventSource SSE| BE
    BE --> KB[(JSON Knowledge Base)]
    BE --> TEAM[AutoGen SelectorGroupChat]
    TEAM -->|chat completions| AOAI[Azure OpenAI GPT-4o]
    BE -->|weather cascade| WX[Weather APIs]
    BE -->|route proxy| MAPS[Azure Maps]
    FE -->|history| LS[(localStorage)]
```

### System Architecture

```mermaid
graph TD
    subgraph Frontend
        APP[App.tsx] --> CI[ChatInput + ModeToggle]
        APP --> FEED[AgentChatFeed]
        APP --> BAR[AgentStatusBar]
        APP --> OUT[OutputPanel]
        CI --> HOOK[useAgentChat]
        HOOK --> STORE[Zustand chatStore]
        STORE --> FEED
        STORE --> BAR
        OUT --> PARSE[parseMessages]
    end
    subgraph Backend
        R1[chat routes] --> SS[session_service]
        R1 --> KS[knowledge_service<br/>task string builder]
        R1 --> RS[rag_service]
        R1 --> WS[weather_service]
        R1 --> GC[group_chat.create_team]
        R1 --> CL[_classify_action<br/>audit trail]
        GC --> AGENTS[7 AssistantAgents]
        R2[knowledge routes] --> KS
        R3[maps routes] --> AM[Azure Maps + Open-Meteo]
    end
    HOOK -->|REST + SSE| R1
```

### Agent Roster

| Agent | Persona | Job | Signature output |
|---|---|---|---|
| 👤 **Pelanggan** | Customer intake desk | Validates the request and flags budget/pax/date risks | `INTAKE STATUS: CONFIRMED` |
| 👴🏽 **Tok Penghulu** | Village head, chairperson | Opens the case, hands over, writes the final summary | `SELESAI` |
| 👵🏽 **Mak Tok** | 40-year Malay & Indian-Muslim cuisine veteran | Menu + metric quantities + prep time + halal check | Numbered menu |
| 🛒 **Tokey Pasar** | Pasar Borong Selayang/Pudu supplier | Wholesale prices, substitutes, stock flags | `TOTAL INGREDIENT COST: RM …`, `⚠️ MAHAL` |
| 💰 **Bendahari** | Strict but fair treasurer | Cost formula, verdict, per-head cost, waste reduction | `LULUS` / `GAGAL` |
| 🚛 **Abang Lorry** | Catering lorry driver | T-3 → T-0 schedule, 3AM market run, weather risk | Timeline |
| 🔍 **Pemantau** | Risk monitor | Budget / halal / timeline / inventory / weather check | `READY TO PROCEED` |

---

## 👤 User Flow

```mermaid
flowchart TD
    A([Open app]) --> B[Choose mode:<br/>Katering Pro or Rewang DIY]
    B --> C[Choose language EN / BM]
    C --> D[Fill event form:<br/>type, pax, budget, venue, date,<br/>dietary, margin or coordinator]
    D --> E[Start Planning]
    E --> F[Live discussion log<br/>+ Live Summary panel]
    F --> G{Agents done?}
    G -->|No| F
    G -->|Yes| H[Output panel]
    H --> I[Results:<br/>quotation or shopping list,<br/>budget chart, timeline, route]
    H --> J[Decision Flow tab]
    H --> K[Audit Log tab]
    I --> L[Download PDF]
    H --> M[Emergency guest spike]
    M --> E
    H --> N[History drawer:<br/>replay past sessions]
```

### Screen Map

```mermaid
graph TD
    subgraph Single ["🖥️ Single-page app"]
        FORM["Hero + Event Form"]
        LIVE["Discussion Log + Live Summary"]
        RES["Output Panel<br/>Results · Decision Flow · Audit Log"]
        HIST["History Drawer"]
    end
    FORM -->|submit| LIVE
    LIVE -->|done event| RES
    RES -->|Plan New Event| FORM
    RES -->|guest spike| LIVE
    HIST -->|replay| RES

    style Single fill:#fff8e1,stroke:#f59e0b
```

---

## 🔐 Session Lifecycle

There are no user accounts. Each planning run is an anonymous session that lives in backend memory for one hour.

```mermaid
stateDiagram-v2
    [*] --> pending: POST /api/chat/start
    pending --> running: GET stream opened
    running --> done: SELESAI or 24-message cap
    running --> error: exception
    done --> done: reconnect replays stored messages
    error --> error: reconnect replays error event
    running --> running: second connection gets 409
    done --> [*]: TTL expiry 1h
    error --> [*]: TTL expiry 1h
```

```mermaid
sequenceDiagram
    participant FE as useAgentChat
    participant API as FastAPI
    participant SS as SessionService

    FE->>API: POST /api/chat/start (CateringRequest)
    API->>API: Pydantic validation + injection filter
    API->>SS: create_session + store_request
    API-->>FE: 202 session_id
    FE->>API: EventSource /api/chat/{id}/stream
    alt connection drops
        FE->>FE: status reconnecting, retry up to 3x every 2s
        FE->>API: EventSource again
    end
    API-->>FE: thinking, agent_message x N, done
    FE->>FE: saveSession to localStorage (max 10)
```

---

## 🗄️ Data Model

There is no database. Reference data lives in five JSON knowledge-base files, sessions live in memory, and history lives in the browser.

### Knowledge Base

```mermaid
erDiagram
    MENUS {
        string id PK
        string name
        string name_en
        string category
        list suitable_for
        string halal_status
        float katering_unit_cost_myr
        float prep_time_hours
        float cook_time_hours
        string rewang_measurement
        list main_ingredients
    }
    INGREDIENTS {
        string id PK
        string name_ms
        string name_en
        string category
        string unit
        float pasar_borong_price_myr
        float retail_price_myr
        string stock_status
        int lead_time_days
        bool halal_certified
        list substitutes
    }
    SUPPLIERS {
        string id PK
        string name
        string type
        string location
        float distance_from_kl_km
        list specialties
        string operating_hours
        bool halal_certified
    }
    REMPAH_BLENDS {
        string id PK
        string name
        list components
        list used_in
        int quantity_per_kg_meat_gram
        string instant_substitute
    }
    HALAL_RULES {
        list check_ingredients
        string severity
        string note
    }
    MENUS }o--o{ INGREDIENTS : "uses"
    MENUS }o--o{ REMPAH_BLENDS : "spiced with"
    SUPPLIERS }o--o{ INGREDIENTS : "supplies"
    HALAL_RULES }o--o{ INGREDIENTS : "screens"
```

### Runtime State

```mermaid
erDiagram
    SESSION ||--o{ MESSAGE : "collects"
    MESSAGE ||--o| AUDIT : "classified as"
    HISTORY_ENTRY ||--o{ MESSAGE : "snapshots"

    SESSION {
        uuid id PK
        string mode
        string language
        string status
        json request_payload
        datetime created_at
        string error
    }
    MESSAGE {
        string agent
        string content
        string timestamp
    }
    AUDIT {
        string action
        string status
        json key_outputs
    }
    HISTORY_ENTRY {
        uuid id PK
        string savedAt
        string mode
        json request
        json result
    }
```

| Store | Where | Contents |
|---|---|---|
| `menus.json` | Backend KB | 13 Malaysian dishes with per-pax catering cost, prep/cook time, rewang measurement |
| `ingredients.json` | Backend KB | 22 ingredients with Pasar Borong vs retail price, stock status, substitutes |
| `suppliers.json` | Backend KB | 5 suppliers with location, specialties, halal status |
| `rempah_ratus.json` | Backend KB | 5 spice blends with ratios per kg of meat |
| `halal_checklist.json` | Backend KB | 6 rules with trigger ingredients + 10 safe ingredients |
| `_sessions` | Backend memory | Session status, request payload, messages + audit entries (TTL 1h) |
| `kenduri_history` | Browser localStorage | Last 10 completed sessions with a parsed result summary |

---

## 🔌 API Structure

### API Overview

```mermaid
mindmap
  root((/api))
    health
      GET health
    chat
      POST start
      GET id stream SSE
      GET id result
    knowledge
      GET menus
      GET menus by id
      GET ingredients
      GET suppliers
    maps
      GET config
      GET geocode
      GET route
```

| Group | Endpoints |
|---|---|
| System | `GET /api/health` |
| Agent chat | `POST /api/chat/start` · `GET /api/chat/{id}/stream` (SSE) · `GET /api/chat/{id}/result` |
| Knowledge base | `GET /api/knowledge/menus?event_type=` · `GET /api/knowledge/menus/{menu_id}` · `GET /api/knowledge/ingredients?category=` · `GET /api/knowledge/suppliers` |
| Azure Maps proxy | `GET /api/maps/config` · `GET /api/maps/geocode?query=` · `GET /api/maps/route?destination=` |

### SSE Event Shapes

| `type` | Payload |
|---|---|
| `thinking` | `content` (formatted RAG block), `chunks`, `sources[]` |
| `agent_message` | `agent`, `content`, `timestamp`, `audit { action, status, key_outputs }` |
| `done` | `total_messages`, `token_count` (≈ chars ÷ 4) |
| `error` | `message` |

### Request/Response Flow

```mermaid
sequenceDiagram
    participant FE as Frontend
    participant API as chat.stream
    participant WX as weather_service
    participant KB as knowledge + rag
    participant T as SelectorGroupChat

    FE->>API: GET /api/chat/{id}/stream
    API->>WX: get_event_weather(location, date)
    WX-->>API: weather block for Abang Lorry
    API->>T: create_team(mode, language, weather)
    API->>KB: build_task_string + retrieve top 8 chunks
    API-->>FE: thinking event (RAG sources)
    loop every agent turn
        T-->>API: (agent, content)
        API->>API: _classify_action → audit JSON
        API-->>FE: agent_message event
    end
    API-->>FE: done event + token estimate
```

---

## 🧩 Frontend Components

### Component Tree

```mermaid
graph TD
    App["App.tsx"]
    App --> SB["AgentStatusBar<br/>7 chips + token count"]
    App --> HERO["HeroText"]
    App --> CI["ChatInput"]
    CI --> MT["ModeToggle"]
    App --> FEED["AgentChatFeed"]
    FEED --> RAGB["RagThinkingBubble"]
    FEED --> MB["MessageBubble<br/>markdown + verdict badge"]
    FEED --> TB["TypingBubble"]
    App --> LSP["LiveSummaryPanel"]
    App --> OP["OutputPanel"]
    OP --> HB["HalalBadge"]
    OP --> QC["QuotationCard"]
    OP --> SL["ShoppingList"]
    OP --> BB["BudgetBreakdown"]
    OP --> LT["LogisticsTimeline"]
    OP --> RM["RouteMap"]
    OP --> DF["DecisionFlow"]
    OP --> AL["AuditLogPanel"]
    App --> HD["HistoryDrawer"]
```

### Key Components

| Component | Purpose |
|---|---|
| `useAgentChat` | Starts a session, opens the EventSource, retries 3x on drop, saves history |
| `chatStore` | Zustand store: messages, status, typing agent, done agents, RAG thinking, token count |
| `ChatInput` | Event form with mode + language toggles and client-side validation |
| `AgentChatFeed` | Animated message bubbles with markdown, red/green Bendahari verdict badges, RAG bubble |
| `AgentStatusBar` | Seven persona chips that pulse while an agent is speaking and tick when it is done |
| `LiveSummaryPanel` | Running budget, pax, proposed menu and an "agents reviewing budget" warning |
| `parseMessages` | Regex parser that turns agent text into budget, logistics, menu and shopping-list data |
| `QuotationCard` / `ShoppingList` | Mode-specific result card with PDF export |
| `BudgetBreakdown` | Recharts horizontal bars + cost table + waste-reduction KPI |
| `LogisticsTimeline` | Expandable T-3 → T-0 vertical timeline |
| `RouteMap` | Supply route, drive time, traffic and venue weather |
| `DecisionFlow` | Horizontal node chain of key agent decisions |
| `AuditLogPanel` | Collapsible list of audit entries with raw JSON |
| `HistoryDrawer` | Past sessions with replay / delete / clear all |

---

## ⚙️ Feature-specific Flows

### Multi-Agent Orchestration

```mermaid
sequenceDiagram
    actor User
    participant SEL as Selector (GPT-4o)
    participant PL as Pelanggan
    participant TP as Tok Penghulu
    participant MT as Mak Tok
    participant TK as Tokey Pasar
    participant BD as Bendahari
    participant AL as Abang Lorry
    participant PM as Pemantau

    User->>SEL: Task string + RAG context
    SEL->>PL: Rule 1 - nobody has spoken
    PL-->>SEL: Intake brief, CONFIRMED
    SEL->>TP: Rule 2 - intake confirmed
    TP-->>SEL: 5-line case summary
    SEL->>MT: Rule 3 - discussion opened
    MT-->>SEL: Menu + quantities
    SEL->>TK: Rule 4 - menu proposed
    TK-->>SEL: Price report + substitutes
    SEL->>BD: Rule 5 - mandatory audit
    alt GAGAL / FAILED (max once)
        BD-->>SEL: Over budget by RM X
        SEL->>MT: Rule 6 - cheaper menu
        MT-->>SEL: Revised menu
        SEL->>TK: Re-price
        TK-->>SEL: Updated price report
        SEL->>BD: Re-audit
    end
    BD-->>SEL: LULUS / APPROVED + quotation
    SEL->>AL: Rule 7 - straight to logistics
    AL-->>SEL: T-3 to T-0 plan + weather risk
    SEL->>PM: Rule 8 - risk check
    PM-->>SEL: READY TO PROCEED
    SEL->>TP: Rule 9 - close
    TP-->>User: Final summary + SELESAI
```

### Speaker Selection Rules

```mermaid
flowchart TD
    S([Next turn]) --> R0{20+ agent messages?}
    R0 -->|Yes| TPC[Tok Penghulu closes with SELESAI]
    R0 -->|No| R1{Anyone spoken?}
    R1 -->|No| PL[Pelanggan]
    R1 -->|Yes| LAST{Last speaker}
    LAST -->|Pelanggan CONFIRMED| TP[Tok Penghulu]
    LAST -->|Tok Penghulu opened| MT[Mak Tok]
    LAST -->|Mak Tok menu| TK[Tokey Pasar]
    LAST -->|Tokey Pasar prices| BD[Bendahari]
    LAST -->|Bendahari GAGAL, max once| MT
    LAST -->|Bendahari LULUS| AL[Abang Lorry]
    LAST -->|Abang Lorry done| PM[Pemantau]
    LAST -->|Pemantau READY| TPC
    TPC --> TERM([TextMentionTermination fires])
```

> Safety nets: `allow_repeated_speaker=False`, a silence rule in every specialist agent's prompt (no replies to praise or cheerleading), Tok Penghulu's strict closing rules, and a hard `MaxMessageTermination(24)` on top of the `SELESAI` text trigger.

### Bendahari Costing Formula

```mermaid
flowchart LR
    RAW["Raw material cost<br/>from Tokey Pasar"] --> MODE{Mode}
    MODE -->|Katering| K1["+ Overhead 15%"]
    K1 --> K2["+ Labour RM80 per staff<br/>1 staff per 50 pax"]
    K2 --> K3["+ Transport RM0.50/km<br/>50 km round trip"]
    K3 --> K4["= Total cost"]
    K4 --> K5["+ Profit margin %"]
    K5 --> Q["= Quotation"]
    MODE -->|Rewang| R1["Raw cost only<br/>gotong-royong labour"]
    R1 --> RT["= Total spend"]
    Q --> CMP{Within budget?}
    RT --> CMP
    CMP -->|Yes| OK["LULUS / APPROVED"]
    CMP -->|No| NO["GAGAL / FAILED<br/>over by RM X"]
    OK --> W["Waste reduction vs 30% manual over-order<br/>= 0.3 / 1.3 ≈ 23.1%"]
```

### RAG Retrieval

```mermaid
flowchart TD
    A([CateringRequest]) --> B["Query = event_type + pax + location<br/>+ menu prefs + dietary + mode"]
    C[("5 JSON KB files")] --> D["Chunk: one chunk per dish,<br/>ingredient, supplier, blend, rule"]
    D --> E["Tokenise + IDF table<br/>lru_cache at first use"]
    B --> F["Score each chunk:<br/>sum of TF x IDF on query terms"]
    E --> F
    F --> G["Top 8 chunks"]
    G --> H["Format block with source file per entry"]
    H --> I["Append to task string"]
    H --> J["SSE thinking event<br/>chunks + sources"]
```

### Weather Intelligence Cascade

```mermaid
flowchart TD
    A([Event location + date]) --> B[RedahLuhh API<br/>12s timeout]
    B -->|ok| Z[Formatted weather block]
    B -->|fail| C{Within 14 days?}
    C -->|Yes| D[Tomorrow.io]
    C -->|No| E{Within 16 days?}
    D -->|ok| Z
    D -->|fail| E
    E -->|Yes| F[Open-Meteo]
    E -->|No| G[Seasonal estimate<br/>monsoon month + flood zone]
    F -->|ok| Z
    F -->|fail| G
    G --> Z
    Z --> H([Abang Lorry system prompt])
```

### Emergency Guest Spike

```mermaid
flowchart LR
    A([Session done]) --> B[Emergency Update panel]
    B --> C{+30 / +50 / +100<br/>or custom pax}
    C --> D[Clone original request<br/>with new pax]
    D --> E[POST /api/chat/start]
    E --> F[Full 7-agent re-negotiation]
    F --> G([New results + history entry])
```

---

## 📁 Project Structure

```
KenduriLuhh/
├── architecture.html / .png     Architecture diagram
├── notebooks/
│   ├── add_menu_item.ipynb      Recipe text → GPT-4o → menus.json
│   └── fama_price_scraper.ipynb data.gov.my PriceCatcher → ingredients.json
│
├── backend/
│   ├── requirements.txt
│   ├── tests/                   Models, knowledge service, weather service
│   └── app/
│       ├── main.py              FastAPI app, CORS, routers
│       ├── config.py            Pydantic settings
│       ├── agents/
│       │   ├── base_agent.py    All 7 system prompts + language banner + silence rule
│       │   ├── group_chat.py    SelectorGroupChat + selector prompt + stream helper
│       │   └── pelanggan.py, tok_penghulu.py, mak_tok.py, tokey_pasar.py,
│       │       bendahari.py, abang_lorry.py, pemantau.py
│       ├── api/routes/          health, chat (SSE + audit), knowledge, maps
│       ├── services/            knowledge, rag, session, weather
│       ├── models/              Request (validation + injection filter) / response schemas
│       └── knowledge_base/      menus, ingredients, suppliers, rempah_ratus, halal_checklist
│
└── frontend/src/
    ├── App.tsx                  Layout, hero, live summary panel
    ├── components/              ChatInput, ModeToggle, AgentChatFeed, AgentStatusBar,
    │                            DecisionFlow, AuditLogPanel, HistoryDrawer
    │   └── outputs/             OutputPanel, QuotationCard, ShoppingList, BudgetBreakdown,
    │                            LogisticsTimeline, RouteMap, HalalBadge
    ├── hooks/                   useAgentChat (SSE), useHistory (localStorage)
    ├── store/                   chatStore (Zustand)
    ├── utils/                   parseMessages, generatePdf
    └── types/                   Shared TypeScript types
```

---

## 🗺 Roadmap

- [x] 5 core agents with distinct personas and role boundaries
- [x] SelectorGroupChat orchestration with a hardened selector prompt
- [x] Budget rejection → menu revision loop
- [x] JSON knowledge base + TF-IDF RAG
- [x] SSE live streaming + reconnect logic
- [x] Katering Pro and Rewang DIY modes
- [x] EN / BM language enforcement
- [x] Quotation / shopping list, budget chart, logistics timeline, halal badge
- [x] PDF export
- [x] Pelanggan (intake) and Pemantau (risk) agents
- [x] Inventory stock simulation + token counter
- [x] Weather cascade (RedahLuhh / Tomorrow.io / Open-Meteo / seasonal)
- [x] Azure Maps supply route card
- [x] Decision Flow + JSON audit trail
- [x] Session history + emergency guest spike
- [x] Data notebooks for menus and PriceCatcher prices
- [ ] Use the latest Bendahari verdict in the results panel
- [ ] Redis session store
- [ ] Persistent bookings + catering business accounts
- [ ] Integrate into the PlanLuhh wedding-planning platform

---

## 📄 License

MIT. Built for the Code; Without Barriers Hackathon 2026 by Siti Nursyaqirah · Source on [GitHub](https://github.com/snsyaqirah/KenduriLuhh)
