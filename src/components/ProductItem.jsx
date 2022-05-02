import { Link } from "react-router-dom";

function ProductItem({ product, id }) {
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
      </li>
    </div>
  );
}

export default ProductItem;
