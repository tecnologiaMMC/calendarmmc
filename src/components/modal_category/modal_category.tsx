// const ModalCategory = ({closeModaRegister}:{closeModaRegister:()=>void}) => {

const ModalCategory = ({
   closeModaCategory,
   selectCategories,
}: {
   closeModaCategory: () => void;
   selectCategories: Category[];
}) => {
   const clickStopPropagation = (e: any) => e.stopPropagation();

   return (
      <div
         className="flex justify-center items-center bg-gray-500 bg-opacity-50 fixed w-full h-full z-[50] top-[0] "
         onClick={closeModaCategory}
      >
         <div
            className="w-[50%] min-w-[280px] max-w-[400px] bg-white rounded-[16px] p-4 flex flex-col items-center gap-3"
            onClick={clickStopPropagation}
         >
            <div className="flex w-full text-p-mmc text-[14px] sm:text-[16px] ">
               <div className="flex-1 text-center">Categoría</div>
               <div className="flex-1 text-center">Desde</div>
               <div className="flex-1 text-center">Hasta</div>
            </div>
            {selectCategories &&
               selectCategories.map((cat,i) => (
                  <div key={i} className="flex w-full border rounded border-p-mmc text-p-mmc text-[14px] sm:text-[16px]">
                     <div className="flex-1 text-center">{cat.nombre_cat}</div>
                     <div className="flex-1 text-center">
                        {cat.año_min == "0" ? "---" : cat.año_min}
                     </div>
                     <div className="flex-1 text-center">
                        {cat.año_max == "0" ? "---" : cat.año_max}
                     </div>
                  </div>
               ))}
            <div
               className="bg-s-mmc text-[16px] text-white p-2 w-[120px] text-center rounded  sm:text-[18px] sm:w-[140px] leading-[1] pt-[6px] hover:bg-s-mmc-h cursor-pointer"
               onClick={closeModaCategory}
            >
               Cerrar
            </div>
         </div>
      </div>
   );
};

export default ModalCategory;
