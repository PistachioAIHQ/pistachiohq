import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#fafaf9",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Top gradient bar */}
        <div
          style={{
            width: "100%",
            height: "6px",
            background: "linear-gradient(to right, #5ac53a, #d5fd51, #f6c86a, #eb5d2a)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px 70px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/* Logo + name */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "40px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "6px",
                background: "#5ac53a",
                display: "flex",
              }}
            />
            <span style={{ fontSize: "28px", fontWeight: 600, color: "#1f2123" }}>
              Pistachio AI
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "#1f2123",
              lineHeight: 1.15,
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Find the right life sciences accounts</span>
            <span>
              and the <span style={{ color: "#5ac53a" }}>signal</span> that makes them ready now.
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "22px",
              color: "#71717a",
              lineHeight: 1.5,
              maxWidth: "800px",
              display: "flex",
            }}
          >
            Commercial intelligence for life sciences BD teams — powered by real-time signals from trials, publications, conferences, and hiring activity.
          </div>
        </div>

        {/* Bottom section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 70px 40px",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              color: "#a1a1aa",
              display: "flex",
            }}
          >
            pistachiohq.ai
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#5ac53a",
              background: "rgba(90, 197, 58, 0.1)",
              padding: "6px 16px",
              borderRadius: "20px",
              display: "flex",
            }}
          >
            Private Alpha · 5 seats remaining
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div
          style={{
            width: "100%",
            height: "6px",
            background: "linear-gradient(to right, #5ac53a, #d5fd51, #f6c86a, #eb5d2a)",
            display: "flex",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
