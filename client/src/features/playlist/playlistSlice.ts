import axios from "axios"
import { FullPlaylist, Playlist, Track } from "../../app/types"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"
import { toast } from "react-toastify"

const api = axios.create({
  baseURL: "/api/v1",
})

interface PlaylistState {
  viewedPlaylist: FullPlaylist | null
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

export const getPlaylistById = createAsyncThunk(
  "playlist/fetchPlaylistAsync",
  async (id: string) => {
    try {
      const response = await api.get(`/playlist/${id}`)
      const playlistData = response.data.playlist
      const trackList: Track[] = await Promise.all(
        playlistData.trackId.map(async (id: string) => {
          const response = await api.get(`/track/${id}`)
          const trackData = response.data.track[0]
          return {
            id: trackData._id,
            title: trackData.title,
            artist: trackData.artist,
            thumbnail: trackData.image,
            uploader: trackData.userId,
            audio: trackData.audio,
            lyrics: trackData.lyrics,
            duration: trackData.duration,
            privacy: trackData.isPublic,
            banned: trackData.isBanned,
            publicDate: trackData.publicDate,
          } as Track
        }),
      )
      const playlist: FullPlaylist = {
        id: playlistData._id,
        title: playlistData.title,
        creator: playlistData.userId,
        trackList: trackList,
        thumbnail: playlistData.image,
      }
      return playlist
    } catch (e: any) {
      throw Error(`Error: ${e.response.data.error}`)
    }
  },
)

export const getCurrentUserPlaylist = createAsyncThunk(
  "playlist/fetchCurrentUserPlaylist",
  async (id: string) => {
    try {
      const response = await api.get(`/playlist/all/${id}`)
      const playlistData = response.data.playlist
      const playlists: Playlist[] = await Promise.all(
        playlistData.map(async (playlist: any) => {
          const response = await axios.get(`/api/v1/user/${playlist.userId}`)
          let creator: string = response.data.user.username
          var transformedPlaylist: Playlist = {
            id: playlist._id,
            title: playlist.title,
            creator: creator,
            thumbnail: playlist.image,
          }
          return transformedPlaylist
        }),
      )
      return playlists
    } catch (e: any) {
      throw Error(`Error: ${e.response.data.error}`)
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
        thumbnail: playlistData.image,
      }
      console.log(transformedPlaylist)
      return transformedPlaylist
    } catch (e: any) {
      throw Error(`Error: ${e.response.data.error}`)
    }
  },
)
export const updatePlaylistById =
  (playlist: Partial<Playlist>): AppThunk =>
  async (dispatch) => {
    try {
      const response = await api.patch(`/playlist/${playlist.id}`, {
        title: playlist.title,
        image: playlist.thumbnail,
      })
      const playlistData = response.data.playlist
      dispatch(
        updatePlaylistSuccess({
          playlistId: playlistData._id,
          title: playlistData.title,
          thumbnail: playlistData.image,
        }),
      )
    } catch (e: any) {
      dispatch(addTrackToPlaylistFailure(`Error: ${e.response.data.error}`))
    }
  }

export const deletePlaylistById =
  (playlistId: string): AppThunk =>
  async (dispatch) => {
    const response = await api.delete(`/playlist/${playlistId}`)
    dispatch(
      deletePlaylistSuccess({ message: response.data.message, id: playlistId }),
    )
  }

export const addTrackToPlaylist =
  (playlistId: string, track: Track): AppThunk =>
  async (dispatch) => {
    try {
      await api.post(`/playlist/${playlistId}/track/${track.id}`)
      dispatch(
        addTrackToPlaylistSuccess({ playlistId: playlistId, track: track }),
      )
    } catch (e: any) {
      dispatch(addTrackToPlaylistFailure(`Error: ${e.response.data.error}`))
    }
  }
export const removeTrackFromPlaylist =
  (playlistId: string, track: Track, index: number): AppThunk =>
  async (dispatch) => {
    try {
      await api.delete(`/playlist/${playlistId}/track/${track.id}`)
      dispatch(
        removeTrackFromPlaylistSuccess({
          playlistId: playlistId,
          track: track,
          index: index,
        }),
      )
    } catch (error) {}
  }

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    addTrackToPlaylistSuccess: (state, action) => {
      state.error = null
      const track = action.payload.track
      toast(`Added ${track.artist} - ${track.title} to playlist!`)
      if (state.viewedPlaylist?.id != action.payload.playlistId) return
      state.viewedPlaylist?.trackList.push(track)
    },
    addTrackToPlaylistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    removeTrackFromPlaylistSuccess: (state, action) => {
      state.error = null
      const track = action.payload.track
      toast(`Removed ${track.artist} - ${track.title} from this playlist!`)
      if (state.viewedPlaylist?.id != action.payload.playlistId) return
      state.viewedPlaylist?.trackList.splice(action.payload.index, 1)
    },
    removeTrackFromPlaylistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    updatePlaylistSuccess: (state, action) => {
      state.error = null
      if (state.viewedPlaylist) {
        state.viewedPlaylist.title = action.payload.title
        state.viewedPlaylist.thumbnail = action.payload.thumbnail
      }
      for (const Playlist of state.currentUserPlaylist) {
        if (Playlist.id == action.payload.playlistId) {
          Playlist.title = action.payload.title
          Playlist.thumbnail = action.payload.thumbnail
        }
      }
      toast("✔️ Update playlist success!")
    },
    updatePlaylistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    deletePlaylistSuccess: (state, action) => {
      state.viewedPlaylist = null
      state.currentUserPlaylist = state.currentUserPlaylist.filter(
        (playlist) => playlist.id != action.payload.id,
      )
      state.error = null
      toast(action.payload.message)
    },
  },
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
    builder.addCase(getPlaylistById.fulfilled, (state, action) => {
      state.error = null
      state.viewedPlaylist = action.payload
    })
    builder.addCase(getPlaylistById.rejected, (state, action) => {
      state.error = action.payload as string
    })
  },
})

export const {
  addTrackToPlaylistSuccess,
  addTrackToPlaylistFailure,
  removeTrackFromPlaylistSuccess,
  removeTrackFromPlaylistFailure,
  updatePlaylistSuccess,
  updatePlaylistFailure,
  deletePlaylistSuccess,
} = playlistSlice.actions

export default playlistSlice.reducer
