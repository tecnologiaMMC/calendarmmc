export interface Event{
    cod_concurso: number;
    nombre_concurso:string;
    slug: string;
    departamento: string;
    provincia:string;
    distrito:string;
    fecha:string;
    tipos_evento_cod_tipo:number;
    registroactive:number;
    hora:string;
    lugar:string;
    premiun:number;
    subtitulo:string;
    cod_estado:number;
    banner_con:string;
}

export interface Departamento{
  id:string,
  name:string
}

export interface Provincia{
  id:string,
  name:string,
  department_id:string
}

export interface Distrito{
      id:string,
      name: string,
      province_id: string,
      department_id: string,
}

export interface DatesFiltro{
  dateStart:string,  
  dateEnd:string
}
export interface TypeEvent{
  cod_type:string,
  name:string
}
