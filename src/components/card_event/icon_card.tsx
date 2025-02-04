import clsx from "clsx";
import "./style.css";
import {
   FaCrown,
   FaWineGlass,
   FaTrophy,
   FaDrum,
   FaGift,
} from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";

const getIconComponent = (cod_type_event: number) => {
   switch (cod_type_event) {
      case 1:
         return FaWineGlass;
      case 2:
         return FaTrophy;
      case 3:
         return FaCrown;
      case 4:
         return FaDrum;
      case 6:
         return FaGift;
      case 7:
         return GiTeacher;
      default:
         return null; // Puedes retornar un ícono por defecto aquí si lo deseas
   }
};

export default function IconCard({
   cod_type_event,
}: {
   cod_type_event: number;
}) {
   const IconComponent = getIconComponent(cod_type_event);

   return (
      <div
         className={clsx(
            {
               "bg-celebration": cod_type_event === 1,
               "bg-concourse": cod_type_event === 2,
               "bg-coronation": cod_type_event === 3,
               "bg-s-mmc": cod_type_event === 4,
               "bg-sorteo": cod_type_event === 6,
               "bg-charla": cod_type_event === 7,
            },
            "absolute top-[-25px] w-[50px] h-[50px]  rounded-full flex justify-center items-center ml-[10px] hidden sm:flex re-icon"
         )}
      >
         <div className="w-[40px] h-[40px] bg-white flex items-center justify-center rounded-full ">
            {IconComponent && (
               <IconComponent
                  className={clsx(
                     {
                        "text-celebration": cod_type_event === 1,
                        "text-concourse": cod_type_event === 2,
                        "text-coronation": cod_type_event === 3,
                        "text-s-mmc": cod_type_event === 4,
                        "text-sorteo": cod_type_event === 6,
                        "text-charla": cod_type_event === 7,
                     },
                     "w-[25px] h-[25px]"
                  )}
               />
            )}
         </div>
      </div>
   );
}
