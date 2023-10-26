import React from 'react'
import { Text, StyleSheet } from 'react-native'

const CustomLabelforInput = ({ label }) => {
  return (
    <Text
      tw="block mb-2 text-sm font-medium mt-5 text-blue-950"
      style={styles.font}
    >
      {label}
    </Text>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default CustomLabelforInput
