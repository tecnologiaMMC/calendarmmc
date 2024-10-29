
const format_name_event = (cod_type_event:number,nombreEvento:string):string => {
    if (cod_type_event == 4) {
       return `Ensaya con ${nombreEvento}`;
    } else {
       return nombreEvento;
    }
 };

 export default format_name_event