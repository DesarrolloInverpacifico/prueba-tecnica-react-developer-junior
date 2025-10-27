export interface RegisterUserFormValues {
  name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

export interface RegisterUserResponse {
  data: {
    type: string
    id: string
    attributes: {
      name: string
      email: string
      created_at: string
      updated_at: string
    }
  }
}
