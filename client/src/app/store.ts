import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import authReducer from "../features/auth/authSlice"
import userReducer from "../features/user/userSlice"
import playerReducer from "../features/player/playerSlice"
import trackReducer from "../features/track/trackSlice"
import playlistReducer from "../features/playlist/playlistSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user: userReducer,
    player: playerReducer,
    track: trackReducer,
    playlist: playlistReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
