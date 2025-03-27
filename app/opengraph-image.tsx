import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "iOS News App"

export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div
        style={{
          color: "#0070f3",
          fontSize: 64,
          fontWeight: "bold",
          marginBottom: 24,
        }}
      >
        iOS News App
      </div>
      <div
        style={{
          color: "#333",
          fontSize: 32,
          marginTop: 24,
        }}
      >
        A modern iOS-style news application
      </div>
    </div>,
    {
      ...size,
    },
  )
}

