import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import { Sansita } from "next/font/google";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import DatesRange from "./date-range";
import { FaRegCircleXmark } from "react-icons/fa6";

const sansita = Sansita({
   weight: ["400", "700", "800", "900"],
   subsets: ["latin-ext"],
});

interface FilterDatesProps {
   setSelectedRange: Dispatch<SetStateAction<DateRange<Dayjs>>>;
   selectedRange: DateRange<Dayjs>;
}

const PopoverDates: React.FC<FilterDatesProps> = ({
   setSelectedRange,
   selectedRange,
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
      <div className="bg-white w-full h-full">
         <div
            aria-describedby={id}
            className=" rounded cursor-pointer text-gray-500 flex justify-between sm:justify-around  items-center bg-red w-full h-full px-[14px]"
            onClick={handleClick}
         >
            <p>{texto}</p>
            {selectedRange[0] && selectedRange[1] && (
               // <i
               //    onClick={clean}
               //    className="fa-regular fa-circle-xmark  text-gray-600 mt-[2px]  text-[20px] "
               // ></i>
               <FaRegCircleXmark onClick={clean}  className="text-gray-600 mt-[2px] h-[20px]"/>
            )}
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
         >
            <div >
               <DatesRange
                  selectedRange={selectedRange}
                  setSelectedRange={setSelectedRange}
                  setTexto={setTexto}
                  handleClose={handleClose}
               />
            </div>
         </Popover>
      </div>
   );
};

export default PopoverDates;
