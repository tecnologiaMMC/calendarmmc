export function ordenarPorLetraInicial(a:any, b:any) {
    const palabrasOrden = [
       "ser",
       "ind",
       "nov",
       "nac",
       "rei",
       "cam",
       "inc",
       "la",
       "fam",
    ];
 
    // Función auxiliar para obtener la palabra clave de la propiedad nombre_mod
    function obtenerPalabraClave(objeto:any) {
       let nombre = objeto.nombre_mod.toLowerCase();
       for (let palabra of palabrasOrden) {
          if (nombre.startsWith(palabra)) {
             return palabra;
          }
       }
       return nombre; // Si no se encuentra ninguna palabra clave, se devuelve el nombre completo
    }
 
    let palabraA = obtenerPalabraClave(a);
    let palabraB = obtenerPalabraClave(b);
 
    // Ordenar por la palabra clave obtenida
    return palabrasOrden.indexOf(palabraA) - palabrasOrden.indexOf(palabraB);
 }