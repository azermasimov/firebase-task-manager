import { Link } from "react-router-dom";
import Slider from "../components/Slider";

function Explore() {
  return (
    <div>
      <header>
        <p>Explore</p>
      </header>

      <main>
        <Slider />

        <h4>Categories</h4>
        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Products for Male</h5>
                <p>Bla blablalbalba</p>
                <Link to="/category/male">
                  <button className="btn btn-primary">See Products</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Products for Female</h5>
                <p>Bla blablalbalba</p>
                <Link to="/category/female">
                  <button className="btn btn-primary">See Products</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Explore;
