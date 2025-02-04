// import * as React from 'react';
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import { DatesFiltro } from "@/libs/types";
import { useTheme } from '@mui/material/styles';


import {
   eventsMonth,
   eventsToday,
   eventsWeek,
} from "@/utils/functions_getDates";

interface FilterDatesProps {
   setDateStart: Dispatch<SetStateAction<string>>;
   setDateEnd: Dispatch<SetStateAction<string>>;
   changeDate: () => void;
   cleanDates: () => void;
   changeTexto: (texto: string) => void;
   texto: string;
}

const BasicPopover: React.FC<FilterDatesProps> = ({
   setDateStart,
   setDateEnd,
   changeDate,
   cleanDates,
   changeTexto,
   texto,
}) => {
   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
      null
   );
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);
   const id = open ? "simple-popover" : undefined;

   const handleClickToday = () => {
      let getDatesForFiltro: DatesFiltro = eventsToday();
      setDateStart(getDatesForFiltro.dateStart);
      setDateEnd(getDatesForFiltro.dateEnd);
      changeDate();
      handleClose();
      changeTexto("hoy");
   };
   const handleClickWeek = () => {
      let getDatesForFiltro: DatesFiltro = eventsWeek();
      setDateStart(getDatesForFiltro.dateStart);
      setDateEnd(getDatesForFiltro.dateEnd);
      changeDate();
      handleClose();
      changeTexto("Esta semana ");
   };
   const handleClickMonth = () => {
      let getDatesForFiltro: DatesFiltro = eventsMonth();
      setDateStart(getDatesForFiltro.dateStart);
      setDateEnd(getDatesForFiltro.dateEnd);
      changeDate();
      handleClose();
      changeTexto("Este Mes");
   };
   const fechaInicial = (e: ChangeEvent<HTMLInputElement>) => {
      setDateStart(e.target.value);
      setDateEnd(e.target.value);
   };
   const fechaFinal = (e: ChangeEvent<HTMLInputElement>) => {
      setDateEnd(e.target.value);
   };

   /**cambio de fecha  */
   const aplicar = () => {
      changeDate();
      handleClose();
   };
   const theme = useTheme();
   return (
      <div className="bg-white w-full h-full">
         <Button
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
            sx={{
               width: "100% ",
               fontSize: "16px",
               lineHeight: "1.5",
               color: "#949494",
               backgroundColor: "white",
               textTransform: "none",
               "&:hover": {
                  backgroundColor: "white",
               },
               // fontFamily: sansita.style.fontFamily,
               [theme.breakpoints.down(640)]: {
                  display: 'flex',
                  justifyContent: 'flex-start',
                  textAlign: 'start',
                },
            }}
         >
            {texto}
         </Button>

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
         >
            <div className="w-[320px] sm:w-[360px] md:w-[410px]  bg-gray-200 flex flex-col items-center p-4 gap-[25px]">
               <div className="w-full grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-[5px]">
                  <div
                     className="bg-white text-p-mmc text-center rounded-[4px] py-[3px] cursor-pointer hover:bg-p-mmc hover:text-white"
                     onClick={handleClickToday}
                  >
                     Hoy
                  </div>
                  <div
                     className="bg-white text-p-mmc text-center rounded-[4px] py-[3px] cursor-pointer hover:bg-p-mmc hover:text-white"
                     onClick={handleClickWeek}
                  >
                     Esta semana
                  </div>
                  <div
                     className="bg-white text-p-mmc text-center rounded-[4px] py-[3px] cursor-pointer hover:bg-p-mmc hover:text-white"
                     onClick={handleClickMonth}
                  >
                     Este mes
                  </div>
               </div>
               <div className=" w-full flex justify-between">
                  <TextField type="date" size="small" onChange={fechaInicial} />
                  <TextField type="date" size="small" onChange={fechaFinal} />
               </div>
               <div
                  className="bg-p-mmc text-white w-[150px] text-center rounded p-[4px] cursor-pointer hover:bg-s-mmc"
                  onClick={aplicar}
               >
                  Aplicar
               </div>
            </div>
         </Popover>
      </div>
   );
};

export default BasicPopover;
