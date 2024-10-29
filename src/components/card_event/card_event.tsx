import { Event, TypeEvent } from "@/libs/types";
import "./style.css";
import formatoFecha from "@/utils/formato_fecha";
import format_name_event from "@/utils/format_name_event";
import { SearchProvincia, SearchDistrito } from "@/utils/search_site";
import { format_hour } from "@/utils/format_hour";
import IconCard from "./icon_card";
import typesEvents from "@/utils/types_events";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaLocationDot, FaRegCalendar, FaRegClock } from "react-icons/fa6";
import { getNameTypeEvent } from "../profile_event/profile_event";
import clsx from "clsx";

export default function CardEvent({ event }: { event: Event }) {
   const router = useRouter();

   const nameEvent = (): string => {
      let filtro: TypeEvent[] = typesEvents.filter(
         (t) => t.cod_type == event.tipos_evento_cod_tipo.toString()
      );
      if (filtro.length == 0) return "tipo no encontrado";
      return filtro[0].name;
   };
   const handleTouchStart = (e: any) => {
      e.currentTarget.style.opacity = "0.9"; // Aplica la opacidad al tocar
   };

   const handleTouchEnd = (e: any) => {
      e.currentTarget.style.opacity = "0"; // Vuelve a la opacidad 0 cuando termina el toque
   };
   return (
      <Link
         href={`/calendario/${encodeURIComponent(nameEvent())}/${event.slug}`}
      >
         <div className="relative flex flex-col rounded-[5px]  shadow overflow-hidden cursor-pointer ">
            <img src={event.banner_con} alt="" />
            <div className="w-full relative ">
               <IconCard cod_type_event={event.tipos_evento_cod_tipo} />
               <div
                  className={clsx(
                     {
                        "bg-celebration": event.tipos_evento_cod_tipo === 1,
                        "bg-concourse": event.tipos_evento_cod_tipo === 2,
                        "bg-coronation": event.tipos_evento_cod_tipo === 3,
                        "bg-s-mmc ": event.tipos_evento_cod_tipo === 4,
                        "bg-sorteo": event.tipos_evento_cod_tipo === 6,
                     },
                     "text-white text-center text-[14px] sm:text-[17px] h-[25px]  flex items-center justify-center"
                  )}
               >
                  {/* rounded-br-md" */}
                  <p className="leading-[1.3] sm:leading-[1] mt-[-2px]">
                     {getNameTypeEvent(event.tipos_evento_cod_tipo)}
                  </p>
               </div>
               <p className="mt-4 ml-[13px] text-start text-s-mmc text-[15px] md:text-[20px] leading-[1.1] font-bold truncate">
                  {event.nombre_concurso}
               </p>
               <p className="text-start text-[14px] md:text-[16px] pl-[13px] leading-[1] text-gray-400 truncate">
                  {event.cod_concurso == 418
                     ? "Chile"
                     : `${SearchProvincia(
                          event.departamento,
                          event.provincia
                       )}, ${" "}
               ${SearchDistrito(event.provincia, event.distrito)}`}
               </p>
               <section className="flex flex-col gap-[6px] my-4 w-[98%] pl-[13px] ">
                  <div className="flex items-center gap-[5px] text-p-mmc ">
                     <div className="w-[15px] ">
                        <FaLocationDot className="!w-[13px]" />
                     </div>
                     <p className="text-[13.5px] flex-1 md:text-[15.5px] text-start  text-gray-400 truncate">
                        {event.lugar}
                     </p>
                  </div>

                  <div className="flex items-center gap-[5px] text-p-mmc ">
                     <div className="w-[15px] ">
                        <FaRegCalendar className="!w-[13px]" />
                     </div>
                     <p className="text-[13.5px] flex-1 md:text-[15.5px] text-start  text-gray-400 truncate">
                        {formatoFecha(event.fecha)}{" "}
                        {event.hora && `y ${formatoFecha(event.hora)}`}
                     </p>
                  </div>
                  <div className="flex items-center gap-[5px] text-p-mmc ">
                     <div className="w-[15px] ">
                        <FaRegClock className="!w-[13px]" />
                     </div>
                     <p className="text-[13.5px] flex-1 md:text-[15.5px] text-start  text-gray-400 truncate">
                        {format_hour(event.fecha)}
                     </p>
                  </div>

                  {/* <div className="flex items-center gap-[5px] text-p-mmc">
                     <div>
                        <FaRegCalendar />
                     </div>
                     <p className="text-[13.5px] md:text-[15.5px] text-start  text-gray-400 truncate">
                        {formatoFecha(event.fecha)}{" "}
                        {event.hora && `y ${formatoFecha(event.hora)}`}
                     </p>
                  </div>
                  <div className="flex items-center gap-[5px] text-p-mmc">
                     <div>
                        <FaRegClock />
                     </div>
                     <p className="text-[13.5px] md:text-[15.5px] text-start  text-gray-400">
                        {format_hour(event.fecha)}
                     </p>
                  </div> */}
               </section>
            </div>
            <div
               onTouchStart={handleTouchStart}
               onTouchEnd={handleTouchEnd}
               className={clsx(
                  {
                     "hover:bg-celebration": event.tipos_evento_cod_tipo === 1,
                     "hover:bg-concourse": event.tipos_evento_cod_tipo === 2,
                     "hover:bg-coronation": event.tipos_evento_cod_tipo === 3,
                     "hover:bg-s-mmc ": event.tipos_evento_cod_tipo === 4,
                     "hover:bg-sorteo": event.tipos_evento_cod_tipo === 6,
                  },
                  " w-full h-full absolute opacity-0 hover:opacity-90 flex items-center justify-center transition-opacity duration-300"
               )}
            >
               <div className="border-[1px] border-white px-4 py-[2px] text-white text-[18px] rounded">
                  Ver detalles
               </div>
            </div>
         </div>
      </Link>
   );
}
