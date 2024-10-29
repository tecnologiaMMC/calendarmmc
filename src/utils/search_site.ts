import { buscarDistritoPorId, buscarProvinciaPorId } from "./search_binary";
import sites from "./sites";


export const SearchProvincia = (cod_dep:string, cod_pro:string):string|null=>{
    let filtro = sites.provincias.filter(
       (pro) => pro.department_id == cod_dep
    );
    return buscarProvinciaPorId(filtro,cod_pro);
 };

 export const  SearchDistrito = (cod_pro:string, cod_dis:string):string|null=> {
    let filtro = sites.distritos.filter((d) => d.province_id == cod_pro);

    return buscarDistritoPorId(filtro, cod_dis);
 };