import { View, StyleSheet } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import Map from '../../shared/Google-Map-API/Map'
import BackButton from '../../shared/BackButton'
import { StyledTextP, StyledTitleP } from '../../shared/StyledComponents'
import { StyledView } from '../../shared/StyledComponents'
import LottieView from 'lottie-react-native'
import { get } from '../../../utils/java-API'
import { MatchInfoContext } from '../../../contexts/MatchInfoContext'
import InvisibleButton from '../UI-elements/InvisibleButton'
import { RideStatusContext } from '../../../contexts/RideStatusContext'

const RideWaitDriver = ({ navigation }) => {
  // TODO Add Match Info into mapData
  const { matchInfo } = useContext(MatchInfoContext)
  // const [mapData, setMapData] = useState()
  const { rideStatus, setRideStatus } = useContext(RideStatusContext)

  const mapData = {
    origin: { latitude: 22.321045835160486, longitude: 114.20939099960918 },
    endPoint: {
      latitude: 22.281980723505754,
      longitude: 113.93933947829203,
    },
    waypoints: [
      {
        latitude: 22.34118107523209,
        longitude: 114.13377883859162,
      },
      { latitude: 22.295934099636106, longitude: 113.94669489119876 },
    ],
  }

  // useEffect(() => {
  //   setMapData({
  //     origin: { latitude: 22.358259794757863, longitude: 114.10598984158241 },
  //     endPoint: {
  //       latitude: 22.306554744811326,
  //       longitude: 114.16987956506375,
  //     },
  //     waypoints: [
  //       {
  //         latitude: 22.338168404230743,
  //         longitude: 114.13976926252467,
  //       },
  //       { latitude: 22.327943433743126, longitude: 114.15336899414051 },
  //     ],
  //   })
  //   // setMapData(matchInfo.mapData)
  // }, [])

  return (
    <View>
      <Map height="h-72" mapData={mapData} />
      <BackButton navigation={navigation} />
      <StyledView>
        <View tw="self-center mt-8">
          <StyledTitleP style={styles.font}>Contacting Driver...</StyledTitleP>
        </View>
        <View tw="self-center">
          <LottieView
            source={require('../../../../assets/lottie/WaitDriver.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        <View tw="self-center">
          <StyledTextP style={styles.font}>
            We will let you know once confirmed
          </StyledTextP>
          <InvisibleButton onPress={() => setRideStatus('showDriver')} />
        </View>
      </StyledView>
    </View>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
  animation: { width: 290, height: 290 },
})

export default RideWaitDriver
