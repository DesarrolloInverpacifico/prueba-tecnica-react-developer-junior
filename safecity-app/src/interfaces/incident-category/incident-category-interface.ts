export interface IncidentCategory {
  id: number
  type: string
  attributes: {
    name: string
    description: string | null
    created_at: string | null
    updated_at: string | null
  }
  relationships: string[]
}
export interface IncidentCategoryResponse {
  data: IncidentCategory[]
}
