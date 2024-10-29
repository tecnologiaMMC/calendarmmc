import { outlinedInputClasses, TextField } from "@mui/material";
import { ChangeEvent } from "react";

const borderSx = {
   "& .MuiOutlinedInput-root": {
      borderRadius: "18px",
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
         borderColor: "#45204b",
      },
   },
   "& .MuiInputLabel-root": {
      "&.Mui-focused": {
         color: "#45204b",
      },
   },
};

interface FilterDatesProps {
   form: FormRegistro;
   handleChangeTextField: (e: ChangeEvent<HTMLInputElement>) => void;
   errors: any;
}

const RegisterContact: React.FC<FilterDatesProps> = ({
   form,
   handleChangeTextField,
   errors,
}) => {
   return (
      <article className=" w-full flex flex-col  items-center gap-5">
         <div className="text-p-mmc text-[12px] md:text-[18px] self-center">
            <h2>
               Se enviará un correo electrónico a esta persona con la
               información relevante a tu registro
            </h2>
         </div>
         <div className="w-full flex flex-col md:flex-row gap-5">
            <div className="flex-1 w-full flex-col">
               <TextField
                  label="Nombres completos"
                  name="nombreContacto"
                  size="small"
                  className="w-full"
                  value={form?.nombreContacto}
                  onChange={handleChangeTextField}
                  sx={borderSx}
               />
               {errors.nom_c && (
                  <p className="text-[12px] md:text-[14px] pl-2 text-red-500">
                     {errors.nom_c}
                  </p>
               )}
            </div>
            <div className="flex-1 w-full flex-col">
               <TextField
                  label="Número telefónico"
                  name="numeroContacto"
                  size="small"
                  className="w-full"
                  value={form?.numeroContacto}
                  onChange={handleChangeTextField}
                  sx={borderSx}
               />
               {errors.nu_c && (
                  <p className="text-[12px] md:text-[14px] pl-2 text-red-500">
                     {errors.nu_c}
                  </p>
               )}
            </div>
            <div className="flex-1 w-full flex-col">
               <TextField
                  label="Correo electrónico"
                  name="correoContacto"
                  size="small"
                  className="w-full"
                  value={form?.correoContacto}
                  onChange={handleChangeTextField}
                  sx={borderSx}
               />
               {errors.co_c && (
                  <p className="text-[12px] md:text-[14px] pl-2 text-red-500">
                     {errors.co_c}
                  </p>
               )}
            </div>
         </div>
      </article>
   );
};

export default RegisterContact;
