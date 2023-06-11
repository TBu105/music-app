import { createSlice } from "@reduxjs/toolkit"

interface PlayerState {
  title: string
  artist: string
  duration: number
  volume: number
  shuffle: "off" | "on"
  status: "paused" | "playing" | "ended"
}

const initialState: PlayerState = {
  title: "Current Song Playing",
  artist: "Current Song Artist",
  duration: 1,
  volume: 20,
  shuffle: "off",
  status: "paused",
}
