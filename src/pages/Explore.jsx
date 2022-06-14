import { Link } from "react-router-dom";
import Slider from "../components/Slider";

function Explore() {
  return (
    <div className="explore-page-container">
      <div className="box-1">
        <Slider />
      </div>

      <div className="box-2">
        <h4>Categories</h4>

        <div className="category-titles">
          <div>
            <Link to="/category/tayota">
              <button type="button" className="btn explore-page">Tayota</button>
            </Link>
          </div>

          <div>
            <Link to="/category/volvo">
              <button type="button" className="btn explore-page">Volvo</button>
            </Link>
          </div>

          <div>
            <Link to="/category/mercedes">
              <button type="button" className="btn explore-page">Mercedes</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
