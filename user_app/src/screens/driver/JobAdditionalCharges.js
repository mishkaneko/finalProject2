import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'
import React, { useRef, useCallback, useEffect, useState } from 'react'
import CheckBox from '../../components/shared/CheckBox'
import { StyledView } from '../../components/shared/StyledComponents'
import { XStack } from 'tamagui'
import { StyledTextD } from '../../components/shared/StyledComponents'
import ConfirmButton from '../../components/driver/UI-elements/ConfirmButton'
import TransparentButton from '../../components/driver/UI-elements/TransparentButton'
import useBoolean from '../../hooks/useBoolean'
import useObject from '../../hooks/useObject'
import { MaterialIcons } from '@expo/vector-icons'
import { useToast } from 'react-native-toast-notifications'
import { Separator } from 'tamagui'
import { get } from '../../utils/java-API'

const JobAdditionalCharges = ({ navigation }) => {
  const packageA = useBoolean()
  const animalA = useBoolean()
  const tunnel50A = useBoolean()
  const tunnelA = useBoolean()
  const othersA = useBoolean()
  const packageB = useBoolean()
  const animalB = useBoolean()
  const tunnel50B = useBoolean()
  const tunnelB = useBoolean()
  const othersB = useBoolean()

  const { state, update } = useObject({
    tunnelAmountA: null,
    othersAmountA: null,
    tunnelAmountB: null,
    othersAmountB: null,
  })

  const toast = useToast()

  const addToBill = () => {
    // if (
    //   (tunnelA.value && !state.tunnelAmountA) ||
    //   (othersA.value && !state.othersAmountA) ||
    //   (tunnelB.value && !state.tunnelAmountB) ||
    //   (othersB.value && !state.othersAmountB)
    // ) {
    //   toast.show('Fill in amount for checked items', {
    //     type: 'danger',
    //     duration: 2000,
    //     icon: <MaterialIcons name="error" size={24} color="white" />,
    //   })
    //   return
    // }

    // let data = {
    //   packageA: packageA.value,
    //   animalA: animalA.value,
    //   tunnel50A: tunnel50A.value,
    //   tunnelA: tunnelA.value,
    //   othersA: othersA.value,
    //   packageB: packageB.value,
    //   animalB: animalB.value,
    //   tunnel50B: tunnel50B.value,
    //   tunnelB: tunnelB.value,
    //   othersB: othersB.value,
    //   tunnelAmountA: state.tunnelAmountA,
    //   othersAmountA: state.othersAmountA,
    //   tunnelAmountB: state.tunnelAmountB,
    //   othersAmountB: state.othersAmountB,
    // }
    // console.log(data)
    toast.show('Request Submitted', {
      type: 'success',
      duration: 2000,
      icon: <MaterialIcons name="done" size={24} color="white" />,
    })
    navigation.goBack()
  }

  const onCancel = () => navigation.goBack()

  const tunnelFeeARef = useRef(null)
  const otherFeesARef = useRef(null)
  const tunnelFeeBRef = useRef(null)
  const otherFeesBRef = useRef(null)

  // TODO Leave Blank
  const [passengerA, setPassengerA] = useState('Victoria Tung')
  const [passengerB, setPassengerB] = useState('Martin Ho')

  useEffect(() => {
    // TODO JWT?
    // async function fetchData() {
    //   try {
    //     let data = await get('/driver/additional-charges')
    //     setPassengerA(data.A.name)
    //     setPassengerB(data.B.name)
    //   } catch (error) {
    //     console.log('Error fetching data: ', error)
    //   }
    // }
    // fetchData()
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for iOS and Android
      style={{ flex: 1 }}
    >
      <View tw="flex-1 bg-teal-50 mt-4" style={{ justifyContent: 'center' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <StyledView>
            {passengerA ? (
              <View tw="self-center">
                <Text tw="mb-2 text-2xl text-teal-950" style={styles.font}>
                  {passengerA}
                </Text>
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
            <Separator
              marginVertical={8}
              borderWidth={0.5}
              tw="border-teal-600 mb-8"
            />
            <CheckBox
              label="Additional Package $6"
              id="packageA"
              checked={packageA.value}
              onCheckedChange={packageA.setValue}
            />
            <View tw="mb-2" />
            <CheckBox
              label="Animal $5"
              id="animalA"
              checked={animalA.value}
              onCheckedChange={animalA.setValue}
            />
            <View tw="mb-2" />
            <CheckBox
              label="Tunnel Fee $50"
              id="tunnel50A"
              checked={tunnel50A.value}
              onCheckedChange={tunnel50A.setValue}
            />
            <View tw="mb-1" />
            <XStack>
              <CheckBox
                label="Other Tunnel Fees:"
                id="otherTunnelsA"
                checked={tunnelA.value}
                onCheckedChange={(value) => {
                  tunnelA.toggle()
                  if (!value) {
                    tunnelFeeARef.current.clear()
                  }
                }}
              />
              <View tw="self-center ml-2">
                <StyledTextD>$</StyledTextD>
              </View>
              <TextInput
                onChangeText={useCallback(
                  (amount) => update({ tunnelAmountA: amount }),
                  [update],
                )}
                value={state.tunnelAmountA}
                ref={tunnelFeeARef}
                tw="bg-gray-50 border border-gray-300 text-teal-800 text-sm rounded-lg focus:border-teal-500 block p-2"
                editable={tunnelA.value}
                placeholder="..."
                keyboardType="numeric"
                maxLength={3}
              />
            </XStack>
            <XStack>
              <CheckBox
                label="Other Fees:"
                id="otherFeesA"
                checked={othersA.value}
                onCheckedChange={othersA.setValue}
              />
              <View tw="self-center ml-2">
                <StyledTextD>$</StyledTextD>
              </View>
              <TextInput
                onChangeText={useCallback(
                  (amount) => update({ othersAmountA: amount }),
                  [update],
                )}
                value={state.othersAmountA}
                ref={otherFeesARef}
                editable={othersA.value}
                tw="bg-gray-50 border border-gray-300 text-teal-800 text-sm rounded-lg focus:border-teal-500 p-2"
                placeholder="..."
                keyboardType="numeric"
                maxLength={3}
              />
            </XStack>
            {passengerB ? (
              <View tw="self-center">
                <Text
                  tw="mt-10 mb-2 text-2xl text-teal-950"
                  style={styles.font}
                >
                  {passengerB}
                </Text>
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
            <Separator
              marginVertical={8}
              borderWidth={0.5}
              tw="border-teal-600 mb-8"
            />
            <CheckBox
              label="Additional Package $6"
              id="packageB"
              checked={packageB.value}
              onCheckedChange={packageB.setValue}
            />
            <View tw="mb-2" />
            <CheckBox
              label="Animal $5"
              id="animalB"
              checked={animalB.value}
              onCheckedChange={animalB.setValue}
            />
            <View tw="mb-2" />
            <CheckBox
              label="Tunnel Fee $50"
              id="tunnel50B"
              checked={tunnel50B.value}
              onCheckedChange={tunnel50B.setValue}
            />
            <View tw="mb-1" />
            <XStack>
              <CheckBox
                label="Other Tunnel Fees:"
                id="otherTunnelsB"
                checked={tunnelB.value}
                onCheckedChange={tunnelB.setValue}
              />
              <View tw="self-center ml-2">
                <StyledTextD>$</StyledTextD>
              </View>
              <TextInput
                onChangeText={useCallback(
                  (amount) => update({ tunnelAmountB: amount }),
                  [update],
                )}
                value={state.tunnelAmountB}
                ref={tunnelFeeBRef}
                editable={tunnelB.value}
                tw="bg-gray-50 border border-gray-300 text-teal-800 text-sm rounded-lg focus:border-teal-500 p-2"
                placeholder="..."
                keyboardType="numeric"
                maxLength={3}
              />
            </XStack>
            <XStack tw="mb-14">
              <CheckBox
                label="Other Fees:"
                id="otherFeesB"
                checked={othersB.value}
                onCheckedChange={othersB.setValue}
              />
              <View tw="self-center ml-2">
                <StyledTextD>$</StyledTextD>
              </View>
              <TextInput
                onChangeText={useCallback(
                  (amount) => update({ othersAmountB: amount }),
                  [update],
                )}
                value={state.othersAmountB}
                ref={otherFeesBRef}
                editable={othersB.value}
                tw="bg-gray-50 border border-gray-300 text-teal-800 text-sm rounded-lg focus:border-teal-500 p-2"
                placeholder="..."
                keyboardType="numeric"
                maxLength={3}
              />
            </XStack>
            <ConfirmButton
              btnLong={true}
              onPress={addToBill}
              innerText="Submit"
            />
            <View tw="mb-4" />
            <TransparentButton onPress={onCancel} innerText="Cancel" />
          </StyledView>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font', alignSelf: 'center' },
  animation: { width: 200, height: 200 },
})

export default JobAdditionalCharges
