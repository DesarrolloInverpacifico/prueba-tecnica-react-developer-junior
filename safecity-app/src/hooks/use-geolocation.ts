import { useState, useCallback } from 'react'

export function useGeolocation() {
  const [location, setLocation] = useState<{ lat: string; lng: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLocation = useCallback(() => {
    setError(null)
    if (!navigator.geolocation) {
      setError('Geolocalización no disponible en este navegador.')
      return
    }

    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(7)
        const lng = position.coords.longitude.toFixed(7)
        setLocation({ lat, lng })
        setLoading(false)
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Permiso denegado para obtener la ubicación.')
            break
          case err.POSITION_UNAVAILABLE:
            setError('Ubicación no disponible.')
            break
          case err.TIMEOUT:
            setError('Tiempo de espera agotado al obtener la ubicación.')
            break
          default:
            setError('Error al obtener la ubicación.')
        }
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }, [])

  return { location, loading, error, fetchLocation, setLocation }
}
