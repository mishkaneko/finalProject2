import { View, Image } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'

const Logo = () => {
  return (
    <View tw="flex-row self-center h-20">
      <View tw="h-12">
        <FontAwesome5 name={'car-alt'} size={54} color="#1e1b48" />
      </View>
      <Image
        tw="object-scale-down w-60 h-14 mb-20"
        source={require('../../../../assets/logo/RideLinker-Passenger.png')}
      />
    </View>
  )
}

export default Logo
