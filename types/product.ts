export interface Product {
    id: number
    nombre: string
    precio: number
    marca: string | null
    caracteristicas_basicas: string
    caracteristicas_tecnicas: string
    imagen: string | null
    stock: number
    subcategoria_id: number
}