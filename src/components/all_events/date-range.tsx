import * as React from "react";
import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs, { Dayjs } from "dayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import { MobileDateRangePicker } from "@mui/x-date-pickers-pro";
import "dayjs/locale/es";
dayjs.locale("es");
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import "./styles.css";
import useMediaQuery from '@mui/material/useMediaQuery';

const shortcutsItems = [
   {
      label: "Hoy",
      getValue: () => {
         const today = dayjs();
         return [today.startOf("day"), today.endOf("day")];
      },
   },
   {
      label: "Semana Actual",
      getValue: () => {
         const today = dayjs();
         return [today.startOf("week"), today.endOf("week")];
      },
   },
   {
      label: "Mes actual",
      getValue: () => {
         const today = dayjs();
         return [today.startOf("month"), today.endOf("month")];
      },
   },
   {
      label: "Próximo mes ",
      getValue: () => {
         const today = dayjs();
         const startOfNextMonth = today.endOf("month").add(1, "day");
         return [startOfNextMonth, startOfNextMonth.endOf("month")];
      },
   },
   { label: "Limpiar", getValue: () => [null, null] },
];

interface PropsForDatesRange {
   setSelectedRange: Dispatch<SetStateAction<DateRange<Dayjs>>>;
   selectedRange: DateRange<Dayjs>;
   setTexto: Dispatch<SetStateAction<string>>;
   handleClose: () => void;
}

const DatesRange: React.FC<PropsForDatesRange> = ({
   setSelectedRange,
   selectedRange,
   setTexto,
   handleClose,
}) => {
   useEffect(() => {
      const elements = document.querySelectorAll<HTMLDivElement>("div");
      elements.forEach((element) => {
         if (element.textContent?.includes("MUI X Missing license key")) {
            element.style.color = "transparent";
         }
      });

      const spans = document.querySelectorAll<HTMLSpanElement>("span");
      spans.forEach((span) => {
         if (span.textContent?.includes("End")) {
            span.textContent = "Final";
         }
         if (span.textContent?.includes("Start")) {
            span.textContent = "Inicio";
         }
         if (span.textContent?.includes("Select date range")) {
            span.textContent = "Selecciona el rango de fechas";
         }
      });
   }, []);

   const handleRangeChange = (newValue: DateRange<Dayjs>) => {
      setSelectedRange(newValue);
      if (newValue[0] === null && newValue[1] === null) {
         setTexto("Fecha");
         handleClose()
      }  else if (
         dayjs(newValue[0]).isSame(dayjs().startOf("day")) &&
         dayjs(newValue[1]).isSame(dayjs().endOf("day"))
      ) {
         setTexto("Hoy");
      } else if (
         dayjs(newValue[0]).isSame(dayjs().startOf("week")) &&
         dayjs(newValue[1]).isSame(dayjs().endOf("week"))
      ) {
         setTexto("Semana Actual");
      } else if (
         dayjs(newValue[0]).isSame(dayjs().startOf("month")) &&
         dayjs(newValue[1]).isSame(dayjs().endOf("month"))
      ) {
         setTexto("Mes Actual");
      } else if (
         dayjs(newValue[0]).isSame(dayjs().endOf("month").add(1, "day")) &&
         dayjs(newValue[1]).isSame(
            dayjs().endOf("month").add(1, "month").endOf("month")
         )
      ) {
         setTexto("Próximo Mes");
      } else {
         setTexto(
            `${newValue[0]?.format("DD MMM")} - ${newValue[1]?.format(
               "DD MMM"
            )}`
         );
      }
      if(newValue[1] != null && newValue[0] != null){
         handleClose()
      }
   };
   const isLargeScreen = useMediaQuery('(min-width: 768px)');
   return (
      <div>
         <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <StaticDateRangePicker
               value={selectedRange}
               onChange={handleRangeChange}
               slotProps={{
                  shortcuts: {
                     items: shortcutsItems,
                     sx: {
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)", // 2 columnas por defecto
                        gap: '10px', // Espaciado entre los items
                        "@media (min-width: 768px)": {
                           gridTemplateColumns: "repeat(5, 1fr)", // 4 columnas a partir de md
                        },
                     },
                  },
                  actionBar: { actions: [] },
               }}
               calendars={isLargeScreen ? 2 : 1}
               sx={
                 {
                  display:'flex',
                  flexDirection:'column'
                 }

               }
            />

         </LocalizationProvider>
      </div>
   );
};
export default DatesRange;
