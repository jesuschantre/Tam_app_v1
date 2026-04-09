import { User } from '../types/user'

// LOGIN DE USUARIO YA CREADO
export const loginUser = async (correo: string, password: string) => {
  try {
    // Aquí irá LA API real
    if (correo === 'test@test.com' && password === 'Test123*') {
      return {
        id: 1,
        nombre: 'Mariana',
        correo
      }
    } else {
      throw new Error('Credenciales incorrectas')
    }
  } catch (error) {
    throw error
  }
}

// REGISTRO DE NUEVO USUARIO
export const registerUser = async (user: User) => {
  try {
    console.log('Usuario enviado a BD:', user)

    // 🔴 Simulación
    return { success: true }

  } catch (error) {
    throw error
  }
}