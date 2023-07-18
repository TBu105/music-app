import axios from "axios"
import { Playlist } from "../../app/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const api = axios.create({
  baseURL: "/api/v1",
})

interface PlaylistState {
  viewedPlaylist: Playlist | null
  currentUserPlaylist: Playlist[]
  otherUserPlaylist: Playlist[]
  loading: boolean
  error: string | null
}

const initialState: PlaylistState = {
  viewedPlaylist: null,
  currentUserPlaylist: [],
  otherUserPlaylist: [],
  loading: true,
  error: null,
}
export const getCurrentUserPlaylist = createAsyncThunk(
  "playlist/fetchCurrentUserPlaylist",
  async (id: string) => {
    try {
      const response = await api.get(`/playlist/all/${id}`)
      const playlistData = response.data.playlist
      const playlists: Playlist[] = []
      playlistData.forEach((playlist: any) => {
        var transformedPlaylist: Playlist = {
          id: playlist._id,
          title: playlist.title,
          creator: playlist.userId,
          tracks: [],
          thumbnail: playlist.image,
        }
        playlists.push(transformedPlaylist)
      })
      return playlists
    } catch (e: any) {
      throw Error(`Error: ${e.response.data.error}`)
      console.log(e)
    }
  },
)

export const createNewPlaylist = createAsyncThunk(
  "playlist/createPlaylist",
  async (title: string) => {
    try {
      const response = await api.post("/playlist/create", { title })
      const playlistData = response.data.playlist
      var transformedPlaylist: Playlist = {
        id: playlistData._id,
        title: playlistData.title,
        creator: playlistData.userId,
        tracks: [],
        thumbnail: playlistData.image,
      }
      return transformedPlaylist
    } catch (e: any) {
      throw Error(`Error: ${e.response.data.error}`)
    }
  },
)

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(createNewPlaylist.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(createNewPlaylist.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.currentUserPlaylist.push(action.payload)
    })
    builder.addCase(createNewPlaylist.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(getCurrentUserPlaylist.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getCurrentUserPlaylist.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.currentUserPlaylist = action.payload
    })
    builder.addCase(getCurrentUserPlaylist.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const {} = playlistSlice.actions

export default playlistSlice.reducer
