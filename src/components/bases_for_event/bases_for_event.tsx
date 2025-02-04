import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AcordionProvitional from "./acordion-provitional";
import { ModalitiesGarbo, ModalitiesLuis } from "./data-modalities";
import "./bases.css";
import AccordionCustomize from "./acordion-provitional";

const BasesForEvent = ({
   modalities,
   event,
   bases,
   banner,
   categories,
}: {
   modalities: Modality[];
   event: DetailEvent;
   bases: Bases;
   banner: string;
   categories: Category[];
}) => {
   const { quill: quill1, quillRef: quillRef1 } = useQuill({
      readOnly: true,
      modules: {
         toolbar: false,
      },
   });
   const { quill: quill2, quillRef: quillRef2 } = useQuill({
      readOnly: true,
      modules: {
         toolbar: false,
      },
   });
   const { quill: quill3, quillRef: quillRef3 } = useQuill({
      readOnly: true,
      modules: {
         toolbar: false,
      },
   });
   const { quill: quill4, quillRef: quillRef4 } = useQuill({
      readOnly: true,
      modules: {
         toolbar: false,
      },
   });
   const { quill: quill5, quillRef: quillRef5 } = useQuill({
      readOnly: true,
      modules: {
         toolbar: false,
      },
   });
   const { quill: quill6, quillRef: quillRef6 } = useQuill({
      readOnly: true,
      modules: {
         toolbar: false,
      },
   });
   const { quill: quill7, quillRef: quillRef7 } = useQuill({
      readOnly: true,
      modules: {
         toolbar: false,
      },
   });
   useEffect(() => {
      console.log(bases);
      if (quill1) {
         quill1.setContents(bases.intro);
      }
      if (quill2) {
         quill2.setContents(bases.marineras);
      }
      if (quill3) {
         quill3.setContents(bases.consideraciones);
      }
      if (quill4) {
         quill4.setContents(bases.desarrollo);
      }
      if (quill5) {
         quill5.setContents(bases.calificacion);
      }
      if (quill6) {
         quill6.setContents(bases.mod_restriciones);
      }

   }, [
      quill1,
      quill2,
      quill3,
      quill4,
      quill5,
      quill6,
      bases.intro,
      bases.marineras,
      bases.consideraciones,
      bases.desarrollo,
      bases.calificacion,
      bases.mod_restriciones,
   ]);

   const nombreModalidad = (cod: number) => {
      for (const e of modalities) {
         if (e.cod_modalidad == cod) {
            return e.nombre_mod;
         }
      }
   };
   return (
      <article className=" w-full flex flex-col items-center  gap-[20px]">
         <section className="flex flex-col w-[90%] md:flex-row md:w-[80%] justify-center gap-8 self-center">
            <div className="flex-1">
               <img src={banner} alt="" />
            </div>
            <div className="flex-1">
               <p className="text-p-mmc text-[22px] bg-green leading-[.7] mb-[20px]">
                  Introducción
               </p>
               <div ref={quillRef1}></div>
            </div>
         </section>
         <section className="w-[90%] md:w-[80%] flex flex-col">
            <AccordionCustomize title="Modalidades y retricciones">
               <div ref={quillRef6}></div>
            </AccordionCustomize>
         </section>
         <section className="w-[90%] md:w-[80%] flex flex-col">
            <Accordion>
               <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                  expandIcon={<ExpandMoreIcon />}
               >
                  <p className="text-p-mmc text-[22px]">
                     Años de cada categoría
                  </p>
               </AccordionSummary>
               {/* cm.cod_mod != 34 && */}
               {/* cm.cod_mod != 4 &&} */}
               {/* cm.cod_mod != 37 &&  */}
               <AccordionDetails className="bg-white">
                  <div className=" ">
                     <ul className="flex flex-col gap-2 ">
                        {categories.map((cat: Category, i: any) => (
                           <li className="text-[16px] text-gray-500 " key={i}>
                              <b>{cat.nombre_cat}</b>{" "}
                              {`${
                                 parseInt(cat.año_min) > 0
                                    ? ` desde ${cat.año_min}`
                                    : "---"
                              }`}{" "}
                              {`${
                                 parseInt(cat.año_max) > 0
                                    ? ` hasta ${cat.año_max}`
                                    : "---"
                              }`}
                           </li>
                        ))}
                     </ul>
                  </div>
               </AccordionDetails>
            </Accordion>
         </section>
         <section className="w-[90%] md:w-[80%] flex flex-col">
            <Accordion>
               <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                  expandIcon={<ExpandMoreIcon />}
               >
                  <p className="text-p-mmc text-[22px]">
                     Categorías por modalidad
                  </p>
               </AccordionSummary>
               <AccordionDetails className="bg-white">
                  <div className=" flex flex-col gap-4">
                     {event &&
                        event.excepciones.catxmod.map((cm: any, i: any) => (
                           <div className=" flex flex-col" key={i}>
                              <p>{nombreModalidad(cm.cod_mod)}</p>
                              <section className="flex gap-4 flex-wrap text-gray-500">
                                 {cm.categorias &&
                                    cm.categorias.map((cat: any, ind: any) => (
                                       <div className="catmodtab" key={ind}>
                                          <div>{cat.nombre_cat}</div>
                                       </div>
                                    ))}
                              </section>
                           </div>
                        ))}
                  </div>
               </AccordionDetails>
            </Accordion>
         </section>

         <section className="w-[90%] md:w-[80%] flex flex-col">
            <Accordion>
               <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                  expandIcon={<ExpandMoreIcon />}
               >
                  <p className="text-p-mmc text-[22px]">Lista de marineras</p>
               </AccordionSummary>
               <AccordionDetails className="bg-white">
                  <div ref={quillRef2}></div>
               </AccordionDetails>
            </Accordion>
         </section>
         <section className="w-[90%] md:w-[80%] flex flex-col">
            <Accordion>
               <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                  expandIcon={<ExpandMoreIcon />}
               >
                  <p className="text-p-mmc text-[22px]"> Consideraciones</p>
               </AccordionSummary>
               <AccordionDetails className="bg-white">
                  <div ref={quillRef3}></div>
               </AccordionDetails>
            </Accordion>
         </section>
         <section className="w-[90%] md:w-[80%] flex flex-col">
            <Accordion>
               <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                  expandIcon={<ExpandMoreIcon />}
               >
                  <p className="text-p-mmc text-[22px]">
                     Desarrollo del concurso
                  </p>
               </AccordionSummary>
               <AccordionDetails className="bg-white">
                  <div ref={quillRef4}></div>
               </AccordionDetails>
            </Accordion>
         </section>
         <section className="w-[90%] md:w-[80%] flex flex-col">
            <Accordion>
               <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                  expandIcon={<ExpandMoreIcon />}
                  className="bg-red"
               >
                  <p className="text-p-mmc text-[22px]">Calificación</p>
               </AccordionSummary>
               <AccordionDetails className="bg-white">
                  <div ref={quillRef5}></div>
               </AccordionDetails>
            </Accordion>
         </section>
         <section className="w-[90%] md:w-[80%] flex flex-col">
            <Accordion>
               <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                  expandIcon={<ExpandMoreIcon />}
               >
                  <p className="text-p-mmc text-[22px]">Premios</p>
               </AccordionSummary>
               <AccordionDetails className="bg-white">
                  {bases?.premios && bases.premios.length > 0 && (
                     <div className="p-2  gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {bases.premios.map((premio: any, i: any) => (
                           <div key={i} className=" p-2 bg-gray-100 rounded">
                              <h3>🏆 {premio.titulo}</h3>
                              <div className="ml-4 text-gray-500">
                                 <p>
                                    <span>1° Puesto:</span> {premio.premio1}
                                 </p>
                                 <p>
                                    <span>2° Puesto:</span> {premio.premio2}
                                 </p>
                                 <p>
                                    <span>3° Puesto:</span> {premio.premio3}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
                  {event?.cod_concurso == 418 && (
                     <div className="text-gray-500 w-full">
                        La organización del concurso considera entregar premios
                        honoríficos: bandas, escapularios, medallas, diplomas
                        para los ganadores en primer, segundo y tercer puesto en
                        su categoría y además dinero en efectivo para la
                        categoría campeón de campeones y mejor traje típico. Los
                        premios serán entregados enceremonia inmediata y sobre
                        el pódium de premiación.
                     </div>
                  )}
               </AccordionDetails>
            </Accordion>
         </section>
      </article>
   );
};

export default BasesForEvent;
