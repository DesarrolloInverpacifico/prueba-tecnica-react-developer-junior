import axios from 'axios'

export function handleError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const errorData = error.response?.data?.errors
    let errorMsg
    if (errorData?.email?.[0].includes('This password reset token is invalid.')) {
      errorMsg = 'El token es invalido'
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
