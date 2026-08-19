import { useState } from 'react'
import './App.css'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ProductCatalog from './components/ProductCatalog.jsx'
import { products } from './data/products.js'

function App() {
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleAddToCart = (product) => {
    setCartItems((items) => [...items, product])
  }

  return (
    <>
      <Header
        cartCount={cartItems.length}
        onCartClick={() => setIsCartOpen((open) => !open)}
      />

      <main>
        <Hero />
        <ProductCatalog
          products={products}
          onAddToCart={handleAddToCart}
        />
      </main>

      {isCartOpen && (
        <aside className="cart-panel" aria-label="Shopping cart">
          <div className="cart-panel-header">
            <h2>Your Cart</h2>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              aria-label="Close shopping cart"
            >
              ×
            </button>
          </div>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div className="cart-item" key={`${item.id}-${index}`}>
                  <img src={item.image} alt="" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <button
                    className="remove-button"
                    type="button"
                    onClick={() =>
                      setCartItems((items) =>
                        items.filter((_, itemIndex) => itemIndex !== index)
                  )
                  }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </aside>
      )}
    </>
  )
}

export default App