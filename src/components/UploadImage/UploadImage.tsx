import './Upload.css'
import React, { Dispatch, SetStateAction,ChangeEvent, RefObject } from "react";

interface  UploadImageProps {
  setFile: Dispatch<SetStateAction<File|undefined>>;
  nombre: string|undefined;
  setNombre:Dispatch<SetStateAction<string|undefined>>; 
  fileInputRef: RefObject<HTMLInputElement>;

}

const UploadImage:React.FC<UploadImageProps> = ({setFile,nombre,setNombre, fileInputRef}) => {

 const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
   if (e.target.files) {
        setFile(e.target.files[0])
        setNombre(e.target.files[0].name)
   }
   else{
      console.log('Fue cancelada la subida de imagen ');
   }
 }
  return (
    <div className="image-upload-wrap">
      <input
        className="file-upload-input"
        type="file"
        accept="image/*"
        ref={fileInputRef}
        multiple
        onChange={e=>{handleChange(e)}}
      />
      <div className="text-information">
        {!nombre?<h3> Suelta o selecciona tu Voucher</h3>:<h3>{nombre}</h3>}
      </div>
    </div>
  );
};

export default UploadImage;
