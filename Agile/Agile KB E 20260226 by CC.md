# Agile Knowledge Base — Comprehensive Reference for AIlex

**Version:** 1.0
**Date:** 2026-02-26
**Purpose:** Reference knowledge base for the AIlex Agile Coach AI
**Language:** English (designed for LLM consumption regardless of user-facing language)
**Context:** Software development teams using Azure DevOps with 3-week sprints

---

## How to Use This Document

This knowledge base is organized into 11 sections. Each section is self-contained but cross-references other sections where relevant. When answering questions, cite the relevant section number (e.g., "See Section 3.2 — Sprint Planning").

---

# Section 1: Agile Foundations

## 1.1 The Agile Manifesto

In February 2001, seventeen experienced software practitioners met at the Snowbird ski resort in Utah and produced the **Manifesto for Agile Software Development**. It is not a methodology — it is a declaration of values and principles that guide how software should be built.

### 1.1.1 The Four Values

The Manifesto states:

> "We are uncovering better ways of developing software by doing it and helping others do it. Through this work we have come to value:"

| Practical Meaning | Over | We Value More | # |
|-------------------|------|---------------|:-:|
| A five-minute conversation between a developer and a PO beats a 20-page spec document. Tools like Azure DevOps support the work — they do not replace human communication. | Processes and tools | **Individuals and interactions** | 1 |
| The real measure of progress is software the customer can see, touch, and give feedback on — not the number of documents produced. Document what is necessary, but the test is working code. | Comprehensive documentation | **Working software** | 2 |
| The customer is a partner, not an adversary. They participate in Sprint Reviews every 3 weeks, give feedback, and help steer direction — instead of arguing about what the contract says. | Contract negotiation | **Customer collaboration** | 3 |
| Plans are essential but not sacred. When reality changes — and in software it always does — adapt the plan. A 3-week sprint limits the blast radius of any wrong assumption. | Following a plan | **Responding to change** | 4 |

**Critical nuance:** The Manifesto says "over," not "instead of." Processes, tools, documentation, contracts, and plans all matter. But when there is tension, the left side takes priority.

### 1.1.2 The Twelve Principles

Behind the four values stand twelve guiding principles. Below is each principle with a practical example relevant to a software development team working in 3-week sprints.

| Practical Example | Principle | # |
|-------------------|-----------|:-:|
| Even in Sprint 1, deliver something the customer can see — a login screen, a basic dashboard. Do not wait six months. | **Satisfy the customer** through early and continuous delivery of valuable software. | 1 |
| The customer realizes after Sprint 3 that the reporting interface needs rework? Good — update the Backlog, reprioritize, and address it in the next Sprint. | **Welcome changing requirements**, even late in development. Agile processes harness change for the customer's competitive advantage. | 2 |
| Every 3 weeks (our sprint cadence), the team produces a tested, demonstrable Increment. | **Deliver working software frequently**, from a couple of weeks to a couple of months, with a preference for shorter timescales. | 3 |
| The PO is available to the team every day — not just at ceremonies. A developer has a question? They ask the PO directly. | **Business people and developers must work together daily** throughout the project. | 4 |
| The team decides *how* to implement stories — not management or the PO. They receive the "what"; they own the "how." | **Build projects around motivated individuals.** Give them the environment and support they need, and **trust them** to get the job done. | 5 |
| When a story is unclear, do not write a long email chain. Walk over, call, or video-chat for two minutes. The Daily Standup is a face-to-face sync, not a written report. | The most efficient method of conveying information is **face-to-face conversation** (or the closest equivalent). | 6 |
| Do not measure progress by lines of code, documents completed, or hours logged. Measure by "how many tested, working features were completed this Sprint." | **Working software is the primary measure of progress.** | 7 |
| If the team works overtime every Sprint, something is broken. Sprint Planning must match work to real Capacity. Burnout kills Agility. | Agile processes promote **sustainable development**. Everyone should maintain a constant pace indefinitely. | 8 |
| Code reviews, automated testing, CI/CD — these are not luxuries. They are what allow the team to change direction quickly without the system collapsing. Technical debt slows you down. | Continuous attention to **technical excellence and good design** enhances agility. | 9 |
| Do not build features "just in case." Do not add abstraction layers nobody needs yet. Build the simplest solution that meets the need. YAGNI — You Ain't Gonna Need It. | **Simplicity** — the art of maximizing the amount of work not done — is essential. | 10 |
| The team collectively decides in Sprint Planning who works on what and how to split tasks — not a manager assigning work top-down. | The best architectures, requirements, and designs emerge from **self-organizing teams**. | 11 |
| The Retrospective at the end of every Sprint: What worked? What did not? What will we change? Then — real Action Items, not just "a nice discussion." | At regular intervals, the team **reflects** on how to become more effective, then tunes and adjusts its behavior accordingly. | 12 |

### 1.1.3 Common Questions — Agile Foundations

**Q: Is Agile just "no planning"?**
A: Absolutely not. Agile involves *more* planning, not less — but in shorter cycles. You plan at the Release level, the Sprint level, and every single day at the Daily Standup. The difference is that the plan is expected to evolve.

**Q: Does "working software over documentation" mean we should not document anything?**
A: No. Document what is necessary — architecture decisions, API contracts, onboarding guides. But the purpose of documentation is to support the work, not to be the work. If a document does not help someone build or maintain the software, question whether it is needed.

**Q: Can Agile work with fixed-price contracts?**
A: Yes, but it requires adaptation. See [Section 10.5 — Agile Contracts and Fixed-Price Projects] for detailed guidance.

---

## 1.2 Scrum Framework Overview

**Scrum** is the most widely adopted Agile framework. It is not a methodology (which prescribes specific techniques) but a **framework** — a minimal structure within which teams can employ various processes and techniques.

Scrum is founded on **empirical process control theory** (empiricism), asserting that knowledge comes from experience and that decisions should be based on what is observed. Three pillars support empiricism:

| How It Manifests | Meaning | Pillar |
|-----------------|---------|--------|
| The Sprint Board in Azure DevOps is visible to everyone. The Daily Standup keeps everyone informed. No surprises. | All participants see the same reality — what is done, what is in progress, what is blocked. | **Transparency** |
| Sprint Review — inspect the product with the customer. Retrospective — inspect the process with the team. | Frequently examine progress and artifacts to detect variances. | **Inspection** |
| After Review — PO updates priorities. After Retro — the team implements improvements. Do not continue doing what is not working. | When inspection reveals a deviation, adjust immediately. | **Adaptation** |

### Scrum at a Glance

```
SCRUM FRAMEWORK
===============

ROLES                 EVENTS                    ARTIFACTS
-----                 ------                    ---------
Product Owner         Sprint (3-week timebox)   Product Backlog
Scrum Master          Sprint Planning           Sprint Backlog
Development Team      Daily Standup             Increment
                      Backlog Refinement*       (+ Definition of Done)
                      Sprint Review
                      Sprint Retrospective

* Refinement is not an official Scrum event but is an essential ongoing activity.
```

For detailed coverage of each element:
- Roles: [See Section 2]
- Events: [See Section 3]
- Artifacts: [See Section 4]

---

## 1.3 Kanban Basics

**Kanban** (from Japanese: "visual signal" or "card") is a method for managing knowledge work that emphasizes **visualizing work, limiting work in progress (WIP), and optimizing flow**.

### Core Practices of Kanban

| Description | Practice |
|-------------|----------|
| Make all work visible on a board with columns representing stages (e.g., To Do, In Progress, Review, Done). | **Visualize the workflow** |
| Set explicit limits on how many items can be in each stage simultaneously. This prevents overloading and exposes bottlenecks. | **Limit Work in Progress (WIP)** |
| Monitor and optimize the flow of work items through the system. Track Cycle Time and Lead Time. | **Manage flow** |
| Write down the rules — what "Done" means, what triggers a pull, how blocked items are handled. | **Make policies explicit** |
| Regular standups, delivery reviews, and operations reviews provide feedback at different cadences. | **Implement feedback loops** |
| Use data (metrics) to identify improvements, run small experiments, and evolve the process. | **Improve collaboratively, evolve experimentally** |

### Kanban vs. Scrum: Key Differences

| Kanban | Scrum | Aspect |
|--------|-------|--------|
| Continuous flow — no fixed iterations | Fixed-length sprints (e.g., 3 weeks) | **Cadence** |
| No prescribed roles | PO, SM, Dev Team (prescribed) | **Roles** |
| Continuous — pull when ready | Sprint Planning at start of each sprint | **Planning** |
| Items can be added/removed anytime | No changes during Sprint | **Change policy** |
| WIP limits govern flow | Sprint Backlog is committed | **Commitment** |
| Cycle Time, Lead Time, Throughput | Velocity, Burndown | **Metrics** |
| Board is persistent | Board resets each sprint | **Board resets** |

---

## 1.4 Lean Principles

Agile draws heavily from **Lean thinking**, originally developed in manufacturing (Toyota Production System). The seven Lean principles applied to software development:

| Agile Application | Lean Principle | # |
|-------------------|----------------|:-:|
| Remove activities that do not produce value — unnecessary documentation, handoffs, waiting, partially done work, task switching. | **Eliminate waste** | 1 |
| Short iterations, frequent feedback, pair programming, code reviews, retrospectives — all amplify learning. | **Amplify learning** | 2 |
| Defer decisions until the "last responsible moment" when you have the most information. Do not lock in architecture decisions in Sprint 1 that can wait until Sprint 4. | **Decide as late as possible** | 3 |
| Shorter cycle times, smaller batch sizes, continuous delivery. The faster you deliver, the faster you learn. | **Deliver as fast as possible** | 4 |
| Trust the people doing the work to make decisions about how to do the work. Avoid micromanagement. | **Empower the team** | 5 |
| Quality is not inspected in at the end — it is built in throughout. Automated testing, CI/CD, Definition of Done, code reviews. | **Build integrity in** | 6 |
| Optimize for the entire value stream, not local efficiencies. A developer finishing their Task fast does not help if QA is the bottleneck. | **Optimize the whole** | 7 |

---

## 1.5 When to Use Scrum vs. Kanban vs. Hybrid

| Why | Recommended Approach | Scenario |
|-----|---------------------|----------|
| The prescribed roles, events, and timeboxes provide necessary structure for teams learning Agile. | **Scrum** | New team starting Agile |
| When work is continuous (e.g., support, maintenance), fixed sprints can feel forced. Kanban's flow-based approach fits better. | **Kanban** | Established team with predictable work |
| Use Scrum's sprint cadence and planning for project work, while applying Kanban's WIP limits and flow optimization for support/bug work. | **Hybrid (Scrumban)** | Team doing both project work and support |
| Operations work is interrupt-driven and unpredictable — Kanban accommodates this naturally. | **Kanban** | Ops/DevOps team |
| Consistency across teams in ceremonies, cadence, and integration points matters for scaling. | **Scrum** (aligned) | Team within a larger Scrum organization |
| We use Scrum as our framework (sprints, roles, ceremonies) but apply Kanban practices (WIP limits, board visualization, flow metrics) within sprints. | **Scrum with Kanban practices** | **Our context** (software dev, 3-week sprints, Azure DevOps) |

### What is Scrumban?

Scrumban combines elements of both:
- Sprint cadence from Scrum (our 3-week sprints)
- WIP limits from Kanban on the Sprint Board
- Planning triggered by sprint boundaries (Scrum) or by WIP falling below a threshold (Kanban)
- Retrospectives at sprint boundaries
- Continuous flow within each sprint

This is effectively what most modern Scrum teams practice, including ours.

---

# Section 2: Scrum Roles In Depth

## 2.1 Product Owner (PO)

### 2.1.1 Responsibilities

The Product Owner is **one person** (not a committee) who is responsible for maximizing the value of the product and the work of the Development Team. Key responsibilities:

| What It Means In Practice | Responsibility |
|--------------------------|----------------|
| The PO is the single source of truth for what needs to be built. They create, order, and maintain Product Backlog Items (PBIs). | **Own the Product Backlog** |
| The PO sets the long-term objective for the product and ensures the team understands why they are building what they are building. | **Define and communicate the Product Goal** |
| Using techniques like MoSCoW (Must/Should/Could/Won't) or WSJF (Weighted Shortest Job First), the PO ensures the team always works on the highest-value items first. | **Prioritize ruthlessly** |
| Stories must be clear, valuable, and testable. The PO writes them (or works with stakeholders to write them) and ensures they meet the Definition of Ready. [See Section 5] | **Write or ensure quality User Stories** |
| At Sprint Review, the PO determines whether each completed item meets the Acceptance Criteria and Definition of Done. | **Accept or reject work** |
| The PO must be accessible to the team daily for questions and clarifications — not just at ceremonies. An absent PO is one of the most damaging anti-patterns. [See Section 9] | **Be available** |
| The PO communicates progress, manages competing demands from stakeholders, and shields the team from external pressure. | **Manage stakeholder expectations** |

### 2.1.2 Authority

The PO has **sole authority** over:
- What goes into the Product Backlog
- The order (priority) of items in the Product Backlog
- Accepting or rejecting completed work

The PO does **not** have authority over:
- How the team implements work (that is the Development Team's domain)
- The team's process (that is the Scrum Master's domain)
- Technical decisions (those belong to the Development Team)

### 2.1.3 Common PO Mistakes

| Remedy | Symptom | Mistake |
|--------|---------|---------|
| PO must dedicate significant time (minimum 50% for a single team) and be reachable daily. If the PO cannot commit, assign a proxy with real decision-making authority. | Team waits days for clarification; Stories are interpreted incorrectly; Sprint Review has no meaningful acceptance. | **Absent PO** |
| PO must understand the product vision and have authority to say "no" or "not yet" to stakeholders. | PO simply transcribes stakeholder requests without prioritizing, questioning, or adding context. Backlog becomes a wish list. | **PO as order-taker** |
| PO defines the "what" and "why." The team owns the "how." The PO can participate in technical discussions but should not override the team. | PO tells the team *how* to build, not just *what* to build. Prescribes database schemas, APIs, or architecture. | **PO dictating implementation** |
| Stories should be refined collaboratively in Backlog Refinement sessions with the team. [See Section 3.4] | Stories lack technical considerations, are ambiguous, or miss edge cases because the PO did not involve the team. | **PO writing Stories alone** |
| A User Story is a placeholder for a conversation, not a contract. Keep Stories concise and use Acceptance Criteria to define scope. [See Section 5] | Stories read like detailed specification documents with no room for conversation. | **Over-detailed Stories** |

---

## 2.2 Scrum Master (SM)

### 2.2.1 Servant-Leadership

The Scrum Master is **not** a project manager, a team secretary, or a police officer. The SM is a **servant-leader** — someone who leads by serving the team. The role exists to:

- **Facilitate** — Guide the team through Scrum events, ensuring they are productive and timeboxed.
- **Coach** — Help team members understand and adopt Scrum values and practices.
- **Remove impediments** — Identify and eliminate obstacles that slow the team down.
- **Shield** — Protect the team from external distractions and scope creep during the Sprint.
- **Improve** — Continuously evolve the team's process based on Retrospective insights.

### 2.2.2 Facilitation vs. Management

| Management (SM does NOT do this) | Facilitation (SM does this) |
|----------------------------------|----------------------------|
| Makes decisions on behalf of the team | Guides discussions so all voices are heard |
| Assigns tasks to individuals | Ensures ceremonies stay timeboxed and focused |
| Tells people what to do | Asks powerful questions that prompt reflection |
| Reports team performance to management | Creates a safe space for honest feedback |
| Serves as a proxy manager or "team lead" | Helps the team self-organize |

### 2.2.3 Coaching vs. Managing

A coach **asks questions** to help someone find their own answer. A manager **gives answers** (or orders). The SM should primarily operate as a coach:

- Instead of: "You should split that Story into three smaller ones."
- Say: "That Story seems large — what do you think about breaking it down? What are the natural seams?"

- Instead of: "Move that Task to In Progress."
- Say: "I notice this Task has been in New for three days. Is there anything blocking it?"

### 2.2.4 Common SM Mistakes

| Remedy | Symptom | Mistake |
|--------|---------|---------|
| SM must step back from command-and-control. Focus on process, not individual task management. | SM assigns work, tracks hours, creates Gantt charts, reports to management on individual performance. Team stops self-organizing. | **SM = Project Manager** |
| SM must actively coach the team, facilitate discussions, and drive process improvement. | SM only books meetings, takes notes, and updates the board. No coaching, no improvement, no impediment removal. | **SM = Secretary** |
| SM should create psychological safety. Rules are guardrails, not prisons. Adapt the process to the team, not the other way around. | SM enforces rules rigidly, punishes deviation, and creates fear. Team hides problems instead of surfacing them. | **SM = Police** |
| SM must own an impediment log, track resolution, and escalate when needed. If an impediment is outside the team's control, escalate to management. | Impediments are raised in Daily Standup and then forgotten. The same blockers appear day after day. | **SM does not remove impediments** |
| Retrospective is the SM's most important ceremony. Prepare it, vary the format, ensure real Action Items, and follow up on them. [See Section 3.6] | No continuous improvement. The team repeats the same mistakes. | **SM skips Retro or makes it superficial** |

---

## 2.3 Development Team

### 2.3.1 Self-Organization

The Development Team decides **how** to turn Product Backlog Items into working Increments. No one — not the PO, not the SM, not management — tells the team how to do their technical work. Self-organization means:

- The team collectively decides who works on what during Sprint Planning.
- The team re-organizes work during the Sprint as needed (e.g., swarming on a blocked item).
- The team makes technical decisions (architecture, design, technology choices).
- The team holds each other accountable for quality and process.

### 2.3.2 Cross-Functionality

A cross-functional team has **all the skills needed** to deliver a complete Increment without depending on external people. This does not mean every person has every skill — it means the *team as a whole* covers everything: development, testing, design, database, deployment, etc.

### 2.3.3 T-Shaped Skills

The ideal team member has **T-shaped skills**:

```
         BREADTH (broad knowledge across many areas)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                        │
                        │  DEPTH
                        │  (deep expertise
                        │   in one area)
                        │
                        │
```

- The **horizontal bar** represents broad understanding: they know enough about testing, databases, DevOps, UX, etc. to collaborate effectively.
- The **vertical bar** represents deep specialization: they are truly expert in one or two areas (e.g., backend development, database design).

T-shaped team members reduce bottlenecks. If the only person who knows how to write SQL queries is sick, the project does not stop.

### 2.3.4 Recommended Team Size

The Scrum Guide recommends **3-9 developers** (not counting PO and SM). The reasoning:

- **Fewer than 3:** Not enough diversity of skills; bottleneck risk is high.
- **More than 9:** Communication overhead becomes too high; coordination costs outweigh benefits. Consider splitting into multiple teams.

### 2.3.5 Common Developer Mistakes in Agile

| Remedy | Description | Mistake |
|--------|-------------|---------|
| During Sprint Planning, distribute work collaboratively. Address the pattern in Retro if it persists. | Always choosing the "fun" or familiar Tasks, leaving difficult or boring ones for others. | **Cherry-picking** |
| "Done" means the Acceptance Criteria are met and DoD is satisfied — no more, no less. | Adding features or polish beyond what the Acceptance Criteria require. | **Gold plating** |
| Update your Task status at least once daily — ideally as soon as status changes. The board must always be the source of truth. | Tasks stay in "In Progress" for days without updates. The board does not reflect reality. | **Not updating the board** |
| Raise blockers immediately. Ask for help. The Daily Standup exists precisely for this synchronization. | Developer goes silent for days, only to reveal at the Daily that they are stuck or went in the wrong direction. | **Working in isolation** |
| Always know the Sprint Goal. If you are unsure how your work connects, ask. | Developer focuses on individual Tasks without understanding how they contribute to the Sprint Goal. | **Ignoring the Sprint Goal** |

---

## 2.4 Stakeholders and Clients

### 2.4.1 Who Are Stakeholders?

Anyone outside the Scrum Team who has an interest in or is affected by the product:
- End users
- Customers / clients
- Management / executives
- Other teams that integrate with the product
- Regulatory or compliance officers

### 2.4.2 Engagement Model

| Frequency | Stakeholder Role | Activity |
|-----------|-----------------|----------|
| Every 3 weeks | Attend, observe demo, provide feedback | **Sprint Review** |
| Ongoing | Submit requests through the PO | **Backlog input** |
| As needed | Discuss priorities with the PO (not the team directly) | **Priority discussions** |
| After each Increment | Use the software and provide structured feedback | **Feedback on delivered features** |

### 2.4.3 What Stakeholders Should NOT Do

- **Do not go directly to developers** with requests — go through the PO.
- **Do not add scope mid-Sprint** — if something is urgent, discuss with the PO, who may negotiate with the team.
- **Do not treat Sprint Review as a status report** — it is an interactive session for feedback and collaboration.
- **Do not expect everything at once** — Agile delivers value incrementally. The most important things come first.

---

## 2.5 The Manager in Agile

### 2.5.1 Enabling vs. Controlling

In traditional project management, the manager assigns work, tracks progress, and makes decisions. In Agile, this authority is distributed:

| Agile Manager | Traditional Manager |
|---------------|--------------------|
| Helps the team self-organize; removes organizational blockers | Assigns tasks to individuals |
| Focuses on outcomes and value delivered | Tracks hours and utilization |
| Trusts the team's expertise; provides strategic direction | Makes technical decisions |
| Creates an environment where the team can succeed | Reports on individual performance |
| Promotes transparency and open communication | Controls information flow |

### 2.5.2 The "Frozen Middle" Problem

One of the biggest obstacles to Agile adoption is the **"frozen middle"** — middle managers who feel threatened by the shift:
- Their authority is being distributed to the team (self-organization).
- Their information advantage disappears (transparency).
- Their role as "task assigner" is replaced by the PO and team's self-organization.
- They are unsure what their new role looks like.

**The solution:** Middle managers must transition from **controllers** to **enablers**:
- Remove organizational impediments the team cannot solve on their own.
- Secure resources (budget, tools, training).
- Shield teams from political pressure.
- Develop people (career growth, skill development).
- Align multiple teams toward organizational goals.

[See Section 11 for more on Waterfall-to-Agile transition challenges]

---

# Section 3: Scrum Events (Ceremonies)

## 3.0 Overview: Events in a 3-Week Sprint

All Scrum events are **timeboxed** — they have a maximum duration that should not be exceeded. The values below are calibrated for our **3-week Sprint** (standard Scrum Guide values assume 2-week or 1-month sprints; we use 3 weeks, so timeboxes are proportionally adjusted).

| Participants | Timebox | When | Event |
|-------------|:-------:|------|-------|
| Entire Scrum Team | 3 weeks | Continuous (3 weeks) | **Sprint** |
| PO + SM + Dev Team | Up to 4 hours | Day 1 of Sprint | **Sprint Planning** |
| Dev Team + SM (PO optional) | 15 minutes | Every workday | **Daily Standup** |
| PO + SM + Dev Team | ~1 hour per session, 1-2x/week | Mid-Sprint (ongoing) | **Backlog Refinement** |
| PO + SM + Dev Team + Stakeholders | Up to 2 hours | Last day of Sprint | **Sprint Review** |
| SM + Dev Team (PO optional, no stakeholders) | Up to 1.5 hours | Last day of Sprint (after Review) | **Sprint Retrospective** |

---

## 3.1 The Sprint

### 3.1.1 What Is a Sprint?

A Sprint is a **fixed-length timebox** during which the team creates a "Done," usable, potentially releasable Increment of the product. Our Sprints are **3 weeks long** (15 working days).

### 3.1.2 Sprint Rules

| Rationale | Rule |
|-----------|------|
| Once Sprint Planning is complete, the Sprint Goal is fixed. This provides focus and stability. | **The Sprint Goal does not change** |
| The Definition of Done is never relaxed to "fit more in." | **Quality standards do not decrease** |
| The PO and Dev Team may clarify scope or negotiate scope if the initial estimate was off — but the Sprint Goal remains stable. | **Scope may be clarified and renegotiated** |
| The team is shielded from ad-hoc requests. If something truly urgent arises, it goes through the PO, who may negotiate scope. | **No external interference** |
| Only the PO can cancel a Sprint, and only if the Sprint Goal becomes obsolete. This is extremely rare. | **A Sprint can be cancelled** |

### 3.1.3 Notes for 3-Week Sprints

Standard Scrum describes sprints of 1-4 weeks (most commonly 2 weeks). Our 3-week sprints have specific implications:

| Implication | 3-Week Sprint (Ours) | 2-Week Sprint | Aspect |
|-------------|:-------------------:|:------------:|--------|
| 50% more capacity per sprint | 15 | 10 | Working days |
| Proportionally longer due to more work to plan | Up to 4 hours | ~2-3 hours | Planning timebox |
| More to demo | Up to 2 hours | ~1-1.5 hours | Review timebox |
| More time to reflect on 3 weeks of work | Up to 1.5 hours | ~1 hour | Retro timebox |
| Need more refinement to keep backlog ready for the larger sprint | 2-3 total | 1-2 total | Refinement sessions |
| Slightly longer feedback loop — compensate by being extra diligent about stakeholder communication | Every 3 weeks | Every 2 weeks | Feedback cycle |
| Do not compare velocity numbers with 2-week-sprint teams without normalizing | Points/3 weeks | Points/2 weeks | Velocity baseline |

---

## 3.2 Sprint Planning

### 3.2.1 Purpose

Sprint Planning answers two questions:
1. **What** can be delivered in this Sprint? (Select items from the Product Backlog)
2. **How** will the chosen work be accomplished? (Break items into Tasks)

The output is the **Sprint Backlog** — the set of Product Backlog Items selected for the Sprint, plus the plan for delivering them — and the **Sprint Goal**.

### 3.2.2 Preparation (Before the Meeting)

| What to Prepare | Who |
|----------------|-----|
| Product Backlog is ordered by priority. Top items meet the Definition of Ready. PO can articulate the value of each top item. Proposed Sprint Goal is drafted. | **PO** |
| Room/meeting is set up. Previous Sprint's velocity is known. Team capacity is calculated (accounting for vacations, holidays, meetings). Azure DevOps Sprint is configured. | **SM** |
| Developers have reviewed the top Backlog items. They come prepared to ask questions and estimate. | **Dev Team** |

### 3.2.3 Part 1: The "What" (Selecting Stories)

1. PO presents the proposed Sprint Goal.
2. PO walks through the top-priority items in the Product Backlog, explaining the "what" and "why."
3. Team asks clarifying questions.
4. Team assesses how many items they can complete in the Sprint, based on:
   - **Historical velocity** (average Story Points completed in past sprints)
   - **Available capacity** (working days minus vacations, holidays, planned absences)
   - **Complexity and risk** of the selected items
5. Team selects items and **commits** to the Sprint Goal (not to every individual item — the Goal is the commitment).

### 3.2.4 Part 2: The "How" (Task Breakdown)

1. For each selected Story, the team identifies **Tasks** needed to complete it.
2. Tasks are typically: implementation, unit testing, code review, integration testing, documentation, deployment, etc.
3. Tasks are estimated in **hours** (unlike Stories, which are estimated in Story Points). Task estimates help with daily tracking and capacity planning.
4. Total estimated hours should not exceed available capacity.

### 3.2.5 The Sprint Goal

The Sprint Goal is a **single, concise objective** that gives the Sprint its purpose. It is not a list of Stories — it is the *reason* the Sprint exists.

**Good Sprint Goals:**
- "Users can register, log in, and reset their password."
- "The reporting module is fully functional for the three core report types."
- "Performance is optimized so page load is under 2 seconds."

**Bad Sprint Goals:**
- "Complete Stories 101, 102, 103, 104, 105." (This is a list, not a goal.)
- "Work on the backlog." (Too vague to be meaningful.)
- "Make progress." (Not specific or measurable.)

### 3.2.6 Capacity Planning for 3-Week Sprints

Capacity planning ensures the team does not over-commit or under-commit.

**Step-by-step:**

1. **Count working days:** 3 weeks x 5 days = 15 working days per person.
2. **Subtract absences:** Vacations, holidays, training, known meetings.
3. **Apply a focus factor:** Not every hour is productive Sprint work. Account for meetings, email, administrative tasks. A common focus factor is 70-80%.
4. **Calculate per-person capacity:** (Working days - Absences) x Hours/day x Focus factor.
5. **Sum team capacity:** Add up all individual capacities.
6. **Compare to velocity:** Historical velocity (in Story Points) provides a cross-check. If the team's average velocity is 40 points per Sprint, do not plan for 60.

**Example:**

| Capacity (hrs) | Focus (75%) | Hours/Day | Net Days | Absences | Working Days | Team Member |
|:--------------:|:-----------:|:---------:|:--------:|:--------:|:-----------:|-------------|
| 90             | 0.75        | 8         | 15       | 0        | 15          | Dev A       |
| 78             | 0.75        | 8         | 13       | 2        | 15          | Dev B       |
| 90             | 0.75        | 8         | 15       | 0        | 15          | Dev C       |
| 84             | 0.75        | 8         | 14       | 1        | 15          | Dev D       |
| **342 hrs**    |             |           |          |          |             | **Total**   |

### 3.2.7 Common Sprint Planning Mistakes

| Fix | Impact | Mistake |
|-----|--------|---------|
| Use historical velocity as the primary guide. Resist the temptation to plan for the "ideal" scenario. | Team consistently fails to complete all planned work. Morale drops. Trust erodes. | **Over-commitment** |
| Always define a Sprint Goal first, then select items that support it. | Sprint becomes a grab-bag of unrelated items. No focus. Hard to make scope trade-offs. | **No Sprint Goal** |
| Backlog Refinement must happen *before* Sprint Planning. The top items must meet Definition of Ready. | Stories are vague, poorly ordered, missing Acceptance Criteria. Planning takes too long. | **PO not prepared** |
| Always break Stories into Tasks and estimate in hours. This is where hidden complexity is discovered. | Team commits to Stories without understanding the work involved. Estimates are inaccurate. | **Skipping Task breakdown** |
| Use Story Points for sizing (Sprint commitment) and hours for task-level planning (daily tracking). Both serve different purposes. | Team ignores Story Points and plans purely by hours. Loses the benefits of relative estimation and velocity. | **Planning by hours only** |

---

## 3.3 Daily Standup (Daily Scrum)

### 3.3.1 Purpose

The Daily Standup is a **15-minute synchronization meeting** for the Development Team. Its purpose is to inspect progress toward the Sprint Goal, identify impediments, and adapt the plan for the day. It is **not** a status report to management.

### 3.3.2 The Three Questions

Each team member answers:

1. **What did I accomplish since the last Daily?** (Focus on items moved forward toward the Sprint Goal.)
2. **What will I work on today?** (What is the plan for the next 24 hours.)
3. **Are there any impediments?** (Anything blocking my progress.)

### 3.3.3 Rules

| Rationale | Rule |
|-----------|------|
| Long standups lose effectiveness. Detailed discussions happen *after* the standup in "parking lot" conversations. | **15 minutes maximum** |
| Consistency reduces coordination overhead. | **Same time, same place, every day** |
| Standing discourages long-winded updates. | **Standing up** (if in person) |
| Developers address each other, not the SM or PO. It is a peer synchronization, not a report-up. | **Team talks to team** |
| Identify problems; do not solve them in the standup. Take detailed discussions offline. | **No problem-solving** |
| The SM ensures the meeting runs smoothly but does not turn it into an inquisition. | **SM facilitates, does not interrogate** |

### 3.3.4 Async Daily Alternatives

For distributed or remote teams, an **asynchronous Daily** can work:

- Each team member posts their 3-question update in a shared channel (Teams, Slack) by a set time each morning.
- The SM reviews posts and identifies impediments or coordination needs.
- Follow-up conversations happen as needed.

**When async works:** When the team is distributed across time zones, or when daily meetings genuinely disrupt deep-focus work.

**When async does NOT work:** When the team is new to Agile, when there are many dependencies between team members, or when impediments are not being surfaced.

### 3.3.5 Common Daily Standup Anti-Patterns

| Fix | What It Looks Like | Anti-Pattern |
|-----|-------------------|-------------|
| SM should physically step back. The Daily is for the team. Management should not attend unless invited by the team. | Team members face the SM or manager, not each other. Updates feel like justification. | **Status report to the boss** |
| Park it: "Great topic — let's discuss right after the standup." | Two developers dive into a 10-minute technical discussion while everyone else waits. | **Problem-solving session** |
| Each person gets ~1-2 minutes. SM enforces timebox politely. | One person gives a 5-minute update. | **Monologues** |
| Focus on impediments, not blame. The SM addresses systemic issues outside the Daily. | "I couldn't do anything because X didn't deliver." Finger-pointing instead of problem-solving. | **Blame game** |
| Reinforce the value of the Daily. If it is not valuable, fix the format — do not cancel it. | Team stops doing Dailies or attendance is spotty. Synchronization breaks down. | **Skipping the Daily** |

---

## 3.4 Backlog Refinement (Grooming)

### 3.4.1 Purpose

Backlog Refinement is the **ongoing activity** of preparing Product Backlog Items for future Sprints. The goal: the top items in the Backlog should always meet the **Definition of Ready** so Sprint Planning runs smoothly.

### 3.4.2 What Happens in Refinement

| Description | Activity |
|-------------|----------|
| PO explains the "what" and "why." Team asks questions. Ambiguities are resolved. | **Clarify Stories** |
| Define the conditions under which a Story is considered complete. Use Given/When/Then format. [See Section 5] | **Write/refine Acceptance Criteria** |
| Team estimates Stories using Planning Poker (Story Points). [See Section 6] | **Estimate** |
| Large Stories (typically 13+ points) are split into smaller, independently valuable Stories. [See Section 5.5] | **Split** |
| PO re-orders the Backlog based on value, risk, and dependencies. | **Order** |
| Note technical dependencies, cross-team dependencies, or external dependencies. | **Identify dependencies** |

### 3.4.3 Definition of Ready (DoR)

A Story is "Ready" for Sprint Planning when it meets these criteria:

| Description | Criterion |
|-------------|-----------|
| The Story is written in a standard format, and all team members understand what it means. | **Clear** |
| The Story has a Story Point estimate agreed on by the team. | **Estimated** |
| The Story can be completed within one Sprint (ideally 1-5 points for a 3-week sprint). | **Small enough** |
| Specific, testable criteria are written. | **Acceptance Criteria defined** |
| Any dependencies on other stories, teams, or external factors are known. | **Dependencies identified** |
| Major questions are resolved. Minor details can be clarified during the Sprint. | **No open questions** |

### 3.4.4 Refinement Cadence for 3-Week Sprints

| Recommended Practice | Timing |
|---------------------|--------|
| Light refinement — team is focused on current Sprint work. Maybe one 1-hour session. | **Week 1 of Sprint** |
| Primary refinement — 1-2 sessions of ~1 hour each. Focus on top items for the *next* Sprint. | **Week 2 of Sprint** |
| Final refinement polish — ensure top items meet DoR before Sprint Planning. Short session (30-60 min) if needed. | **Week 3 of Sprint** |

**Rule of thumb:** The team should spend about **10% of its Sprint capacity** on refinement. For a 3-week Sprint, that is roughly 6 hours total (spread across 2-3 sessions).

---

## 3.5 Sprint Review

### 3.5.1 Purpose

The Sprint Review is an **inspection of the Increment** combined with **collaborative feedback** from stakeholders. It is an opportunity to:
- Demo working software (not slides, not mockups — working, tested software).
- Gather feedback and adapt the Product Backlog.
- Discuss what could be delivered next.
- Celebrate completed work.

### 3.5.2 Who Attends

| Role in the Meeting | Attendance | Role |
|-------------------|:----------:|------|
| Opens the meeting, presents Sprint Goal and results, accepts/rejects work | Required | PO |
| Facilitates the meeting, keeps it timeboxed | Required | SM |
| Demos the completed work | Required | Dev Team |
| Observe, ask questions, provide feedback | Invited | Stakeholders/Clients |
| Observe, understand progress | Invited | Management |

### 3.5.3 Meeting Structure

1. **Opening (5-10 min):** PO recaps the Sprint Goal and summarizes what was completed vs. planned.
2. **Demo (45-60 min):** Developers demonstrate each completed Story as working software. Live demo, not screenshots.
3. **Feedback (20-30 min):** Stakeholders ask questions, provide feedback, suggest changes. PO captures feedback as new Backlog items.
4. **Backlog outlook (10-15 min):** PO presents what is coming next and solicits input on priorities.
5. **Closing (5 min):** Summary of action items and key feedback.

### 3.5.4 Sprint Review Best Practices

- **Demo from the user's perspective** — walk through a user workflow, not a list of technical changes.
- **Only demo "Done" work** — if it does not meet the Definition of Done, do not show it. Showing incomplete work sets false expectations.
- **Let developers demo their own work** — it builds ownership and confidence.
- **Capture feedback immediately** — the SM or PO notes new items and adds them to the Backlog.
- **Celebrate** — acknowledge the team's effort and completed work.

### 3.5.5 Common Sprint Review Anti-Patterns

| Fix | Anti-Pattern |
|-----|-------------|
| Always demonstrate working software. If the feature is a backend API, demonstrate it through a test or tool (Postman, Swagger). | **PowerPoint instead of live demo** |
| Actively invite stakeholders. Make the Review valuable for them. If they never come, discuss why — maybe the cadence, timing, or content needs adjustment. | **No stakeholders attend** |
| Only demo items that meet DoD. If something is 90% done, it is not done. | **Demoing unfinished work** |
| Explicitly ask for feedback. Use prompting questions: "What do you think?" "Is this what you expected?" "What would you change?" | **No feedback collected** |
| Focus on the product, not the people. The SM protects the tone. | **Review turns into a blame session** |

---

## 3.6 Sprint Retrospective

### 3.6.1 Purpose

The Retrospective is the team's opportunity to **inspect itself** — its process, interactions, tools, and environment — and create a plan for improvement. It is arguably the most important Scrum event because it drives continuous improvement.

### 3.6.2 Who Attends

- **Required:** Scrum Master, Development Team
- **Optional:** Product Owner (some teams include the PO, some do not — either is fine, but the PO should not dominate)
- **NOT invited:** Managers, stakeholders, clients — their presence inhibits psychological safety

### 3.6.3 Retrospective Formats

Vary the format regularly to keep Retros fresh and effective.

**Format 1: Start / Stop / Continue**
| Question | Category |
|----------|----------|
| What should we start doing that we are not doing now? | **Start** |
| What should we stop doing because it is not working? | **Stop** |
| What is working well that we should keep doing? | **Continue** |

**Format 2: Sailboat**
```
              🏝️ Island = Sprint Goal / Vision

  ☀️ Wind (what propelled us) ←→ ⚓ Anchor (what held us back)

              🪨 Rocks (risks ahead)
```

**Format 3: 4L**
| Question | Category |
|----------|----------|
| What did you enjoy this Sprint? | **Liked** |
| What did you learn? | **Learned** |
| What was missing? | **Lacked** |
| What do you wish you had? | **Longed For** |

**Format 4: Mad / Sad / Glad**
| Prompt | Category |
|--------|----------|
| What frustrated you this Sprint? | **Mad** |
| What disappointed you? | **Sad** |
| What made you happy? | **Glad** |

### 3.6.4 Running a Retro — Step by Step

1. **Set the stage (5 min):** Remind the team of the Prime Directive: "Regardless of what we discover, we understand and truly believe that everyone did the best job they could, given what they knew at the time, their skills and abilities, the resources available, and the situation at hand."
2. **Gather data (15-20 min):** Each person writes items on sticky notes (physical or digital) for the chosen format categories.
3. **Group and discuss (20-30 min):** Cluster related items. Discuss the most important themes.
4. **Vote (5 min):** Dot voting — each person gets 3 votes to place on the items they consider most important.
5. **Identify action items (15-20 min):** For the top 2-3 voted items, define specific, measurable Action Items with an owner and a due date.
6. **Close (5 min):** Review the Action Items. Confirm owners. Express appreciation.

### 3.6.5 Action Items — The Heart of the Retro

A Retro without Action Items is just a venting session. Action Items must be:

| Example | Description | Property |
|---------|-------------|----------|
| "Add code review as a step in the DoD" — not "improve code quality" | Clearly defined action | **Specific** |
| "SM will update the DoD by Wednesday" | One person is responsible for driving it | **Owned** |
| "Before next Sprint Planning" | Has a deadline | **Time-bound** |
| Add to the Sprint Backlog or a dedicated improvement backlog | Written down and reviewed | **Tracked** |
| First agenda item of next Retro: "How did our Action Items go?" | Checked at the next Retro | **Reviewed** |

### 3.6.6 Psychological Safety

The Retro only works if people feel safe to speak honestly. Signs of poor psychological safety:
- Only the SM talks; others are silent.
- People only mention positive things (no real issues raised).
- Issues are raised but attributed to unnamed "someone" instead of discussed openly.
- The same issues come up every Sprint with no improvement.

**What the SM can do:**
- Start with a check-in exercise (how are you feeling on a scale of 1-5?).
- Use anonymous input (sticky notes, digital boards like Miro, Metro Retro).
- Explicitly exclude managers.
- Model vulnerability — the SM shares their own mistakes first.
- Never punish honesty.

### 3.6.7 Common Retro Anti-Patterns

| Fix | Anti-Pattern |
|-----|-------------|
| Every Retro must produce at least 1-2 concrete Action Items. If the team cannot decide, vote and take the top item. | **No Action Items** |
| If an issue keeps recurring, the fix is not working. Dig deeper into root causes. Consider bringing it to management if it is outside the team's control. | **Same issues every Sprint** |
| Reinforce the Prime Directive. Focus on processes and systems, not individuals. | **Blame game** |
| Rotate between at least 3-4 formats. Surprise the team occasionally. | **Boring/repetitive format** |
| Never skip the Retro. It is the engine of continuous improvement. If time is short, do a mini-Retro (30 min) — but always do it. | **Skipping the Retro** |

---

# Section 4: Scrum Artifacts

## 4.1 Product Backlog

### 4.1.1 What Is the Product Backlog?

The Product Backlog is the **single, ordered list of everything** that is needed in the product. It is the sole source of requirements. It is:

- **Ordered** (not just prioritized — items at the top are worked on first)
- **Living** (constantly evolving as the product and market evolve)
- **Owned by the PO** (the PO decides what goes in and in what order)
- **Visible to everyone** (transparency)

### 4.1.2 DEEP Criteria

A healthy Product Backlog exhibits the **DEEP** properties:

| Meaning | Property |
|---------|----------|
| Items at the top are detailed and refined (ready for the next Sprint). Items lower in the backlog are less detailed — that is fine, they will be refined later. | **D**etailed appropriately |
| Items have relative size estimates (Story Points). Top items have more precise estimates. | **E**stimated |
| The Backlog is not static. Items are added, removed, split, re-ordered, and refined continuously. | **E**mergent |
| Items are in a single, sequential order reflecting business value, risk, and dependencies. | **P**rioritized (ordered) |

### 4.1.3 Backlog Item Types (Azure DevOps Hierarchy)

```
Epic (large body of work — e.g., "User Management Module")
  └── Feature (a distinct capability — e.g., "User Registration")
        └── User Story (a single user-facing behavior — e.g., "As a user, I can register with my email")
              └── Task (a unit of developer work — e.g., "Create registration API endpoint")
                    └── Bug (a defect — can be linked at any level)
```

| Who Creates | Typical Size | Scope | Item Type |
|:-----------:|:------------:|-------|-----------|
| PO + Stakeholders | Months of work | Large strategic initiative spanning multiple sprints | **Epic** |
| PO | 1-3 sprints | Distinct capability within an Epic | **Feature** |
| PO + Team | 1-8 Story Points (fits in 1 sprint) | Single, user-facing behavior | **User Story** |
| Dev Team | Hours (2-16 hrs typically) | Developer work unit within a Story | **Task** |
| Anyone (usually Dev Team or QA) | Variable | Defect or unexpected behavior | **Bug** |

### 4.1.4 Backlog Ordering Principles

The PO orders the Backlog considering:

| Description | Factor |
|-------------|--------|
| Higher value = higher priority. What delivers the most impact to users or the business? | **Business value** |
| High-risk items should be addressed early to reduce uncertainty (fail fast). | **Risk** |
| If Story B depends on Story A, Story A must come first. | **Dependencies** |
| Sometimes a "quick win" (high value, low effort) should be pulled up. | **Effort** |
| Feedback from Sprint Reviews and stakeholder conversations informs ordering. | **Stakeholder input** |
| Some capacity should always be reserved for addressing technical debt. [See Section 10.3] | **Technical debt** |

### 4.1.5 Common Questions — Product Backlog

**Q: How big should the Backlog be?**
A: There is no fixed limit, but a practical guideline: have enough refined items ready for 2-3 sprints ahead. Items beyond that can be rough placeholders. A Backlog with 500 items is a sign that it needs pruning — most of those items will never be built.

**Q: Should bugs go in the Product Backlog?**
A: Yes. Bugs are prioritized alongside Stories. A critical bug may go to the top; a cosmetic bug may go to the bottom. The PO decides priority. Some teams use a separate "bug budget" — reserving a fixed percentage of Sprint capacity for bugs.

---

## 4.2 Sprint Backlog

### 4.2.1 What Is the Sprint Backlog?

The Sprint Backlog is the **set of Product Backlog Items selected for the Sprint**, plus the **plan for delivering them** (Task breakdown). It is:

- Created during Sprint Planning
- Owned by the Development Team
- A living plan — the team updates it daily as they learn more
- Includes the Sprint Goal

### 4.2.2 Sprint Backlog vs. Commitment

The Development Team commits to the **Sprint Goal**, not to every individual Story. If the team discovers that they cannot complete all planned Stories, they negotiate with the PO:
- "We can complete Stories A, B, and C, but not D. Do you want us to drop D or swap it for something smaller?"
- The Sprint Goal should still be achievable even if some individual items are dropped.

### 4.2.3 Task Breakdown Best Practices

| Guidance | Practice |
|----------|----------|
| Each Task should be 2-16 hours of work. Larger Tasks need splitting. | **Task size** |
| Common task types: Development, Code Review, Unit Testing, Integration Testing, Documentation, Deployment Configuration. | **Task types** |
| A Task is owned by one person at a time (even if pair programming). | **Task ownership** |
| Track: New → In Progress → Done (or your team's specific statuses). Update status at least daily. | **Task status** |

---

## 4.3 Increment

### 4.3.1 What Is an Increment?

The Increment is the **sum of all Product Backlog Items completed during a Sprint**, combined with all previous Increments. Each Increment must be:

- **Usable** — it adds real value
- **"Done"** — it meets the Definition of Done
- **Potentially shippable** — it could be released to production (even if the decision is not to release it yet)

### 4.3.2 Definition of Done (DoD)

The Definition of Done is the team's **shared checklist** of what "Done" means. It ensures quality and consistency. The DoD applies to **every** Product Backlog Item completed in the Sprint.

**Sample Definition of Done:**

| Verified By | Criterion | # |
|:-----------:|-----------|:-:|
| Developer | Code is complete and implements all Acceptance Criteria | 1 |
| Developer | Unit tests written and passing (minimum coverage: TBD%) | 2 |
| Peer | Code reviewed by at least one other developer | 3 |
| Developer + QA | No critical or high-severity bugs outstanding | 4 |
| CI/CD pipeline | Integration tests passing | 5 |
| Developer | Code merged to the main/develop branch | 6 |
| DevOps/Developer | Feature is deployable to the staging environment | 7 |
| Developer | Documentation updated (if applicable — API docs, user guides) | 8 |
| PO | PO has reviewed and accepted the work | 9 |

**Evolving the DoD:** The team should review and potentially strengthen the DoD during Retrospectives. As the team matures, the DoD typically becomes more rigorous (e.g., adding performance testing, security scanning, accessibility checks).

### 4.3.3 Common Questions — Definition of Done

**Q: What if an item does not meet the DoD by the end of the Sprint?**
A: It goes back to the Product Backlog. It is **not** counted as done. It does not appear in the Sprint Review demo. It does not count toward velocity. The PO decides when it will be picked up again.

**Q: Can the DoD be different for different types of work?**
A: The DoD should apply universally. However, some teams maintain separate DoD levels (Story-level DoD, Sprint-level DoD, Release-level DoD) with increasing rigor.

---

## 4.4 Product Goal and Sprint Goal

### 4.4.1 Product Goal

The Product Goal is the **long-term objective** for the Scrum Team. It describes a future state of the product that serves as a target for the team. There is only one Product Goal at a time.

**Example:** "Deliver a fully functional customer portal that allows self-service account management, reducing support calls by 40%."

### 4.4.2 Sprint Goal

The Sprint Goal is the **single objective** for the Sprint. It is set during Sprint Planning and provides focus and coherence to the Sprint Backlog.

**Characteristics of a good Sprint Goal:**
- Achievable within the Sprint
- Specific enough to measure success
- Provides flexibility — the team can negotiate scope while preserving the Goal
- Gives the team a shared sense of purpose

[See Section 3.2.5 for examples of good and bad Sprint Goals]

---

## 4.5 Burndown and Burnup Charts

### 4.5.1 Sprint Burndown Chart

A Sprint Burndown shows **remaining work** (in hours or Story Points) over the Sprint duration.

```
Remaining
Work
  |╲
  | ╲  ← Ideal burndown (straight line)
  |  ╲
  |   ╲____
  |        ╲  ← Actual burndown (usually bumpy)
  |         ╲
  |__________╲___
  Day 1         Day 15 (end of 3-week Sprint)
```

**How to read burndown patterns:** [See Section 8.1 for detailed pattern analysis]

### 4.5.2 Release Burnup Chart

A Burnup chart shows **cumulative work completed** over time, plotted against the total scope. Unlike a Burndown, it makes scope changes visible.

```
Story
Points
  |          ___________  ← Total scope (may increase over time)
  |        /
  |      /  ← Work completed (climbing up)
  |    /
  |  /
  |/
  |________________
  Sprint 1    Sprint N
```

**Advantage of Burnup over Burndown:** A Burndown hides scope changes — if scope increases and more work is done, it looks like no progress. A Burnup shows both lines, making it clear whether the team is catching up or the scope is outpacing them.

---

## 4.6 Information Radiators

An **information radiator** is any highly visible display of key project information. The goal is to make critical data impossible to ignore.

### Examples

| Where | What It Shows | Radiator |
|-------|---------------|----------|
| Azure DevOps Board (+ physical board if co-located) | Current Sprint work items and their status | **Sprint Board** |
| Azure DevOps Dashboard widget | Remaining work in the current Sprint | **Burndown Chart** |
| Azure DevOps Dashboard widget | Historical velocity across sprints | **Velocity Chart** |
| Posted on the wall / pinned in chat channel | The current Sprint's objective | **Sprint Goal** |
| Whiteboard / shared document | Current blockers and their status | **Impediment Board** |
| Posted on the wall / wiki page | Working agreements, DoD, DoR | **Team Agreements** |
| Sprint Board (as improvement Stories) or posted on wall | Improvement actions from the last Retrospective | **Action Items from Retro** |

**Key principle:** Information radiators should be **big, visible, and always up-to-date**. A dashboard nobody looks at is not a radiator.

---

# Section 5: User Stories & Requirements

## 5.1 User Story Format

A User Story is a **short, simple description of a feature told from the perspective of the person who wants it**. It is not a specification — it is a **placeholder for a conversation**.

### 5.1.1 Standard Template

```
As a [type of user],
I want [some goal/action],
So that [some reason/benefit].
```

**Example:**
```
As a registered user,
I want to reset my password via email,
So that I can regain access to my account if I forget my password.
```

The three parts serve specific purposes:

| What to Check | Purpose | Part |
|---------------|---------|------|
| Is this a real user role? Not "As a developer" or "As the system" — those are usually Tasks, not Stories. | Identifies *who* wants this | **As a [user]** |
| Is it expressed as a user behavior, not a technical implementation? | Describes *what* they want to do | **I want [action]** |
| Does it articulate real business value? If you cannot fill this in, question whether the Story is needed. | Explains *why* they want it | **So that [benefit]** |

### 5.1.2 Common Questions — User Stories

**Q: Must every Story follow this exact format?**
A: The format is a guideline, not a law. The important thing is that the Story captures the *who*, *what*, and *why*. Some teams abbreviate to "As a user, I want to..." and keep the "so that" implicit. That is fine — as long as the value is understood.

**Q: What about technical Stories (e.g., "Set up CI/CD pipeline")?**
A: Technical work that does not directly face a user is typically handled as a **Task** within a Story, or as a separate **technical enabler** (sometimes called a "spike" or "infrastructure story"). If written as a Story, try: "As a developer, I want automated deployments, so that we can release faster with fewer errors."

---

## 5.2 INVEST Criteria

Good User Stories meet the **INVEST** criteria:

| Red Flag If Violated | What It Means | Criterion | Letter |
|---------------------|---------------|-----------|:------:|
| "We can't start Story B until Story A is done" — try to restructure to reduce dependencies. | The Story can be developed, tested, and delivered independently of other Stories. | **Independent** | **I** |
| A Story that reads like a 3-page specification leaves no room for conversation. | The Story is not a fixed contract. Details are discussed between PO and team. | **Negotiable** | **N** |
| "Create database tables" has no user-visible value — it is a Task, not a Story. | The Story delivers value to the end user or the business. | **Valuable** | **V** |
| If the team says "we have no idea how big this is," it needs refinement — usually more information or a spike. | The team can estimate the Story's size. | **Estimable** | **E** |
| A Story estimated at 20+ points is too large. Split it. [See Section 5.5] | The Story can be completed within a single Sprint. | **Small** | **S** |
| "The UI should be intuitive" is not testable. "The user can complete registration in under 2 minutes" is testable. | There are clear Acceptance Criteria that can verify the Story is done. | **Testable** | **T** |

---

## 5.3 Acceptance Criteria

Acceptance Criteria define the **specific conditions that must be met** for a Story to be considered complete. They are the contract between the PO and the team.

### 5.3.1 Given/When/Then Format (Gherkin)

```
Given [some precondition],
When [some action is performed],
Then [some expected result].
```

**Example — Password Reset Story:**

```
Acceptance Criteria:

1. Given I am on the login page,
   When I click "Forgot Password" and enter my registered email,
   Then I receive a password reset email within 2 minutes.

2. Given I received a password reset email,
   When I click the reset link within 24 hours,
   Then I am directed to a page where I can set a new password.

3. Given I am on the password reset page,
   When I enter a new password that meets the complexity requirements,
   Then my password is updated and I can log in with the new password.

4. Given I received a password reset email,
   When I click the reset link after 24 hours,
   Then I see a message saying the link has expired and I need to request a new one.
```

### 5.3.2 Tips for Good Acceptance Criteria

- **Be specific:** "Fast" is not a criterion. "Page loads in under 2 seconds" is.
- **Cover the happy path and edge cases:** What happens when things go wrong?
- **Keep it testable:** Each criterion should be verifiable through a test.
- **Not too many:** 3-7 criteria per Story is typical. More than 10 suggests the Story should be split.
- **Not too technical:** Acceptance Criteria describe *behavior*, not *implementation*. "The system uses Redis caching" is an implementation detail, not an AC.

---

## 5.4 Story Hierarchy

User Stories exist within a hierarchy that connects individual work items to the overall product vision:

```
Vision
  "Build the best customer portal in the market"
    │
    ├── Theme: "Customer Self-Service"
    │     │
    │     ├── Epic: "User Management"
    │     │     │
    │     │     ├── Feature: "User Registration"
    │     │     │     ├── Story: "As a visitor, I can register with email"
    │     │     │     ├── Story: "As a visitor, I can register with Google SSO"
    │     │     │     └── Story: "As a visitor, I receive a welcome email after registration"
    │     │     │           ├── Task: "Create email template"
    │     │     │           ├── Task: "Implement email sending service"
    │     │     │           └── Task: "Write unit tests for email service"
    │     │     │
    │     │     ├── Feature: "Password Management"
    │     │     │     ├── Story: "As a user, I can reset my password via email"
    │     │     │     └── Story: "As a user, I can change my password from settings"
    │     │     │
    │     │     └── Feature: "User Profile"
    │     │           ├── Story: "As a user, I can edit my profile information"
    │     │           └── Story: "As a user, I can upload a profile photo"
    │     │
    │     └── Epic: "Account Dashboard"
    │           └── ...
    │
    └── Theme: "Reporting & Analytics"
          └── ...
```

### Azure DevOps Mapping

| Azure DevOps Item Type | Concept |
|----------------------|---------|
| Tag or Area Path | Theme |
| Epic | Epic |
| Feature | Feature |
| User Story (or Product Backlog Item) | User Story |
| Task | Task |
| Bug | Bug |

---

## 5.5 Story Splitting Techniques

When a Story is too large (typically 8+ Story Points), split it into smaller, independently valuable Stories. Here are the main techniques:

### 5.5.1 Split by Workflow Steps

**Before (large):** "As a user, I can purchase a product online."

**After (split by steps):**
1. "As a user, I can add items to my shopping cart."
2. "As a user, I can enter my shipping address."
3. "As a user, I can pay with a credit card."
4. "As a user, I can receive an order confirmation email."

### 5.5.2 Split by Data Variations

**Before:** "As an admin, I can generate reports."

**After:**
1. "As an admin, I can generate a sales report."
2. "As an admin, I can generate a user activity report."
3. "As an admin, I can generate an inventory report."

### 5.5.3 Split by Interface

**Before:** "As a user, I can search for products."

**After:**
1. "As a user, I can search by keyword (text search)."
2. "As a user, I can filter by category."
3. "As a user, I can sort results by price, date, or relevance."

### 5.5.4 Split by Business Rules

**Before:** "As a user, I can register for an account."

**After:**
1. "As a user, I can register with email and password (basic flow)."
2. "As a user, I see validation errors if my password is too weak."
3. "As a user, I am prevented from registering with an already-used email."
4. "As a user, I must verify my email before accessing full features."

### 5.5.5 Split by Operations (CRUD)

**Before:** "As an admin, I can manage user accounts."

**After:**
1. "As an admin, I can create a new user account."
2. "As an admin, I can view user account details."
3. "As an admin, I can edit user account information."
4. "As an admin, I can deactivate a user account."

### 5.5.6 The "Thin Slice" Principle

Always aim for the **thinnest possible vertical slice** — a Story that touches all layers (UI, business logic, data) but does the minimum. Then add richness in subsequent Stories.

```
WRONG (horizontal slices):        RIGHT (vertical slices):
┌──────────────────────┐          ┌────┐┌────┐┌────┐┌────┐
│      UI Layer        │          │ UI ││ UI ││ UI ││ UI │
├──────────────────────┤          ├────┤├────┤├────┤├────┤
│   Business Logic     │          │ BL ││ BL ││ BL ││ BL │
├──────────────────────┤          ├────┤├────┤├────┤├────┤
│     Data Layer       │          │ DB ││ DB ││ DB ││ DB │
└──────────────────────┘          └────┘└────┘└────┘└────┘
(Each layer is a Story)           (Each slice is a Story)
```

---

## 5.6 Story Mapping

**User Story Mapping** (created by Jeff Patton) is a technique for organizing Stories into a coherent picture of the user experience.

### How to Build a Story Map

1. **Identify the user's journey** across the top (the "backbone"): the high-level activities the user performs.
2. **Break each activity into steps** (the "walking skeleton"): the specific actions within each activity.
3. **Place Stories below each step**, ordered by priority (top = highest priority).
4. **Draw a horizontal line** to define the MVP — everything above the line is the minimum viable product.

```
BACKBONE (User Activities):
[Browse] ──── [Search] ──── [Select] ──── [Purchase] ──── [Track]

WALKING SKELETON (Steps within each activity):
Browse:       Search:       Select:       Purchase:       Track:
- View list   - Keyword     - View detail - Add to cart   - View status
- Categories  - Filters     - Reviews     - Checkout      - Notifications
- Sort        - Save search - Compare     - Payment       - Returns

                        ─── MVP LINE ───
                   (Everything above this ships first)
```

---

## 5.7 Examples: Good vs. Bad Stories

| Why | Story | Quality |
|-----|-------|:-------:|
| No user perspective. No value stated. Sounds like a Task. | "Implement login functionality" | **Bad** |
| Clear user, clear action, clear value. | "As a registered user, I want to log in with my email and password, so that I can access my account." | **Good** |
| Not testable. Not specific. Not estimable. | "As a user, I want the system to be fast." | **Bad** |
| Specific, testable, valuable. | "As a user, I want the dashboard to load within 2 seconds, so that I can quickly access my daily metrics." | **Good** |
| This is a Task, not a Story. No user value. | "Create database tables for the user module." | **Bad** |
| User-facing. The database work becomes a Task within this Story. | "As an admin, I want to view a list of all registered users, so that I can manage user accounts." | **Good** |
| Way too large. Not estimable. Needs to be an Epic, broken into Features and Stories. | "As a PO, I want the entire reporting module built." | **Bad** |
| Specific, small, testable, valuable. | "As a manager, I want to export the monthly sales report as a PDF, so that I can share it with stakeholders." | **Good** |
| The user should be the end user, not the developer. Reframe: why are we refactoring? | "As a developer, I want to refactor the authentication module." | **Bad** |
| The Story captures user value. The technical approach is noted but not the Story itself. | "As a user, I want login to be reliable (no timeouts), so that I can access my account without frustration." (Technical: refactor auth module to fix timeout issues.) | **Better** |

---

# Section 6: Estimation & Planning

## 6.1 Story Points

### 6.1.1 What Are Story Points?

Story Points are a **relative measure of effort, complexity, and uncertainty** for a User Story. They are NOT:
- Hours or days of work
- A measure of individual productivity
- Comparable across different teams

Story Points express: "Compared to our reference story (which we call a '1'), how much bigger/harder/more uncertain is this Story?"

### 6.1.2 The Fibonacci Sequence

Teams use a modified Fibonacci sequence for estimation: **1, 2, 3, 5, 8, 13, 20, 40, 100**

Why Fibonacci and not linear (1, 2, 3, 4, 5...)?

- Larger items carry more uncertainty. The gaps between numbers grow to reflect this.
- It forces the team to make a choice: "Is this a 5 or an 8?" rather than debating "Is it a 6 or a 7?"
- It acknowledges that precision decreases as size increases.

### 6.1.3 What Makes a Story Larger?

Three factors contribute to the size of a Story:

| Example | Description | Factor |
|---------|-------------|--------|
| A CRUD screen for one entity (small) vs. a complex multi-step wizard (large) | The raw amount of work involved | **Effort** |
| A simple API call (low) vs. integrating with an unfamiliar third-party system (high) | The technical difficulty or number of unknowns | **Complexity** |
| Well-understood technology (low) vs. "we've never done this before" (high) | How much is unknown or could go wrong | **Uncertainty / Risk** |

---

## 6.2 Planning Poker

### 6.2.1 Procedure

Planning Poker is a **consensus-based estimation technique** used during Backlog Refinement.

**Step-by-step:**

1. **PO presents the Story:** Reads the Story and Acceptance Criteria aloud. The team asks clarifying questions.
2. **Private estimation:** Each team member (developers only — PO and SM do not estimate) privately selects a card with their estimate (1, 2, 3, 5, 8, 13, 20...).
3. **Reveal simultaneously:** All cards are shown at the same time. This prevents anchoring bias.
4. **Discuss outliers:** If there is significant disagreement (e.g., one person says 3 and another says 13), the highest and lowest explain their reasoning.
5. **Re-estimate:** After discussion, the team re-votes. Usually, consensus is reached in 2-3 rounds.
6. **Record the estimate:** The agreed-upon Story Point value is recorded on the Story.

### 6.2.2 Special Cards

| Meaning | Card |
|---------|------|
| "I don't have enough information to estimate." (Triggers more discussion or a spike.) | **?** |
| "This is way too big to estimate. It needs to be broken down." | **∞** |
| "I need a break." (Optional — some decks include this.) | **☕** |

### 6.2.3 Tips for Effective Planning Poker

- **Use a reference story:** Establish a Story that the whole team agrees is a "1" or "2." Compare all other Stories to this baseline.
- **Estimate as a team:** Individual estimation does not work — the value of Planning Poker is the *discussion* it triggers.
- **Timebox:** Spend no more than 5-10 minutes per Story. If consensus is not reached, table it for further refinement.
- **Do not convert to hours:** Story Points are relative, not absolute. Do not say "1 point = 4 hours."
- **Re-calibrate periodically:** If the team's understanding of "what a 3 means" drifts over time, revisit the reference stories.

---

## 6.3 Reference Stories and Calibration

### 6.3.1 Establishing Reference Stories

At the start of a project (or when a new team forms), select 3-5 completed Stories that represent different sizes:

| Reference Story Example | Points |
|------------------------|:------:|
| "Add a new field to an existing form with validation" | 1 |
| "Create a new CRUD page with list, detail, create, edit, delete" | 3 |
| "Implement email notification system with templates and retry logic" | 5 |
| "Build a report generator with filters, sorting, and PDF export" | 8 |
| "Integrate with external payment gateway including error handling and reconciliation" | 13 |

These references anchor future estimates: "Is this new Story closer to a 3 (like the CRUD page) or a 5 (like the email system)?"

### 6.3.2 Calibration Over Time

- Review reference stories every few sprints.
- If the team has grown in skill, a Story that was once a 5 may now feel like a 3. **Do not re-estimate old Stories.** Let velocity naturally adjust.
- New team members should be introduced to the reference stories during onboarding.

---

## 6.4 Velocity

### 6.4.1 What Is Velocity?

Velocity is the **total number of Story Points completed** (meeting Definition of Done) **per Sprint**. It is the primary metric for forecasting how much work the team can handle in future Sprints.

### 6.4.2 Calculating Velocity

| Story Points Completed | Sprint |
|:---------------------:|:------:|
| 25 | Sprint 1 |
| 30 | Sprint 2 |
| 28 | Sprint 3 |
| 32 | Sprint 4 |
| 27 | Sprint 5 |
| **28.4** | **Average Velocity** |

**Use the average of the last 3-5 Sprints** for forecasting. Do not use a single Sprint's velocity — it is too noisy.

### 6.4.3 Velocity Prediction

For Sprint Planning, use the team's average velocity as the **starting point** for how many points to commit to. Adjust for:
- Reduced capacity (vacations, holidays) → lower commitment
- Higher-than-usual uncertainty in the planned items → lower commitment
- A well-refined backlog with familiar technology → possibly higher commitment (but be cautious)

### 6.4.4 Velocity Misuse — WARNING

| What to Do Instead | Why It Is Harmful | Misuse |
|-------------------|-------------------|--------|
| Use velocity only within a team for that team's forecasting. | Each team estimates differently. Team A's "5" is not Team B's "5." | **Comparing velocity across teams** |
| Velocity is a planning tool, not a performance measure. | Teams will inflate estimates to show "higher velocity." This is Goodhart's Law in action. [See Section 8.7] | **Using velocity as a performance metric** |
| Focus on outcomes (value delivered), not output (points completed). | Pressure to "do more points" leads to gaming, cutting quality, or inflating estimates. | **Demanding velocity increase** |
| Investigate trends, not individual data points. Ask "why?" with curiosity, not judgment. | A Sprint with lower velocity might mean the team tackled hard problems, paid down tech debt, or dealt with unexpected complexity. | **Penalizing low velocity** |

---

## 6.5 Capacity Planning for 3-Week Sprints

[See Section 3.2.6 for the detailed capacity calculation method.]

### Additional Notes for 3-Week Sprints

- **Do not simply multiply a 2-week velocity by 1.5** to get a 3-week velocity. The team needs to establish its own 3-week velocity baseline.
- **Buffer for ceremonies:** In a 3-week Sprint, ceremony time totals approximately: Planning (4h) + 15 Dailies (3.75h) + 2-3 Refinements (3h) + Review (2h) + Retro (1.5h) = **~14 hours per person**. Account for this in capacity.
- **Mid-Sprint energy:** In a 3-week Sprint, teams sometimes experience a "valley" in the middle of week 2 where progress stalls. Monitor the Burndown and address this proactively in the Daily.

---

## 6.6 Release Planning and Forecasting

### 6.6.1 What Is Release Planning?

Release Planning looks **beyond a single Sprint** to forecast when a set of features (an Epic or Release) will be complete.

### 6.6.2 Forecasting with Velocity

**Simple forecasting formula:**

```
Sprints Remaining = Total Remaining Story Points / Average Velocity
```

**Example:**
- Remaining work: 120 Story Points
- Average velocity: 28 points/Sprint (3-week sprints)
- Estimated completion: 120 / 28 ≈ 4.3 Sprints ≈ 13 weeks

**Use a range, not a point estimate:**
- Optimistic (using highest recent velocity): 120 / 32 = 3.75 Sprints ≈ 11 weeks
- Pessimistic (using lowest recent velocity): 120 / 25 = 4.8 Sprints ≈ 14.5 weeks
- **Tell stakeholders: "We expect delivery between 11 and 15 weeks from now."**

### 6.6.3 Cone of Uncertainty

The accuracy of forecasts improves over time as the team completes more Sprints and refines the Backlog:

```
Uncertainty
     ╲
      ╲
       ╲────── Early in project: ±60-100% error
        ╲
         ╲──── After 3-4 Sprints: ±25-40% error
          ╲
           ╲── After 6-8 Sprints: ±10-15% error
            ╲
             ╲
```

**Implication:** Do not make commitments to exact dates at the start of a project. Provide ranges and refine them as data accumulates.

---

## 6.7 #NoEstimates Movement Overview

The #NoEstimates movement argues that **estimation is waste** — the effort spent estimating could be spent building. Key ideas:

| Counter-Argument | Argument |
|-----------------|----------|
| Estimation forces valuable discussion about scope, complexity, and risk — the conversation is the value, not the number. | "Estimation does not improve accuracy meaningfully." |
| This works for mature teams with consistently-sized Stories. Less useful for teams with wildly varying Story sizes. | "Just track throughput (stories/sprint) instead." |
| Agreed — but Story Points already acknowledge imprecision (Fibonacci gaps). The solution is to estimate better, not to stop estimating. | "Estimation creates false precision." |
| This is actually a valid approach — if the team has the discipline to split consistently. Count becomes a de facto estimate. | "Split all Stories to roughly the same size and just count them." |

**Practical recommendation for our teams:** Use Story Points. The planning and discussion value of estimation outweighs the time cost. If the team matures to a point where all Stories are consistently small (1-3 points), consider shifting to simple counting.

---

# Section 7: Sprint Board & Visual Management

## 7.1 Board Design

### 7.1.1 Standard Column Layout

The Sprint Board visualizes the flow of work through the Sprint. The recommended column layout:

```
┌──────────┬───────────┬──────────────┬───────────┬──────────┐
│   New    │ Approved  │ In Progress  │  Testing  │   Done   │
│          │           │              │           │          │
│ (Backlog │ (Ready to │ (Currently   │ (In QA /  │ (Meets   │
│  items   │  start)   │  being       │  code     │  DoD)    │
│  not yet │           │  worked on)  │  review)  │          │
│  started)│           │              │           │          │
└──────────┴───────────┴──────────────┴───────────┴──────────┘
```

### 7.1.2 Column Definitions

| Exit Criteria | Entry Criteria | Column |
|---------------|---------------|--------|
| Item has been reviewed and is ready for work | Item is in the Sprint Backlog | **New** |
| Developer picks it up and starts working | Team has reviewed and understands the item; dependencies are clear | **Approved** |
| All development work is complete; ready for review/testing | Developer has started working on the item | **In Progress** |
| All tests pass; code review approved; no critical bugs | Development is complete; code review is in progress or QA is testing | **Testing** |
| — (terminal state) | Meets the Definition of Done | **Done** |

### 7.1.3 Customization Tips

- Add or remove columns to match your team's workflow. The key is: **the board should reflect how work actually flows**, not how you wish it flowed.
- Some teams add a "Blocked" column or use a "Blocked" flag/tag instead.
- Do not have too many columns (>7) — it creates overhead and confusion.

---

## 7.2 WIP Limits and Pull System

### 7.2.1 What Are WIP Limits?

WIP (Work in Progress) limits are **maximum numbers of items** allowed in a board column at any given time.

**Example:**

```
┌──────────┬───────────┬──────────────┬───────────┬──────────┐
│   New    │ Approved  │ In Progress  │  Testing  │   Done   │
│          │  WIP: 5   │   WIP: 4     │  WIP: 3   │          │
└──────────┴───────────┴──────────────┴───────────┴──────────┘
```

### 7.2.2 Why WIP Limits Matter

| With WIP Limits | Without WIP Limits |
|----------------|-------------------|
| Focus on finishing items before starting new ones | Developers start many items, finish few |
| Items flow through quickly | Items sit in "In Progress" for days |
| Deep focus on one or two items at a time | Multitasking reduces quality |
| Bottlenecks become immediately visible (a full column means something is wrong upstream or downstream) | Bottlenecks are hidden |

### 7.2.3 Pull System

With WIP limits, work moves through the board using a **pull system**:
- A developer does not start new work until there is capacity in the "In Progress" column.
- A developer pulls the highest-priority item from "Approved" (or "New") when they finish their current item.
- If the "Testing" column is full, developers should **help with testing** rather than starting new development work. This is called "swarming."

### 7.2.4 Setting WIP Limits

**Starting point formula:** WIP limit = (Number of people working in that stage) + 1

- For a team of 4 developers: "In Progress" WIP limit = 5 (4 developers + 1 buffer)
- For 1 QA person: "Testing" WIP limit = 2-3

Adjust based on experience. Too low = people are idle waiting. Too high = defeats the purpose.

---

## 7.3 Blocked Items and Escalation

### 7.3.1 Identifying Blocked Items

An item is "blocked" when the developer **cannot make progress** due to an external dependency, a missing decision, a technical issue, or an unavailable resource.

### 7.3.2 Handling Blocked Items

| Who | Action | Step |
|:---:|--------|:----:|
| Developer | **Flag the item** on the board (use a "Blocked" tag or move to a "Blocked" swim lane) | 1 |
| Developer | **Raise it in the Daily Standup** | 2 |
| Developer | **Document the blocker** — what exactly is blocking and what is needed to unblock | 3 |
| SM | **SM takes ownership** of removing the impediment | 4 |
| SM | **Escalate if needed** — if the SM cannot resolve it within 24-48 hours, escalate to management | 5 |
| SM | **Track resolution** — maintain an impediment log | 6 |

### 7.3.3 Escalation Path

```
Developer raises blocker
       ↓
SM attempts to resolve (within 24-48 hours)
       ↓
If unresolved → SM escalates to management/PO
       ↓
If still unresolved → Raise in Sprint Review as impediment
```

---

## 7.4 Azure DevOps Board Configuration

### 7.4.1 Key Settings

| Recommendation | Where to Find It | Setting |
|----------------|-------------------|---------|
| Configure to match your workflow: New → Approved → In Progress → Testing → Done | Board Settings → Columns | **Board columns** |
| Set per guidance in Section 7.2.4 | Board Settings → Columns → set WIP for each column | **WIP limits** |
| Add swimlanes for: Expedite (urgent items), Bugs, Standard Work | Board Settings → Swimlanes | **Swimlanes** |
| Show: Title, Assigned To, Story Points, Tags, Remaining Work | Board Settings → Card fields | **Card fields** |
| Color-code by: Blocked (red), Bug (orange), Story (blue) | Board Settings → Styles | **Card styles** |
| Paste your team's DoD here for easy reference | Board Settings → Columns → set DoD text for the "Done" column | **Definition of Done** |

### 7.4.2 Navigation Path

```
Azure DevOps → Project → Boards → Sprints → [Select Sprint] → Taskboard
                                  → Boards → Board (for Kanban-style view)
                                  → Boards → Backlog (for list view)
```

---

## 7.5 Swimlanes

Swimlanes are **horizontal rows** on the board that separate different types of work:

| Example Items | Purpose | Swimlane |
|---------------|---------|----------|
| Critical production bugs, security incidents | Urgent items that bypass WIP limits | **Expedite** |
| User Stories being developed | Normal Sprint work | **Standard** |
| Non-critical bugs being addressed this Sprint | Bug fixes | **Bugs** |
| Refactoring, performance optimization | Technical improvement work | **Tech Debt** |

**Rule:** The "Expedite" lane should be empty most of the time. If it is always occupied, the team has a prioritization problem.

---

## 7.6 Card Design

### What Information to Show on Each Card

A well-designed card shows essential information at a glance:

| Why | Field |
|-----|-------|
| What the item is about | **Title** |
| For quick reference (e.g., #1234) | **ID** |
| Who is currently working on it | **Assigned To** |
| Size of the Story (for Stories, not Tasks) | **Story Points** |
| Hours remaining (for Tasks) | **Remaining Work** |
| Quick categorization (e.g., "Frontend," "Backend," "Blocked") | **Tags** |
| Current column (visual by position on board) | **State** |
| Visual indicator of importance | **Priority** |

**Keep cards clean.** Too much information makes the board hard to read. Put details in the item itself, not on the card.

---

# Section 8: Metrics & Health

## 8.1 Burndown Chart Patterns

The Sprint Burndown chart reveals how the team is progressing. Here are the common patterns and what they mean:

### 8.1.1 Ideal Burndown

```
Remaining ╲
Work       ╲
            ╲
             ╲
              ╲
               ╲
                ╲___  Done!
Day 1              Day 15
```

**Meaning:** Steady, consistent progress. Work is completed at a predictable rate. This is the target but rarely achieved perfectly.

### 8.1.2 Late Start

```
Remaining ───────╲
Work              ╲
                   ╲
                    ╲
                     ╲
                      ╲  Rushed!
Day 1              Day 15
```

**Meaning:** Little progress in the first week, then a rush at the end. **Causes:** Stories were not ready (insufficient refinement), team took too long to start, or sprint started before planning was complete. **Fix:** Better Sprint Planning, break Stories into Tasks on Day 1, ensure backlog is refined before the Sprint.

### 8.1.3 Scope Creep

```
Remaining    /╲
Work        /  ╲
           /    ╲
          ╱      ╲
         ╱        ╲___  Barely!
Day 1              Day 15
```

**Meaning:** Remaining work goes *up* before coming down. **Causes:** New items were added mid-Sprint, or initial estimates were too low and had to be revised upward. **Fix:** Protect the Sprint Backlog from additions. If scope increases, negotiate: "What do we remove to make room?"

### 8.1.4 Flat Line

```
Remaining ─────────────
Work

Day 1              Day 15
```

**Meaning:** No progress. The Burndown is flat. **Causes:** Team is blocked on major impediments, Stories are much harder than estimated, team is not updating the board, or team is working on items not in the Sprint Backlog. **Fix:** SM must investigate immediately. Check for blockers, check if the board reflects reality, check if the Sprint Goal is still achievable.

### 8.1.5 Staircase

```
Remaining  ──╲
Work          ╲──╲
                  ╲──╲
                      ╲──╲
                          ╲
Day 1              Day 15
```

**Meaning:** Work is completed in batches rather than continuously. **Causes:** Stories are too large (completing one drops the chart significantly), or the team delivers everything at the end of each week. **Fix:** Split Stories smaller. Encourage completing items continuously rather than in batches.

---

## 8.2 Velocity Trends

Velocity should be tracked **over time** (across Sprints) to identify trends:

| What It May Indicate | Trend |
|---------------------|-------|
| The team is performing consistently. Good for forecasting. | **Stable** |
| The team is improving, or estimates are inflating (verify with outcomes). | **Increasing** |
| The team may be dealing with increasing complexity, technical debt, reduced capacity, or declining morale. Investigate. | **Decreasing** |
| Estimation is inconsistent, scope changes mid-Sprint, or team composition is unstable. Work on estimation calibration and Sprint discipline. | **Highly variable** |

---

## 8.3 Cycle Time and Lead Time

| What It Measures | Definition | Metric |
|-----------------|-----------|--------|
| The customer's experience — how long they wait for their request. | Time from when an item is *created* (or requested) to when it is *delivered* (Done). | **Lead Time** |
| The team's efficiency — how long it takes to complete work once started. | Time from when work *starts* (In Progress) to when it is *delivered* (Done). | **Cycle Time** |

```
           Lead Time
├─────────────────────────────────────┤
│ Waiting in │      Cycle Time       │
│  Backlog   │                       │
│            ├───────────────────────┤
│            │ In Progress → Done    │
├────────────┼───────────────────────┤
Created    Started                 Done
```

**Target:** Minimize both, but especially Cycle Time (which is within the team's control). Short Cycle Time means items flow through the system quickly.

---

## 8.4 Cumulative Flow Diagram (CFD)

A CFD shows the **number of items in each state** over time, stacked:

```
Items │     ████████████████████████ Done
      │   ███████████████████████
      │  ████████████████████
      │ ███████████████          ← Testing
      │████████████
      │█████████                 ← In Progress
      │██████
      │████                      ← New/Approved
      │──────────────────────────
      Day 1                Day 15
```

**How to read:**
- **Consistent bands:** Smooth flow. Items are moving through at a steady rate.
- **Widening band (e.g., "In Progress" grows):** Work is accumulating in that state — a bottleneck.
- **Band narrows to zero:** Nothing is in that state — either the team is done (good) or work is not entering that state (bad if it means the pipeline has dried up).

---

## 8.5 Sprint Health Indicators

A quick health check for each Sprint:

| Critical | Warning | Healthy | Indicator |
|----------|---------|---------|-----------|
| Flat or going up | Significantly above ideal at mid-Sprint | On or near the ideal line | **Burndown trajectory** |
| Sprint Goal appears unachievable | Some core Stories are delayed | Core Stories are on track | **Sprint Goal progress** |
| 4+ blocked items or same item blocked for 3+ days | 2-3 blocked items | 0-1 blocked items | **Blocked items** |
| Conflict, burnout, or apathy | Some frustration or disengagement | Engaged, collaborating | **Team mood** |
| Board is not updated — nobody trusts it | Some items outdated (1 day behind) | Board reflects reality | **Board accuracy** |
| Significant scope added or removed mid-Sprint | Minor clarifications | No changes | **Scope changes** |

---

## 8.6 Dangerous Metrics

Not everything that can be measured should be measured. Some metrics **actively harm** the team when used:

| Why It Is Harmful | Dangerous Metric |
|-------------------|-----------------|
| Rewards verbosity. Punishes elegant, concise solutions. A developer who deletes 500 lines of unnecessary code created more value than one who wrote 500 lines of spaghetti. | **Lines of code** |
| Measures presence, not productivity. Encourages "looking busy" instead of solving problems efficiently. | **Hours logged** |
| Pits team members against each other. Discourages collaboration and helping others. | **Individual velocity** |
| If used to judge QA: rewards finding bugs over preventing them. If used to judge developers: encourages hiding bugs. | **Bugs found** |
| Measures compliance, not engagement. A person who attends every meeting but contributes nothing is worse than someone who misses one but is fully engaged when present. | **Meeting attendance** |
| A team at 100% utilization has no capacity for anything unexpected — no slack for improvement, learning, helping others, or dealing with emergencies. Target 70-80%. | **Utilization rate (100%)** |

---

## 8.7 Goodhart's Law in Agile Context

> **Goodhart's Law:** "When a measure becomes a target, it ceases to be a good measure."

| What Happens | Scenario |
|-------------|----------|
| Team inflates estimates. A Story that was a 3 becomes a 5. Velocity goes up, but actual work does not change. | Management says "increase velocity" |
| Team stops logging bugs or reclassifies them as "enhancements." Bug count drops, but quality does not improve. | Management says "reduce bugs" |
| Team commits to less. Or they cut quality corners to "finish everything." Or they stop using DoD rigorously. | Management says "complete all committed Stories" |

**The antidote:** Use metrics for **observation and conversation**, not for targets and rewards. Ask "what does this metric tell us?" rather than "how do we make this number go up?"

---

# Section 9: Anti-Patterns & Troubleshooting

## 9.0 What Is an Anti-Pattern?

An anti-pattern is a common response to a recurring problem that is **usually ineffective and risks being highly counterproductive**. In Agile, anti-patterns are the dysfunctions that erode the team's effectiveness while giving the *illusion* that Scrum is being followed.

---

## 9.1 Top 15 Scrum Anti-Patterns

### Anti-Pattern 1: Zombie Scrum

**Description:** The team does all the Scrum ceremonies — Planning, Daily, Review, Retro — but they are empty rituals. There is no energy, no real collaboration, no adaptation. The Sprint ends, a new one begins, but nothing actually improves.

**Symptoms:**
- Retros produce no Action Items (or the same ones every Sprint).
- Sprint Reviews have no stakeholder attendance and no feedback.
- The Daily Standup is a robotic recitation that takes exactly 15 minutes every day regardless of content.
- Team members are disengaged and just "going through the motions."

**Root Cause:** Often happens when Scrum was imposed top-down without team buy-in, or when initial enthusiasm faded and no one re-ignited it.

**Cure:**
- Re-establish the "why" behind each ceremony. What is each event supposed to produce?
- Invite stakeholders to Sprint Review and make it genuinely interactive.
- Use varied Retro formats to break the monotony. [See Section 3.6.3]
- Address whether the team feels ownership over the process.

---

### Anti-Pattern 2: Scrummerfall (Waterfall in Disguise)

**Description:** The organization claims to be "Agile" but is actually doing Waterfall with Scrum terminology. Requirements are frozen before the first Sprint. "Sprints" are just phases (Sprint 1 = Design, Sprint 2 = Development, Sprint 3 = Testing).

**Symptoms:**
- All design happens upfront before development starts.
- Testing happens only in the last Sprint(s).
- No working software is delivered until near the end.
- The Product Backlog does not change after initial creation.
- Sprint Review is a status meeting, not a demo.

**Root Cause:** The organization or management has not truly adopted Agile thinking. The structure was changed but the mindset was not.

**Cure:**
- Each Sprint must deliver a potentially shippable Increment. No "design-only" or "testing-only" Sprints.
- Enforce cross-functional work within each Sprint: design, develop, test, integrate.
- Educate management on the difference between Agile and re-labeled Waterfall.

---

### Anti-Pattern 3: Eternal Sprint (Never-Ending Sprint)

**Description:** The Sprint has no real boundaries. Work from one Sprint bleeds into the next. Stories are routinely carried over. There is no clear Sprint Start or End.

**Symptoms:**
- 40-60% of Stories carry over to the next Sprint.
- Sprint Planning is rushed because there are too many leftover items.
- Sprint Review has little to show because little was completed.
- The team has no sense of rhythm or cadence.

**Root Cause:** Over-commitment, poor estimation, scope creep during the Sprint, or the team not respecting the timebox.

**Cure:**
- Use historical velocity as the basis for commitment — do not over-plan.
- Stories that are not "Done" at Sprint end go back to the Backlog (they are not automatically carried over).
- The PO re-prioritizes carried-over items — they do not automatically get top priority.
- Make the Sprint boundary a hard line. Celebrate what was done, learn from what was not.

---

### Anti-Pattern 4: Scope Creep

**Description:** New work is added to the Sprint after Sprint Planning without removing anything. The Sprint scope grows continuously.

**Symptoms:**
- The Burndown chart shows work *increasing* during the Sprint.
- The team feels overwhelmed and never completes everything.
- Stakeholders or the PO add "just one more thing" mid-Sprint.
- The Sprint Goal becomes meaningless because the scope keeps shifting.

**Root Cause:** Weak Sprint boundary protection, PO not saying "no" or "not this Sprint," management pressure.

**Cure:**
- SM must protect the Sprint. New requests go to the Product Backlog for the *next* Sprint.
- If something truly urgent must be added, negotiate: "What do we remove to make room?"
- Track scope changes and discuss them in Retro. Make the cost of mid-Sprint changes visible.

---

### Anti-Pattern 5: Hero Developer

**Description:** One developer carries the team. They work nights and weekends to compensate for others, fix problems single-handedly, and are the "go-to" for everything.

**Symptoms:**
- One person completes 50-70% of the Sprint work.
- When that person is absent (sick, vacation), the Sprint fails.
- Other team members are not growing because the Hero does everything.
- The Hero is burning out.

**Root Cause:** Uneven skill distribution, lack of knowledge sharing, team norms that allow disengagement.

**Cure:**
- Enforce pair programming or code reviews to spread knowledge.
- Ensure Tasks are distributed more evenly during Sprint Planning.
- Address the Hero directly: "Your dedication is valued, but the team needs to share the load."
- Build T-shaped skills so no one person is indispensable. [See Section 2.3.3]

---

### Anti-Pattern 6: Absent PO

**Description:** The Product Owner is not available to the team for questions, clarification, or decision-making during the Sprint.

**Symptoms:**
- Developers guess at requirements because the PO is not reachable.
- Stories are implemented incorrectly and need rework.
- Sprint Review has no PO acceptance — items are "assumed done."
- The Backlog is stale — items are not refined or re-prioritized.

**Root Cause:** PO has too many responsibilities, PO is a part-time role, or the PO is not committed to the process.

**Cure:**
- PO must dedicate at least 50% of their time to the team (ideally more).
- If the PO genuinely cannot commit, assign a **proxy PO** with real decision-making authority.
- The SM should raise this as a critical impediment. An absent PO is the #1 predictor of Sprint failure.

---

### Anti-Pattern 7: Micromanaging Scrum Master

**Description:** The SM acts as a traditional project manager — assigning work, tracking hours, reporting individual performance, and making decisions on behalf of the team.

**Symptoms:**
- The SM tells developers which Tasks to work on.
- The SM updates the board on behalf of the team.
- The Daily Standup is a status report to the SM, not a team sync.
- Team members wait for the SM's approval before starting or finishing work.
- The team never self-organizes because the SM does it for them.

**Root Cause:** The SM comes from a PM background and has not adjusted their leadership style. Or management expects the SM to act as a PM.

**Cure:**
- The SM must shift from directing to facilitating. [See Section 2.2.2]
- In the Daily, the SM should step back. Literally: stand away from the center and let the team talk to each other.
- Ask coaching questions instead of giving instructions. [See Section 2.2.3]
- Let the team fail on small things and learn — resist the urge to rescue.

---

### Anti-Pattern 8: Meeting Overload

**Description:** The team spends so much time in meetings (Scrum ceremonies + ad-hoc meetings + organizational meetings) that there is little time left for actual development work.

**Symptoms:**
- Developers have less than 4-5 hours of uninterrupted focus time per day.
- Sprint ceremony time exceeds the recommended timeboxes.
- Ad-hoc meetings are scheduled without regard for developer flow.
- The team is frustrated and feels unproductive.

**Root Cause:** Ceremonies are not timeboxed, too many non-Scrum meetings, organization has a "meeting culture."

**Cure:**
- Strictly enforce ceremony timeboxes. [See Section 3.0]
- Audit all meetings: which are truly necessary? Cancel those that are not.
- Establish "no-meeting" blocks (e.g., mornings are meeting-free for focused development).
- Challenge the need for every meeting: "Can this be an email? A Slack message? A quick 5-minute conversation?"

---

### Anti-Pattern 9: Velocity Gaming

**Description:** The team inflates Story Point estimates to make velocity look higher, usually in response to management pressure to "increase velocity."

**Symptoms:**
- Velocity goes up but the team is not delivering more value.
- A Story that was a "3" last Sprint is now a "5" with no change in complexity.
- Management uses velocity as a performance metric or KPI.

**Root Cause:** Goodhart's Law — velocity became a target rather than a diagnostic tool. [See Section 8.7]

**Cure:**
- Stop using velocity as a performance metric. It is a planning tool only.
- Management should focus on **outcomes** (customer satisfaction, features delivered, business value) not outputs (velocity points).
- Discuss this openly in a Retro if it is happening.

---

### Anti-Pattern 10: Gold Plating

**Description:** Developers add features, polish, or technical improvements beyond what the Story's Acceptance Criteria require.

**Symptoms:**
- Stories take longer than estimated because developers add unrequested functionality.
- "Nice to have" features sneak in without PO approval.
- The team over-engineers solutions "for the future."

**Root Cause:** Perfectionism, desire to create the "best" solution, or unclear Acceptance Criteria.

**Cure:**
- "Done" = Acceptance Criteria met + DoD satisfied. Nothing more.
- If a developer sees an opportunity for improvement, they raise it as a new Backlog item for the PO to prioritize.
- Clarify Acceptance Criteria during Refinement so "Done" is unambiguous.

---

### Anti-Pattern 11: Estimation Theater

**Description:** The team goes through the motions of estimation (Planning Poker, etc.) but the estimates are meaningless — either everyone just agrees with the first number suggested, or the estimates bear no relation to actual effort.

**Symptoms:**
- Planning Poker rounds end instantly with everyone showing the same number (anchoring).
- A Story estimated at "3" takes the same time as one estimated at "8."
- Nobody refers back to estimates when reviewing Sprint performance.

**Root Cause:** Lack of calibration, no reference stories, or the team does not see the value of estimation.

**Cure:**
- Establish and maintain reference stories. [See Section 6.3]
- Ensure simultaneous card reveal in Planning Poker (no anchoring).
- Review estimation accuracy in Retros: "Were our estimates close to reality? If not, why?"

---

### Anti-Pattern 12: Retro Without Action

**Description:** The Retrospective is held regularly, issues are discussed, but nothing changes. No Action Items are created, or Action Items are created but never followed up on.

**Symptoms:**
- The same issues are raised every Sprint.
- Team members say "Why bother? Nothing changes."
- No Action Items are written down.
- Action Items exist on paper but no one tracks them.

**Root Cause:** Lack of commitment to improvement, SM not following up, or Action Items are too vague to be actionable.

**Cure:**
- Every Retro must produce at least 1-2 specific, owned, time-bound Action Items. [See Section 3.6.5]
- The first agenda item of every Retro should be reviewing the previous Retro's Action Items.
- If the same issue appears for 3 consecutive Sprints, escalate it — either commit to fixing it or accept it and stop discussing it.

---

### Anti-Pattern 13: Backlog Bankruptcy

**Description:** The Product Backlog has grown to hundreds of items. Most are stale, poorly defined, and will never be built. The Backlog has become a graveyard of good intentions.

**Symptoms:**
- 200+ items in the Backlog.
- Items older than 6 months that no one has looked at.
- Sprint Planning takes too long because the PO is searching through a massive list.
- The team is demoralized by the sheer size of the "to-do" list.

**Root Cause:** PO never says "no," stakeholder requests are added without curation, nobody removes obsolete items.

**Cure:**
- Declare Backlog Bankruptcy: archive everything below the top 30-50 items.
- Establish a rule: items not discussed or updated within 3 Sprints (9 weeks) are automatically archived.
- The PO must regularly prune the Backlog — removing or archiving items that are no longer relevant.

---

### Anti-Pattern 14: Definition of Done Drift

**Description:** The team's Definition of Done erodes over time. Under pressure, quality steps are skipped — "We'll do code review next Sprint" or "We'll add tests later."

**Symptoms:**
- Items are marked "Done" but fail in staging or production.
- Technical debt accumulates rapidly.
- "Done" no longer means "Done" — there is always more work needed.
- Bugs increase Sprint over Sprint.

**Root Cause:** Pressure to deliver more, lack of SM enforcement, or the team not taking the DoD seriously.

**Cure:**
- The DoD is non-negotiable. If an item does not meet the DoD, it is not Done — period.
- Review the DoD in Retro: is it still appropriate? Should it be strengthened?
- The SM must enforce the DoD, even when it is uncomfortable. This is one of the SM's most important responsibilities.
- Make DoD violations visible: track how often items are "undone" after the Sprint.

---

### Anti-Pattern 15: Silo Teams

**Description:** Team members work in isolation within their specialties. Frontend developers only do frontend. Backend developers only do backend. Testers only test. There is no collaboration, knowledge sharing, or cross-functionality.

**Symptoms:**
- Stories can only be worked on by specific individuals.
- Handoffs between team members create delays and communication gaps.
- When one specialist is absent, work in their area stops completely.
- The team is a collection of individuals, not a team.

**Root Cause:** Deep specialization without cross-training, organizational structure that reinforces silos, lack of pair programming or knowledge sharing practices.

**Cure:**
- Encourage pair programming or mob programming sessions.
- Rotate people across different types of work (gradually — not all at once).
- Set a team goal: "Within 6 months, every Story can be worked on by at least 2 team members."
- Build T-shaped skills. [See Section 2.3.3]

---

## 9.2 Red Flags Checklist

Use this checklist to quickly assess whether the team is in trouble. Each "yes" answer is a red flag:

| Severity | Red Flag | # |
|:--------:|----------|:-:|
| High | Sprint Goal is consistently not achieved (3+ Sprints in a row) | 1 |
| High | More than 30% of Stories carry over to the next Sprint | 2 |
| High | PO is not available for questions during the Sprint | 3 |
| Medium | Retrospective produces no Action Items | 4 |
| Medium | Daily Standup consistently exceeds 15 minutes | 5 |
| Medium | No stakeholders attend Sprint Review | 6 |
| High | The Burndown chart is flat for 3+ days | 7 |
| Low | WIP limits are ignored or not set | 8 |
| Medium | The Sprint Board does not reflect reality | 9 |
| High | Team members are working overtime every Sprint | 10 |
| Medium | Velocity is declining Sprint over Sprint | 11 |
| Medium | The same issue appears in 3+ consecutive Retros | 12 |
| High | Definition of Done is routinely ignored | 13 |
| Medium | New items are added mid-Sprint without removing anything | 14 |
| High | One person does most of the work (Hero Developer) | 15 |

**Scoring:**
- **0-2 red flags:** Healthy team with minor issues. Address in Retro.
- **3-5 red flags:** Significant concerns. Dedicate a Retro to identifying root causes.
- **6+ red flags:** Systemic problems. Consider an external Agile coach assessment or dedicated team health intervention.

---

## 9.3 Recovery Playbooks

### Playbook A: Recovering from Chronic Over-Commitment

**Situation:** The team consistently fails to complete all planned work. Morale is low.

**Steps:**
1. **Calculate actual average velocity** over the last 5 Sprints.
2. **Plan next Sprint at 80% of that average** (leave 20% buffer).
3. **Focus on completing fewer items to a high standard** rather than starting many.
4. **Celebrate completion** at Sprint Review, even if it is "less" than before.
5. **Gradually increase commitment** only when the team consistently meets its goals.
6. **Review in Retro** after 2-3 Sprints: has the pattern changed?

### Playbook B: Recovering from Absent PO

**Situation:** The PO is not available, leading to incorrect implementations and wasted effort.

**Steps:**
1. **Document the impact:** Track how many Stories were reworked due to PO unavailability.
2. **SM raises the issue formally** with the PO and management.
3. **Negotiate a minimum commitment:** PO must be available for at least 2 hours daily for the team.
4. **Assign a proxy PO** for when the PO is genuinely unavailable.
5. **Improve Backlog Refinement** so Stories are clearer before the Sprint starts, reducing mid-Sprint questions.
6. **Escalate if no improvement** after 2 Sprints.

### Playbook C: Recovering from Zombie Scrum

**Situation:** The team goes through the motions but there is no energy, no improvement, no genuine engagement.

**Steps:**
1. **Hold an extended Retro** (2-3 hours) specifically to discuss: "Why are we doing Scrum? What value does each ceremony provide?"
2. **Re-establish the Sprint Goal:** Give the Sprint a *meaningful* goal that the team can rally around.
3. **Invite real stakeholders** to Sprint Review. Make the demo matter.
4. **Change the Retro format** dramatically — go off-site, use a completely different format, make it fun.
5. **Celebrate wins** — even small ones. Recognition fuels engagement.
6. **If possible, let the team choose a process experiment** — give them ownership.

---

# Section 10: Agile at Scale & Advanced Topics

## 10.1 Scaling Frameworks Overview

When an organization has multiple teams working on the same product or related products, coordination becomes essential. Several frameworks address this:

| Complexity | Scale | Core Idea | Framework |
|:----------:|:-----:|-----------|-----------|
| High | 50-1000+ people | Comprehensive framework with multiple levels: Team, Program, Large Solution, Portfolio. Includes roles like Release Train Engineer, Product Manager, Solution Architect. | **SAFe** (Scaled Agile Framework) |
| Low | 2-8 teams | "Keep it simple." Multiple teams work on one Product Backlog with one PO. Minimal additional roles or ceremonies. | **LeSS** (Large-Scale Scrum) |
| Medium | 3-9 teams | Extension of Scrum for 3-9 teams. Adds a Nexus Integration Team and Nexus Sprint events for cross-team integration. | **Nexus** |
| Low-Medium | Variable | Not a framework but an organizational culture model. Teams ("Squads") are grouped into "Tribes." "Chapters" connect specialists across Squads. "Guilds" are cross-tribe communities of interest. | **Spotify Model** |

### Which to Consider?

| Recommendation | Situation |
|---------------|-----------|
| LeSS or Nexus — minimal overhead | 2-3 teams, one product |
| Nexus or SAFe Essential | 4-10 teams, one product line |
| SAFe (full configuration) | 10+ teams, multiple product lines |
| Spotify-inspired model | Organization values autonomy and culture over process |
| Start simple. Use cross-team Refinement and joint Sprint Review. Adopt a framework only if coordination becomes a consistent pain point. | **Our context** (small number of teams) |

---

## 10.2 Cross-Team Dependencies

Dependencies between teams are a major source of delays and friction. Strategies for managing them:

| Description | Strategy |
|-------------|----------|
| A shared board showing inter-team dependencies: who needs what from whom, by when. | **Dependency board** |
| A regular (daily or 2-3x/week) meeting where representatives from each team sync on dependencies and blockers. | **Scrum of Scrums** |
| In some scaling approaches, a dedicated Sprint or timebox for integrating work from multiple teams. | **Integration Sprint** |
| Teams that depend on each other attend joint Refinement sessions to align on interfaces and expectations. | **Shared Backlog Refinement** |
| When teams integrate through APIs, define the contract early and let teams work independently against it. | **API contracts** |
| Teams deploy code independently using feature flags, enabling integration without tight coupling. | **Feature toggling** |

---

## 10.3 Technical Debt Management

### What Is Technical Debt?

Technical debt is the **implied cost of future rework** caused by choosing an easy or quick solution now instead of a better approach that would take longer.

### Types of Technical Debt

| Deliberate vs. Inadvertent | Example | Type |
|:--------------------------:|---------|------|
| Deliberate | Skipping proper architecture because "we need to ship" | **Design debt** |
| Both | Copy-paste code, missing abstractions, dead code | **Code debt** |
| Deliberate | No unit tests, no integration tests, low coverage | **Test debt** |
| Inadvertent (often) | Manual deployments, no CI/CD, outdated libraries | **Infrastructure debt** |
| Deliberate | No API docs, no architecture diagrams, no onboarding guide | **Documentation debt** |

### Managing Technical Debt in Sprints

| Description | Approach |
|-------------|----------|
| Reserve 10-20% of each Sprint's capacity for tech debt. This prevents debt from growing out of control. | **Dedicate a percentage** |
| Maintain a separate tech debt Backlog (or tag items). PO and team jointly prioritize which debt to address. | **Tech debt Backlog** |
| Leave the code better than you found it. When working on a Story, clean up nearby tech debt as part of the work. | **"Boy Scout Rule"** |
| Some teams dedicate an entire Sprint to tech debt every 4-6 Sprints. This is controversial — it can be effective but also used as an excuse to defer debt indefinitely. | **Tech debt Sprints** |

### Communicating Tech Debt to Non-Technical Stakeholders

Use this analogy: "Technical debt is like deferred maintenance on a building. You can skip painting the walls and fixing the leaky roof for a while, and it saves money short-term. But eventually, the problems compound — the walls mold, the structure weakens, and the repair costs are 10x what they would have been."

---

## 10.4 DevOps and CI/CD in Agile Context

DevOps and CI/CD are **not optional extras** for Agile teams — they are essential enablers.

| Why It Matters for Agile | What It Means | Practice |
|-------------------------|---------------|----------|
| Catches integration issues early. Supports "working software" at all times. | Developers merge code to the main branch multiple times a day. Automated builds and tests run on every merge. | **Continuous Integration (CI)** |
| Enables "potentially shippable Increment" at the end of every Sprint. | Every successful CI build is deployable to production with a single click. | **Continuous Delivery (CD)** |
| The fastest feedback loop possible. | Every successful CI build is *automatically* deployed to production. | **Continuous Deployment** |
| Reproducible, reliable deployments. Reduces "it works on my machine" problems. | Server configurations, environments, and deployments are managed through code, not manual steps. | **Infrastructure as Code** |
| Fast feedback on whether the delivered software is actually working in the real world. | Production is monitored with alerts, dashboards, and logs. | **Monitoring & Observability** |

---

## 10.5 Agile Contracts and Fixed-Price Projects

Agile and fixed-price contracts are not inherently incompatible, but they require careful structuring.

### Approaches

| Risk Distribution | Description | Approach |
|:-----------------:|-------------|----------|
| Vendor bears risk of scope creep; customer bears risk of unmet needs | All requirements defined upfront. Fixed cost. | **Fixed scope, fixed price** (traditional) |
| Customer bears cost risk; vendor bears reputational risk | Customer pays for time spent. Scope is flexible. | **Time & Materials** |
| Balanced risk — customer controls scope, vendor controls effort | Customer pays a fixed rate per Sprint. Scope is flexible within each Sprint. PO prioritizes. | **Fixed price per Sprint** |
| Balanced — both sides benefit from early delivery and flexibility | Fixed total budget. Customer can change scope at any time (swap items in/out of backlog) as long as the total estimated effort stays within budget. Customer can stop early and pay only for completed work. | **Money for nothing, changes for free** |
| Reduced risk for both sides — better information leads to better estimates | Start with a short discovery phase (fixed price). Then negotiate the full build phase based on discovery findings. | **Phased contracts** |

**Recommendation for our context:** When working with external clients on fixed-price projects, prefer the "Fixed price per Sprint" or "Phased contracts" approach. This preserves Agile flexibility while giving the client cost predictability.

---

## 10.6 Distributed and Remote Agile Teams

### Challenges

| Impact | Challenge |
|--------|-----------|
| Synchronous ceremonies are difficult. The Daily Standup may not work at a time that suits everyone. | **Time zone differences** |
| Without face-to-face interaction, misunderstandings are more common. Nuance is lost in text. | **Communication gaps** |
| Team cohesion is harder to build when people do not share a physical space. | **Reduced social bonding** |
| It is harder to see whether someone is stuck, disengaged, or overloaded when you are not in the same room. | **Visibility** |

### Mitigation Strategies

| Implementation | Strategy |
|---------------|----------|
| Define 2-4 hours per day when everyone is online simultaneously. Schedule ceremonies in this window. | **Overlap hours** |
| Use written updates in a shared channel instead of (or in addition to) video calls. [See Section 3.3.4] | **Async Dailies** |
| Encourage video-on for ceremonies to increase engagement and read social cues. | **Video on** |
| In text, err on the side of more detail. What is obvious in person may not be obvious in writing. | **Over-communicate** |
| Use Azure DevOps (or similar) as the single source of truth. No "local" tracking tools. | **Digital boards** |
| Dedicated non-work time for the team to connect (virtual coffee, team games, informal chat). | **Virtual social time** |
| Decisions made in conversations must be documented (in the relevant Work Item, wiki, or shared doc). Remote team members should never miss a decision because they were not online. | **Document decisions** |

---

# Section 11: Waterfall-to-Agile Transition

## 11.1 Why Transitions Fail

Most Agile transitions fail not because of the framework, but because of **people and culture**:

| Description | Frequency | Failure Reason |
|-------------|:---------:|----------------|
| Management says "go Agile" but does not change their own behavior, expectations, or organizational structure. | Very Common | **Lack of management support** |
| Adopting Scrum ceremonies without adopting Agile values. [See Anti-Pattern #2: Scrummerfall] | Very Common | **Treating Agile as a process change only** |
| Teams are expected to "figure it out" without coaching, training, or a knowledge base. | Common | **Insufficient training** |
| Middle managers resist because their role is unclear in Agile. [See Section 2.5.2] | Common | **The "frozen middle"** |
| Management expects immediate results. Agile adoption takes 3-6 months for basic fluency, 12-18 months for maturity. | Common | **No patience** |
| "We do Agile, but we skip Retros and the PO is part-time." Selective adoption undermines the framework. | Common | **Partial adoption** |

---

## 11.2 The "Frozen Middle" Problem — In Depth

Middle managers are often the **most resistant** to Agile adoption because:

| Reality | Concern |
|---------|---------|
| Not if they adapt. The organization still needs people who remove obstacles, develop talent, and align teams. | "I will lose my job" |
| Authority shifts from command-and-control to influence-and-enable. Some managers thrive; others struggle. | "I will lose authority" |
| They can, with the right support and guardrails. Self-organization does not mean no organization. | "Teams can't organize themselves" |
| Transparency. The Sprint Board, Burndown, Sprint Review, and velocity charts provide more visibility than status meetings ever did. | "How will I know what people are doing?" |

**What the organization must do:**
- Clearly define what managers do in Agile (enablers, not controllers). [See Section 2.5]
- Provide training specifically for managers on Agile leadership.
- Demonstrate that the new role is valuable: "You are now the person who makes the team's life easier."

---

## 11.3 Phased Transition Approach

Do not try to change everything at once. A phased approach reduces risk:

### Phase 1: Foundation (Sprints 1-3, ~9 weeks)

| Focus | Action |
|-------|--------|
| Agile basics, Scrum framework, roles, ceremonies | Train the team |
| 3-week sprints, consistent schedule | Establish the Sprint cadence |
| Azure DevOps board, Backlog, Sprint configuration | Set up tools |
| Even if awkward at first — consistency builds habit | Hold all ceremonies |
| Start simple, strengthen over time | Define initial DoD |
| PO, SM, Dev Team | Assign roles |

### Phase 2: Stabilization (Sprints 4-6, ~9 weeks)

| Focus | Action |
|-------|--------|
| Establish reference stories, calibrate velocity | Refine estimation |
| Backlog items meet Definition of Ready | Improve Refinement |
| Velocity, Burndown, Cycle Time | Start tracking metrics |
| Follow up and track improvement | Retros produce Action Items |
| Regular Sprint Review attendance | Engage stakeholders |

### Phase 3: Optimization (Sprints 7-12, ~18 weeks)

| Focus | Action |
|-------|--------|
| WIP limits, Kanban practices within Scrum, story splitting | Advanced practices |
| Try new Retro formats, adjust ceremonies based on data | Process experiments |
| CI/CD, automated testing, code review standards | Technical practices |
| Cross-team coordination, shared refinement | Scale if needed |
| Compare velocity trends, cycle time, stakeholder satisfaction | Measure improvement |

### Phase 4: Maturity (Sprint 13+)

| Focus | Action |
|-------|--------|
| The team drives its own evolution | Continuous improvement is self-sustaining |
| CFD, Lead Time optimization, predictability | Advanced metrics |
| The team can help other teams adopt Agile | Coaching others |
| The team has slack for experimentation and learning | Innovation time |

---

## 11.4 Change Management for Managers

### Key Messages for Managers

| Explanation | Message |
|-------------|---------|
| Teams need someone to remove organizational blockers, secure resources, develop people, and align teams. | "Your role is more important, not less." |
| Trusting the team to self-organize does not mean abandoning them. It means giving them the space to solve problems while you clear the path. | "Trust is not abdication." |
| Manage outcomes, not activities. Set direction, not step-by-step instructions. | "You still need to manage — differently." |
| The Sprint Board, velocity, and Sprint Review give you more real-time insight than any status meeting ever could. | "Transparency helps you." |

### What Managers Should Do

1. **Attend Sprint Reviews** — see the working software, hear stakeholder feedback.
2. **Remove impediments** the team cannot resolve on their own (budget, tools, organizational barriers).
3. **Protect the team** from ad-hoc requests that disrupt the Sprint.
4. **Develop people** — invest in training, mentoring, and career growth.
5. **Set strategic direction** — communicate organizational goals and priorities that inform the Product Backlog.
6. **Do NOT attend Daily Standups** — unless explicitly invited by the team. Your presence changes the dynamic.

---

## 11.5 Measuring Transition Success

How do you know the Agile transition is working? Track these indicators over time:

| Target | How to Measure | Indicator |
|--------|---------------|-----------|
| >80% | % of Sprints where the Sprint Goal was met | **Sprint Goal achievement** |
| <25% | Coefficient of variation of velocity over 6+ Sprints | **Velocity stability** |
| Trending upward | Survey or NPS after Sprint Reviews | **Stakeholder satisfaction** |
| Decreasing over time | Average time from "In Progress" to "Done" | **Cycle Time** |
| >70% | % of Action Items completed before next Retro | **Retro Action Item completion** |
| Stable or improving | Regular team health surveys | **Team satisfaction** |
| Decreasing over time | Bug escape rate (bugs found in production) | **Quality** |
| Improving over time | Difference between planned and actual delivery | **Predictability** |

---

## 11.6 Common Resistance Patterns and Responses

| How to Respond | What They Mean | What They Say | Resistance Pattern |
|----------------|----------------|---------------|-------------------|
| Show the gaps: "Let's compare our practices to the Scrum Guide and see where we align and where we diverge." | "We do standups, isn't that enough?" | "We already do Agile." | **Denial** |
| Start small: "Let's try one Sprint and evaluate." Reduce the perceived risk. | "I'm afraid of change / losing control." | "This will never work here." | **Fear** |
| Phase the transition. [See Section 11.3] Focus on one or two practices at a time. | "I can't absorb all this." | "Too many changes at once." | **Overwhelm** |
| Demonstrate management commitment. Show early wins. Be transparent about the challenges. | "I've seen initiatives come and go." | "Management will kill this in 3 months." | **Cynicism** |
| Create safe spaces for dissent. Ask direct questions in 1-on-1s. Address the elephant in the room. | "I disagree but won't say it." | (silence, non-participation) | **Passive resistance** |
| Address each "but" explicitly: "Why are we skipping this? What is the cost?" | "We want the label without the discipline." | "We do Scrum, but..." (followed by exceptions) | **Scrum-butting** |

---

## 11.7 First 90 Days Playbook

A practical guide for the first 90 days of an Agile transition (or re-invigoration):

### Days 1-7: Setup

- [ ] Assign Scrum roles (PO, SM, Dev Team)
- [ ] Set up Azure DevOps: create project, configure Sprint cadence (3 weeks), create board columns
- [ ] Define initial Definition of Done (start simple)
- [ ] Create initial Product Backlog (top 20-30 items)
- [ ] Schedule all ceremonies for Sprint 1
- [ ] Distribute training materials (this Knowledge Base, role-specific guides)

### Days 8-21: Sprint 1 (Learning Sprint)

- [ ] Conduct Sprint Planning (expect it to be slow — that is fine)
- [ ] Hold Daily Standups every day (15 minutes, strict timebox)
- [ ] Conduct at least one Backlog Refinement session
- [ ] Hold Sprint Review (demo whatever was built, even if small)
- [ ] Hold Retrospective (focus on: "What was confusing? What do we need to learn?")
- [ ] Key metric: Did the team establish rhythm? (Quality over quantity this Sprint)

### Days 22-42: Sprint 2 (Stabilization Sprint)

- [ ] Improve Sprint Planning with lessons from Sprint 1
- [ ] Establish reference stories for estimation
- [ ] Ensure all team members update the board daily
- [ ] Invite stakeholders to Sprint Review
- [ ] Retro focus: "What improved from Sprint 1? What still needs work?"
- [ ] Key metric: Is velocity baseline emerging?

### Days 43-63: Sprint 3 (Calibration Sprint)

- [ ] Velocity from Sprints 1-2 informs Sprint 3 planning
- [ ] Backlog Refinement is producing "Ready" items consistently
- [ ] Sprint Review is genuinely interactive with stakeholders
- [ ] Retro produces concrete Action Items that are tracked
- [ ] Key metric: Sprint Goal achieved? Stories completing within the Sprint?

### Days 64-90: Sprint 4 (Optimization Sprint)

- [ ] Introduce WIP limits on the board
- [ ] Start tracking Cycle Time
- [ ] Review and potentially strengthen the Definition of Done
- [ ] Address the top recurring issue from the first 3 Retros with a systemic solution
- [ ] Key metric: Is the team improving Sprint over Sprint?

---

## 11.8 Common Questions — Transition

**Q: How long until the team is "good" at Agile?**
A: Basic competency: 3-4 Sprints (2-3 months). Consistent performance: 6-8 Sprints (4-6 months). Mature, self-improving team: 12-18 months. Every team is different — do not compare.

**Q: Should we hire an external Agile Coach?**
A: An external coach provides huge value during the first 3-6 months — they bring experience, objectivity, and credibility. If budget does not allow it, a well-prepared SM with good training materials (like this Knowledge Base) and management support can lead the transition.

**Q: We tried Agile before and it failed. Should we try again?**
A: Yes — but first diagnose why it failed. Was it a people problem? A management problem? A partial adoption? Address the root cause before trying again. "Agile failed" usually means "we failed to do Agile properly."

**Q: Can we be Agile with a fixed-deadline project?**
A: Yes. In fact, Agile is better for fixed-deadline projects than Waterfall. The key: the deadline is fixed, but the scope is flexible. Work with the PO to ensure the highest-value features are delivered first, so that on the deadline date, the most important things are done — even if not everything is.

---

# End of Knowledge Base

**Version:** 1.0 | **Date:** 2026-02-26 | **Sections:** 11 | **Language:** English
**Intended consumer:** AIlex Agile Coach AI (via LLM prompt + KB attachment)
**Maintenance:** Update this KB based on Q&A logs collected from AIlex sessions. Review and update at the start of each Sprint.
