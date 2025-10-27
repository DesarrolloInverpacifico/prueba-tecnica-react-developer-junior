import { RolUser } from './role-user-interfaces'

export interface User {
  type: string
  id: string
  attributes: {
    name: string
    last_name: string
    email: string
    created_at: string
    updated_at: string
  }
  relationships: {
    roles: RolUser[]
  }
}
