import { IncidentCategory } from '../incident-category/incident-category-interface'
import { User } from '../user/user-interfaces'

export interface Incident {
  type: string
  id: number
  attributes: {
    id: number
    title: string
    description: string
    status: 'reported' | 'assigned' | 'verified' | 'resolved' | 'closed'
    location: {
      type: string
      coordinates: string[]
    }
    reported_at: Date
    assigned_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }
  relationships: {
    reporter: User
    category: IncidentCategory
  }
}
export interface IncidentResponse {
  data: Incident[]
}
export interface IncidentByIdResponse {
  data: Incident
}
