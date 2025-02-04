import { Alert, TextField } from "@mui/material";
import "./style.css";
import { ChangeEvent, useRef, useState } from "react";
import UploadImage from "../UploadImage/UploadImage";
import { uploadFile } from "@/firebase/config";
import Loader from "../loader/Loader";
import apiClient from "@/services/axiosInstance";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
type Invitado = {
   id: string;
   dni: string;
   nombre: string;
   apellido: string;
   cod_evento: number;
};

type Buyer = {
   nombres_apellidos: string;
   correo: string;
   celular: string;
};

const ticketBuyerDefault: Buyer = {
   nombres_apellidos: "",
   correo: "",
   celular: "",
};

function veryfyKeysArrayInvitados(arr: Invitado[]): boolean {
   return arr.some((obj) => {
      return Object.values(obj).some(
         (value) => value === null || value === undefined || value === ""
      );
   });
}

function veryfyKeysBuyer(obj: Record<string, any>): boolean {
   return Object.values(obj).some(
      (value) => value === null || value === undefined || value === ""
   );
}

const InscriptionsBasic = ({ cod_evento }: { cod_evento: number }) => {
   const arrayDefault: Invitado[] = [
      {
         id: `invitado-n-1`,
         dni: "",
         nombre: "",
         apellido: "",
         cod_evento: cod_evento,
      },
   ];
   const [nEntradas, setNentradas] = useState(1);
   const [file, setFile] = useState<File>();
   const fileInputRefImage = useRef<HTMLInputElement>(null);

   const [nombre, setNombre] = useState<string>();
   const [alertSucces, setAlertSucces] = useState(false);
   const [invitados, setInvitados] = useState(arrayDefault);
   const [loading, setLoading] = useState(false);
   const [comprador, setComprador] = useState(ticketBuyerDefault);

   const limpiar = () => {
      setNentradas(1);
      setFile(undefined);
      setNombre("");
      setInvitados(arrayDefault);
      setComprador(ticketBuyerDefault);
      if (fileInputRefImage.current) {
         fileInputRefImage.current.value = "";
      }
   };

   const sumaInvitado = () => {
      let copi = [...invitados];
      const inv = {
         id: `invitado-n-${nEntradas + 1}`,
         dni: "",
         nombre: "",
         apellido: "",
         cod_evento: cod_evento,
      };
      copi.push(inv);
      setInvitados(copi);
      setNentradas(nEntradas + 1);
   };

   const restaInvitado = () => {
      if (nEntradas > 1) {
         let copi = [...invitados];
         copi.pop();
         setInvitados(copi);
         setNentradas(nEntradas - 1);
         console.log("resta", copi);
      }
   };

   const handleClick = async () => {
      let copiArray = [...invitados];
      let copyBuyer = { ...comprador };
      let bodySend: any = {};
      bodySend.nEntradas = nEntradas;
      bodySend.c = copyBuyer;
      if (
         file &&
         !veryfyKeysArrayInvitados(copiArray) &&
         !veryfyKeysBuyer(copyBuyer)
      ) {
         try {
            setLoading(true);
            const urlImageFirebase = await uploadFile(file);
            bodySend.url_voucher = urlImageFirebase;
            bodySend.invitados = copiArray;
            await apiClient.post("/userpar/crearRegistroEvento", bodySend);
            setLoading(false);
            setAlertSucces(true);
            setTimeout(() => {
               setAlertSucces(false);
            }, 3000);
            limpiar();
         } catch (error) {
            setLoading(false);
            alert(error);
         }
      }
   };

   const handleChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInvitados((prev) =>
         prev.map((invitado) =>
            invitado.id === id ? { ...invitado, [name]: value } : invitado
         )
      );
   };

   const handleDNIChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) {
         handleChange(id, e);
      }
   };

   const handleTextChange = (id: string, e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/.test(value)) {
         handleChange(id, e);
      }
   };

   const handleTextComprador = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/.test(value)) {
         setComprador((comprador) => ({
            ...comprador,
            [e.target.name]: e.target.value,
         }));
      }
   };
   const handleNumeroComprador = (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) {
         setComprador((comprador) => ({
            ...comprador,
            [e.target.name]: e.target.value,
         }));
      }
   };

   return (
      <>
         {loading && <Loader />}
         {alertSucces && (
            <Alert
               severity="success"
               variant="filled"
               style={{
                  fontSize: "18px",
                  alignItems: "center",
                  padding: "0",
                  borderRadius: "0",
               }}
               className="w-full justify-center"
            >
               Inscripción completada satisfactoriamente
            </Alert>
         )}

         <div className="conten_reinas">
            <section className="conten_pagos">
               <h2 className=" text-2xl ">
                  <b className="color-subt">Datos para el pago</b>
               </h2>
               <div className="bg-gray-200 p-4 rounded-3xl gap-3 flex flex-col text-gray-800">
                  <b>BCP</b>
                  <b>Corporación MMC EIRL</b>
                  <ul>
                     <li>Cuenta: 19473323999043</li>
                     <li>CCI: 00219417332399904390</li>
                  </ul>
                  <b>Aplicaciones</b>
                  <b>Yape</b>
                  <p>980785754</p>
               </div>
               {/* <div className="px-2 text-gray-800">
                  <b className="text-gray-800">Importante:</b>
                  
               </div> */}
            </section>
            <section className="conten_form ">
               <h2 className="text-2xl">
                  <b className="color-subt">Datos para el registro</b>
               </h2>
               <div className="contenEntradas bg-gray- text-gray-800 ">
                  <div className="flex items-center ">
                     <p className="text-xl">Entradas</p>
                     <p className="mx-4 text-xl">S/ 80</p>
                  </div>
                  <div className="flex gap-[8px] items-center">
                     <article
                        className="w-[30px] h-[30px] cursor-pointer rounded-full bg-gray-300 text-white flex items-center justify-center"
                        onClick={restaInvitado}
                     >
                        <FaMinus />
                     </article>
                     <article
                        className="w-[30px] h-[30px] cursor-pointer rounded-full bg-p-mmc text-white flex items-center justify-center"
                        onClick={sumaInvitado}
                     >
                        <FaPlus />
                     </article>
                  </div>
               </div>

               {nEntradas > 0 &&
                  invitados.length > 0 &&
                  invitados.map((invi) => (
                     <div
                        className="w-full  grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-[5px] "
                        key={invi.id}
                     >
                        <div className=" w-full flex flex-col">
                           <TextField
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                 handleDNIChange(invi.id, e)
                              }
                              name="dni"
                              size="small"
                              label="Dni"
                              value={invi.dni}
                           />
                        </div>
                        <div className="w-full flex flex-col">
                           <TextField
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                 handleTextChange(invi.id, e)
                              }
                              name="nombre"
                              size="small"
                              label="Nombre"
                              value={invi.nombre}
                           />
                        </div>
                        <div className="w-full flex flex-col">
                           <TextField
                              name="apellido"
                              size="small"
                              label="Apellidos"
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                 handleTextChange(invi.id, e)
                              }
                              value={invi.apellido}
                           />
                        </div>
                     </div>
                  ))}

               <div className="flex  justify-between px-6 py-2 bg-gray-200 rounded text-xl text-gray-800">
                  <p>Total {`(${nEntradas})`}</p>
                  <p>{`S/ ${nEntradas * 80}`}</p>
               </div>
               <h3 className="text-gray-800 text-xl leading-[1.2]">
                  Datos del comprador
               </h3>
               <div className="w-full  grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-[5px]">
                  <div className="w-full flex flex-col ">
                     <TextField
                        value={comprador.nombres_apellidos}
                        name="nombres_apellidos"
                        size="small"
                        label="Nombres y apellidos"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           handleTextComprador(e)
                        }
                     />
                  </div>
                  <div className="w-full flex flex-col">
                     <TextField
                        value={comprador.celular}
                        name="celular"
                        size="small"
                        label="Celular"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                           handleNumeroComprador(e)
                        }
                     />
                  </div>
                  <div className="w-full flex flex-col">
                     <TextField
                        value={comprador.correo}
                        name="correo"
                        size="small"
                        label="Correo"
                        onChange={(e) =>
                           setComprador((comprador) => ({
                              ...comprador,
                              [e.target.name]: e.target.value,
                           }))
                        }
                     />
                  </div>
               </div>

               <div className="contenImagVoucher">
                  <UploadImage
                     setFile={setFile}
                     nombre={nombre}
                     fileInputRef={fileInputRefImage}
                     setNombre={setNombre}
                  />
               </div>
               <div className="buttonBuy" onClick={handleClick}>
                  <p>Comprar</p>
               </div>
            </section>
         </div>
      </>
   );
};

export default InscriptionsBasic;
