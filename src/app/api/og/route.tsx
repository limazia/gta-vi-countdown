import { ImageResponse } from "next/og";

import {
  calculateRemainingDays,
  calculateTimePercentage,
  START_DATE,
  TARGET_DATE,
} from "@/utils/date";

export const runtime = "edge";
export const revalidate = 86400; // 24 horas em segundos

export async function GET() {
  try {
    const progress = calculateTimePercentage(START_DATE, TARGET_DATE);
    const daysLeft = calculateRemainingDays(TARGET_DATE);

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, #000000, #1a1a2e)",
            color: "white",
            padding: "40px",
            fontFamily: "Geist, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <h1
              style={{
                fontSize: "72px",
                margin: "0",
                fontWeight: "bold",
                background: "linear-gradient(to right, #f5c518, #e67e22)",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              GTA VI Countdown
            </h1>
            <p
              style={{
                fontSize: "24px",
                marginTop: "10px",
              }}
            >
              {daysLeft} days remaining
            </p>
          </div>

          {/* Barra de progresso simplificada */}
          <div
            style={{
              width: "80%",
              height: "24px",
              backgroundColor: "#333",
              borderRadius: "12px",
              margin: "20px 0",
              overflow: "hidden",
              display: "flex",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(to right, #f5c518, #e67e22)",
                display: "flex",
              }}
            />
          </div>

          {/* Texto de porcentagem em elemento separado */}
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            {progress.toFixed(2)}% completed
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "16px",
              marginTop: "40px",
              opacity: "0.8",
            }}
          >
            Updated on: {new Date().toLocaleDateString("pt-BR")}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response("Failed to generate OG image", {
      status: 500,
    });
  }
}
