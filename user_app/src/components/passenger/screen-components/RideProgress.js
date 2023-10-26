import { View, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import Map from '../../shared/Google-Map-API/Map'
import BackButton from '../../shared/BackButton'
import { MatchInfoContext } from '../../../contexts/MatchInfoContext'
import { RideStatusContext } from '../../../contexts/RideStatusContext'

const RideProgress = ({ navigation }) => {
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
  //   // TODO Add Match Info into mapData
  //   // setMapData(matchInfo.mapData)
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
  // }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setRideStatus('completed')
    }, 6000) // 8 seconds in milliseconds

    // Clear the timeout if the component unmounts before it completes
    return () => clearTimeout(timer)
  }, [])

  return (
    <View>
      {mapData ? (
        <Map height="h-100" mapData={mapData} />
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
    </View>
  )
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default RideProgress
