import { useEffect, useRef, useState } from "react";
import Select, { SelectInstance } from "react-select";
import React, { Dispatch, SetStateAction, ChangeEvent } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RegisterPair from "./register_pair";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import {
   accordionSx,
   formDefault,
   selectStyles,
   validationForm,
   validationIndividual,
} from "./cutomStyles";
import RegisterSingle from "./register_single";
import RegisterContact from "./register_contact";
import UploadImage from "../UploadImage/UploadImage";
import { uploadFile } from "@/firebase/config";
import { Checkbox } from "@mui/material";
import Loader from "../loader/Loader";
import ModalRegister from "../modal_register/modal_register";
import apiClient from "@/services/axiosInstance";
import ModalCategory from "../modal_category/modal_category";
import { FaUserPlus } from "react-icons/fa6";

const customTheme = (theme: any) => ({
   ...theme,
   borderRadius: 15,
});

const editFomDefault = (cod_evento: number) => {
   let copy = { ...formDefault };
   copy.codConcurso = cod_evento;
   return copy;
};

const Registrations = ({
   categories,
   modalities,
   event,
}: {
   categories: Category[];
   modalities: Modality[];
   event: DetailEvent;
}) => {
   const refselectCategories = React.useRef<SelectInstance | null>(null);
   const refselectModalities = React.useRef<SelectInstance | null>(null);

   const [selectCategories, setSelectCategories] =
      useState<Category[]>(categories);
   const [selectModalities, setSelectModalities] =
      useState<Modality[]>(modalities);
   const [modalit, setModalit] = useState<Modality>();

   const [categoria, setCategoria] = useState<Category>();

   const [form, setForm] = useState<FormRegistro>(
      editFomDefault(event.cod_concurso)
   );

   const [nombre, setNombre] = useState<string>();
   const [file, setFile] = useState<File>();
   const fileInputRef = useRef<HTMLInputElement>(null);

   const [errors, setErrors] = useState<any>({});

   const [loader, setLoader] = useState<boolean>(false);
   const [modal, setModal] = useState<boolean>(false);
   const [modalCat, setModalCat] = useState<boolean>(false);
   const url_register_participante = `/userpar/registrarse/`;
   const [expandedPanels, setExpandedPanels] = useState<any[]>([]);
   const [checkBox, setCheckBox] = useState<boolean>(false);
   const [hidenForm, setHidenForm] = useState(false);

   const handleChange = (panel: any) => (event: any, isExpanded: any) => {
      setExpandedPanels((prevState) => {
         if (isExpanded) {
            return [...prevState, panel];
         } else {
            return prevState.filter((item) => item !== panel);
         }
      });
   };

   useEffect(() => {
      if (event.fin_evento) {
         let factual = new Date();
         if (factual > new Date(event.fin_evento)) {
            setHidenForm(true);
         }
      }
   }, []);

   useEffect(() => {
      let copia: DetailEvent = { ...event };
      if (modalit) {
         let c = copia.excepciones.catxmod.filter(
            (ex) => parseInt(ex.cod_mod) === modalit.cod_modalidad
         );
         setSelectCategories(c[0].categorias);
      } else {
         setSelectCategories(categories);
      }
      let copiForm = { ...form };
      setForm(editFomDefault(event.cod_concurso));
      setErrors(validationForm(copiForm));
   }, [modalit]);

   const handleChamgeModality = (
      options: { label: string; value: number } | null
   ) => {
      if (options) {
         let m = modalities.filter(
            (mod) => mod.cod_modalidad === options.value
         );
         setModalit(m[0]);
         refselectCategories.current?.clearValue();
      } else {
         refselectCategories.current?.clearValue();
         setModalit(undefined);
      }
   };

   const handleChangeCategory = (
      options: { label: string; value: number } | null
   ) => {
      if (options) {
         let c = categories.filter(
            (cat) => cat.cod_categoria === options.value
         );
         setCategoria(c[0]);
      } else {
         setCategoria(undefined);
      }
   };
   const handleChangeTextField = (e: any) => {
      const { name, value } = e.target;
      let copiForm: any = { ...form };
      copiForm[name] = value;
      setForm(copiForm);
      setErrors(validationForm(copiForm));
   };

   const clearForm = () => {
      refselectModalities.current?.clearValue();
      refselectCategories.current?.clearValue();
      setModalit(undefined);
      setCategoria(undefined);
      setForm(editFomDefault(event.cod_concurso));

      setExpandedPanels([]);
      setFile(undefined);
      setNombre("");
      if (fileInputRef.current) {
         fileInputRef.current.value = "";
      }
      setLoader(false);
      setModal(true);
      setCheckBox(false);
   };
   const signUpParticipation = async () => {
      if (!checkBox) return;
      if (!file) return;
      if (categoria === undefined) return;
      if (modalit === undefined) return;
      let copiForm = { ...form };
      if (modalit.tipo === "Pareja") {
         if (Object.keys(validationForm(form)).length > 0) return;
         copiForm.tipoRegistro = "1";
      }
      if (modalit.tipo === "Individual") {
         if (Object.keys(validationIndividual(form)).length > 0) return;
         copiForm.tipoRegistro = "2";
      }

      try {
         setLoader(true);
         let urlResult = await uploadFile(file);
         copiForm.voucher = urlResult;
         copiForm.codModalidad = modalit.cod_modalidad;
         copiForm.nombreMod = modalit.nombre_mod;
         copiForm.codCategoria = categoria.cod_categoria;
         copiForm.nombreCat = categoria.nombre_cat;
         copiForm.correo = event.correo;
         copiForm.nombreCon = event.nombre_concurso;
         copiForm.slug = event.slug;
         copiForm.lugar = event.lugar;
         copiForm.codConcurso = event.cod_concurso;
         const consult = await apiClient.post(
            url_register_participante,
            copiForm
         );

         console.log("Formulario enviado: ", copiForm);
         console.log("Respuetsa del formualrio: ", consult);
         clearForm();
      } catch (error) {
         setLoader(false);
         alert("El registro a fallado");
      }
   };

   const closeModaRegister = () => {
      setModal(false);
   };
   const closeModaCategory = () => {
      setModalCat(false);
   };

   const handlechangeCehckBox = () => {
      setCheckBox(!checkBox);
   };

   return (
      <div className="w-full min-h-[100vh]  flex flex-col items-center   ">
         {loader && <Loader />}
         {modal && <ModalRegister closeModaRegister={closeModaRegister} />}
         {!hidenForm && (
            <>
               <div
                  className="bg-s-mmc text-white px-4 py-2 leading-[1.2] cursor-pointer text-[18px] rounded"
                  onClick={() => setModalCat(true)}
               >
                  Verifica tu categoría
               </div>
               {selectCategories && modalCat && (
                  <ModalCategory
                     closeModaCategory={closeModaCategory}
                     selectCategories={selectCategories}
                  />
               )}

               <div className="w-[95%] sm:w-[90%] md:w-[80%] mt-[20px] flex flex-col">
                  <Select
                     ref={refselectModalities}
                     theme={customTheme}
                     styles={selectStyles}
                     className="basic-single text-center"
                     classNamePrefix="select"
                     placeholder="1- Selecione una modalidad"
                     isDisabled={false}
                     isClearable={true}
                     isSearchable={true}
                     name="typeEvent"
                     options={selectModalities.map((mod) => ({
                        label: mod.nombre_mod,
                        value: mod.cod_modalidad,
                     }))}
                     onChange={(options: any) => handleChamgeModality(options)}
                  />
                  {!modalit && (
                     <p className="text-s-mmc ml-[12px] text-[12px] md:text-[14px]">
                        * El campo modalidad es requerido
                     </p>
                  )}
               </div>
               <div className="w-[95%] sm:w-[90%] md:w-[80%] mt-[20px] flex flex-col">
                  <Select
                     ref={refselectCategories}
                     styles={selectStyles}
                     theme={customTheme}
                     className="basic-single text-center"
                     classNamePrefix="select"
                     placeholder="2- Seleccione una categoría"
                     isDisabled={false}
                     isClearable={true}
                     isSearchable={true}
                     name="typeEvent"
                     options={selectCategories.map((cat) => ({
                        label: cat.nombre_cat,
                        value: cat.cod_categoria,
                     }))}
                     onChange={(options: any) => handleChangeCategory(options)}
                  />
                  {!categoria && (
                     <p className="text-s-mmc ml-[12px] text-[12px] md:text-[14px]">
                        * El campo categoría es requerido
                     </p>
                  )}
               </div>
               <article className=" flex flex-col gap-[20px] w-[95%] sm:w-[90%] md:w-[80%] mt-[20px]">
                  <section>
                     <Accordion
                        sx={accordionSx}
                        expanded={expandedPanels.includes("panel1")}
                        onChange={handleChange("panel1")}
                     >
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls="panel1-content"
                           id="panel1-header"
                           className="text-p-mmc"
                        >
                           <p className="text-p-mmc text-[13px] sm:text-[16px]">
                              3- Datos del Participante
                           </p>
                        </AccordionSummary>
                        <AccordionDetails>
                           {modalit && modalit.tipo == "Pareja" && (
                              <RegisterPair
                                 handleChangeTextField={handleChangeTextField}
                                 form={form}
                                 errors={errors}
                              />
                           )}
                           {modalit && modalit.tipo == "Individual" && (
                              <RegisterSingle
                                 handleChangeTextField={handleChangeTextField}
                                 form={form}
                                 errors={errors}
                              />
                           )}
                        </AccordionDetails>
                     </Accordion>
                  </section>
                  <section>
                     <Accordion
                        sx={accordionSx}
                        expanded={expandedPanels.includes("panel2")}
                        onChange={handleChange("panel2")}
                     >
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls="panel1-content"
                           id="panel1-header"
                        >
                           <p className="text-p-mmc text-[13px] sm:text-[16px]">
                              4- ¿A quién enviamos los datos de tu registro?
                           </p>
                        </AccordionSummary>
                        <AccordionDetails>
                           {modalit && (
                              <RegisterContact
                                 handleChangeTextField={handleChangeTextField}
                                 form={form}
                                 errors={errors}
                              />
                           )}
                        </AccordionDetails>
                     </Accordion>
                  </section>
                  <section className=" flex flex-col">
                     <Accordion
                        sx={accordionSx}
                        expanded={expandedPanels.includes("panel3")}
                        onChange={handleChange("panel3")}
                     >
                        <AccordionSummary
                           expandIcon={<ExpandMoreIcon />}
                           aria-controls="panel1-content"
                           id="panel1-header"
                        >
                           <p className="text-p-mmc text-[13px] sm:text-[16px]">
                              5- Adjunte la Imagen de su Voucher
                           </p>
                        </AccordionSummary>
                        <AccordionDetails>
                           {modalit && (
                              <div className="w-full h-[90px] md:h-[140px]">
                                 <UploadImage
                                    nombre={nombre}
                                    setFile={setFile}
                                    setNombre={setNombre}
                                    fileInputRef={fileInputRef}
                                 />
                              </div>
                           )}
                        </AccordionDetails>
                     </Accordion>
                     {!file && (
                        <p className="text-[12px] md:text-[14px] pl-[12px] text-s-mmc">
                           *Adjunte la imagen del voucher
                        </p>
                     )}
                  </section>

                  <section className="flex flex-row items-center  text-p-mmc">
                     <Checkbox
                        sx={{
                           color: "#45204b",
                           "&.Mui-checked": {
                              color: "#45204b",
                           },
                        }}
                        checked={checkBox}
                        onChange={handlechangeCehckBox}
                     />
                     Estoy de acuerdo en que los datos ingresados son verídicos
                  </section>
               </article>
               <button
                  className="bg-p-mmc hover:bg-p-mmc-h cursor-pointer py-2 px-4 mt-[16px] flex items-center gap-2 text-white text-[16px] md:text-[25px] md:px-8 rounded-[16px]"
                  onClick={signUpParticipation}
               >
                  <FaUserPlus />
                  <p className="mt-[-2px]">Registrarse</p>
               </button>
            </>
         )}
         {hidenForm && (
            <>
               <section className="text-s-mmc md:mx-32">
                  <h2 className="text-[16px] sm:text-[30px] text-center">
                     {event.cod_concurso == 129
                        ? "Las inscripciones virtuales han concluido. Podrás inscribirte de manera presencial en el coliseo a partir de las 9:00 a.m."
                        : "Las inscripciones virtuales han concluido."}
                  </h2>
               </section>
            </>
         )}
      </div>
   );
};
export default Registrations;
