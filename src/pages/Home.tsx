import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BadgeCheck,
  Clock3,
  Leaf,
  MapPin,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { Seo } from '../components/Seo'
import { ProductCard } from '../components/ProductCard'
import { SampleBadge } from '../components/Badge'
import { useStore } from '../context/StoreContext'
import { faqs, images, seedReviews } from '../data/seed'

const categories = [
  { to: '/shop?category=live-birds', title: 'Live birds', image: images.liveBirds, alt: 'Pasture chickens on grass' },
  { to: '/shop?category=fresh-meat', title: 'Fresh meat', image: images.wholeChicken, alt: 'Whole dressed chicken' },
  { to: '/shop?category=farm-eggs', title: 'Farm eggs', image: images.mixedEggs, alt: 'Farm eggs in a bowl' },
  { to: '/shop?category=wholesale', title: 'Wholesale', image: images.wholesaleFlock, alt: 'Large poultry flock' },
  { to: '/shop?category=chicks', title: 'Chicks', image: images.chicks, alt: 'Day-old chicks' },
]

const benefits = [
  { icon: Leaf, title: 'Pasture days', text: 'Sample copy: birds spend daylight hours on grass when weather allows.' },
  { icon: ShieldCheck, title: 'Traceable lots', text: 'Sample copy: each shop item is tagged to a demo flock or collection day.' },
  { icon: BadgeCheck, title: 'Clear sample prices', text: 'Every figure is labeled sample. Nothing is billed from this website.' },
  { icon: Truck, title: 'Local drop-off story', text: 'Sample delivery radius is shown for a town route. No driver is dispatched.' },
]

const steps = [
  { n: '01', title: 'Browse the sample shop', text: 'Filter live birds, meat, eggs, or wholesale packs.' },
  { n: '02', title: 'Add units to the cart', text: 'Quantity controls respect the sample stock on each card.' },
  { n: '03', title: 'Submit a demo order', text: 'Checkout saves the request in this browser only.' },
  { n: '04', title: 'Review it in demo admin', text: 'Open the dashboard to see inventory and sample reports.' },
]

export function Home() {
  const { products } = useStore()
  const featured = products.filter((p) => p.featured).slice(0, 6)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <main id="main">
      <Seo
        title="Green Acre Poultry Farm | Sample farm shop"
        description="Sample poultry storefront for live birds, meat, eggs, wholesale, and local delivery stories. Prices and reviews are labeled sample data."
      />

      <section className="relative overflow-hidden bg-acre-green-dark text-acre-cream">
        <img
          src={images.heroFarm}
          alt="Rolling pasture and farm buildings at sunrise"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-acre-green-dark via-acre-green-dark/80 to-transparent" />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <SampleBadge>Demo farm storefront</SampleBadge>
            <h1 className="mt-5 font-display text-5xl leading-tight md:text-6xl">
              Farm-gate poultry, packed with honest sample prices.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-acre-cream/85">
              Green Acre is a practice shop for live birds, dressed meat, morning eggs, and wholesale crates.
              Navigation works. The cart works. Payments, accounts, and live bookings do not.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="rounded-full bg-acre-gold px-6 py-3 text-sm font-semibold text-acre-green-dark"
              >
                Shop the sample catalog
              </Link>
              <Link
                to="/wholesale"
                className="rounded-full border border-acre-cream/40 px-6 py-3 text-sm font-semibold"
              >
                Wholesale packs
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
            <p className="text-sm uppercase tracking-[0.2em] text-acre-gold">Today on the farm</p>
            <ul className="mt-4 grid gap-4 text-sm">
              <li className="flex gap-3">
                <Clock3 className="shrink-0 text-acre-gold" size={18} />
                Sample gate hours 7:00 to 16:00
              </li>
              <li className="flex gap-3">
                <MapPin className="shrink-0 text-acre-gold" size={18} />
                1842 Meadow Ridge Road — sample address
              </li>
              <li className="flex gap-3">
                <Truck className="shrink-0 text-acre-gold" size={18} />
                Town-route delivery listed as sample windows only
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-acre-green">Categories</p>
            <h2 className="font-display text-4xl text-acre-green-dark">What the farm lists</h2>
          </div>
          <Link to="/shop" className="hidden text-sm font-semibold text-acre-green md:inline">
            Open full shop
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.to}
              className="group overflow-hidden rounded-2xl border border-acre-green/10 bg-white"
            >
              <img src={cat.image} alt={cat.alt} className="h-36 w-full object-cover group-hover:scale-105 transition" />
              <p className="px-4 py-3 font-display text-xl text-acre-green-dark">{cat.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white/60 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-sm font-semibold uppercase tracking-wider text-acre-green">Featured</p>
          <h2 className="font-display text-4xl text-acre-green-dark">Sample products from the yard</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-4xl text-acre-green-dark">Why buyers use this sample shop</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item) => (
            <article key={item.title} className="rounded-2xl border border-acre-green/10 bg-white p-6">
              <item.icon className="text-acre-gold" />
              <h3 className="mt-4 font-display text-2xl text-acre-green-dark">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-acre-ink/80">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-acre-green text-acre-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-acre-gold">How ordering works</p>
            <h2 className="mt-2 font-display text-4xl">Four steps, all on this device</h2>
            <ol className="mt-8 grid gap-5">
              {steps.map((step) => (
                <li key={step.n} className="flex gap-4">
                  <span className="font-display text-3xl text-acre-gold">{step.n}</span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-sm text-acre-cream/80">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <img
            src={images.farmWork}
            alt="Farmer walking a green field near farm buildings"
            className="h-80 w-full rounded-3xl object-cover"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center">
        <img
          src={images.deliveryTruck}
          alt="Delivery truck parked beside a warehouse dock"
          className="h-80 w-full rounded-3xl object-cover"
        />
        <div>
          <SampleBadge>Sample delivery story</SampleBadge>
          <h2 className="mt-4 font-display text-4xl text-acre-green-dark">Town-route drop-off</h2>
          <p className="mt-4 leading-7 text-acre-ink/80">
            The sample schedule lists Tuesday and Friday afternoon drops inside a 25 km story radius.
            No courier is booked from checkout. Meat packs are described as traveling in cool boxes.
            Live birds remain a farm-gate pickup in this demo.
          </p>
          <Link to="/services" className="mt-6 inline-flex font-semibold text-acre-green">
            Read sample services
          </Link>
        </div>
      </section>

      <section className="bg-white/70 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-4xl text-acre-green-dark">Sample reviews</h2>
          <p className="mt-2 text-sm text-acre-ink/70">These quotes are labeled sample testimonials, not verified purchases.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {seedReviews.map((review) => (
              <blockquote key={review.id} className="rounded-2xl border border-acre-green/10 bg-white p-6">
                <SampleBadge>Sample review</SampleBadge>
                <p className="mt-4 text-sm leading-7">“{review.quote}”</p>
                <footer className="mt-4 text-sm font-semibold text-acre-green-dark">
                  {review.name}
                  <span className="block font-normal text-acre-ink/70">{review.role}</span>
                </footer>
                <p className="mt-2 text-xs uppercase tracking-wider text-acre-gold">
                  Sample rating {review.rating} / 5
                </p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="font-display text-4xl text-acre-green-dark">FAQs</h2>
        <div className="mt-6 divide-y divide-acre-green/15 rounded-2xl border border-acre-green/10 bg-white">
          {faqs.map((item, index) => (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between px-5 py-4 text-left font-semibold"
                aria-expanded={openFaq === index}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {item.q}
                <span aria-hidden>{openFaq === index ? '-' : '+'}</span>
              </button>
              {openFaq === index ? (
                <p className="px-5 pb-4 text-sm leading-6 text-acre-ink/80">{item.a}</p>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
