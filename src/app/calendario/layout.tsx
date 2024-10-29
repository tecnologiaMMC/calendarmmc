import type { Metadata } from "next";
import Script from "next/script";
import GoogleAnalytics from "@/libs/googleAn";

export const metadata: Metadata = {
   title: "Calendario MiMarinera.com",
   description: "Tu marinera en un solo lugar",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="es">
         <GoogleAnalytics />
         <head>
         </head>
         <body className='bg-white'>{children}</body>
      </html>
   );
}
