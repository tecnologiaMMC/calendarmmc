"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProfileEvent from "@/components/profile_event/profile_event";
import Menu from "@/components/menu/menu";
import Details from "@/components/details/details";
import { Event } from "@/libs/types";
import apiClient from "@/services/axiosInstance";
import Registrations from "@/components/registrations/resgistrations";
import Premios from "@/components/Premios/Premios";
import BasesLuis from "@/components/BasesLuis/BasesLuis";
import Inscripciones from "@/components/Inscripciones/inscipciones";
import { useQuill } from "react-quilljs";
import BasesForEvent from "@/components/bases_for_event/bases_for_event";
import FooterMmc from "@/components/Footer/footer";
import { ordenarPorLetraInicial } from "@/utils/sort_modalities_for_names";

export default function Evento() {
   const { type, slug } = useParams();
   const [event, setEvent] = useState<DetailEvent>();
   const [cont, setCont] = useState<number>(0);
   const [modalities, setModalities] = useState<Modality[]>();
   const [categories, setCategories] = useState<Category[]>();
   const [tabSelect, setTabSelect] = useState<number>(1);
   const [bases, setBases] = useState<Bases>();

   useEffect(() => {
      const getData = async (sl: string) => {
         const response = await apiClient.get(
            `/userpar/data-event-datails/${slug}`
         );
         if (
            response.data[0].bases !== null &&
            Object.keys(response.data[0].bases).length > 0
         ) {
            let basesResponse = response.data[0].bases;
            if (typeof response.data[0].bases === "string") {
               basesResponse = JSON.parse(response.data[0].bases);
            }
            setBases(basesResponse);
         }
         setEvent(response.data[0]);
         if (response.data.length > 1) {
            let filtro=response.data[1].sort(ordenarPorLetraInicial);
            setModalities(filtro);
            setCategories(response.data[2]);
         }
         setCont(response.data[0].cont_vistas);
      };
      getData(slug.toString());
   }, []);

   useEffect(() => {
      const urlContador = "/userpar/contador";
      const updateVistas = async () => {
         if (event?.cont_vistas == undefined || event?.cont_vistas == null)
            return new Error("vistas undefined or null");
         let sumaVistas = event?.cont_vistas + 1;
         let cuerpo = {
            slug: slug,
            contador: sumaVistas,
         };
         try {
            const data = await apiClient.post(urlContador, cuerpo);
            setCont(sumaVistas);
         } catch (error) {
            console.log(error);
         }
      };

      setTimeout(() => {
         if (event) {
            updateVistas();
         }
      }, 3000);
   }, [event]);

   const changeTab = (n: number): void => {
      setTabSelect(n);
   };
   return (
      <div className="flex flex-col bg-white items-center">
         <Menu />
         {
            <ProfileEvent
               event={event}
               cont={cont}
               changeTab={changeTab}
               tabSelect={tabSelect}
            />
         }

         <section className="w-full flex flex-col  items-center justify-start pt-[15px] sm:pt-[40px] pb-[20px] min-h-[350px]">
            {event && tabSelect == 1 && <Details event={event} />}
            {bases && modalities && categories && event && tabSelect == 34 && (
               <BasesForEvent
                  categories={categories}
                  modalities={modalities}
                  event={event}
                  bases={bases}
                  banner={event.banner_con}
               />
            )}

            {event && categories && modalities && tabSelect == 3 && (
               <Inscripciones
                  categories={categories}
                  modalities={modalities}
                  event={event}
                  bases={bases}
               />
            )}
            {event && tabSelect == 6 && <Premios />}
         </section>
         <FooterMmc />
      </div>
   );
}
