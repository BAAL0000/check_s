import { stockStatus } from '../lib/format'

const tones = {
  sample: 'bg-acre-gold/20 text-acre-green-dark border-acre-gold/50',
  green: 'bg-acre-green/10 text-acre-green border-acre-green/20',
  stock: {
    'in-stock': 'bg-emerald-50 text-acre-green border-emerald-200',
    'low-stock': 'bg-amber-50 text-amber-800 border-amber-200',
    'out-of-stock': 'bg-rose-50 text-rose-800 border-rose-200',
  },
} as const

export function SampleBadge({ children = 'Sample data' }: { children?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase ${tones.sample}`}>
      {children}
    </span>
  )
}

export function StockBadge({ stock }: { stock: number }) {
  const status = stockStatus(stock)
  const label =
    status === 'out-of-stock'
      ? 'Out of stock'
      : status === 'low-stock'
        ? 'Low stock'
        : 'In stock'
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones.stock[status]}`}>
      {label}
    </span>
  )
}
