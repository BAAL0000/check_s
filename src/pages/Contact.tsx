import { useState, type FormEvent } from 'react'
import { Seo } from '../components/Seo'
import { SampleBadge } from '../components/Badge'
import { useStore } from '../context/StoreContext'
import { FARM_ADDRESS, FARM_EMAIL, FARM_PHONE_DISPLAY, WHATSAPP_URL } from '../data/seed'

const empty = { name: '', email: '', phone: '', topic: 'general', message: '' }

export function Contact() {
  const { addMessage } = useStore()
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  function validate() {
    const next: Record<string, string> = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (form.phone.trim().length < 7) next.phone = 'Enter a phone number we can show on the sample record.'
    if (form.message.trim().length < 12) next.message = 'Add a short message (12 characters or more).'
    return next
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) return
    addMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      topic: form.topic,
      message: form.message.trim(),
    })
    setDone(true)
    setForm(empty)
  }

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12">
      <Seo
        title="Contact | Green Acre Poultry Farm"
        description="Send a sample enquiry to Green Acre Poultry Farm. Messages stay in this browser. WhatsApp opens a draft to a sample number."
      />
      <SampleBadge>No staffed inbox</SampleBadge>
      <h1 className="mt-4 font-display text-5xl text-acre-green-dark">Contact the farm desk</h1>
      <p className="mt-4 max-w-2xl leading-7">
        Messages are stored locally so the demo admin can display them. They are not emailed. The WhatsApp button
        opens a chat to a sample number that is not monitored.
      </p>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-acre-green/10 bg-white p-6" noValidate>
          <label className="grid gap-1 text-sm font-semibold">
            Name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border border-acre-green/20 px-3 py-2 font-normal"
            />
            {errors.name ? <span className="font-normal text-rose-700">{errors.name}</span> : null}
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
          <label className="grid gap-1 text-sm font-semibold">
            Topic
            <select
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className="rounded-xl border border-acre-green/20 px-3 py-2 font-normal"
            >
              <option value="general">General</option>
              <option value="wholesale">Wholesale</option>
              <option value="delivery">Delivery</option>
              <option value="live-birds">Live birds</option>
            </select>
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            Message
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-xl border border-acre-green/20 px-3 py-2 font-normal"
            />
            {errors.message ? <span className="font-normal text-rose-700">{errors.message}</span> : null}
          </label>
          <button type="submit" className="rounded-full bg-acre-green px-5 py-3 text-sm font-semibold text-acre-cream">
            Save sample message
          </button>
          {done ? (
            <p className="text-sm font-semibold text-acre-green">
              Saved in this browser. Open Demo admin to read it. Nothing was sent.
            </p>
          ) : null}
        </form>
        <aside className="rounded-2xl bg-acre-green p-6 text-acre-cream">
          <h2 className="font-display text-3xl">Farm desk</h2>
          <p className="mt-4 text-sm leading-7 text-acre-cream/85">{FARM_ADDRESS}</p>
          <p className="mt-3 text-sm">Sample phone {FARM_PHONE_DISPLAY}</p>
          <p className="text-sm">{FARM_EMAIL}</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full bg-acre-gold px-5 py-3 text-sm font-semibold text-acre-green-dark"
          >
            WhatsApp sample contact
          </a>
        </aside>
      </div>
    </main>
  )
}
