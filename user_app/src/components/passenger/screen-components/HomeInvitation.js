import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { StyledTextP, StyledTitleP } from '../../shared/StyledComponents'
import RideInfo from '../UI-elements/RideInfo'
import Logo from '../UI-elements/Logo'
import ConfirmButton from '../UI-elements/ConfirmButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import CountdownTimer from '../UI-elements/Timer'
import { useTimer } from '../../../contexts/TimerContext'
import { HomeStatusContext } from '../../../contexts/HomeStatusContext'

const HomeInvitation = ({ navigation }) => {
  const { homeStatus, setHomeStatus } = useContext(HomeStatusContext)
  const [rideDetailsArr, setRideDetailsArr] = useState(null)
  const { timer } = useTimer()
  const onAccept = () => navigation.navigate('RidePassengerFound')

  // TODO VIDEO
  useEffect(() => {
    setRideDetailsArr([
      {
        key: 'Other Passenger',
        value: 'Jonathan Lam (4.91★)',
        // value: 'Kathrine Koo (4.86★)',
      },
      {
        key: 'Pickup',
        value: 'Exchange Tower, Wang Chiu Road, Kowloon Bay',
        // value: 'Princess Margaret Hospital, Kwai Chung',
      },
      {
        key: 'Dropoff',
        value: 'Yu Nga Court, Yi Tung Road, Tung Chung',
        // value: 'North Lantau Island, Tung Chung',
      },
      { key: 'Estimated Pickup', value: 'Today 4:45 p.m.' },
      // { key: 'Estimated Pickup', value: 'Today 5:05 p.m.' },
      { key: 'Estimated Dropoff', value: 'Today 5:25 p.m.' },
      // { key: 'Estimated Dropoff', value: 'Today 5:35 p.m.' },
      { key: 'Saved Amount', value: '$78.30' },
      // { key: 'Saved Amount', value: '$114.60' },
    ])
  }, [])

  // TODO VIDEO
  return (
    <View>
      <Logo />
      <StyledTitleP style={styles.font}>Ride Invitation</StyledTitleP>
      <StyledTitleP style={styles.font} tw="mb-2 text-red-800">
        <View>
          <CountdownTimer
            initialTime={timer}
            onTimeout={() => console.log('Timer expired on HomeInvitation')}
          />
        </View>
      </StyledTitleP>
      {rideDetailsArr ? (
        <View>
          <RideInfo rideDetailsArr={rideDetailsArr} />
          <View tw="flex-row justify-end mb-6">
            <StyledTextP style={styles.font}>Fare: </StyledTextP>
            <StyledTextP style={styles.font} tw="text-indigo-600">
              $212.70
              {/* $116.90 */}
            </StyledTextP>
          </View>
        </View>
      ) : (
        <SafeAreaView>
          <View tw="h-60">
            <ActivityIndicator
              size={'large'}
              color={'blue'}
              style={styles.activityIndicator}
            />
          </View>
        </SafeAreaView>
      )}

      <View tw="flex-row-reverse self-center mr-2">
        <ConfirmButton onPress={onAccept} innerText="View Details" />
        <View tw="mx-2" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font', alignSelf: 'center' },
  animation: { width: 200, height: 200 },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeInvitation
