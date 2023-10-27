import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import Map from '../../components/shared/Google-Map-API/Map'
import { StyledTextP } from '../../components/shared/StyledComponents'
import BackButton from '../../components/shared/BackButton'
import ConfirmButton from '../../components/driver/UI-elements/ConfirmButton'
import TransparentButton from '../../components/driver/UI-elements/TransparentButton'
import { Separator } from 'tamagui'
import { JobStatusContext } from '../../contexts/JobStatusContext'
import { get, put } from '../../utils/java-API'

const JobGuide = ({ navigation }) => {
  const { jobStatus, setJobStatus } = useContext(JobStatusContext)
  const [rideStatus, setRideStatus] = useState(null)
  const [currStopIdx, setCurrStopIdx] = useState(0)
  // const [mapData, setMapData] = useState()
  const [stopsArr, setStopsArr] = useState()

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
  useEffect(() => {
    // TODO JWT?

    setStopsArr([
      {
        key: 'Pickup 1:',
        value: 'Beverly House,  Lockhart Road',
      },
      {
        key: 'Pickup 2:',
        value: 'Hotel One Eighteen, Electric Road',
      },
      {
        key: 'Dropoff 1: ',
        value: 'Chai Wan Park, Yee Shun Street',
      },
      {
        key: 'Dropoff 2: ',
        value: 'Shek O Beach, Shek O',
      },
    ])

    // async function fetchData() {
    //   try {
    //     let data = await get('/driver/job/guide')
    //     setMapData(data.mapData)
    //     setStopsArr([
    //       { key: 'Pickup 1:', value: data.locationName.origin_name },
    //       { key: 'Pickup 2:', value: data.locationName.waypointA_name },
    //       {
    //         key: 'Dropoff 1:',
    //         value: data.locationName.waypointB_name,
    //       },
    //       { key: 'Dropoff 2:', value: data.locationName.destination_name },
    //     ])
    //   } catch (error) {
    //     console.log('Error fetching data: ', error)
    //   }
    // }
    // fetchData()
  }, [])

  const handleRideStatus = (status) => setRideStatus(status)

  const renderRideStatusBtn = () => {
    switch (rideStatus) {
      case null:
        return (
          <ConfirmButton
            btnLong={true}
            onPress={() => {
              handleRideStatus('arrivedLocationA')
              // put('/driver/job/guide/start', {
              //   rideId: mapData.rideId.origin,
              //   matchId: mapData.matchId,
              // })
            }}
            innerText="Picked Up 1st Passenger"
          />
        )
      case 'arrivedLocationA':
        return (
          <ConfirmButton
            btnLong={true}
            onPress={() => {
              handleRideStatus('arrivedLocationB')
              // put('/driver/job/guide/waypointA', {
              //   rideId: mapData.rideId.waypointA,
              // })
            }}
            innerText="Picked Up 2nd Passenger"
          />
        )
      case 'arrivedLocationB':
        return (
          <ConfirmButton
            btnLong={true}
            onPress={() => {
              handleRideStatus('arrivedLocationC')
              // put('/driver/job/guide/waypointB', {
              //   rideId: mapData.rideId.waypointB,
              // })
            }}
            innerText="Dropped Off 1st Passenger"
          />
        )
      case 'arrivedLocationC':
        return (
          <ConfirmButton
            btnLong={true}
            onPress={() => {
              handleRideStatus('completed')
              // put('/driver/job/guide/completed', {
              //   rideId: mapData.rideId.endPoint,
              //   matchId: mapData.matchId,
              // })
              setJobStatus('noJob')
              navigation.navigate('Job')
            }}
            innerText="Job Completed"
          />
        )
      default:
        return null
    }
  }

  useEffect(() => {
    // Whenever rideStatus changes, update the currStopIdx
    switch (rideStatus) {
      case null:
        setCurrStopIdx(0)
        break
      case 'arrivedLocationA':
        setCurrStopIdx(1)
        break
      case 'arrivedLocationB':
        setCurrStopIdx(2)
        break
      case 'arrivedLocationC':
        setCurrStopIdx(3)
        break
      default:
        setCurrStopIdx(0)
    }
  }, [rideStatus])

  const addAdditionalCharges = () => {
    navigation.navigate('JobAdditionalCharges')
  }

  return (
    <View tw="flex-1 bg-teal-50">
      <Map height="h-72" mapData={mapData} />
      <BackButton navigation={navigation} />
      <View tw="my-6 mx-8">
        {stopsArr ? (
          stopsArr.slice(currStopIdx).map((info, index) => (
            <View key={index}>
              <StyledTextP
                style={styles.font}
                tw={index === 0 ? 'text-3xl' : null}
              >
                {info.key}
              </StyledTextP>
              <StyledTextP
                style={styles.font}
                tw={
                  index === 0 ? 'text-teal-600 text-3xl mb-4' : 'text-teal-600'
                }
              >
                {info.value}
              </StyledTextP>
              <Separator marginVertical={4} />
            </View>
          ))
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

        <View tw="mt-4" />
        {/* Hides Call Passenger Btn after picking up all passengers */}
        {rideStatus === null || rideStatus === 'arrivedLocationA' ? (
          <TransparentButton innerText="Call Passenger" />
        ) : null}
        <View tw="mt-2" />
        {/* Shows Additional Charges Btn after picking up all passengers */}
        {rideStatus === null || rideStatus === 'arrivedLocationA' ? null : (
          <TransparentButton
            onPress={addAdditionalCharges}
            innerText="Additional Charges"
          />
        )}
        <View tw="mt-2" />
        {renderRideStatusBtn()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default JobGuide
