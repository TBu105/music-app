export interface User {
  id: string
  email: string
  username: string
  birthday: string
  password: string
  gender: string
  role: string
  image: string
}
export interface CurrentUser {
  email: string
  id: string
  role: string
}
