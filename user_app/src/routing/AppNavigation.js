import { useSelector } from 'react-redux'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PassengerTabs from '../components/passenger/routing/PassengerTabs'
import WelcomeScreen from '../screens/shared/Welcome'
import Login from '../screens/shared/Login'
import Registration from '../screens/shared/Registration'
import DriverTabs from '../components/driver/routing/DriverTabs'
import JobGuide from '../screens/driver/JobGuide'
import JobAdditionalCharges from '../screens/driver/JobAdditionalCharges'
import Earnings from '../screens/driver/Earnings'
import RidePlan from '../screens/passenger/RidePlan'
import RidePassengerFound from '../components/passenger/screen-components/RidePassengerFound'
import Ride from '../screens/passenger/Ride'
import AccountDetails from '../screens/shared/AccountDetails'
import UpdatePassword from '../screens/shared/PasswordUpdate'
import MyRide from '../screens/shared/MyRide'
import DriverMyRide from '../screens/shared/DriverMyRide'
import AccountDetailsEdit from '../screens/shared/AccountDetailsEdit'
import MorePage from '../screens/shared/MorePage'
import MyRating from '../screens/shared/MyRating'
import CommentSent from '../screens/shared/CommentSentHistory'
import IndividualComment from '../screens/shared/IndividualComment'
import React from 'react'

const Stack = createNativeStackNavigator()

export default function AppNavigation() {
  const role = useSelector((state) => state.auth.role)
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {role === 'guest' ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Registration" component={Registration} />
        </>
      ) : role === 'driver' ? (
        <>
          <Stack.Screen name="DriverTabs" component={DriverTabs} />
          <Stack.Screen name="JobGuide" component={JobGuide} />
          <Stack.Screen
            name="JobAdditionalCharges"
            component={JobAdditionalCharges}
          />
          <Stack.Screen name="Earnings" component={Earnings} />
        </>
      ) : role === 'passenger' ? (
        <>
          <Stack.Screen name="PassengerTabs" component={PassengerTabs} />
          <Stack.Screen name="RidePlan" component={RidePlan} />
          <Stack.Screen
            name="RidePassengerFound"
            component={RidePassengerFound}
          />
          <Stack.Screen name="Ride" component={Ride} />
        </>
      ) : null}

      {role !== 'guest' ? (
        <>
          <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
          <Stack.Screen name="UserRating" component={MyRating} />
          <Stack.Screen name="DriverRideHistory" component={DriverMyRide} />
          <Stack.Screen
            name="AccountDetailsEdit"
            component={AccountDetailsEdit}
          />
          <Stack.Screen name="AccountDetails" component={AccountDetails} />
          <Stack.Screen name="PassengerRideHistory" component={MyRide} />
          <Stack.Screen name="MorePage" component={MorePage} />
          <Stack.Screen name="CommentSent" component={CommentSent} />
          <Stack.Screen
            name="IndividualComment"
            component={IndividualComment}
          />
        </>
      ) : null}
    </Stack.Navigator>
  )
}
