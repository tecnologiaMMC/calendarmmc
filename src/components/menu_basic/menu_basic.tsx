"use client";

import logo from "@img/logommc.png";
import Link from "next/link";
import "./style.css";
import { useState } from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import ButonMenuBasic from "./buton_menu_basic";

export default function MenuBasic() {
   const [isOpen, setIsOpen] = useState(false);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   const iniciarSession = () => {
      window.open("https://sesion.eventosdemarinera.com/", "_blank");
   };

   const whats = () => {
      window.open("https://wa.me/954109568", "_blank");
   };

   return (
      <>
         <div className="w-full fixed z-30 flex flex-col items-center justify-center gap-2 h-[80px] sm:h-[70px] bg-p-mmc sm:flex-row sm:justify-between ">
     {/* <div className="w-full fixed z-30 flex flex-col items-center justify-start  gap-2 h-[125px] md:h-[70px] bg-p-mmc md:flex-row md:justify-between "> */}
            <Link
               href="/calendario"
               className="w-[200px] self-center  sm:ml-[5%] "
            >
               <img
                  className="w-full h-full object-contain"
                  src={logo.src}
                  alt="logo"
               />
            </Link>
            <ButonMenuBasic/>
         </div>
      </>
   );
}
