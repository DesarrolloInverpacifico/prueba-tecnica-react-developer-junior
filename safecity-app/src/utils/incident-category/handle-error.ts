import axios from 'axios'

export function handleError(error: unknown) {
  if (!axios.isAxiosError(error)) return 'Error desconocido'

  const messageData = error.response?.data?.message
  const errorData = error.response?.data?.errors
  let errorMsg = 'Ocurrió un error inesperado.'

  if (messageData?.includes('Unauthenticated')) {
    errorMsg = 'Sin autorización'
  } else if (errorData?.name?.[0]?.includes('The name field is required.')) {
    errorMsg = 'El campo "Nombre de la Categoría" es requerido.'
  } else {
    errorMsg = error.message
  }

  return errorMsg
}
