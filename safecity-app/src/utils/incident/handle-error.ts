import axios from 'axios'

export function handleError(error: unknown) {
  if (!axios.isAxiosError(error)) return 'Error desconocido'

  const messageData = error.response?.data?.message
  const errorData = error.response?.data?.errors
  let errorMsg = 'Ocurrió un error inesperado.'

  if (messageData?.includes('The specified url is invalid')) {
    errorMsg = 'Error al cargar incidentes'
  } else if (messageData?.includes('Unauthenticated')) {
    errorMsg = 'Sin autorización'
  } else if (errorData?.category_id?.[0]?.includes('The category id field is required.')) {
    errorMsg = 'El campo "Categoría" es requerido.'
  } else if (errorData?.description?.[0]?.includes('The description field is required.')) {
    errorMsg = 'El campo "Descripción" es requerido.'
  } else if (
    errorData?.location?.[0]?.includes('The location field is required.') ||
    errorData?.location?.[0]?.includes('The location.type field is required.') ||
    errorData?.location?.[0]?.includes('The location.coordinates field is required.') ||
    errorData?.location?.[0]?.includes('Invalid GeoJSON: Missing type') ||
    errorData?.location?.[0]?.includes('The location.type field is required.')
  ) {
    errorMsg = 'El campo "Ubicación" es requerido.'
  } else {
    errorMsg = error.message
  }

  return errorMsg
}
