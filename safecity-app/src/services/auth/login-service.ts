import { LoginFormValues, LoginResponse } from '@/interfaces/auth/login-interfaces'
import api from '../api'

export async function loginService(data: LoginFormValues): Promise<LoginResponse> {
  try {
    const res = await api.post('/login', data)
    return res.data
  } catch (error) {
    throw error
  }
}
