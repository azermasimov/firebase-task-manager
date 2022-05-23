import { Link } from "react-router-dom";

function ProductItem({ product, id, onEdit, onDelete }) {
  return (
    <div className="container" style={{ maxWidth: "540px" }}>
      <li className="col">
        <Link to={`/category/${product.type}/${id}`}>
          <div className="row">
            <img
              className="img-fluid rounded-start"
              src={product.imgUrls[0]}
              alt={product.productName}
            />
          </div>
          <div className="row">
            <div>
              <h5>{product.productName}</h5>
              <p>{product.shopName}</p>
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
          </div>
        </Link>
        <div className="row">
          {onDelete && (
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => onDelete(product.id, product.productName)}
            >
              Delete
            </button>
          )}

          {onEdit && (
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => onEdit(id)}
            >
              Edit
            </button>
          )}
        </div>
      </li>
    </div>
  );
}

export default ProductItem;
