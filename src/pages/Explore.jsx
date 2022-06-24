import { Link } from "react-router-dom";
// import Slider from "../components/Slider";
import backgroundRentACar from "../assets/img/backgroundRentACar.jpg";

function Explore() {
  return (
    <div className="explore-page-container">
      {/* <Slider /> */}

      <div
        className="hero-section"
        style={{
          background: `url(${backgroundRentACar}) no-repeat fixed center`,
        }}
      >
        <div>
          <Link to="/category/buy">
            <button type="button" className="btn explore-page">
              Buy a car
            </button>
          </Link>
        </div>
        
        <div>
          <Link to="/category/rent">
            <button type="button" className="btn explore-page">
              Rent a car
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Explore;
