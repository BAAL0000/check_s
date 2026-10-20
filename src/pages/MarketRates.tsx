import { Seo } from '../components/Seo'
import { SampleBadge } from '../components/Badge'
import { useStore } from '../context/StoreContext'
import { sampleMoney } from '../lib/format'

export function MarketRates() {
  const { rates } = useStore()

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12">
      <Seo
        title="Sample market rates | Green Acre Poultry Farm"
        description="Sample farm-gate rates for live birds, dressed meat, eggs, and wholesale crates. Figures are labeled sample data, not live quotes."
      />
      <SampleBadge>Sample rates · not a live feed</SampleBadge>
      <h1 className="mt-4 font-display text-5xl text-acre-green-dark">Market rates</h1>
      <p className="mt-4 max-w-2xl leading-7 text-acre-ink/80">
        These figures are a snapshot stored in your browser so the admin dashboard can edit them.
        They are not commodity prices, not a tender, and not an offer to sell.
      </p>
      <div className="mt-8 overflow-x-auto rounded-2xl border border-acre-green/10 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-acre-green text-acre-cream">
            <tr>
              <th className="px-4 py-3 font-semibold">Item</th>
              <th className="px-4 py-3 font-semibold">Unit</th>
              <th className="px-4 py-3 font-semibold">Sample rate</th>
              <th className="px-4 py-3 font-semibold">Sample change</th>
              <th className="px-4 py-3 font-semibold">Notes</th>
              <th className="px-4 py-3 font-semibold">Updated</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate) => (
              <tr key={rate.id} className="border-t border-acre-green/10">
                <td className="px-4 py-3 font-semibold">{rate.item}</td>
                <td className="px-4 py-3">{rate.unit}</td>
                <td className="px-4 py-3">{sampleMoney(rate.sampleRate)}</td>
                <td className="px-4 py-3">
                  {rate.change > 0 ? '+' : ''}
                  {rate.change.toFixed(2)} sample
                </td>
                <td className="px-4 py-3 text-acre-ink/75">{rate.notes}</td>
                <td className="px-4 py-3">{rate.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
