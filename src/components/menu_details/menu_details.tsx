"use client";

import logo from "@img/logommc.png";
import Link from "next/link";
import "../menu/style.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Event } from "@/libs/types";
import SitesModal from "../sites_modal/sites_modal";
import { textFieldStyles } from "../menu/stylef";
import { IoSearch } from "react-icons/io5";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import PopoverDates from "../all_events/pop_over_dates";
import TypeEventModal from "../type_event_modal/type_event_modal";
import sites from "@/utils/sites";
import ButonMenu from "../menu/buton-menu";
import newlogommc from "@img/newlogo.jpg";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { nameTypeEvent } from "../card_event/card_event";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
import { TbNumber1, TbNumber2, TbNumber3, TbNumber4 } from "react-icons/tb";
// import { roboto } from "@/app/calendario/page";
import IconTypeSearch from "../menu/icon_type_search";
import { useRouter } from "next/navigation";
import { buscarDepartamentoPorId } from "@/utils/search_binary";

interface Props {
   setEvents: Dispatch<SetStateAction<Event[] | undefined>>; // Permitir undefined
   events: Event[] | undefined; // Permitir undefined
   eventsBack: Event[] | undefined; // Permitir undefined
   setShowFilter: Dispatch<SetStateAction<boolean>>;
   showFilter: Boolean;
}

export default function MenuDetail({
   setEvents,
   events,
   eventsBack,
   setShowFilter,
   showFilter,
}: Props) {
   const [isOpen, setIsOpen] = useState(false);
   const [nameEventT, setNameEventT] = useState<string>("");
   const [codRegion, setCodRegion] = useState<number | null>(null);
   const [codProvincia, setCodProvincia] = useState<number | null>(null);
   const [showResults, setShowResults] = useState(false);
   const router = useRouter();
   const [codTypeEvent, setCodTypeEvent] = useState<number | null>(null);

   const [selectedRange, setSelectedRange] = useState<DateRange<Dayjs>>([
      null,
      null,
   ]);

   const [countFilters, setCountFilters] = useState<number>(0);



   useEffect(() => {
      if (eventsBack) {
         let copyEvents = [...eventsBack];
         let cont = 0;
         if (codRegion) {
            router.push(`/calendario?region=${codRegion}`);
            console.log("codigo de region");
         }
         if (codProvincia) {
            router.push(`/calendario?provincia=${codProvincia}`);
         }
         if (codTypeEvent) {
            router.push(`/calendario?tipo_de_evento=${codTypeEvent}`);
         }
         if (selectedRange) {
            const [start, end] = selectedRange;
            if (start && end) {
               const startDate = dayjs(start);
               const endDate = dayjs(end);
               router.push(`/calendario?inicio=${start}&&fin=${end}`);
            }
         }
         //  if (nameEventT.length > 0) {
         //     copyEvents = copyEvents.filter((e) =>
         //        e.nombre_concurso
         //           .toLocaleUpperCase()
         //           .includes(nameEventT.toLocaleUpperCase())
         //     );
         //  }
         setEvents(copyEvents);
         setCountFilters(0);
      }
   }, [codRegion, selectedRange, codTypeEvent, codProvincia]);

   useEffect(() => {
      if (eventsBack) {
         let copyEvents = [...eventsBack];
         copyEvents = copyEvents.filter((e) =>
            e.nombre_concurso
               .toLocaleUpperCase()
               .includes(nameEventT.toLocaleUpperCase())
         );
         setEvents(copyEvents);
      }
   }, [nameEventT]);

   return (
      <>
         <div
            className={`w-full fixed z-30 transition-all duration-[400ms] ease-in-out ${
               showFilter ? "h-[117px]" : "h-[80px]"
            }  md:h-[70px] bg-p-mmc  flex justify-center `}
         >
            <Link
               href="/calendario"
               // className="w-[150px] lg:w-[200px] mx-auto md:mx-0  md:left-[2%] lg:left-[5%] top-[10px] md:top-[14.5px]  absolute "

               className="w-[160px] lg:w-[180px] xl:w-[200px] left-[2%] lg:left-[3%] xl:left-[5%] top-[19.5px] lg:top-[16.5px] xl:top-[14.5px] hidden md:block md:absolute "
            >
               <img
                  className="w-full h-full object-contain"
                  src={logo.src}
                  alt="logo"
               />
            </Link>
            <section className="flex  flex-col items-center justify-start w-[calc(100%-76px)] md:w-auto  md:gap-4 md:flex-row md:justify-between mr-[76px] pl-[16px]">
               <div className="h-[44px] mt-[18px]  md:mt-[0px]  w-[100%] md:w-[300px] lg:w-[450px] xl:w-[470px]  flex flex-col justify-end md:justify-start relative md:ml-32 ">
                  <TextField
                     className=" text-white"
                     size="small"
                     placeholder="Nombre del evento"
                     onChange={(e) => setNameEventT(e.target.value)}
                     value={nameEventT}
                     onFocus={() => {
                        setShowResults(true);
                     }}
                     onBlur={() => setShowResults(false)}
                     sx={textFieldStyles}
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <IoSearch className="text-gray-500" />
                           </InputAdornment>
                        ),
                     }}
                  />

                  {showResults && nameEventT && events && events.length > 0 && (
                     <div
                        className="absolute z-10 mt-12 top-[0] bg-white border rounded-lg shadow p-2 w-full max-h-[400px] overflow-hidden"
                        onMouseDown={(e) => e.preventDefault()} // Prevenir que se cierre al hacer clic
                     >
                        {events.map((event) => (
                           <div
                              key={event.cod_concurso}
                              className={`py-1 px-2  text-gray-400 cursor-pointer bg-white hover:bg-gray-100 font-sans`}
                           >
                              <Link
                                 href={`/calendario/${encodeURIComponent(
                                    nameTypeEvent(event.tipos_evento_cod_tipo)
                                 )}/${event.slug}`}
                                 className="flex w-full items-center  justify-between"
                              >
                                 <IconTypeSearch
                                    cod_type_event={event.tipos_evento_cod_tipo}
                                 />
                                 <p className="truncate flex-1">
                                    {event.nombre_concurso} - {buscarDepartamentoPorId(sites.departamentos,event.departamento)||'no disponible'}
                                 </p>
                              </Link>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
               <article
                  className={`transition-all !duration-[400ms] ease-in-out overflow-hidden ${
                     showFilter ? "h-[44px]" : "h-0 "
                  } md:h-[44px]  flex font-sans gap-8 !text-white mt-2 md:mt-0 mb-1 md:mb-[0]  px-8  pl-[108px] md:pl-[0px] md:px-2 `}
               >
                  <section className="flex flex-col items-center cursor-pointer ">
                     <TypeEventModal
                        codTypeEvent={codTypeEvent}
                        setCodTypeEvent={setCodTypeEvent}
                        showFilter={showFilter}
                     />
                  </section>
                  <section className="flex flex-col items-center cursor-pointer ">
                     <SitesModal
                        codRegion={codRegion}
                        setCodRegion={setCodRegion}
                        codProvincia={codProvincia}
                        setCodProvincia={setCodProvincia}
                        showFilter={showFilter}
                        showOptionProvincia={false}
                     />
                  </section>
                  <section className="flex flex-col items-center ">
                     <PopoverDates
                        setSelectedRange={setSelectedRange}
                        selectedRange={selectedRange}
                        showFilter={showFilter}
                     />
                  </section>
               </article>
            </section>

            <ButonMenu />

            <div
               className="flex md:hidden items-center justify-center w-11 h-11 right-4 cursor-pointer rounded-full fixed top-[18px] bg-[#4E2A53]"
               onClick={() => setShowFilter(!showFilter)}
            >
               <div className="w-8 h-8 text-white p-[2px] relative">
                  <HiMiniAdjustmentsHorizontal className="w-full h-full " />
                  {countFilters === 1 && (
                     <div className="absolute w-4 h-4 top-[-10px] rounded-full bg-red-500 right-[-14px] p-[2px] z-10">
                        <TbNumber1 className="w-full h-full  text-white" />
                     </div>
                  )}
                  {countFilters === 2 && (
                     <div className="absolute w-4 h-4 top-[-10px] rounded-full bg-red-500 right-[-14px] p-[2px] z-20">
                        <TbNumber2 className="w-full h-full  text-white" />
                     </div>
                  )}
                  {countFilters === 3 && (
                     <div className="absolute w-4 h-4 top-[-10px] rounded-full bg-red-500 right-[-14px] p-[2px] z-30">
                        <TbNumber3 className="w-full h-full  text-white" />
                     </div>
                  )}
                  {countFilters === 4 && (
                     <div className="absolute w-4 h-4 top-[-10px] rounded-full bg-red-500 right-[-14px] p-[2px] z-40">
                        <TbNumber4 className="w-full h-full  text-white" />
                     </div>
                  )}
               </div>
            </div>
         </div>
         {/* <div className="fixed lg:hidden top-[18px]  md:top-[13px] left-4 z-50 flex items-center justify-center w-11 h-11 bg-blue-500 rounded-full overflow-hidden">
            <img src={newlogommc.src} alt="" />
         </div> */}
         <div className={`hidden xl:fixed xl:block right-[calc(5%+49px)] top-[23px] z-50  text-white  font-thin`}>
            Soy organizador
         </div>
      </>
   );
}
