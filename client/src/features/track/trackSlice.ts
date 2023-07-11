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
        duration: 0,
        privacy: track.isPublic,
        banned: track.isBanned,
      }
      transformedData.push(transformedTrack)
    })
    dispatch(getNewUploadSuccess(transformedData))
  } catch (e: any) {
    dispatch(getNewUploadFailed(e.message || "An error occured!"))
  }
}

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
  extraReducers(builder) {},
})

export const { getNewUploadSuccess, getNewUploadFailed } = trackSlice.actions

export default trackSlice.reducer
