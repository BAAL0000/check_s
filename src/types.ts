export type ProductCategory =
  | 'live-birds'
  | 'fresh-meat'
  | 'farm-eggs'
  | 'wholesale'
  | 'chicks'

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock'

export type ProductUnit =
  | 'bird'
  | 'kg'
  | 'tray'
  | 'dozen'
  | 'crate'
  | 'carton'
  | 'pack'

export interface Product {
  id: string
  name: string
  slug: string
  category: ProductCategory
  description: string
  details: string
  image: string
  imageAlt: string
  unit: ProductUnit
  samplePrice: number
  stock: number
  featured: boolean
  tags: string[]
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface MarketRate {
  id: string
  item: string
  unit: string
  sampleRate: number
  change: number
  notes: string
  updatedAt: string
}

export interface Review {
  id: string
  name: string
  role: string
  quote: string
  rating: number
}

export interface Order {
  id: string
  createdAt: string
  customerName: string
  email: string
  phone: string
  address: string
  notes: string
  fulfillment: 'pickup' | 'delivery'
  items: Array<{
    productId: string
    name: string
    unit: ProductUnit
    quantity: number
    samplePrice: number
  }>
  sampleTotal: number
  status: 'received' | 'preparing' | 'ready' | 'completed'
}

export interface ContactMessage {
  id: string
  createdAt: string
  name: string
  email: string
  phone: string
  topic: string
  message: string
}

export interface StoreState {
  products: Product[]
  rates: MarketRate[]
  orders: Order[]
  messages: ContactMessage[]
}
