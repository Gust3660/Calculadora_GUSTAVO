import { Calculator } from 'lucide-react'
import CalculatorDisplay from './components/CalculatorDisplay.jsx'
import CalculatorKeypad from './components/CalculatorKeypad.jsx'
import { useCalculator } from './hooks/useCalculator.js'

function App() {
  const {
    activeKey,
    display,
    errorMessage,
    operator,
    pressKey,
    resultHighlighted,
    selectedOperator,
    storedValue,
  } = useCalculator()

  return (
    <main className="grid h-[100svh] overflow-hidden bg-slate-200 p-3 sm:place-items-center sm:p-6">
      <section className="flex h-[calc(100svh-1.5rem)] w-full max-w-sm select-none flex-col justify-self-center rounded-[2rem] bg-slate-900 p-4 shadow-2xl shadow-slate-400/40 sm:h-[min(42rem,calc(100svh-3rem))] sm:p-5">
        <header className="mb-4 flex shrink-0 items-center gap-3 px-2 text-slate-300 sm:mb-5 [@media(max-height:620px)]:mb-2">
          <Calculator size={22} />
          <h1 className="font-semibold tracking-wide">Calculadora</h1>
        </header>

        <CalculatorDisplay
          display={display}
          operator={operator}
          resultHighlighted={resultHighlighted}
          storedValue={storedValue}
        />

        <CalculatorKeypad
          activeKey={activeKey}
          onPress={pressKey}
          selectedOperator={selectedOperator}
        />

        <p className="mt-4 hidden shrink-0 text-center text-xs text-slate-500 sm:block [@media(max-height:650px)]:hidden">
          Usa números, + − × ÷, Enter, Backspace, Esc y F9
        </p>
      </section>

      {errorMessage && (
        <div
          className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white shadow-lg"
          role="alert"
        >
          {errorMessage}
        </div>
      )}
    </main>
  )
}

export default App
