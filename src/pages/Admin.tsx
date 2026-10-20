import { useMemo, useState, type FormEvent } from 'react'
import { Seo } from '../components/Seo'
import { SampleBadge, StockBadge } from '../components/Badge'
import { useStore } from '../context/StoreContext'
import { categoryLabels, images } from '../data/seed'
import { id, sampleMoney, stockLabel } from '../lib/format'
import type { MarketRate, Order, Product, ProductCategory, ProductUnit } from '../types'

type Tab = 'overview' | 'products' | 'inventory' | 'orders' | 'rates' | 'reports'

const tabs: Array<{ id: Tab; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'products', label: 'Products' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'orders', label: 'Orders' },
  { id: 'rates', label: 'Market rates' },
  { id: 'reports', label: 'Reports' },
]

const emptyProduct: Product = {
  id: '',
  name: '',
  slug: '',
  category: 'farm-eggs',
  description: '',
  details: '',
  image: images.mixedEggs,
  imageAlt: 'Sample product photo',
  unit: 'dozen',
  samplePrice: 0,
  stock: 0,
  featured: false,
  tags: [],
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function Admin() {
  const {
    products,
    rates,
    orders,
    messages,
    saveProduct,
    deleteProduct,
    saveRate,
    deleteRate,
    updateOrderStatus,
    restoreDemoData,
  } = useStore()
  const [tab, setTab] = useState<Tab>('overview')
  const [editing, setEditing] = useState<Product | null>(null)
  const [rateEditing, setRateEditing] = useState<MarketRate | null>(null)

  const sampleSales = orders.reduce((sum, order) => sum + order.sampleTotal, 0)
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 8)
  const outStock = products.filter((p) => p.stock <= 0)

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12">
      <Seo
        title="Demo admin | Green Acre Poultry Farm"
        description="Local demo dashboard for products, inventory, sample orders, market rates, and reports. No login or server."
      />
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <SampleBadge>Demo admin · no login</SampleBadge>
          <h1 className="mt-3 font-display text-5xl text-acre-green-dark">Farm desk</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-acre-ink/80">
            This dashboard reads and writes browser storage only. It is not a secure account, not a staff portal,
            and not connected to a payment or inventory server.
          </p>
        </div>
        <button
          type="button"
          onClick={restoreDemoData}
          className="rounded-full border border-acre-green px-4 py-2 text-sm font-semibold text-acre-green"
        >
          Restore sample catalog
        </button>
      </div>

      <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Admin sections">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === item.id
                ? 'bg-acre-green text-acre-cream'
                : 'border border-acre-green/15 bg-white text-acre-green-dark'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'overview' ? (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'Sample listings', value: String(products.length) },
            { label: 'Sample orders', value: String(orders.length) },
            { label: 'Sample sales total', value: sampleMoney(sampleSales) },
            { label: 'Messages in browser', value: String(messages.length) },
          ].map((card) => (
            <article key={card.label} className="rounded-2xl border border-acre-green/10 bg-white p-5">
              <p className="text-xs uppercase tracking-wider text-acre-green">{card.label}</p>
              <p className="mt-2 font-display text-3xl text-acre-green-dark">{card.value}</p>
            </article>
          ))}
          <article className="sm:col-span-2 rounded-2xl border border-acre-green/10 bg-white p-5">
            <h2 className="font-display text-2xl">Low sample stock</h2>
            <ul className="mt-3 grid gap-2 text-sm">
              {lowStock.length === 0 ? <li>None right now.</li> : lowStock.map((p) => (
                <li key={p.id}>{p.name} · {stockLabel(p.stock)}</li>
              ))}
            </ul>
          </article>
          <article className="sm:col-span-2 rounded-2xl border border-acre-green/10 bg-white p-5">
            <h2 className="font-display text-2xl">Recent sample messages</h2>
            <ul className="mt-3 grid gap-3 text-sm">
              {messages.slice(0, 4).map((msg) => (
                <li key={msg.id}>
                  <span className="font-semibold">{msg.name}</span> · {msg.topic}
                  <span className="block text-acre-ink/70">{msg.message}</span>
                </li>
              ))}
              {messages.length === 0 ? <li>No contact messages yet.</li> : null}
            </ul>
          </article>
        </section>
      ) : null}

      {tab === 'products' ? (
        <section className="mt-8">
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => setEditing({ ...emptyProduct, id: id('p') })}
              className="rounded-full bg-acre-green px-4 py-2 text-sm font-semibold text-acre-cream"
            >
              Add sample product
            </button>
          </div>
          {editing ? (
            <ProductForm
              product={editing}
              onCancel={() => setEditing(null)}
              onSave={(product) => {
                saveProduct(product)
                setEditing(null)
              }}
            />
          ) : null}
          <div className="overflow-x-auto rounded-2xl border border-acre-green/10 bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-acre-green text-acre-cream">
                <tr>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Sample price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-acre-green/10">
                    <td className="px-4 py-3 font-semibold">{product.name}</td>
                    <td className="px-4 py-3">{categoryLabels[product.category]}</td>
                    <td className="px-4 py-3">{sampleMoney(product.samplePrice)}</td>
                    <td className="px-4 py-3">{product.stock}</td>
                    <td className="px-4 py-3">
                      <button type="button" className="mr-3 font-semibold text-acre-green" onClick={() => setEditing(product)}>
                        Edit
                      </button>
                      <button type="button" className="font-semibold text-rose-800" onClick={() => deleteProduct(product.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {tab === 'inventory' ? (
        <section className="mt-8 overflow-x-auto rounded-2xl border border-acre-green/10 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-acre-green text-acre-cream">
              <tr>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Unit</th>
                <th className="px-4 py-3">On hand</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Adjust</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-acre-green/10">
                  <td className="px-4 py-3 font-semibold">{product.name}</td>
                  <td className="px-4 py-3">{product.unit}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3"><StockBadge stock={product.stock} /></td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      className="w-24 rounded-lg border border-acre-green/20 px-2 py-1"
                      value={product.stock}
                      onChange={(event) =>
                        saveProduct({ ...product, stock: Math.max(0, Number(event.target.value) || 0) })
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {outStock.length > 0 ? (
            <p className="px-4 py-3 text-sm text-rose-800">{outStock.length} listing{outStock.length === 1 ? '' : 's'} out of sample stock.</p>
          ) : null}
        </section>
      ) : null}

      {tab === 'orders' ? (
        <section className="mt-8 grid gap-4">
          {orders.length === 0 ? (
            <p className="rounded-2xl bg-white p-6">No sample orders yet. Place one from checkout.</p>
          ) : (
            orders.map((order) => (
              <article key={order.id} className="rounded-2xl border border-acre-green/10 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-acre-ink/70">
                      {new Date(order.createdAt).toLocaleString()} · {order.customerName}
                    </p>
                  </div>
                  <label className="text-sm font-semibold">
                    Status
                    <select
                      className="ml-2 rounded-lg border border-acre-green/20 px-2 py-1 font-normal"
                      value={order.status}
                      onChange={(event) => updateOrderStatus(order.id, event.target.value as typeof order.status)}
                    >
                      <option value="received">received</option>
                      <option value="preparing">preparing</option>
                      <option value="ready">ready</option>
                      <option value="completed">completed</option>
                    </select>
                  </label>
                </div>
                <ul className="mt-3 grid gap-1 text-sm">
                  {order.items.map((item) => (
                    <li key={item.productId}>
                      {item.name} × {item.quantity} · {sampleMoney(item.samplePrice * item.quantity)}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm font-semibold">Sample total {sampleMoney(order.sampleTotal)}</p>
                <p className="text-xs text-acre-ink/70">{order.fulfillment} · {order.email} · {order.phone}</p>
              </article>
            ))
          )}
        </section>
      ) : null}

      {tab === 'rates' ? (
        <section className="mt-8">
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() =>
                setRateEditing({
                  id: id('r'),
                  item: '',
                  unit: 'kg',
                  sampleRate: 0,
                  change: 0,
                  notes: 'Sample rate entered in demo admin.',
                  updatedAt: new Date().toISOString().slice(0, 10),
                })
              }
              className="rounded-full bg-acre-green px-4 py-2 text-sm font-semibold text-acre-cream"
            >
              Add sample rate
            </button>
          </div>
          {rateEditing ? (
            <RateForm
              rate={rateEditing}
              onCancel={() => setRateEditing(null)}
              onSave={(rate) => {
                saveRate(rate)
                setRateEditing(null)
              }}
            />
          ) : null}
          <div className="overflow-x-auto rounded-2xl border border-acre-green/10 bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-acre-green text-acre-cream">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Sample rate</th>
                  <th className="px-4 py-3">Change</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rates.map((rate) => (
                  <tr key={rate.id} className="border-t border-acre-green/10">
                    <td className="px-4 py-3 font-semibold">{rate.item}</td>
                    <td className="px-4 py-3">{sampleMoney(rate.sampleRate)}</td>
                    <td className="px-4 py-3">{rate.change}</td>
                    <td className="px-4 py-3">{rate.updatedAt}</td>
                    <td className="px-4 py-3">
                      <button type="button" className="mr-3 font-semibold text-acre-green" onClick={() => setRateEditing(rate)}>
                        Edit
                      </button>
                      <button type="button" className="font-semibold text-rose-800" onClick={() => deleteRate(rate.id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {tab === 'reports' ? <Reports products={products} orders={orders} /> : null}
    </main>
  )
}

function ProductForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product
  onSave: (product: Product) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState(product)
  const [error, setError] = useState('')

  function submit(event: FormEvent) {
    event.preventDefault()
    if (form.name.trim().length < 2) {
      setError('Name is required.')
      return
    }
    onSave({
      ...form,
      name: form.name.trim(),
      slug: form.slug.trim() || slugify(form.name),
      description: form.description.trim() || 'Sample product description.',
      details: form.details.trim() || 'Sample product details. Prices are labeled sample data.',
      imageAlt: form.imageAlt.trim() || form.name,
      tags: form.tags.filter(Boolean),
    })
  }

  return (
    <form onSubmit={submit} className="mb-6 grid gap-3 rounded-2xl border border-acre-green/10 bg-white p-5 md:grid-cols-2">
      <label className="grid gap-1 text-sm font-semibold">
        Name
        <input className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Slug
        <input className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Category
        <select
          className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value as ProductCategory })}
        >
          {Object.entries(categoryLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Unit
        <select
          className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value as ProductUnit })}
        >
          {['bird', 'kg', 'tray', 'dozen', 'crate', 'carton', 'pack'].map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Sample price
        <input
          type="number"
          min={0}
          step="0.01"
          className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal"
          value={form.samplePrice}
          onChange={(e) => setForm({ ...form, samplePrice: Number(e.target.value) || 0 })}
        />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Stock
        <input
          type="number"
          min={0}
          className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Math.max(0, Number(e.target.value) || 0) })}
        />
      </label>
      <label className="md:col-span-2 grid gap-1 text-sm font-semibold">
        Description
        <textarea className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal" rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </label>
      <label className="md:col-span-2 grid gap-1 text-sm font-semibold">
        Image URL
        <input className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
      </label>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
        Featured
      </label>
      {error ? <p className="text-sm text-rose-700">{error}</p> : null}
      <div className="md:col-span-2 flex gap-3">
        <button type="submit" className="rounded-full bg-acre-green px-4 py-2 text-sm font-semibold text-acre-cream">Save sample product</button>
        <button type="button" onClick={onCancel} className="text-sm font-semibold">Cancel</button>
      </div>
    </form>
  )
}

function RateForm({
  rate,
  onSave,
  onCancel,
}: {
  rate: MarketRate
  onSave: (rate: MarketRate) => void
  onCancel: () => void
}) {
  const [form, setForm] = useState(rate)

  return (
    <form
      className="mb-6 grid gap-3 rounded-2xl border border-acre-green/10 bg-white p-5 md:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault()
        if (!form.item.trim()) return
        onSave({ ...form, item: form.item.trim() })
      }}
    >
      <label className="grid gap-1 text-sm font-semibold">
        Item
        <input className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal" value={form.item} onChange={(e) => setForm({ ...form, item: e.target.value })} />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Unit
        <input className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Sample rate
        <input type="number" step="0.01" className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal" value={form.sampleRate} onChange={(e) => setForm({ ...form, sampleRate: Number(e.target.value) || 0 })} />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Sample change
        <input type="number" step="0.01" className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal" value={form.change} onChange={(e) => setForm({ ...form, change: Number(e.target.value) || 0 })} />
      </label>
      <label className="md:col-span-2 grid gap-1 text-sm font-semibold">
        Notes
        <input className="rounded-lg border border-acre-green/20 px-3 py-2 font-normal" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      </label>
      <div className="md:col-span-2 flex gap-3">
        <button type="submit" className="rounded-full bg-acre-green px-4 py-2 text-sm font-semibold text-acre-cream">Save sample rate</button>
        <button type="button" onClick={onCancel} className="text-sm font-semibold">Cancel</button>
      </div>
    </form>
  )
}

function Reports({ products, orders }: { products: Product[]; orders: Order[] }) {
  const byCategory = useMemo(() => {
    const map = new Map<string, number>()
    for (const product of products) {
      map.set(product.category, (map.get(product.category) ?? 0) + 1)
    }
    return Array.from(map.entries())
  }, [products])

  const sold = useMemo(() => {
    const map = new Map<string, number>()
    for (const order of orders) {
      for (const item of order.items) {
        map.set(item.name, (map.get(item.name) ?? 0) + item.quantity)
      }
    }
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6)
  }, [orders])

  return (
    <section className="mt-8 grid gap-6 md:grid-cols-2">
      <article className="rounded-2xl border border-acre-green/10 bg-white p-5">
        <h2 className="font-display text-2xl">Listings by category</h2>
        <ul className="mt-4 grid gap-2 text-sm">
          {byCategory.map(([cat, count]) => (
            <li key={cat} className="flex justify-between">
              <span>{categoryLabels[cat as ProductCategory]}</span>
              <span>{count}</span>
            </li>
          ))}
        </ul>
      </article>
      <article className="rounded-2xl border border-acre-green/10 bg-white p-5">
        <h2 className="font-display text-2xl">Units in sample orders</h2>
        <ul className="mt-4 grid gap-2 text-sm">
          {sold.length === 0 ? <li>Place a sample order to populate this chart.</li> : sold.map(([name, qty]) => (
            <li key={name} className="flex justify-between">
              <span>{name}</span>
              <span>{qty}</span>
            </li>
          ))}
        </ul>
      </article>
      <article className="md:col-span-2 rounded-2xl border border-acre-green/10 bg-white p-5">
        <h2 className="font-display text-2xl">Sample sales</h2>
        <p className="mt-2 text-sm">
          Combined sample total {sampleMoney(orders.reduce((sum, order) => sum + order.sampleTotal, 0))} across {orders.length} demo order{orders.length === 1 ? '' : 's'}.
          These numbers never leave this browser.
        </p>
      </article>
    </section>
  )
}
