"use client";

import NavBar from "@/components/NavBar";
import { CityProvider } from "@/context/CityContext";
import "./globals.css";

/*
  RootLayout fungerer som den overordnede wrapper for hele appen.
  - Indeholder global state via CityProvider, så alle komponenter kan tilgå den valgte by.
  - Sørger for, at baggrund, scroll og layout-struktur håndteres konsistent på tværs af sider.
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased bg-sky bg-cover bg-center">
        {/* CityProvider gør valgt by tilgængelig globalt */}
        <CityProvider>
          <div className="flex flex-col min-h-screen bg-black/20">
            {/* Navigation placeres øverst og er altid synlig */}
            <NavBar />
            <main className="flex-1 p-6 overflow-hidden">{children}</main>
          </div>
        </CityProvider>
      </body>
    </html>
  );
}
