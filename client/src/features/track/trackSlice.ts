import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Track } from "../../app/types"
import axios, { AxiosError } from "axios"
import { AppThunk } from "../../app/store"

const api = axios.create({
  baseURL: "/api/v1",
})

interface TrackState {
  viewedTrack: Track | null
  allTrack: Track[]
  newUpload: Track[]
  trackByUser: Track[]
  loading: boolean
  error: string | null
}

const initialState: TrackState = {
  viewedTrack: null,
  allTrack: [],
  newUpload: [],
  trackByUser: [],
  loading: true,
  error: null,
}
export const getNewUpload = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/track")
    const data = response.data.allTracks
    const transformedData: Track[] = []
    data.forEach((track: any) => {
      var transformedTrack: Track = {
        title: track.title,
        artist: track.artist,
        thumbnail: track.image,
        uploader: track.userId,
        audio: track.audio,
        lyrics: track.lyrics,
        duration: track.duration,
        privacy: track.isPublic,
        banned: track.isBanned,
        publicDate: track.publicDate,
      }
      transformedData.push(transformedTrack)
    })
    dispatch(getNewUploadSuccess(transformedData))
  } catch (e: any) {
    dispatch(getNewUploadFailed(e.message || "An error occured!"))
  }
}
export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData()
    formData.append("file", file)
    const response = await api.post("/fileupload/file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data.fileURL
  } catch (error: any) {
    throw Error(`Error: ${error.response.data.message}`)
  }
}
export const uploadTrackAsync = createAsyncThunk(
  "track/uploadTrackAsync",
  async (track: any) => {
    try {
      const { title, artist, duration, privacy, publicDate } = track
      const image = await uploadFile(track.thumbnail)
      const audio = await uploadFile(track.audio)
      const response = await api.post("/track/create", {
        title,
        artist,
        publicDate,
        privacy,
        duration,
        image,
        audio,
      })
      const trackData = response.data.track
      var transformedTrack: Track = {
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
      }
      return transformedTrack
    } catch (e: any) {
      throw Error(`Error: ${e.response.data.error}`)
    }
  },
)
const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    getNewUploadSuccess: (state, action) => {
      state.newUpload = action.payload
      state.loading = false
      state.error = null
    },
    getNewUploadFailed: (state, action) => {
      state.newUpload = []
      state.loading = false
      state.error = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(uploadTrackAsync.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(uploadTrackAsync.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
      state.newUpload.push(action.payload)
    })
    builder.addCase(uploadTrackAsync.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { getNewUploadSuccess, getNewUploadFailed } = trackSlice.actions

export default trackSlice.reducer
