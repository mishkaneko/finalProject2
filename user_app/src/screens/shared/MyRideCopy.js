import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { get } from './api'
import PassengerRideCard from '../../components/shared/screen-components/PassengerRideCardCopy'

const MyRideCopy = () => {
  const role = useSelector((state) => state.auth.role)
  const [passengerRideHistory, setPassengerRideHistory] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const startIndex = (currentPage - 1) * 10
  const endIndex = currentPage * 10
  const currentRecords = passengerRideHistory.slice(startIndex, endIndex)

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
      return
    } catch (error) {
      console.log(error)
    }
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
          <Text tw="text-3xl self-center mb-6" style={styles.font}>
            My Ride
          </Text>
          {passengerRideHistory.length > 0 ? (
            currentRecords.map((ride) => {
              const fromDate = new Date(ride.pickup_time)
                .toISOString()
                .split('T')[0]
              const fromTime = new Date(ride.pickup_time)
                .toISOString()
                .split('T')[1]
                .split('.')[0]
              const toDate = new Date(ride.dropoff_time)
                .toISOString()
                .split('T')[0]
              const toTime = new Date(ride.dropoff_time)
                .toISOString()
                .split('T')[1]
                .split('.')[0]
              const fareDecimal2 = ride.transaction_amount.toFixed(2)
              const status = ride.match_status.toUpperCase()
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
              <Text tw="self-center text-xl" style={styles.font}>
                No history yet.
              </Text>
              <Text tw="self-center text-xl" style={styles.font}>
                Get a ride and save now.
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            tw="bg-gray-100 shadow-md flex-row mx-14 rounded-xl h-12 flex items-center justify-center hover:bg-black hover:text-white transition duration-500 ease-in-out mt-2"
          >
            <Text style={styles.font}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentPage((prev) => prev + 1)}
            tw="bg-gray-100 shadow-md flex-row mx-14 rounded-xl h-12 flex items-center justify-center hover:bg-black hover:text-white transition duration-500 ease-in-out mt-2"
          >
            <Text style={styles.font}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default MyRideCopy
