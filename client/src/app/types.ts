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

export type CurrentUser = Pick<User, "id" | "email" | "image" | "role">

export interface Track {
  id: string
  title: string
  artist: string
  thumbnail: string
  uploader: string
  audio: string
  lyrics: string
  publicDate: Date
  duration: number
  privacy: boolean
  banned: boolean
}

export type TrackID = Pick<Track, "id">

export interface Playlist {
  id: string
  title: string
  creator: string
  tracks: TrackID[]
  thumbnail: string
}
