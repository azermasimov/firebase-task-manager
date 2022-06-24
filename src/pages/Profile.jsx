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
import avatar from "../assets/svg/undraw_male_avatar_323b.svg";

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
    <div className="profile-page">
      <div className="side">
        <img src={avatar} alt="User's Photo" />

        <h4>{name}</h4>

        <div
          className="edit-profile"
          onClick={() => {
            changeDetails && onSubmit();
            setChangeDetails((prevState) => !prevState);
          }}
        >
          <i className="bi bi-gear-fill"></i>{" "}
          {changeDetails ? "Done" : "Edit Profile"}
        </div>

        <div>
          <form>
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

        <div className="make-product-btn">
          <Link to="/create-product" style={{ textDecoration: "none" }}>
            <p>
              <i className="bi bi-shop"></i> Make a Product to Sell
            </p>
          </Link>
        </div>

        <div className="logout-btn" onClick={onLogout}>
          <i className="bi bi-box-arrow-left"></i> Logout
        </div>
      </div>

      <div className="cards-section">
        <h5>Your Products</h5>

        {!loading && products?.length > 0 && (
          <div className="cards">
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product.data}
                id={product.id}
                onDelete={() => onDelete(product.id)}
                onEdit={() => onEdit(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
