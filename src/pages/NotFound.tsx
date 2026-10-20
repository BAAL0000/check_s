import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-20 text-center">
      <Seo title="Page not found | Green Acre" description="That page is not part of the Green Acre sample storefront." />
      <h1 className="font-display text-5xl text-acre-green-dark">Page not found</h1>
      <p className="mt-4">That path is not in the sample farm shop.</p>
      <Link to="/" className="mt-6 inline-flex font-semibold text-acre-green">
        Return home
      </Link>
    </main>
  )
}
