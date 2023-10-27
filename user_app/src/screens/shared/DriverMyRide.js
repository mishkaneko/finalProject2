import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { get } from './api'
import DriverRideCard from './DriverRideCard'
import { MaterialIcons } from '@expo/vector-icons'

const DriverMyRide = ({ navigation }) => {
  const role = useSelector((state) => state.auth.role)
  const [driverRideHistory, setDriverRideHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getBackgroundColor = () => {
    if (role == 'passenger') {
      return '#E8EAF6'
    } else {
      return '#E0F2F1'
    }
  }

  useEffect(() => {
    getRideHistory()
  }, [])

  const getRideHistory = async () => {
    try {
      let json = await get('/driver/ridehistory')
      console.log(json)
      setDriverRideHistory(json)
      setIsLoading(false)
      return
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <SafeAreaView tw="h-full" style={{ backgroundColor: getBackgroundColor() }}>
      <TouchableOpacity
        tw="mt-10"
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          left: 0,
        }}
      >
        <MaterialIcons name="keyboard-arrow-left" size={40} color="black" />
      </TouchableOpacity>
      <View tw="mt-16 mx-7">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            overflow: 'scroll',
            overscrollBehavior: 'auto',
          }}
        >
          <Text
            tw="text-3xl self-center mb-6 text-teal-950"
            style={styles.font}
          >
            My Rides
          </Text>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              {driverRideHistory.length > 0 ? (
                driverRideHistory.map((ride) => {
                  const fromDate = new Date(ride.start_time)
                    .toISOString()
                    .split('T')[0]
                  const fromTime = new Date(ride.start_time)
                    .toISOString()
                    .split('T')[1]
                    .split('.')[0]
                  const toDate = new Date(ride.end_time)
                    .toISOString()
                    .split('T')[0]
                  const toTime = new Date(ride.end_time)
                    .toISOString()
                    .split('T')[1]
                    .split('.')[0]

                  let status
                  if (
                    ride.status == 'wait_both' ||
                    ride.status == 'wait_1' ||
                    ride.status == 'wait_2' ||
                    ride.status == null
                  ) {
                    status = 'CONFIRMED'
                  } else if (ride.status == 'confirmed') {
                    status = 'CONFIRMED'
                  } else if (ride.status == 'canceled') {
                    status = 'CANCELED'
                  }
                  return (
                    <DriverRideCard
                      key={ride.id}
                      fromDate={fromDate}
                      fromTime={fromTime}
                      status={status}
                      fromName={ride.segment1_start_location}
                      waypoint1Name={ride.segment1_end_location}
                      waypoint2Name={ride.segment2_end_location || ''}
                      toName={ride.segment3_end_location || ''}
                      toDate={toDate}
                      toTime={toTime}
                    />
                  )
                })
              ) : (
                <View tw="bg-gray-100 rounded-lg h-44 px-2 mb-2 py-2 justify-center shadow-sm">
                  <Text tw="self-center text-xl" style={styles.font}>
                    No history yet.
                  </Text>
                  <Text tw="self-center text-xl" style={styles.font}>
                    Jobs are coming soon.
                  </Text>
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default DriverMyRide
