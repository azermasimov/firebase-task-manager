import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
import Spinner from "../components/Spinner";

function Product() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    (async function fetchProduct() {
      const docRef = doc(db, "products", params.productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setProduct(docSnap.data());
        setLoading(false);
      }
    })();
  }, [navigate, params.productId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("Slide Change")}
      >
        {product.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={product.imgUrls[index]} alt="Product Slide" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <button>Copy</button>
      </div>

      {shareLinkCopied && <p>Link Copied!</p>}

      <div>
        <p>
          {product.productName} - $
          {product.offer
            ? product.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : product.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
        <p>
          ${product.offer && product.regularPrice - product.discountedPrice}{" "}
          Discount
        </p>
        <p>{product.category}</p>
        <p>For {product.type}</p>

        {auth.currentUser?.uid !== product.userRef && (
          <Link
            to={`/contact/${product.userRef}?productName=${product.productName}`}
          >
            Book Now
          </Link>
        )}
      </div>
    </main>
  );
}

export default Product;
