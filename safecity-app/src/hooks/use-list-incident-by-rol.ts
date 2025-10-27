'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

import { getAllIncidentService } from '@/services/incident/incident-service'
import { getIncidentByUserService } from '@/services/user/user-service'
import { Incident } from '@/interfaces/incident/incident-interface'
import { useAuth } from '@/context/auth-context'
import { handleError } from '@/utils/incident/handle-error'

export function useIncidentByRole() {
  const { user, roles } = useAuth()
  const [items, setItems] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const hasFetched = useRef(false)

  const fetchIncident = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)
    try {
      let res
      if (roles.includes('admin')) {
        res = await getAllIncidentService()
      } else {
        res = await getIncidentByUserService(user.id)
      }
      setItems(res?.data ?? [])
    } catch (err) {
      const msgError = handleError(err)
      setError(msgError)
    } finally {
      setLoading(false)
    }
  }, [roles, user])

  useEffect(() => {
    if (user && !hasFetched.current) {
      hasFetched.current = true
      fetchIncident()
    }
  }, [user, fetchIncident])

  return { items, loading, error, fetchIncident }
}
