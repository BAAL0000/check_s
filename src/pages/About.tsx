import { Seo } from '../components/Seo'
import { SampleBadge } from '../components/Badge'
import { images } from '../data/seed'

export function About() {
  return (
    <main id="main">
      <Seo
        title="About | Green Acre Poultry Farm"
        description="Green Acre is a sample poultry farm story covering pasture flocks, egg collection, and farm-gate sales. It is a demo, not a working business."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center">
        <div>
          <SampleBadge>Sample farm story</SampleBadge>
          <h1 className="mt-4 font-display text-5xl text-acre-green-dark">A small acreage, a working flock</h1>
          <p className="mt-4 leading-7 text-acre-ink/80">
            Green Acre Poultry Farm is written as a family holding on Meadow Ridge Road. The copy describes pasture
            days, morning egg collection, and a modest processing room. None of the names, maps, or phone numbers
            belong to a live business.
          </p>
          <p className="mt-4 leading-7 text-acre-ink/80">
            The website exists so a shopper can click through a full poultry catalog: birds, meat, eggs, wholesale
            crates, a cart, and a demo admin. Browser storage holds the sample data.
          </p>
        </div>
        <img
          src={images.farmBarn}
          alt="Red farm barn beside open fields"
          className="h-80 w-full rounded-3xl object-cover"
        />
      </section>
      <section className="bg-white/70 py-14">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {[
            { title: 'Flock care', image: images.pastureFlock, alt: 'Chickens walking a green pasture', text: 'Sample husbandry notes: shade, water, and rotated paddocks.' },
            { title: 'Egg rooms', image: images.eggFlats, alt: 'Egg cartons stacked for packing', text: 'Sample collection: morning gather, grade by eye, pack the same day.' },
            { title: 'Fields around the sheds', image: images.farmFields, alt: 'Crop rows stretching toward the horizon', text: 'Sample landscape used to show farm operations, not a mapped property.' },
          ].map((card) => (
            <article key={card.title} className="overflow-hidden rounded-2xl border border-acre-green/10 bg-white">
              <img src={card.image} alt={card.alt} className="h-44 w-full object-cover" />
              <div className="p-5">
                <h2 className="font-display text-2xl text-acre-green-dark">{card.title}</h2>
                <p className="mt-2 text-sm leading-6">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
