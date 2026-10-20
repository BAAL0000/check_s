import { seedProducts, seedRates } from '../data/seed'
import type { StoreState } from '../types'

const STORE_KEY = 'gapf-store-v1'
const CART_KEY = 'gapf-cart-v1'

export function defaultStore(): StoreState {
  return {
    products: seedProducts,
    rates: seedRates,
    orders: [],
    messages: [],
  }
}

export function loadStore(): StoreState {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    if (!raw) return defaultStore()
    const parsed = JSON.parse(raw) as StoreState
    if (!Array.isArray(parsed.products) || parsed.products.length === 0) {
      return defaultStore()
    }
    return {
      products: parsed.products,
      rates: parsed.rates?.length ? parsed.rates : seedRates,
      orders: parsed.orders ?? [],
      messages: parsed.messages ?? [],
    }
  } catch {
    return defaultStore()
  }
}

export function saveStore(state: StoreState): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(state))
}

export function resetStore(): StoreState {
  const next = defaultStore()
  saveStore(next)
  return next
}

export function loadCart(): Array<{ productId: string; quantity: number }> {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Array<{ productId: string; quantity: number }>
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCart(items: Array<{ productId: string; quantity: number }>): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function clearCartStorage(): void {
  localStorage.removeItem(CART_KEY)
}
