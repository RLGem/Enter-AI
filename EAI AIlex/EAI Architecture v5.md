# 🏗️ Enter AI - ארכיטקטורת מערכת

## גרסה 5.0 | ינואר 2026

### 💡 מערכת ליווי יזמים מבוססת JSON + Claude

*תיעוד טכני מלא של מבנה המערכת*

---

**📚 6 פרקים | 🎯 תיעוד מלא למפתחים ומתחזקים**

*Enter AI | Entrepreneurship in the AI Age*

---

## 📋 תוכן עניינים

| # | נושא | תיאור |
|:-:|:-----|:------|
| 1 | סקירה כללית | עקרונות, רכיבים, זרימה |
| 2 | state.json | מבנה מלא + תיעוד שדות |
| 3 | events.jsonl | כל סוגי האירועים |
| 4 | גרף תלויות | מיפוי מלא |
| 5 | זרימות עבודה | תרשימים מפורטים |
| 6 | מקרי קצה | טיפול במצבים מיוחדים |

---

# 1️⃣ סקירה כללית

## 🎯 עקרונות ארכיטקטוניים

```
┌────────────────────────────────────────────────────────────────────────────┐
│ עקרון                     │ יישום                                         │
│ ══════════════════════════╪═══════════════════════════════════════════════│
│ פשטות מקסימלית           │ קבצי JSON במקום DB                            │
│ אין תלות בתשתית          │ רק Claude + קבצים                             │
│ יזם לא-טכני יכול להשתמש  │ העלאה/הורדה של קבצים                          │
│ היסטוריה שלמה            │ events.jsonl = append-only                    │
│ מצב נוכחי ברור           │ state.json = snapshot                         │
│ גמישות מלאה              │ JSON schema גמיש                              │
└────────────────────────────────────────────────────────────────────────────┘
```

## 🧩 רכיבי המערכת

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌─────────────┐         ┌─────────────────────────────────────────────┐  │
│   │  👤 יזם     │         │               🤖 AIlex                      │  │
│   │             │ ──────► │                                             │  │
│   │  מעלה:     │         │  • קורא state.json                         │  │
│   │  • state   │         │  • קורא events.jsonl                       │  │
│   │  • events  │         │  • מחליף "כובע" לפי שלב                    │  │
│   │             │ ◄────── │  • מייצר קבצים מעודכנים                    │  │
│   │  מוריד:    │         │                                             │  │
│   │  • state'  │         │  כובעים:                                    │  │
│   │  • events+ │         │  💡 IDEA │ 🔍 VALIDATE │ 📊 PRODUCT        │  │
│   └─────────────┘         │  💻 TECH │ 🚀 LAUNCH  │ 📈 SCALE          │  │
│                           └─────────────────────────────────────────────┘  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                        📁 קבצי פרויקט                               │  │
│   │                                                                     │  │
│   │   state.json          │  מצב נוכחי (מוחלף בכל שיחה)               │  │
│   │   events.jsonl        │  היסטוריה (רק הוספה)                      │  │
│   │   outputs/            │  תוצרים (מסמכים, קוד, וכו')               │  │
│   │                                                                     │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 🔄 זרימת נתונים

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   שיחה N                              שיחה N+1                            │
│   ════════                            ══════════                           │
│                                                                            │
│   state.json ──┐                      state.json ──┐                      │
│                │                                   │                      │
│   events.jsonl ┼──► AIlex ──► state'.json ────────┼──► AIlex ──► ...    │
│                │              events+.jsonl ──────┘                      │
│                │              (שורות חדשות)                               │
│                │                      │                                    │
│                │                      ▼                                    │
│                │              events.jsonl                                │
│                │              (מאוחד)                                     │
│                │                                                          │
└────────────────────────────────────────────────────────────────────────────┘
```

---

# 2️⃣ state.json - מבנה מלא

## 📊 סכמה כללית

```json
{
  "_meta": {},           // מטא-דאטה על הקובץ
  "project": {},         // פרטי הפרויקט
  "entrepreneur": {},    // פרטי היזם
  "current_position": {},// מיקום נוכחי
  "stages": {},          // סטטוס כל שלב
  "inputs": {},          // כל ה-inputs (required/important/optional)
  "branches": {},        // הסתעפויות ומצבן
  "decisions": {},       // החלטות (explicit/implicit)
  "recommendations": {}, // המלצות (pending/history)
  "outputs": {},         // תוצרים
  "blockers": [],        // חסמים
  "next_action": {}      // הצעד הבא
}
```

## 📋 תיעוד שדות מפורט

### _meta
```json
{
  "_meta": {
    "version": "1.0",              // גרסת הסכמה
    "created": "YYYYMMDD-HH:MM",   // תאריך יצירה
    "last_updated": "YYYYMMDD-HH:MM", // עדכון אחרון
    "last_session": 5              // מספר השיחה האחרונה
  }
}
```

### project
```json
{
  "project": {
    "id": "eventapp_001",          // מזהה ייחודי
    "name": "EventApp",            // שם הפרויקט
    "description": "אפליקציה...",  // תיאור קצר
    "topic": "entrepreneurship",   // נושא (לעת עתה קבוע)
    "started": "20260110"          // תאריך התחלה
  }
}
```

### entrepreneur
```json
{
  "entrepreneur": {
    "name": "דני",                           // שם היזם
    "technical_level": "none|basic|intermediate|advanced",
    "time_available": "full-time|part-time|evenings|weekends",
    "budget": "$500",                        // תקציב
    "background": "מנהל שיווק, ניסיון..."   // רקע רלוונטי
  }
}
```

### current_position
```json
{
  "current_position": {
    "stage": "VALIDATE",           // שלב ראשי
    "sub_stage": "Customer Interviews", // תת-שלב
    "progress_percent": 35,        // אחוז התקדמות כולל
    "status": "active|paused|blocked|completed"
  }
}
```

### stages
```json
{
  "stages": {
    "IDEA": {
      "status": "not_started|in_progress|completed|skipped",
      "progress": 100,             // 0-100
      "started": "20260110",       // תאריך התחלה (null אם לא התחיל)
      "completed": "20260115",     // תאריך סיום (null אם לא הסתיים)
      "outputs": ["problem_statement_v1", "fumes_analysis"]
    },
    "VALIDATE": { /* same structure */ },
    "BUILD": {
      "PRODUCT": { /* same structure */ },
      "TECH": { /* same structure */ }
    },
    "LAUNCH": { /* same structure */ },
    "SCALE": { /* same structure */ }
  }
}
```

### inputs
```json
{
  "inputs": {
    "required": {
      "problem": {
        "value": "תכנון אירועים הוא כאוטי...",
        "status": "provided|missing"
      },
      "solution_idea": {
        "value": "אפליקציה שמרכזת...",
        "status": "provided"
      },
      "target_audience": {
        "value": "זוגות מאורסים...",
        "status": "provided"
      }
    },
    "important": {
      "budget": {
        "value": "$500",
        "is_default": false,       // האם ברירת מחדל?
        "default_reason": null,    // אם כן - למה
        "actor": "user|system",    // מי קבע
        "updated": "20260112"      // מתי עודכן
      },
      "technical_level": {
        "value": "basic",
        "is_default": false,
        "actor": "user",
        "note": "יודע HTML בסיסי"  // הערות נוספות
      }
    },
    "optional": {
      "prior_experience": {
        "value": "תכנן 2 חתונות",
        "is_default": false
      },
      "partners": {
        "value": "solo",
        "is_default": true         // לא צוין - הונח
      }
    }
  }
}
```

### branches - הסתעפויות

**זהו החלק הקריטי ביותר למעקב אחר התפתחות הפרויקט**

```json
{
  "branches": {
    "target_audience": {           // נושא ההסתעפות
      "B2C_couples": {             // אופציה 1
        "status": "selected",      // סטטוס (ראה טבלה למטה)
        "depth": 3,                // עומק חקירה (0-5)
        "actor": "user|system",    // מי קבע את הסטטוס
        "reason": "explicit: זה הקהל שאני מכיר",
        "quote": "זה הקהל שאני מכיר ומבין",  // ציטוט אם מפורש
        "findings": "מוכנים לשלם 50-80 ש\"ח", // ממצאים
        "started": "20260116"      // מתי התחילה חקירה
      },
      "B2B_venues": {              // אופציה 2
        "status": "queued",
        "depth": 0,
        "actor": "system",
        "reason": "implicit: B2C prioritized by user preference"
      },
      "B2B_planners": {            // אופציה 3
        "status": "rejected_temp",
        "depth": 0,
        "actor": "user",
        "reason": "explicit: מחזור מכירה ארוך",
        "quote": "אני לא רוצה להתחיל עם B2B, זה לוקח יותר מדי זמן"
      }
    },
    "validation_method": {
      "interviews": { "status": "selected", "depth": 3, ... },
      "landing_page": { "status": "queued", ... },
      "ads_test": { "status": "queued", ... }
    }
  }
}
```

**טבלת סטטוסים:**

| סטטוס | משמעות | actor | AIlex יציע שוב? |
|:------|:-------|:-----:|:---------------:|
| `not_explored` | לא הוזכרה עדיין | - | ✅ כן |
| `queued` | בתור - אחרת נבחרה | system | ✅ כן, בהזדמנות |
| `exploring` | בחקירה פעילה | user | - |
| `selected` | נבחרה לעבודה | user | - |
| `exhausted` | נחקרה עד תום | user | ❌ לא |
| `rejected_temp` | נדחתה זמנית | user | ⚠️ רק אם ישאל |
| `rejected_final` | נדחתה סופית | user | ❌ לא |

**עומק חקירה (depth):**

| depth | משמעות |
|:-----:|:-------|
| 0 | לא נחקרה כלל |
| 1 | הוזכרה/נבחרה |
| 2 | נחקרה בסיסית |
| 3 | נחקרה לעומק |
| 4 | נחקרה מקיפה |
| 5 | מוצתה לחלוטין |

### decisions
```json
{
  "decisions": {
    "explicit": [                  // החלטות שהיזם קיבל במפורש
      {
        "id": "DEC-001",
        "date": "20260110",
        "topic": "תחום",
        "choice": "אירועים משפחתיים",
        "alternatives_considered": ["אירועים עסקיים", "ניהול פרויקטים"],
        "reason": "ניסיון אישי וכאב אמיתי"
      }
    ],
    "implicit": [                  // החלטות שנגזרו/הונחו
      {
        "id": "IMP-001",
        "date": "20260110",
        "topic": "שותפים",
        "assumed": "יזם יחיד",
        "reason": "לא הוזכרו שותפים"
      }
    ]
  }
}
```

### recommendations
```json
{
  "recommendations": {
    "pending": {                   // המלצה שממתינה להחלטה
      "id": "REC-005",
      "date": "20260125",
      "context": "סיום ראיונות",
      "options": ["לבנות Landing Page", "להתחיל MVP", "עוד ראיונות"],
      "recommended": "לבנות Landing Page",
      "reasoning": "8 ראיונות מספיקים, LP יאמת נכונות לשלם",
      "confidence": "high|medium|low"
    },
    "history": [                   // היסטוריית המלצות
      {
        "id": "REC-001",
        "date": "20260110",
        "recommended": "להתחיל עם FUMES",
        "followed": true           // האם היזם הלך עם ההמלצה
      }
    ]
  }
}
```

### outputs
```json
{
  "outputs": {
    "completed": [
      {
        "id": "OUT-001",
        "type": "problem_statement",
        "name": "Problem Statement v1",
        "stage": "IDEA",
        "created": "20260110",
        "file": "outputs/problem_statement_v1.md"  // נתיב לקובץ
      }
    ],
    "in_progress": [
      {
        "id": "OUT-005",
        "type": "validation_insights",
        "name": "תובנות מראיונות",
        "stage": "VALIDATE",
        "started": "20260120",
        "progress": 80             // אחוז השלמה
      }
    ]
  }
}
```

### blockers
```json
{
  "blockers": [
    {
      "id": "BLK-001",
      "created": "20260120",
      "type": "external|internal|decision",
      "description": "מחכה לתשובה מספק X",
      "blocking": ["BUILD.TECH"],  // מה זה חוסם
      "resolved": null             // תאריך פתרון (null אם פתוח)
    }
  ]
}
```

### next_action
```json
{
  "next_action": {
    "what": "להחליט על Landing Page",
    "stage": "VALIDATE",
    "priority": "high|medium|low",
    "pending_recommendation": "REC-005"  // אם יש המלצה פתוחה
  }
}
```

---

# 3️⃣ events.jsonl - סוגי אירועים

## 📋 מבנה שורה

```json
{"k":"STAGE.SUB.SUB","t":"YYYYMMDD-HH:MM","e":"EVENT_TYPE","d":{...}}
```

| שדה | תיאור | דוגמה |
|:---:|:------|:------|
| `k` | מפתח היררכי | `"VALIDATE.TARGET.B2C"` |
| `t` | חותמת זמן | `"20260125-14:30"` |
| `e` | סוג אירוע | `"BRANCH_SELECTED"` |
| `d` | פרטים | `{"actor":"user","depth":1}` |

## 📊 כל סוגי האירועים

### אירועי שיחה (Session)

```jsonl
{"k":"_SESSION","t":"20260125-14:00","e":"SESSION_START","d":{"session":7,"mode":"continue"}}
{"k":"_SESSION","t":"20260125-15:30","e":"SESSION_END","d":{"session":7,"duration_min":90,"outputs_created":2}}
```

| אירוע | משמעות | שדות ב-d |
|:------|:-------|:---------|
| `SESSION_START` | תחילת שיחה | `session`, `mode` (new/continue) |
| `SESSION_END` | סוף שיחה | `session`, `duration_min`, `outputs_created` |

### אירועי מצב (Status)

```jsonl
{"k":"IDEA","t":"20260110-09:05","e":"STARTED","d":{"actor":"system"}}
{"k":"IDEA","t":"20260110-10:00","e":"PROGRESS","d":{"percent":50,"note":"סיימנו FUMES"}}
{"k":"IDEA","t":"20260115-10:30","e":"COMPLETED","d":{"duration_days":5,"outputs":["problem_statement","fumes"]}}
{"k":"VALIDATE","t":"20260120-10:00","e":"PAUSED","d":{"reason":"מחכה לראיונות"}}
{"k":"VALIDATE","t":"20260122-14:00","e":"RESUMED","d":{"after_days":2}}
```

| אירוע | משמעות | שדות ב-d |
|:------|:-------|:---------|
| `STARTED` | התחלת עבודה | `actor`, `goal` (אופציונלי) |
| `PROGRESS` | התקדמות | `percent`, `done`, `target`, `note` |
| `COMPLETED` | סיום | `duration_days`, `outputs` |
| `PAUSED` | הושהה | `reason` |
| `RESUMED` | חודש | `after_days` |

### אירועי החלטה (Decision)

```jsonl
{"k":"IDEA.PROBLEM","t":"20260110-09:40","e":"DECISION","d":{"actor":"user","action":"select","choice":"כאוס בתכנון","following_rec":true}}
{"k":"VALIDATE.TARGET","t":"20260115-11:05","e":"DECISION","d":{"actor":"user","action":"reject_temp","choice":"B2B_planners","quote":"לא רוצה B2B עכשיו"}}
{"k":"BUILD","t":"20260201-10:00","e":"DECISION","d":{"actor":"user","action":"skip","stage":"VALIDATE","reason":"רוצה להתחיל לבנות"}}
{"k":"IDEA","t":"20260205-09:00","e":"DECISION","d":{"actor":"user","action":"pivot","from":"VALIDATE","to":"IDEA","reason":"שינוי בעיה"}}
```

| action | משמעות |
|:-------|:-------|
| `select` | בחירת אופציה |
| `reject_temp` | דחייה זמנית |
| `reject_final` | דחייה סופית |
| `skip` | דילוג על שלב |
| `pivot` | חזרה לשלב קודם |
| `accept` | קבלת המלצה |

### אירועי המלצה (Recommendation)

```jsonl
{"k":"IDEA.PROBLEM","t":"20260110-09:35","e":"REC_GIVEN","d":{"actor":"system","recommended":"כאוס בתכנון","options":["כאוס","עלויות","תקשורת"],"reason":"FUMES גבוה","confidence":"high"}}
{"k":"VALIDATE","t":"20260125-14:40","e":"REC_PENDING","d":{"id":"REC-005","awaiting_user_decision":true}}
{"k":"VALIDATE","t":"20260125-15:00","e":"REC_FOLLOWED","d":{"id":"REC-005","choice":"Landing Page"}}
{"k":"VALIDATE","t":"20260125-15:00","e":"REC_REJECTED","d":{"id":"REC-005","choice":"עוד ראיונות","user_reason":"רוצה להיות בטוח"}}
```

| אירוע | משמעות |
|:------|:-------|
| `REC_GIVEN` | המלצה ניתנה |
| `REC_PENDING` | ממתין להחלטה |
| `REC_FOLLOWED` | היזם הלך עם ההמלצה |
| `REC_REJECTED` | היזם בחר אחרת |

### אירועי הסתעפות (Branch)

```jsonl
{"k":"VALIDATE.TARGET","t":"20260115-10:40","e":"BRANCHES_IDENTIFIED","d":{"actor":"system","options":["B2C_couples","B2B_venues","B2B_planners"]}}
{"k":"VALIDATE.TARGET.B2C","t":"20260115-11:00","e":"BRANCH_SELECTED","d":{"actor":"user","depth":1,"reason":"explicit: זה הקהל שאני מכיר"}}
{"k":"VALIDATE.TARGET.B2B_venues","t":"20260115-11:00","e":"BRANCH_QUEUED","d":{"actor":"system","reason":"implicit: B2C prioritized"}}
{"k":"VALIDATE.TARGET.B2C","t":"20260120-19:30","e":"BRANCH_EXPLORED","d":{"actor":"user","depth":2,"new_findings":"מוכנים לשלם 49-79"}}
{"k":"VALIDATE.TARGET.B2C","t":"20260125-14:25","e":"BRANCH_EXHAUSTED","d":{"actor":"user","depth":5,"conclusion":"זה הקהל הנכון"}}
{"k":"VALIDATE.TARGET.B2B_planners","t":"20260115-11:05","e":"BRANCH_REJECTED_TEMP","d":{"actor":"user","reason":"explicit","quote":"לא רוצה B2B עכשיו"}}
{"k":"VALIDATE.TARGET.B2B_venues","t":"20260220-10:00","e":"BRANCH_REJECTED_FINAL","d":{"actor":"user","reason":"explicit","quote":"לא רלוונטי בכלל"}}
```

| אירוע | משמעות | actor |
|:------|:-------|:-----:|
| `BRANCHES_IDENTIFIED` | זוהו אופציות | system |
| `BRANCH_SELECTED` | נבחרה לעבודה | user |
| `BRANCH_QUEUED` | הועברה לתור | system |
| `BRANCH_EXPLORED` | נחקרה (עם עומק) | user |
| `BRANCH_EXHAUSTED` | מוצתה | user |
| `BRANCH_REJECTED_TEMP` | נדחתה זמנית | user |
| `BRANCH_REJECTED_FINAL` | נדחתה סופית | user |

### אירועי תוצר (Output)

```jsonl
{"k":"IDEA","t":"20260110-11:00","e":"OUTPUT_CREATED","d":{"actor":"system","type":"problem_statement","version":1,"file":"outputs/problem_statement_v1.md"}}
{"k":"VALIDATE.INTERVIEWS","t":"20260118-20:10","e":"OUTPUT_CREATED","d":{"actor":"user","type":"interview_summary","interviewee":"זוג א","sentiment":"positive","key_insight":"שכחו לסגור צלם"}}
{"k":"BUILD.PRODUCT","t":"20260201-15:00","e":"OUTPUT_UPDATED","d":{"type":"prd","version":2,"changes":"הוספת user stories"}}
{"k":"LAUNCH","t":"20260301-10:00","e":"OUTPUT_FINAL","d":{"type":"landing_page","url":"https://eventapp.co.il"}}
```

| אירוע | משמעות |
|:------|:-------|
| `OUTPUT_CREATED` | תוצר נוצר |
| `OUTPUT_UPDATED` | תוצר עודכן |
| `OUTPUT_FINAL` | תוצר סופי |

### אירועי מידע (Input)

```jsonl
{"k":"IDEA.DOMAIN","t":"20260110-09:10","e":"INPUT_PROVIDED","d":{"actor":"user","field":"domain","value":"אירועים","source":"יזם סיפר"}}
{"k":"IDEA.BUDGET","t":"20260110-09:15","e":"INPUT_ASSUMED","d":{"actor":"system","field":"budget","value":"$0","reason":"לא צוין, הונח bootstrapping"}}
{"k":"IDEA.BUDGET","t":"20260112-15:30","e":"INPUT_CHANGED","d":{"actor":"user","field":"budget","from":"$0","to":"$500","reason":"יזם ציין תקציב"}}
```

| אירוע | משמעות |
|:------|:-------|
| `INPUT_PROVIDED` | מידע סופק ע"י יזם |
| `INPUT_ASSUMED` | מידע הונח ע"י המערכת |
| `INPUT_CHANGED` | מידע השתנה |

### אירועי מערכת (System)

```jsonl
{"k":"BUILD.TECH","t":"20260201-10:30","e":"IMPACT_ASSESSED","d":{"trigger":"tech_cofounder","affected":[{"item":"tech_stack","impact":"critical"},{"item":"mvp_complexity","impact":"high"}],"still_valid":["problem","target_audience"],"recommendation":"לבחון מחדש Tech Stack"}}
{"k":"_SYSTEM","t":"20260115-11:00","e":"INSIGHT","d":{"topic":"validation","insight":"יזמים מדלגים על ראיונות","source":"observation","status":"pending"}}
```

| אירוע | משמעות |
|:------|:-------|
| `IMPACT_ASSESSED` | הערכת השפעה בוצעה |
| `INSIGHT` | תובנה נרשמה |

---

# 4️⃣ גרף תלויות מלא

## 🔗 מיפוי תלויות

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   INPUT                    AFFECTS                      IMPACT LEVEL      │
│   ═════                    ═══════                      ════════════      │
│                                                                            │
│   קהל יעד ─────────────────┬─► בעיות רלוונטיות          🔴 CRITICAL      │
│   (B2B / B2C)              ├─► שיטות Validation          🔴 CRITICAL      │
│                            ├─► מודל עסקי                 🔴 CRITICAL      │
│                            ├─► תמחור                     🔴 CRITICAL      │
│                            └─► ערוצי שיווק               🟡 HIGH          │
│                                                                            │
│   בעיה שנבחרה ─────────────┬─► הפתרון                   🔴 CRITICAL      │
│                            ├─► Features                  🔴 CRITICAL      │
│                            ├─► תחרות                     🟡 HIGH          │
│                            └─► Value Proposition         🔴 CRITICAL      │
│                                                                            │
│   תקציב ───────────────────┬─► Tech Stack               🟡 HIGH          │
│                            ├─► ערוצי שיווק               🟡 HIGH          │
│                            ├─► קצב צמיחה                 🟢 MEDIUM        │
│                            └─► גיוס עובדים               🟢 MEDIUM        │
│                                                                            │
│   רמה טכנית של יזם ────────┬─► Tech Stack               🟡 HIGH          │
│                            └─► צורך בשותף טכני          🔴 CRITICAL      │
│                                                                            │
│   שותף טכני ───────────────┬─► Tech Stack               🔴 CRITICAL      │
│                            ├─► מורכבות MVP               🟡 HIGH          │
│                            └─► זמן לשוק                  🟢 MEDIUM        │
│                                                                            │
│   תוצאות Validation ───────┬─► Go / Pivot / No-Go       🔴 CRITICAL      │
│                            ├─► MVP Features              🔴 CRITICAL      │
│                            ├─► תמחור                     🟡 HIGH          │
│                            └─► מסרים שיווקיים           🟢 MEDIUM        │
│                                                                            │
│   מודל עסקי ───────────────┬─► תמחור                    🔴 CRITICAL      │
│                            ├─► Unit Economics            🔴 CRITICAL      │
│                            └─► ערוצי מכירה              🟡 HIGH          │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

## 📊 רמות השפעה

| רמה | סימון | משמעות | פעולה |
|:----|:-----:|:-------|:------|
| CRITICAL | 🔴 | משנה הכל | חייב לבחון מחדש |
| HIGH | 🟡 | משפיע משמעותית | מומלץ לבחון |
| MEDIUM | 🟢 | משפיע חלקית | אפשר להמשיך |
| LOW | ⚪ | השפעה מינורית | להתעלם |

---

# 5️⃣ זרימות עבודה

## 🔄 זרימה רגילה - שיחה

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   1. יזם מעלה קבצים                                                       │
│      │                                                                     │
│      ▼                                                                     │
│   2. AIlex קורא state.json                                                │
│      ├── מזהה: שלב נוכחי, מצב, המלצה ממתינה                              │
│      └── קורא events.jsonl (אם צריך היסטוריה)                            │
│      │                                                                     │
│      ▼                                                                     │
│   3. AIlex פותח: "שלום [שם]! אנחנו ב-[שלב]..."                           │
│      │                                                                     │
│      ▼                                                                     │
│   4. לולאת שיחה:                                                          │
│      ├── יזם שואל/מספר                                                   │
│      ├── AIlex מגיב (Quick Win + המלצה + שאלה)                           │
│      ├── AIlex צובר אירועים בזיכרון                                      │
│      └── חזרה ל-4 עד סוף שיחה                                            │
│      │                                                                     │
│      ▼                                                                     │
│   5. סיום שיחה:                                                           │
│      ├── AIlex מסכם                                                       │
│      ├── AIlex מייצר state.json מעודכן                                   │
│      └── AIlex מייצר שורות חדשות ל-events.jsonl                         │
│      │                                                                     │
│      ▼                                                                     │
│   6. יזם מוריד ושומר קבצים                                               │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

## 🔀 זרימת החלטה על הסתעפות

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   1. AIlex מזהה נקודת הסתעפות                                            │
│      │                                                                     │
│      ▼                                                                     │
│   2. AIlex מציג 2-3 אופציות + המלצה                                      │
│      ├── אירוע: BRANCHES_IDENTIFIED                                       │
│      └── אירוע: REC_GIVEN                                                 │
│      │                                                                     │
│      ▼                                                                     │
│   3. יזם בוחר ────────────────────────────────────────────────┐          │
│      │                                                         │          │
│      ▼                                                         ▼          │
│   הלך עם המלצה                                        בחר אחרת           │
│      │                                                         │          │
│      ▼                                                         ▼          │
│   אירוע: DECISION                                     אירוע: DECISION    │
│   {following_rec: true}                               {following_rec: false}
│      │                                                         │          │
│      └─────────────────────┬───────────────────────────────────┘          │
│                            ▼                                              │
│   4. עדכון branches:                                                     │
│      ├── נבחרה: status="selected", actor="user"                         │
│      └── אחרות: status="queued", actor="system"                         │
│         (אלא אם יזם אמר משהו מפורש)                                     │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

## ↩️ זרימת חזרה אחורה (Pivot)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   1. יזם: "אני רוצה לשנות את הבעיה"                                      │
│      │                                                                     │
│      ▼                                                                     │
│   2. AIlex בודק גרף תלויות:                                              │
│      ├── מה מושפע מ-"בעיה"?                                              │
│      └── מחשב רשימת affected items                                       │
│      │                                                                     │
│      ▼                                                                     │
│   3. AIlex מציג השפעה:                                                    │
│      "מה ישתנה: X, Y, Z                                                   │
│       מה נשאר: A, B, C                                                    │
│       💡 זה בסדר! רוב ההצלחות עברו pivot"                                │
│      │                                                                     │
│      ▼                                                                     │
│   4. יזם מאשר                                                             │
│      │                                                                     │
│      ▼                                                                     │
│   5. אירועים:                                                             │
│      ├── DECISION {action: "pivot", from: "VALIDATE", to: "IDEA"}        │
│      └── IMPACT_ASSESSED {affected: [...], still_valid: [...]}           │
│      │                                                                     │
│      ▼                                                                     │
│   6. עדכון state:                                                         │
│      ├── current_position.stage = "IDEA"                                  │
│      ├── stages.VALIDATE.status = "paused"                               │
│      └── relevant inputs/branches reset or marked                        │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

## ⚡ זרימת הערכת השפעה

```
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│   1. מידע חדש מתקבל                                                       │
│      (למשל: "יש לי שותף טכני")                                           │
│      │                                                                     │
│      ▼                                                                     │
│   2. AIlex מזהה: INPUT_CHANGED                                           │
│      ├── field: "partners"                                                │
│      ├── from: "solo"                                                     │
│      └── to: "tech_cofounder"                                            │
│      │                                                                     │
│      ▼                                                                     │
│   3. AIlex סורק גרף תלויות:                                              │
│      partners → tech_stack (CRITICAL)                                     │
│      partners → mvp_complexity (HIGH)                                     │
│      partners → time_to_market (MEDIUM)                                   │
│      │                                                                     │
│      ▼                                                                     │
│   4. AIlex מציג:                                                          │
│      "🎉 זה משנה דברים!                                                   │
│       🟢 השתפר: Tech Stack, MVP complexity                               │
│       🔄 לבחון מחדש: החלטת No-Code"                                      │
│      │                                                                     │
│      ▼                                                                     │
│   5. אירוע: IMPACT_ASSESSED                                              │
│      {trigger, affected, still_valid, recommendation}                    │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

---

# 6️⃣ מקרי קצה

## 🔴 מקרה: יזם מדלג על שלב

```
┌────────────────────────────────────────────────────────────────────────────┐
│ תרחיש: יזם רוצה לדלג על VALIDATE                                         │
│                                                                            │
│ AIlex:                                                                     │
│ 1. מציג סיכונים: "בונים בלי לדעת אם רוצים"                               │
│ 2. מציג מה חסר: "ראיונות, הוכחת ביקוש"                                   │
│ 3. מציע אלטרנטיבה: "Quick Validation - 3 שיחות בשעה"                     │
│ 4. מאפשר לדלג אם היזם בוחר                                               │
│                                                                            │
│ אם דילג:                                                                  │
│ • stages.VALIDATE.status = "skipped"                                      │
│ • אירוע: DECISION {action: "skip", stage: "VALIDATE"}                    │
│ • AIlex יזכיר בעתיד: "דילגת על Validation, שקול לחזור"                   │
└────────────────────────────────────────────────────────────────────────────┘
```

## 🟡 מקרה: הסתעפות שנדחתה חוזרת להיות רלוונטית

```
┌────────────────────────────────────────────────────────────────────────────┐
│ תרחיש: B2B נדחתה זמנית, B2C נכשל, יזם שוקל B2B                          │
│                                                                            │
│ AIlex בודק branches.target_audience.B2B:                                 │
│                                                                            │
│ אם status = "queued" (משתמע):                                            │
│ → "יש לנו עוד אופציה שלא בדקנו - B2B. רוצה לחקור?"                      │
│                                                                            │
│ אם status = "rejected_temp" (מפורש זמני):                                │
│ → "בהתחלה אמרת ש-B2B לא מעניין. האם זה השתנה?"                          │
│                                                                            │
│ אם status = "rejected_final" (מפורש סופי):                               │
│ → לא מציע B2B. "B2C לא עבד, B2B לא רלוונטי.                             │
│    בוא נחשוב על קהל חדש או נחזור ל-IDEA"                                 │
└────────────────────────────────────────────────────────────────────────────┘
```

## 🟢 מקרה: מידע חסר אבל אפשר להמשיך

```
┌────────────────────────────────────────────────────────────────────────────┐
│ תרחיש: יזם לא ציין תקציב                                                 │
│                                                                            │
│ סוג השדה: IMPORTANT (לא REQUIRED)                                        │
│                                                                            │
│ AIlex:                                                                     │
│ 1. מניח ברירת מחדל: budget = "$0"                                        │
│ 2. מציין: "הנחתי שאתה עובד בלי תקציב (bootstrapping)"                    │
│ 3. ממשיך בעבודה                                                          │
│ 4. אירוע: INPUT_ASSUMED {field: "budget", value: "$0", reason: "..."}   │
│ 5. בדוח מצב: 🟡 budget: $0 (ברירת מחדל)                                  │
│                                                                            │
│ אם יזם מעדכן אח"כ:                                                       │
│ • אירוע: INPUT_CHANGED                                                   │
│ • AIlex מעריך השפעה                                                      │
└────────────────────────────────────────────────────────────────────────────┘
```

## 🔵 מקרה: שיחה נקטעת באמצע

```
┌────────────────────────────────────────────────────────────────────────────┐
│ תרחיש: היזם לא ביקש לסיים, השיחה נגמרה                                   │
│                                                                            │
│ מה קורה:                                                                  │
│ • אין state.json מעודכן                                                  │
│ • אין events חדשים                                                       │
│                                                                            │
│ בשיחה הבאה:                                                               │
│ • AIlex קורא את ה-state הישן                                             │
│ • ממשיך מאיפה שהיה                                                       │
│ • יתכן שחלק מהעבודה תאבד (מה שלא נשמר)                                  │
│                                                                            │
│ 💡 המלצה ליזם:                                                            │
│ "אם צריך להפסיק - אמור לי ואייצר קבצים מעודכנים"                        │
└────────────────────────────────────────────────────────────────────────────┘
```

## ⚫ מקרה: סתירה בין state ל-events

```
┌────────────────────────────────────────────────────────────────────────────┐
│ תרחיש: state אומר X, events מראים Y                                      │
│                                                                            │
│ כלל: events.jsonl הוא מקור האמת                                          │
│                                                                            │
│ AIlex:                                                                     │
│ 1. מזהה סתירה                                                            │
│ 2. מדווח ליזם: "שמתי לב לחוסר התאמה..."                                  │
│ 3. שואל: "לפי ההיסטוריה, המצב הוא Y. נכון?"                              │
│ 4. מתקן את state.json                                                    │
│                                                                            │
│ 💡 עיקרון:                                                                │
│ state = תמונת מצב נוכחית (יכולה להיות לא מדויקת)                        │
│ events = היסטוריה (לא משתנה, מקור אמת)                                  │
└────────────────────────────────────────────────────────────────────────────┘
```

---

# 📎 נספחים

## נספח א': סיכום סוגי אירועים

| קטגוריה | אירועים |
|:--------|:--------|
| Session | `SESSION_START`, `SESSION_END` |
| Status | `STARTED`, `PROGRESS`, `COMPLETED`, `PAUSED`, `RESUMED` |
| Decision | `DECISION` (עם action: select/reject_temp/reject_final/skip/pivot/accept) |
| Recommendation | `REC_GIVEN`, `REC_PENDING`, `REC_FOLLOWED`, `REC_REJECTED` |
| Branch | `BRANCHES_IDENTIFIED`, `BRANCH_SELECTED`, `BRANCH_QUEUED`, `BRANCH_EXPLORED`, `BRANCH_EXHAUSTED`, `BRANCH_REJECTED_TEMP`, `BRANCH_REJECTED_FINAL` |
| Output | `OUTPUT_CREATED`, `OUTPUT_UPDATED`, `OUTPUT_FINAL` |
| Input | `INPUT_PROVIDED`, `INPUT_ASSUMED`, `INPUT_CHANGED` |
| System | `IMPACT_ASSESSED`, `INSIGHT` |

## נספח ב': מפתחות נפוצים (k)

```
_SESSION                    - אירועי שיחה
_SYSTEM                     - אירועי מערכת

IDEA                        - שלב IDEA
IDEA.PROBLEM               - בעיה
IDEA.FUMES                 - ניתוח FUMES
IDEA.SOLUTION              - פתרון

VALIDATE                    - שלב VALIDATE
VALIDATE.TARGET            - קהל יעד
VALIDATE.TARGET.B2C        - הסתעפות B2C
VALIDATE.METHOD            - שיטת תיקוף
VALIDATE.INTERVIEWS        - ראיונות
VALIDATE.INTERVIEWS.INT001 - ראיון ספציפי

BUILD.PRODUCT              - הגדרת מוצר
BUILD.PRODUCT.PRD          - PRD
BUILD.PRODUCT.COMPETITORS  - ניתוח תחרות
BUILD.TECH                 - בנייה טכנית
BUILD.TECH.STACK           - Tech Stack

LAUNCH                      - השקה
LAUNCH.PRICING             - תמחור
LAUNCH.GTM                 - Go To Market

SCALE                       - צמיחה
SCALE.LEGAL                - משפטי
SCALE.LEGAL.NDA            - הסכם סודיות
```

---

**🚀 Enter AI | Entrepreneurship in the AI Age**

*גרסה 5.0 | ינואר 2026*
