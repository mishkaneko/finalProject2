import { View, Text, StyleSheet } from 'react-native'
import { Separator } from 'tamagui'
import React from 'react'

const RideInfo = ({ rideDetailsArr }) => {
  return (
    <View>
      <View>
        {rideDetailsArr.map((info, index) => (
          <View key={index}>
            <View tw="flex-row justify-between">
              <Text style={styles.font} tw="text-indigo-950 text-base">
                {info.key}
              </Text>
              <View tw="w-48">
                <Text
                  style={styles.font}
                  tw="text-indigo-600 text-base text-right"
                >
                  {info.value}
                </Text>
              </View>
            </View>
            <Separator marginVertical={11} />
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default RideInfo
