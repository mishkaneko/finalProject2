import { View, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyledTextP } from '../../components/shared/StyledComponents'
import ConfirmButton from '../../components/passenger/UI-elements/ConfirmButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Services = ({ navigation }) => {
  const matchPassenger = () => {
    const data = { match: true }
    navigation.navigate('RidePlan', { data })
  }
  const rideAlone = () => {
    const data = { match: false }
    // TODO Later fix path    // navigation.navigate('RidePlan', { data })
    // navigation.navigate('RidePassengerFound')
    navigation.navigate('Ride')
  }

  return (
    <SafeAreaView tw="flex-1 bg-indigo-50 py-48">
      <View tw="mb-20">
        <StyledTextP style={styles.font} tw="self-center mb-2">
          Match with Another Passenger
        </StyledTextP>
        <ConfirmButton
          btnLong={true}
          onPress={matchPassenger}
          innerText="Match Now"
        />
      </View>
      <View>
        <StyledTextP style={styles.font} tw="self-center mb-2">
          Get a Private Ride
        </StyledTextP>
        <ConfirmButton
          btnLong={true}
          onPress={rideAlone}
          innerText="Ride Now"
        />
      </View>
      <View tw="mt-40">
        <TouchableOpacity
          type="button"
          onPress={() =>
            Linking.openURL('http://api.whatsapp.com/send?phone=85296540942')
          }
          tw="self-center bg-indigo-50 border border-indigo-900 w-60 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2"
        >
          <View tw="self-center flex-row ">
            <MaterialCommunityIcons
              name="account-question"
              size={30}
              color="#36309d"
            />
            <StyledTextP tw="ml-4">Have a Question?</StyledTextP>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default Services
