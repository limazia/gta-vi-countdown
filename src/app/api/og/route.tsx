import { ImageResponse } from "next/og";

import { START_DATE, TARGET_DATE } from "@/utils/date";

export const runtime = "edge";
export const revalidate = 86400; // 24 horas em segundos

function calculateProgress() {
  const startDate = new Date(START_DATE);
  const releaseDate = new Date(TARGET_DATE);
  const today = new Date();

  // Cálculo do progresso
  const totalDays = Math.floor(
    (releaseDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysElapsed = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Garantir que o progresso esteja entre 0 e 100
  const progress = Math.min(Math.max((daysElapsed / totalDays) * 100, 0), 100);

  return Math.round(progress);
}

export async function GET() {
  try {
    const progress = calculateProgress();
    const daysLeft = calculateDaysRemaining();

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
            {progress}% completed
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

function calculateDaysRemaining() {
  const releaseDate = new Date(TARGET_DATE);
  const today = new Date();
  const daysLeft = Math.ceil(
    (releaseDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  return Math.max(0, daysLeft);
}
