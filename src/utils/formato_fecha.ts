const formatoFecha = (fechaStr:string):string => {
    const fechaObjeto = new Date(fechaStr);
  
    const opcionesDeFormato: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "short",
      timeZone: "America/Lima" // Especifica la zona horaria UTC para evitar ajustes
    };
  
    const formatoPersonalizado = fechaObjeto.toLocaleString("es-PE", opcionesDeFormato);
    const resultadoAjustado = formatoPersonalizado.replace(
      /(\b\p{L}+\b)/gu,
      (palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    );
  
    return resultadoAjustado;
  };
  
  export default formatoFecha;