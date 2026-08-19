import ProductCard from './ProductCard.jsx'
function ProductCatalog({ products, onAddToCart }) { return <section className="catalog" id="shop" aria-labelledby="catalog-title"><div className="catalog-header"><div><p className="eyebrow">Just in</p><h2 id="catalog-title">A few new favourites</h2></div><p>Simple, useful pieces selected to make the everyday feel a little more considered.</p></div><div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />)}</div></section> }
export default ProductCatalog
