import { DatesFiltro } from "@/libs/types";

export const eventsToday = ():DatesFiltro => {
    var fechaActual = new Date();
    var dia = fechaActual.getDate();
    var mes:string = `${fechaActual.getMonth() + 1}`;
    var año = fechaActual.getFullYear();

    if (parseInt(mes) < 10) {
       mes = `0${mes}`;
    }
    var fechaActualComoDato:string = año + "-" + mes + "-" + dia;

    return {
        dateStart:fechaActualComoDato,
        dateEnd:fechaActualComoDato
    }
 };

 export const eventsWeek = ():DatesFiltro => {
    var fechaActual = new Date();
    var dia:string|number = fechaActual.getDate();
    var mes:string|number = fechaActual.getMonth() + 1;
    var año:string|number = fechaActual.getFullYear();
    if (mes < 10) {
       mes = `0${mes}`;
    }
    if (dia < 10) {
       dia = `0${dia}`;
    }
    var fechaActualComoDato = año + "-" + mes + "-" + dia;

    var fechaVariable = new Date();
    var diaSemana = fechaVariable.getDay();
    var diasFaltantes = 7 - diaSemana;
    fechaVariable.setDate(fechaActual.getDate() + diasFaltantes);
    var uDia:number|string = fechaVariable.getDate();
    var uDiaMes:number|string = fechaVariable.getMonth() + 1;
    var uDiaMesAnho:number|string = fechaVariable.getFullYear();
    if (uDiaMes < 10) {
       uDiaMes = `0${uDiaMes}`;
    }
    if (uDia < 10) {
       uDia = `0${uDia}`;
    }
    var fechaUltima = uDiaMesAnho + "-" + uDiaMes + "-" + uDia;
    return {
        dateStart:fechaActualComoDato,
        dateEnd:fechaUltima
    }
 };

 export const eventsMonth = ():DatesFiltro => {
    var fechaActual = new Date();
    var dia:number|string = fechaActual.getDate();
    var mes:number|string = fechaActual.getMonth() + 1;
    var año = fechaActual.getFullYear();
    if (mes < 10) {
       mes = `0${mes}`;
    }
    if (dia < 10) {
       dia = `0${dia}`;
    }
    var fechaActualComoDato = año + "-" + mes + "-" + dia;

    var fechaVariable = new Date();
    var ultimoDiaMes = new Date(
       fechaVariable.getFullYear(),
       fechaVariable.getMonth() + 1,
       0
    );
    var diaUltimoDiaMes = ultimoDiaMes.getDate();
    var mesUltimoDiaMes:string|number = ultimoDiaMes.getMonth() + 1;
    var añoUltimoDiaMes:string|number = ultimoDiaMes.getFullYear();
    if (mesUltimoDiaMes < 10) {
       mesUltimoDiaMes = `0${mesUltimoDiaMes}`;
    }

    var fechaUl =
       añoUltimoDiaMes + "-" + mesUltimoDiaMes + "-" + diaUltimoDiaMes;
    return{
        dateStart:fechaActualComoDato,
        dateEnd:fechaUl
    };
 };