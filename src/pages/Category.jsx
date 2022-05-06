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

function Category() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedProducts, setLastFetchedProducts] = useState(null);

  const params = useParams();

  useEffect(() => {
    (async function fetchProducts() {
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

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];

        setLastFetchedProducts(lastVisible);

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
    })();
  }, [params.categoryName]);

  // Pagination / Load More
  const onFetchMoreProducts = async () => {
    try {
      // Get reference
      const productsRef = collection(db, "products");

      // Create a query
      const q = query(
        productsRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedProducts),
        limit(10)
      );

      // Execute query
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];

      setLastFetchedProducts(lastVisible);

      const products = [];

      querySnap.forEach((doc) => {
        return products.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setProducts((prevState) => [...prevState, ...products]);
      setLoading(false);
    } catch (err) {
      toast.error("Couldn't fetch products");
    }
  };

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
                <ProductItem
                  product={product.data}
                  id={product.id}
                  key={product.id}
                />
              ))}
            </ul>
          </main>

          <br />
          <br />

          {lastFetchedProducts && (
            <p onClick={onFetchMoreProducts}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>No Products for {params.categoryName}</p>
      )}
    </div>
  );
}

export default Category;
