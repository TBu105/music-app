import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk, RootState } from "../../app/store"
import { CurrentUser, User } from "./types"
import axios from "axios"

interface UserState {
  user: User | null
  error: string | null
  currentUser: CurrentUser | null
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
    setCurrentUserSuccess: (state, action: PayloadAction<CurrentUser>) => {
      state.currentUser = action.payload
      state.error = null
    },
    setCurrentUserFailure: (state, action: PayloadAction<string>) => {
      state.currentUser = null
      state.error = action.payload
    },
    setUserInfoSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.error = null
    },
    setUserInfoFailure: (state, action: PayloadAction<string>) => {
      state.user = null
      state.error = action.payload
    },
    logoutSuccess: (state) => {
      state.user = null
      state.error = null
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
  setCurrentUserSuccess,
  setCurrentUserFailure,
  setUserInfoSuccess,
  setUserInfoFailure,
  logoutSuccess,
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

export const selectAuth = (state: RootState) => state.auth

export const getCurrentUserAsync = (): AppThunk => async (dispatch) => {
  const response = await api.get("/user/currentUser")
  const { user } = response.data
  dispatch(
    setCurrentUserSuccess({
      email: user.email,
      id: user.userId,
      role: user.role,
    }),
  )
  dispatch(getProfile(user.userId))
}

export const getProfile =
  (userId: string): AppThunk =>
  async (dispatch) => {
    const response = await api.get(`/user/${userId}`)
    const { user } = response.data
    dispatch(
      setUserInfoSuccess({
        id: userId,
        email: user.email,
        username: user.username,
        birthday: user.birthday,
        password: "",
        gender: user.gender,
        role: user.role,
        follower: user.follower,
        image: user.image,
      }),
    )
  }

export const registerAsync =
  (
    email: string,
    username: string,
    birthday: string,
    password: string,
    gender: string,
  ): AppThunk =>
  async (dispatch) => {
    try {
      const response = await api.post("/auth/register", {
        email,
        username,
        birthday,
        password,
        gender,
      })
      const { user } = response.data
      dispatch(
        setCurrentUserSuccess({
          email: user.email,
          id: user.userId,
          role: user.role,
        }),
      )
    } catch (error: any) {
      dispatch(setCurrentUserFailure(error))
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
      const { user } = response.data
      dispatch(
        setCurrentUserSuccess({
          email: user.email,
          id: user.userId,
          role: user.role,
        }),
      )
    } catch (error: any) {
      dispatch(setCurrentUserFailure(error.message))
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
      const { user } = response.data
      dispatch(setUserInfoSuccess(user))
    } catch (error: any) {
      dispatch(setUserInfoFailure(error.message))
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
