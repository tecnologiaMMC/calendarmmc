import { format_hour } from "@/utils/format_hour";
import formatoFecha from "@/utils/formato_fecha";
import { useEffect, useState } from "react";
import ModalImage from "./modal_image";
import { FaRegCalendar, FaRegCircleCheck } from "react-icons/fa6";
import {
   FaFacebook,
   FaInstagram,
   FaTiktok,
   FaWhatsapp,
   FaYoutube,
} from "react-icons/fa6";

const handleCallButtonClick = (phoneNumber: string) => {
   window.open(`tel:${phoneNumber}`);
};

const formatDate = (date: Date) => {
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, "0");
   const day = String(date.getDate()).padStart(2, "0");
   const hours = String(date.getHours()).padStart(2, "0");
   const minutes = String(date.getMinutes()).padStart(2, "0");
   const seconds = String(date.getSeconds()).padStart(2, "0");

   return `${year}${month}${day}T${hours}${minutes}${seconds}`;
};

const handleAddToGoogleCalendar = (
   fecha: string,
   nombre: string,
   nombreEvent: string,
   lugar: string
) => {
   const title = encodeURIComponent(`Evento de marinera: ${nombreEvent}`);
   const description = encodeURIComponent(
      `Evento de  Marinera organizado por: ${nombre} `
   );
   const location = encodeURIComponent(lugar);

   // Generar fechas y horas dinámicamente
   const startDate = new Date(fecha);
   const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // Sumar una hora a la fecha de inicio

   const startDateString = encodeURIComponent(formatDate(startDate)); // Convertir a formato de texto y codificar URI
   const endDateString = encodeURIComponent(formatDate(endDate)); // Convertir a formato de texto y codificar URI

   const timezone = encodeURIComponent("America/New_York");

   const googleCalendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${title}&details=${description}&location=${location}&dates=${startDateString}/${endDateString}&ctz=${timezone}`;

   window.open(googleCalendarUrl, "_blank");
};

const Details = ({ event }: { event: any }) => {
   const [redess, setRedes] = useState<any>([]);

   useEffect(() => {
      if (event.redes) {
         let objeto = JSON.parse(event.redes);
         let redes: any = [];

         if (objeto.facebook) {
            redes.push({
               tipo: "fb",
               link: objeto.facebook,
               color: "#1877f2",
               icon: FaFacebook,
            });
         }
         if (objeto.instagram) {
            redes.push({
               tipo: "ins",
               link: objeto.instagram,
               color: "#D43089",
               icon: FaInstagram,
            });
         }
         if (objeto.youtube) {
            redes.push({
               tipo: "you",
               link: objeto.youtube,
               color: "#FF0000",
               icon: FaYoutube,
            });
         }
         setRedes(redes);
      }
   }, [event?.redes]);

   const goToRedSocial = (url: string) => {
      window.open(url, "_blank");
   };

   return (
      // <div className="w-full bg-white px-[5%] flex flex-col-reverse items-center lg:flex-row gap-10 lg:items-start">
      //    <article className="flex-1 w-full md:w-[60%] lg:w-full  bg-gray-200 flex flex-col items-center py-[1.5%]   gap-[20px] rounded-[16px]">
      //       <section className=" w-[95%] text-start text[18px] ">
      //          <div className=" flex items-center h-[30px]">
      //             <FaRegCircleCheck className="text-green-600 mt-[2px]" />
      //             <p className="leading-[1] text-p-mmc ml-[15px] ">Fecha:</p>
      //             {event ? (
      //                <p className="leading-[1] ml-[15px] text-gray-800 ">
      //                   {formatoFecha(event.fecha)}
      //                </p>
      //             ) : (
      //                <p className="leading-[1] ml-[15px] ">Cargando...</p>
      //             )}
      //          </div>
      //          <hr className="border-[1] border-gray-300 " />
      //       </section>

      //       <section className="w-[95%] text-start text[18px]">
      //          <div className=" flex items-center h-[30px]">
      //             <FaRegCircleCheck className="text-green-600 mt-[2px]" />
      //             <p className="leading-[1] text-p-mmc ml-[15px] ">
      //                Hora de inicio:
      //             </p>
      //             {event ? (
      //                <p className="leading-[1] ml-[15px] text-gray-800">
      //                   {format_hour(event.fecha)}
      //                </p>
      //             ) : (
      //                <p className="leading-[1] ml-[15px] ">Cargando...</p>
      //             )}
      //          </div>
      //          <hr className="border-[1] border-gray-300 " />
      //       </section>
      //       {event && event.hora && (
      //          <section className="w-[95%] text-start text[18px]">
      //             <div className=" flex items-center h-[30px]">
      //                <FaRegCircleCheck className="text-green-600 mt-[2px]" />
      //                <p className="leading-[1] text-p-mmc ml-[15px] ">
      //                   Segunda fecha:{" "}
      //                </p>
      //                <p className="leading-[1] ml-[15px] text-gray-800">
      //                   {formatoFecha(event.hora)} {format_hour(event.hora)}
      //                </p>
      //             </div>
      //             <hr className="border-[1] border-gray-300 " />
      //          </section>
      //       )}
      //       <section className="w-[95%] text-start text[18px]">
      //          <div className=" flex items-center h-[30px]">
      //             <FaRegCircleCheck className="text-green-600 mt-[2px]" />
      //             <p className="leading-[1] text-p-mmc ml-[15px] ">
      //                Coliseo o institución
      //             </p>
      //             {event ? (
      //                <p className="leading-[1] ml-[15px] text-gray-800">
      //                   {event?.lugar}
      //                </p>
      //             ) : (
      //                <p className="leading-[1] ml-[15px] ">Cargando...</p>
      //             )}
      //          </div>
      //          <hr className="border-[1] border-gray-300 " />
      //       </section>
      //       <section className="w-[95%] text-start text[18px]">
      //          <div className=" flex items-center h-[30px]">
      //             <FaRegCircleCheck className="text-green-600 mt-[2px]" />
      //             <p className="leading-[1] text-p-mmc ml-[15px] ">
      //                Como llegar:{" "}
      //             </p>
      //             <p
      //                className="leading-[1] ml-[15px] cursor-pointer text-s-mmc"
      //                onClick={() => window.open(event.linkMaps, "_blank")}
      //             >
      //                Google maps
      //             </p>
      //          </div>
      //          <hr className="border-[1] border-gray-300 " />
      //       </section>
      //       <section className="w-[95%] text-start text[18px]">
      //          <div className=" flex items-center h-[30px]">
      //             <FaRegCircleCheck className="text-green-600 mt-[2px]" />
      //             <p className="leading-[1] text-p-mmc ml-[15px] ">Llámalos</p>
      //             {event ? (
      //                <p
      //                   className="leading-[1] ml-[15px] cursor-pointer text-s-mmc"
      //                   onClick={() => handleCallButtonClick(event.telefono)}
      //                >
      //                   {event.telefono}
      //                </p>
      //             ) : (
      //                <p className="leading-[1] ml-[15px] cursor-pointer text-s-mmc">
      //                   Cargando...
      //                </p>
      //             )}
      //          </div>
      //          <hr className="border-[1] border-gray-300 " />
      //       </section>
      //       <section className="w-[95%] text-start text[18px]">
      //          <div className=" flex items-center h-[30px]">
      //             <FaRegCircleCheck className="text-green-600 mt-[2px]" />
      //             <p className="leading-[1] text-p-mmc ml-[15px] ">
      //                Red Social de la organización:
      //             </p>
      //             <div className=" flex gap-[10px] ml-[15px] text-[25px] cursor-pointer">
      //                {redess &&
      //                   redess.map((red: any, i: any) => (
      //                      <red.icon
      //                         key={i}
      //                         style={{ color: `${red.color}` }}
      //                         onClick={() => goToRedSocial(red.link)}
      //                      />
      //                   ))}
      //             </div>
      //          </div>
      //          <hr className="border-[1] border-gray-300 " />
      //       </section>
      //       <section className="w-[95%] text-start text[18px]">
      //          <div className=" flex items-center h-[30px]">
      //             <FaRegCircleCheck className="text-green-600 mt-[2px]" />
      //             <p className="leading-[1] text-p-mmc ml-[15px] ">
      //                ¿Te gustaría agendarlo?
      //             </p>
      //             <FaRegCalendar
      //                className="text-gray-800 mt-[2px] ml-4 cursor-pointer"
      //                onClick={() =>
      //                   handleAddToGoogleCalendar(
      //                      event.fecha,
      //                      event.nombre_org,
      //                      event.nombre_concurso,
      //                      event.lugar
      //                   )
      //                }
      //             />
      //             <p></p>
      //          </div>
      //          <hr className="border-[1] border-gray-300 " />
      //       </section>
      //    </article>
      //    <article className="flex-1 w-full md:w-[60%] lg:w-full flex items-start  h-[100%] ">
      //       {event && <ModalImage url={event.banner_con} />}
      //    </article>
      // </div>
      <div className="w-[90%] md:w-[60%] lg:w-[90%] grid grid-cols1 lg:grid-cols-2  gap-10 mb-20">
         <article className="order-2 lg:order-1 w-full bg-gray-200 flex flex-col items-center  py-[1.5%]  gap-[20px] rounded-[16px]">
            <section className="block lg:hidden w-[95%] text-start text[18px]  mt-[5px]">
               <div className=" flex items-center h-[30px]">
                  <FaRegCircleCheck className="text-green-600 mt-[2px]" />
                  <p className="leading-[1] text-p-mmc ml-[15px] ">
                     Organización
                  </p>
                  <p className="leading-[1] ml-[15px] text-gray-800  w-[65%] truncate">
                     {event?.nombre_org ? event.nombre_org : "Cargando...."}
                  </p>
               </div>
               <hr className="border-[1] border-gray-300 " />
            </section>
            <section className=" w-[95%] text-start text[18px]">
               <div className=" flex items-center h-[30px]">
                  <FaRegCircleCheck className="text-green-600 mt-[2px]" />
                  <p className="leading-[1] text-p-mmc ml-[15px] ">
                     Fecha y hora de inicio:
                  </p>
                  {event ? (
                     <p className="leading-[1] ml-[15px] text-gray-800 ">
                        {formatoFecha(event.fecha)} {format_hour(event.fecha)}
                     </p>
                  ) : (
                     <p className="leading-[1] ml-[15px] ">Cargando...</p>
                  )}
               </div>
               <hr className="border-[1] border-gray-300 " />
            </section>
            {event && event.hora && (
               <section className="w-[95%] text-start text[18px]">
                  <div className=" flex items-center h-[30px]">
                     <FaRegCircleCheck className="text-green-600 mt-[2px]" />
                     <p className="leading-[1] text-p-mmc ml-[15px] ">
                        Segunda fecha:{" "}
                     </p>
                     <p className="leading-[1] ml-[15px] text-gray-800">
                        {formatoFecha(event.hora)} {format_hour(event.hora)}
                     </p>
                  </div>
                  <hr className="border-[1] border-gray-300 " />
               </section>
            )}
            <section className="w-[95%] text-start text[18px]">
               <div className=" flex items-center h-[30px]">
                  <FaRegCircleCheck className="text-green-600 mt-[2px]" />
                  <p className="leading-[1] text-p-mmc ml-[15px] ">
                     Coliseo o institución
                  </p>
                  {event ? (
                     <p className="leading-[1] ml-[15px] text-gray-800">
                        {event?.lugar}
                     </p>
                  ) : (
                     <p className="leading-[1] ml-[15px] ">Cargando...</p>
                  )}
               </div>
               <hr className="border-[1] border-gray-300 " />
            </section>
            <section className="w-[95%] text-start text[18px]">
               <div className=" flex items-center h-[30px]">
                  <FaRegCircleCheck className="text-green-600 mt-[2px]" />
                  <p className="leading-[1] text-p-mmc ml-[15px] ">
                     Como llegar:{" "}
                  </p>
                  <p
                     className="leading-[1] ml-[15px] cursor-pointer text-s-mmc"
                     onClick={() => window.open(event.linkMaps, "_blank")}
                  >
                     Google maps
                  </p>
               </div>
               <hr className="border-[1] border-gray-300 " />
            </section>
            <section className="w-[95%] text-start text[18px]">
               <div className=" flex items-center h-[30px]">
                  <FaRegCircleCheck className="text-green-600 mt-[2px]" />
                  <p className="leading-[1] text-p-mmc ml-[15px] ">Llámalos</p>
                  {event ? (
                     <p
                        className="leading-[1] ml-[15px] cursor-pointer text-s-mmc"
                        onClick={() => handleCallButtonClick(event.telefono)}
                     >
                        {event.telefono}
                     </p>
                  ) : (
                     <p className="leading-[1] ml-[15px] cursor-pointer text-s-mmc">
                        Cargando...
                     </p>
                  )}
               </div>
               <hr className="border-[1] border-gray-300 " />
            </section>
            <section className="w-[95%] text-start text[18px]">
               <div className=" flex items-center h-[30px]">
                  <FaRegCircleCheck className="text-green-600 mt-[2px]" />
                  <p className="leading-[1] text-p-mmc ml-[15px] ">
                     Red Social de la organización:
                  </p>
                  <div className=" flex gap-[10px] ml-[15px] text-[25px] cursor-pointer">
                     {redess &&
                        redess.map((red: any, i: any) => (
                           <red.icon
                              key={i}
                              style={{ color: `${red.color}` }}
                              onClick={() => goToRedSocial(red.link)}
                           />
                        ))}
                  </div>
               </div>
               <hr className="border-[1] border-gray-300 " />
            </section>
            <section className="w-[95%] text-start text[18px]">
               <div className=" flex items-center h-[30px]">
                  <FaRegCircleCheck className="text-green-600 mt-[2px]" />
                  <p className="leading-[1] text-p-mmc ml-[15px] ">
                     ¿Te gustaría agendarlo?
                  </p>
                  <FaRegCalendar
                     className="text-gray-800 mt-[2px] ml-4 cursor-pointer"
                     onClick={() =>
                        handleAddToGoogleCalendar(
                           event.fecha,
                           event.nombre_org,
                           event.nombre_concurso,
                           event.lugar
                        )
                     }
                  />
                  <p></p>
               </div>
               <hr className="border-[1] border-gray-300 " />
            </section>
         </article>
         <article className="order-1 lg:order-2 w-full flex items-start  h-[100%] ">
            {event && <ModalImage url={event.banner_con} />}
         </article>
      </div>
   );
};

export default Details;
