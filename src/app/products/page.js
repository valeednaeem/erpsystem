export default function ProductsPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-4">Our Products</h1>
      <p className="lead">Browse our featured products below. E-commerce features coming soon!</p>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <img src="/placeholder-product.png" className="card-img-top" alt="Product 1" />
            <div className="card-body">
              <h5 className="card-title">Product 1</h5>
              <p className="card-text">Description of product 1.</p>
              <button className="btn btn-success" disabled>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <img src="/placeholder-product.png" className="card-img-top" alt="Product 2" />
            <div className="card-body">
              <h5 className="card-title">Product 2</h5>
              <p className="card-text">Description of product 2.</p>
              <button className="btn btn-success" disabled>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <img src="/placeholder-product.png" className="card-img-top" alt="Product 3" />
            <div className="card-body">
              <h5 className="card-title">Product 3</h5>
              <p className="card-text">Description of product 3.</p>
              <button className="btn btn-success" disabled>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
