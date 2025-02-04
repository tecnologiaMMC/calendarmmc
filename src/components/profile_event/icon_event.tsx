import clsx from "clsx";
import {
   FaCrown,
   FaWineGlass,
   FaTrophy,
   FaDrum,
   FaGift,
   FaSpinner
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
         return FaSpinner; // Puedes retornar un ícono por defecto aquí si lo deseas
   }
};


export default function IconEvent({
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
            "absolute  top-[-50px] w-[100px] h-[100px] text-[50px] lg:top-[-60px]  lg:w-[120px] lg:h-[120px]  rounded-full flex justify-center items-center outline outline-[5px] outline-white lg:text-[70px]"
         )}
      >
               <IconComponent
                  className='text-white w-[57px] h-[57px] lg:h-[80px] lg:w-[80px] '
               />
      </div>
   );
}