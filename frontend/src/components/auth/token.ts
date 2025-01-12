const TOKEN_KEY = 'accessToken'

export const getAccessToken = () => {
  const token = localStorage.getItem(TOKEN_KEY) || null
  return token
}

export const setAccessToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const removeAccessToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}
