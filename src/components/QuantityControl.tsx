export function QuantityControl({
  value,
  min = 1,
  max,
  onChange,
  disabled,
  label,
}: {
  value: number
  min?: number
  max: number
  onChange: (next: number) => void
  disabled?: boolean
  label: string
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-acre-green/20 bg-white">
      <button
        type="button"
        className="h-10 w-10 rounded-l-full text-lg text-acre-green disabled:opacity-40"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        aria-label={`Decrease ${label}`}
      >
        -
      </button>
      <span className="min-w-8 text-center text-sm font-semibold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="h-10 w-10 rounded-r-full text-lg text-acre-green disabled:opacity-40"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        aria-label={`Increase ${label}`}
      >
        +
      </button>
    </div>
  )
}
