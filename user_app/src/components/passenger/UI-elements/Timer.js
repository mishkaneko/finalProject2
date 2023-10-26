import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { StyledTextP } from '../../shared/StyledComponents'

function CountdownTimer({ initialTime, onTimeout }) {
  const [time, setTime] = useState(initialTime)

  useEffect(() => {
    const interval = setInterval(() => {
      if (time > 0) {
        setTime(time - 1)
      } else {
        clearInterval(interval)
        onTimeout() // Execute a callback when the timer reaches zero
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [time, onTimeout])

  return (
    <StyledTextP style={styles.font} tw="mt-2 mb-6 text-red-800">
      {time} seconds remaining
    </StyledTextP>
  )
}

const styles = StyleSheet.create({
  font: { fontFamily: 'font', alignSelf: 'center' },
})

export default CountdownTimer
