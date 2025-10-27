export interface LoginFormValues {
  email: string
  password: string
}

export interface LoginResponse {
  data: {
    type: string
    attributes: {
      access_token: string
      token_type: string
    }
  }
}
