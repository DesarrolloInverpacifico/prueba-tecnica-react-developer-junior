import { IncidentCategoryResponse } from '@/interfaces/incident-category/incident-category-interface'
import api from '../api'
import { CategoryStore } from '@/interfaces/incident-category/category-storage-interface'

export async function getAllIncidentCategoriesService(): Promise<IncidentCategoryResponse> {
  try {
    const res = await api.get('/incidentCategories')
    return res.data
  } catch (error) {
    throw error
  }
}

export async function createIncidentCategoryService(
  body: CategoryStore
): Promise<IncidentCategoryResponse> {
  try {
    const res = await api.post('/incidentCategories', body)
    return res.data
  } catch (error) {
    throw error
  }
}
