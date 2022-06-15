import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathName = location.pathname;

  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive-nav");
  };

  // Use for active button or li
  const pathMatchRoute = (route) => {
    if (route === pathName) {
      return true;
    }
  };

  const black = {
    color: "#14171A",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "bold",
  };
  const grey = { color: "#657786", cursor: "pointer" };

  const header =  (
    <header>
      <h3>Logo</h3>
      <nav ref={navRef}>
        <a
          style={pathMatchRoute("/") ? black : grey}
          onClick={() => navigate("/")}
        >
          Explore
        </a>
        <a
          style={pathMatchRoute("/offers") ? black : grey}
          onClick={() => navigate("/offers")}
        >
          Offers
        </a>
        <a
          style={pathMatchRoute("/profile") ? black : grey}
          onClick={() => navigate("/profile")}
        >
          Profile
        </a>
        <a
          style={pathMatchRoute("/contact-us") ? black : grey}
          onClick={() => navigate("/contact-us")}
        >
          Contact
        </a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <i className="bi bi-x"></i>
        </button>
      </nav>

      <button className="nav-btn" onClick={showNavbar}>
        <i className="bi bi-list"></i>
      </button>
    </header>
  );

  return (
    <div>
      {pathName !== "/sign-in"
        ? header
        : pathName !== "/sign-up"
        ? header
        : pathName !== "/forgot-password"
        ? header
        : null}
    </div>
  );
}

export default Navbar;
