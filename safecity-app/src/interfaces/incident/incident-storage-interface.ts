export interface IncidentStore {
  category_id: number
  description: string
  location: {
    type: string
    coordinates: string[]
  }
}
