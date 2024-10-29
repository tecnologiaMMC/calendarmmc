// services/axiosInstance.ts

import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_BASE_MMC, // Obtén la URL base desde el archivo .env
  headers: {
    'Content-Type': 'application/json',
    // Puedes añadir otros encabezados comunes aquí si es necesario
  },
});

export default apiClient;
