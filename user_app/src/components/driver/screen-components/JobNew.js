import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'
import React, { useState, useEffect } from 'react'
import Map from '../../shared/Google-Map-API/Map'
import { StyledTextD } from '../../shared/StyledComponents'
import { Separator } from 'tamagui'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ConfirmButton from '../UI-elements/ConfirmButton'
import { get, put } from '../../../utils/java-API'

const JobNew = ({ navigation }) => {
  const [isAvailable, setIsAvailable] = useState(true)
  const [rideDetailsArr, setRideDetailsArr] = useState(null)
  const [mapData, setMapData] = useState(null)

  const onAccept = () => {
    put('/driver/job')
    navigation.navigate('JobGuide')
  }

  const toJobGuide = () => {
    navigation.navigate('JobGuide')
  }

  useEffect(() => {
    setRideDetailsArr([
      {
        key: 'Pickup 2:',
        value: 'Hotel One Eighteen, Electric Road, Causeway Bay',
      },
      {
        key: 'Dropoff 1: ',
        value: 'Chai Wan Park, Yee Shun Street, Chai Wan',
      },
      {
        key: 'Dropoff 2: ',
        value: 'Shek O Beach, Shek O',
      },
      {
        key: 'Duration: ',
        value: '32 mins',
      },
      {
        key: 'Distance: ',
        value: '18.7 km',
      },
    ])
    setMapData({
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
    })
    // TODO JWT?
    // async function fetchData() {
    //   try {
    //     let data = await get('/driver/job')
    //     setRideDetailsArr(data.rideDetailsArr)
    //     setMapData(data.mapData)
    //   } catch (error) {
    //     console.log('Error fetching data: ', error)
    //   }
    // }

    // fetchData()
  }, [])

  return (
    <View>
      {mapData ? (
        <Map height="h-64" mapData={mapData} />
      ) : (
        <SafeAreaView>
          <View tw="h-60">
            <ActivityIndicator
              size={'large'}
              color={'green'}
              style={styles.activityIndicator}
            />
          </View>
        </SafeAreaView>
      )}
      <View tw="mx-6 my-6">
        <View tw="flex-row justify-between mb-6">
          <StyledTextD
            tw="text-teal-800 text-4xl self-center mr-4"
            style={styles.font}
          >
            {/* TODO VIDEO */}
            $163.90
          </StyledTextD>
          {isAvailable ? (
            <ConfirmButton
              btnLong={false}
              onPress={onAccept}
              innerText="Accept"
            />
          ) : (
            <ConfirmButton onPress={toJobGuide} innerText="Job Ongoing" />
          )}
        </View>

        {rideDetailsArr ? (
          <View>
            <View tw="flex-row justify-between">
              <StyledTextD style={styles.font} tw="text-base">
                Pickup 1:
              </StyledTextD>
              <View>
                <StyledTextD
                  style={styles.font}
                  tw="text-teal-600 text-base text-right w-58"
                >
                  Beverly House,
                </StyledTextD>
                <StyledTextD
                  style={styles.font}
                  tw="text-teal-600 text-base text-right w-58"
                >
                  Lockhart Road, Wan Chai
                </StyledTextD>
                <StyledTextD style={styles.font} tw="text-base text-right">
                  1 min (0.1 km) away
                </StyledTextD>
              </View>
            </View>
            <Separator marginVertical={6} />
            {rideDetailsArr.map((info, index) => (
              <View key={index}>
                <View tw="flex-row justify-between">
                  <StyledTextD style={styles.font} tw="text-teal-950 text-base">
                    {info.key}
                  </StyledTextD>
                  <View>
                    <StyledTextD
                      style={styles.font}
                      tw="text-teal-600 text-base text-right w-60"
                    >
                      {info.value}
                    </StyledTextD>
                  </View>
                </View>
                <Separator marginVertical={6} />
              </View>
            ))}
          </View>
        ) : (
          <SafeAreaView>
            <View tw="h-60">
              <ActivityIndicator
                size={'large'}
                color={'green'}
                style={styles.activityIndicator}
              />
            </View>
          </SafeAreaView>
        )}
      </View>
      <View>
        <TouchableOpacity
          type="button"
          onPress={() =>
            Linking.openURL('http://api.whatsapp.com/send?phone=85296540942')
          }
          tw="self-center bg-teal-50 border border-teal-900 w-60 font-medium rounded-lg px-5 py-2.5 mr-2"
        >
          <View tw="self-center flex-row ">
            <MaterialCommunityIcons
              name="account-question"
              size={30}
              color="#34728d"
            />
            <StyledTextD tw="ml-4">Have a Question?</StyledTextD>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default JobNew
