import {
  ForgotPasswordFormValues,
  ForgotPasswordReponse
} from '@/interfaces/auth/forgot-password-interfaces'
import api from '../api'

export async function forgotPasswordService(
  data: ForgotPasswordFormValues
): Promise<ForgotPasswordReponse> {
  try {
    const res = await api.post('/forgot-password', data)
    return res.data
  } catch (error) {
    throw error
  }
}
