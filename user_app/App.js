import { LogBox } from 'react-native'
LogBox.ignoreLogs(['Warning: ...']) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log noti
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import PassengerNavigation from './src/components/passenger/routing/PassengerNavigation'
import DriverNavigation from './src/components/driver/routing/DriverNavigation'
import { TamaguiProvider } from 'tamagui'
import config from './tamagui.config'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ToastProvider } from 'react-native-toast-notifications'
import { AlertNotificationRoot } from 'react-native-alert-notification'
import { Provider } from 'react-redux'
import { store } from './src/utils/guard/store.js'
import { StripeProvider } from '@stripe/stripe-react-native'
import { HomeStatusProvider } from './src/contexts/HomeStatusContext'
import { JobStatusProvider } from './src/contexts/JobStatusContext'
import { RideStatusProvider } from './src/contexts/RideStatusContext'
import { AuthProvider } from './src/hooks/useAuth'
import AppNavigation from './src/routing/AppNavigation'
import { MatchInfoProvider } from './src/contexts/MatchInfoContext'
import { TimerProvider } from './src/contexts/TimerContext'
import CommentSent from './src/screens/shared/CommentSentHistory'

const App = () => {
  const [isPassenger, setIsPassenger] = useState(true)

  const [fontsLoaded] = useFonts({
    font: require('./assets/fonts/VarelaRound-Regular.ttf'),
  })

  if (!fontsLoaded) {
    return (
      <SafeAreaView>
        <SafeAreaView>
          <View tw="h-60">
            <ActivityIndicator
              size={'large'}
              color={'black'}
              // style={styles.activityIndicator}
            />
          </View>
        </SafeAreaView>
      </SafeAreaView>
    )
  }

  return <AppNavigation />
  // return <CommentSent />
  // return <PassengerNavigation />
  // return <DriverNavigation />
}

export default () => (
  <Provider store={store}>
    <AuthProvider>
      <TimerProvider>
        <MatchInfoProvider>
          <RideStatusProvider>
            <HomeStatusProvider>
              <JobStatusProvider>
                <StripeProvider publishableKey="pk_test_51O3QSSGCNKPV1lcPeDHy7viqgqZ2pc2LfpZ9gRdoW8ZdZeoeWkuRJF0XoAQUASZO13VKapkVlbyvsoXgWCBfYYVw00XhBRgAwR">
                  <AlertNotificationRoot>
                    <ToastProvider>
                      <TamaguiProvider config={config}>
                        <NavigationContainer>
                          <App />
                        </NavigationContainer>
                      </TamaguiProvider>
                    </ToastProvider>
                  </AlertNotificationRoot>
                </StripeProvider>
              </JobStatusProvider>
            </HomeStatusProvider>
          </RideStatusProvider>
        </MatchInfoProvider>
      </TimerProvider>
    </AuthProvider>
  </Provider>
)

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
