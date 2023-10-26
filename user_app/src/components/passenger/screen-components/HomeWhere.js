import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useEffect } from 'react'
import { StyledTextP } from '../../shared/StyledComponents'
import { FontAwesome5 } from '@expo/vector-icons'
import { get } from '../../../utils/java-API'

const HomeWhere = ({ navigation }) => {
  const onPress = () => navigation.navigate('Services')

  // useEffect(() => {
  //   console.log('test java API')
  //   get('/rides/1').then((json) => {
  //     console.log('get ride result:', json)
  //   })
  // }, [])

  return (
    <SafeAreaView tw="self-center items-center">
      <View tw="h-28">
        <FontAwesome5 name={'car-alt'} size={120} color="#1e1b48" />
      </View>
      <Image
        tw="object-scale-down w-80 h-20 mb-40"
        source={require('../../../../assets/logo/RideLinker-Passenger.png')}
      />
      <StyledTextP style={styles.font} tw="mb-2">
        Where are you heading?
      </StyledTextP>
      <TouchableOpacity
        type="button"
        onPress={onPress}
        tw="bg-indigo-50 border border-indigo-700 h-12 w-80 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
      >
        <StyledTextP style={styles.font} tw="text-indigo-300">
          I want to go to...
        </StyledTextP>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default HomeWhere
