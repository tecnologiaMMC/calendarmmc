"use client";

import Carousel from "@/components/carousel_images/carousel_images";
import FeaturedEvents from "@/components/featured_events/features_events";
import Menu from "@/components/menu/menu";
import apiClient from "@/services/axiosInstance";
import { Event } from "@/libs/types";
import AllEvents from "@/components/all_events/all_events";
import { Sansita, Roboto } from "next/font/google";
import { useEffect, useState, Suspense } from "react";
import LoaderForPage from "@/components/loader-for-pages/laoder-for-page";
import { styled } from "@mui/material";
import FooterMmc from "@/components/Footer/footer";
import { FaSliders } from "react-icons/fa6";
import CookieConsent from "@/components/cookie_consent/cookie_consent";

const Loading = styled("div")`
   width: 80px;
   aspect-ratio: 1;
   --c: no-repeat
      repeating-linear-gradient(
         90deg,
         #45204b 0 calc(100% / 7),
         #0000 0 calc(200% / 7)
      );
   background: var(--c), var(--c), var(--c), var(--c);
   background-size: 140% 26%;
   animation: l27 0.75s infinite linear;

   @keyframes l27 {
      0%,
      20% {
         background-position: 0 calc(0 * 100% / 3), 100% calc(1 * 100% / 3),
            0 calc(2 * 100% / 3), 100% calc(3 * 100% / 3);
      }
      80%,
      100% {
         background-position: 100% calc(0 * 100% / 3), 0 calc(1 * 100% / 3),
            100% calc(2 * 100% / 3), 0 calc(3 * 100% / 3);
      }
   }
`;

const sansita = Sansita({
   weight: ["400", "700", "800", "900"],
   subsets: ["latin-ext"],
});



const makeRequestWithTimeout = async (url:string) => {
   try {
      const response = await apiClient.get(url, { timeout: 3500 });
      return response.data;
   } catch (error:any) {
      console.error("Error:", error.message);
      if (error.code === "ECONNABORTED") {
         console.log("Timeout excedido. Volviendo a intentar la solicitud...");
         return await makeRequestWithTimeout(url); // Llamada recursiva
      } else {
         throw error;
      }
   }
};




function Calendar() {
   const [events, setEvents] = useState<Event[]>();
   const [featuredEvents, setFeaturesEvents] = useState<Event[]>();

   useEffect(() => {
      const getDataCards = async () => {
         try {
            const response = await makeRequestWithTimeout("/userpar/data_for_cards");
            setEvents(response);
         } catch (error) {
            console.log(error)
         }
      };
      getDataCards();
   }, []);

   return (
      <Suspense fallback={<LoaderForPage />}>
         <div
            className={`w-full ${sansita.className}  relative bg-white flex flex-col items-center justify-start`}
         >

            <Menu />
            <Carousel></Carousel>
            <CookieConsent/>
            <h1 className="text-[35px] sm:text-[44px] mt-[30px] mb-[20px] leading-[1] text-center text-p-mmc">
               CALENDARIO NACIONAL DE CONCURSOS Y EVENTOS <br /> DE MARINERA
            </h1>
            <h3 className="text-gray-400 w-[90%] sm:w-[85%] mb-[30px] leadind-[1.2] max-w-[1050px] text-justify sm:text-center">
               Este CALENDARIO contiene Ensayos, Coronaciones y CONCURSOS DE
               MARINERA del 2024. Día a día la información es corroborada y
               actualizada con el fin de ser una fuente dinámica y confiable del
               Perú y el mundo.
            </h3>
            <FeaturedEvents events={featuredEvents}></FeaturedEvents>
            <div className="mt-[30px] w-full max-w-[1400px]">
               <div className="text-[27px] md:text-[38px] ml-[5%] text-p-mmc leading-[.9] mt-[-4px] flex items-center">
                    <FaSliders className="h-[22px] md:h-[25px] mt-[4px] md:mt-[8px]"/>
                    <b className="leading-[1] ml-[10px]">Explora más eventos</b>
               </div>
            </div>
            {events && <AllEvents events={events} />}
            {!events && (
               <div className="w-full max-w-[1400px] flex justify-center">
                  <div className="bg-gray-100 w-[90%] flex items-center justify-center min-h-[450px]">
                     <Loading />
                  </div>
               </div>
            )}
            <FooterMmc/>
         </div>
      </Suspense>
   );
}

export default Calendar;

//    let filtro = response.data.filter(
//       (eve: Event) => eve.cod_concurso == 4
//   );
//    setFeaturesEvents(filtro);