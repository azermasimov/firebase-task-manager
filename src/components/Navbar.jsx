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

  return (
    <>
      <nav>
        <ul>
          <li onClick={() => navigate("/")} >Explore</li>
          <li onClick={() => navigate("/offers")}>Offers</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
