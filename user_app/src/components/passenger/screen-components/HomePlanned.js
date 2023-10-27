import { View, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyledTextP, StyledTitleP } from '../../shared/StyledComponents'
import RideInfo from '../UI-elements/RideInfo'
import Logo from '../UI-elements/Logo'
import ConfirmButton from '../UI-elements/ConfirmButton'
import CancelButton from '../../shared/CancelButton'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { HomeStatusContext } from '../../../contexts/HomeStatusContext'
import { get, put } from '../../../utils/java-API'
import { MatchInfoContext } from '../../../contexts/MatchInfoContext'

const HomePlanned = ({ navigation }) => {
  const { homeStatus, setHomeStatus } = useContext(HomeStatusContext)
  const { matchInfo } = useContext(MatchInfoContext)
  const [rideDetailsArr, setRideDetailsArr] = useState(null)

  const viewProgress = () => navigation.navigate('Ride')

  const onCancel = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Reject Match',
      textBody: 'You sure you want to cancel this planned ride?',
      button: 'Reject',
      onPressButton: () => {
        Dialog.hide()
        setHomeStatus('available')
        navigation.navigate('Home')
        // TODO JWT?
        put('/passenger/match/cancellation')
      },
    })
  }

  useEffect(() => {
    // TODO Add Match Info into rideDetailsArr
    setRideDetailsArr([
      {
        key: 'Other Passenger',
        value: 'Martin Ho (4.93★)',
        // value: 'Kathrine Koo (4.86★)',
      },
      {
        key: 'Pickup',
        value: 'Beverly House, Lockhart Road, Wan Chai',
        // value: 'Princess Margaret Hospital, Kwai Chung',
      },
      {
        key: 'Dropoff',
        value: 'Chai Wan Park, Yee Shun Street, Chai Wan',
        // value: 'North Lantau Island, Tung Chung',
      },
      { key: 'Estimated Pickup', value: 'Today 6:00 p.m.' },
      // { key: 'Estimated Pickup', value: 'Today 5:05 p.m.' },
      { key: 'Estimated Dropoff', value: 'Today 6:36 p.m.' },
      // { key: 'Estimated Dropoff', value: 'Today 5:35 p.m.' },
      { key: 'Saved Amount', value: '$50.50' },
      // { key: 'Saved Amount', value: '$114.60' },
    ])
  }, [])

  return (
    // TODO VIDEO
    <View tw="self-center">
      <Logo />
      <View>
        <StyledTitleP style={styles.font} tw="mb-10">
          Planned Ride
        </StyledTitleP>
        <View tw="mx-4">
          {rideDetailsArr ? (
            <View>
              <RideInfo rideDetailsArr={rideDetailsArr} />
              <View tw="flex-row justify-end my-2 mb-10">
                <StyledTextP style={styles.font}>Fare: </StyledTextP>
                <StyledTextP style={styles.font} tw="text-indigo-600">
                  $59.50
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
        </View>
        <View tw="flex-row-reverse">
          <ConfirmButton
            onPress={viewProgress}
            innerText="View Progress"
            btnLong={false}
          />
          <View tw="mr-4" />
          <CancelButton
            btnLong={false}
            onPress={onCancel}
            innerText="Cancel Match"
          />
        </View>
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

export default HomePlanned
