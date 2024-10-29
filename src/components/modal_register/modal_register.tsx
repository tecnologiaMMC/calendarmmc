import Link from 'next/link'


const ModalRegister = ({closeModaRegister}:{closeModaRegister:()=>void}) => {

   const clickStopPropagation = (e:any) => e.stopPropagation();

   return (
      <div className="flex justify-center items-center bg-gray-200 bg-opacity-50 fixed w-full h-full z-[50] top-[0] " onClick={closeModaRegister}>
         <div className="p-4 bg-blue-50 max-w-[270px] md:max-w-[370px] rounded-[16px] flex flex-col gap-[5px] shadow-2xl" onClick={clickStopPropagation}>
            <i className="fa-regular fa-circle-check text-green-500 text-[22px]"></i>
            <b className="text-p-mmc">¡Genial!</b>
            <div className="text-p-mmc">
               <p>
                  Hemos registrado tu participación. <br /> La organización se
                  comunicará contigo en caso de ser necesario.
               </p>
            </div>
            <div className=" flex flex-col items-center gap-2 md:flex-row md:justify-between mt-[10px] ">
               <div className="bg-white w-[150px] hover:bg-gray-100 text-center cursor-pointer rounded shadow-lg  p-[5px]" onClick={closeModaRegister}>
                  Nueva Inscripción
               </div>
               <div className="bg-p-mmc hover:bg-p-mmc-h w-[150px] text-center cursor-pointer rounded shadow-lg text-white p-[5px]">
                  <Link href={'/calendario'}>
                  Ir al calendario
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ModalRegister;
