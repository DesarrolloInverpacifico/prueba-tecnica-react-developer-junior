'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { User } from '@/interfaces/user/user-interfaces'
import { getAuthUserService } from '@/services/auth/auth-user-service'
import { authStorage } from '@/lib/auth-storage'
import { logoutService } from '@/services/auth/logout-service'

interface AuthContextType {
  user: User | null
  roles: string[]
  loading: boolean
  refreshUser: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  const fetchUser = async () => {
    try {
      const token = authStorage.getToken()
      if (!token) return
      const res = await getAuthUserService()
      setUser(res.data)
    } catch (err) {
      console.log('Error cargando usuario:', err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await logoutService()
    authStorage.clearAuth()
    router.push('/')
    setUser(null)
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const roles = user?.relationships.roles.map((r) => r.attributes.name) ?? []

  return (
    <AuthContext.Provider value={{ user, roles, loading, refreshUser: fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
