import { RegisterUserFormValues, RegisterUserResponse } from '@/interfaces/auth/register-interfaces'
import api from '../api'

export async function registerService(data: RegisterUserFormValues): Promise<RegisterUserResponse> {
  try {
    const res = await api.post('/register', data)
    return res.data
  } catch (error) {
    throw error
  }
}
