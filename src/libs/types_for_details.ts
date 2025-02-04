interface Category {
   año_max: string;
   año_min: string;
   nombre_cat: string;
   cod_categoria: number;
}
interface Modality {
   cod_modalidad: number;
   nombre_mod: string;
   precio: string;
   tipo: string;
}

interface Excepcion {
   cod_mod: string;
   categorias: Category[];
}

interface Catxmod {
   catxmod: Excepcion[];
}

interface Bases {
   intro: any;
   marineras:any;
   consideraciones:any;
   desarrollo: any;
   calificacion: any;
   premios:any;
   metodo_pago:any;
   mod_restriciones:any;
   mensaje_cierre:any;
}

interface DetailEvent {
   Organizadores_cod_organizador: number;
   banner_con: string;
   cod_concurso: number;
   cont_vistas: number;
   correo: string;
   departamento: string;
   excepciones: Catxmod;
   fecha: string;
   fin_evento: string;
   hora: string;
   linkMaps: string;
   lugar: string;
   nombre_concurso: string;
   nombre_org: string;
   premiun: number;
   provincia: string;
   redes: string;
   registroactive: number;
   slug: string;
   telefono: string;
   tipos_evento_cod_tipo: number;
   num_base:number;
}

interface FormRegistro {
   voucher: string;
   tipoRegistro: string;
   nombreContacto: string;
   numeroContacto: string;
   correoContacto: string;
   codModalidad: number;
   codCategoria: number;
   codConcurso: number;
   cod_estado: string;
   nombre_1: string;
   apellido_1: string;
   ciudad_1: string;
   fecha_nac_1: string;
   dni_1: string;
   num_1: string;
   academia_1: string;
   codRol_1: string;
   codGenero_1: string;
   nombre_2: string;
   apellido_2: string;
   ciudad_2: string;
   dni_2: string;
   fecha_nac_2: string;
   num_2: string;
   academia_2: string;
   codRol_2: string;
   codGenero_2: string;
   slug: string;
   nombreMod: string;
   nombreCat: string;
   correo: string;
   lugar: string;
   nombreCon: string;
   num_base:number;
}
