import { createContext, useState, useEffect } from 'react'
import { socket } from '../utils/socketIO'
import * as Notifications from 'expo-notifications'
import { useSelector } from 'react-redux'

export const JobStatusContext = createContext()

// For Driver Only
// Statuses
// - noJob
// - newJob

export const JobStatusProvider = ({ children }) => {
  const [jobStatus, setJobStatus] = useState('noJob')
  const role = useSelector((state) => state.auth.role)

  useEffect(() => {
    socket.on('setJobStatus', (status) => {
      console.log(status)
      setJobStatus(status.status)
    })
  }, [])

  // useEffect(() => {
  //   // Toggle jobStatus between 'noJob' and 'newJob' every 10 seconds
  //   const toggleJobStatus = setInterval(() => {
  //     setJobStatus((currentStatus) =>
  //       currentStatus === 'noJob' ? 'newJob' : 'noJob',
  //     )
  //   }, 10000) // 10 seconds in milliseconds

  //   // Clear the interval when the component unmounts
  //   return () => {
  //     clearInterval(toggleJobStatus)
  //   }
  // }, [])

  useEffect(() => {
    if (jobStatus === 'newJob' && role === 'driver') {
      sendNotification()
    }
  }, [jobStatus])

  return (
    <JobStatusContext.Provider value={{ jobStatus, setJobStatus }}>
      {children}
    </JobStatusContext.Provider>
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
        title: 'New Job from RideLinker',
        body: 'Check out your new job!',
      },
      trigger: null,
    })
  }
}
