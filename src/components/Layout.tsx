import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, Phone, ShoppingBasket, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { FARM_PHONE_DISPLAY, WHATSAPP_URL } from '../data/seed'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/market-rates', label: 'Market rates' },
  { to: '/wholesale', label: 'Wholesale' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

function linkClass({ isActive }: { isActive: boolean }) {
  return `rounded-full px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-acre-gold text-acre-green-dark'
      : 'text-acre-cream hover:bg-white/10'
  }`
}

export function Layout() {
  const { cartCount } = useStore()
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-svh bg-acre-cream text-acre-ink">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-acre-green/20 bg-acre-green text-acre-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-acre-gold font-display text-xl font-bold text-acre-green-dark">
              G
            </span>
            <span>
              <span className="block font-display text-xl leading-none">Green Acre</span>
              <span className="text-xs uppercase tracking-[0.2em] text-acre-cream/80">
                Poultry Farm
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/admin" className={linkClass}>
              Demo admin
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full border border-acre-cream/30 px-3 py-2 text-sm font-semibold md:inline-flex"
            >
              <Phone size={16} />
              WhatsApp sample
            </a>
            <Link
              to="/cart"
              className="relative inline-flex items-center gap-2 rounded-full bg-acre-gold px-3 py-2 text-sm font-semibold text-acre-green-dark"
            >
              <ShoppingBasket size={18} />
              <span className="hidden sm:inline">Cart</span>
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-acre-green px-1 text-xs text-acre-cream">
                {cartCount}
              </span>
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-acre-cream/30 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
        {open ? (
          <nav id="mobile-nav" className="grid gap-1 px-4 pb-4 lg:hidden" aria-label="Mobile">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                end={item.to === '/'}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/admin" className={linkClass} onClick={() => setOpen(false)}>
              Demo admin
            </NavLink>
          </nav>
        ) : null}
      </header>

      <Outlet />

      <footer className="mt-16 border-t border-acre-green/15 bg-acre-green text-acre-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
          <div>
            <p className="font-display text-3xl">Green Acre Poultry Farm</p>
            <p className="mt-3 text-sm leading-6 text-acre-cream/80">
              A sample farm storefront for live birds, fresh meat, eggs, and wholesale packs.
              Prices, rates, and reviews are labeled sample data.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-acre-gold">Visit</p>
            <p className="mt-3 text-sm leading-6 text-acre-cream/85">
              1842 Meadow Ridge Road
              <br />
              Sample town only
              <br />
              Gate hours listed as 7:00–16:00
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-acre-gold">Contact</p>
            <p className="mt-3 text-sm leading-6">
              Sample phone {FARM_PHONE_DISPLAY}
              <br />
              hello@greenacre.example
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex rounded-full bg-acre-gold px-4 py-2 text-sm font-semibold text-acre-green-dark"
            >
              Open WhatsApp sample
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-acre-gold">Explore</p>
            <ul className="mt-3 grid gap-2 text-sm">
              <li><Link to="/shop">Shop catalog</Link></li>
              <li><Link to="/market-rates">Sample market rates</Link></li>
              <li><Link to="/wholesale">Wholesale enquiries</Link></li>
              <li><Link to="/admin">Demo admin dashboard</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-acre-cream/70">
          Demo storefront. No real payments, accounts, or live farm bookings. Sample phone numbers do not reach a working desk.
        </div>
      </footer>
    </div>
  )
}
