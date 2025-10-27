'use client'

import { useState } from 'react'

import { Incident } from '@/interfaces/incident/incident-interface'
import { getIncidentByUserService } from '@/services/user/user-service'

export function UseIncidentUser(id: string) {
  const [items, setItems] = useState<Incident[]>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const fetchIncident = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getIncidentByUserService(id)
      setItems(res.data)
    } catch (err) {
      console.log(err)
      setError('Error al cargar incidentes')
    } finally {
      setLoading(false)
    }
  }

  return { items, fetchIncident, loading, error }
}
