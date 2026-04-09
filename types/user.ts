export interface User {
    id?: number
    nombre_completo: string
    user_name: string
    email: string
    tipo_documento: 'CC'
    identificacion: string
    fecha_nacimiento: string
    password?: string
}