import {
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  Image,
} from 'react-native'
import React, { useEffect } from 'react'
import MapView from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import useObject from '../../../hooks/useObject'
import { env } from '../../../env'
import { useSelector } from 'react-redux'

const Map = ({ height, mapData }) => {
  const { state, update } = useObject({
    isLoading: true,
    error: '',
    isPermissionRejected: null,
    currentPosition: null,
    duration: null,
    distance: null,
  })

  const role = useSelector((state) => state.auth.role)

  // TODO VIDEO
  const locationNames = [
    'Beverly House, Lockhart Road, Wan Chai',
    'Hotel One Eighteen, Electric Road',
    'Chai Wan Park, Yee Shun Street, Chai Wan',
    'Shek O Beach, Shek O',
  ]

  useEffect(() => {
    async function loadLocation() {
      try {
        update({ isLoading: true })
        const { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
          console.log('Permission to access location was denied')
          update({ isPermissionRejected: true })
          return
        }
        update({ isPermissionRejected: false })

        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.Balanced,
        })
        update({ currentPosition: location.coords, error: '' })
      } catch (error) {
        update({ error })
      } finally {
        update({ isLoading: false })
      }
    }
    loadLocation()
  }, [update])

  const markers = [mapData.origin, ...mapData.waypoints, mapData.endPoint]

  if (state.isLoading) {
    return (
      <SafeAreaView>
        <View tw="h-60">
          <ActivityIndicator
            size={'large'}
            color={'blue'}
            style={styles.activityIndicator}
          />
        </View>
      </SafeAreaView>
    )
  }

  if (state.isPermissionRejected) {
    return (
      <SafeAreaView>
        <Text>Location permission denied.</Text>
      </SafeAreaView>
    )
  }

  if (state.error) {
    return (
      <SafeAreaView>
        <Text>Failed to get current position: {String(state.error)}</Text>
      </SafeAreaView>
    )
  }

  return (
    <View tw={height}>
      <MapView
        provider="google"
        showsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude: state.currentPosition.latitude,
          longitude: state.currentPosition.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
      >
        <MapViewDirections
          origin={mapData.origin}
          destination={mapData.endPoint}
          waypoints={mapData.waypoints}
          mode={'DRIVING'}
          strokeWidth={4}
          strokeColor="black"
          apikey={env.GOOGLE_MAP_API_KEY}
          onReady={(result) => {
            update({
              duration: result.duration,
              distance: result.distance,
            })
          }}
        />

        {markers.map((stop, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: stop.latitude,
              longitude: stop.longitude,
            }}
            title={`Stop ${index + 1}`}
            // TODO Map Upgrade - change to location name
            description={locationNames[index]}
            pinColor={
              index === 0
                ? role === 'passenger'
                  ? 'indigo'
                  : role === 'driver'
                  ? 'seagreen'
                  : 'black'
                : 'black'
            }
          />
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Map
