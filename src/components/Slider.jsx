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

  if (product.length === 0) {
    return <></>;
  }

  return (
    <div>
      {product && (
        <div>
          <p>Recommended</p>

          <Swiper
            className="card bg-dark text-white"
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
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
                <img
                  className="card-img"
                  src={data.imgUrls[0]}
                  alt="Explore Slide"
                />
                <div className="card-img-overlay">
                  <h3 className="card-title">{data.productName}</h3>
                  <h5 className="card-text">
                    ${data.discountePrice ?? data.regularPrice}
                  </h5>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default Slider;
