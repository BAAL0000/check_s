import { Seo } from '../components/Seo'
import { SampleBadge } from '../components/Badge'
import { images } from '../data/seed'

const services = [
  {
    title: 'Farm-gate sales',
    text: 'Sample walk-up window for eggs, dressed birds, and live stock. Hours are illustrative.',
    image: images.greenhouse,
    alt: 'Rows of plants in a farm greenhouse',
  },
  {
    title: 'Town-route delivery',
    text: 'Sample Tuesday and Friday drops inside a 25 km story radius. No driver is assigned from this site.',
    image: images.deliveryBoxes,
    alt: 'Stacked cardboard boxes on a warehouse floor',
  },
  {
    title: 'Kitchen wholesale',
    text: 'Sample crates and case packs for cafes. Enquiries stay in browser storage.',
    image: images.meatCase,
    alt: 'Prepared chicken portions for kitchen use',
  },
  {
    title: 'Flock restock',
    text: 'Sample chick packs and point-of-lay hens. Live animals are not shipped by this demo.',
    image: images.chicks,
    alt: 'Day-old chicks under warm lighting',
  },
]

export function Services() {
  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12">
      <Seo
        title="Services | Green Acre Poultry Farm"
        description="Sample farm-gate sales, town-route delivery, wholesale packing, and flock restock. These services are demonstration copy only."
      />
      <SampleBadge>Sample service list</SampleBadge>
      <h1 className="mt-4 font-display text-5xl text-acre-green-dark">Services</h1>
      <p className="mt-4 max-w-2xl leading-7">
        Each card describes how a working poultry farm might operate. Checkout does not book a driver, a crate, or a hatch date.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <article key={service.title} className="overflow-hidden rounded-2xl border border-acre-green/10 bg-white">
            <img src={service.image} alt={service.alt} className="h-52 w-full object-cover" />
            <div className="p-6">
              <h2 className="font-display text-2xl text-acre-green-dark">{service.title}</h2>
              <p className="mt-2 text-sm leading-6">{service.text}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
