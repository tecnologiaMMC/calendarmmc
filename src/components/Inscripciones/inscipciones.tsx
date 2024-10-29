import { useState } from "react";
import Registrations from "../registrations/resgistrations";
import VerifyInscription from "./verify_inscripcion";
import FormasPago from "./FormasPago";

const Inscripciones = ({
   categories,
   modalities,
   event,
   bases
}: {
   categories: Category[];
   modalities: Modality[];
   event: DetailEvent;
   bases:Bases|null|undefined;
}) => {
   const [tab, setTab] = useState(1);

   const handleClick = (t: number) => {
      setTab(t);
   };

   return (
      <div className="w-full flex flex-col">
         <section className="w-full flex text-[14px] md:text-[18px]">
            <div
               className={`transition duration-300  ${
                  tab == 1 ? "bg-s-mmc" : "bg-gray-300"
               }  flex-1 text-center   text-white rounded-t-xl p-[5px] leading-[1.1]  md:p-[10px] cursor-pointer`}
               onClick={() => handleClick(1)}
            >
               1. Precios y formas de pago
            </div>
            <div
               className={`transition duration-300  ${
                  tab == 2 ? "bg-s-mmc" : "bg-gray-300"
               }  flex-1 text-center text-white rounded-t-xl  p-[5px]  leading-[1.1] md:p-[10px] cursor-pointer`}
               onClick={() => handleClick(2)}
            >
               2. Registra tu inscripción
            </div>
            <div
               className={`transition duration-300  ${
                  tab == 3 ? "bg-s-mmc" : "bg-gray-300"
               }  flex-1 text-center    text-white rounded-t-xl  p-[5px] leading-[1.1] md:p-[10px] cursor-pointer`}
               onClick={() => handleClick(3)}
            >
               3. Verifica tu inscripción
            </div>
         </section>
         <section className="w-full pt-12 pb-8  min-h-[350px]">
            {tab==1&&(
               <FormasPago cod_evento={event.cod_concurso} cod_org={event.Organizadores_cod_organizador} modalities={modalities} metodo_pago={bases?.metodo_pago}/> 
            )

            }
            {tab == 2 && (
               <Registrations
                  categories={categories}
                  modalities={modalities}
                  event={event}
               />
            )}
            {tab == 3 && (
                <VerifyInscription categories={categories}
                modalities={modalities}
                event={event}/>
            )}
         </section>
      </div>
   );
};

export default Inscripciones;
