export interface User {
  id: string
  email: string
  username: string
  birthday: string
  password: string
  gender: string
  role: string
  follower: number
  image: string
}
export interface CurrentUser {
  email: string
  id: string
  image: string
  role: string
}
export interface Track {
  title: string
  artist: string
  thumbnail: string
  uploader: string
  audio: string
}
