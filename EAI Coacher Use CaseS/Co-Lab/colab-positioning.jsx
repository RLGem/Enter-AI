export default function CoLabPositioning() {
  const tools = [
    {
      icon: "🔍",
      title: "Supplier Discovery",
      desc: "Find & vet factories worldwide",
      price: "$649/mo",
      color: "#E74C3C",
      light: "#FADBD8",
    },
    {
      icon: "👤",
      title: "Data Enrichment",
      desc: "Get verified contacts & decision-makers",
      price: "$149–720/mo",
      color: "#2E86C1",
      light: "#D6EAF8",
    },
    {
      icon: "📧",
      title: "Outreach & Analytics",
      desc: "Bulk emails, follow-ups & tracking",
      price: "$50–150/mo",
      color: "#8E44AD",
      light: "#E8DAEF",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        maxWidth: 900,
        margin: "0 auto",
        padding: "48px 24px",
        background: "#FAFBFC",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div
          style={{
            display: "inline-block",
            background: "#EBF5FB",
            color: "#2E86C1",
            fontSize: 13,
            fontWeight: 600,
            padding: "6px 16px",
            borderRadius: 20,
            marginBottom: 16,
            letterSpacing: 0.5,
          }}
        >
          WHY PAY FOR THREE TOOLS?
        </div>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: "#1A1A2E",
            margin: "0 0 12px 0",
            lineHeight: 1.2,
          }}
        >
          One platform. Three capabilities.
        </h2>
        <p
          style={{
            fontSize: 18,
            color: "#6B7280",
            margin: 0,
            maxWidth: 600,
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.6,
          }}
        >
          Most procurement teams juggle multiple tools for supplier discovery,
          data enrichment, and outreach. Co-Lab combines them all.
        </p>
      </div>

      {/* Three tools cards */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginBottom: 24,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {tools.map((tool, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 240px",
              maxWidth: 280,
              background: "white",
              borderRadius: 14,
              padding: "24px 20px",
              border: `1px solid #E5E7EB`,
              position: "relative",
              textAlign: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -10,
                right: 16,
                background: "#FEE2E2",
                color: "#DC2626",
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 10,
                textDecoration: "line-through",
              }}
            >
              {tool.price}
            </div>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{tool.icon}</div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#1A1A2E",
                marginBottom: 6,
              }}
            >
              {tool.title}
            </div>
            <div style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.5 }}>
              {tool.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Arrow + total */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 28, color: "#D1D5DB", marginBottom: 8 }}>
          ▼ ▼ ▼
        </div>
        <div
          style={{
            display: "inline-block",
            background: "#FEF3C7",
            color: "#92400E",
            fontSize: 14,
            fontWeight: 600,
            padding: "6px 18px",
            borderRadius: 20,
          }}
        >
          Separately: $850–$1,500+/mo
        </div>
      </div>

      {/* Co-Lab card */}
      <div
        style={{
          background: "linear-gradient(135deg, #1A1A2E 0%, #2D3561 100%)",
          borderRadius: 20,
          padding: "36px 32px",
          textAlign: "center",
          boxShadow: "0 12px 40px rgba(26,26,46,0.2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            background: "radial-gradient(circle, rgba(46,134,193,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        <div
          style={{
            display: "inline-block",
            background: "rgba(46,134,193,0.2)",
            color: "#7EC8E3",
            fontSize: 12,
            fontWeight: 600,
            padding: "5px 14px",
            borderRadius: 16,
            marginBottom: 16,
            letterSpacing: 1,
          }}
        >
          ALL-IN-ONE
        </div>

        <h3
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "white",
            margin: "0 0 8px 0",
          }}
        >
          Co-Lab
        </h3>

        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.7)",
            margin: "0 0 20px 0",
            lineHeight: 1.6,
          }}
        >
          Discover factories • Enrich contacts • Send & track outreach
          <br />
          Everything in one platform.
        </p>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          {[
            "700K+ Factories",
            "Verified Contacts",
            "Bulk Outreach",
            "Open & Reply Tracking",
            "Pipeline Management",
          ].map((feat, i) => (
            <span
              key={i}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.85)",
                fontSize: 12,
                fontWeight: 500,
                padding: "6px 14px",
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              ✓ {feat}
            </span>
          ))}
        </div>

        {/* Price */}
        <div style={{ marginBottom: 20 }}>
          <span
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "white",
            }}
          >
            $235
          </span>
          <span
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.5)",
              marginLeft: 4,
            }}
          >
            /mo
          </span>
        </div>

        <div
          style={{
            display: "inline-block",
            background: "#10B981",
            color: "white",
            fontSize: 14,
            fontWeight: 700,
            padding: "4px 16px",
            borderRadius: 20,
            marginBottom: 24,
          }}
        >
          Save up to 80% vs. separate tools
        </div>

        <div>
          <a
            href="https://co-lab.dev/onboarding"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #2E86C1, #3498DB)",
              color: "white",
              fontSize: 17,
              fontWeight: 700,
              padding: "14px 40px",
              borderRadius: 50,
              textDecoration: "none",
              boxShadow: "0 4px 16px rgba(46,134,193,0.4)",
              cursor: "pointer",
            }}
          >
            Start Free →
          </a>
        </div>
      </div>
    </div>
  );
}
