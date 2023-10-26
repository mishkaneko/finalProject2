import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HomeWhere from '../../components/passenger/screen-components/HomeWhere'
import { StyledView } from '../../components/shared/StyledComponents'
import HomeWaitConfirmation from '../../components/passenger/screen-components/HomeWaitConfirmation'
import HomeSearching from '../../components/passenger/screen-components/HomeSearching'
import HomeInvitation from '../../components/passenger/screen-components/HomeInvitation'
import HomePlanned from '../../components/passenger/screen-components/HomePlanned'
import { HomeStatusContext } from '../../contexts/HomeStatusContext'

const Home = ({ navigation }) => {
  const { homeStatus, setHomeStatus } = useContext(HomeStatusContext)

  // Define a mapping of status values to corresponding components
  const statusComponentMap = {
    available: <HomeWhere navigation={navigation} />,
    searching: <HomeSearching navigation={navigation} />,
    invitation: <HomeInvitation navigation={navigation} />,
    waitingConfirmation: <HomeWaitConfirmation navigation={navigation} />,
    planned: <HomePlanned navigation={navigation} />,
  }

  const renderedComponent = statusComponentMap[homeStatus]

  return (
    <SafeAreaView tw="flex-1 bg-indigo-50">
      <StyledView>{renderedComponent}</StyledView>
    </SafeAreaView>
  )
}

export default Home
