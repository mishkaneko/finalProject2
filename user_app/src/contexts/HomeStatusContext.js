import { createContext, useState, useEffect } from 'react'
import { socket } from '../utils/socketIO'
import * as Notifications from 'expo-notifications'
import { useSelector } from 'react-redux'
import { useTimer } from '../contexts/TimerContext'

export const HomeStatusContext = createContext()

// For Passenger Only
// Statuses
// - available
// - searching
// - invitation
// - waitingConfirmation
// - planned

export const HomeStatusProvider = ({ children }) => {
  const [homeStatus, setHomeStatus] = useState('available')
  const role = useSelector((state) => state.auth.role)
  const { setTimer } = useTimer()

  // useEffect(() => {
  //   socket.on('setHomeStatus', (status) => {
  //     console.log('ws event:', status)
  //     setHomeStatus(status)
  //   })
  // }, [])

  useEffect(() => {
    if (homeStatus === 'invitation' && role === 'passenger') {
      sendNotification()
      setTimer(900) // Reset the timer to 15 minutes (900 seconds)
    }
  }, [homeStatus])

  return (
    <HomeStatusContext.Provider value={{ homeStatus, setHomeStatus }}>
      {children}
    </HomeStatusContext.Provider>
  )
}

const sendNotification = async () => {
  const { status } = await Notifications.requestPermissionsAsync()
  if (status === 'granted') {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    })

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Ride Invitation from RideLinker',
        body: 'Your invitation will only be open for 15mins',
      },
      trigger: null,
    })
  }
}

// useEffect(() => {
//   // Toggle jobStatus between 'noJob' and 'newJob' every 10 seconds
//   const toggleJobStatus = setInterval(() => {
//     setHomeStatus((currentStatus) =>
//       currentStatus === 'searching' ? 'invitation' : 'searching',
//     )
//   }, 10000) // 10 seconds in milliseconds

//   // Clear the interval when the component unmounts
//   return () => {
//     clearInterval(toggleJobStatus)
//   }
// }, [])
