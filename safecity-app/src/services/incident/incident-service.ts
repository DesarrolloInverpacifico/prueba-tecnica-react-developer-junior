import { IncidentStore } from '@/interfaces/incident/incident-storage-interface'
import api from '../api'
import { IncidentByIdResponse, IncidentResponse } from '@/interfaces/incident/incident-interface'

export async function getAllIncidentService(): Promise<IncidentResponse> {
  try {
    const res = await api.get('/incidents')
    return res.data
  } catch (error) {
    throw error
  }
}

export async function createIncidentService(body: IncidentStore): Promise<IncidentResponse> {
  try {
    const res = await api.post('/incidents', body)
    return res.data
  } catch (error) {
    throw error
  }
}

export async function getByIdIncidentService(id: string): Promise<IncidentByIdResponse> {
  try {
    const res = await api.get(`/incidents/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
