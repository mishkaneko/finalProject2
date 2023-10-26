import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { StyledTextP } from '../../shared/StyledComponents'

const ConfirmButton = (props) => {
  const buttonLength = props.btnLong
    ? 'self-center bg-teal-950 w-60 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 shadow-lg shadow-teal-500/50'
    : 'self-center bg-teal-950 w-48 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 shadow-lg shadow-teal-500/50'

  return (
    <TouchableOpacity type="button" onPress={props.onPress} tw={buttonLength}>
      <StyledTextP style={styles.font} tw="text-teal-100 text-lg text-center">
        {props.innerText}
      </StyledTextP>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default ConfirmButton
