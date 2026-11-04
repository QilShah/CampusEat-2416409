import MenuItemCard from './MenuItemCard.jsx'
import {useCart} from '../hooks/useCart.jsx'

function MenuList({ items, onAdd, onViewItem }) {
const {addToCart} = useCart()

  if (items.length === 0) {
    return <p className="muted">No items on this menu yet.</p>
  }
  return (
<div className=
"grid">
{items.map((item) => (
<MenuItemCard key={item.id} item={item} onAdd={addToCart} />
))}
</div>
)
}

export default MenuList