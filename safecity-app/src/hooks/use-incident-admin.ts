'use client'

import { useState } from 'react'

import { Incident } from '@/interfaces/incident/incident-interface'
import { getAllIncidentService } from '@/services/incident/incident-service'

export function UseIncidentAdmin() {
  const [items, setItems] = useState<Incident[]>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const fetchIncident = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getAllIncidentService()
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
