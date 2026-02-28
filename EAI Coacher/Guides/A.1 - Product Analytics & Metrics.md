# A.1 — Product Analytics & Metrics

**KB Guide for AIlex | Stage 5: Working Machine**
**Version:** 1.0 | **Date:** 2026-02-27
**Word count:** ~2,500 | **Not user-facing — AIlex reference only**

---

## 1. CONTEXT

Use this guide when the founder has paying customers (Stage 4) and needs to shift from "I feel like it's working" to "I know it's working." Most solo founders either track nothing or track the wrong things (vanity metrics). AIlex helps the founder identify their North Star Metric, build a simple dashboard, and make data-driven decisions weekly. Primary muscle: Number Reading + Reality Testing. Equipment: Live Demo, Data Insights, Sharpening Questions, Form Correction, Mirror, Rapid Production.

---

## 2. CORE CONCEPTS

### 2.1 Vanity Metrics vs. Actionable Metrics

| Vanity (feels good, means nothing) | Actionable (tells you what to do) |
|-------------------------------------|-----------------------------------|
| Total signups | Active users this week |
| Page views | Pages per session |
| Social media followers | Followers who became customers |
| App downloads | Users who completed onboarding |
| "We're growing!" | Growth rate (% change week-over-week) |

**The test:** If a metric goes up, do you know what to do next? If not, it's vanity.

### 2.2 The North Star Metric

Every product has ONE metric that best captures the value you deliver to customers. This is your North Star.

| Business Type | North Star Metric |
|--------------|-------------------|
| SaaS tool | Weekly Active Users (who complete core action) |
| Marketplace | Transactions per week |
| Subscription content | Weekly engaged readers/watchers |
| Service business | Monthly recurring clients |
| E-commerce | Monthly repeat purchase rate |
| Community/social | Daily active contributors |

**How to find your North Star:**
1. What is the core action a customer takes when getting value?
2. How often should they do it? (Daily? Weekly? Monthly?)
3. Combine: "[Frequency] [Users] who [Core Action]"

Example: "Weekly active planners who add 3+ tasks" (task tool)

### 2.3 The AARRR Funnel (Pirate Metrics)

```
ACQUISITION → ACTIVATION → RETENTION → REVENUE → REFERRAL
  "How do      "Do they      "Do they     "Do they    "Do they
  they find    have a good   come back?"   pay?"      tell others?"
  us?"         first
               experience?"

Example funnel for a SaaS tool:
  Visit site    Create account   Use 2nd week   Subscribe   Invite friend
   (1,000)  →    (200)       →    (80)      →    (30)   →    (5)
    100%          20%              8%             3%          0.5%
```

**Where to focus:** Fix the biggest drop-off first. In the example above, Acquisition→Activation (20%) is the biggest leak.

### 2.4 Cohort Analysis (Simple Version)

Don't just look at totals — look at groups over time.

```
WEEKLY COHORT RETENTION:
                Week 1   Week 2   Week 3   Week 4
Jan 6 cohort:   100%     45%      30%      25%
Jan 13 cohort:  100%     50%      35%      28%
Jan 20 cohort:  100%     55%      40%      —

Reading: Retention is improving! Jan 20 cohort retains
better than Jan 6. Whatever you changed is working.
```

**For solo founders:** A Google Sheet with weekly cohort rows is enough. You don't need Amplitude or Mixpanel yet.

### 2.5 The Solo Founder Analytics Stack

| Tool | What It Does | Cost | Best For |
|------|-------------|------|----------|
| **Plausible** | Simple web analytics | $9/mo | Page views, referrals, basic funnel |
| **Mixpanel** | Event-based analytics | Free (up to 20M events) | Funnels, retention, cohorts |
| **PostHog** | Product analytics (open-source) | Free (self-hosted) | Everything Mixpanel does |
| **Google Analytics 4** | Web analytics | Free | Basic traffic data |
| **Google Sheets** | Manual tracking | Free | Custom dashboards, cohort tables |
| **Stripe Dashboard** | Revenue metrics | Free (with Stripe) | MRR, churn, revenue |

**AIlex recommendation:** Start with Google Sheets + Plausible. Add Mixpanel when you have 100+ users.

### 2.6 The Weekly Dashboard Review

Every week, spend 15 minutes on this:

```
WEEKLY REVIEW (every Monday):
1. North Star Metric: ___ (↑↓ vs last week)
2. New signups: ___
3. Activation rate: ___% (completed core action)
4. Retention: ___% (came back this week)
5. Revenue: $___  (MRR: $___)
6. Biggest drop-off: _______________
7. One action this week: _______________
```

**Rule:** Every review ends with ONE action. Not five. One.

### 2.7 Product-Market Fit Measurement

| Method | Signal | Threshold |
|--------|--------|-----------|
| **Sean Ellis Test** | "How would you feel if you could no longer use this product?" | 40%+ say "Very disappointed" = PMF |
| **Retention curve** | Does the retention curve flatten? | If it flattens above 20-30%, you have PMF |
| **NPS** | Net Promoter Score | 50+ = strong PMF |
| **Organic growth** | Are users referring others without incentive? | Any organic referrals = early PMF signal |
| **Revenue retention** | Do customers keep paying month over month? | Net revenue retention >100% = strong PMF |

---

## 3. DECISION TABLES

### What to measure at each stage:

| Stage | Focus Metrics | Don't Worry About Yet |
|-------|-------------|----------------------|
| 0-50 users | Activation rate, qualitative feedback | Retention curves, cohorts |
| 50-200 users | Retention, activation, conversion to paid | Growth rate, virality |
| 200-1,000 users | Full funnel (AARRR), cohort analysis | Advanced segmentation |
| 1,000+ users | All of the above + unit economics | You should be measuring everything |

### When metrics are confusing:

| Situation | What It Means | Action |
|-----------|-------------|--------|
| Signups up, activation down | You're attracting the wrong people OR onboarding is broken | Check: where are new signups coming from? Review onboarding flow. |
| Activation up, retention down | Good first experience, but no ongoing value | Add features that create habits (reminders, weekly summaries, streaks) |
| Retention up, revenue down | People love it but won't pay | Pricing problem. Review 4.2. Or your free tier is too generous. |
| Everything is flat | No growth, no decline — you're stuck | Time for a growth experiment (see 4.3) or new channel (see 4.1) |

---

## 4. DELIVERABLE TEMPLATES

### Analytics Dashboard (Google Sheets)

```
WEEKLY DASHBOARD — [PRODUCT NAME]
====================================
Week of: _______________

NORTH STAR: [metric name] = ___  (last week: ___, change: ___%

FUNNEL:
  Visits:         ___  (source: ___)
  Signups:        ___  (CVR: ___%)
  Activated:      ___  (activation rate: ___%)
  Retained (W2):  ___  (retention: ___%)
  Paying:         ___  (conversion: ___%)
  Referred:       ___  (viral coefficient: ___)

REVENUE:
  New MRR: $___
  Churned MRR: $___
  Net MRR: $___  (total MRR: $___)

BIGGEST LEAK: _______________ (___% drop)

THIS WEEK'S ACTION:
  What: _______________
  Expected impact: _______________
  How to measure: _______________
```

### PMF Survey

```
PMF SURVEY — [PRODUCT NAME]
=============================
Send to: All active users (used product in last 30 days)
Minimum responses: 40

QUESTIONS:
1. How would you feel if you could no longer use [product]?
   [ ] Very disappointed
   [ ] Somewhat disappointed
   [ ] Not disappointed
   [ ] I no longer use it

2. What type of people do you think would benefit most from [product]?
   [Open text]

3. What is the main benefit you get from [product]?
   [Open text]

4. How can we improve [product] for you?
   [Open text]

RESULTS:
  Very disappointed: ___% (target: 40%+)
  PMF status: [Achieved / Not Yet / Close]
```

---

## 5. RED FLAGS

- **Founder tracks nothing** → "You have paying customers but no data. That's like driving with your eyes closed. Set up a simple dashboard this week — 30 minutes, Google Sheets, 5 numbers."
- **Founder tracks 20 metrics** → "You're drowning in data. What's your ONE North Star Metric? The one number that, if it goes up, everything else follows? Focus on that."
- **Founder celebrates total signups** → "1,000 signups! But how many are active this week? Total signups is a vanity metric. Active users is the real number."
- **Founder ignores churn** → "You added 10 customers this month. Great. But you lost 8. Your net growth is 2. Churn is the silent killer — let's understand why people are leaving."
- **Founder makes decisions by gut, ignores data** → "Your gut says the new feature is working. Your data says retention dropped 15% since you launched it. Who do we trust?"

---

## 6. EXAMPLES

### Product: Freelancer Task Tool

**North Star:** Weekly Active Users who complete 3+ tasks
**Dashboard setup:** Plausible (traffic) + Supabase queries (product events) + Google Sheet (weekly review)
**Funnel:** Visit (500/wk) → Signup (75) → Add First Task (45) → Complete 3 Tasks (25) → Pay (12)
**Biggest leak:** Signup → Add First Task (40% drop) → Improved onboarding with guided tutorial → Jump to 60%
**PMF Survey:** 48% "Very disappointed" → PMF achieved!

### Service: Restaurant Social Media

**North Star:** Monthly recurring clients
**Dashboard:** Google Sheet tracking clients, hours, deliverables, satisfaction scores
**Funnel:** Lead (20/mo) → Discovery call (8) → Proposal sent (5) → Signed (2)
**Key metrics:** Client satisfaction score (1-10 monthly), average contract length (4.2 months), referral rate (30%)
**Insight:** Clients who see monthly reports stay 2x longer → Made reports a core deliverable

---

*KB Guide A.1 | Enter AI — AIlex, Your AI Co-Founder*
*For AIlex internal use only — not shown to users*
