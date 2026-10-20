import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  CartItem,
  ContactMessage,
  MarketRate,
  Order,
  Product,
  StoreState,
} from '../types'
import {
  clearCartStorage,
  loadCart,
  loadStore,
  resetStore,
  saveCart,
  saveStore,
} from '../lib/storage'
import { id } from '../lib/format'

interface StoreContextValue {
  products: Product[]
  rates: MarketRate[]
  orders: Order[]
  messages: ContactMessage[]
  cart: CartItem[]
  cartCount: number
  cartTotal: number
  getProduct: (idOrSlug: string) => Product | undefined
  addToCart: (productId: string, quantity?: number) => { ok: boolean; message: string }
  setCartQty: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  placeSampleOrder: (input: Omit<Order, 'id' | 'createdAt' | 'items' | 'sampleTotal' | 'status'>) => Order | null
  saveProduct: (product: Product) => void
  deleteProduct: (productId: string) => void
  saveRate: (rate: MarketRate) => void
  deleteRate: (rateId: string) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  addMessage: (input: Omit<ContactMessage, 'id' | 'createdAt'>) => void
  restoreDemoData: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<StoreState>(() => loadStore())
  const [cart, setCart] = useState<CartItem[]>(() => loadCart())

  useEffect(() => {
    saveStore(store)
  }, [store])

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  const getProduct = useCallback(
    (idOrSlug: string) =>
      store.products.find((p) => p.id === idOrSlug || p.slug === idOrSlug),
    [store.products],
  )

  const addToCart = useCallback(
    (productId: string, quantity = 1) => {
      const product = store.products.find((p) => p.id === productId)
      if (!product) return { ok: false, message: 'That product is not in the sample catalog.' }
      if (product.stock <= 0) return { ok: false, message: 'This sample item is out of stock.' }

      let message = 'Added to sample cart.'
      setCart((prev) => {
        const existing = prev.find((item) => item.productId === productId)
        const nextQty = Math.min(product.stock, (existing?.quantity ?? 0) + quantity)
        if (existing && nextQty === existing.quantity) {
          message = 'Sample stock limit reached for this item.'
          return prev
        }
        if (existing) {
          return prev.map((item) =>
            item.productId === productId ? { ...item, quantity: nextQty } : item,
          )
        }
        return [...prev, { productId, quantity: nextQty }]
      })
      return { ok: true, message }
    },
    [store.products],
  )

  const setCartQty = useCallback(
    (productId: string, quantity: number) => {
      const product = store.products.find((p) => p.id === productId)
      if (!product) return
      const nextQty = Math.max(0, Math.min(product.stock, quantity))
      setCart((prev) => {
        if (nextQty === 0) return prev.filter((item) => item.productId !== productId)
        const existing = prev.find((item) => item.productId === productId)
        if (!existing) return [...prev, { productId, quantity: nextQty }]
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: nextQty } : item,
        )
      })
    },
    [store.products],
  )

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId))
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    clearCartStorage()
  }, [])

  const placeSampleOrder = useCallback(
    (input: Omit<Order, 'id' | 'createdAt' | 'items' | 'sampleTotal' | 'status'>) => {
      const lines = cart
        .map((item) => {
          const product = store.products.find((p) => p.id === item.productId)
          if (!product || product.stock < item.quantity) return null
          return {
            productId: product.id,
            name: product.name,
            unit: product.unit,
            quantity: item.quantity,
            samplePrice: product.samplePrice,
          }
        })
        .filter((line): line is NonNullable<typeof line> => Boolean(line))

      if (lines.length === 0) return null

      const order: Order = {
        id: id('ord'),
        createdAt: new Date().toISOString(),
        ...input,
        items: lines,
        sampleTotal: lines.reduce((sum, line) => sum + line.samplePrice * line.quantity, 0),
        status: 'received',
      }

      setStore((prev) => ({
        ...prev,
        orders: [order, ...prev.orders],
        products: prev.products.map((product) => {
          const line = lines.find((item) => item.productId === product.id)
          if (!line) return product
          return { ...product, stock: Math.max(0, product.stock - line.quantity) }
        }),
      }))
      setCart([])
      clearCartStorage()
      return order
    },
    [cart, store.products],
  )

  const saveProduct = useCallback((product: Product) => {
    setStore((prev) => {
      const exists = prev.products.some((p) => p.id === product.id)
      return {
        ...prev,
        products: exists
          ? prev.products.map((p) => (p.id === product.id ? product : p))
          : [product, ...prev.products],
      }
    })
  }, [])

  const deleteProduct = useCallback((productId: string) => {
    setStore((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== productId),
    }))
    setCart((prev) => prev.filter((item) => item.productId !== productId))
  }, [])

  const saveRate = useCallback((rate: MarketRate) => {
    setStore((prev) => {
      const exists = prev.rates.some((r) => r.id === rate.id)
      return {
        ...prev,
        rates: exists
          ? prev.rates.map((r) => (r.id === rate.id ? rate : r))
          : [rate, ...prev.rates],
      }
    })
  }, [])

  const deleteRate = useCallback((rateId: string) => {
    setStore((prev) => ({
      ...prev,
      rates: prev.rates.filter((r) => r.id !== rateId),
    }))
  }, [])

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setStore((prev) => ({
      ...prev,
      orders: prev.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order,
      ),
    }))
  }, [])

  const addMessage = useCallback((input: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    const message: ContactMessage = {
      id: id('msg'),
      createdAt: new Date().toISOString(),
      ...input,
    }
    setStore((prev) => ({ ...prev, messages: [message, ...prev.messages] }))
  }, [])

  const restoreDemoData = useCallback(() => {
    const next = resetStore()
    setStore(next)
    setCart([])
    clearCartStorage()
  }, [])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => {
    const product = store.products.find((p) => p.id === item.productId)
    return product ? sum + product.samplePrice * item.quantity : sum
  }, 0)

  const value = useMemo(
    () => ({
      products: store.products,
      rates: store.rates,
      orders: store.orders,
      messages: store.messages,
      cart,
      cartCount,
      cartTotal,
      getProduct,
      addToCart,
      setCartQty,
      removeFromCart,
      clearCart,
      placeSampleOrder,
      saveProduct,
      deleteProduct,
      saveRate,
      deleteRate,
      updateOrderStatus,
      addMessage,
      restoreDemoData,
    }),
    [
      store,
      cart,
      cartCount,
      cartTotal,
      getProduct,
      addToCart,
      setCartQty,
      removeFromCart,
      clearCart,
      placeSampleOrder,
      saveProduct,
      deleteProduct,
      saveRate,
      deleteRate,
      updateOrderStatus,
      addMessage,
      restoreDemoData,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
