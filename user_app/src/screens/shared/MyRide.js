import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { get } from './api'
import PassengerRideCard from '../../components/shared/screen-components/PassengerRideCardCopy'

const MyRide = () => {
  const role = useSelector((state) => state.auth.role)
  const [passengerRideHistory, setPassengerRideHistory] = useState([])
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
      let json = await get('/passenger/ridehistory')
      console.log(json)
      setPassengerRideHistory(json)
      setIsLoading(false)
      return
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  return (
    <SafeAreaView tw="h-full" style={{ backgroundColor: getBackgroundColor() }}>
      <View tw="mt-16 mx-7">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            overflow: 'scroll',
            overscrollBehavior: 'auto',
          }}
        >
          <Text
            tw={`${
              role === 'passenger' ? `text-indigo-950` : `text-teal-950`
            } text-3xl self-center mb-6`}
            style={styles.font}
          >
            My Rides
          </Text>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              {passengerRideHistory.length > 0 ? (
                passengerRideHistory.map((ride) => {
                  // let fromDate
                  // if (!ride.pickup_time) {
                  //   fromDate = new Date(ride.arrive_by_time)
                  //     .toISOString()
                  //     .split('T')[0]
                  // } else {
                  //   fromDate = new Date(ride.pickup_time)
                  //     .toISOString()
                  //     .split('T')[0]
                  // }

                  // let fromTime
                  // if (!ride.pickup_time) {
                  //   fromTime = ''
                  // } else {
                  //   fromTime = new Date(ride.pickup_time)
                  //     .toISOString()
                  //     .split('T')[1]
                  //     .split('.')[0]
                  // }
                  // let toDate
                  // if (!ride.dropoff_time) {
                  //   toDate = ''
                  // } else {
                  //   toDate = new Date(ride.dropoff_time).toISOString().split('T')[0]
                  // }
                  // let toTime
                  // if (!ride.dropoff_time) {
                  //   toTime = ''
                  // } else {
                  //   toTime = new Date(ride.dropoff_time)
                  //     .toISOString()
                  //     .split('T')[1]
                  //     .split('.')[0]
                  // }
                  // let fareDecimal2
                  // if (!ride.transaction_amount) {
                  //   fareDecimal2 = 0
                  // } else {
                  //   fareDecimal2 = ride.transaction_amount.toFixed(2)
                  // }
                  // const status = ride.status.toUpperCase()

                  let fromDate
                  let fromTime
                  let toDate
                  let toTime
                  let fareDecimal2
                  let status

                  if (ride.status === 'alone' || ride.status === 'matched') {
                    if (ride.pickup_time == null) {
                      fromDate = '2023-10-21'
                      fromTime = '10:00:00'
                    } else {
                      fromDate = new Date(ride.pickup_time)
                        .toISOString()
                        .split('T')[0]
                      fromTime = new Date(ride.pickup_time)
                        .toISOString()
                        .split('T')[1]
                        .split('.')[0]
                    }

                    if (ride.dropoff_time == null) {
                      toDate = '2023-10-21'
                      toTime = '12:00:00'
                    } else {
                      toDate = new Date(ride.dropoff_time)
                        .toISOString()
                        .split('T')[0]
                      toTime = new Date(ride.dropoff_time)
                        .toISOString()
                        .split('T')[1]
                        .split('.')[0]
                    }

                    fareDecimal2 = ride.transaction_amount.toFixed(2)
                  } else if (ride.status === 'canceled') {
                    fromDate = new Date(ride.arrive_by_time)
                      .toISOString()
                      .split('T')[0]

                    fromTime = new Date(ride.arrive_by_time)
                      .toISOString()
                      .split('T')[1]
                      .split('.')[0]

                    toDate = ''

                    toTime = ''

                    fareDecimal2 = 0
                    status = ride.status.toUpperCase()
                  }
                  status = ride.status.toUpperCase()
                  return (
                    <PassengerRideCard
                      key={ride.ride_id}
                      fromDate={fromDate}
                      fromTime={fromTime}
                      status={status}
                      fromName={ride.start_location_name}
                      toName={ride.end_location_name}
                      toDate={toDate}
                      toTime={toTime}
                      fare={fareDecimal2}
                      extraFee={ride.additional_charge_amount}
                    />
                  )
                })
              ) : (
                <View tw="bg-gray-100 rounded-lg h-44 px-2 mb-2 py-2 justify-center shadow-sm">
                  <Text
                    tw={`${
                      role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                    } self-center text-xl`}
                    style={styles.font}
                  >
                    No history yet.
                  </Text>
                  <Text
                    tw={`${
                      role === 'passenger' ? `text-indigo-950` : `text-teal-950`
                    } self-center text-xl`}
                    style={styles.font}
                  >
                    Get a ride and save now.
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

export default MyRide
