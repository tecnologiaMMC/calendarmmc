export const format_hour=(fechaStr:string)=> {
    // Crear un objeto Date a partir de la cadena de fecha
    let fecha = new Date(fechaStr);

    // Obtener la hora y los minutos
    let horas = fecha.getHours();
    let minutos:number = fecha.getMinutes();

    // Determinar si es AM o PM
    let periodo = horas >= 12 ? "pm" : "am";

    // Convertir la hora al formato de 12 horas
    horas = horas % 12;
    horas = horas ? horas : 12; // La hora '0' debe ser '12'

    // Asegurarse de que los minutos siempre tengan dos dígitos
    let minutosT: string = minutos < 10 ? "0" + minutos.toString() : minutos.toString()
    // Formatear la hora
    let horaFormateada = horas + ":" + minutosT + " " + periodo;

    return horaFormateada;
 }