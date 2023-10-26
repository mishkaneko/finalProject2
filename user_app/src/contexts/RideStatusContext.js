import { createContext, useState, useEffect } from 'react'
import { socket } from '../utils/socketIO'

export const RideStatusContext = createContext()

// For Passenger Only
// Statuses
// - waitingDriverConfirmation
// - showDriver
// - pickedUp
// - completed

export const RideStatusProvider = ({ children }) => {
  const [rideStatus, setRideStatus] = useState('waitingDriverConfirmation')

  useEffect(() => {
    socket.on('setHomeStatus', (status) => {
      console.log(status)
      setRideStatus(status)
    })
  }, [])

  return (
    <RideStatusContext.Provider value={{ rideStatus, setRideStatus }}>
      {children}
    </RideStatusContext.Provider>
  )
}
