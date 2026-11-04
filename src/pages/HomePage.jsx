import { Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import VendorCard from '../components/VendorCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function HomePage() {
  const { vendors, loading, error, reload } = useVendors()
  const [recent] = useLocalStorage('campuseats-recent', [])

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  return (
    <section>
      {recent && recent.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 className="section-title">Recently Viewed</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {recent.map((item) => (
              <li key={item.id}>
                <Link to={`/vendor/${item.id}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2 className="section-title">Choose a vendor</h2>
      <div className="vendor-grid">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  )
}

export default HomePage