import type { Product, StockStatus } from '../types'
import { unitLabels } from '../data/seed'

export function money(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function sampleMoney(value: number): string {
  return `${money(value)} sample`
}

export function stockStatus(stock: number): StockStatus {
  if (stock <= 0) return 'out-of-stock'
  if (stock <= 8) return 'low-stock'
  return 'in-stock'
}

export function stockLabel(stock: number): string {
  const status = stockStatus(stock)
  if (status === 'out-of-stock') return 'Out of stock'
  if (status === 'low-stock') return `Low stock · ${stock} left`
  return `In stock · ${stock}`
}

export function unitText(product: Product): string {
  return unitLabels[product.unit]
}

export function id(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}
