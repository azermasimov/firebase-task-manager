import { Link } from "react-router-dom";

function ProductItem({ product, id, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card-info">
        <img src={product.imgUrls[0]} alt={product.productName} />

        <div>
          <h6>{product.productName}</h6>
          <p>{product.category}</p>
        </div>
        <p>
          $
          {product.offer
            ? product.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : product.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      </div>
      <div className="card-links">
        <Link to={`/category/${product.type}/${id}`}>
          <p>See Product</p>
        </Link>
        <div>
          {onDelete && (
            <button onClick={() => onDelete(product.id, product.productName)}>
              <i className="bi bi-trash-fill"></i>
            </button>
          )}

          {onEdit && (
            <button onClick={() => onEdit(id)}>
              <i className="bi bi-pen-fill"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
