import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import {
  calculatorReducer,
  initialCalculatorState,
  OPERATORS,
} from '../utils/calculator.js'

const keyboardKeys = {
  Enter: '=',
  '=': '=',
  Escape: 'AC',
  Delete: 'AC',
  Backspace: 'backspace',
  '*': '×',
  x: '×',
  X: '×',
  '/': '÷',
  '-': '−',
  '+': '+',
  '%': '%',
  '.': '.',
  ',': '.',
  F9: '+/−',
}

export function useCalculator() {
  const [state, dispatch] = useReducer(
    calculatorReducer,
    initialCalculatorState,
  )
  const [activeKey, setActiveKey] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [resultHighlighted, setResultHighlighted] = useState(false)
  const errorTimer = useRef(null)
  const keyTimer = useRef(null)
  const resultTimer = useRef(null)
  const stateRef = useRef(state)

  const pressKey = useCallback((key) => {
    const currentState = stateRef.current
    const completesOperation =
      (key === '=' || OPERATORS.includes(key)) &&
      currentState.operator &&
      currentState.storedValue !== null &&
      !currentState.waitingForNumber

    clearTimeout(keyTimer.current)
    setActiveKey(key)
    keyTimer.current = setTimeout(() => setActiveKey(null), 180)

    if (completesOperation) {
      if (currentState.operator === '÷' && Number(currentState.display) === 0) {
        clearTimeout(errorTimer.current)
        setErrorMessage('No se puede dividir entre cero')
        errorTimer.current = setTimeout(() => setErrorMessage(''), 2500)
      } else {
        clearTimeout(resultTimer.current)
        setResultHighlighted(true)
        resultTimer.current = setTimeout(
          () => setResultHighlighted(false),
          550,
        )
      }
    }

    const nextState = calculatorReducer(currentState, key)
    stateRef.current = nextState
    dispatch(key)
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.altKey || event.metaKey) return

      const calculatorKey = /^\d$/.test(event.key)
        ? event.key
        : keyboardKeys[event.key]

      if (!calculatorKey) return

      event.preventDefault()
      pressKey(calculatorKey)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [pressKey])

  useEffect(() => {
    return () => {
      clearTimeout(errorTimer.current)
      clearTimeout(keyTimer.current)
      clearTimeout(resultTimer.current)
    }
  }, [])

  return {
    activeKey,
    display: state.display,
    errorMessage,
    operator: state.operator,
    pressKey,
    resultHighlighted,
    selectedOperator: state.waitingForNumber ? state.operator : null,
    storedValue: state.storedValue,
  }
}
