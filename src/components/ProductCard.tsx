import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { SampleBadge, StockBadge } from './Badge'
import { sampleMoney, unitText } from '../lib/format'
import { categoryLabels } from '../data/seed'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-acre-green/10 bg-white shadow-sm">
      <Link to={`/shop/${product.slug}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.imageAlt}
          className="h-52 w-full object-cover transition duration-300 hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-acre-green">
            {categoryLabels[product.category]}
          </span>
          <SampleBadge>Sample price</SampleBadge>
        </div>
        <h3 className="font-display text-2xl leading-tight text-acre-green-dark">
          <Link to={`/shop/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="text-sm leading-6 text-acre-ink/80">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <div>
            <p className="text-lg font-semibold text-acre-green-dark">{sampleMoney(product.samplePrice)}</p>
            <p className="text-xs text-acre-ink/70">{unitText(product)}</p>
          </div>
          <StockBadge stock={product.stock} />
        </div>
        <Link
          to={`/shop/${product.slug}`}
          className="mt-1 inline-flex items-center justify-center rounded-full bg-acre-green px-4 py-2 text-sm font-semibold text-acre-cream hover:bg-acre-green-mid"
        >
          View details
        </Link>
      </div>
    </article>
  )
}
