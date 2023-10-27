import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import Map from '../../shared/Google-Map-API/Map'
import BackButton from '../../shared/BackButton'
import { StyledTextP, StyledTitleP } from '../../shared/StyledComponents'
import RideInfo from '../UI-elements/RideInfo'
import { StyledView } from '../../shared/StyledComponents'
import { Feather } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import { get } from '../../../utils/java-API'
import { MatchInfoContext } from '../../../contexts/MatchInfoContext'
import InvisibleButton from '../UI-elements/InvisibleButton'
import { RideStatusContext } from '../../../contexts/RideStatusContext'

const DriverLocation = ({ navigation }) => {
  const { matchInfo } = useContext(MatchInfoContext)
  // const [rideDetailsArr, setRideDetailsArr] = useState()
  // const [mapData, setMapData] = useState()
  const { rideStatus, setRideStatus } = useContext(RideStatusContext)
  // TODO Coordinates of Driver

  const mapData = {
    origin: { latitude: 22.27823423452243, longitude: 114.17214708243273 },
    endPoint: {
      latitude: 22.229447326839672,
      longitude: 114.25076795334893,
    },
    waypoints: [
      {
        latitude: 22.285359056787513,
        longitude: 114.19178217925582,
      },
      { latitude: 22.26779106440512, longitude: 114.2388405833639 },
    ],
  }

  const rideDetailsArr = [{ key: 'License Plate No.', value: '**8389' }]

  // useEffect(() => {
  //   setRideDetailsArr([{ key: 'License Plate No.', value: '**8389' }])
  // TODO Add Match Info into MapData
  // setMapData({
  //   origin: { latitude: 22.321045835160486, longitude: 114.20939099960918 },
  //   endPoint: {
  //     latitude: 22.281980723505754,
  //     longitude: 113.93933947829203,
  //   },
  //   waypoints: [
  //     {
  //       latitude: 22.34118107523209,
  //       longitude: 114.13377883859162,
  //     },
  //     { latitude: 22.295934099636106, longitude: 113.94669489119876 },
  //   ],
  // })
  // setMapData(matchInfo.mapData)

  // TODO JWT?
  // async function fetchData() {
  //   try {
  //     let data = await get('/passenger/driver-location')
  //     setRideDetailsArr(data.rideDetailsArr)
  //   } catch (error) {
  //     console.log('Error fetching data: ', error)
  //   }
  // }
  // fetchData()
  // }, [])

  return (
    <View tw="flex-1 bg-indigo-50">
      {mapData ? (
        <Map height="h-72" mapData={mapData} />
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
      <BackButton navigation={navigation} />
      <StyledView>
        <View tw="flex-row self-center">
          <StyledTitleP style={styles.font}>Your driver is </StyledTitleP>
          {/* TODO VIDEO */}
          <StyledTitleP style={styles.font}>1 min </StyledTitleP>
          <StyledTitleP style={styles.font}>away</StyledTitleP>
        </View>
        <View tw="self-center">
          <LottieView
            source={require('../../../../assets/lottie/DriveAnimation.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        {rideDetailsArr ? (
          <RideInfo rideDetailsArr={rideDetailsArr} />
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
        <View tw="mt-2">
          <StyledTextP style={styles.font} tw="self-center mb-2">
            Contact Driver
          </StyledTextP>
          <View tw="my-2" />
          <TouchableOpacity
            type="button"
            tw="self-center w-56 bg-indigo-50 border border-indigo-700 h-12 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          >
            <View tw="flex-row self-center">
              <Feather name="phone" size={20} color="#393ba3" />
              <StyledTextP
                style={styles.font}
                tw="text-indigo-800 self-center ml-2"
              >
                Call Now
              </StyledTextP>
            </View>
          </TouchableOpacity>
          <InvisibleButton onPress={() => setRideStatus('pickedUp')} />
        </View>
      </StyledView>
    </View>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
  animation: { width: 250, height: 250 },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default DriverLocation
