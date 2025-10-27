import { ResetPasswordBody } from '@/interfaces/auth/reset-password-interfaces'
import api from '../api'

export async function ResetPasswordService(body: ResetPasswordBody) {
  try {
    const res = await api.post('/reset-password', body)
    return res.data
  } catch (error) {
    throw error
  }
}
