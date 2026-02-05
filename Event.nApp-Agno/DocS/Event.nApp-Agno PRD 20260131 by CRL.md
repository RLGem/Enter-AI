# Event.nApp-Agno - Product Requirements Document (PRD)

## Version 1.0 | 31 January 2026

---

## Table of Contents

| # | Topic |
|:-:|:------|
| 1 | Product Overview |
| 2 | Product Dimensions |
| 3 | User Stories |
| 4 | User Flows |
| 5 | Functional Requirements |
| 6 | Non-Functional Requirements |

---

# 1. Product Overview

## Description

Event.nApp-Agno is an AI assistant for event planning that works as a chat conversation only.
This is the Python/Agno implementation of the Event.nApp concept.

## Problem Being Solved

```
+------------------------------------------------------------+
|                                                            |
|   Event planning today = chaos:                            |
|                                                            |
|   * Scattered spreadsheets                                 |
|   * Endless WhatsApp messages                              |
|   * Forgetting critical tasks                              |
|   * Hard to coordinate between all involved                |
|   * No single clear picture                                |
|                                                            |
+------------------------------------------------------------+
```

## The Solution

```
+------------------------------------------------------------+
|                                                            |
|   One AI that knows everything:                            |
|                                                            |
|   * Remembers everything said                              |
|   * Manages tasks                                          |
|   * Coordinates between participants                       |
|   * Reminds when needed                                    |
|   * Suggests suppliers (when available)                    |
|                                                            |
+------------------------------------------------------------+
```

---

# 2. Product Dimensions

## Essential Dimensions

```
+------------------------------------------------------------+
|                                                            |
|   1. Event                                                 |
|      * Name - what user says                               |
|      * Date - flexible (exact / month / "when it's warm")  |
|      * Description - what we learned from conversation     |
|                                                            |
|   2. Tasks                                                 |
|      * Title - required                                    |
|      * Status - open / closed                              |
|      * Everything else optional and free text:             |
|        - Description                                       |
|        - Due date                                          |
|        - Assignee                                          |
|        - Category                                          |
|                                                            |
|   3. Participants (Members)                                |
|      * Name                                                |
|      * Role - free text ("father of groom", "organizer")   |
|      * Side/group - only if relevant and came up           |
|                                                            |
|   4. Suppliers                                             |
|      * Name                                                |
|      * Contact + details (email, phone)                    |
|      * Description - what they provide (free text)         |
|      * [List managed by admin]                             |
|                                                            |
|   5. Leads                                                 |
|      * Link between user and supplier                      |
|      * Status (sent / responded / closed)                  |
|                                                            |
|   6. Memory                                                |
|      * Event - shared with all participants                |
|      * User - private to each person                       |
|                                                            |
|   7. Conversation                                          |
|      * Chat history for each user                          |
|      * Everything happens in conversation                  |
|                                                            |
|   8. Budget                                                |
|      * Items with estimated and actual costs               |
|      * Status tracking (pending/confirmed/paid)            |
|                                                            |
|   9. Guests                                                |
|      * Guest list with RSVP tracking                       |
|      * Plus-ones, dietary restrictions, table assignments  |
|                                                            |
+------------------------------------------------------------+
```

---

# 3. User Stories

## First User (Creates Event)

```
+------------------------------------------------------------+
|                                                            |
|   US-001: Event Creation                                   |
|   As a new user                                            |
|   I want to tell the AI about my event                     |
|   So it starts helping me plan                             |
|                                                            |
|   Criteria:                                                |
|   * AI understands any event type                          |
|   * AI learns details from conversation (doesn't ask all upfront)
|   * AI saves the information                               |
|                                                            |
|   Example:                                                 |
|   User: "Hi, I'm planning Rafi and Rachel's wedding"       |
|   AI: "Mazel tov! Rafi and Rachel's wedding. What's your name?"
|   User: "Danny, Rafi's father"                             |
|   AI: "Hi Danny! So you're on the groom's side.            |
|        What's the first thing we need to handle?"          |
|                                                            |
+------------------------------------------------------------+

+------------------------------------------------------------+
|                                                            |
|   US-002: Adding a Task                                    |
|   As a user                                                |
|   I want to add a task                                     |
|   So I don't forget to do it                               |
|                                                            |
|   Criteria:                                                |
|   * Can add in natural language                            |
|   * AI asks for details only if something critical missing |
|   * AI confirms the addition                               |
|                                                            |
|   Example:                                                 |
|   User: "Add task to book photographer"                    |
|   AI: "Added: 'Book photographer'. Set a due date?"        |
|   User: "By end of month"                                  |
|   AI: "Updated - due date: 28/02/2026"                     |
|                                                            |
+------------------------------------------------------------+

+------------------------------------------------------------+
|                                                            |
|   US-003: Viewing Tasks                                    |
|   As a user                                                |
|   I want to see the tasks                                  |
|   To know the status                                       |
|                                                            |
|   Example:                                                 |
|   User: "What are the open tasks?"                         |
|   AI: "There are 5 open tasks:                             |
|        1. Book photographer (by 28/02)                     |
|        2. Choose venue                                     |
|        3. Order invitations                                |
|        ..."                                                |
|                                                            |
+------------------------------------------------------------+
```

## Additional User (Joins Existing Event)

```
+------------------------------------------------------------+
|                                                            |
|   US-004: Joining an Event                                 |
|   As a new user                                            |
|   I want to join an existing event                         |
|   To help with planning                                    |
|                                                            |
|   Example:                                                 |
|   AI: "Hi! What's your name?"                              |
|   User: "Ido"                                              |
|   AI: "Hi Ido! Welcome to Rafi and Rachel's wedding!       |
|        Who are you at the event?"                          |
|   User: "I'm Rachel's brother"                             |
|   AI: "Bride's brother, great!                             |
|        There are some open tasks. Want to see?"            |
|                                                            |
+------------------------------------------------------------+
```

## Suppliers

```
+------------------------------------------------------------+
|                                                            |
|   US-005: Supplier Suggestions                             |
|   As a user who needs a supplier                           |
|   I want to get suggestions                                |
|   To find a good supplier                                  |
|                                                            |
|   Example (suppliers exist):                               |
|   User: "I need a photographer"                            |
|   AI: "I have some great photographers that work with us.  |
|        Want them to contact you with offers?"              |
|   User: "Yes"                                              |
|   AI: "Great! I've passed your details to 3 photographers. |
|        They'll contact you soon."                          |
|                                                            |
|   Example (no suppliers):                                  |
|   User: "I need a DJ"                                      |
|   AI: "Added task: 'Find DJ'.                              |
|        Want to set a due date?"                            |
|   [Doesn't suggest suppliers because none in list]         |
|                                                            |
+------------------------------------------------------------+
```

---

# 4. User Flows

## Flow 1: First User Creates Event

```
+------------------------------------------------------------+
|                                                            |
|   1. User opens chat with bot                              |
|      v                                                     |
|   2. AI greets and explains what it can do                 |
|      v                                                     |
|   3. User tells about the event                            |
|      v                                                     |
|   4. AI learns and saves (event name, type)                |
|      v                                                     |
|   5. AI asks for user's name                               |
|      v                                                     |
|   6. User identifies (name + role)                         |
|      v                                                     |
|   7. AI saves and asks what to start with                  |
|      v                                                     |
|   8. Regular work (tasks, questions, etc.)                 |
|                                                            |
+------------------------------------------------------------+
```

## Flow 2: Additional User Joins

```
+------------------------------------------------------------+
|                                                            |
|   1. User opens chat with bot                              |
|      v                                                     |
|   2. AI identifies there's already an active event         |
|      (by phone number / link / code)                       |
|      v                                                     |
|   3. AI greets and presents the event                      |
|      v                                                     |
|   4. AI asks who the user is                               |
|      v                                                     |
|   5. User identifies                                       |
|      v                                                     |
|   6. AI saves and offers to show tasks                     |
|      v                                                     |
|   7. Regular work                                          |
|                                                            |
+------------------------------------------------------------+
```

## Flow 3: Lead to Supplier

```
+------------------------------------------------------------+
|                                                            |
|   1. AI identifies need for supplier (from conversation)   |
|      v                                                     |
|   2. AI checks if there are relevant suppliers             |
|      v                                                     |
|   3. If yes - offers to user                               |
|      v                                                     |
|   4. User confirms                                         |
|      v                                                     |
|   5. AI sends lead to suppliers (email/SMS)                |
|      v                                                     |
|   6. AI sends copy to admin (Raphy)                        |
|      v                                                     |
|   7. AI confirms to user                                   |
|                                                            |
+------------------------------------------------------------+
```

---

# 5. Functional Requirements

## FR-001: Event Management

| ID | Requirement |
|:---|:------------|
| FR-001.1 | Create new event from conversation |
| FR-001.2 | Support any event type (free text) |
| FR-001.3 | Support flexible date (exact / range / description) |
| FR-001.4 | Join existing event |

## FR-002: Task Management

| ID | Requirement |
|:---|:------------|
| FR-002.1 | Add task in natural language |
| FR-002.2 | Edit task |
| FR-002.3 | Delete task |
| FR-002.4 | Change status (open/done) |
| FR-002.5 | Assign task to participant |
| FR-002.6 | Set due date |
| FR-002.7 | View task list (all/open/mine) |
| FR-002.8 | Advanced actions (merge, split, etc.) |
| FR-002.9 | **Duplicate prevention** (learned from Supabase version!) |

## FR-003: Participant Management

| ID | Requirement |
|:---|:------------|
| FR-003.1 | Add participant from conversation identification |
| FR-003.2 | Role as free text |
| FR-003.3 | Side/group (optional) |
| FR-003.4 | View participant list |

## FR-004: Suppliers and Leads

| ID | Requirement |
|:---|:------------|
| FR-004.1 | Identify need for supplier from conversation |
| FR-004.2 | Search relevant suppliers |
| FR-004.3 | Suggest suppliers to user (only if exist) |
| FR-004.4 | Send lead to supplier (email/SMS) |
| FR-004.5 | Send copy to admin |
| FR-004.6 | Track lead status |

## FR-005: Memory

| ID | Requirement |
|:---|:------------|
| FR-005.1 | Save event information (shared) |
| FR-005.2 | Save user information (private) |
| FR-005.3 | Retrieve relevant information in conversation |
| FR-005.4 | Update memory from conversation |

## FR-006: Conversation

| ID | Requirement |
|:---|:------------|
| FR-006.1 | Hebrew support |
| FR-006.2 | Save conversation history |
| FR-006.3 | Respond in reasonable time (<5 seconds) |
| FR-006.4 | Adapt to user's style |

## FR-007: Budget Management

| ID | Requirement |
|:---|:------------|
| FR-007.1 | Add budget items |
| FR-007.2 | Track estimated vs actual costs |
| FR-007.3 | View budget summary and totals |

## FR-008: Guest Management

| ID | Requirement |
|:---|:------------|
| FR-008.1 | Add guests to list |
| FR-008.2 | Track RSVP status |
| FR-008.3 | Handle plus-ones |
| FR-008.4 | Table assignments |

---

# 6. Non-Functional Requirements

## NFR-001: Performance

| ID | Requirement |
|:---|:------------|
| NFR-001.1 | Response time < 5 seconds |
| NFR-001.2 | Support 100 concurrent users (MVP) |

## NFR-002: Reliability

| ID | Requirement |
|:---|:------------|
| NFR-002.1 | 99% availability |
| NFR-002.2 | Daily data backup |

## NFR-003: Security

| ID | Requirement |
|:---|:------------|
| NFR-003.1 | Data encryption |
| NFR-003.2 | Event isolation |
| NFR-003.3 | Participant-based permissions |

## NFR-004: Usability

| ID | Requirement |
|:---|:------------|
| NFR-004.1 | Natural Hebrew |
| NFR-004.2 | Explanations when needed |
| NFR-004.3 | Forgiveness for typos |

---

**Event.nApp-Agno | AI-Powered Event Planning (Python/Agno Implementation)**
