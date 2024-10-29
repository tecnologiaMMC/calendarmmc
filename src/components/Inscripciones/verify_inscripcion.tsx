import apiClient from "@/services/axiosInstance";
import { outlinedInputClasses, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { FaMagnifyingGlass, FaUserCheck } from "react-icons/fa6";

const borderSx = {
   "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
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

const VerifyInscription = ({
   categories,
   modalities,
   event,
}: {
   categories: Category[];
   modalities: Modality[];
   event: DetailEvent;
}) => {
   const [search, setSearch] = useState("");
   const [participants, setParticipants] = useState<any>();
   const [registers, setRegisters] = useState<any[]>();
   const [active, setActive] = useState(true);
   const [coincidencia, setCoincidencia] = useState(false);

   const handleChange = (e: any) => {
      setSearch(e.target.value);
      setCoincidencia(false);
   };

   useEffect(() => {
      const peticion = async () => {
         const dataConcursantes = await apiClient.get(
            `/userorg/concurso/participantes/${event.cod_concurso}`
         );
         setActive(false);
         setRegisters(dataConcursantes.data);
      };
      peticion();
   }, []);

   const nameCategory = (cod: any) => {
      if (categories.length > 0) {
         for (const e of categories) {
            if (e.cod_categoria === cod) {
               return e.nombre_cat;
            }
         }
      }
   };
   const handleClick = () => {
      if (search != "") {
         if (registers) {
            let res = registers.filter(
               (con) => con.dni_1 === search || con.dni_2 === search
            );
            if (res.length == 0) {
               setCoincidencia(true);
               setParticipants([]);
            } else {
               setParticipants(res);
            }
         } else {
            setCoincidencia(true);
         }
      } else {
         setParticipants([]);
      }
   };

   return (
      <div className="w-full flex flex-col items-center justify-start gap-8">
         <div className=" w-[250px] md:w-[500px]">
            {registers ? (
               <TextField
                  className="w-full"
                  label="Ingrese el DNI/RUT del o uno de los participantes"
                  value={search}
                  onChange={handleChange}
                  size="medium"
                  sx={borderSx}
                  disabled={active}
               />
            ) : (
               <p>Cargando....</p>
            )}
         </div>

         <div
            className="bg-s-mmc hover:bg-s-mmc-h p-2 text-white flex items-center justify-center gap-4 rounded text-[16px] md:text-[20px] cursor-pointer w-[200px]"
            onClick={handleClick}
         >
            <FaMagnifyingGlass /> <p>Buscar</p>
         </div>
         <section className="flex gap-5 flex-col lg:flex-row ">
            {participants &&
               participants.map((par: any, i: number) => (
                  <div
                     key={i}
                     className="bg-gray-100 rounded p-4 w-[250px] md:w-[350px] flex flex-col items-center justify-start"
                  >
                     <b className="text-p-mmc">{par.nombre_mod}</b>
                     <p className="text-gray-800">
                        {nameCategory(par.Categorias_cod_categoria)}
                     </p>
                     <div className="w-[80%] h-[1px] bg-gray-400"></div>

                     <div className="flex gap-2 text-gray-600 mt-[20px] items-center justify-start">
                        <FaUserCheck className="h-[23px] w-[23px] " />
                        <p className="text-start">
                           {par.nombre_1} {par.apellido_1}
                        </p>
                     </div>
                     {par.tipo == "Pareja" && (
                        <div className="flex gap-2 text-gray-600 mt-[20px] items-center justify-start">
                           <FaUserCheck className="h-[23px] w-[23px] " />

                           <p className="text-start">
                              {par.nombre_2} {par.apellido_2}
                           </p>
                        </div>
                     )}
                  </div>
               ))}
         </section>
         {coincidencia && (
            <p className="coincidencias">No se Encontraron Coincidencias</p>
         )}
      </div>
   );
};

export default VerifyInscription;
