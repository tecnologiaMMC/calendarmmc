import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import DatesRange from "./date-range";
import { FaRegCalendarCheck, FaRegCircleXmark } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { TbCircleNumber1Filled } from "react-icons/tb";
import { TbNumber1 } from "react-icons/tb";

interface FilterDatesProps {
   setSelectedRange: Dispatch<SetStateAction<DateRange<Dayjs>>>;
   selectedRange: DateRange<Dayjs>;
   showFilter: Boolean;
}

const PopoverDates: React.FC<FilterDatesProps> = ({
   setSelectedRange,
   selectedRange,
   showFilter,
}) => {
   const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
   const [texto, setTexto] = React.useState<string>("Fecha");

   const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);
   const id = open ? "simple-popover" : undefined;
   const clean = (event: React.MouseEvent) => {
      event.stopPropagation();
      setSelectedRange([null, null]);
      setTexto("Fecha");
   };
   return (
      <>
         <div
            className={`flex flex-col items-center cursor-pointer transition-colors !duration-[400ms] ${
               showFilter
                  ? selectedRange[0] && selectedRange[1]
                     ? "text-white"
                     : "text-gray-500"
                  : "text-p-mmc"
            } ${
               selectedRange[0] && selectedRange[1]
                  ? "md:text-white"
                  : "md:text-gray-500"
            }`}
            onClick={handleClick}
         >
            <div className="w-8 h-8 relative">
               <FaRegCalendarCheck className="w-full h-full p-[5px]" />
               {selectedRange[0] && selectedRange[1] && (
                  <div className="absolute w-4 h-4 top-[0] rounded-full bg-red-500 right-[-12px] p-[2px]">
                     <TbNumber1 className="w-full h-full  text-white" />
                  </div>
               )}
            </div>
            <p className="text-[12px] leading-[1]">Fechas</p>
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
            <div className="flex flex-col items-center">
               <div className="bg-p-mmc w-full flex relative sm:hidden justify-between  text-gray-500 ">
                  <div className="absolute top-[25px] right-[25px] w-9 h-9 ">
                     <FaXmark
                        onClick={() => handleClose()}
                        className="cursor-pointer w-full h-full"
                     />
                  </div>
               </div>
               <DatesRange
                  selectedRange={selectedRange}
                  setSelectedRange={setSelectedRange}
                  setTexto={setTexto}
                  handleClose={handleClose}
               />
            </div>
         </Popover>
      </>
   );
};

export default PopoverDates;
