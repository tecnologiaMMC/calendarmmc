import concurso from "@img/img_types_event/concurso.jpg";
import celebration from "@img/img_types_event/aniversario.jpg";
import corona from "@img/img_types_event/coronacion.jpg";
import ensayo from "@img/img_types_event/ensayo.jpg";
import sorteo from "@img/img_types_event/sorteo.jpg";
import solidario from "@img/img_types_event/solidario.jpg";
import charla from "@img/img_types_event/charla.jpg";
import defaultimg from "@img/img_types_event/solidario.jpg";
import IconEvent from "./icon_event";
import { TypeEvent } from "@/libs/types";
import typesEvents from "@/utils/types_events";
import { SearchProvincia } from "@/utils/search_site";
import { useEffect, useState } from "react";
import { Roboto } from "next/font/google";
import "./profile.css";
import { Tooltip } from "@mui/material";
import Alert from "@mui/material/Alert";
import { FaShareNodes } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const typesE: TypeEvent[] = [
   {
      cod_type: "2",
      name: "Concurso",
   },
   {
      cod_type: "4",
      name: "Ensayo con banda",
   },
   {
      cod_type: "3",
      name: "Coronación",
   },
   {
      cod_type: "1",
      name: "Celebraciones",
   },
   {
      cod_type: "6",
      name: "Sorteos",
   },
   {
      cod_type: "7",
      name: "Charlas y capacitaciones",
   },
];
export const getNameTypeEvent = (cod: number): string => {
   let filtro: TypeEvent[] = typesE.filter(
      (t) => t.cod_type === cod.toString()
   );
   return filtro[0].name;
};
const roboto = Roboto({
   weight: ["100", "300", "400", "500", "700", "900"],
   subsets: ["latin-ext"],
});

const ProfileEvent = ({
   event,
   cont,
   changeTab,
   tabSelect,
   showFilter,
}: {
   event: DetailEvent | any;
   cont: number;
   changeTab: (n: number) => void;
   tabSelect: number;
   showFilter: Boolean;
}) => {
   const [urlImg, setUrlImg] = useState<string>(defaultimg.src);

   const [showAlert, setShowAlert] = useState<any>(false);

   const copiarEnlace = (cod: string, slug: string) => {
      let filtro = typesEvents.filter((t) => t.cod_type == cod);

      navigator.clipboard.writeText(
         `https://mimarinera.com/calendario/${filtro[0].name}/${slug}`
      );
      setShowAlert(true);
      setTimeout(() => {
         setShowAlert(false);
      }, 1500);
   };

   useEffect(() => {
      if (!event) {
         setUrlImg(solidario.src);
         return;
      } else if (event.tipos_evento_cod_tipo == 1) {
         setUrlImg(celebration.src);
      } else if (event.tipos_evento_cod_tipo == 2) {
         setUrlImg(concurso.src);
      } else if (event.tipos_evento_cod_tipo == 3) {
         setUrlImg(corona.src);
      } else if (event.tipos_evento_cod_tipo == 4) {
         setUrlImg(ensayo.src);
      } else if (event.tipos_evento_cod_tipo == 6) {
         setUrlImg(sorteo.src);
      } else if (event.tipos_evento_cod_tipo == 7) {
         setUrlImg(charla.src);
      }
   }, [event?.tipos_evento_cod_tipo]);

   return (
      <section className="w-full">
         <article
            className={`w-full relative flex flex-col justify-center items-center  transition-all duration-[400ms] ease-in-out ${
               showFilter ? "mt-[117px]" : "mt-[80px]"
            } md:mt-[70px]  h-[320px]`}
         >
            <img className="object-cover w-full h-full" src={urlImg} alt="" />
            {/* <div className="absolute flex flex-col items-center bg-red-200 gap-[10px] text-[30px] md:text-[50px] text-center leading-[1] text-white"> */}
            <div className="absolute self-center flex flex-col items-center  gap-[5px] md:gap-[10px] text-[25px] md:text-[40px] lg-[50px] text-center leading-[1] text-white">
               <p>
                  {event?.tipos_evento_cod_tipo
                     ? getNameTypeEvent(event.tipos_evento_cod_tipo)
                     : "Cargando...."}
               </p>
               <h1 className="uppercase text-[35px] md:text-[45px] lg:text-[60px]">
                  {event?.nombre_concurso
                     ? event.nombre_concurso
                     : "Cargando...."}
               </h1>
               <p>
                  {event?.departamento && event?.provincia
                     ? SearchProvincia(event.departamento, event.provincia)
                     : "Cargando"}
               </p>
               <div className="flex items-center justify-center  gap-2 text-[16px] block lg:hidden">
                  <IoEyeOutline />
                  <p className="">{cont}</p>
               </div>
            </div>
            <div className="absolute lg:hidden w-full  flex justify-between px-4 sm:px-8 sm:px-12 top-[20px]   text-white ">
               <div className="flex items-center justify-center  rounded-full h-7 w-7  bg-white text-gray-700 mt-2 ">
                  <Link href="/calendario">
                     <IoIosArrowBack />
                  </Link>
               </div>
               <div
                  className="flex relative  items-center justify-center gap-2   rounded py-2"
                  onClick={() =>
                     copiarEnlace(
                        event.tipos_evento_cod_tipo.toString(),
                        event.slug
                     )
                  }
               >
                  <IoShareSocialOutline />
                  <p className="mb-[2.9px]">Compartir</p>

                  {showAlert && (
                     <div className=" w-[170px] h-[40px] bg-transparent  absolute top-[40px] right-[30px]">
                        <Alert
                           variant="filled"
                           severity="success"
                           className="p-[0] text-center justify-center w-[100%]"
                        >
                           Enlace copiado
                        </Alert>
                     </div>
                  )}
               </div>
            </div>
            {/* <div className="absolute lg:hidden w-full  flex justify-center px-4 sm:px-8 sm:px-12 bottom-[48px]   text-white ">
               
            </div> */}
         </article>

         <article className="w-full bg-white  px-[2%] md:px-[5%] flex flex-col lg:flex-row lg:gap-10">
            <section className="flex-1  w-full flex flex-col items-center lg:flex-row  relative ">
               <div className="w-[110px] h-[55px] lg:w-[120px] lg:h-[65px] absolute lg:relative flex justify-center  ">
                  <IconEvent cod_type_event={event?.tipos_evento_cod_tipo} />
               </div>
               <div className="flex-1  w-full hidden lg:flex lg:pl-[15px]  mt-[55px] lg:mt-[0] max-h-[50px] mb-[20px] sm:mb-[0] lg:max-h-none items-end text-gray-700">
                  <div className="flex-1 lg:flex-none w-[60%] ">
                     <p className="truncate">
                        <b>
                           {event?.nombre_org
                              ? event.nombre_org
                              : "Cargando...."}
                        </b>
                     </p>
                     <p>Organización</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center">
                     <p>{cont}</p>
                     <p>Visitas</p>
                  </div>
                  <div className="flex-1 flex flex-col items-end justify-center ">
                     <div
                        className="flex  h-full flex-col items-center justify-center mt-[5px] cursor-pointer  relative"
                        onClick={() =>
                           copiarEnlace(
                              event.tipos_evento_cod_tipo.toString(),
                              event.slug
                           )
                        }
                     >
                        <FaShareNodes />
                        <p>Compartir</p>
                        {showAlert && (
                           <div className=" w-[170px] h-[40px] bg-transparent   absolute top-[40px] right-[30px]">
                              <Alert
                                 variant="filled"
                                 severity="success"
                                 className="p-[0] text-center justify-center w-[100%]"
                              >
                                 Enlace copiado
                              </Alert>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <div className="bg-white flex lg:hidden w-full h-14"></div>
            </section>

            {event?.tipos_evento_cod_tipo == 1 && (
               <section className="flex-1 w-full  flex justify-between items-center  text-[14px]  md:text-[16px] gap-2 md:gap-4">
                  <div
                     className={`py-2 flex-1 text-center border-b-2 border-celebration ${roboto.className}`}
                  >
                     DETALLES
                  </div>
               </section>
            )}
            {event?.tipos_evento_cod_tipo == 3 && (
               <section className="flex-1 w-full  flex justify-between items-center  text-[14px]  md:text-[16px] gap-2 md:gap-4">
                  <div
                     className={`py-2 flex-1 text-center border-b-2 border-coronation  ${roboto.className}`}
                  >
                     DETALLES
                  </div>
               </section>
            )}
            {event?.tipos_evento_cod_tipo == 4 && (
               <section className="flex-1 w-full  flex justify-between items-center  text-[14px]  md:text-[16px] gap-2 md:gap-4">
                  <div
                     className={`py-2 flex-1 text-center border-b-2 border-s-mmc ${roboto.className}`}
                  >
                     DETALLES
                  </div>
               </section>
            )}
            {event?.tipos_evento_cod_tipo == 6 && (
               <section className="flex-1 w-full  flex justify-between items-center  text-[14px]  md:text-[16px] gap-2 md:gap-4">
                  <div
                     className={`py-2 flex-1 text-center border-b-2   cursor-pointer  ${
                        tabSelect == 1 ? "bb-sor" : "bb-sor-n"
                     }  ${roboto.className}`}
                     onClick={() => changeTab(1)}
                  >
                     DETALLES
                  </div>
                  <div
                     className={`py-2 flex-1 text-center border-b-2  cursor-pointer  ${
                        tabSelect == 6 ? "bb-sor" : "bb-sor-n"
                     }  ${roboto.className}`}
                     onClick={() => changeTab(6)}
                  >
                     PREMIOS
                  </div>
               </section>
            )}
            {event?.tipos_evento_cod_tipo == 7 && (
               <section className="flex-1 w-full  flex justify-between items-center  text-[14px]  md:text-[16px] gap-2 md:gap-4">
                  <div
                     className={`p-2 flex-1 text-center cursor-pointer    ${
                        tabSelect == 1 ? "bb-charla" : "bb-charla-n"
                     }  ${roboto.className}`}
                     onClick={() => changeTab(1)}
                  >
                     DETALLES
                  </div>
                  <div
                     className={`p-2 flex-1 text-center cursor-pointer  ${
                        tabSelect == 20 ? "bb-charla" : "bb-charla-n"
                     } ${roboto.className}`}
                     onClick={() => changeTab(20)}
                  >
                     INSCRIPCIONES
                  </div>
               </section>
            )}
            {event?.tipos_evento_cod_tipo == 2 &&
               event?.registroactive == 1 &&
               event.premiun == 1 && (
                  <section className="flex-1 w-full  flex justify-between items-center  text-[14px]  md:text-[16px] gap-2 md:gap-4">
                     <div
                        className={`p-2 flex-1 text-center cursor-pointer    ${
                           tabSelect == 1 ? "bb-mmc" : "bb-mmc-n"
                        }  ${roboto.className}`}
                        onClick={() => changeTab(1)}
                     >
                        DETALLES
                     </div>
                     {/* <Tooltip
                        title="Contactar para habilitar"
                        placement="bottom"
                     > */}
                     <div
                        className={`p-2 flex-1 text-center cursor-pointer    ${
                           tabSelect == 34 ? "bb-mmc" : "bb-mmc-n"
                        }  ${roboto.className}`}
                        onClick={() => changeTab(34)}
                     >
                        BASES
                     </div>
                     {/* </Tooltip> */}
                     <div
                        className={`p-2 flex-1 text-center cursor-pointer  ${
                           tabSelect == 3 ? "bb-mmc" : "bb-mmc-n"
                        } ${roboto.className}`}
                        onClick={() => changeTab(3)}
                     >
                        INSCRIPCIONES
                     </div>
                  </section>
               )}
            {event?.tipos_evento_cod_tipo == 2 &&
               event?.registroactive == 1 &&
               event.premiun == 0 && (
                  <section className="flex-1 w-full  flex justify-between items-center  text-[14px]  md:text-[16px] gap-2 md:gap-4">
                     <div
                        className={`p-2 flex-1 text-center cursor-pointer    ${
                           tabSelect == 1 ? "bb-mmc" : "bb-mmc-n"
                        }  ${roboto.className}`}
                        onClick={() => changeTab(1)}
                     >
                        DETALLES
                     </div>
                     <Tooltip
                        title="Contactar para habilitar"
                        placement="bottom"
                     >
                        <div
                           className={`p-2 flex-1 text-center text-gray-300 cursor-pointer  ${roboto.className}`}
                        >
                           BASES
                        </div>
                     </Tooltip>
                     <div
                        className={`p-2 flex-1 text-center cursor-pointer  ${
                           tabSelect == 3 ? "bb-mmc" : "bb-mmc-n"
                        } ${roboto.className}`}
                        onClick={() => changeTab(3)}
                     >
                        INSCRIPCIONES
                     </div>
                  </section>
               )}

            {event?.tipos_evento_cod_tipo == 2 &&
               event?.registroactive == 0 && (
                  <section className="flex-1 w-full  flex justify-between pb-[4px]  items-end   text-[14px]  md:text-[16px] gap-2 md:gap-4">
                     <div
                        className={`p-2 flex-1 text-center border-b-2 border-p-mmc cursor-pointer ${roboto.className}`}
                     >
                        DETALLES
                     </div>
                     <Tooltip
                        title="Contactar para habilitar"
                        placement="bottom"
                     >
                        <div
                           className={`p-2 flex-1 text-center text-gray-300 cursor-pointer  ${roboto.className}`}
                        >
                           BASES
                        </div>
                     </Tooltip>
                     <Tooltip
                        title="Contactar para habilitar"
                        placement="bottom"
                     >
                        <div
                           className={`p-2 flex-1 text-center text-gray-300 cursor-pointer ${roboto.className}`}
                        >
                           INSCRIPCIONES
                        </div>
                     </Tooltip>
                  </section>
               )}
         </article>
      </section>
   );
};

export default ProfileEvent;
