import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useContext } from 'react'
import LottieView from 'lottie-react-native'
import { StyledTextD, StyledTitleD } from '../../shared/StyledComponents'
import InvisibleButton from '../../passenger/UI-elements/InvisibleButton'
import { JobStatusContext } from '../../../contexts/JobStatusContext'

const JobNone = () => {
  const { jobStatus, setJobStatus } = useContext(JobStatusContext)
  return (
    <SafeAreaView>
      <View tw="self-center mt-52">
        <StyledTitleD style={styles.font}>Finding the </StyledTitleD>
        <StyledTitleD style={styles.font} tw="mt-2">
          Perfect Job for You
        </StyledTitleD>
        <View tw="self-center mt-10">
          <LottieView
            source={require('../../../../assets/lottie/DriverNoJob.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>
        <StyledTextD style={styles.font}>Please hold on...</StyledTextD>
      </View>
      <InvisibleButton onPress={() => setJobStatus('newJob')} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font', alignSelf: 'center' },
  animation: { width: 200, height: 200 },
})

export default JobNone
