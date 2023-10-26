import React from 'react'
import { Controller } from 'react-hook-form'
import { TextInput, Text, View, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

const CustomInputforProfile = ({
  control,
  name,
  placeholder,
  secureTextEntry,
  rules = {},
  defaultValue,
}) => {
  const role = useSelector((state) => state.auth.role)
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
          <View tw="h-12 rounded-xl border flex-row border-gray-300 px-4 items-center mb-2">
            <TextInput
              tw="flex-1"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              editable={true}
              defaultValue={defaultValue}
            />
            <Entypo
              name="circle-with-cross"
              size={24}
              color="black"
              style={{ opacity: 0.5 }}
              onPress={() => onChange('')}
            />
          </View>
          {error && (
            <Text
              tw={`${
                role === 'passenger' ? `text-indigo-950` : `text-teal-950`
              } text-red-500 items-stretch mb-1`}
              style={styles.font}
            >
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

export default CustomInputforProfile
