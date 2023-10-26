import { useState, useCallback } from 'react'

export default function useObject(initialState = {}) {
  const [state, setState] = useState(initialState)

  const update = useCallback((partialState) => {
    // Merges the partial changes with the current state
    setState((currentState) => ({ ...currentState, ...partialState }))
  }, [])

  return { state, update, setState }
}
