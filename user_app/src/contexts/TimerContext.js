import React, { createContext, useContext, useState } from 'react'

const TimerContext = createContext()

export function TimerProvider({ children }) {
  const [timer, setTimer] = useState(900) // 15 minutes in seconds

  return (
    <TimerContext.Provider value={{ timer, setTimer }}>
      {children}
    </TimerContext.Provider>
  )
}

export function useTimer() {
  return useContext(TimerContext)
}
