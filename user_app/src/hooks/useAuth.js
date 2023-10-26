import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector, useDispatch } from 'react-redux'
import { restoreAuth } from '../utils/guard/authSlice'
import { Text, SafeAreaView, View, StyleSheet } from 'react-native'

export default function useAuth() {
  const [state, setState] = useState()
  useEffect(() => {
    AsyncStorage.getItem('token')
  }, [])
}

export function AuthProvider({ children }) {
  const role = useSelector((state) => state.auth.role)
  const dispatch = useDispatch()
  useEffect(() => {
    restoreAuth(dispatch)
  }, [])

  return (
    <>
      {role == 'loading' ? (
        <View style={styles.center}>
          <Text>Loading Authentication...</Text>
        </View>
      ) : (
        children
      )}
    </>
  )
}

let styles = StyleSheet.create({
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    height: '100%',
  },
})
