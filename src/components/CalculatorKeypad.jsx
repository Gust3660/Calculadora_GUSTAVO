import { Delete } from 'lucide-react'
import CalculatorButton from './CalculatorButton.jsx'

const keys = [
  { key: 'AC', variant: 'action' },
  { key: '+/−', variant: 'action' },
  { key: '%', variant: 'action' },
  { key: '÷', variant: 'operator' },
  { key: '7' },
  { key: '8' },
  { key: '9' },
  { key: '×', variant: 'operator' },
  { key: '4' },
  { key: '5' },
  { key: '6' },
  { key: '−', variant: 'operator' },
  { key: '1' },
  { key: '2' },
  { key: '3' },
  { key: '+', variant: 'operator' },
  { key: 'backspace', label: 'Borrar último dígito', variant: 'action' },
  { key: '0' },
  { key: '.' },
  { key: '=', variant: 'equals' },
]

function CalculatorKeypad({ activeKey, onPress, selectedOperator }) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-4 grid-rows-5 gap-2 sm:gap-3 [@media(max-height:620px)]:gap-2">
      {keys.map(({ key, label, variant }) => (
        <CalculatorButton
          active={activeKey === key}
          key={key}
          label={label ?? key}
          selected={selectedOperator === key}
          variant={variant}
          onClick={() => onPress(key)}
        >
          {key === 'backspace' ? <Delete size={22} /> : key}
        </CalculatorButton>
      ))}
    </div>
  )
}

export default CalculatorKeypad
