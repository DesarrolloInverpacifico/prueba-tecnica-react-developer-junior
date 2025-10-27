import axios from 'axios'

export function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const errorData = error.response?.data?.errors
    let errorMsg
    if (errorData?.name?.[0].includes('The name field is required')) {
      errorMsg = 'El campo "Nombres" es requerido '
    } else if (errorData?.last_name?.[0].includes('The last name field is required')) {
      errorMsg = 'El campo "Apellidos" es requerido '
    } else if (errorData?.email?.[0].includes('The email field is required')) {
      errorMsg = 'El campo "Correo electrónico" es requerido '
    } else if (errorData?.email?.[0].includes('The email has already been taken')) {
      errorMsg = 'No se pudo completar el registro. Verifique los datos e inténtelo de nuevo.'
    } else if (errorData?.password?.[0]?.includes('The password field is required')) {
      errorMsg = 'El campo "Contraseña" es requerido '
    } else if (
      errorData?.password?.[0]?.includes('The password field confirmation does not match.')
    ) {
      errorMsg = 'Las contraseñas no coinciden.'
    } else {
      errorMsg = error.message
    }

    return errorMsg
  }
}
