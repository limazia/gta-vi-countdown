"use client";

import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import Image from "next/image";

import { START_DATE, TARGET_DATE, calculateTimePercentage } from "@/utils/date";

export default function Home() {
  const [percent, setPercent] = useState(0);

  const formattedTargetDate = format(parseISO(TARGET_DATE), "MMMM d, yyyy", {
    locale: enUS,
  });

  useEffect(() => {
    const initialPercent = calculateTimePercentage(START_DATE, TARGET_DATE);
    setPercent(initialPercent);

    const intervalId = setInterval(() => {
      const currentPercent = calculateTimePercentage(START_DATE, TARGET_DATE);
      setPercent(currentPercent);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-center">
        Countdown to {formattedTargetDate}
      </h1>

      <div className="relative w-full max-w-md mt-12">
        <div className="p-1 bg-gradient-to-r from-purple-600 via-orange-400 to-pink-500 w-full relative">
          <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center justify-center w-16 h-16 bg-background">
              <Image
                src="/logo.png"
                alt="Grand Theft Auto VI"
                width={38}
                height={38}
                className="object-cover select-none"
              />
            </div>
          </div>

          <div className="p-4 bg-background">
            <div className="relative z-20">
              <div className="w-full h-12 bg-black" />
              <div
                className="h-12 absolute inset-0 bg-blue-500 flex items-center justify-center text-white font-bold"
                style={{
                  width: `${percent}%`,
                  transition: "width 0.5s ease-in-out",
                }}
              >
                {percent > 15 && `${percent.toFixed(2)}%`}
              </div>

              {percent <= 15 && (
                <div className="absolute top-0 left-0 h-12 flex items-center ml-2 text-white">
                  {percent.toFixed(2)}%
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
