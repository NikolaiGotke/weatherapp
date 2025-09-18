"use client";

import NavBar from "@/components/NavBar";
import { CityProvider } from "@/context/CityContext";
import "@/styles/components.css";
import "@/styles/scrollbars.css";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased bg-sky bg-cover bg-center">
        <CityProvider>
          <div className="flex flex-col min-h-screen bg-black/20">
            <NavBar />
            <main className="flex-1 p-6 overflow-hidden">{children}</main>
          </div>
        </CityProvider>
      </body>
    </html>
  );
}
