import React from "react";
import { Link } from "react-router-dom";

function Explore() {
  return (
    <div>
      <header>
        <p>Explore</p>
      </header>

      <main>
        {/* Slider */}

        <p>Categories</p>
        <div>
          <Link to="/category/male">
            <div style={{ width: "200px", height: "100px", background: "red" }}>
              Male
            </div>
            <p>Products for male</p>
          </Link>
          <Link to="/category/female">
            <div style={{ width: "200px", height: "100px", background: "green" }}>
              Female
            </div>
            <p>Products for Female</p>
          </Link>
          <Link to="/category/both">
            <div style={{ width: "200px", height: "100px", background: "blue" }}>
              Both
            </div>
            <p>Products for Both</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
