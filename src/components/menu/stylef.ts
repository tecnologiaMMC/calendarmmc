import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import "dayjs/locale/es";

dayjs.extend(localizedFormat);

export const formatDateForPlaceholder = (date: dayjs.Dayjs): string => {
   // Configurar el idioma español
   return date.locale("es").format("D [de] MMM");
 };



export const textFieldStyles: SxProps<Theme> = {
   "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      height: "44px",
      "& fieldset": {
         borderColor: "transparent", // Borde siempre transparente
      },
      backgroundColor: "#4E2A53", // Fondo cuando no está seleccionado
      "&:hover fieldset": {
         borderColor: "transparent", // Borde transparente al pasar el mouse
      },
      "&.Mui-focused fieldset": {
         borderColor: "transparent", // Color del borde cuando está enfocado
      },
      "&.Mui-focused": {
         backgroundColor: "white", // Fondo blanco cuando está enfocado
         "& .MuiInputBase-input": {
            color: "black", // Texto en negro cuando está enfocado
         },
      },
   },
   "& .MuiInputLabel-root": {
      color: "white", // Color del placeholder en blanco cuando no está seleccionado
   },
   "& .MuiInputBase-input": {
      color: "white", // Color del texto en blanco cuando no está seleccionado
   },
   "& .MuiInputBase-input::placeholder": {
      whiteSpace: "pre-line ", // Permite respetar los saltos de línea en el plac
   },
};
