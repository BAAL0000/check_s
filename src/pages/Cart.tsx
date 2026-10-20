import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { QuantityControl } from '../components/QuantityControl'
import { SampleBadge } from '../components/Badge'
import { useStore } from '../context/StoreContext'
import { sampleMoney, unitText } from '../lib/format'

export function Cart() {
  const { cart, getProduct, setCartQty, removeFromCart, clearCart, cartTotal } = useStore()
  const lines = cart
    .map((item) => {
      const product = getProduct(item.productId)
      return product ? { ...item, product } : null
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line))

  return (
    <main id="main" className="mx-auto max-w-5xl px-4 py-12">
      <Seo
        title="Sample cart | Green Acre Poultry Farm"
        description="Review sample poultry items, adjust quantities, and continue to a demo checkout that does not take payment."
      />
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-5xl text-acre-green-dark">Cart</h1>
        <SampleBadge>No payment collected</SampleBadge>
      </div>
      {lines.length === 0 ? (
        <p className="mt-8 rounded-2xl bg-white p-8">
          The sample cart is empty.{' '}
          <Link to="/shop" className="font-semibold text-acre-green">
            Browse the shop
          </Link>
        </p>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
          <ul className="grid gap-4">
            {lines.map(({ product, quantity }) => (
              <li key={product.id} className="flex flex-col gap-4 rounded-2xl border border-acre-green/10 bg-white p-4 sm:flex-row">
                <img src={product.image} alt={product.imageAlt} className="h-28 w-full rounded-xl object-cover sm:w-36" />
                <div className="flex flex-1 flex-col gap-2">
                  <Link to={`/shop/${product.slug}`} className="font-display text-2xl text-acre-green-dark">
                    {product.name}
                  </Link>
                  <p className="text-sm">{sampleMoney(product.samplePrice)} · {unitText(product)}</p>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                    <QuantityControl
                      value={quantity}
                      min={1}
                      max={product.stock}
                      onChange={(next) => setCartQty(product.id, next)}
                      label={product.name}
                    />
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="text-sm font-semibold text-rose-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="font-semibold">{sampleMoney(product.samplePrice * quantity)}</p>
              </li>
            ))}
          </ul>
          <aside className="h-fit rounded-2xl bg-acre-green p-5 text-acre-cream">
            <p className="text-sm uppercase tracking-wider text-acre-gold">Sample total</p>
            <p className="mt-2 font-display text-4xl">{sampleMoney(cartTotal)}</p>
            <p className="mt-2 text-xs text-acre-cream/75">This figure is not billed. Checkout writes a local order only.</p>
            <Link
              to="/checkout"
              className="mt-5 inline-flex w-full justify-center rounded-full bg-acre-gold px-4 py-3 text-sm font-semibold text-acre-green-dark"
            >
              Continue to sample checkout
            </Link>
            <button type="button" onClick={clearCart} className="mt-3 w-full text-sm underline">
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}
