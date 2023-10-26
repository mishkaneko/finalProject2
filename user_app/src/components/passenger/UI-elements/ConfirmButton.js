import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { StyledTextP } from '../../shared/StyledComponents'

const ConfirmButton = (props) => {
  const buttonLength = props.btnLong
    ? 'self-center bg-indigo-950 w-52 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 shadow-lg shadow-indigo-500/50'
    : 'self-center bg-indigo-950 w-44 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 shadow-lg shadow-indigo-500/50'

  const buttonDisabled = props.disabled
    ? 'self-center bg-zinc-400 w-44 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 shadow-lg shadow-zinc-500/50'
    : buttonLength

  return (
    <TouchableOpacity
      type="button"
      onPress={props.onPress}
      tw={buttonDisabled}
      disabled={props.disabled}
    >
      <StyledTextP style={styles.font} tw="text-indigo-100 text-lg text-center">
        {props.innerText}
      </StyledTextP>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default ConfirmButton
