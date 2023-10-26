import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { useSelector } from 'react-redux'
import { api_origin, get, post } from './api'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { logout } from '../../utils/guard/authSlice'
import { MaterialIcons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'
// import { SimpleLineIcons } from '@expo/vector-icons'
// import { FontAwesome } from '@expo/vector-icons'

const AccountDetails = ({ navigation }) => {
  const name = useSelector((state) => state.auth.name)
  const role = useSelector((state) => state.auth.role)
  const [profileData, setProfileData] = useState({})
  const [selectedImage, setSelectedImage] = useState(
    `${api_origin}/uploads/user-none.png`,
  )
  const navigationToPasswordUpdate = () => {
    navigation.navigate('UpdatePassword')
  }

  const getBackgroundColor = () => {
    if (role == 'passenger') {
      return '#E8EAF6'
    } else {
      return '#E0F2F1'
    }
  }

  const navigationToRatingHisstory = () => {
    navigation.navigate('UserRating')
  }

  const navigationToRideHisstory = () => {
    navigation.navigate('PassengerRideHistory')
  }

  const navigationToProfileEdit = () => {
    navigation.navigate('AccountDetailsEdit')
  }

  const dispatch = useDispatch()
  // const navigation = useNavigation();

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      let json = await get('/user/getprofile')
      let avatar = await get('/user/avatar')
      // console.log('getProfile', json)
      console.log('getAvatar', avatar)
      let avatarPath = `${api_origin}/uploads/${avatar.image}`
      // console.log(avatarPath)
      setProfileData(json)
      if (avatar.image == null) {
        return
      }
      setSelectedImage(avatarPath)
    } catch (error) {
      console.log(error)
    }
  }

  async function updateAvailability() {
    console.log('clicked, update availability')
    try {
      let res = await fetch(api_origin + '/driver/updatestatus', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
        body: JSON.stringify({ is_available: !profileData.is_available }),
      })
      setProfileData({
        ...profileData,
        is_available: !profileData.is_available,
      })
      console.log(profileData.is_available)
      let json = await res.json()
      console.log('updatestatustono', json)
      if (json.error) {
        console.log(error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    // console.log(result)

    if (!result.canceled) {
      const formData = new FormData()
      let uri = result.assets[0].uri
      // console.log(uri)
      setSelectedImage(result.assets[0].uri)
      formData.append('file', { uri, type: result.assets[0].type })
      // console.log('avatar', formData)
      try {
        const url = api_origin + '/user/avatar'
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
          },
          body: formData,
        })
        if (res.status === 200) {
          console.log('Avatar uploaded successfully')
        } else {
          console.log('Avatar upload failed')
        }
      } catch (error) {
        console.log('Avatar upload Error', error)
      }
    }
  }

  async function onLogout() {
    dispatch(logout())
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView tw="h-full" style={{ backgroundColor: getBackgroundColor() }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          overflow: 'scroll',
          overscrollBehavior: 'auto',
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={40} color="black" />
        </TouchableOpacity>

        <View tw="flex-row  mb-8 mt-1 justify-between mx-8 items-center">
          <Text
            tw={`${
              role === 'passenger' ? `text-indigo-950` : `text-teal-950`
            } text-3xl self-center mt-1`}
            style={styles.font}
          >
            Account Details
          </Text>
          <TouchableOpacity onPress={navigationToProfileEdit} tw="mt-1">
            <Text
              tw={`${
                role === 'passenger' ? `text-indigo-950` : `text-teal-950`
              }`}
              style={styles.font}
            >
              Edit
            </Text>
          </TouchableOpacity>
        </View>
        <View tw="mx-4">
          <View
            style={{
              alignItems: 'center',
              marginVertical: 22,
            }}
          >
            <TouchableOpacity onPress={handleImageSelection}>
              <Image
                // source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                source={{ uri: selectedImage }}
                style={{
                  height: 170,
                  width: 170,
                  borderRadius: 85,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
              />
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 10,
                  zIndex: 9999,
                }}
              >
                <MaterialIcons name="photo-camera" size={32} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              tw={`${
                role === 'passenger' ? `text-indigo-950` : `text-teal-950`
              } text-xl font-semibold`}
              style={styles.font}
            >
              Name
            </Text>
            <Text tw="text-base text-gray-500" style={styles.font}>
              {profileData?.name}
            </Text>
            {role == 'driver' ? (
              <>
                <Text
                  tw={`${
                    role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                  } text-xl font-semibold`}
                  style={styles.font}
                >
                  Availability
                </Text>
                <View tw="flex-row items-center ">
                  <Text tw="text-base text-gray-500" style={styles.font}>
                    {profileData?.is_available ? 'Available' : 'Not Available'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => updateAvailability()}
                    tw="ml-2 rounded p-1 bg-green-400 shadow-sm"
                  >
                    <Text tw="text-base ">Update</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : null}

            <Text
              tw={`${
                role === 'passenger' ? `text-indigo-950` : `text-teal-950`
              } text-xl font-semibold`}
              style={styles.font}
            >
              Phone
            </Text>
            <Text tw="text-base text-gray-500" style={styles.font}>
              {profileData?.phone}
            </Text>
            <Text
              tw={`${
                role === 'passenger' ? `text-indigo-950` : `text-teal-950`
              } text-xl font-semibold`}
              style={styles.font}
            >
              Email
            </Text>
            <Text tw="text-base text-gray-500" style={styles.font}>
              {profileData?.email}
            </Text>
            <Text
              tw={`${
                role === 'passenger' ? `text-indigo-950` : `text-teal-950`
              } text-xl font-semibold`}
              style={styles.font}
            >
              Gender
            </Text>
            <Text tw="text-base text-gray-500" style={styles.font}>
              {profileData?.gender}
            </Text>
            {role == 'driver' ? (
              <>
                <Text
                  tw={`${
                    role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                  } text-xl font-semibold`}
                  style={styles.font}
                >
                  HKID
                </Text>
                <Text tw="text-base text-gray-500" style={styles.font}>
                  {profileData?.hkid}
                </Text>
                <Text
                  tw={`${
                    role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                  } text-xl font-semibold`}
                  style={styles.font}
                >
                  Driving License No
                </Text>
                <Text tw="text-base text-gray-500" style={styles.font}>
                  {profileData?.driving_license_no}
                </Text>
                <Text
                  tw={`${
                    role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                  } text-xl font-semibold`}
                  style={styles.font}
                >
                  Taxi Driver Identity Plate
                </Text>
                <Text tw="text-base text-gray-500" style={styles.font}>
                  {profileData?.taxi_driver_identity_plate}
                </Text>
                <Text
                  tw={`${
                    role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                  } text-xl font-semibold`}
                  style={styles.font}
                >
                  Vehicle License
                </Text>
                <Text tw="text-base text-gray-500" style={styles.font}>
                  {profileData?.vehicle_license}
                </Text>
                <Text
                  tw={`${
                    role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                  } text-xl font-semibold`}
                  style={styles.font}
                >
                  License Plate No
                </Text>
                <Text tw="text-base text-gray-500" style={styles.font}>
                  {profileData?.license_plate_no}
                </Text>
              </>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default AccountDetails
