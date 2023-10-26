import { useState } from 'react'

export default function useBoolean(defaultValue = false) {
  const [value, setValue] = useState(defaultValue)
  return {
    value,
    setValue,
    toggle() {
      setValue((state) => !state)
    },
  }
}
