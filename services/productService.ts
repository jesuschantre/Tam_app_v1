import { MockProduct, mockProducts } from '../constants/mockProducts';
import { Product } from '../types/product';

const API_URL = 'http://192.168.2.231:3000';
const IMAGE_BASE_URL = 'http://192.168.2.231:3000';
const USE_MOCK = false;
const IDs_COMPUTADORES = [2, 5, 7, 8, 9];

// 🔹 Función para obtener URL completa de imagen
const getImageUrl = (imagenPath: string | null): string | null => {
  if (!imagenPath) return null;
  
  if (imagenPath.startsWith('http://') || imagenPath.startsWith('https://')) {
    return imagenPath;
  }
  
  return `${IMAGE_BASE_URL}/${imagenPath}`;
};

// 🔹 Helper: Convierte "Clave: Valor\n..." en objeto {Clave: Valor}
const parseCaracteristicas = (data: any): string => {
  if (!data) return '';
  
  if (typeof data === 'string' && data.includes('\n')) {
    return data.trim();
  }
  
  let parsed = data;
  if (typeof data === 'string') {
    try {
      parsed = JSON.parse(data);
    } catch {
      return data;
    }
  }
  
  if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
    return Object.entries(parsed)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
  }
  
  return String(data);
};

// 🔹 Helper para transformar un producto de la API al formato del mock
const adaptProduct = (p: any): MockProduct => ({
  ...p,
  caracteristicas_basicas: parseCaracteristicas(p.caracteristicas_basicas),
  caracteristicas_tecnicas: parseCaracteristicas(p.caracteristicas_tecnicas),
  imagen: getImageUrl(p.imagen),
  imagenLocal: null,
});

export const getProducts = async (): Promise<Product[]> => {
  if (USE_MOCK) return mockProducts as Product[];
  
  try {
    const response = await fetch(`${API_URL}/products/all`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }
    
    const data = await response.json();
    
    return Array.isArray(data) ? data.map(adaptProduct) : [];
  } catch (error) {
    console.error('⚠ Error al obtener productos:', error);
    return mockProducts as Product[];
  }
};

export const getProductById = async (id: number): Promise<Product | null> => {
  if (USE_MOCK) {
    return mockProducts.find(p => p.id === id) as Product || null;
  }
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) return null;
    const data = await response.json();
    return adaptProduct(data);
  } catch (error) {
    console.error('⚠ Error al obtener producto:', error);
    return null;
  }
};

export const getCelulares = async (): Promise<MockProduct[]> => {
  if (USE_MOCK) return mockProducts.filter(p => p.subcategoria_id === 4);
  
  try {
    const response = await fetch(`${API_URL}/products/all`);
    if (!response.ok) return [];
    const data: any[] = await response.json();
    
    return data
      .map(adaptProduct)
      .filter((p: MockProduct) => p.subcategoria_id === 4);
  } catch (error) {
    console.error('⚠ Error al obtener celulares:', error);
    return mockProducts.filter(p => p.subcategoria_id === 4);
  }
};

export const getComputadores = async (): Promise<MockProduct[]> => {
  if (USE_MOCK) {
    return mockProducts.filter(p => IDs_COMPUTADORES.includes(p.subcategoria_id));
  }
  
  try {
    const response = await fetch(`${API_URL}/products/all`);
    if (!response.ok) return [];
    const data: any[] = await response.json();
    
    return data
      .map(adaptProduct)
      .filter((p: MockProduct) => IDs_COMPUTADORES.includes(p.subcategoria_id));
  } catch (error) {
    console.error('⚠ Error al obtener computadores:', error);
    return [];
  }
};

export const getConsolas = async (): Promise<MockProduct[]> => {
  if (USE_MOCK) return mockProducts.filter(p => p.subcategoria_id === 1);
  
  try {
    const response = await fetch(`${API_URL}/products/all`);
    if (!response.ok) return [];
    const data: any[] = await response.json();
    
    return data
      .map(adaptProduct)
      .filter((p: MockProduct) => p.subcategoria_id === 1);
  } catch (error) {
    console.error('⚠ Error al obtener consolas:', error);
    return mockProducts.filter(p => p.subcategoria_id === 1);
  }
};