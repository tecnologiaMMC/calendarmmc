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

export default function IconTypeSearch({
   cod_type_event,
}: {
   cod_type_event: number;
}) {
   const IconComponent = getIconComponent(cod_type_event);

   return (
      <div
         className="bg-white w-[35px] h-[35px]  rounded-full flex justify-center items-center"
      >
         <div className="w-[23px] h-[23px] bg-white flex items-center justify-center rounded-full outline outline-2 outline-gray-400 ">
            {IconComponent && (
               <IconComponent
                  className={ "text-gray-400 w-[14px] h-[14px]"
                  }
               />
            )}
         </div>
      </div>
   );
}