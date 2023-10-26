import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { CancelText } from './StyledComponents'

const CancelButton = (props) => {
  const buttonLength = props.btnLong
    ? 'self-center bg-white border border-red-700 w-60 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 shadow-sm shadow-pink-500/50'
    : 'self-center bg-white border border-red-700 w-40 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 shadow-sm shadow-pink-500/50'

  return (
    <TouchableOpacity type="button" onPress={props.onPress} tw={buttonLength}>
      <CancelText style={styles.font} tw="text-red-600 text-lg text-center">
        {props.innerText}
      </CancelText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default CancelButton
