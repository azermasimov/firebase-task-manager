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

  const black = { color: "black" };
  const grey = { color: "grey" };

  return (
    <>
      <nav>
        <ul>
          <li
            style={pathMatchRoute("/") ? black : grey}
            onClick={() => navigate("/")}
          >
            Explore
          </li>
          <li
            style={pathMatchRoute("/offers") ? black : grey}
            onClick={() => navigate("/offers")}
          >
            Offers
          </li>
          <li
            style={pathMatchRoute("/profile") ? black : grey}
            onClick={() => navigate("/profile")}
          >
            Profile
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
