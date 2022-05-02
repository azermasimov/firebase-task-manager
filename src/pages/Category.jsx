import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

function Category() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Get reference
        const productsRef = collection(db, "products");

        // Create a query
        const q = query(
          productsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        // Execute query
        const querySnap = await getDocs(q);

        const products = [];

        querySnap.forEach((doc) => {
          return products.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setProducts(products);
        setLoading(false);
      } catch (err) {
        toast.error("Couldn't fetch products");
      }
    };

    fetchProducts();
  }, [params.categoryName]);

  return (
    <div>
      <header>
        <p>
          {params.categoryName === "male"
            ? "Products for male"
            : "Products for female"}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : products && products.length > 0 ? (
        <>
          <main>
            <ul>
              {products.map((product) => (
                <h3 key={product.id}>{product.data.productName}</h3>
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No Products for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
