function RecentlyViewed({ items, onAdd, onClear }) {
  if (!items || items.length === 0) return null

  return (
    <section>
      <div className="row">
        <h2 className="section-title">Recently Viewed</h2>
        <button type="button" className="link danger" onClick={onClear}>
          Clear history
        </button>
      </div>

      <div className="grid">
        {items.map((item) => (
          <div key={item.id} className="card">
            <h3>{item.name}</h3>
            {item.category && <p className="muted">{item.category}</p>}
            <p className="price">RM {item.price.toFixed(2)}</p>
            <button
              type="button"
              className="btn btn-small"
              onClick={() => onAdd(item)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentlyViewed