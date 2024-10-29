import { useEffect, useState } from "react";
import axios from "axios";

const CookieConsent = () => {
   const [showAlert, setShowAlert] = useState(false);
   const [department, setDepartment] = useState(null);

   useEffect(() => {
      const cookiesAccepted = localStorage.getItem("cookiesAccepted");
      if (!cookiesAccepted) {
         setShowAlert(true);
      }
   }, []);

   const handleAccept = () => {
      localStorage.setItem("cookiesAccepted", "true");
      setShowAlert(false);

      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            // Guardar la ubicación en localStorage
            localStorage.setItem(
               "userLocation",
               JSON.stringify({ latitude, longitude })
            );

            // Llamar a la API de Nominatim para obtener el departamento
            getDepartmentFromCoordinates(latitude, longitude);
         });
      }
   };

   const handleReject = () => {
      setShowAlert(false);
   };

   const getDepartmentFromCoordinates = async (
      latitude: number,
      longitude: number
   ) => {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;

      try {
         const response = await axios.get(url);
         if (response.data && response.data.address) {
            const { state } = response.data.address; // 'state' se refiere a departamento o región en Nominatim
            if (state) {
               setDepartment(state);

               // Guardar el departamento en localStorage
               localStorage.setItem("userDepartment", state);
               window.location.reload();
            }
         }
      } catch (error) {
         console.error("Error al obtener la ubicación: ", error);
      }
   };

   if (!showAlert) return null;

   return (
      <div className="fixed w-[100%] max-w-[1400px] md:w-[80%] bottom-0  bg-p-mmc   text-white p-4 z-50 grid grid-cols-5 gap-2">
         <p className="text-sm md:text-base text-justify  col-span-5 md:col-span-4  md:pr-8">
            Al hacer clic en &quot;Aceptar&quot;, usted consiente que se guarden cookies
            en su dispositivo para mejorar su experiencia de navegación y
            analizar el uso del sitio. Estas cookies nos ayudan a ofrecer
            contenido más relevante y personalizado.
         </p>
         <div className="col-span-5 md:col-span-1    flex flex-col gap-2 ">
            <button
               onClick={handleReject}
               className="outline outline-[1px] order-4 md:order-1 outline-white  text-white  p-2 "
            >
               Rechazar
            </button>
            <button
               onClick={handleAccept}
               className="bg-white text-gray-900 p-2 md:order-2  hover:bg-gray-300"
            >
               Aceptar
            </button>
         </div>

         {department && <p className="mt-2">Te encuentras en: {department}</p>}
      </div>
   );
};

export default CookieConsent;
