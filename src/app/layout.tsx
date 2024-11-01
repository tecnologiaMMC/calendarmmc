import type { Metadata } from "next";
import { Sansita } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const sansita = Sansita({
   weight: ["400", "700", "800", "900"],
   subsets: ["latin-ext"],
});

export const metadata: Metadata = {
   title: "MI MARINERA.COM",
   description: "Tu marinera en un solo lugar",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="es">
         <head>
         </head>
         <body className={`${sansita.className} `}>{children}</body>
      </html>
   );
}
