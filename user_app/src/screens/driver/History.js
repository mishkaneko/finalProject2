import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ConfirmButton from '../../components/driver/UI-elements/ConfirmButton'

// const lightGray = '#d3dfe5'

const History = ({ navigation }) => {
  const toEarningsSummary = () => navigation.navigate('Earnings')
  return (
    <SafeAreaView tw="flex-1 bg-teal-50">
      <View>
        <Text>History</Text>
        <ConfirmButton
          onPress={toEarningsSummary}
          innerText="Earnings Sumamry"
        />
      </View>
    </SafeAreaView>
  )
}

export default History
