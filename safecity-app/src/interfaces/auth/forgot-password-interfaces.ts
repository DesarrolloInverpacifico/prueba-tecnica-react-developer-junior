export interface ForgotPasswordFormValues {
  email: string
}

export interface ForgotPasswordReponse {
  data: { email?: string; status?: string }
}
