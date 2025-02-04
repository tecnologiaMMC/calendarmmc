import type { Metadata } from "next";
import Script from "next/script";
import GoogleAnalytics from "@/libs/googleAn";
import logoColorMmc from "@img/cl_li.png";
import { Sansita } from "next/font/google";

export const metadata: Metadata = {
  title: "Calendario MiMarinera.com",
  description: "Tu marinera en un solo lugar",
  keywords: ["marinera", "baile tradicional", "eventos de marinera", "calendario de eventos", "MiMarinera.com"],
  metadataBase: new URL("https://mimarinera.com"), // Cambia esto por tu dominio real
  openGraph: {
    title: "Calendario MiMarinera.com",
    description: "Tu marinera en un solo lugar",
    images: [
      {
        url: logoColorMmc.src, // URL relativa
        width: 1200,
        height: 600,
        alt: "Logotipo de MiMarinera.com",
      },
    ],
    locale: "es_ES",
    siteName: "MiMarinera.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Puedes agregar otros scripts necesarios aquí */}
      </head>
      <body >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}

