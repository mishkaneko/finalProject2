import React from 'react'
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { styled } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'

const WelcomeScreen = () => {
  const navigation = useNavigation()

  const loginRequest = () => {
    navigation.navigate('Login')
  }

  const registerRequest = () => {
    navigation.navigate('Registration')
  }

  return (
    <SafeAreaView tw="h-full bg-indigo-100">
      <View tw="mt-20"></View>

      <Image
        tw="flex-1 self-center w-10/12 rounded-3xl"
        source={require('../../../assets/carsharing.jpg')}
        // tw="h-48"
      />
      <Text
        tw="pl-20 pr-20 mt-10 text-4xl text-center text-blue-950"
        style={styles.font}
      >
        Welcome to
      </Text>
      <View tw=" flex-row justify-center items-center">
        {/* <FontAwesome5
          name="car-alt"
          size={50}
          color="black"
          style={{ marginLeft: 5 }}
        /> */}
        <Image
          tw="w-80 h-20"
          source={require('../../../assets/logo/RideLinker-Passenger.png')}
        />
      </View>
      <Text
        tw="pl-4 text-2xl mt-2.5 pr-4 text-center text-blue-950"
        style={styles.font}
      >
        Connect & Save: Ride Together.
      </Text>
      <View tw="flex-1 pl-20  pr-20 mt-6">
        <TouchableOpacity
          onPress={loginRequest}
          // style={{ backgroundColor: '#CCE6DB' }}
          tw="bg-blue-50 shadow-md rounded-xl h-12 flex items-center justify-center hover:bg-black hover:text-white transition duration-500 ease-in-out"
        >
          <Text
            tw=" text-blue-900 pl-5 py-3 pr-5 text-center uppercase font-semibold"
            style={styles.font}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={registerRequest}
          // style={{ backgroundColor: '#DBCCE6' }}
          tw="bg-blue-50 shadow-md rounded-xl mt-5 h-12 flex items-center justify-center uppercase font-semibold px-8 hover:bg-black hover:text-white transition duration-500 ease-in-out"
        >
          <Text
            tw="text-blue-900 pl-5 py-3 pr-5 text-center uppercase font-semibold"
            style={styles.font}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default WelcomeScreen
