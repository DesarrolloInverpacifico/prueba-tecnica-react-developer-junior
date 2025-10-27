import api from '../api'

export async function logoutService() {
  try {
    await api.post('/auth/logout')
  } catch (error) {
    throw error
  }
}
