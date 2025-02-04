"use client";

import logo from "@img/logommc.png";
import Link from "next/link";
import "./style.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import { InputAdornment, TextField } from "@mui/material";
import { Event } from "@/libs/types";
import { FiMapPin } from "react-icons/fi";
import SitesModal from "../sites_modal/sites_modal";
import { formatDateForPlaceholder, textFieldStyles } from "./stylef";
import { IoSearch } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { BsTags } from "react-icons/bs";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import PopoverDates from "../all_events/pop_over_dates";
import TypeEventModal from "../type_event_modal/type_event_modal";
import sites from "@/utils/sites";
import ButonMenu from "./buton-menu";
import newlogommc from "@img/newlogo.jpg";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { nameTypeEvent } from "../card_event/card_event";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
import { TbNumber1, TbNumber2, TbNumber3, TbNumber4 } from "react-icons/tb";
// import { roboto } from "@/app/calendario/page";
import IconTypeSearch from "./icon_type_search";
import {
   buscarDepartamentoPorId,
   buscarDepartamentoPorIdConvertToInt,
} from "@/utils/search_binary";
import { getNameTypeEvent } from "../profile_event/profile_event";
import {
   SearchProvincia,
   SearchProvinciaConverToInt,
} from "@/utils/search_site";

interface Props {
   setEvents: Dispatch<SetStateAction<Event[] | undefined>>; // Permitir undefined
   events: Event[] | undefined; // Permitir undefined
   eventsBack: Event[] | undefined; // Permitir undefined
   setShowFilter: Dispatch<SetStateAction<boolean>>;
   showFilter: Boolean;
   setTextExplore: Dispatch<SetStateAction<string>>;
}

export default function Menul({
   setEvents,
   events,
   eventsBack,
   setShowFilter,
   showFilter,
   setTextExplore,
}: Props) {
   const [isOpen, setIsOpen] = useState(false);
   const [nameEventT, setNameEventT] = useState<string>("");
   const [codRegion, setCodRegion] = useState<number | null>(null);
   const [codProvincia, setCodProvincia] = useState<number | null>(null);
   const [showResults, setShowResults] = useState(false);

   const [codTypeEvent, setCodTypeEvent] = useState<number | null>(null);

   const [selectedRange, setSelectedRange] = useState<DateRange<Dayjs>>([
      null,
      null,
   ]);
   const [eventsFoName, setEventsForName] = useState<Event[] | null>();
   const [countFilters, setCountFilters] = useState<number>(0);
   const [rowsText, setRows] = useState<number>(1);

   useEffect(() => {
      if (typeof window !== "undefined") {
         const params = new URLSearchParams(window.location.search);
         if (params.has("region")) {
            const codRegionValue = params.get("region");
            setCodRegion(codRegionValue ? parseInt(codRegionValue, 10) : null);
            setCountFilters(1);
         }
         //tipo_de_evento
         else if (params.has("tipo_de_evento")) {
            const codtipo_e = params.get("tipo_de_evento");
            console.log(codtipo_e);
            setCodTypeEvent(codtipo_e ? parseInt(codtipo_e, 10) : null);
            setCountFilters(1);
         } else if (params.has("inicio") && params.has("fin")) {
            const start: Dayjs | null = params.get("inicio")
               ? dayjs(params.get("inicio"))
               : null;
            const end: Dayjs | null = params.get("fin")
               ? dayjs(params.get("fin"))
               : null;

            setSelectedRange([start, end]);
            setCountFilters(1);
         } 
         // else if (localStorage.getItem("userDepartment")) {
         //    const dep = sites.departamentos;
         //    const userDepartament = localStorage.getItem("userDepartment");
         //    let [busqueda] = dep.filter(
         //       (d) => d.name.toLowerCase() === userDepartament?.toLowerCase()
         //    );
         //    if (busqueda) {
         //       setCodRegion(parseInt(busqueda.id));
         //       setCountFilters(1);
         //    }
         // }
      }
   }, []);

   useEffect(() => {
      if (eventsBack) {
         let copyEvents = [...eventsBack];
         let cont = 0;
         if (codRegion) {
            copyEvents = copyEvents.filter(
               (e) => parseInt(e.departamento) === codRegion
            );
            cont++;
            setNameEventT("");
         }
         if (codProvincia) {
            console.log("cod provincia ", codProvincia);
            copyEvents = copyEvents.filter(
               (e) => parseInt(e.provincia) === codProvincia
            );
            cont++;
            setNameEventT("");
         }
         if (codTypeEvent) {
            copyEvents = copyEvents.filter(
               (e) => e.tipos_evento_cod_tipo === codTypeEvent
            );
            cont++;
            setNameEventT("");
         }
         if (selectedRange) {
            const [start, end] = selectedRange;
            if (start && end) {
               cont++;
               const startDate = dayjs(start);
               const endDate = dayjs(end);
               copyEvents = copyEvents.filter((evento) => {
                  const fechaEvento = dayjs(evento.fecha);
                  return (
                     fechaEvento.isSameOrAfter(startDate, "day") &&
                     fechaEvento.isSameOrBefore(endDate, "day")
                  );
               });
               setNameEventT("");
            }
         }
         setRows(cont > 2 ? 2 : 1);
         setEvents(copyEvents);
         setCountFilters(cont);
      }
   }, [codRegion, selectedRange, codTypeEvent, codProvincia]);

   useEffect(() => {
      let textExplore = `<p className="leading-[1.2] ml-[10px]">Explora los eventos</p`;
      if (codRegion) {
         textExplore =
            `<p className="leading-[1.2] ml-[10px]"> Explora eventos en <b>${buscarDepartamentoPorIdConvertToInt(
               sites.departamentos,
               codRegion.toLocaleString()
            )}</b></p>` ||
            `<p className="leading-[1.2] ml-[10px]">Explora los eventos</p`;
      }
      if (codProvincia && codRegion) {
         textExplore =
            `<p className="leading-[1.2] ml-[10px]"> Explora eventos en <b>${buscarDepartamentoPorIdConvertToInt(
               sites.departamentos,
               codRegion.toLocaleString()
            )}, ${SearchProvinciaConverToInt(
               codRegion.toString(),
               codProvincia.toString()
            )}</b></p>` || "Explora los eventos";
      }

      setTextExplore(textExplore);
   }, [codRegion, codProvincia]);

   useEffect(() => {
      if (eventsBack && nameEventT.length > 0) {
         let copyEvents = [...eventsBack];
         copyEvents = copyEvents.filter((e) =>
            e.nombre_concurso
               .toLocaleUpperCase()
               .includes(nameEventT.toLocaleUpperCase())
         );
         setEventsForName(copyEvents);
      }
   }, [nameEventT]);

   const iniciarSession = () => {
      window.open("https://sesion.eventosdemarinera.com/", "_blank");
   };

   const whats = () => {
      window.open("https://wa.me/954109568", "_blank");
   };

   const getPlaceholder = () => {
      const [start, end] = selectedRange || [];
      const regionText = codRegion
         ? buscarDepartamentoPorIdConvertToInt(
              sites.departamentos,
              codRegion.toLocaleString()
           ) || ""
         : "";
      const provinceText =
         codRegion && codProvincia
            ? SearchProvinciaConverToInt(
                 codRegion.toString(),
                 codProvincia.toString()
              ) || ""
            : "";
      const eventTypeText = codTypeEvent ? getNameTypeEvent(codTypeEvent) : "";
      const dateRangeText =
         start && end
            ? `${formatDateForPlaceholder(start)} a ${formatDateForPlaceholder(
                 end
              )}`
            : "";

      // Contar cuántas variables están activas
      const activeCount = [
         regionText,
         provinceText,
         eventTypeText,
         dateRangeText,
      ].filter(Boolean).length;

      if (activeCount >= 3) {
         // Si tres o más variables están activas, dividir el texto en dos líneas
         return `${regionText} ${
            regionText && provinceText ? "," : ""
         } ${provinceText} ${
            (regionText || provinceText) && (eventTypeText || dateRangeText)
               ? ","
               : ""
         }\n${eventTypeText} ${
            eventTypeText && dateRangeText ? "," : ""
         } ${dateRangeText}`;
      }

      // Si no, solo devolver el texto sin salto de línea
      if (!codRegion && !start && !end && !codTypeEvent && !codProvincia) {
         return "Nombre del evento";
      }
      return `${regionText} ${
         regionText && provinceText ? "," : ""
      }  ${provinceText} ${
         (regionText || provinceText) && (eventTypeText || dateRangeText)
            ? ","
            : ""
      }      ${eventTypeText} ${
         eventTypeText && dateRangeText ? "," : ""
      }  ${dateRangeText}`;
   };

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
            <section className="flex  flex-col items-center justify-start w-[calc(100%-76px)] md:w-auto  md:gap-4 md:flex-row md:justify-between  mr-[76px] pl-[16px]">
               <div className="h-[44px] mt-[18px]  md:mt-[0px]  w-[100%] md:w-[300px] lg:w-[450px] xl:w-[470px]  flex flex-col justify-end md:justify-start relative md:ml-32  ">
                  <TextField
                     className=" text-white"
                     size="small"
                     multiline
                     placeholder={
                        !showResults ? getPlaceholder() : "Nombre del evento"
                     }
                     onChange={(e) => setNameEventT(e.target.value)}
                     value={nameEventT}
                     rows={!showResults ? rowsText : 1}
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

                  {showResults &&
                     nameEventT &&
                     eventsFoName &&
                     eventsFoName.length > 0 && (
                        <div
                           className="absolute z-50 mt-12 top-[0] bg-white border rounded-lg shadow p-2 w-full max-h-[400px] overflow-hidden "
                           onMouseDown={(e) => e.preventDefault()} // Prevenir que se cierre al hacer clic
                        >
                           {eventsFoName.map((event) => (
                              <div
                                 key={event.cod_concurso}
                                 className={`py-1 px-2  text-gray-400 cursor-pointer bg-white hover:bg-gray-100 font-sans`}
                              >
                                 <Link
                                    href={`/calendario/${encodeURIComponent(
                                       nameTypeEvent(
                                          event.tipos_evento_cod_tipo
                                       )
                                    )}/${event.slug}`}
                                    className="flex w-full items-center  justify-between"
                                 >
                                    <IconTypeSearch
                                       cod_type_event={
                                          event.tipos_evento_cod_tipo
                                       }
                                    />
                                    <p className="truncate flex-1">
                                       {event.nombre_concurso} -{" "}
                                       {buscarDepartamentoPorId(
                                          sites.departamentos,
                                          event.departamento
                                       ) || "no disponible"}
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
                        showOptionProvincia={true}
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
         <div
            className={`hidden xl:fixed xl:block right-[calc(5%+49px)] top-[23px] z-50  text-white font-sans font-thin text-[14px]`}
         >
            Soy organizador
         </div>
      </>
   );
}
