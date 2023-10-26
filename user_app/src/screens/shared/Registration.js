import React, { useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Dropdown } from 'react-native-element-dropdown'
import { useForm, Controller } from 'react-hook-form'
import { post } from './api'
import CustomRadioButton from '../../components/shared/screen-components/CustomRadioButton'
import CustomLabelforInput from '../../components/shared/screen-components/InputLabel'
import CustomInput from '../../components/shared/screen-components/CustomInput'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { useNavigation } from '@react-navigation/native'

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const data = [
  { label: 'Female', value: 'female' },
  { label: 'Male', value: 'male' },
]

const Registration = ({ navigation }) => {
  // const onSignUpPressed = (data) => {
  //   console.log("onSignUpPressfn", data);
  //   // Navigation.navigate("WelcomeScreen");
  // };

  const onSignUpPressed = async (data) => {
    console.log('onSignUpPressfn', data)
    let json = await post('/users/registration', data)
    if (Object.keys(json).length === 0) {
      // methods.reset()
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        button: 'ok',
        textBody: 'Congratulations on the successful registration!',
      })
      setTimeout(() => {
        navigation.navigate('Login')
      }, 1500)
    }
    if (json.error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Warning',
        textBody: json.error,
        button: 'close',
      })
    }
    console.log('json:', json)
    // if (res.status === 200) {
    //   console.log(result);
    //   console.log("Registration success");
    // } else {
    //   console.log("Registration failed");
    // }
  }

  const { control, handleSubmit, watch } = useForm()
  const pwd = watch('password')
  const choosenUserType = watch('userType')

  return (
    <SafeAreaView tw="h-full bg-indigo-100">
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          overflow: 'scroll',
          overscrollBehavior: 'auto',
        }}
      >
        <View tw="mt-15 mx-9 px-2">
          <View>
            <Text
              tw="text-3xl self-center mb-8 mt-8 text-blue-950"
              style={styles.font}
            >
              Create Account
            </Text>
          </View>
          <View>
            <Text
              tw="text-2xl block mb-1 font-medium text-blue-950"
              style={styles.font}
            >
              Sign Up
            </Text>
            <Text tw="font-medium text-blue-950" style={styles.font}>
              Please choose your user type:
            </Text>
            <CustomRadioButton control={control} />
          </View>
          <CustomLabelforInput label="Name" />
          <CustomInput
            control={control}
            name="name"
            placeholder="Name"
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

          <CustomLabelforInput label="Email" />
          <CustomInput
            control={control}
            name="email"
            placeholder="Email"
            rules={{
              required: 'Email is required',
              pattern: { value: EMAIL_REGEX, message: 'Email is invalid' },
            }}
          />
          <CustomLabelforInput label="Gender" />
          <Controller
            control={control}
            name="gender"
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Gender"
                  value={field.value}
                  onChange={(item) => field.onChange(item.value)}
                />
                {error && (
                  <Text tw="text-red-500 items-stretch" style={styles.font}>
                    Gender is required.
                  </Text>
                )}
              </>
            )}
          />

          <CustomLabelforInput label="Password" />
          <CustomInput
            control={control}
            name="password"
            placeholder="Password"
            secureTextEntry
            rules={{
              required: 'Password is required',
              validate: (value) => {
                if (value.length < 8) {
                  return 'Password should be at least 8 characters long'
                }
                if (!/[a-zA-Z]/.test(value)) {
                  return 'Password should contain at least one letter'
                }
                if (!/\d/.test(value)) {
                  return 'Password should contain at least one number'
                }
                return true
              },
            }}
          />

          <CustomLabelforInput label="Confirmed Password" />
          <CustomInput
            control={control}
            name="confirmedPassword"
            placeholder="Confirmed Password"
            secureTextEntry
            rules={{
              validate: (value) => value === pwd || 'Password does not match',
            }}
          />

          <CustomLabelforInput label="Mobile" />
          <CustomInput
            control={control}
            name="phone"
            placeholder="Mobile"
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
          {choosenUserType === 'driver' ? (
            <>
              <CustomLabelforInput label="HKID" />
              <CustomInput
                control={control}
                name="hkid"
                placeholder="HKID"
                rules={{
                  required: 'HKID is required',
                  validate: (value) =>
                    value.length === 10 ||
                    'HKID should be 10 characters long including()',
                }}
              />

              <CustomLabelforInput label="Driving License No." />
              <CustomInput
                control={control}
                name="drivingLicenseNo"
                placeholder="Driving License No."
                rules={{
                  required: 'Driving License No. is required',
                  validate: (value) =>
                    value.length === 8 ||
                    'Driving License No. should be 8 characters long',
                }}
              />
              <CustomLabelforInput label="Taxi Driver Identity Plate" />
              <CustomInput
                control={control}
                name="taxiDriverIdentityPlate"
                placeholder="Taxi Driver Identity Plate"
                rules={{
                  required: 'Taxi Driver Identity Plate is required',
                  validate: (value) =>
                    value.length === 6 ||
                    'Taxi Driver Identity Plate should be 6 characters long',
                }}
              />

              <CustomLabelforInput label="Vehicle License" />
              <CustomInput
                control={control}
                name="vehicleLicense"
                placeholder="Vehicle License"
                rules={{
                  required: 'Vehicle License is required',
                  validate: (value) =>
                    value.length === 8 ||
                    'Vehicle License should be 8 characters long',
                }}
              />
              <CustomLabelforInput label="License Plate No" />
              <CustomInput
                control={control}
                name="licensePlateNo"
                placeholder="License Plate No"
                rules={{
                  required: 'License Plate No is required',
                  validate: (value) =>
                    value.length === 6 ||
                    'License Plate No should be 6 characters long',
                }}
              />
            </>
          ) : null}
          <TouchableOpacity
            onPress={handleSubmit(onSignUpPressed)}
            tw="bg-blue-50 shadow-md mt-8 flex-row mx-14 rounded-xl h-12 flex items-center justify-center hover:bg-black hover:text-white transition duration-500 ease-in-out"
          >
            <Text tw="content-center mr-2  text-blue-900" style={styles.font}>
              Sign Up
            </Text>
            <FontAwesome name="pencil-square-o" size={24} color="#0a0082" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    fontFamily: 'font',
    color: '#172554',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'font',
    color: '#172554',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'font',
    color: '#172554',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'font',
  },
  font: { fontFamily: 'font' },
})

export default Registration
