import { Link } from "react-router-dom";

function ProductItem({ product, id, onEdit, onDelete }) {
  return (
    <div>
      <li>
        <Link to={`/category/${product.type}/${id}`}>
          <img src={product.imgUrls[0]} alt={product.productName} />
          <div>
            <p>{product.productName}</p>
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
        </Link>

        {onDelete && (
          <button onClick={() => onDelete(product.id, product.productName)}>
            Delete
          </button>
        )}

        {onEdit && (
          <button onClick={() => onEdit(id)}>Edit</button>
        )}
      </li>
    </div>
  );
}

export default ProductItem;
