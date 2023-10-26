import { createContext, useState, useEffect } from 'react'
import { socket } from '../utils/socketIO'

export const MatchInfoContext = createContext()

export const MatchInfoProvider = ({ children }) => {
  const [matchInfo, setMatchInfo] = useState('')

  useEffect(() => {
    socket.on('setMatchInfo', (info) => {
      console.log('ws event:', info)
      setMatchInfo(info)
    })
  }, [])

  return (
    <MatchInfoContext.Provider value={{ matchInfo, setMatchInfo }}>
      {children}
    </MatchInfoContext.Provider>
  )
}
