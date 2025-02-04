"use client"; // <===== REQUIRED

import React, {
   Dispatch,
   SetStateAction,
   useEffect,
   useRef,
   useState,
} from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import mmc from "@img/mmc-portada.png";
import corp from "@img/portada_corp.jpg";

import { useRouter } from "next/navigation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import {
   Autoplay,
   Pagination,
   Navigation,
   EffectFade,
   EffectCards,
   EffectCube,
} from "swiper/modules";
import Link from "next/link";
import apiClient from "@/services/axiosInstance";
import { TypeEvent } from "@/libs/types";
import typesEvents from "@/utils/types_events";

const makeRequestWithTimeout = async (url: string) => {
   try {
      const response = await apiClient.get(url, { timeout: 3500 });
      return response.data;
   } catch (error: any) {
      console.error("Error:", error.message);
      if (error.code === "ECONNABORTED") {
         console.log(
            "Timeout excedido. Volviendo a intentar la solicitud de portadas..."
         );
         return await makeRequestWithTimeout(url); // Llamada recursiva
      } else {
         throw error;
      }
   }
};

interface PortatesMmc {
   cod_portada: number;
   url_portada: string;
   redireccion_externa: string | null;
   event_slug: string | null;
   active_portada: number;
   tipo: number | null;
   url_portada_movil: string;
}

interface Props {
   showFilter: Boolean;
}

export default function Carousel({ showFilter }: Props) {
   const images = [mmc.src];
   const router = useRouter();
   const [portates, setportates] = useState<PortatesMmc[]>();
   const swiperRef = useRef(null);
   const [initialDelay, setInitialDelay] = useState(true);

   useEffect(() => {
      const getPortates = async () => {
         try {
            const response = await makeRequestWithTimeout("/userpar/portadas");
            console.log(response);
            let filter = response.filter(
               (p: PortatesMmc) => p.active_portada === 1
            );
            setportates(filter);
         } catch (error) {
            console.log(error);
         }
      };
      getPortates();
   }, []);

   const nameEvent = (cod: number): string => {
      let filtro: TypeEvent[] = typesEvents.filter(
         (t) => t.cod_type == cod.toString()
      );
      if (filtro.length == 0) return "tipo no encontrado";
      return filtro[0].name;
   };
   const handleClick = (portada: PortatesMmc) => {
      if (portada.event_slug && portada.tipo) {
         router.push(
            `/calendario/${encodeURIComponent(nameEvent(portada.tipo))}/${
               portada.event_slug
            }`
         );
      } else if (portada.redireccion_externa) {
         window.open(portada.redireccion_externa, "_blank");
      } else {
         console.log("No redirection");
      }
   };
   return (
      <>
         <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
               delay: initialDelay ? 8500 : 4500,
               disableOnInteraction: false,
            }}
            onSlideChange={() => {
               if (initialDelay) {
                  setInitialDelay(false); // Cambiar a 4500 después del primer slide
               }
            }}
            pagination={{
               clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            id="swiperMain"
            className={`w-full transition-all duration-[400ms] ease-in-out ${
               showFilter ? "mt-[117px]" : "mt-[80px]"
            } md:mt-[70px]`}
         >
            {portates ? (
               portates.map((p) => (
                  <SwiperSlide className=" relative" key={p.cod_portada}>
                     <img
                        className="cursor-pointer z-10 hidden md:block"
                        src={p.url_portada}
                        alt=""
                        onClick={() => handleClick(p)}
                     />
                     <img
                        className="cursor-pointer z-10 block md:hidden"
                        src={p.url_portada_movil}
                        alt="no disponible"
                        onClick={() => handleClick(p)}
                     />
                  </SwiperSlide>
               ))
            ) : (
               <SwiperSlide className=" relative">
                  <img className="cursor-pointer z-10" src={mmc.src} alt="" />
               </SwiperSlide>
            )}
         </Swiper>
      </>
   );
}

// #swiperMain http://localhost:3000/calendario/charlas-y-capacitaciones/1er-encuentro-de-empresarios-en-la-marinera-lima-2024
