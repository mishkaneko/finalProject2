import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DriverTabs from './DriverTabs'
import JobGuide from '../../../screens/driver/JobGuide'
import JobAdditionalCharges from '../../../screens/driver/JobAdditionalCharges'
import Earnings from '../../../screens/driver/Earnings'

const Stack = createNativeStackNavigator()

const DriverNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DriverTabs" component={DriverTabs} />
      <Stack.Screen name="JobGuide" component={JobGuide} />
      <Stack.Screen
        name="JobAdditionalCharges"
        component={JobAdditionalCharges}
      />
      <Stack.Screen name="Earnings" component={Earnings} />
    </Stack.Navigator>
  )
}

export default DriverNavigation
