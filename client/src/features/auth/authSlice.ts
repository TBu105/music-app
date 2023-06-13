import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "../../app/store"
import { User } from "./types"
import axios from "axios"

interface UserState {
  user: User | null
  error: string | null
  currentUser: User | null
  allUsers: User[]
}

const initialState: UserState = {
  user: null,
  error: null,
  currentUser: null,
  allUsers: [],
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.error = null
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.user = null
      state.error = action.payload
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null
      state.error = action.payload
    },
    logoutSuccess: (state) => {
      state.user = null
      state.error = null
    },
    getUserSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
      state.error = null
    },
    getUserFailure: (state, action: PayloadAction<string>) => {
      state.currentUser = null
      state.error = action.payload
    },
    getAllUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.allUsers = action.payload
      state.error = null
    },
    getAllUsersFailure: (state, action: PayloadAction<string>) => {
      state.allUsers = []
      state.error = action.payload
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.error = null
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.user = null
      state.error = action.payload
    },
    updateUserPasswordSuccess: (state) => {
      state.error = null
    },
    updateUserPasswordFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    deleteUserSuccess: (state) => {
      state.user = null
      state.error = null
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    uploadUserAvatarSuccess: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.image = action.payload
      }
      state.error = null
    },
    uploadUserAvatarFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const {
  registerSuccess,
  registerFailure,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  getUserSuccess,
  getUserFailure,
  getAllUsersSuccess,
  getAllUsersFailure,
  updateUserSuccess,
  updateUserFailure,
  updateUserPasswordSuccess,
  updateUserPasswordFailure,
  deleteUserSuccess,
  deleteUserFailure,
  uploadUserAvatarSuccess,
  uploadUserAvatarFailure,
} = authSlice.actions

// Axios instance for API requests
const api = axios.create({
  baseURL: "/api/v1", // Replace with your API endpoint
})

export const registerAsync =
  (
    email: string,
    username: string,
    birthday: string,
    password: string,
    gender: string,
    image: string,
  ): AppThunk =>
  async (dispatch) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        username,
        birthday,
        password,
        gender,
        image,
      })
      const user = response.data
      dispatch(registerSuccess(user))
    } catch (error: any) {
      dispatch(registerFailure(error.message))
    }
  }

export const loginAsync =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      })
      const user = response.data
      dispatch(loginSuccess(user))
    } catch (error: any) {
      dispatch(loginFailure(error.message))
    }
  }

export const logoutAsync = (): AppThunk => async (dispatch) => {
  try {
    await api.post("/auth/logout")
    dispatch(logoutSuccess())
  } catch (error) {
    console.error("Logout error:", error)
  }
}

export const getUserByIdAsync =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      const response = await api.get(`/user/${id}`)
      const user = response.data
      dispatch(getUserSuccess(user))
    } catch (error: any) {
      dispatch(getUserFailure(error.message))
    }
  }

export const getAllUsersAsync = (): AppThunk => async (dispatch) => {
  try {
    const response = await api.get("/user")
    const user = response.data
    dispatch(getAllUsersSuccess(user))
  } catch (error: any) {
    dispatch(getAllUsersFailure(error.message))
  }
}

export const updateUserByIdAsync =
  (id: string, userData: Partial<User>): AppThunk =>
  async (dispatch) => {
    try {
      const response = await api.put(`/user/${id}`, userData)
      const user = response.data
      dispatch(updateUserSuccess(user))
    } catch (error: any) {
      dispatch(updateUserFailure(error.message))
    }
  }

export const updateUserPasswordAsync =
  (oldPassword: string, newPassword: string): AppThunk =>
  async (dispatch) => {
    try {
      await api.put("/user/updatePassword", { oldPassword, newPassword })
      dispatch(updateUserPasswordSuccess())
    } catch (error: any) {
      dispatch(updateUserPasswordFailure(error.message))
    }
  }

export const deleteUserByIdAsync =
  (id: string): AppThunk =>
  async (dispatch) => {
    try {
      await api.delete(`/user/${id}`)
      dispatch(deleteUserSuccess())
    } catch (error: any) {
      dispatch(deleteUserFailure(error.message))
    }
  }

export const uploadUserAvatarAsync =
  (file: File): AppThunk =>
  async (dispatch) => {
    try {
      const formData = new FormData()
      formData.append("image", file)

      const response = await api.post("/user/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      const imageURL = response.data.imageURL
      dispatch(uploadUserAvatarSuccess(imageURL))
    } catch (error: any) {
      dispatch(uploadUserAvatarFailure(error.message))
    }
  }

export default authSlice.reducer
