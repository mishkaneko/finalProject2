import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'

const initialState = {
  role: 'loading',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token } = action.payload
      try {
        let payload = jwtDecode(token)
        console.log('jwt payload:', payload)
        state.token = token
        state.role = payload.role
      } catch (error) {
        console.log('failed to decode jwt:', error)
        state.role = 'guest'
      }
    },
    logout: (state) => {
      state.role = 'guest'
    },
  },
})

// export const { login, logout } = authSlice.actions

export async function restoreAuth(dispatch) {
  let token = await AsyncStorage.getItem('token')
  if (token) {
    loginSuccess(dispatch, token)
  } else {
    logout(dispatch)
  }
}

export async function loginSuccess(dispatch, token) {
  await AsyncStorage.setItem('token', token)
  dispatch(authSlice.actions.login({ token }))
}

export async function logout(dispatch) {
  await AsyncStorage.removeItem('token')
  dispatch(authSlice.actions.logout())
}
