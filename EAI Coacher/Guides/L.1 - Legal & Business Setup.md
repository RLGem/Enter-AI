# L.1 — Legal & Business Setup

**KB Guide for AIlex | Stage 4: Money on Table**
**Version:** 1.0 | **Date:** 2026-02-27
**Word count:** ~2,500 | **Not user-facing — AIlex reference only**

---

## 1. CONTEXT (When does AIlex use this guide?)

Use this guide when a founder enters Stage 4 and is about to take their first payment. AIlex MUST trigger this conversation BEFORE the founder accepts money from customers. This is not optional — it's a gate. Taking payments without a legal business entity exposes the founder to personal liability, tax penalties, and payment processor issues. This guide covers US-specific legal setup for solo founders with $0–$10K revenue. AIlex is NOT a lawyer — always recommend professional legal counsel for complex situations.

---

## 2. CORE CONCEPTS

### 2.1 Business Entity Types — Decision Framework

| Entity | What It Is | Liability Protection | Tax Treatment | Cost to Set Up | Best For |
|--------|-----------|---------------------|---------------|----------------|----------|
| **Sole Proprietorship** | You = the business. No separate entity. | None — personal assets at risk | Personal income tax (Schedule C) | $0–$50 (just a DBA) | Testing phase only. NOT recommended once taking payments. |
| **LLC (Single-Member)** | Separate legal entity. You're the owner ("member"). | Yes — personal assets protected | Pass-through (Schedule C by default, can elect S-Corp) | $50–$500 depending on state | **Default recommendation for solo founders.** Simple, protective, flexible. |
| **S-Corporation** | Corporation with pass-through tax status. | Yes | Pass-through + potential self-employment tax savings above ~$40K profit | $500–$1,500 + ongoing compliance | When profit exceeds $40K/year consistently. Too complex for Stage 4. |
| **C-Corporation** | Separate tax entity. Double taxation. | Yes | Corporate tax + personal tax on dividends | $500–$1,500 + heavy compliance | Only if raising VC money. Not for bootstrappers. |

**AIlex default recommendation:** Single-Member LLC. Period. It's the Goldilocks structure for solo founders: enough protection, minimal complexity, reasonable cost.

### 2.2 State Selection

| Factor | Consideration |
|--------|--------------|
| **Your home state** | Default choice. File where you live. No foreign registration needed. |
| **Delaware** | Myth: "everyone files in Delaware." Reality: only beneficial for VC-backed startups or multi-state corporations. For a solo LLC, Delaware + your home state = double the fees. |
| **Wyoming** | No state income tax, low fees ($100), strong privacy. Good option if you live in a high-tax or high-fee state (CA, NY). |
| **Your state's LLC cost** | California = $800/year minimum franchise tax. New York = $25 + biennial statement + publication requirement ($500–$1,500!). Most other states: $50–$200/year. |

**AIlex decision shortcut:**
- Live in CA or NY with revenue < $5K/mo? → Consider Wyoming LLC
- Live anywhere else? → File in your home state
- Raising VC? → We'll discuss C-Corp in Stage 6

### 2.3 EIN (Employer Identification Number)

- Free from IRS (irs.gov) — takes 5 minutes online
- Required to: open a business bank account, file business taxes, hire contractors
- Do NOT pay any service for this — it's free and instant

### 2.4 Business Bank Account

**Mandatory.** Mixing personal and business funds is the #1 way to lose LLC liability protection ("piercing the corporate veil").

Setup checklist:
1. Get your LLC formation documents (Articles of Organization)
2. Get your EIN letter from IRS
3. Open account at any bank (Mercury, Relay, or your local bank)
4. Transfer $0 — just open it. Revenue goes here. Expenses come from here.

**Recommended for solo founders:**
- **Mercury** — Built for startups, no fees, no minimum, great dashboard
- **Relay** — Similar to Mercury, allows multiple checking accounts for budgeting
- **Local bank/credit union** — If you prefer in-person service

### 2.5 Essential Legal Documents

| Document | When Needed | How to Get It | Cost |
|----------|------------|---------------|------|
| **Terms of Service (ToS)** | Before accepting any user/customer | AI-generated first draft → lawyer review for $200–$500 | $0–$500 |
| **Privacy Policy** | Before collecting any user data | AI-generated → lawyer review. Required by law (CCPA in CA, various state laws). | $0–$500 |
| **Service Agreement / Contract** | Before delivering service work | Template + customize per client. Must include: scope, payment terms, IP ownership, termination. | $0–$300 for template |
| **Invoice Template** | At first payment | Free tools: Wave, Stripe invoicing, Google Docs template | $0 |
| **Independent Contractor Agreement** | Before hiring any contractor (1099) | Template. Must include: scope, payment, IP assignment, non-compete (if applicable). | $0–$200 |

**AIlex approach:** Generate first drafts of ToS, Privacy Policy, and Service Agreement. Always tell the founder: "This is a starting point. Before you scale past $5K/month, get a lawyer to review these. Budget $500–$1,000 for that."

### 2.6 Intellectual Property Basics

| IP Type | What It Protects | When to Care | Cost |
|---------|-----------------|--------------|------|
| **Trademark** | Business name, logo, slogan | When brand recognition matters (Stage 5+) | $250–$350 per class (USPTO filing) + $500–$1,500 attorney |
| **Copyright** | Code, content, designs | Automatic upon creation. Register for enforcement ability. | $45–$65 (copyright.gov) |
| **Patent** | Inventions, processes | Almost never relevant for software/service startups | $5,000–$15,000+ |
| **Trade Secret** | Proprietary methods, data | Keep it confidential. No registration needed. | $0 |

**AIlex default:** Don't worry about IP in Stage 4. Just make sure your contracts include IP assignment clauses (you own what you create for clients; contractors assign their work to you).

### 2.7 Payment Processing Setup

| Provider | Best For | Fees | Setup Time |
|----------|---------|------|-----------|
| **Stripe** | SaaS, digital products, subscriptions | 2.9% + $0.30 per transaction | 1–2 days |
| **Lemon Squeezy** | Digital products (handles global tax/VAT) | 5% + $0.50 | Same day |
| **PayPal** | Service businesses, invoicing | 2.99% + $0.49 | Same day |
| **Square** | In-person + online | 2.6% + $0.10 (in-person), 2.9% + $0.30 (online) | Same day |
| **Gumroad** | Digital products, simple setup | 10% flat | Same day |

**AIlex recommendation by business type:**
- Digital product/SaaS → Stripe
- Service business → Stripe or PayPal
- Digital downloads/courses → Lemon Squeezy or Gumroad
- Physical products → Square + Stripe

---

## 3. DECISION TABLES

### Which entity to form:

| Situation | Recommendation | Why |
|-----------|---------------|-----|
| Solo founder, first business, < $40K/year revenue | Single-Member LLC in home state | Simple, cheap, protective |
| Solo founder in California, revenue < $5K/mo | Wyoming LLC | Avoids $800/year CA franchise tax |
| Planning to raise VC money | C-Corp in Delaware | VCs require it. But discuss in Stage 6, not now. |
| Two co-founders | Multi-Member LLC with Operating Agreement | Must define ownership %, decision-making, exit terms |
| Side hustle alongside W-2 job | Single-Member LLC | Separates side hustle from employment |

### When AIlex triggers legal setup conversation:

| Trigger | AIlex Action |
|---------|-------------|
| Founder says "someone wants to pay me" | "That's incredible! Before we take that money, we need 30 minutes to set up your business properly. Trust me — doing this now saves massive headaches later." |
| Founder has 3+ "I'd pay for this" from Stage 2 | "We're approaching the money stage. Let's get your legal foundation ready so you can accept payments cleanly." |
| Founder is already taking payments without an entity | "I need to flag something important: you're currently accepting payments as a sole proprietor. That means your personal assets — house, car, savings — are exposed if anything goes wrong. Let's fix this today." |
| Founder says "I'll deal with legal stuff later" | "I hear you — it feels like bureaucracy. But here's the thing: setting up an LLC takes 30 minutes and $100-200. Not setting one up and getting sued costs everything. Let's knock this out right now." |

---

## 4. DELIVERABLE TEMPLATES

### Legal Setup Checklist (AIlex generates and tracks completion)

```
BUSINESS LEGAL SETUP — CHECKLIST
=================================
Founder: [name]
Business: [name]
Date started: [date]

[ ] 1. Choose business entity type: _______________
[ ] 2. Choose state of formation: _______________
[ ] 3. File LLC with state (Articles of Organization)
      - Filing website: [state-specific URL]
      - Cost: $___
      - Processing time: ___ days
[ ] 4. Get EIN from IRS (irs.gov/ein)
      - EIN: _______________
[ ] 5. Open business bank account
      - Bank: _______________
      - Account #: _______________
[ ] 6. Set up payment processor
      - Provider: _______________
[ ] 7. Draft Terms of Service
[ ] 8. Draft Privacy Policy
[ ] 9. Draft Service Agreement / Contract template
[ ] 10. Set up invoicing (Wave / Stripe / manual)

STATUS: ___/10 complete
```

### Basic Terms of Service Outline (for AIlex to draft)

```
TERMS OF SERVICE — OUTLINE
===========================
1. Acceptance of Terms
2. Description of Service
3. User Accounts & Responsibilities
4. Payment Terms (pricing, refunds, cancellation)
5. Intellectual Property (who owns what)
6. Limitation of Liability
7. Disclaimer of Warranties ("as-is")
8. Termination
9. Governing Law (state)
10. Changes to Terms
11. Contact Information

NOTE: AIlex drafts this. Founder reviews with lawyer before $5K MRR.
```

---

## 5. RED FLAGS

- **Founder taking payments to personal Venmo/Zelle** → Stop. "This creates tax and liability problems. Let's set up a business account and proper invoicing this week."
- **Founder wants to form a C-Corp "because that's what startups do"** → Redirect. "C-Corps are for VC-funded startups. You're bootstrapping — an LLC gives you the same protection with 10% of the complexity. Let's save the C-Corp discussion for when you're raising money."
- **Founder wants to skip legal setup entirely** → Hard gate. "I understand the urgency to sell. But this is the one thing I can't let you skip. An LLC protects everything you're building — and everything you already have."
- **Two founders without an Operating Agreement** → Critical risk. "Before you write a single line of code together, you need an Operating Agreement. Who owns what? What happens if one of you leaves? This is the #1 cause of co-founder breakups. Let's draft one now."
- **Founder asks AIlex for legal advice on complex matters** → Boundary. "I can help with basic business setup, but for [contracts with large clients / IP disputes / employment law / securities], you need a real lawyer. Here's how to find one affordably: LegalZoom consultations, local SBA office, law school clinics."

---

## 6. EXAMPLES

### Product Example: SaaS App

**Situation:** Jordan built a task management app. 5 beta users want to pay $29/month.

**AIlex walks through:**
1. Form Wyoming LLC (Jordan lives in California) — $100, online, 15 minutes
2. Get EIN — free, 5 minutes on irs.gov
3. Open Mercury business bank account — 10 minutes
4. Set up Stripe — connect to bank account, 20 minutes
5. Draft ToS and Privacy Policy — AIlex generates drafts, 30 minutes
6. First invoice via Stripe — $29/month subscription, automated

**Total time:** ~90 minutes. **Total cost:** ~$100. **Result:** Jordan is legally operating a business.

### Service Example: Freelance Marketing Consultant

**Situation:** Priya has 3 clients ready to pay $2,000/month each for social media management.

**AIlex walks through:**
1. Form LLC in Texas (home state) — $300, online
2. Get EIN — free, 5 minutes
3. Open Relay business bank account — 10 minutes
4. Draft Service Agreement with: scope (3 platforms, 12 posts/month), payment (net-15), IP (client owns deliverables), termination (30-day notice)
5. Set up invoicing via Wave (free) or Stripe Invoicing
6. Get general liability insurance ($30-$50/month) — recommended for service businesses

**Total time:** ~2 hours. **Total cost:** ~$350. **Result:** Priya is protected and professional from day one.

---

*KB Guide L.1 | Enter AI — AIlex, Your AI Co-Founder*
*For AIlex internal use only — not shown to users*
