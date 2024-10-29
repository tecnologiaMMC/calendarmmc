import type { Metadata } from "next";
import { Sansita, Roboto } from "next/font/google";
import apiClient from "@/services/axiosInstance";
import Script from "next/script";
import GoogleAnalytics from "@/libs/googleAn";
const sansita = Sansita({
   weight: ["400", "700", "800", "900"],
   subsets: ["latin-ext"],
});
// coronacion
// concurso/
// ensayo-con-banda
// celebraciones
// sorteos
//

const tipodeEvento = (tipo: string) => {
   if (tipo == "concurso") return "Concurso";
   if (tipo == "coronacion") return "Coronación";
   if (tipo == "ensayo-con-banda") return "Ensayo con banda";
   if (tipo == "celebraciones") return "Celebraciones";
   if (tipo == "sorteos") return "Sorteo";
   else {
      return "dont exist";
   }
};

export async function generateMetadata({
   params,
}: {
   params: any;
}): Promise<Metadata> {
   const { slug, type } = params;
   const eventDetails: any = await apiClient.get(`/userpar/detalles/${slug}`);
   return {
      title: eventDetails.data[0].nombre_concurso.toUpperCase() || "Detalles",
      description: tipodeEvento(type),
      openGraph: {
         images: {
            url: eventDetails.data[0].banner_con,
            width: "1200",
            height: "600",
         },
      },
   };
}

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
         <body className={`${sansita.className} bg-white`}>{children}</body>
      </html>
   );
}
