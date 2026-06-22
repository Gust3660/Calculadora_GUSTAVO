function CalculatorDisplay({
  display,
  operator,
  resultHighlighted,
  storedValue,
}) {
  return (
    <div
      className={`mb-4 min-h-24 shrink-0 overflow-hidden rounded-2xl px-5 py-3 text-right transition duration-300 sm:mb-5 sm:min-h-28 sm:py-4 [@media(max-height:620px)]:mb-2 [@media(max-height:620px)]:min-h-20 [@media(max-height:620px)]:py-2 ${
        resultHighlighted
          ? 'bg-slate-700 ring-4 ring-emerald-400/40'
          : 'bg-slate-800 ring-0'
      }`}
    >
      <p className="h-6 truncate text-sm text-slate-400">
        {storedValue !== null && operator
          ? `${storedValue} ${operator}`
          : '\u00a0'}
      </p>
      <output
        aria-live="polite"
        className={`block truncate text-[clamp(2.25rem,11vw,3.5rem)] font-light leading-tight tracking-tight transition-colors duration-300 ${
          resultHighlighted ? 'text-emerald-300' : 'text-white'
        }`}
      >
        {display}
      </output>
    </div>
  )
}

export default CalculatorDisplay
