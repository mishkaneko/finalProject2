import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PassengerTabs from './PassengerTabs'
import RidePlan from '../../../screens/passenger/RidePlan'
import RidePassengerFound from '../screen-components/RidePassengerFound'
import LeaveReview from '../../../screens/passenger/LeaveReview'
import DriverLocation from '../screen-components/RideDriverLocation'
import RideProgress from '../screen-components/RideProgress'
import Ride from '../../../screens/passenger/Ride'

const Stack = createNativeStackNavigator()

const PassengerNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={PassengerTabs} />
      <Stack.Screen name="RidePlan" component={RidePlan} />
      <Stack.Screen name="RidePassengerFound" component={RidePassengerFound} />
      <Stack.Screen name="Ride" component={Ride} />
      <Stack.Screen name="LeaveReview" component={LeaveReview} />
      {/* <Stack.Screen name="DriverLocation" component={DriverLocation} /> */}
      {/* <Stack.Screen name="RideProgress" component={RideProgress} /> */}
    </Stack.Navigator>
  )
}

export default PassengerNavigation
