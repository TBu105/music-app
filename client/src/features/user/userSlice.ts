import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "../../app/types"
import axios from "axios"
import { createDispatchHook } from "react-redux"
import { AppThunk } from "../../app/store"

interface UserState {
  userData: User | null
  allUsers: User[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  userData: null,
  allUsers: [],
  loading: false,
  error: null,
}

const api = axios.create({
  baseURL: "/api/v1",
})

export const fetchUserById = createAsyncThunk(
  "user/fetchUser",
  async (id: string) => {
    try {
      const response = await api.get(`/user/${id}`)
      const user = response.data.user
      const transformedData: User = {
        id: id,
        email: user.email,
        username: user.username,
        birthday: user.birthday,
        gender: user.gender,
        follower: user.follower,
        image: user.image,
        password: "",
        role: "",
      }
      return transformedData
    } catch (error: any) {
      throw Error(`Error: ${error.response.data.message}`)
    }
  },
)

export const uploadAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await api.post("/fileupload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data.imageURL
    } catch (error: any) {
      throw Error(`Error: ${error.response.data.message}`)
    }
  },
)

export const updateUserById =
  (id: string, userData: Partial<User>): AppThunk =>
  async (dispatch) => {
    try {
      const response = await api.patch(`/user/${id}`, userData)
      const user = response.data.user
      const transformedData: User = {
        id: id,
        email: user.email,
        username: user.username,
        birthday: user.birthday,
        gender: user.gender,
        follower: user.follower,
        image: user.image,
        password: "",
        role: "",
      }
      dispatch(updateUserSuccess(transformedData))
    } catch (error: any) {
      dispatch(
        updateUserFailure(new Error(`Error: ${error.response.data.message}`)),
      )
    }
  }

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserSuccess: (state, action) => {
      state.error = null
      state.userData = action.payload
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false
      state.userData = action.payload
    })
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
    builder.addCase(uploadAvatar.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      state.loading = false
      if (state.userData) {
        state.userData.image = action.payload
      }
    })
    builder.addCase(uploadAvatar.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload as string
    })
  },
})

export const { updateUserSuccess, updateUserFailure } = userSlice.actions
export default userSlice.reducer
