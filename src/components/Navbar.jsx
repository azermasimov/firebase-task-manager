import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Use for active button or li
  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  const black = { color: "black", cursor: "pointer" };
  const grey = { color: "grey", cursor: "pointer" };

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-bottom navbar-light bg-light">
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav">
            <li
              className="nav-link"
              style={pathMatchRoute("/") ? black : grey}
              onClick={() => navigate("/")}
            >
              Explore
            </li>
            <li
              className="nav-link"
              style={pathMatchRoute("/offers") ? black : grey }
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className="nav-link"
              style={pathMatchRoute("/profile") ? black : grey}
              onClick={() => navigate("/profile")}
            >
              Profile
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
