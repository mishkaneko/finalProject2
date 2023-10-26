import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useContext } from 'react'
import { StyledTextP, StyledTitleP } from '../../shared/StyledComponents'
import Logo from '../UI-elements/Logo'
import CancelButton from '../../shared/CancelButton'
import LottieView from 'lottie-react-native'
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification'
import { HomeStatusContext } from '../../../contexts/HomeStatusContext'
import { put } from '../../../utils/java-API'
import InvisibleButton from '../UI-elements/InvisibleButton'
import CountdownTimer from '../UI-elements/Timer'
import { useTimer } from '../../../contexts/TimerContext'

const HomeWaitConfirmation = ({ navigation }) => {
  const { homeStatus, setHomeStatus } = useContext(HomeStatusContext)
  const { timer } = useTimer()

  const cancelMatch = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Reject Match',
      textBody: 'You sure you want to reject your best match?',
      button: 'Reject',
      onPressButton: () => {
        // TODO JWT?
        put('/passenger/match/cancellation')
        Dialog.hide()
        setHomeStatus('available')
        navigation.navigate('Services')
      },
    })
  }

  return (
    <SafeAreaView tw="self-center">
      <Logo />
      <View>
        <StyledTitleP style={styles.font}>
          Confirming with other passengers...
        </StyledTitleP>
        <View tw="self-center">
          <LottieView
            source={require('../../../../assets/lottie/WaitConfirmAnimation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        <StyledTextP style={styles.font} tw="mb-4">
          Please hold on...
        </StyledTextP>
        {/* <StyledTextP style={styles.font} tw="mb-10">
          New search will begin in...
        </StyledTextP> */}
        <StyledTextP style={styles.font} tw="mb-10">
          <CountdownTimer initialTime={timer}></CountdownTimer>
        </StyledTextP>

        <CancelButton
          btnLong={true}
          onPress={cancelMatch}
          innerText="Cancel Match &       Get a Private Ride Now"
        />
        <InvisibleButton onPress={() => setHomeStatus('planned')} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font', alignSelf: 'center' },
  animation: { width: 200, height: 200 },
})

export default HomeWaitConfirmation
