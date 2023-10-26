import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../utils/guard/authSlice'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { api_origin, post } from './api'

const UpdatePassword = () => {
  const role = useSelector((state) => state.auth.role)
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmedPasswordError, setConfirmedPasswordError] = useState('')

  const getBackgroundColor = () => {
    if (role == 'passenger') {
      return '#E8EAF6'
    } else {
      return '#E0F2F1'
    }
  }

  post
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const handlePasswordBlur = () => {
    let error = ''
    if (password.length < 8) {
      error = 'Password should be at least 8 characters long'
    }
    if (!/[a-zA-Z]/.test(password)) {
      error = 'Password should contain at least one letter'
    }
    if (!/\d/.test(password)) {
      error = 'Password should contain at least one number'
    }
    setPasswordError(error)
    // setPassword((prevPassword) => (error ? "" : prevPassword));
  }

  const handlePasswordConfirmedBlur = () => {
    let error = ''
    if (confirmedPassword !== password) {
      error = 'Password does not match'
    }
    setConfirmedPasswordError(error)
    // setConfirmedPassword((prevConfirmedPassword) =>
    //   error ? "" : prevConfirmedPassword
    // );
  }

  const updatePasswordfromProfile = async (password, confirmedPassword) => {
    try {
      console.log(
        'updatedPassword from profile api',
        password,
        confirmedPassword,
      )
      if (password !== confirmedPassword) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Warning',
          textBody: 'Password does not match. Please try again.',
          button: 'close',
        })
        setPassword('')
        setPasswordError('')
        setConfirmedPassword('')
        setConfirmedPasswordError('')
        return
      }

      if (password.length < 8 && confirmedPassword.length < 8) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Warning',
          button: 'ok',
          textBody: 'Empty Password. Please try again.',
        })
        return
      }

      if (!/[a-zA-Z]/.test(password)) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Warning',
          button: 'ok',
          textBody: 'St least one letter is required. Please try again.',
        })
        return
      }
      if (!/\d/.test(password)) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Warning',
          button: 'ok',
          textBody: 'At least one number is required. Please try again.',
        })
        return
      }

      let result = await fetch(api_origin + '/user/profile/passwordupdate', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
        body: JSON.stringify({
          password: password,
          confirmedPassword: confirmedPassword,
        }),
      })
      let json = await result.json()
      if (json.error) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Warning',
          button: 'ok',
          textBody: json.error,
        })
      }

      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        button: 'ok',
        textBody:
          'Password has been updated successfully. Please try to login again.',
      })
      setTimeout(async () => {
        await logout(dispatch)
        navigation.navigate('Login')
      }, '3000')

      return json
    } catch (error) {
      Alert.alert('Alert Title', String(error), [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ])
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: getBackgroundColor() }} tw="h-full">
      <TouchableOpacity
        tw="mt-10"
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          left: 0,
        }}
      >
        <MaterialIcons name="keyboard-arrow-left" size={40} color="black" />
      </TouchableOpacity>
      <View tw="mt-16 mx-9">
        <Text
          tw={`${
            role === 'passenger' ? `text-indigo-950` : `text-teal-950`
          }text-3xl self-center mb-3`}
          style={styles.font}
        >
          Update Password
        </Text>
        <Text
          tw={`${
            role === 'passenger' ? `text-indigo-950` : `text-teal-950`
          } mb-3`}
          style={styles.font}
        >
          Your password must be 8 characters long and contain at least one
          letter and one number
        </Text>
        <Text
          tw={`${
            role === 'passenger' ? `text-indigo-950` : `text-teal-950`
          } text-lg`}
          style={styles.font}
        >
          New Password
        </Text>
        <View>
          <View tw="h-12 rounded-xl border flex-row border-gray-300 px-4 items-center mb-2">
            <TextInput
              style={styles.font}
              tw="flex-1"
              placeholder="New Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              onBlur={handlePasswordBlur}
            ></TextInput>
            <Entypo
              name="circle-with-cross"
              size={24}
              color="black"
              style={{ opacity: 0.5 }}
              onPress={() => setPassword('')}
            />
          </View>
        </View>
        {passwordError.length > 0 && (
          <Text
            tw={`${
              role === 'passenger' ? `text-indigo-950` : `text-teal-950`
            } text-red-500 items-stretch mb-1`}
          >
            {passwordError}
          </Text>
        )}

        <Text
          tw={`${
            role === 'passenger' ? `text-indigo-950` : `text-teal-950`
          } text-lg`}
          style={styles.font}
        >
          Confirmed New Password
        </Text>
        <View>
          <View tw="h-12 rounded-xl border flex-row border-gray-300 px-4 items-center mb-2">
            <TextInput
              style={styles.font}
              tw="flex-1"
              placeholder="Confirmed New Password"
              secureTextEntry
              value={confirmedPassword}
              onChangeText={setConfirmedPassword}
              onBlur={handlePasswordConfirmedBlur}
            ></TextInput>
            <Entypo
              name="circle-with-cross"
              size={24}
              color="black"
              style={{ opacity: 0.5 }}
              onPress={() => setConfirmedPassword('')}
            />
          </View>
        </View>
        {confirmedPasswordError.length > 0 && (
          <Text
            tw={`${
              role === 'passenger' ? `text-indigo-950` : `text-teal-950`
            } text-red-500 items-stretch mb-1`}
            style={styles.font}
          >
            {confirmedPasswordError}
          </Text>
        )}

        <TouchableOpacity
          onPress={() => updatePasswordfromProfile(password, confirmedPassword)}
          tw="bg-gray-100 shadow-md flex-row mx-14 rounded-xl h-12 flex items-center justify-center hover:bg-black hover:text-white transition duration-500 ease-in-out mt-2"
        >
          <Text
            tw={`${
              role === 'passenger' ? `text-indigo-950` : `text-teal-950`
            } content-center mr-2`}
            style={styles.font}
          >
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default UpdatePassword
