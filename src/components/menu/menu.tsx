"use client";

import logo from "@img/logommc.png";
import Link from "next/link";
import "./style.css";
import { useState } from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";

export default function Menu() {
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
            {/* <div className="w-full fixed z-30 flex items-center justify-center h-[100px] bg-p-mmc  sm:h-[70px]"> */}
            <Link href="/calendario" className="w-[200px] self-center  sm:ml-[5%] ">
               <img
                  className="w-full h-full object-contain"
                  src={logo.src}
                  alt="logo"
               />
            </Link>
            <div className="hidden sm:flex text-white gap-5 sm:mr-[5%]">
               <button className="buton_register w-[130px]" onClick={whats}>
                  Registrar Evento
               </button>
               <button
                  className="buton_into w-[130px]"
                  onClick={iniciarSession}
               >
                  Ingresar
               </button>
            </div>
         </div>
         <div className="z-[1000] block sm:hidden">
            <div
               className={`fixed top-0 left-0 w-64 h-full bg-p-mmc p-4 z-20 transition-transform transform ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
               }`}
            >
               <div className="mt-16 space-y-6  text-white w-full">
                  <div
                     className="w-full bg-[#4E2B54] p-2 rounded-[8px] pl-4 text-[20px] cursor-pointer"
                     onClick={iniciarSession}
                  >
                     <p>Iniciar sesión</p>
                  </div>
                  <div
                     className="w-full bg-[#4E2B54] p-2 rounded-[8px] pl-4 text-[20px] cursor-pointer"
                     onClick={whats}
                  >
                     <p>Registrar Evento</p>
                  </div>
               </div>
               <div className="absolute flex justify-center  w-[87%] bottom-16 ">
                  <div className="w-[150px] opacity-25">
                     <img
                        className="w-full h-full object-contain"
                        src={logo.src}
                        alt="logo"
                     />
                  </div>
               </div>
            </div>

            {/* Overlay (fondo oscuro cuando el menú está abierto) */}
            {isOpen && (
               <div
                  className="fixed inset-0 bg-gray-100 opacity-15"
                  onClick={toggleMenu}
               />
            )}

            <button
               className="fixed top-[16px] right-4 z-20 flex items-center justify-center w-12 h-12 bg-[#4E2A53] rounded-full focus:outline-none"
               onClick={toggleMenu}
            >
               <svg
                  className="w-6 h-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  {isOpen ? (
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                     />
                  ) : (
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                     />
                  )}
               </svg>
            </button>
         </div>
      </>
   );
}
{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg> */}
