import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import React, { useCallback, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  StyledTextP,
  StyledView,
} from '../../components/shared/StyledComponents'
import DropdownSelector from '../../components/shared/DropdownSelector'
import ConfirmButton from '../../components/passenger/UI-elements/ConfirmButton'
import TransparentButton from '../../components/passenger/UI-elements/TransparentButton'
import LottieView from 'lottie-react-native'
import useObject from '../../hooks/useObject'
import { MaterialIcons } from '@expo/vector-icons'
import { useToast } from 'react-native-toast-notifications'
import { HomeStatusContext } from '../../contexts/HomeStatusContext'
import { post } from '../../utils/java-API'
import { RideStatusContext } from '../../contexts/RideStatusContext'

const ratingSelections = [
  { label: '5', value: '5' },
  { label: '4', value: '4' },
  { label: '3', value: '3' },
  { label: '2', value: '2' },
  { label: '1', value: '1' },
]

const LeaveReview = ({ navigation }) => {
  const { homeStatus, setHomeStatus } = useContext(HomeStatusContext)
  const { rideStatus, setRideStatus } = useContext(RideStatusContext)
  const { state, update } = useObject({
    score: null,
    comment: null,
  })

  const toast = useToast()

  const submitReview = () => {
    if (state.score == null) {
      toast.show('Please select a score.', {
        type: 'danger',
        duration: 2000,
        icon: <MaterialIcons name="error" size={24} color="white" />,
      })
      return
    }

    const data = { score: state.score, comment: state.comment }
    // TODO JWT?
    // post('/passenger/review', data)
    toast.show('Thanks for your review', {
      type: 'success',
      duration: 2000,
      icon: <MaterialIcons name="done" size={24} color="white" />,
    })
    setHomeStatus('available')
    setRideStatus('waitingDriverConfirmation')
    // navigation.navigate('PassengerTabs', { screen: 'History' })
    navigation.navigate('PassengerTabs', { screen: 'Home' })
  }

  const onCancel = () => {
    setHomeStatus('available')
    setRideStatus('waitingDriverConfirmation')
    navigation.navigate('PassengerTabs', { screen: 'Home' })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for iOS and Android
      style={{ flex: 1 }}
    >
      <SafeAreaView
        tw="flex-1 bg-indigo-50"
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <StyledView>
            <StyledTextP style={styles.font} tw="text-2xl self-center">
              Thank you for riding with us
            </StyledTextP>
            <View tw="self-center">
              <LottieView
                source={require('../../../assets/lottie/ReviewAnimation.json')}
                autoPlay
                loop
                style={styles.animation}
              />
            </View>
            <StyledTextP style={styles.font} tw="mb-8">
              Would you like to rate the other passenger?
            </StyledTextP>
            <View tw="flex-row mb-2">
              <StyledTextP style={styles.font} tw="flex-1">
                Passenger:
              </StyledTextP>
              <StyledTextP style={styles.font} tw="flex-1">
                Martin Ho
              </StyledTextP>
            </View>
            <View tw="flex-row mb-2">
              <StyledTextP style={styles.font} tw="self-center flex-1">
                Score:
              </StyledTextP>
              <View tw="flex-1">
                <DropdownSelector
                  dropDownData={ratingSelections}
                  iconName={'star'}
                  iconPosition={'right'}
                  width={100}
                  onValueChange={useCallback(
                    (score) => update({ score: score }),
                    [update],
                  )}
                />
              </View>
            </View>
            <View tw="mb-16">
              <StyledTextP style={styles.font} tw="mb-2">
                Comments:
              </StyledTextP>
              <TextInput
                multiline
                tw="block p-4 w-full text-base text-indigo-700 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your thoughts here..."
                value={state.comment}
                onChangeText={(comment) => update({ comment })}
              />
            </View>
            <ConfirmButton
              btnLong={true}
              onPress={submitReview}
              innerText="Submit Review"
            />
            <View tw="mb-4" />
            <TransparentButton onPress={onCancel} innerText="Cancel" />
          </StyledView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
  animation: { width: 200, height: 200 },
})

export default LeaveReview
