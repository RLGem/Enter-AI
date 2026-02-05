# 🎯 Enter AI - מסמך קונטקסט מעודכן

## גרסה 5.0 | ינואר 2026

---

# 📋 תוכן המערכת

## קבצי ליבה (להשאיר בפרויקט)

| קובץ | תיאור | סטטוס |
|:-----|:------|:-----:|
| **AIlex_Prompt_v4.md** | הפרומפט המלא של AIlex | ✅ חדש |
| **EAI_Architecture_v5.md** | תיעוד ארכיטקטורה מלא | ✅ חדש |
| **state_template.json** | תבנית state.json ריקה | ✅ חדש |
| **eventapp_state_example.json** | דוגמה מלאה - EventApp | ✅ חדש |
| **eventapp_events_example.jsonl** | דוגמה להיסטוריית אירועים | ✅ חדש |
| **EAI_Content_Guidelines** | כללי יצירת תוכן | ✅ להשאיר |
| **EAI_Design_Guidelines** | הנחיות עיצוב | ✅ להשאיר |
| **Quick_Win_Methodology** | מתודולוגיית Quick Win | ✅ להשאיר |
| **EAI_Full_Curriculum** | מפת 20 הקורסים | ✅ להשאיר |

## קבצים למחיקה מהפרויקט

| קובץ | סיבה |
|:-----|:-----|
| **EAI_MultiAgent_Context_v2.md** | הוחלף ע"י AIlex_Prompt_v4 |
| **01-06_Agent_Prompts** | הוטמעו ב-AIlex כ"כובעים" |
| **EAI_Complete_Architecture_v4.md** | הוחלף ע"י מערכת JSON |

---

# 🏗️ ארכיטקטורה

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   👤 יזם                                                                   │
│      │                                                                      │
│      │ מעלה קבצים                                                          │
│      ▼                                                                      │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                         🤖 AIlex                                    │  │
│   │                                                                     │  │
│   │  • קורא state.json + events.jsonl                                 │  │
│   │  • מחליף כובע לפי שלב (💡🔍📊💻🚀📈)                              │  │
│   │  • מלווה, ממליץ, מתעד                                             │  │
│   │  • מייצר קבצים מעודכנים                                           │  │
│   │                                                                     │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│      │                                                                      │
│      │ מייצר                                                               │
│      ▼                                                                      │
│   📁 Project_Name/                                                         │
│      ├── state.json          ← מצב נוכחי (מוחלף)                          │
│      ├── events.jsonl        ← היסטוריה (רק הוספה)                        │
│      └── outputs/            ← תוצרים                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

# 🔄 זרימת עבודה

## התחלת פרויקט חדש:

```
1. יזם פותח שיחה חדשה עם AIlex
2. AIlex שואל שאלות בסיסיות
3. AIlex יוצר state.json + events.jsonl ראשוניים
4. יזם שומר את הקבצים
```

## המשך פרויקט קיים:

```
1. יזם מעלה state.json + events.jsonl
2. AIlex קורא ומבין מצב
3. שיחה + עבודה
4. AIlex מייצר קבצים מעודכנים
5. יזם מוריד ושומר:
   • state.json - מחליף את הישן
   • events_new.jsonl - מוסיף לסוף הקיים
```

---

# 📋 עקרונות מנחים

## נעשה ונשמע
- קודם עושים, אח"כ מבינים
- Quick Win בכל אינטראקציה
- תוצר מוחשי בסוף

## MVP מתפתח
- הכל מתחיל קטן ומשתפר
- "טוב מספיק" עדיף על "מושלם אף פעם"
- שרשראות וגרפים משוערים, משתפרים

## סוכן מחליט, יזם בוחר
- AIlex תמיד ממליץ (אלא אם באמת אי אפשר)
- 2-3 אופציות מקסימום
- יזם בוחר או מבקש עוד

## שקיפות מלאה
- יזם תמיד יודע איפה הוא
- הבחנה בין משתמע למפורש
- תיעוד כל החלטה

---

# 🔑 מושגי מפתח

| מונח | משמעות |
|:-----|:-------|
| **state.json** | מצב נוכחי של פרויקט |
| **events.jsonl** | היסטוריית אירועים (append-only) |
| **כובע** | התמחות לפי שלב (Idea/Validate/...) |
| **משתמע (implicit)** | החלטה שנגזרה מבחירה אחרת |
| **מפורש (explicit)** | החלטה שהיזם אמר במפורש |
| **queued** | הסתעפות בתור - לא נבחרה אבל לא נדחתה |
| **depth** | עומק חקירה של הסתעפות (0-5) |
| **exhausted** | הסתעפות שנחקרה עד תום |

---

# 🚀 להפעלת AIlex

## בשיחה חדשה:

1. **העלה לפרויקט:**
   - `AIlex_Prompt_v4.md`
   - `EAI_Content_Guidelines`
   - `EAI_Design_Guidelines`
   - `Quick_Win_Methodology`

2. **התחל שיחה:**
   - פרויקט חדש: "רוצה להתחיל פרויקט יזמות"
   - פרויקט קיים: העלה state.json + events.jsonl

3. **בסוף שיחה:**
   - בקש מ-AIlex לייצר קבצים מעודכנים
   - שמור את הקבצים

---

# 📁 מבנה תיקיות מומלץ

```
📁 Enter_AI_System/
   │
   ├── 📁 Core/                    ← קבצי מערכת
   │   ├── AIlex_Prompt_v4.md
   │   ├── EAI_Architecture_v5.md
   │   ├── EAI_Context_v5.md
   │   ├── state_template.json
   │   ├── EAI_Content_Guidelines.md
   │   ├── EAI_Design_Guidelines.md
   │   └── Quick_Win_Methodology.md
   │
   ├── 📁 Examples/                ← דוגמאות
   │   ├── eventapp_state_example.json
   │   └── eventapp_events_example.jsonl
   │
   └── 📁 Projects/                ← פרויקטים של יזמים
       ├── 📁 EventApp/
       │   ├── state.json
       │   ├── events.jsonl
       │   └── 📁 outputs/
       │
       └── 📁 Another_Project/
           ├── state.json
           ├── events.jsonl
           └── 📁 outputs/
```

---

# ✅ צ'קליסט - מה בפרויקט

## להשאיר:
- [ ] AIlex_Prompt_v4.md (חדש)
- [ ] EAI_Architecture_v5.md (חדש)
- [ ] state_template.json (חדש)
- [ ] eventapp_state_example.json (חדש)
- [ ] eventapp_events_example.jsonl (חדש)
- [ ] EAI_Content_Guidelines
- [ ] EAI_Design_Guidelines
- [ ] Quick_Win_Methodology
- [ ] EAI_Full_Curriculum
- [ ] הקונטקסט הזה

## למחוק:
- [ ] EAI_MultiAgent_Context_v2.md
- [ ] 01_Idea_Agent.md - 06_Scale_Agent.md
- [ ] EAI_Complete_Architecture_v4.md

---

**🚀 Enter AI | Entrepreneurship in the AI Age**
