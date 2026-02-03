import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            background: "#fafaf9",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Top gradient bar */}
          <div
            style={{
              width: "100%",
              height: "8px",
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
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "44px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "#5ac53a",
                  display: "flex",
                }}
              />
              <span style={{ fontSize: "30px", fontWeight: 600, color: "#1f2123" }}>
                Pistachio AI
              </span>
            </div>

            {/* Headline */}
            <div
              style={{
                fontSize: "54px",
                fontWeight: 700,
                color: "#1f2123",
                lineHeight: 1.2,
                marginBottom: "28px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span>Find the right life sciences</span>
              <span>
                accounts and the <span style={{ color: "#5ac53a" }}>signal</span> that
              </span>
              <span>makes them ready now.</span>
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: "24px",
                color: "#71717a",
                lineHeight: 1.5,
                maxWidth: "800px",
                display: "flex",
              }}
            >
              Commercial intelligence for life sciences BD teams.
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
                fontSize: "18px",
                color: "#a1a1aa",
                display: "flex",
              }}
            >
              trypistachio.ai
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#5ac53a",
                background: "rgba(90, 197, 58, 0.1)",
                padding: "8px 20px",
                borderRadius: "24px",
                display: "flex",
              }}
            >
              Private Alpha
            </div>
          </div>

          {/* Bottom gradient bar */}
          <div
            style={{
              width: "100%",
              height: "8px",
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
  } catch (e) {
    return new Response("Failed to generate image", { status: 500 })
  }
}
