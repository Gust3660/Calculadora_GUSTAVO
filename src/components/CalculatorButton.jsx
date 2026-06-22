const variants = {
  number: 'bg-white text-slate-800 hover:bg-slate-100',
  action: 'bg-slate-200 text-slate-700 hover:bg-slate-300',
  operator: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
  equals: 'bg-indigo-600 text-white hover:bg-indigo-500',
}

function CalculatorButton({
  active = false,
  children,
  label,
  onClick,
  selected = false,
  variant = 'number',
}) {
  const highlighted =
    active || selected
      ? 'scale-[0.96] brightness-125 ring-4 ring-white/40 shadow-lg'
      : 'scale-100 ring-0'

  return (
    <button
      aria-label={label}
      aria-pressed={selected}
      className={`grid h-full w-full touch-manipulation select-none place-items-center rounded-xl text-[clamp(1rem,5vw,1.25rem)] font-semibold shadow-sm transition duration-150 [-webkit-tap-highlight-color:transparent] active:scale-95 active:brightness-125 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 sm:rounded-2xl ${variants[variant]} ${highlighted}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default CalculatorButton
