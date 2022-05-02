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
import ProductItem from "../components/ProductItem";

function Offers() {
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
          where("offer", "==", true),
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
  }, []);

  return (
    <div>
      <header>
        <p>Offers</p>
      </header>

      {loading ? (
        <Spinner />
      ) : products && products.length > 0 ? (
        <>
          <main>
            <ul>
              {products.map((product) => (
                <ProductItem
                  product={product.data}
                  id={product.id}
                  key={product.id}
                />
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

export default Offers;
