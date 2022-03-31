import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <div>
      <header>
        <p>My Profile</p>
        <button onClick={onLogout}>Logout</button>
      </header>
    </div>
  );
}

export default Profile;
