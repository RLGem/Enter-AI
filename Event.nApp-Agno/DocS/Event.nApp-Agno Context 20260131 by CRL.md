# Event.nApp-Agno - Context Document

## Version 1.0 | 31 January 2026

---

## Table of Contents

| # | Topic |
|:-:|:------|
| 1 | Project Overview |
| 2 | nApp Philosophy |
| 3 | Business Model |
| 4 | Target Audience |
| 5 | Stakeholders |
| 6 | Relationship to Supabase Version |

---

# 1. Project Overview

## What is Event.nApp-Agno?

**Event.nApp-Agno** is the Python/Agno implementation of Event.nApp - an AI assistant for event planning that works through chat interface only.

```
+------------------------------------------------------------+
|                                                            |
|   nApp = "No App" (Hebrew) + "New App" (English)           |
|                                                            |
|   The idea: No traditional app with UI                     |
|   Just natural conversation with AI that does everything   |
|                                                            |
|   This implementation uses:                                |
|   * Agno Framework (Python)                                |
|   * Claude API via Agno's Anthropic integration            |
|   * Supabase for database (new project)                    |
|   * Same Telegram bot interface                            |
|                                                            |
+------------------------------------------------------------+
```

## What it is NOT?

- Not an app with forms and dropdowns
- Not a system with predefined categories and event types
- Not software that requires configuration before use

## What it IS?

- Natural conversation that adapts to any event
- AI that learns from conversation (doesn't ask unnecessary questions)
- Complete flexibility - any event type, any task type

---

# 2. nApp Philosophy

## Guiding Principles

### 1. Learning from Conversation (not configuration)

```
+------------------------------------------------------------+
|                                                            |
|   Traditional approach:                                    |
|   "Select event type: [Wedding v]"                         |
|   "Select side: [Groom v] [Bride v]"                       |
|                                                            |
|   nApp approach:                                           |
|   User: "Planning Rafi and Rachel's wedding"               |
|   AI learned: event=wedding, groom=Rafi, bride=Rachel      |
|                                                            |
|   User: "I'm Danny, Rafi's father"                         |
|   AI learned: user=Danny, role="father of groom", side=groom|
|                                                            |
+------------------------------------------------------------+
```

### 2. Ask Only When Needed

```
+------------------------------------------------------------+
|                                                            |
|   Don't ask upfront:                                       |
|   "What's the date? Budget? Guest count?"                  |
|                                                            |
|   Ask when relevant:                                       |
|   User: "Remind me to book photographer"                   |
|   AI: "Added task. When should I remind you?"              |
|                                                            |
+------------------------------------------------------------+
```

### 3. Complete Flexibility

```
+------------------------------------------------------------+
|                                                            |
|   Any event type is valid:                                 |
|   * "Rafi and Rachel's wedding"                            |
|   * "Yoav's bar mitzvah"                                   |
|   * "Mom's 50th birthday party"                            |
|   * "Cast removal from finger"                             |
|   * "Trip to Thailand"                                     |
|   * "Cat's party"                                          |
|                                                            |
|   Any date format is valid:                                |
|   * "June 1, 2026"                                         |
|   * "In October"                                           |
|   * "When it gets warm"                                    |
|   * "Next Thursday at 9pm"                                 |
|                                                            |
+------------------------------------------------------------+
```

### 4. Smart Memory

```
+------------------------------------------------------------+
|                                                            |
|   Event memory (shared with everyone):                     |
|   * "The event is Rafi and Rachel's wedding"               |
|   * "Date: June 1, 2026"                                   |
|   * "Danny is Rafi's father, groom's side"                 |
|   * "Michal is Rachel's sister, bride's side"              |
|                                                            |
|   User memory (private to each person):                    |
|   * "Danny prefers short, to-the-point communication"      |
|   * "Danny is responsible for the budget"                  |
|                                                            |
+------------------------------------------------------------+
```

### 5. Flexible Actions

```
+------------------------------------------------------------+
|                                                            |
|   No closed list of actions.                               |
|   User requests - AI performs.                             |
|                                                            |
|   "Add task" - adds                                        |
|   "Delete the task" - deletes                              |
|   "Merge the two tasks" - creates new logic                |
|   "Give me a burndown chart with green background" - generates
|                                                            |
+------------------------------------------------------------+
```

---

# 3. Business Model

## Event.nApp is Free for Users

```
+------------------------------------------------------------+
|                                                            |
|   Revenue: Hot leads to suppliers                          |
|                                                            |
|   Suppliers (photographers, catering, DJ, etc.) sign       |
|   agreement with Event.nApp to receive leads.              |
|                                                            |
|   When user needs supplier and agrees - lead is sent.      |
|                                                            |
+------------------------------------------------------------+
```

## The Flow

```
+------------------------------------------------------------+
|                                                            |
|   1. AI identifies need for supplier (from conversation)   |
|      v                                                     |
|   2. AI checks: are there relevant suppliers in list?      |
|      v                                                     |
|   +-------------+--------------------------------------+   |
|   | No          | Yes                                  |   |
|   |             |                                      |   |
|   | Silence     | Offers politely:                     |   |
|   |             | "I have some great photographers     |   |
|   | If asked:   |  that work with us.                  |   |
|   | "I don't    |  Want them to contact you?"          |   |
|   |  have       |                                      |   |
|   |  suppliers  | If yes: sends lead + copy to admin   |   |
|   |  in this    |                                      |   |
|   |  area"      |                                      |   |
|   +-------------+--------------------------------------+   |
|                                                            |
+------------------------------------------------------------+
```

---

# 4. Target Audience

## End Users

```
+------------------------------------------------------------+
|                                                            |
|   Anyone planning an event:                                |
|                                                            |
|   * Couples getting married                                |
|   * Parents planning bar/bat mitzvah                       |
|   * Birthday party organizers                              |
|   * Family event organizers                                |
|   * Anyone with any type of event                          |
|                                                            |
|   Characteristics:                                         |
|   * Not necessarily technical                              |
|   * Want simplicity                                        |
|   * Familiar with WhatsApp/Telegram                        |
|                                                            |
+------------------------------------------------------------+
```

## Suppliers (Paying Customers)

```
+------------------------------------------------------------+
|                                                            |
|   Event suppliers who pay for leads:                       |
|                                                            |
|   * Photographers and videographers                        |
|   * Venues and event halls                                 |
|   * Catering                                               |
|   * DJ and music                                           |
|   * Design and flowers                                     |
|   * Invitations and branding                               |
|   * And more...                                            |
|                                                            |
+------------------------------------------------------------+
```

---

# 5. Stakeholders

## Raphy - Owner

```
+------------------------------------------------------------+
|                                                            |
|   Role: Admin, supplier manager, receives lead copies      |
|                                                            |
|   Also: Father of the bride (Michal) in real wedding       |
|   that serves as Test Case (June 1, 2026)                  |
|                                                            |
+------------------------------------------------------------+
```

## Michal - Raphy's Daughter

```
+------------------------------------------------------------+
|                                                            |
|   First user + wedding project manager                     |
|   Groom: Amitai Karni                                      |
|   Date: June 1, 2026                                       |
|                                                            |
+------------------------------------------------------------+
```

---

# 6. Relationship to Supabase Version

```
+------------------------------------------------------------+
|                                                            |
|   Event.nApp-Supabase (Sister Project)                     |
|   ----------------------------------------                 |
|   * Original implementation                                |
|   * Deno/TypeScript                                        |
|   * Supabase Edge Functions                                |
|   * Location: D:\My ProjectS\Enter AI\Event.nApp-Supabase  |
|                                                            |
|   Event.nApp-Agno (This Project)                           |
|   ----------------------------------------                 |
|   * New implementation                                     |
|   * Python/Agno Framework                                  |
|   * Same database schema                                   |
|   * Same Telegram bot interface                            |
|   * Location: D:\My ProjectS\Enter AI\Event.nApp-Agno      |
|                                                            |
|   Both share:                                              |
|   * Same nApp philosophy                                   |
|   * Same PRD and requirements                              |
|   * Same database schema                                   |
|   * Same Telegram bot (@EAIEventsBot)                      |
|                                                            |
|   Different:                                               |
|   * Implementation language and framework                  |
|   * Different Supabase project                             |
|                                                            |
+------------------------------------------------------------+
```

---

**Event.nApp-Agno | AI-Powered Event Planning (Python/Agno Implementation)**
