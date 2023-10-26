import { View, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useContext, useEffect } from 'react'
import { StyledTitleP } from '../../shared/StyledComponents'
import Logo from '../UI-elements/Logo'
import CancelButton from '../../shared/CancelButton'
import LottieView from 'lottie-react-native'
import { get, put } from '../../../utils/java-API'
import { HomeStatusContext } from '../../../contexts/HomeStatusContext'
import { useEvent } from 'tamagui'
import { MatchInfoContext } from '../../../contexts/MatchInfoContext'
import InvisibleButton from '../UI-elements/InvisibleButton'

const HomeSearching = ({ navigation }) => {
  const { homeStatus, setHomeStatus } = useContext(HomeStatusContext)
  const { matchInfo, setMatchInfo } = useContext(MatchInfoContext)

  const onCancel = () => {
    setHomeStatus('available')
    navigation.navigate('Services')
    // TODO JWT?
    put('/passenger/ride/cancellation')
  }

  useEffect(() => {
    async function checkIfMatched() {
      let json = await get('/rides/match')
      // if (json.error) {
      //   console.error('failed to get match: ', json.error)
      //   return
      // }
      // if (json.status === 'available') {
      // }
      // setMatchInfo(json)
      // setHomeStatus('invitation')
      setHomeStatus('searching')
      // try {
      //   console.log('1111111111111111111111 to-get matchinfo')
      //   let matchStatus = await get('/rides/match')
      //   if (matchStatus) {
      //     setMatchInfo(matchStatus)
      //     console.log('2222222222222222222222 to-change to invitation')
      //     setHomeStatus('invitation')
      //   }
      // } catch (e) {
      //   console.error('failed to get match: ', e)
      // }
    }
    checkIfMatched()
  }, [])

  return (
    <SafeAreaView tw="self-center">
      <Logo />
      <View>
        <StyledTitleP style={styles.font}>Searching for a Match</StyledTitleP>
        <View tw="self-center">
          <LottieView
            source={require('../../../../assets/lottie/SearchAnimation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        <CancelButton
          btnLong={true}
          onPress={onCancel}
          innerText="Cancel Match &       Get a Private Ride Now"
        />
        <InvisibleButton onPress={() => setHomeStatus('invitation')} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font', alignSelf: 'center' },
  animation: { width: 200, height: 200 },
})

export default HomeSearching
