import React, {
   Dispatch,
   Fragment,
   SetStateAction,
   useEffect,
   useState,
} from "react";
import { HiXMark } from "react-icons/hi2";
import IconModalTypeEvent from "./icon_modal_type_event";
import Popover from "@mui/material/Popover";
import { BsTags } from "react-icons/bs";
import clsx from "clsx";
import { FaXmark } from "react-icons/fa6";
import { TbCircleNumber1Filled } from "react-icons/tb";
import { RiNumber1 } from "react-icons/ri";
import { TbNumber1 } from "react-icons/tb";
interface Props {
   codTypeEvent: number | null;
   setCodTypeEvent: Dispatch<SetStateAction<number | null>>;
   showFilter: Boolean;
}

const typesEvents = [
   {
      cod_tipo: 2,
      nombre: "Concurso",
   },
   {
      cod_tipo: 4,
      nombre: "Ensayo con banda",
   },
   {
      cod_tipo: 3,
      nombre: "Coronación",
   },
   {
      cod_tipo: 1,
      nombre: "Celebraciones",
   },
   {
      cod_tipo: 6,
      nombre: "Sorteos",
   },
   {
      cod_tipo: 7,
      nombre: "Charlas y capacitaciones",
   },
];

const TypeEventModal = ({
   codTypeEvent,
   setCodTypeEvent,
   showFilter,
}: Props) => {
   const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

   const handleClick = (cod: number) => {
      if (cod === codTypeEvent) {
         setCodTypeEvent(null);
      } else {
         setCodTypeEvent(cod);
      }
      handleClose();
   };
   const handleClicked = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);
   const id = open ? "simple-popover" : undefined;

   return (
      <>
         <div
            className={`flex-col items-center cursor-pointer transition-colors !duration-[400ms] ${
               showFilter
                  ? codTypeEvent
                     ? "text-white"
                     : "text-gray-500"
                  : "text-p-mmc"
            } ${codTypeEvent ? "md:text-white" : "md:text-gray-500 "}`}
            onClick={handleClicked}
         >
            <div className="w-8 h-8 relative ">
               <BsTags className="w-full h-full p-[5px]" />
               {codTypeEvent && (
                  <div className="absolute w-4 h-4 top-[0] rounded-full bg-red-500 right-[-12px] p-[2px]">
                     <TbNumber1 className="w-full h-full  text-white" />
                  </div>
               )}
            </div>
            <p className="text-[12px] leading-[1]">Tipos</p>
         </div>
         <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "center",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
            className="mt-2"
            sx={{
               "@media (max-width: 639px)": {
                  "& .MuiPopover-paper": {
                     position: "fixed !important", // Aplica solo en tamaños menores a sm
                     top: "0 !important",
                     left: "0 !important",
                     bottom: "0 !important",
                     right: "0 !important",
                     width: "100% !important",
                     height: "100% !important",
                     maxWidth: "100% !important",
                     maxHeight: "100% !important",
                  },
               },
            }}
         >
            <article className="flex flex-col sm:py-2 ">
               <div className="bg-p-mmc w-full flex sm:hidden items-center justify-between px-[20px] py-2 text-white ">
                  <p>Selecciona el tipo de evento</p>
                  <div className="w-9 h-9 ">
                     <FaXmark
                        onClick={() => handleClose()}
                        className="w-full h-full"
                     />
                  </div>
               </div>
               {typesEvents.map((t) => (
                  <section
                     className="mt-4 sm:mt-[0] px-4 cursor-pointer"
                     key={t.cod_tipo}
                     onClick={() => handleClick(t.cod_tipo)}
                  >
                     <div className="flex  items-center  mb-1">
                        <IconModalTypeEvent
                           cod_type_event={t.cod_tipo}
                           cod_type_select={codTypeEvent}
                        />
                        <p
                           className={clsx(
                              {
                                 "text-gray-400":
                                    codTypeEvent === null ||
                                    t.cod_tipo != codTypeEvent,
                                 "text-celebration":
                                    t.cod_tipo === 1 && codTypeEvent == 1,
                                 "text-concourse":
                                    t.cod_tipo === 2 && codTypeEvent == 2,
                                 "text-coronation":
                                    t.cod_tipo === 3 && codTypeEvent == 3,
                                 "text-s-mmc":
                                    t.cod_tipo === 4 && codTypeEvent == 4,
                                 "text-sorteo":
                                    t.cod_tipo === 6 && codTypeEvent == 6,
                                 "text-charla":
                                    t.cod_tipo === 7 && codTypeEvent == 7,
                              },
                              "text-[18px]"
                           )}
                        >
                           {t.nombre}
                        </p>
                     </div>

                     {t.cod_tipo != 7 && <hr />}
                  </section>
               ))}
            </article>
         </Popover>
      </>
   );
};

export default TypeEventModal;
