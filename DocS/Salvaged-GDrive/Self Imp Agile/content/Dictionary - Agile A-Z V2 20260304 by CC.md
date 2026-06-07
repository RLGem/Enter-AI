# מילון מונחים: Agile A-Z — גרסה 2

**גרסה:** 2.0
**תאריך:** 04.03.2026
**זמן קריאה משוער:** חומר עזר — לא לקריאה רציפה. השתמשו ב-Ctrl+F.
**קהל יעד:** כולם — מפתחים, Product Owner, Scrum Master, לקוחות, מנהלים
**מטרה:** מסמך ייחוס מרכזי. כשנתקלים במונח לא מוכר — מחפשים אותו כאן.

---

> **איך להשתמש במילון הזה:**
> זה **לא** מסמך לקריאה מתחילתו לסופו. זה מילון — כמו מילון רגיל, רק ל-Agile.
> - נתקלתם במונח שלא ברור? **Ctrl+F** ← חפשו אותו כאן.
> - רוצים להבין מושג שעלה בפגישה? חפשו באנגלית או בעברית.
> - שימו לב: לכל מונח יש עוגן (`#term-name`) — מסמכים אחרים מקשרים לכאן ישירות.
> - מדפיסים ושמים ליד המסך? סעיף C (קיצורים) הוא מועמד מצוין.

---

## תוכן עניינים

<div dir="rtl">

| תוכן | סעיף |
|------:|------:|
| מונחי Agile/Scrum — אלפביתי לפי המונח באנגלית (~130 מונחים) | A |
| מונחי Azure DevOps — שמות בכלי מול מונחי Agile | B |
| קיצורים נפוצים — טבלה מרוכזת | C |

</div>

---

## A. מונחי Agile/Scrum

המונחים מסודרים **לפי סדר אלפביתי באנגלית**.
לכל מונח: שם באנגלית ← תרגום/תעתיק בעברית ← הסבר ← קישורים למסמכים רלוונטיים.

---

### <a id="acceptance-criteria"></a>Acceptance Criteria — קריטריוני קבלה

רשימת תנאים מדידים שמגדירים מתי User Story נחשב "עובד כמצופה". נכתבים על ידי ה-Product Owner כחלק מה-Story. פורמט נפוץ: Given/When/Then (ראו [Gherkin](#gherkin)). לדוגמה: "המשתמש מקבל הודעת אישור תוך 3 שניות מלחיצה על שלח."

**ראו:** [4.1 — כתיבת User Stories](V1%20by%20CC/4.1%20-%20כתיבת%20User%20Stories%20-%20מדריך%20מעשי.md)
**ראו גם:** [Definition of Ready](#definition-of-ready) · [INVEST](#invest) · [User Story](#user-story)

---

### <a id="action-items"></a>Action Items — פריטי פעולה

משימות ספציפיות, עם אחראי ותאריך יעד, שנוצרות ב-[Retrospective](#retrospective). פריטי הפעולה נכנסים ל-[Sprint Backlog](#sprint-backlog) של הספרינט הבא כ-Tasks ממשיים — לא רק כוונות טובות.

**ראו:** [3.5 — Sprint Retrospective](V1%20by%20CC/3.5%20-%20נוהל%20Sprint%20Retrospective.md)
**ראו גם:** [Retrospective](#retrospective) · [Sprint Backlog](#sprint-backlog)

---

### <a id="adaptation"></a>Adaptation — התאמה

אחד משלושת עמודי [האמפיריציזם](#empiricism) ב-Scrum: כשבדיקה (Inspection) חושפת סטייה — מתאימים מיד. לדוגמה: ה-PO מעדכן סדרי עדיפויות אחרי Review, הצוות מיישם שיפורים אחרי Retro.

**ראו גם:** [Empiricism](#empiricism) · [Inspection](#inspection) · [Transparency](#transparency)

---

### <a id="agile"></a>Agile — אג׳ייל (גישה גמישה)

גישה לפיתוח תוכנה שמבוססת על עבודה במחזורים קצרים ([ספרינטים](#sprint)), שיתוף פעולה רציף עם הלקוח, והתאמה מתמדת לשינויים. Agile הוא לא שיטה אחת — הוא מטריה שמתחתיה יש פריימוורקים כמו [Scrum](#scrum), [Kanban](#kanban) ו-[Scrumban](#scrumban).

**ראו:** [1.1 — Agile בקצרה](V1%20by%20CC/1.1%20-%20Agile%20בקצרה%20-%20העקרונות%20שמניעים%20אותנו.md)
**ראו גם:** [Agile Manifesto](#agile-manifesto) · [Scrum](#scrum) · [Kanban](#kanban)

---

### <a id="agile-manifesto"></a>Agile Manifesto — המניפסט של Agile

מסמך ייסוד מ-2001 שנכתב על ידי 17 מפתחי תוכנה. מגדיר 4 ערכים ו-12 עקרונות שמנחים את הגישה האג׳ילית. ארבעת הערכים: אנשים ואינטראקציות מעל תהליכים וכלים · תוכנה עובדת מעל תיעוד מקיף · שיתוף פעולה עם הלקוח מעל משא ומתן על חוזים · תגובה לשינוי מעל מעקב אחרי תוכנית.

**ראו:** [1.1 — Agile בקצרה](V1%20by%20CC/1.1%20-%20Agile%20בקצרה%20-%20העקרונות%20שמניעים%20אותנו.md)
**ראו גם:** [Agile](#agile) · [Empiricism](#empiricism)

---

### <a id="anti-pattern"></a>Anti-Pattern — אנטי-דפוס

תגובה נפוצה לבעיה חוזרת שנראית הגיונית אבל בפועל מזיקה. באג׳ייל: דפוסי התנהגות שחוקים את היעילות תוך יצירת אשליה שעובדים "לפי הספר". דוגמאות: [Zombie Scrum](#zombie-scrum), [Scrummerfall](#scrummerfall), [Gold Plating](#gold-plating).

**ראו:** [5.3 — אנטי-דפוסים נפוצים](V1%20by%20CC/5.3%20-%20אנטי-דפוסים%20נפוצים%20-%20מה%20יכול%20להשתבש.md)
**ראו גם:** [Zombie Scrum](#zombie-scrum) · [Scrummerfall](#scrummerfall)

---

### <a id="backlog"></a>Backlog — בקלוג (רשימת עבודה מתועדפת)

רשימה מסודרת לפי עדיפות של כל פריטי העבודה שצריך לבצע. שני סוגים: [Product Backlog](#product-backlog) (כל העבודה על המוצר) ו-[Sprint Backlog](#sprint-backlog) (העבודה שנבחרה לספרינט הנוכחי).

**ראו גם:** [Product Backlog](#product-backlog) · [Sprint Backlog](#sprint-backlog) · [DEEP](#deep)

---

### <a id="backlog-refinement"></a>Backlog Refinement (Grooming) — שיפוץ/טיוב בקלוג

פעילות שוטפת שבה הצוות וה-PO מבהירים, מפרקים ומעריכים פריטים ב-Product Backlog, כדי שיהיו מוכנים ל-Sprint Planning הבא. אצלנו: פעם בשבוע (יום ג׳ שבוע 2), עד שעה וחצי.

**ראו:** [3.3 — נוהל Backlog Refinement](V1%20by%20CC/3.3%20-%20נוהל%20Backlog%20Refinement.md)
**ראו גם:** [Definition of Ready](#definition-of-ready) · [Sprint Planning](#sprint-planning) · [Story Splitting](#story-splitting)

---

### <a id="blocker"></a>Blocker — חוסם

כל דבר שמונע מחבר צוות להתקדם במשימה שלו. חוסמים צריכים לעלות ב-[Daily Standup](#daily-standup) ולהיפתר מהר ככל האפשר, בדרך כלל על ידי ה-[Scrum Master](#scrum-master). דוגמה: "אין לי הרשאות לסביבת הבדיקות."

**ראו:** [3.1 — נוהל Daily Standup](V1%20by%20CC/3.1%20-%20נוהל%20Daily%20Standup.md)
**ראו גם:** [Impediment](#impediment) · [Escalation Path](#escalation-path) · [Daily Standup](#daily-standup)

---

### <a id="boy-scout-rule"></a>Boy Scout Rule — חוק הצופים

העיקרון "השאירו את הקוד טוב יותר ממה שמצאתם אותו." אסטרטגיה להפחתה הדרגתית של [חוב טכני](#technical-debt) — בכל פעם שנוגעים בקוד, משפרים משהו קטן.

**ראו גם:** [Technical Debt](#technical-debt)

---

### <a id="bug"></a>Bug — באג (תקלה)

סוג פריט עבודה ב-Azure DevOps שמייצג פגם או התנהגות בלתי צפויה בתוכנה. ניתן לקשר לכל רמה בהיררכיה (Epic, Feature, Story).

**ראו:** [4.5 — ניהול Sprint Board](V1%20by%20CC/4.5%20-%20ניהול%20Sprint%20Board%20-%20ניהול%20חזותי.md)
**ראו גם:** [Work Item](#work-item) · [Sprint Board](#sprint-board)

---

### <a id="burndown-chart"></a>Burndown Chart — תרשים שחיקה

גרף שמציג את כמות העבודה הנותרת בספרינט כפונקציה של זמן. הציר האנכי — עבודה נותרת (שעות או Story Points); הציר האופקי — ימים בספרינט. הקו אמור לרדת לכיוון אפס. דפוסים לזיהוי: [Late Start](#late-start) (שטוח ואז צלילה), [Scope Creep](#scope-creep) (עלייה לפני ירידה), [Flat Line](#flat-line) (אין תנועה).

**ראו:** [4.6 — מדדים ובריאות](V1%20by%20CC/4.6%20-%20מדדים%20ובריאות%20-%20מה%20למדוד%20ולמה.md)
**ראו גם:** [Burnup Chart](#burnup-chart) · [Velocity](#velocity)

---

### <a id="burnup-chart"></a>Burnup Chart — תרשים צבירה

גרף שמציג את כמות העבודה **שהושלמה** כפונקציה של זמן (בניגוד ל-Burndown שמציג מה נותר). מאפשר לראות גם את היקף העבודה הכולל, כך שקל לזהות אם נוספו פריטים לספרינט ([Scope Creep](#scope-creep)).

**ראו:** [4.6 — מדדים ובריאות](V1%20by%20CC/4.6%20-%20מדדים%20ובריאות%20-%20מה%20למדוד%20ולמה.md)
**ראו גם:** [Burndown Chart](#burndown-chart)

---

### <a id="capacity"></a>Capacity — קיבולת

כמות שעות העבודה הזמינות לצוות בספרינט נתון, בהתחשב בימי חופש, חגים, ישיבות ומשימות שאינן ספרינט. בספרינט של 3 שבועות: 15 ימי עבודה × מספר חברי הצוות, פחות היעדרויות, כפול [Focus Factor](#focus-factor) של 70-80%.

**ראו:** [4.3 — הערכת מאמץ](V1%20by%20CC/4.3%20-%20הערכת%20מאמץ%20-%20Story%20Points%20ו-Planning%20Poker.md)
**ראו גם:** [Focus Factor](#focus-factor) · [Sprint Planning](#sprint-planning) · [Velocity](#velocity)

---

### <a id="carryover"></a>Carryover — גלישה (העברת פריטים)

סיפורים שלא הושלמו בספרינט ומועברים לספרינט הבא. יעד בריא: פחות מ-20% מהסיפורים עוברים. גלישה גבוהה מעידה על בעיית הערכה או [Scope Creep](#scope-creep).

**ראו גם:** [Velocity](#velocity) · [Sprint Goal](#sprint-goal)

---

### <a id="ceremony"></a>Ceremony (Scrum Event) — טקס (אירוע)

שם כולל לכל הפגישות המובנות ב-Scrum. בספרינט שלנו יש 5 טקסים: [Sprint Planning](#sprint-planning), [Daily Standup](#daily-standup), [Backlog Refinement](#backlog-refinement), [Sprint Review](#sprint-review), [Sprint Retrospective](#retrospective). לכל טקס יש מטרה מוגדרת, משתתפים, ו-[Timebox](#timebox).

**ראו:** [1.3 — מבנה הספרינט](V1%20by%20CC/1.3%20-%20מבנה%20הספרינט%20בן%203%20השבועות.md)

---

### <a id="cfd"></a>Cumulative Flow Diagram (CFD) — תרשים זרימה מצטבר

גרף שמציג את מספר פריטי העבודה בכל סטטוס (New, Active, Resolved, Closed) לאורך זמן כפסים מוערמים. מאפשר לזהות צווארי בקבוק: אם הפס של "Active" מתרחב — יש יותר עבודה שנפתחת ממה שנסגרת.

**ראו:** [4.6 — מדדים ובריאות](V1%20by%20CC/4.6%20-%20מדדים%20ובריאות%20-%20מה%20למדוד%20ולמה.md)
**ראו גם:** [WIP](#wip) · [Cycle Time](#cycle-time)

---

### <a id="ci-cd"></a>CI/CD — אינטגרציה רציפה / פריסה רציפה

**Continuous Integration (CI):** מפתחים ממזגים קוד לעיתים תכופות עם בנייה ובדיקות אוטומטיות. **Continuous Delivery (CD):** כל בנייה מוצלחת ניתנת לפריסה בלחיצת כפתור. **Continuous Deployment:** כל בנייה נפרסת אוטומטית. מיושם דרך [Pipelines](#pipeline) ב-Azure DevOps.

**ראו גם:** [Definition of Done](#definition-of-done) · [Technical Debt](#technical-debt)

---

### <a id="cross-functional-team"></a>Cross-Functional Team — צוות חוצה-תחומים

צוות שמחזיק יחד את כל הכישורים הנדרשים לספק [Increment](#increment) שלם — בלי תלויות חיצוניות. לא כל אדם צריך לדעת הכל, אלא הצוות כמכלול.

**ראו:** [2.1 — מדריך למפתח](V1%20by%20CC/2.1%20-%20מדריך%20למפתח%20-%20Agile%20מנקודת%20המבט%20שלך.md)
**ראו גם:** [Development Team](#development-team) · [T-Shaped Skills](#t-shaped-skills) · [Self-Organization](#self-organization)

---

### <a id="cycle-time"></a>Cycle Time — זמן מחזור

הזמן שעובר מהרגע שמתחילים לעבוד על פריט (Active) ועד שהוא מושלם (Closed). Cycle Time קצר = הצוות מסיים דברים מהר. ארוך? בדקו חסימות, החלפות הקשר, או פריטים גדולים מדי.

**ראו:** [4.6 — מדדים ובריאות](V1%20by%20CC/4.6%20-%20מדדים%20ובריאות%20-%20מה%20למדוד%20ולמה.md)
**ראו גם:** [Lead Time](#lead-time) · [WIP](#wip)

---

### <a id="daily-standup"></a>Daily Standup (Daily Scrum) — דיילי (פגישה יומית עומדים)

פגישה יומית של עד 15 דקות שבה כל חבר צוות עונה על 3 שאלות: מה עשיתי אתמול? מה אני מתכנן היום? מה חוסם אותי? המטרה היא סנכרון — לא דיווח למנהל. נושאים שדורשים דיון מועברים ל-[Parking Lot](#parking-lot).

**ראו:** [3.1 — נוהל Daily Standup](V1%20by%20CC/3.1%20-%20נוהל%20Daily%20Standup.md)
**ראו גם:** [Parking Lot](#parking-lot) · [Blocker](#blocker) · [Ceremony](#ceremony)

---

### <a id="deep"></a>DEEP — קריטריונים לבקלוג בריא

ארבע תכונות של [Product Backlog](#product-backlog) בריא: **D**etailed appropriately (מפורט כראוי), **E**stimated (מוערך), **E**mergent (מתפתח), **P**rioritized (מתועדף).

**ראו גם:** [Product Backlog](#product-backlog) · [Backlog Refinement](#backlog-refinement)

---

### <a id="definition-of-done"></a>Definition of Done (DoD) — הגדרת סיום

רשימת קריטריונים שכל פריט עבודה חייב לעמוד בהם כדי להיחשב "סיים". מוסכמת מראש. קיימת ב-3 רמות: **Task DoD** (קוד, בדיקות, Code Review) ← **Story DoD** (AC מאומתים, נפרס ל-Staging, PO אישר) ← **Sprint DoD** (Review נערך, Retro נערך, אין פריטים תקועים).

**ראו:** [4.4 — Definition of Done](V1%20by%20CC/4.4%20-%20Definition%20of%20Done%20-%20רשימת%20תיוג.md)
**ראו גם:** [Definition of Ready](#definition-of-ready) · [Acceptance Criteria](#acceptance-criteria) · [Increment](#increment)

---

### <a id="definition-of-ready"></a>Definition of Ready (DoR) — הגדרת מוכנות

רשימת קריטריונים ש-User Story חייב לעמוד בהם **לפני** שהצוות יכול לקחת אותו לספרינט. לדוגמה: יש [Acceptance Criteria](#acceptance-criteria), הוערך ב-[Story Points](#story-points), אין שאלות פתוחות, אושר על ידי PO. מטרתה למנוע כניסה של עבודה לא בשלה.

**ראו:** [3.3 — נוהל Backlog Refinement](V1%20by%20CC/3.3%20-%20נוהל%20Backlog%20Refinement.md)
**ראו גם:** [Definition of Done](#definition-of-done) · [Backlog Refinement](#backlog-refinement)

---

### <a id="demo"></a>Demo — הדגמה

הצגה חיה של תוכנה עובדת בפני בעלי עניין, כחלק מ-[Sprint Review](#sprint-review). **לא** מצגת PowerPoint — אלא תוכנה אמיתית שרצה. הדגמה חיה בונה אמון ומייצרת משוב איכותי.

**ראו:** [3.4 — נוהל Sprint Review](V1%20by%20CC/3.4%20-%20נוהל%20Sprint%20Review%20-%20Demo.md)
**ראו גם:** [Sprint Review](#sprint-review) · [Increment](#increment)

---

### <a id="development-team"></a>Development Team — צוות הפיתוח

הקבוצה המקצועית שבונה את ה-[Increment](#increment) בכל ספרינט. [מארגנת את עצמה](#self-organization), [חוצת-תחומים](#cross-functional-team), גודל מומלץ 3-9 מפתחים. הצוות מחליט **איך** לבנות — לא המנהל ולא ה-PO.

**ראו:** [2.1 — מדריך למפתח](V1%20by%20CC/2.1%20-%20מדריך%20למפתח%20-%20Agile%20מנקודת%20המבט%20שלך.md)
**ראו גם:** [Self-Organization](#self-organization) · [Cross-Functional Team](#cross-functional-team) · [T-Shaped Skills](#t-shaped-skills)

---

### <a id="dot-voting"></a>Dot Voting — הצבעת נקודות

טכניקת הצבעה ב-[Retrospective](#retrospective): כל אדם מקבל 3 נקודות ומצביע על הנושאים שהכי חשוב לו לטפל בהם. מאפשרת לצוות לבחור את נושא השיפור הבא בצורה דמוקרטית.

**ראו גם:** [Retrospective](#retrospective)

---

### <a id="empiricism"></a>Empiricism — אמפיריציזם (שליטה אמפירית)

התיאוריה שמבוססת עליה Scrum: ידע נובע מניסיון, והחלטות מתקבלות על סמך תצפיות. שלושה עמודים: [Transparency](#transparency) (שקיפות), [Inspection](#inspection) (בדיקה), [Adaptation](#adaptation) (התאמה).

**ראו:** [1.1 — Agile בקצרה](V1%20by%20CC/1.1%20-%20Agile%20בקצרה%20-%20העקרונות%20שמניעים%20אותנו.md)
**ראו גם:** [Transparency](#transparency) · [Inspection](#inspection) · [Adaptation](#adaptation)

---

### <a id="epic"></a>Epic — אפיק (יוזמה גדולה)

פריט עבודה ברמה הגבוהה ביותר בהיררכיה. מייצג יוזמה גדולה שלוקח מספר ספרינטים להשלים. Epic מתפרק ל-[Features](#feature), שמתפרקים ל-[User Stories](#user-story). דוגמה: "מערכת ניהול לקוחות" היא Epic.

**ראו גם:** [Feature](#feature) · [User Story](#user-story) · [Theme](#theme) · [Product Backlog](#product-backlog)

---

### <a id="escalation-path"></a>Escalation Path — מסלול הסלמה

תהליך פורמלי להעלאת [חסימות](#blocker) שלא נפתרו: מפתח מעלה → SM מנסה לפתור תוך 24-48 שעות → SM מסלים להנהלה/PO אם עדיין לא נפתר.

**ראו גם:** [Blocker](#blocker) · [Impediment](#impediment) · [Scrum Master](#scrum-master)

---

### <a id="estimation"></a>Estimation — הערכת מאמץ

תהליך שבו הצוות מעריך את גודל/מורכבות של פריט עבודה, בדרך כלל באמצעות [Story Points](#story-points) וטכניקת [Planning Poker](#planning-poker). חשוב: הערכה היא **לא** התחייבות — היא כלי לתכנון ולשיחה.

**ראו:** [4.3 — הערכת מאמץ](V1%20by%20CC/4.3%20-%20הערכת%20מאמץ%20-%20Story%20Points%20ו-Planning%20Poker.md)
**ראו גם:** [Story Points](#story-points) · [Planning Poker](#planning-poker) · [Fibonacci Sequence](#fibonacci-sequence) · [Reference Story](#reference-story)

---

### <a id="feature"></a>Feature — פיצ׳ר (תכונה)

פריט עבודה ברמת ביניים — מתחת ל-[Epic](#epic) ומעל [User Stories](#user-story). מייצג יכולת משמעותית שניתנת לאספקה בספרינט אחד או שניים. דוגמה: "חיפוש לקוח לפי שם" הוא Feature בתוך ה-Epic "מערכת ניהול לקוחות".

**ראו גם:** [Epic](#epic) · [User Story](#user-story)

---

### <a id="fibonacci-sequence"></a>Fibonacci Sequence — סדרת פיבונאצ׳י

הסדרה המתמטית 1, 2, 3, 5, 8, 13, 20, 40, 100 שמשמשת כסולם להערכת [Story Points](#story-points). הפערים הגדלים בין המספרים משקפים עיקרון חשוב: ככל שפריט גדול יותר, ההערכה פחות מדויקת.

**ראו:** [4.3 — הערכת מאמץ](V1%20by%20CC/4.3%20-%20הערכת%20מאמץ%20-%20Story%20Points%20ו-Planning%20Poker.md)
**ראו גם:** [Story Points](#story-points) · [Planning Poker](#planning-poker)

---

### <a id="flat-line"></a>Flat Line — קו שטוח (דפוס Burndown)

דפוס ב-[Burndown Chart](#burndown-chart) שמראה אפס התקדמות. סיבות נפוצות: צוות חסום, הערכות חסר קיצוניות, או שפשוט לא מעדכנים את הלוח.

**ראו גם:** [Burndown Chart](#burndown-chart) · [Blocker](#blocker)

---

### <a id="focus-factor"></a>Focus Factor — מקדם מיקוד

אחוז הזמן שמוקדש לעבודת ספרינט פרודוקטיבית אחרי ניכוי ישיבות, מיילים ומשימות אדמיניסטרטיביות. נהוג: 70-80%. משמש בחישוב [Capacity](#capacity).

**ראו גם:** [Capacity](#capacity) · [Sprint Planning](#sprint-planning)

---

### <a id="gherkin"></a>Gherkin (Given/When/Then) — פורמט מובנה ל-AC

פורמט מובנה לכתיבת [Acceptance Criteria](#acceptance-criteria): "**Given** [מצב התחלתי], **When** [פעולה מתבצעת], **Then** [תוצאה צפויה]." מייצר AC חד-משמעיים שקל לבדוק.

**ראו:** [4.1 — כתיבת User Stories](V1%20by%20CC/4.1%20-%20כתיבת%20User%20Stories%20-%20מדריך%20מעשי.md)
**ראו גם:** [Acceptance Criteria](#acceptance-criteria) · [User Story](#user-story)

---

### <a id="gold-plating"></a>Gold Plating — ציפוי זהב

[אנטי-דפוס](#anti-pattern): מפתחים מוסיפים פיצ׳רים או ליטוש מעבר למה שה-[Acceptance Criteria](#acceptance-criteria) דורשים. בזבוז מאמץ על עבודה שלא התבקשה. הפתרון: לעבוד רק לפי ה-AC.

**ראו:** [5.3 — אנטי-דפוסים](V1%20by%20CC/5.3%20-%20אנטי-דפוסים%20נפוצים%20-%20מה%20יכול%20להשתבש.md)
**ראו גם:** [Anti-Pattern](#anti-pattern) · [Acceptance Criteria](#acceptance-criteria) · [YAGNI](#yagni)

---

### <a id="goodharts-law"></a>Goodhart's Law — חוק גודהרט

"כשמדד הופך ליעד, הוא מפסיק להיות מדד טוב." רלוונטי מאוד ל-Agile: אם [Velocity](#velocity) הופכת ליעד — הצוות ינפח הערכות. מדדים הם כלי לשיפור, לא למדידת ביצועים.

**ראו:** [4.6 — מדדים ובריאות](V1%20by%20CC/4.6%20-%20מדדים%20ובריאות%20-%20מה%20למדוד%20ולמה.md)
**ראו גם:** [Velocity](#velocity) · [Anti-Pattern](#anti-pattern)

---

### <a id="impediment"></a>Impediment — מכשול (חסם)

כל דבר שמאט או מונע מהצוות לעבוד ביעילות. דומה ל-[Blocker](#blocker), אך לעיתים רחב יותר — יכול להיות בעיה ארגונית, תהליכית, או טכנית. זיהוי והסרת מכשולים היא אחריות מרכזית של ה-[Scrum Master](#scrum-master).

**ראו גם:** [Blocker](#blocker) · [Scrum Master](#scrum-master) · [Escalation Path](#escalation-path)

---

### <a id="increment"></a>Increment — תוספת (Increment)

התוצר המשולב של כל פריטי ה-Backlog שהושלמו בספרינט הנוכחי + כל מה שנבנה בספרינטים קודמים. כל Increment חייב להיות [Potentially Shippable](#potentially-shippable) — כלומר עומד ב-[Definition of Done](#definition-of-done) ועובד כמכלול.

**ראו גם:** [Definition of Done](#definition-of-done) · [Potentially Shippable](#potentially-shippable) · [Sprint Review](#sprint-review)

---

### <a id="information-radiator"></a>Information Radiator — מקרן מידע

כל תצוגה גלויה של מידע חשוב על הפרויקט: [Sprint Board](#sprint-board), [Burndown Chart](#burndown-chart), [Sprint Goal](#sprint-goal), הסכמות צוות. המטרה: לעשות את המידע הקריטי בלתי-ניתן-להתעלמות-ממנו.

**ראו גם:** [Sprint Board](#sprint-board) · [Transparency](#transparency)

---

### <a id="inspection"></a>Inspection — בדיקה

אחד משלושת עמודי ה-[Empiricism](#empiricism): בדיקה תכופה של ההתקדמות והתוצרים כדי לזהות סטיות. מתרחשת ב-[Sprint Review](#sprint-review) (בדיקת המוצר) וב-[Retrospective](#retrospective) (בדיקת התהליך).

**ראו גם:** [Empiricism](#empiricism) · [Adaptation](#adaptation) · [Transparency](#transparency)

---

### <a id="invest"></a>INVEST — קריטריונים ל-User Story טוב

6 תכונות: **I**ndependent (עצמאי), **N**egotiable (גמיש), **V**aluable (בעל ערך), **E**stimable (ניתן להערכה), **S**mall (קטן), **T**estable (ניתן לבדיקה).

**ראו:** [4.1 — כתיבת User Stories](V1%20by%20CC/4.1%20-%20כתיבת%20User%20Stories%20-%20מדריך%20מעשי.md)
**ראו גם:** [User Story](#user-story) · [Acceptance Criteria](#acceptance-criteria)

---

### <a id="iteration"></a>Iteration — איטרציה (מחזור פיתוח)

מונח כללי למחזור פיתוח קבוע ומוגבל בזמן. ב-Scrum, האיטרציה נקראת [Sprint](#sprint). ב-Azure DevOps, המונח Iteration משמש לציון ה-Sprint (ראו [Iteration Path](#iteration-path)).

**ראו גם:** [Sprint](#sprint) · [Iteration Path](#iteration-path)

---

### <a id="kanban"></a>Kanban — קאנבאן

שיטת עבודה שמבוססת על ניהול חזותי של זרימת העבודה באמצעות לוח (Board) עם עמודות. בניגוד ל-Scrum, Kanban לא עובד בספרינטים קבועים אלא בזרימה רציפה עם [WIP Limits](#wip-limit). אנחנו משלבים רעיונות מ-Kanban (כמו WIP Limits ולוח חזותי) בתוך ה-Scrum שלנו.

**ראו:** [1.1 — Agile בקצרה](V1%20by%20CC/1.1%20-%20Agile%20בקצרה%20-%20העקרונות%20שמניעים%20אותנו.md)
**ראו גם:** [Scrum](#scrum) · [Scrumban](#scrumban) · [WIP Limit](#wip-limit) · [Sprint Board](#sprint-board)

---

### <a id="late-start"></a>Late Start — התחלה מאוחרת (דפוס Burndown)

דפוס ב-[Burndown Chart](#burndown-chart): מעט התקדמות בשבוע הראשון ואז ריצה בסוף. סיבות: סיפורים לא מוכנים, עיכוב בתחילת הספרינט.

**ראו גם:** [Burndown Chart](#burndown-chart)

---

### <a id="lead-time"></a>Lead Time — זמן אספקה

הזמן הכולל מהרגע שפריט נכנס ל-Backlog ועד שהוא מסופק ללקוח. שונה מ-[Cycle Time](#cycle-time) שמודד רק את זמן העבודה הפעילה. Lead Time כולל גם זמן המתנה ב-Backlog. זה המדד של הלקוח: "כמה זמן מבקשה ועד שאני רואה את זה?"

**ראו:** [4.6 — מדדים ובריאות](V1%20by%20CC/4.6%20-%20מדדים%20ובריאות%20-%20מה%20למדוד%20ולמה.md)
**ראו גם:** [Cycle Time](#cycle-time) · [Throughput](#throughput)

---

### <a id="lean"></a>Lean — לין (ייצור רזה)

שבעה עקרונות ממערכת הייצור של טויוטה שמיושמים בפיתוח תוכנה: חיסול בזבוז, הגברת למידה, החלטה מאוחרת, אספקה מהירה, העצמת הצוות, בניית שלמות, אופטימיזציה של המכלול.

**ראו:** [1.1 — Agile בקצרה](V1%20by%20CC/1.1%20-%20Agile%20בקצרה%20-%20העקרונות%20שמניעים%20אותנו.md)
**ראו גם:** [Agile](#agile) · [Kanban](#kanban)

---

### <a id="moscow"></a>MoSCoW — שיטת תעדוף מוסקבה

טכניקת תעדוף: **Must have** (חובה), **Should have** (חשוב), **Could have** (נחמד), **Won't have this time** (לא הפעם). מסייעת ל-PO לתקשר עדיפויות בצורה ברורה.

**ראו גם:** [Product Owner](#product-owner) · [Product Backlog](#product-backlog) · [WSJF](#wsjf)

---

### <a id="mvp"></a>MVP (Minimum Viable Product) — מוצר מינימלי בר-קיימא

הגרסה הקטנה ביותר של מוצר שמספקת ערך ללקוח ומאפשרת ללמוד מפידבק אמיתי. MVP הוא לא מוצר חצי-גמור — הוא מוצר שלם שעושה מעט דברים, אבל עושה אותם טוב.

**ראו:** [4.2 — פירוק MVP](V1%20by%20CC/4.2%20-%20פירוק%20MVP%20-%20מחזון%20למשימות.md)
**ראו גם:** [Story Mapping](#story-mapping) · [User Story](#user-story)

---

### <a id="pair-programming"></a>Pair Programming — תכנות זוגי

שני מפתחים עובדים יחד על אותה תחנת עבודה. מגביר למידה, מפחית צווארי בקבוק, ובונה [T-Shaped Skills](#t-shaped-skills).

**ראו גם:** [T-Shaped Skills](#t-shaped-skills) · [Swarming](#swarming)

---

### <a id="parking-lot"></a>Parking Lot — חנייה (נושאים לאחר כך)

טכניקה לניהול דיונים ב-[Daily Standup](#daily-standup): נושאים שדורשים דיון מעמיק מועברים לשיחה נפרדת מיד אחרי הדיילי, רק עם האנשים הרלוונטיים. שומרת על ה-[Timebox](#timebox) של 15 דקות.

**ראו:** [3.1 — נוהל Daily Standup](V1%20by%20CC/3.1%20-%20נוהל%20Daily%20Standup.md)
**ראו גם:** [Daily Standup](#daily-standup) · [Timebox](#timebox)

---

### <a id="planning-poker"></a>Planning Poker — פוקר תכנון

טכניקת הערכת מאמץ: כל חבר צוות בוחר קלף עם מספר מסדרת [פיבונאצ׳י](#fibonacci-sequence). כולם חושפים בו-זמנית כדי למנוע [Anchoring Bias](#anchoring-bias). פערים גדולים בין הערכות מובילים לדיון ולהבנה טובה יותר.

**ראו:** [4.3 — הערכת מאמץ](V1%20by%20CC/4.3%20-%20הערכת%20מאמץ%20-%20Story%20Points%20ו-Planning%20Poker.md)
**ראו גם:** [Story Points](#story-points) · [Fibonacci Sequence](#fibonacci-sequence) · [Reference Story](#reference-story)

---

### <a id="anchoring-bias"></a>Anchoring Bias — הטיית עוגן

הטייה קוגניטיבית בהערכה: כשאדם אחד אומר מספר ראשון, אחרים נמשכים לקרבתו. [Planning Poker](#planning-poker) מונע זאת על ידי חשיפה בו-זמנית.

**ראו גם:** [Planning Poker](#planning-poker) · [Estimation](#estimation)

---

### <a id="potentially-shippable"></a>Potentially Shippable — ניתן-לשחרור

תכונה של כל [Increment](#increment): הוא **יכול** לצאת לייצור, גם אם מחליטים לא לשחרר אותו עדיין. עמידה ב-[DoD](#definition-of-done) מבטיחה את זה.

**ראו גם:** [Increment](#increment) · [Definition of Done](#definition-of-done) · [Release](#release)

---

### <a id="prime-directive"></a>Prime Directive — הנחיה עליונה (רטרו)

משפט הפתיחה של [Retrospective](#retrospective): "ללא קשר למה שנגלה, אנחנו מבינים ומאמינים באמת שכולם עשו את המיטב שיכלו, בהתחשב במה שידעו באותו זמן." יוצר [בטחון פסיכולוגי](#psychological-safety).

**ראו גם:** [Retrospective](#retrospective) · [Psychological Safety](#psychological-safety)

---

### <a id="product-backlog"></a>Product Backlog — בקלוג מוצר

הרשימה המלאה של כל מה שצריך לעשות על המוצר, מסודרת לפי עדיפות. אחריות ה-[Product Owner](#product-owner). כוללת [Epics](#epic), [Features](#feature), [User Stories](#user-story), [Bugs](#bug), ופריטים טכניים. רשימה חיה ומשתנה כל הזמן.

**ראו גם:** [Product Owner](#product-owner) · [Sprint Backlog](#sprint-backlog) · [DEEP](#deep) · [Backlog Refinement](#backlog-refinement)

---

### <a id="product-goal"></a>Product Goal — מטרת המוצר

המטרה ארוכת הטווח של צוות ה-Scrum — תיאור של מצב עתידי רצוי של המוצר. יש רק מטרת מוצר אחת בכל זמן נתון. [Sprint Goals](#sprint-goal) הם צעדים לקראתה.

**ראו גם:** [Sprint Goal](#sprint-goal) · [Product Backlog](#product-backlog)

---

### <a id="product-owner"></a>Product Owner (PO) — בעל המוצר

אדם **אחד** (לא ועדה) שאחראי על **מה** לבנות ובאיזה סדר. מנהל את ה-[Product Backlog](#product-backlog), כותב [User Stories](#user-story), מתעדף דרישות, ומייצג את קול הלקוח/העסק.

**ראו:** [2.2 — מדריך ל-Product Owner](V1%20by%20CC/2.2%20-%20מדריך%20ל-Product%20Owner%20-%20אתה%20הקול%20של%20המוצר.md)
**ראו גם:** [Product Backlog](#product-backlog) · [User Story](#user-story) · [Sprint Planning](#sprint-planning)

---

### <a id="psychological-safety"></a>Psychological Safety — בטחון פסיכולוגי

מצב שבו חברי הצוות מרגישים בטוחים לדבר בכנות בלי חשש מעונש. סימנים להיעדרו: שתיקה ב-[Retro](#retrospective), רק משוב חיובי, בעיות חוזרות שלא נפתרות.

**ראו גם:** [Retrospective](#retrospective) · [Prime Directive](#prime-directive)

---

### <a id="pull-system"></a>Pull System — מערכת משיכה

גישת עבודה שבה מפתחים **מושכים** את הפריט הבא בעדיפות הגבוהה ביותר כשיש להם קיבולת פנויה — במקום שמישהו **דוחף** עבודה אליהם. עיקרון מפתח של [Kanban](#kanban).

**ראו גם:** [Kanban](#kanban) · [WIP Limit](#wip-limit) · [Sprint Board](#sprint-board)

---

### <a id="raci"></a>RACI Matrix — מטריצת אחריות

טבלה שמגדירה מי עושה מה בכל תהליך: **R**esponsible (מבצע), **A**ccountable (אחראי סופי), **C**onsulted (מתייעצים איתו), **I**nformed (מעודכן).

**ראו:** [5.2 — מטריצת אחריות](V1%20by%20CC/5.2%20-%20מטריצת%20אחריות%20-%20מי%20עושה%20מה.md)

---

### <a id="reference-story"></a>Reference Story — סיפור ייחוס

3-5 סיפורים שהושלמו בעבר המייצגים גדלים שונים (1, 3, 5, 8, 13 נקודות) ומשמשים כעוגנים לכיול [הערכות](#estimation) עתידיות. "הסיפור הזה דומה בגודלו ל-X שעשינו בספרינט שעבר."

**ראו:** [4.3 — הערכת מאמץ](V1%20by%20CC/4.3%20-%20הערכת%20מאמץ%20-%20Story%20Points%20ו-Planning%20Poker.md)
**ראו גם:** [Story Points](#story-points) · [Planning Poker](#planning-poker)

---

### <a id="release"></a>Release — שחרור גרסה

אספקת [Increment](#increment) של תוכנה עובדת ללקוח או לסביבת ייצור. ב-Agile, Release יכול לקרות בסוף כל ספרינט או אחרי כמה ספרינטים — בהתאם להחלטה עסקית. Release הוא לא בהכרח צמוד לספרינט.

**ראו גם:** [Increment](#increment) · [Potentially Shippable](#potentially-shippable) · [CI/CD](#ci-cd)

---

### <a id="retrospective"></a>Retrospective (Retro) — רטרוספקטיבה (מבט לאחור)

טקס בסוף כל ספרינט (עד 1.5 שעות) שבו הצוות בוחן: מה עבד טוב? מה לא עבד? מה נשפר? פורמטים: [Start/Stop/Continue](#start-stop-continue), [Sailboat](#sailboat), [4L](#4l), [Mad/Sad/Glad](#mad-sad-glad). **הטקס החשוב ביותר ב-Scrum** — בלעדיו אין למידה.

**ראו:** [3.5 — נוהל Sprint Retrospective](V1%20by%20CC/3.5%20-%20נוהל%20Sprint%20Retrospective.md)
**ראו גם:** [Action Items](#action-items) · [Prime Directive](#prime-directive) · [Psychological Safety](#psychological-safety)

---

### <a id="sailboat"></a>Sailboat — מפרשית (פורמט רטרו)

פורמט [Retrospective](#retrospective) עם מטאפורות: **רוח** (מה דחף אותנו), **עוגן** (מה עיכב אותנו), **אי** (היעד/החזון), **סלעים** (סיכונים קדימה).

**ראו גם:** [Retrospective](#retrospective) · [4L](#4l) · [Mad/Sad/Glad](#mad-sad-glad)

---

### <a id="scope-creep"></a>Scope Creep — זחילת היקף

עבודה חדשה שנוספת אחרי [Sprint Planning](#sprint-planning) בלי להוריד משהו בגודל שווה. נראה ב-[Burndown](#burndown-chart) כעלייה לפני ירידה. [אנטי-דפוס](#anti-pattern) נפוץ.

**ראו:** [5.3 — אנטי-דפוסים](V1%20by%20CC/5.3%20-%20אנטי-דפוסים%20נפוצים%20-%20מה%20יכול%20להשתבש.md)
**ראו גם:** [Sprint Goal](#sprint-goal) · [Sprint Planning](#sprint-planning)

---

### <a id="scrum"></a>Scrum — סקראם

הפריימוורק (מסגרת עבודה) הנפוץ ביותר ליישום Agile. מגדיר תפקידים ([PO](#product-owner), [SM](#scrum-master), [Dev Team](#development-team)), טקסים ([Planning](#sprint-planning), [Daily](#daily-standup), [Review](#sprint-review), [Retro](#retrospective)), ותוצרים ([Product Backlog](#product-backlog), [Sprint Backlog](#sprint-backlog), [Increment](#increment)). **זה הפריימוורק שאנחנו משתמשים בו.**

**ראו:** [1.1 — Agile בקצרה](V1%20by%20CC/1.1%20-%20Agile%20בקצרה%20-%20העקרונות%20שמניעים%20אותנו.md)
**ראו גם:** [Agile](#agile) · [Kanban](#kanban) · [Scrumban](#scrumban)

---

### <a id="scrum-master"></a>Scrum Master (SM) — סקראם מאסטר

[Servant-leader](#servant-leader) שאחראי על **איך** עובדים. מנחה את הטקסים, מסיר [חסמים](#impediment), מגן על הצוות מהפרעות חיצוניות, ומוודא שהצוות עובד לפי עקרונות Scrum. **לא** מנהל פרויקט, **לא** מנהל של הצוות, **לא** מזכיר.

**ראו:** [2.3 — מדריך ל-Scrum Master](V1%20by%20CC/2.3%20-%20מדריך%20ל-Scrum%20Master%20-%20אתה%20המאפשר.md)
**ראו גם:** [Servant-Leader](#servant-leader) · [Impediment](#impediment) · [Ceremony](#ceremony)

---

### <a id="scrumban"></a>Scrumban — סקראמבאן

גישה היברידית שמשלבת את קצב הספרינט של [Scrum](#scrum) עם [WIP Limits](#wip-limit) ואופטימיזציית זרימה של [Kanban](#kanban). מתאימה לצוותים שמשלבים עבודת פרויקט עם תמיכה/באגים.

**ראו גם:** [Scrum](#scrum) · [Kanban](#kanban) · [WIP Limit](#wip-limit)

---

### <a id="scrummerfall"></a>Scrummerfall — סקראמרפול

[אנטי-דפוס](#anti-pattern): הארגון טוען שהוא אג׳ילי אבל בפועל עובד ב-Waterfall עם מינוח Scrum (שבוע 1: אפיון, שבוע 2: פיתוח, שבוע 3: בדיקות).

**ראו:** [5.3 — אנטי-דפוסים](V1%20by%20CC/5.3%20-%20אנטי-דפוסים%20נפוצים%20-%20מה%20יכול%20להשתבש.md)
**ראו גם:** [Anti-Pattern](#anti-pattern) · [Waterfall](#waterfall)

---

### <a id="self-organization"></a>Self-Organization — ארגון עצמי

העיקרון שצוות הפיתוח מחליט בעצמו **איך** להפוך פריטי Backlog ל-[Increment](#increment) עובד: מי עובד על מה, איך לארגן מחדש את העבודה, והחלטות טכניות.

**ראו גם:** [Development Team](#development-team) · [Cross-Functional Team](#cross-functional-team)

---

### <a id="servant-leader"></a>Servant-Leader — מנהיג-משרת

מודל המנהיגות של ה-[Scrum Master](#scrum-master): מוביל דרך שירות הצוות — הנחייה, אימון, הסרת מכשולים, הגנה — ולא דרך פיקוד ושליטה.

**ראו גם:** [Scrum Master](#scrum-master)

---

### <a id="spike"></a>Spike — ספייק (חקירה טכנית)

פריט עבודה שמטרתו לחקור שאלה טכנית או להפחית אי-ודאות — לא לבנות פיצ׳ר. מוגבל בזמן ([Timebox](#timebox)). דוגמה: "לבדוק האם ספריית X תומכת בדרישה Y — עד 8 שעות." התוצר: ידע/המלצה, לא קוד ייצור.

**ראו גם:** [Timebox](#timebox) · [Task](#task)

---

### <a id="sprint"></a>Sprint — ספרינט

מחזור עבודה קבוע ומוגבל בזמן שבו הצוות בונה [Increment](#increment) של תוכנה עובדת. **אצלנו: 3 שבועות.** כל ספרינט מתחיל ב-[Planning](#sprint-planning) ומסתיים ב-[Review](#sprint-review) ו-[Retro](#retrospective). במהלך הספרינט, היקף העבודה לא משתנה (אלא אם [Sprint Goal](#sprint-goal) מאבד רלוונטיות).

**ראו:** [1.3 — מבנה הספרינט](V1%20by%20CC/1.3%20-%20מבנה%20הספרינט%20בן%203%20השבועות.md)
**ראו גם:** [Sprint Goal](#sprint-goal) · [Timebox](#timebox) · [Ceremony](#ceremony)

---

### <a id="sprint-backlog"></a>Sprint Backlog — בקלוג ספרינט

רשימת פריטי העבודה שהצוות התחייב לבצע בספרינט הנוכחי + ה-[Tasks](#task) שנגזרו מהם + ה-[Sprint Goal](#sprint-goal). שייך לצוות (לא ל-PO). הצוות יכול להוסיף/לשנות Tasks, אך לא לשנות את ה-Sprint Goal.

**ראו גם:** [Product Backlog](#product-backlog) · [Sprint Goal](#sprint-goal) · [Sprint Planning](#sprint-planning)

---

### <a id="sprint-board"></a>Sprint Board — לוח ספרינט

לוח חזותי (ב-Azure DevOps או פיזי) עם עמודות שמייצגות שלבי עבודה: New → Approved → In Progress → Testing → Done. מציג את כל פריטי הספרינט ואת מצבם. ה-[Information Radiator](#information-radiator) המרכזי.

**ראו:** [4.5 — ניהול Sprint Board](V1%20by%20CC/4.5%20-%20ניהול%20Sprint%20Board%20-%20ניהול%20חזותי.md)
**ראו גם:** [WIP Limit](#wip-limit) · [Swimlane](#swimlane) · [Pull System](#pull-system)

---

### <a id="sprint-goal"></a>Sprint Goal — מטרת הספרינט

משפט **אחד** שמתאר את המטרה העיקרית של הספרינט. נקבע ב-[Sprint Planning](#sprint-planning) ומשמש כ"מצפן" — אם צריך לקבל החלטה, שואלים "האם זה מקדם את ה-Sprint Goal?" תבנית: "בספרינט הזה אנחנו מתמקדים ב-[מה] כדי לאפשר ל-[מי] ל-[מה]."

**ראו:** [3.2 — נוהל Sprint Planning](V1%20by%20CC/3.2%20-%20נוהל%20Sprint%20Planning.md)
**ראו גם:** [Product Goal](#product-goal) · [Sprint Planning](#sprint-planning)

---

### <a id="sprint-planning"></a>Sprint Planning — תכנון ספרינט

טקס בתחילת כל ספרינט (עד 4 שעות לספרינט של 3 שבועות). הצוות וה-PO מסכימים על [Sprint Goal](#sprint-goal), בוחרים פריטים מה-[Product Backlog](#product-backlog), ומפרקים אותם ל-[Tasks](#task).

**ראו:** [3.2 — נוהל Sprint Planning](V1%20by%20CC/3.2%20-%20נוהל%20Sprint%20Planning.md)
**ראו גם:** [Sprint Goal](#sprint-goal) · [Capacity](#capacity) · [Velocity](#velocity)

---

### <a id="sprint-review"></a>Sprint Review — סקירת ספרינט

טקס בסוף הספרינט (עד שעתיים) שבו הצוות מדגים ([Demo](#demo)) את מה שנבנה. מטרה: לקבל פידבק ולהתאים את ה-Backlog בהתאם. זו **הדגמה חיה** — לא דוח סטטוס.

**ראו:** [3.4 — נוהל Sprint Review](V1%20by%20CC/3.4%20-%20נוהל%20Sprint%20Review%20-%20Demo.md)
**ראו גם:** [Demo](#demo) · [Increment](#increment) · [Stakeholder](#stakeholder)

---

### <a id="stakeholder"></a>Stakeholder — בעל עניין

כל אדם מחוץ לצוות שיש לו עניין בתוצרי המוצר: לקוחות, מנהלים, משתמשי קצה, צוותים אחרים. בעלי עניין מוזמנים ל-[Sprint Review](#sprint-review) אך **לא** ל-[Daily](#daily-standup) או [Retro](#retrospective).

**ראו:** [2.4 — מדריך ללקוח ובעלי עניין](V1%20by%20CC/2.4%20-%20מדריך%20ללקוח%20ובעלי%20עניין.md)
**ראו גם:** [Sprint Review](#sprint-review) · [Client](#client)

---

### <a id="client"></a>Client — לקוח

בעל עניין חיצוני שמשתמש במוצר, נותן משוב ב-[Sprint Reviews](#sprint-review), מגיש בקשות דרך ה-[PO](#product-owner), ומספק הקשר עסקי.

**ראו:** [2.4 — מדריך ללקוח ובעלי עניין](V1%20by%20CC/2.4%20-%20מדריך%20ללקוח%20ובעלי%20עניין.md)
**ראו גם:** [Stakeholder](#stakeholder) · [Product Owner](#product-owner)

---

### <a id="start-stop-continue"></a>Start/Stop/Continue — התחל/הפסק/המשך (פורמט רטרו)

פורמט [Retrospective](#retrospective) עם 3 שאלות: מה נתחיל לעשות? מה נפסיק? מה נמשיך? פשוט ויעיל.

**ראו גם:** [Retrospective](#retrospective) · [Sailboat](#sailboat) · [4L](#4l)

---

### <a id="story-mapping"></a>Story Mapping (User Story Mapping) — מיפוי סיפורים

טכניקת Jeff Patton לארגון סיפורים לתמונת חוויית משתמש שלמה: **שדרה** (מסע המשתמש), **שלד** (צעדים), סיפורים מתחת לכל צעד, וקו [MVP](#mvp) אופקי.

**ראו:** [4.2 — פירוק MVP](V1%20by%20CC/4.2%20-%20פירוק%20MVP%20-%20מחזון%20למשימות.md)
**ראו גם:** [MVP](#mvp) · [User Story](#user-story)

---

### <a id="story-points"></a>Story Points — נקודות סיפור

יחידת מידה **יחסית** להערכת גודל/מורכבות של [User Story](#user-story). לא שעות — אלא השוואה יחסית. אם Story בסיסי הוא "2", אז Story שמורכב פי שלוש הוא "5" או "8". מאפשרים תכנון ומעקב באמצעות [Velocity](#velocity). **לעולם לא להשוות בין צוותים.**

**ראו:** [4.3 — הערכת מאמץ](V1%20by%20CC/4.3%20-%20הערכת%20מאמץ%20-%20Story%20Points%20ו-Planning%20Poker.md)
**ראו גם:** [Fibonacci Sequence](#fibonacci-sequence) · [Planning Poker](#planning-poker) · [Velocity](#velocity)

---

### <a id="story-splitting"></a>Story Splitting — פירוק סיפורים

טכניקות לשבירת סיפורים גדולים (8+ נקודות) לסיפורים קטנים ועצמאיים: לפי צעדי עבודה, לפי וריאציות נתונים, לפי ממשק, לפי כללים עסקיים, או לפי [CRUD](#crud).

**ראו:** [4.1 — כתיבת User Stories](V1%20by%20CC/4.1%20-%20כתיבת%20User%20Stories%20-%20מדריך%20מעשי.md)
**ראו גם:** [INVEST](#invest) · [User Story](#user-story)

---

### <a id="crud"></a>CRUD — ארבע פעולות בסיסיות

**C**reate, **R**ead, **U**pdate, **D**elete — טכניקת [Story Splitting](#story-splitting) שבה כל פעולה הופכת לסיפור נפרד.

**ראו גם:** [Story Splitting](#story-splitting)

---

### <a id="swarming"></a>Swarming — נחילה (עבודה משותפת)

כמה חברי צוות מתמקדים יחד בפריט חסום או בעדיפות גבוהה. העדפה: לסיים עבודה קיימת לפני שמתחילים חדשה.

**ראו גם:** [Blocker](#blocker) · [WIP Limit](#wip-limit) · [Pair Programming](#pair-programming)

---

### <a id="swimlane"></a>Swimlane — מסלול שחייה

חלוקה אופקית של [Sprint Board](#sprint-board) לפסים: Expedite (דחוף), Standard (רגיל), Bugs, Tech Debt. מסייעת לראות בקלות את סוגי העבודה על הלוח.

**ראו:** [4.5 — ניהול Sprint Board](V1%20by%20CC/4.5%20-%20ניהול%20Sprint%20Board%20-%20ניהול%20חזותי.md)
**ראו גם:** [Sprint Board](#sprint-board) · [WIP Limit](#wip-limit)

---

### <a id="t-shaped-skills"></a>T-Shaped Skills — מיומנויות בצורת T

פרופיל חבר צוות אידיאלי: מומחיות עמוקה בתחום אחד-שניים (הקו האנכי) + הבנה רחבה בתחומים רבים (הקו האופקי). מפחית צווארי בקבוק בצוות.

**ראו גם:** [Cross-Functional Team](#cross-functional-team) · [Pair Programming](#pair-programming)

---

### <a id="task"></a>Task — משימה

יחידת העבודה הקטנה ביותר. כל [User Story](#user-story) מפורק ל-Tasks (בדרך כלל 2-16 שעות). דוגמה: "לכתוב API endpoint לחיפוש לקוח." מוערכת ב**שעות** (לא ב-Story Points).

**ראו גם:** [User Story](#user-story) · [Sprint Planning](#sprint-planning)

---

### <a id="technical-debt"></a>Technical Debt — חוב טכני

תחזוקה נדחית בתוכנה (חוב עיצוב, חוב קוד, חוב בדיקות, חוב תשתית, חוב תיעוד) שמצטברת כמו ריבית דריבית ומאטה את הפיתוח לאורך זמן. טיפול: [Boy Scout Rule](#boy-scout-rule), הקצאת 10-20% מקיבולת הספרינט לחוב טכני.

**ראו גם:** [Boy Scout Rule](#boy-scout-rule) · [Sprint Backlog](#sprint-backlog)

---

### <a id="theme"></a>Theme — נושא (קיבוץ אסטרטגי)

קיבוץ ברמה גבוהה מעל [Epics](#epic). לדוגמה: "שירות עצמי ללקוחות." ממופה ל-Tags או [Area Path](#area-path) ב-Azure DevOps.

**ראו גם:** [Epic](#epic) · [Area Path](#area-path)

---

### <a id="throughput"></a>Throughput — תפוקה

מספר הפריטים שהושלמו בפרק זמן. משמש ב-[Kanban](#kanban) כמדד חלופי ל-[Velocity](#velocity).

**ראו גם:** [Velocity](#velocity) · [Kanban](#kanban) · [Cycle Time](#cycle-time)

---

### <a id="timebox"></a>Timebox — מגבלת זמן

הגבלת זמן מקסימלית לפעילות. כל טקס ב-Scrum הוא timeboxed: [Daily](#daily-standup) = 15 ד׳, [Sprint Planning](#sprint-planning) = 4 שע׳ (ל-3 שבועות), [Review](#sprint-review) = 2 שע׳, [Retro](#retrospective) = 1.5 שע׳, [Sprint](#sprint) = 3 שבועות. כשהזמן נגמר — עוצרים.

**ראו:** [1.3 — מבנה הספרינט](V1%20by%20CC/1.3%20-%20מבנה%20הספרינט%20בן%203%20השבועות.md)

---

### <a id="transparency"></a>Transparency — שקיפות

אחד משלושת עמודי ה-[Empiricism](#empiricism): כל המשתתפים רואים את אותה מציאות דרך [Sprint Board](#sprint-board) גלוי, [Daily Standup](#daily-standup), ומידע משותף.

**ראו גם:** [Empiricism](#empiricism) · [Inspection](#inspection) · [Adaptation](#adaptation) · [Information Radiator](#information-radiator)

---

### <a id="user-story"></a>User Story — סיפור משתמש

תיאור צורך ממבט המשתמש, בפורמט: "**בתור** [תפקיד], **אני רוצה** [פעולה], **כדי ש-**[ערך]." User Story הוא לא מפרט טכני — הוא הבטחה לשיחה. הפרטים מתבהרים דרך [Acceptance Criteria](#acceptance-criteria) ודיון עם ה-PO.

**ראו:** [4.1 — כתיבת User Stories](V1%20by%20CC/4.1%20-%20כתיבת%20User%20Stories%20-%20מדריך%20מעשי.md)
**ראו גם:** [INVEST](#invest) · [Acceptance Criteria](#acceptance-criteria) · [Story Points](#story-points) · [Story Splitting](#story-splitting)

---

### <a id="velocity"></a>Velocity — מהירות

מספר ה-[Story Points](#story-points) שהצוות מסיים בממוצע בכל ספרינט. מחושבת כממוצע של 3-5 ספרינטים אחרונים. משמשת לתכנון — "כמה עבודה סביר שנספיק?" **לא** מדד לביצועים ו**אסור** להשוות בין צוותים (ראו [Goodhart's Law](#goodharts-law)).

**ראו:** [4.6 — מדדים ובריאות](V1%20by%20CC/4.6%20-%20מדדים%20ובריאות%20-%20מה%20למדוד%20ולמה.md)
**ראו גם:** [Story Points](#story-points) · [Capacity](#capacity) · [Goodhart's Law](#goodharts-law)

---

### <a id="waterfall"></a>Waterfall — מפל מים

גישת הפיתוח הסדרתית המסורתית (דרישות → עיצוב → בנייה → בדיקות → פריסה). [Agile](#agile) נולד כתגובה למגבלות גישה זו — במיוחד חוסר היכולת להתאים לשינויים.

**ראו גם:** [Agile](#agile) · [Scrummerfall](#scrummerfall)

---

### <a id="wip"></a>WIP (Work In Progress) — עבודה בתהליך

כמות פריטי העבודה שנמצאים כרגע בביצוע ולא הושלמו. WIP גבוה מדי = החלפות הקשר, עיכובים, ואיכות נמוכה. עקרון מפתח: **להתחיל לסיים לפני שמתחילים להתחיל.**

**ראו גם:** [WIP Limit](#wip-limit) · [Kanban](#kanban) · [Pull System](#pull-system)

---

### <a id="wip-limit"></a>WIP Limit — מגבלת עבודה בתהליך

מספר מקסימלי של פריטים שמותר להיות בעמודה מסוימת בלוח בו-זמנית. דוגמה: "עמודת Active — מקסימום 3 פריטים לכל מפתח." אם העמודה מלאה, צריך לסיים פריט לפני שמתחילים חדש. מושג מ-[Kanban](#kanban).

**ראו:** [4.5 — ניהול Sprint Board](V1%20by%20CC/4.5%20-%20ניהול%20Sprint%20Board%20-%20ניהול%20חזותי.md)
**ראו גם:** [WIP](#wip) · [Sprint Board](#sprint-board) · [Pull System](#pull-system)

---

### <a id="wsjf"></a>WSJF (Weighted Shortest Job First) — עבודה קצרה משוקללת ראשונה

טכניקת תעדוף: **WSJF = ערך עסקי / גודל עבודה.** פריטים עם WSJF גבוה מקבלים עדיפות — הם נותנים הכי הרבה ערך ביחס למאמץ. כלי שימושי ל-[PO](#product-owner).

**ראו גם:** [MoSCoW](#moscow) · [Product Owner](#product-owner) · [Product Backlog](#product-backlog)

---

### <a id="yagni"></a>YAGNI (You Aren't Gonna Need It) — אתה לא תצטרך את זה

עיקרון: אל תבנה פיצ׳ר עד שיש צורך אמיתי ומוכח — אל תתכנן לעתיד שלא יגיע. בנה את הפתרון הפשוט ביותר שעונה על הצורך הנוכחי.

**ראו גם:** [Gold Plating](#gold-plating) · [MVP](#mvp)

---

### <a id="zombie-scrum"></a>Zombie Scrum — סקראם זומבי

[אנטי-דפוס](#anti-pattern): הצוות מבצע את כל הטקסים אבל הם טקסים ריקים — בלי אנרגיה, בלי שיתוף פעולה אמיתי, בלי התאמה. תוצאה של Scrum שנכפה מלמעלה בלי הסכמה.

**ראו:** [5.3 — אנטי-דפוסים](V1%20by%20CC/5.3%20-%20אנטי-דפוסים%20נפוצים%20-%20מה%20יכול%20להשתבש.md)
**ראו גם:** [Anti-Pattern](#anti-pattern) · [Scrummerfall](#scrummerfall)

---

### <a id="4l"></a>4L (Liked/Learned/Lacked/Longed For) — פורמט רטרו

פורמט [Retrospective](#retrospective) עם 4 קטגוריות: **Liked** (מה נהנינו ממנו), **Learned** (מה למדנו), **Lacked** (מה חסר לנו), **Longed For** (מה הלוואי שהיה לנו).

**ראו גם:** [Retrospective](#retrospective) · [Sailboat](#sailboat) · [Mad/Sad/Glad](#mad-sad-glad)

---

### <a id="mad-sad-glad"></a>Mad/Sad/Glad — כועס/עצוב/שמח (פורמט רטרו)

פורמט [Retrospective](#retrospective) רגשי: **Mad** (מה תסכל), **Sad** (מה אכזב), **Glad** (מה שימח).

**ראו גם:** [Retrospective](#retrospective) · [4L](#4l) · [Sailboat](#sailboat)

---

## B. מונחי Azure DevOps

Azure DevOps הוא הכלי שבו אנחנו מנהלים את עבודת ה-Agile ביומיום. הטבלה הבאה ממפה בין שמות שמופיעים בממשק הכלי לבין המונחים האג׳ייליים.

<div dir="rtl">

| מקבילה ב-Agile / הסבר | תרגום לעברית | מונח ב-Azure DevOps |
|---:|---:|---:|
| מונח כללי לכל פריט: Epic, Feature, User Story, Task, Bug | פריט עבודה | <a id="work-item"></a>**Work Item** |
| הלוח החזותי עם העמודות (New → Active → Resolved → Closed). מקביל ל-Sprint Board | לוח ספרינט | <a id="board"></a>**Board** |
| רשימה מתועדפת של כל פריטי העבודה (בניגוד ל-Board שמציג עמודות) | תצוגת Backlog | <a id="backlog-view"></a>**Backlog view** |
| ב-Azure DevOps, Iteration = Sprint. כל ספרינט מוגדר כ-Iteration עם תאריכים | ספרינט (Sprint) | <a id="iteration-ado"></a>**Iteration** |
| מבנה היררכי לסיווג פריטי עבודה לפי צוות או תחום | נתיב אזור | <a id="area-path"></a>**Area Path** |
| המסלול שמגדיר לאיזה ספרינט שייך כל פריט | נתיב איטרציה | <a id="iteration-path"></a>**Iteration Path** |
| כלי לחיפוש וסינון פריטי עבודה לפי תנאים | שאילתה | <a id="query"></a>**Query** |
| דף מרכזי שמציג Widgets עם מדדים וגרפים | לוח מחוונים | <a id="dashboard"></a>**Dashboard** |
| אלמנט בודד ב-Dashboard: תרשים Burndown, גרף Velocity וכו׳ | רכיב תצוגה | <a id="widget"></a>**Widget** |
| בקשה למזג קוד מ-Branch אחד לאחר, כולל Code Review | בקשת משיכה | <a id="pull-request"></a>**Pull Request (PR)** |
| תהליך אוטומטי שבונה, בודק, ופורס את הקוד | צינור CI/CD | <a id="pipeline"></a>**Pipeline** |
| מערכת תיעוד שיתופית בתוך Azure DevOps | ויקי | <a id="wiki"></a>**Wiki** |
| הגדרת שעות עבודה זמינות לכל חבר צוות בספרינט | קיבולת | <a id="capacity-ado"></a>**Capacity** |
| שדה ב-Task שמראה כמה שעות עבודה נותרו. מזין את ה-Burndown | עבודה נותרת | <a id="remaining-work"></a>**Remaining Work** |
| מצב פריט: New → Active → Resolved → Closed | סטטוס | <a id="state"></a>**State** |
| תוויות חופשיות לסיווג נוסף. דוגמה: Tech-Debt, Quick-Win, UX | תגיות | <a id="tags"></a>**Tags** |
| Widget שמציג גרף Burndown של הספרינט הנוכחי | תרשים שחיקת ספרינט | <a id="sprint-burndown-ado"></a>**Sprint Burndown** |
| Widget שמציג כמה Story Points הצוות השלים בכל ספרינט | מהירות | <a id="velocity-ado"></a>**Velocity** |
| כלי מתקדם ליצירת דוחות מותאמים. מתחבר גם ל-Power BI | תצוגת אנליטיקס | <a id="analytics-view"></a>**Analytics View** |
| תצוגת Backlog של מספר צוותים על ציר זמן אחד | תוכנית אספקה | <a id="delivery-plan"></a>**Delivery Plan** |

</div>

---

## C. קיצורים נפוצים

טבלה מרוכזת של קיצורים שנתקלים בהם בעבודה יומיומית, בפגישות, ובמסמכים.

<div dir="rtl">

| הסבר קצר | עברית | מונח מלא באנגלית | קיצור |
|---:|---:|---:|:------:|
| תנאים מדידים שמגדירים מתי Story עובד כמצופה | קריטריוני קבלה | Acceptance Criteria | **AC** |
| גרף שמראה כמה פריטים בכל סטטוס לאורך זמן | תרשים זרימה מצטבר | Cumulative Flow Diagram | **CFD** |
| תהליך אוטומטי: שינוי בקוד → בנייה → בדיקות → פריסה | אינטגרציה/פריסה רציפה | Continuous Integration / Continuous Deployment | **CI/CD** |
| ארבע פעולות בסיסיות: יצירה, קריאה, עדכון, מחיקה | פעולות בסיסיות | Create, Read, Update, Delete | **CRUD** |
| מתי פריט עבודה נחשב "סיים באמת" | הגדרת סיום | Definition of Done | **DoD** |
| מתי Story מוכן להיכנס לספרינט | הגדרת מוכנות | Definition of Ready | **DoR** |
| 6 תכונות של User Story טוב | עצמאי, גמיש, בעל ערך, ניתן להערכה, קטן, ניתן לבדיקה | Independent, Negotiable, Valuable, Estimable, Small, Testable | **INVEST** |
| הגרסה הקטנה ביותר שנותנת ערך אמיתי | מוצר מינימלי בר-קיימא | Minimum Viable Product | **MVP** |
| שיטת תעדוף ל-4 קטגוריות | חובה / חשוב / אפשרי / לא הפעם | Must / Should / Could / Won't | **MoSCoW** |
| כל פריט ב-Backlog: Story, Bug, Feature, Epic, Task | פריט בקלוג מוצר | Product Backlog Item | **PBI** |
| אחראי על מה לבנות ובאיזה סדר | בעל המוצר | Product Owner | **PO** |
| בקשה למזג קוד שכוללת Code Review | בקשת משיכה | Pull Request | **PR** |
| תהליכי בדיקה ואימות | הבטחת איכות | Quality Assurance | **QA** |
| מטריצה: מי עושה מה בכל תהליך | אחראי, נושא באחריות, מיועץ, מעודכן | Responsible, Accountable, Consulted, Informed | **RACI** |
| אחראי על תהליך העבודה, מנחה טקסים, מסיר חסמים | סקראם מאסטר | Scrum Master | **SM** |
| יחידת הערכה יחסית לגודל User Story | נקודות סיפור | Story Points | **SP** |
| בדיקה אחרונה שבה הלקוח מאשר שהפיצ׳ר עובד כצפוי | בדיקת קבלת משתמש | User Acceptance Testing | **UAT** |
| פריטים שנמצאים כרגע בעבודה ולא הושלמו | עבודה בתהליך | Work In Progress | **WIP** |
| שיטת תעדוף: ערך חלקי מאמץ — הגבוה מקבל עדיפות | עבודה קצרה משוקללת ראשונה | Weighted Shortest Job First | **WSJF** |
| עיקרון: אל תבנה פיצ׳ר עד שיש צורך אמיתי | אתה לא תצטרך את זה | You Aren't Gonna Need It | **YAGNI** |

</div>

---

> **טיפ:** הדפיסו את סעיף C (טבלת הקיצורים) ושימו ליד המסך. תוך שבוע-שבועיים הקיצורים ייכנסו לשפה הטבעית של הצוות.

---

**מסמכים קשורים:**
- [1.1 — Agile בקצרה](V1%20by%20CC/1.1%20-%20Agile%20בקצרה%20-%20העקרונות%20שמניעים%20אותנו.md) — הסבר מלא על 4 הערכים ו-12 העקרונות
- [1.3 — מבנה הספרינט](V1%20by%20CC/1.3%20-%20מבנה%20הספרינט%20בן%203%20השבועות.md) — לוח זמנים, טקסים, ו-timeboxing
- [4.1 — כתיבת User Stories](V1%20by%20CC/4.1%20-%20כתיבת%20User%20Stories%20-%20מדריך%20מעשי.md) — מדריך מעשי עם דוגמאות
- [5.1 — כרטיסי עזר מהירים](V1%20by%20CC/5.1%20-%20כרטיסי%20עזר%20מהירים%20-%20Cheat%20Sheets.md) — Cheat Sheets לכל הטקסים
