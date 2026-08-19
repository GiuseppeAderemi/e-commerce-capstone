function Header({ cartCount, onCartClick }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Marketly home">
        marketly<span className="brand-mark">.</span>
      </a>

      <nav className="primary-nav" aria-label="Primary navigation">
        <a href="#shop">Shop</a>
        <a href="#new">New arrivals</a>
        <a href="#about">Our story</a>
      </nav>

      <button
        className="cart-button"
        type="button"
        onClick={onCartClick}
        aria-label={`Shopping cart, ${cartCount} items`}
      >
        <span aria-hidden="true">Bag</span>
        <span className="cart-label">Cart</span>
        <span className="cart-count" aria-live="polite">
          {cartCount}
        </span>
      </button>
    </header>
  )
}

export default Header