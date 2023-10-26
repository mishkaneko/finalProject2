import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

const RideCard = ({
  date,
  status,
  fromBuildingName,
  fromAddress,
  fromTime,
  toBuildingName,
  toAddress,
  toTime,
  fare,
}) => {
  return (
    <View tw="border rounded-lg h-44 px-2">
      <View tw="flex-row py-2">
        <View tw="flex-1">
          <Text style={styles.font}>{date}</Text>
          <Text style={styles.font}>{status}</Text>
        </View>
        <Text tw="pl-8" style={styles.font}>
          {fare}
        </Text>
      </View>
      <View tw="flex-row justify-evenly mb-4">
        <FontAwesome5
          name="map-marker-alt"
          size={24}
          color="black"
          style={{ marginTop: 9 }}
        />
        <View>
          <Text style={styles.font}>From:</Text>
          <Text style={styles.font}>{fromBuildingName}</Text>
          <Text style={styles.font}>{fromAddress}</Text>
        </View>
        <Text tw="mt-4" style={styles.font}>
          {fromTime}
        </Text>
      </View>
      <View tw="flex-row justify-evenly">
        <FontAwesome5
          name="map-marker-alt"
          size={24}
          color="black"
          style={{ marginTop: 9 }}
        />
        <View>
          <Text style={styles.font}>To:</Text>
          <Text style={styles.font}>{toBuildingName}</Text>
          <Text style={styles.font}>{toAddress}</Text>
        </View>
        <Text tw="mt-4" style={styles.font}>
          {toTime}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default RideCard
