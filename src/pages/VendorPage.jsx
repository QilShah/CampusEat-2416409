import { useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import MenuList from '../components/MenuList.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

function VendorPage() {
  const { id } = useParams()
  const { vendors, loading, error, reload } = useVendors()
  const [recent, setRecent] = useLocalStorage('campuseats-recent', [])
  const vendor = vendors.find((v) => v.id === id)

  useEffect(() => {
    if (!vendor) return

    setRecent((prev) => {
      const list = Array.isArray(prev) ? prev : []
      const filtered = list.filter((item) => item.id !== vendor.id)
      return [{ id: vendor.id, name: vendor.name }, ...filtered].slice(0, 5)
    })
  }, [vendor, setRecent])

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  if (!vendor) {
    return (
      <section>
        <h2 className="section-title">Vendor not found</h2>
        <p className="muted">
          There is no vendor called “{id}”. <Link to="/">Back to vendors</Link>
        </p>
      </section>
    )
  }

  return (
    <section>
      <p>
        <Link to="/">← All vendors</Link>
      </p>
      <h2 className="section-title">{vendor.name}</h2>
      <p className="muted">
        {vendor.location} · {vendor.openHours}
      </p>
      <MenuList items={vendor.menu} />
    </section>
  )
}

export default VendorPage