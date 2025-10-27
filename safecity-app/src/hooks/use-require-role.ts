'use client'

import { useEffect, useState } from 'react'

import { useAuth } from '@/context/auth-context'

export function useRequireRole(requiredRoles: string[]) {
  const { roles } = useAuth()
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    if (!roles || roles.length === 0) return
    const authorized = requiredRoles.some((role) => roles.includes(role))
    setIsAuthorized(authorized)
  }, [roles, requiredRoles])

  return { isAuthorized }
}
