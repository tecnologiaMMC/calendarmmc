"use client";

import "./features.css";

import { Event } from "@/libs/types";
import CardEvent from "../card_event/card_event";
interface EventListProps {
   events: Event[] | undefined;
}
import desktop from "@img/desktopS.jpg";
import movil from "@img/desktopS.jpg";
import { FaStar } from "react-icons/fa6";

const FeaturesEvents: React.FC<EventListProps> = ({ events }) => {
   const whats = () => {
      window.open("https://wa.link/bfgqc4", "_blank");
   };

   return (
      <div className="w-full max-w-[1400px]  gap-4 flex flex-col items-center ">
         <div className="flex items-center justify-start w-[90%]">
            {/* <i className="fa-solid fa-star text-[22px] md:text-[30px] text-s-mmc mt-[3.5px] sm:mt-[6px] mr-[5px] "></i> */}
            <FaStar className="w-[22px] h-[22px] md:w-[35px] md:h-[35px] text-s-mmc mt-[3.5px] sm:mt-[6px] mr-[5px] " />{" "}
            <h2 className="text-[27px] md:text-[40px] text-p-mmc">
               <b className="leading-[1]">Eventos destacados</b>
            </h2>
         </div>

         <article className="w-[90%] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {events &&
               events.map((e, index) => <CardEvent key={index} event={e} />)}

            {/* <section
               className="w-full   rounded overflow-hidden relative customH"
               onClick={whats}
            >
               <img
                  className="w-full h-full object-cover desktop-"
                  src={desktop.src}
                  alt=""
               />
               <img
                  className="w-full h-full object-cover movil-"
                  src={movil.src}
                  alt=""
               />

               <div className="w-full top-0 absolute items-start flex flex-col  h-full justify-evenly cursor-pointer">
                  <h2 className="custom-text-outline text-start">
                     Tu concurso, <br />
                     ensayo con banda <br />u otro, con mucho más <br />
                     visibilidad <br />
                     AQUÍ en EVENTOS <br />
                     Destacados{" "}
                  </h2>
                  <div className="publi-textos">
                     <p className="text-outline text-start">
                        • Más de 3000 visitas mensuales
                     </p>
                     <p className="text-outline text-start">
                        • Más de 300 eventos en el Perú
                     </p>
                  </div>
                  <div className="conten-button self-center">
                     <p className="rounded-xl boton-publicidad">
                        Quiero mi evento Aquí
                     </p>
                  </div>
               </div>
            </section> */}
            <section
               className="w-full  rounded overflow-hidden relative min-h-[290px]"
               onClick={whats}
            >
               <img
                  className="w-full h-full md:max-h-[382px] object-cover"
                  src={desktop.src}
                  alt=""
               />
               <div className="w-full top-0 absolute items-start flex flex-col  h-full justify-evenly cursor-pointer">
                  <h2 className="custom-text-outline text-start">
                     Tu concurso, <br />
                     ensayo con banda <br />u otro, con mucho más <br />
                     visibilidad <br />
                     AQUÍ en EVENTOS <br />
                     Destacados{" "}
                  </h2>
                  <div className="publi-textos">
                     <p className="text-outline text-start">
                        • Más de 3000 visitas mensuales
                     </p>
                     <p className="text-outline text-start">
                        • Más de 300 eventos en el Perú
                     </p>
                  </div>
                  <div className="bg-s-mmc text-white text-[14px] sm:text-[18px] self-center rounded-2xl px-2  pb-[3px]">
                        Quiero mi evento Aquí
                  </div>
               </div>
            </section>
         </article>
      </div>
   );
};
export default FeaturesEvents;
