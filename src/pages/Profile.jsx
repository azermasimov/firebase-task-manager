import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProductItem from "../components/ProductItem";

function Profile() {
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchUserProduct() {
      const productRef = collection(db, "products");

      const q = query(
        productRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);

      let products = [];

      querySnap.forEach((doc) => {
        return products.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setProducts(products);
      setLoading(false);
    })();
  }, [auth.currentUser.id]);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Update in firestore
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Could not update profile details");
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async (productId) => {
    if (window.confirm("Are you sure you wanna delete this product?")) {
      await deleteDoc(doc(db, "products", productId));
      const updateProducts = products.filter(
        (product) => product.id !== productId
      );

      setProducts(updateProducts);
      toast.success("Successfully deleted products!");
    }
  };

  const onEdit = (productId) => navigate(`/edit-product/${productId}`);

  return (
    <div>
      <header>
        <h4>{name}</h4>
        <button
          className="float-end btn btn-outline-danger"
          type="button"
          onClick={onLogout}
        >
          Logout
        </button>
      </header>

      <main>
        <div>
          <h6>Personal Details</h6>
          <button
            className="btn btn-outline"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Done" : "Change"}
          </button>
        </div>

        <div>
          <form>
            {/* Add Active input if changeDetails is true */}
            <input
              type="text"
              id="name"
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />

            <input
              type="email"
              id="email"
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to="/create-product">
          <button type="button" className="btn btn-outline">
            Sell Your Product
          </button>
        </Link>

        {!loading && products?.length > 0 && (
          <>
            <p>Your Products</p>
            <ul>
              {products.map((product) => (
                <ProductItem
                  key={product.id}
                  product={product.data}
                  id={product.id}
                  onDelete={() => onDelete(product.id)}
                  onEdit={() => onEdit(product.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;
