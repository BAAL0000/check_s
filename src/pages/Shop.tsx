import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { ProductCard } from '../components/ProductCard'
import { SampleBadge } from '../components/Badge'
import { useStore } from '../context/StoreContext'
import { categoryLabels } from '../data/seed'
import type { ProductCategory } from '../types'

const categories: Array<{ value: 'all' | ProductCategory; label: string }> = [
  { value: 'all', label: 'All products' },
  { value: 'live-birds', label: categoryLabels['live-birds'] },
  { value: 'fresh-meat', label: categoryLabels['fresh-meat'] },
  { value: 'farm-eggs', label: categoryLabels['farm-eggs'] },
  { value: 'wholesale', label: categoryLabels.wholesale },
  { value: 'chicks', label: categoryLabels.chicks },
]

export function Shop() {
  const { products } = useStore()
  const [params, setParams] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const category = (params.get('category') as ProductCategory | 'all') || 'all'
  const [stock, setStock] = useState<'all' | 'in' | 'low' | 'out'>('all')
  const [sort, setSort] = useState('featured')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = products.filter((product) => {
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.tags.some((tag) => tag.toLowerCase().includes(q))
      const matchesCategory = category === 'all' || product.category === category
      const matchesStock =
        stock === 'all' ||
        (stock === 'in' && product.stock > 8) ||
        (stock === 'low' && product.stock > 0 && product.stock <= 8) ||
        (stock === 'out' && product.stock <= 0)
      return matchesQuery && matchesCategory && matchesStock
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.samplePrice - b.samplePrice)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.samplePrice - a.samplePrice)
    if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'featured') list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured))
    return list
  }, [products, query, category, stock, sort])

  function setCategory(next: string) {
    const copy = new URLSearchParams(params)
    if (next === 'all') copy.delete('category')
    else copy.set('category', next)
    setParams(copy)
  }

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-12">
      <Seo
        title="Shop | Green Acre Poultry Farm"
        description="Browse sample live birds, meat, eggs, chicks, and wholesale packs. Filter by category, stock, and sample price."
      />
      <p className="text-sm font-semibold uppercase tracking-wider text-acre-green">Catalog</p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-5xl text-acre-green-dark">Farm shop</h1>
        <SampleBadge>Sample prices throughout</SampleBadge>
      </div>
      <p className="mt-3 max-w-2xl text-acre-ink/80">
        Search, filter, and open any card. Stock numbers live in this browser and change when you place a sample order.
      </p>

      <form
        className="mt-8 grid gap-3 rounded-2xl border border-acre-green/10 bg-white p-4 md:grid-cols-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="grid gap-1 text-sm font-semibold md:col-span-2">
          Search products
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Eggs, broiler, tray..."
            className="rounded-xl border border-acre-green/20 px-3 py-2 font-normal"
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Stock
          <select
            value={stock}
            onChange={(event) => setStock(event.target.value as typeof stock)}
            className="rounded-xl border border-acre-green/20 px-3 py-2 font-normal"
          >
            <option value="all">Any stock</option>
            <option value="in">In stock</option>
            <option value="low">Low stock</option>
            <option value="out">Out of stock</option>
          </select>
        </label>
        <label className="grid gap-1 text-sm font-semibold">
          Sort
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-xl border border-acre-green/20 px-3 py-2 font-normal"
          >
            <option value="featured">Featured first</option>
            <option value="name">Name</option>
            <option value="price-asc">Sample price low to high</option>
            <option value="price-desc">Sample price high to low</option>
          </select>
        </label>
      </form>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
        {categories.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setCategory(item.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              category === item.value
                ? 'bg-acre-green text-acre-cream'
                : 'bg-white text-acre-green-dark border border-acre-green/15'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-acre-ink/70">{filtered.length} sample listing{filtered.length === 1 ? '' : 's'}</p>
      {filtered.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-white p-8 text-center">No products match those filters.</p>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}
