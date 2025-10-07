// app/components/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white text-gray-600 text-sm mt-6 shadow-md rounded-lg">
      <div className="max-w-6xl px-6 py-4 flex justify-center">
        <p className="text-center">
          © {new Date().getFullYear()} TickClock. All rights reserved.
        </p>
       
      </div>
    </footer>
  );
}
