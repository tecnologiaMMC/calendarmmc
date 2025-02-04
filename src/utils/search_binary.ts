import { Departamento, Distrito, Provincia } from "@/libs/types";

export const buscarDepartamentoPorId = (
   departamentos: Departamento[],
   id: string
): string | null => {
   let inicio = 0;
   let fin = departamentos.length - 1;

   while (inicio <= fin) {
      const medio = Math.floor((inicio + fin) / 2);
      const deptoMedio = departamentos[medio];

      if (deptoMedio.id === id) {
         return deptoMedio.name;
      } else if (deptoMedio.id < id) {
         inicio = medio + 1;
      } else {
         fin = medio - 1;
      }
   }

   return null;
};
export const buscarDepartamentoPorIdConvertToInt = (
   departamentos: Departamento[],
   id: string
): string | null => {
   let inicio = 0;
   let fin = departamentos.length - 1;

   while (inicio <= fin) {
      const medio = Math.floor((inicio + fin) / 2);
      const deptoMedio = departamentos[medio];

      if (parseInt(deptoMedio.id) === parseInt(id)) {
         return deptoMedio.name;
      } else if (parseInt(deptoMedio.id) < parseInt(id)) {
         inicio = medio + 1;
      } else {
         fin = medio - 1;
      }
   }

   return null;
};

export const buscarProvinciaPorId = (
   provincias: Provincia[],
   id: string
): string | null => {
   let inicio = 0;
   let fin = provincias.length - 1;

   while (inicio <= fin) {
      const medio = Math.floor((inicio + fin) / 2);
      const provinciaMedia = provincias[medio];

      if (provinciaMedia.id === id) {
         return provinciaMedia.name;
      } else if (provinciaMedia.id < id) {
         inicio = medio + 1;
      } else {
         fin = medio - 1;
      }
   }

   return null;
};

export const buscarProvinciaPorIdconvertToInt = (
   provincias: Provincia[],
   id: string
): string | null => {
   let inicio = 0;
   let fin = provincias.length - 1;

   while (inicio <= fin) {
      const medio = Math.floor((inicio + fin) / 2);
      const provinciaMedia = provincias[medio];
      // console.log('media',parseInt(provinciaMedia.id));
      // console.log(parseInt(id));
      if (parseInt(provinciaMedia.id) === parseInt(id)) {
         // console.log("serach binbary", provinciaMedia.name);

         return provinciaMedia.name;
      } else if (parseInt(provinciaMedia.id) < parseInt(id)) {
         inicio = medio + 1;
      } else {
         fin = medio - 1;
      }
   }

   return null;
};
export const buscarDistritoPorId = (
   distritos: Distrito[],
   id: string
): string | null => {
   let inicio = 0;
   let fin = distritos.length - 1;

   while (inicio <= fin) {
      const medio = Math.floor((inicio + fin) / 2);
      const distritoMedio = distritos[medio];

      if (distritoMedio.id === id) {
         return distritoMedio.name;
      } else if (distritoMedio.id < id) {
         inicio = medio + 1;
      } else {
         fin = medio - 1;
      }
   }

   return null;
};
