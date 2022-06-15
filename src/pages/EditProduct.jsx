import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { v4 as uuidv4 } from "uuid";
import editPageSVG from "../assets/svg/edit-page.svg";

function EditProduct() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    discountedPrice: 0,
    images: {},
    offer: false,
    productName: "",
    regularPrice: 0,
    type: "",
  });

  const {
    category,
    discountedPrice,
    images,
    offer,
    productName,
    regularPrice,
    type,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();
  const isMounted = useRef(true);

  // Redirect if product is not user's
  useEffect(() => {
    if (product && product.userRef !== auth.currentUser.uid) {
      toast.error("You can not edit that product");
      navigate("/");
    }
  }, []);

  // Fetch product to edit
  useEffect(() => {
    setLoading(true);
    (async function fetchProduct() {
      const docRef = doc(db, "products", params.productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Product does not exist!");
      }
    })();
  }, [params.productId, navigate]);

  // Sets userRef to logged in user
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

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted Price needs to be less than regular price");
      return;
    }

    if (images.length > 6) {
      setLoading(false);
      toast.error("Should be Max 6 images");
      return;
    }

    // Store image in firebase
    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, "images/" + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error("Immages not uploaded!");
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;

    // Update Product
    const docRef = doc(db, "products", params.productId);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Product saved!");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }

    if (e.target.value === "false") {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="create-product-container">
      <div className="left-screen">
        <img src={editPageSVG} alt="Edit Product Photo" />
      </div>

      <div className="right-screen">
        <h5>Edit Product</h5>

        <div className="btns-container">
          <button
            className="btn"
            type="button"
            id="type"
            value="tayota"
            style={
              type === "tayota" ? { color: "white", background: "black" } : null
            }
            onClick={onMutate}
          >
            Tayota
          </button>
          <button
            className="btn"
            type="button"
            id="type"
            value="volvo"
            style={
              type === "volvo" ? { color: "white", background: "black" } : null
            }
            onClick={onMutate}
          >
            Volvo
          </button>
          <button
            className="btn"
            type="button"
            id="type"
            value="mercedes"
            style={
              type === "mercedes" ? { color: "white", background: "black" } : null
            }
            onClick={onMutate}
          >
            Mercedes
          </button>
        </div>

        <div className="form-container">
          <form onSubmit={onSubmit}>
            <div className="box-1">
              <input
                type="text"
                id="productName"
                value={productName}
                onChange={onMutate}
                placeholder=" Product's Name"
                maxLength="32"
                minLength="1"
                required
              />

              <input
                type="text"
                id="category"
                value={category}
                onChange={onMutate}
                placeholder=" Category"
                maxLength="32"
                minLength="1"
                required
              />
            </div>

            <div className="box-2 btns-container">
              <p>Offer: </p>

              <button
                className="btn"
                type="button"
                id="offer"
                value={true}
                style={
                  offer === true
                    ? { color: "white", background: "black" }
                    : null
                }
                onClick={onMutate}
              >
                Yes
              </button>
              <button
                className="btn"
                type="button"
                id="offer"
                value={false}
                style={
                  offer === false
                    ? { color: "white", background: "black" }
                    : null
                }
                onClick={onMutate}
              >
                No
              </button>
            </div>

            <div className="box-3">
              <div>
                <label htmlFor="regularPrice">Price per hour: </label>
                <input
                  type="number"
                  id="regularPrice"
                  value={regularPrice}
                  onChange={onMutate}
                  min="0"
                  max="999999"
                  required={offer}
                />
              </div>
              {offer && (
                <div>
                  <label htmlFor="discountedPrice">Discounted Price (more than days):</label>
                  <input
                    type="number"
                    id="discountedPrice"
                    value={discountedPrice}
                    onChange={onMutate}
                    min="0"
                    max="999999"
                    required={offer}
                  />
                </div>
              )}
            </div>

            <div className="box-4">
              <div className="file-input-container">
                <label htmlFor="images">Images: </label>
                <p>The first image will be the cover (max 6).</p>
                <input
                  type="file"
                  id="images"
                  onChange={onMutate}
                  max="6"
                  accept=".jpg,.png,.jpeg"
                  multiple
                  required
                />
              </div>

              <button type="submit" className="create-button">
                Edit Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
