import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { login, loginSuccess } from '../../utils/guard/authSlice'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { post } from './api'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = () => {
  //Login Authentication

  const [email, onChangeEmail] = useState('')
  const [password, onChangePassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()

  // useEffect(() => {
  //   let callback = (e) => {
  //     e.preventDefault()
  //   }
  //   navigation.addListener('beforeRemove', callback)
  //   return () => {
  //     navigation.removeListener('beforeRemove', callback)
  //   }
  // }, [])

  const dispatch = useDispatch()
  const role = useSelector((state) => state.auth.role)

  useEffect(() => {
    if (role == 'driver') {
      navigation.navigate('DriverTabs')
    } else if (role == 'passenger') {
      navigation.navigate('PassengerTabs')
    }
  }, [role])

  async function submit() {
    setIsLoading(true)
    const json = await post('/users/login', { email, password })
    setIsLoading(false)
    console.log('login result:', json)
    if (json.error) {
      // success.error.includes('empty') &&
      // success.error.includes('password')
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Unsuccessful Login',
        button: 'ok',
        textBody: json.error,
      })
      return
    }
    await loginSuccess(dispatch, json.token)
  }

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 100 : 0

  return (
    <SafeAreaView tw="h-full bg-indigo-100">
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View tw=" px-8">
          <View>
            <Text
              tw="text-3xl self-center mb-12 mt-10 text-blue-950"
              style={styles.font}
            >
              Welcome Back
            </Text>
            <View tw="mb-14">
              <View tw="mx-auto mb-10">
                {/* <FontAwesome5 name="user-lock" size={150} color="black" /> */}
                <Image
                  source={require('../../../assets/login.png')}
                  // tw="h-48"
                />
              </View>

              <Text
                tw="text-2xl block mb-1 font-medium text-blue-950"
                style={styles.font}
              >
                Login
              </Text>
              <Text
                tw="block mb-2 text-sm font-medium text-blue-950 mt-5"
                style={styles.font}
              >
                Email
              </Text>
              <View tw="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                <TextInput
                  onChangeText={onChangeEmail}
                  value={email}
                  style={styles.font}
                />
              </View>

              <Text
                tw="block mb-2 text-sm font-medium text-blue-950 mt-10"
                style={styles.font}
              >
                Password
              </Text>
              <View tw="w-80 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                <TextInput
                  secureTextEntry
                  onChangeText={onChangePassword}
                  value={password}
                  style={styles.font}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={submit}
              disabled={isLoading}
              tw={`${
                isLoading ? `bg-gray-200` : `bg-blue-50`
              } shadow-md flex-row mx-14 rounded-xl h-12 flex items-center justify-center hover:bg-black hover:text-white transition duration-500 ease-in-out`}
            >
              <Text tw="content-center text-blue-900" style={styles.font}>
                {isLoading ? 'Loading ...' : 'Sign In'}
              </Text>
              <MaterialCommunityIcons
                name="login-variant"
                size={24}
                color="#0a0082"
                tw="content-center"
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default Login
