import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    count: 0,
    discountedPrice: 0,
    images: {},
    offer: true,
    productName: "",
    regularPrice: 0,
    shopName: "",
    status: "",
    type: "",
  });

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  if (loading) {
    return <Spinner />;
  }

  return <div>CreateProduct</div>;
}

export default CreateProduct;
