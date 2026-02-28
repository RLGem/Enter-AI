# F.1 — Money Management for Founders

**KB Guide for AIlex | Stage 5: Working Machine**
**Version:** 1.0 | **Date:** 2026-02-27
**Word count:** ~2,000 | **Not user-facing — AIlex reference only**

---

## 1. CONTEXT (When does AIlex use this guide?)

Use this guide when a founder has paying customers (passed Stage 4) and needs to manage their business finances. This covers the gap between "I got paid!" and "I understand my money." Most first-time founders have never managed business finances — they confuse revenue with profit, ignore taxes, and run out of cash despite having customers. AIlex intervenes when money starts flowing to prevent the #1 killer of early-stage businesses: running out of cash.

---

## 2. CORE CONCEPTS

### 2.1 The Founder's Money Stack

```
┌──────────────────────────────────────────────┐
│ Layer 5: GROWTH CAPITAL                       │
│   "Money I invest back into the business"     │
│   → Ads, tools, contractors, inventory        │
├──────────────────────────────────────────────┤
│ Layer 4: PROFIT                               │
│   "Money left after all expenses"             │
│   → Pay yourself, save, reinvest              │
├──────────────────────────────────────────────┤
│ Layer 3: TAX RESERVE                          │
│   "Money I owe the government"                │
│   → Set aside 25-30% of net income            │
├──────────────────────────────────────────────┤
│ Layer 2: OPERATING EXPENSES                   │
│   "Money it costs to run the business"        │
│   → SaaS tools, hosting, AI APIs, insurance   │
├──────────────────────────────────────────────┤
│ Layer 1: REVENUE                              │
│   "Money customers pay me"                    │
│   → Invoice amount before any deductions      │
└──────────────────────────────────────────────┘
```

**The critical mistake:** Founders see $5,000 in revenue and think they have $5,000. They don't. After expenses ($800), taxes ($1,100), and reinvestment ($1,000), they have $2,100. AIlex must make this visible early.

### 2.2 Separate Your Money — The 4-Account System

| Account | Purpose | % of Revenue | Where |
|---------|---------|-------------|-------|
| **Operating** | Day-to-day expenses, tool subscriptions, contractor payments | 50-60% | Business checking (Mercury/Relay) |
| **Tax Reserve** | Quarterly estimated tax payments | 25-30% | Business savings (auto-transfer) |
| **Profit** | Owner's pay + emergency fund | 10-15% | Business savings (separate) |
| **Growth** | Marketing spend, new tools, experiments | 5-10% | Business checking (sub-account) |

**AIlex setup action:** When founder enters Stage 5, walk them through setting up auto-transfers. "Every time revenue hits your account, automatically move 25% to tax reserve and 10% to profit. What's left is what you can spend."

### 2.3 US Tax Obligations for Solo Founders

**Quarterly Estimated Taxes (critical — most new founders miss this):**

| Quarter | Period | Due Date |
|---------|--------|----------|
| Q1 | Jan 1 – Mar 31 | April 15 |
| Q2 | Apr 1 – May 31 | June 15 |
| Q3 | Jun 1 – Aug 31 | September 15 |
| Q4 | Sep 1 – Dec 31 | January 15 (next year) |

**How much to pay:**
- Safe harbor: Pay 100% of last year's tax liability (or 110% if AGI > $150K), split into 4 equal payments
- New business with no prior year: Estimate current year profit × 30% ÷ 4
- Use IRS Form 1040-ES or pay via IRS Direct Pay (irs.gov/payments)

**Self-Employment Tax:**
- Solo founders pay both employer + employee portions of Social Security and Medicare
- Rate: 15.3% on net self-employment income (up to $168,600 for SS in 2025; Medicare unlimited)
- This is ON TOP OF income tax — founders are shocked by this

**Deductible Business Expenses:**
- Home office (simplified: $5/sq ft, up to 300 sq ft = $1,500 deduction)
- SaaS tools and subscriptions
- AI API costs (Claude, OpenAI, etc.)
- Internet and phone (business % only)
- Health insurance premiums (100% deductible for self-employed)
- Professional services (lawyer, accountant)
- Business travel and meals (50% for meals)
- Education directly related to business

### 2.4 Bookkeeping — Keep It Simple

**For $0–$5K MRR: Spreadsheet is fine.**

```
MONTHLY INCOME/EXPENSE TRACKER
===============================
INCOME:
  [Date] | [Client/Source] | [Amount] | [Invoice #]

EXPENSES:
  [Date] | [Vendor] | [Amount] | [Category] | [Tax Deductible? Y/N]

SUMMARY:
  Total Income: $___
  Total Expenses: $___
  Net Profit: $___
  Tax Reserve (30%): $___
  Available: $___
```

**For $5K–$25K MRR: Use accounting software.**
- **Wave** — Free, includes invoicing, receipt scanning, reports. Best for bootstrappers.
- **QuickBooks Self-Employed** — $15/month, auto-categorizes expenses, estimates quarterly taxes.
- **Bench** — $249/month, human bookkeepers do it for you. Worth it when you hit $10K+ MRR.

### 2.5 Cash Flow Management

**The Cash Flow Rule:** You can be profitable on paper and still run out of cash.

| Scenario | Problem | Solution |
|----------|---------|----------|
| Annual subscriptions paid upfront | Big cash inflow in month 1, but you "owe" 11 months of service | Recognize revenue monthly. Don't spend the lump sum. |
| Net-30 invoicing | Service delivered today, paid in 30 days | Invoice immediately. Follow up on day 7, 14, 21, 28. |
| Seasonal revenue | Great months and dead months | Build 2-month expense buffer during good months. |
| Growing too fast | More customers = more costs before revenue catches up | Watch cash weekly, not monthly. |

**AIlex cash flow check:** "Your MRR is $3,000, but you spent $2,800 this month including that new tool subscription. Your runway at current burn: 2 months of savings. Is that enough buffer, or should we cut something?"

### 2.6 When to Hire an Accountant

| Milestone | Action |
|-----------|--------|
| First year of business | File your own taxes OR use TurboTax Self-Employed (~$120). Simple enough. |
| Revenue hits $50K/year | Get a CPA to review your tax strategy. One-time consultation: $200-$500. May save you thousands in deductions. |
| Revenue hits $100K/year | Monthly bookkeeping service + CPA for taxes. Consider S-Corp election for tax savings. |
| Hiring employees (W-2) | Must have payroll service + accountant. Gusto ($40/mo + $6/person) handles payroll. |

---

## 3. DECISION TABLES

### When AIlex triggers money management conversation:

| Trigger | AIlex Action |
|---------|-------------|
| Founder receives first payment | "Congrats! First revenue! Now let's make sure you keep it. Quick question: do you have a separate business bank account? And have you set aside money for taxes?" |
| Founder says "I don't know if I'm profitable" | "Let's figure that out right now. Tell me: what was your total revenue last month, and what were your expenses? We'll calculate your real profit in 5 minutes." |
| End of first quarter with revenue | "Heads up: quarterly estimated taxes are due [date]. Based on your profit of $[X], you should pay approximately $[X × 0.30 ÷ 4]. Have you set this aside?" |
| Founder wants to buy expensive tool/ad spend | "Before we spend $500 on [tool], let's check your cash position. What's in your operating account? What's your monthly burn? Can you afford this AND next month's expenses?" |
| Founder asks about S-Corp | "Great question — but usually only worth it when your net profit is consistently above $40K/year. Your current profit is $[X]. Let's revisit when you cross that threshold." |

### Monthly financial check-in (AIlex runs this):

| Metric | Healthy | Warning | Danger |
|--------|---------|---------|--------|
| Revenue trend | Growing month-over-month | Flat for 2+ months | Declining |
| Expense ratio | < 50% of revenue | 50-70% of revenue | > 70% of revenue |
| Tax reserve | 25-30% set aside | < 20% set aside | Nothing set aside |
| Cash runway | 3+ months of expenses | 1-2 months | < 1 month |
| Accounts receivable | < 30 days average | 30-60 days | > 60 days |

---

## 4. DELIVERABLE TEMPLATES

### Monthly Financial Snapshot (AIlex generates from founder's data)

```
MONTHLY FINANCIAL SNAPSHOT — [MONTH YEAR]
==========================================
REVENUE:
  Recurring (MRR):        $________
  One-time:               $________
  Total Revenue:          $________

EXPENSES:
  SaaS/Tools:             $________
  AI API costs:           $________
  Marketing/Ads:          $________
  Contractors:            $________
  Other:                  $________
  Total Expenses:         $________

BOTTOM LINE:
  Net Profit:             $________
  Profit Margin:          _______%
  Tax Reserve (30%):      $________
  Owner's Pay:            $________

CASH POSITION:
  Operating account:      $________
  Tax reserve account:    $________
  Profit/savings:         $________
  Total cash:             $________
  Monthly burn rate:      $________
  Runway:                 _______ months
```

---

## 5. RED FLAGS

- **Founder has no idea how much they've spent this month** → "We need to fix this today. Not knowing your expenses is like driving without a dashboard. Let's list every subscription and cost right now."
- **Founder hasn't paid estimated taxes and it's Q3+** → "I need to flag this urgently: you may owe penalties for underpayment. The IRS charges interest on late estimated taxes. Let's calculate what you owe and pay it this week."
- **Founder is paying themselves nothing** → "You've been working for 3 months and paying yourself $0. That's not sustainable. Even $500/month to cover personal basics is important. You can't build a business if you can't pay your rent."
- **Founder wants to spend savings on a marketing bet** → "I love the ambition, but let's not bet the farm. Rule of thumb: never spend more than 1 month of profit on a single experiment. If it fails, you need to survive."
- **Founder's business and personal expenses are mixed** → "This puts your LLC protection at risk. Judges can 'pierce the corporate veil' if you can't prove the business is separate from you. Let's untangle these accounts this week."

---

## 6. EXAMPLES

### Product Example: SaaS ($3K MRR)

**Monthly breakdown:**
- Revenue: $3,000 (100 customers × $30/mo)
- Expenses: Hosting $50, AI API $150, Stripe fees $90, tools $100 = $390
- Net profit: $2,610
- Tax reserve (30%): $783 → auto-transfer to savings
- Owner's pay (30%): $783
- Growth fund (10%): $261
- Operating reserve: $783

**AIlex:** "Your profit margin is 87% — that's excellent for SaaS. You're setting aside $783/quarter for taxes, which means you'll owe roughly $3,132 for the year. You're on track. One thing to consider: at $3K MRR, it might be worth $15/month for QuickBooks to automate your bookkeeping."

### Service Example: Consultant ($8K/month)

**Monthly breakdown:**
- Revenue: $8,000 (4 clients × $2,000/mo)
- Expenses: Tools $200, co-working $300, insurance $50, subcontractor $1,500 = $2,050
- Net profit: $5,950
- Tax reserve (30%): $1,785
- Owner's pay: $3,000
- Growth: $595
- Buffer: $570

**AIlex:** "Your margins are 74% — solid for a service business. But I notice you're approaching $100K/year. Two things: (1) Get a CPA consultation this quarter — S-Corp election could save you $3,000-$5,000/year in self-employment tax. (2) Your subcontractor takes 19% of revenue — make sure they're on a 1099 and you have a contractor agreement."

---

*KB Guide F.1 | Enter AI — AIlex, Your AI Co-Founder*
*For AIlex internal use only — not shown to users*
