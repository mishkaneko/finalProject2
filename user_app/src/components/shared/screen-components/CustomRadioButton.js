import React from 'react'
import { Controller } from 'react-hook-form'
import { RadioButton } from 'react-native-paper'
import { View, Text, StyleSheet } from 'react-native'

const CustomRadioButton = ({ control }) => {
  return (
    <Controller
      control={control}
      name="userType"
      defaultValue=""
      rules={{ required: 'User type is required' }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <RadioButton.Group onValueChange={onChange} value={value}>
          <View tw="flex-row">
            <RadioButton value="passenger" />
            <Text
              tw="self-center font-medium text-gray-900"
              style={styles.font}
            >
              Passenger
            </Text>
          </View>
          <View tw="flex-row">
            <RadioButton value="driver" />
            <Text
              tw="self-center font-medium text-gray-900"
              style={styles.font}
            >
              Driver
            </Text>
          </View>
          {error && (
            <Text tw="text-red-500" style={styles.font}>
              {error.message}
            </Text>
          )}
        </RadioButton.Group>
      )}
    />
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default CustomRadioButton
