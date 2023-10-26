import React from 'react'
import { Controller } from 'react-hook-form'
import { TextInput, Text, View, StyleSheet } from 'react-native'

const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  rules = {},
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View tw="w-75 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              style={styles.font}
            />
          </View>
          {error && (
            <Text tw="text-red-500 items-stretch" style={styles.font}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default CustomInput
