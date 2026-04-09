import { Product } from '../types/product';

const API_URL = 'http://TU_API_URL/api'; // luego se cambia a la API

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/productos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('⚠ Error al obtener productos.', error);
    return [];
  }
};

// ENDPOINT: GET /productos/:id
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('⚠ Error al obtener el producto.', error);
    return null;
  }
};