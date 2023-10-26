import { View, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyledTextP } from '../../components/shared/StyledComponents'
import { FontAwesome5 } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'

const Home = () => {
  return (
    <SafeAreaView tw="flex-1 bg-teal-50 items-center pt-20">
      <View tw="h-28">
        <FontAwesome5 name={'car-alt'} size={120} color="#163242" />
      </View>
      <Image
        tw="object-scale-down w-80 h-20"
        source={require('../../../assets/logo/RideLinker-Driver.png')}
      />
      <View tw="self-center">
        <LottieView
          source={require('../../../assets/lottie/MoneyAnimation.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <StyledTextP style={styles.font} tw="mt-6">
        You have earned
      </StyledTextP>
      <StyledTextP style={styles.font} tw="text-teal-700 text-3xl my-4">
        $18,490.00
      </StyledTextP>
      <StyledTextP style={styles.font}>this month</StyledTextP>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font', alignSelf: 'center' },
  animation: { width: 200, height: 200 },
})

export default Home
