import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
  isAuthenticated: AsyncStorage.getItem('token') !== null,
  name: null,
  role: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // console.log('payload', action.payload)
      const { name, role } = action.payload
      state.name = name
      state.role = role
      state.isAuthenticated = true
      // console.log("Slice login", state.name);
    },
    logout: (state) => {
      state.name = null
      AsyncStorage.removeItem('token')
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = authSlice.actions
