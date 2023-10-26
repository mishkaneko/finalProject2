import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { Dropdown } from 'react-native-element-dropdown'

import { useSelector } from 'react-redux'
import CustomInputforProfile from './CustomInputforProfile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { useNavigation } from '@react-navigation/native'
import { get, api_origin } from './api'
import { MaterialIcons } from '@expo/vector-icons'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
const AccountDetailsEdit = ({ navigation }) => {
  const role = useSelector((state) => state.auth.role)
  const [profile, setProfile] = useState({})
  // const methods = useForm()
  // const [success, setSuccess] = useState(false)

  const getBackgroundColor = () => {
    if (role == 'passenger') {
      return '#E8EAF6'
    } else {
      return '#E0F2F1'
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      let json = await get('/user/getprofile')
      console.log('getProfile', json)
      setProfile(json)
    } catch (error) {
      console.log(error)
    }
  }

  //Reset the form, but not working
  // useEffect(() => {
  //   if (success) {
  //     methods.reset()
  //   }
  // }, [success])

  const { control, handleSubmit } = useForm()
  const profileEditSubmit = async (data) => {
    try {
      data.role = role
      console.log('profileEditSubmit', data)
      let res = await fetch(api_origin + '/user/profileupdate', {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
        body: JSON.stringify({ ...data, role }),
      })
      let json = await res.json()
      if (Object.keys(json).length === 0) {
        // methods.reset()
        // setSuccess(true)
        Dialog.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          button: 'ok',
          textBody: 'Profile details has been updated successfully.',
        })
        setTimeout(() => {
          navigation.navigate('AccountDetails')
        }, 1500)
      }
      return json
    } catch (error) {
      console.log(error)
    }
  }

  const genderData = [
    { label: 'Female', value: 'female' },
    { label: 'Male', value: 'male' },
  ]

  // const selectedTextStyle =
  //   role === 'passenger'
  //     ? styles.passengerSelectedTextStyle
  //     : styles.driverSelectedTextStyle

  return (
    <SafeAreaView tw="h-full" style={{ backgroundColor: getBackgroundColor() }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          overflow: 'scroll',
          overscrollBehavior: 'auto',
        }}
      >
        <TouchableOpacity tw="mt-1" onPress={() => navigation.goBack()}>
          <MaterialIcons name="keyboard-arrow-left" size={40} color="black" />
        </TouchableOpacity>
        <View tw="flex-row  mb-8 mt-1 justify-between mx-8 items-center">
          <Text
            tw={`${
              role === 'passenger' ? `text-indigo-950` : `text-teal-950`
            } text-3xl self-center`}
            style={styles.font}
          >
            Account Details
          </Text>
          <TouchableOpacity onPress={handleSubmit(profileEditSubmit)}>
            <Text
              tw={`${
                role === 'passenger' ? `text-indigo-950` : `text-teal-950`
              }`}
              style={styles.font}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
        <View tw="mx-10">
          <Text
            tw={`${
              role === 'passenger' ? `text-indigo-950` : `text-teal-950`
            } text-base`}
            style={styles.font}
          >
            Name
          </Text>
          <CustomInputforProfile
            control={control}
            name="name"
            placeholder="Name"
            defaultValue={profile.name}
            rules={{
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name should be at least 3 characters long',
              },
              maxLength: {
                value: 30,
                message: 'Name should be max 30 characters long',
              },
            }}
          />
          <Text
            tw={`${
              role === 'passenger' ? `text-indigo-950` : `text-teal-950`
            } text-base`}
            style={styles.font}
          >
            Mobile
          </Text>
          <CustomInputforProfile
            control={control}
            name="phone"
            placeholder="Mobile"
            defaultValue={profile.phone}
            rules={{
              required: 'Mobile is required',
              pattern: {
                value: /^\d+$/,
                message: 'Mobile should only contain numbers',
              },
              validate: (value) =>
                value.length === 8 || 'Mobile should be 8 characters long',
            }}
          />

          {/* <Text
            tw={`${
              role === 'passenger' ? `text-indigo-950` : `text-teal-950`
            } text-base`}
            style={styles.font}
          >Email</Text>
          <CustomInputforProfile
            control={control}
            name="email"
            placeholder="Email"
            rules={{
              required: 'Email is required',
              pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
            }}
          /> */}

          <Text
            tw={`${
              role === 'passenger' ? `text-indigo-950` : `text-teal-950`
            } text-base`}
            style={styles.font}
          >
            Gender
          </Text>
          <Controller
            control={control}
            name="gender"
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Dropdown
                  tw="mb-2"
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  // selectedTextStyle={selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={genderData}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Gender"
                  // value={field.value}
                  value={profile.gender}
                  onChange={(item) => field.onChange(item.value)}
                />
                {error && (
                  <Text
                    tw={`${
                      role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                    } text-red-500 items-stretch mb-1`}
                    style={styles.font}
                  >
                    Gender is required.
                  </Text>
                )}
              </>
            )}
          />

          {role == 'driver' ? (
            <>
              <Text
                tw={`${
                  role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                } text-base`}
                style={styles.font}
              >
                HKID
              </Text>
              <CustomInputforProfile
                control={control}
                name="hkid"
                placeholder="HKID"
                defaultValue={profile.phone}
                rules={{
                  required: 'Mobile is required',
                  validate: (value) =>
                    value.length === 10 ||
                    'HKID should be 10 characters long including()',
                }}
              />
              <Text
                tw={`${
                  role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                } text-base`}
                style={styles.font}
              >
                Driving License No
              </Text>
              <CustomInputforProfile
                control={control}
                name="drivingLicenseNo"
                placeholder="Driving License No."
                defaultValue={profile.driving_license_no}
                rules={{
                  required: 'Driving License No. is required',
                  validate: (value) =>
                    value.length === 8 ||
                    'Driving License No. should be 8 characters long',
                }}
              />

              <Text
                tw={`${
                  role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                } text-base`}
                style={styles.font}
              >
                Taxi Driver Identity Plate
              </Text>
              <CustomInputforProfile
                control={control}
                name="taxiDriverIdentityPlate"
                placeholder="Taxi Driver Identity Plate"
                defaultValue={profile.taxi_driver_identity_plate}
                rules={{
                  required: 'Taxi Driver Identity Plate is required',
                  validate: (value) =>
                    value.length === 6 ||
                    'Taxi Driver Identity Plate should be 6 characters long',
                }}
              />
              <Text
                tw={`${
                  role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                } text-base`}
                style={styles.font}
              >
                Vehicle License
              </Text>
              <CustomInputforProfile
                control={control}
                name="vehicleLicense"
                placeholder="Vehicle License"
                defaultValue={profile.vehicle_license}
                rules={{
                  required: 'Vehicle License is required',
                  validate: (value) =>
                    value.length === 8 ||
                    'Vehicle License should be 8 characters long',
                }}
              />

              <Text
                tw={`${
                  role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                } text-base`}
                style={styles.font}
              >
                License Plate No
              </Text>
              <CustomInputforProfile
                control={control}
                name="licensePlateNo"
                placeholder="License Plate No"
                defaultValue={profile.license_plate_no}
                rules={{
                  required: 'License Plate No is required',
                  validate: (value) =>
                    value.length === 6 || 'HKID should be 6 characters long',
                }}
              />
            </>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    padding: 10,
    borderColor: '#D1D5DB',
    borderWidth: 0.5,
    borderRadius: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  font: { fontFamily: 'font' },
  // passengerSelectedTextStyle: {
  //   fontSize: 16,
  //   color: '#1a237e', // Set the font color for passenger role
  // },
  // driverSelectedTextStyle: {
  //   fontSize: 16,
  //   color: '#042f2e', // Set the font color for driver role
  // },
})

export default AccountDetailsEdit
