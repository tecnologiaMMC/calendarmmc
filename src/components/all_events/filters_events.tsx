import sites from "@/utils/sites";
import { useEffect, useRef, useState } from "react";
import Select, { SelectInstance } from "react-select";
import React, { Dispatch, SetStateAction } from "react";
import { Event, Provincia } from "@/libs/types";
import { TextField } from "@mui/material";
import BasicPopover from "./fiter_date";
import Link from "next/link";
import { styled } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import PopoverDates from "./pop_over_dates";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);


const style_filter_select = {
   placeholder: (provided: any) => ({
      ...provided,
      // color: "#45204b",
      marginLeft: "8px",
      textAlign: "start",
      "@media (min-width: 640px)": {
         textAlign: "center", // Ajuste para pantallas sm (640px) o más grandes
      },
   }),
   singleValue: (provided: any) => ({
      ...provided,
      color: "#45204b",
      textAlign: "start",

      // marginLeft: "73px",
   }),
   menu: (styles: any) => ({
      ...styles,
      zIndex: 500,
   }),
};

interface MyComponentProps {
   setEventsShow: Dispatch<SetStateAction<Event[]>>;
   eventsBackup: Event[];
   eventsShow: Event[];
   setCurrentPage: Dispatch<SetStateAction<number>>;
}
const typesEvents = [
   {
      cod_tipo: "2",
      nombre: "Concurso",
   },
   {
      cod_tipo: "4",
      nombre: "Ensayo con banda",
   },
   {
      cod_tipo: "3",
      nombre: "Coronación",
   },
   {
      cod_tipo: "1",
      nombre: "Celebraciones",
   },
   {
      cod_tipo: "6",
      nombre: "Sorteos",
   },
   {
      cod_tipo: "7",
      nombre: "Charlas y capacitaciones",
   },
];

const FilterEvents: React.FC<MyComponentProps> = ({
   setEventsShow,
   eventsBackup,
   eventsShow,
   setCurrentPage,
}) => {
   const [isFocused, setIsFocused] = useState(false);
   const [codTypeEvent, setCodTypeEvent] = useState<string>("");
   const [codDepartament, setCodDepartament] = useState<string>("");
   const [codProvincia, setCodProvincia] = useState<string>("");
   const [provinces, setProvinces] = useState<Provincia[]>([]);
   const [searchNameEvent, setSearchNameEvent] = useState<string>("");
   const refProvince = React.useRef<SelectInstance | null>(null);
   const [dateStart, setDateStart] = useState<string>(
      new Date().toISOString().split("T")[0]
   );
   const [dateEnd, setDateEnd] = useState<string>(
      new Date().toISOString().split("T")[0]
   );
   const [selectedRange, setSelectedRange] = React.useState<DateRange<Dayjs>>([
      null,
      null,
   ]);

   const [numberRandom, setNumberRandom] = useState<number>(0);

   const [texto, setTexto] = useState<string>("Fecha");

   const changeTexto = (texto: string) => {
      setTexto(texto);
   };

   const changeDate = (): void => {
      let numeroAleatorio = Math.floor(Math.random() * 10000) + 1;
      setNumberRandom(numeroAleatorio);
      setCurrentPage(1);
   };

   const cleanDates = (): void => {
      setNumberRandom(0);
      setCurrentPage(1);
      changeTexto("Fecha");
   };

   // useEffect(() => {
   //    if (localStorage.getItem("userDepartment")) {
   //       const dep = sites.departamentos;
   //       const userDepartament = localStorage.getItem("userDepartment");
   //       let [busqueda] = dep.filter(
   //          (d) => d.name.toLowerCase() === userDepartament?.toLowerCase()
   //       );
   //       if(busqueda){
   //          setCodDepartament(busqueda.id)
   //       }
   //    }
   // }, []);

   useEffect(() => {
      let eventosFilter = [...eventsBackup];

      if (codTypeEvent) {
         eventosFilter = eventosFilter.filter((event) => {
            return event.tipos_evento_cod_tipo === parseInt(codTypeEvent);
         });
      }
      if (codDepartament) {
         eventosFilter = eventosFilter.filter(
            (event) => event.departamento == codDepartament
         );
      }
      if (codProvincia) {
         eventosFilter = eventosFilter.filter(
            (event) => event.provincia == codProvincia
         );
      }

      if (selectedRange) {
         const [start, end] = selectedRange;
         if (start && end) {
            // Convert start and end to dayjs instances
            const startDate = dayjs(start);
            const endDate = dayjs(end);

            // Filter events based on the date range
            eventosFilter = eventosFilter.filter((evento) => {
               const fechaEvento = dayjs(evento.fecha);
               return (
                  fechaEvento.isSameOrAfter(startDate, "day") &&
                  fechaEvento.isSameOrBefore(endDate, "day")
               );
            });
         }
      }
      setEventsShow(eventosFilter);
      setCurrentPage(1);
   }, [codTypeEvent, codDepartament, codProvincia, selectedRange]);

   useEffect(() => {
      let eventosFilter = [...eventsBackup];
      setCurrentPage(1);
      if (searchNameEvent.length >= 1) {
         eventosFilter = eventosFilter.filter((e) =>
            e.nombre_concurso
               .toLowerCase()
               .includes(searchNameEvent.toLowerCase())
         );
         setEventsShow(eventosFilter);
      }
      setEventsShow(eventosFilter);
   }, [searchNameEvent]);

   const theme = useTheme();
   const isSmallScreen = useMediaQuery(theme.breakpoints.down(640));
   const selectedOption = sites.departamentos.find(dep => dep.id.toString() === codDepartament);
   return (
      <div className="w-full sm:w-[90%] max-w-[1400px] relative flex flex-col mt-[30px] sm:mt-[20px] mb-[30px] sm:mb-[40px] px-[0px] sm:px-[32px]  pt-[20px] sm:pb-[20px] rounded-[10px] outline outline-1 outline-white sm:outline-p-mmc">
         {/* <div className="text-[25px] ml-[5%] sm:ml-[0] absolute top-[-12px] sm:top-[-24px]  bg-[white] text-p-mmc">
            Filtros
         </div> */}
         <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-[0px]   sm:gap-8  md:gap-12">
            <div className="bg-red-200 ">
               <Select
                  styles={style_filter_select}
                  className="basic-single text-center"
                  classNamePrefix="select"
                  placeholder="Tipo de evento"
                  isDisabled={false}
                  isClearable={true}
                  isSearchable={true}
                  name="typeEvent"
                  options={typesEvents.map((tipo) => ({
                     label: tipo.nombre,
                     value: tipo.cod_tipo,
                  }))}
                  onChange={(options) =>
                     !options
                        ? setCodTypeEvent("")
                        : setCodTypeEvent(options.value)
                  }
               />
            </div>
            <div className="bg-red-200 ">
               <Select
                  className="basic-single text-center"
                  styles={style_filter_select}
                  classNamePrefix="select"
                  placeholder="Región"
                  isDisabled={false}
                  isClearable={true}
                  isSearchable={true}
                  name="departament"
                  options={sites.departamentos.map((dep) => ({
                     label: dep.name,
                     value: dep.id,
                  }))}
                  value={selectedOption ? { label: selectedOption.name, value: selectedOption.id } : null}
                  onChange={(options) => {
                     if (!options) {
                        refProvince.current?.clearValue();
                        setCodDepartament("");
                        setProvinces([]);
                     } else {
                        setCodDepartament(options.value);
                        setProvinces(
                           sites.provincias.filter(
                              (p) => p.department_id == options.value
                           )
                        );
                     }
                  }}
               />
            </div>
            <div className="bg-red-200 ">
               <Select
                  styles={style_filter_select}
                  className="basic-single text-center"
                  classNamePrefix="select"
                  placeholder="Provincia"
                  ref={refProvince}
                  isDisabled={false}
                  isClearable={true}
                  isSearchable={true}
                  options={provinces.map((city) => ({
                     label: city.name,
                     value: city.id,
                  }))}
                  onChange={(options: any) => {
                     if (!options) {
                        setCodProvincia("");
                     } else {
                        setCodProvincia(options.value);
                     }
                  }}
               />
            </div>
            <div className="bg-white ">
               <TextField
                  label="Nombre del evento"
                  className={`w-full `}
                  size="small"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  sx={{
                     "& .MuiInputBase-root": {
                        height: "38px",
                     },
                     "& .MuiInputLabel-root": {
                        color: "#989894",
                        "&.Mui-focused": {
                           color: "#45204b",
                           marginTop: "-3px",
                           fontSize: "19px !important",
                        },
                        height: "38px",
                        textAlign: "center",
                        // fontFamily: sansita.style.fontFamily,
                        marginTop: "-2px",
                     },
                     "& .MuiOutlinedInput-root": {
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                           borderColor: "#45204b",
                        },
                     },
                  }}
                  onChange={(e) => setSearchNameEvent(e.target.value)}
                  InputLabelProps={{
                     style: !isSmallScreen
                        ? {
                             paddingLeft: isFocused
                                ? "0"
                                : searchNameEvent
                                ? "0"
                                : "15%",
                          }
                        : {},
                  }}
               />
            </div>
            <div className="bg-white flex justify-center items-center outline outline-1 outline-gray-400 rounded-[3px] h-[36px] mt-[1px] relative">
               {/* <PopoverDates
                  setSelectedRange={setSelectedRange}
                  selectedRange={selectedRange}
               /> */}
            </div>
         </div>
      </div>
   );
};
export default FilterEvents;
