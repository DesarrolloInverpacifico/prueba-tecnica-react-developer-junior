import { AuthUserResponse } from '@/interfaces/auth/auth-user-intefaces'
import api from '../api'

export async function getAuthUserService(): Promise<AuthUserResponse> {
  const token = localStorage.getItem('userToken')
  try {
    const res = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (error) {
    throw error
  }
}
