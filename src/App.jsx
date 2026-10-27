import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import Footer from './components/Footer.jsx'
import CartPage from './components/CartPage.jsx'
import RecentlyViewed from './components/RecentlyViewed.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([]) // Array of { item, qty }
  const [view, setView] = useState('menu') // 'menu' | 'cart' | 'done'
  const [lastOrder, setLastOrder] = useState(null)

  // Feature Digit 9: Recently Viewed items
  const [recentlyViewed, setRecentlyViewed] = useState([])

  // B2: Fetch with AbortController and reloadKey dependency
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        if (data.length > 0) {
          setSelectedVendorId((prev) => prev || data[0].id)
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [reloadKey])

  // Feature Digit 9: No duplicates, newest first, max 5
  function handleViewItem(item) {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id)
      return [item, ...filtered].slice(0, 5)
    })
  }

  function handleClearRecentlyViewed() {
    setRecentlyViewed([])
  }

  // B3: Cart operations
  function handleAddToCart(item) {
    handleViewItem(item) // Adding to cart also registers as viewed
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id)
      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prevCart, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
        )
        .filter((line) => line.qty > 0) // Remove if qty reaches 0
    )
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + line.item.price * line.qty, 0)
    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  // Derived state: Total items count
  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0)
  const selectedVendor = vendors.find((v) => v.id === selectedVendorId)

  // Render view router
  let content
  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card" style={{ maxWidth: '480px', margin: '2rem auto' }}>
        <h2>Order placed!</h2>
        <p>Thank you, <strong>{lastOrder?.name}</strong>.</p>
        <p>Deliver to: <strong>Mahallah {lastOrder?.mahallah}</strong></p>
        <p>Pickup time: <strong>{lastOrder?.pickupTime}</strong></p>
        <p>Total Paid: <strong>RM {lastOrder?.total.toFixed(2)}</strong></p>
        <button className="btn" onClick={() => setView('menu')} style={{ marginTop: '1rem' }}>
          Back to vendors
        </button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage
        message={error}
        onRetry={() => setReloadKey((k) => k + 1)}
      />
    )
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        {selectedVendor && (
          <section>
            <h2 className="section-title">Menu: {selectedVendor.name}</h2>
            <MenuList
              items={selectedVendor.menu}
              onAdd={handleAddToCart}
              onViewItem={handleViewItem}
            />
          </section>
        )}

        {/* Feature Digit 9: Rendered using index.css .grid and .card */}
        <RecentlyViewed
          items={recentlyViewed}
          onAdd={handleAddToCart}
          onClear={handleClearRecentlyViewed}
        />
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App