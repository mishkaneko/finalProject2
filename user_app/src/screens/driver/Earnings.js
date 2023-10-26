import { View, Text, StyleSheet } from 'react-native'
import { Separator } from 'tamagui'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../components/shared/BackButton'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import {
  StyledTextD,
  StyledTitleD,
} from '../../components/shared/StyledComponents'

const Earnings = ({ navigation }) => {
  return (
    <SafeAreaView tw="flex-1 bg-teal-50">
      <BackButton navigation={navigation} />
      <View tw="mt-12">
        <View tw="self-center mb-4">
          <StyledTitleD style={styles.font}>
            Your Monthly Earnings In 2023
          </StyledTitleD>
        </View>
        <LineChart
          data={{
            labels: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
            ],
            datasets: [
              {
                data: [
                  10250, 15367, 11579, 9834, 12936, 14762, 18743, 19642, 16436,
                  14756,
                ],
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={270}
          yAxisLabel="$"
          //   yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#163242',
            backgroundGradientFrom: '#163242',
            backgroundGradientTo: '#34728d',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#163242',
            },
          }}
          bezier
        />
      </View>
      <View tw="m-6 mt-10">
        <View tw="flex-row justify-around">
          <View tw="mb-8">
            <StyledTextD style={styles.font} tw="text-2xl">
              5,255
            </StyledTextD>
            <Text style={styles.font} tw="text-lg text-teal-600">
              Trips
            </Text>
          </View>
          <View>
            <StyledTextD style={styles.font} tw="text-2xl">
              4.92
            </StyledTextD>
            <Text style={styles.font} tw="text-lg text-teal-600">
              Rating
            </Text>
          </View>
          <View>
            <StyledTextD style={styles.font} tw="text-2xl">
              2.5
            </StyledTextD>
            <Text style={styles.font} tw="text-lg text-teal-600">
              Years
            </Text>
          </View>
        </View>
        <View tw="self-center mb-2">
          <StyledTextD style={styles.font} tw="text-2xl">
            $432,870.10
          </StyledTextD>
          <Text style={styles.font} tw="text-lg text-teal-600 mb-4">
            Lifetime Earnings
          </Text>
          <Separator marginVertical={5} />
        </View>
        <View tw="self-center mb-2">
          <View tw="self-center">
            <StyledTextD style={styles.font}> $14,429.60</StyledTextD>
          </View>
          <Text style={styles.font} tw="text-lg text-teal-600 mb-4">
            Earnings/Month
          </Text>
          <Separator marginVertical={5} />
        </View>
        <View tw="self-center mb-2">
          <View tw="self-center">
            <StyledTextD style={styles.font}>May 2022 • $23,590.70</StyledTextD>
          </View>
          <Text style={styles.font} tw="text-lg text-teal-600 mb-4">
            Highest-Earning Month
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font' },
})

export default Earnings
