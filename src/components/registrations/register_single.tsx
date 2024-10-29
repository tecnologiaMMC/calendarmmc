import { outlinedInputClasses, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styleDates } from "./cutomStyles";

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
   handleChangeTextField: (e: any) => void;
   errors:any
}

const RegisterSingle: React.FC<FilterDatesProps> = ({
   form,
   handleChangeTextField,
   errors
}) => {
   const [selectedDate, setSelectedDate] = useState<any>(null);

   const handleDateChange = (originalDate: any) => {
      setSelectedDate(originalDate);
      const dateObject = new Date(originalDate);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son 0-indexados
      const day = String(dateObject.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      let e = {
         target: {
            name: "fecha_nac_1",
            value: formattedDate,
         },
      };
      handleChangeTextField(e);
   };

   return (
      <article className=" w-full flex flex-col  items-center gap-10">
         <section className="w-full md:w-[50%]  flex flex-col items-center gap-5">
            <div className="text-p-mmc text-[18px]  self-start ml-2">
               <h2>Datos del Participante</h2>
            </div>
            <div className="w-full flex-col">
               <TextField
                  label="Ingresa tus nombres"
                  name="nombre_1"
                  size="small"
                  className="w-full"
                  value={form?.nombre_1}
                  onChange={handleChangeTextField}
                  sx={borderSx}
               />
               {errors.nom_1&&<p className="text-[12px] md:text-[14px] pl-2 text-red-500">{errors.nom_1}</p>}

            </div>
            <div className="w-full flex-col">
               <TextField
                  label="Ingresa tus apellidos"
                  name="apellido_1"
                  size="small"
                  className="w-full"
                  value={form?.apellido_1}
                  onChange={handleChangeTextField}
                  sx={borderSx}
               />
               {errors.ape_1&&<p className="text-[12px] md:text-[14px] pl-2 text-red-500">{errors.ape_1}</p>}

            </div>
            <div className="w-full flex-col">
               <TextField
                  label="Ingresa tu DNI/RUT"
                  name="dni_1"
                  size="small"
                  className="w-full"
                  value={form?.dni_1}
                  onChange={handleChangeTextField}
                  sx={borderSx}
               />
               {errors.dn_1&&<p className="text-[12px] md:text-[14px] pl-2 text-red-500">{errors.dn_1}</p>}

            </div>
            <div className="w-full flex-col">
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                     <DatePicker
                        label="Ingresa tu Fecha de nacimiento"
                        value={selectedDate}
                        onChange={handleDateChange}
                        format="DD/MM/YYYY"
                        sx={styleDates}
                     />
                  </DemoContainer>
               </LocalizationProvider>
               {errors.fc_1&&<p className="text-[12px] md:text-[14px] pl-2 text-red-500">{errors.fc_1}</p>}

            </div>
            <div className="w-full flex-col">
               <TextField
                  label="Ingresa tu academia"
                  name="academia_1"
                  size="small"
                  className="w-full"
                  value={form?.academia_1}
                  onChange={handleChangeTextField}
                  sx={borderSx}
               />
            </div>
         </section>
      </article>
   );
};

export default RegisterSingle;
