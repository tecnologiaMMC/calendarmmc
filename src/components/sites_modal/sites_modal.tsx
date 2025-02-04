import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FiMapPin } from "react-icons/fi";
interface Props {
   codRegion: number | null;
   setCodRegion: Dispatch<SetStateAction<number | null>>;
   codProvincia: number | null;
   setCodProvincia: Dispatch<SetStateAction<number | null>>;
   showFilter: Boolean;
   showOptionProvincia: Boolean;
}
import sites from "@/utils/sites";
import { InputAdornment, TextField } from "@mui/material";
import { IoSearch } from "react-icons/io5";
import { Provincia } from "@/libs/types";
import Popover from "@mui/material/Popover";
import { FaXmark } from "react-icons/fa6";
import { TbNumber1, TbNumber2 } from "react-icons/tb";
import {
   buscarDepartamentoPorId,
   buscarDepartamentoPorIdConvertToInt,
} from "@/utils/search_binary";
import { SearchProvinciaConverToInt } from "@/utils/search_site";

const { departamentos, provincias } = sites;
const SitesModal = ({
   codRegion,
   setCodRegion,
   codProvincia,
   setCodProvincia,
   showFilter,
   showOptionProvincia,
}: Props) => {
   const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
   const [regiones, setRegiones] = useState(departamentos);
   const [textRegion, setTextRegion] = useState<string>("");
   const [textProvincia, setTextProvincia] = useState<string>("");
   const [arrayProvincias, setArrayProvincias] = useState<Provincia[]>([]);
   const [tab, setTab] = useState<number>(1);
   const handleClosed = () => {
      setAnchorEl(null);
   };
   useEffect(() => {
      let copy = [...departamentos];
      if (textRegion.length > 0) {
         const normalizedText = textRegion
            .toLocaleLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
         copy = copy.filter((d) =>
            d.name
               .toLocaleLowerCase()
               .normalize("NFD")
               .replace(/[\u0300-\u036f]/g, "")
               .includes(normalizedText)
         );
      }
      // Aquí podrías setear el estado con el array filtrado si es necesario
      setRegiones(copy);
   }, [textRegion]);

   useEffect(() => {
      if (codRegion) {
         let filtererdProvinces = provincias.filter(
            (p) => parseInt(p.department_id) === codRegion
         );
         setArrayProvincias(filtererdProvinces);
      } else {
         setArrayProvincias([]);
      }
   }, [codRegion]);

   const handleClick = (cod: number) => {
      if (cod === codRegion) {
         setCodRegion(null);
         setCodProvincia(null);
         handleClosed();
      } else {
         setCodRegion(cod);
         setCodProvincia(null);
         if(showOptionProvincia){
            setTab(2)
         }
      }
   };

   const handleClickProvincia = (cod: number) => {
      if (cod === codProvincia) {
         setCodProvincia(null);
      } else {
         setCodProvincia(cod);
      }
      handleClosed();
   };

   const handleClicked = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
      setTab(1)
   };

   const open = Boolean(anchorEl);
   const id = open ? "simple-popover" : undefined;

   return (
      <>
         <div
            className={`flex flex-col items-center cursor-pointer transition-colors !duration-[400ms] ${
               showFilter
                  ? codRegion || codProvincia
                     ? "text-white"
                     : "text-gray-500"
                  : "text-transparent"
            } ${
               codRegion || codProvincia ? "md:text-white" : "md:text-gray-500"
            } `}
            onClick={handleClicked}
         >
            <div className="w-8 h-8 relative">
               <FiMapPin className="w-full h-full p-[5px]" />
               {codRegion && (
                  <div className="absolute w-4 h-4 top-[0] rounded-full bg-red-500 right-[-12px] p-[2px] z-40">
                     <TbNumber1 className="w-full h-full  text-white" />
                  </div>
               )}
               {codRegion && codProvincia && (
                  <div className="absolute w-4 h-4 top-[0] rounded-full bg-red-500 right-[-12px] p-[2px] z-50">
                     <TbNumber2 className="w-full h-full  text-white" />
                  </div>
               )}
            </div>
            <p className="text-[12px] leading-[1]">Ubicación</p>
         </div>
         <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosed}
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
            <article className="flex flex-col h-[100vh] sm:h-[450px] sm:py-2 ">
               <div className="bg-p-mmc w-full flex sm:hidden items-center justify-between py-2 px-[20px] text-white ">
                  <p>Selecciona una ubicación</p>
                  <div className="w-9 h-9 ">
                     <FaXmark
                        onClick={() => handleClosed()}
                        className="w-full h-full"
                     />
                  </div>
               </div>
               <section
                  className={`w-full ${
                     tab == 2 ? "hidden" : "flex"
                  } flex-col px-4 mt-4 sm:mt-0`}
               >
                  <TextField
                     variant="outlined"
                     size="small"
                     placeholder="Ingresa la región o departamento"
                     InputProps={{
                        startAdornment: (
                           <InputAdornment className="" position="start">
                              <IoSearch />
                           </InputAdornment>
                        ),
                     }}
                     onChange={(e) => setTextRegion(e.target.value)}
                  />
               </section>
               <section className="px-4 py-2 flex  items-center   gap-4 ">
                  <div
                     className={`text-[18px] p-2 border-b-[2px] ${
                        tab === 1
                           ? "border-p-mmc text-p-mmc"
                           : "border-white text-gray-600"
                     } leading-[1.2] cursor-pointer transition-all duration-[500ms]`}
                     onClick={() => setTab(1)}
                  >
                     Región
                  </div>
                  <div
                     className={`text-[18px] p-2 border-b-[2px] ${
                        tab === 2
                           ? "border-p-mmc text-p-mmc"
                           : "border-white text-gray-600"
                     } leading-[1.2] cursor-pointer transition-all duration-[500ms] ${
                        showOptionProvincia ? "block" : "hidden"
                     }`}
                     onClick={() =>
                        arrayProvincias.length > 0 ? setTab(2) : setTab(1)
                     }
                  >
                     Provincia
                  </div>
               </section>
               {codRegion && (
                  <section className="w-full px-4 py-2  flex gap-4">
                     {codRegion && (
                        <div
                           className="flex items-center bg-gray-100 text-gray-700 rounded gap-2 px-2 cursor-pointer"
                           onClick={() => handleClick(codRegion)}
                        >
                           <p>
                              {buscarDepartamentoPorIdConvertToInt(
                                 sites.departamentos,
                                 codRegion.toLocaleString()
                              )}
                           </p>
                           <div>
                              <FaXmark />
                           </div>
                        </div>
                     )}
                     {codRegion && codProvincia && (
                        <div
                           className="flex items-center bg-gray-100 text-gray-700 rounded gap-2 px-2 cursor-pointer"
                           onClick={() => handleClickProvincia(codProvincia)}
                        >
                           <p>
                              {SearchProvinciaConverToInt(
                                 codRegion.toString(),
                                 codProvincia.toString()
                              )}
                           </p>
                           <div>
                              <FaXmark />
                           </div>
                        </div>
                     )}
                  </section>
               )}
               <section
                  className={`overflow-y-auto  p-4 pt-2 ${
                     tab === 1 ? "flex" : "hidden"
                  } flex-col `}
               >
                  {regiones.map((d) => (
                     <div
                        key={d.id}
                        onClick={() => handleClick(parseInt(d.id))}
                        className={`${
                           codRegion === parseInt(d.id)
                              ? "bg-p-mmc text-white"
                              : "text-gray-500"
                        } cursor-pointer border-b-[1px] border-gray-300 py-2 pl-2 rounded`}
                     >
                        <div>{d.name}</div>
                     </div>
                  ))}
               </section>
               <section
                  className={`overflow-y-auto lg:min-w-[280px] p-4 pt-2 ${
                     tab === 2 ? "flex" : "hidden"
                  } flex-col `}
               >
                  {arrayProvincias.map((p) => (
                     <div
                        key={p.id}
                        onClick={() => handleClickProvincia(parseInt(p.id))}
                        className={`${
                           codProvincia === parseInt(p.id)
                              ? "text-white bg-p-mmc"
                              : "text-gray-500"
                        }  cursor-pointer border-b-[1px] border-gray-300 py-2 pl-2 rounded`}
                     >
                        <div>{p.name}</div>
                     </div>
                  ))}
               </section>
            </article>
         </Popover>
      </>
   );
};

export default SitesModal;
