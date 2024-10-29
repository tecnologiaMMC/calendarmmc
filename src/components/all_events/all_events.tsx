"use client";

import { Event } from "@/libs/types";
import CardEvent from "../card_event/card_event";
import { useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import Select from "react-select";
import FilterEvents from "./filters_events";
const CustomPagination = styled(Pagination)(({ theme }) => ({
   "& .MuiPaginationItem-root": {
      fontSize: "18px", // Cambia el tamaño del texto
      width: "35px", // Ajusta el tamaño del contenedor
      height: "35px", // Ajusta el tamaño del contenedor
      borderRadius: "50%", // Hace que el contenedor sea circular
      "&:hover": {
         backgroundColor: "#c22343",
         color: "white",
         // Cambia el color según tus necesidades
      },
   },
   "& .Mui-selected": {
      backgroundColor: "#45204b !important", 
      color: "white", // Cambiar el color del texto si es necesario
      "&:hover": {
         backgroundColor: "#c22343", // Cambia el color según tus necesidades
         color: "white",
      },
   },
}));

interface EventListProps {
   events: Event[];
}
const AllEvents: React.FC<EventListProps> = ({ events }) => {
   const [eventsBackup, setEventsBackup] = useState<Event[]>(events);
   const [eventsShow, setEventsShow] = useState<Event[]>(events);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 16;
   const lastIndex = currentPage * itemsPerPage;
   const firstIndex = lastIndex - itemsPerPage;
   const currentItems = eventsShow.slice(firstIndex, lastIndex);

   const handlePageChange = (e: any, value: any) => {
      setCurrentPage(value);
   };

   return (
      <div className="w-full flex flex-col items-center justify-start  max-w-[1400px] ">
         
         <FilterEvents setEventsShow={setEventsShow} eventsShow={eventsShow} eventsBackup={eventsBackup} setCurrentPage={setCurrentPage}/>

         <div className="w-[90%] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 min-h-[400px]">
            {currentItems.map((e, index) => (
               <CardEvent key={index} event={e} />
            ))}
         </div>
         <div className="m-8">
            <CustomPagination
               count={Math.ceil(eventsShow.length / itemsPerPage)}
               page={currentPage}
               onChange={handlePageChange}
               color="primary"
            />
         </div>
      </div>
   );
};
export default AllEvents;
