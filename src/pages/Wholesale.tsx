import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { ProductCard } from '../components/ProductCard'
import { SampleBadge } from '../components/Badge'
import { useStore } from '../context/StoreContext'
import { images, WHATSAPP_URL } from '../data/seed'

export function Wholesale() {
  const { products } = useStore()
  const bulk = products.filter((p) => p.category === 'wholesale')

  return (
    <main id="main">
      <Seo
        title="Wholesale | Green Acre Poultry Farm"
        description="Sample wholesale crates for restaurants, bakeries, and market stalls. Enquiry form is local-only and does not create a contract."
      />
      <section className="relative overflow-hidden bg-acre-green text-acre-cream">
        <img
          src={images.wholesaleFlock}
          alt="Dense flock of chickens in a farm yard"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <SampleBadge>Sample wholesale desk</SampleBadge>
          <h1 className="mt-4 max-w-3xl font-display text-5xl">Crates, flats, and kitchen packs</h1>
          <p className="mt-4 max-w-2xl leading-7 text-acre-cream/85">
            Restaurant and stall buyers can browse sample bulk units, then send a WhatsApp note or the contact form.
            No trade account is opened and no invoice is issued.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Suggested minimum', text: 'One crate or one case in this demo. Volume discounts are illustrative.' },
            { title: 'Pickup first', text: 'Live crates stay at the farm gate in the sample workflow.' },
            { title: 'Talk on WhatsApp', text: 'The sample number opens a chat draft. It is not a staffed line.' },
          ].map((card) => (
            <article key={card.title} className="rounded-2xl border border-acre-green/10 bg-white p-6">
              <h2 className="font-display text-2xl text-acre-green-dark">{card.title}</h2>
              <p className="mt-2 text-sm leading-6">{card.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {bulk.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/contact" className="rounded-full bg-acre-green px-6 py-3 text-sm font-semibold text-acre-cream">
            Send a sample enquiry
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-acre-green px-6 py-3 text-sm font-semibold text-acre-green"
          >
            WhatsApp sample desk
          </a>
        </div>
      </section>
    </main>
  )
}
