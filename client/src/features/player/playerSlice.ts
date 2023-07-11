import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Track } from "../../app/types"
import { OnProgressProps } from "react-player/base"
import { AppThunk } from "../../app/store"

interface PlayerState {
  currentSong: Track | null
  progress: number
  duration: number
  playing: boolean
  volume: number
  muted: boolean
  shuffle: boolean
  loopTrack: boolean
  loopPlaylist: boolean
  playerQueue: Track[]
  queue: number
  error: string | null
}
const lastHeard = localStorage.getItem("lastHeard")

const initialState: PlayerState = {
  currentSong: lastHeard ? JSON.parse(lastHeard) : null,
  progress: 0,
  duration: 0,
  playing: false,
  volume: Number(localStorage.getItem("volume")),
  muted: false,
  shuffle: false,
  loopTrack: false,
  loopPlaylist: false,
  playerQueue: lastHeard ? [JSON.parse(lastHeard)] : [],
  queue: 0,
  error: null,
}

// export const initQueue = (): AppThunk => async (dispatch) => {
//   var song: Track = {
//     title: "Move Me",
//     artist: "Kohta Takahashi",
//     thumbnail:
//       "https://images.pushsquare.com/5530ddb68ef0f/ridge-racer-type-4-cover.cover_large.jpg",
//     audio:
//       "https://res.cloudinary.com/drwdeujt6/video/upload/v1685861441/y2mate.com_-_17_Move_Me_R4_Ridge_Racer_Type_4_Direct_Audio_lziel6.mp3",
//     uploader: "",
//     lyrics: "",
//     duration: 0,
//     privacy: false,
//     banned: false,
//   }
//   console.log(song)
//   dispatch(addToQueue(song))
//   song = {
//     title: "Hidamari no Uta",
//     artist: "Yuyoyuppe",
//     thumbnail: "https://i.ytimg.com/vi/A13rIzQoM80/maxresdefault.jpg",
//     audio:
//       "https://res.cloudinary.com/drwdeujt6/video/upload/v1685861104/%E9%99%BD%E3%81%A0%E3%81%BE%E3%82%8A%E3%81%AE%E8%A9%A9_%E3%82%AB%E3%83%A9%E3%82%AA%E3%82%B1_wx28dp.mp3",
//     uploader: "",
//     lyrics: "",
//     duration: 0,
//     privacy: false,
//     banned: false,
//   }
//   console.log(song)
//   dispatch(addToQueue(song))
// }

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlay: (state) => {
      state.playing = true
    },
    setPause: (state) => {
      state.playing = false
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload
      localStorage.setItem("volume", action.payload.toString())
    },
    playerMute: (state) => {
      state.muted = !state.muted
    },
    playerProgress: (state, action: PayloadAction<OnProgressProps>) => {
      state.progress = action.payload.played
    },
    playerDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload
    },
    toggleLoopSingleTrack: (state) => {
      state.loopTrack = !state.loopTrack
      state.loopPlaylist = false
    },
    addToQueue: (state, action: PayloadAction<Track>) => {
      state.playerQueue.push(action.payload)
      localStorage.setItem("lastHeard", JSON.stringify(action.payload))
    },
    playNewSong: (state) => {
      state.currentSong = state.playerQueue.at(-1) as Track
      state.queue = state.playerQueue.length - 1
      state.playing = true
    },
    previousTrack: (state) => {
      state.queue -= 1
      state.currentSong = state.playerQueue[state.queue]
    },
    nextTrack: (state) => {
      state.queue += 1
      state.progress = 0
      state.currentSong = state.playerQueue[state.queue]
    },
  },
})

export const {
  setPlay,
  setPause,
  setVolume,
  playerMute,
  playerProgress,
  playerDuration,
  toggleLoopSingleTrack,
  addToQueue,
  playNewSong,
  previousTrack,
  nextTrack,
} = playerSlice.actions

export default playerSlice.reducer
