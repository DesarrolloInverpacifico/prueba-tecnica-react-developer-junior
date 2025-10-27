'use client'

import { useEffect, useState } from 'react'

import { User } from '@/interfaces/user/user-interfaces'
import { getAuthUserService } from '@/services/auth/auth-user-service'

export function useAuthUser() {
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)
  const [roles, SetRoles] = useState<string[]>([])

  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const res = await getAuthUserService()
        setAuthUser(res.data)
        const findRoles = res?.data.relationships.roles.map((r) => r.attributes.name) || []

        SetRoles(findRoles)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchAuthUser()
  }, [])

  return { authUser, loading, error, roles }
}
