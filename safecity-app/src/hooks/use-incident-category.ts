'use client'

import { useCallback, useState } from 'react'

import { IncidentCategory } from '@/interfaces/incident-category/incident-category-interface'
import { getAllIncidentCategoriesService } from '@/services/incident-category/incident-category-service'
import { handleError } from '@/utils/incident-category/handle-error'

export function useIncidentCategory() {
  const [incidentCategories, setIncidentCategories] = useState<IncidentCategory[]>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  const fetchIncidentCategories = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await getAllIncidentCategoriesService()
      setIncidentCategories(res.data)
    } catch (err) {
      console.log(err)
      const msgError = handleError(err)
      setError(msgError)
    } finally {
      setLoading(false)
    }
  }, [])

  return { incidentCategories, fetchIncidentCategories, loading, error }
}
