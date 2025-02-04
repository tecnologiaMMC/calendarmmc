export const selectStyles = {
   control: (provided: any, state: any) => ({
      ...provided,
      minHeight: state.menuIsOpen ? "auto" : "50px",
   }),
   placeholder: (provided: any) => ({
      ...provided,
      color: "#45204b",
      textAlign: "start",
      marginLeft: "4px",
      fontSize: "13px", // Tamaño por defecto del placeholder
      "@media (min-width: 640px)": {
         fontSize: "16px", // Ajuste para pantallas sm (640px) o más grandes
      },
   }),
   singleValue: (provided: any) => ({
      ...provided,
      color: "#45204b",
      marginLeft: "73px",
   }),
   menu: (styles: any) => ({
      ...styles,
      zIndex: 500,
   }),
};

export const accordionSx = {
   boxShadow: "none",
   border: "1px solid #cccccc",
   borderRadius: "15px !important",
};

export const styleDates = {
   width: "100%",
   "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      height: "40px",
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
         borderColor: "#45204b",
      },
      "& .MuiInputBase-input": {
         padding: "0 14px",
      },
   },
   "& .MuiFormLabel-root": {
      "&.Mui-focused": {
         marginTop: "0px",
         color: "#45204b",
      },
      "&:not(.Mui-focused):not(.MuiInputLabel-shrink)": {
         marginTop: "-7px",
      },
   },
};

export const formDefault = {
   voucher: "",
   tipoRegistro: "",
   nombreContacto: "",
   numeroContacto: "",
   correoContacto: "",
   codModalidad: 0,
   codCategoria: 0,
   codConcurso: 0,
   cod_estado: "1",
   nombre_1: "",
   apellido_1: "",
   ciudad_1: "no_registrado",
   fecha_nac_1: "",
   dni_1: "",
   num_1: "no_registrado",
   academia_1: "",
   codRol_1: "1",
   codGenero_1: "1",
   nombre_2: "",
   apellido_2: "",
   ciudad_2: "no_registrado",
   dni_2: "",
   fecha_nac_2: "",
   num_2: "no_registrado",
   academia_2: "",
   codRol_2: "1",
   codGenero_2: "2",
   slug: "",
   nombreMod: "",
   nombreCat: "",
   correo: "",
   lugar: "",
   nombreCon: "",
   num_base: 0,
};

export const validationForm = (form: FormRegistro) => {
   let errors: any = {};
   let regexName = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/;
   let regexdni = /^(?!0+$)\d{1,16}$/;
   let regexnumber = /^(?!0+$)\d{1,9}$/;
   let regexfec = /^\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}$/;
   let regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   if (!form.nombre_1.trim()) {
      errors.nom_1 = "El campo 'Nombre' es requerido";
   } else if (!regexName.test(form.nombre_1.trim())) {
      errors.nom_1 = "El campo 'Nombre' solo acepta letras";
   }
   if (!form.apellido_1.trim()) {
      errors.ape_1 = "El campo 'Apellido' es requerido";
   } else if (!regexName.test(form.apellido_1.trim())) {
      errors.ape_1 = "El campo 'Apellido' solo acepta letras";
   }

   if (form.codConcurso != 418) {
      if (form.dni_1 == "") {
         errors.dn_1 = "El campo 'DNI/RUT' es requerido";
      } else if (!regexdni.test(form.dni_1)) {
         errors.dn_1 =
            "El campo 'DNI/RUT' solo acepta números y máximo 16 caracteres";
      }
   }

   if (!form.nombre_2.trim()) {
      errors.nom_2 = "El campo 'Nombre' es requerido";
   } else if (!regexName.test(form.nombre_2.trim())) {
      errors.nom_2 = "El campo 'Nombre' solo acepta letras";
   }

   if (!form.apellido_2.trim()) {
      errors.ape_2 = "El campo 'Apellido' es requerido";
   } else if (!regexName.test(form.apellido_2.trim())) {
      errors.ape_2 = "El campo 'Apellido' solo acepta letras";
   }
   if (form.codConcurso != 418) {
      if (form.dni_2 == "") {
         errors.dn_2 = "El campo 'DNI/RUT' es requerido";
      } else if (!regexdni.test(form.dni_2)) {
         errors.dn_2 =
            "El campo 'DNI' solo acepta números y máximo 16 caracteres";
      }
   }

   if (!regexfec.test(form.fecha_nac_1)) {
      errors.fc_1 = "El campo 'Fecha' es requerido";
   }
   if (!regexfec.test(form.fecha_nac_2)) {
      errors.fc_2 = "El campo 'Fecha' es requerido";
   }

   if (!form.nombreContacto.trim()) {
      errors.nom_c = "El campo 'Nombre' es requerido";
   } else if (!regexName.test(form.nombreContacto.trim())) {
      errors.nom_c = "El campo 'Nombres' solo acepta letras";
   }

   if (form.numeroContacto == "") {
      errors.nu_c = "El campo 'Número de Contacto' es requerido";
   } else if (!regexnumber.test(form.numeroContacto)) {
      errors.nu_c =
         "El campo 'Número de Contacto' solo acepta números y máximo 9 caracteres";
   }
   if (!form.correoContacto.trim()) {
      errors.co_c = "El campo 'Correo' es requerido";
   } else if (!regexCorreo.test(form.correoContacto.trim())) {
      errors.co_c = "Ingrese un correo Valido";
   }

   return errors;
};

export const validationIndividual = (form: FormRegistro) => {
   let errors: any = {};
   let regexName = /^[a-zA-Z\sáéíóúÁÉÍÓÚñÑüÜ]+$/;
   // let regexdni=/^(?!0+$)\d+$/;
   let regexdni = /^(?!0+$)\d{1,16}$/;
   let regexnumber = /^(?!0+$)\d{1,9}$/;
   let regexfec = /^\d{1,4}[-/.]\d{1,2}[-/.]\d{1,4}$/;
   let regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

   if (!form.nombre_1.trim()) {
      errors.nom_1 = "El campo 'Nombre' es requerido";
   } else if (!regexName.test(form.nombre_1.trim())) {
      errors.nom_1 = "El campo 'Nombre' solo acepta letras";
   }

   if (!form.apellido_1.trim()) {
      errors.ape_1 = "El campo 'Apellido' es requerido";
   } else if (!regexName.test(form.apellido_1.trim())) {
      errors.ape_1 = "El campo 'Apellido' solo acepta letras";
   }
   if (form.codConcurso != 418) {
      if (form.dni_1 == "") {
         errors.dn_1 = "El campo 'DNI/RUT' es requerido";
      } else if (!regexdni.test(form.dni_1)) {
         errors.dn_1 =
            "El campo 'DNI/RUT' solo acepta números y máximo 16 caracteres";
      }
   }

   if (!regexfec.test(form.fecha_nac_1)) {
      errors.fc_1 = "El campo 'Fecha' es requerido";
   }

   if (!form.nombreContacto.trim()) {
      errors.nom_c = "El campo 'Nombre' es requerido";
   } else if (!regexName.test(form.nombreContacto.trim())) {
      errors.nom_c = "El campo 'Nombre' solo acepta letras";
   }

   if (form.numeroContacto == "") {
      errors.nu_c = "El campo 'Número de Contacto' es requerido";
   } else if (!regexnumber.test(form.numeroContacto)) {
      errors.nu_c =
         "El campo 'Número de Contacto' solo acepta números y máximo 9 caracteres";
   }
   if (!form.correoContacto.trim()) {
      errors.co_c = "El campo 'Correo' es requerido";
   } else if (!regexCorreo.test(form.correoContacto.trim())) {
      errors.co_c = "Ingrese un Correo Valido";
   }
   return errors;
};
