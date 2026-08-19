function ProductCard({ product, onAddToCart }) {
  const handleImageError = (event) => {
    event.currentTarget.onerror = null
    event.currentTarget.src =
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23f3f3f3'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-family='Arial' font-size='28'%3EImage unavailable%3C/text%3E%3C/svg%3E"
  }

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          className="product-image"
          src={product.image}
          alt={product.imageAlt}
          onError={handleImageError}
        />
      </div>

      <p className="product-category">{product.category}</p>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>

      <button
        className="add-button"
        type="button"
        onClick={() => onAddToCart(product)}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to cart
      </button>
    </article>
  )
}

export default ProductCard