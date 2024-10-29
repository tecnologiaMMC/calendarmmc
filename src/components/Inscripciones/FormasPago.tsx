import { useEffect } from "react";
import "./FormasPago.css";
import { useQuill } from "react-quilljs";
const FormasPago = ({
   cod_org,
   modalities,
   metodo_pago,
   cod_evento
}: {
   cod_org: number;
   modalities: Modality[];
   metodo_pago: any;
   cod_evento:number;
}) => {
   const { quill: quill1, quillRef: quillRef1 } = useQuill({
      readOnly: true,
      modules: {
         toolbar: false,
      },
   });

   useEffect(() => {
      if (quill1) {
         quill1.setContents(metodo_pago);
      }
   }, [quill1, metodo_pago]);
   return (
      <div className="contenFormasPago">
         <div className="contenListaMod">
            <h2>Precios de inscripción virtual</h2>
            <ul>
               {modalities.map((mod: Modality, i: number) => (
                  <li key={i}>
                     <b>{mod.nombre_mod}</b>
                     <p>{cod_evento== 418?`$${mod.precio}`:`S/.${mod.precio}`} </p>
                  </li>
               ))}
            </ul>
            {/* {cod_org===7 && (
               <>
                  <h2>Precios de inscripción Presencial</h2>
                  <ul>
                     <li>
                        <b>Seriado e Individual</b>
                        <p>S/. 20</p>
                     </li>
                     <li>
                        <b>Novel y Nacional</b>
                        <p>S/. 30</p>
                     </li>
                  </ul>
               </>
            )} */}
         </div>

         <div className="contenInfoPago">
            <h2>Formas de pago</h2>
            <div ref={quillRef1}></div>
         </div>
      </div>
   );
};

export default FormasPago;
