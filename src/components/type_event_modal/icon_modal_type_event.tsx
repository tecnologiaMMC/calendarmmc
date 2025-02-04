import clsx from "clsx";
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

export default function IconModalTypeEvent({
   cod_type_event,
   cod_type_select,
}: {
   cod_type_event: number;
   cod_type_select: number | null;
}) {
   const IconComponent = getIconComponent(cod_type_event);

   return (
      <div
         className={clsx(
            {
               "bg-gray-400":
                  cod_type_select === null || cod_type_select != cod_type_event,
               "bg-celebration": cod_type_select === 1 && cod_type_event == 1,
               "bg-concourse": cod_type_select === 2 && cod_type_event == 2,
               "bg-coronation": cod_type_select === 3 && cod_type_event == 3,
               "bg-s-mmc": cod_type_select === 4 && cod_type_event == 4,
               "bg-sorteo": cod_type_select === 6 && cod_type_event == 6,
               "bg-charla": cod_type_select === 7 && cod_type_event == 7,
            },
            " bg-white w-[34px] h-[34px] rounded-full flex justify-center items-center ml-[4px] flex"
         )}
      >
         <div className="w-[34px] h-[34px] bg-white flex items-center justify-center rounded-full ">
            {IconComponent && (
               <IconComponent
                  className={clsx(
                     {
                        "text-gray-400":
                           cod_type_select === null ||
                           cod_type_select != cod_type_event,
                        "text-celebration":
                           cod_type_select === 1 && cod_type_event == 1,
                        "text-concourse":
                           cod_type_select === 2 && cod_type_event == 2,
                        "text-coronation":
                           cod_type_select === 3 && cod_type_event == 3,
                        "text-s-mmc":
                           cod_type_select === 4 && cod_type_event == 4,
                        "text-sorteo":
                           cod_type_select === 6 && cod_type_event == 6,
                        "text-charla":
                           cod_type_select === 7 && cod_type_event == 7,
                     },
                     "w-[18px] h-[18px]"
                  )}
               />
            )}
         </div>
      </div>
   );
}
