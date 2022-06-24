import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import Spinner from "./Spinner";

function Slider() {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async function fetchProduct() {
      const productRef = collection(db, "products");
      const q = query(productRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);

      let products = [];

      querySnap.forEach((doc) => {
        return products.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setProduct(products);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="slider-container">
      {product && (
        <>
          <p>Recommended</p>

          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("Slide Changed!")}
          >
            {product.map(({ data, id }) => (
              <SwiperSlide
                key={id}
                onClick={() => navigate(`/category/${data.type}/${id}`)}
              >
                <img src={data.imgUrls[0]} alt="Explore Slide" />
                <p className="title">{data.productName}</p>
                <p className="price">${data.discountePrice ?? data.regularPrice}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}

export default Slider;
