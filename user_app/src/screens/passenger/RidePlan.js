import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import React, { useCallback, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../components/shared/BackButton'
import {
  StyledTextP,
  StyledTitleP,
  StyledView,
} from '../../components/shared/StyledComponents'
import DateTimePicker from '@react-native-community/datetimepicker'
import PlacesInput from '../../components/shared/Google-Map-API/PlacesInput'
import useObject from '../../hooks/useObject'
import ConfirmButton from '../../components/passenger/UI-elements/ConfirmButton'
import { MaterialIcons } from '@expo/vector-icons'
import { useToast } from 'react-native-toast-notifications'
import { post } from '../../utils/java-API'
import { HomeStatusContext } from '../../contexts/HomeStatusContext'
import { post as nodePost } from '../../utils/node-API'

const RidePlan = ({ navigation, route }) => {
  const { homeStatus, setHomeStatus } = useContext(HomeStatusContext)
  const { state, update } = useObject({
    startCoord: null,
    startName: null,
    endCoord: null,
    endName: null,
    timestamp: new Date(),
  })

  const toast = useToast()

  const onSubmit = async () => {
    if (state.startCoord == null || state.endCoord == null) {
      toast.show('Please fill in your starting point and destination', {
        type: 'danger',
        duration: 2000,
        icon: <MaterialIcons name="error" size={24} color="white" />,
      })
      return
    }

    const data = {
      match: route.params.data.match,
      start_point: {
        lat: state.startCoord.lat,
        lng: state.startCoord.lng,
        name: state.startName,
      },

      end_point: {
        lat: state.endCoord.lat,
        lng: state.endCoord.lng,
        name: state.endName,
      },
      arrive_by_time: state.timestamp,
    }
    // console.log('post', data)

    // let json = await post('/rides/plan', data)
    // TODO TEMP
    // nodePost('/rides/plan', data)

    // if (json.error) {
    //   toast.show(String(json.error))
    //   return
    // }

    setHomeStatus('searching')
    navigation.navigate('Home')
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView tw="flex-1 bg-indigo-50">
        <BackButton navigation={navigation} />
        <StyledView>
          <StyledTitleP style={styles.font} tw="my-10">
            Plan Your Ride
          </StyledTitleP>
          <View>
            <StyledTextP style={styles.font} tw="mb-2">
              Starting Point
            </StyledTextP>
            <PlacesInput
              onCoordChange={useCallback(
                (coord, name) => update({ startCoord: coord, startName: name }),
                [update],
              )}
            />
          </View>
          <View tw="mt-4 mb-4 ">
            <StyledTextP style={styles.font} tw="mb-2">
              Destination
            </StyledTextP>
            <PlacesInput
              onCoordChange={useCallback(
                (coord, name) => update({ endCoord: coord, endName: name }),
                [update],
              )}
            />
          </View>
          <View tw="mb-36">
            <StyledTextP style={styles.font}>
              Expected Arrival Date & Time
            </StyledTextP>
            <View tw="self-center mr-4 mt-2">
              <DateTimePicker
                testID="dateTimePicker"
                value={state.timestamp}
                mode="datetime"
                onChange={(event, value) => update({ timestamp: value })}
                accentColor="indigo"
              />
            </View>
          </View>
          <ConfirmButton btnLong={true} onPress={onSubmit} innerText="Submit" />
        </StyledView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default RidePlan
