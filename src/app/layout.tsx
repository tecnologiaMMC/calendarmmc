import type { Metadata } from "next";
import "./globals.css";

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
         <head></head>
         <body>{children}</body>
      </html>
   );
}
