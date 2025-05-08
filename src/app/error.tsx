"use client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Error",
};

interface ErrorProps {
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center space-y-8 text-center">
      <div className="space-y-4 text-white">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl uppercase">
          Oops, something went wrong!
        </h1>
        <p className="text-white/70 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Unexpected error. Please try again later.
        </p>
      </div>

      <button
        onClick={() => reset()}
        className="px-4 py-2 cursor-pointer text-blue-500 hover:text-blue-600"
      >
        Try Again
      </button>
    </div>
  );
}
