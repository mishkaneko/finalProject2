import { View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { styled } from 'nativewind'

const BackButtonContainer = styled(View, 'absolute top-0 left-0 mx-7 my-12')

const BackButton = ({ navigation }) => {
  const onPress = () => navigation.goBack()
  return (
    <BackButtonContainer>
      <TouchableWithoutFeedback onPress={onPress}>
        <Ionicons name="chevron-back-outline" size={32} color="black" />
      </TouchableWithoutFeedback>
    </BackButtonContainer>
  )
}

export default BackButton
