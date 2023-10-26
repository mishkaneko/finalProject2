import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const InvisibleButton = (props) => {
  return <TouchableOpacity type="button" onPress={props.onPress} tw="h-60" />
}

export default InvisibleButton
