import { IncidentResponse } from '@/interfaces/incident/incident-interface'
import api from '../api'

export async function getIncidentByUserService(userId: string): Promise<IncidentResponse> {
  try {
    const res = await api.get(`users/${userId}/incidents`)
    return res.data
  } catch (error) {
    throw error
  }
}
