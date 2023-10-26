import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { RideStatusContext } from '../../contexts/RideStatusContext'
import RideProgress from '../../components/passenger/screen-components/RideProgress'
import LeaveReview from './LeaveReview'
import RideWaitDriver from '../../components/passenger/screen-components/RideWaitDriver'
import RideDriverLocation from '../../components/passenger/screen-components/RideDriverLocation'

const Ride = ({ navigation }) => {
  const { rideStatus, setRideStatus } = useContext(RideStatusContext)

  const statusComponentMap = {
    waitingDriverConfirmation: <RideWaitDriver navigation={navigation} />,
    showDriver: <RideDriverLocation navigation={navigation} />,
    pickedUp: <RideProgress navigation={navigation} />,
    completed: <LeaveReview navigation={navigation} />,
  }

  const renderedComponent = statusComponentMap[rideStatus]

  return <View tw="flex-1 bg-indigo-50">{renderedComponent}</View>
}

export default Ride
