import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { v4 as uuidv4 } from "uuid";

function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    count: 0,
    discountedPrice: 0,
    images: {},
    offer: false,
    productName: "",
    regularPrice: 0,
    type: "",
  });

  const {
    category,
    count,
    discountedPrice,
    images,
    offer,
    productName,
    regularPrice,
    type,
  } = formData;

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

    const docRef = await addDoc(collection(db, "products"), formDataCopy);
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
    <div>
      <header>
        <p>Create Product</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <label></label>
          <div>
            <button
              type="button"
              id="type"
              value="male"
              style={type === "male" ? { background: "yellow" } : null}
              onClick={onMutate}
            >
              For Man
            </button>
            <button
              type="button"
              id="type"
              value="female"
              style={type === "female" ? { background: "yellow" } : null}
              onClick={onMutate}
            >
              For Woman
            </button>
          </div>

          <label>Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={onMutate}
            maxLength="32"
            minLength="1"
            required
          />

          <label>Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={onMutate}
            maxLength="32"
            minLength="1"
            required
          />

          <label>Count</label>
          <input
            type="number"
            id="count"
            value={count}
            onChange={onMutate}
            required
          />

          <label>Offer</label>
          <div>
            <button
              type="button"
              id="offer"
              value={true}
              style={offer === true ? { background: "yellow" } : null}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              type="button"
              id="offer"
              value={false}
              style={offer === false ? { background: "yellow" } : null}
              onClick={onMutate}
            >
              No
            </button>
          </div>

          <label>Price</label>
          <input
            type="number"
            id="regularPrice"
            value={regularPrice}
            onChange={onMutate}
            min="0"
            max="999999"
            required={offer}
          />
          {offer && (
            <>
              <label>Discounted Price</label>
              <input
                type="number"
                id="discountedPrice"
                value={discountedPrice}
                onChange={onMutate}
                min="0"
                max="999999"
                required={offer}
              />
            </>
          )}

          <label>Images</label>
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
          <button type="submit">Create Product</button>
        </form>
      </main>
    </div>
  );
}

export default CreateProduct;
