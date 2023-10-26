import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { StyledTextP } from '../../shared/StyledComponents'

const TransparentButton = (props) => {
  return (
    <TouchableOpacity
      type="button"
      onPress={props.onPress}
      tw="self-center bg-teal-50 border border-teal-950 w-60 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2"
    >
      <StyledTextP style={styles.font} tw="text-teal-700 text-lg text-center">
        {props.innerText}
      </StyledTextP>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default TransparentButton
