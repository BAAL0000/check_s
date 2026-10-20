import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { SampleBadge } from '../components/Badge'
import { useStore } from '../context/StoreContext'
import { sampleMoney, unitText } from '../lib/format'

export function Checkout() {
  const { cart, getProduct, cartTotal, placeSampleOrder } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    customerName: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    fulfillment: 'pickup' as 'pickup' | 'delivery',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [placedId, setPlacedId] = useState('')

  const lines = cart
    .map((item) => {
      const product = getProduct(item.productId)
      return product ? { ...item, product } : null
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line))

  function validate() {
    const next: Record<string, string> = {}
    if (form.customerName.trim().length < 2) next.customerName = 'Enter a name for the sample order.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (form.phone.trim().length < 7) next.phone = 'Enter a phone number.'
    if (form.fulfillment === 'delivery' && form.address.trim().length < 8) {
      next.address = 'Delivery needs a sample street address.'
    }
    return next
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return
    const order = placeSampleOrder({
      customerName: form.customerName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      notes: form.notes.trim(),
      fulfillment: form.fulfillment,
    })
    if (!order) {
      setErrors({ form: 'The cart could not be converted. Check sample stock and try again.' })
      return
    }
    setPlacedId(order.id)
  }

  if (lines.length === 0 && !placedId) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Seo title="Checkout | Green Acre" description="Sample checkout for the Green Acre poultry cart." />
        <h1 className="font-display text-4xl">Nothing to check out</h1>
        <Link to="/shop" className="mt-4 inline-flex font-semibold text-acre-green">
          Return to shop
        </Link>
      </main>
    )
  }

  if (placedId) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Seo title="Sample order saved | Green Acre" description="A demo poultry order was saved in this browser." />
        <SampleBadge>Local sample order</SampleBadge>
        <h1 className="mt-4 font-display text-5xl text-acre-green-dark">Request saved on this device</h1>
        <p className="mt-4 leading-7">
          Order {placedId} is stored in browser storage. No payment was taken, no account was created, and no farm
          was notified. Open the demo admin to change its status.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/admin" className="rounded-full bg-acre-green px-5 py-3 text-sm font-semibold text-acre-cream">
            View in demo admin
          </Link>
          <Link to="/shop" className="rounded-full border border-acre-green px-5 py-3 text-sm font-semibold">
            Continue shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12">
      <Seo
        title="Sample checkout | Green Acre Poultry Farm"
        description="Submit a demo poultry order. Details stay in this browser. There is no payment, invoice, or live booking."
      />
      <SampleBadge>Demo checkout · no payment</SampleBadge>
      <h1 className="mt-4 font-display text-5xl text-acre-green-dark">Checkout</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6">
        Use this form to store a sample request. Do not enter real card numbers. There is no payment field because
        this site never charges anyone.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-acre-green/10 bg-white p-6" noValidate>
          <label className="grid gap-1 text-sm font-semibold">
            Name
            <input
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              className="rounded-xl border border-acre-green/20 px-3 py-2 font-normal"
            />
            {errors.customerName ? <span className="font-normal text-rose-700">{errors.customerName}</span> : null}
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-xl border border-acre-green/20 px-3 py-2 font-normal"
            />
            {errors.email ? <span className="font-normal text-rose-700">{errors.email}</span> : null}
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            Phone
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-xl border border-acre-green/20 px-3 py-2 font-normal"
            />
            {errors.phone ? <span className="font-normal text-rose-700">{errors.phone}</span> : null}
          </label>
          <fieldset className="grid gap-2">
            <legend className="text-sm font-semibold">Fulfillment</legend>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="fulfillment"
                checked={form.fulfillment === 'pickup'}
                onChange={() => setForm({ ...form, fulfillment: 'pickup' })}
              />
              Farm-gate pickup (sample)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="fulfillment"
                checked={form.fulfillment === 'delivery'}
                onChange={() => setForm({ ...form, fulfillment: 'delivery' })}
              />
              Town-route delivery story
            </label>
          </fieldset>
          <label className="grid gap-1 text-sm font-semibold">
            Address
            <textarea
              rows={3}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="rounded-xl border border-acre-green/20 px-3 py-2 font-normal"
            />
            {errors.address ? <span className="font-normal text-rose-700">{errors.address}</span> : null}
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            Notes
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="rounded-xl border border-acre-green/20 px-3 py-2 font-normal"
            />
          </label>
          {errors.form ? <p className="text-sm text-rose-700">{errors.form}</p> : null}
          <button type="submit" className="rounded-full bg-acre-green px-5 py-3 text-sm font-semibold text-acre-cream">
            Save sample order
          </button>
        </form>
        <aside className="h-fit rounded-2xl bg-white p-6">
          <h2 className="font-display text-2xl text-acre-green-dark">Order preview</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {lines.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span>
                  {product.name} × {quantity}
                  <span className="block text-xs text-acre-ink/60">{unitText(product)}</span>
                </span>
                <span>{sampleMoney(product.samplePrice * quantity)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Sample total {sampleMoney(cartTotal)}</p>
          <button type="button" onClick={() => navigate('/cart')} className="mt-4 text-sm font-semibold text-acre-green">
            Edit cart
          </button>
        </aside>
      </div>
    </main>
  )
}
