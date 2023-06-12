import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

interface User {
  email: string
  username: string
  birthday: string
  role: "admin" | "user" | "premium" | "artist"
  gender: "male" | "female" | "others"
  password: string
  follower: number
  image: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { email, username, birthday, password, gender, image }: User,
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post("/api/v1/auth/register", {
        email,
        username,
        birthday,
        password,
        gender,
        image,
      })
      return response.data
    } catch (error: Error | any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default authSlice.reducer
