import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { SampleBadge, StockBadge } from '../components/Badge'
import { QuantityControl } from '../components/QuantityControl'
import { ProductCard } from '../components/ProductCard'
import { useStore } from '../context/StoreContext'
import { categoryLabels } from '../data/seed'
import { sampleMoney, stockLabel, unitText } from '../lib/format'

export function ProductDetails() {
  const { slug } = useParams()
  const { getProduct, products, addToCart } = useStore()
  const product = slug ? getProduct(slug) : undefined
  const [qty, setQty] = useState(1)
  const [notice, setNotice] = useState('')

  if (!product) {
    return (
      <main id="main" className="mx-auto max-w-3xl px-4 py-16 text-center">
        <Seo title="Product not found | Green Acre" description="That sample product is not in the catalog." />
        <h1 className="font-display text-4xl">Product not found</h1>
        <p className="mt-3">This sample listing may have been removed in the demo admin.</p>
        <Link to="/shop" className="mt-6 inline-flex text-acre-green font-semibold">
          Back to shop
        </Link>
      </main>
    )
  }

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3)
  const max = Math.max(1, product.stock)

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12">
      <Seo
        title={`${product.name} | Green Acre Poultry Farm`}
        description={`${product.description} Sample price ${sampleMoney(product.samplePrice)}.`}
      />
      <p className="text-sm">
        <Link to="/shop" className="text-acre-green font-semibold">
          Shop
        </Link>
        <span className="px-2">/</span>
        {categoryLabels[product.category]}
      </p>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.imageAlt}
          className="h-[420px] w-full rounded-3xl object-cover"
        />
        <div>
          <div className="flex flex-wrap gap-2">
            <SampleBadge>Sample price</SampleBadge>
            <StockBadge stock={product.stock} />
          </div>
          <h1 className="mt-4 font-display text-5xl text-acre-green-dark">{product.name}</h1>
          <p className="mt-4 leading-7 text-acre-ink/80">{product.description}</p>
          <p className="mt-6 font-display text-4xl text-acre-green-dark">{sampleMoney(product.samplePrice)}</p>
          <p className="text-sm text-acre-ink/70">{unitText(product)} · {stockLabel(product.stock)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <QuantityControl
              value={Math.min(qty, max)}
              max={product.stock}
              onChange={setQty}
              disabled={product.stock <= 0}
              label={product.name}
            />
            <button
              type="button"
              disabled={product.stock <= 0}
              onClick={() => {
                const result = addToCart(product.id, qty)
                setNotice(result.message)
              }}
              className="rounded-full bg-acre-green px-6 py-3 text-sm font-semibold text-acre-cream disabled:opacity-50"
            >
              Add to sample cart
            </button>
          </div>
          {notice ? <p className="mt-3 text-sm font-semibold text-acre-green">{notice}</p> : null}
          <p className="mt-6 text-sm leading-7 text-acre-ink/80">{product.details}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-acre-cream-dark px-3 py-1 text-xs font-semibold">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="font-display text-3xl text-acre-green-dark">Related sample listings</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}
