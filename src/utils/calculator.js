export const OPERATORS = ['+', '−', '×', '÷']

const operations = {
  '+': (first, second) => first + second,
  '−': (first, second) => first - second,
  '×': (first, second) => first * second,
  '÷': (first, second) => first / second,
}

export const initialCalculatorState = {
  display: '0',
  operator: null,
  storedValue: null,
  waitingForNumber: false,
}

function calculate(firstValue, operator, secondValue) {
  if (operator === '÷' && secondValue === 0) return null

  const result = operations[operator](firstValue, secondValue)
  return Number(result.toPrecision(12))
}

function resetState() {
  return initialCalculatorState
}

function applyOperator(state, nextOperator) {
  const currentValue = Number(state.display)

  if (state.operator && state.waitingForNumber) {
    return { ...state, operator: nextOperator }
  }

  if (state.storedValue === null) {
    return {
      ...state,
      operator: nextOperator,
      storedValue: currentValue,
      waitingForNumber: true,
    }
  }

  const result = calculate(state.storedValue, state.operator, currentValue)
  if (result === null) return resetState()

  return {
    ...state,
    display: String(result),
    operator: nextOperator,
    storedValue: result,
    waitingForNumber: true,
  }
}

function showResult(state) {
  if (!state.operator || state.storedValue === null || state.waitingForNumber) {
    return state
  }

  const result = calculate(
    state.storedValue,
    state.operator,
    Number(state.display),
  )

  if (result === null) return resetState()

  return {
    ...state,
    display: String(result),
    operator: null,
    storedValue: null,
    waitingForNumber: true,
  }
}

export function calculatorReducer(state, key) {
  if (/^\d$/.test(key)) {
    if (state.waitingForNumber || state.display === '0') {
      return { ...state, display: key, waitingForNumber: false }
    }

    return state.display.length < 12
      ? { ...state, display: state.display + key }
      : state
  }

  if (OPERATORS.includes(key)) return applyOperator(state, key)
  if (key === '=') return showResult(state)
  if (key === 'AC') return resetState()

  if (key === '.') {
    if (state.waitingForNumber) {
      return { ...state, display: '0.', waitingForNumber: false }
    }

    return state.display.includes('.')
      ? state
      : { ...state, display: `${state.display}.` }
  }

  if (key === '+/−' && state.display !== '0') {
    return { ...state, display: String(Number(state.display) * -1) }
  }

  if (key === '%') {
    return { ...state, display: String(Number(state.display) / 100) }
  }

  if (key === 'backspace' && !state.waitingForNumber) {
    const nextDisplay = state.display.slice(0, -1)
    return {
      ...state,
      display: nextDisplay && nextDisplay !== '-' ? nextDisplay : '0',
    }
  }

  return state
}
