import { useState } from "react";

const stages = [
  { num: 1, emoji: "🔍", name: "הוכחת כאב", sub: "Pain Proof", desc: "למצוא כאב אמיתי שאנשים מוכנים לשלם כדי לפתור", exit: "Problem Statement + FUMES ≥ 3/5", trainings: "גילוי בעיה, גילוי לקוח", color: "#E74C3C", light: "#FADBD8" },
  { num: 2, emoji: "✅", name: "הוכחת ביקוש", sub: "Demand Proof", desc: "לבדוק שאנשים באמת רוצים את זה — לא רק אתה", exit: "5+ שיחות, Fake Door 10%+, דף נחיתה חי", trainings: "אידיאציה, פריטוטייפינג, דף נחיתה", color: "#E67E22", light: "#FDEBD0" },
  { num: 3, emoji: "🛠️", name: "מוצר שעובד", sub: "Working Product", desc: "לבנות את הדבר הכי קטן שמישהו יכול לשלם עליו", exit: "MVP/חבילת שירות + 3-5 משתמשים", trainings: "PRD, MVP, כלים", color: "#F1C40F", light: "#FEF9E7" },
  { num: 4, emoji: "💰", name: "כסף על השולחן", sub: "Money on Table", desc: "לקוחות משלמים ראשונים — הוכחה שזה עסק אמיתי", exit: "3+ לקוחות משלמים", trainings: "תמחור, מכירה, GTM", color: "#27AE60", light: "#EAFAF1" },
  { num: 5, emoji: "⚙️", name: "מכונה שעובדת", sub: "Working Machine", desc: "להפוך ממשהו ידני למכונה מדידה ומשופרת", exit: "תהליכים + Unit Economics חיובי", trainings: "אנליטיקס, UE, BMC, VPC, צמיחה, SOP", color: "#2E86C1", light: "#EBF5FB" },
  { num: 6, emoji: "📈", name: "חברה שצומחת", sub: "Growing Company", desc: "מעסק קטן שעובד — לעסק שגדל", exit: "100+ לקוחות + ערוץ צמיחה מוכח", trainings: "תפעול, צוות, גיוס, הזדמנות", color: "#8E44AD", light: "#F4ECF7" },
];

const principles = [
  { icon: "⚡", title: "נעשה ונשמע", desc: "קודם עושים, אחר כך מבינים. כבר בדקות הראשונות — תוצר ביד." },
  { icon: "🏋️", title: "אימון אישי", desc: "לא קורס. לא סרטון. מאמן שמכיר אותך ומתאים לקצב שלך." },
  { icon: "🎁", title: "אני עושה, אתה מחליט", desc: "אני מכין ניתוחים, מסמכים, תוכניות. אתה יוצא לשטח ומוכר." },
  { icon: "👣", title: "צעד אחד בכל פעם", desc: "לא מוצפים. לא רצים. כל פעם שלב אחד ברור עם הצלחה מדידה." },
];

const muscles = [
  { num: 1, name: "זיהוי כאב", stage: 1, icon: "🎯" },
  { num: 2, name: "הקשבה עמוקה", stage: 1, icon: "👂" },
  { num: 3, name: "יצירתיות ממוקדת", stage: 2, icon: "💡" },
  { num: 4, name: "בדיקת מציאות", stage: 2, icon: "🔬" },
  { num: 5, name: "בנייה מינימלית", stage: 3, icon: "🧱" },
  { num: 6, name: "תמחור אמיץ", stage: 4, icon: "💪" },
  { num: 7, name: "שכנוע ישיר", stage: 4, icon: "🗣️" },
  { num: 8, name: "קריאת מספרים", stage: 5, icon: "📊" },
  { num: 9, name: "ראייה רחבה", stage: 5, icon: "🔭" },
  { num: 10, name: "הנהגה ושחרור", stage: 6, icon: "👑" },
];

const flow = [
  { icon: "🎯", title: "Quick Win", desc: "הצלחה מוחשית תוך 5 דקות", color: "#27AE60" },
  { icon: "🎁", title: "תוצר ביד", desc: "מסמך, תוכנית, או כלי — מוכן", color: "#2E86C1" },
  { icon: "💡", title: "הבנה קצרה", desc: "משפט אחד — למה זה עבד", color: "#8E44AD" },
  { icon: "🚀", title: "צעד הבא", desc: "פעולה אחת ברורה", color: "#E74C3C" },
];

export default function OnboardingVisual() {
  const [activeStage, setActiveStage] = useState(null);
  const [showMuscles, setShowMuscles] = useState(false);

  return (
    <div dir="rtl" style={{
      fontFamily: "'Segoe UI', Arial, sans-serif",
      maxWidth: 820,
      margin: "0 auto",
      padding: "24px 16px",
      background: "linear-gradient(180deg, #F8FAFC 0%, #EFF3F8 100%)",
      minHeight: "100vh",
    }}>
      {/* ─── Header ─── */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 40, marginBottom: 4 }}>🏋️</div>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: "#1A5276", margin: "0 0 4px 0" }}>
          Enter AI
        </h1>
        <p style={{ fontSize: 13, color: "#7F8C8D", margin: 0, letterSpacing: 1.5, fontWeight: 500 }}>
          Entrepreneurship in the AI Age
        </p>
      </div>

      {/* ─── Welcome Card ─── */}
      <div style={{
        background: "white",
        borderRadius: 16,
        padding: "24px 28px",
        marginBottom: 20,
        boxShadow: "0 2px 16px rgba(26,82,118,0.08)",
        borderRight: "5px solid #1A5276",
      }}>
        <h2 style={{ fontSize: 22, color: "#1A5276", margin: "0 0 8px 0" }}>
          🧭 ברוכים הבאים למסע!
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#2C3E50", margin: "0 0 16px 0" }}>
          אני המאמן העסקי שלך — כאן כדי לעזור לך להפוך רעיון לעסק אמיתי.
          <br />
          בין אם זה <strong>מוצר</strong> (אפליקציה, כלי, פלטפורמה) או <strong>שירות</strong> (ייעוץ, ניהול, הדרכה) — אני מלווה אותך.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {principles.map((p, i) => (
            <div key={i} style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 13,
              color: "#34495E",
              background: "#F4F7FA",
              borderRadius: 10,
              padding: "12px 14px",
              lineHeight: 1.6,
            }}>
              <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{p.icon}</span>
              <div>
                <div style={{ fontWeight: 700, color: "#1A5276", marginBottom: 2, fontSize: 14 }}>{p.title}</div>
                <span>{p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 6 Stages Journey ─── */}
      <div style={{
        background: "white",
        borderRadius: 16,
        padding: "24px 28px",
        marginBottom: 20,
        boxShadow: "0 2px 16px rgba(26,82,118,0.08)",
      }}>
        <h2 style={{ fontSize: 20, color: "#1A5276", margin: "0 0 4px 0", textAlign: "center" }}>
          🗺️ 6 שלבים — מאפס לעסק שעובד
        </h2>
        <p style={{ fontSize: 12, color: "#95A5A6", textAlign: "center", margin: "0 0 18px 0" }}>
          לחצ/י על שלב כדי לראות פרטים  •  21 אימונים  •  44.5 שעות
        </p>

        {/* Stage cards row */}
        <div style={{
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          gap: 6,
          flexWrap: "wrap",
          marginBottom: 16,
        }}>
          {stages.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                onClick={() => setActiveStage(activeStage === i ? null : i)}
                style={{
                  width: 96,
                  minHeight: 96,
                  borderRadius: 14,
                  background: activeStage === i ? s.color : "white",
                  border: `2.5px solid ${s.color}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  transform: activeStage === i ? "scale(1.06)" : "scale(1)",
                  boxShadow: activeStage === i
                    ? `0 6px 20px ${s.color}35`
                    : "0 1px 4px rgba(0,0,0,0.06)",
                  padding: "8px 4px",
                }}
              >
                <div style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: activeStage === i ? "rgba(255,255,255,0.7)" : "#AAA",
                  marginBottom: 2,
                }}>שלב {s.num}</div>
                <div style={{ fontSize: 24, marginBottom: 3 }}>{s.emoji}</div>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: activeStage === i ? "white" : s.color,
                  textAlign: "center",
                  lineHeight: 1.25,
                  padding: "0 2px",
                }}>{s.name}</div>
              </div>
              {i < 5 && (
                <div style={{ fontSize: 14, color: "#D5D8DC", transform: "scaleX(-1)" }}>‹</div>
              )}
            </div>
          ))}
        </div>

        {/* Expanded stage detail */}
        {activeStage !== null && (
          <div style={{
            background: stages[activeStage].light,
            borderRadius: 12,
            padding: "18px 22px",
            borderRight: `4px solid ${stages[activeStage].color}`,
            marginBottom: 12,
          }}>
            <div style={{
              fontSize: 16,
              fontWeight: 700,
              color: stages[activeStage].color,
              marginBottom: 6,
            }}>
              {stages[activeStage].emoji} שלב {stages[activeStage].num}: {stages[activeStage].name}
            </div>
            <div style={{ fontSize: 14, color: "#2C3E50", lineHeight: 1.7, marginBottom: 10 }}>
              {stages[activeStage].desc}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div style={{
                background: "rgba(255,255,255,0.7)",
                borderRadius: 8,
                padding: "10px 12px",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#7F8C8D", marginBottom: 3 }}>
                  🎯 סיימנו כשיש:
                </div>
                <div style={{ fontSize: 12, color: "#2C3E50", lineHeight: 1.5 }}>
                  {stages[activeStage].exit}
                </div>
              </div>
              <div style={{
                background: "rgba(255,255,255,0.7)",
                borderRadius: 8,
                padding: "10px 12px",
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#7F8C8D", marginBottom: 3 }}>
                  💪 אימונים:
                </div>
                <div style={{ fontSize: 12, color: "#2C3E50", lineHeight: 1.5 }}>
                  {stages[activeStage].trainings}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Start anywhere */}
        <div style={{
          background: "#EBF5FB",
          borderRadius: 12,
          padding: "14px 18px",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
        }}>
          <span style={{ fontSize: 22, flexShrink: 0 }}>🚪</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1A5276", marginBottom: 3 }}>
              אפשר להתחיל מכל שלב!
            </div>
            <div style={{ fontSize: 13, color: "#34495E", lineHeight: 1.7 }}>
              יש לך כבר מוצר? שלב 4. יש לקוחות? שלב 5. רק רעיון? מצוין — שלב 1.
              <br />
              מה שדילגנו — נרשום כ<strong>"חובות פתוחים"</strong> ונסגור בזמן הנכון.
            </div>
          </div>
        </div>
      </div>

      {/* ─── Training Flow ─── */}
      <div style={{
        background: "white",
        borderRadius: 16,
        padding: "24px 28px",
        marginBottom: 20,
        boxShadow: "0 2px 16px rgba(26,82,118,0.08)",
        borderRight: "5px solid #2E86C1",
      }}>
        <h2 style={{ fontSize: 20, color: "#2E86C1", margin: "0 0 6px 0" }}>
          🔄 כל אימון — אותה מתודה
        </h2>
        <p style={{ fontSize: 13, color: "#7F8C8D", margin: "0 0 16px 0" }}>
          בכל סשן, בכל שלב, אנחנו עובדים ב-4 צעדים:
        </p>

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {flow.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <div style={{
                flex: 1,
                background: `${f.color}10`,
                border: `2px solid ${f.color}30`,
                borderRadius: 12,
                padding: "14px 10px",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: f.color, marginBottom: 2 }}>{f.title}</div>
                <div style={{ fontSize: 11, color: "#666", lineHeight: 1.4 }}>{f.desc}</div>
              </div>
              {i < 3 && (
                <div style={{ fontSize: 14, color: "#D5D8DC", flexShrink: 0, transform: "scaleX(-1)" }}>‹</div>
              )}
            </div>
          ))}
        </div>

        <div style={{
          background: "#F0F9FF",
          borderRadius: 10,
          padding: "12px 16px",
          fontSize: 13,
          color: "#1A5276",
          lineHeight: 1.7,
          textAlign: "center",
        }}>
          <strong>אף פעם</strong> לא מתחילים מתיאוריה. <strong>תמיד</strong> מתחילים מעשייה.
          <br />
          התיאוריה מגיעה <strong>אחרי</strong> שכבר הצלחת — ואז היא הגיונית.
        </div>
      </div>

      {/* ─── Muscles (expandable) ─── */}
      <div style={{
        background: "white",
        borderRadius: 16,
        padding: "24px 28px",
        marginBottom: 20,
        boxShadow: "0 2px 16px rgba(26,82,118,0.08)",
        borderRight: "5px solid #E67E22",
      }}>
        <div
          onClick={() => setShowMuscles(!showMuscles)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
        >
          <div>
            <h2 style={{ fontSize: 20, color: "#E67E22", margin: "0 0 4px 0" }}>
              💪 10 שרירים יזמיים
            </h2>
            <p style={{ fontSize: 13, color: "#7F8C8D", margin: 0 }}>
              יכולות שכבר יש לך — רק צריך לחזק אותן
            </p>
          </div>
          <div style={{
            fontSize: 20,
            color: "#E67E22",
            transition: "transform 0.2s",
            transform: showMuscles ? "rotate(180deg)" : "rotate(0)",
          }}>▼</div>
        </div>

        {showMuscles && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
            marginTop: 16,
          }}>
            {muscles.map((m) => {
              const stageData = stages[m.stage - 1];
              return (
                <div key={m.num} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: stageData.light,
                  borderRadius: 10,
                  padding: "10px 14px",
                  borderRight: `3px solid ${stageData.color}`,
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{m.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#2C3E50" }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: "#999" }}>שלב {m.stage}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Summary request ─── */}
      <div style={{
        background: "white",
        borderRadius: 16,
        padding: "20px 24px",
        marginBottom: 24,
        boxShadow: "0 2px 16px rgba(26,82,118,0.08)",
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        borderRight: "5px solid #27AE60",
      }}>
        <span style={{ fontSize: 28, flexShrink: 0 }}>📋</span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#27AE60", marginBottom: 4 }}>
            בכל רגע — בקש/י "סיכום"
          </div>
          <div style={{ fontSize: 13, color: "#34495E", lineHeight: 1.7 }}>
            אני אסכם מה עשינו, אילו שרירים חיזקנו, מה יש לך ביד, ומה הצעד הבא.
            <br />
            תקבל/י גם <strong>מסמך להורדה</strong> עם הכל מסודר — הסיכום הוא הסיום הרשמי של כל ישיבת אימון.
          </div>
        </div>
      </div>

      {/* ─── CTA ─── */}
      <div style={{ textAlign: "center", padding: "8px 0 24px" }}>
        <div style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #1A5276, #2E86C1)",
          color: "white",
          fontSize: 18,
          fontWeight: 700,
          padding: "16px 44px",
          borderRadius: 50,
          boxShadow: "0 6px 24px rgba(26,82,118,0.25)",
          letterSpacing: 0.5,
        }}>
          🚀 מוכנים? יאללה!
        </div>
        <p style={{ fontSize: 14, color: "#566573", marginTop: 12, lineHeight: 1.7 }}>
          ספר/י לי קצת על עצמך ועל הרעיון שלך <strong>בצ'אט</strong> — ונצא לדרך ביחד
        </p>
        <p style={{ fontSize: 12, color: "#AAB7B8", marginTop: 4 }}>
          ← כתב/י בחלון השיחה משמאל
        </p>
      </div>
    </div>
  );
}
