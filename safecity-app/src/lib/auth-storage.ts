const TOKEN_KEY = 'userToken'

export const authStorage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token)
  },

  clearAuth() {
    localStorage.removeItem(TOKEN_KEY)
  }
}
